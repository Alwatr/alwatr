import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {copy} from '@web/rollup-plugin-copy';
import {rollupPluginHTML} from '@web/rollup-plugin-html';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import {generateSW} from 'rollup-plugin-workbox';

import {workboxConfig} from './workbox.config.js';

function onwarn(warning) {
  if (warning.code !== 'THIS_IS_UNDEFINED') {
    console.error(`(!) ${warning.message}`);
  }
}

// Configure an instance of @web/rollup-plugin-html
const htmlPlugin = rollupPluginHTML({
  rootDir: './',
  flattenOutput: false,
  serviceWorkerPath: 'dist/sw.js',
  injectServiceWorker: true,
  extractAssets: true,
});

/** @type {import('rollup').RollupOptions} */
const options = {
  // Entry point for application build; can specify a glob to build multiple
  // HTML files for non-SPA app
  input: 'index.html',
  onwarn,
  treeshake: true,
  plugins: [
    htmlPlugin,
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    minifyHTML.default({
      failOnError: true,
    }),
    // Minify JS
    terser({
      ecma: 2019,
      module: true,
      warnings: true,
      format: {
        comments: false,
      },
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    // Print bundle summary
    summary({
      showBrotliSize: true,
      showGzippedSize: true,
    }),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ['image/**/*', 'l10n/**/*', 'robots.txt'],
    }),
    generateSW(workboxConfig, ({swDest, count, size}) => console.log('📦', swDest, '#️⃣ ', count, '🐘', size)),
  ],
  // Specifies two JS output configurations, modern and legacy, which the HTML plugin will
  // automatically choose between; the legacy build is compiled to ES5
  // and SystemJS modules
  output: {
    format: 'esm',
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    dir: 'dist',
  },
  preserveEntrySignatures: false,
};

export default options;
