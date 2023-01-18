import {existsSync} from 'node:fs';

// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file
const config = {
  port: 8080,
  open: true,
  watch: true,
  // debug: true,
  rootDir: 'dist',
  appIndex: 'index.html',
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
