use serde_derive::Deserialize;
use snafu::prelude::*;
use std::{
    ffi::OsStr,
    fmt, io,
    io::ErrorKind,
    os::unix::fs::PermissionsExt,
    path::{Path, PathBuf},
    string,
    time::Duration,
};
use tempfile::TempDir;
use tokio::{fs, process::Command, time};
use tracing::debug;

pub(crate) const DOCKER_PROCESS_TIMEOUT_SOFT: Duration = Duration::from_secs(10);
const DOCKER_PROCESS_TIMEOUT_HARD: Duration = Duration::from_secs(12);

#[derive(Debug, Deserialize)]
struct CrateInformationInner {
    name: String,
    version: String,
    id: String,
}

#[derive(Debug, Clone)]
pub struct CrateInformation {
    pub name: String,
    pub version: String,
    pub id: String,
}

impl From<CrateInformationInner> for CrateInformation {
    fn from(me: CrateInformationInner) -> Self {
        let CrateInformationInner { name, version, id } = me;
        Self { name, version, id }
    }
}

#[derive(Debug, Clone)]
pub struct Version {
    pub release: String,
    pub commit_hash: String,
    pub commit_date: String,
}

#[derive(Debug, Snafu)]
pub enum Error {
    #[snafu(display("Unable to create temporary directory: {}", source))]
    UnableToCreateTempDir { source: io::Error },
    #[snafu(display("Unable to create output directory: {}", source))]
    UnableToCreateOutputDir { source: io::Error },
    #[snafu(display("Unable to set permissions for output directory: {}", source))]
    UnableToSetOutputPermissions { source: io::Error },
    #[snafu(display("Unable to create source file: {}", source))]
    UnableToCreateSourceFile { source: io::Error },
    #[snafu(display("Unable to set permissions for source file: {}", source))]
    UnableToSetSourcePermissions { source: io::Error },

    #[snafu(display("Unable to start the compiler: {}", source))]
    UnableToStartCompiler { source: io::Error },
    #[snafu(display("Unable to find the compiler ID"))]
    MissingCompilerId,
    #[snafu(display("Unable to wait for the compiler: {}", source))]
    UnableToWaitForCompiler { source: io::Error },
    #[snafu(display("Unable to get output from the compiler: {}", source))]
    UnableToGetOutputFromCompiler { source: io::Error },
    #[snafu(display("Unable to remove the compiler: {}", source))]
    UnableToRemoveCompiler { source: io::Error },
    #[snafu(display("Compiler execution took longer than {} ms", timeout.as_millis()))]
    CompilerExecutionTimedOut {
        source: tokio::time::error::Elapsed,
        timeout: Duration,
    },

    #[snafu(display("Unable to read output file: {}", source))]
    UnableToReadOutput { source: io::Error },
    #[snafu(display("Unable to read crate information: {}", source))]
    UnableToParseCrateInformation { source: ::serde_json::Error },
    #[snafu(display("Output was not valid UTF-8: {}", source))]
    OutputNotUtf8 { source: string::FromUtf8Error },
    #[snafu(display("Output was missing"))]
    OutputMissing,
    #[snafu(display("Release was missing from the version output"))]
    VersionReleaseMissing,
    #[snafu(display("Commit hash was missing from the version output"))]
    VersionHashMissing,
    #[snafu(display("Commit date was missing from the version output"))]
    VersionDateMissing,
}

pub type Result<T, E = Error> = ::std::result::Result<T, E>;

fn vec_to_str(v: Vec<u8>) -> Result<String> {
    String::from_utf8(v).context(OutputNotUtf8Snafu)
}

// We must create a world-writable files (rustfmt) and directories
// (LLVM IR) so that the process inside the Docker container can write
// into it.
//
// This problem does *not* occur when using the indirection of
// docker-machine.
fn wide_open_permissions() -> std::fs::Permissions {
    PermissionsExt::from_mode(0o777)
}

macro_rules! docker_command {
    ($($arg:expr),* $(,)?) => ({
        let mut cmd = Command::new("docker");
        $( cmd.arg($arg); )*
        cmd
    });
}

