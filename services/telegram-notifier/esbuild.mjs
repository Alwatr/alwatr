#!/usr/bin/env node

import {build} from 'esbuild';

build({
  entryPoints: ['./src/index.ts'],

  logLevel: 'debug',
  platform: 'node',
  target: 'node19',
  format: 'esm',

  bundle: true,
  treeShaking: true,
  minify: true,
  sourcemap: true,

  outdir: 'dist',
  outExtension: {
    '.js': '.mjs',
  },

  external: ['telegraf'],

  // banner: {
  //   js: 'import { createRequire } from \'module\';const require = createRequire(import.meta.url);',
  // },
});
