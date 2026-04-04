# Alwatr Standard

Central package for Alwatr development standards and shareable tooling configurations.

This package is designed to host standard configurations for multiple tools in one place.

Currently available:

- TypeScript base config (previously `@alwatr/tsconfig-base`)
- Prettier config (previously `@alwatr/prettier-config`)

Planned to expand with more standards over time (for example ESLint and related tooling).

## Installation

```bash
yarn add -D @alwatr/standard
```

## Usage

Use tool-specific subpaths from this package as standards are added.

General pattern:

```text
@alwatr/standard/<tool>
```

### TypeScript

Create or update your `tsconfig.json`:

```json
{
  "extends": "@alwatr/standard/tsconfig",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

### Prettier

Add this to your `package.json`:

```json
{
  "prettier": "@alwatr/standard/prettier"
}
```

## Migration

- `@alwatr/tsconfig-base` -> `@alwatr/standard`
- `@alwatr/prettier-config` -> `@alwatr/standard/prettier`

## Sponsors

The following companies, organizations, and individuals support Alwatr Standard ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