fn basic_secure_docker_command() -> Command {
    let mut cmd = docker_command!(
        "run",
        "--platform",
        "linux/amd64",
        "--detach",
        "--cap-drop=ALL",
        // Needed to allow overwriting the file
        "--cap-add=DAC_OVERRIDE",
        "--security-opt=no-new-privileges",
        "--workdir",
        "/playground",
        "--net",
        "none",
        "--memory",
        "512m",
        "--memory-swap",
        "640m",
        "--env",
        format!(
            "PLAYGROUND_TIMEOUT={}",
            DOCKER_PROCESS_TIMEOUT_SOFT.as_secs()
        ),
    );

    cmd.args(&["--pids-limit", "512"]);

    cmd.kill_on_drop(true);

    cmd
}

fn build_execution_command(
    target: Option<CompileTarget>,
    release: Release,
    runtime: Runtime,
    req: impl CrateTypeRequest,
    tests: bool,
    preview: bool
) -> Vec<&'static str> {
    use self::CompileTarget::*;
    use self::CrateType::*;

    let mut cmd = vec![];
    if req.crate_type() == CrateType::Binary {
        cmd.push("java");
        cmd.extend(&["--source", release.java_release()]);

        // Enable using java.lang.foreign w/o warnings
        cmd.push("--enable-native-access=ALL-UNNAMED");
    }
    else {
        cmd.push("javac");
        cmd.extend(&["--release", release.java_release()]);
        cmd.extend(&["-d", "out"])
    }


    if preview {
        cmd.push("--enable-preview");
    }

    cmd.push("src/Main.java");
    cmd

}

fn set_execution_environment(
    cmd: &mut Command,
    target: Option<CompileTarget>,
    req: impl CrateTypeRequest + ReleaseRequest,
) {
    use self::CompileTarget::*;

    if let Some(Wasm) = target {
        cmd.args(&["--env", "PLAYGROUND_NO_DEPENDENCIES=true"]);
        cmd.args(&["--env", "PLAYGROUND_RELEASE_LTO=true"]);
    }

    cmd.apply_crate_type(&req);
}

pub struct Sandbox {
    #[allow(dead_code)]
    scratch: TempDir,
    input_file: PathBuf,
    output_dir: PathBuf,
}

impl Sandbox {
    pub async fn new() -> Result<Self> {
        // `TempDir` performs *synchronous* filesystem operations
        // now and when it's dropped. We accept that under the
        // assumption that the specific operations will be quick
        // enough.
        let scratch = tempfile::Builder::new()
            .prefix("playground")
            .tempdir()
            .context(UnableToCreateTempDirSnafu)?;
        let input_file = scratch.path().join("input.rs");
        let output_dir = scratch.path().join("output");

        fs::create_dir(&output_dir)
            .await
            .context(UnableToCreateOutputDirSnafu)?;
        fs::set_permissions(&output_dir, wide_open_permissions())
            .await
            .context(UnableToSetOutputPermissionsSnafu)?;

        Ok(Sandbox {
            scratch,
            input_file,
            output_dir,
        })
    }

