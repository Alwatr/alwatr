# TypeScript Type Helpers

A collection of useful TypeScript type helpers.

## Installation

```bash
yarn add -D @alwatr/type-helper
```

## Import in Your File

```typescript
import type {JSONObject} from '@alwatr/type-helper/types';
```

## Add to Global Types

To add the type helpers to your global types, update your `tsconfig.json`:

```json
{
  "extends": "@alwatr/tsconfig-base/tsconfig.json",
  "compilerOptions": {
    "types": ["node", "@alwatr/nano-build", "@alwatr/type-helper"]
  },
  "include": ["src/**/*.ts"],
  "references": [{"path": "../package-tracer"}]
}
```

## Usage Example

```typescript
const obj: JSONObject = {
  foo: 'bar',
  baz: {
    qux: 1,
    arr: [1, 2, 3],
  },
  qux: true,
};
```

Read the [source code](https://github.com/Alwatr/nanolib/tree/next/packages/type-helper/src) for more details.

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.


