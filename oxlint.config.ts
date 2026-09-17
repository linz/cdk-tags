import base from '@linzjs/style/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base],

  rules: {
    // oxlint-tsgolint fails to resolve Node.js builtins (e.g. child_process, process.env),
    // reporting them as `error` typed even though `tsc` type-checks them cleanly.
    'typescript/no-unsafe-argument': 'off',
    'typescript/no-unsafe-assignment': 'off',
    'typescript/no-unsafe-call': 'off',
    'typescript/no-unsafe-member-access': 'off',
  },

  overrides: [
    {
      // Disable no floating promises in tests until https://github.com/nodejs/node/issues/51292 is solved
      files: ['**/*.test.ts'],
      rules: {
        'typescript/no-floating-promises': 'off',
      },
    },
  ],
});
