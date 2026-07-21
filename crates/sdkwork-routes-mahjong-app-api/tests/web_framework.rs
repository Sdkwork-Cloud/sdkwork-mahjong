use axum::body::{to_bytes, Body};
use axum::http::{Request, StatusCode};
use sdkwork_web_core::{access_token_jwt, auth_token_jwt};
use tower::ServiceExt;

use sdkwork_routes_match_app_api::{default_match_store, gateway_mount};

static DEV_AUTH_ENV_LOCK: std::sync::Mutex<()> = std::sync::Mutex::new(());

fn dev_tokens() -> (String, String) {
    (
        format!(
            "Bearer {}",
            auth_token_jwt("100001", "user-1", "session-1", "mahjong")
        ),
        access_token_jwt("100001", "user-1", "session-1", "mahjong"),
    )
}

#[tokio::test]
async fn match_router_rejects_unauthenticated_requests() {
    let response = gateway_mount(default_match_store())
        .oneshot(
            Request::builder()
                .uri("/app/v3/api/mahjong/matches")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::UNAUTHORIZED);
}

#[tokio::test]
async fn match_router_accepts_dev_inline_dual_tokens() {
    let _env_guard = DEV_AUTH_ENV_LOCK
        .lock()
        .unwrap_or_else(|poisoned| poisoned.into_inner());
    std::env::set_var("SDKWORK_IAM_ALLOW_DEV_AUTH_FALLBACK", "true");
    let (auth_token, access_token) = dev_tokens();
    let response = gateway_mount(default_match_store())
        .oneshot(
            Request::builder()
                .uri("/app/v3/api/mahjong/matches")
                .header("Authorization", auth_token)
                .header("Access-Token", access_token)
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    std::env::remove_var("SDKWORK_IAM_ALLOW_DEV_AUTH_FALLBACK");

    assert_eq!(response.status(), StatusCode::OK);
    let body = to_bytes(response.into_body(), usize::MAX).await.unwrap();
    let payload: serde_json::Value = serde_json::from_slice(&body).unwrap();
    assert_eq!(payload["code"], 0);
    assert!(payload["data"]["items"].is_array());
    assert_eq!(payload["data"]["pageInfo"]["mode"], "offset");
}
