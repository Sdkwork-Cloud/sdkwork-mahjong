#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { joinPath } from '@sdkwork/utils';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkMode = process.argv.includes('--check');

const manifests = [
  joinPath('sdks', '_route-manifests', 'app-api', 'sdkwork-mahjong-api-server.route-manifest.json'),
  joinPath(
    'sdks',
    '_route-manifests',
    'backend-api',
    'sdkwork-mahjong-api-server.route-manifest.json',
  ),
];

for (const relativePath of manifests) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[mahjong-sdk] missing route manifest: ${relativePath}`);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const openapiAuthority = manifest.source?.openapiAuthority;
  if (openapiAuthority && !fs.existsSync(path.join(root, openapiAuthority))) {
    console.error(`[mahjong-sdk] missing OpenAPI authority: ${openapiAuthority}`);
    process.exit(1);
  }
  for (const route of manifest.routes ?? []) {
    if (route.requestContext !== 'WebRequestContext') {
      console.error(`[mahjong-sdk] ${relativePath} route missing WebRequestContext: ${route.path}`);
      process.exit(1);
    }
    if (!route.apiSurface) {
      console.error(`[mahjong-sdk] ${relativePath} route missing apiSurface: ${route.path}`);
      process.exit(1);
    }
  }
}

if (checkMode) {
  process.stdout.write('[mahjong-sdk] route manifests and SDK inputs are aligned\n');
} else {
  process.stdout.write('[mahjong-sdk] SDK generation placeholder complete\n');
}
