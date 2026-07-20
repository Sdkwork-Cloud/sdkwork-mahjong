//! API assembly bootstrap for sdkwork-mahjong.

use axum::Router;
use sdkwork_game_match_repository_sqlx::{GameMatchRepositoryBackend, SqlxGameMatchRepository};
use sdkwork_game_match_service::GameMatchService;
use sdkwork_routes_match_app_api::{default_match_store, MahjongMatchStore};
use std::sync::Arc;

pub struct ApiAssembly {
    pub router: Router,
}

pub async fn assemble_api_router() -> Result<ApiAssembly, String> {
    let store = build_match_store().await?;
    let router = Router::new()
        .merge(sdkwork_routes_match_app_api::gateway_mount(store.clone()))
        .merge(sdkwork_routes_match_backend_api::gateway_mount(store))
        .layer(sdkwork_web_bootstrap::application_cors_layer_from_env(
            &["SDKWORK_MAHJONG_ENVIRONMENT"],
            &[
                "SDKWORK_MAHJONG_CORS_ALLOWED_ORIGINS",
                "SDKWORK_CORS_ALLOWED_ORIGINS",
            ],
        ));
    Ok(ApiAssembly { router })
}

async fn build_match_store() -> Result<MahjongMatchStore, String> {
    if std::env::var("MAHJONG_DATABASE_URL").is_err() {
        return Ok(default_match_store());
    }

    let host = sdkwork_mahjong_database_host::bootstrap_mahjong_database_from_env().await?;
    let repository = SqlxGameMatchRepository::new(host.pool().clone());
    tracing::info!("mahjong match store using SQLx repository");
    Ok(Arc::new(GameMatchService::new(
        GameMatchRepositoryBackend::Sqlx(Box::new(repository)),
    )))
}
