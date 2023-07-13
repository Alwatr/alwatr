import {colors} from './theme-colors.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./res/*.html', './src/**/*.ts'],
  darkMode: 'media',
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
