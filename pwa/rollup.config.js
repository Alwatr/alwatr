import resolve from '@rollup/plugin-node-resolve';
// import {getBabelOutputPlugin} from '@rollup/plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';

function onwarn(warning) {
  if (warning.code !== 'THIS_IS_UNDEFINED') {
    console.error(`(!) ${warning.message}`);
  }
}

export default {
  input: 'src/alwatr-pwa.js',
  treeshake: true,
  plugins: [
    resolve(),
    minifyHTML.default(),
    terser({
      compress: true,
      ecma: 2018,
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
    summary(),
  ],
  output: [
    {
      dir: 'build',
      format: 'esm',
      entryFileNames: '[name].esm.js',
    },
    // {
    //   dir: 'build',
    //   format: 'esm',
    //   entryFileNames: '[name].es5.js',
    //   plugins: [
    //     getBabelOutputPlugin({
    //       compact: true,
    //       presets: [['@babel/preset-env', {modules: 'systemjs'}]]
    //     }),
    //   ]
    // },
  ],
};
