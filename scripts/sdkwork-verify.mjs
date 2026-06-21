#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function run(command) {
  const result = spawnSync(command, { cwd: repoRoot, shell: true, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run('pnpm check');
run('pnpm test');
run('cargo clippy --workspace --tests -- -D warnings');
