# ECMAScript Nano Libs

This repository contains numerous small utility packages. These packages serve various useful purposes and are written in nano ESModule without any dependencies.

Here is a brief overview of the included libraries:

1. [`tsconfig-base`](./packages/tsconfig-base#readme): This is a foundational TypeScript configuration used for Alwatr projects.
2. [`flat-string`](./packages/flat-string#readme): The `flat-string` function flattens the underlying C structures of a concatenated JavaScript string.
3. [`global-this`](./packages/global-this#readme): This TypeScript module provides a cross-platform alternative to `globalThis` named `globalScope`. This object works across different environments, including browsers (`window`), Node.js (`global`), and Web Workers (`self`).
4. [`platform-info`](./packages/platform-info#readme): This module offers a method to identify the current platform where the script is being executed. It defines a `platformInfo` constant that contains details about the current platform.
5. [`prettier-config`](./packages/prettier-config#readme): These are Alwatr's shared configurations for Prettier.
6. [`eslint-config`](./packages/eslint-config#readme): This is Alwatr's ECMAScript Style Guide presented as shareable ESLint configurations.
7. [`deep-clone`](./packages/deep-clone#readme): This function allows you to clone deeply nested objects and arrays in JavaScript.
8. [`nano-build`](./packages/nano-build#readme): This is a tool for building/bundling ECMAScript, TypeScript, and JavaScript libraries. It's user-friendly, requires no setup, follows best practices, has no dependencies, and uses esbuild for improved performance.
9. [`type-helper`](./packages/type-helper#readme): Collection of useful typescript type helpers.
10. [`wait`](./packages/wait#readme): Comprehensive toolkit for managing asynchronous operations.
11. [`exit-hook`](./packages/exit-hook#readme): A utility for registering exit handlers in Node.js.
12. [`flatomise`](./packages/flatomise#readme): A utility for creating promises that can be externally resolved or rejected.
13. [`async-queue`](./packages/async-queue#readme): A queue that executes async tasks in order like mutex and semaphore methodology for javascript and typescript.
14. [`node-fs`](./packages/node-fs#readme): Enhanced file system operations in Node.js, including reading, writing, and handling JSON files, with both synchronous and asynchronous options.
15. [`is-number`](./packages/is-number#readme): A simple utility to check if a value is a number.
16. [`parse-duration`](./packages/parse-duration#readme): A simple utility to parse a duration string into milliseconds number.
17. [`local-storage`](./packages/local-storage#readme): `localJsonStorage` is a utility object in our TypeScript package that provides methods for interacting with the local storage in a structured and versioned manner.
18. [`polyfill-has-own`](./packages/polyfill-has-own#readme): A polyfill for `Object.hasOwn`.
19. [`fetch`](./packages/fetch/README.md): Enhanced fetch API with cache strategy, retry pattern, timeout, helper methods and enhanced types.

For more detailed information and guidelines on how to use each package, please refer to each package's README.

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
