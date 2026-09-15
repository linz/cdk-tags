import base from '@linzjs/style/oxfmt.config';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...base,
  // release-please owns this file's formatting; don't churn it
  ignorePatterns: [...(base.ignorePatterns ?? []), 'CHANGELOG.md'],
});
