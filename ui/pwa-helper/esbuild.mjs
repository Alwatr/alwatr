#!/usr/bin/env node
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {promises as fs, existsSync} from 'node:fs';

import {createLogger} from '@alwatr/logger';
import * as esbuild from 'esbuild';
import {generateSW} from 'workbox-build';

import packageJson from './package.json' assert {type: 'json'};

const logger = createLogger('alwatr-pwa-build');
const banner = '/* ..:: Alwatr PWA ::.. */\n';

const srcDir = 'src';
const resDir = 'res';
const outDir = 'dist';
const srcFilename = 'alwatr-pwa';

const cleanMode = process.argv.includes('--clean');
const watchMode = process.argv.includes('--watch');
const debugMode = process.argv.includes('--debug');
const prettyMode = process.argv.includes('--pretty');

logger.logOther(banner);

logger.logProperty('cleanMode', cleanMode);
logger.logProperty('watchMode', watchMode);
logger.logProperty('debugMode', debugMode);
logger.logProperty('prettyMode', prettyMode);

if (cleanMode) {
  logger.logMethod('cleanDist');
  await fs.rm(outDir, {recursive: true, force: true});
}

const copyPromise = fs.cp(resDir, outDir, {recursive: true, force: true, dereference: true});

const esbuildContext = await esbuild.context({
  entryPoints: [`${srcDir}/${srcFilename}.ts`],

  logLevel: 'info',
  platform: 'browser',
  target: 'es2018',
  format: 'esm',
  conditions: debugMode ? ['development'] : undefined,

  minify: !prettyMode,
  treeShaking: true,
  sourcemap: true,
  sourcesContent: debugMode,
  bundle: true,
  splitting: true,
  charset: 'utf8',
  legalComments: 'none',
  metafile: true,

  define: {
    _ALWATR_VERSION_: `'${packageJson.pwaVersion}'`,
  },
  // drop: ['debugger'],

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

  outbase: srcDir,
  outdir: outDir,
  assetNames: 'asset/[name]-[hash]',
  // entryNames: watchMode ? '[name]' : '[dir]/[name]-[hash]',
  chunkNames: 'chunks/[name]-[hash]',
});

const esBuildPromise = esbuildContext.rebuild();

async function makeHtml() {
  logger.logMethod('makeHtml');

  let htmlContent = await fs.readFile(`${resDir}/index.html`, {encoding: 'utf-8'});

  const metafile = (await esBuildPromise).metafile;
  const outFiles = Object.keys(metafile.outputs);

  const jsFilename = outFiles
      .find((filename) => filename.includes(srcFilename) && filename.endsWith('.js'))
      .substring(outDir.length + 1);

  const cssFilename = outFiles
      .find((filename) => filename.includes(srcFilename) && filename.endsWith('.css'))
      .substring(outDir.length + 1);

  logger.logProperty('jsFilename', jsFilename);
  logger.logProperty('cssFilename', cssFilename);

  if (!existsSync(`${outDir}/${jsFilename}`)) {
    logger.error('makeHtml', 'js_filename_not_found', {jsFilename});
    throw new Error('js_filename_not_found');
  }

  if (!existsSync(`${outDir}/${cssFilename}`)) {
    logger.error('makeHtml', 'css_filename_not_found', {cssFilename});
    throw new Error('css_filename_not_found');
  }

  htmlContent = htmlContent
      .replace('alwatr-pwa.css', cssFilename)
      .replace('alwatr-pwa.js', jsFilename);

  await copyPromise; // wait to cp done
  await fs.writeFile(`${outDir}/index.html`, htmlContent, {encoding: 'utf-8', flag: 'w'});
}

async function buildServiceWorker() {
  logger.logMethod('buildServiceWorker');

  const build = await generateSW({
    swDest: `${outDir}/service-worker.js`,
    globDirectory: `${outDir}/`,
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: [
      '**/*.{js,css,json,png,svg,ico,webp,woff2,html}',
    ],
  });

  logger.logOther('serviceWorkerPath', build);
}

if (watchMode) {
  esbuildContext.watch({});
}
else {
  await makeHtml();
  esbuildContext.dispose();


  if (debugMode) {
    console.log(await esbuild.analyzeMetafile((await esBuildPromise).metafile));
  }

  await buildServiceWorker(); // makeHtml must be done first
}

/*
  TODO:
  - Input Config
  - version
  - Workbox and sw
  - Res (all assets) hash
  - PostCSS css file
  - lit css loader
  - PostCSS lit internal styles
  - Dynamic from @alwatr/build
  - sideEffects
    https://esbuild.github.io/api/#ignore-annotations
    https://webpack.js.org/guides/tree-shaking/
  - readme
    https://esbuild.github.io/api/#write
    https://github.com/fakundo/esbuild-plugin-replace-regex/blob/master/src/index.js#L30
    https://github.com/zandaqo/esbuild-plugin-lit/blob/master/css-loader.ts
    https://github.com/chialab/rna/tree/main/packages/esbuild-plugin-html
*/
