# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.8...@alwatr/async-queue@5.4.0) (2025-02-18)

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

### Features

* **async-queue:** A simple async queue like mutex and semaphore methodology for javascript and typescript. ([e753ff2](https://github.com/Alwatr/nanolib/commit/e753ff29cf53e0e6bcdd9661666ee60300960db3)) by @
* **async-queue:** add isRunning ([2e54a0a](https://github.com/Alwatr/nanolib/commit/2e54a0a5200ccbfcc64e443728eb6d16513b4296)) by @
* **async-queue:** Add waitForAllFinish method to AsyncQueue class ([3fdef04](https://github.com/Alwatr/nanolib/commit/3fdef04244c515b727c9ccabfd21d7667b561a83)) by @
* **async-queue:** use `package-tracer` ([f570030](https://github.com/Alwatr/nanolib/commit/f570030140c97164b3a9184de739c59dd805055b)) by @
* **AsyncQueue:** generic type for push method ([aec6710](https://github.com/Alwatr/nanolib/commit/aec6710041347452fa52bb2556e59d24bb0932a3)) by @
* **AsyncQueue:** waitForFinish ([47decb4](https://github.com/Alwatr/nanolib/commit/47decb44a21338393d0820e9a965bf27f22dfbcd)) by @

### Bug Fixes

* **async-queue:** remove wait deps ([83b2e11](https://github.com/Alwatr/nanolib/commit/83b2e115a939b90049c4af8d1cd6c4ebee282bf8)) by @

### Code Refactoring

* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @
* use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @
* **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @

### Miscellaneous Chores

* **async-queue:** change the license to AGPL-3.0 ([e253149](https://github.com/Alwatr/nanolib/commit/e253149c3d1d51522406aa44db02a038aaf0d920)) by @
* **deps-dev:** bump the development-dependencies group with 3 updates ([0e0ec0f](https://github.com/Alwatr/nanolib/commit/0e0ec0f7c66c849727563cabe0e88606aee49035)) by @
* **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @
* **deps:** update ([8e70dff](https://github.com/Alwatr/nanolib/commit/8e70dffb1e751496ef2e72d6cffd685f1fea44e3)) by @
* **deps:** update ([f0b60d2](https://github.com/Alwatr/nanolib/commit/f0b60d24c9fae6190940baf95167a1175360d4b3)) by @
* fix all typescript reference ([dea4c44](https://github.com/Alwatr/nanolib/commit/dea4c4414167602ea2f13888c6ecee24eb65ed93)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* rename logger env ([38443ad](https://github.com/Alwatr/nanolib/commit/38443ade4677e857b5ebd4be417f5f2eb1818c87)) by @
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @
* Update debug command in package.json ([be8403d](https://github.com/Alwatr/nanolib/commit/be8403dec754f2117259bb915b110ea386596401)) by @
* Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

### Dependencies update

* bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @
* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* bump the development-dependencies group with 2 updates ([be5d6c2](https://github.com/Alwatr/nanolib/commit/be5d6c2d86b937f32cebc6848aaff85af07055dd)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @
* update all ([53342f6](https://github.com/Alwatr/nanolib/commit/53342f67a8a013127f073540bc11929f1813c05c)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @
* upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @

## [1.3.8](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.7...@alwatr/async-queue@1.3.8) (2024-11-02)

**Note:** Version bump only for package @alwatr/async-queue

## [1.3.7](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.6...@alwatr/async-queue@1.3.7) (2024-10-25)

**Note:** Version bump only for package @alwatr/async-queue

## [1.3.6](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.5...@alwatr/async-queue@1.3.6) (2024-10-12)

**Note:** Version bump only for package @alwatr/async-queue

## [1.3.5](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.4...@alwatr/async-queue@1.3.5) (2024-10-11)

### Code Refactoring

- prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @mohammadhonarvar

## [1.3.4](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.3...@alwatr/async-queue@1.3.4) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @AliMD

## [1.3.3](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.2...@alwatr/async-queue@1.3.3) (2024-10-11)

**Note:** Version bump only for package @alwatr/async-queue

## [1.3.2](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.1...@alwatr/async-queue@1.3.2) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [1.3.1](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.3.0...@alwatr/async-queue@1.3.1) (2024-10-08)

**Note:** Version bump only for package @alwatr/async-queue

## [1.3.0](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.11...@alwatr/async-queue@1.3.0) (2024-09-29)

### Features

- **async-queue:** use `package-tracer` ([f570030](https://github.com/Alwatr/nanolib/commit/f570030140c97164b3a9184de739c59dd805055b)) by @mohammadhonarvar

### Code Refactoring

- update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @AliMD
- use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @AliMD
- **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @AliMD

### Miscellaneous Chores

- **async-queue:** change the license to AGPL-3.0 ([e253149](https://github.com/Alwatr/nanolib/commit/e253149c3d1d51522406aa44db02a038aaf0d920)) by @ArmanAsadian
- Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @AliMD

### Dependencies update

- bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @dependabot[bot]

## [1.2.11](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.10...@alwatr/async-queue@1.2.11) (2024-09-21)

**Note:** Version bump only for package @alwatr/async-queue

## [1.2.10](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.9...@alwatr/async-queue@1.2.10) (2024-09-15)

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]
- update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @AliMD

## [1.2.9](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.8...@alwatr/async-queue@1.2.9) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [1.2.8](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.7...@alwatr/async-queue@1.2.8) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @AliMD

## [1.2.7](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.6...@alwatr/async-queue@1.2.7) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.2.6](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.5...@alwatr/async-queue@1.2.6) (2024-05-12)

### Dependencies update

- upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @AliMD

## [1.2.5](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.4...@alwatr/async-queue@1.2.5) (2024-04-25)

**Note:** Version bump only for package @alwatr/async-queue

## [1.2.4](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.3...@alwatr/async-queue@1.2.4) (2024-03-28)

**Note:** Version bump only for package @alwatr/async-queue

## [1.2.3](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.2...@alwatr/async-queue@1.2.3) (2024-01-31)

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @AliMD

## [1.2.2](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.1...@alwatr/async-queue@1.2.2) (2024-01-24)

**Note:** Version bump only for package @alwatr/async-queue

## [1.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.2.0...@alwatr/async-queue@1.2.1) (2024-01-20)

**Note:** Version bump only for package @alwatr/async-queue

## [1.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.1.1...@alwatr/async-queue@1.2.0) (2024-01-16)

### Features

- **async-queue:** Add waitForAllFinish method to AsyncQueue class ([3fdef04](https://github.com/Alwatr/nanolib/commit/3fdef04244c515b727c9ccabfd21d7667b561a83)) by @AliMD

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.1.0...@alwatr/async-queue@1.1.1) (2024-01-16)

**Note:** Version bump only for package @alwatr/async-queue

# [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.0.2...@alwatr/async-queue@1.1.0) (2024-01-08)

### Features

- **AsyncQueue:** generic type for push method ([aec6710](https://github.com/Alwatr/nanolib/commit/aec6710041347452fa52bb2556e59d24bb0932a3)) by @AliMD
- **AsyncQueue:** waitForFinish ([47decb4](https://github.com/Alwatr/nanolib/commit/47decb44a21338393d0820e9a965bf27f22dfbcd)) by @AliMD

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.0.1...@alwatr/async-queue@1.0.2) (2024-01-08)

**Note:** Version bump only for package @alwatr/async-queue

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/async-queue@1.0.0...@alwatr/async-queue@1.0.1) (2024-01-03)

**Note:** Version bump only for package @alwatr/async-queue

# 1.0.0 (2024-01-03)

### Bug Fixes

- **async-queue:** remove wait deps ([83b2e11](https://github.com/Alwatr/nanolib/commit/83b2e115a939b90049c4af8d1cd6c4ebee282bf8)) by @njfamirm

### Features

- **async-queue:** A simple async queue like mutex and semaphore methodology for javascript and typescript. ([e753ff2](https://github.com/Alwatr/nanolib/commit/e753ff29cf53e0e6bcdd9661666ee60300960db3)) by @AliMD
- **async-queue:** add isRunning ([2e54a0a](https://github.com/Alwatr/nanolib/commit/2e54a0a5200ccbfcc64e443728eb6d16513b4296)) by @njfamirm
