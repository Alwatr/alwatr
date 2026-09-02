# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.1.3](https://github.com/Alwatr/alwatr/compare/v10.1.2...v10.1.3) (2026-09-02)

### 🔨 Code Refactoring

* **fetch:** standardize FetchErrorReason taxonomy and update documentation ([e9a847b](https://github.com/Alwatr/alwatr/commit/e9a847b9df5aab2e48f1fa963acf816b9f7f5e63))

## [10.1.2](https://github.com/Alwatr/alwatr/compare/v10.1.1...v10.1.2) (2026-09-01)

### 🐛 Bug Fixes

* **fetch:** remove default fetch options and refactor processOptions_ function ([2b5a45c](https://github.com/Alwatr/alwatr/commit/2b5a45c8583793ce437fab0f988c49a5b725d4fa))

## [10.1.1](https://github.com/Alwatr/alwatr/compare/v10.1.0...v10.1.1) (2026-09-01)

### 🐛 Bug Fixes

* **fetch:** improve null checks for error handling and options serialization ([f9dddee](https://github.com/Alwatr/alwatr/commit/f9dddee9083ef612be1717930f26c1b029bcc417))

## [10.1.0](https://github.com/Alwatr/alwatr/compare/v10.0.4...v10.1.0) (2026-08-30)

* **fetch:** add comprehensive tests for cache strategies and integration with Cache API ([03ff7bf](https://github.com/Alwatr/alwatr/commit/03ff7bff8a84913d73b806ce4a4a87b3761375a2))
* **fetch:** add test for respecting Retry-After header on 429 responses ([f7134aa](https://github.com/Alwatr/alwatr/commit/f7134aaee58802f62b4ce2038ebab8fb96af9a4f))
* **fetch:** enhance fetch and fetchJson tests with additional scenarios and error handling ([1fff461](https://github.com/Alwatr/alwatr/commit/1fff4615bdbe637666fe9f797345728bdc212f75))
* **fetch:** enhance fetchJson functionality and improve test coverage ([c9126e2](https://github.com/Alwatr/alwatr/commit/c9126e26e9c3da2c450a3449813d825759eda313))
* **fetch:** enhance README to clarify features and improve error handling descriptions ([25a6f56](https://github.com/Alwatr/alwatr/commit/25a6f565c9bb96cad7e0e446372e9aef1190a53b))
* **fetch:** update logging mechanism to conditionally log method arguments and errors in DEV_MODE ([8ef7609](https://github.com/Alwatr/alwatr/commit/8ef76093bccc02aa7f9ab4a03bca283d9aea5171))
* **fetch:** update module documentation for clarity and detail ([614174c](https://github.com/Alwatr/alwatr/commit/614174c796dd87b7a981394323295c630b4a5717))

### ✨ Features

* **fetch:** enhance handleTimeout_ function to improve abort handling and timeout logic ([5296e82](https://github.com/Alwatr/alwatr/commit/5296e8201fe81e550e2a14122fd8d004e1cae1a7))
* **fetch:** enhance httpStatusToErrorReason function to map additional HTTP status codes and improve error handling ([5aad2c5](https://github.com/Alwatr/alwatr/commit/5aad2c503f951a2bbe8f66ebf0dca4970ffc1f36))
* **fetch:** enhance retry mechanism to support parsing Retry-After header and improve error handling ([771df58](https://github.com/Alwatr/alwatr/commit/771df5819ca2d6995b5c2792066817d7be4be14c))
* **fetch:** enhance revalidation callback handling with delay and error logging ([6361ba9](https://github.com/Alwatr/alwatr/commit/6361ba92c4a5310453c8fc591940ac1e2abde8a1))

### 🐛 Bug Fixes

* **fetch:** enhance retry logic to sanitize and floor retry values in processOptions function ([ddd3f61](https://github.com/Alwatr/alwatr/commit/ddd3f61d11c1bd6ad118dd66dfcc2c54b4c638d6))

### 🔨 Code Refactoring

* **fetch:** enforce network_only cache strategy for non-GET/HEAD methods and update processOptions function ([fe4593a](https://github.com/Alwatr/alwatr/commit/fe4593a91caac2626da673f1626550e58b4c6223))
* **fetch:** enhance FetchJsonResponse type and improve type imports ([1423b12](https://github.com/Alwatr/alwatr/commit/1423b126e1356ade2f60c6c79b36a0aed39aa6a7))
* **fetch:** enhance method handling in _processOptions for consistency ([da172ae](https://github.com/Alwatr/alwatr/commit/da172ae1393942d244c2d1822f54976cb562fd45))
* **fetch:** enhance processOptions function to normalize timeout and retryDelay, and improve cache strategy handling ([44ab556](https://github.com/Alwatr/alwatr/commit/44ab5566ee5dd727baa2327d96f11bed3c8a870d))
* **fetch:** enhance test coverage and improve error handling in fetch and fetchJson functions ([4c954bf](https://github.com/Alwatr/alwatr/commit/4c954bf634a28b17450eb71940c823272c1ea0fa))
* **fetch:** enhance type definitions and improve documentation for fetch options ([51fde9e](https://github.com/Alwatr/alwatr/commit/51fde9ef79b5ae195db7a037e38aebff0ca23ce0))
* **fetch:** extend InternalFetchOptions_ to include timeout and retryDelay properties ([57bb387](https://github.com/Alwatr/alwatr/commit/57bb3875b208255d7fca18149a5e9f9000ad39fc))
* **fetch:** improve cache strategy handling and error management in handleCacheStrategy function ([3f91d89](https://github.com/Alwatr/alwatr/commit/3f91d8981cbb28339f0e768fa1e8646e5ce51f2b))
* **fetch:** improve error handling and enhance documentation for fetch and fetchJson functions ([c7bd5ad](https://github.com/Alwatr/alwatr/commit/c7bd5ad11ede3d8e62c09bd07f09bf40e5e917c0))
* **fetch:** remove unused import for cacheSupported in main.test.js ([a450c98](https://github.com/Alwatr/alwatr/commit/a450c9860fcd51824d2ebe5ecddaf9c2e528fecb))
* **fetch:** replace logger_.error with logger_.accident for improved error logging in DEV_MODE ([886a4b0](https://github.com/Alwatr/alwatr/commit/886a4b09292e3093c0ca2663e65ae2a4e0ff4458))
* **fetch:** separate files to enhance code readability ([649d87a](https://github.com/Alwatr/alwatr/commit/649d87a8bbee99bc338edde1ffb4ddec555fba11))
* **fetch:** streamline abort signal handling in retry and timeout functions ([c79b468](https://github.com/Alwatr/alwatr/commit/c79b4687e5b4ac13a3e5eccb8ec712f2ced7b558))
* **fetch:** streamline fetch options processing and enhance header normalization ([74f4ff1](https://github.com/Alwatr/alwatr/commit/74f4ff13cd3f673e65f30f0ef4e4cb6261bcfdd4))
* **fetch:** update cache strategy condition in processOptions_ for better handling of unsupported scenarios ([3c34f74](https://github.com/Alwatr/alwatr/commit/3c34f74e5a58293fc0a27ce351b4cb3aa6a2340a))
* **fetch:** update deduplication logic to use Map for storage and improve cache key computation ([7fbb8fd](https://github.com/Alwatr/alwatr/commit/7fbb8fde2689dfada38a0830034d34e1d3e2b822))

### 🔗 Dependencies update

* **fetch:** remove "@alwatr/has-own" ([3a7b79f](https://github.com/Alwatr/alwatr/commit/3a7b79f485f71214b8b1174289a5b93d1443858f))

## [10.0.3](https://github.com/Alwatr/alwatr/compare/v10.0.2...v10.0.3) (2026-08-13)

* **fetch:** add tests for header isolation and security to prevent token leakage ([582f155](https://github.com/Alwatr/alwatr/commit/582f15574247ad4bf718af17717760c911d5db77))

### 🐛 Bug Fixes

* **fetch:** ensure headers are private per request to prevent credential leakage ([84c58c6](https://github.com/Alwatr/alwatr/commit/84c58c6f858f3f066de15936f8bd62f02df9f4e5))

## [10.0.0](https://github.com/Alwatr/alwatr/compare/v9.38.2...v10.0.0) (2026-07-26)

**Note:** Version bump only for package @alwatr/fetch

## [9.38.2](https://github.com/Alwatr/alwatr/compare/v9.38.1...v9.38.2) (2026-07-12)

### 🧹 Miscellaneous Chores

* update TypeScript and related dependencies to version 7.0.2 across all packages; upgrade prettier to version 3.9.5 ([d84e7af](https://github.com/Alwatr/alwatr/commit/d84e7afd24b5b7660f14e1a03b868979e43dc880))

## [9.38.1](https://github.com/Alwatr/alwatr/compare/v9.38.0...v9.38.1) (2026-06-28)

**Note:** Version bump only for package @alwatr/fetch

## [9.37.0](https://github.com/Alwatr/alwatr/compare/v9.36.0...v9.37.0) (2026-06-13)

**Note:** Version bump only for package @alwatr/fetch

## [9.36.0](https://github.com/Alwatr/alwatr/compare/v9.35.0...v9.36.0) (2026-06-11)

**Note:** Version bump only for package @alwatr/fetch

## [9.35.0](https://github.com/Alwatr/alwatr/compare/v9.34.0...v9.35.0) (2026-06-11)

### 🔨 Code Refactoring

* conditionally log accidents in DEV_MODE for better debugging ([c225def](https://github.com/Alwatr/alwatr/commit/c225defd90630a89c58956efecf78df3b294f6ca))

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

### 🐛 Bug Fixes

* standardize formatting and improve descriptions across multiple packages ([24f22e4](https://github.com/Alwatr/alwatr/commit/24f22e451cf3a1edb891943ef179cc18192079bf))

### 🔨 Code Refactoring

* conditionally log method arguments and events in DEV_MODE to reduce production build size ([b3842e0](https://github.com/Alwatr/alwatr/commit/b3842e09d56973b3a04e739fe8314050cd1975c4))

## [9.33.0](https://github.com/Alwatr/alwatr/compare/v9.32.0...v9.33.0) (2026-06-10)

**Note:** Version bump only for package @alwatr/fetch

## [9.32.0](https://github.com/Alwatr/alwatr/compare/v9.31.0...v9.32.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/fetch

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/fetch

## [9.30.0](https://github.com/Alwatr/alwatr/compare/v9.29.0...v9.30.0) (2026-06-02)

**Note:** Version bump only for package @alwatr/fetch

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

**Note:** Version bump only for package @alwatr/fetch

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

**Note:** Version bump only for package @alwatr/fetch

## [9.24.0](https://github.com/Alwatr/alwatr/compare/v9.23.4...v9.24.0) (2026-05-14)

**Note:** Version bump only for package @alwatr/fetch

## [9.23.3](https://github.com/Alwatr/alwatr/compare/v9.23.2...v9.23.3) (2026-05-12)

**Note:** Version bump only for package @alwatr/fetch

## [9.20.1](https://github.com/Alwatr/alwatr/compare/v9.20.0...v9.20.1) (2026-04-30)

**Note:** Version bump only for package @alwatr/fetch

## [9.20.0](https://github.com/Alwatr/alwatr/compare/v9.19.1...v9.20.0) (2026-04-30)

**Note:** Version bump only for package @alwatr/fetch

## [9.16.0](https://github.com/Alwatr/alwatr/compare/v9.15.0...v9.16.0) (2026-04-27)

**Note:** Version bump only for package @alwatr/fetch

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* add type imports from @alwatr/type-helper across multiple packages ([9e44c20](https://github.com/Alwatr/alwatr/commit/9e44c20b724b91452848e4ca4344f16133573bcb))
* **tsconfig:** remove @alwatr/type-helper from types array across multiple packages ([09a2177](https://github.com/Alwatr/alwatr/commit/09a2177c0c22631287e896543a4052201d912224))

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/fetch

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

**Note:** Version bump only for package @alwatr/fetch

## [9.7.0](https://github.com/Alwatr/alwatr/compare/v9.6.1...v9.7.0) (2026-04-14)

**Note:** Version bump only for package @alwatr/fetch

## [9.4.5](https://github.com/Alwatr/alwatr/compare/v9.4.4...v9.4.5) (2026-04-11)

**Note:** Version bump only for package @alwatr/fetch

## [9.4.0](https://github.com/Alwatr/alwatr/compare/v9.3.0...v9.4.0) (2026-04-05)

**Note:** Version bump only for package @alwatr/fetch

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### 🔨 Code Refactoring

* update TypeScript configuration to extend from @alwatr/standard/tsconfig ([3e52ee2](https://github.com/Alwatr/alwatr/commit/3e52ee2152b4264ed994ec72610be5828fbdc6d2))

## [9.2.1](https://github.com/Alwatr/alwatr/compare/v9.2.0...v9.2.1) (2026-04-04)

**Note:** Version bump only for package @alwatr/fetch

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### 🔨 Code Refactoring

* remove emitDeclarationOnly from tsconfig.json files ([98c8910](https://github.com/Alwatr/alwatr/commit/98c891005bf2bc2c3b37c3a635346e917aeeedb3))
* rename clean script alias from 'c' to 'cl' across all package.json files ([e041589](https://github.com/Alwatr/alwatr/commit/e0415899ec6f509fcceaa2fb732c110ead848293))
* reorganize fields in package.json files across multiple packages ([6a0e28f](https://github.com/Alwatr/alwatr/commit/6a0e28f6f43dc816232d6c4f7f4fe2d68993dd29))
* reorganize fields in package.json files across multiple packages ([280e7b1](https://github.com/Alwatr/alwatr/commit/280e7b16414e1eb349c0af3cfc5f4f8f2e0b5288))
* update tsconfig.json to extend from @alwatr/tsconfig-base directly ([1fb76b0](https://github.com/Alwatr/alwatr/commit/1fb76b0e8a56ec5582b43aee4b6cd1850c5f936d))

### 🧹 Miscellaneous Chores

* add "import" field to package exports for consistency ([eb2a680](https://github.com/Alwatr/alwatr/commit/eb2a6805d731ae44ba0666891cacd88088a30abe))
* fix all deps ([86c7c48](https://github.com/Alwatr/alwatr/commit/86c7c48c04ad3225be5012e934443aac28a335d3))
* rename all pageckage inside pkg/nanolib ([8584300](https://github.com/Alwatr/alwatr/commit/85843005c3c34bdf391a718cacaf5d6eb9786fe7))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update logger imports to replace nanolib with nano-build across multiple files ([26a07af](https://github.com/Alwatr/alwatr/commit/26a07afe5fc8761a15ff12538f485a6757d75c74))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))

## [8.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@8.0.1...@alwatr/fetch@8.0.2) (2026-03-27)

### 🧹 Miscellaneous Chores

* update TypeScript version to ^6.0.2 across all packages ([d6b2bf3](https://github.com/Alwatr/nanolib/commit/d6b2bf3ce064eb927c56d9f8c7a5d3138adde998))

## [8.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@8.0.0...@alwatr/fetch@8.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))
* remove "types" field from package.json in multiple packages ([b2a458d](https://github.com/Alwatr/nanolib/commit/b2a458d3b1028175e6bc8d0485d223e7d22a1773))

## [8.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.1.6...@alwatr/fetch@8.0.0) (2026-03-19)

### ⚠ BREAKING CHANGES

* This package is now ESM-only and no longer provides CommonJS (CJS) distribution.
- Minimum Node.js version is now 14.13.0 (or 12.22.0 for older versions with --experimental-modules flag)
- All require() statements must be replaced with import statements
- CommonJS require() is no longer supported

### ✨ Features

* add version property to fetch function ([3c54d91](https://github.com/Alwatr/nanolib/commit/3c54d916d792251f4a60136b92fb57442156d502))

### 🐛 Bug Fixes

* import @alwatr/nano-build in type.ts ([bd6e120](https://github.com/Alwatr/nanolib/commit/bd6e120ed3d3af209b8721364e5d0fc6de6353ea))

### 🔨 Code Refactoring

* convert to ESM-only module ([493d7d9](https://github.com/Alwatr/nanolib/commit/493d7d9d76d03c43902eb04f0a9ecebac8f6fbba))

### 🧹 Miscellaneous Chores

* remove unnecessary whitespace in package.json files across multiple packages ([d0cc5c8](https://github.com/Alwatr/nanolib/commit/d0cc5c8eb7b958498d82ad4a009dffb95db572bd))
* update build command in package.json files to remove source map flags ([6b504fc](https://github.com/Alwatr/nanolib/commit/6b504fc4f813146064a21638014a62b0b5b95ca0))
* update build:es script to include src/main.ts for all packages ([bc5454d](https://github.com/Alwatr/nanolib/commit/bc5454dc3536e5d2a6ac53be602e93ba7133fb32))

## [7.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.1.5...@alwatr/fetch@7.1.6) (2026-03-18)

**Note:** Version bump only for package @alwatr/fetch

## [7.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.1.4...@alwatr/fetch@7.1.5) (2026-03-16)

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

## [7.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.1.3...@alwatr/fetch@7.1.4) (2026-02-18)

**Note:** Version bump only for package @alwatr/fetch

## [7.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.1.2...@alwatr/fetch@7.1.3) (2025-12-23)

**Note:** Version bump only for package @alwatr/fetch

## [7.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.1.1...@alwatr/fetch@7.1.2) (2025-12-13)

**Note:** Version bump only for package @alwatr/fetch

## [7.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.1.0...@alwatr/fetch@7.1.1) (2025-12-10)

**Note:** Version bump only for package @alwatr/fetch

## [7.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.0.3...@alwatr/fetch@7.1.0) (2025-11-18)

### ✨ Features

* add fetchJson function for automatic JSON parsing with error handling ([6cc3e4b](https://github.com/Alwatr/nanolib/commit/6cc3e4b6d854caddb187150126548d9081c91e3c))

### 🔨 Code Refactoring

* improve type definitions for cache strategy and error reasons ([c599f72](https://github.com/Alwatr/nanolib/commit/c599f7254f05dd964ca0378f2017f9e98de2018c))
* separate core funcs ([110db1f](https://github.com/Alwatr/nanolib/commit/110db1f171c5f18eb9a9ab5d62df33447e1c55d6))

## [7.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.0.2...@alwatr/fetch@7.0.3) (2025-11-18)

**Note:** Version bump only for package @alwatr/fetch

## [7.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.0.1...@alwatr/fetch@7.0.2) (2025-11-15)

**Note:** Version bump only for package @alwatr/fetch

## [7.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@7.0.0...@alwatr/fetch@7.0.1) (2025-11-15)

**Note:** Version bump only for package @alwatr/fetch

## [7.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.17...@alwatr/fetch@7.0.0) (2025-11-06)

### ⚠ BREAKING CHANGES

* The `fetch` function no longer throws exceptions. Instead, it returns a **tuple** following the Go-style error handling pattern:

```typescript
// Old behavior (v1.x)
type FetchResponse = Promise<Response>;

// New behavior (v2.x)
type FetchResponse = Promise<[Response, null] | [null, Error | FetchError]>;
```

### Why This Change?

1. **Explicit Error Handling**: Forces developers to handle errors at the call site
2. **Type Safety**: TypeScript can track whether you've handled errors
3. **No Try-Catch Boilerplate**: Cleaner, more readable code
4. **Better Error Context**: `FetchError` provides detailed error reasons and response data
5. **Consistent Patterns**: Aligns with modern error handling practices (Go, Rust Result types)

### Migration Guide

#### Before (v1.x)

```typescript
import {fetch} from '@alwatr/fetch';

async function getUser(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
  catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

#### After (v2.x)

```typescript
import {fetch, FetchError} from '@alwatr/fetch';

async function getUser(id: string) {
  const [response, error] = await fetch(`/api/users/${id}`);

  if (error) {
    console.error('Failed to fetch user:', error.message, error.response);
    return null; // or throw, or return a default value
  }

  // response is guaranteed to be ok here
  return await response.json();
}
```

* enhance error handling in README with Go-style tuple pattern and FetchError examples ([e1091ec](https://github.com/Alwatr/nanolib/commit/e1091eca2c27cf3aa03e046fed3ccfad6ce704ed))

### ✨ Features

* add custom FetchError class for enhanced error handling in fetch requests ([31891de](https://github.com/Alwatr/nanolib/commit/31891de09437ddb86fd2101124120bf78a9552eb))
* enhance FetchError handling with specific reasons for fetch failures ([cc6569d](https://github.com/Alwatr/nanolib/commit/cc6569de16c27f2adaecefe3bef2c76ead29ffb8))
* enhance FetchResponse type to include FetchError for improved error handling ([dd6a0ff](https://github.com/Alwatr/nanolib/commit/dd6a0ff31ddbcd6ccdfd6f65eccbbe83b9cce237))

### 🐛 Bug Fixes

* add 'cache_not_found' reason to FetchErrorReason type for improved error categorization ([14dddd5](https://github.com/Alwatr/nanolib/commit/14dddd5750140f60ed4305d21226eb348795c0a3))
* add @alwatr/has-own dependency and update tsconfig references ([1bb1c71](https://github.com/Alwatr/nanolib/commit/1bb1c71bb8e7f6c2ffb0d6a563893e37183ec54b))
* add missing type import from @alwatr/type-helper ([2326335](https://github.com/Alwatr/nanolib/commit/23263352c2698738c5a43a5deebdf1744268e8ce))
* export error handling types from error.js ([bb88521](https://github.com/Alwatr/nanolib/commit/bb8852197cf0878f3ca62b14d3bd046a031e52a1))
* improve error handling in fetch function to parse response body as JSON or fallback to text ([8e02ba8](https://github.com/Alwatr/nanolib/commit/8e02ba8b4733005e52095dc9833e1e36d1f3e94a))
* refine error handling for fetch timeout and abort scenarios ([b5ac722](https://github.com/Alwatr/nanolib/commit/b5ac7229d713897f4d39d0c406dd3839792de680))
* replace Object.hasOwn with hasOwn import and enhance FetchError handling for better error reporting ([c320420](https://github.com/Alwatr/nanolib/commit/c320420689543aab1eebd46fe7dd601bda281002))
* set default options for fetch function ([7bda786](https://github.com/Alwatr/nanolib/commit/7bda786a8754d876e49d42ea1e5e7379ad70170d))
* support nodejs ([fb6d993](https://github.com/Alwatr/nanolib/commit/fb6d993fe6af56a468c73fa31a960aa601279b75))
* timeout abort issue ([bb3845d](https://github.com/Alwatr/nanolib/commit/bb3845d2b4cec705a8021f5c65de658fefc51e21))
* update error handling in README to reference FetchError consistently ([1f6e240](https://github.com/Alwatr/nanolib/commit/1f6e240c946a07b7ce9c4489a509597fec8705f9))
* update fetch function to return a tuple and add options processing ([d05bfb5](https://github.com/Alwatr/nanolib/commit/d05bfb59260be5eae5aeab7bd816aa2f613dd643))
* update fetch function to return FetchResponse and handle FetchError for improved error reporting ([ddf47e0](https://github.com/Alwatr/nanolib/commit/ddf47e07510bb0cd38fa75c8921a3d64ed370afc))
* update FetchError data type to ensure consistent error handling ([954b79a](https://github.com/Alwatr/nanolib/commit/954b79a7ba3954565c7d09db6b188b79f1fd8fa2))
* update FetchResponse type to ensure consistent error handling ([8da0b3a](https://github.com/Alwatr/nanolib/commit/8da0b3a8ac2801494ffa214a99792215a403b16e))

### 🧹 Miscellaneous Chores

* reorder jest dependency in package.json ([a098ecf](https://github.com/Alwatr/nanolib/commit/a098ecf0489596104908627c759c8dcb092d2424))

### 🔗 Dependencies update

* add @jest/globals dependency and remove types from tsconfig ([47ee79a](https://github.com/Alwatr/nanolib/commit/47ee79a234a026ce28ab5671f84f72aea61d8508))

## [6.0.17](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.16...@alwatr/fetch@6.0.17) (2025-11-04)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.16](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.15...@alwatr/fetch@6.0.16) (2025-10-06)

### 🔗 Dependencies update

* bump the npm-dependencies group with 4 updates ([9825815](https://github.com/Alwatr/nanolib/commit/982581552bbb4b97dca52af5e93a80937f0c3109))

## [6.0.15](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.14...@alwatr/fetch@6.0.15) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [6.0.14](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.13...@alwatr/fetch@6.0.14) (2025-09-22)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.13](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.12...@alwatr/fetch@6.0.13) (2025-09-22)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.12](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.11...@alwatr/fetch@6.0.12) (2025-09-21)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.11](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.10...@alwatr/fetch@6.0.11) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))
* remove unnecessary pure annotations ([adeb916](https://github.com/Alwatr/nanolib/commit/adeb9166f8e911f59269032b76c36cb1888332cf))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [6.0.10](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.9...@alwatr/fetch@6.0.10) (2025-09-19)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.9](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.8...@alwatr/fetch@6.0.9) (2025-09-19)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.7...@alwatr/fetch@6.0.8) (2025-09-15)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.6...@alwatr/fetch@6.0.7) (2025-09-14)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.5...@alwatr/fetch@6.0.6) (2025-09-13)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.4...@alwatr/fetch@6.0.5) (2025-09-13)

### 🧹 Miscellaneous Chores

* remove package-tracer dependency and related code from fetch package ([96fe4e9](https://github.com/Alwatr/nanolib/commit/96fe4e9552a205f218ceed187c55e4e904a07089))

## [6.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.3...@alwatr/fetch@6.0.4) (2025-09-13)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.2...@alwatr/fetch@6.0.3) (2025-09-09)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.1...@alwatr/fetch@6.0.2) (2025-09-08)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.0...@alwatr/fetch@6.0.1) (2025-09-06)

### 🔨 Code Refactoring

* update bodyJson type definition to use JsonValue for consistency ([ca18953](https://github.com/Alwatr/nanolib/commit/ca1895314e918a157610a554fefcabcb71de97b6))

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.7...@alwatr/fetch@6.0.0) (2025-09-06)

### ⚠ BREAKING CHANGES

* Removed fetchJson; refactored fetch to accept url as a separate parameter, matching the web standard API.

### 🐛 Bug Fixes

* include request body in cache key for duplicate request handling ([a891ceb](https://github.com/Alwatr/nanolib/commit/a891ceb7300b26101f5cd982409477815dad500e))
* update query parameter encoding in fetch function for proper URL formatting ([ae30c1e](https://github.com/Alwatr/nanolib/commit/ae30c1ef13eae5070c0c2865180dfa7b89aa1eba))

### 🔨 Code Refactoring

* enhance FetchOptions type and improve fetch function handling ([a35e8e4](https://github.com/Alwatr/nanolib/commit/a35e8e495336448531b9b4ca755520517b3e3e2c))
* enhance logging in fetch and cache strategy functions for better traceability ([db0c51b](https://github.com/Alwatr/nanolib/commit/db0c51b4e5bafbba64c511dda4686226a3fcb842))
* improve documentation for fetch options and caching strategies ([d114290](https://github.com/Alwatr/nanolib/commit/d114290755d13ac5ca06a19ffe827e39b70ff92a))
* rename FetchOptions_ to AlwatrFetchOptions_ for consistency ([978947a](https://github.com/Alwatr/nanolib/commit/978947a52196f711ffc452a84edd9f34c95341b3))
* rewrite fetch module ([d245cce](https://github.com/Alwatr/nanolib/commit/d245cce8c99b345989dd18c373f682dd89ef3319))
* update fetch calls to use consistent parameters and improve response handling ([49436e6](https://github.com/Alwatr/nanolib/commit/49436e685fe8c81c78649918f3455282106bd754))
* update FetchOptions interface to enforce required properties ([4423740](https://github.com/Alwatr/nanolib/commit/4423740b3424c3d819e6c59ade183fcd303116c8))
* update FetchOptions type to AlwatrFetchOptions_ for consistency ([6c1ff26](https://github.com/Alwatr/nanolib/commit/6c1ff264a0a3937bcd6abd58010b92d53f3d76ea))

## [5.6.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.6...@alwatr/fetch@5.6.7) (2025-09-05)

### 🔗 Dependencies update

* update jest to version 30.1.3 and @types/node to version 22.18.1 ([754212b](https://github.com/Alwatr/nanolib/commit/754212b1523cfc4cfe26c9e9f6d634aa8311e0b7))

## [5.6.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.5...@alwatr/fetch@5.6.6) (2025-09-01)

### 🔗 Dependencies update

* update lerna-lite dependencies to version 4.7.3 and jest to 30.1.2 ([95d7870](https://github.com/Alwatr/nanolib/commit/95d7870ec7ad1e6ed2688bafddcabf46857f6981))

## [5.6.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.4...@alwatr/fetch@5.6.5) (2025-08-23)

**Note:** Version bump only for package @alwatr/fetch

## [5.6.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.2...@alwatr/fetch@5.6.4) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))

### 🔗 Dependencies update

* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.6.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.2...@alwatr/fetch@5.6.3) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## [5.6.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.1...@alwatr/fetch@5.6.2) (2025-04-20)

**Note:** Version bump only for package @alwatr/fetch

## <small>5.6.1 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/fetch

## [5.6.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.5.2...@alwatr/fetch@5.6.0) (2025-04-15)

### Features

* **fetchJson:** include responseText in error logging for better debugging ([168aa1c](https://github.com/Alwatr/nanolib/commit/168aa1cf72fa7668a92be87711656bbd5f1b784c)) by @alimd

### Bug Fixes

* **fetchJson:** update return type of fetchJson to be more generic ([9db5234](https://github.com/Alwatr/nanolib/commit/9db5234c16fc4574386c555bd068b4ab0382a364)) by @alimd

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.5.1...@alwatr/fetch@5.5.2) (2025-04-01)

**Note:** Version bump only for package @alwatr/fetch

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.5.0...@alwatr/fetch@5.5.1) (2025-03-18)

**Note:** Version bump only for package @alwatr/fetch

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.4.0...@alwatr/fetch@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.2.1...@alwatr/fetch@5.4.0) (2025-02-18)

## 5.3.0 (2025-02-03)

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @

## 5.2.1 (2024-11-07)

### Bug Fixes

* **fetch:** refine error handling in fetchJson to improve response error structure ([2942563](https://github.com/Alwatr/nanolib/commit/29425639c268f091711ab195a4285e49b762e497)) by @

## 5.2.0 (2024-11-06)

### Features

* **fetch:** improve error handling for fetch responses and JSON parsing ([8692bb1](https://github.com/Alwatr/nanolib/commit/8692bb1123e8b3a6d6f8aea20464c55b344da9d2)) by @

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.

### Code Refactoring

* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

## [5.3.0](https://github.com/Alwatr/nanolib/compare/v5.2.1...v5.3.0) (2025-02-03)

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @ArmanAsadian

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @dependabot[bot]
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @alimd

## [5.2.1](https://github.com/Alwatr/nanolib/compare/v5.2.0...v5.2.1) (2024-11-07)

### Bug Fixes

* **fetch:** refine error handling in fetchJson to improve response error structure ([2942563](https://github.com/Alwatr/nanolib/commit/29425639c268f091711ab195a4285e49b762e497)) by @

## [5.2.0](https://github.com/Alwatr/nanolib/compare/v5.1.0...v5.2.0) (2024-11-06)

### Features

* **fetch:** improve error handling for fetch responses and JSON parsing ([8692bb1](https://github.com/Alwatr/nanolib/commit/8692bb1123e8b3a6d6f8aea20464c55b344da9d2)) by @alimd

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.
* **fetch:** queryParametters renamed to queryParams
* **fetch:** remove serviceRequest

Co-authored-by: Ali Mihandoost <ali@mihandoost.com>

### Features

* **fetch:** alwatrAuth ([28e365c](https://github.com/Alwatr/nanolib/commit/28e365c839b0ea80060c0f44ed4dc4473468d5c4)) by @
* **fetch:** fetch json ([b089f12](https://github.com/Alwatr/nanolib/commit/b089f12cef6f1f3b60bc7559dc5e9b8b63c57273)) by @
* **fetch:** move from last repo ([4b86bb5](https://github.com/Alwatr/nanolib/commit/4b86bb542af296c91bc1db36b4e08fdbad501db2)) by @
* **fetch:** Update fetch type definitions with document ([38398cc](https://github.com/Alwatr/nanolib/commit/38398cc33f311a569a53cc3e06c3191e17dbd45b)) by @
* **fetch:** use @alwatr/http-primer for types and http codes ([6fe993a](https://github.com/Alwatr/nanolib/commit/6fe993ac0f395a4c0c6ad3b2caa48a2986cc850f)) by @
* use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @

### Bug Fixes

* all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @
* exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @
* **fetch:** better error handling on handleRetryPattern_ when user is offline ([b867f30](https://github.com/Alwatr/nanolib/commit/b867f30b3eba529ec1aae0026f0ded252ce54332)) by @
* **fetch:** remove unused import from fetch core module ([28ec726](https://github.com/Alwatr/nanolib/commit/28ec7269322f90dba02fbb33e4e622db42169368)) by @

### Code Refactoring

* **fetch:** handle fetchJson error responses properly ([ae8fe24](https://github.com/Alwatr/nanolib/commit/ae8fe244aca17f235c4347ff1fd10070a410340c)) by @
* **fetch:** review and update everything ([61ec38b](https://github.com/Alwatr/nanolib/commit/61ec38b2fde28ba26a7973fcd60a30c861faf4dd)) by @
* **fetch:** separate core files ([c7e6b09](https://github.com/Alwatr/nanolib/commit/c7e6b096d747f868a2a1bfde1ffd3fd2a64dc7f3)) by @
* **fetch:** update fetch package to use @alwatr/parse-duration for timeout and retryDelay durations ([1108c54](https://github.com/Alwatr/nanolib/commit/1108c547e43f2c65f46d65b58dd19cee9abd2fd7)) by @
* **fetch:** update HTTP headers content-type to use MimeTypes constant ([c3862fc](https://github.com/Alwatr/nanolib/commit/c3862fc6a643da97dacbd15bcf5d3351caaaf269)) by @
* **fetch:** Update logger import and initialization ([1f0451c](https://github.com/Alwatr/nanolib/commit/1f0451c9fec81b875736135778cdd4150556ba97)) by @
* **fetch:** update query parameters handling ([939b3d5](https://github.com/Alwatr/nanolib/commit/939b3d52998ec7b3f5c32ff5438b649148109ede)) by @
* **fetch:** use new DictionaryReq type ([a8149cf](https://github.com/Alwatr/nanolib/commit/a8149cff114da7c7ce9a335c837ae794904fa3ca)) by @
* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @
* use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @
* use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @
* **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @

### Miscellaneous Chores

* **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @
* **fetch:** change the license to AGPL-3.0 ([edf9069](https://github.com/Alwatr/nanolib/commit/edf9069608bd276b85c9ac937e33ad225c5921a9)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @
* Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

### Dependencies update

* bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @
* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @
* update all ([53342f6](https://github.com/Alwatr/nanolib/commit/53342f67a8a013127f073540bc11929f1813c05c)) by @
* update all ([a828818](https://github.com/Alwatr/nanolib/commit/a828818c1b37ad5f6dd3698a53fb14624f633f35)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @
* upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @

## [4.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.2.0...@alwatr/fetch@4.2.1) (2024-11-02)

**Note:** Version bump only for package @alwatr/fetch

## [4.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.7...@alwatr/fetch@4.2.0) (2024-10-28)

### Features

* **fetch:** use @alwatr/http-primer for types and http codes ([6fe993a](https://github.com/Alwatr/nanolib/commit/6fe993ac0f395a4c0c6ad3b2caa48a2986cc850f)) by @alimd

### Code Refactoring

* **fetch:** update HTTP headers content-type to use MimeTypes constant ([c3862fc](https://github.com/Alwatr/nanolib/commit/c3862fc6a643da97dacbd15bcf5d3351caaaf269)) by @alimd

## [4.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.6...@alwatr/fetch@4.1.7) (2024-10-25)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.5...@alwatr/fetch@4.1.6) (2024-10-12)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.4...@alwatr/fetch@4.1.5) (2024-10-11)

### Code Refactoring

- prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @mohammadhonarvar
- use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @mohammadhonarvar

## [4.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.3...@alwatr/fetch@4.1.4) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [4.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.2...@alwatr/fetch@4.1.3) (2024-10-11)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.1...@alwatr/fetch@4.1.2) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [4.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.0...@alwatr/fetch@4.1.1) (2024-10-08)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.0.1...@alwatr/fetch@4.1.0) (2024-09-29)

### Features

- use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @mohammadhonarvar

### Bug Fixes

- all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @mohammadhonarvar
- **fetch:** remove unused import from fetch core module ([28ec726](https://github.com/Alwatr/nanolib/commit/28ec7269322f90dba02fbb33e4e622db42169368)) by @alimd

### Code Refactoring

- **fetch:** update fetch package to use @alwatr/parse-duration for timeout and retryDelay durations ([1108c54](https://github.com/Alwatr/nanolib/commit/1108c547e43f2c65f46d65b58dd19cee9abd2fd7)) by @alimd
- **fetch:** Update logger import and initialization ([1f0451c](https://github.com/Alwatr/nanolib/commit/1f0451c9fec81b875736135778cdd4150556ba97)) by @alimd
- **fetch:** use new DictionaryReq type ([a8149cf](https://github.com/Alwatr/nanolib/commit/a8149cff114da7c7ce9a335c837ae794904fa3ca)) by @alimd
- update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @alimd
- use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @alimd
- **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @alimd

### Miscellaneous Chores

- **fetch:** change the license to AGPL-3.0 ([edf9069](https://github.com/Alwatr/nanolib/commit/edf9069608bd276b85c9ac937e33ad225c5921a9)) by @ArmanAsadian
- Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @alimd

### Dependencies update

- bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @dependabot[bot]

## [4.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.0.0...@alwatr/fetch@4.0.1) (2024-09-21)

**Note:** Version bump only for package @alwatr/fetch

## [4.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.8...@alwatr/fetch@4.0.0) (2024-09-15)

### ⚠ BREAKING CHANGES

- **fetch:** queryParametters renamed to queryParams

### Code Refactoring

- **fetch:** handle fetchJson error responses properly ([ae8fe24](https://github.com/Alwatr/nanolib/commit/ae8fe244aca17f235c4347ff1fd10070a410340c)) by @alimd
- **fetch:** update query parameters handling ([939b3d5](https://github.com/Alwatr/nanolib/commit/939b3d52998ec7b3f5c32ff5438b649148109ede)) by @alimd

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]
- update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @alimd

## [3.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.7...@alwatr/fetch@3.1.8) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [3.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.6...@alwatr/fetch@3.1.7) (2024-08-31)

**Note:** Version bump only for package @alwatr/fetch

## [3.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.5...@alwatr/fetch@3.1.6) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [3.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.4...@alwatr/fetch@3.1.5) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [3.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.3...@alwatr/fetch@3.1.4) (2024-05-12)

### Dependencies update

- upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @alimd

## [3.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.2...@alwatr/fetch@3.1.3) (2024-04-25)

**Note:** Version bump only for package @alwatr/fetch

## [3.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.1...@alwatr/fetch@3.1.2) (2024-03-28)

**Note:** Version bump only for package @alwatr/fetch

## [3.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.0...@alwatr/fetch@3.1.1) (2024-01-31)

### Bug Fixes

- exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @alimd

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @alimd

## [3.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.0.0...@alwatr/fetch@3.1.0) (2024-01-24)

### Features

- **fetch:** fetch json ([b089f12](https://github.com/Alwatr/nanolib/commit/b089f12cef6f1f3b60bc7559dc5e9b8b63c57273)) by @njfamirm

### Bug Fixes

- **fetch:** better error handling on handleRetryPattern\_ when user is offline ([b867f30](https://github.com/Alwatr/nanolib/commit/b867f30b3eba529ec1aae0026f0ded252ce54332)) by @alimd

### Code Refactoring

- **fetch:** separate core files ([c7e6b09](https://github.com/Alwatr/nanolib/commit/c7e6b096d747f868a2a1bfde1ffd3fd2a64dc7f3)) by @njfamirm

## 3.0.0 (2024-01-20)

### ⚠ BREAKING CHANGES

- **fetch:** remove serviceRequest

Co-authored-by: Ali Mihandoost <ali@mihandoost.com>

### Features

- **fetch:** alwatrAuth ([28e365c](https://github.com/Alwatr/nanolib/commit/28e365c839b0ea80060c0f44ed4dc4473468d5c4)) by @alimd
- **fetch:** move from last repo ([4b86bb5](https://github.com/Alwatr/nanolib/commit/4b86bb542af296c91bc1db36b4e08fdbad501db2)) by @njfamirm
- **fetch:** Update fetch type definitions with document ([38398cc](https://github.com/Alwatr/nanolib/commit/38398cc33f311a569a53cc3e06c3191e17dbd45b)) by @alimd

### Code Refactoring

- **fetch:** review and update everything ([61ec38b](https://github.com/Alwatr/nanolib/commit/61ec38b2fde28ba26a7973fcd60a30c861faf4dd)) by @alimd
