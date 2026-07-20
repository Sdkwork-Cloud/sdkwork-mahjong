use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::http::{HeaderName, HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::{Json, Router};
use sdkwork_game_match_repository_sqlx::{GameMatchRepositoryBackend, InMemoryGameMatchRepository};
use sdkwork_game_match_service::{GameError, GameMatchQuery, GameMatchService};
use sdkwork_iam_web_adapter::{build_web_framework_layer, IamWebRequestContextResolver};
use sdkwork_utils_rust::{
    uuid, PageInfo, PageMode, SdkWorkApiResponse, SdkWorkPageData, SdkWorkResourceData,
};
use sdkwork_web_axum::{with_web_request_context, RequirePrincipal};
use sdkwork_web_core::{
    problem_response, HttpRouteManifest, ProblemCorrelation, WebFrameworkError,
    WebFrameworkErrorKind,
};
use serde::Deserialize;

include!(concat!(env!("OUT_DIR"), "/routes.rs"));

pub type MahjongMatchStore = Arc<GameMatchService<GameMatchRepositoryBackend>>;

#[derive(Debug, Deserialize, Default)]
pub struct MatchListQuery {
    page: Option<u32>,
    page_size: Option<u32>,
    status: Option<String>,
}

pub fn routes() -> Router<MahjongMatchStore> {
    Router::new()
        .route("/app/v3/api/mahjong/matches", get(list_matches))
        .route("/app/v3/api/mahjong/matches/{matchId}", get(get_match))
}

pub fn gateway_mount(store: MahjongMatchStore) -> Router {
    let router = routes().with_state(store);
    with_web_request_context(
        router,
        build_web_framework_layer(
            IamWebRequestContextResolver::new(None),
            HttpRouteManifest::new(MATCH_HTTP_ROUTES),
            sdkwork_web_bootstrap::infra_public_path_prefixes(),
        ),
    )
}

pub fn default_match_store() -> MahjongMatchStore {
    Arc::new(GameMatchService::new(GameMatchRepositoryBackend::Memory(
        InMemoryGameMatchRepository::with_seed(vec![]),
    )))
}

async fn list_matches(
    RequirePrincipal(principal): RequirePrincipal,
    State(store): State<MahjongMatchStore>,
    Query(query): Query<MatchListQuery>,
) -> Response {
    let match_query = GameMatchQuery {
        page: query.page,
        page_size: query.page_size,
        status: query.status,
    };
    match store.list_matches(principal.tenant_id(), match_query).await {
        Ok(page) => success(
            SdkWorkPageData {
                items: page.items,
                page_info: PageInfo {
                    mode: PageMode::Offset,
                    page: Some(page.page as i32),
                    page_size: Some(page.page_size as i32),
                    total_items: Some(page.total as i64),
                    total_pages: Some(page.total.div_ceil(page.page_size as u64) as i32),
                    next_cursor: None,
                    has_more: None,
                },
            },
            StatusCode::OK,
        ),
        Err(error) => map_error(error),
    }
}

async fn get_match(
    RequirePrincipal(principal): RequirePrincipal,
    State(store): State<MahjongMatchStore>,
    Path(match_id): Path<String>,
) -> Response {
    match store.get_match(principal.tenant_id(), &match_id).await {
        Ok(item) => success(SdkWorkResourceData { item }, StatusCode::OK),
        Err(error) => map_error(error),
    }
}

fn success<T: serde::Serialize>(data: T, status: StatusCode) -> Response {
    let trace_id = uuid();
    let mut response = (status, Json(SdkWorkApiResponse::success(data, trace_id.clone())))
        .into_response();
    if let Ok(value) = HeaderValue::from_str(&trace_id) {
        response
            .headers_mut()
            .insert(HeaderName::from_static("x-sdkwork-trace-id"), value);
    }
    response
}

fn map_error(error: GameError) -> Response {
    let kind = if error.code() == "not_found" {
        WebFrameworkErrorKind::NotFound
    } else {
        WebFrameworkErrorKind::BadRequest
    };
    let trace_id = uuid();
    problem_response(
        &WebFrameworkError {
            kind,
            message: error.message().to_owned(),
            retry_after_seconds: None,
        },
        ProblemCorrelation::new(None, Some(&trace_id)),
    )
}
