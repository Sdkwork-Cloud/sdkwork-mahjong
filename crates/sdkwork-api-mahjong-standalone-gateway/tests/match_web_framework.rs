use axum::body::Body;
use axum::http::{Request, StatusCode};
use tower::ServiceExt;

use sdkwork_api_mahjong_standalone_gateway::{
    app_mahjong_match_router_with_store, default_match_store, with_mahjong_app_request_context,
};

const DEV_AUTH_TOKEN: &str =
    "Bearer tenant_id=demo-tenant;user_id=user-1;session_id=session-1;app_id=mahjong;auth_level=password";
const DEV_ACCESS_TOKEN: &str =
    "tenant_id=demo-tenant;user_id=user-1;session_id=session-1;app_id=mahjong;environment=dev;deployment_mode=saas";

#[tokio::test]
async fn match_router_rejects_unauthenticated_requests() {
    let router = with_mahjong_app_request_context(app_mahjong_match_router_with_store(
        default_match_store(),
    ));

    let response = router
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
    let router = with_mahjong_app_request_context(app_mahjong_match_router_with_store(
        default_match_store(),
    ));

    let response = router
        .oneshot(
            Request::builder()
                .uri("/app/v3/api/mahjong/matches")
                .header("Authorization", DEV_AUTH_TOKEN)
                .header("Access-Token", DEV_ACCESS_TOKEN)
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::OK);
}
