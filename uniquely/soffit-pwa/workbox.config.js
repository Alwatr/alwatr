/** @type {import('workbox-build').GenerateSWOptions} */
export const workboxConfig = {
  swDest: 'dist/sw.js',
  globDirectory: 'dist/',
  clientsClaim: true,
  skipWaiting: true,
  globPatterns: ['**/*.{js,css,html,json,png,svg,ico,webp}'],
};
