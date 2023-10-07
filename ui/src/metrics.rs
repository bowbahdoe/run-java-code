use futures::future::BoxFuture;
use lazy_static::lazy_static;
use prometheus::{
    self, register_histogram, register_histogram_vec, register_int_counter, register_int_gauge,
    Histogram, HistogramVec, IntCounter, IntGauge,
};
use regex::Regex;
use std::{
    future::Future,
    time::{Duration, Instant},
};

use crate::sandbox::{self, Action, Release, Runtime};

lazy_static! {
    pub(crate) static ref REQUESTS: HistogramVec = register_histogram_vec!(
        "playground_request_duration_seconds",
        "Number of requests made",
        Labels::LABELS,
        vec![0.1, 1.0, 2.5, 5.0, 10.0, 15.0]
    )
    .unwrap();
    pub(crate) static ref LIVE_WS: IntGauge = register_int_gauge!(
        "playground_active_websocket_connections_count",
        "Number of active WebSocket connections"
    )
    .unwrap();
    pub(crate) static ref DURATION_WS: Histogram = register_histogram!(
        "playground_websocket_duration_seconds",
        "WebSocket connection length",
        vec![15.0, 60.0, 300.0, 600.0, 1800.0, 3600.0, 7200.0]
    )
    .unwrap();
    pub(crate) static ref UNAVAILABLE_WS: IntCounter = register_int_counter!(
        "playground_websocket_unavailability_count",
        "Number of failed WebSocket connections"
    )
    .unwrap();
}

#[derive(Debug, Copy, Clone, strum::IntoStaticStr)]
pub(crate) enum Endpoint {
    Compile,
    Execute,
    MetaCrates,
    MetaVersionLatest,
    MetaVersionValhalla,
    MetaVersionEarlyAccess,
}

#[derive(Debug, Copy, Clone, strum::IntoStaticStr)]
pub(crate) enum Outcome {
    Success,
    ErrorServer,
    ErrorTimeoutSoft,
    ErrorTimeoutHard,
    ErrorUserCode,
}

#[derive(Debug, Copy, Clone)]
pub(crate) struct Labels {
    endpoint: Endpoint,
    outcome: Outcome,
    runtime: Option<Runtime>,
    release: Option<Option<Release>>,
    action: Option<Action>,
    preview: Option<bool>,
}

impl Labels {
    const COUNT: usize = 6;

    const LABELS: &'static [&'static str; Self::COUNT] = &[
        "endpoint", "outcome", "runtime", "release", "action", "preview",
    ];

    fn as_values(&self) -> [&'static str; Self::COUNT] {
        let Self {
            endpoint,
            outcome,
            runtime,
            release,
            action,
            preview,
        } = *self;

        fn b(v: Option<bool>) -> &'static str {
            v.map_or("", |v| if v { "true" } else { "false" })
        }

        let runtime = runtime.map_or("", Into::into);
        let release = match release {
            None => "",
            Some(None) => "Unspecified",
            Some(Some(v)) => v.into(),
        };
        let action = action.map_or("", Into::into);
        let preview = b(preview);

        [
            endpoint.into(),
            outcome.into(),
            runtime,
            release,
            action,
            preview,
        ]
    }
}

pub(crate) trait GenerateLabels {
    fn generate_labels(&self, outcome: Outcome) -> Labels;
}

impl<T> GenerateLabels for &'_ T
where
    T: GenerateLabels,
{
    fn generate_labels(&self, outcome: Outcome) -> Labels {
        T::generate_labels(self, outcome)
    }
}

impl GenerateLabels for sandbox::CompileRequest {
    fn generate_labels(&self, outcome: Outcome) -> Labels {
        let Self {
            runtime,
            action,
            release,
            preview,
            code: _,
        } = *self;

        Labels {
            endpoint: Endpoint::Compile,
            outcome,
            runtime: Some(runtime),
            release: Some(release),
            action: Some(action),
            preview: Some(preview),
        }
    }
}

