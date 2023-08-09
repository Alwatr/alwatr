// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file
/** @type {import('@web/dev-server').DevServerConfig} */
export default {
  hostname: '0.0.0.0',
  port: 8070,
  open: true,
  watch: true,
  // appIndex: 'index.html',
  nodeResolve: {
    exportConditions: ['development'],
  },
  // esbuildTarget: 'auto',
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: '.',
  // debug: false,
  plugins: [],
  middleware: [],
  debug: true,
};
