# @alwatr/djb2-hash

A lightweight, high-performance, and non-cryptographic hash function based on the DJB2 algorithm.

[![NPM Version](https://img.shields.io/npm/v/@alwatr/djb2-hash.svg?style=flat-square)](https://www.npmjs.com/package/@alwatr/djb2-hash)
[![NPM Downloads](https://img.shields.io/npm/dm/@alwatr/djb2-hash.svg?style=flat-square)](https://www.npmjs.com/package/@alwatr/djb2-hash)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Alwatr/nanolib/build-lint.yaml?branch=next&style=flat-square)](https://github.com/Alwatr/nanolib/actions/workflows/build-lint.yaml)
[![License](https://img.shields.io/npm/l/@alwatr/djb2-hash.svg?style=flat-square)](https://github.com/Alwatr/nanolib/blob/next/LICENSE)

This package provides a single, optimized function, `djb2Hash`, that implements the DJB2 hash algorithm created by Daniel J. Bernstein. It is designed for speed and is excellent for use cases where a fast, simple, and reliable hash is needed, such as in-memory caches, checksums, or generating unique IDs from strings.

## Installation

```bash
# yarn
yarn add @alwatr/djb2-hash

# npm
npm install @alwatr/djb2-hash
```

## Usage

The package exports a single function, `djb2Hash`.

```typescript
import {djb2Hash} from '@alwatr/djb2-hash';

// Generate a numeric hash from a string
const myHash = djb2Hash('hello world');

console.log(myHash); // Outputs: 2616892229
```

## API Reference

### `djb2Hash(str: string): number`

Generates a 32-bit unsigned integer hash from a given string.

- **`str: string`**: The input string to be hashed.
- **Returns**: `number` - A 32-bit unsigned integer representing the hash of the input string.

The function is deterministic, meaning the same input string will always produce the same output hash.

## Performance Optimizations

This implementation of `djb2Hash` includes several performance enhancements over a naive implementation, making it exceptionally fast:

1.  **Right-to-Left Iteration**: The function iterates over the string from right to left (`for (let i = str.length - 1; ...)`). This avoids repeatedly accessing the `length` property of the string in each loop iteration, which can provide a small but meaningful performance boost, especially for longer strings.
2.  **Bitwise Operations**: It uses bitwise shifting (`<< 5`) instead of multiplication (`* 33`). The expression `(hash << 5) + hash` is a faster way to compute `hash * 33`. Modern JavaScript engines are highly optimized for these low-level bitwise operations.
3.  **Unsigned Integer Output**: The final `>>> 0` operation is a zero-fill right shift, which ensures that the output is always a 32-bit unsigned integer. This provides a consistent and predictable return type.

## Security Note

`djb2Hash` is a **non-cryptographic** hash function.

It is designed for speed and simplicity, not for security. Do **not** use it for security-sensitive applications such as password hashing or digital signatures. The algorithm is not designed to be collision-resistant against malicious attacks.

For security-critical use cases, always use well-established cryptographic hash functions like **SHA-256** or **Argon2**.
