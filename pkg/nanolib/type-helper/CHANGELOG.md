# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

**Note:** Version bump only for package @alwatr/type-helper

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* **type-helper:** migrate from global declarations to named exports ([59bc2cc](https://github.com/Alwatr/alwatr/commit/59bc2cc4c33c0ae447800aac13d293c351ac0e01))

### 🧹 Miscellaneous Chores

* **type-helper:** add import and default exports for types ([1e25f83](https://github.com/Alwatr/alwatr/commit/1e25f83ef3594512c47ac88c4b1dc74ab72e45be))

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### 🐛 Bug Fixes

* remove redundant export for types.d.ts in package.json ([28714f7](https://github.com/Alwatr/alwatr/commit/28714f7ad6daa321be6465381d5d016d20a48b8d))

### 🔨 Code Refactoring

* rename clean script alias from 'c' to 'cl' across all package.json files ([e041589](https://github.com/Alwatr/alwatr/commit/e0415899ec6f509fcceaa2fb732c110ead848293))
* reorganize fields in package.json files across multiple packages ([6a0e28f](https://github.com/Alwatr/alwatr/commit/6a0e28f6f43dc816232d6c4f7f4fe2d68993dd29))
* reorganize fields in package.json files across multiple packages ([280e7b1](https://github.com/Alwatr/alwatr/commit/280e7b16414e1eb349c0af3cfc5f4f8f2e0b5288))

### 🧹 Miscellaneous Chores

* fix all deps ([86c7c48](https://github.com/Alwatr/alwatr/commit/86c7c48c04ad3225be5012e934443aac28a335d3))
* rename all pageckage inside pkg/nanolib ([8584300](https://github.com/Alwatr/alwatr/commit/85843005c3c34bdf391a718cacaf5d6eb9786fe7))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json exports to ESM-only ([2deab42](https://github.com/Alwatr/alwatr/commit/2deab422f3285146a1111e97462487e1cc10b214))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))

## [8.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@8.0.1...@alwatr/type-helper@8.0.2) (2026-03-27)

### 🧹 Miscellaneous Chores

* update TypeScript version to ^6.0.2 across all packages ([d6b2bf3](https://github.com/Alwatr/nanolib/commit/d6b2bf3ce064eb927c56d9f8c7a5d3138adde998))

## [8.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@8.0.0...@alwatr/type-helper@8.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))

## [8.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@7.0.2...@alwatr/type-helper@8.0.0) (2026-03-19)

### ⚠ BREAKING CHANGES

* This package is now ESM-only and no longer provides CommonJS (CJS) distribution.
- Minimum Node.js version is now 14.13.0 (or 12.22.0 for older versions with --experimental-modules flag)
- All require() statements must be replaced with import statements
- CommonJS require() is no longer supported

### 🔨 Code Refactoring

* convert to ESM-only module ([493d7d9](https://github.com/Alwatr/nanolib/commit/493d7d9d76d03c43902eb04f0a9ecebac8f6fbba))

### 🧹 Miscellaneous Chores

* update build command in package.json files to remove source map flags ([6b504fc](https://github.com/Alwatr/nanolib/commit/6b504fc4f813146064a21638014a62b0b5b95ca0))

## [7.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@7.0.1...@alwatr/type-helper@7.0.2) (2026-03-16)

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

## [7.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@7.0.0...@alwatr/type-helper@7.0.1) (2026-02-18)

**Note:** Version bump only for package @alwatr/type-helper

## [7.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.8...@alwatr/type-helper@7.0.0) (2025-12-13)

### ⚠ BREAKING CHANGES

* All `*Function` types renamed to `*Func`

### 🐛 Bug Fixes

* rename `*Function` types to `*Func` for duplicate issue with new typescript types ([44dbb11](https://github.com/Alwatr/nanolib/commit/44dbb1195bacc37aa4b4e2be1e53d7bc657ef418))

## [6.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.7...@alwatr/type-helper@6.1.8) (2025-12-10)

**Note:** Version bump only for package @alwatr/type-helper

## [6.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.6...@alwatr/type-helper@6.1.7) (2025-11-18)

**Note:** Version bump only for package @alwatr/type-helper

## [6.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.5...@alwatr/type-helper@6.1.6) (2025-11-15)

### 🐛 Bug Fixes

* rename Noop type to NoopFunction for clarity ([068ff72](https://github.com/Alwatr/nanolib/commit/068ff726dd0cbfc87de1c71782e5f8a35d2eeb83))

## [6.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.4...@alwatr/type-helper@6.1.5) (2025-10-06)

### 🔗 Dependencies update

* bump the npm-dependencies group with 4 updates ([9825815](https://github.com/Alwatr/nanolib/commit/982581552bbb4b97dca52af5e93a80937f0c3109))

## [6.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.3...@alwatr/type-helper@6.1.4) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [6.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.2...@alwatr/type-helper@6.1.3) (2025-09-22)

### 🐛 Bug Fixes

* remove unnecessary method from JsonValue type definition ([d18847c](https://github.com/Alwatr/nanolib/commit/d18847c8f0bd0f36c91159377786ade8fe346406))

## [6.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.1...@alwatr/type-helper@6.1.2) (2025-09-22)

### 🐛 Bug Fixes

* extend JsonValue type to include objects with toJSON method ([13e8315](https://github.com/Alwatr/nanolib/commit/13e8315312229b7dd7238f2fc37c650f7cfd8ccb))

## [6.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.1.0...@alwatr/type-helper@6.1.1) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [6.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.0.2...@alwatr/type-helper@6.1.0) (2025-09-19)

### ✨ Features

* add SingleOrReadonlyArray type for flexible item handling ([4b65513](https://github.com/Alwatr/nanolib/commit/4b65513a3731389d84637b68cb38c76a4c0db491))

## [6.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.0.1...@alwatr/type-helper@6.0.2) (2025-09-13)

### 🧹 Miscellaneous Chores

* add utility types for function manipulation and event listener interface ([b2ca24d](https://github.com/Alwatr/nanolib/commit/b2ca24d3e4d23236796be1b8fa2e74c9ffc3379f))

## [6.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@6.0.0...@alwatr/type-helper@6.0.1) (2025-09-09)

**Note:** Version bump only for package @alwatr/type-helper

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@5.4.4...@alwatr/type-helper@6.0.0) (2025-09-06)

### ⚠ BREAKING CHANGES

* The JSON types completely refactored for better consistency and clarity. Use new `JsonPrimitive`, `JsonValue`, `JsonArray`, `JsonObject` and powerful `Jsonify` util.
* The type alias `Merge` has been renamed to `Overwrite` to avoid confusion with deep merging. The new name better describes its functionality: properties of `N` overwrite properties of `M`.
* The type `ArrayItems` has been renamed to `ArrayItem` for better consistency and clarity.
The logic has been updated to return `never` if the input is not an array. Additionally, it now supports readonly arrays using `readonly (infer U)[]
* The type alias `Values` has been renamed to `ObjectValues` for better alignment with the TypeScript ecosystem. Update all references
* The type alias `Immutable<T>` has been removed. Use internal `Readonly<T>` for better alignment with the TypeScript ecosystem. Update all references
* The type alias `MaybePromise` has been renamed to `Awaitable` for better alignment with the TypeScript ecosystem. Update all references
* Import separate types not supported anymore, please just use global usage.

### 🔨 Code Refactoring

* enhance Class type definition to include constructor argument types ([698b3d0](https://github.com/Alwatr/nanolib/commit/698b3d03e9fc7ce1650d8c2bfeb8efdf0225a3c5))
* enhance DeepReadonly, DeepRequired, and DeepPartial types for improved type safety ([76c905f](https://github.com/Alwatr/nanolib/commit/76c905f85bd50f502675b0d351031f7e8c830515))
* enhance documentation for RequiredKeys, OptionalKeys, and Prop types ([1bb1ec4](https://github.com/Alwatr/nanolib/commit/1bb1ec4f5fe11a75ea56b7e9ca968b3b7f8bbfae))
* improve JSON type definitions and enhance documentation ([0928233](https://github.com/Alwatr/nanolib/commit/0928233618eb4f0386066f1a09e7eee43f768d61))
* improve type documentation ([f16d032](https://github.com/Alwatr/nanolib/commit/f16d032caafc36cc6b3ac2995b1bead3bd55dc96))
* improve type documentation and add Simplify type definition ([33ffdcf](https://github.com/Alwatr/nanolib/commit/33ffdcf0fedf0cd1e05997fc7487dd6cd995327f))
* improve type documentation and formatting in type definitions ([e856018](https://github.com/Alwatr/nanolib/commit/e85601807abc9af62232d3079c4aaf7263d76311))
* improve type documentation and organization in type declarations ([695979b](https://github.com/Alwatr/nanolib/commit/695979bbbf2ac73344cf859dca966da6552a1df3))
* redefine all types as just global and remove exported each types ([c4ac67a](https://github.com/Alwatr/nanolib/commit/c4ac67a102c15a982c4b32822bd606239c32f05c))
* remove export from HasAddEventListener interface for consistency ([8aaaba2](https://github.com/Alwatr/nanolib/commit/8aaaba26e5ce12433521c95abacb116677c10174))
* remove Immutable type definition from global types ([a154220](https://github.com/Alwatr/nanolib/commit/a154220c24fa98f20820121566b82621cdd29958))
* rename ArrayItems to ArrayItem and fix its logic ([9a63a3f](https://github.com/Alwatr/nanolib/commit/9a63a3fbe2eb7a14b687e90cf045993a5f912990))
* rename MaybePromise to Awaitable and update documentation ([35bf339](https://github.com/Alwatr/nanolib/commit/35bf3397283f70a8d145b88c06c42fc7ab5a76d3))
* rename Merge to Overwrite for clarity ([25e4f02](https://github.com/Alwatr/nanolib/commit/25e4f02f3ad6ae6419171f1c208fbd668aa34508))
* rename Values type to ObjectValues and update documentation ([368de42](https://github.com/Alwatr/nanolib/commit/368de42027738a8ca4fa12b80433d218326b8cbd))
* reorganize global type declarations and improve documentation ([e91a459](https://github.com/Alwatr/nanolib/commit/e91a4597bacf3381ba124f1b22b1dcbdeb24877a))
* update DictionaryOpt and DictionaryReq documents ([8be1955](https://github.com/Alwatr/nanolib/commit/8be1955205ea8b4d711f5e5dca9d66609086a04f))

## [5.4.4](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@5.4.3...@alwatr/type-helper@5.4.4) (2025-08-23)

**Note:** Version bump only for package @alwatr/type-helper

## [5.4.3](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@5.4.1...@alwatr/type-helper@5.4.3) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))

### 🔗 Dependencies update

* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.4.2](https://github.com/Alwatr/nanolib/compare/@alwatr/type-helper@5.4.1...@alwatr/type-helper@5.4.2) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## <small>5.4.1 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/type-helper

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
