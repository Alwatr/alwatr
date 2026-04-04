# Prettier Configurations

This package is deprecated.

Please migrate to [@alwatr/standard](https://www.npmjs.com/package/@alwatr/standard), which is the new unified package for Alwatr tooling standards.

Alwatr's [shareable configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations) for [Prettier](https://prettier.io/) are now provided via `@alwatr/standard/prettier`.

## Installation

```bash
yarn add -D @alwatr/standard
```

## Usage

Alwatr Prettier rules are now bundled in `@alwatr/standard/prettier`. To enable these rules, add a `prettier` property in your `package.json` file. Refer to the [Prettier configuration documentation](https://prettier.io/docs/en/configuration.html) for more information.

```json
{
  "prettier": "@alwatr/standard/prettier"
}
```

## Migration

- `@alwatr/prettier-config` -> `@alwatr/standard/prettier`

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
