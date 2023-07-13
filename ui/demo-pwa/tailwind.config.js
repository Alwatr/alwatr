import {colors} from './theme-colors.ts';

const systemFont = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  '"Roboto"',
  '"Oxygen"',
  '"Ubuntu"',
  '"Cantarell"',
  '"Open Sans"',
  'Helvetica Neue',
  '"Arial"',
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./res/*.html', './src/**/*.ts'],
  darkMode: 'media',
  theme: {
    extend: {
      colors,
      fontFamily: {
        vazirmatn: ['"vazirmatn-vf"', '"vazirmatn"', ...systemFont],
        vazirmatnRd: ['"vazirmatn-roundot-vf"', '"vazirmatn-roundot"', ...systemFont],
        system: systemFont,
        sans: systemFont,
      },
      fontSize: {
        displayLarge: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        displayMedium: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        displaySmall: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        headlineLarge: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        headlineMedium: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        headlineSmall: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        bodyLarge: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        bodyMedium: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        bodySmall: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        labelLarge: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        labelMedium: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        labelSmall: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        titleLarge: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        titleMedium: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
        titleSmall: [
          '?px',
          {
            lineHeight: '?px',
            letterSpacing: '?px',
            fontWeight: '?px',
          },
        ],
      },
    },
  },
  plugins: [],
};
