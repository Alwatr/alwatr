import {animationTheme} from './lib/animation.js';
import {colorTheme, colorPlugin} from './lib/color-scheme.js';
import {containPlugin, containTheme} from './lib/contain.js';
import {directionPlugin} from './lib/direction.js';
import {elevationPlugin} from './lib/elevation.js';
import {safeAreaPlugin} from './lib/safe-area.js';
import {screenTheme} from './lib/screen.js';
import {stateLayerPlugin} from './lib/state-layer.js';
import {translucentPlugin} from './lib/translucent.js';
import {typographyTheme} from './lib/typography.js';
import {zIndexTheme} from './lib/z-index.js';

import type {Config} from 'tailwindcss';

export const tailwindConfig: Omit<Config, 'content'> = {
  darkMode: 'media',
  theme: {
    extend: {
      ...colorTheme,
      ...typographyTheme,
      ...zIndexTheme,
      ...screenTheme,
      ...animationTheme,
      ...containTheme,
    },
  },
  plugins: [
    colorPlugin,
    elevationPlugin,
    stateLayerPlugin,
    translucentPlugin,
    safeAreaPlugin,
    directionPlugin,
    containPlugin,
  ],
};
