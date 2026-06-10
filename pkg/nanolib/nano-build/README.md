# Nano Build

Lightweight, zero-config Bun-based build CLI powered by `bun build` for modern app and library bundling. Supports JavaScript/TypeScript plus Bun's built-in content loaders for CSS, JSON, TOML, YAML, HTML, text, and asset files.

## Features

- **Bun-powered**: Leverages Bun's fast JavaScript runtime and bundler
- **Zero config**: Works out of the box with sensible defaults
- **Preset configurations**: Optimized setups for common project types
- **Development & production modes**: Automatic configuration switching based on `NODE_ENV`
- **Watch mode support**: Real-time rebuilding during development
- **Broad content-type support**: Uses Bun's built-in loaders and asset handling
- **Shell-based**: Pure bash implementation, no Node.js runtime required
- **Zero dependencies**: No external libraries, just Bun

## Benchmark

`nano-build` uses Bun's native bundler, so performance characteristics follow `bun build`.

### Performance Results

Measured on a 16-inch M1 MacBook Pro using the three.js bundle benchmark:

| Bundler           |      Time |     Relative | Visualization                                                                                                                                                         |
| ----------------- | --------: | -----------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🚀 **nano-build** | **170ms** | **baseline** | \|                                                                                                                                                                    |
| esbuild           |     300ms |        1.76x | \|\|                                                                                                                                                                  |
| rspack            |     4.45s |          26x | ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                                                                                                                              |
| Parcel 2          |    26.32s |         155x | ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                                                      |
| Rollup + Terser   |    32.00s |         188x | ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒        |
| Webpack 5         |    38.02s |         224x | ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ |

**Key Takeaways:**

- **170ms** for the complete three.js bundle on modern hardware
- **1.76x faster** than esbuild
- **26x to 224x faster** than other popular bundlers
- Powered by Bun's Zig-based architecture and parallel processing

📊 Benchmark source:
<https://github.com/oven-sh/bun/tree/main/bench/bundle>

## Compile-time Constants (TypeScript)

`nano-build` injects three compile-time constants via `bun build --define`. They are declared in
`global.d.ts` as `declare const` — **not** as runtime globals on `globalThis`.

| Constant              | Type      | Value                               |
| --------------------- | --------- | ----------------------------------- |
| `DEV_MODE`            | `boolean` | `true` unless `NODE_ENV=production` |
| `__package_name__`    | `string`  | `name` field from `package.json`    |
| `__package_version__` | `string`  | `version` field from `package.json` |

The bundler replaces every occurrence of these tokens with their literal values at build time,
enabling dead code elimination. For example:

```ts
// Source
if (DEV_MODE) logger.logMethod?.('init');

// After production build (NODE_ENV=production)
// → entire if-block is removed by the bundler
```

To get TypeScript to recognise these constants, add `"@alwatr/nano-build"` to the `types` array
in your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": ["@alwatr/nano-build"],
  },
}
```

> **Note:** Do not access these via `globalThis.DEV_MODE` — they are not runtime globals.
> In unbundled contexts (e.g. `bun test`), they resolve to the literal values injected by the
> test runner or remain as-is if not replaced.

## Requirements

- [Bun](https://bun.sh) (required)
- Linux, macOS, or compatible shell environment

## Installation

Install `@alwatr/nano-build` as a development dependency:

```bash
yarn add -D @alwatr/nano-build
```

## Quick Start

Add build scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "nano-build --preset=module src/main.ts",
    "watch": "nano-build --preset=module src/main.ts --watch",
    "build:web": "nano-build --preset=web src/main.ts"
  }
}
```

Run the build:

```bash
bun run build
```

## Supported Content Types

Like the Bun runtime, the bundler supports an array of file types out of the box. The following table breaks down the bundler's set of standard loaders.

