# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/env@6.0.1...@alwatr/env@6.0.2) (2026-03-27)

### 🧹 Miscellaneous Chores

* add "types" option to compilerOptions in tsconfig.json files ([bcb6204](https://github.com/Alwatr/nanolib/commit/bcb620419cec2bba4e11a68d27b25cee37a439eb))
* update TypeScript version to ^6.0.2 across all packages ([d6b2bf3](https://github.com/Alwatr/nanolib/commit/d6b2bf3ce064eb927c56d9f8c7a5d3138adde998))

## [6.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/env@6.0.0...@alwatr/env@6.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))
* remove "types" field from package.json in multiple packages ([b2a458d](https://github.com/Alwatr/nanolib/commit/b2a458d3b1028175e6bc8d0485d223e7d22a1773))

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.30...@alwatr/env@6.0.0) (2026-03-19)

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

## [5.5.30](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.29...@alwatr/env@5.5.30) (2026-03-18)

**Note:** Version bump only for package @alwatr/env

## [5.5.29](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.28...@alwatr/env@5.5.29) (2026-03-16)

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

### 🔗 Dependencies update

* bump the npm-dependencies group with 10 updates ([c48d9ba](https://github.com/Alwatr/nanolib/commit/c48d9baa1cd7c2dc144b3e01e0fda60bf87c074c))

## [5.5.28](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.27...@alwatr/env@5.5.28) (2026-02-18)

### 🔗 Dependencies update

* update @types/node to version 24.10.13 across multiple packages ([4c6d2a3](https://github.com/Alwatr/nanolib/commit/4c6d2a37ab26b1c86812b2aa38b2eca4ee097cb6))

## [5.5.27](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.26...@alwatr/env@5.5.27) (2025-12-23)

### 🔗 Dependencies update

* upgrade @types/node to version 24.10.4 and update related dependencies ([acf04df](https://github.com/Alwatr/nanolib/commit/acf04df71647f5a401ef5e6bbfffcc478e4326d2))

## [5.5.26](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.25...@alwatr/env@5.5.26) (2025-12-13)

### 🔗 Dependencies update

* update `@types/node` and `[@lerna-lite](https://github.com/lerna-lite)` dependencies. ([8daa8fd](https://github.com/Alwatr/nanolib/commit/8daa8fd023d5414c9f95feb4319353c6ea34be31))

## [5.5.25](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.24...@alwatr/env@5.5.25) (2025-12-10)

### 🔗 Dependencies update

* Upgrade lerna-lite, prettier, types/node, and yarn dependencies. ([42a7fca](https://github.com/Alwatr/nanolib/commit/42a7fca15430aca2ac1eaa19496c2a2ebfc8c470))

## [5.5.24](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.23...@alwatr/env@5.5.24) (2025-11-18)

### 🔨 Code Refactoring

* remove unnecessary type declarations from tsconfig.json files ([89bcc7d](https://github.com/Alwatr/nanolib/commit/89bcc7db839807110b80f8ba34414ea9734d9c75))

## [5.5.23](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.22...@alwatr/env@5.5.23) (2025-11-15)

### 🔗 Dependencies update

* bump the npm-dependencies group with 2 updates ([a80b84d](https://github.com/Alwatr/nanolib/commit/a80b84dada6c09b5e5621e7487c8ec13fff3c23a))

## [5.5.22](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.21...@alwatr/env@5.5.22) (2025-11-15)

**Note:** Version bump only for package @alwatr/env

## [5.5.21](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.20...@alwatr/env@5.5.21) (2025-11-04)

### 🔗 Dependencies update

* bump the npm-dependencies group across 1 directory with 9 updates ([fdf29d5](https://github.com/Alwatr/nanolib/commit/fdf29d5aa89983cb06f79d42650a364521f5c4b9))
* update @types/node from ^22.18.12 to ^24.10.0 across multiple packages ([1169a86](https://github.com/Alwatr/nanolib/commit/1169a86001da2abfbe99a7da33c8e92183f553f6))

## [5.5.20](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.19...@alwatr/env@5.5.20) (2025-10-06)

### 🔗 Dependencies update

* bump the npm-dependencies group with 4 updates ([9825815](https://github.com/Alwatr/nanolib/commit/982581552bbb4b97dca52af5e93a80937f0c3109))

## [5.5.19](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.18...@alwatr/env@5.5.19) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [5.5.18](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.17...@alwatr/env@5.5.18) (2025-09-22)

**Note:** Version bump only for package @alwatr/env

## [5.5.17](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.16...@alwatr/env@5.5.17) (2025-09-22)

**Note:** Version bump only for package @alwatr/env

## [5.5.16](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.15...@alwatr/env@5.5.16) (2025-09-21)

**Note:** Version bump only for package @alwatr/env

## [5.5.15](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.14...@alwatr/env@5.5.15) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [5.5.14](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.13...@alwatr/env@5.5.14) (2025-09-19)

**Note:** Version bump only for package @alwatr/env

## [5.5.13](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.12...@alwatr/env@5.5.13) (2025-09-15)

**Note:** Version bump only for package @alwatr/env

## [5.5.12](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.11...@alwatr/env@5.5.12) (2025-09-13)

### 🔗 Dependencies update

* update @types/node version to ^22.18.3 in multiple package.json files ([13db6fc](https://github.com/Alwatr/nanolib/commit/13db6fc176bc6cdcefedc50d77ac550bd5052c9a))

## [5.5.11](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.10...@alwatr/env@5.5.11) (2025-09-13)

### 🧹 Miscellaneous Chores

* remove package-tracer dependency and related code from fetch package ([96fe4e9](https://github.com/Alwatr/nanolib/commit/96fe4e9552a205f218ceed187c55e4e904a07089))

## [5.5.10](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.9...@alwatr/env@5.5.10) (2025-09-09)

### 🧹 Miscellaneous Chores

* remove trailing newlines from contributing sections in README files ([e8ab1bc](https://github.com/Alwatr/nanolib/commit/e8ab1bc43e0addea5ccd4c897c2cec597cb9e15f))

## [5.5.9](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.8...@alwatr/env@5.5.9) (2025-09-06)

**Note:** Version bump only for package @alwatr/env

## [5.5.8](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.7...@alwatr/env@5.5.8) (2025-09-05)

### 🔗 Dependencies update

* update jest to version 30.1.3 and @types/node to version 22.18.1 ([754212b](https://github.com/Alwatr/nanolib/commit/754212b1523cfc4cfe26c9e9f6d634aa8311e0b7))

## [5.5.7](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.6...@alwatr/env@5.5.7) (2025-09-01)

### 🔗 Dependencies update

* update lerna-lite dependencies to version 4.7.3 and jest to 30.1.2 ([95d7870](https://github.com/Alwatr/nanolib/commit/95d7870ec7ad1e6ed2688bafddcabf46857f6981))

## [5.5.6](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.5...@alwatr/env@5.5.6) (2025-08-23)

**Note:** Version bump only for package @alwatr/env

## [5.5.5](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.3...@alwatr/env@5.5.5) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))

### 🔗 Dependencies update

* revert @types/node version to ^22.17.2 (LTS) ([49f8101](https://github.com/Alwatr/nanolib/commit/49f8101eac5c41aa7684112f4308254dbfab9787))
* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.5.4](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.3...@alwatr/env@5.5.4) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## <small>5.5.3 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/env

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.1...@alwatr/env@5.5.2) (2025-04-01)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([c1320b4](https://github.com/Alwatr/nanolib/commit/c1320b447a492c5e720e25ad71e9df81eeea3670)) by @dependabot[bot]

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.5.0...@alwatr/env@5.5.1) (2025-03-18)

### Dependencies update

* bump the development-dependencies group with 9 updates ([7290aa3](https://github.com/Alwatr/nanolib/commit/7290aa3b52ce66ca237d2a12d28a7687b113f83d)) by @dependabot[bot]

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/env@5.4.0...@alwatr/env@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/env@1.0.1...@alwatr/env@5.4.0) (2025-02-18)

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

### Bug Fixes

* **env:** package.json path ([fff643d](https://github.com/Alwatr/nanolib/commit/fff643d949340e84509502e62b2587d03a47e034)) by @

### Code Refactoring

* **env:** rename package and function ([6d72576](https://github.com/Alwatr/nanolib/commit/6d72576576964ba4bf3bdc5767e14d9293f941c9)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @
* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/env@1.0.0...@alwatr/env@1.0.1) (2024-11-02)

### Dependencies update

* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @alimd

## 1.0.0 (2024-10-25)

### Bug Fixes

* **env:** package.json path ([fff643d](https://github.com/Alwatr/nanolib/commit/fff643d949340e84509502e62b2587d03a47e034)) by @alimd

### Code Refactoring

* **env:** rename package and function ([6d72576](https://github.com/Alwatr/nanolib/commit/6d72576576964ba4bf3bdc5767e14d9293f941c9)) by @alimd

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @dependabot[bot]
