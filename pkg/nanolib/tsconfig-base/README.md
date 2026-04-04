# Alwatr TypeScript Config

This package is deprecated.

Please migrate to [@alwatr/standard](https://www.npmjs.com/package/@alwatr/standard), which is the new unified package for Alwatr tooling standards.

TypeScript base config is now provided from `@alwatr/standard`.

## Installation

```bash
yarn add -D @alwatr/standard
```

## Usage

Create a `tsconfig.json` file in the root of your project:

```json
{
  "extends": "@alwatr/standard",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

You can also use the explicit subpath:

```json
{
  "extends": "@alwatr/standard/tsconfig"
}
```

## Migration

- `@alwatr/tsconfig-base` -> `@alwatr/standard`

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
