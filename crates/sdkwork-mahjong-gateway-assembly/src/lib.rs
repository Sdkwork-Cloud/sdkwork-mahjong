//! Business-only gateway assembly for SDKWork Mahjong.

use sdkwork_mahjong_standalone_gateway::{
    build_match_store_async, build_router,
};

pub struct ApplicationAssembly {
    pub router: axum::Router,
}

pub async fn assemble_application_business_router() -> Result<ApplicationAssembly, String> {
    let store = build_match_store_async().await?;
    Ok(ApplicationAssembly {
        router: build_router(store),
    })
}

pub async fn assemble_application_router() -> Result<ApplicationAssembly, String> {
    assemble_application_business_router().await
}
