#!/usr/bin/env node

import {rmSync, cp} from 'node:fs';

import {createLogger} from '@alwatr/logger';
import {build} from 'esbuild';

const logger = createLogger('alwatr-pwa-build');

const banner = '/* ..:: Alwatr UI Demo ::.. */\n';
const dist = 'dist';

logger.logOther(banner);

rmSync(dist, {recursive: true, force: true});
logger.logOther('dist removed');

cp('assets', dist, {recursive: true, force: true, verbatimSymlinks: true}, ()=>logger.logOther('cp assets done'));

await build({
  entryPoints: ['src/alwatr-pwa.ts'],

  logLevel: 'debug',
  platform: 'browser',
  target: 'es2018',
  format: 'esm',

  // minify: true,
  treeShaking: true,
  sourcemap: true,
  bundle: true,
  splitting: true,
  charset: 'utf8',
  legalComments: 'none',

  outbase: 'src',
  assetNames: 'asset/[name]-[hash]',
  entryNames: '[dir]/[name]-[hash]',
  chunkNames: 'chunks/[name]-[hash]',
  outdir: dist,

  loader: {
    '.png': 'copy',
    '.jpg': 'copy',
    '.woff': 'copy',
    '.woff2': 'copy',
  },

  banner: {
    js: banner,
    css: banner,
  },
});

/*
  TODO:
  - Serve mode or use wds
  - Watch mode
  - Replace file hash in html
  - Assets hash
  - PostCSS css file
  - PostCSS lit internal styles
  - Replace alwatr version
    https://esbuild.github.io/api/#write
    https://github.com/fakundo/esbuild-plugin-replace-regex/blob/master/src/index.js#L30
*/
