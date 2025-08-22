# Flat String

This function simplifies the complex C structures that are part of a combined JavaScript string.

If you're frequently combining strings and then using that combined string somewhere else, you might discover that running your string through `flatString` significantly enhances performance.

In simpler terms, `flatString` is a function that optimizes the way strings are stored in memory in JavaScript. When you concatenate strings, JavaScript internally creates a complex structure to save memory. However, when you need to use this string, for example, to write it to a file or send it over the network, this complex structure needs to be flattened, which can take time. By using `flatString`, you flatten the string right after concatenation, making the subsequent use of the string faster.

## Installation

```bash
yarn add @alwatr/flat-string
```

## Usage

```typescript
import {flatString} from '@alwatr/flat-string';

myStr = flatString(myStr);
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.


