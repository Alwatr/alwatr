# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@5.5.1...@alwatr/exit-hook@5.5.2) (2025-04-01)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([c1320b4](https://github.com/Alwatr/nanolib/commit/c1320b447a492c5e720e25ad71e9df81eeea3670)) by @dependabot[bot]

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@5.5.0...@alwatr/exit-hook@5.5.1) (2025-03-18)

### Dependencies update

* bump the development-dependencies group with 9 updates ([7290aa3](https://github.com/Alwatr/nanolib/commit/7290aa3b52ce66ca237d2a12d28a7687b113f83d)) by @dependabot[bot]

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@5.4.0...@alwatr/exit-hook@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.8...@alwatr/exit-hook@5.4.0) (2025-02-18)

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

### Features

* **exit-hook:** new package ([a41b3a0](https://github.com/Alwatr/nanolib/commit/a41b3a01a4e6af595521e506326678eb96491a11)) by @
* use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @

### Bug Fixes

* all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @
* **exit-hook:** define package using @alwatr/dedupe to prevent duplicates ([e16638c](https://github.com/Alwatr/nanolib/commit/e16638cb69639f1c7c1316d72db8032fef617d00)) by @
* **exit-hook:** disable beforeExit event and get exit signal from process.exitCode ([2dbed18](https://github.com/Alwatr/nanolib/commit/2dbed18455ab252f686c7af58b9c5bf39f818f0d)) by @
* **exit-hook:** exit after listener called ([70c9f62](https://github.com/Alwatr/nanolib/commit/70c9f624899f87bb417f189792144aa05fca99ba)) by @
* **exit-hook:** Refactor exitHook function to prevent automatically register process exit events ([32d7e29](https://github.com/Alwatr/nanolib/commit/32d7e29dcd89dd4b7dc1a57da391ba8e70f5021d)) by @
* **exit-hook:** show error properly and safe exit on SIGTERM ([b0a27b8](https://github.com/Alwatr/nanolib/commit/b0a27b8c89945069c98637269f976b5e9f3618c0)) by @
* **exit-hook:** typo function name ([e8df52a](https://github.com/Alwatr/nanolib/commit/e8df52a8f527e653025abe6a8bc54719498db83e)) by @

### Code Refactoring

* **exit-hook:** dosen't use `dedupe` anymore ([e6c3ce9](https://github.com/Alwatr/nanolib/commit/e6c3ce91be0a42d5d1f857eca824a200eacc911c)) by @
* **exit-hook:** use new dedupe api ([185aced](https://github.com/Alwatr/nanolib/commit/185aced6566ba986062fbc0d936fb8090430f681)) by @
* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group with 3 updates ([0e0ec0f](https://github.com/Alwatr/nanolib/commit/0e0ec0f7c66c849727563cabe0e88606aee49035)) by @
* **deps:** upd ([b6dd6dd](https://github.com/Alwatr/nanolib/commit/b6dd6dd8173d9788c179d57091402e693fa2024a)) by @
* **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @
* **deps:** update ([8e70dff](https://github.com/Alwatr/nanolib/commit/8e70dffb1e751496ef2e72d6cffd685f1fea44e3)) by @
* **deps:** update ([f0b60d2](https://github.com/Alwatr/nanolib/commit/f0b60d24c9fae6190940baf95167a1175360d4b3)) by @
* **exit-hook:** change the license to AGPL-3.0 ([74e89a1](https://github.com/Alwatr/nanolib/commit/74e89a18044831c225649494734d284bb95d4629)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* rename logger env ([38443ad](https://github.com/Alwatr/nanolib/commit/38443ade4677e857b5ebd4be417f5f2eb1818c87)) by @
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

## [1.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.7...@alwatr/exit-hook@1.1.8) (2024-11-02)

### Dependencies update

* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @alimd

## [1.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.6...@alwatr/exit-hook@1.1.7) (2024-10-25)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @dependabot[bot]
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @dependabot[bot]

## [1.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.5...@alwatr/exit-hook@1.1.6) (2024-10-12)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.4...@alwatr/exit-hook@1.1.5) (2024-10-11)

### Code Refactoring

- **exit-hook:** dosen't use `dedupe` anymore ([e6c3ce9](https://github.com/Alwatr/nanolib/commit/e6c3ce91be0a42d5d1f857eca824a200eacc911c)) by @mohammadhonarvar
- prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @mohammadhonarvar

## [1.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.3...@alwatr/exit-hook@1.1.4) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [1.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.2...@alwatr/exit-hook@1.1.3) (2024-10-11)

### Bug Fixes

- **exit-hook:** Refactor exitHook function to prevent automatically register process exit events ([32d7e29](https://github.com/Alwatr/nanolib/commit/32d7e29dcd89dd4b7dc1a57da391ba8e70f5021d)) by @alimd

## [1.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.1...@alwatr/exit-hook@1.1.2) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.1.0...@alwatr/exit-hook@1.1.1) (2024-10-08)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.16...@alwatr/exit-hook@1.1.0) (2024-09-29)

### Features

- use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @mohammadhonarvar

### Bug Fixes

- all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @mohammadhonarvar

### Code Refactoring

- **exit-hook:** use new dedupe api ([185aced](https://github.com/Alwatr/nanolib/commit/185aced6566ba986062fbc0d936fb8090430f681)) by @alimd

### Miscellaneous Chores

- **exit-hook:** change the license to AGPL-3.0 ([74e89a1](https://github.com/Alwatr/nanolib/commit/74e89a18044831c225649494734d284bb95d4629)) by @ArmanAsadian
- Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @alimd

### Dependencies update

- bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @dependabot[bot]

## [1.0.16](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.15...@alwatr/exit-hook@1.0.16) (2024-09-21)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.0.15](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.14...@alwatr/exit-hook@1.0.15) (2024-09-15)

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]
- update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @alimd

## [1.0.14](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.13...@alwatr/exit-hook@1.0.14) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [1.0.13](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.12...@alwatr/exit-hook@1.0.13) (2024-08-31)

### Bug Fixes

- **exit-hook:** define package using @alwatr/dedupe to prevent duplicates ([e16638c](https://github.com/Alwatr/nanolib/commit/e16638cb69639f1c7c1316d72db8032fef617d00)) by @alimd

## [1.0.12](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.11...@alwatr/exit-hook@1.0.12) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [1.0.11](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.10...@alwatr/exit-hook@1.0.11) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.0.10](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.9...@alwatr/exit-hook@1.0.10) (2024-05-12)

### Bug Fixes

- **exit-hook:** show error properly and safe exit on SIGTERM ([b0a27b8](https://github.com/Alwatr/nanolib/commit/b0a27b8c89945069c98637269f976b5e9f3618c0)) by @alimd

### Dependencies update

- upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @alimd

## [1.0.9](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.8...@alwatr/exit-hook@1.0.9) (2024-04-25)

### Bug Fixes

- **exit-hook:** disable beforeExit event and get exit signal from process.exitCode ([2dbed18](https://github.com/Alwatr/nanolib/commit/2dbed18455ab252f686c7af58b9c5bf39f818f0d)) by @njfamirm
- **exit-hook:** exit after listener called ([70c9f62](https://github.com/Alwatr/nanolib/commit/70c9f624899f87bb417f189792144aa05fca99ba)) by @njfamirm

## [1.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.7...@alwatr/exit-hook@1.0.8) (2024-03-28)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.6...@alwatr/exit-hook@1.0.7) (2024-01-31)

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @alimd

## [1.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.5...@alwatr/exit-hook@1.0.6) (2024-01-24)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.4...@alwatr/exit-hook@1.0.5) (2024-01-20)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.3...@alwatr/exit-hook@1.0.4) (2024-01-16)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.2...@alwatr/exit-hook@1.0.3) (2024-01-08)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.1...@alwatr/exit-hook@1.0.2) (2024-01-03)

**Note:** Version bump only for package @alwatr/exit-hook

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/exit-hook@1.0.0...@alwatr/exit-hook@1.0.1) (2024-01-03)

### Bug Fixes

- **exit-hook:** typo function name ([e8df52a](https://github.com/Alwatr/nanolib/commit/e8df52a8f527e653025abe6a8bc54719498db83e)) by @njfamirm

# 1.0.0 (2024-01-03)

### Features

- **exit-hook:** new package ([a41b3a0](https://github.com/Alwatr/nanolib/commit/a41b3a01a4e6af595521e506326678eb96491a11)) by @njfamirm
