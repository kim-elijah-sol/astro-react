import { framework }                   from '@imwebme/fe-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  framework.astro(),
  globalIgnores(['node_modules/', 'dist/', '.astro/']),
]);
