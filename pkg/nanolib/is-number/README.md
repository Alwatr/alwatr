# is-number

A lightweight, high-performance utility to check if a value is a number or can be converted to a number.

## Installation

```bash
yarn add @alwatr/is-number
# or
npm install @alwatr/is-number
```

## Usage

```typescript
import {isNumber, toNumber, isFiniteNumber} from '@alwatr/is-number';

// Check if a value is a number
isNumber(123); // true
isNumber('123'); // true
isNumber('abc'); // false

// Convert a value to a number if possible
toNumber(123); // 123
toNumber('123'); // 123
toNumber('abc'); // null

// Check if a value is a finite number (without type coercion)
isFiniteNumber(123); // true
isFiniteNumber(Infinity); // false
isFiniteNumber('123'); // false (no coercion)
```

## API

### isNumber(value: unknown): boolean

Checks if the value is a number or can be converted to a number.

### toNumber(value: unknown): number | null

Converts the value to a number if possible, otherwise returns `null`.

### isFiniteNumber(value: unknown): boolean

A cross-browser polyfill for `Number.isFinite`. Unlike the global `isFinite`,
this doesn't coerce values to numbers before checking.

## Why is this needed?

JavaScript type behavior can be confusing. This library helps to simplify number validation:

```ts
console.log(typeof '123'); // 'string'
console.log(+[]); // 0
console.log(+''); // 0
console.log(+'   '); // 0
console.log(typeof NaN); // 'number'
console.log(typeof Infinity); // 'number'
```

### isNumber Examples

#### Returns `true`

```ts
isNumber(5e3); // true
isNumber(0xff); // true
isNumber(-1.1); // true
isNumber(0); // true
isNumber(1); // true
isNumber(1.1); // true
isNumber('-1.1'); // true
isNumber('0'); // true
isNumber('0xff'); // true
isNumber('1'); // true
isNumber('1.1'); // true
isNumber('5e3'); // true
isNumber('012'); // true
isNumber(' 123 '); // true
```

#### Returns `false`

```ts
isNumber(Infinity); // false
isNumber(NaN); // false
isNumber(null); // false
isNumber(undefined); // false
isNumber(''); // false
isNumber('   '); // false
isNumber('foo'); // false
isNumber('123foo'); // false
isNumber([1]); // false
isNumber([]); // false
isNumber(function () {}); // false
isNumber({}); // false
```

### toNumber Examples

#### Returns a number

```ts
toNumber(5e3); // 5000
toNumber(0xff); // 255
toNumber(-1.1); // -1.1
toNumber(0); // 0
toNumber(1); // 1
toNumber('-1.1'); // -1.1
toNumber('0'); // 0
toNumber('0xff'); // 255
toNumber('5e3'); // 5000
toNumber(' 123 '); // 123
```

#### Returns `null`

```ts
toNumber(Infinity); // null
toNumber(NaN); // null
toNumber(null); // null
toNumber(undefined); // null
toNumber(''); // null
toNumber('   '); // null
toNumber('foo'); // null
toNumber('123foo'); // null
toNumber([1]); // null
toNumber([]); // null
toNumber(function () {}); // null
toNumber({}); // null
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
