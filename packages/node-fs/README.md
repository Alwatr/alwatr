# Node FS

Enhanced file system operations in Node.js with asynchronous queue to prevent parallel writes.

## Installation

```bash
yarn add @alwatr/node-fs
```

## Features

- Checks if a directory exists. If it doesn't, it creates the directory and all necessary subdirectories.
- Before writing a file successfully, first writes it to a temporary path (`path.tmp`).
- If a file already exists, renames and keeps the existing file at a backup path (`path.bak`).
- If a write operation fails, the original file remains unchanged.
- Includes `readJson` and `writeJson` functions that automatically parse and stringify JSON data.
- Supports both synchronous and asynchronous read/write operations.
- An asynchronous queue is used to prevent simultaneous write operations.
- Fully written in TypeScript, includes type definitions.
- Separate builds are provided for ESModule and CommonJS.
- Zero dependencies, except for the nanolib library.
- Includes a beautiful log feature, which uses the [logger](https://github.com/Alwatr/nanolib/tree/next/packages/logger) package from nanolib.

## Usage

```typescript
import {writeJson} from '@alwatr/node-fs';

const path = 'file.json';
await writeJson(path, {a: 1}); // wait to finish
writeJson(path, {a: 2}); // asynchronous write in queue
writeJson(path, {a: 3}); // asynchronous write in queue

const data = await readJson(path); // automatically wait for the queue to finish
console.log(data.a); // 3
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.


