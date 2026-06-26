use axum::Router;
use sdkwork_iam_web_adapter::{build_web_framework_layer, IamWebRequestContextResolver};
use sdkwork_web_axum::with_web_request_context;
use sdkwork_web_core::HttpRouteManifest;

include!(concat!(env!("OUT_DIR"), "/mahjong_http_routes.rs"));

pub fn mahjong_public_path_prefixes() -> Vec<String> {
    sdkwork_web_bootstrap::infra_public_path_prefixes()
}

fn default_resolver() -> IamWebRequestContextResolver {
    IamWebRequestContextResolver::new(None)
}

fn wrap_router_with_manifest(router: Router, route_manifest: HttpRouteManifest) -> Router {
    with_web_request_context(
        router,
        build_web_framework_layer(
            default_resolver(),
            route_manifest,
            mahjong_public_path_prefixes(),
        ),
    )
}

pub fn with_mahjong_app_request_context(router: Router) -> Router {
    wrap_router_with_manifest(router, HttpRouteManifest::new(MAHJONG_APP_HTTP_ROUTES))
}

pub fn with_mahjong_backend_request_context(router: Router) -> Router {
    wrap_router_with_manifest(router, HttpRouteManifest::new(MAHJONG_BACKEND_HTTP_ROUTES))
}
