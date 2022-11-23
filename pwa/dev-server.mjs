// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file

import * as fs from 'fs';

const config = {
  hostname: '0.0.0.0',
  port: 8000,
  appIndex: './',
  rootDir: '.',
  nodeResolve: true,
  moduleDirs: ['node_modules'],
  watch: true,
  preserveSymlinks: true,
  plugins: [
    // https://modern-web.dev/docs/dev-server/plugins/overview/
  ],
  middleware: [
    (context, next) => {
      // if file not found, return app index.html
      if (
        !(
          context.url === '/' ||
          context.url.startsWith('/__web-dev-server') ||
          fs.existsSync(config.rootDir + context.url)
        )
      ) {
        context.url = config.appIndex;
      }
      return next();
    },
  ],
};

export default config;
