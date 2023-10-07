#![deny(rust_2018_idioms)]

use crate::env::{PLAYGROUND_GITHUB_TOKEN, PLAYGROUND_UI_ROOT};
use crate::sandbox::Action;
use serde::{Deserialize, Serialize};
use snafu::prelude::*;
use std::{
    convert::TryFrom,
    net::SocketAddr,
    path::{Path, PathBuf},
    sync::Arc,
};
use tracing::{error, info, warn};
use tracing_subscriber::EnvFilter;

const DEFAULT_ADDRESS: &str = "127.0.0.1";
const DEFAULT_PORT: u16 = 5000;

mod env;
mod gist;
mod metrics;
mod sandbox;
mod server_axum;

fn main() {
    // Dotenv may be unable to load environment variables, but that's ok in production
    let _ = dotenv::dotenv();
    openssl_probe::init_ssl_cert_env_vars();

    // Info-level logging is enabled by default.
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let config = Config::from_env();
    server_axum::serve(config);
}

struct Config {
    address: String,
    cors_enabled: bool,
    gh_token: Option<String>,
    metrics_token: Option<String>,
    port: u16,
    root: PathBuf,
}

impl Config {
    fn from_env() -> Self {
        let root = if let Some(root) = env::var_os(PLAYGROUND_UI_ROOT) {
            // Ensure it appears as an absolute path in logs to help user orient
            // themselves about what directory the PLAYGROUND_UI_ROOT
            // configuration is interpreted relative to.
            let mut root = PathBuf::from(root);
            if !root.is_absolute() {
                if let Ok(current_dir) = env::current_dir() {
                    root = current_dir.join(root);
                }
            }
            root
        } else {
            // Note this is `env!` (compile time) while the above is
            // `env::var_os` (run time). We know where the ui is expected to be
            // relative to the source code that the server was compiled from.
            PathBuf::from(env!("CARGO_MANIFEST_DIR"))
                .join("frontend")
                .join("build")
        };

        let index_html = root.join("index.html");
        if index_html.exists() {
            info!("Serving playground frontend from {}", root.display());
        } else {
            error!(
                "Playground ui does not exist at {}\n\
                Playground will not work until `yarn run build` has been run or {PLAYGROUND_UI_ROOT} has been fixed",
                index_html.display(),
            );
        }

        let address =
            env::var("PLAYGROUND_UI_ADDRESS").unwrap_or_else(|_| DEFAULT_ADDRESS.to_string());
        let port = env::var("PLAYGROUND_UI_PORT")
            .ok()
            .and_then(|p| p.parse().ok())
            .unwrap_or(DEFAULT_PORT);

        let gh_token = env::var(PLAYGROUND_GITHUB_TOKEN).ok();
        if gh_token.is_none() {
            warn!("Environment variable {} is not set, so reading and writing GitHub gists will not work", PLAYGROUND_GITHUB_TOKEN);
        }

        // Attempt to retrieve the environment variable values
        let metrics_token = std::env::var("PLAYGROUND_METRICS_TOKEN").ok();
        let cors_enabled = std::env::var_os("PLAYGROUND_CORS_ENABLED").is_some();

        // Print the values to the console
        println!("Metrics Token: {:?}", metrics_token);
        println!("CORS Enabled: {}", cors_enabled);

        Self {
            address,
            cors_enabled,
            gh_token,
            metrics_token,
            port,
            root,
        }
    }

    fn root_path(&self) -> &Path {
        &self.root
    }

    fn asset_path(&self) -> PathBuf {
        self.root.join("assets")
    }

    fn use_cors(&self) -> bool {
        self.cors_enabled
    }

    fn metrics_token(&self) -> Option<MetricsToken> {
        self.metrics_token.as_deref().map(MetricsToken::new)
    }

    fn github_token(&self) -> GhToken {
        GhToken::new(&self.gh_token)
    }

    fn server_socket_addr(&self) -> SocketAddr {
        let address = self.address.parse().expect("Invalid address");
        SocketAddr::new(address, self.port)
    }
}

#[derive(Debug, Clone)]
struct GhToken(Option<Arc<String>>);

impl GhToken {
    fn new(token: &Option<String>) -> Self {
        GhToken(token.clone().map(Arc::new))
    }

