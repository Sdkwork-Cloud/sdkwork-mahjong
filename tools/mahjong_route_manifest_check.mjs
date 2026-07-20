#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifests = [
  'sdks/_route-manifests/app-api/sdkwork-api-mahjong-standalone-gateway.route-manifest.json',
  'sdks/_route-manifests/backend-api/sdkwork-api-mahjong-standalone-gateway.route-manifest.json',
];

for (const relativePath of manifests) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[mahjong-route-manifest] missing ${relativePath}`);
    process.exit(1);
  }
}

process.stdout.write('[mahjong-route-manifest] route manifests present\n');
