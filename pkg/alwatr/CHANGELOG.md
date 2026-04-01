# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### 🐛 Bug Fixes

* **build:** update scripts to use bun instead of yarn ([074365a](https://github.com/Alwatr/alwatr/commit/074365a1c54a00a257279f67338b7ca21dc02d81))

### 🔨 Code Refactoring

* remove emitDeclarationOnly from tsconfig.json files ([98c8910](https://github.com/Alwatr/alwatr/commit/98c891005bf2bc2c3b37c3a635346e917aeeedb3))
* rename clean script alias from 'c' to 'cl' across all package.json files ([e041589](https://github.com/Alwatr/alwatr/commit/e0415899ec6f509fcceaa2fb732c110ead848293))
* reorganize fields in package.json files across multiple packages ([6a0e28f](https://github.com/Alwatr/alwatr/commit/6a0e28f6f43dc816232d6c4f7f4fe2d68993dd29))
* reorganize fields in package.json files across multiple packages ([280e7b1](https://github.com/Alwatr/alwatr/commit/280e7b16414e1eb349c0af3cfc5f4f8f2e0b5288))
* update tsconfig.json to extend from @alwatr/tsconfig-base directly ([1fb76b0](https://github.com/Alwatr/alwatr/commit/1fb76b0e8a56ec5582b43aee4b6cd1850c5f936d))

### 🧹 Miscellaneous Chores

* add "import" field to package exports for consistency ([eb2a680](https://github.com/Alwatr/alwatr/commit/eb2a6805d731ae44ba0666891cacd88088a30abe))
* fix all deps ([86c7c48](https://github.com/Alwatr/alwatr/commit/86c7c48c04ad3225be5012e934443aac28a335d3))
* format package.json of all packages ([16bd4c9](https://github.com/Alwatr/alwatr/commit/16bd4c91c8e0cce78f8def0bb0c0b5cdb779a3d2))
* move main alwatr package into pkg ([0287ab0](https://github.com/Alwatr/alwatr/commit/0287ab05507a0c3dbf5694fb97cf73f8a366b389))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update dependencies in package.json and bun.lock to use workspace references for @alwatr/signal and @alwatr/fsm ([e86d7e4](https://github.com/Alwatr/alwatr/commit/e86d7e49eac6a5c5346643482ec249770289f00a))
* update logger imports to replace nanolib with nano-build across multiple files ([26a07af](https://github.com/Alwatr/alwatr/commit/26a07afe5fc8761a15ff12538f485a6757d75c74))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))
* update package.json exports to use default entry points with .js extension ([b151afc](https://github.com/Alwatr/alwatr/commit/b151afca85c89399a6a1731da91bb8c13b7aca86))
* update package.json scripts to use nano-build with src/main.ts and replace nanolib with nano-build in devDependencies ([8d13a39](https://github.com/Alwatr/alwatr/commit/8d13a394a1d0e2364693c2ae23446958adf05381))

## [5.0.0](https://github.com/Alwatr/alwatr/compare/v4.0.2...v5.0.0) (2025-09-27)

### ⚠ BREAKING CHANGES

* Upgrade flux (include fms and signal) to v6

### 🔗 Dependencies update

* update @alwatr/flux dependency to version 6.1.0 ([cbe02ac](https://github.com/Alwatr/alwatr/commit/cbe02aca5810abc64c028e81f070c0943e3f6a5e))

## [4.0.2](https://github.com/Alwatr/alwatr/compare/v4.0.1...v4.0.2) (2025-09-27)

### 🐛 Bug Fixes

* back @alwatr/flux dependency to version 4.1.1 ([089a8dc](https://github.com/Alwatr/alwatr/commit/089a8dcb437279d2fa0c4a111401fea4888eaaea))
* update @alwatr/nanolib dependency to version 6.1.8 ([48ba301](https://github.com/Alwatr/alwatr/commit/48ba301a77add26991731aa20c637a369b1f8b21))

### 🔗 Dependencies update

* update devDependencies to latest versions ([6252281](https://github.com/Alwatr/alwatr/commit/625228164c7c029c74e7f5a613a20e0d7f539cee))

## [4.0.1](https://github.com/Alwatr/alwatr/compare/v4.0.0...v4.0.1) (2025-09-25)

### 🐛 Bug Fixes

* update alwatr dependencies to latest versions ([d293233](https://github.com/Alwatr/alwatr/commit/d293233c8113983e146222941eeac60a8bd6111f))

## [4.0.0](https://github.com/Alwatr/alwatr/compare/v3.12.2...v4.0.0) (2025-09-22)

### ✨ Features

* update @alwatr/flux version in package.json to 6.0.2 ([8ed1ae0](https://github.com/Alwatr/alwatr/commit/8ed1ae02477700b2f8c83aba016b1624b41ddc59))
* update @alwatr/nanolib version in package.json to 6.1.1 ([1098a48](https://github.com/Alwatr/alwatr/commit/1098a48f19774b4c076341e76396dea832cc3d9d))
* update @alwatr/nanotron version in package.json to ^4.10.1 ([05d3fe9](https://github.com/Alwatr/alwatr/commit/05d3fe9387fcf5a936ad794e6151bb4ae12770db))
* update @alwatr/nitrobase version in package.json to ^7.10.0 ([76fa0b2](https://github.com/Alwatr/alwatr/commit/76fa0b262da54d9826829e33daf537d47dee87dc))

### 🐛 Bug Fixes

* add sideEffects property to package.json ([32eeb88](https://github.com/Alwatr/alwatr/commit/32eeb88fa058ef1bf920a5fe81396eaf0d02e2dc))
* consolidate nanolib exports and remove deprecated files ([261e6c2](https://github.com/Alwatr/alwatr/commit/261e6c2735fcffdcb694febc39fb8d5fdb02eea6))

### 🧹 Miscellaneous Chores

* reorganize package.json structure and update scripts for consistency ([4249023](https://github.com/Alwatr/alwatr/commit/42490230015d1ad898e50a191bcef3226ab4feb9))

### 🔗 Dependencies update

* update devDependencies in package.json for improved compatibility ([460e50d](https://github.com/Alwatr/alwatr/commit/460e50dcbcf4f5068c95204333e10c5bde210ee7))

## [3.12.2](https://github.com/Alwatr/alwatr/compare/v3.12.1...v3.12.2) (2025-04-20)

### Bug Fixes

* update @alwatr/eslint-config to 5.5.4, @alwatr/nanolib to 5.6.5, @alwatr/nano-build to 5.5.3, and @alwatr/type-helper to 5.4.1 ([e3b939b](https://github.com/Alwatr/alwatr/commit/e3b939b91386b39face86917c7edf7a33376666b)) by @

## [3.12.1](https://github.com/Alwatr/alwatr/compare/v3.12.0...v3.12.1) (2025-04-15)

### Bug Fixes

* update @alwatr/nanolib to 5.6.2 ([3810153](https://github.com/Alwatr/alwatr/commit/381015347f2ee4dc3376263cafbd72ba0b3d9f66)) by @

## [3.12.0](https://github.com/Alwatr/alwatr/compare/v3.11.1...v3.12.0) (2025-04-01)

### Features

* bump @alwatr/nanolib and @alwatr/nano-build to latest versions ([69f725a](https://github.com/Alwatr/alwatr/commit/69f725a7420103bc3a5c9a23c4b86675f41f22f6)) by @

## [3.11.1](https://github.com/Alwatr/alwatr/compare/v3.11.0...v3.11.1) (2025-03-13)

### Bug Fixes

* update @alwatr/flux to version 4.0.5 and @alwatr/nanolib to version 5.5.1 ([5bf5cac](https://github.com/Alwatr/alwatr/commit/5bf5cac37a708977406a452879159524e0a5b618)) by @alimd

## [3.11.0](https://github.com/Alwatr/alwatr/compare/v3.10.0...v3.11.0) (2025-03-06)

### Features

* **deps-dev:** bump the dependencies group with 4 updates ([69ce95c](https://github.com/Alwatr/alwatr/commit/69ce95c2dc44f92909e7665391a01db63af47d07)) by @dependabot[bot]
* update @alwatr/flux to version 4.0.4 ([c7aa71c](https://github.com/Alwatr/alwatr/commit/c7aa71c9d7b82f88c9a35359e0de887108bec75c)) by @
* update @alwatr/nanolib to version 5.5.0 ([0c43df3](https://github.com/Alwatr/alwatr/commit/0c43df32907252726894a797c35f5cf7a6ab7a32)) by @
* update @alwatr/nanotron to version 4.9.1 ([774818d](https://github.com/Alwatr/alwatr/commit/774818dd409618801cb51afc4c6de6486a10be7e)) by @
* update @alwatr/nitrobase to version 7.8.0 ([61c0604](https://github.com/Alwatr/alwatr/commit/61c0604b8900655dbe84d31e7469e56103ffc8a3)) by @

## [3.10.0](https://github.com/Alwatr/alwatr/compare/v3.9.0...v3.10.0) (2025-02-26)

### Features

* update @alwatr/nanotron to v4.9.0 and @alwatr/nitrobase to v7.7.0 ([24aa049](https://github.com/Alwatr/alwatr/commit/24aa0491375207f32d2cad3967483e901e82634d)) by @alimd

### Miscellaneous Chores

* clean up CHANGELOG and README files by removing outdated entries ([9d53ba3](https://github.com/Alwatr/alwatr/commit/9d53ba38c7476dab07c48879b3f52ef69b75e5c6)) by @alimd
* downgrade version from 4.0.0 to 3.9.0 in lerna.json and alwatr/package.json ([5c6033f](https://github.com/Alwatr/alwatr/commit/5c6033fa650adceb7fc2bbeeabaa303b72a6bced)) by @
* update project license from AGPL-3.0 to MPL-2.0 in README and package.json files ([6913eba](https://github.com/Alwatr/alwatr/commit/6913eba53d2ecf3a7a4ce8fb2407511f564b8bb3)) by @alimd

## [3.9.0](https://github.com/Alwatr/alwatr/compare/v3.8.0...v3.9.0) (2025-02-18)

### Features

* **deps:** bump dependencies for [@alwatr](https://github.com/alwatr) packages to latest versions ([f213918](https://github.com/Alwatr/alwatr/commit/f213918fa4160d3c03834759a58b2ea9d7916f29)) by @

## [3.8.0](https://github.com/Alwatr/alwatr/compare/v3.7.0...v3.8.0) (2025-02-03)

### Features

* **deps-dev:** bump the dependencies group across 1 directory with 10 updates ([eb7a876](https://github.com/Alwatr/alwatr/commit/eb7a87643ec2fa53fb5ff609d487b8ad821ff04c)) by @dependabot[bot]
* **deps:** bump the alwatr group across 1 directory with 5 updates ([aebe447](https://github.com/Alwatr/alwatr/commit/aebe447fce86d6b18d98fad2f89232962dcdaad5)) by @dependabot[bot]

## [3.7.0](https://github.com/Alwatr/alwatr/compare/v3.6.0...v3.7.0) (2024-11-09)

### Features

* update @alwatr/nitrobase to v7.5.0 and adjust dependencies in yarn.lock ([9aa921d](https://github.com/Alwatr/alwatr/commit/9aa921df5f67d83c598d919b670a592d6de61e9e)) by @AliMD

## [3.6.0](https://github.com/Alwatr/alwatr/compare/v3.5.0...v3.6.0) (2024-11-08)

### Features

* update @alwatr/nitrobase to v7.4.1 ([e68929d](https://github.com/Alwatr/alwatr/commit/e68929d7e051393d1f1088e72055ba4c76030d33)) by @

## [3.5.0](https://github.com/Alwatr/alwatr/compare/v3.4.0...v3.5.0) (2024-11-08)

### Features

* restructure nitrobase exports and add nitrobase/client ([2c141af](https://github.com/Alwatr/alwatr/commit/2c141afd98ef7a772de89676561a184d0edd7497)) by @
* update @alwatr/nanotron to v4.8.0 and @alwatr/nitrobase to v7.4.0 ([b1fe790](https://github.com/Alwatr/alwatr/commit/b1fe790ebbb62ca91240fff465fb8acbe0b0dd95)) by @

## [3.4.0](https://github.com/Alwatr/alwatr/compare/v3.3.0...v3.4.0) (2024-11-07)

### Features

* update @alwatr/nanotron to v4.7.0 and related dependencies ([c2268ce](https://github.com/Alwatr/alwatr/commit/c2268ce77f97bd2615a0a0af473edc4230da9259)) by @

## [3.3.0](https://github.com/Alwatr/alwatr/compare/v3.2.1...v3.3.0) (2024-11-07)

### Features

* update @alwatr/nanotron and related dependencies to v4.6.0 ([44fe322](https://github.com/Alwatr/alwatr/commit/44fe3227a5eeed5012a8c98ccb8187b9b49253d5)) by @

## [3.2.1](https://github.com/Alwatr/alwatr/compare/v3.2.0...v3.2.1) (2024-11-07)

### Bug Fixes

* update @alwatr/nanolib and @alwatr/fetch to v5.2.1 ([cac0343](https://github.com/Alwatr/alwatr/commit/cac03435f9b6b990b13541c2d055ff429b9bb056)) by @

## [3.2.0](https://github.com/Alwatr/alwatr/compare/v3.1.1...v3.2.0) (2024-11-07)

### Features

* update @alwatr/nanolib to v5.2.0 and @alwatr/fetch to v5.2.0 ([cc041f3](https://github.com/Alwatr/alwatr/commit/cc041f37ea291ce9d7ba8178cac498c2fdca223f)) by @

## [3.1.1](https://github.com/Alwatr/alwatr/compare/v3.1.0...v3.1.1) (2024-11-06)

### Bug Fixes

* update flux to v4.0.2 ([0e48a15](https://github.com/Alwatr/alwatr/commit/0e48a15b43613c8a43f72b1dc191516ab382c638)) by @

## [3.1.0](https://github.com/Alwatr/alwatr/compare/v3.0.0...v3.1.0) (2024-11-06)

### Features

* update `flux` version to `4.0.1` ([b641425](https://github.com/Alwatr/alwatr/commit/b641425cb09abf5bae623a1d4e679e05d8a553eb)) by @

## [3.0.0](https://github.com/Alwatr/alwatr/compare/v2.3.0...v3.0.0) (2024-11-06)

### ⚠ BREAKING CHANGES

* [Flux v4](https://github.com/Alwatr/flux/releases/tag/v4.0.0) has some breaking changes:

### Features

* upgrade flux v4.0.0 ([1800866](https://github.com/Alwatr/alwatr/commit/1800866e867f4a0d90880d130f4d81b4114e66ef)) by @

## [2.3.0](https://github.com/Alwatr/alwatr/compare/v2.2.0...v2.3.0) (2024-11-04)

### Features

* upgrade nanolib to v5.1.0 ([78251cf](https://github.com/Alwatr/alwatr/commit/78251cfc4123516f6f028912597206777ee3b762)) by @

## [2.2.0](https://github.com/Alwatr/alwatr/compare/v2.1.1...v2.2.0) (2024-11-02)

### Features

* **deps:** bump the alwatr group across 1 directory with 9 updates ([f6ef7ac](https://github.com/Alwatr/alwatr/commit/f6ef7ac8fee35ce26722928cb3a255eb7b3870b5)) by @dependabot[bot]

## [2.1.1](https://github.com/Alwatr/alwatr/compare/v2.1.0...v2.1.1) (2024-10-28)

### Bug Fixes

* nanotron v4.5.1 ([f10c0e8](https://github.com/Alwatr/alwatr/commit/f10c0e87167e639f9874b69101aec8f46555cbc8)) by @

## [2.1.0](https://github.com/Alwatr/alwatr/compare/v2.0.3...v2.1.0) (2024-10-28)

### Features

* update @alwatr/nanotron 4.5.0 ([#1676](https://github.com/Alwatr/alwatr/issues/1676)) ([b59f1ff](https://github.com/Alwatr/alwatr/commit/b59f1ffced648630d14f0d197efc3ae3f9d89575)) by @dependabot[bot]
* update flux v3.2.1 ([30ec156](https://github.com/Alwatr/alwatr/commit/30ec156ed8ee72c6e69c95a40049a549a7d3c239)) by @AliMD

## [2.0.3](https://github.com/Alwatr/alwatr/compare/v2.0.2...v2.0.3) (2024-10-16)

### Bug Fixes

* nanotron v4.4.1 ([195b728](https://github.com/Alwatr/alwatr/commit/195b72833352a5c3a3af2e53210ffc300f886e04)) by @AliMD

## [2.0.2](https://github.com/Alwatr/alwatr/compare/v2.0.1...v2.0.2) (2024-10-15)

**Note:** Version bump only for package alwatr

## [2.0.1](https://github.com/Alwatr/alwatr/compare/v2.0.0...v2.0.1) (2024-10-15)

**Note:** Version bump only for package alwatr

## [2.0.0](https://github.com/Alwatr/alwatr/compare/v1.1.2...v2.0.0) (2024-10-15)

### Features

* add `alwatr` package ([f7a00e9](https://github.com/Alwatr/alwatr/commit/f7a00e9fc949ad83013be1b3e21013090afe09ab)) by @mohammadhonarvar
* Update @alwatr/nanolib version to 1.3.0 ([ea12e9b](https://github.com/Alwatr/alwatr/commit/ea12e9b56374a19fe54b81f7a815a56575c9c11d)) by @

### Miscellaneous Chores

* Update version numbers in lerna.json and package.json ([75eb77c](https://github.com/Alwatr/alwatr/commit/75eb77c3882b06719d402c8b53a5c229d9b475bd)) by @
