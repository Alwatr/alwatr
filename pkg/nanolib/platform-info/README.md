# Platform Info

This module provides a way to detect the current platform where the script is running. It defines a constant `platformInfo` which holds the information about the current platform.

## PlatformInfo Object

The `platformInfo` constant object has the following properties:

- `name`: The name of the current platform. It can be 'browser', 'node', 'semi-node', or 'unknown'.
- `development`: A boolean indicating whether the NODE_ENV environment variable is not set to `production` or in browser location.hostname is `localhost` or `127.xxx`.
- `isNode`: A boolean indicating whether the current platform is node.js.
- `isBrowser`: A boolean indicating whether the current platform is a browser.
- `isWebWorker`: A boolean indicating whether the current platform is a web worker.
- `isDeno`: A boolean indicating whether the current platform is Deno.
- `isNw`: A boolean indicating whether the current platform is nw.js.
- `isElectron`: A boolean indicating whether the current platform is Electron.

## Development Mode Detection

The code also checks whether the script is running in development mode. If the script is running in a browser, it checks if the hostname is 'localhost' or `127.xxx`. If the script is running in a 'semi-node' environment, it checks if the NODE_ENV environment variable is not set to 'production'. The result is stored in the `development` property of the `platformInfo` object.

## Installation

```bash
yarn add @alwatr/platform-info
```

## Usage

```typescript
import {platformInfo} from '@alwatr/platform-info';

console.log(platformInfo.name); // 'browser' | 'node' | 'semi-node' | 'unknown'
console.log(platformInfo.development); // true | false
console.log(platformInfo.isNode); // true | false
console.log(platformInfo.isBrowser); // true | false
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
