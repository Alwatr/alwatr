import {generateColors, palettes} from './theme-colors.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./res/*.html', './src/**/*.ts'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        ...palettes.h270,
        ...generateColors(palettes.h270),
      },
    },
  },
  plugins: [],
};
