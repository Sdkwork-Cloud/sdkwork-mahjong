# Repository Guidelines

<!-- SDKWORK-AGENTS-GENERATED: v1 -->

## SDKWORK Soul

Read `../sdkwork-specs/SOUL.md` before executing tasks in this root. Follow specs before memory, dictionary before context, stop on ambiguity, and evidence before completion.

## SDKWORK Standards

Canonical SDKWORK specs path from this root:

- `../sdkwork-specs/README.md`
- `../sdkwork-specs/SOUL.md`
- `../sdkwork-specs/AGENTS_SPEC.md`
- `../sdkwork-specs/CODE_STYLE_SPEC.md`
- `../sdkwork-specs/NAMING_SPEC.md`

Do not copy root standard text into this repository. If these relative paths do not resolve, stop and report the broken workspace layout.

## Application Identity

Root manifest: `sdkwork.app.config.json` (application code `mahjong`, domain `game`).

Per-surface manifests live under `apps/sdkwork-mahjong-pc/sdkwork.app.config.json` and sibling app roots when added.

## Local Dictionary Structure

- `AGENTS.md`: local agent entrypoint and relative SDKWORK spec index.
- `CLAUDE.md`, `GEMINI.md`, `CODEX.md`: tool compatibility shims pointing to `AGENTS.md`.
- `sdkwork.app.config.json`: runtime/SDK wiring for the mahjong application.
- `.sdkwork/`: source-controlled workspace metadata, skills, and plugins.
- `specs/component.spec.json`: component-local contract and verification hooks.
- `sdks/`: SDK families, route manifests, and generated SDK artifacts.
- `package.json`, `pnpm-workspace.yaml`, `Cargo.toml`: build manifests.
- Inspect first when relevant: `apis/`, `apps/`, `crates/`, `database/`, `scripts/`, `tools/`, `deployments/`.

## Documentation Canon

- [docs/README.md](docs/README.md)
- [docs/product/prd/PRD.md](docs/product/prd/PRD.md)
- [docs/architecture/tech/TECH_ARCHITECTURE.md](docs/architecture/tech/TECH_ARCHITECTURE.md)

## Spec Resolution Order

1. Read this `AGENTS.md` and any nearer component-level `AGENTS.md`.
2. Read `sdkwork.app.config.json` when present.
3. Read `specs/README.md` and `specs/component.spec.json` when present.
4. Read `.sdkwork/README.md`, `.sdkwork/skills/`, and `.sdkwork/plugins/` when relevant.
5. Read `../sdkwork-specs/README.md` and task-specific root specs.
6. Inspect implementation files only after the dictionary is clear.

## Required Specs By Task Type

- Agent/workflow: `../sdkwork-specs/SOUL.md`, `../sdkwork-specs/AGENTS_SPEC.md`, `../sdkwork-specs/SDKWORK_WORKSPACE_SPEC.md`.
- Code changes: `../sdkwork-specs/CODE_STYLE_SPEC.md`, `../sdkwork-specs/NAMING_SPEC.md`, plus the touched language/framework spec.
- Rust: `../sdkwork-specs/RUST_CODE_SPEC.md`; RPC only when touching RPC crates.
- HTTP APIs: `../sdkwork-specs/API_SPEC.md`, `../sdkwork-specs/WEB_FRAMEWORK_SPEC.md`, `../sdkwork-specs/WEB_BACKEND_SPEC.md`.
- Database: `../sdkwork-specs/DATABASE_SPEC.md`, `../sdkwork-specs/DATABASE_FRAMEWORK_SPEC.md`.
- Frontend: `../sdkwork-specs/FRONTEND_CODE_SPEC.md`, `../sdkwork-specs/APP_PC_ARCHITECTURE_SPEC.md`, `../sdkwork-specs/APP_PC_REACT_UI_SPEC.md`.
- Deployment/release: `../sdkwork-specs/DEPLOYMENT_SPEC.md`, `../sdkwork-specs/GITHUB_WORKFLOW_SPEC.md`, `../sdkwork-specs/RELEASE_SPEC.md`.

## Build, Test, and Verification

Run commands from this directory.

- `pnpm dev`: default local development (PC browser surface).
- `pnpm build`: default production build.
- `pnpm test`: repository test subset.
- `pnpm check`: static standards and policy checks.
- `pnpm verify`: merge-ready verification aggregate.
- `pnpm db:validate`: database framework standard check.
- `cargo test --workspace`: Rust workspace tests.
- `cargo fmt --all --check`: Rust formatting.

## Agent Execution Rules

Use the convention dictionary instead of broad context loading. Do not hand-edit generated SDK output. Do not replace generated SDK calls with raw HTTP. Keep changes scoped to the owning module or crate. Record verification evidence before reporting completion.

## Human Review Rules

Request human review before breaking SDKWORK standards, changing public naming, altering security/auth behavior, changing database migrations, or changing generated SDK ownership.
