# Nano Build

Lightweight, zero-config Bun-based build CLI for JavaScript, TypeScript, and ECMAScript libraries. Provides sensible defaults and preset configurations for different project types without complex setup.

## Features

- **Bun-powered**: Leverages Bun's fast JavaScript runtime and bundler
- **Zero config**: Works out of the box with sensible defaults
- **Preset configurations**: Optimized setups for common project types
- **Development & production modes**: Automatic configuration switching based on `NODE_ENV`
- **Watch mode support**: Real-time rebuilding during development
- **Shell-based**: Pure bash implementation, no Node.js runtime required
- **Zero dependencies**: No external libraries, just Bun

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

## CLI Usage

### Basic Syntax

```bash
nano-build [flags] <entry-points>
```

### Flags

- `--preset=<name>` — Select a build preset (default: none)
- `--outdir=<path>` — Output directory (default: `dist`)
- `--watch` — Enable watch mode for development
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

Automatic when `NODE_ENV` is not set to `production`:

- Inline sourcemaps for easier debugging
- Preserves variable and function names
- Disables minification

**Enable explicitly:**

```bash
NODE_ENV=development nano-build --preset=module src/main.ts
```

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