    pub async fn compile(&self, req: &CompileRequest) -> Result<CompileResponse> {
        self.write_source_code(&req.code).await?;

        let command = self.compile_command(req.target, req.release.unwrap_or(req.runtime.default_release()), req.runtime, req.tests, req);

        let output = run_command_with_timeout(command).await?;

        // The compiler writes the file to a name like
        // `compilation-3b75174cac3d47fb.ll`, so we just find the
        // first with the right extension.
        async fn path_to_first_file_with_extension(
            dir: &Path,
            extension: &OsStr,
        ) -> Result<Option<PathBuf>> {
            let mut files = fs::read_dir(dir).await.context(UnableToReadOutputSnafu)?;

            while let Some(entry) = files.next_entry().await.transpose() {
                if let Ok(entry) = entry {
                    let path = entry.path();
                    if path.extension() == Some(extension) {
                        return Ok(Some(path));
                    }
                }
            }

            Ok(None)
        }

        let file =
            path_to_first_file_with_extension(&self.output_dir, req.target.extension()).await?;
        let stdout = vec_to_str(output.stdout)?;
        let mut stderr = vec_to_str(output.stderr)?;

        let mut code = match file {
            Some(file) => read(&file).await?.unwrap_or_default(),
            None => {
                // If we didn't find the file, it's *most* likely that
                // the user's code was invalid. Tack on our own error
                // to the compiler's error instead of failing the
                // request.
                use std::fmt::Write;
                write!(
                    &mut stderr,
                    "\nUnable to locate file for {} output",
                    req.target
                )
                .expect("Unable to write to a string");
                String::new()
            }
        };

        if let CompileTarget::Assembly(_, demangle, process) = req.target {
            if demangle == DemangleAssembly::Demangle {
                code = asm_cleanup::demangle_asm(&code);
            }

            if process == ProcessAssembly::Filter {
                code = asm_cleanup::filter_asm(&code);
            }
        } else if CompileTarget::Hir == req.target {
            // TODO: Run rustfmt on the generated HIR.
        }

        Ok(CompileResponse {
            success: output.status.success(),
            code,
            stdout,
            stderr,
        })
    }

    pub async fn execute(&self, req: &ExecuteRequest) -> Result<ExecuteResponse> {
        self.write_source_code(&req.code).await?;
        let command = self.execute_command(req.release.unwrap_or(req.runtime.default_release()), req.runtime, req.tests, req);

        let output = run_command_with_timeout(command).await?;

        Ok(ExecuteResponse {
            success: output.status.success(),
            stdout: vec_to_str(output.stdout)?,
            stderr: vec_to_str(output.stderr)?,
        })
    }

    pub async fn format(&self, req: &FormatRequest) -> Result<FormatResponse> {
        self.write_source_code(&req.code).await?;
        let command = self.format_command(req);

        let output = run_command_with_timeout(command).await?;

        Ok(FormatResponse {
            success: output.status.success(),
            code: read(self.input_file.as_ref())
                .await?
                .context(OutputMissingSnafu)?,
            stdout: vec_to_str(output.stdout)?,
            stderr: vec_to_str(output.stderr)?,
        })
    }

    pub async fn clippy(&self, req: &ClippyRequest) -> Result<ClippyResponse> {
        self.write_source_code(&req.code).await?;
        let command = self.clippy_command(req);

        let output = run_command_with_timeout(command).await?;

        Ok(ClippyResponse {
            success: output.status.success(),
            stdout: vec_to_str(output.stdout)?,
            stderr: vec_to_str(output.stderr)?,
        })
    }

    pub async fn miri(&self, req: &MiriRequest) -> Result<MiriResponse> {
        self.write_source_code(&req.code).await?;
        let command = self.miri_command(req);

        let output = run_command_with_timeout(command).await?;

        Ok(MiriResponse {
            success: output.status.success(),
            stdout: vec_to_str(output.stdout)?,
            stderr: vec_to_str(output.stderr)?,
        })
    }

    pub async fn crates(&self) -> Result<Vec<CrateInformation>> {
        /* let mut command = basic_secure_docker_command();
        command.args(&[Runtime::Stable.container_name()]);
        command.args(&["cat", "crate-information.json"]);

        let output = run_command_with_timeout(command).await?;

        let crate_info: Vec<CrateInformationInner> =
            ::serde_json::from_slice(&output.stdout).context(UnableToParseCrateInformationSnafu)?;

        let crates = crate_info.into_iter().map(Into::into).collect();
        Ok(crates)
        */

        Ok(vec![])
    }

    pub async fn version(&self, runtime: Runtime) -> Result<Version> {
        let mut command = basic_secure_docker_command();
        command.args(&[runtime.container_name()]);
        command.args(&["java", "--version"]);


        let output = run_command_with_timeout(command).await?;

        let version_output = vec_to_str(output.stdout)?;

        let version = version_output.lines()
            .take(1)
            .fold(String::new(), |a, b| a + " " + b);

        Ok(Version {
            release: version.trim().to_string(),
            commit_hash: version.trim().to_string(),
            commit_date: version.trim().to_string(),
        })
    }

    pub async fn version_rustfmt(&self) -> Result<Version> {
        let mut command = basic_secure_docker_command();
        command.args(&["rustfmt", "cargo", "fmt", "--version"]);
        self.cargo_tool_version(command).await
    }

    pub async fn version_clippy(&self) -> Result<Version> {
        let mut command = basic_secure_docker_command();
        command.args(&["clippy", "cargo", "clippy", "--version"]);
        self.cargo_tool_version(command).await
    }

    pub async fn version_miri(&self) -> Result<Version> {
        let mut command = basic_secure_docker_command();
        command.args(&["miri", "cargo", "miri", "--version"]);
        self.cargo_tool_version(command).await
    }



    // Parses versions of the shape `toolname 0.0.0 (0000000 0000-00-00)`
    async fn cargo_tool_version(&self, command: Command) -> Result<Version> {
        let output = run_command_with_timeout(command).await?;
        let version_output = vec_to_str(output.stdout)?;
        let mut parts = version_output.split_whitespace().fuse().skip(1);

        let release = parts.next().unwrap_or("").into();
        let commit_hash = parts.next().unwrap_or("").trim_start_matches('(').into();
        let commit_date = parts.next().unwrap_or("").trim_end_matches(')').into();

        Ok(Version {
            release,
            commit_hash,
            commit_date,
        })
    }

    async fn write_source_code(&self, code: &str) -> Result<()> {
        fs::write(&self.input_file, code)
            .await
            .context(UnableToCreateSourceFileSnafu)?;
        fs::set_permissions(&self.input_file, wide_open_permissions())
            .await
            .context(UnableToSetSourcePermissionsSnafu)?;

        debug!(
            "Wrote {} bytes of source to {}",
            code.len(),
            self.input_file.display()
        );
        Ok(())
    }

    fn compile_command(
        &self,
        target: CompileTarget,
        release: Release,
        runtime: Runtime,
        tests: bool,
        req: impl CrateTypeRequest + ReleaseRequest + PreviewRequest,
    ) -> Command {
        let mut cmd = self.docker_command(Some(req.crate_type()));
        set_execution_environment(&mut cmd, Some(target), &req);
        let execution_cmd = build_execution_command(
            Some(target),
            release,
            runtime,
            &req,
            tests,

            req.preview()
        );

        cmd.arg(&runtime.container_name()).args(&execution_cmd);

        debug!("Compilation command is {:?}", cmd);

        cmd
    }

    fn execute_command(
        &self,
        release: Release,
        runtime: Runtime,
        tests: bool,
        req: impl CrateTypeRequest + ReleaseRequest + PreviewRequest,
    ) -> Command {
        let mut cmd = self.docker_command(Some(req.crate_type()));
        set_execution_environment(&mut cmd, None, &req);

        let execution_cmd = build_execution_command(
            None,
            release,
            runtime,
            &req,
            tests,
        req.preview()
        );

        cmd.arg(&runtime.container_name()).args(&execution_cmd);

        debug!("Execution command is {:?}", cmd);

        cmd
    }

    fn format_command(&self, req: impl ReleaseRequest) -> Command {
        let crate_type = CrateType::Binary;

        let mut cmd = self.docker_command(Some(crate_type));

        cmd.arg("rustfmt").args(&["cargo", "fmt"]);

        debug!("Formatting command is {:?}", cmd);

        cmd
    }

    fn clippy_command(&self, req: impl CrateTypeRequest + ReleaseRequest) -> Command {
        let mut cmd = self.docker_command(Some(req.crate_type()));

        cmd.apply_crate_type(&req);

        cmd.arg("clippy").args(&["cargo", "clippy"]);

        debug!("Clippy command is {:?}", cmd);

        cmd
    }

    fn miri_command(&self, req: impl ReleaseRequest) -> Command {
        let mut cmd = self.docker_command(None);

        cmd.arg("miri").args(&["cargo", "miri-playground"]);

        debug!("Miri command is {:?}", cmd);

        cmd
    }

