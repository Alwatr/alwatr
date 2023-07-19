import postcssAutoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssTailwind from 'tailwindcss';
import postcssNesting from 'tailwindcss/nesting/index.js';


const config = {
  plugins: [
    postcssImport,
    postcssNesting,
    postcssTailwind,
    postcssAutoprefixer,
  ],
};

export default config;
