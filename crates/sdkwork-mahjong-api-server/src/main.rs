use sdkwork_mahjong_api_server::{build_match_store_async, build_router};
use sdkwork_utils_rust::optional::default_if_blank;
use sdkwork_web_bootstrap::{service_router, ServiceRouterConfig};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("info")),
        )
        .init();

    let bind_address = default_if_blank(
        std::env::var("MAHJONG_API_BIND")
            .ok()
            .or_else(|| std::env::var("SDKWORK_MAHJONG_APPLICATION_PUBLIC_INGRESS_BIND").ok())
            .as_deref(),
        "127.0.0.1:8097",
    );

    let store = build_match_store_async().await;
    let business = build_router(store);
    let app = service_router(business, ServiceRouterConfig::default().with_always_ready());
    let listener = tokio::net::TcpListener::bind(&bind_address)
        .await
        .expect("bind mahjong api-server listener failed");
    tracing::info!("sdkwork-mahjong-api-server listening on {bind_address}");
    axum::serve(listener, app)
        .await
        .expect("serve mahjong api-server failed");
}
