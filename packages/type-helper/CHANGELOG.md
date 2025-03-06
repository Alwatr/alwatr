# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@2.0.3...@alwatr/type-helper@5.4.0) (2025-03-06)

### Features

* **types:** allow undefined in JsonValue type definition ([7f25f3f](https://github.com/Alwatr/nanolib/commit/7f25f3f022c198bf67822ea6071a475deb4bb89c)) by @
* **types:** simplify JsonObject type definition ([a119d66](https://github.com/Alwatr/nanolib/commit/a119d66a3fc7eebcf38084d9cdd216f6a09ba1ae)) by @

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

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
* **type-helper:** Update the type definitions for the Dictionary type in the type-helper package.
Introduce two new types: DictionaryOpt and DictionaryReq, representing dictionaries
with optional and required values respectively. This change improves the clarity
and flexibility of the type system.
* **type-helper:** make values as `optional`

### Features

* **ty-helper:** Update type definitions and add new interfaces for JSON serialization ([7df0b07](https://github.com/Alwatr/nanolib/commit/7df0b07aea8c2e5906bffb18ec334176fb0d76c9)) by @
* **type-helper:** add HasAddEventListener ([ba2b6fa](https://github.com/Alwatr/nanolib/commit/ba2b6fac1003c2028d8b75d8dfb9242e3f0cc730)) by @
* **type-helper:** Add Mutable and Immutable types ([bd57df7](https://github.com/Alwatr/nanolib/commit/bd57df79fdb184382bb07820698e378b47b73230)) by @
* **type-helper:** add StrictlyRequired type ([6d2831e](https://github.com/Alwatr/nanolib/commit/6d2831e18c984ee6e272cde4c7fe64712113d969)) by @
* **type-helper:** make types available globally! ([69bcb97](https://github.com/Alwatr/nanolib/commit/69bcb97b1a8d3cf53a3efff516ad151fca9a5234)) by @
* **type-helper:** new package for ts types ([4d81aaf](https://github.com/Alwatr/nanolib/commit/4d81aaf7953769ebd4af58e4c0590b5e537db056)) by @
* **type-helper:** Update type definitions for Dictionary and Json ([0e3d56f](https://github.com/Alwatr/nanolib/commit/0e3d56f78cc30cc3e7d8cbef447000d01ba092ec)) by @
* **type-helper:** update type-helper to declare global types ([f7b6f95](https://github.com/Alwatr/nanolib/commit/f7b6f95a525895aee36f37b83fc9a1aeeefaec00)) by @
* **type:** add number key to dictionary ([e6cae47](https://github.com/Alwatr/nanolib/commit/e6cae47d1cf5344961ea7776dc4ca1a10d41e2fd)) by @

### Bug Fixes

* **type-helper:** convert `interface` to `type` ([c9e6970](https://github.com/Alwatr/nanolib/commit/c9e69700b038fb32fc43fb9a8e7a1140aff98d0c)) by @

### Code Refactoring

* **type-helper:** update Dictionary type definitions ([fa4c56d](https://github.com/Alwatr/nanolib/commit/fa4c56d8c55f54dd11918fadf4b5eb342bc47742)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Miscellaneous Chores

* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* rename logger env ([38443ad](https://github.com/Alwatr/nanolib/commit/38443ade4677e857b5ebd4be417f5f2eb1818c87)) by @
* **type-helper:** change the license to AGPL-3.0 ([5f1264d](https://github.com/Alwatr/nanolib/commit/5f1264dfcc217289ed8b87a6ede6a62cfbe824f3)) by @
* **type-helper:** fix package version ([6b5374f](https://github.com/Alwatr/nanolib/commit/6b5374faed678c9d878b1ef9601d587495f6b9d1)) by @
* **type-helper:** make lint happy ([8e43a6a](https://github.com/Alwatr/nanolib/commit/8e43a6aaa708be23215e9d30538b025601605a40)) by @
* **type-helper:** remove version beta suffix ([2222a51](https://github.com/Alwatr/nanolib/commit/2222a51e06c29b5f7a20234bee69b41ffb923cfa)) by @
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @
* Update debug command in package.json ([be8403d](https://github.com/Alwatr/nanolib/commit/be8403dec754f2117259bb915b110ea386596401)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [2.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@2.0.2...@alwatr/type-helper@2.0.3) (2024-10-25)

**Note:** Version bump only for package @alwatr/type-helper

## [2.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@2.0.1...@alwatr/type-helper@2.0.2) (2024-10-11)

### Miscellaneous Chores

* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [2.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@2.0.0...@alwatr/type-helper@2.0.1) (2024-10-10)

### Dependencies update

* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [2.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.2.6...@alwatr/type-helper@2.0.0) (2024-09-29)

### ⚠ BREAKING CHANGES

* **type-helper:** Update the type definitions for the Dictionary type in the type-helper package.
  Introduce two new types: DictionaryOpt and DictionaryReq, representing dictionaries
  with optional and required values respectively. This change improves the clarity
  and flexibility of the type system.
* **type-helper:** make values as `optional`

### Features

* **type-helper:** add StrictlyRequired type ([6d2831e](https://github.com/Alwatr/nanolib/commit/6d2831e18c984ee6e272cde4c7fe64712113d969)) by @alimd
* **type-helper:** make types available globally! ([69bcb97](https://github.com/Alwatr/nanolib/commit/69bcb97b1a8d3cf53a3efff516ad151fca9a5234)) by @alimd
* **type-helper:** update type-helper to declare global types ([f7b6f95](https://github.com/Alwatr/nanolib/commit/f7b6f95a525895aee36f37b83fc9a1aeeefaec00)) by @alimd

### Bug Fixes

* **type-helper:** convert `interface` to `type` ([c9e6970](https://github.com/Alwatr/nanolib/commit/c9e69700b038fb32fc43fb9a8e7a1140aff98d0c)) by @mohammadhonarvar

### Code Refactoring

* **type-helper:** update Dictionary type definitions ([fa4c56d](https://github.com/Alwatr/nanolib/commit/fa4c56d8c55f54dd11918fadf4b5eb342bc47742)) by @alimd

### Miscellaneous Chores

* **type-helper:** change the license to AGPL-3.0 ([5f1264d](https://github.com/Alwatr/nanolib/commit/5f1264dfcc217289ed8b87a6ede6a62cfbe824f3)) by @ArmanAsadian
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @alimd

## [1.2.6](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.2.5...@alwatr/type-helper@1.2.6) (2024-09-15)

### Dependencies update

* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]

## [1.2.5](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.2.4...@alwatr/type-helper@1.2.5) (2024-08-31)

### Dependencies update

* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [1.2.4](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.2.3...@alwatr/type-helper@1.2.4) (2024-07-04)

### Dependencies update

* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.2.3](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.2.2...@alwatr/type-helper@1.2.3) (2024-04-25)

**Note:** Version bump only for package @alwatr/type-helper

## [1.2.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.2.1...@alwatr/type-helper@1.2.2) (2024-03-28)

**Note:** Version bump only for package @alwatr/type-helper

## [1.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.2.0...@alwatr/type-helper@1.2.1) (2024-01-31)

**Note:** Version bump only for package @alwatr/type-helper

## [1.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.0.3...@alwatr/type-helper@1.2.0) (2024-01-24)

### Features

* **ty-helper:** Update type definitions and add new interfaces for JSON serialization ([7df0b07](https://github.com/Alwatr/nanolib/commit/7df0b07aea8c2e5906bffb18ec334176fb0d76c9)) by @alimd
* **type-helper:** Add Mutable and Immutable types ([bd57df7](https://github.com/Alwatr/nanolib/commit/bd57df79fdb184382bb07820698e378b47b73230)) by @
* **type-helper:** Update type definitions for Dictionary and Json ([0e3d56f](https://github.com/Alwatr/nanolib/commit/0e3d56f78cc30cc3e7d8cbef447000d01ba092ec)) by @

# [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.0.3...@alwatr/type-helper@1.1.0) (2024-01-16)

### Features

* **type-helper:** Add Mutable and Immutable types ([bd57df7](https://github.com/Alwatr/nanolib/commit/bd57df79fdb184382bb07820698e378b47b73230)) by @alimd
* **type-helper:** Update type definitions for Dictionary and Json ([0e3d56f](https://github.com/Alwatr/nanolib/commit/0e3d56f78cc30cc3e7d8cbef447000d01ba092ec)) by @alimd

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.0.2...@alwatr/type-helper@1.0.3) (2024-01-03)

**Note:** Version bump only for package @alwatr/type-helper

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.0.1...@alwatr/type-helper@1.0.2) (2024-01-03)

**Note:** Version bump only for package @alwatr/type-helper

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.0.0-beta.2...@alwatr/type-helper@1.0.1) (2023-12-27)

**Note:** Version bump only for package @alwatr/type-helper

# [1.0.0-beta.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.0.0-beta.1...@alwatr/type-helper@1.0.0-beta.2) (2023-12-27)

### Features

* **type-helper:** add HasAddEventListener ([ba2b6fa](https://github.com/Alwatr/nanolib/commit/ba2b6fac1003c2028d8b75d8dfb9242e3f0cc730)) by @alimd

# [1.0.0-beta.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@1.0.0-beta.0...@alwatr/type-helper@1.0.0-beta.1) (2023-12-26)

### Features

* **type:** add number key to dictionary ([e6cae47](https://github.com/Alwatr/nanolib/commit/e6cae47d1cf5344961ea7776dc4ca1a10d41e2fd)) by @njfamirm

# 1.0.0-beta.0 (2023-12-26)

### Features

* **type-helper:** new package for ts types ([4d81aaf](https://github.com/Alwatr/nanolib/commit/4d81aaf7953769ebd4af58e4c0590b5e537db056)) by @alimd
