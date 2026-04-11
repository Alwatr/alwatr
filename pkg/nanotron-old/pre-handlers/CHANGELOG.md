# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.4.5](https://github.com/Alwatr/alwatr/compare/v9.4.4...v9.4.5) (2026-04-11)

**Note:** Version bump only for package @alwatr/pre-handlers

## [9.4.0](https://github.com/Alwatr/alwatr/compare/v9.3.0...v9.4.0) (2026-04-05)

**Note:** Version bump only for package @alwatr/pre-handlers

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
* remove unnecessary blank lines in package.json and add types to tsconfig.json ([d359ca8](https://github.com/Alwatr/alwatr/commit/d359ca81b65f1a60c6fb8917693bcddaae4fe9bc))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* reorganize the packages ([556599c](https://github.com/Alwatr/alwatr/commit/556599c0a06f4f4e696b87169e1cbdf6a33f4b4d))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json exports to ESM-only ([2deab42](https://github.com/Alwatr/alwatr/commit/2deab422f3285146a1111e97462487e1cc10b214))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update logger imports to replace nanolib with nano-build across multiple files ([26a07af](https://github.com/Alwatr/alwatr/commit/26a07afe5fc8761a15ff12538f485a6757d75c74))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))
* update package.json exports to use default entry points with .js extension ([b151afc](https://github.com/Alwatr/alwatr/commit/b151afca85c89399a6a1731da91bb8c13b7aca86))
* update package.json scripts to use nano-build with src/main.ts and replace nanolib with nano-build in devDependencies ([8d13a39](https://github.com/Alwatr/alwatr/commit/8d13a394a1d0e2364693c2ae23446958adf05381))

## [4.10.1](https://github.com/Alwatr/pre-handlers/compare/v4.10.0...v4.10.1) (2025-09-21)

### 🧹 Miscellaneous Chores

* add "sideEffects": false to package.json files for better tree-shaking ([2aae07b](https://github.com/Alwatr/pre-handlers/commit/2aae07b0e1757b6035ea0ca8c1b0eda64a13dfcc))

## [4.10.0](https://github.com/Alwatr/pre-handlers/compare/v4.9.4...v4.10.0) (2025-09-21)

### 🐛 Bug Fixes

* update function signature to allow body as JsonArray in parseBodyAsJson middleware ([11751ec](https://github.com/Alwatr/pre-handlers/commit/11751ec1bea9126165ca8ee324ae9f2c7c64db08))
* update workspace dependency versioning to use wildcard for nanotron-api-server ([0f62667](https://github.com/Alwatr/pre-handlers/commit/0f62667adfb3d35026ebe143b8f682d128ccfdc1))

### 🔨 Code Refactoring

* remove unused packageTracer import and development mode tracer from main.ts ([411708a](https://github.com/Alwatr/pre-handlers/commit/411708a37a1202098b747d902cd255c03cfad061))

### 🧹 Miscellaneous Chores

* remove Exir Studio sponsorship logo from multiple README files ([af3fd5d](https://github.com/Alwatr/pre-handlers/commit/af3fd5dda9b57d0948003db1feb0dc2dad4883d7))
* remove unused types from compiler options in tsconfig.json ([2d47851](https://github.com/Alwatr/pre-handlers/commit/2d47851db94f8c9da50d3b0a3570d02052bfe61a))
* standardize formatting in tsconfig.json files by removing trailing commas ([fb9c6b9](https://github.com/Alwatr/pre-handlers/commit/fb9c6b9648b04b038db212727e8d38761d081a65))
* update @alwatr/nanolib and @alwatr/nano-build to version 6.1.1 and 6.3.1 respectively ([81b3d5e](https://github.com/Alwatr/pre-handlers/commit/81b3d5ebf5ecc1242ee0a010631e4d920af9f3dd))
* update @alwatr/nanolib and related dependencies to version 6.x ([d824f0d](https://github.com/Alwatr/pre-handlers/commit/d824f0d5b8e008ec758842997a6e2ee6f7d078d5))
* update licenses from AGPL-3.0 to MPL-2.0 ([a84513e](https://github.com/Alwatr/pre-handlers/commit/a84513efbe12b9570c7550c887f2cdfbf67fc82b))

### 🔗 Dependencies update

* remove @alwatr/nanolib from dependencies in package.json ([62e6b0d](https://github.com/Alwatr/pre-handlers/commit/62e6b0d858e10bc0c594fd616e584f51c299bd2c))

## [4.9.4](https://github.com/Alwatr/pre-handlers/compare/v4.9.3...v4.9.4) (2025-08-23)

### 🔨 Code Refactoring

* reorganize package.json files for consistency and clarity ([bde116e](https://github.com/Alwatr/pre-handlers/commit/bde116e21f9d9bd6084940e257438916d2c3d312)) by @alimd

### 🔗 Dependencies update

* downgrade @types/node version to 22.17.2 in all package.json files ([4f01e14](https://github.com/Alwatr/pre-handlers/commit/4f01e1408d8d0954865eb9d20f90178f13e98719)) by @alimd
* update dependencies for eslint-config, lerna-lite, typescript, and nanolib ([de16a71](https://github.com/Alwatr/pre-handlers/commit/de16a718bb1c0fa569d39c824ec39a1e67ef8dfe)) by @alimd

## [4.9.3](https://github.com/Alwatr/pre-handlers/compare/v4.9.2...v4.9.3) (2025-07-23)

**Note:** Version bump only for package @alwatr/pre-handlers

## [4.9.2](https://github.com/Alwatr/pre-handlers/compare/v4.9.1...v4.9.2) (2025-07-23)

### Dependencies update

* update dependencies to latest versions ([353d048](https://github.com/Alwatr/pre-handlers/commit/353d0485a5c21ab219d84cd0a6c35f62b46c2da9)) by @alimd

## [4.9.1](https://github.com/Alwatr/pre-handlers/compare/v4.9.0...v4.9.1) (2025-03-06)

### Dependencies update

* **deps-dev:** bump the dependencies group with 5 updates ([e6a00eb](https://github.com/Alwatr/pre-handlers/commit/e6a00eb139f70f2396ecf12b68103b40aa785521)) by @dependabot[bot]
* update @alwatr/nanolib and @alwatr/nano-build to version 5.5.0; bump @alwatr/type-helper to version 5.4.0 ([1e8b122](https://github.com/Alwatr/pre-handlers/commit/1e8b1228034af44e0d4914f5100d9e564c05a5a6)) by @

## [4.9.0](https://github.com/Alwatr/pre-handlers/compare/v4.8.1...v4.9.0) (2025-02-26)

### Dependencies update

* bump @types/node from 22.13.4 to 22.13.5 and prettier from 3.5.1 to 3.5.2 across multiple packages ([3d55c9a](https://github.com/Alwatr/pre-handlers/commit/3d55c9a4044773fdc8d7c8b635311f2043f48569)) by @alimd

## [4.8.1](https://github.com/Alwatr/pre-handlers/compare/v4.8.0...v4.8.1) (2025-02-18)

### Dependencies update

* **deps-dev:** bump the dependencies group across 1 directory with 11 updates ([9257e08](https://github.com/Alwatr/pre-handlers/commit/9257e08b96f5661a7e13e153b9c71d9dbc08fd18)) by @dependabot[bot]
* update TypeScript, Prettier, and various dependencies to latest versions ([5c0f752](https://github.com/Alwatr/pre-handlers/commit/5c0f7521851acaabb2466e459754c130d7ebf31b)) by @

## [4.8.0](https://github.com/Alwatr/pre-handlers/compare/v4.7.0...v4.8.0) (2024-11-08)

**Note:** Version bump only for package @alwatr/pre-handlers

## [4.7.0](https://github.com/Alwatr/pre-handlers/compare/v4.6.0...v4.7.0) (2024-11-07)

**Note:** Version bump only for package @alwatr/pre-handlers

## [4.6.0](https://github.com/Alwatr/pre-handlers/compare/v4.5.2...v4.6.0) (2024-11-07)

### Dependencies update

* **deps-dev:** bump @types/node in the dependencies group ([9901819](https://github.com/Alwatr/pre-handlers/commit/9901819d0a7fef85736951f354bc1846294bb7fe)) by @dependabot[bot]
* **deps:** bump @alwatr/nanolib from 5.0.0 to 5.2.1 in the alwatr group ([f06afb7](https://github.com/Alwatr/pre-handlers/commit/f06afb74f363c478ffc5967bafadfa2bc9009129)) by @dependabot[bot]

## [4.5.2](https://github.com/Alwatr/pre-handlers/compare/v4.5.1...v4.5.2) (2024-11-02)

### Dependencies update

* **deps:** bump the alwatr group with 6 updates ([6636bb3](https://github.com/Alwatr/pre-handlers/commit/6636bb307401e28863eb27288d5abbaab2d67e18)) by @dependabot[bot]
* update ([86fbeb6](https://github.com/Alwatr/pre-handlers/commit/86fbeb663d94452f3596d0894ec19d4c6bed3099)) by @

## [4.5.1](https://github.com/Alwatr/pre-handlers/compare/v4.5.0...v4.5.1) (2024-10-28)

### Bug Fixes

* deps ([fc6724b](https://github.com/Alwatr/pre-handlers/commit/fc6724b3b42fac816982c94128157bb188318243)) by @

## [4.5.0](https://github.com/Alwatr/pre-handlers/compare/v4.4.1...v4.5.0) (2024-10-28)

### Features

* add `pre-handlers` package ([6578a63](https://github.com/Alwatr/pre-handlers/commit/6578a63e1dfd325947352b66d8087c9f0e70c32e)) by @mohammadhonarvar
* **pre-handlers:** Add getAuthBearer function ([43de511](https://github.com/Alwatr/pre-handlers/commit/43de511f5b7fc74836d3e31ee9f0b9db2d9a4e11)) by @AliMD
* **pre-handlers:** Add requireAccessToken middleware ([8ed4eb3](https://github.com/Alwatr/pre-handlers/commit/8ed4eb3899b89032acd13095b6c72e2676ff4eaa)) by @AliMD

### Bug Fixes

* **pre-handlers:** some issues of `review` feedbacks ([72ad94b](https://github.com/Alwatr/pre-handlers/commit/72ad94b37f059a7b765dd8bc3a5216fe53746479)) by @mohammadhonarvar

### Code Refactoring

* **pre-handlers:** Remove logger module ([70b0357](https://github.com/Alwatr/pre-handlers/commit/70b0357b0accd6ed96c0cdc62099146b36ce2660)) by @AliMD
* **pre-handlers:** Rename parse-body-as-json.ts to handler/parse-body-as-json.ts ([3d5f756](https://github.com/Alwatr/pre-handlers/commit/3d5f756453be4b40510f70925ffb3954c428a9f1)) by @AliMD
* **pre-handlers:** Update main.ts exports and add package tracer ([dc29d20](https://github.com/Alwatr/pre-handlers/commit/dc29d20f9f9d415d3cbad51b0ea7b44fbe4c1149)) by @AliMD

### Dependencies update

* update ([584ebc4](https://github.com/Alwatr/pre-handlers/commit/584ebc4271719fb3ed1e9a185d38c1a44bf35d50)) by @mohammadhonarvar
* update nanolib v1.4.0 and other deps ([b8e7be7](https://github.com/Alwatr/pre-handlers/commit/b8e7be7b6c58d4f1cbc12593b2d6124f3d19b377)) by @
