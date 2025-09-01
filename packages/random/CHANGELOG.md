# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/random@5.1.5...@alwatr/random@5.1.6) (2025-09-01)

### 🔗 Dependencies update

* update lerna-lite dependencies to version 4.7.3 and jest to 30.1.2 ([95d7870](https://github.com/Alwatr/nanolib/commit/95d7870ec7ad1e6ed2688bafddcabf46857f6981))

## [5.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/random@5.1.4...@alwatr/random@5.1.5) (2025-08-23)

**Note:** Version bump only for package @alwatr/random

## [5.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/random@5.1.2...@alwatr/random@5.1.4) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))

### 🔗 Dependencies update

* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/random@5.1.2...@alwatr/random@5.1.3) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## <small>5.1.2 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/random

## [5.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/random@5.1.0...@alwatr/random@5.1.1) (2025-04-01)

**Note:** Version bump only for package @alwatr/random

## 5.1.0 (2025-03-18)

### Features

* **random:** add hex function to convert Uint8Array to hexadecimal string ([61125e7](https://github.com/Alwatr/nanolib/commit/61125e7cf8b87094e026f578f8141df6ea5153f8)) by @alimd
* **random:** add package.json for @alwatr/random utility library ([4c02a70](https://github.com/Alwatr/nanolib/commit/4c02a70a46a740ca7480769f8857880db296662a)) by @alimd
* **random:** add randBoolean function to generate random boolean values with specified probability ([22ceca5](https://github.com/Alwatr/nanolib/commit/22ceca51af9e41bcd179a457a418736548865551)) by @alimd
* **random:** add randColor function to generate random hex color strings ([1bde087](https://github.com/Alwatr/nanolib/commit/1bde0873459047e3ac9b11fe22a42600780daaca)) by @alimd
* **random:** add randFloat function to generate a random float between specified min and max values ([1c7862a](https://github.com/Alwatr/nanolib/commit/1c7862af5239eb76589f537184b82bcf098f377b)) by @alimd
* **random:** add randInteger function to generate a random integer between specified min and max values ([d9bf2c4](https://github.com/Alwatr/nanolib/commit/d9bf2c4c0bfc39030007679e3cf1a8ef90016b09)) by @alimd
* **random:** add randPick function to select a random item from an array ([b4d9620](https://github.com/Alwatr/nanolib/commit/b4d962021f7cd180e89b4a32f2a7c85367e61cf6)) by @alimd
* **random:** add randShuffle function to shuffle an array in place ([4124ec5](https://github.com/Alwatr/nanolib/commit/4124ec5e1ba2ec0915a91623333ef3b2d575fe5a)) by @alimd
* **random:** add randStep function to generate a random integer between min and max with a specified step ([52bddca](https://github.com/Alwatr/nanolib/commit/52bddca00927780d28acb41e56f9558003a71476)) by @alimd
* **random:** add randString function to generate a random string of specified length ([92fd657](https://github.com/Alwatr/nanolib/commit/92fd65764d370209f7e2115d1bee85e7da753a1f)) by @alimd
* **random:** add randUuid function to generate random UUIDs (v4) ([805a941](https://github.com/Alwatr/nanolib/commit/805a9413fb9080e9bd90b162cbbbe9907c462d4a)) by @alimd
* **random:** add randValues function to fill a typed array with cryptographically strong random values ([a3274c6](https://github.com/Alwatr/nanolib/commit/a3274c6c1a532ea05b4c9c0c9d7d98f9b452f37c)) by @alimd
* **random:** add TypeScript configuration for @alwatr/random package ([6e8c85e](https://github.com/Alwatr/nanolib/commit/6e8c85ee358149ad1db17b432d4135fa38bc1488)) by @alimd
* **random:** add UUID type alias for UUID string representation ([4f23d80](https://github.com/Alwatr/nanolib/commit/4f23d802672731d8700cf6808dd6bd7b18d3c0c4)) by @alimd
* **random:** enhance randString function to support custom character sets and update documentation ([f8bc2d7](https://github.com/Alwatr/nanolib/commit/f8bc2d7091338cdccaa08b423c62f7797ffd21ef)) by @alimd
* **random:** implement randNumber function to generate a random float between 0 and 1 ([6b06f45](https://github.com/Alwatr/nanolib/commit/6b06f4559334fc06d6987f4d76b04b6584c5f9b1)) by @alimd

### Bug Fixes

* downgrade version of hash-string and random packages to 5.0.0 ([176fc5c](https://github.com/Alwatr/nanolib/commit/176fc5c6a5af37d8b7cb7f41336910f0e8fcd0a9)) by @
* **random:** initialize globalThis variable using getGlobalThis function ([191a827](https://github.com/Alwatr/nanolib/commit/191a827232762a435cc6b87f1cee31c0f1a8fc46)) by @alimd

### Code Refactoring

* **random:** improve randShuffle function to use Fisher-Yates algorithm for better shuffling ([3226a60](https://github.com/Alwatr/nanolib/commit/3226a605ac5b6211f82897e3e691347b30a69efa)) by @alimd
* **random:** rename hex function to bytesToHex and update documentation for clarity ([3fcb327](https://github.com/Alwatr/nanolib/commit/3fcb327b41a5016cd5e7e7b5945f5b36383b3ab7)) by @alimd
* **random:** rename randValues to randArray and update documentation for clarity and functionality ([48f8bd4](https://github.com/Alwatr/nanolib/commit/48f8bd469fe48a4db9cd0768cd2897cc6ad4f8a2)) by @alimd
* **random:** replace randNumber with Math.random for improved clarity and performance ([c6227d5](https://github.com/Alwatr/nanolib/commit/c6227d5ac9217d8fdf89501673f52fa44464ef19)) by @alimd
* **random:** replace randValues with randArray in randUuid function for consistency ([7b6fb37](https://github.com/Alwatr/nanolib/commit/7b6fb378c7705f8cf1604287638e482a33ae6d5e)) by @alimd
* **random:** update bytesToHex function to accept number arrays and improve documentation ([6fef474](https://github.com/Alwatr/nanolib/commit/6fef474d3cb5aa6d10adcac37c1fc5256ca62605)) by @alimd

### Miscellaneous Chores

* **random:** add @alwatr/global-this dependency to package.json ([23856a1](https://github.com/Alwatr/nanolib/commit/23856a151b959a237a2e9a011cf6fb08a2f36eb1)) by @alimd
