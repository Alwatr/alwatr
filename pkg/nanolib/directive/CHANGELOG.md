# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

### 🐛 Bug Fixes

* standardize formatting and improve descriptions across multiple packages ([24f22e4](https://github.com/Alwatr/alwatr/commit/24f22e451cf3a1edb891943ef179cc18192079bf))

### 🔨 Code Refactoring

* conditionally log method arguments and events in DEV_MODE to reduce production build size ([b3842e0](https://github.com/Alwatr/alwatr/commit/b3842e09d56973b3a04e739fe8314050cd1975c4))

## [9.33.0](https://github.com/Alwatr/alwatr/compare/v9.32.0...v9.33.0) (2026-06-10)

**Note:** Version bump only for package @alwatr/directive

## [9.32.0](https://github.com/Alwatr/alwatr/compare/v9.31.0...v9.32.0) (2026-06-07)

### ✨ Features

* **delay:** enhance lazyDirective with autoBootstrap and bootstrapRoot parameters ([f3c71e1](https://github.com/Alwatr/alwatr/commit/f3c71e12421141ffd40704b1aeee9b539f80d22b))
* **directive:** export RegisterDirectiveFunction type from main.ts ([462e667](https://github.com/Alwatr/alwatr/commit/462e667f04b7cef5497b72aa0fdbe9f35f2bbe61))

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

### ✨ Features

* **directive:** add querySelectorAllSafe function for safe DOM querying ([4a110b5](https://github.com/Alwatr/alwatr/commit/4a110b5075bffaa38a7852034d94f6dec3d228bd))
* **directive:** implement auto-bootstrap logic in lazyDirective function ([9e2e85b](https://github.com/Alwatr/alwatr/commit/9e2e85b5772d39f1b60e9bbf0284ae180a90d957))
* **directive:** implement bootstrapNewDirective function for directive initialization ([b459415](https://github.com/Alwatr/alwatr/commit/b459415e344fa969f13946e91c4c2f788d03f099))

### 🐛 Bug Fixes

* **directive:** improve error handling and initialization logic in bootstrapNewDirective function ([ff09a01](https://github.com/Alwatr/alwatr/commit/ff09a013bc630bf5f84c42273a62085180d3eb55))
* **directive:** prevent multiple destroy calls by checking isDestroyed method ([4b4fcf2](https://github.com/Alwatr/alwatr/commit/4b4fcf281aee77341b3813db05723cd77a408d9a))

### 🔨 Code Refactoring

* **directive:** change parameter type of bootstrapDirectives function from HTMLElement to ParentNode for broader compatibility ([10df4b5](https://github.com/Alwatr/alwatr/commit/10df4b5fd322a9292882e6bf715b6ddf04b08f03))
* **directive:** move DirectiveConstructor type definition to type.ts ([fa86c53](https://github.com/Alwatr/alwatr/commit/fa86c5317fbcb7138f41865d877a45e3b5ae6157))
* **directive:** reorder parameters in bootstrapNewDirective and bootstrapElement functions for clarity ([76941d2](https://github.com/Alwatr/alwatr/commit/76941d2883fbe0f15641fa7ebbcd5f71b1c6013b))
* **directive:** simplify bootstrapDirectives function and remove unused code ([4949bef](https://github.com/Alwatr/alwatr/commit/4949bef87ca72cefe6c59d7b2b7037044b05c0b9))
* **directive:** update bootstrapDirectives to use explicit constructor and attributeName mapping ([2c1978c](https://github.com/Alwatr/alwatr/commit/2c1978c812331ea69ea33d91ee0d1855a986c547))
* **directive:** update export statement for DirectiveConstructor type in main.ts ([6ba5ed8](https://github.com/Alwatr/alwatr/commit/6ba5ed83a093d8daae183585447762d59a382285))
* **directive:** update parameter descriptions in bootstrapDirectives and lazyDirective functions for clarity ([3317854](https://github.com/Alwatr/alwatr/commit/3317854fddb8cdd4933d09b5119f956e561e6785))
* **directive:** update parameter names in querySelectorAllSafe and bootstrapNewDirective functions for clarity ([6a2abc5](https://github.com/Alwatr/alwatr/commit/6a2abc5d8e370943d024feefee6cd6a14421f920))
* reimplement all directive utils and classes ([9f31cf3](https://github.com/Alwatr/alwatr/commit/9f31cf3dc25e134d5b8a35c6e67d2d55ef4a41c5))

### 🔗 Dependencies update

* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([98e8325](https://github.com/Alwatr/alwatr/commit/98e83252c3db81092e3ac1c8d214a696a7513517))
* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([5b3f9cf](https://github.com/Alwatr/alwatr/commit/5b3f9cf3d1a99e5ceb0c3bd70e215e63155b0308))

## [9.30.0](https://github.com/Alwatr/alwatr/compare/v9.29.0...v9.30.0) (2026-06-02)

**Note:** Version bump only for package @alwatr/directive

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

### ✨ Features

* **queue-render:** implement global batcher queue for headless directives ([12bbb92](https://github.com/Alwatr/alwatr/commit/12bbb92b7bc5ba1321778bdf3966f8e2f5ae4939))

### 🐛 Bug Fixes

* **directive:** prevent lifecycle initialization if instance is destroyed ([b4034ba](https://github.com/Alwatr/alwatr/commit/b4034ba1ca4a31a1ca2fa6437ee0ea4a46c86207))
* **queue-render:** handle errors in performUpdate_ to avoid disrupting the update loop ([2383aed](https://github.com/Alwatr/alwatr/commit/2383aed6f4b9a8feb5254895c6a3e4fe220ab259))

### 🔨 Code Refactoring

* **directive:** remove @alwatr/signal dependency and update subscribe_ method signature ([c509225](https://github.com/Alwatr/alwatr/commit/c50922527ab6b9c8db69e1d6004baa5191a1a0ed))
* **directive:** replace Awaitable with void in lifecycle hooks and update initialization logic ([e73eba4](https://github.com/Alwatr/alwatr/commit/e73eba4d9f55b57efebc20fecea9734ab54cd2c9))
* **lit-directive:** remove redundant update_ and shouldUpdate_ method calls ([d3c1fd6](https://github.com/Alwatr/alwatr/commit/d3c1fd6fc06f1720f5b1c3d6afa1f53d2d85a747))

## [9.26.0](https://github.com/Alwatr/alwatr/compare/v9.25.0...v9.26.0) (2026-05-23)

**Note:** Version bump only for package @alwatr/directive

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

**Note:** Version bump only for package @alwatr/directive

## [9.24.0](https://github.com/Alwatr/alwatr/compare/v9.23.4...v9.24.0) (2026-05-14)

### 🔗 Dependencies update

* update @types/node and other dependencies to latest versions ([51df398](https://github.com/Alwatr/alwatr/commit/51df398cedf840ab72b3e5bbae9b4e3fafcc6299))

## [9.23.4](https://github.com/Alwatr/alwatr/compare/v9.23.3...v9.23.4) (2026-05-13)

### 🔨 Code Refactoring

* enhance state decorator to use private key for state management ([2675b63](https://github.com/Alwatr/alwatr/commit/2675b630cb80b80a98a8b30e1dc1a4b1205184a3))

## [9.23.3](https://github.com/Alwatr/alwatr/compare/v9.23.2...v9.23.3) (2026-05-12)

### 🐛 Bug Fixes

* update IReadonlySignal to ISignal in subscribe_ method for improved type safety ([40fdf51](https://github.com/Alwatr/alwatr/commit/40fdf517155349c413ed38441906b6cca56e3c40))

### 🔨 Code Refactoring

* replace ISignal with IBaseSignal in subscribe_ method for consistency ([0c248f2](https://github.com/Alwatr/alwatr/commit/0c248f250d916a95cd11e460de7c359a0d7060c1))

## [9.23.2](https://github.com/Alwatr/alwatr/compare/v9.23.1...v9.23.2) (2026-05-07)

**Note:** Version bump only for package @alwatr/directive

## [9.23.1](https://github.com/Alwatr/alwatr/compare/v9.23.0...v9.23.1) (2026-05-06)

**Note:** Version bump only for package @alwatr/directive

## [9.23.0](https://github.com/Alwatr/alwatr/compare/v9.22.0...v9.23.0) (2026-05-05)

### 🐛 Bug Fixes

* **directive:** log when update is aborted by shouldUpdate_ guard ([d85b50b](https://github.com/Alwatr/alwatr/commit/d85b50b3326e8eace045d531ba6a3fbaba9e9ae1))

## [9.22.0](https://github.com/Alwatr/alwatr/compare/v9.21.0...v9.22.0) (2026-05-02)

### ✨ Features

* **directive:** add shallow equality check to state decorator ([f3cd07a](https://github.com/Alwatr/alwatr/commit/f3cd07a724f697ad44b67f8365cb4f7bc8592bac))
* **directive:** add shouldUpdate_ guard method for conditional rendering ([8cf3dc7](https://github.com/Alwatr/alwatr/commit/8cf3dc75b3a07145a6b8a17a8290f50e19d0485a))
* **directive:** add shouldUpdate_ guard method for conditional rendering ([e1a624d](https://github.com/Alwatr/alwatr/commit/e1a624d1590ae719ac4073e79ba45324240aeff0))

### 🐛 Bug Fixes

* **directive:** reset isUpdatePending_ flag when shouldUpdate_ guard prevents update ([7e27f6f](https://github.com/Alwatr/alwatr/commit/7e27f6f4126fc3217c90a7a30742d3e104ff6639))

### 🔨 Code Refactoring

* **directive:** rename isUpdatePending_ to disableUpdate_ with dual-purpose semantics ([2fe4a06](https://github.com/Alwatr/alwatr/commit/2fe4a0650dd541c580c4ff2ed1477b1296dde64f))

## [9.20.1](https://github.com/Alwatr/alwatr/compare/v9.20.0...v9.20.1) (2026-04-30)

### 🔨 Code Refactoring

* **docs:** update comments to use underscore separator for consistency ([ea37792](https://github.com/Alwatr/alwatr/commit/ea37792e4501e0f4fcd80f8a580640f8725879ad))

## [9.20.0](https://github.com/Alwatr/alwatr/compare/v9.19.1...v9.20.0) (2026-04-30)

### 🔨 Code Refactoring

* **directive:** defer update execution until lifecycle initialization ([f7dd588](https://github.com/Alwatr/alwatr/commit/f7dd588817428d1dcb6c3844476dead016cf4cc1))
* **directive:** rename initialized_ to initialized__ for clarity and consistency ([e1191e8](https://github.com/Alwatr/alwatr/commit/e1191e89530cf0a3801e8dacb698fbc409d93c2c))

## [9.18.0](https://github.com/Alwatr/alwatr/compare/v9.17.0...v9.18.0) (2026-04-28)

### ✨ Features

* **directive:** add [@state](https://github.com/state) decorator for reactive local state management ([c64c6fe](https://github.com/Alwatr/alwatr/commit/c64c6fee0183b05ee4f647979685a2160b9b7297))
* **directive:** add batched update lifecycle with requestUpdate_, update_, and updated_ ([2f8dcf4](https://github.com/Alwatr/alwatr/commit/2f8dcf4d59c76fdcf78b66ada438c6932cabc46f))
* **directive:** add configurable IntersectionObserver options and improve lazy init naming ([2546a7b](https://github.com/Alwatr/alwatr/commit/2546a7b1e9cbb0b5d50d7604ccd9ec5182d5b9fb))
* **directive:** add generic type parameter to state decorator ([e74acfd](https://github.com/Alwatr/alwatr/commit/e74acfd5dd8d5d5587d967087c6a1f55263938d8))
* **directive:** add LitDirective class for lit-html template rendering ([28f17b8](https://github.com/Alwatr/alwatr/commit/28f17b869a19885b2287f52358e241fe1445531c))
* **directive:** add optional IntersectionObserver configuration for visibility hooks ([154ae4d](https://github.com/Alwatr/alwatr/commit/154ae4d2d02b1f139e7a349ca0aaa472d1bcbda7))
* **directive:** implement subscribe_ method for signal subscription management ([9df7628](https://github.com/Alwatr/alwatr/commit/9df7628f9b4312de3a63430ed9f85561472cf64f))

### 🐛 Bug Fixes

* **directive:** ensure update_ is called safely in the update lifecycle ([1758c23](https://github.com/Alwatr/alwatr/commit/1758c2352b37f590919b93630fbf751dd565f9c3))
* **directive:** expand rootElement_ type to support ShadowRoot and DocumentFragment ([2e1a630](https://github.com/Alwatr/alwatr/commit/2e1a63036dc01b025bec5965b559e3bfe6a61f0d))
* **directive:** remove unnecessary type assertion in rootElement_ example ([c6d336f](https://github.com/Alwatr/alwatr/commit/c6d336fa8ad60ee0e03032eee1fc775a9862efc2))
* **directive:** simplify state decorator parameters by removing unused arguments ([5674362](https://github.com/Alwatr/alwatr/commit/5674362d4376eff36fa912ded8cf9a897e08343b))

### 🔗 Dependencies update

* add @alwatr/signal dependency version 9.16.0 ([f1e66e6](https://github.com/Alwatr/alwatr/commit/f1e66e63cc9399758ef3c3315677d1188be3b101))
* **directive:** add lit-html dependency for template rendering support ([d2b61a8](https://github.com/Alwatr/alwatr/commit/d2b61a82e95549018d19399ebc72065157dcffcc))

## [9.16.0](https://github.com/Alwatr/alwatr/compare/v9.15.0...v9.16.0) (2026-04-27)

**Note:** Version bump only for package @alwatr/directive

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* add type imports from @alwatr/type-helper across multiple packages ([9e44c20](https://github.com/Alwatr/alwatr/commit/9e44c20b724b91452848e4ca4344f16133573bcb))
* **tsconfig:** remove @alwatr/type-helper from types array across multiple packages ([09a2177](https://github.com/Alwatr/alwatr/commit/09a2177c0c22631287e896543a4052201d912224))

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🔨 Code Refactoring

* **decorator:** enhance type safety and improve documentation for query, queryAll, and attribute decorators ([a0d8bf9](https://github.com/Alwatr/alwatr/commit/a0d8bf9078efcee44e968f854396a0b609efa5df))
* **directive:** rename DirectiveBase to Directive and update references ([8ecfd32](https://github.com/Alwatr/alwatr/commit/8ecfd3238c1ed1e4bbe1ee6eeef6c6f23aeed64e))
* **directive:** update tests to use Directive instead of DirectiveBase ([244ef14](https://github.com/Alwatr/alwatr/commit/244ef1463569e93ca55137de9195c05e3a7d196b))

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.11.0](https://github.com/Alwatr/alwatr/compare/v9.10.1...v9.11.0) (2026-04-19)

### ✨ Features

* **directives:** implement lazy registration for alwatr-on directive to enable tree-shaking ([c614734](https://github.com/Alwatr/alwatr/commit/c61473466309ef6803b766a1611b48150ae4191f))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/directive

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

### ✨ Features

* **directive:** add logging for event listener initialization ([eb1212f](https://github.com/Alwatr/alwatr/commit/eb1212f2083dcb679108b0d8655747146eb03d1f))
* **directive:** add on_ protected method for managed event listeners ([b94292a](https://github.com/Alwatr/alwatr/commit/b94292a009373de3a3919e671cc1f2f38914e0ca))
* **directive:** add onHidden_ lifecycle hook and unified visibility observer ([4b87d78](https://github.com/Alwatr/alwatr/commit/4b87d78da9c2d2a34f567262ada606b556b79204))

### 🐛 Bug Fixes

* **directive:** allow string event types in on_ method for better flexibility ([cf2273d](https://github.com/Alwatr/alwatr/commit/cf2273deaa230ae927a23cb63bff82c2eff6f490))
* **directive:** change return type of on_ methods to void for consistency ([c2e61cf](https://github.com/Alwatr/alwatr/commit/c2e61cf8ff425688f4266ff8b2dd9e671ee03adb))
* **directive:** simplify on_ method signature by removing generic event type ([0bfe34f](https://github.com/Alwatr/alwatr/commit/0bfe34fb0aad82b8bbd793f6c391d1a43c11c842))

### 🔨 Code Refactoring

* **directive:** add executeOnHidden_ method to handle visibility changes ([94d841f](https://github.com/Alwatr/alwatr/commit/94d841f25afe030e77454d23d092a25a69e5c680))

### 🧹 Miscellaneous Chores

* **decorator:** mark 'on' decorator as deprecated until 'addInitializer' stabilizes ([d295d05](https://github.com/Alwatr/alwatr/commit/d295d054ad9b97df2809b2d5f0c863b84ffe97ca))
* **directive:** update build preset to module-web for ESM browser builds ([4305564](https://github.com/Alwatr/alwatr/commit/43055645682c02cb8ad33f1a4ef3408d7b602b9d))

## [9.9.0](https://github.com/Alwatr/alwatr/compare/v9.8.0...v9.9.0) (2026-04-14)

### ✨ Features

* **directive:** use 'override' keyword for lifecycle methods in directives ([ef130ce](https://github.com/Alwatr/alwatr/commit/ef130cea32d80327fb418f97278f2abaac3f14d4))

### 🐛 Bug Fixes

* **directive:** make init_() method optional in DirectiveBase class ([1abbd67](https://github.com/Alwatr/alwatr/commit/1abbd67497564f924edc338addb922af2b7e45b6))

## [9.8.0](https://github.com/Alwatr/alwatr/compare/v9.7.0...v9.8.0) (2026-04-14)

### ✨ Features

* **directive:** add lazy-init and on-visible lifecycle hooks ([d9bb26e](https://github.com/Alwatr/alwatr/commit/d9bb26ed7a1e8b43bd3926f2832423c54d743392))
* **directive:** defer initialization and enhance error handling in lifecycle methods ([fb15371](https://github.com/Alwatr/alwatr/commit/fb15371bf177167d3a447c8ce10cfa50911b0625))
* **tests:** guard against double-registration in GlobalRegistrator ([524b467](https://github.com/Alwatr/alwatr/commit/524b4672afb36f85c982ef4b880e95d99d4ad4d6))

### 🐛 Bug Fixes

* **directive:** add isDestroyed() method and guard lazyInit_ and onVisible_ calls ([91611cd](https://github.com/Alwatr/alwatr/commit/91611cdcea9f340fbe95755f8b985120b99cc25a))

### 🔗 Dependencies update

* update @happy-dom/global-registrator to version 20.9.0 ([80c5951](https://github.com/Alwatr/alwatr/commit/80c59515097556653aece082cfacaedca8800e8b))

## [9.7.0](https://github.com/Alwatr/alwatr/compare/v9.6.1...v9.7.0) (2026-04-14)

### ✨ Features

* **directive:** add [@on](https://github.com/on) event decorator for DOM event handling ([2dc63e9](https://github.com/Alwatr/alwatr/commit/2dc63e9ecba16a5c65374a8f3ac6b9d2be2e406d))

## [9.6.1](https://github.com/Alwatr/alwatr/compare/v9.6.0...v9.6.1) (2026-04-13)

### 🧹 Miscellaneous Chores

* **directive:** rename synapse package to directive ([22fd700](https://github.com/Alwatr/alwatr/commit/22fd70024306bd7715cbfa7026cc8b70dca1fff6))
* **directive:** revert keyword from directive to synapse ([9cca31a](https://github.com/Alwatr/alwatr/commit/9cca31a3fedcca5ee5a9cbfb5465d6ef6fa15298))

## [9.6.0](https://github.com/Alwatr/alwatr/compare/v9.5.0...v9.6.0) (2026-04-12)

### ✨ Features

* **directive:** add attribute decorator to read attribute values from directive elements ([63a1d98](https://github.com/Alwatr/alwatr/commit/63a1d980353bfd62a8380c244ba221fd3d01e617))

### 🐛 Bug Fixes

* **directive:** add missing init_ method to TestDirective class ([3baedee](https://github.com/Alwatr/alwatr/commit/3baedee188d8803c3e28f3637e4b6b396c2ab7df))
* **directive:** update destroy method to be async for proper cleanup handling ([cfac5b8](https://github.com/Alwatr/alwatr/commit/cfac5b84a8cff1a88df6c3b73d83c621ad21c77b))

### 🔨 Code Refactoring

* **directive:** rename query-decorator to util-decorators ([9c8d687](https://github.com/Alwatr/alwatr/commit/9c8d6873ce69abc4722bdbab405ea4b560d7c0f9))
* **directive:** rename query-decorator to util-decorators ([1f74c80](https://github.com/Alwatr/alwatr/commit/1f74c8012a6c8a49d0a409f68733ac7886d65806))
* **directive:** rename selector references to attribute name for clarity and consistency ([266e730](https://github.com/Alwatr/alwatr/commit/266e730aa0442f131dbcbc3ef500f4a7788dbcfa))
* **directive:** replace selector references with attribute names for consistency ([018e85b](https://github.com/Alwatr/alwatr/commit/018e85bd7fc8dfd7b335fa5e44465881bbcf1f42))
* **directive:** update comments to clarify directive key terminology ([7d76c3d](https://github.com/Alwatr/alwatr/commit/7d76c3df457b3b6ad7913a2caa9334e5eea84e27))
* **directive:** update directive decorator to use attribute name instead of selector ([ba21730](https://github.com/Alwatr/alwatr/commit/ba217307fa50d196fd0afa4136e2176ce9b9177d))

### 🧹 Miscellaneous Chores

* **directive:** Apply suggestions from code review ([65c1c36](https://github.com/Alwatr/alwatr/commit/65c1c362b3d2902e8cf8006525c62bc005d2385a))

## [9.4.5](https://github.com/Alwatr/alwatr/compare/v9.4.4...v9.4.5) (2026-04-11)

**Note:** Version bump only for package @alwatr/synapse

## [9.4.4](https://github.com/Alwatr/alwatr/compare/v9.4.3...v9.4.4) (2026-04-08)

### 🐛 Bug Fixes

* **directive:** prevent remove element in destroy method ([a2e7ce7](https://github.com/Alwatr/alwatr/commit/a2e7ce72e559b72226c1d7711487bb9b13ee932f))

## [9.4.3](https://github.com/Alwatr/alwatr/compare/v9.4.2...v9.4.3) (2026-04-06)

### 🔨 Code Refactoring

* **synapse:** rename onDestroy to addDestroyHook for clarity and update internal references ([f1c9900](https://github.com/Alwatr/alwatr/commit/f1c9900d22e74dc594c9b6f0a2d940ef94a362cb))

### 🧹 Miscellaneous Chores

* **synapse:** change logging method for already initialized directives to logOther for consistency ([904ed45](https://github.com/Alwatr/alwatr/commit/904ed4568f07c5a76f52aa5db31c3cf487ca17d1))

## [9.4.2](https://github.com/Alwatr/alwatr/compare/v9.4.1...v9.4.2) (2026-04-06)

### 🐛 Bug Fixes

* **synapse:** remove unnecessary reference to initialized directives in cleanOnDestroy to prevent memory leak ([79f849b](https://github.com/Alwatr/alwatr/commit/79f849b151220c8c8e38bee406bafa96c789461b))
* **synapse:** rename initializedDirectives_ to initializedDirectiveElements_ for clarity and consistency ([2fdff87](https://github.com/Alwatr/alwatr/commit/2fdff87969316111474e61d599a1f0e6fd0cfa47))

## [9.4.1](https://github.com/Alwatr/alwatr/compare/v9.4.0...v9.4.1) (2026-04-06)

### 🐛 Bug Fixes

* **directive:** change delay from nextMicrotask to nextMacrotask for initialization ([e02c6b4](https://github.com/Alwatr/alwatr/commit/e02c6b400bb82971f9bd207916e16811947c524d))
* **synapse:** add logging to cleanOnDestroy for better debugging ([8a54e65](https://github.com/Alwatr/alwatr/commit/8a54e65f58cdd50f747ea7d3c168f6e4d91e2e2d))
* **synapse:** update finalization registry to differentiate between instance and element ([93ed64f](https://github.com/Alwatr/alwatr/commit/93ed64f62c5e83b5105315fba71342a564c3eaf6))

### 🧹 Miscellaneous Chores

* **synapse:** add documentation for directive instance tracking and garbage collection ([2059f50](https://github.com/Alwatr/alwatr/commit/2059f502214d5f04f4baa91dca2873b163986b0c))

## [9.4.0](https://github.com/Alwatr/alwatr/compare/v9.3.0...v9.4.0) (2026-04-05)

### ✨ Features

* **synapse:** add autoDestroy method to clean up directives when elements are disconnected from the DOM ([f85745e](https://github.com/Alwatr/alwatr/commit/f85745e0c53431ff88671735b06b3c26474ef676))
* **synapse:** implement autoDestructDirectives and update directiveInstanceRegistry management ([8e003d9](https://github.com/Alwatr/alwatr/commit/8e003d936a1181812941f3371ced20ee72e77834))
* **synapse:** implement unique index generation for directive instances ([f380943](https://github.com/Alwatr/alwatr/commit/f380943d039e7bed9b110ecc03102d8f94fcb1ce))
* **synapse:** integrate FinalizationRegistry for directive garbage collection logging ([1e3f1f8](https://github.com/Alwatr/alwatr/commit/1e3f1f816bc82f740ca91df9d72ef99059ef0baa))
* **synapse:** update autoDestroy method to return a boolean indicating element disconnection ([521307e](https://github.com/Alwatr/alwatr/commit/521307e2cd82014ad8e4cb3d6aa9fda9948ce5f2))

### 🔨 Code Refactoring

* **synapse:** change protected methods to public in DirectiveBase class ([7ed56a5](https://github.com/Alwatr/alwatr/commit/7ed56a5d13f3625976f1f14e09344d007c86a891))
* **synapse:** enhance directive initialization logic and improve error handling ([8692c4e](https://github.com/Alwatr/alwatr/commit/8692c4e4fa60bafdc319bb8964390ec6e16d870a))
* **synapse:** improve formatting and update directive registry to use set for unique selector registration ([b2c9a58](https://github.com/Alwatr/alwatr/commit/b2c9a5861d88a09f991cfdbd590a42dda5f3edcf))
* **synapse:** update directive registry to use Map and add initialized directives tracking ([2558b40](https://github.com/Alwatr/alwatr/commit/2558b40e691ada0d543e9283ca799e6ba3002983))
* **synapse:** update onDestroy method signature to accept a context-aware task ([de68470](https://github.com/Alwatr/alwatr/commit/de6847033cbbab0d0ef8c81a864625ccea786e1d))

### 🧹 Miscellaneous Chores

* apply feedbacks from code review ([51f629b](https://github.com/Alwatr/alwatr/commit/51f629b0a3dd989113684091de5b1a3736dc0f28))
* **synapse:** change logging for missing elements in bootstrapDirectives ([82f5763](https://github.com/Alwatr/alwatr/commit/82f5763cce4545022644b1a36dc025bb3681fdec))

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### 🔨 Code Refactoring

* update TypeScript configuration to extend from @alwatr/standard/tsconfig ([3e52ee2](https://github.com/Alwatr/alwatr/commit/3e52ee2152b4264ed994ec72610be5828fbdc6d2))

## [9.2.1](https://github.com/Alwatr/alwatr/compare/v9.2.0...v9.2.1) (2026-04-04)

### 🐛 Bug Fixes

* safely remove element in DirectiveBase class ([ab8adf1](https://github.com/Alwatr/alwatr/commit/ab8adf19f75e2e817e205ca159e5de1dabf2c15a))

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### 🔨 Code Refactoring

* remove emitDeclarationOnly from tsconfig.json files ([98c8910](https://github.com/Alwatr/alwatr/commit/98c891005bf2bc2c3b37c3a635346e917aeeedb3))
* rename clean script alias from 'c' to 'cl' across all package.json files ([e041589](https://github.com/Alwatr/alwatr/commit/e0415899ec6f509fcceaa2fb732c110ead848293))
* reorganize fields in package.json files across multiple packages ([6a0e28f](https://github.com/Alwatr/alwatr/commit/6a0e28f6f43dc816232d6c4f7f4fe2d68993dd29))
* reorganize fields in package.json files across multiple packages ([280e7b1](https://github.com/Alwatr/alwatr/commit/280e7b16414e1eb349c0af3cfc5f4f8f2e0b5288))
* update tsconfig.json to extend from @alwatr/tsconfig-base directly ([1fb76b0](https://github.com/Alwatr/alwatr/commit/1fb76b0e8a56ec5582b43aee4b6cd1850c5f936d))

### 🧹 Miscellaneous Chores

* add "import" field to package exports for consistency ([eb2a680](https://github.com/Alwatr/alwatr/commit/eb2a6805d731ae44ba0666891cacd88088a30abe))
* fix all deps ([86c7c48](https://github.com/Alwatr/alwatr/commit/86c7c48c04ad3225be5012e934443aac28a335d3))
* rename all pageckage inside pkg/nanolib ([8584300](https://github.com/Alwatr/alwatr/commit/85843005c3c34bdf391a718cacaf5d6eb9786fe7))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update logger imports to replace nanolib with nano-build across multiple files ([26a07af](https://github.com/Alwatr/alwatr/commit/26a07afe5fc8761a15ff12538f485a6757d75c74))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))

## [3.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@3.0.0...@alwatr/synapse@3.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* update TypeScript version to ^6.0.2 across all packages ([d6b2bf3](https://github.com/Alwatr/nanolib/commit/d6b2bf3ce064eb927c56d9f8c7a5d3138adde998))

## [3.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@2.0.0...@alwatr/synapse@3.0.0) (2026-03-27)

### ⚠ BREAKING CHANGES

* **core:** Property decorators (@query, @queryAll) now require the 'accessor' keyword.
Legacy experimental decorators are no longer supported.

### 🐛 Bug Fixes

* **queryDecorator:** improve type safety and caching logic in query decorators ([37dfc92](https://github.com/Alwatr/nanolib/commit/37dfc9283e8d4f042ec0bbe5c3191d35dd703c2f))
* **tsconfig:** ensure test files are excluded from compilation ([61b27d1](https://github.com/Alwatr/nanolib/commit/61b27d1c9096d09bfd2a3b15b6796b573a37dd9c))
* update paths for directive and query decorators to use kebab-case ([539ec65](https://github.com/Alwatr/nanolib/commit/539ec65f335ec4dab844614989a9b3aefd0737b9))

### 🔨 Code Refactoring

* **core:** upgrade decorators to TC39 Stage 3 standard ([b9b8489](https://github.com/Alwatr/nanolib/commit/b9b8489b19611173cbc89506d5f4500b82e8fc46))

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))
* add @happy-dom/global-registrator dependency ([7d9a7b3](https://github.com/Alwatr/nanolib/commit/7d9a7b3472b202dec88ee9aa6668c45f03972c0c))
* remove "types" field from package.json in multiple packages ([b2a458d](https://github.com/Alwatr/nanolib/commit/b2a458d3b1028175e6bc8d0485d223e7d22a1773))

## [2.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.4.1...@alwatr/synapse@2.0.0) (2026-03-19)

### ⚠ BREAKING CHANGES

* This package is now ESM-only and no longer provides CommonJS (CJS) distribution.
- Minimum Node.js version is now 14.13.0 (or 12.22.0 for older versions with --experimental-modules flag)
- All require() statements must be replaced with import statements
- CommonJS require() is no longer supported

### 🔨 Code Refactoring

* convert to ESM-only module ([493d7d9](https://github.com/Alwatr/nanolib/commit/493d7d9d76d03c43902eb04f0a9ecebac8f6fbba))

### 🧹 Miscellaneous Chores

* remove unnecessary whitespace in package.json files across multiple packages ([d0cc5c8](https://github.com/Alwatr/nanolib/commit/d0cc5c8eb7b958498d82ad4a009dffb95db572bd))
* update build command in package.json files to remove source map flags ([6b504fc](https://github.com/Alwatr/nanolib/commit/6b504fc4f813146064a21638014a62b0b5b95ca0))
* update build:es script to include src/main.ts for all packages ([bc5454d](https://github.com/Alwatr/nanolib/commit/bc5454dc3536e5d2a6ac53be602e93ba7133fb32))

## [1.4.1](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.4.0...@alwatr/synapse@1.4.1) (2026-03-18)

**Note:** Version bump only for package @alwatr/synapse

## [1.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.3.6...@alwatr/synapse@1.4.0) (2026-03-16)

### ✨ Features

* Utilize 'synapse' attribute for directive association ([f86ca7e](https://github.com/Alwatr/nanolib/commit/f86ca7eb2819425d6c44dd28c424321b7f66d227))

### 🔨 Code Refactoring

* migrate build scripts from yarn to bun across multiple packages ([d90e962](https://github.com/Alwatr/nanolib/commit/d90e962f15e5c951e191d5f02341279b6472abc3))

## [1.3.6](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.3.5...@alwatr/synapse@1.3.6) (2026-02-18)

**Note:** Version bump only for package @alwatr/synapse

## [1.3.5](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.3.4...@alwatr/synapse@1.3.5) (2025-12-23)

**Note:** Version bump only for package @alwatr/synapse

## [1.3.4](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.3.3...@alwatr/synapse@1.3.4) (2025-12-13)

### 🐛 Bug Fixes

* update NoopFunction type alias to NoopFunc ([553e586](https://github.com/Alwatr/nanolib/commit/553e586060aa78e1db7806aea207443db8e789ab))

## [1.3.3](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.3.2...@alwatr/synapse@1.3.3) (2025-12-13)

**Note:** Version bump only for package @alwatr/synapse

## [1.3.2](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.3.1...@alwatr/synapse@1.3.2) (2025-12-10)

**Note:** Version bump only for package @alwatr/synapse

## [1.3.1](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.3.0...@alwatr/synapse@1.3.1) (2025-11-19)

### 🐛 Bug Fixes

* refactor query and queryAll to use a parent variable for improved clarity ([57b175b](https://github.com/Alwatr/nanolib/commit/57b175bddd5617b9a05aba3f3eb81ec0c34527f7))

## [1.3.0](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.2.1...@alwatr/synapse@1.3.0) (2025-11-18)

### ✨ Features

* add optional root parameter to query and queryAll decorators ([95f33b6](https://github.com/Alwatr/nanolib/commit/95f33b60b937a572734b47dbb6887a0a84801beb))

### 🐛 Bug Fixes

* update documentation for queryAll to clarify cache parameter ([0693612](https://github.com/Alwatr/nanolib/commit/06936122ee9aecfc11cdcf68278eac09fc08e8ff))

## [1.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.2.0...@alwatr/synapse@1.2.1) (2025-11-15)

### 🐛 Bug Fixes

* ensure cleanup tasks are called with the correct context in DirectiveBase ([06ab04e](https://github.com/Alwatr/nanolib/commit/06ab04e0eaa3837c2bc55089723051364bc6e56b))
* rename cleanupTaskList variable for consistency ([d51eee9](https://github.com/Alwatr/nanolib/commit/d51eee92883b851fb3fc5307d7eefd5dc536be8e))

## [1.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.20...@alwatr/synapse@1.2.0) (2025-11-15)

### ✨ Features

* add cleanup task management to DirectiveBase for resource management ([d357e63](https://github.com/Alwatr/nanolib/commit/d357e63d61025105701628f480bbb95955822c82))

### 🐛 Bug Fixes

* rename variable in cleanup task loop for improved clarity ([463ecf0](https://github.com/Alwatr/nanolib/commit/463ecf0ea741c51b61523105f7f10b4cef371002))
* update onDestroy method to use NoopFunction type for better clarity ([1023aad](https://github.com/Alwatr/nanolib/commit/1023aadeaa5a608176d57773c8ae956a169789c6))

## [1.1.20](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.19...@alwatr/synapse@1.1.20) (2025-11-09)

### 🐛 Bug Fixes

* delay directive initialization until DOM is ready ([07dd452](https://github.com/Alwatr/nanolib/commit/07dd452732b8d32b822fd99b4eba1617623ced09))

## [1.1.19](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.18...@alwatr/synapse@1.1.19) (2025-11-06)

### 🐛 Bug Fixes

* rename update_ method to init_ and call super.init_ in CopyButtonDirective ([66ec105](https://github.com/Alwatr/nanolib/commit/66ec10508385d3bdc5e7e19d53d48294d48ed865))

## [1.1.18](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.17...@alwatr/synapse@1.1.18) (2025-11-04)

### 🔨 Code Refactoring

* enhance documentation and structure of DirectiveBase class ([b2cf694](https://github.com/Alwatr/nanolib/commit/b2cf6941ffdf56adfc0a357331a1f155f782943e))
* simplify update and destroy methods in DirectiveBase class ([e8a906d](https://github.com/Alwatr/nanolib/commit/e8a906d5e4346eda808fc3013287e620e31ef4e3))
* update property types in query decorators to ensure proper null handling ([bc250dd](https://github.com/Alwatr/nanolib/commit/bc250dde37c72f9469d11ec6a49b9567f3d81d38))

## [1.1.17](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.16...@alwatr/synapse@1.1.17) (2025-10-06)

### 🔗 Dependencies update

* bump the npm-dependencies group with 4 updates ([9825815](https://github.com/Alwatr/nanolib/commit/982581552bbb4b97dca52af5e93a80937f0c3109))

## [1.1.16](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.15...@alwatr/synapse@1.1.16) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [1.1.15](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.14...@alwatr/synapse@1.1.15) (2025-09-22)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.14](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.13...@alwatr/synapse@1.1.14) (2025-09-22)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.13](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.12...@alwatr/synapse@1.1.13) (2025-09-21)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.12](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.11...@alwatr/synapse@1.1.12) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))
* remove unnecessary pure annotations ([adeb916](https://github.com/Alwatr/nanolib/commit/adeb9166f8e911f59269032b76c36cb1888332cf))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [1.1.11](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.10...@alwatr/synapse@1.1.11) (2025-09-19)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.10](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.9...@alwatr/synapse@1.1.10) (2025-09-19)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.9](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.8...@alwatr/synapse@1.1.9) (2025-09-15)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.7...@alwatr/synapse@1.1.8) (2025-09-14)

### 🔨 Code Refactoring

* **package:** update keywords in package.json for debounce, local-storage, and synapse packages ([09c9cca](https://github.com/Alwatr/nanolib/commit/09c9cca3cd600e9ffaf600fb1926c0ee884a1aa8))

## [1.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.6...@alwatr/synapse@1.1.7) (2025-09-13)

### 🐛 Bug Fixes

* types ([c451e48](https://github.com/Alwatr/nanolib/commit/c451e48869bb4bb9a9ddbf9f272f0a303aae9bda))

### 🧹 Miscellaneous Chores

* add reference to delay package in tsconfig ([6486d02](https://github.com/Alwatr/nanolib/commit/6486d02f0cb10ddf3c43c6d8d6efc7c77666f4c8))

## [1.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.5...@alwatr/synapse@1.1.6) (2025-09-13)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.4...@alwatr/synapse@1.1.5) (2025-09-13)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.3...@alwatr/synapse@1.1.4) (2025-09-09)

### 🧹 Miscellaneous Chores

* remove trailing newlines from contributing sections in README files ([e8ab1bc](https://github.com/Alwatr/nanolib/commit/e8ab1bc43e0addea5ccd4c897c2cec597cb9e15f))

## [1.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.2...@alwatr/synapse@1.1.3) (2025-09-08)

### 🐛 Bug Fixes

* **directive:** change delay from immediate to nextMicrotask ([218d134](https://github.com/Alwatr/nanolib/commit/218d1344a4b377382e7d2294864adb388caf9d1a))
* **lib:** mark logger creation as pure for optimization ([d902bf8](https://github.com/Alwatr/nanolib/commit/d902bf872454fe5868c7b6bdbb4ddb340337f443))

## [1.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.1...@alwatr/synapse@1.1.2) (2025-09-06)

### 🔨 Code Refactoring

* update method return types to Awaitable for consistency ([623a8f7](https://github.com/Alwatr/nanolib/commit/623a8f74e9f4ce8142363874ade116a87448df3a))

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.1.0...@alwatr/synapse@1.1.1) (2025-09-05)

**Note:** Version bump only for package @alwatr/synapse

## [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.0.1...@alwatr/synapse@1.1.0) (2025-09-01)

### ✨ Features

* add destroy_ method to clean up directive resources ([5b3878c](https://github.com/Alwatr/nanolib/commit/5b3878cd709dfda1cb224b296e8e36f900e1dfa3))
* add init_ method for directive initialization ([30178d4](https://github.com/Alwatr/nanolib/commit/30178d40dcd59052068a334b0e811473fa184dd5))
* add query and queryAll decorators for element selection ([7eac8d2](https://github.com/Alwatr/nanolib/commit/7eac8d241b9ad714145c42f20a7a8bf58dd4b1e1))
* update main.ts to export queryDecorators ([66631e5](https://github.com/Alwatr/nanolib/commit/66631e5ddb5e1d0ed6b3883ff2008595a13c3a62))

### 🐛 Bug Fixes

* ensure proper initialization sequence by awaiting init_ before update_ ([f251964](https://github.com/Alwatr/nanolib/commit/f2519648c89a0347978366749b681f8e4e3578a9))
* ensure update_ method is abstract in DirectiveBase class ([beae25e](https://github.com/Alwatr/nanolib/commit/beae25e45a9cad40501b60efeb4fa6b1e566a16d))

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/synapse@1.0.0...@alwatr/synapse@1.0.1) (2025-08-26)

### 🐛 Bug Fixes

* add missing dependency for @alwatr/delay in package.json ([616025e](https://github.com/Alwatr/nanolib/commit/616025e6d345f16ecedf62761ec96d2ad29c5856))
* ensure directive update is delayed for proper initialization ([5bc0024](https://github.com/Alwatr/nanolib/commit/5bc0024c52c3813f463141d6508c39090638c4c8))

## 1.0.0 (2025-08-24)

### ✨ Features

* add @alwatr/synapse package ([212ce48](https://github.com/Alwatr/nanolib/commit/212ce485cca32369e4185d5230bc328d1f3a5517))
* add directive decorator for registering class directives ([19c840e](https://github.com/Alwatr/nanolib/commit/19c840e2aa4677d09c615efc7496bab4c0855f39))
* export directiveClass from main.ts for improved module accessibility ([4c59be0](https://github.com/Alwatr/nanolib/commit/4c59be096ac106137d12f6bc69f82d95ddfe02fa))
* implement bootstrapDirectives function to initialize registered directives ([edd5bef](https://github.com/Alwatr/nanolib/commit/edd5bef039a9a85baa7e9b116e7268ee6748eeb4))
* initialize logger and directive registry in synapse ([08f961c](https://github.com/Alwatr/nanolib/commit/08f961c81ca1b303bcad9f227f379b70dfd92090))
* **synapse:** add DirectiveBase class for creating custom directives ([275e71f](https://github.com/Alwatr/nanolib/commit/275e71f87d2aeeccb906194109053306aa1011d1))
* **synapse:** implement directive decorator for class registration ([eca8781](https://github.com/Alwatr/nanolib/commit/eca8781550432a486446b1f7557bfdcc1a8fc178))

### 🐛 Bug Fixes

* pass selector to constructor when instantiating directives in bootstrapDirectives ([17d4d5c](https://github.com/Alwatr/nanolib/commit/17d4d5c903abdcaaaefeef057874e75fd4342a93))

### 🔨 Code Refactoring

* improve documentation and clarity in DirectiveBase class methods ([1fafc74](https://github.com/Alwatr/nanolib/commit/1fafc7413f22527b7937b7f8a42167929fae645a))
* remove @types/node dependency from package.json ([c76b453](https://github.com/Alwatr/nanolib/commit/c76b4537e24751b7ad168df7c891df1e45297e7f))
* remove obsolete CHANGELOG.md file ([50c2d63](https://github.com/Alwatr/nanolib/commit/50c2d63ecd7d39b40a297c88a5750b90cc2face5))
* remove unnecessary types and library definitions from tsconfig ([e86d867](https://github.com/Alwatr/nanolib/commit/e86d8674ee0f86a81cd911a6ccc04f3707885f1e))
* remove unused logger and directive registry code ([5df484c](https://github.com/Alwatr/nanolib/commit/5df484c1e3ab6b58457e8ca4799569f7f16b24fb))
* rename logger variable for consistency in DirectiveBase class ([46d1e56](https://github.com/Alwatr/nanolib/commit/46d1e560f1f8bb402c327f75f6ff3b19a60d0d6e))
* simplify logging method calls in DirectiveBase class ([1ec2212](https://github.com/Alwatr/nanolib/commit/1ec221229e632ba5618eeffc4e9bbcea31a737ee))
* streamline constructor initialization and remove unused connection methods in DirectiveBase class ([814b670](https://github.com/Alwatr/nanolib/commit/814b670db633c90c737a237c244b14e677f312e4))
* update DirectiveConstructor type to include selector parameter ([a1be15a](https://github.com/Alwatr/nanolib/commit/a1be15adfeeee30309d6574ffe0618d67776b5d7))
* update package description and keywords in package.json ([6d7fa25](https://github.com/Alwatr/nanolib/commit/6d7fa2503765f13d90dc77b5cef4a3308e1fc9fd))

### 🧹 Miscellaneous Chores

* remove demo HTML and TypeScript files for cleanup ([a39bc54](https://github.com/Alwatr/nanolib/commit/a39bc549537b3df4bd4d724bc396c5a42b259a9a))
* update version to 1.0.0-rc in package.json ([f25b384](https://github.com/Alwatr/nanolib/commit/f25b384e13bf200079764bd82ead2349cd7b19ec))
