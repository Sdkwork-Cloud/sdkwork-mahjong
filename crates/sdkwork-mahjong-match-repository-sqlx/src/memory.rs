use async_trait::async_trait;
use sdkwork_mahjong_match_service::{
    GameError, GameMatchItem, GameMatchPage, GameMatchQuery, GameMatchRepository, GameResult,
};

#[derive(Default)]
pub struct InMemoryGameMatchRepository {
    items: Vec<GameMatchItem>,
}

impl InMemoryGameMatchRepository {
    pub fn with_seed(items: Vec<GameMatchItem>) -> Self {
        Self { items }
    }
}

#[async_trait]
impl GameMatchRepository for InMemoryGameMatchRepository {
    async fn list_matches(
        &self,
        _tenant_id: &str,
        query: &GameMatchQuery,
    ) -> GameResult<GameMatchPage> {
        let filtered: Vec<GameMatchItem> = if let Some(status) = &query.status {
            self.items
                .iter()
                .filter(|item| item.status == *status)
                .cloned()
                .collect()
        } else {
            self.items.clone()
        };

        let total = filtered.len() as u64;
        let offset = query.offset() as usize;
        let limit = query.limit() as usize;
        let page_items = filtered.into_iter().skip(offset).take(limit).collect();

        Ok(GameMatchPage {
            items: page_items,
            total,
            page: query.page.unwrap_or(1),
            page_size: query.limit(),
        })
    }

    async fn get_match_item(&self, _tenant_id: &str, match_id: &str) -> GameResult<GameMatchItem> {
        self.items
            .iter()
            .find(|item| item.id == match_id)
            .cloned()
            .ok_or_else(|| GameError::not_found(format!("match {match_id} not found")))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sdkwork_mahjong_match_service::GameMatchQuery;

    #[tokio::test]
    async fn list_matches_paginates_items() {
        let repo = InMemoryGameMatchRepository::with_seed(vec![GameMatchItem {
            id: "m1".into(),
            game_code: "classic".into(),
            title: "Classic Mahjong".into(),
            summary: None,
            genre: Some("poker".into()),
            status: "published".into(),
        }]);

        let page = repo
            .list_matches("100001", &GameMatchQuery::default())
            .await
            .expect("page");

        assert_eq!(page.total, 1);
        assert_eq!(page.items[0].title, "Classic Mahjong");
    }
}
