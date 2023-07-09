import {generateColors, palettes} from './colors.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./res/*.html', './src/**/*.ts'],
  theme: {
    colors: {
      ...palettes.h300,
      ...generateColors(palettes.h300)
    },
    extend: {},
  },
  plugins: [],
};
