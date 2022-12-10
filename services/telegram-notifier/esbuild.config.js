import {build} from "esbuild"

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  logLevel: "info",
  minify: true,
  format: "esm",
  target: "esnext",
  platform: "node",
  outfile: 'dist/index.js',
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  },
})
