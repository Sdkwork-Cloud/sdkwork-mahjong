use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::{Json, Router};
use sdkwork_web_core::WebRequestContext;
use serde_json::json;

pub fn mahjong_health_router() -> Router {
    Router::new()
        .route("/health", get(health_check))
        .route("/ready", get(ready_check))
}

async fn health_check(_ctx: WebRequestContext) -> Response {
    (
        StatusCode::OK,
        Json(json!({
            "status": "ok",
            "service": "sdkwork-mahjong"
        })),
    )
        .into_response()
}

async fn ready_check(_ctx: WebRequestContext) -> Response {
    (
        StatusCode::OK,
        Json(json!({
            "status": "ready",
            "service": "sdkwork-mahjong"
        })),
    )
        .into_response()
}

#[cfg(test)]
mod tests {
    use axum::body::Body;
    use axum::http::{Request, StatusCode};
    use tower::ServiceExt;

    use super::mahjong_health_router;
    use crate::with_mahjong_app_request_context;

    #[tokio::test]
    async fn health_router_exposes_liveness_and_readiness() {
        let router = with_mahjong_app_request_context(mahjong_health_router());

        for uri in ["/health", "/ready"] {
            let response = router
                .clone()
                .oneshot(
                    Request::builder()
                        .uri(uri)
                        .body(Body::empty())
                        .expect("request"),
                )
                .await
                .expect("response");

            assert_eq!(StatusCode::OK, response.status(), "{uri}");
        }
    }
}
