pub mod bootstrap;
pub mod health_router;
pub mod match_router;
mod web_bootstrap;

pub mod route_manifest {
    include!(concat!(env!("OUT_DIR"), "/mahjong_http_routes.rs"));
}

pub use bootstrap::{build_match_store, build_match_store_async, build_router};
pub use health_router::mahjong_health_router;
pub use match_router::{
    app_mahjong_match_router_with_store, backend_mahjong_match_router_with_store,
    default_match_store, MahjongMatchStore,
};
pub use route_manifest::{MAHJONG_APP_HTTP_ROUTES, MAHJONG_BACKEND_HTTP_ROUTES};
pub use web_bootstrap::{
    mahjong_public_path_prefixes, with_mahjong_app_request_context,
    with_mahjong_backend_request_context,
};
