use async_trait::async_trait;
use sdkwork_database_sqlx::DatabasePool;
use sdkwork_mahjong_match_service::{
    GameError, GameMatchItem, GameMatchPage, GameMatchQuery, GameMatchRepository, GameResult,
};
use sdkwork_utils_rust::string::is_blank;

#[derive(Clone)]
pub struct SqlxGameMatchRepository {
    pool: DatabasePool,
}

impl SqlxGameMatchRepository {
    pub fn new(pool: DatabasePool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl GameMatchRepository for SqlxGameMatchRepository {
    async fn list_matches(
        &self,
        tenant_id: &str,
        query: &GameMatchQuery,
    ) -> GameResult<GameMatchPage> {
        if is_blank(Some(tenant_id)) {
            return Err(GameError::invalid("tenant_id is required"));
        }

        let limit = query.limit() as i64;
        let offset = query.offset() as i64;
        let status = query.status.as_deref();

        match &self.pool {
            DatabasePool::Postgres(pool, _) => {
                list_postgres(pool, tenant_id, status, limit, offset, query).await
            }
            DatabasePool::Sqlite(pool, _) => {
                list_sqlite(pool, tenant_id, status, limit, offset, query).await
            }
        }
    }

    async fn get_match_item(&self, tenant_id: &str, match_id: &str) -> GameResult<GameMatchItem> {
        if is_blank(Some(tenant_id)) {
            return Err(GameError::invalid("tenant_id is required"));
        }
        if is_blank(Some(match_id)) {
            return Err(GameError::invalid("match_id is required"));
        }

        match &self.pool {
            DatabasePool::Postgres(pool, _) => get_postgres(pool, tenant_id, match_id).await,
            DatabasePool::Sqlite(pool, _) => get_sqlite(pool, tenant_id, match_id).await,
        }
    }
}

async fn list_postgres(
    pool: &sqlx::PgPool,
    tenant_id: &str,
    status: Option<&str>,
    limit: i64,
    offset: i64,
    query: &GameMatchQuery,
) -> GameResult<GameMatchPage> {
    let rows = if let Some(status) = status {
        sqlx::query_as::<_, MatchRow>(
            "SELECT id, match_code, title, summary, mode, status FROM mj_match \
             WHERE tenant_id = $1 AND deleted_at IS NULL AND status = $2 \
             ORDER BY sort_order ASC, title ASC LIMIT $3 OFFSET $4",
        )
        .bind(tenant_id)
        .bind(status)
        .bind(limit)
        .bind(offset)
        .fetch_all(pool)
        .await
    } else {
        sqlx::query_as::<_, MatchRow>(
            "SELECT id, match_code, title, summary, mode, status FROM mj_match \
             WHERE tenant_id = $1 AND deleted_at IS NULL \
             ORDER BY sort_order ASC, title ASC LIMIT $2 OFFSET $3",
        )
        .bind(tenant_id)
        .bind(limit)
        .bind(offset)
        .fetch_all(pool)
        .await
    }
    .map_err(map_sqlx_error)?;

    let total: i64 = if let Some(status) = status {
        sqlx::query_scalar(
            "SELECT COUNT(*) FROM mj_match WHERE tenant_id = $1 AND deleted_at IS NULL AND status = $2",
        )
        .bind(tenant_id)
        .bind(status)
        .fetch_one(pool)
        .await
    } else {
        sqlx::query_scalar(
            "SELECT COUNT(*) FROM mj_match WHERE tenant_id = $1 AND deleted_at IS NULL",
        )
        .bind(tenant_id)
        .fetch_one(pool)
        .await
    }
    .map_err(map_sqlx_error)?;

    Ok(GameMatchPage {
        items: rows.into_iter().map(MatchRow::into_item).collect(),
        total: total as u64,
        page: query.page.unwrap_or(1),
        page_size: query.limit(),
    })
}

async fn get_postgres(
    pool: &sqlx::PgPool,
    tenant_id: &str,
    match_id: &str,
) -> GameResult<GameMatchItem> {
    let row = sqlx::query_as::<_, MatchRow>(
        "SELECT id, match_code, title, summary, mode, status FROM mj_match \
         WHERE tenant_id = $1 AND deleted_at IS NULL AND (id = $2 OR match_code = $2) LIMIT 1",
    )
    .bind(tenant_id)
    .bind(match_id)
    .fetch_optional(pool)
    .await
    .map_err(map_sqlx_error)?
    .ok_or_else(|| GameError::not_found(format!("match {match_id} not found")))?;

    Ok(row.into_item())
}

async fn list_sqlite(
    pool: &sqlx::SqlitePool,
    tenant_id: &str,
    status: Option<&str>,
    limit: i64,
    offset: i64,
    query: &GameMatchQuery,
) -> GameResult<GameMatchPage> {
    let rows = if let Some(status) = status {
        sqlx::query_as::<_, MatchRow>(
            "SELECT id, match_code, title, summary, mode, status FROM mj_match \
             WHERE tenant_id = ? AND deleted_at IS NULL AND status = ? \
             ORDER BY sort_order ASC, title ASC LIMIT ? OFFSET ?",
        )
        .bind(tenant_id)
        .bind(status)
        .bind(limit)
        .bind(offset)
        .fetch_all(pool)
        .await
    } else {
        sqlx::query_as::<_, MatchRow>(
            "SELECT id, match_code, title, summary, mode, status FROM mj_match \
             WHERE tenant_id = ? AND deleted_at IS NULL \
             ORDER BY sort_order ASC, title ASC LIMIT ? OFFSET ?",
        )
        .bind(tenant_id)
        .bind(limit)
        .bind(offset)
        .fetch_all(pool)
        .await
    }
    .map_err(map_sqlx_error)?;

    let total: i64 = if let Some(status) = status {
        sqlx::query_scalar(
            "SELECT COUNT(*) FROM mj_match WHERE tenant_id = ? AND deleted_at IS NULL AND status = ?",
        )
        .bind(tenant_id)
        .bind(status)
        .fetch_one(pool)
        .await
    } else {
        sqlx::query_scalar(
            "SELECT COUNT(*) FROM mj_match WHERE tenant_id = ? AND deleted_at IS NULL",
        )
        .bind(tenant_id)
        .fetch_one(pool)
        .await
    }
    .map_err(map_sqlx_error)?;

    Ok(GameMatchPage {
        items: rows.into_iter().map(MatchRow::into_item).collect(),
        total: total as u64,
        page: query.page.unwrap_or(1),
        page_size: query.limit(),
    })
}

async fn get_sqlite(
    pool: &sqlx::SqlitePool,
    tenant_id: &str,
    match_id: &str,
) -> GameResult<GameMatchItem> {
    let row = sqlx::query_as::<_, MatchRow>(
        "SELECT id, match_code, title, summary, mode, status FROM mj_match \
         WHERE tenant_id = ? AND deleted_at IS NULL AND (id = ? OR match_code = ?) LIMIT 1",
    )
    .bind(tenant_id)
    .bind(match_id)
    .bind(match_id)
    .fetch_optional(pool)
    .await
    .map_err(map_sqlx_error)?
    .ok_or_else(|| GameError::not_found(format!("match {match_id} not found")))?;

    Ok(row.into_item())
}

#[derive(sqlx::FromRow)]
struct MatchRow {
    id: String,
    match_code: String,
    title: String,
    summary: Option<String>,
    mode: Option<String>,
    status: String,
}

impl MatchRow {
    fn into_item(self) -> GameMatchItem {
        GameMatchItem {
            id: self.id,
            game_code: self.match_code,
            title: self.title,
            summary: self.summary,
            genre: self.mode,
            status: self.status,
        }
    }
}

fn map_sqlx_error(error: sqlx::Error) -> GameError {
    GameError::invalid(error.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn match_row_maps_to_domain_item() {
        let row = MatchRow {
            id: "m1".into(),
            match_code: "classic".into(),
            title: "Classic Mahjong".into(),
            summary: None,
            mode: Some("poker".into()),
            status: "published".into(),
        };
        let item = row.into_item();
        assert_eq!(item.game_code, "classic");
    }
}
