#!/usr/bin/env node
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
for (const relativePath of [
  'crates/sdkwork-mahjong-gateway-assembly/Cargo.toml',
  'crates/sdkwork-mahjong-gateway-assembly/assembly-manifest.json',
  'crates/sdkwork-mahjong-gateway-assembly/specs/component.spec.json',
]) {
  if (!existsSync(path.join(root, relativePath))) {
    throw new Error(`missing ${relativePath}`);
  }
}
console.log('gateway:assembly:validate passed for sdkwork-mahjong');
