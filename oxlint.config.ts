import base from '@linzjs/style/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base],

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
