# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.33.0](https://github.com/Alwatr/alwatr/compare/v9.32.0...v9.33.0) (2026-06-10)

**Note:** Version bump only for package @alwatr/local-storage

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/local-storage

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

**Note:** Version bump only for package @alwatr/local-storage

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

**Note:** Version bump only for package @alwatr/local-storage

## [9.24.0](https://github.com/Alwatr/alwatr/compare/v9.23.4...v9.24.0) (2026-05-14)

### ✨ Features

* add support for storing complex types with custom parse and stringify functions ([433d1b5](https://github.com/Alwatr/alwatr/commit/433d1b5fd79d067b55b30c2c661d6fcdd159243e))
* enhance LocalStorageProvider to support custom parse and stringify functions ([0fb87d7](https://github.com/Alwatr/alwatr/commit/0fb87d7875d05bfe2870d621df5009eb993f6a6e))

### 🐛 Bug Fixes

* correct variable names for parse and stringify in LocalStorageProvider ([b3f8ff5](https://github.com/Alwatr/alwatr/commit/b3f8ff57caa6f0a9e946ed043449569bcfa66dd6))
* update parameter names in LocalStorageProvider for consistency ([4c6d218](https://github.com/Alwatr/alwatr/commit/4c6d21804484cdc2a5c8bd31e96a8053eab55187))

### 🧹 Miscellaneous Chores

* update example to use 'version' instead of 'schemaVersion' in LocalStorageProvider documentation ([1101e9a](https://github.com/Alwatr/alwatr/commit/1101e9ae3560bdb4ea5fcbc9d82cd51956a1e09c))

## [9.23.3](https://github.com/Alwatr/alwatr/compare/v9.23.2...v9.23.3) (2026-05-12)

**Note:** Version bump only for package @alwatr/local-storage

## [9.20.1](https://github.com/Alwatr/alwatr/compare/v9.20.0...v9.20.1) (2026-04-30)

**Note:** Version bump only for package @alwatr/local-storage

## [9.16.0](https://github.com/Alwatr/alwatr/compare/v9.15.0...v9.16.0) (2026-04-27)

**Note:** Version bump only for package @alwatr/local-storage

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* **tsconfig:** remove @alwatr/type-helper from types array across multiple packages ([09a2177](https://github.com/Alwatr/alwatr/commit/09a2177c0c22631287e896543a4052201d912224))

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/local-storage

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

**Note:** Version bump only for package @alwatr/local-storage

## [9.7.0](https://github.com/Alwatr/alwatr/compare/v9.6.1...v9.7.0) (2026-04-14)

**Note:** Version bump only for package @alwatr/local-storage

## [9.4.5](https://github.com/Alwatr/alwatr/compare/v9.4.4...v9.4.5) (2026-04-11)

### 🔨 Code Refactoring

* remove generic constraint from createLocalStorageProvider function ([7ff3461](https://github.com/Alwatr/alwatr/commit/7ff34614d59709e24358e500d4c5a3a9320f1698))
* simplify generic constraints and remove extend jsonValue from types ([f02aeb3](https://github.com/Alwatr/alwatr/commit/f02aeb364abdede199c4eb5e7e73eb51945b8f22))

## [9.4.0](https://github.com/Alwatr/alwatr/compare/v9.3.0...v9.4.0) (2026-04-05)

**Note:** Version bump only for package @alwatr/local-storage

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### 🔨 Code Refactoring

* update TypeScript configuration to extend from @alwatr/standard/tsconfig ([3e52ee2](https://github.com/Alwatr/alwatr/commit/3e52ee2152b4264ed994ec72610be5828fbdc6d2))

## [9.2.1](https://github.com/Alwatr/alwatr/compare/v9.2.0...v9.2.1) (2026-04-04)

**Note:** Version bump only for package @alwatr/local-storage

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
* standardize casing of 'ESM' to 'esm' in package.json keywords ([7dca461](https://github.com/Alwatr/alwatr/commit/7dca4617924faac7cd58afe637add38217da6bd8))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update logger imports to replace nanolib with nano-build across multiple files ([26a07af](https://github.com/Alwatr/alwatr/commit/26a07afe5fc8761a15ff12538f485a6757d75c74))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))

## [8.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@8.0.1...@alwatr/local-storage@8.0.2) (2026-03-27)

### 🧹 Miscellaneous Chores

* update TypeScript version to ^6.0.2 across all packages ([d6b2bf3](https://github.com/Alwatr/nanolib/commit/d6b2bf3ce064eb927c56d9f8c7a5d3138adde998))

## [8.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@8.0.0...@alwatr/local-storage@8.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))
* remove "types" field from package.json in multiple packages ([b2a458d](https://github.com/Alwatr/nanolib/commit/b2a458d3b1028175e6bc8d0485d223e7d22a1773))

## [8.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.9...@alwatr/local-storage@8.0.0) (2026-03-19)

### ⚠ BREAKING CHANGES

* This package is now ESM-only and no longer provides CommonJS (CJS) distribution.
- Minimum Node.js version is now 14.13.0 (or 12.22.0 for older versions with --experimental-modules flag)
- All require() statements must be replaced with import statements
- CommonJS require() is no longer supported

### 🔨 Code Refactoring

* convert to ESM-only module ([493d7d9](https://github.com/Alwatr/nanolib/commit/493d7d9d76d03c43902eb04f0a9ecebac8f6fbba))

### 🧹 Miscellaneous Chores

* remove unnecessary whitespace in package.json files across multiple packages ([d0cc5c8](https://github.com/Alwatr/nanolib/commit/d0cc5c8eb7b958498d82ad4a009dffb95db572bd))
* update build command in package.json files to remove source map flags ([6b504fc](https://github.com/Alwatr/nanolib/commit/6b504fc4f813146064a21638014a62b0b5b95ca0))
* update build:es script to include src/main.ts for all packages ([bc5454d](https://github.com/Alwatr/nanolib/commit/bc5454dc3536e5d2a6ac53be602e93ba7133fb32))

## [7.0.9](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.8...@alwatr/local-storage@7.0.9) (2026-03-16)

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

## [7.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.7...@alwatr/local-storage@7.0.8) (2026-02-18)

**Note:** Version bump only for package @alwatr/local-storage

## [7.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.6...@alwatr/local-storage@7.0.7) (2025-12-23)

**Note:** Version bump only for package @alwatr/local-storage

## [7.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.5...@alwatr/local-storage@7.0.6) (2025-12-13)

**Note:** Version bump only for package @alwatr/local-storage

## [7.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.4...@alwatr/local-storage@7.0.5) (2025-12-10)

**Note:** Version bump only for package @alwatr/local-storage

## [7.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.3...@alwatr/local-storage@7.0.4) (2025-11-18)

### 🔨 Code Refactoring

* remove unnecessary type declarations from tsconfig.json files ([89bcc7d](https://github.com/Alwatr/nanolib/commit/89bcc7db839807110b80f8ba34414ea9734d9c75))

## [7.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.2...@alwatr/local-storage@7.0.3) (2025-11-15)

**Note:** Version bump only for package @alwatr/local-storage

## [7.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.1...@alwatr/local-storage@7.0.2) (2025-11-15)

**Note:** Version bump only for package @alwatr/local-storage

## [7.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@7.0.0...@alwatr/local-storage@7.0.1) (2025-11-04)

**Note:** Version bump only for package @alwatr/local-storage

## [7.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.3.4...@alwatr/local-storage@7.0.0) (2025-10-06)

### ⚠ BREAKING CHANGES

* api changed and defaultValue removed

### ✨ Features

* implement static method to check existence of versioned item in localStorage ([c622595](https://github.com/Alwatr/nanolib/commit/c622595bcd793746133733b22c7704463d50314d))

### 🔨 Code Refactoring

* enhance documentation for LocalStorageProviderConfig interface ([11407cd](https://github.com/Alwatr/nanolib/commit/11407cd80ee9def06bcb21c6bb426e92caa7d702))
* improve documentation for LocalStorageProvider's static methods ([145ac5c](https://github.com/Alwatr/nanolib/commit/145ac5c0d947c9d3f1e91a25e5ca749e0e56d85b))
* simplify LocalStorageProvider configuration and remove unused types ([b839299](https://github.com/Alwatr/nanolib/commit/b839299d3950f1662773fd8f3a0e6b2189c3d140))

### 🔗 Dependencies update

* bump the npm-dependencies group with 4 updates ([9825815](https://github.com/Alwatr/nanolib/commit/982581552bbb4b97dca52af5e93a80937f0c3109))

## [6.3.4](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.3.3...@alwatr/local-storage@6.3.4) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [6.3.3](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.3.2...@alwatr/local-storage@6.3.3) (2025-09-22)

### 🐛 Bug Fixes

* add constraint to createLocalStorageProvider generic type to extend JsonValue ([198ca49](https://github.com/Alwatr/nanolib/commit/198ca49042780aff15d3979bea3951bf094b3b15))
* add generic type constraint to LocalStorageProviderConfig to extend JsonValue ([9b97692](https://github.com/Alwatr/nanolib/commit/9b9769254613aac6ad94a0c2dd885c44e63b6ed2))
* refine generic type constraints in LocalStorageProvider to extend JsonValue ([6a05c12](https://github.com/Alwatr/nanolib/commit/6a05c12583326dbea8784f79f7c559b9a31d3cef))
* rename convertDataType method to convertDataType__ for consistency ([83ccb56](https://github.com/Alwatr/nanolib/commit/83ccb56a9ff95ba0c4e8e6a77cb67a010d60701a))

## [6.3.2](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.3.1...@alwatr/local-storage@6.3.2) (2025-09-22)

### 🐛 Bug Fixes

* remove unnecessary constraint from createLocalStorageProvider generic type ([960467f](https://github.com/Alwatr/nanolib/commit/960467fd161a80bf4e90cb3070054cee58182bfb))

## [6.3.1](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.3.0...@alwatr/local-storage@6.3.1) (2025-09-22)

### 🐛 Bug Fixes

* update convertDataType method to accept both raw and serialized data types ([1ca0256](https://github.com/Alwatr/nanolib/commit/1ca02563d0ce27f0b90572563eb8afb109ae2f07))

## [6.3.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.2.0...@alwatr/local-storage@6.3.0) (2025-09-22)

### ✨ Features

* make convertDataType public access ([f8b08e1](https://github.com/Alwatr/nanolib/commit/f8b08e1c81b97176f1dc1777434a17126651fdd3))

## [6.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.8...@alwatr/local-storage@6.2.0) (2025-09-22)

### ✨ Features

* move createLocalStorageProvider function to facade.ts and clean up main.ts ([5dd6164](https://github.com/Alwatr/nanolib/commit/5dd6164f908de9a6ceec70dd19cc6f67d8c22ad6))

### 🐛 Bug Fixes

* correct parameter name in createLocalStorageProvider example ([bc894a3](https://github.com/Alwatr/nanolib/commit/bc894a36e3d033244b81063dccb1dfedb86a0082))
* improve error handling in read and write methods of LocalStorageProvider ([845f37c](https://github.com/Alwatr/nanolib/commit/845f37cddd14f54a5bb50c3d902c7221d8fc9aef))
* refactor LocalStorageProvider constructor and methods for improved clarity and error handling ([da2c5b4](https://github.com/Alwatr/nanolib/commit/da2c5b476ff0184e476be2e2a8af87ba6364bfbd))
* update error logging in convertDataType__ method for improved clarity ([3e395e5](https://github.com/Alwatr/nanolib/commit/3e395e529aae1dcac5ad0b431070761b23e2d935))
* update return types in LocalStorageProvider methods for better type safety ([0abcb41](https://github.com/Alwatr/nanolib/commit/0abcb41b9440324a70e2b782b0643bb8a51e47c6))

## [6.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.7...@alwatr/local-storage@6.1.8) (2025-09-22)

### 🐛 Bug Fixes

* update version references to schemaVersion in README and code ([c51c115](https://github.com/Alwatr/nanolib/commit/c51c115ea431bba10a248fe6e4e37dcdff6da059))

## [6.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.6...@alwatr/local-storage@6.1.7) (2025-09-21)

**Note:** Version bump only for package @alwatr/local-storage

## [6.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.5...@alwatr/local-storage@6.1.6) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [6.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.4...@alwatr/local-storage@6.1.5) (2025-09-19)

**Note:** Version bump only for package @alwatr/local-storage

## [6.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.3...@alwatr/local-storage@6.1.4) (2025-09-19)

**Note:** Version bump only for package @alwatr/local-storage

## [6.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.2...@alwatr/local-storage@6.1.3) (2025-09-15)

**Note:** Version bump only for package @alwatr/local-storage

## [6.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.1...@alwatr/local-storage@6.1.2) (2025-09-14)

### 🔨 Code Refactoring

* **package:** update keywords in package.json for debounce, local-storage, and synapse packages ([09c9cca](https://github.com/Alwatr/nanolib/commit/09c9cca3cd600e9ffaf600fb1926c0ee884a1aa8))
* remove types from tsconfig.json and adjust imports in type.ts ([ad2d3b3](https://github.com/Alwatr/nanolib/commit/ad2d3b3927db7bf3b5b54dcac5cdae751d00eb4a))

## [6.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.1.0...@alwatr/local-storage@6.1.1) (2025-09-13)

### 🐛 Bug Fixes

* remove duplicate "types" entry in package.json ([86dce1a](https://github.com/Alwatr/nanolib/commit/86dce1a88ad3c605fe03f335d4f4813aad573ed8))

## [6.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@6.0.0...@alwatr/local-storage@6.1.0) (2025-09-13)

### ✨ Features

* **local-storage:** add static version property to LocalStorageProvider ([267b4b6](https://github.com/Alwatr/nanolib/commit/267b4b6d5a7d4fb14fbea7fe3b5c11611c838170))

### 🧹 Miscellaneous Chores

* remove package-tracer dependency and related code from fetch package ([96fe4e9](https://github.com/Alwatr/nanolib/commit/96fe4e9552a205f218ceed187c55e4e904a07089))
* remove package-tracer dependency and related code from LocalStorageProvider ([84e2fc1](https://github.com/Alwatr/nanolib/commit/84e2fc1894a09908119b5456804a6404e5cdcbd3))

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.10...@alwatr/local-storage@6.0.0) (2025-09-13)

### ⚠ BREAKING CHANGES

* **local-storage:** The provider's constructor config shape and public methods have changed.
Existing callers must be updated to the new API:
- Update imports/instantiation to use the new LocalStorageProvider<T>(config: LocalStorageProviderConfig<T>).
- Replace any old config fields / method names with the new ones (e.g. versioned key handling, defaultValue handling).
- Data migration behavior changed: previous-version keys are automatically removed when version > 1.
- Update call sites that relied on prior serialization, error handling, or return semantics.

Suggested migration steps:
1. Inspect the new LocalStorageProviderConfig<T> type and adapt object literal passed to the constructor.
2. Replace old read/write/remove calls with the new method names and signatures.
3. Ensure stored values match the new serialization expectations (JSON-serializable).
4. Run tests and rehydrate any persisted data if necessary (previous keys are removed for versions >1).

### ✨ Features

* **local-storage:** add factory function to create LocalStorageProvider with detailed documentation ([eb4a04d](https://github.com/Alwatr/nanolib/commit/eb4a04de84d69497e7489b756c172ed2b0af008d))
* **local-storage:** add static method to check existence of versioned items in localStorage ([8e05938](https://github.com/Alwatr/nanolib/commit/8e059382d085aa691f296b2267a372925868f974))

### 🐛 Bug Fixes

* **local-storage:** correct typo in writeDefault method name ([c0b05c0](https://github.com/Alwatr/nanolib/commit/c0b05c0417ec75e7d9bc57c224380f34472ec467))
* **local-storage:** simplify read method by removing type check for parsed value ([23826ef](https://github.com/Alwatr/nanolib/commit/23826ef70eb22e6f092ba2c6ce11c28b3628f2f2))
* **local-storage:** standardize key naming convention in LocalStorageProvider ([043cf27](https://github.com/Alwatr/nanolib/commit/043cf27881b840d5adeb79ea4a840a15ea23e262))

### 🔨 Code Refactoring

* **local-storage:** complete API rewrite for LocalStorageProvider ([29d01d8](https://github.com/Alwatr/nanolib/commit/29d01d84fbb3ed405ce46d1870d1a929de1c838c))
* **local-storage:** enhance logging in read and write methods for better error tracking ([2cbf404](https://github.com/Alwatr/nanolib/commit/2cbf4042fcef74de016fd1ae80f8263f9de5c610))
* **local-storage:** rename private key variable and update its initialization method ([e25a8ea](https://github.com/Alwatr/nanolib/commit/e25a8ea4a4b75aeac0702fc0a9ef39a5f441e54c))
* **local-storage:** update key generation method to static and enhance documentation ([e36fd53](https://github.com/Alwatr/nanolib/commit/e36fd5355ad4b7fa7b4e629568b9a878ae868c3e))
* **types:** reorganize StorageMeta and LocalStorageProviderConfig interfaces ([d3d001e](https://github.com/Alwatr/nanolib/commit/d3d001ef041ea59981551204d84bee7635cfc192))

### 🧹 Miscellaneous Chores

* add @jest/globals dependency for testing ([a024449](https://github.com/Alwatr/nanolib/commit/a024449366e6b4aa246603528dde6586dda3379e))

## [5.5.10](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.9...@alwatr/local-storage@5.5.10) (2025-09-09)

### 🧹 Miscellaneous Chores

* remove trailing newlines from contributing sections in README files ([e8ab1bc](https://github.com/Alwatr/nanolib/commit/e8ab1bc43e0addea5ccd4c897c2cec597cb9e15f))

## [5.5.9](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.8...@alwatr/local-storage@5.5.9) (2025-09-06)

### 🐛 Bug Fixes

* support json primitive values ([0af6a75](https://github.com/Alwatr/nanolib/commit/0af6a75881073a586d89666679b1c2e351f48224))

### 🔨 Code Refactoring

* update type definitions for getItem and setItem to use JsonValue for consistency ([140cd09](https://github.com/Alwatr/nanolib/commit/140cd09c4c4cdab480fd2263f387bf9385b497ef))

## [5.5.8](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.7...@alwatr/local-storage@5.5.8) (2025-09-05)

**Note:** Version bump only for package @alwatr/local-storage

## [5.5.7](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.6...@alwatr/local-storage@5.5.7) (2025-09-01)

**Note:** Version bump only for package @alwatr/local-storage

## [5.5.6](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.5...@alwatr/local-storage@5.5.6) (2025-08-23)

**Note:** Version bump only for package @alwatr/local-storage

## [5.5.5](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.3...@alwatr/local-storage@5.5.5) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))

### 🔗 Dependencies update

* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.5.4](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.3...@alwatr/local-storage@5.5.4) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## <small>5.5.3 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/local-storage

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.1...@alwatr/local-storage@5.5.2) (2025-04-01)

**Note:** Version bump only for package @alwatr/local-storage

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.5.0...@alwatr/local-storage@5.5.1) (2025-03-18)

**Note:** Version bump only for package @alwatr/local-storage

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@5.4.0...@alwatr/local-storage@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.8...@alwatr/local-storage@5.4.0) (2025-02-18)

## 5.3.0 (2025-02-03)

### Features

* **local-storage:** add setItem after getItem and add hasItem ([a1b845d](https://github.com/Alwatr/nanolib/commit/a1b845d8d9d207b514f9e06c37610220337b0235)) by @

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.

### Code Refactoring

* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

## [5.3.0](https://github.com/Alwatr/nanolib/compare/v5.2.1...v5.3.0) (2025-02-03)

### Features

* **local-storage:** add setItem after getItem and add hasItem ([a1b845d](https://github.com/Alwatr/nanolib/commit/a1b845d8d9d207b514f9e06c37610220337b0235)) by @ArmanAsadian

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @ArmanAsadian

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @dependabot[bot]
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @alimd

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.

### Features

* **local-storage:** If the version is greater than 1, remove the previous version. ([1fdff96](https://github.com/Alwatr/nanolib/commit/1fdff9696a9cf7f1ced0a4c905ea62eb4c422f7a)) by @
* **local-storage:** Rewrite local storage module ([5ed0f39](https://github.com/Alwatr/nanolib/commit/5ed0f39d090c027bb600a5d061ede887b4669198)) by @
* **local-storage:** separate package from `@alwatr/util` ([4cc22ed](https://github.com/Alwatr/nanolib/commit/4cc22eda8d89f291783eef3b8917434489b628e1)) by @
* use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @

### Bug Fixes

* all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @
* **local-storage:** Remove unused dependency and update tsconfig references ([b1caaea](https://github.com/Alwatr/nanolib/commit/b1caaea8565cd497d31d91e4e2ea1becd84a82a4)) by @

### Code Refactoring

* **local-storage:** update removeItem method to use localStorage instead of window.localStorage ([9680a14](https://github.com/Alwatr/nanolib/commit/9680a141a4366d4bb146a73ffcd1bb63dd14f27c)) by @
* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Miscellaneous Chores

* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* **local-storage:** change the license to AGPL-3.0 ([ef7ea07](https://github.com/Alwatr/nanolib/commit/ef7ea075094c88d90d2ddc6fb9612ae18d792225)) by @
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @
* Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.7...@alwatr/local-storage@1.1.8) (2024-11-02)

**Note:** Version bump only for package @alwatr/local-storage

## [1.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.6...@alwatr/local-storage@1.1.7) (2024-10-25)

### Code Refactoring

* **local-storage:** update removeItem method to use localStorage instead of window.localStorage ([9680a14](https://github.com/Alwatr/nanolib/commit/9680a141a4366d4bb146a73ffcd1bb63dd14f27c)) by @alimd

## [1.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.5...@alwatr/local-storage@1.1.6) (2024-10-12)

**Note:** Version bump only for package @alwatr/local-storage

## [1.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.4...@alwatr/local-storage@1.1.5) (2024-10-11)

### Code Refactoring

- prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @mohammadhonarvar

## [1.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.3...@alwatr/local-storage@1.1.4) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [1.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.2...@alwatr/local-storage@1.1.3) (2024-10-11)

**Note:** Version bump only for package @alwatr/local-storage

## [1.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.1...@alwatr/local-storage@1.1.2) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.1.0...@alwatr/local-storage@1.1.1) (2024-10-08)

**Note:** Version bump only for package @alwatr/local-storage

## [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.10...@alwatr/local-storage@1.1.0) (2024-09-29)

### Features

- **local-storage:** If the version is greater than 1, remove the previous version. ([1fdff96](https://github.com/Alwatr/nanolib/commit/1fdff9696a9cf7f1ced0a4c905ea62eb4c422f7a)) by @alimd
- use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @mohammadhonarvar

### Bug Fixes

- all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @mohammadhonarvar

### Code Refactoring

- use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @alimd

### Miscellaneous Chores

- **local-storage:** change the license to AGPL-3.0 ([ef7ea07](https://github.com/Alwatr/nanolib/commit/ef7ea075094c88d90d2ddc6fb9612ae18d792225)) by @ArmanAsadian
- Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @alimd

## [1.0.10](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.9...@alwatr/local-storage@1.0.10) (2024-09-21)

**Note:** Version bump only for package @alwatr/local-storage

## [1.0.9](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.8...@alwatr/local-storage@1.0.9) (2024-09-15)

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]

## [1.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.7...@alwatr/local-storage@1.0.8) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [1.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.6...@alwatr/local-storage@1.0.7) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [1.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.5...@alwatr/local-storage@1.0.6) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.4...@alwatr/local-storage@1.0.5) (2024-05-12)

**Note:** Version bump only for package @alwatr/local-storage

## [1.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.3...@alwatr/local-storage@1.0.4) (2024-04-25)

**Note:** Version bump only for package @alwatr/local-storage

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.2...@alwatr/local-storage@1.0.3) (2024-03-28)

**Note:** Version bump only for package @alwatr/local-storage

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.1...@alwatr/local-storage@1.0.2) (2024-01-31)

**Note:** Version bump only for package @alwatr/local-storage

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/local-storage@1.0.0...@alwatr/local-storage@1.0.1) (2024-01-24)

**Note:** Version bump only for package @alwatr/local-storage

## 1.0.0 (2024-01-16)

### Features

- **local-storage:** Rewrite local storage module ([5ed0f39](https://github.com/Alwatr/nanolib/commit/5ed0f39d090c027bb600a5d061ede887b4669198)) by @alimd
- **local-storage:** separate package from `@alwatr/util` ([4cc22ed](https://github.com/Alwatr/nanolib/commit/4cc22eda8d89f291783eef3b8917434489b628e1)) by @njfamirm

### Bug Fixes

- **local-storage:** Remove unused dependency and update tsconfig references ([b1caaea](https://github.com/Alwatr/nanolib/commit/b1caaea8565cd497d31d91e4e2ea1becd84a82a4)) by @alimd