    fn docker_command(&self, crate_type: Option<CrateType>) -> Command {
        let crate_type = crate_type.unwrap_or(CrateType::Binary);

        let mut mount_input_file = self.input_file.as_os_str().to_os_string();
        mount_input_file.push(":");
        mount_input_file.push("/playground/");
        mount_input_file.push(crate_type.file_name());

        let mut mount_output_dir = self.output_dir.as_os_str().to_os_string();
        mount_output_dir.push(":");
        mount_output_dir.push("/playground-result");

        let mut cmd = basic_secure_docker_command();

        cmd.arg("--volume")
            .arg(&mount_input_file)
            .arg("--volume")
            .arg(&mount_output_dir);

        cmd
    }
}

async fn run_command_with_timeout(mut command: Command) -> Result<std::process::Output> {
    use std::os::unix::process::ExitStatusExt;

    let timeout = DOCKER_PROCESS_TIMEOUT_HARD;

    let output = command.output().await.context(UnableToStartCompilerSnafu)?;

    // Exit early, in case we don't have the container
    if !output.status.success() {
        return Ok(output);
    }

    let output = String::from_utf8_lossy(&output.stdout);
    let id = output
        .lines()
        .next()
        .context(MissingCompilerIdSnafu)?
        .trim();

    // ----------

    let mut command = docker_command!("wait", id);

    let timed_out = match time::timeout(timeout, command.output()).await {
        Ok(Ok(o)) => {
            // Didn't time out, didn't fail to run
            let o = String::from_utf8_lossy(&o.stdout);
            let code = o
                .lines()
                .next()
                .unwrap_or("")
                .trim()
                .parse()
                .unwrap_or(i32::MAX);
            Ok(ExitStatusExt::from_raw(code))
        }
        Ok(e) => return e.context(UnableToWaitForCompilerSnafu), // Failed to run
        Err(e) => Err(e),                                        // Timed out
    };

    // ----------

    let mut command = docker_command!("logs", id);
    let mut output = command
        .output()
        .await
        .context(UnableToGetOutputFromCompilerSnafu)?;

    // ----------

    let mut command = docker_command!(
        "rm", // Kills container if still running
        "--force", id
    );
    command.stdout(std::process::Stdio::null());
    command
        .status()
        .await
        .context(UnableToRemoveCompilerSnafu)?;

    let code = timed_out.context(CompilerExecutionTimedOutSnafu { timeout })?;

    output.status = code;

    Ok(output)
}

