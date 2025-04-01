# hash-string

A lightweight, high-performance utility for generating simple hash strings from input values.  
It is **non-cryptographic** but very fast and efficient. While it cannot be reversed easily and brute force attacks can take up to years for fast computers.

## Installation

```bash
yarn add @alwatr/hash-string
# or
npm install @alwatr/hash-string
```

## Usage

```typescript
import {nanoHash} from '@alwatr/hash-string';

// Hash a string with a prefix
nanoHash('test', 'prefix-');  // => 'prefix-j26j3d4'

// Hash a number
nanoHash(12345, 'num-');      // => 'num-8hu3f2l'

// Adjust complexity with repeat parameter
nanoHash('test', 'p-', 1);    // => 'p-7ba2n3y' (faster, less complex)
nanoHash('test', 'p-', 5);    // => 'p-3f72h9b' (slower, more complex)
```

## API

### nanoHash(str: string | number, prefix: string, repeat = 3): string

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

This function is designed for simple hashing needs like generating IDs or checksums. It is **non-cryptographic** but very fast and efficient. While it cannot be reversed easily and brute force attacks can take up to years for fast computers, it is still **not suitable** for security-sensitive applications or storing sensitive data. The algorithm prioritizes speed and simplicity over cryptographic strength, making it ideal for general-purpose hashing where security is not a primary concern.

For security-critical applications, use established cryptographic hash functions (like SHA-256 or Argon2) instead.

## Examples

### Basic Usage

```typescript
// Generate a hash for a string
nanoHash('hello world', 'msg-');  // => 'msg-k7f2h9d'

// Generate a hash for a number
nanoHash(42, 'id-');  // => 'id-p83b2e4'

// Same input produces the same output
nanoHash('test', 'x-') === nanoHash('test', 'x-');  // => true

// Different inputs produce different outputs
nanoHash('test1', 'x-') !== nanoHash('test2', 'x-');  // => true
```

### Controlling Complexity

```typescript
// Less complex (faster)
nanoHash('password', 'user-', 1);

// More complex (slightly slower)
nanoHash('password', 'user-', 5);
```

### Use Cases

- Generating unique IDs from content
- Creating keys for caching
- Providing shorthand identifiers
- Creating consistent but obfuscated references to data

## Implementation Details

The hashing algorithm combines two 32-bit hash functions with prime number multipliers to create a distribution with good avalanche properties. This means small changes in the input produce significantly different outputs, reducing collision probability. Though non-cryptographic, the algorithm's computational complexity makes it resistant to casual reversal attempts.

The implementation:

1. Processes each character in the input string
2. Applies bitwise operations to spread the influence of each character
3. Uses prime number multipliers to create good distribution
4. Optionally repeats the process for increased complexity
5. Converts the result to base-36 for compact representation

### DJB2 Hash Algorithm

The package includes the DJB2 hash algorithm, a fast and efficient string hashing function created by Daniel J. Bernstein:

```typescript
// Generate a numeric hash value
import {djb2Hash} from '@alwatr/hash-string';

const hashValue = djb2Hash("hello world"); // Returns a 32-bit unsigned integer
```

Key features of djb2Hash:

- Fast computation with minimal operations
- Produces consistent 32-bit unsigned integer values
- Good distribution for short to medium-length strings
- Simple implementation with right-to-left iteration for performance
- Uses prime number (5381) as the initial seed

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [AGPL-3.0 License](LICENSE).
