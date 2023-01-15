import {defineConfig} from 'vite';
import {createHtmlPlugin} from 'vite-plugin-html';

export default defineConfig({
  server: {
    hmr: true,
    open: true,
    host: '0.0.0.0',
    port: 8080,
  },
  build: {
    copyPublicDir: false,
    minify: true,
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
