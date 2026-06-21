#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function run(command) {
  const result = spawnSync(command, { cwd: repoRoot, shell: true, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'dev':
    run('pnpm --filter sdkwork-mahjong-pc dev');
    break;
  case 'build':
    run('pnpm typecheck && cargo build --workspace --release');
    break;
  case 'test':
    run('node --test scripts/*.test.mjs tests/contract/*.test.mjs && cargo test --workspace');
    break;
  case 'check':
    run(
      'pnpm db:validate && pnpm api:check && pnpm check:pnpm-script-standard && pnpm check:pc-package-naming && pnpm typecheck && pnpm format:rust:check',
    );
    break;
  case 'clean':
    run('cargo clean');
    break;
  default:
    console.error('[sdkwork-mahjong] Usage: node scripts/sdkwork-command.mjs <dev|build|test|check|clean>');
    process.exit(1);
}
