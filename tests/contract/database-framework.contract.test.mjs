import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateDatabaseFramework } from '../../../sdkwork-specs/tools/check-database-framework-standard.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('mahjong database module satisfies DATABASE_FRAMEWORK_SPEC layout', () => {
  const result = validateDatabaseFramework(root);
  assert.equal(result.skipped, false);
  assert.equal(
    result.ok,
    true,
    result.failures?.join('\n') ?? 'database framework validation failed',
  );
});
