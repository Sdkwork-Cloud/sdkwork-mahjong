# Games Database

`sdkwork-database` lifecycle assets for module `games` (`game_` table prefix).

## Owner

- Team: games-platform
- Module id: `games`
- Service code: `GAMES`

## Engines

- Primary: PostgreSQL
- Dev/test: SQLite baseline parity

## Commands

```bash
pnpm db:validate
pnpm db:materialize:contract
pnpm db:plan
pnpm db:bootstrap
pnpm db:migrate
pnpm db:seed
pnpm db:drift:check
```

## Verification

Run `pnpm db:validate` after changing contract, baseline DDL, migrations, or seed manifests.
