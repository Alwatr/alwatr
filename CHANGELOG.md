# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.3.0](https://github.com/Alwatr/nanolib/compare/v5.2.1...v5.3.0) (2025-02-03)

### Features

* **local-storage:** add setItem after getItem and add hasItem ([a1b845d](https://github.com/Alwatr/nanolib/commit/a1b845d8d9d207b514f9e06c37610220337b0235)) by @ArmanAsadian

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @ArmanAsadian

### Dependencies update

* bump cross-spawn from 7.0.3 to 7.0.6 ([43466b9](https://github.com/Alwatr/nanolib/commit/43466b92b0d9fc6441c9a050727b9f20f62f813d)) by @dependabot[bot]
* bump esbuild in the production-dependencies group ([97b1ced](https://github.com/Alwatr/nanolib/commit/97b1ced6218d154e53a7b8d238f5a8681ef4efd8)) by @dependabot[bot]
* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @dependabot[bot]
* bump the github-actions group across 1 directory with 4 updates ([524a134](https://github.com/Alwatr/nanolib/commit/524a134a57628b135a50745947415942b151f493)) by @dependabot[bot]
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @alimd

## [5.2.1](https://github.com/Alwatr/nanolib/compare/v5.2.0...v5.2.1) (2024-11-07)

### Bug Fixes

* **fetch:** refine error handling in fetchJson to improve response error structure ([2942563](https://github.com/Alwatr/nanolib/commit/29425639c268f091711ab195a4285e49b762e497)) by @

## [5.2.0](https://github.com/Alwatr/nanolib/compare/v5.1.0...v5.2.0) (2024-11-06)

### Features

* **fetch:** improve error handling for fetch responses and JSON parsing ([8692bb1](https://github.com/Alwatr/nanolib/commit/8692bb1123e8b3a6d6f8aea20464c55b344da9d2)) by @alimd

## [5.1.0](https://github.com/Alwatr/nanolib/compare/v5.0.0...v5.1.0) (2024-11-04)

### Features

* **node-fs:** enhance makeEmptyFile to create directories recursively if they don't exist ([723a770](https://github.com/Alwatr/nanolib/commit/723a7701c60c3872fc41cb041c1044793145280f)) by @alimd

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.
* **global-scope:** The global-scope module has been deprecated and should no longer be used. Please update your code to use the global-this module instead.
* **nano-build:** heads up all presets options changed, please double check the readme and your build output.
* **wait:** all methods renamed
* **type-helper:** Update the type definitions for the Dictionary type in the type-helper package.
Introduce two new types: DictionaryOpt and DictionaryReq, representing dictionaries
with optional and required values respectively. This change improves the clarity
and flexibility of the type system.
* **type-helper:** make values as `optional`
* **logger:** logModule renamed to logFileModule
* **logger:** definePackage and dedupt remove!
* **fetch:** queryParametters renamed to queryParams
* **fetch:** remove serviceRequest

Co-authored-by: Ali Mihandoost <ali@mihandoost.com>
* **logger:** define packages removed and must use @alwatr/dedupe instead
* **logger:** use DEBUG in cli and debug in browser

### Features

* add `get-env-value` package ([b2a89e1](https://github.com/Alwatr/nanolib/commit/b2a89e1409a645e187043b3045107341474e6fd3)) by @
* add `http-utils` package ([8fd5e78](https://github.com/Alwatr/nanolib/commit/8fd5e78f6cb0f0ed8039117c9327310cd85af01f)) by @
* add `resolve-url` package ([a884212](https://github.com/Alwatr/nanolib/commit/a88421233d5cd84dd2fea34c370026b9a81cd887)) by @
* **async-queue:** A simple async queue like mutex and semaphore methodology for javascript and typescript. ([e753ff2](https://github.com/Alwatr/nanolib/commit/e753ff29cf53e0e6bcdd9661666ee60300960db3)) by @
* **async-queue:** add isRunning ([2e54a0a](https://github.com/Alwatr/nanolib/commit/2e54a0a5200ccbfcc64e443728eb6d16513b4296)) by @
* **async-queue:** Add waitForAllFinish method to AsyncQueue class ([3fdef04](https://github.com/Alwatr/nanolib/commit/3fdef04244c515b727c9ccabfd21d7667b561a83)) by @
* **async-queue:** use `package-tracer` ([f570030](https://github.com/Alwatr/nanolib/commit/f570030140c97164b3a9184de739c59dd805055b)) by @
* **AsyncQueue:** generic type for push method ([aec6710](https://github.com/Alwatr/nanolib/commit/aec6710041347452fa52bb2556e59d24bb0932a3)) by @
* **AsyncQueue:** waitForFinish ([47decb4](https://github.com/Alwatr/nanolib/commit/47decb44a21338393d0820e9a965bf27f22dfbcd)) by @
* **dedupe:** add `definePackage` to use `deduplicate` for backward compatibility ([990b994](https://github.com/Alwatr/nanolib/commit/990b994ff7a633f6f337a5b96cdd82dc9638c0d6)) by @
* **dedupe:** new package ([77fcdf6](https://github.com/Alwatr/nanolib/commit/77fcdf6fc8701910a7d503b7fba89fd284f36833)) by @
* **dedupe:** refactor & new api ([393d873](https://github.com/Alwatr/nanolib/commit/393d8730456749e88fc01b7680c025889de53f36)) by @
* **deep-clone:** new package for deep clone obj/array ([9ac5379](https://github.com/Alwatr/nanolib/commit/9ac5379bd579b85d165a79b75bb782654167430d)) by @
* **eslint-config:** disable consistent-type-definitions ([8b88c81](https://github.com/Alwatr/nanolib/commit/8b88c814a6a6079273b81e4f644f099469127513)) by @
* **eslint-config:** extra import extensions support ([0e0652b](https://github.com/Alwatr/nanolib/commit/0e0652b564ef11467b3e6315a76ab6ff7b583c77)) by @
* **eslint-config:** New package for ESLint configurations ([c5f526b](https://github.com/Alwatr/nanolib/commit/c5f526bc46dbdb6e6ba4f4d6493096be62cbec84)) by @
* **eslint-config:** require-extensions ([53f6f50](https://github.com/Alwatr/nanolib/commit/53f6f50c69c26efdac53a6eed58b5ab76256c136)) by @
* **exit-hook:** new package ([a41b3a0](https://github.com/Alwatr/nanolib/commit/a41b3a01a4e6af595521e506326678eb96491a11)) by @
* **fetch:** alwatrAuth ([28e365c](https://github.com/Alwatr/nanolib/commit/28e365c839b0ea80060c0f44ed4dc4473468d5c4)) by @
* **fetch:** fetch json ([b089f12](https://github.com/Alwatr/nanolib/commit/b089f12cef6f1f3b60bc7559dc5e9b8b63c57273)) by @
* **fetch:** move from last repo ([4b86bb5](https://github.com/Alwatr/nanolib/commit/4b86bb542af296c91bc1db36b4e08fdbad501db2)) by @
* **fetch:** Update fetch type definitions with document ([38398cc](https://github.com/Alwatr/nanolib/commit/38398cc33f311a569a53cc3e06c3191e17dbd45b)) by @
* **fetch:** use @alwatr/http-primer for types and http codes ([6fe993a](https://github.com/Alwatr/nanolib/commit/6fe993ac0f395a4c0c6ad3b2caa48a2986cc850f)) by @
* **flat-string:** add new package for simplifies the complex C structures that are part of a combined JavaScript string ([ebfdcb3](https://github.com/Alwatr/nanolib/commit/ebfdcb368bc111e59d6b920f572d6365eef62144)) by @
* **flatomise:** A utility for creating promises that can be externally resolved or rejected. ([1bc4478](https://github.com/Alwatr/nanolib/commit/1bc4478327f156b5e45650590aea013590443723)) by @
* **flatomise:** generic type ([3193b43](https://github.com/Alwatr/nanolib/commit/3193b4378681ec7c840d6d7806dad041a1db7573)) by @
* **global-scope:** Add globalScope and sharedScope_ variables ([9e9f2ee](https://github.com/Alwatr/nanolib/commit/9e9f2ee77a48cd1451a80be72d33f40cbef33a52)) by @
* **global-scope:** new package ([b3cd89e](https://github.com/Alwatr/nanolib/commit/b3cd89ef0172d65a50772c5137a8f9bef440b306)) by @
* **global-scope:** polyfill for globalThis ([17ac530](https://github.com/Alwatr/nanolib/commit/17ac530922c4b4300f370ece38b155d2b3d6713a)) by @
* **http-primer:** add MIME types ([386e25e](https://github.com/Alwatr/nanolib/commit/386e25e375d3e7c9c10d7c678a5951282ce1791c)) by @
* **is-number:** extract from @alwatr/util ([1c8a676](https://github.com/Alwatr/nanolib/commit/1c8a676ccefcad12436f41b96eeb39c60cc09040)) by @
* **is-number:** Update is-number package description and add Number.isFinite polyfill ([a7c8e38](https://github.com/Alwatr/nanolib/commit/a7c8e38eb3e939199cf5637feaf08ac0ed98e2e6)) by @
* **local-storage:** If the version is greater than 1, remove the previous version. ([1fdff96](https://github.com/Alwatr/nanolib/commit/1fdff9696a9cf7f1ced0a4c905ea62eb4c422f7a)) by @
* **local-storage:** Rewrite local storage module ([5ed0f39](https://github.com/Alwatr/nanolib/commit/5ed0f39d090c027bb600a5d061ede887b4669198)) by @
* **local-storage:** separate package from `@alwatr/util` ([4cc22ed](https://github.com/Alwatr/nanolib/commit/4cc22eda8d89f291783eef3b8917434489b628e1)) by @
* **logger:** add logStep method to logger ([860aeed](https://github.com/Alwatr/nanolib/commit/860aeedb2da390ee3d47c037b22a37f73e6dbbbc)) by @
* **logger:** change devMode env name ([ad549dc](https://github.com/Alwatr/nanolib/commit/ad549dc39e52242261c78939bd62ca10f69cea60)) by @
* **logger:** debugMode in definePackage ([9799320](https://github.com/Alwatr/nanolib/commit/97993203d76db57e55b31bef485ea77cfd32a64c)) by @
* **logger:** definePackage ([dfd090e](https://github.com/Alwatr/nanolib/commit/dfd090ebd691c9a589370094d49f950524f71369)) by @
* **logger:** Update debugMode to enabled by default in development mode ([bc7c7ee](https://github.com/Alwatr/nanolib/commit/bc7c7ee1118a259ceaa1be1dade90f2f9ccf9e1d)) by @
* **logger:** use alwatr dedupe ([d89d076](https://github.com/Alwatr/nanolib/commit/d89d076c9fd0dd311804831b1ac0ea955efd4b6d)) by @
* **nano-build:** __package_version__ types ([7894c4b](https://github.com/Alwatr/nanolib/commit/7894c4bd635d1208b612a392f33d0545cb7cf6ed)) by @
* **nano-build:** Add __dev_mode__ global variable ([a8f7e63](https://github.com/Alwatr/nanolib/commit/a8f7e63c66c8166145e9e81994263d36ea6751ae)) by @
* **nano-build:** add `weaver` configs(`--preset=weaver`) ([1bae458](https://github.com/Alwatr/nanolib/commit/1bae4583ae837c606f4862cdebb385e6fe7ac1db)) by @
* **nano-build:** Add presets for module bundling ([158dfec](https://github.com/Alwatr/nanolib/commit/158dfecc4afdac18bcfa5a9288f04ebb1feed6d1)) by @
* **nano-build:** define `__package_name__` ([d071d0b](https://github.com/Alwatr/nanolib/commit/d071d0b406b9e099e9430ad6187cd277ee3e2ca0)) by @
* **nano-build:** microservice preset ([3b464d5](https://github.com/Alwatr/nanolib/commit/3b464d5400c84cd0719bb95bdb7a3ef9edfc3d09)) by @
* **nano-build:** new package for esbuild ([224a09e](https://github.com/Alwatr/nanolib/commit/224a09e9e20c0b8b1ff1de3c224ef84ee2be1f5b)) by @
* **nano-build:** Refactor build options and add presets ([c24f0b7](https://github.com/Alwatr/nanolib/commit/c24f0b79f34167cfbb5f769dbb2de981ca377a9f)) by @
* **nano-lib:** enhance console.log statements ([92f9b2a](https://github.com/Alwatr/nanolib/commit/92f9b2a84035e4d1d92480d692e06426f9e2d371)) by @
* **nanolib:** add `global-this` ([97aa2d0](https://github.com/Alwatr/nanolib/commit/97aa2d043d7e81dddc4fb37628a9ac94b78110aa)) by @
* **nanolib:** add `nanolib` package to export the common packages ([1610b1e](https://github.com/Alwatr/nanolib/commit/1610b1eb5dd7e7f10505b35ae016889c7f4b6b24)) by @
* **nanolib:** add demo test file ([0e98a3e](https://github.com/Alwatr/nanolib/commit/0e98a3e899fb7ce172bdf879ca6c0e6a46068612)) by @
* **nanolib:** export `http-utils` ([ab816d2](https://github.com/Alwatr/nanolib/commit/ab816d20640e2999d75f03a07abf724f9818b5de)) by @
* **nanolib:** export `node` packages from their files ([e039a2f](https://github.com/Alwatr/nanolib/commit/e039a2f75e572943d5dfb1cedebe1d8fc4dfdcc6)) by @
* **nanolib:** export `resolve-url` from `nanolib` package ([ea40407](https://github.com/Alwatr/nanolib/commit/ea404076aabbc05fdf87c5da1c94f3424fb91742)) by @
* **nanolib:** separate export from `dedupe` package ([10c5ffc](https://github.com/Alwatr/nanolib/commit/10c5ffcb5fc208796410c9a99a6e41ad1992bc46)) by @
* **nanolib:** use `get-env-package` ([0e9e492](https://github.com/Alwatr/nanolib/commit/0e9e492210f2aad5d176ed0a3d268f12dd75a4bd)) by @
* **node-fs/write-file:** support buffer as content ([3cce9e9](https://github.com/Alwatr/nanolib/commit/3cce9e937209bfb39aee1b981370ca4a76114e62)) by @
* **node-fs:** Add make-file-bench demo script ([ca3a57a](https://github.com/Alwatr/nanolib/commit/ca3a57a31de5a8b9c76c9d33cb9755809f09a335)) by @
* **node-fs:** base package ([74cbe48](https://github.com/Alwatr/nanolib/commit/74cbe4821c991d1f6c3d5805b29602b922c3f505)) by @
* **node-fs:** copy from store ([5c23e01](https://github.com/Alwatr/nanolib/commit/5c23e01e42d438c15dcd272d2cc351527865c86c)) by @
* **node-fs:** definePackage and logger ([3880703](https://github.com/Alwatr/nanolib/commit/38807039895c784be6168111506b0721980cbb29)) by @
* **node-fs:** demo ([31f3740](https://github.com/Alwatr/nanolib/commit/31f37405a7bb2b4b02440de7f96f5cc8a474aba9)) by @
* **node-fs:** enhance json types ([e85d927](https://github.com/Alwatr/nanolib/commit/e85d9276374a8c5171901791a3a43acad64843a6)) by @
* **node-fs:** enhance type of JSON-related functions ([69751ed](https://github.com/Alwatr/nanolib/commit/69751ed658f76eb439a9834f861c01c06542352b)) by @
* **node-fs:** enhance writeJson type ([9010c72](https://github.com/Alwatr/nanolib/commit/9010c723b1f34cd647f157466554b312fc84a1d3)) by @
* **node-fs:** makeFile ([186ba09](https://github.com/Alwatr/nanolib/commit/186ba09822bddfe200a0ac4725063785cadd0999)) by @
* **node-fs:** readFile under asyncQueue ([ab12153](https://github.com/Alwatr/nanolib/commit/ab12153281600a4ac90ef627811b430a95140ddd)) by @
* **node-fs:** rewrite new writeFile method ([7534ed1](https://github.com/Alwatr/nanolib/commit/7534ed158cdfe1ee593050255c17449960b13001)) by @
* **node-fs:** writeFile under asyncQueue ([6d8b3d7](https://github.com/Alwatr/nanolib/commit/6d8b3d7953938fc954e8ce350206555030560978)) by @
* **node-fs:** writeJson method ([581d4f9](https://github.com/Alwatr/nanolib/commit/581d4f958ccb262c13f23881151616b7ec5e93ee)) by @
* **package-trace:** add a new package ([7bdf8e2](https://github.com/Alwatr/nanolib/commit/7bdf8e2e7a142ab70b10a3aeca3d2bf1a39db58a)) by @
* **parse-duration:** rewrite module 🤦🏻 ([be62163](https://github.com/Alwatr/nanolib/commit/be6216345cb3d4458307f55b8ae44f5ac60dda89)) by @
* **parse-duration:** rewrite with document ([43ffecc](https://github.com/Alwatr/nanolib/commit/43ffeccbc4a859ad838938a63fd52c82654cc9bb)) by @
* **parse-duration:** seperate parseDuration from `@alwatr/math` ([f5e32d0](https://github.com/Alwatr/nanolib/commit/f5e32d080be1b5355463f77a2f23fbd0955b8b67)) by @
* **parse-duration:** update parseDuration function to accept duration as number or string ([af413f5](https://github.com/Alwatr/nanolib/commit/af413f5399b7bb8c01d4e14ae1f9238e44368184)) by @
* **platform-info:** Add isWebWorker property to platformInfo constant object ([ae3ca10](https://github.com/Alwatr/nanolib/commit/ae3ca1097eb9075eb4d730891e8d92768948f43d)) by @
* **platform-info:** new package for detect the current platform ([83f9534](https://github.com/Alwatr/nanolib/commit/83f95346bf0cf00402c6121bcbe4d231ff1739f1)) by @
* **platform-info:** support bun and isCli ([d693067](https://github.com/Alwatr/nanolib/commit/d693067b9d8de749d909600cfdc9587a7cd207f4)) by @
* **playground:** Add new playground package for test ([a000d38](https://github.com/Alwatr/nanolib/commit/a000d38a2e4ac99d8ae8aa73d723c2c5cd3e12a1)) by @
* **polyfill-has-own:** new package ([9c3582b](https://github.com/Alwatr/nanolib/commit/9c3582bcfdacde324ac94f46a15e00cd5fef73e8)) by @
* **prettier-config:** new package for prettier share configs ([a6fdee3](https://github.com/Alwatr/nanolib/commit/a6fdee34591abb1d19e7ea7e431bd6624e2ea6d4)) by @
* **render-state:** add `render-state` package ([7f5b112](https://github.com/Alwatr/nanolib/commit/7f5b1122482a5df205cb4fee1113005310c9464f)) by @
* switch to @alwatr/eslint-config ([df05840](https://github.com/Alwatr/nanolib/commit/df05840ad6a50fc2f2ae7c7b0ccac1cf8c02460c)) by @
* **tsconfig-base:** Add pretty and newLine options to tsconfig.json ([be2f48e](https://github.com/Alwatr/nanolib/commit/be2f48efde7e669eb858d0011ef4771b46f1d768)) by @
* **tsconfig-base:** new package for TypeScript base config ([33bb94e](https://github.com/Alwatr/nanolib/commit/33bb94e38ab34634a26d51643f308cc651da695a)) by @
* **tsconfig-base:** update "useDefineForClassFields" to false in tsconfig.json ([288c0ae](https://github.com/Alwatr/nanolib/commit/288c0aef4b7729afd8aba09cf56f02dea31bfd99)) by @
* **tsconfig-base:** use ESNext instead of ES2023 for the "lib" option ([47673e4](https://github.com/Alwatr/nanolib/commit/47673e481a1fc4dfd4ba2576d5dd5590da93adac)) by @
* **tsconfig:** change verbatimModuleSyntax=true and moduleDetection=force ([75e40f9](https://github.com/Alwatr/nanolib/commit/75e40f97273e7cb474506a906fa8f8e164f5661c)) by @
* **ty-helper:** Update type definitions and add new interfaces for JSON serialization ([7df0b07](https://github.com/Alwatr/nanolib/commit/7df0b07aea8c2e5906bffb18ec334176fb0d76c9)) by @
* **type-helper:** add HasAddEventListener ([ba2b6fa](https://github.com/Alwatr/nanolib/commit/ba2b6fac1003c2028d8b75d8dfb9242e3f0cc730)) by @
* **type-helper:** Add Mutable and Immutable types ([bd57df7](https://github.com/Alwatr/nanolib/commit/bd57df79fdb184382bb07820698e378b47b73230)) by @
* **type-helper:** add StrictlyRequired type ([6d2831e](https://github.com/Alwatr/nanolib/commit/6d2831e18c984ee6e272cde4c7fe64712113d969)) by @
* **type-helper:** make types available globally! ([69bcb97](https://github.com/Alwatr/nanolib/commit/69bcb97b1a8d3cf53a3efff516ad151fca9a5234)) by @
* **type-helper:** new package for ts types ([4d81aaf](https://github.com/Alwatr/nanolib/commit/4d81aaf7953769ebd4af58e4c0590b5e537db056)) by @
* **type-helper:** Update type definitions for Dictionary and Json ([0e3d56f](https://github.com/Alwatr/nanolib/commit/0e3d56f78cc30cc3e7d8cbef447000d01ba092ec)) by @
* **type-helper:** update type-helper to declare global types ([f7b6f95](https://github.com/Alwatr/nanolib/commit/f7b6f95a525895aee36f37b83fc9a1aeeefaec00)) by @
* **type:** add number key to dictionary ([e6cae47](https://github.com/Alwatr/nanolib/commit/e6cae47d1cf5344961ea7776dc4ca1a10d41e2fd)) by @
* **unicode-digits:** add `unicode-digits` package ([2ee138e](https://github.com/Alwatr/nanolib/commit/2ee138e5532c44ad186a340d18fc2a22c619259c)) by @
* **unicode-digits:** use `packageTracer` ([425e3f9](https://github.com/Alwatr/nanolib/commit/425e3f920b5d82dad8a4db283201dfefd370e4de)) by @
* Update nano-build options and presets ([293598e](https://github.com/Alwatr/nanolib/commit/293598ed7ef85763f2ab72128cdad85a4d0310ae)) by @
* use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @
* **wait:** base package ([8f29498](https://github.com/Alwatr/nanolib/commit/8f294983f9250e1ec8fb60dce72347f9586c561b)) by @
* **wait:** polyfill and docs ([9725dc2](https://github.com/Alwatr/nanolib/commit/9725dc2cfa4d70fb5dac8a2816f986ad00c4f43f)) by @

### Bug Fixes

* __package_version__ global type ([de8a3f9](https://github.com/Alwatr/nanolib/commit/de8a3f93bdb5a786c42f56324072b4b9520ce3a1)) by @
* all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @
* **async-queue:** remove wait deps ([83b2e11](https://github.com/Alwatr/nanolib/commit/83b2e115a939b90049c4af8d1cd6c4ebee282bf8)) by @
* build process ([83fc4e6](https://github.com/Alwatr/nanolib/commit/83fc4e609f86c25291e5f89016d6777bf197ffcb)) by @
* **dedupe:** add a missing `import` & use `__package_name__` ([1ebbe92](https://github.com/Alwatr/nanolib/commit/1ebbe926549ce11111a791f8d72c9d296597c803)) by @
* **dedupe:** duplicate_dedupe not work issue ([bdf6f52](https://github.com/Alwatr/nanolib/commit/bdf6f52bbb3730e6d791f5f1cba9a4ebe2510e34)) by @
* **dedupe:** update `demo` based on new API ([650f159](https://github.com/Alwatr/nanolib/commit/650f1591c754231ca7d0c36a9cf98384af30aa44)) by @
* **deep-clone:** deps ([2bce58c](https://github.com/Alwatr/nanolib/commit/2bce58c0742e3547a4bbc6c9efb792d5dca9375b)) by @
* deps ([34cd4fe](https://github.com/Alwatr/nanolib/commit/34cd4fead81b309765144a24add67e3f63bca127)) by @
* **env:** package.json path ([fff643d](https://github.com/Alwatr/nanolib/commit/fff643d949340e84509502e62b2587d03a47e034)) by @
* **exit-hook:** define package using @alwatr/dedupe to prevent duplicates ([e16638c](https://github.com/Alwatr/nanolib/commit/e16638cb69639f1c7c1316d72db8032fef617d00)) by @
* **exit-hook:** disable beforeExit event and get exit signal from process.exitCode ([2dbed18](https://github.com/Alwatr/nanolib/commit/2dbed18455ab252f686c7af58b9c5bf39f818f0d)) by @
* **exit-hook:** exit after listener called ([70c9f62](https://github.com/Alwatr/nanolib/commit/70c9f624899f87bb417f189792144aa05fca99ba)) by @
* **exit-hook:** Refactor exitHook function to prevent automatically register process exit events ([32d7e29](https://github.com/Alwatr/nanolib/commit/32d7e29dcd89dd4b7dc1a57da391ba8e70f5021d)) by @
* **exit-hook:** show error properly and safe exit on SIGTERM ([b0a27b8](https://github.com/Alwatr/nanolib/commit/b0a27b8c89945069c98637269f976b5e9f3618c0)) by @
* **exit-hook:** typo function name ([e8df52a](https://github.com/Alwatr/nanolib/commit/e8df52a8f527e653025abe6a8bc54719498db83e)) by @
* exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @
* **fetch:** better error handling on handleRetryPattern_ when user is offline ([b867f30](https://github.com/Alwatr/nanolib/commit/b867f30b3eba529ec1aae0026f0ded252ce54332)) by @
* **fetch:** remove unused import from fetch core module ([28ec726](https://github.com/Alwatr/nanolib/commit/28ec7269322f90dba02fbb33e4e622db42169368)) by @
* **get-env:** getEnvValue logic ([8f1afd7](https://github.com/Alwatr/nanolib/commit/8f1afd77ea623d3588f0b409ee03c0d633055233)) by @
* **global-scope:** prevent duplicate global scope module throw, just log error ([e67ffec](https://github.com/Alwatr/nanolib/commit/e67ffec77cbf5ae9de75d532be0062444486790b)) by @
* **is-number:** Remove Number.isFinite polyfill ([aa149f3](https://github.com/Alwatr/nanolib/commit/aa149f302f96d961b058fc3a9d70399c1023cbe3)) by @
* lerna schema ([02a6113](https://github.com/Alwatr/nanolib/commit/02a6113f1deb29fe2c9f4dbfe32fb3ab9b270271)) by @
* **local-storage:** Remove unused dependency and update tsconfig references ([b1caaea](https://github.com/Alwatr/nanolib/commit/b1caaea8565cd497d31d91e4e2ea1becd84a82a4)) by @
* **logger:** defaultDebugMode ([bab9f7c](https://github.com/Alwatr/nanolib/commit/bab9f7c7b26fc2f50476ebc74d484a4b39c9dbda)) by @
* **logger:** definePackage ([e2e5c6c](https://github.com/Alwatr/nanolib/commit/e2e5c6c8175d6f7bfba1d103c1cac2f647aa6116)) by @
* **logger:** Update default debug mode logic for prevent side-effects ([42101d6](https://github.com/Alwatr/nanolib/commit/42101d6471bd0d4e88e47dc8321dddc1cd63cec8)) by @
* **nano-build:** Add check for package.json existence ([2a95315](https://github.com/Alwatr/nanolib/commit/2a95315b069644737d170195d8dc6f415407fa15)) by @
* **nano-build:** entry point of `microservice` preset ([e5e4826](https://github.com/Alwatr/nanolib/commit/e5e482638361b57c619c671fe664f6b0a3325c66)) by @
* **nano-build:** error messages ([e95b497](https://github.com/Alwatr/nanolib/commit/e95b4970e6faeb3f600cefb7246233d45b102c37)) by @
* **nano-build:** mangle with 2 underline in module ([bb7b18d](https://github.com/Alwatr/nanolib/commit/bb7b18d81adfe2334aed1cbaedeea519485ce63e)) by @
* **nano-build:** remove `mangleProps` temporary ([65d95cc](https://github.com/Alwatr/nanolib/commit/65d95cc1cd3b314f506cb3dfb1a273319175616c)) by @
* **nano-build:** root fn name ([adf7b8f](https://github.com/Alwatr/nanolib/commit/adf7b8f4c2b71b528279d26fe5609cfde7095197)) by @
* **nano-build:** target versions in presets ([b73cb26](https://github.com/Alwatr/nanolib/commit/b73cb26d88835694fe6eb8ff8959909460a00259)) by @
* **nanolib:** export `unicode-digits` & update its deps ([28a6a65](https://github.com/Alwatr/nanolib/commit/28a6a65b2cf213ebb2db53722e28421e9a8bf752)) by @
* **nanolib:** set `preset` option of `nano-build` to `module3` ([2d49433](https://github.com/Alwatr/nanolib/commit/2d494338c98ae9ef152ac1823c4288d6cc486cf7)) by @
* **nanolib:** update `exports` key for new files ([0e9f4aa](https://github.com/Alwatr/nanolib/commit/0e9f4aa896c730afda713ea1e65e2c4ff70c4054)) by @
* **nanolib:** Update package.json to use "@alwatr/env" instead of "@alwatr/get-env" ([fd03dc0](https://github.com/Alwatr/nanolib/commit/fd03dc0d168a97758ddede62e7eb5c41c7cc2567)) by @
* **node-fs:** Update import statement for make-file module ([7bddaa0](https://github.com/Alwatr/nanolib/commit/7bddaa0d629c304fedd07c4022d7503aa9b974b6)) by @
* **package-tracer:** strict types ([3c9c6c3](https://github.com/Alwatr/nanolib/commit/3c9c6c32255ee7bb0131069b3ac2f043e173c640)) by @
* package.json include files ([ec8c807](https://github.com/Alwatr/nanolib/commit/ec8c8075ea88d669a84037077b01f92f6ea078f1)) by @
* package.json include files ([97b35d1](https://github.com/Alwatr/nanolib/commit/97b35d11bf4125f482f595db81f284804d2870ed)) by @
* package.json include files ([129a9a5](https://github.com/Alwatr/nanolib/commit/129a9a5df31f1199769432d7e689d213f2dcaa43)) by @
* package.json include files ([053fc10](https://github.com/Alwatr/nanolib/commit/053fc10b518038647136db9ada2433e27ecb2e63)) by @
* **parse-duration:** remove unused variables ([500f272](https://github.com/Alwatr/nanolib/commit/500f2727373daf12b6b8b84032244a88f197948e)) by @
* **platform-info:** Update platformInfo logic and remove redundant code for prevent side-effects ([db46c48](https://github.com/Alwatr/nanolib/commit/db46c4844db360735271f0d4c0d6417207589aaf)) by @
* **polyfill-has-own:** use `prototype` to check exactly ([15dfb6e](https://github.com/Alwatr/nanolib/commit/15dfb6e4e5eaa40a7bebeab3b64f6670b2c77949)) by @
* refactor nano-build.cjs to include microservice preset and update all presets configs ([3f662b8](https://github.com/Alwatr/nanolib/commit/3f662b83be33d7b75469734be4490bc00f935112)) by @
* **resolve-url:** version & update `README` ([ea2513a](https://github.com/Alwatr/nanolib/commit/ea2513a374a7841cc8d7f9a4cafcba6efced0299)) by @
* tsBuildInfoFile path in tsconfig.json files ([9c4ba01](https://github.com/Alwatr/nanolib/commit/9c4ba01afdd6657de4e5feef09bb6ee03d9ce053)) by @
* **type-helper:** convert `interface` to `type` ([c9e6970](https://github.com/Alwatr/nanolib/commit/c9e69700b038fb32fc43fb9a8e7a1140aff98d0c)) by @
* update to latest nano-build with preset ([a4d3c35](https://github.com/Alwatr/nanolib/commit/a4d3c35f9d86521312bd16dd9853519f4ed2e0b4)) by @
* use new `global-this` package & remove global type ([63f5a3b](https://github.com/Alwatr/nanolib/commit/63f5a3b07f6d73d0c213cd893a382d5bfe1c4c34)) by @
* use new `global-this` package & remove global type & prevent sidee-ffects ([092d448](https://github.com/Alwatr/nanolib/commit/092d44885738ed58215698917ae97c13958f7c7d)) by @
* **wait:** polyfill ([6a0f5fb](https://github.com/Alwatr/nanolib/commit/6a0f5fb5f0ae369d832760c026c26428689d258d)) by @
* **wait:** polyfill check ([cd9befa](https://github.com/Alwatr/nanolib/commit/cd9befa0ae01090016eb16befc08d1ce17ba881d)) by @
* **wait:** requestIdleCallback polyfill ([d41180d](https://github.com/Alwatr/nanolib/commit/d41180dc2f0c313eb86f05f60050e57e891897c3)) by @

### Code Refactoring

* build es by nano-build ([0364e51](https://github.com/Alwatr/nanolib/commit/0364e51d6a594dd104397e6c2147ef3fa3d0066f)) by @
* **dedupe:** prevent throw error on duplicate package and just log it ([9d2b657](https://github.com/Alwatr/nanolib/commit/9d2b6570616c63604b138f2df2e2166afe16c482)) by @
* **delay:** prevent side-effects ([f92eeed](https://github.com/Alwatr/nanolib/commit/f92eeed7d917f6eb3ca9a407fab0b1ea77adc1d4)) by @
* **delay:** update delay package to use @alwatr/parse-duration for duration delays ([cca1be2](https://github.com/Alwatr/nanolib/commit/cca1be2dcfeec6dce388562ef867b81af1823b62)) by @
* **delay:** update untilIdle function to accept Duration instead of DurationString ([b3a5c32](https://github.com/Alwatr/nanolib/commit/b3a5c322a1b59833693149da644c7d2eddd6a374)) by @
* disable unused labels linting rule ([043cca0](https://github.com/Alwatr/nanolib/commit/043cca023790260417a7717d9fdf28e8b6a691e7)) by @
* enable allowUnusedLabels in tsconfig.json ([a25e708](https://github.com/Alwatr/nanolib/commit/a25e70892f7499a5f008b92fd8fd1abcadbdeb56)) by @
* **env:** rename package and function ([6d72576](https://github.com/Alwatr/nanolib/commit/6d72576576964ba4bf3bdc5767e14d9293f941c9)) by @
* **exit-hook:** dosen't use `dedupe` anymore ([e6c3ce9](https://github.com/Alwatr/nanolib/commit/e6c3ce91be0a42d5d1f857eca824a200eacc911c)) by @
* **exit-hook:** use new dedupe api ([185aced](https://github.com/Alwatr/nanolib/commit/185aced6566ba986062fbc0d936fb8090430f681)) by @
* **fetch:** handle fetchJson error responses properly ([ae8fe24](https://github.com/Alwatr/nanolib/commit/ae8fe244aca17f235c4347ff1fd10070a410340c)) by @
* **fetch:** review and update everything ([61ec38b](https://github.com/Alwatr/nanolib/commit/61ec38b2fde28ba26a7973fcd60a30c861faf4dd)) by @
* **fetch:** separate core files ([c7e6b09](https://github.com/Alwatr/nanolib/commit/c7e6b096d747f868a2a1bfde1ffd3fd2a64dc7f3)) by @
* **fetch:** update fetch package to use @alwatr/parse-duration for timeout and retryDelay durations ([1108c54](https://github.com/Alwatr/nanolib/commit/1108c547e43f2c65f46d65b58dd19cee9abd2fd7)) by @
* **fetch:** update HTTP headers content-type to use MimeTypes constant ([c3862fc](https://github.com/Alwatr/nanolib/commit/c3862fc6a643da97dacbd15bcf5d3351caaaf269)) by @
* **fetch:** Update logger import and initialization ([1f0451c](https://github.com/Alwatr/nanolib/commit/1f0451c9fec81b875736135778cdd4150556ba97)) by @
* **fetch:** update query parameters handling ([939b3d5](https://github.com/Alwatr/nanolib/commit/939b3d52998ec7b3f5c32ff5438b649148109ede)) by @
* **fetch:** use new DictionaryReq type ([a8149cf](https://github.com/Alwatr/nanolib/commit/a8149cff114da7c7ce9a335c837ae794904fa3ca)) by @
* **flat-string:** Refactor flatString function signature ([cde9e08](https://github.com/Alwatr/nanolib/commit/cde9e08c5faf58ac188de5a8939dc53b36be7df0)) by @
* **get-env-value:** rewrite the function ([544e23d](https://github.com/Alwatr/nanolib/commit/544e23d2a4b930438901f3c17716a079235dd8d6)) by @
* **get-env-value:** separate types & refactor the function ([035a5eb](https://github.com/Alwatr/nanolib/commit/035a5eb1dc2515b73264da6d762505feb5cbc5c7)) by @
* **global-scope:** Improve shared scope definition ([4704a02](https://github.com/Alwatr/nanolib/commit/4704a02497848a18ace8ae27830834d6322d6624)), closes [#123](https://github.com/Alwatr/nanolib/issues/123) by @
* **global-scope:** Remove global-scope module and replace with global-this ([b194b27](https://github.com/Alwatr/nanolib/commit/b194b2772628fec30cd41d677232e7393fcded61)) by @
* **http-primer:** update HTTP methods and status codes ([820b4a4](https://github.com/Alwatr/nanolib/commit/820b4a4244b6cd50c631dc08c84fe9e0f05b5b2e)) by @
* **http-utils:** rename package to http-primer and update description ([3c30e17](https://github.com/Alwatr/nanolib/commit/3c30e1768e506dcbb2c83693c7f9dd3dd157d8af)) by @
* **http-utils:** separate files ([10fabcc](https://github.com/Alwatr/nanolib/commit/10fabccf114692c4f06915fd4a2c9ecd476b2499)) by @
* **local-storage:** update removeItem method to use localStorage instead of window.localStorage ([9680a14](https://github.com/Alwatr/nanolib/commit/9680a141a4366d4bb146a73ffcd1bb63dd14f27c)) by @
* **logger:** prevent side-effects ([e084894](https://github.com/Alwatr/nanolib/commit/e084894cdc4b46d52d99be872f5f789fe83c3cc0)) by @
* **logger:** remove definePackage from logger ([c8a9d0c](https://github.com/Alwatr/nanolib/commit/c8a9d0cdcc3e45e7a33731ec6ee6a496451e9eb1)) by @
* **logger:** rename logModule to logFileModule ([1f6bd71](https://github.com/Alwatr/nanolib/commit/1f6bd71272007f5bbc90258ffa13b7d851e0918c)) by @
* **nano-build:** Update all presets options ([91bdf90](https://github.com/Alwatr/nanolib/commit/91bdf9033aad8e0c71a5aab882e8b6c2af0a99ac)) by @
* **nanolib:** export `global-this` & update `exports` key in `package.json` ([42c8081](https://github.com/Alwatr/nanolib/commit/42c8081784cc41b28a151de7ae2e0a65b9391498)) by @
* **node-fs:** readJson function ([e9cf12d](https://github.com/Alwatr/nanolib/commit/e9cf12d36924d683f6c4922934c5cb480688de03)) by @
* **node-fs:** remove unused import from common module ([496a338](https://github.com/Alwatr/nanolib/commit/496a338a6366aa12dc32bbed07a3e14bd5315bd2)) by @
* **node-fs:** rewrite makeEmptyFile ([a39590b](https://github.com/Alwatr/nanolib/commit/a39590b41f1936ec7a4abad92b7c0fdc95a99e8d)) by @
* **node-fs:** separate files ([a2b15a4](https://github.com/Alwatr/nanolib/commit/a2b15a4e8077759bc647ca5356aebc48a49e8fd4)) by @
* **node-fs:** separate read file functions ([de2cf5d](https://github.com/Alwatr/nanolib/commit/de2cf5d7110646230019c53a458092617be71922)) by @
* **node-fs:** separate readJson ([5616b53](https://github.com/Alwatr/nanolib/commit/5616b5303a9a4d5e35c8e75c09c59a8fbd145030)) by @
* **node-fs:** Update logger import and initialization ([0f89c0f](https://github.com/Alwatr/nanolib/commit/0f89c0f7bc24e79c20d3d5d3fc3f906f12cf7161)) by @
* **package-tracer:** add some new `function`s & improve the code style ([207af08](https://github.com/Alwatr/nanolib/commit/207af08d5632ed5b435428904cd5cafcf8b12cb2)) by @
* **package-tracer:** Improve package tracking functionality ([5be7132](https://github.com/Alwatr/nanolib/commit/5be7132d2275e028cc88155d32960e05da22726f)) by @
* **platform-info:** enhance type to prevent modification ([e62c0eb](https://github.com/Alwatr/nanolib/commit/e62c0eb14f6102efde4206f7ba72ecc5dc146ce2)) by @
* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* **type-helper:** update Dictionary type definitions ([fa4c56d](https://github.com/Alwatr/nanolib/commit/fa4c56d8c55f54dd11918fadf4b5eb342bc47742)) by @
* update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @
* use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @
* use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @
* **wait:** new API ([4299a26](https://github.com/Alwatr/nanolib/commit/4299a26a67cb491e3551611401f83772cbd4eb4c)) by @
* **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @
* **wait:** Rename wait utility to delay and update method names ([dc7674b](https://github.com/Alwatr/nanolib/commit/dc7674b1df7ee4bcdb60ae78fbe2113f2da86a37)) by @
* **wait:** use @alwatr/parse-duration for duration delays ([d7a1a62](https://github.com/Alwatr/nanolib/commit/d7a1a62ea47430883c54417793b221f0e28723ba)) by @

### Miscellaneous Chores

* @yarnpkg/sdks vscode ([1aa01ae](https://github.com/Alwatr/nanolib/commit/1aa01ae3c424e7bcd680219117a667c50849f28e)) by @
* Add .tmp to .gitignore ([f0ef479](https://github.com/Alwatr/nanolib/commit/f0ef479a553bece0710b0eff97d583e14500e154)) by @
* Add "Deno" to cSpell.words ([a1fe28f](https://github.com/Alwatr/nanolib/commit/a1fe28f59fef1d4b5bc0d045ab88070aef31f787)) by @
* Add "pmpa" to .vscode/settings.json ([13b3d91](https://github.com/Alwatr/nanolib/commit/13b3d91739ca1acd25e4264f72adc69e0959a538)) by @
* Add "tsbuildinfo" and "typeof" to .vscode/settings.json ([524e8e0](https://github.com/Alwatr/nanolib/commit/524e8e0386bf096c45bc82e029bf8da69304b309)) by @
* Add configuration files for project ([4be5b28](https://github.com/Alwatr/nanolib/commit/4be5b286bce82b0639875f21bd73514f1a9ede00)) by @
* Add dependencies and update resolutions in yarn.lock ([d82460d](https://github.com/Alwatr/nanolib/commit/d82460dc3aa1e899dec7fe1262a704944db12a15)) by @
* Add Jest test runner to build-lint workflow ([aa1d81d](https://github.com/Alwatr/nanolib/commit/aa1d81dcf9321ed99881b4a931d03c6470500984)) by @
* Add lerna.json configuration file ([719f74d](https://github.com/Alwatr/nanolib/commit/719f74d9bbab1257b01f8fce3f46ce964e35bc55)) by @
* Add new SDKs for eslint, integrations, prettier, and typescript ([32b8b7d](https://github.com/Alwatr/nanolib/commit/32b8b7de815eee90cd3a274d29903077eecac628)) by @
* Add package.json with necessary dependencies and scripts ([c528342](https://github.com/Alwatr/nanolib/commit/c5283429c5042bf0daefa0fdc15f58ba0be48da8)) by @
* Add test script to package.json ([5fb44ce](https://github.com/Alwatr/nanolib/commit/5fb44ce6e37fe781ad54c16a9d94b5b1f93db170)) by @
* Add tsconfig.json for nano-build package ([8b47c2d](https://github.com/Alwatr/nanolib/commit/8b47c2d940a55ac0e13e54209f18d5274877bcfe)) by @
* Add tsconfig.json with base configuration ([323df00](https://github.com/Alwatr/nanolib/commit/323df001aa4c1e674a994c1f3c0a724b32e4bea1)) by @
* Add VS Code extensions and settings ([7003f05](https://github.com/Alwatr/nanolib/commit/7003f0587a50c3c265c8bf88d128a5c597ba53dd)) by @
* Add watch script to package.json ([c1458e3](https://github.com/Alwatr/nanolib/commit/c1458e305ce3858a484b6a62a3d2d70035dea282)) by @
* **async-queue:** change the license to AGPL-3.0 ([e253149](https://github.com/Alwatr/nanolib/commit/e253149c3d1d51522406aa44db02a038aaf0d920)) by @
* change the license ([7b2fe9f](https://github.com/Alwatr/nanolib/commit/7b2fe9fc5293e5377b8509d5f037509d5606f676)) by @
* config .github ([1a3cd7c](https://github.com/Alwatr/nanolib/commit/1a3cd7c430f6175a1d1d2ad5735830ac6723aaaf)) by @
* dedupe deps ([a772278](https://github.com/Alwatr/nanolib/commit/a772278ad7555344e1b37f4f42107ab556f5fa13)) by @
* **dedupe:** change the license to AGPL-3.0 ([f48165c](https://github.com/Alwatr/nanolib/commit/f48165c4cc9aa0bfc5cf433500fd3de3d45fc8ab)) by @
* **dedupe:** fix version ([9754409](https://github.com/Alwatr/nanolib/commit/9754409d978265ba2ce08a9f86af1d1e143940e4)) by @
* **dedupe:** fix version ([9c5494a](https://github.com/Alwatr/nanolib/commit/9c5494a7297351ec36e7f1f293cc4c1a6f71cf8a)) by @
* **deep-clone:** change the license to AGPL-3.0 ([062b9c5](https://github.com/Alwatr/nanolib/commit/062b9c5f0e6fc78fa39101d538f3ba8720ab073a)) by @
* **deps-dev:** bump the development-dependencies group with 3 updates ([0e0ec0f](https://github.com/Alwatr/nanolib/commit/0e0ec0f7c66c849727563cabe0e88606aee49035)) by @
* **deps-dev:** bump the development-dependencies group with 3 updates ([e0cf373](https://github.com/Alwatr/nanolib/commit/e0cf373dbaef46318a3878f5e542e3e53ef65b22)) by @
* **deps:** bump the github-actions group with 1 update ([a13754d](https://github.com/Alwatr/nanolib/commit/a13754dd249fe77916058ec328fdded8c7554a9f)) by @
* **deps:** bump the github-actions group with 2 updates ([fbd66a5](https://github.com/Alwatr/nanolib/commit/fbd66a52f8581403900341f65e9ba3f71ff8d24a)) by @
* **deps:** bump the production-dependencies group with 1 update ([8abc6ab](https://github.com/Alwatr/nanolib/commit/8abc6ab70ae4693bd27b82d39326e11137fcffb5)) by @
* **deps:** upd ([b6dd6dd](https://github.com/Alwatr/nanolib/commit/b6dd6dd8173d9788c179d57091402e693fa2024a)) by @
* **deps:** upd ([5744a0c](https://github.com/Alwatr/nanolib/commit/5744a0cacea174558c4dca05c32987a462a391f0)) by @
* **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @
* **deps:** update ([37839cd](https://github.com/Alwatr/nanolib/commit/37839cd2d0e164865e6e1a439ae42ba4a1df8155)) by @
* **deps:** update ([3e61c1a](https://github.com/Alwatr/nanolib/commit/3e61c1a195226fe144ace36047218702c313456e)) by @
* **deps:** update ([8e70dff](https://github.com/Alwatr/nanolib/commit/8e70dffb1e751496ef2e72d6cffd685f1fea44e3)) by @
* **deps:** update ([f0b60d2](https://github.com/Alwatr/nanolib/commit/f0b60d24c9fae6190940baf95167a1175360d4b3)) by @
* **deps:** update ([f892e22](https://github.com/Alwatr/nanolib/commit/f892e220a87e3147eb9d0fda8d52c76c279a5c2e)) by @
* **deps:** update ([e36e3fb](https://github.com/Alwatr/nanolib/commit/e36e3fb409851ba01b1afdaa4a1100683707023d)) by @
* **deps:** update ([d592830](https://github.com/Alwatr/nanolib/commit/d592830e6e51293c8fb225f27e175285908b2e93)) by @
* Enable checkJs for implicit project configuration ([8bbbbb6](https://github.com/Alwatr/nanolib/commit/8bbbbb646825d69a5c1dc25adf6c37086096c08e)) by @
* **eslint-config:** add `eslint-plugin-require-extensions` to peerDependencies ([77d0468](https://github.com/Alwatr/nanolib/commit/77d0468ff7ba41b1c278271bcf5fb200c6026f51)) by @
* **eslint-config:** change the license to AGPL-3.0 ([6ff5fbd](https://github.com/Alwatr/nanolib/commit/6ff5fbd96f7adfcde0e8f5fd9f78a3052f58ad20)) by @
* **eslint-config:** Update peer dependencies in package.json ([690a7db](https://github.com/Alwatr/nanolib/commit/690a7db48eadd6e110c2e9760a882e4bc5f12fa0)) by @
* **exit-hook:** change the license to AGPL-3.0 ([74e89a1](https://github.com/Alwatr/nanolib/commit/74e89a18044831c225649494734d284bb95d4629)) by @
* **fetch:** change the license to AGPL-3.0 ([edf9069](https://github.com/Alwatr/nanolib/commit/edf9069608bd276b85c9ac937e33ad225c5921a9)) by @
* fix all typescript reference ([dea4c44](https://github.com/Alwatr/nanolib/commit/dea4c4414167602ea2f13888c6ecee24eb65ed93)) by @
* fix build issue ([80aab20](https://github.com/Alwatr/nanolib/commit/80aab201ceec049f04710a250df96060bb45a371)) by @
* Fix spelling errors and add "tsbuildinfo" to cSpell.words ([5a9e400](https://github.com/Alwatr/nanolib/commit/5a9e400917b067e35f38d877717c84ea69ae9eae)) by @
* fix versions ([497a6d8](https://github.com/Alwatr/nanolib/commit/497a6d81ae5989e566e96d498fc5f1b6c80193ae)) by @
* **flat-string:** Add devDependencies for @alwatr/tsconfig-base ([0b06345](https://github.com/Alwatr/nanolib/commit/0b06345b513f51080af3f0af0688990b42270d1a)) by @
* **flat-string:** Add scripts to package.json ([b537d8b](https://github.com/Alwatr/nanolib/commit/b537d8b4db43819667c050119050c6c182ba235a)) by @
* **flat-string:** change the license to AGPL-3.0 ([1f06ca4](https://github.com/Alwatr/nanolib/commit/1f06ca4edc93381ccbe4c8e04ef2f23a4218a2b6)) by @
* **flat-string:** embed tsconfig.json to package.json ([617835e](https://github.com/Alwatr/nanolib/commit/617835ed3e2c68ea85cb8938d90974b7212c44a0)) by @
* **flat-string:** Update package.json and yarn.lock ([c71eeb1](https://github.com/Alwatr/nanolib/commit/c71eeb16c539164438ac6b223102f9f779a4c9c8)) by @
* **flatomise:** change the license to AGPL-3.0 ([bc9d81b](https://github.com/Alwatr/nanolib/commit/bc9d81b7a3f62113559be6dbd002cf4f2e301583)) by @
* **gitignore:** Remove unnecessary files ([e16223a](https://github.com/Alwatr/nanolib/commit/e16223a20e4e2f822795854963ab8cf180bfea26)) by @
* **global-scop:** change the license to AGPL-3.0 ([ad7c262](https://github.com/Alwatr/nanolib/commit/ad7c2629743115af18b9298c6a9ccb5172c27333)) by @
* **has-own-polyfill:** bump version ([36a6529](https://github.com/Alwatr/nanolib/commit/36a65297215b425593c19ce38ed3fbd907c8fc84)) by @
* **http-primer:** add status codes and headers types to keywords ([e1788c2](https://github.com/Alwatr/nanolib/commit/e1788c25242d3d127ffea1105abd09f7f221ee82)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* init ([762a71f](https://github.com/Alwatr/nanolib/commit/762a71ff6a9ecb261d7c3dd02432bf793e4056c5)) by @
* **is-number:** Add additional keywords to is-number package.json ([048b734](https://github.com/Alwatr/nanolib/commit/048b734bffc65d61876f692f69dab55a829ea0c8)) by @
* **is-number:** Add additional keywords to is-number package.json ([7ba726c](https://github.com/Alwatr/nanolib/commit/7ba726cb53a784ccc1dd37dab92b27ff833b3881)) by @
* **is-number:** change the license to AGPL-3.0 ([3ad68cb](https://github.com/Alwatr/nanolib/commit/3ad68cb43659fe2af8358ff1393e0085e85b8857)) by @
* **is-number:** Update version to 1.0.0-alpha.0 in package.json ([d20bcad](https://github.com/Alwatr/nanolib/commit/d20bcad4fe9f997d7e8153a99955576d9fa59ee9)) by @
* **lerna:** skipBumpOnlyReleases ([f75fccd](https://github.com/Alwatr/nanolib/commit/f75fccd7a3f0ae776b039c547a6f33ecbd7d4513)) by @
* **local-storage:** change the license to AGPL-3.0 ([ef7ea07](https://github.com/Alwatr/nanolib/commit/ef7ea075094c88d90d2ddc6fb9612ae18d792225)) by @
* **logger:** add reference ([2f30ef1](https://github.com/Alwatr/nanolib/commit/2f30ef15240a3629c7697409c322c7fdfc91a5f8)) by @
* **logger:** change the license to AGPL-3.0 ([4bb4673](https://github.com/Alwatr/nanolib/commit/4bb4673972069a307e799cad9a5078b0288a9340)) by @
* **logger:** Fix import file extensions ([faeef41](https://github.com/Alwatr/nanolib/commit/faeef41b0115fc5b9b22ba297e936bad68a71343)) by @
* **logger:** Fix import file extensions ([f620739](https://github.com/Alwatr/nanolib/commit/f6207396504fe3a2a708ad0feaf988d14f99d130)) by @
* **logger:** rename main file ([618d008](https://github.com/Alwatr/nanolib/commit/618d008c23561105ba45acb31dedcf2daafe4202)) by @
* **logger:** update dedupe version ([9704dc9](https://github.com/Alwatr/nanolib/commit/9704dc92a4614aaa9ba25d88bcc1beee2bc826f4)) by @
* **nano-build:** change the license to AGPL-3.0 ([57e1d8f](https://github.com/Alwatr/nanolib/commit/57e1d8f2d49ef68e1a098c44facda2a2d4330bf5)) by @
* **node-fs:** beta version ([1b43445](https://github.com/Alwatr/nanolib/commit/1b4344573ad878fefde904958c8366ff5d6166c3)) by @
* **node-fs:** change the license to AGPL-3.0 ([9728276](https://github.com/Alwatr/nanolib/commit/97282764bfdb15ef1de25704012f1628a5d0c112)) by @
* **node-fs:** enhance demo test ([b7370d6](https://github.com/Alwatr/nanolib/commit/b7370d6805133df163c281be22b3289bdf3dfb90)) by @
* **node-fs:** review and test ([69da5b7](https://github.com/Alwatr/nanolib/commit/69da5b7f81cfeee1678d92e97ac3e73009c5fe1f)) by @
* **package-tracer:** change the license to AGPL-3.0 ([ff6e45e](https://github.com/Alwatr/nanolib/commit/ff6e45e2fcbfb69446ce002642f4819ff42fa6b9)) by @
* **parse-duration:** add tsconfig.json ([e799038](https://github.com/Alwatr/nanolib/commit/e7990381f8820a3f6a449b908c0fc5da4e475abd)) by @
* **parse-duration:** change the license to AGPL-3.0 ([896df6f](https://github.com/Alwatr/nanolib/commit/896df6f64bb1df5954d6c46694e18bfb3e944f22)) by @
* **parse-duration:** deps ([1898f2e](https://github.com/Alwatr/nanolib/commit/1898f2ee41bb5561949d758a62754fd5086eb0c7)) by @
* **parse-duration:** package.json ([97f970d](https://github.com/Alwatr/nanolib/commit/97f970dfeb4a84ad66050cc5dd2611a013853c15)) by @
* **parse-duration:** rename main file ([be0d2fc](https://github.com/Alwatr/nanolib/commit/be0d2fc3d37f298936c9a85f7e095d670c805970)) by @
* **platform-info:** change the license to AGPL-3.0 ([0ca6ad1](https://github.com/Alwatr/nanolib/commit/0ca6ad19a486e9bcfd3ddcaa5741fd5b2e0e4005)) by @
* **playground:** Comment out unused code in main.ts ([0819248](https://github.com/Alwatr/nanolib/commit/08192484d64fdb1f4ea3035e15555dd9c36a3e1a)) by @
* **playground:** Update package.json to set "private" to true ([01bea21](https://github.com/Alwatr/nanolib/commit/01bea21a5b1d47b88455915b260b8155904140f2)) by @
* **polyfill-has-own:** change the license to AGPL-3.0 ([afcdf76](https://github.com/Alwatr/nanolib/commit/afcdf76841e70ce515e18581f6ab7d64d8720521)) by @
* **prettier-config:** change the license to AGPL-3.0 ([02a071e](https://github.com/Alwatr/nanolib/commit/02a071ed3072b447b8512eed2a8d1e33381873cc)) by @
* Remove `include: scope` from commit-message configuration ([8786590](https://github.com/Alwatr/nanolib/commit/8786590c70de510a434d56ae21e1b70422b10f09)) by @
* Remove change log file ([1955c9c](https://github.com/Alwatr/nanolib/commit/1955c9c20fc72df6c07e8e37a4bad48f1bd9125f)) by @
* Remove generateReleaseNotes from lerna.json ([35dbffb](https://github.com/Alwatr/nanolib/commit/35dbffbeb885893c92ce3ba6bd69a96fcb036a70)) by @
* Remove old CHANGELOG.md file ([bdca0ca](https://github.com/Alwatr/nanolib/commit/bdca0ca847005a9af5668e23dac1937b2bab4a7b)) by @
* rename logger env ([38443ad](https://github.com/Alwatr/nanolib/commit/38443ade4677e857b5ebd4be417f5f2eb1818c87)) by @
* set version to 0.0.0 in lerna.json ([69166a6](https://github.com/Alwatr/nanolib/commit/69166a631b277bca1826734cd1509d45392a77a8)) by @
* switch to alwatr prettier configuration ([4426288](https://github.com/Alwatr/nanolib/commit/44262886e613b103743917d6f704f4087943273a)) by @
* **tsconfig-base:** Add main entry to package.json ([b6c891a](https://github.com/Alwatr/nanolib/commit/b6c891aeaa312633ea5c05ce2d961bfa73068143)) by @
* **tsconfig-base:** change the license to AGPL-3.0 ([2236725](https://github.com/Alwatr/nanolib/commit/223672599c3cf1bf976a1c8beb0b0236cef2efca)) by @
* **type-helper:** change the license to AGPL-3.0 ([5f1264d](https://github.com/Alwatr/nanolib/commit/5f1264dfcc217289ed8b87a6ede6a62cfbe824f3)) by @
* **type-helper:** fix package version ([6b5374f](https://github.com/Alwatr/nanolib/commit/6b5374faed678c9d878b1ef9601d587495f6b9d1)) by @
* **type-helper:** make lint happy ([8e43a6a](https://github.com/Alwatr/nanolib/commit/8e43a6aaa708be23215e9d30538b025601605a40)) by @
* **type-helper:** Remove @alwatr/nano-build dependency ([fd2bce6](https://github.com/Alwatr/nanolib/commit/fd2bce64102d2b561f48f6eaf2866278b1794a85)) by @
* **type-helper:** remove version beta suffix ([2222a51](https://github.com/Alwatr/nanolib/commit/2222a51e06c29b5f7a20234bee69b41ffb923cfa)) by @
* update `import`s & test the result of `build` ([7ba474f](https://github.com/Alwatr/nanolib/commit/7ba474fec6d02d61a784eec3a106024f021d4753)) by @
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @
* Update clean script in package.json to verbose added files ([d6e853d](https://github.com/Alwatr/nanolib/commit/d6e853d99d54057be6aecde5095e64b76800c606)) by @
* update clean script to remove all .tsbuildinfo files ([91f1ff2](https://github.com/Alwatr/nanolib/commit/91f1ff20c964d5327879c267f530a131526544d8)) by @
* update cSpell.words ([11eacad](https://github.com/Alwatr/nanolib/commit/11eacad91c19132fb1af62cd3e3c4e7537ac6d5c)) by @
* Update debug command in package.json ([be8403d](https://github.com/Alwatr/nanolib/commit/be8403dec754f2117259bb915b110ea386596401)) by @
* Update dependabot configuration and commit message format ([0ae9786](https://github.com/Alwatr/nanolib/commit/0ae97867eacef0eb6068599749bdc81e64c9a326)) by @
* Update devDependencies in nano-build package.json ([c900c09](https://github.com/Alwatr/nanolib/commit/c900c0942c10a663c8bffdc2f9f6583c9a69dece)) by @
* update devDependencies in package.json ([4d366af](https://github.com/Alwatr/nanolib/commit/4d366af59509004786ba5787c7bc322afb353e02)) by @
* Update file patterns in package.json ([1f478e7](https://github.com/Alwatr/nanolib/commit/1f478e7c944da2ee79a843fa756c155ebb06f2c2)) by @
* Update lerna.json and package.json for conventional commits ([369887c](https://github.com/Alwatr/nanolib/commit/369887cfdcbf5c6f3899880a5e217b102b36706c)) by @
* Update lint:ts script in package.json adn remove root tsconfig ([3bf1491](https://github.com/Alwatr/nanolib/commit/3bf149194223c9a47470633f5a439f36a9b81634)) by @
* Update nano-build options and presets ([8b2bc3a](https://github.com/Alwatr/nanolib/commit/8b2bc3af60e136c952951d468b0c184e4e14a46b)) by @
* Update nano-build README.md ([f641961](https://github.com/Alwatr/nanolib/commit/f6419615da9b8e7755f231b37a10341531efa99c)) by @
* Update nano-build script to display mode information ([7a76f2a](https://github.com/Alwatr/nanolib/commit/7a76f2a9d88854ddcc79fb8c7f865555d2cbd5da)) by @
* update npm-run-path version to 5.2.0 ([7be1259](https://github.com/Alwatr/nanolib/commit/7be1259b5d1c5b0449b77b0302e1ca8032076af3)) by @
* update package keywords ([200afcf](https://github.com/Alwatr/nanolib/commit/200afcf53ae1db0e86a775c24ee1d83da771b1c0)) by @
* Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @
* Update package.json script 'rl' to include lint and test commands ([bec4381](https://github.com/Alwatr/nanolib/commit/bec438110f53b6f153bada97d6e447e7713e6ae7)) by @
* Update package.json scripts ([5eef25e](https://github.com/Alwatr/nanolib/commit/5eef25ef60739443cdabce7996aadb2e3bf0d59e)) by @
* Update package.json with additional command ([6ce8efb](https://github.com/Alwatr/nanolib/commit/6ce8efbe57fbfccffb3e420aea099c8b0ad25897)) by @
* Update test scripts and dependencies ([93d2fe6](https://github.com/Alwatr/nanolib/commit/93d2fe6d7ce9c38a300e0c7ed75874916767a14b)) by @
* Update typescript SDK version to 5.6.3-sdk ([6a7cf3b](https://github.com/Alwatr/nanolib/commit/6a7cf3b5b2d11c6592b1cb43b8f6c65392c16873)) by @
* version ([62983c0](https://github.com/Alwatr/nanolib/commit/62983c0009e8d77e9472bcbb8ccb49b0cff60947)) by @
* **vscode:** add "conventionalcommits" to cSpell.words ([64400ed](https://github.com/Alwatr/nanolib/commit/64400ede5ddfbb3938ab515e6ffac11833d03097)) by @
* **vscode:** Add file extensions to .vscode/settings.json ([3f69cbb](https://github.com/Alwatr/nanolib/commit/3f69cbb8825508cd7858e51dff2d59e5d8473392)) by @
* **wait:** change the license to AGPL-3.0 ([fad0b3e](https://github.com/Alwatr/nanolib/commit/fad0b3ef7afbee4ab9d9824759485e910a812019)) by @
* **wait:** Update polyfill.ts with type annotations and prettier-ignore ([572eabb](https://github.com/Alwatr/nanolib/commit/572eabb610b4e0b896bc0ecdca7300a18891ff60)) by @

### Dependencies update

* bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @
* bump braces from 3.0.2 to 3.0.3 ([5c142d9](https://github.com/Alwatr/nanolib/commit/5c142d9a47e8d98723570a6380ba83fd2fcea63b)) by @
* bump esbuild ([78d8552](https://github.com/Alwatr/nanolib/commit/78d8552e8882a0d6e200c5d340b313d5a7999b0e)) by @
* bump esbuild in the production-dependencies group ([d829afb](https://github.com/Alwatr/nanolib/commit/d829afbcefcb4053b7c3f6965d0a0e9e5ba33a11)) by @
* bump esbuild in the production-dependencies group ([1dffb4f](https://github.com/Alwatr/nanolib/commit/1dffb4f3f6f4a49cc75acc1dea777ee8c8b901ee)) by @
* bump eslint in the development-dependencies group ([abb3406](https://github.com/Alwatr/nanolib/commit/abb3406edd8058f21b05ffb8a8025e85b5b82755)) by @
* bump github/codeql-action in the github-actions group ([43d0fbf](https://github.com/Alwatr/nanolib/commit/43d0fbfa2da00021f1498e4bd37bb38c69fd7e31)) by @
* bump github/codeql-action in the github-actions group ([582015e](https://github.com/Alwatr/nanolib/commit/582015e419f9ad11971f7dd486fe638968ca563f)) by @
* bump github/codeql-action in the github-actions group ([a588d6c](https://github.com/Alwatr/nanolib/commit/a588d6c1e7c28ccca6018a29c001c76fe46faa07)) by @
* bump github/codeql-action in the github-actions group ([87d085e](https://github.com/Alwatr/nanolib/commit/87d085e70a4998572338c0f6e9506c72fcc1b494)) by @
* bump ip from 2.0.0 to 2.0.1 ([e2f63a1](https://github.com/Alwatr/nanolib/commit/e2f63a1cd49b78db42107a4633671224b16fc09e)) by @
* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* bump the development-dependencies group with 2 updates ([be5d6c2](https://github.com/Alwatr/nanolib/commit/be5d6c2d86b937f32cebc6848aaff85af07055dd)) by @
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @
* bump the github-actions group across 1 directory with 3 updates ([c9afae6](https://github.com/Alwatr/nanolib/commit/c9afae65468c87ed5ec45c5ce21294d660fd757c)) by @
* bump the github-actions group across 1 directory with 3 updates ([132d800](https://github.com/Alwatr/nanolib/commit/132d800cf8d069d7a1d241583cf4edc5a56b1b34)) by @
* bump the github-actions group across 1 directory with 3 updates ([e35084c](https://github.com/Alwatr/nanolib/commit/e35084c0335422bc1f85204e7e5fd5974a5e2c07)) by @
* bump the github-actions group across 1 directory with 3 updates ([d942eaf](https://github.com/Alwatr/nanolib/commit/d942eaf24500837a054957e61a3199a18aefb236)) by @
* bump the github-actions group with 2 updates ([f046eec](https://github.com/Alwatr/nanolib/commit/f046eeca0879c42dada386d673e767dff7e001c2)) by @
* bump the github-actions group with 2 updates ([53594aa](https://github.com/Alwatr/nanolib/commit/53594aa4a4caf46622c9d3a0a32320146889be77)) by @
* bump the github-actions group with 3 updates ([0cda4a4](https://github.com/Alwatr/nanolib/commit/0cda4a483434468e413b77a511b007666eb79779)) by @
* bump the github-actions group with 3 updates ([5dd0aa3](https://github.com/Alwatr/nanolib/commit/5dd0aa3275a3112a44ac87e3ae6da6426af58519)) by @
* bump the github-actions group with 4 updates ([e5246c5](https://github.com/Alwatr/nanolib/commit/e5246c50c30b1374c8b06c6fba507e8d76ea15b7)) by @
* bump the github-actions group with 5 updates ([5741c92](https://github.com/Alwatr/nanolib/commit/5741c92451540197f7fa1a6ea3a2e851b7d5e83c)) by @
* bump the production-dependencies group with 1 update ([85a0693](https://github.com/Alwatr/nanolib/commit/85a0693427df038985655de27bcbf4ad5388ee97)) by @
* **dedupe:** update ([ce988ec](https://github.com/Alwatr/nanolib/commit/ce988ec4cf0f4be8fa0fb026eae65c31acc7055e)) by @
* **deps:** bump the github-actions group with 1 update ([0211ade](https://github.com/Alwatr/nanolib/commit/0211ade8fa7464e19749f1fed716686746f5206b)) by @
* **package-tracer:** update ([2f4e68a](https://github.com/Alwatr/nanolib/commit/2f4e68a1bc6418d014c8c93740bf0157327d5c05)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @
* update ([d7d9a7d](https://github.com/Alwatr/nanolib/commit/d7d9a7d8ac523b187bfa6fff82c469c88b6e9e1d)) by @
* update ([cc7c4ee](https://github.com/Alwatr/nanolib/commit/cc7c4ee4743432f478c8a915bc931778af226165)) by @
* update ([968dd86](https://github.com/Alwatr/nanolib/commit/968dd86fba4aca992b86a0b462080dcc9e9e4fda)) by @
* update ([43ccc7c](https://github.com/Alwatr/nanolib/commit/43ccc7cd4e50e87fbb333b5a836bb8f4bedd462d)) by @
* update ([c958a81](https://github.com/Alwatr/nanolib/commit/c958a818ad10ba590f141f05aea1ac135d3e0fd5)) by @
* update ([98a3897](https://github.com/Alwatr/nanolib/commit/98a38971f05edbefc1486aa98eb4b238eea9a607)) by @
* update ([044d06c](https://github.com/Alwatr/nanolib/commit/044d06c1e8b86d1ec527f972009947b733162304)) by @
* update ([17fbc26](https://github.com/Alwatr/nanolib/commit/17fbc263e289ec6575fae75e76f098a495399702)) by @
* update ([ef384e7](https://github.com/Alwatr/nanolib/commit/ef384e71ca5465a52fa9531eebde7325464a54b0)) by @
* update ([76c9dee](https://github.com/Alwatr/nanolib/commit/76c9dee50e1e4a8881a7e96ad498c864a690f591)) by @
* update ([ecef487](https://github.com/Alwatr/nanolib/commit/ecef487494d8d7e8295ffd8b73f5ba763772d157)) by @
* update ([ec228ca](https://github.com/Alwatr/nanolib/commit/ec228ca8887a7210cd974b279318b61ec6b2c7f6)) by @
* update ([9391564](https://github.com/Alwatr/nanolib/commit/93915643bf4a000bf82aa53aa1787949be673278)) by @
* update ([ebf0548](https://github.com/Alwatr/nanolib/commit/ebf0548d82b3b52a9197b983bbb9911c36288810)) by @
* update ([78d559e](https://github.com/Alwatr/nanolib/commit/78d559eac1733044824850e6e6a05e65ced18f3c)) by @
* update ([3d53491](https://github.com/Alwatr/nanolib/commit/3d5349183093890ff866f2b2cfa03b0ab846dfb9)) by @
* update ([d796003](https://github.com/Alwatr/nanolib/commit/d796003dbdedad3b055b30bb9b20d0bf9643076b)) by @
* update ([3db237a](https://github.com/Alwatr/nanolib/commit/3db237ac718c2839159b1f7d2bf0054e08abf725)) by @
* update ([d46a030](https://github.com/Alwatr/nanolib/commit/d46a03076b46986846223072ff6aa13bacb9ab1b)) by @
* update ([406a23b](https://github.com/Alwatr/nanolib/commit/406a23b8f8250a0f74e904fe859b8516c4120eb1)) by @
* update ([d4be224](https://github.com/Alwatr/nanolib/commit/d4be224e365e9b79a6ede5db549f47377969827a)) by @
* update ([d42fc5d](https://github.com/Alwatr/nanolib/commit/d42fc5dab664fbe593e17fe211435e9caafc69bd)) by @
* update ([4af8506](https://github.com/Alwatr/nanolib/commit/4af8506a67c762488755dab45b55cc416be75430)) by @
* update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @
* update [@lerna-lite](https://github.com/lerna-lite) dependencies to latest versions ([15344d8](https://github.com/Alwatr/nanolib/commit/15344d8b2bd09322cbd851e5e6aeb78dc1169c60)) by @
* update all ([53342f6](https://github.com/Alwatr/nanolib/commit/53342f67a8a013127f073540bc11929f1813c05c)) by @
* update all ([a828818](https://github.com/Alwatr/nanolib/commit/a828818c1b37ad5f6dd3698a53fb14624f633f35)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @
* Update yarn.lock to include "@alwatr/dedupe" dependency ([d71d18f](https://github.com/Alwatr/nanolib/commit/d71d18f1be73c20c5b0ddd13ee9e69bed7083666)) by @
* upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @
