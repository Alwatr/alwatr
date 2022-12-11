import {build} from 'esbuild';

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  logLevel: 'debug',
  minify: true,
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  outdir: 'dist',
  banner: {
    js: 'import { createRequire } from \'module\';const require = createRequire(import.meta.url);',
  },
});
