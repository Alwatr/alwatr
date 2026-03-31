# Alwatr TypeScript Config

This is a base TypeScript configuration for Alwatr projects.

## installation

```bash
yarn add -D @alwatr/tsconfig-base
```

## Usage

Create a `tsconfig.json` file in the root of your project:

```json
{
  "extends": "@alwatr/tsconfig-base",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
