import {rollupPluginHTML} from '@web/rollup-plugin-html';
import {polyfillsLoader} from '@web/rollup-plugin-polyfills-loader';
import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { copy } from '@web/rollup-plugin-copy';

function onwarn(warning) {
  if (warning.code !== 'THIS_IS_UNDEFINED') {
    console.error(`(!) ${warning.message}`);
  }
}

// Configure an instance of @web/rollup-plugin-html
const htmlPlugin = rollupPluginHTML({
  rootDir: './',
  extractAssets: true,
});

export default {
  input: 'index.html',
  onwarn,
  treeshake: true,
  plugins: [
    htmlPlugin,

    resolve(), // Resolve bare module specifiers to relative paths

    minifyHTML(), // Minify HTML template literals

    terser({ // Minify JS
      ecma: 2020,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),

    polyfillsLoader({
      modernOutput: {
        name: 'modern',
        type: 'module',
      },
      // Feature detection for loading legacy bundles
      legacyOutput: {
        name: 'legacy',
        test: '!Array.prototype.flat',
        type: 'systemjs',
      },
      // List of polyfills to inject (each has individual feature detection)
      polyfills: {
        hash: true,
        coreJs: true,
        regeneratorRuntime: true,
        // fetch: true,
        webcomponents: true,
        // Custom configuration for loading Lit's polyfill-support module,
        // required for interfacing with the webcomponents polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          },
        ],
      },
    }),

    summary({ showMinifiedSize: false }), // Print bundle summary

    copy({
      patterns: ['localization/**/*'],
    }),
  ],

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

  preserveEntrySignatures: false, // https://rollupjs.org/guide/en/#preserveentrysignatures
};
