# Tools

Generation and materialization utilities for APIs, SDKs, and database contracts.

- `mahjong_openapi_export.mjs`: materialize OpenAPI authorities from route manifests
- `mahjong_route_manifest_check.mjs`: validate route manifest metadata
- `mahjong_sdk_generate.mjs`: SDK generation and alignment checks
- `materialize_mahjong_database_contract.mjs`: regenerate database contract artifacts

Do not hand-edit generated output under `sdks/` or `database/ddl/generated/`.
