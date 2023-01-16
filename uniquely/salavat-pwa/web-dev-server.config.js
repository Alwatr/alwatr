import {existsSync} from 'node:fs';

// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file
const config = {
  port: 8080,
  open: true,
  watch: true,
  appIndex: 'index.html',
  nodeResolve: {
    exportConditions: ['development'],
  },
  esbuildTarget: 'auto',
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: '.',
  // debug: false,
  preserveSymlinks: true,
  plugins: [],
  middleware: [(context, next) => {
    // if file not found, return app index.html
    if (!(
      context.url === '/' ||
      context.url.startsWith('/__w') ||
      existsSync(config.rootDir + context.url)
    )) {
      context.url = config.appIndex;
    }
    return next();
  }],
};

export default config;
