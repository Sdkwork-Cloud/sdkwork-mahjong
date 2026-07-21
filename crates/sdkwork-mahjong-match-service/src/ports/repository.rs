use async_trait::async_trait;

use crate::domain::models::{GameMatchItem, GameMatchPage, GameMatchQuery, GameResult};

#[async_trait]
pub trait GameMatchRepository: Send + Sync {
    async fn list_matches(
        &self,
        tenant_id: &str,
        query: &GameMatchQuery,
    ) -> GameResult<GameMatchPage>;

    async fn get_match_item(&self, tenant_id: &str, match_id: &str) -> GameResult<GameMatchItem>;
}
