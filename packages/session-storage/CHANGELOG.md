# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
