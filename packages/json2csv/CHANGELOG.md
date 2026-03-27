# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/json2csv@2.0.0...@alwatr/json2csv@2.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))
* remove "types" field from package.json in multiple packages ([b2a458d](https://github.com/Alwatr/nanolib/commit/b2a458d3b1028175e6bc8d0485d223e7d22a1773))

## [2.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/json2csv@1.0.5...@alwatr/json2csv@2.0.0) (2026-03-19)

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

## [1.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/json2csv@1.0.4...@alwatr/json2csv@1.0.5) (2026-03-16)

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

## [1.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/json2csv@1.0.3...@alwatr/json2csv@1.0.4) (2026-02-18)

### 🧹 Miscellaneous Chores

* update keywords in package.json files for better categorization ([cf0ddb6](https://github.com/Alwatr/nanolib/commit/cf0ddb66eab7e2a87158279e455d71c495b30834))

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/json2csv@1.0.2...@alwatr/json2csv@1.0.3) (2025-12-23)

**Note:** Version bump only for package @alwatr/json2csv

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/json2csv@1.0.1...@alwatr/json2csv@1.0.2) (2025-12-13)

**Note:** Version bump only for package @alwatr/json2csv

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/json2csv@1.0.0...@alwatr/json2csv@1.0.1) (2025-12-10)

**Note:** Version bump only for package @alwatr/json2csv

## 1.0.0 (2025-12-10)

### ✨ Features

* add new json2csv package with its configuration, license, and main source file. ([ed2db6f](https://github.com/Alwatr/nanolib/commit/ed2db6f53eb85ff8408a0cb651b7a2e848d11c25))
* enhance json2csv function with configurable delimiter, header inclusion, and value replacer, alongside expanded tests and documentation. ([a78f11b](https://github.com/Alwatr/nanolib/commit/a78f11b7a68c601662fc437956d02bc056224a5f))

### 🐛 Bug Fixes

* Ensure the first `json2csv` array element is a non-null object. ([0db4115](https://github.com/Alwatr/nanolib/commit/0db4115a8bc35a4e2542fedf9ac389a85e504f7c))
* Skip non-object rows in JSON data instead of attempting to convert them to a single CSV cell. ([1415724](https://github.com/Alwatr/nanolib/commit/14157242eaf0a2ae004e5aa3c6f27111411c9e68))

### ⚡ Performance Improvements

* optimize CSV generation with direct string concatenation, improved `escapeCsvValue` logic, and updated replacer type. ([ac2a562](https://github.com/Alwatr/nanolib/commit/ac2a562f55b3e8b3aa614ae5ec8fa680b09e83c6))
