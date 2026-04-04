# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### 🔨 Code Refactoring

* update TypeScript configuration to extend from @alwatr/standard/tsconfig ([3e52ee2](https://github.com/Alwatr/alwatr/commit/3e52ee2152b4264ed994ec72610be5828fbdc6d2))

## [9.2.1](https://github.com/Alwatr/alwatr/compare/v9.2.0...v9.2.1) (2026-04-04)

**Note:** Version bump only for package @alwatr/session-storage

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

## [2.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/session-storage@2.0.1...@alwatr/session-storage@2.0.2) (2026-03-27)

### 🧹 Miscellaneous Chores

* update TypeScript version to ^6.0.2 across all packages ([d6b2bf3](https://github.com/Alwatr/nanolib/commit/d6b2bf3ce064eb927c56d9f8c7a5d3138adde998))

## [2.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/session-storage@2.0.0...@alwatr/session-storage@2.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))
* remove "types" field from package.json in multiple packages ([b2a458d](https://github.com/Alwatr/nanolib/commit/b2a458d3b1028175e6bc8d0485d223e7d22a1773))

## [2.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/session-storage@1.0.1...@alwatr/session-storage@2.0.0) (2026-03-19)

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

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/session-storage@1.0.0...@alwatr/session-storage@1.0.1) (2026-03-16)

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

## 1.0.0 (2026-02-18)

### ✨ Features

* **session-storage:** add new package for managing sessionStorage with versioning ([55b1a28](https://github.com/Alwatr/nanolib/commit/55b1a280f3534aea6a2a1ab857327d3f020eaf1b))
* **session-storage:** export types from type.js in main.ts ([db0c040](https://github.com/Alwatr/nanolib/commit/db0c0400d267df28fd5ea8beda42e332bcd45f87))
* **session-storage:** update createSessionStorageProvider to accept config object ([c80f057](https://github.com/Alwatr/nanolib/commit/c80f0575f74c98ff910e96af49e1d68728856f05))

### 🐛 Bug Fixes

* **session-storage:** rename key_ to key__ for consistency and update logging ([6ac3820](https://github.com/Alwatr/nanolib/commit/6ac3820fd5d810e742c3b490f22fec67ee1b77ca))

### 🧹 Miscellaneous Chores

* fix pre version ([d9c8b97](https://github.com/Alwatr/nanolib/commit/d9c8b97eaaa9388d843d0ed24c426be68248972f))
* remove CHANGELOG.md as it is no longer needed ([94219bf](https://github.com/Alwatr/nanolib/commit/94219bf23309e6d05d5d57aca95ac01d8cdde46f))
* update keywords in package.json files for better categorization ([cf0ddb6](https://github.com/Alwatr/nanolib/commit/cf0ddb66eab7e2a87158279e455d71c495b30834))
* update LICENSE file with complete text of Mozilla Public License v2.0 ([23815d3](https://github.com/Alwatr/nanolib/commit/23815d3bc29545996385f4702166df9a080504de))
