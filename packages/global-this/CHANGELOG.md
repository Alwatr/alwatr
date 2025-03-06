# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/global-this@1.0.3...@alwatr/global-this@5.4.0) (2025-02-18)

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
* **global-scope:** The global-scope module has been deprecated and should no longer be used. Please update your code to use the global-this module instead.

### Code Refactoring

* **global-scope:** Remove global-scope module and replace with global-this ([b194b27](https://github.com/Alwatr/nanolib/commit/b194b2772628fec30cd41d677232e7393fcded61)) by @
* use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @
* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/global-this@1.0.2...@alwatr/global-this@1.0.3) (2024-11-02)

### Dependencies update

* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @alimd

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/global-this@1.0.1...@alwatr/global-this@1.0.2) (2024-10-25)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @dependabot[bot]
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @dependabot[bot]

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/global-this@1.0.0...@alwatr/global-this@1.0.1) (2024-10-12)

**Note:** Version bump only for package @alwatr/global-this

## 1.0.0 (2024-10-11)

### ⚠ BREAKING CHANGES

- **global-scope:** The global-scope module has been deprecated and should no longer be used. Please update your code to use the global-this module instead.

### Code Refactoring

- **global-scope:** Remove global-scope module and replace with global-this ([b194b27](https://github.com/Alwatr/nanolib/commit/b194b2772628fec30cd41d677232e7393fcded61)) by @alimd
- use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @mohammadhonarvar

## [1.1.26](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.25...@alwatr/global-scope@1.1.26) (2024-10-11)

### Bug Fixes

- **global-scope:** prevent duplicate global scope module throw, just log error ([e67ffec](https://github.com/Alwatr/nanolib/commit/e67ffec77cbf5ae9de75d532be0062444486790b)) by @alimd

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [1.1.25](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.24...@alwatr/global-scope@1.1.25) (2024-10-11)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.24](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.23...@alwatr/global-scope@1.1.24) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [1.1.23](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.22...@alwatr/global-scope@1.1.23) (2024-10-08)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.22](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.21...@alwatr/global-scope@1.1.22) (2024-09-29)

### Bug Fixes

- all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @mohammadhonarvar

### Code Refactoring

- **global-scope:** Improve shared scope definition ([4704a02](https://github.com/Alwatr/nanolib/commit/4704a02497848a18ace8ae27830834d6322d6624)), closes [#123](https://github.com/Alwatr/nanolib/issues/123) by @alimd

### Miscellaneous Chores

- **global-scop:** change the license to AGPL-3.0 ([ad7c262](https://github.com/Alwatr/nanolib/commit/ad7c2629743115af18b9298c6a9ccb5172c27333)) by @ArmanAsadian
- Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @alimd

### Dependencies update

- bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @dependabot[bot]

## [1.1.21](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.20...@alwatr/global-scope@1.1.21) (2024-09-21)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.20](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.19...@alwatr/global-scope@1.1.20) (2024-09-15)

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]
- update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @alimd

## [1.1.19](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.18...@alwatr/global-scope@1.1.19) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [1.1.18](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.17...@alwatr/global-scope@1.1.18) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [1.1.17](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.16...@alwatr/global-scope@1.1.17) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.1.16](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.15...@alwatr/global-scope@1.1.16) (2024-05-12)

### Dependencies update

- upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @alimd

## [1.1.15](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.14...@alwatr/global-scope@1.1.15) (2024-04-25)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.14](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.13...@alwatr/global-scope@1.1.14) (2024-03-28)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.13](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.12...@alwatr/global-scope@1.1.13) (2024-01-31)

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @alimd

## [1.1.12](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.11...@alwatr/global-scope@1.1.12) (2024-01-24)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.11](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.10...@alwatr/global-scope@1.1.11) (2024-01-20)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.10](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.9...@alwatr/global-scope@1.1.10) (2024-01-16)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.9](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.8...@alwatr/global-scope@1.1.9) (2024-01-08)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.7...@alwatr/global-scope@1.1.8) (2024-01-03)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.6...@alwatr/global-scope@1.1.7) (2024-01-03)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.5...@alwatr/global-scope@1.1.6) (2023-12-26)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.4...@alwatr/global-scope@1.1.5) (2023-12-26)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.3...@alwatr/global-scope@1.1.4) (2023-12-23)

### Bug Fixes

- tsBuildInfoFile path in tsconfig.json files ([9c4ba01](https://github.com/Alwatr/nanolib/commit/9c4ba01afdd6657de4e5feef09bb6ee03d9ce053)) by @

## [1.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.2...@alwatr/global-scope@1.1.3) (2023-12-23)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.1...@alwatr/global-scope@1.1.2) (2023-12-23)

**Note:** Version bump only for package @alwatr/global-scope

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.1.0...@alwatr/global-scope@1.1.1) (2023-12-23)

### Bug Fixes

- update to latest nano-build with preset ([a4d3c35](https://github.com/Alwatr/nanolib/commit/a4d3c35f9d86521312bd16dd9853519f4ed2e0b4)) by @

# [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.0.1...@alwatr/global-scope@1.1.0) (2023-12-22)

### Features

- **global-scope:** polyfill for globalThis ([17ac530](https://github.com/Alwatr/nanolib/commit/17ac530922c4b4300f370ece38b155d2b3d6713a)) by @alimd

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/global-scope@1.0.0...@alwatr/global-scope@1.0.1) (2023-12-22)

**Note:** Version bump only for package @alwatr/global-scope

# 1.0.0 (2023-12-22)

### Features

- **global-scope:** Add globalScope and sharedScope\_ variables ([9e9f2ee](https://github.com/Alwatr/nanolib/commit/9e9f2ee77a48cd1451a80be72d33f40cbef33a52)) by @alimd
- **global-scope:** new package ([b3cd89e](https://github.com/Alwatr/nanolib/commit/b3cd89ef0172d65a50772c5137a8f9bef440b306)) by @alimd
