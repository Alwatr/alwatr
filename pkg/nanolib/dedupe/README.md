# Dedupe

A package manager helper tool for debug list of defined (imported) packages in your ecosystem and prevent to duplicate import (install) multiple versions of the same package in your project (deduplicate packages).

## Example usage

```ts
import {deduplicate} from '@alwatr/dedupe';

deduplicate({name: '@alwatr/dedupe'});
```

You can use `__package_name__` to obtain automatically the version of the package if you are using @alwatr/nano-build to build your package.

```ts
definePackage({name: __package_name__});
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
