import {join, dirname} from 'node:path';

import {colorTheme} from './colors.js';
import {elevationPlugin} from './elevation.js';
import {screenTheme} from './screen.js';
import {stateLayerPlugin} from './state-layer.js';
import {typographyTheme} from './typography.js';
import {zIndexTheme} from './z-index.js';

import type {Config} from 'tailwindcss';

export const tailwindConfig: Config = {
  content: [
    './res/*.html',
    './src/**/*.ts',
    join(dirname(require.resolve('@alwatr/ui-kit2')), '**/*.ts'),
  ],
  darkMode: 'media',
  theme: {
    extend: {
      ...colorTheme,
      ...typographyTheme,
      ...zIndexTheme,
      ...screenTheme,
    },
  },
  plugins: [
    elevationPlugin,
    stateLayerPlugin,
  ],
};
