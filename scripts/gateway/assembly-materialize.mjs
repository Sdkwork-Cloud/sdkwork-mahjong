#!/usr/bin/env node
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = path.join(root, 'crates/sdkwork-api-mahjong-assembly/assembly-manifest.json');
if (!existsSync(manifest)) {
  throw new Error('Mahjong gateway assembly manifest is missing');
}
console.log('api:assembly:materialize preserved crates/sdkwork-api-mahjong-assembly');
