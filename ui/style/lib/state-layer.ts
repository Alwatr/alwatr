import plugin from 'tailwindcss/plugin.js';
// @ts-expect-error Could not find a declaration file for module
import flattenColorPalette from 'tailwindcss/src/util/flattenColorPalette.js';

const stateOpacity = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  dragged: 0.16,
} as const;

export const stateLayerPlugin = plugin(({matchUtilities, theme}) => {
  matchUtilities(
      {
        state: (value) => {
          if (typeof value !== 'function') return null;
          const makeColor = value as unknown as (options: {opacityValue: number}) => string;
          const colors = {
            base: makeColor({opacityValue: 1}),
            hover: makeColor({opacityValue: stateOpacity.hover}),
            focus: makeColor({opacityValue: stateOpacity.focus}),
            pressed: makeColor({opacityValue: stateOpacity.pressed}),
          };
          return {
            'color': colors.base,
            '&:hover': {
              backgroundImage: `linear-gradient(${colors.hover}, ${colors.hover})`,
            },
            '&:active': {
              backgroundImage: `linear-gradient(${colors.pressed}, ${colors.pressed})`,
            },
            '&:focus:not(:hover), &:focus-within:not(:hover)': {
              'backgroundImage': `linear-gradient(${colors.focus}, ${colors.focus})`,
            },
          };
        },
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        values: (({DEFAULT: _, ...colors}) => colors)(flattenColorPalette(theme('colors'))),
        type: 'color',
      },
  );
});
