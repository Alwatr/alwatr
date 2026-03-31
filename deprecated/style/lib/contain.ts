import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin.js';

export const containTheme: Config['theme'] = {
  contain: {
    none: 'none',
    strict: 'strict',
    size: 'size',
    inlineSize: 'inline-size',
    layout: 'layout',
    style: 'style',
    paint: 'paint',
    content: 'content',
  },
};

export const containPlugin = plugin(({matchUtilities, theme}) => {
  matchUtilities(
    {
      contain: (value) => ({
        contain: value,
      }),
    },
    { values: theme('contain') },
  );
});
