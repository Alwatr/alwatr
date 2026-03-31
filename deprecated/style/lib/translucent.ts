import plugin from 'tailwindcss/plugin.js';

export const translucentPlugin = plugin(({addUtilities}) => {
  addUtilities({
    '@supports (backdrop-filter: blur(20px))': {
      '.translucent': {
        '--tw-bg-opacity': '0.8 !important',
        'backdrop-filter': 'saturate(180%) blur(20px)',
      },
    },
  });
});
