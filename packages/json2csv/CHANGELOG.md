# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
