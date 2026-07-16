#!/usr/bin/env node
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = path.join(root, 'crates/sdkwork-mahjong-gateway-assembly/assembly-manifest.json');
if (!existsSync(manifest)) {
  throw new Error('Mahjong gateway assembly manifest is missing');
}
console.log('gateway:assembly:materialize preserved crates/sdkwork-mahjong-gateway-assembly');
