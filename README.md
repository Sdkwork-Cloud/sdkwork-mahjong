# SDKWork Mahjong

SDKWork mahjong (麻将) application root. Provides match, room, and leaderboard capabilities aligned with `../sdkwork-specs`.

## Active layout

| Path | Purpose |
| --- | --- |
| `apis/` | HTTP API contracts (open/app/backend) |
| `apps/sdkwork-mahjong-pc/` | PC browser/desktop React application root |
| `crates/` | Rust services, repositories, API server |
| `database/` | `sdkwork-database` lifecycle assets (`moduleId=mahjong`, prefix `mj_`) |
| `sdks/` | SDK families and route manifests |
| `scripts/`, `tools/` | Verification, generation, and command dispatch |
| `deployments/` | Deployment descriptors and packaging handoff |
| `configs/` | Safe runtime config templates |

## Framework integration

- **HTTP**: `sdkwork-web-framework` via `crates/sdkwork-mahjong-api-server`
- **Database**: `sdkwork-database` via `crates/sdkwork-mahjong-database-host` and `database/`
- **Utils**: `@sdkwork/utils` (TypeScript), `sdkwork-utils-rust` (Rust)
- **Discovery**: not integrated (no RPC services yet; add when split-service RPC is required)

## Commands

```bash
pnpm install
pnpm dev
pnpm verify
pnpm api:materialize
pnpm db:validate
```

See `AGENTS.md` and `../sdkwork-specs/README.md` for standards.
