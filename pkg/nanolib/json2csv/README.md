# @alwatr/json2csv

A tiny, efficient, and cross-platform JSON to CSV converter.

## Features

- **Lightweight**: Minimal footprint, zero dependencies (except type helpers).
- **Fast**: Optimized for performance using array mapping and joining.
- **Flexible**: Custom delimiters, optional headers, and value replacement support.
- **Robust**: Handles escaped characters, nested objects, and arrays correctly.
- **Type-Safe**: Written in TypeScript with full type definitions.

## Installation

```bash
yarn add @alwatr/json2csv
```

## Usage

```typescript
import {jsonToCsv} from '@alwatr/json2csv';

const data = [
  {name: 'Ali', age: 30, city: 'Tehran'},
  {name: 'John', age: 25, city: 'New York'},
];

const csv = jsonToCsv(data);
console.log(csv);
/*
name,age,city
Ali,30,Tehran
John,25,New York
*/
```

### options

You can customize the output using optional parameters:

```typescript
const csv = jsonToCsv(
  data, // Data array
  ';', // Custom delimiter (default: ',')
  false, // Include headers (default: true)
);
```

## API

### `jsonToCsv(jsonData, delimiter?, includeHeaders?, replacer?)`

Converts a JSON array of objects to a CSV string.

- **`jsonData`**: `Array<object>` - The array of objects to convert.
- **`delimiter`**: `string` - The character to separate fields (default: `,`).
- **`includeHeaders`**: `boolean` - Whether to include the header row (default: `true`).
- **`replacer`**: `(key: string, value: any) => any` - A function that transforms the result, similar to `JSON.stringify`.

**Returns**: `string` - The generated CSV string.

## License

MPL-2.0
