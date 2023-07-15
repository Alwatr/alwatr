import {colorTheme} from './colors.js';
import {typographyTheme} from './typography.js';

import type {Config} from 'tailwindcss';

export const tailwindConfig: Config = {
  content: ['./res/*.html', './src/**/*.ts'],
  darkMode: 'media',
  theme: {
    extend: {
      ...colorTheme,
      ...typographyTheme,
    },
    plugins: [],
  },
};
