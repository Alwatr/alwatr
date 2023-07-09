/** @type {import('tailwindcss').Config} */
export default {
  get content() {
    console.log('func');
    return ['./res/*.html', './src/**/*.ts'];
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
