import type {Config} from 'tailwindcss';

export const systemFont = [
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

export const typographyTheme: Config['theme'] = {
  fontFamily: {
    vazirmatn: [
      ['"vazirmatn-vf"', '"vazirmatn"', ...systemFont],
      {
        fontFeatureSettings: '"calt" 1, "tnum" 0',
      },
    ],
    vazirmatnRd: [
      ['"vazirmatn-roundot-vf"', '"vazirmatn-roundot"', ...systemFont],
      {
        fontFeatureSettings: '"calt" 1, "tnum" 0',
      },
    ],
    system: systemFont,
    sans: systemFont,
  },

  fontSize: {
    displayLarge: [
      '57px',
      {
        lineHeight: '64px',
        letterSpacing: '-0.25px',
        fontWeight: '400',
      },
    ],
    displayMedium: [
      '45px',
      {
        lineHeight: '52px',
        letterSpacing: '0px',
        fontWeight: '400',
      },
    ],
    displaySmall: [
      '36px',
      {
        lineHeight: '44px',
        letterSpacing: '0px',
        fontWeight: '400',
      },
    ],
    headlineLarge: [
      '32px',
      {
        lineHeight: '40px',
        letterSpacing: '0px',
        fontWeight: '400',
      },
    ],
    headlineMedium: [
      '28px',
      {
        lineHeight: '36px',
        letterSpacing: '0px',
        fontWeight: '400',
      },
    ],
    headlineSmall: [
      '24px',
      {
        lineHeight: '32px',
        letterSpacing: '0px',
        fontWeight: '400',
      },
    ],
    bodyLarge: [
      '16px',
      {
        lineHeight: '24px',
        letterSpacing: '0.5px',
        fontWeight: '400',
      },
    ],
    bodyMedium: [
      '14px',
      {
        lineHeight: '20px',
        letterSpacing: '0.25px',
        fontWeight: '400',
      },
    ],
    bodySmall: [
      '12px',
      {
        lineHeight: '15px',
        letterSpacing: '0.4px',
        fontWeight: '400',
      },
    ],
    labelLarge: [
      '14px',
      {
        lineHeight: '20px',
        letterSpacing: '0.1px',
        fontWeight: '500',
      },
    ],
    labelMedium: [
      '12px',
      {
        lineHeight: '16px',
        letterSpacing: '0.5px',
        fontWeight: '500',
      },
    ],
    labelSmall: [
      '11px',
      {
        lineHeight: '16px',
        letterSpacing: '0.5px',
        fontWeight: '500',
      },
    ],
    titleLarge: [
      '22px',
      {
        lineHeight: '28px',
        letterSpacing: '0px',
        fontWeight: '400',
      },
    ],
    titleMedium: [
      '16px',
      {
        lineHeight: '24px',
        letterSpacing: '0.15px',
        fontWeight: '500',
      },
    ],
    titleSmall: [
      '14px',
      {
        lineHeight: '20px',
        letterSpacing: '0.1px',
        fontWeight: '500',
      },
    ],
  },
};
