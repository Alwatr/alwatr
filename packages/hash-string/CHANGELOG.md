# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.2.3](https://github.com/Alwatr/nanolib/compare/@alwatr/hash-string@5.2.1...@alwatr/hash-string@5.2.3) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))
* remove duplicate keywords from package.json ([3125526](https://github.com/Alwatr/nanolib/commit/3125526b5ed8284d461055bf6ea925fad8fa8fb0))

### 🔗 Dependencies update

* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.2.2](https://github.com/Alwatr/nanolib/compare/@alwatr/hash-string@5.2.1...@alwatr/hash-string@5.2.2) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## <small>5.2.1 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/hash-string

## [5.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/hash-string@5.1.0...@alwatr/hash-string@5.2.0) (2025-04-01)

### Features

* implement DJB2 hash algorithm for efficient string hashing ([d505181](https://github.com/Alwatr/nanolib/commit/d505181fed1f85cf067ea5499b3de692b84385b0)) by @alimd

### Bug Fixes

* change default repeat value in hashString function from 3 to 1 ([e5c373f](https://github.com/Alwatr/nanolib/commit/e5c373f2a18ce1933f234a6f8dafeda181df1f14)) by @alimd

### Code Refactoring

* replace hashString function with nanoHash and export new hashing methods ([3651b0c](https://github.com/Alwatr/nanolib/commit/3651b0cf254a044f7eb4cfc0a52a9b645e1c26d3)) by @alimd

## 5.1.0 (2025-03-18)

### Features

* add `hash-string` package ([a30b18f](https://github.com/Alwatr/nanolib/commit/a30b18f64f6d308697c39792bd886df921763808)) by @mohammadhonarvar

### Bug Fixes

* downgrade version of hash-string and random packages to 5.0.0 ([176fc5c](https://github.com/Alwatr/nanolib/commit/176fc5c6a5af37d8b7cb7f41336910f0e8fcd0a9)) by @
* **hash-string:** validate repeat parameter in hashString function ([248da9f](https://github.com/Alwatr/nanolib/commit/248da9f9e705aab37fa4f3db0fbc605a4a16c86c)) by @alimd

### Miscellaneous Chores

* **hash-string:** update TypeScript configuration to remove unused types and add package reference ([371072e](https://github.com/Alwatr/nanolib/commit/371072eba0c676a96b65c1a4ec4663ca017f9553)) by @alimd
* **hash-string:** update version and improve package description and keywords ([defb816](https://github.com/Alwatr/nanolib/commit/defb816f86cf5c53b5e01118c7d9ecdcd2db3900)) by @alimd
