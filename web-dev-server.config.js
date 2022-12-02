// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file
export default {
  hostname: '0.0.0.0',
  port: 8080,
  open: true,
  watch: true,
  appIndex: 'index.html',
  nodeResolve: {
    exportConditions: ['development'],
    dedupe: true,
  },
  esbuildTarget: 'auto',
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: '.',
  // debug: false,
  preserveSymlinks: true,
  plugins: [],
  middleware: [],
};