impl GenerateLabels for sandbox::ExecuteRequest {
    fn generate_labels(&self, outcome: Outcome) -> Labels {
        let Self {
            runtime,
            release,
            action,
            preview,
            code: _,
        } = *self;

        Labels {
            endpoint: Endpoint::Execute,
            outcome,
            runtime: Some(runtime),
            release: Some(release),
            action: Some(action),
            preview: Some(preview),
        }
    }
}

pub(crate) trait SuccessDetails: Sized {
    fn success_details(&self) -> Outcome;

    fn for_sandbox_result(r: &Result<Self, sandbox::Error>) -> Outcome {
        use sandbox::Error::*;

        match r {
            Ok(v) => v.success_details(),
            Err(CompilerExecutionTimedOut { .. }) => Outcome::ErrorTimeoutHard,
            Err(_) => Outcome::ErrorServer,
        }
    }
}

fn common_success_details(success: bool, stderr: &str) -> Outcome {
    lazy_static! {
        // Memory allocation failures are "Aborted"
        static ref SOFT_TIMEOUT_REGEX: Regex = Regex::new("entrypoint.sh.*Killed.*timeout").unwrap();
    }

    match success {
        true => Outcome::Success,
        false => {
            if stderr
                .lines()
                .next_back()
                .map_or(false, |l| SOFT_TIMEOUT_REGEX.is_match(l))
            {
                Outcome::ErrorTimeoutSoft
            } else {
                Outcome::ErrorUserCode
            }
        }
    }
}

impl SuccessDetails for sandbox::CompileResponse {
    fn success_details(&self) -> Outcome {
        common_success_details(self.success, &self.stderr)
    }
}

impl SuccessDetails for sandbox::ExecuteResponse {
    fn success_details(&self) -> Outcome {
        common_success_details(self.success, &self.stderr)
    }
}

impl SuccessDetails for Vec<sandbox::CrateInformation> {
    fn success_details(&self) -> Outcome {
        Outcome::Success
    }
}

impl SuccessDetails for sandbox::Version {
    fn success_details(&self) -> Outcome {
        Outcome::Success
    }
}

pub(crate) async fn track_metric_async<Req, B, Resp>(request: Req, body: B) -> sandbox::Result<Resp>
where
    Req: GenerateLabels,
    for<'req> B: FnOnce(&'req Req) -> BoxFuture<'req, sandbox::Result<Resp>>,
    Resp: SuccessDetails,
{
    track_metric_common_async(request, body, |_| {}).await
}

async fn track_metric_common_async<Req, B, Resp, F>(
    request: Req,
    body: B,
    f: F,
) -> sandbox::Result<Resp>
where
    Req: GenerateLabels,
    for<'req> B: FnOnce(&'req Req) -> BoxFuture<'req, sandbox::Result<Resp>>,
    Resp: SuccessDetails,
    F: FnOnce(&mut Labels),
{
    let start = Instant::now();
    let response = body(&request).await;
    let elapsed = start.elapsed();

    let outcome = SuccessDetails::for_sandbox_result(&response);
    let mut labels = request.generate_labels(outcome);
    f(&mut labels);

    record_metric_complete(labels, elapsed);

    response
}

pub(crate) async fn track_metric_no_request_async<B, Fut, Resp>(
    endpoint: Endpoint,
    body: B,
) -> crate::Result<Resp>
where
    B: FnOnce() -> Fut,
    Fut: Future<Output = crate::Result<Resp>>,
{
    let start = Instant::now();
    let response = body().await;
    let elapsed = start.elapsed();

    let outcome = if response.is_ok() {
        Outcome::Success
    } else {
        Outcome::ErrorServer
    };
    let labels = Labels {
        endpoint,
        outcome,
        runtime: None,
        release: None,
        action: None,
        preview: None,
    };

    record_metric_complete(labels, elapsed);

    response
}

fn record_metric_complete(labels: Labels, elapsed: Duration) {
    let values = &labels.as_values();
    let histogram = REQUESTS.with_label_values(values);
    histogram.observe(elapsed.as_secs_f64());
}
