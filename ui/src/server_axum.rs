use crate::{
    gist,
    metrics::{
        track_metric_async, track_metric_no_request_async, Endpoint, GenerateLabels,
        SuccessDetails, UNAVAILABLE_WS,
    },
    sandbox::{self, Runtime, Sandbox},
    CachingSnafu, CompileRequest, Config, Error, ErrorJson, ExecuteRequest, ExecuteResponse,
    ExecutionSnafu, GhToken, GistCreationSnafu, GistLoadingSnafu, MetaCratesResponse,
    MetaGistCreateRequest, MetaGistResponse, MetaVersionResponse, MetricsToken, Result,
    SandboxCreationSnafu,
};
use async_trait::async_trait;
use axum::{
    extract::{self, ws::WebSocketUpgrade, Extension, Path, TypedHeader},
    handler::Handler,
    headers::{authorization::Bearer, Authorization, CacheControl, ETag, IfNoneMatch},
    http::{
        header, request::Parts, uri::PathAndQuery, HeaderValue, Method, Request, StatusCode, Uri,
    },
    middleware,
    response::IntoResponse,
    routing::{get, get_service, post, MethodRouter},
    Router,
};
use futures::{future::BoxFuture, FutureExt};
use snafu::{prelude::*, IntoError};
use std::{
    convert::{TryFrom, TryInto},
    future::Future,
    mem, path,
    str::FromStr,
    sync::Arc,
    time::{Duration, Instant, SystemTime, UNIX_EPOCH},
};
use tokio::sync::Mutex;
use tower_http::{
    cors::{self, CorsLayer},
    services::ServeDir,
    set_header::SetResponseHeader,
    trace::TraceLayer,
};

const ONE_HOUR: Duration = Duration::from_secs(60 * 60);
const CORS_CACHE_TIME_TO_LIVE: Duration = ONE_HOUR;

const TEN_MINUTES: Duration = Duration::from_secs(10 * 60);
const SANDBOX_CACHE_TIME_TO_LIVE: Duration = TEN_MINUTES;

const MAX_AGE_ONE_DAY: HeaderValue = HeaderValue::from_static("public, max-age=86400");
const MAX_AGE_ONE_YEAR: HeaderValue = HeaderValue::from_static("public, max-age=31536000");

mod websocket;

#[derive(Debug, Copy, Clone)]
struct OrchestratorEnabled(bool);

#[tokio::main]
pub(crate) async fn serve(config: Config) {
    let root_files = static_file_service(config.root_path(), MAX_AGE_ONE_DAY);
    let asset_files = static_file_service(config.asset_path(), MAX_AGE_ONE_YEAR);
    let rewrite_help_as_index = middleware::from_fn(rewrite_help_as_index);

    let mut app = Router::new()
        .fallback_service(root_files)
        .nest_service("/assets", asset_files)
        .layer(rewrite_help_as_index)
        .route("/execute", get_or_post(execute))
        .route("/meta/crates", get_or_post(meta_crates))
        .route("/meta/version/latest", get_or_post(meta_version_latest))
        .route("/meta/version/valhalla", get_or_post(meta_version_valhalla))
        .route(
            "/meta/version/early_access",
            get_or_post(meta_version_early_access),
        )
        .route("/meta/gist", post(meta_gist_create))
        .route("/meta/gist/", post(meta_gist_create)) // compatibility with lax frontend code
        .route("/meta/gist/:id", get(meta_gist_get))
        .route("/metrics", get(metrics))
        .route("/websocket", get(websocket))
        .route("/nowebsocket", post(nowebsocket))
        .route("/whynowebsocket", get(whynowebsocket))
        .layer(Extension(Arc::new(SandboxCache::default())))
        .layer(Extension(config.github_token()));

    if let Some(token) = config.metrics_token() {
        app = app.layer(Extension(token))
    }

    if config.use_cors() {
        app = app.layer({
            CorsLayer::new()
                .allow_origin(cors::Any)
                .allow_headers([header::CONTENT_TYPE])
                .allow_methods([Method::GET, Method::POST])
                .allow_credentials(false)
                .max_age(CORS_CACHE_TIME_TO_LIVE)
        });
    }

    // Basic access logging
    app = app.layer(TraceLayer::new_for_http());

    axum::Server::bind(&config.server_socket_addr())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

fn get_or_post<T: 'static>(handler: impl Handler<T, ()> + Copy) -> MethodRouter {
    get(handler).post(handler)
}

