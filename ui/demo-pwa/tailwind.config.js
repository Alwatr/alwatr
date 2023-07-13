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
          '57px',
          {
            lineHeight: '64px',
            letterSpacing: '-0.25px',
            fontWeight: '400px',
          },
        ],
        displayMedium: [
          '45px',
          {
            lineHeight: '52px',
            letterSpacing: '0px',
            fontWeight: '400px',
          },
        ],
        displaySmall: [
          '36px',
          {
            lineHeight: '44px',
            letterSpacing: '0px',
            fontWeight: '400px',
          },
        ],
        headlineLarge: [
          '32px',
          {
            lineHeight: '40px',
            letterSpacing: '0px',
            fontWeight: '400px',
          },
        ],
        headlineMedium: [
          '28px',
          {
            lineHeight: '36px',
            letterSpacing: '0px',
            fontWeight: '400px',
          },
        ],
        headlineSmall: [
          '24px',
          {
            lineHeight: '32px',
            letterSpacing: '0px',
            fontWeight: '400px',
          },
        ],
        bodyLarge: [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0.5px',
            fontWeight: '400px',
          },
        ],
        bodyMedium: [
          '14px',
          {
            lineHeight: '20px',
            letterSpacing: '0.25px',
            fontWeight: '400px',
          },
        ],
        bodySmall: [
          '12px',
          {
            lineHeight: '15px',
            letterSpacing: '0.4px',
            fontWeight: '400px',
          },
        ],
        labelLarge: [
          '14px',
          {
            lineHeight: '20px',
            letterSpacing: '0.1px',
            fontWeight: '500px',
          },
        ],
        labelMedium: [
          '12px',
          {
            lineHeight: '16px',
            letterSpacing: '0.5px',
            fontWeight: '500px',
          },
        ],
        labelSmall: [
          '11px',
          {
            lineHeight: '16px',
            letterSpacing: '0.5px',
            fontWeight: '500px',
          },
        ],
        titleLarge: [
          '22px',
          {
            lineHeight: '28px',
            letterSpacing: '0px',
            fontWeight: '400px',
          },
        ],
        titleMedium: [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0.15px',
            fontWeight: '500px',
          },
        ],
        titleSmall: [
          '14px',
          {
            lineHeight: '20px',
            letterSpacing: '0.1px',
            fontWeight: '500px',
          },
        ],
      },
    },
  },
  plugins: [],
};
