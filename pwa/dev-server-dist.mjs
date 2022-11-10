import config from './dev-server.mjs';

export default {
  ...config,
  moduleDirs: [],
  watch: false,
  preserveSymlinks: false,
  rootDir: 'dist',
  middleware: [],
  appIndex: './dist',
};
