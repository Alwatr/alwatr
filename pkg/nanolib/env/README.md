# @alwatr/env

A tiny and tree-shakable TypeScript library to get environment variables with type-safe and fallback value for development and production.

## Installation

```bash
npm install @alwatr/env
```

## Usage

```typescript
import {getEnv} from '@alwatr/env';

const env = getEnv({
  name: 'MY_ENV_VAR',
  defaultValue: 'default-value',
  developmentValue: 'development-value',
});

console.log(env); // Output: 'development-value' in development mode, 'default-value' if MY_ENV_VAR is not set in production mode.
```

## API

### `getEnv(option: GetEnvOption): string`

Retrieves the value of an environment variable as a string.

**Parameters:**

- `option`: An object with the following properties:
  - `name`: The name of the environment variable.
  - `defaultValue`: The default value to use if the environment variable is not set.
  - `developmentValue`: The value to use in a development environment.

**Returns:**

The value of the environment variable.

**Throws:**

An error if the environment variable is not set and no default value is provided.

### `getNumberEnv(option: GetNumberEnvOption): number`

Retrieves the numeric value of an environment variable. Validates that the resolved string or fallback value can be converted to a finite number using `@alwatr/is-number`.

**Parameters:**

- `option`: An object with the following properties:
  - `name`: The name of the environment variable.
  - `defaultValue`: The default value (`number` or `string`) to use if the environment variable is not set.
  - `developmentValue`: The value (`number` or `string`) to use in a development environment.

**Returns:**

The parsed numeric value of the environment variable.

**Throws:**

- An error if the environment variable is not set and no default value is provided.
- An error if the resolved value cannot be converted to a finite number.

## Examples

**Basic string usage:**

```typescript
const dbUrl = getEnv({name: 'DATABASE_URL', defaultValue: 'mongodb://localhost:27017'});
```

**Numeric environment variable:**

```typescript
const port = getNumberEnv({name: 'PORT', defaultValue: 8080});
```

**Development value:**

```typescript
const apiUrl = getEnv({
  name: 'API_URL',
  defaultValue: 'https://api.example.com',
  developmentValue: 'http://localhost:3000',
});

const devPort = getNumberEnv({
  name: 'PORT',
  defaultValue: 80,
  developmentValue: 8080,
});
```

**Required environment variable:**

```typescript
const apiKey = getEnv({name: 'API_KEY'}); // Throws an error if API_KEY is not set
const maxRetries = getNumberEnv({name: 'MAX_RETRIES'}); // Throws if unset or not a valid number
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
