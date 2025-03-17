# @alwatr/random

A lightweight, high-performance utility library for generating random numbers, strings, UUIDs and more.

## Installation

```bash
yarn add @alwatr/random
# or
npm install @alwatr/random
```

## Features

- Cross-platform (Node.js and browsers)
- TypeScript support with type safety
- Zero dependencies (except for internal package tracer)
- Uses cryptographic random when available
- Comprehensive set of random utilities
- Supports tree-shaking with individually exported functions

## Usage

```typescript
import {
  randNumber,
  randInteger,
  randFloat,
  randString,
  randStep,
  randShuffle,
  randPick,
  randUuid,
  randBoolean,
  randColor,
  randValues
} from '@alwatr/random';

// Get random number between 0 and 1
console.log(randNumber()); // 0.7124123

// Get random integer in range
console.log(randInteger(1, 10)); // 7

// Get random float in range
console.log(randFloat(1, 10)); // 7.214124

// Get random string with fixed length
console.log(randString(6)); // "A1b2C3"

// Get random string with variable length
console.log(randString(3, 6)); // "X2fg"

// Get random string with custom character set
console.log(randString(5, undefined, '01')); // "10101"

// Get random value with step
console.log(randStep(0, 10, 2)); // 0, 2, 4, 6, 8, or 10

// Shuffle an array
const array = [1, 2, 3, 4, 5];
console.log(randShuffle([...array])); // [3, 1, 5, 2, 4]

// Pick a random item from array
console.log(randPick(array)); // 3

// Generate UUID
console.log(randUuid()); // "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6"

// Generate random boolean
console.log(randBoolean()); // true or false (50% chance)
console.log(randBoolean(0.8)); // true or false (80% chance of true)

// Generate random color
console.log(randColor()); // "#a1b2c3"
```

## API

### `randNumber()`

Returns a random float between 0 and 1 (not including 1). This is a direct wrapper around `Math.random()`.

```ts
const value = randNumber(); // 0.7124123
```

### `randInteger(min, max)`

Returns a random integer between `min` and `max` (inclusive).

```ts
const value = randInteger(1, 10); // Between 1 and 10
```

### `randFloat(min, max)`

Returns a random float between `min` and `max` (max not included).

```ts
const value = randFloat(1, 10); // Between 1 and 10 (float)
```

### `randString(min, max?, chars?)`

Generates a random string with characters from the specified character set (defaults to alphanumeric set: `A-Z`, `a-z`, `0-9`).

- With one argument: Returns a string of exactly that length
- With two arguments: Returns a string with random length between min and max (inclusive)
- With three arguments: Uses the provided character set instead of the default alphanumeric set

```ts
const fixedLength = randString(6); // "A1b2C3"
const variableLength = randString(3, 6); // Random length between 3 and 6
const binaryString = randString(8, undefined, '01'); // "10110010"
const hexString = randString(6, 6, '0123456789abcdef'); // "a3f28c"
```

### `randStep(min, max, step)`

Returns a random number between `min` and `max` with the specified step.

```ts
const value = randStep(0, 10, 2); // 0, 2, 4, 6, 8, or 10
```

### `randShuffle(array)`

Shuffles an array in place using Fisher-Yates algorithm and returns it.

```ts
const array = [1, 2, 3, 4, 5];
randShuffle(array); // [3, 1, 5, 2, 4]
```

### `randPick(array)`

Returns a random element from an array.

```ts
const array = [1, 2, 3, 4, 5];
const value = randPick(array); // One random element
```

### `randUuid()`

Generates a random UUID v4. Uses `crypto.randomUUID()` when available, with a fallback implementation.

```ts
const id = randUuid(); // "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6"
```

### `randBoolean(probability?)`

Generates a random boolean with the specified probability of being true (default is 0.5).

```ts
const value = randBoolean(); // true or false (50% chance)
const mostlyTrue = randBoolean(0.8); // true or false (80% chance of true)
```

### `randColor()`

Generates a random hex color string.

```ts
const color = randColor(); // "#a1b2c3"
```

### `randValues(array)`

Fills a typed array with cryptographically secure random values if available. Falls back to Math.random if not.

```ts
const array = new Uint8Array(10);
randValues(array);
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [AGPL-3.0 License](LICENSE).
