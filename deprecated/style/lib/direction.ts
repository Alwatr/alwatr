import plugin from 'tailwindcss/plugin.js';

export const directionPlugin = plugin(({addVariant}) => {
  addVariant('r2l', ['[dir="rtl"] &', '&[dir="rtl"]']);
  addVariant('l2r', ['[dir="ltr"] &', '&[dir="ltr"]']);
});