    fn must_get(&self) -> Result<String> {
        self.0
            .as_ref()
            .map(|s| String::clone(s))
            .context(NoGithubTokenSnafu)
    }
}

#[derive(Debug, Clone)]
struct MetricsToken(Arc<String>);

impl MetricsToken {
    fn new(token: impl Into<String>) -> Self {
        MetricsToken(Arc::new(token.into()))
    }
}

#[derive(Debug, Snafu)]
pub enum Error {
    #[snafu(display("Sandbox creation failed: {}", source))]
    SandboxCreation { source: sandbox::Error },
    #[snafu(display("Compilation operation failed: {}", source))]
    Compilation { source: sandbox::Error },
    #[snafu(display("Execution operation failed: {}", source))]
    Execution { source: sandbox::Error },
    #[snafu(display("Evaluation operation failed: {}", source))]
    Evaluation { source: sandbox::Error },
    #[snafu(display("Linting operation failed: {}", source))]
    Linting { source: sandbox::Error },
    #[snafu(display("Expansion operation failed: {}", source))]
    Expansion { source: sandbox::Error },
    #[snafu(display("Formatting operation failed: {}", source))]
    Formatting { source: sandbox::Error },
    #[snafu(display("Interpreting operation failed: {}", source))]
    Interpreting { source: sandbox::Error },
    #[snafu(display("Caching operation failed: {}", source))]
    Caching { source: sandbox::Error },
    #[snafu(display("Gist creation failed: {}", source))]
    GistCreation { source: octocrab::Error },
    #[snafu(display("Gist loading failed: {}", source))]
    GistLoading { source: octocrab::Error },
    #[snafu(display("{PLAYGROUND_GITHUB_TOKEN} not set up for reading/writing gists"))]
    NoGithubToken,
    #[snafu(display("Unable to deserialize request: {}", source))]
    Deserialization { source: serde_json::Error },
    #[snafu(display("Unable to serialize response: {}", source))]
    Serialization { source: serde_json::Error },
    #[snafu(display("The value {:?} is not a valid target", value))]
    InvalidTarget { value: String },
    #[snafu(display("The value {:?} is not a valid assembly flavor", value))]
    InvalidAssemblyFlavor { value: String },
    #[snafu(display("The value {:?} is not a valid demangle option", value))]
    InvalidDemangleAssembly { value: String },
    #[snafu(display("The value {:?} is not a valid assembly processing option", value))]
    InvalidProcessAssembly { value: String },
    #[snafu(display("The value {:?} is not a valid runtime", value,))]
    InvalidRuntime { value: String },
    #[snafu(display("The value {:?} is not a valid mode", value))]
    InvalidMode { value: String },
    #[snafu(display("The value {:?} is not a valid release", value))]
    InvalidRelease { value: String },
    #[snafu(display("The value {:?} is not a valid action", value))]
    InvalidAction { value: String },
    #[snafu(display("No request was provided"))]
    RequestMissing,
    #[snafu(display("The cache has been poisoned"))]
    CachePoisoned,
    #[snafu(display("The WebSocket worker panicked: {}", text))]
    WebSocketTaskPanic { text: String },

    #[snafu(display("The operation timed out"))]
    Timeout { source: tokio::time::error::Elapsed },
}

type Result<T, E = Error> = ::std::result::Result<T, E>;

#[derive(Debug, Clone, Serialize)]
struct ErrorJson {
    error: String,
}

#[derive(Debug, Clone, Deserialize)]
struct CompileRequest {
    runtime: String,
    #[serde(default)]
    release: String,
    action: String,
    #[serde(default)]
    preview: bool,
    code: String,
}

#[derive(Debug, Clone, Serialize)]
struct CompileResponse {
    success: bool,
    code: String,
    stdout: String,
    stderr: String,
}

#[derive(Debug, Clone, Deserialize)]
struct ExecuteRequest {
    runtime: String,
    #[serde(default)]
    release: String,
    action: String,
    #[serde(default)]
    preview: bool,
    code: String,
}

#[derive(Debug, Clone, Serialize)]
struct ExecuteResponse {
    success: bool,
    stdout: String,
    stderr: String,
}

#[derive(Debug, Clone, PartialEq, Serialize)]
struct CrateInformation {
    name: String,
    version: String,
    id: String,
}

#[derive(Debug, Clone, PartialEq, Serialize)]
struct MetaCratesResponse {
    crates: Arc<[CrateInformation]>,
}

