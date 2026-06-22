import { defineConfig } from 'vitest/config';

// The suites keep the project's home-grown filenames (test/test-*.js) rather
// than Vitest's default *.test.js, so we point `include` at them explicitly and
// exclude the shared-helpers module (it has no tests). `globals: true` makes
// Vitest's `test` available without an import; the suites' own assertions
// (eq/ok/some, in test/test-util.js) are just functions that throw on failure.
export default defineConfig({
  test: {
    globals: true,
    include: ['test/test-*.js'],
    exclude: ['**/node_modules/**', '**/dist/**', 'test/test-util.js'],
  },
});