fn static_file_service(root: impl AsRef<path::Path>, max_age: HeaderValue) -> MethodRouter {
    let files = ServeDir::new(root).precompressed_gzip();

    let with_caching = SetResponseHeader::if_not_present(files, header::CACHE_CONTROL, max_age);

    get_service(with_caching)
}

async fn rewrite_help_as_index<B>(
    mut req: Request<B>,
    next: middleware::Next<B>,
) -> impl IntoResponse {
    let uri = req.uri_mut();
    if uri.path() == "/help" {
        let rewritten_uri = mem::take(uri);
        let mut parts = rewritten_uri.into_parts();
        parts.path_and_query = Some(PathAndQuery::from_static("/index.html"));
        *uri = Uri::from_parts(parts).unwrap();
    }
    next.run(req).await
}

async fn execute(Json(req): Json<ExecuteRequest>) -> Result<Json<ExecuteResponse>> {
    with_sandbox(
        req,
        |sb, req| async move { sb.execute(req).await }.boxed(),
        ExecutionSnafu,
    )
    .await
    .map(Json)
}

async fn with_sandbox<F, Req, Resp, SbReq, SbResp, Ctx>(req: Req, f: F, ctx: Ctx) -> Result<Resp>
where
    for<'req> F: FnOnce(Sandbox, &'req SbReq) -> BoxFuture<'req, sandbox::Result<SbResp>>,
    Resp: From<SbResp>,
    SbReq: TryFrom<Req, Error = Error> + GenerateLabels,
    SbResp: SuccessDetails,
    Ctx: IntoError<Error, Source = sandbox::Error>,
{
    let sandbox = Sandbox::new().await.context(SandboxCreationSnafu)?;
    let request = req.try_into()?;
    track_metric_async(request, |request| f(sandbox, request))
        .await
        .map(Into::into)
        .context(ctx)
}
pub(crate) trait HasEndpoint {
    const ENDPOINT: Endpoint;
}

impl HasEndpoint for CompileRequest {
    const ENDPOINT: Endpoint = Endpoint::Compile;
}

trait IsSuccess {
    fn is_success(&self) -> bool;
}

async fn meta_crates(
    Extension(cache): Extension<Arc<SandboxCache>>,
    if_none_match: Option<TypedHeader<IfNoneMatch>>,
) -> Result<impl IntoResponse> {
    // Json<MetaCratesResponse
    let value = track_metric_no_request_async(Endpoint::MetaCrates, || cache.crates()).await?;

    apply_timestamped_caching(value, if_none_match)
}

async fn meta_version_latest(
    Extension(cache): Extension<Arc<SandboxCache>>,
    if_none_match: Option<TypedHeader<IfNoneMatch>>,
) -> Result<impl IntoResponse> {
    let value =
        track_metric_no_request_async(Endpoint::MetaVersionLatest, || cache.version_latest())
            .await?;
    apply_timestamped_caching(value, if_none_match)
}

async fn meta_version_valhalla(
    Extension(cache): Extension<Arc<SandboxCache>>,
    if_none_match: Option<TypedHeader<IfNoneMatch>>,
) -> Result<impl IntoResponse> {
    let value =
        track_metric_no_request_async(Endpoint::MetaVersionValhalla, || cache.version_valhalla())
            .await?;
    apply_timestamped_caching(value, if_none_match)
}

async fn meta_version_early_access(
    Extension(cache): Extension<Arc<SandboxCache>>,
    if_none_match: Option<TypedHeader<IfNoneMatch>>,
) -> Result<impl IntoResponse> {
    let value = track_metric_no_request_async(Endpoint::MetaVersionEarlyAccess, || {
        cache.version_early_access()
    })
    .await?;
    apply_timestamped_caching(value, if_none_match)
}

