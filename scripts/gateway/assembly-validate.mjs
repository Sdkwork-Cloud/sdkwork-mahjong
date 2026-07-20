#!/usr/bin/env node
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
for (const relativePath of [
  'crates/sdkwork-api-mahjong-assembly/Cargo.toml',
  'crates/sdkwork-api-mahjong-assembly/assembly-manifest.json',
  'crates/sdkwork-api-mahjong-assembly/specs/component.spec.json',
]) {
  if (!existsSync(path.join(root, relativePath))) {
    throw new Error(`missing ${relativePath}`);
  }
}
console.log('api:assembly:validate passed for sdkwork-mahjong');