#[derive(Debug, Clone, PartialEq, Serialize)]
struct MetaVersionResponse {
    version: Arc<str>,
    hash: Arc<str>,
    date: Arc<str>,
}

#[derive(Debug, Clone, Deserialize)]
struct MetaGistCreateRequest {
    code: String,
}

#[derive(Debug, Clone, Serialize)]
struct MetaGistResponse {
    id: String,
    url: String,
    code: String,
}

impl TryFrom<CompileRequest> for sandbox::CompileRequest {
    type Error = Error;

    fn try_from(me: CompileRequest) -> Result<Self> {
        Ok(sandbox::CompileRequest {
            runtime: parse_runtime(&me.runtime)?,
            release: parse_release(&me.release)?,
            action: parse_action(&me.action)?.unwrap_or(Action::Build),
            preview: me.preview,
            code: me.code,
        })
    }
}

impl From<sandbox::CompileResponse> for CompileResponse {
    fn from(me: sandbox::CompileResponse) -> Self {
        CompileResponse {
            success: me.success,
            code: me.code,
            stdout: me.stdout,
            stderr: me.stderr,
        }
    }
}

impl TryFrom<ExecuteRequest> for sandbox::ExecuteRequest {
    type Error = Error;

    fn try_from(me: ExecuteRequest) -> Result<Self> {
        Ok(sandbox::ExecuteRequest {
            runtime: parse_runtime(&me.runtime)?,
            release: parse_release(&me.release)?,
            action: parse_action(&me.action)?.unwrap_or(Action::Run),
            preview: me.preview,
            code: me.code,
        })
    }
}

impl From<sandbox::ExecuteResponse> for ExecuteResponse {
    fn from(me: sandbox::ExecuteResponse) -> Self {
        ExecuteResponse {
            success: me.success,
            stdout: me.stdout,
            stderr: me.stderr,
        }
    }
}

impl From<Vec<sandbox::CrateInformation>> for MetaCratesResponse {
    fn from(me: Vec<sandbox::CrateInformation>) -> Self {
        let crates = me
            .into_iter()
            .map(|cv| CrateInformation {
                name: cv.name,
                version: cv.version,
                id: cv.id,
            })
            .collect();

        MetaCratesResponse { crates }
    }
}

impl From<sandbox::Version> for MetaVersionResponse {
    fn from(me: sandbox::Version) -> Self {
        MetaVersionResponse {
            version: me.release.into(),
            hash: me.commit_hash.into(),
            date: me.commit_date.into(),
        }
    }
}

impl From<gist::Gist> for MetaGistResponse {
    fn from(me: gist::Gist) -> Self {
        MetaGistResponse {
            id: me.id,
            url: me.url,
            code: me.code,
        }
    }
}

fn parse_runtime(s: &str) -> Result<sandbox::Runtime> {
    Ok(match s {
        "latest" => sandbox::Runtime::Latest,
        "valhalla" => sandbox::Runtime::Valhalla,
        "early_access" => sandbox::Runtime::EarlyAccess,

        value => InvalidRuntimeSnafu { value }.fail()?,
    })
}

fn parse_release(s: &str) -> Result<Option<sandbox::Release>> {
    Ok(match s {
        "" => None,
        "8" => Some(sandbox::Release::_8),
        "9" => Some(sandbox::Release::_9),
        "10" => Some(sandbox::Release::_10),
        "11" => Some(sandbox::Release::_11),
        "12" => Some(sandbox::Release::_12),
        "13" => Some(sandbox::Release::_13),
        "14" => Some(sandbox::Release::_14),
        "15" => Some(sandbox::Release::_15),
        "16" => Some(sandbox::Release::_16),
        "17" => Some(sandbox::Release::_17),
        "18" => Some(sandbox::Release::_18),
        "19" => Some(sandbox::Release::_19),
        "20" => Some(sandbox::Release::_20),
        "21" => Some(sandbox::Release::_21),
        "22" => Some(sandbox::Release::_22),
        value => InvalidReleaseSnafu { value }.fail()?,
    })
}

fn parse_action(s: &str) -> Result<Option<sandbox::Action>> {
    Ok(match s {
        "" => None,
        "run" => Some(Action::Run),
        "build" => Some(Action::Build),
        value => InvalidActionSnafu { value }.fail()?,
    })
}
