# resolve-url

A tiny TypeScript library to resolve URLs.

## Features

- Lightweight and fast.
- Cross-platform support.
- Written in TypeScript.
- Handles leading and trailing slashes.
- Removes empty parts.
- Replaces multiple slashes with a single slash.
- Preserves protocol slashes.

## Installation

```bash
npm install @alwatr/resolve-url
```

## Usage

```ts
import {resolveUrl} from '@alwatr/resolve-url';

console.log(resolveUrl('/', 'ali', 'v1')); // '/ali/v1'
console.log(resolveUrl('/', '/ali/', '/v1')); // '/ali/v1'
console.log(resolveUrl('[https://domain.com](https://domain.com)', 'ali', 'v1')); // https://domain.com/ali/v1
```

## API

### `resolveUrl(...parts: string[]): string`

Resolves a URL from multiple parts.

**Parameters:**

- `parts`: The parts of the URL to resolve.

**Returns:**

The resolved URL.

## Examples

```ts
resolveUrl('foo', 'bar'); // 'foo/bar'
resolveUrl('/foo', 'bar'); // '/foo/bar'
resolveUrl('/foo/', 'bar'); // '/foo/bar'
resolveUrl('/foo//', 'bar'); // '/foo/bar'
resolveUrl('/foo/', '/bar/'); // '/foo/bar'
resolveUrl('https://example.com', 'foo', 'bar'); // 'https://example.com/foo/bar'
resolveUrl('https://example.com/', '/foo/', '/bar/'); // 'https://example.com/foo/bar'
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome\! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