| Extensions                                            | Details                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.js` `.jsx` `.cjs` `.mjs` `.mts` `.cts` `.ts` `.tsx` | Uses Bun's built-in transpiler to parse the file and transpile TypeScript/JSX syntax to vanilla JavaScript. The bundler applies default transforms, including dead code elimination and tree shaking. Bun does not down-convert newer ECMAScript syntax, so recent syntax is preserved in output. |
| `.json`                                               | JSON files are parsed and inlined into the bundle as a JavaScript object.<br/><br/>js<br/>import pkg from "./package.json";<br/>pkg.name; // => "my-package"<br/>                                                                                                                                 |
| `.jsonc`                                              | JSON with comments. Files are parsed and inlined into the bundle as a JavaScript object.<br/><br/>js<br/>import config from "./config.jsonc";<br/>config.name; // => "my-config"<br/>                                                                                                             |
| `.toml`                                               | TOML files are parsed and inlined into the bundle as a JavaScript object.<br/><br/>js<br/>import config from "./bunfig.toml";<br/>config.logLevel; // => "debug"<br/>                                                                                                                             |
| `.yaml` `.yml`                                        | YAML files are parsed and inlined into the bundle as a JavaScript object.<br/><br/>js<br/>import config from "./config.yaml";<br/>config.name; // => "my-app"<br/>                                                                                                                                |
| `.txt`                                                | The contents of the text file are read and inlined into the bundle as a string.<br/><br/>js<br/>import contents from "./file.txt";<br/>console.log(contents); // => "Hello, world!"<br/>                                                                                                          |
| `.html`                                               | HTML files are processed and any referenced assets (scripts, stylesheets, images) are bundled.                                                                                                                                                                                                    |
| `.css`                                                | CSS files are bundled together into a single `.css` file in the output directory.                                                                                                                                                                                                                 |
| `.node` `.wasm`                                       | These files are supported by the Bun runtime, but during bundling they are treated as assets.                                                                                                                                                                                                     |

If the bundler encounters an import with an unrecognized extension, the file is treated as an asset, copied to `outdir`, and the import is resolved to the emitted file path.

Refer to Bun docs for full loader and file-type details:

- <https://bun.com/docs/bundler#content-types>
- <https://bun.com/docs/bundler/loaders>

## CLI Usage

### Basic Syntax

```bash
nano-build [flags] <entry-points>
```

### Flags

- `--preset=<name>` — Select a build preset (default: none)
- `--outdir=<path>` — Output directory (default: `dist`)
- `--watch` — Enable watch mode for development
- `--debug` — Force development-style build (disable minify, enable sourcemaps regardless of `NODE_ENV`)
- `--help, -h` — Show help message

All other flags are forwarded to `bun build`.

### Help

```bash
nano-build --help
```

## Presets

Presets are predefined configurations optimized for specific use cases. Use the `--preset` flag to select one.

### `module`

For building library modules targeting Node.js with ESM format.

**Configuration:**

- Entry points: `src/main.ts`
- Platform: `node`
- Format: `esm`
- Bundled: Yes
- External packages: Yes
- Minified: Yes
- Sourcemap: Linked (dev mode)

**Example:**

```bash
nano-build --preset=module src/main.ts
nano-build --preset=module src/*.ts
```

### `web`

For building browser-ready bundles and web applications.

**Configuration:**

- Platform: `browser`
- Bundled: Yes (all dependencies included)
- Minified: Yes
- Sourcemap: Linked (only in dev mode)

**Example:**

```bash
nano-build --preset=web src/main.ts
nano-build --preset=web --watch src/*.ts  # Watch mode
```

### `node-service`

For building bundled Node.js services and backend applications.

**Configuration:**

- Platform: `node`
- Format: `esm`
- Bundled: Yes (all dependencies included)
- Minified: Yes
- Sourcemap: Linked (only in dev mode)

**Example:**

```bash
nano-build --preset=node-service src/main.ts
NODE_ENV=production nano-build --preset=node-service src/main.ts
```

### `bun-service`

For building optimized Bun services and backend applications.

**Configuration:**

- Platform: `bun`
- Format: `esm`
- Bundled: Yes (all dependencies included)
- Minified: Yes
- Sourcemap: Linked (only in dev mode)

**Example:**

```bash
nano-build --preset=bun-service src/main.ts
NODE_ENV=production nano-build --preset=bun-service src/main.ts
```

## Build Modes

### Development Mode

Inline sourcemaps for easier debugging when `NODE_ENV` is not set to `production`.

### Production Mode

Automatic when `NODE_ENV=production`:

- Optimized bundle size
- Full minification
- Removes debug labels and devOnly code

**Enable explicitly:**

```bash
NODE_ENV=production nano-build --preset=module src/main.ts
```

## Configuration

### Package.json Overrides

Override build configuration via `package.json`:

```json
{
  "nano-build": {
    "minify": false
  },
  "nano-build-development": {
    "sourcemap": true
  },
  "nano-build-production": {
    "minify": true,
    "sourcemap": false
  }
}
```

## Examples

### Build a library module

```bash
nano-build --preset=module src/main.ts
nano-build --preset=module src/*.ts
```

### Build a web application with watch mode

```bash
nano-build --preset=web src/*.ts --watch
```

### Build a Node.js service for production

```bash
NODE_ENV=production nano-build --preset=node-service src/main.ts
```

### Build a Bun service

```bash
nano-build --preset=bun-service src/main.ts
```

### Custom output directory

```bash
nano-build --preset=module src/main.ts --outdir=build
```

### Passing additional flags to bun build

```bash
nano-build --preset=module src/main.ts --define:DEBUG=false
```

## Migration from v6

Version 7 is a major rewrite with breaking changes:

- **Removed**: Node.js CommonJS CLI (`cli.cjs`)
- **Changed**: Now uses Bash shell script (`cli.sh`) wrapped around `bun build`
- **Removed dependency**: esbuild (now uses Bun's bundler)
- **Changed requirement**: Requires Bun runtime (not Node.js)
- **Simplified presets**: Removed `module2`, `module3`, `pwa`, `pmpa`, `weaver`, `microservice`
- **New presets**: `module`, `web`, `node-service`, `bun-service`

If you need Node.js compatibility, please use v6.x.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

Licensed under MPL-2.0. See [LICENSE](LICENSE) for details.
