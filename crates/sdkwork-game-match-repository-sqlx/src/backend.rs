use async_trait::async_trait;
use sdkwork_game_match_service::{
    GameMatchItem, GameMatchPage, GameMatchQuery, GameMatchRepository, GameResult,
};

use crate::{InMemoryGameMatchRepository, SqlxGameMatchRepository};

pub enum GameMatchRepositoryBackend {
    Memory(InMemoryGameMatchRepository),
    Sqlx(Box<SqlxGameMatchRepository>),
}

#[async_trait]
impl GameMatchRepository for GameMatchRepositoryBackend {
    async fn list_matches(
        &self,
        tenant_id: &str,
        query: &GameMatchQuery,
    ) -> GameResult<GameMatchPage> {
        match self {
            Self::Memory(repository) => repository.list_matches(tenant_id, query).await,
            Self::Sqlx(repository) => repository.list_matches(tenant_id, query).await,
        }
    }

    async fn get_match_item(&self, tenant_id: &str, match_id: &str) -> GameResult<GameMatchItem> {
        match self {
            Self::Memory(repository) => repository.get_match_item(tenant_id, match_id).await,
            Self::Sqlx(repository) => repository.get_match_item(tenant_id, match_id).await,
        }
    }
}
