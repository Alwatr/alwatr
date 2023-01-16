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

cp('assets', dist, {recursive: true, force: true}, ()=>logger.logOther('cp assets done'));

await build({
  entryPoints: ['./src/alwatr-pwa.ts'],

  logLevel: 'debug',
  platform: 'browser',
  target: 'es2018',
  format: 'esm',

  bundle: true,
  treeShaking: true,
  minify: true,
  sourcemap: true,

  outdir: dist,

  // external: [],

  banner: {
    js: banner,
    css: banner,
  },
});
