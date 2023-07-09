import color from './color.ts'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./res/*.html', './src/**/*.ts'],
  theme: {
    extend: {},
    colors: color
  },
  plugins: [],
};
