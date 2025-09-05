# @alwatr/iranian-national-code-validator

**A tiny, zero-dependency TypeScript library to validate an Iranian National Code (Code Melli).**

This package provides a single, highly-optimized function to check the validity of an Iranian National Code based on the official algorithm. It's designed to be lightweight, fast, and easy to use in any JavaScript or TypeScript project.

## Why this package?

When you need to validate an Iranian National Code, you want a solution that is reliable, small, and does one thing well. This package is built to provide exactly that without adding unnecessary bloat to your project.

- **Simple & Focused:** A single function `isValidIranianNationalCode` is all you need to learn.
- **Lightweight:** Tiny footprint with zero runtime dependencies.
- **Reliable:** Implements the official validation algorithm.
- **Modern:** Written in TypeScript and provides both ESM and CJS modules.

## Features

- **Declarative:** A simple, pure function for easy integration.
- **Lightweight:** Tiny footprint with zero dependencies.
- **TypeScript:** Written in TypeScript with type definitions included.
- **Cross-Platform:** Works in Node.js, Deno, and modern browsers.
- **Dual-Module:** Supports both ESM (`import`) and CJS (`require`).

## Installation

```bash
# npm
npm i @alwatr/iranian-national-code-validator

# yarn
yarn add @alwatr/iranian-national-code-validator

# pnpm
pnpm i @alwatr/iranian-national-code-validator
```

## Usage

Import the function and pass the national code string to it. It will return `true` if the code is valid and `false` otherwise.

### ES Module (ESM)

```typescript
// src/main.ts
import {isValidIranianNationalCode} from '@alwatr/iranian-national-code-validator';

console.log(`'0018550152' is valid: ${isValidIranianNationalCode('0018550152')}`); // true
console.log(`'0018550153' is valid: ${isValidIranianNationalCode('0018550153')}`); // false

// It also checks for the correct format (10 digits)
console.log(`'12345' is valid: ${isValidIranianNationalCode('12345')}`); // false
console.log(`'not-a-number' is valid: ${isValidIranianNationalCode('not-a-number')}`); // false
```

### CommonJS (CJS)

```javascript
// main.js
const {isValidIranianNationalCode} = require('@alwatr/iranian-national-code-validator');

console.log(`'0018550152' is valid: ${isValidIranianNationalCode('0018550152')}`); // true
console.log(`'0018550153' is valid: ${isValidIranianNationalCode('0018550153')}`); // false
```

## API Reference

### `isValidIranianNationalCode(code: string): boolean`

Validates an Iranian National Code string.

The validation is based on the official algorithm:

1. The code must be a string containing exactly 10 digits.
2. The last digit is a check digit.
3. A weighted sum of the first 9 digits is calculated.
4. The remainder of the sum divided by 11 is compared with the check digit based on a specific rule.

- **`code`**: The Iranian National Code string to validate.
- **Returns**: `true` if the national code is valid, `false` otherwise.

## Sponsors

The following companies, organizations, and individuals support `nanolib` ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
