use sdkwork_api_mahjong_assembly::assemble_api_router;
use sdkwork_utils_rust::optional::default_if_blank;

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

    let app = assemble_api_router()
        .await
        .expect("mahjong API assembly bootstrap failed")
        .router;
    let listener = tokio::net::TcpListener::bind(&bind_address)
        .await
        .expect("bind mahjong standalone-gateway listener failed");
    tracing::info!("sdkwork-api-mahjong-standalone-gateway listening on {bind_address}");
    axum::serve(listener, app)
        .await
        .expect("serve mahjong standalone-gateway failed");
}
