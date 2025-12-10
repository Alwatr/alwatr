# JSON to CSV

...

## Installation

```bash
npm install @alwatr/json2csv
```

```bash
yarn add @alwatr/json2csv
```

## Usage

```ts
import {jsonToCsv} from '@alwatr/json2csv';

const csv = jsonToCsv([
  {name: 'Ali', age: 30},
  {name: 'Mahdi', age: 25},
]);

console.log(csv);

// Output:
// name,age
// Ali,30
// Mahdi,25
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
