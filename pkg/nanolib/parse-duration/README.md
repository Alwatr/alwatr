# Parse-duration

A simple, efficient utility to parse time duration strings into milliseconds or other time units.

## Installation

```bash
npm install @alwatr/parse-duration
# or
yarn add @alwatr/parse-duration
# or
pnpm add @alwatr/parse-duration
```

## Features

- Parse duration strings (like '10s', '5m', '2h') into milliseconds
- Convert between different time units
- TypeScript support with full type safety
- Zero dependencies (except for internal Alwatr utilities)
- Optimized for performance
- Comprehensive error handling

## Usage

```js
import {parseDuration} from '@alwatr/parse-duration';

// Basic usage - parse to milliseconds
parseDuration('10s'); // 10,000 (10 seconds in milliseconds)
parseDuration('5m'); // 300,000 (5 minutes in milliseconds)
parseDuration('2h'); // 7,200,000 (2 hours in milliseconds)
parseDuration('1.5d'); // 129,600,000 (1.5 days in milliseconds)

// Accept milliseconds as input
parseDuration(5000); // 5,000 (pass through)

// Convert to different units
parseDuration('10d', 'h'); // 240 (10 days in hours)
parseDuration('1h', 'm'); // 60 (1 hour in minutes)
parseDuration('120s', 'm'); // 2 (120 seconds in minutes)
parseDuration(3600000, 'h'); // 1 (3600000 milliseconds in hours)
```

## API

### parseDuration(duration, toUnit?)

Parse a duration string or millisecond number into the specified unit (or milliseconds by default).

#### Parameters

- `duration`: `string | number` - A duration string (like '10s', '5m') or a number (treated as milliseconds)
- `toUnit`: `DurationUnit` (optional) - The unit to convert to. If omitted, returns milliseconds.

#### Returns

- `number`: The duration in the specified unit (or milliseconds if no unit specified)

#### Throws

- `Error('not_a_number')`: If the duration string doesn't contain a valid number
- `Error('invalid_unit')`: If the unit is not recognized
- `Error('invalid_format')`: If the duration format is invalid

### Supported Units

| Unit | Description | Milliseconds Equivalent |
| ---- | ----------- | ----------------------- |
| `s`  | Second      | 1,000                   |
| `m`  | Minute      | 60,000                  |
| `h`  | Hour        | 3,600,000               |
| `d`  | Day         | 86,400,000              |
| `w`  | Week        | 604,800,000             |
| `M`  | Month (30d) | 2,592,000,000           |
| `y`  | Year (365d) | 31,536,000,000          |

## TypeScript Support

```typescript
import {parseDuration, DurationUnit, Duration} from '@alwatr/parse-duration';

// Type-safe unit parameter
function waitFor(time: Duration): Promise<void> {
  const ms = parseDuration(time);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Usage
await waitFor('5s');
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
