// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file
export default {
  open: false,
  nodeResolve: true,
  watch: true,
  // appIndex: './',
  // in a monorepo you need to set set the root dir to resolve modules
  // rootDir: '.',
  // debug: false,
  hostname: '0.0.0.0',
  port: 8000,
  preserveSymlinks: true,
  plugins: [],
  middleware: [],
};
