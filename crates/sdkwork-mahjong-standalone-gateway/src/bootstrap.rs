use axum::Router;

use crate::{
    app_mahjong_match_router_with_store, backend_mahjong_match_router_with_store,
    default_match_store, with_mahjong_app_request_context, with_mahjong_backend_request_context,
    MahjongMatchStore,
};

pub fn build_match_store() -> MahjongMatchStore {
    default_match_store()
}

pub async fn build_match_store_async() -> MahjongMatchStore {
    if std::env::var("MAHJONG_DATABASE_URL").is_err() {
        return default_match_store();
    }

    match sdkwork_mahjong_database_host::bootstrap_mahjong_database_from_env().await {
        Ok(host) => {
            let repository = sdkwork_game_match_repository_sqlx::SqlxGameMatchRepository::new(
                host.pool().clone(),
            );
            tracing::info!("mahjong match store using SQLx repository");
            std::sync::Arc::new(sdkwork_game_match_service::GameMatchService::new(
                sdkwork_game_match_repository_sqlx::GameMatchRepositoryBackend::Sqlx(Box::new(
                    repository,
                )),
            ))
        }
        Err(error) => {
            tracing::warn!("mahjong database bootstrap failed, using in-memory store: {error}");
            default_match_store()
        }
    }
}

pub fn build_router(store: MahjongMatchStore) -> Router {
    let app_routes = with_mahjong_app_request_context(app_mahjong_match_router_with_store(
        store.clone(),
    ));

    let backend_routes =
        with_mahjong_backend_request_context(backend_mahjong_match_router_with_store(store));

    Router::new()
        .merge(app_routes)
        .merge(backend_routes)
        .layer(sdkwork_web_bootstrap::application_cors_layer_from_env(
            &["SDKWORK_MAHJONG_ENVIRONMENT"],
            &["SDKWORK_MAHJONG_CORS_ALLOWED_ORIGINS", "SDKWORK_CORS_ALLOWED_ORIGINS"],
        ))
}