async fn read(path: &Path) -> Result<Option<String>> {
    match fs::read_to_string(path).await {
        Ok(s) => Ok(Some(s)),
        Err(e) if e.kind() == ErrorKind::NotFound => Ok(None),
        Err(e) => Err(e).context(UnableToReadOutputSnafu),
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum AssemblyFlavor {
    Att,
    Intel,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum DemangleAssembly {
    Demangle,
    Mangle,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum ProcessAssembly {
    Filter,
    Raw,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, strum::IntoStaticStr)]
pub enum CompileTarget {
    Assembly(AssemblyFlavor, DemangleAssembly, ProcessAssembly),
    LlvmIr,
    Mir,
    Hir,
    Wasm,
}

impl CompileTarget {
    fn extension(&self) -> &'static OsStr {
        let ext = match *self {
            CompileTarget::Assembly(_, _, _) => "s",
            CompileTarget::LlvmIr => "ll",
            CompileTarget::Mir => "mir",
            CompileTarget::Hir => "hir",
            CompileTarget::Wasm => "wat",
        };
        OsStr::new(ext)
    }
}

impl fmt::Display for CompileTarget {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use self::CompileTarget::*;

        match *self {
            Assembly(_, _, _) => "assembly".fmt(f),
            LlvmIr => "LLVM IR".fmt(f),
            Mir => "Rust MIR".fmt(f),
            Hir => "Rust HIR".fmt(f),
            Wasm => "WebAssembly".fmt(f),
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, strum::IntoStaticStr)]
pub enum Runtime {
    Latest,
    Valhalla
}

impl Runtime {
    fn default_release(&self) -> Release {
        match *self {
            Runtime::Latest => Release::_21,
            Runtime::Valhalla => Release::_20,
        }
    }

    fn container_name(&self) -> &'static str {
        use self::Runtime::*;

        match *self {
            Latest => "amazoncorretto:21",
            Valhalla => "shipilev/openjdk:valhalla"
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, strum::IntoStaticStr)]
pub enum Release {
    _8,
    _9,
    _10,
    _11,
    _12,
    _13,
    _14,
    _15,
    _16,
    _17,
    _18,
    _19,
    _20,
    _21,
}

impl Release {
    fn java_release(&self) -> &'static str {
        use self::Release::*;

        match *self {
            _8 => "8",
            _9 => "9",
            _10 => "10",
            _11 => "11",
            _12 => "12",
            _13 => "13",
            _14 => "14",
            _15 => "15",
            _16 => "16",
            _17 => "17",
            _18 => "18",
            _19 => "19",
            _20 => "20",
            _21 => "21"
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, strum::IntoStaticStr)]
pub enum CrateType {
    Binary,
    Library(LibraryType),
}

impl CrateType {
    fn file_name(&self) -> &'static str {
        use self::CrateType::*;

        match *self {
            Binary => "src/Main.java",
            Library(_) => "src/Main.java",
        }
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, strum::IntoStaticStr)]
pub enum LibraryType {
    Lib,
    Dylib,
    Rlib,
    Staticlib,
    Cdylib,
    ProcMacro,
}

impl LibraryType {
    fn cargo_ident(&self) -> &'static str {
        use self::LibraryType::*;

        match *self {
            Lib => "lib",
            Dylib => "dylib",
            Rlib => "rlib",
            Staticlib => "staticlib",
            Cdylib => "cdylib",
            ProcMacro => "proc-macro",
        }
    }
}

trait DockerCommandExt {
    fn apply_crate_type(&mut self, req: impl CrateTypeRequest);
    fn apply_release(&mut self, req: impl ReleaseRequest);
}

impl DockerCommandExt for Command {
    fn apply_crate_type(&mut self, req: impl CrateTypeRequest) {
        if let CrateType::Library(lib) = req.crate_type() {
            self.args(&[
                "--env",
                &format!("PLAYGROUND_CRATE_TYPE={}", lib.cargo_ident()),
            ]);
        }
    }

    fn apply_release(&mut self, req: impl ReleaseRequest) {
        if let Some(release) = req.release() {
            self.args(&[
                "--release",
                release.java_release()
            ]);
        }
    }
}

trait CrateTypeRequest {
    fn crate_type(&self) -> CrateType;
}

impl<R: CrateTypeRequest> CrateTypeRequest for &'_ R {
    fn crate_type(&self) -> CrateType {
        (*self).crate_type()
    }
}

trait ReleaseRequest {
    fn release(&self) -> Option<Release>;
}

impl<R: ReleaseRequest> ReleaseRequest for &'_ R {
    fn release(&self) -> Option<Release> {
        (*self).release()
    }
}

trait PreviewRequest {
    fn preview(&self) -> bool;
}

impl<R: PreviewRequest> PreviewRequest for &'_ R {
    fn preview(&self) -> bool {
        (*self).preview()
    }
}

#[derive(Debug, Clone)]
pub struct CompileRequest {
    pub target: CompileTarget,
    pub runtime: Runtime,
    pub crate_type: CrateType,
    pub release: Option<Release>,
    pub tests: bool,
    pub preview: bool,
    pub code: String,
}

impl CrateTypeRequest for CompileRequest {
    fn crate_type(&self) -> CrateType {
        self.crate_type
    }
}

impl ReleaseRequest for CompileRequest {
    fn release(&self) -> Option<Release> {
        self.release
    }
}

impl PreviewRequest for CompileRequest {
    fn preview(&self) -> bool {
        self.preview
    }
}

#[derive(Debug, Clone)]
pub struct CompileResponse {
    pub success: bool,
    pub code: String,
    pub stdout: String,
    pub stderr: String,
}

#[derive(Debug, Clone)]
pub struct ExecuteRequest {
    pub runtime: Runtime,
    pub release: Option<Release>,
    pub crate_type: CrateType,
    pub tests: bool,
    pub preview: bool,
    pub code: String,
}

