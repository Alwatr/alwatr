import {getBabelOutputPlugin} from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {copy} from '@web/rollup-plugin-copy';
import {rollupPluginHTML} from '@web/rollup-plugin-html';
import {polyfillsLoader} from '@web/rollup-plugin-polyfills-loader';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import {generateSW} from 'rollup-plugin-workbox';

import {workboxConfig} from './workbox-config.js';

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
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    // Inject polyfills into HTML (core-js, regenerator-runtime, web-components,
    // lit/polyfill-support) and dynamically loads modern vs. legacy builds
    polyfillsLoader({
      modernOutput: {
        name: 'modern',
      },
      // Feature detection for loading legacy bundles
      legacyOutput: {
        name: 'legacy',
        test: '!!Array.prototype.flat',
        type: 'systemjs',
      },
      // List of polyfills to inject (each has individual feature detection)
      polyfills: {
        hash: true,
        coreJs: true,
        regeneratorRuntime: true,
        fetch: true,
        webcomponents: true,
        // Custom configuration for loading Lit's polyfill-support module,
        // required for interfacing with the web-components polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: '../../node_modules/lit/polyfill-support.js',
            test: '!(\'attachShadow\' in Element.prototype)',
            module: false,
          },
        ],
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
  output: [
    {
      // Modern JS bundles (no JS compilation, ES module output)
      format: 'esm',
      chunkFileNames: '[name]-[hash].js',
      entryFileNames: '[name]-[hash].js',
      dir: 'dist',
      plugins: [htmlPlugin.api.addOutput('modern')],
    },
    {
      // Legacy JS bundles (ES5 compilation and SystemJS module output)
      format: 'esm',
      chunkFileNames: 'legacy-[name]-[hash].js',
      entryFileNames: 'legacy-[name]-[hash].js',
      dir: 'dist',
      plugins: [
        htmlPlugin.api.addOutput('legacy'),
        // Uses babel to compile JS to ES5 and modules to SystemJS
        getBabelOutputPlugin({
          compact: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: '11',
                },
                modules: 'systemjs',
              },
            ],
          ],
        }),
      ],
    },
  ],
  preserveEntrySignatures: false,
};

export default options;
