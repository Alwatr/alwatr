# hash-string

A lightweight, high-performance utility for generating simple non-cryptographic hash strings from input values.

## Installation

```bash
yarn add @alwatr/hash-string
# or
npm install @alwatr/hash-string
```

## Usage

```typescript
import {hashString} from '@alwatr/hash-string';

// Hash a string with a prefix
hashString('test', 'prefix-');  // => 'prefix-j26j3d4'

// Hash a number
hashString(12345, 'num-');      // => 'num-8hu3f2l'

// Adjust complexity with repeat parameter
hashString('test', 'p-', 1);    // => 'p-7ba2n3y' (faster, less complex)
hashString('test', 'p-', 5);    // => 'p-3f72h9b' (slower, more complex)
```

## API

### hashString(str: string | number, prefix: string, repeat = 3): string

Generates a simple hash from the input string or number.

- **str**: The string or number to hash
- **prefix**: A prefix to add to the beginning of the hash result
- **repeat**: Number of times to repeat the hashing process for increased complexity (default: 3)

Returns a hashed string with the specified prefix.

## Features

- Fast and lightweight hashing algorithm
- Produces consistent hashes for the same input
- Configurable complexity via repeat parameter
- Supports prefix for categorizing hashes
- Works with strings and numbers
- Handles special characters and Unicode

## Security Note

This function is designed for simple hashing needs like generating IDs or checksums. It is **not suitable** for cryptographic purposes or security-sensitive applications. While the output cannot be easily reversed, it's not designed to resist targeted attacks.

## Examples

### Basic Usage

```typescript
// Generate a hash for a string
hashString('hello world', 'msg-');  // => 'msg-k7f2h9d'

// Generate a hash for a number
hashString(42, 'id-');  // => 'id-p83b2e4'

// Same input produces the same output
hashString('test', 'x-') === hashString('test', 'x-');  // => true

// Different inputs produce different outputs
hashString('test1', 'x-') !== hashString('test2', 'x-');  // => true
```

### Controlling Complexity

```typescript
// Less complex (faster)
hashString('password', 'user-', 1);

// More complex (slightly slower)
hashString('password', 'user-', 5);
```

### Use Cases

- Generating unique IDs from content
- Creating keys for caching
- Providing shorthand identifiers
- Creating consistent but obfuscated references to data

## Implementation Details

The hashing algorithm combines two 32-bit hash functions with prime number multipliers to create a distribution with good avalanche properties. This means small changes in the input produce significantly different outputs, reducing collision probability.

The implementation:

1. Processes each character in the input string
2. Applies bitwise operations to spread the influence of each character
3. Uses prime number multipliers to create good distribution
4. Optionally repeats the process for increased complexity
5. Converts the result to base-36 for compact representation

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [AGPL-3.0 License](LICENSE).