fn apply_timestamped_caching<T>(
    value: Stamped<T>,
    if_none_match: Option<TypedHeader<IfNoneMatch>>,
) -> Result<impl IntoResponse>
where
    Json<T>: IntoResponse,
{
    let (value, timestamp) = value;

    let timestamp = timestamp.duration_since(UNIX_EPOCH).unwrap();
    let etag = format!(r#""pg-ts-{}""#, timestamp.as_secs());
    let etag = ETag::from_str(&etag).unwrap();

    let cache_control = CacheControl::new()
        .with_max_age(SANDBOX_CACHE_TIME_TO_LIVE)
        .with_public();

    let use_fresh = if_none_match.map_or(true, |if_none_match| {
        if_none_match.0.precondition_passes(&etag)
    });

    let etag = TypedHeader(etag);
    let cache_control = TypedHeader(cache_control);

    let response = if use_fresh {
        (StatusCode::OK, Json(value)).into_response()
    } else {
        StatusCode::NOT_MODIFIED.into_response()
    };

    Ok((etag, cache_control, response))
}

async fn meta_gist_create(
    Extension(token): Extension<GhToken>,
    Json(req): Json<MetaGistCreateRequest>,
) -> Result<Json<MetaGistResponse>> {
    let token = token.must_get()?;
    gist::create_future(token, req.code)
        .await
        .map(Into::into)
        .map(Json)
        .context(GistCreationSnafu)
}

async fn meta_gist_get(
    Extension(token): Extension<GhToken>,
    Path(id): Path<String>,
) -> Result<Json<MetaGistResponse>> {
    let token = token.must_get()?;
    gist::load_future(token, &id)
        .await
        .map(Into::into)
        .map(Json)
        .context(GistLoadingSnafu)
}

async fn metrics(_: MetricsAuthorization) -> Result<Vec<u8>, StatusCode> {
    use prometheus::{Encoder, TextEncoder};

    let metric_families = prometheus::gather();
    let encoder = TextEncoder::new();
    let mut buffer = Vec::new();

    encoder
        .encode(&metric_families, &mut buffer)
        .map(|_| buffer)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
}

async fn websocket(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(websocket::handle)
}

#[derive(Debug, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct NoWebSocketRequest {
    #[serde(default)]
    error: String,
}

async fn nowebsocket(Json(req): Json<NoWebSocketRequest>) {
    record_websocket_error(req.error);
    UNAVAILABLE_WS.inc();
}

lazy_static::lazy_static! {
    static ref WS_ERRORS: std::sync::Mutex<std::collections::HashMap<String, usize>> = Default::default();
}

fn record_websocket_error(error: String) {
    *WS_ERRORS
        .lock()
        .unwrap_or_else(|e| e.into_inner())
        .entry(error)
        .or_default() += 1;
}

async fn whynowebsocket() -> String {
    format!("{:#?}", WS_ERRORS.lock().unwrap_or_else(|e| e.into_inner()))
}

#[derive(Debug)]
struct MetricsAuthorization;

