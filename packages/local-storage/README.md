# localJsonStorage

`localJsonStorage` is a utility object in our TypeScript package that provides methods for interacting with the local storage in a structured and versioned manner.

## Installation

Before you can use `localJsonStorage`, you need to install the package. If you're using npm, you can do this with:

```bash
npm install @alwatr/local-storage
```

If you're using Yarn, you can do this with:

```bash
yarn add @alwatr/local-storage
```

## Usage

First, you need to import `localJsonStorage` from the package:

```typescript
import {localJsonStorage} from '@alwatr/local-storage';
```

Or for CommonJS:

```javascript
const {localJsonStorage} = require('@alwatr/local-storage');
```

### Getting an Item

You can get an item from local storage and parse it as JSON using the `getItem` method. If the item is not found, it will return a default value:

```typescript
const defaultValue = {a: 1, b: 2};
const value = localJsonStorage.getItem('item-name', defaultValue);
```

### Setting an Item

You can set an item in local storage as JSON using the `setItem` method:

```typescript
const value = {a: 1, b: 2};
localJsonStorage.setItem('item-name', value);
```

### Removing an Item

You can remove an item from local storage using the `removeItem` method:

```typescript
localJsonStorage.removeItem('item-name');
```

## Future Plans

We plan to add more methods to `localJsonStorage` for directly interacting with local storage. Stay tuned for updates!

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
