use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::{Json, Router};
use sdkwork_game_match_repository_sqlx::{GameMatchRepositoryBackend, InMemoryGameMatchRepository};
use sdkwork_game_match_service::{GameMatchQuery, GameMatchService};
use sdkwork_web_axum::RequirePrincipal;
use serde::Deserialize;
use serde_json::json;
use std::sync::Arc;

pub type MahjongMatchStore = Arc<GameMatchService<GameMatchRepositoryBackend>>;

#[derive(Debug, Deserialize, Default)]
pub struct MatchListQuery {
    page: Option<u32>,
    page_size: Option<u32>,
    status: Option<String>,
}

pub fn app_mahjong_match_router_with_store(store: MahjongMatchStore) -> Router {
    Router::new()
        .route("/app/v3/api/mahjong/matches", get(list_matches))
        .route("/app/v3/api/mahjong/matches/{matchId}", get(get_match))
        .with_state(store)
}

pub fn backend_mahjong_match_router_with_store(store: MahjongMatchStore) -> Router {
    Router::new()
        .route("/backend/v3/api/mahjong/matches", get(list_matches))
        .with_state(store)
}

async fn list_matches(
    RequirePrincipal(principal): RequirePrincipal,
    State(store): State<MahjongMatchStore>,
    Query(query): Query<MatchListQuery>,
) -> Response {
    let tenant_id = principal.tenant_id();
    let match_query = GameMatchQuery {
        page: query.page,
        page_size: query.page_size,
        status: query.status,
    };

    match store.list_matches(tenant_id, match_query).await {
        Ok(page) => (
            StatusCode::OK,
            Json(json!({
                "code": "ok",
                "message": "success",
                "data": page
            })),
        )
            .into_response(),
        Err(error) => (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "code": error.code(),
                "message": error.message(),
                "data": null
            })),
        )
            .into_response(),
    }
}

async fn get_match(
    RequirePrincipal(principal): RequirePrincipal,
    State(store): State<MahjongMatchStore>,
    Path(match_id): Path<String>,
) -> Response {
    let tenant_id = principal.tenant_id();

    match store.get_match(tenant_id, &match_id).await {
        Ok(item) => (
            StatusCode::OK,
            Json(json!({
                "code": "ok",
                "message": "success",
                "data": item
            })),
        )
            .into_response(),
        Err(error) => (
            StatusCode::NOT_FOUND,
            Json(json!({
                "code": error.code(),
                "message": error.message(),
                "data": null
            })),
        )
            .into_response(),
    }
}

pub fn default_match_store() -> MahjongMatchStore {
    Arc::new(GameMatchService::new(GameMatchRepositoryBackend::Memory(
        InMemoryGameMatchRepository::with_seed(vec![]),
    )))
}
