import {generateColors, palettes} from './colors.ts'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./res/*.html', './src/**/*.ts'],
  theme: {
    colors: {
      ...palettes.h270,
      ...generateColors(palettes.h270)
    },
    extend: {},
  },
  plugins: [],
};
