#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isBlank, joinPath } from '@sdkwork/utils';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkMode = process.argv.includes('--check');

const OWNER = 'sdkwork-mahjong';
const DOMAIN = 'game';

const outputPaths = {
  appAuthority: joinPath('apis', 'app-api', 'game', 'mahjong-app-api.openapi.json'),
  backendAuthority: joinPath('apis', 'backend-api', 'game', 'mahjong-backend-api.openapi.json'),
  generatedApp: joinPath('generated', 'openapi', 'mahjong-app-api.openapi.json'),
};

const schemas = {
  SdkWorkMatchResourceResponse: {
    type: 'object',
    additionalProperties: false,
    required: ['code', 'data', 'traceId'],
    properties: {
      code: { type: 'integer', format: 'int32', const: 0 },
      data: {
        type: 'object',
        required: ['item'],
        properties: { item: { $ref: '#/components/schemas/MahjongMatchItem' } },
      },
      traceId: { type: 'string', format: 'uuid' },
    },
  },
  SdkWorkMatchPageResponse: {
    type: 'object',
    additionalProperties: false,
    required: ['code', 'data', 'traceId'],
    properties: {
      code: { type: 'integer', format: 'int32', const: 0 },
      data: {
        type: 'object',
        required: ['items', 'pageInfo'],
        properties: {
          items: { type: 'array', items: { $ref: '#/components/schemas/MahjongMatchItem' } },
          pageInfo: { type: 'object' },
        },
      },
      traceId: { type: 'string', format: 'uuid' },
    },
  },
  MahjongMatchItem: {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'matchCode', 'title', 'status'],
    properties: {
      id: { type: 'string' },
      matchCode: { type: 'string' },
      title: { type: 'string' },
      summary: { type: 'string' },
      mode: { type: 'string' },
      status: { type: 'string' },
    },
  },
};

function buildOpenApi(title, operations) {
  return {
    openapi: '3.1.2',
    info: {
      title,
      version: '0.1.0',
      'x-sdkwork-owner': OWNER,
      'x-sdkwork-domain': DOMAIN,
    },
    paths: operations,
    components: { schemas },
  };
}

const appOperations = {
  '/app/v3/api/mahjong/matches': {
    get: {
      operationId: 'mahjong.match.list',
      tags: ['mahjong'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'app-api',
      responses: { 200: { description: 'OK' } },
    },
  },
  '/app/v3/api/mahjong/matches/{matchId}': {
    get: {
      operationId: 'mahjong.match.retrieve',
      tags: ['mahjong'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'app-api',
      responses: { 200: { description: 'OK' } },
    },
  },
};

const backendOperations = {
  '/backend/v3/api/mahjong/matches': {
    get: {
      operationId: 'backend.mahjong.match.list',
      tags: ['mahjong'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'backend-api',
      responses: { 200: { description: 'OK' } },
    },
  },
};

if (isBlank(OWNER)) {
  throw new Error('owner must be non-empty');
}

const appDoc = buildOpenApi('SDKWork Mahjong App API', appOperations);
const backendDoc = buildOpenApi('SDKWork Mahjong Backend API', backendOperations);

const expected = {
  [outputPaths.appAuthority]: `${JSON.stringify(appDoc, null, 2)}\n`,
  [outputPaths.backendAuthority]: `${JSON.stringify(backendDoc, null, 2)}\n`,
  [outputPaths.generatedApp]: `${JSON.stringify(appDoc, null, 2)}\n`,
};

function assertMaterialized(relativePath, content) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[mahjong-openapi] missing materialized document: ${relativePath}`);
    process.exit(1);
  }
  const actual = fs.readFileSync(fullPath, 'utf8');
  if (actual !== content) {
    console.error(`[mahjong-openapi] stale materialized document: ${relativePath}`);
    process.exit(1);
  }
}

if (checkMode) {
  for (const [relativePath, content] of Object.entries(expected)) {
    assertMaterialized(relativePath, content);
  }
  process.stdout.write('[mahjong-openapi] materialized OpenAPI documents are aligned\n');
} else {
  for (const relativePath of Object.keys(expected)) {
    fs.mkdirSync(path.dirname(path.join(root, relativePath)), { recursive: true });
  }
  for (const [relativePath, content] of Object.entries(expected)) {
    fs.writeFileSync(path.join(root, relativePath), content);
  }
  process.stdout.write('[mahjong-openapi] exported app and backend OpenAPI documents\n');
}
