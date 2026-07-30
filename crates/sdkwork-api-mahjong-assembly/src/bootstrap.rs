//! API assembly bootstrap for sdkwork-mahjong.

use axum::Router;
use sdkwork_mahjong_match_repository_sqlx::{GameMatchRepositoryBackend, SqlxGameMatchRepository};
use sdkwork_mahjong_match_service::GameMatchService;
use sdkwork_routes_mahjong_app_api::MahjongMatchStore;
use sdkwork_web_bootstrap::{ApiAssemblyContribution, HttpRouteManifest, PgPoolReadinessCheck};
use std::sync::Arc;

pub type ApiAssembly = ApiAssemblyContribution;

pub async fn assemble_api_router() -> Result<ApiAssembly, String> {
    let (store, readiness_pool) = build_match_store().await?;
    let router = Router::new()
        .merge(sdkwork_routes_mahjong_app_api::gateway_mount(store.clone()))
        .merge(sdkwork_routes_mahjong_backend_api::gateway_mount(store));
    let mut routes = Vec::new();
    routes.extend_from_slice(sdkwork_routes_mahjong_app_api::gateway_route_manifest().routes());
    routes.extend_from_slice(sdkwork_routes_mahjong_backend_api::gateway_route_manifest().routes());
    ApiAssemblyContribution::from_manifest(
        "sdkwork-mahjong",
        "SDKWork Mahjong API",
        router,
        HttpRouteManifest::from_owned_routes(routes),
        Vec::new(),
        Arc::new(PgPoolReadinessCheck::new(readiness_pool)),
    )
}

async fn build_match_store() -> Result<(MahjongMatchStore, sqlx::PgPool), String> {
    let host = sdkwork_mahjong_database_host::bootstrap_mahjong_database_from_env().await?;
    let readiness_pool = host
        .pool()
        .as_postgres()
        .ok_or_else(|| "mahjong authoritative server requires a PostgreSQL pool".to_owned())?
        .clone();
    let repository = SqlxGameMatchRepository::new(host.pool().clone());
    tracing::info!("mahjong match store using SQLx repository");
    Ok((
        Arc::new(GameMatchService::new(GameMatchRepositoryBackend::Sqlx(
            Box::new(repository),
        ))),
        readiness_pool,
    ))
}
