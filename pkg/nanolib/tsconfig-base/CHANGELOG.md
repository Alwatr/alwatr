# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### ⚠ BREAKING CHANGES

* Enabling `useDefineForClassFields` switches class field definitions to the ES2022 standard. Since we're now building with Bun, all projects must adopt this standard for class fields. Code using the legacy class field behavior (e.g., assigning in constructor) will break and needs to be updated to use ES2022 syntax (e.g., direct field initialization).
* The export of @alwatr/tsconfig-base has been completely changed. Previously, it exported a JSON file path, but now it directly provides the base configuration. Update your tsconfig.json files as follows:

Before:
{
  "extends": "@alwatr/tsconfig-base/tsconfig.json"
}

After:
{
  "extends": "@alwatr/tsconfig-base"
}

This simplifies usage and aligns with standard TypeScript config extension practices.

### ✨ Features

* change module setting to Preserve and enable allowJs in tsconfig.base.json ([1666f8f](https://github.com/Alwatr/alwatr/commit/1666f8ff67b911b8f675c8454807f86b75baac87))
* enable useDefineForClassFields in tsconfig.base.json ([ad585f0](https://github.com/Alwatr/alwatr/commit/ad585f0bb72f2eae271298edc7a7f760dd00fb06))
* update module export to direct extends ([d6a23d6](https://github.com/Alwatr/alwatr/commit/d6a23d64cf6140053c6b4dd57f5b4256693ca893))

### 🐛 Bug Fixes

* enable emitDeclarationOnly in TypeScript configuration ([df11615](https://github.com/Alwatr/alwatr/commit/df116155af979791dc8fe850328672c05bbc961b))
* update 'files' field in package.json to reference tsconfig.base.json ([c62a3c7](https://github.com/Alwatr/alwatr/commit/c62a3c7073da6018d05adad2cb8c259523079f1f))

### 🔨 Code Refactoring

* reorganize fields in package.json files across multiple packages ([6a0e28f](https://github.com/Alwatr/alwatr/commit/6a0e28f6f43dc816232d6c4f7f4fe2d68993dd29))
* update tsconfig.json to extend from @alwatr/tsconfig-base directly ([1fb76b0](https://github.com/Alwatr/alwatr/commit/1fb76b0e8a56ec5582b43aee4b6cd1850c5f936d))

### 🧹 Miscellaneous Chores

* rename all pageckage inside pkg/nanolib ([8584300](https://github.com/Alwatr/alwatr/commit/85843005c3c34bdf391a718cacaf5d6eb9786fe7))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json exports to ESM-only ([2deab42](https://github.com/Alwatr/alwatr/commit/2deab422f3285146a1111e97462487e1cc10b214))

## [8.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@7.0.0...@alwatr/tsconfig-base@8.0.0) (2026-03-27)

### ⚠ BREAKING CHANGES

* experimental decorators and metadata disabled in tsconfig by default.

### 🔨 Code Refactoring

* disable experimental decorators and metadata in tsconfig ([64ff254](https://github.com/Alwatr/nanolib/commit/64ff254af3c601d95b06ccb6146bc5116228ea59))

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))

## [7.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@6.0.4...@alwatr/tsconfig-base@7.0.0) (2026-03-19)

### ⚠ BREAKING CHANGES

* This package is now ESM-only and no longer provides CommonJS (CJS) distribution.
- Minimum Node.js version is now 14.13.0 (or 12.22.0 for older versions with --experimental-modules flag)
- All require() statements must be replaced with import statements
- CommonJS require() is no longer supported

### 🔨 Code Refactoring

* convert to ESM-only module ([493d7d9](https://github.com/Alwatr/nanolib/commit/493d7d9d76d03c43902eb04f0a9ecebac8f6fbba))

## [6.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@6.0.3...@alwatr/tsconfig-base@6.0.4) (2025-11-18)

### 🐛 Bug Fixes

* update files field in package.json to include json files and ensure tsconfig.json is listed ([49a5866](https://github.com/Alwatr/nanolib/commit/49a5866c8063334b242f7a3c01e19401251658be))

### 🔨 Code Refactoring

* remove unnecessary type declarations from tsconfig.json files ([89bcc7d](https://github.com/Alwatr/nanolib/commit/89bcc7db839807110b80f8ba34414ea9734d9c75))

## [6.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@6.0.2...@alwatr/tsconfig-base@6.0.3) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [6.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@6.0.1...@alwatr/tsconfig-base@6.0.2) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [6.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@6.0.0...@alwatr/tsconfig-base@6.0.1) (2025-09-09)

### 🧹 Miscellaneous Chores

* remove trailing newlines from contributing sections in README files ([e8ab1bc](https://github.com/Alwatr/nanolib/commit/e8ab1bc43e0addea5ccd4c897c2cec597cb9e15f))

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@5.0.2...@alwatr/tsconfig-base@6.0.0) (2025-09-06)

### ⚠ BREAKING CHANGES

* **tsconfig:** Updated TypeScript target to ESNext for modern JavaScript features. Enabled `noEmitHelpers`, which may affect build outputs.

### ✨ Features

* **tsconfig:** update target to ESNext and refine compiler options ([e6bfca0](https://github.com/Alwatr/nanolib/commit/e6bfca04369d13da36af7a31f4fc6b082e52b271))

### 🐛 Bug Fixes

* add 'json' to files pattern in package.json for consistency ([a2ccac5](https://github.com/Alwatr/nanolib/commit/a2ccac595c53970616272bba5a7a59c2c164cad8))
* **tsconfig:** enable composite option for improved project structure ([4ce1181](https://github.com/Alwatr/nanolib/commit/4ce1181d7fc3adf431b39103e51ac656339e7190))

## [5.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@5.0.1...@alwatr/tsconfig-base@5.0.2) (2025-08-23)

**Note:** Version bump only for package @alwatr/tsconfig-base

## [5.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@5.0.0...@alwatr/tsconfig-base@5.0.1) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))

### 🧹 Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf))
* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))
* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6))

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.

### Features

* **prettier-config:** new package for prettier share configs ([a6fdee3](https://github.com/Alwatr/nanolib/commit/a6fdee34591abb1d19e7ea7e431bd6624e2ea6d4)) by @
* **tsconfig-base:** Add pretty and newLine options to tsconfig.json ([be2f48e](https://github.com/Alwatr/nanolib/commit/be2f48efde7e669eb858d0011ef4771b46f1d768)) by @
* **tsconfig-base:** new package for TypeScript base config ([33bb94e](https://github.com/Alwatr/nanolib/commit/33bb94e38ab34634a26d51643f308cc651da695a)) by @
* **tsconfig-base:** update "useDefineForClassFields" to false in tsconfig.json ([288c0ae](https://github.com/Alwatr/nanolib/commit/288c0aef4b7729afd8aba09cf56f02dea31bfd99)) by @
* **tsconfig-base:** use ESNext instead of ES2023 for the "lib" option ([47673e4](https://github.com/Alwatr/nanolib/commit/47673e481a1fc4dfd4ba2576d5dd5590da93adac)) by @
* **tsconfig:** change verbatimModuleSyntax=true and moduleDetection=force ([75e40f9](https://github.com/Alwatr/nanolib/commit/75e40f97273e7cb474506a906fa8f8e164f5661c)) by @

### Bug Fixes

* all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @
* build process ([83fc4e6](https://github.com/Alwatr/nanolib/commit/83fc4e609f86c25291e5f89016d6777bf197ffcb)) by @
* package.json include files ([ec8c807](https://github.com/Alwatr/nanolib/commit/ec8c8075ea88d669a84037077b01f92f6ea078f1)) by @
* package.json include files ([053fc10](https://github.com/Alwatr/nanolib/commit/053fc10b518038647136db9ada2433e27ecb2e63)) by @
* tsBuildInfoFile path in tsconfig.json files ([9c4ba01](https://github.com/Alwatr/nanolib/commit/9c4ba01afdd6657de4e5feef09bb6ee03d9ce053)) by @

### Code Refactoring

* enable allowUnusedLabels in tsconfig.json ([a25e708](https://github.com/Alwatr/nanolib/commit/a25e70892f7499a5f008b92fd8fd1abcadbdeb56)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Miscellaneous Chores

* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* switch to alwatr prettier configuration ([4426288](https://github.com/Alwatr/nanolib/commit/44262886e613b103743917d6f704f4087943273a)) by @
* **tsconfig-base:** Add main entry to package.json ([b6c891a](https://github.com/Alwatr/nanolib/commit/b6c891aeaa312633ea5c05ce2d961bfa73068143)) by @
* **tsconfig-base:** change the license to AGPL-3.0 ([2236725](https://github.com/Alwatr/nanolib/commit/223672599c3cf1bf976a1c8beb0b0236cef2efca)) by @
* Update file patterns in package.json ([1f478e7](https://github.com/Alwatr/nanolib/commit/1f478e7c944da2ee79a843fa756c155ebb06f2c2)) by @
* update package keywords ([200afcf](https://github.com/Alwatr/nanolib/commit/200afcf53ae1db0e86a775c24ee1d83da771b1c0)) by @
* Update test scripts and dependencies ([93d2fe6](https://github.com/Alwatr/nanolib/commit/93d2fe6d7ce9c38a300e0c7ed75874916767a14b)) by @

## [1.3.3](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.3.2...@alwatr/tsconfig-base@1.3.3) (2024-10-25)

**Note:** Version bump only for package @alwatr/tsconfig-base

## [1.3.2](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.3.1...@alwatr/tsconfig-base@1.3.2) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [1.3.1](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.3.0...@alwatr/tsconfig-base@1.3.1) (2024-10-10)

### Code Refactoring

- enable allowUnusedLabels in tsconfig.json ([a25e708](https://github.com/Alwatr/nanolib/commit/a25e70892f7499a5f008b92fd8fd1abcadbdeb56)) by @alimd

## [1.3.0](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.2.0...@alwatr/tsconfig-base@1.3.0) (2024-09-29)

### Features

- **tsconfig-base:** use ESNext instead of ES2023 for the "lib" option ([47673e4](https://github.com/Alwatr/nanolib/commit/47673e481a1fc4dfd4ba2576d5dd5590da93adac)) by @alimd

### Bug Fixes

- all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @mohammadhonarvar

### Miscellaneous Chores

- **tsconfig-base:** change the license to AGPL-3.0 ([2236725](https://github.com/Alwatr/nanolib/commit/223672599c3cf1bf976a1c8beb0b0236cef2efca)) by @ArmanAsadian

## [1.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.1.2...@alwatr/tsconfig-base@1.2.0) (2024-07-04)

### Features

- **tsconfig-base:** update "useDefineForClassFields" to false in tsconfig.json ([288c0ae](https://github.com/Alwatr/nanolib/commit/288c0aef4b7729afd8aba09cf56f02dea31bfd99)) by @

## [1.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.1.1...@alwatr/tsconfig-base@1.1.2) (2024-01-31)

**Note:** Version bump only for package @alwatr/tsconfig-base

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.1.0...@alwatr/tsconfig-base@1.1.1) (2024-01-16)

**Note:** Version bump only for package @alwatr/tsconfig-base

# [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.0.5...@alwatr/tsconfig-base@1.1.0) (2024-01-03)

### Features

- **tsconfig:** change verbatimModuleSyntax=true and moduleDetection=force ([75e40f9](https://github.com/Alwatr/nanolib/commit/75e40f97273e7cb474506a906fa8f8e164f5661c)) by @alimd

## [1.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.0.4...@alwatr/tsconfig-base@1.0.5) (2023-12-23)

### Bug Fixes

- tsBuildInfoFile path in tsconfig.json files ([9c4ba01](https://github.com/Alwatr/nanolib/commit/9c4ba01afdd6657de4e5feef09bb6ee03d9ce053)) by @

## [1.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.0.3...@alwatr/tsconfig-base@1.0.4) (2023-12-22)

**Note:** Version bump only for package @alwatr/tsconfig-base

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.0.2...@alwatr/tsconfig-base@1.0.3) (2023-12-22)

### Bug Fixes

- package.json include files ([ec8c807](https://github.com/Alwatr/nanolib/commit/ec8c8075ea88d669a84037077b01f92f6ea078f1)) by @

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.0.1...@alwatr/tsconfig-base@1.0.2) (2023-12-22)

### Bug Fixes

- package.json include files ([053fc10](https://github.com/Alwatr/nanolib/commit/053fc10b518038647136db9ada2433e27ecb2e63)) by @alimd

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/tsconfig-base@1.0.0...@alwatr/tsconfig-base@1.0.1) (2023-12-21)

### Features

- **prettier-config:** new package for prettier share configs ([a6fdee3](https://github.com/Alwatr/nanolib/commit/a6fdee34591abb1d19e7ea7e431bd6624e2ea6d4)) by @alimd
- **tsconfig-base:** Add pretty and newLine options to tsconfig.json ([be2f48e](https://github.com/Alwatr/nanolib/commit/be2f48efde7e669eb858d0011ef4771b46f1d768)) by @alimd

# 1.0.0 (2023-12-20)

### Bug Fixes

- build process ([83fc4e6](https://github.com/Alwatr/nanolib/commit/83fc4e609f86c25291e5f89016d6777bf197ffcb)) by @alimd

### Features

- **tsconfig-base:** new package for TypeScript base config ([33bb94e](https://github.com/Alwatr/nanolib/commit/33bb94e38ab34634a26d51643f308cc651da695a)) by @alimd
