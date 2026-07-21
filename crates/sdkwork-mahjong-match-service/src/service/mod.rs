use sdkwork_utils_rust::id::uuid;
use sdkwork_utils_rust::string::is_blank;

use crate::domain::models::{GameError, GameMatchItem, GameMatchPage, GameMatchQuery, GameResult};
use crate::ports::repository::GameMatchRepository;

pub struct GameMatchService<R: GameMatchRepository> {
    repository: R,
}

impl<R: GameMatchRepository> GameMatchService<R> {
    pub fn new(repository: R) -> Self {
        Self { repository }
    }

    pub async fn list_matches(
        &self,
        tenant_id: &str,
        query: GameMatchQuery,
    ) -> GameResult<GameMatchPage> {
        if is_blank(Some(tenant_id)) {
            return Err(GameError::invalid("tenant_id is required"));
        }
        self.repository.list_matches(tenant_id, &query).await
    }

    pub async fn get_match(&self, tenant_id: &str, match_id: &str) -> GameResult<GameMatchItem> {
        if is_blank(Some(tenant_id)) {
            return Err(GameError::invalid("tenant_id is required"));
        }
        if is_blank(Some(match_id)) {
            return Err(GameError::invalid("match_id is required"));
        }
        self.repository.get_match_item(tenant_id, match_id).await
    }

    pub fn new_match_id() -> String {
        uuid()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::models::GameMatchQuery;

    struct EmptyRepo;

    #[async_trait::async_trait]
    impl GameMatchRepository for EmptyRepo {
        async fn list_matches(
            &self,
            _tenant_id: &str,
            query: &GameMatchQuery,
        ) -> GameResult<GameMatchPage> {
            Ok(GameMatchPage {
                items: vec![],
                total: 0,
                page: query.page.unwrap_or(1),
                page_size: query.limit(),
            })
        }

        async fn get_match_item(
            &self,
            _tenant_id: &str,
            _match_id: &str,
        ) -> GameResult<GameMatchItem> {
            Err(GameError::not_found("match not found"))
        }
    }

    #[tokio::test]
    async fn list_matches_rejects_empty_tenant() {
        let service = GameMatchService::new(EmptyRepo);
        let result = service.list_matches("", GameMatchQuery::default()).await;
        assert_eq!(result.unwrap_err().code(), "invalid");
    }

    #[test]
    fn new_match_id_is_uuid_v4() {
        let id = GameMatchService::<EmptyRepo>::new_match_id();
        assert_eq!(id.len(), 36);
    }
}
