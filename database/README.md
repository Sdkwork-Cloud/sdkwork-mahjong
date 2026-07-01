# Games Database

`sdkwork-database` lifecycle assets for module `games` (`game_` table prefix).

## Owner

- Team: games-platform
- Module id: `games`
- Service code: `GAMES`

## Engines

- Primary: PostgreSQL
- Dev/test: SQLite baseline parity

## Initialization state

This module is in **initialization state** for greenfield deployments:

1. **Baseline** — `database/ddl/baseline/{engine}/0001_mahjong_baseline.sql` contains the full DDL snapshot.
2. **Migrations** — `database/migrations/{engine}/` is reserved for post-GA incremental schema changes only. It is intentionally empty at initialization.
3. **Drift** — run `pnpm db:drift:check` before release.

## Commands

```bash
pnpm run db:validate
pnpm run db:materialize:contract
pnpm run db:plan
pnpm run db:init
pnpm run db:migrate
pnpm run db:seed
pnpm run db:status
pnpm run db:drift:check
```
