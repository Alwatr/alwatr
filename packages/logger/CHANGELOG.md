# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## <small>5.5.3 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/logger

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@5.5.1...@alwatr/logger@5.5.2) (2025-04-01)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([c1320b4](https://github.com/Alwatr/nanolib/commit/c1320b447a492c5e720e25ad71e9df81eeea3670)) by @dependabot[bot]

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@5.5.0...@alwatr/logger@5.5.1) (2025-03-18)

### Dependencies update

* bump the development-dependencies group with 9 updates ([7290aa3](https://github.com/Alwatr/nanolib/commit/7290aa3b52ce66ca237d2a12d28a7687b113f83d)) by @dependabot[bot]

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@5.4.0...@alwatr/logger@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.8...@alwatr/logger@5.4.0) (2025-02-18)

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
* **logger:** logModule renamed to logFileModule
* **logger:** definePackage and dedupt remove!
* **logger:** define packages removed and must use @alwatr/dedupe instead
* **logger:** use DEBUG in cli and debug in browser

### Features

* **logger:** add logStep method to logger ([860aeed](https://github.com/Alwatr/nanolib/commit/860aeedb2da390ee3d47c037b22a37f73e6dbbbc)) by @
* **logger:** change devMode env name ([ad549dc](https://github.com/Alwatr/nanolib/commit/ad549dc39e52242261c78939bd62ca10f69cea60)) by @
* **logger:** debugMode in definePackage ([9799320](https://github.com/Alwatr/nanolib/commit/97993203d76db57e55b31bef485ea77cfd32a64c)) by @
* **logger:** definePackage ([dfd090e](https://github.com/Alwatr/nanolib/commit/dfd090ebd691c9a589370094d49f950524f71369)) by @
* **logger:** Update debugMode to enabled by default in development mode ([bc7c7ee](https://github.com/Alwatr/nanolib/commit/bc7c7ee1118a259ceaa1be1dade90f2f9ccf9e1d)) by @
* **logger:** use alwatr dedupe ([d89d076](https://github.com/Alwatr/nanolib/commit/d89d076c9fd0dd311804831b1ac0ea955efd4b6d)) by @
* use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @

### Bug Fixes

* __package_version__ global type ([de8a3f9](https://github.com/Alwatr/nanolib/commit/de8a3f93bdb5a786c42f56324072b4b9520ce3a1)) by @
* all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @
* exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @
* **logger:** defaultDebugMode ([bab9f7c](https://github.com/Alwatr/nanolib/commit/bab9f7c7b26fc2f50476ebc74d484a4b39c9dbda)) by @
* **logger:** definePackage ([e2e5c6c](https://github.com/Alwatr/nanolib/commit/e2e5c6c8175d6f7bfba1d103c1cac2f647aa6116)) by @
* **logger:** Update default debug mode logic for prevent side-effects ([42101d6](https://github.com/Alwatr/nanolib/commit/42101d6471bd0d4e88e47dc8321dddc1cd63cec8)) by @

### Code Refactoring

* **logger:** prevent side-effects ([e084894](https://github.com/Alwatr/nanolib/commit/e084894cdc4b46d52d99be872f5f789fe83c3cc0)) by @
* **logger:** remove definePackage from logger ([c8a9d0c](https://github.com/Alwatr/nanolib/commit/c8a9d0cdcc3e45e7a33731ec6ee6a496451e9eb1)) by @
* **logger:** rename logModule to logFileModule ([1f6bd71](https://github.com/Alwatr/nanolib/commit/1f6bd71272007f5bbc90258ffa13b7d851e0918c)) by @
* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Miscellaneous Chores

* **dedupe:** fix version ([9754409](https://github.com/Alwatr/nanolib/commit/9754409d978265ba2ce08a9f86af1d1e143940e4)) by @
* **deps-dev:** bump the development-dependencies group with 3 updates ([0e0ec0f](https://github.com/Alwatr/nanolib/commit/0e0ec0f7c66c849727563cabe0e88606aee49035)) by @
* **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @
* **deps:** update ([8e70dff](https://github.com/Alwatr/nanolib/commit/8e70dffb1e751496ef2e72d6cffd685f1fea44e3)) by @
* **deps:** update ([f0b60d2](https://github.com/Alwatr/nanolib/commit/f0b60d24c9fae6190940baf95167a1175360d4b3)) by @
* fix all typescript reference ([dea4c44](https://github.com/Alwatr/nanolib/commit/dea4c4414167602ea2f13888c6ecee24eb65ed93)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* **logger:** add reference ([2f30ef1](https://github.com/Alwatr/nanolib/commit/2f30ef15240a3629c7697409c322c7fdfc91a5f8)) by @
* **logger:** change the license to AGPL-3.0 ([4bb4673](https://github.com/Alwatr/nanolib/commit/4bb4673972069a307e799cad9a5078b0288a9340)) by @
* **logger:** Fix import file extensions ([faeef41](https://github.com/Alwatr/nanolib/commit/faeef41b0115fc5b9b22ba297e936bad68a71343)) by @
* **logger:** Fix import file extensions ([f620739](https://github.com/Alwatr/nanolib/commit/f6207396504fe3a2a708ad0feaf988d14f99d130)) by @
* **logger:** rename main file ([618d008](https://github.com/Alwatr/nanolib/commit/618d008c23561105ba45acb31dedcf2daafe4202)) by @
* **logger:** update dedupe version ([9704dc9](https://github.com/Alwatr/nanolib/commit/9704dc92a4614aaa9ba25d88bcc1beee2bc826f4)) by @
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @
* Update debug command in package.json ([be8403d](https://github.com/Alwatr/nanolib/commit/be8403dec754f2117259bb915b110ea386596401)) by @
* Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

### Dependencies update

* bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @
* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* bump the development-dependencies group with 2 updates ([be5d6c2](https://github.com/Alwatr/nanolib/commit/be5d6c2d86b937f32cebc6848aaff85af07055dd)) by @
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @
* update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @
* update all ([53342f6](https://github.com/Alwatr/nanolib/commit/53342f67a8a013127f073540bc11929f1813c05c)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @
* upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @

## [4.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.7...@alwatr/logger@4.0.8) (2024-11-02)

### Dependencies update

* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @alimd

## [4.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.6...@alwatr/logger@4.0.7) (2024-10-25)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @dependabot[bot]
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @dependabot[bot]

## [4.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.5...@alwatr/logger@4.0.6) (2024-10-12)

**Note:** Version bump only for package @alwatr/logger

## [4.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.4...@alwatr/logger@4.0.5) (2024-10-11)

### Bug Fixes

- **logger:** Update default debug mode logic for prevent side-effects ([42101d6](https://github.com/Alwatr/nanolib/commit/42101d6471bd0d4e88e47dc8321dddc1cd63cec8)) by @alimd

### Code Refactoring

- **logger:** prevent side-effects ([e084894](https://github.com/Alwatr/nanolib/commit/e084894cdc4b46d52d99be872f5f789fe83c3cc0)) by @mohammadhonarvar
- prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @mohammadhonarvar

## [4.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.3...@alwatr/logger@4.0.4) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [4.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.2...@alwatr/logger@4.0.3) (2024-10-11)

**Note:** Version bump only for package @alwatr/logger

## [4.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.1...@alwatr/logger@4.0.2) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [4.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@4.0.0...@alwatr/logger@4.0.1) (2024-10-08)

**Note:** Version bump only for package @alwatr/logger

## [4.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.14...@alwatr/logger@4.0.0) (2024-09-29)

### ⚠ BREAKING CHANGES

- **logger:** logModule renamed to logFileModule
- **logger:** definePackage and dedupt remove!

### Features

- **logger:** add logStep method to logger ([860aeed](https://github.com/Alwatr/nanolib/commit/860aeedb2da390ee3d47c037b22a37f73e6dbbbc)) by @alimd
- use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @mohammadhonarvar

### Bug Fixes

- all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @mohammadhonarvar

### Code Refactoring

- **logger:** remove definePackage from logger ([c8a9d0c](https://github.com/Alwatr/nanolib/commit/c8a9d0cdcc3e45e7a33731ec6ee6a496451e9eb1)) by @mohammadhonarvar
- **logger:** rename logModule to logFileModule ([1f6bd71](https://github.com/Alwatr/nanolib/commit/1f6bd71272007f5bbc90258ffa13b7d851e0918c)) by @alimd

### Miscellaneous Chores

- **logger:** change the license to AGPL-3.0 ([4bb4673](https://github.com/Alwatr/nanolib/commit/4bb4673972069a307e799cad9a5078b0288a9340)) by @alimd
- Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @alimd

### Dependencies update

- bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @dependabot[bot]

## [3.2.14](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.13...@alwatr/logger@3.2.14) (2024-09-21)

**Note:** Version bump only for package @alwatr/logger

## [3.2.13](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.12...@alwatr/logger@3.2.13) (2024-09-15)

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]
- update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @alimd

## [3.2.12](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.11...@alwatr/logger@3.2.12) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [3.2.11](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.10...@alwatr/logger@3.2.11) (2024-08-31)

**Note:** Version bump only for package @alwatr/logger

## [3.2.10](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.9...@alwatr/logger@3.2.10) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [3.2.9](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.8...@alwatr/logger@3.2.9) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [3.2.8](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.7...@alwatr/logger@3.2.8) (2024-05-12)

### Dependencies update

- upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @alimd

## [3.2.7](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.6...@alwatr/logger@3.2.7) (2024-04-25)

**Note:** Version bump only for package @alwatr/logger

## [3.2.6](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.5...@alwatr/logger@3.2.6) (2024-03-28)

**Note:** Version bump only for package @alwatr/logger

## [3.2.5](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.4...@alwatr/logger@3.2.5) (2024-01-31)

### Bug Fixes

- exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @alimd

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @alimd

## [3.2.4](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.3...@alwatr/logger@3.2.4) (2024-01-24)

**Note:** Version bump only for package @alwatr/logger

## [3.2.3](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.2...@alwatr/logger@3.2.3) (2024-01-20)

**Note:** Version bump only for package @alwatr/logger

## [3.2.2](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.1...@alwatr/logger@3.2.2) (2024-01-16)

**Note:** Version bump only for package @alwatr/logger

## [3.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.2.0...@alwatr/logger@3.2.1) (2024-01-08)

**Note:** Version bump only for package @alwatr/logger

# [3.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.1.0...@alwatr/logger@3.2.0) (2024-01-08)

### Bug Fixes

- **logger:** defaultDebugMode ([bab9f7c](https://github.com/Alwatr/nanolib/commit/bab9f7c7b26fc2f50476ebc74d484a4b39c9dbda)) by @alimd

### Features

- **logger:** debugMode in definePackage ([9799320](https://github.com/Alwatr/nanolib/commit/97993203d76db57e55b31bef485ea77cfd32a64c)) by @njfamirm

# [3.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.0.1...@alwatr/logger@3.1.0) (2024-01-06)

### Features

- **logger:** definePackage ([dfd090e](https://github.com/Alwatr/nanolib/commit/dfd090ebd691c9a589370094d49f950524f71369)) by @alimd

## [3.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/logger@3.0.0...@alwatr/logger@3.0.1) (2024-01-03)

**Note:** Version bump only for package @alwatr/logger

# 3.0.0 (2024-01-03)

### Bug Fixes

- `__package_version__` global type ([de8a3f9](https://github.com/Alwatr/nanolib/commit/de8a3f93bdb5a786c42f56324072b4b9520ce3a1)) by @alimd
- **logger:** definePackage ([e2e5c6c](https://github.com/Alwatr/nanolib/commit/e2e5c6c8175d6f7bfba1d103c1cac2f647aa6116)) by @alimd

### Features

- **logger:** change devMode env name ([ad549dc](https://github.com/Alwatr/nanolib/commit/ad549dc39e52242261c78939bd62ca10f69cea60)) by @njfamirm
- **logger:** Update debugMode to enabled by default in development mode ([bc7c7ee](https://github.com/Alwatr/nanolib/commit/bc7c7ee1118a259ceaa1be1dade90f2f9ccf9e1d)) by @alimd
- **logger:** use alwatr dedupe ([d89d076](https://github.com/Alwatr/nanolib/commit/d89d076c9fd0dd311804831b1ac0ea955efd4b6d)) by @njfamirm

### BREAKING CHANGES

- **logger:** define packages removed and must use @alwatr/dedupe instead
- **logger:** use DEBUG in cli and debug in browser