impl CrateTypeRequest for ExecuteRequest {
    fn crate_type(&self) -> CrateType {
        self.crate_type
    }
}

impl ReleaseRequest for ExecuteRequest {
    fn release(&self) -> Option<Release> {
        self.release
    }
}

impl PreviewRequest for ExecuteRequest {
    fn preview(&self) -> bool {
        self.preview
    }
}

#[derive(Debug, Clone)]
pub struct ExecuteResponse {
    pub success: bool,
    pub stdout: String,
    pub stderr: String,
}

#[derive(Debug, Clone)]
pub struct FormatRequest {
    pub code: String,
    pub release: Option<Release>,
}

impl ReleaseRequest for FormatRequest {
    fn release(&self) -> Option<Release> {
        self.release
    }
}

#[derive(Debug, Clone)]
pub struct FormatResponse {
    pub success: bool,
    pub code: String,
    pub stdout: String,
    pub stderr: String,
}

#[derive(Debug, Clone)]
pub struct ClippyRequest {
    pub code: String,
    pub release: Option<Release>,
    pub crate_type: CrateType,
}

impl CrateTypeRequest for ClippyRequest {
    fn crate_type(&self) -> CrateType {
        self.crate_type
    }
}

impl ReleaseRequest for ClippyRequest {
    fn release(&self) -> Option<Release> {
        self.release
    }
}

#[derive(Debug, Clone)]
pub struct ClippyResponse {
    pub success: bool,
    pub stdout: String,
    pub stderr: String,
}

#[derive(Debug, Clone)]
pub struct MiriRequest {
    pub code: String,
    pub release: Option<Release>,
}

impl ReleaseRequest for MiriRequest {
    fn release(&self) -> Option<Release> {
        self.release
    }
}

#[derive(Debug, Clone)]
pub struct MiriResponse {
    pub success: bool,
    pub stdout: String,
    pub stderr: String,
}

#[derive(Debug, Clone)]
pub struct MacroExpansionResponse {
    pub success: bool,
    pub stdout: String,
    pub stderr: String,
}

#[cfg(test)]
mod test {
    use crate::sandbox::Error::CompilerExecutionTimedOut;
    use super::*;

    // Running the tests completely in parallel causes spurious
    // failures due to my resource-limited Docker
    // environment. Additionally, we have some tests that *require*
    // that no other Docker processes are running.
    fn one_test_at_a_time() -> impl Drop {
        use lazy_static::lazy_static;
        use std::sync::Mutex;

        lazy_static! {
            static ref DOCKER_SINGLETON: Mutex<()> = Default::default();
        }

        // We can't poison the empty tuple
        DOCKER_SINGLETON.lock().unwrap_or_else(|e| e.into_inner())
    }

    const HELLO_WORLD_CODE: &'static str = r#"
    public class Main {
      public static void main(String[] args) {
        System.out.println("Hello, world!");
      }
    }
    "#;

    impl Default for ExecuteRequest {
        fn default() -> Self {
            ExecuteRequest {
                runtime: Runtime::Latest,
                crate_type: CrateType::Binary,
                tests: false,
                code: HELLO_WORLD_CODE.to_string(),
                release: None,
                preview: false,
            }
        }
    }

    impl Default for CompileRequest {
        fn default() -> Self {
            CompileRequest {
                target: CompileTarget::LlvmIr,
                runtime: Runtime::Latest,
                crate_type: CrateType::Binary,
                tests: false,
                code: HELLO_WORLD_CODE.to_string(),
                release: None,
                preview: false,
            }
        }
    }

    impl Default for ClippyRequest {
        fn default() -> Self {
            ClippyRequest {
                code: HELLO_WORLD_CODE.to_string(),
                crate_type: CrateType::Binary,
                release: None,
            }
        }
    }

    #[tokio::test]
    async fn basic_functionality() {
        let _singleton = one_test_at_a_time();
        let req = ExecuteRequest::default();

        let sb = Sandbox::new().await.expect("Unable to create sandbox");
        let resp = sb.execute(&req).await.expect("Unable to execute code");

        assert!(resp.stdout.contains("Hello, world!"));
    }

