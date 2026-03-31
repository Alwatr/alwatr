# @alwatr/cyrb53

A modern, high-quality, and fast 53-bit string hash function.

This package provides a standalone, dependency-free implementation of the `cyrb53` algorithm, perfect for general-purpose hashing needs in modern JavaScript and TypeScript projects.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/cyrb53)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/nanolib)
[](https://www.google.com/search?q=alwatr+cyrb53)
[](https://www.google.com/search?q=alwatr+nanolib)
[](https://www.google.com/search?q=alwatr)

## Why cyrb53?

- **Excellent Collision Resistance**: With a 53-bit output space, the probability of collisions is extremely low for typical use cases.
- **High Performance**: The algorithm is designed to be fast and efficient.
- **Safe Integer Representation**: The 53-bit output fits safely within JavaScript's `Number` type (`Number.MAX_SAFE_INTEGER` is 2^53 - 1), preventing precision loss.
- **Deterministic**: The same input string will always produce the same hash output.

## Installation

```bash
yarn add @alwatr/cyrb53
```

## Usage

```typescript
import {cyrb53} from '@alwatr/cyrb53';

const myString = 'Hello, Alwatr!';
const hash = cyrb53(myString);

console.log(`The hash of "${myString}" is ${hash}`);
// Output: The hash of "Hello, Alwatr!" is 3535973453205730

// Using a seed for varied hashing
const hashWithSeed = cyrb53(myString, 123);
console.log(`The hash with seed 123 is ${hashWithSeed}`);
// Output: The hash with seed 123 is 3160286127194783
```

## API

### `cyrb53(str: string, seed: number = 0): number`

Generates a 53-bit hash from a string.

- `str: string`: The input string to be hashed.
- `seed: number = 0`: An optional numeric seed to vary the hash output. Defaults to `0`.
- **Returns**: `number` – A 53-bit hash value represented as a standard JavaScript number.

---

## Architectural Principles

This package, while simple, is designed with the same core principles of robustness and maintainability found in large-scale software systems at companies like Google.

- **Single Responsibility Principle (SRP)**: The package does one thing and does it well: hashing a string. It has no side effects and is not burdened with unrelated features.
- **Purity & Isolation**: The `cyrb53` function is a pure function. Its output depends only on its inputs, and it has no side effects. This makes it highly predictable, testable, and easy to reason about.
- **Zero Dependencies**: The package has no runtime dependencies, making it extremely lightweight, portable, and secure from supply chain vulnerabilities. It can be dropped into any project without affecting its dependency graph.

This approach of creating small, focused, and highly-tested modules is a cornerstone of building reliable and scalable software. Instead of a complex internal architecture, this utility's "architecture" is its strict adherence to being a perfect, reusable building block.

---

## Contributing

Contributions are welcome\! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the **MPL-2.0**.

---

[![Made by Alwatr](https://img.shields.io/badge/made%20by-Alwatr-7243c0.svg?style=flat-square)](https://github.com/Alwatr)
