# Nano build

Build/bundle tools for ECMAScript, TypeScript, and JavaScript libraries. It's easy to use, doesn't require any setup, and adheres to best practices. It has no dependencies and uses esbuild for enhanced performance.

## Installation

First, install `@alwatr/nano-build` as a development dependency:

```bash
yarn add -D @alwatr/nano-build
```

## Usage

Add the following scripts to your `package.json` to use `@alwatr/nano-build`:

```json
{
  "scripts": {
    "build": "nano-build --preset=module",
    "watch": "yarn run build --watch"
  }
}
```

Then run the following command to build your project:

```bash
yarn run build
```

## Configuration

### TypeScript

To use `@alwatr/nano-build` in your TypeScript project, you need to configure your `tsconfig.json` file.
Below is an example configuration:

```jsonc
{
  "extends": "@alwatr/tsconfig-base/tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "emitDeclarationOnly": true,
    "composite": true,
    "types": ["@alwatr/nano-build"],
  },
  "include": ["src/**/*.ts"],
}
```

This configuration ensures that your TypeScript project is set up to use `@alwatr/nano-build` effectively, providing a streamlined build process with best practices.

### Overwriting configuration

Add 'nano-build' field to your `package.json` for overwriting configuration:

```json
{
  "nano-build": {
    "bundle": true
  },
  "nano-build-development": {
    "minify": false,
    "sourcemap": true
  },
  "nano-build-production": {
    "minify": true,
    "sourcemap": false
  }
}
```

## Presets

Presets are predefined configurations that can be used to build your project. You can use the `--preset` flag to specify a preset.

```bash
yarn run build --preset=module
```

### default

```js
{
  entryPoints: ['src/*.ts'],
  outdir: 'dist',
  logLevel: 'info',
  target: 'es2020',
  minify: true,
  minifyWhitespace: true,
  treeShaking: true,
  sourcemap: false,
  sourcesContent: false,
  bundle: true,
  charset: 'utf8',
  legalComments: 'linked',
  define: {
    __package_name__: packageJson.name,
    __package_version__: packageJson.version,
    __dev_mode__: process.env.NODE_ENV !== 'production',
  },
  banner: {
    js: "/* __package_name__ v__package_version__ */"
  },
}
```

### `--preset=module`

Builds and bundle for single export module.

```js
{
  ...defaultPreset,
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  minify: false,
  cjs: true,
  packages: 'external',
  sourcemap: true,
  sourcesContent: true
}
```

Note: default production overwrite options not applied.

### `--preset=module2`

Builds and bundles multiple entry points in root of `src` directory for multiple exports module.

```js
{
  ...defaultPreset,
  entryPoints: ['src/*.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  minify: false,
  cjs: true,
  packages: 'external',
  sourcemap: true,
  sourcesContent: true
}
```

Note: default production overwrite options not applied.

### `--preset=module3`

Builds multiple entry points in `src` directory for multiple exports module without bundling.

```js
{
  ...defaultPreset,
  entryPoints: ['src/**/*.ts'],
  bundle: false,
  platform: 'node',
  format: 'esm',
  minify: false,
  cjs: true,
  packages: 'external',
  sourcemap: true,
  sourcesContent: true
}
```

Note: default production overwrite options not applied.

### `--preset=pwa`

```js
{
  ...defaultPreset,
  entryPoints: ['site/_ts/*.ts'],
  outdir: 'dist/es',
  platform: 'browser',
  format: 'iife',
  mangleProps: '_$',
  target: [
    'es2018',
    'chrome62',
    'edge79',
    'firefox78',
    'safari11',
  ],
  ...(devMode ? developmentOverwriteOptions : productionOverwriteOptions),
}
```

### `--preset=weaver`

```js
{
  ...defaultPreset,
  entryPoints: ['src/ts/*.ts'],
  outdir: 'dist/es',
  platform: 'browser',
  format: 'iife',
  mangleProps: '_$',
  target: [
    'es2018',
    'chrome62',
    'edge79',
    'firefox78',
    'safari11',
  ],
  ...(devMode ? developmentOverwriteOptions : productionOverwriteOptions),
}
```

### `--preset=microservice`

```js
{
  ...defaultPreset,
  entryPoints: ['src/ts/main.ts'],
  platform: 'node',
  format: 'esm',
  mangleProps: '_$',
  target: 'node20',
  ...(devMode ? developmentOverwriteOptions : productionOverwriteOptions),
}
```

### `--preset=pmpa`

```js
{
  ...defaultPreset,
  entryPoints: ['site/_ts/*.ts'],
  outdir: 'dist/es',
  platform: 'browser',
  format: 'iife',
  mangleProps: '_$',
  target: [
    'es2018',
    'chrome62',
    'edge79',
    'firefox78',
    'safari11',
  ],
  ...(devMode ? developmentOverwriteOptions : productionOverwriteOptions),
}
```

### Development overwrite

This preset is used when `NODE_ENV` is not set to `production`. It overwrites all other presets.

```js
{
  sourcemap: true,
  sourcesContent: true,
}
```

you can also add `nano-build-development` field to your `package.json` for overwriting configuration.

### Production overwrite

This preset is used when `NODE_ENV` is set to `production`. It overwrites all other presets.

```js
{
  dropLabels: ['__dev_mode__'];
}
```

you can also add `nano-build-production` field to your `package.json` for overwriting configuration.

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