    #[tokio::test]
    async fn network_connections_are_disabled() {
        let _singleton = one_test_at_a_time();
        let code = r#"
            import java.net.URL;

            public class Main {
                public static void main(String[] args) {
                   try {
                       new URL("https://google.com:443").openStream().readAllBytes();
                       System.out.println("Able to connect to the outside world");
                   } catch (Exception e) {
                      System.out.println("Failed to connect " + e);
                   }
                }
            }
        "#;

        let req = ExecuteRequest {
            code: code.to_string(),
            ..ExecuteRequest::default()
        };

        let sb = Sandbox::new().await.expect("Unable to create sandbox");
        let resp = sb.execute(&req).await.expect("Unable to execute code");
        assert!(resp.stdout.contains("Failed to connect"));
    }

    #[tokio::test]
    async fn memory_usage_is_limited() {
        let _singleton = one_test_at_a_time();
        let code = r#"
            public class Main {
                public static void main(String[] args) {
                   int gigabyte = 1024 * 1024 * 1024;
                   var big = new int[gigabyte];
                   for (int i = 0; i < big.length; i++) { big[i] = big[i] + 1; }
                }
            }
        "#;

        let req = ExecuteRequest {
            code: code.to_string(),
            ..ExecuteRequest::default()
        };

        let sb = Sandbox::new().await.expect("Unable to create sandbox");
        let resp = sb.execute(&req).await.expect("Unable to execute code");

        assert!(resp.stderr.contains("java.lang.OutOfMemoryError"), "was: {}", resp.stderr);
    }

    #[tokio::test]
    async fn memory_usage_is_limited_even_with_bytebuffer() {
        let _singleton = one_test_at_a_time();
        let code = r#"
            import java.nio.ByteBuffer;
            public class Main {
                public static void main(String[] args) {
                   int gigabyte = 1024 * 1024 * 1024;
                   var byteBuffer = ByteBuffer.allocate(gigabyte);
                }
            }
        "#;

        let req = ExecuteRequest {
            code: code.to_string(),
            ..ExecuteRequest::default()
        };

        let sb = Sandbox::new().await.expect("Unable to create sandbox");
        let resp = sb.execute(&req).await.expect("Unable to execute code");

        assert!(resp.stderr.contains("java.lang.OutOfMemoryError"), "was: {}", resp.stderr);
    }

    #[tokio::test]
    async fn wallclock_time_is_limited() {
        let _singleton = one_test_at_a_time();
        let code = r#"
            public class Main {
                public static void main(String[] args) throws Exception {
                    Thread.sleep(20000000);
                }
            }
        "#;

        println!("A");
        let req = ExecuteRequest {
            code: code.to_string(),
            ..ExecuteRequest::default()
        };

        let sb = Sandbox::new().await.expect("Unable to create sandbox");
        let resp = sb.execute(&req).await;

        assert!(match resp {
            Err (CompilerExecutionTimedOut{ timeout: DOCKER_PROCESS_TIMEOUT_HARD, .. }) => {
                true
            }
            Ok(_) | Err(_) => {
                false
            }
        });
    }

    #[tokio::test]
    async fn number_of_pids_is_limited() {
        let _singleton = one_test_at_a_time();
        let forkbomb = r##"
import java.util.List;
public class Main {
  public static void main(String[] args) throws Exception {
    new ProcessBuilder(List.of(
		"sh",
        "-c",
        "z() {\n" +
                   "     z&\n" +
                   "     z\n" +
                   " }\n" +
                   " z"
    )).start().waitFor();
  }
}
        "##;

        let req = ExecuteRequest {
            code: forkbomb.to_string(),
            ..ExecuteRequest::default()
        };

        let sb = Sandbox::new().await.expect("Unable to create sandbox");
        let resp = sb.execute(&req).await.expect("Unable to execute code");

        assert!(resp.stderr.contains("unable to create native thread: possibly out of memory or process/resource limits reached"));
    }
}
