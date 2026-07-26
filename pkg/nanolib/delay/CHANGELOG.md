# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.0.0](https://github.com/Alwatr/alwatr/compare/v9.38.2...v10.0.0) (2026-07-26)

### 🔗 Dependencies update

* update @happy-dom/global-registrator to version 20.11.1 in multiple packages and upgrade prettier to version 3.9.6 ([fd85555](https://github.com/Alwatr/alwatr/commit/fd855554de36e3b99637ca4277f6f863558639b3))

## [9.38.2](https://github.com/Alwatr/alwatr/compare/v9.38.1...v9.38.2) (2026-07-12)

### 🧹 Miscellaneous Chores

* update TypeScript and related dependencies to version 7.0.2 across all packages; upgrade prettier to version 3.9.5 ([d84e7af](https://github.com/Alwatr/alwatr/commit/d84e7afd24b5b7660f14e1a03b868979e43dc880))

## [9.38.1](https://github.com/Alwatr/alwatr/compare/v9.38.0...v9.38.1) (2026-06-28)

### 🔗 Dependencies update

* update @happy-dom/global-registrator to version ^20.10.6 across multiple packages ([d3ac891](https://github.com/Alwatr/alwatr/commit/d3ac891b06e4379fe227cfa68e34fd72e31d45be))

## [9.37.0](https://github.com/Alwatr/alwatr/compare/v9.36.0...v9.37.0) (2026-06-13)

### 🔗 Dependencies update

* update @happy-dom/global-registrator to version 20.10.3 across all packages ([822da2a](https://github.com/Alwatr/alwatr/commit/822da2ad620d190856b2ec0fe6649c3d3de2059a))

## [9.36.0](https://github.com/Alwatr/alwatr/compare/v9.35.0...v9.36.0) (2026-06-11)

**Note:** Version bump only for package @alwatr/delay

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

### 🐛 Bug Fixes

* standardize formatting and improve descriptions across multiple packages ([24f22e4](https://github.com/Alwatr/alwatr/commit/24f22e451cf3a1edb891943ef179cc18192079bf))

### 🔨 Code Refactoring

* **delay:** remove platform-info dependency and improve browser check ([b7135e4](https://github.com/Alwatr/alwatr/commit/b7135e4d2a929069c5d1c91f558932f7019a49e1))

## [9.33.0](https://github.com/Alwatr/alwatr/compare/v9.32.0...v9.33.0) (2026-06-10)

### 🔗 Dependencies update

* update package versions to use workspace references ([42201b3](https://github.com/Alwatr/alwatr/commit/42201b32cf0dddf0e26f1e0299bb36e2243424e1))

## [9.32.0](https://github.com/Alwatr/alwatr/compare/v9.31.0...v9.32.0) (2026-06-07)

### ✨ Features

* **delay:** add delay.scheduleIdleBatch promise to handle task batching during idle periods ([7d1dab0](https://github.com/Alwatr/alwatr/commit/7d1dab0d30b7ac8ba1cf021486a5c5d8bfa2c2c9))
* **delay:** add requestNextRender function to handle post-render calculations ([9f26fe1](https://github.com/Alwatr/alwatr/commit/9f26fe11dee60fda4b0e824d4e02762bb5dc76cf))
* **delay:** implement scheduleIdleBatch function for batching non-critical tasks ([70849f1](https://github.com/Alwatr/alwatr/commit/70849f1ca394296ac39c99f0d2fac6aff676f263))
* **delay:** refactor nextRender function to use requestNextRender for improved performance ([729474d](https://github.com/Alwatr/alwatr/commit/729474d2ddaab77d17d63ca27a12fbc67b60725e))

### 🐛 Bug Fixes

* **delay:** correct import paths for consistency across delay module files ([566ebb3](https://github.com/Alwatr/alwatr/commit/566ebb336281f8452944928bb9b707f19271c9cb))

### 🔨 Code Refactoring

* **delay:** rename files ([77d036b](https://github.com/Alwatr/alwatr/commit/77d036bac7eb7f3345b1f3c69c46b563e973cc19))

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

### 🔗 Dependencies update

* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([98e8325](https://github.com/Alwatr/alwatr/commit/98e83252c3db81092e3ac1c8d214a696a7513517))
* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([5b3f9cf](https://github.com/Alwatr/alwatr/commit/5b3f9cf3d1a99e5ceb0c3bd70e215e63155b0308))

## [9.30.0](https://github.com/Alwatr/alwatr/compare/v9.29.0...v9.30.0) (2026-06-02)

### ✨ Features

* **delay:** add nextRender utility to wait for two animation frames ([4827156](https://github.com/Alwatr/alwatr/commit/4827156e04d753156e5ebea5a7fccfaa423a86a2))

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

### ✨ Features

* **delay:** add @alwatr/platform-info as a dependency ([95df848](https://github.com/Alwatr/alwatr/commit/95df848bea7c45f81ec0d87ee514bd030ac64bcb))
* **delay:** enhance delay module with robust scheduling functions and remove polyfill ([f349b80](https://github.com/Alwatr/alwatr/commit/f349b8008f9d573c80492a8f9545dce4f4f55acc))
* **delay:** enhance queueMacrotask implementation with robust FIFO management and detailed documentation ([2c13be8](https://github.com/Alwatr/alwatr/commit/2c13be80bfbb67273ddafd3eee79dd1056504074))
* **delay:** implement new delay utility with various asynchronous control methods and add queueMacrotask functionality ([e8b2d63](https://github.com/Alwatr/alwatr/commit/e8b2d6369be47bd3fe3bd1b6ac983ff2e6f2629a))
* **queueMacrotask:** enhance fallback logic and improve documentation clarity ([302a6e1](https://github.com/Alwatr/alwatr/commit/302a6e1ec63734d39585a498219902e82c5d40ae))

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

**Note:** Version bump only for package @alwatr/delay

## [9.24.0](https://github.com/Alwatr/alwatr/compare/v9.23.4...v9.24.0) (2026-05-14)

### 🔗 Dependencies update

* update @types/node and other dependencies to latest versions ([51df398](https://github.com/Alwatr/alwatr/commit/51df398cedf840ab72b3e5bbae9b4e3fafcc6299))

## [9.23.3](https://github.com/Alwatr/alwatr/compare/v9.23.2...v9.23.3) (2026-05-12)

### 🔗 Dependencies update

* update @types/node version to ^24.12.3 across multiple packages ([c73c199](https://github.com/Alwatr/alwatr/commit/c73c199617e2e22fb54655e78c0d07683759e35d))

## [9.20.0](https://github.com/Alwatr/alwatr/compare/v9.19.1...v9.20.0) (2026-04-30)

**Note:** Version bump only for package @alwatr/delay

## [9.16.0](https://github.com/Alwatr/alwatr/compare/v9.15.0...v9.16.0) (2026-04-27)

**Note:** Version bump only for package @alwatr/delay

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* add type imports from @alwatr/type-helper across multiple packages ([9e44c20](https://github.com/Alwatr/alwatr/commit/9e44c20b724b91452848e4ca4344f16133573bcb))
* **tsconfig:** remove @alwatr/type-helper from types array across multiple packages ([09a2177](https://github.com/Alwatr/alwatr/commit/09a2177c0c22631287e896543a4052201d912224))

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/delay

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

**Note:** Version bump only for package @alwatr/delay

## [9.7.0](https://github.com/Alwatr/alwatr/compare/v9.6.1...v9.7.0) (2026-04-14)

**Note:** Version bump only for package @alwatr/delay

## [9.4.5](https://github.com/Alwatr/alwatr/compare/v9.4.4...v9.4.5) (2026-04-11)

**Note:** Version bump only for package @alwatr/delay

## [9.4.0](https://github.com/Alwatr/alwatr/compare/v9.3.0...v9.4.0) (2026-04-05)

**Note:** Version bump only for package @alwatr/delay

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### 🔨 Code Refactoring

* update TypeScript configuration to extend from @alwatr/standard/tsconfig ([3e52ee2](https://github.com/Alwatr/alwatr/commit/3e52ee2152b4264ed994ec72610be5828fbdc6d2))

## [9.2.1](https://github.com/Alwatr/alwatr/compare/v9.2.0...v9.2.1) (2026-04-04)

### 🔗 Dependencies update

* downgrade @types/node version to ^24.12.2 across multiple packages ([4c7f054](https://github.com/Alwatr/alwatr/commit/4c7f0549777f3a2761fa100d2b0905a07b8eb4ff))

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
* format package.json of all packages ([16bd4c9](https://github.com/Alwatr/alwatr/commit/16bd4c91c8e0cce78f8def0bb0c0b5cdb779a3d2))
* rename all pageckage inside pkg/nanolib ([8584300](https://github.com/Alwatr/alwatr/commit/85843005c3c34bdf391a718cacaf5d6eb9786fe7))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update logger imports to replace nanolib with nano-build across multiple files ([26a07af](https://github.com/Alwatr/alwatr/commit/26a07afe5fc8761a15ff12538f485a6757d75c74))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))

## [7.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@7.0.1...@alwatr/delay@7.0.2) (2026-03-27)

### 🧹 Miscellaneous Chores

* update TypeScript version to ^6.0.2 across all packages ([d6b2bf3](https://github.com/Alwatr/nanolib/commit/d6b2bf3ce064eb927c56d9f8c7a5d3138adde998))

## [7.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@7.0.0...@alwatr/delay@7.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))
* remove "types" field from package.json in multiple packages ([b2a458d](https://github.com/Alwatr/nanolib/commit/b2a458d3b1028175e6bc8d0485d223e7d22a1773))

## [7.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.22...@alwatr/delay@7.0.0) (2026-03-19)

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

## [6.0.22](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.21...@alwatr/delay@6.0.22) (2026-03-18)

**Note:** Version bump only for package @alwatr/delay

## [6.0.21](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.20...@alwatr/delay@6.0.21) (2026-03-16)

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

### 🔗 Dependencies update

* bump the npm-dependencies group with 10 updates ([c48d9ba](https://github.com/Alwatr/nanolib/commit/c48d9baa1cd7c2dc144b3e01e0fda60bf87c074c))

## [6.0.20](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.19...@alwatr/delay@6.0.20) (2026-02-18)

### 🔗 Dependencies update

* update @types/node to version 24.10.13 across multiple packages ([4c6d2a3](https://github.com/Alwatr/nanolib/commit/4c6d2a37ab26b1c86812b2aa38b2eca4ee097cb6))

## [6.0.19](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.18...@alwatr/delay@6.0.19) (2025-12-23)

### 🔗 Dependencies update

* upgrade @types/node to version 24.10.4 and update related dependencies ([acf04df](https://github.com/Alwatr/nanolib/commit/acf04df71647f5a401ef5e6bbfffcc478e4326d2))

## [6.0.18](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.17...@alwatr/delay@6.0.18) (2025-12-13)

### 🔗 Dependencies update

* update `@types/node` and `[@lerna-lite](https://github.com/lerna-lite)` dependencies. ([8daa8fd](https://github.com/Alwatr/nanolib/commit/8daa8fd023d5414c9f95feb4319353c6ea34be31))

## [6.0.17](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.16...@alwatr/delay@6.0.17) (2025-12-10)

### 🔗 Dependencies update

* Upgrade lerna-lite, prettier, types/node, and yarn dependencies. ([42a7fca](https://github.com/Alwatr/nanolib/commit/42a7fca15430aca2ac1eaa19496c2a2ebfc8c470))

## [6.0.16](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.15...@alwatr/delay@6.0.16) (2025-11-18)

### 🐛 Bug Fixes

* add type imports from @alwatr/nano-build and @alwatr/type-helper across multiple packages ([5ab7f15](https://github.com/Alwatr/nanolib/commit/5ab7f159ba57788bf8df40fa96a3027f589d5a77))

### 🔨 Code Refactoring

* remove unnecessary type declarations from tsconfig.json files ([89bcc7d](https://github.com/Alwatr/nanolib/commit/89bcc7db839807110b80f8ba34414ea9734d9c75))

## [6.0.15](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.14...@alwatr/delay@6.0.15) (2025-11-15)

### 🔗 Dependencies update

* bump the npm-dependencies group with 2 updates ([a80b84d](https://github.com/Alwatr/nanolib/commit/a80b84dada6c09b5e5621e7487c8ec13fff3c23a))

## [6.0.14](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.13...@alwatr/delay@6.0.14) (2025-11-15)

**Note:** Version bump only for package @alwatr/delay

## [6.0.13](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.12...@alwatr/delay@6.0.13) (2025-11-04)

### 🔗 Dependencies update

* bump the npm-dependencies group across 1 directory with 9 updates ([fdf29d5](https://github.com/Alwatr/nanolib/commit/fdf29d5aa89983cb06f79d42650a364521f5c4b9))
* update @types/node from ^22.18.12 to ^24.10.0 across multiple packages ([1169a86](https://github.com/Alwatr/nanolib/commit/1169a86001da2abfbe99a7da33c8e92183f553f6))

## [6.0.12](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.11...@alwatr/delay@6.0.12) (2025-10-06)

### 🔗 Dependencies update

* bump the npm-dependencies group with 4 updates ([9825815](https://github.com/Alwatr/nanolib/commit/982581552bbb4b97dca52af5e93a80937f0c3109))

## [6.0.11](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.10...@alwatr/delay@6.0.11) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [6.0.10](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.9...@alwatr/delay@6.0.10) (2025-09-22)

**Note:** Version bump only for package @alwatr/delay

## [6.0.9](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.8...@alwatr/delay@6.0.9) (2025-09-22)

**Note:** Version bump only for package @alwatr/delay

## [6.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.7...@alwatr/delay@6.0.8) (2025-09-21)

**Note:** Version bump only for package @alwatr/delay

## [6.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.6...@alwatr/delay@6.0.7) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))
* remove unnecessary pure annotations ([adeb916](https://github.com/Alwatr/nanolib/commit/adeb9166f8e911f59269032b76c36cb1888332cf))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [6.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.5...@alwatr/delay@6.0.6) (2025-09-19)

**Note:** Version bump only for package @alwatr/delay

## [6.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.4...@alwatr/delay@6.0.5) (2025-09-15)

**Note:** Version bump only for package @alwatr/delay

## [6.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.3...@alwatr/delay@6.0.4) (2025-09-14)

**Note:** Version bump only for package @alwatr/delay

## [6.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.2...@alwatr/delay@6.0.3) (2025-09-13)

### 🔗 Dependencies update

* update @types/node version to ^22.18.3 in multiple package.json files ([13db6fc](https://github.com/Alwatr/nanolib/commit/13db6fc176bc6cdcefedc50d77ac550bd5052c9a))

## [6.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.1...@alwatr/delay@6.0.2) (2025-09-13)

### 🧹 Miscellaneous Chores

* remove package-tracer dependency and related code from fetch package ([96fe4e9](https://github.com/Alwatr/nanolib/commit/96fe4e9552a205f218ceed187c55e4e904a07089))

## [6.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@6.0.0...@alwatr/delay@6.0.1) (2025-09-09)

**Note:** Version bump only for package @alwatr/delay

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.11...@alwatr/delay@6.0.0) (2025-09-08)

### ⚠ BREAKING CHANGES

* **delay:** The API has been completely redesigned. All previous standalone functions are removed and replaced by methods on the `delay` object.

- **REMOVED:**
  - `untilNextAnimationFrame`
  - `untilIdle`
  - `untilDomEvent`
  - `untilEvent`
  - `immediate`
  - `nextMicrotask`

- **ADDED:**
  - `delay.animationFrame` (replaces `waitForAnimationFrame`)
  - `delay.idleCallback` (replaces `waitForIdle`)
  - `delay.domEvent` (replaces `waitForDomEvent`)
  - `delay.event` (replaces `waitForEvent`)
  - `delay.nextMacrotask` (replaces `waitForImmediate`)
  - `delay.nextMicrotask` (replaces `waitForMicrotask`)

Users must update their code to import the `delay` object and use the new method names. For example, `delay.immediate()` should be changed to `delay.nextMacrotask()`.

### ✨ Features

* **delay:** Overhaul delay module with improved API and corrected implementations ([7c12483](https://github.com/Alwatr/nanolib/commit/7c1248354f2535a65cb7981c42ad4e319badb4aa))

### 🔨 Code Refactoring

* **polyfill:** rename global_ to globalThis for clarity and consistency ([7d1484f](https://github.com/Alwatr/nanolib/commit/7d1484fb91a66d46b62011d0fb7825f3089183f8))
* **polyfill:** streamline requestAnimationFrame and requestIdleCallback implementations ([d18443d](https://github.com/Alwatr/nanolib/commit/d18443d4dedddff8f54227aa7aff2bca5aaacdfa))

### 🧹 Miscellaneous Chores

* **main:** export requestAnimationFrame and requestIdleCallback from main module ([ef80797](https://github.com/Alwatr/nanolib/commit/ef80797319e3bded5c36e98352b6317427d08a59))

## [5.5.11](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.10...@alwatr/delay@5.5.11) (2025-09-06)

**Note:** Version bump only for package @alwatr/delay

## [5.5.10](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.9...@alwatr/delay@5.5.10) (2025-09-05)

### 🔗 Dependencies update

* update jest to version 30.1.3 and @types/node to version 22.18.1 ([754212b](https://github.com/Alwatr/nanolib/commit/754212b1523cfc4cfe26c9e9f6d634aa8311e0b7))

## [5.5.9](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.8...@alwatr/delay@5.5.9) (2025-09-01)

### 🔗 Dependencies update

* update lerna-lite dependencies to version 4.7.3 and jest to 30.1.2 ([95d7870](https://github.com/Alwatr/nanolib/commit/95d7870ec7ad1e6ed2688bafddcabf46857f6981))

## [5.5.8](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.7...@alwatr/delay@5.5.8) (2025-08-23)

**Note:** Version bump only for package @alwatr/delay

## [5.5.7](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.4...@alwatr/delay@5.5.7) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* fix packages/delay/package.json dir ([9777696](https://github.com/Alwatr/nanolib/commit/9777696f070eef855058a791057dde948f6b564b))
* fix packages/delay/package.json homepage ([eb054b9](https://github.com/Alwatr/nanolib/commit/eb054b95e56840e2835e5a300647c3e6ddf0e21a))
* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))
* remove license and contributing sections from README.md ([ba91e2d](https://github.com/Alwatr/nanolib/commit/ba91e2d7faa883f4f2f74e762ee361b48839ce7c))

### 🔗 Dependencies update

* revert @types/node version to ^22.17.2 (LTS) ([49f8101](https://github.com/Alwatr/nanolib/commit/49f8101eac5c41aa7684112f4308254dbfab9787))
* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.5.5](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.4...@alwatr/delay@5.5.5) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## [5.5.4](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.3...@alwatr/delay@5.5.4) (2025-04-20)

**Note:** Version bump only for package @alwatr/delay

## <small>5.5.3 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/delay

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.1...@alwatr/delay@5.5.2) (2025-04-01)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([c1320b4](https://github.com/Alwatr/nanolib/commit/c1320b447a492c5e720e25ad71e9df81eeea3670)) by @dependabot[bot]

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.5.0...@alwatr/delay@5.5.1) (2025-03-18)

### Bug Fixes

* **delay:** specify type for getGlobalThis in polyfill.ts ([57fa717](https://github.com/Alwatr/nanolib/commit/57fa7173f6b040f7d4e536ecb18cf41fbaf218ea)) by @alimd

### Dependencies update

* bump the development-dependencies group with 9 updates ([7290aa3](https://github.com/Alwatr/nanolib/commit/7290aa3b52ce66ca237d2a12d28a7687b113f83d)) by @dependabot[bot]

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@5.4.0...@alwatr/delay@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.8...@alwatr/delay@5.4.0) (2025-02-18)

### Dependencies update

* bump @types/node from ^22.13.0 to ^22.13.4 and prettier from 3.4.2 to 3.5.1; update eslint-import-resolver-typescript to 3.8.2 ([b9a8399](https://github.com/Alwatr/nanolib/commit/b9a8399add39509e90bfdc589fb5e2321718029d)) by @

## 5.3.0 (2025-02-03)

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

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @ArmanAsadian

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @dependabot[bot]
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @alimd

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.

### Features

* use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @

### Bug Fixes

* use new `global-this` package & remove global type & prevent sidee-ffects ([092d448](https://github.com/Alwatr/nanolib/commit/092d44885738ed58215698917ae97c13958f7c7d)) by @

### Code Refactoring

* **delay:** prevent side-effects ([f92eeed](https://github.com/Alwatr/nanolib/commit/f92eeed7d917f6eb3ca9a407fab0b1ea77adc1d4)) by @
* **delay:** update delay package to use @alwatr/parse-duration for duration delays ([cca1be2](https://github.com/Alwatr/nanolib/commit/cca1be2dcfeec6dce388562ef867b81af1823b62)) by @
* **delay:** update untilIdle function to accept Duration instead of DurationString ([b3a5c32](https://github.com/Alwatr/nanolib/commit/b3a5c322a1b59833693149da644c7d2eddd6a374)) by @
* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @
* use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @
* use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @
* **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @

### Miscellaneous Chores

* fix versions ([497a6d8](https://github.com/Alwatr/nanolib/commit/497a6d81ae5989e566e96d498fc5f1b6c80193ae)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @
* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @

## [1.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.7...@alwatr/delay@1.0.8) (2024-11-02)

### Dependencies update

* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @alimd

## [1.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.6...@alwatr/delay@1.0.7) (2024-10-25)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @dependabot[bot]
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @dependabot[bot]

## [1.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.5...@alwatr/delay@1.0.6) (2024-10-12)

**Note:** Version bump only for package @alwatr/delay

## [1.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.4...@alwatr/delay@1.0.5) (2024-10-11)

### Bug Fixes

- use new `global-this` package & remove global type & prevent sidee-ffects ([092d448](https://github.com/Alwatr/nanolib/commit/092d44885738ed58215698917ae97c13958f7c7d)) by @mohammadhonarvar

### Code Refactoring

- **delay:** prevent side-effects ([f92eeed](https://github.com/Alwatr/nanolib/commit/f92eeed7d917f6eb3ca9a407fab0b1ea77adc1d4)) by @mohammadhonarvar
- prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @mohammadhonarvar
- use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @mohammadhonarvar

## [1.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.3...@alwatr/delay@1.0.4) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.2...@alwatr/delay@1.0.3) (2024-10-11)

**Note:** Version bump only for package @alwatr/delay

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.1...@alwatr/delay@1.0.2) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.0.0...@alwatr/delay@1.0.1) (2024-10-08)

**Note:** Version bump only for package @alwatr/delay

## 1.0.0 (2024-09-29)

### Features

- use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @mohammadhonarvar

### Code Refactoring

- **delay:** update delay package to use @alwatr/parse-duration for duration delays ([cca1be2](https://github.com/Alwatr/nanolib/commit/cca1be2dcfeec6dce388562ef867b81af1823b62)) by @alimd
- **delay:** update untilIdle function to accept Duration instead of DurationString ([b3a5c32](https://github.com/Alwatr/nanolib/commit/b3a5c322a1b59833693149da644c7d2eddd6a374)) by @alimd
- update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @alimd
- use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @alimd
- **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @alimd

### Miscellaneous Chores

- fix versions ([497a6d8](https://github.com/Alwatr/nanolib/commit/497a6d81ae5989e566e96d498fc5f1b6c80193ae)) by @alimd

## [1.1.16](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.15...@alwatr/delay@1.1.16) (2024-09-21)

**Note:** Version bump only for package @alwatr/delay

## [1.1.15](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.14...@alwatr/delay@1.1.15) (2024-09-15)

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]
- update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @alimd

## [1.1.14](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.13...@alwatr/delay@1.1.14) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [1.1.13](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.12...@alwatr/delay@1.1.13) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [1.1.12](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.11...@alwatr/delay@1.1.12) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.1.11](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.10...@alwatr/delay@1.1.11) (2024-05-12)

### Dependencies update

- upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @alimd

## [1.1.10](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.9...@alwatr/delay@1.1.10) (2024-04-25)

**Note:** Version bump only for package @alwatr/delay

## [1.1.9](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.8...@alwatr/delay@1.1.9) (2024-03-28)

**Note:** Version bump only for package @alwatr/delay

## [1.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.7...@alwatr/delay@1.1.8) (2024-01-31)

### Bug Fixes

- exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @alimd

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @alimd

## [1.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.6...@alwatr/delay@1.1.7) (2024-01-24)

**Note:** Version bump only for package @alwatr/delay

## [1.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.5...@alwatr/delay@1.1.6) (2024-01-20)

**Note:** Version bump only for package @alwatr/delay

## [1.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.4...@alwatr/delay@1.1.5) (2024-01-16)

**Note:** Version bump only for package @alwatr/delay

## [1.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.3...@alwatr/delay@1.1.4) (2024-01-08)

**Note:** Version bump only for package @alwatr/delay

## [1.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.2...@alwatr/delay@1.1.3) (2024-01-03)

**Note:** Version bump only for package @alwatr/delay

## [1.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.1...@alwatr/delay@1.1.2) (2024-01-03)

### Bug Fixes

- **wait:** requestIdleCallback polyfill ([d41180d](https://github.com/Alwatr/nanolib/commit/d41180dc2f0c313eb86f05f60050e57e891897c3)) by @alimd

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/delay@1.1.0...@alwatr/delay@1.1.1) (2023-12-27)

**Note:** Version bump only for package @alwatr/delay

# 1.1.0 (2023-12-27)

### Bug Fixes

- deps ([34cd4fe](https://github.com/Alwatr/nanolib/commit/34cd4fead81b309765144a24add67e3f63bca127)) by @njfamirm
- **wait:** polyfill ([6a0f5fb](https://github.com/Alwatr/nanolib/commit/6a0f5fb5f0ae369d832760c026c26428689d258d)) by @alimd
- **wait:** polyfill check ([cd9befa](https://github.com/Alwatr/nanolib/commit/cd9befa0ae01090016eb16befc08d1ce17ba881d)) by @njfamirm

### Features

- **wait:** base package ([8f29498](https://github.com/Alwatr/nanolib/commit/8f294983f9250e1ec8fb60dce72347f9586c561b)) by @njfamirm
- **wait:** polyfill and docs ([9725dc2](https://github.com/Alwatr/nanolib/commit/9725dc2cfa4d70fb5dac8a2816f986ad00c4f43f)) by @njfamirm