type MetricsAuthorizationRejection = (StatusCode, &'static str);

impl MetricsAuthorization {
    const FAILURE: MetricsAuthorizationRejection = (StatusCode::UNAUTHORIZED, "Wrong credentials");
}

#[async_trait]
impl<S> extract::FromRequestParts<S> for MetricsAuthorization
where
    S: Send + Sync,
{
    type Rejection = MetricsAuthorizationRejection;

    async fn from_request_parts(req: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        match Extension::<MetricsToken>::from_request_parts(req, state).await {
            Ok(Extension(expected)) => {
                match TypedHeader::<Authorization<Bearer>>::from_request_parts(req, state).await {
                    Ok(TypedHeader(Authorization(actual))) => {
                        if actual.token() == *expected.0 {
                            Ok(Self)
                        } else {
                            Err(Self::FAILURE)
                        }
                    }
                    Err(_) => Err(Self::FAILURE),
                }
            }
            // If we haven't set a code at all, allow the request.
            Err(_) => Ok(Self),
        }
    }
}

type Stamped<T> = (T, SystemTime);

#[derive(Debug, Default)]
struct SandboxCache {
    crates: CacheOne<MetaCratesResponse>,
    version_latest: CacheOne<MetaVersionResponse>,
    version_valhalla: CacheOne<MetaVersionResponse>,
    version_early_access: CacheOne<MetaVersionResponse>,
}

impl SandboxCache {
    async fn crates(&self) -> Result<Stamped<MetaCratesResponse>> {
        self.crates
            .fetch(
                |sandbox| async move { Ok(sandbox.crates().await.context(CachingSnafu)?.into()) },
            )
            .await
    }

    async fn version_latest(&self) -> Result<Stamped<MetaVersionResponse>> {
        self.version_latest
            .fetch(|sandbox| async move {
                let version = sandbox
                    .version(Runtime::Latest)
                    .await
                    .context(CachingSnafu)?;
                Ok(version.into())
            })
            .await
    }

    async fn version_valhalla(&self) -> Result<Stamped<MetaVersionResponse>> {
        self.version_valhalla
            .fetch(|sandbox| async move {
                let version = sandbox
                    .version(Runtime::Valhalla)
                    .await
                    .context(CachingSnafu)?;
                Ok(version.into())
            })
            .await
    }

    async fn version_early_access(&self) -> Result<Stamped<MetaVersionResponse>> {
        self.version_early_access
            .fetch(|sandbox| async move {
                let version = sandbox
                    .version(Runtime::EarlyAccess)
                    .await
                    .context(CachingSnafu)?;
                Ok(version.into())
            })
            .await
    }
}

#[derive(Debug)]
struct CacheOne<T>(Mutex<Option<CacheInfo<T>>>);

impl<T> Default for CacheOne<T> {
    fn default() -> Self {
        Self(Default::default())
    }
}

impl<T> CacheOne<T>
where
    T: Clone + PartialEq,
{
    async fn fetch<F, FFut>(&self, generator: F) -> Result<Stamped<T>>
    where
        F: FnOnce(Sandbox) -> FFut,
        FFut: Future<Output = Result<T>>,
    {
        let data = &mut *self.0.lock().await;
        match data {
            Some(info) => {
                if info.validation_time.elapsed() <= SANDBOX_CACHE_TIME_TO_LIVE {
                    Ok(info.stamped_value())
                } else {
                    Self::set_value(data, generator).await
                }
            }
            None => Self::set_value(data, generator).await,
        }
    }

    async fn set_value<F, FFut>(data: &mut Option<CacheInfo<T>>, generator: F) -> Result<Stamped<T>>
    where
        F: FnOnce(Sandbox) -> FFut,
        FFut: Future<Output = Result<T>>,
    {
        let sandbox = Sandbox::new().await.context(SandboxCreationSnafu)?;
        let value = generator(sandbox).await?;

        let old_info = data.take();
        let new_info = CacheInfo::build(value);

        let info = match old_info {
            Some(mut old_value) => {
                if old_value.value == new_info.value {
                    // The value hasn't changed; record that we have
                    // checked recently, but keep the creation time to
                    // preserve caching.
                    old_value.validation_time = new_info.validation_time;
                    old_value
                } else {
                    new_info
                }
            }
            None => new_info,
        };

        let value = info.stamped_value();

        *data = Some(info);

        Ok(value)
    }
}

#[derive(Debug)]
struct CacheInfo<T> {
    value: T,
    creation_time: SystemTime,
    validation_time: Instant,
}

impl<T> CacheInfo<T> {
    fn build(value: T) -> Self {
        let creation_time = SystemTime::now();
        let validation_time = Instant::now();

        Self {
            value,
            creation_time,
            validation_time,
        }
    }

    fn stamped_value(&self) -> Stamped<T>
    where
        T: Clone,
    {
        (self.value.clone(), self.creation_time)
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        Json(ErrorJson {
            error: self.to_string(),
        })
        .into_response()
    }
}

/// This type only exists so that we can recover from the `axum::Json`
/// error and format it using our expected JSON error object.
struct Json<T>(T);

#[async_trait]
impl<T, S, B> extract::FromRequest<S, B> for Json<T>
where
    T: serde::de::DeserializeOwned,
    S: Send + Sync,
    B: axum::body::HttpBody + Send + 'static,
    B::Data: Send,
    B::Error: Into<axum::BoxError>,
{
    type Rejection = axum::response::Response;

    async fn from_request(req: Request<B>, state: &S) -> Result<Self, Self::Rejection> {
        match axum::Json::<T>::from_request(req, state).await {
            Ok(v) => Ok(Self(v.0)),
            Err(e) => {
                let error = format!("Unable to deserialize request: {e}");
                Err(axum::Json(ErrorJson { error }).into_response())
            }
        }
    }
}

impl<T> IntoResponse for Json<T>
where
    T: serde::Serialize,
{
    fn into_response(self) -> axum::response::Response {
        axum::Json(self.0).into_response()
    }
}
