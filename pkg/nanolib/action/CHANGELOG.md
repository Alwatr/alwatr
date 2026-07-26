# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.0.0](https://github.com/Alwatr/alwatr/compare/v9.38.2...v10.0.0) (2026-07-26)

### 🔗 Dependencies update

* update @happy-dom/global-registrator to version 20.11.1 in multiple packages and upgrade prettier to version 3.9.6 ([fd85555](https://github.com/Alwatr/alwatr/commit/fd855554de36e3b99637ca4277f6f863558639b3))

## [9.38.2](https://github.com/Alwatr/alwatr/compare/v9.38.1...v9.38.2) (2026-07-12)

### 🧹 Miscellaneous Chores

* update TypeScript and related dependencies to version 7.0.2 across all packages; upgrade prettier to version 3.9.5 ([d84e7af](https://github.com/Alwatr/alwatr/commit/d84e7afd24b5b7660f14e1a03b868979e43dc880))

## [9.38.1](https://github.com/Alwatr/alwatr/compare/v9.38.0...v9.38.1) (2026-06-28)

### 🔗 Dependencies update

* update @happy-dom/global-registrator to version ^20.10.6 across multiple packages ([d3ac891](https://github.com/Alwatr/alwatr/commit/d3ac891b06e4379fe227cfa68e34fd72e31d45be))

## [9.38.0](https://github.com/Alwatr/alwatr/compare/v9.37.0...v9.38.0) (2026-06-14)

### 🐛 Bug Fixes

* update attribute references from action-context to action_context for consistency ([840dae1](https://github.com/Alwatr/alwatr/commit/840dae16da2b542726c2b17fc2d49b3c7917dcfe))

## [9.37.0](https://github.com/Alwatr/alwatr/compare/v9.36.0...v9.37.0) (2026-06-13)

### ✨ Features

* **action:** add subscription options with custom filter support for action handlers ([8127273](https://github.com/Alwatr/alwatr/commit/81272735be430c64e7d62b89f5fa7774327ab0b6))
* **action:** add subscription options with filter support for action handlers ([3b6fb11](https://github.com/Alwatr/alwatr/commit/3b6fb111660e4d1b11781f391812295aec907a01))
* **action:** enhance actionService.on method to support options parameter for filtering ([6c6ec58](https://github.com/Alwatr/alwatr/commit/6c6ec58812512f6b9f96696e657e10ec55c14cac))
* **action:** rename SubscribeOptions to ActionSubscribeOptions for clarity ([b092a7f](https://github.com/Alwatr/alwatr/commit/b092a7f1ff979bdd89f49fba57d51072567bc943))

### 🐛 Bug Fixes

* **action:** remove unnecessary type assertion in event handler registration ([6853dba](https://github.com/Alwatr/alwatr/commit/6853dbacdc8e448155ae6a3a9f9a2f159cdf12d5))

### 🔗 Dependencies update

* update @happy-dom/global-registrator to version 20.10.3 across all packages ([822da2a](https://github.com/Alwatr/alwatr/commit/822da2ad620d190856b2ec0fe6649c3d3de2059a))

## [9.36.0](https://github.com/Alwatr/alwatr/compare/v9.35.0...v9.36.0) (2026-06-11)

### 🐛 Bug Fixes

* **action-service:** update type assertion for listener keys to improve type safety ([a41f4a7](https://github.com/Alwatr/alwatr/commit/a41f4a73594f8b9f5d1ffc2349536cf248f465a1))

### 🔨 Code Refactoring

* **action-service:** make subscribeAll generic for improved type safety ([5faab4e](https://github.com/Alwatr/alwatr/commit/5faab4e2241fe0174dc50a4086f761e6d0dc45fb))

## [9.35.0](https://github.com/Alwatr/alwatr/compare/v9.34.0...v9.35.0) (2026-06-11)

### ✨ Features

* **action-service:** add 'stop' modifier to prevent event propagation ([46fa52e](https://github.com/Alwatr/alwatr/commit/46fa52e86813986f30b14540871c3d42b9a0efb3))
* **action-service:** add $dataset resolver to handle dataset properties ([01c1bc0](https://github.com/Alwatr/alwatr/commit/01c1bc0d8016a1739bad47ba4463a6d11ac56261))

### 🐛 Bug Fixes

* **action:** make action listeners optional in subscribeAll method ([79e28fd](https://github.com/Alwatr/alwatr/commit/79e28fde03ffddfd8ee1f6a3f5b3c25e199beb9a))

### 🔨 Code Refactoring

* **action-service:** simplify event delegation handling by removing bound handler ([12c7588](https://github.com/Alwatr/alwatr/commit/12c758858950301b1d339cf09350ab42798cb58f))
* **action-service:** update event delegation from document.body to document for consistency ([9e32146](https://github.com/Alwatr/alwatr/commit/9e3214671495e8dba8da9482023784aa9356ce56))
* **action:** comment out unused player event types in DEFAULT_DELEGATED_EVENTS ([285af26](https://github.com/Alwatr/alwatr/commit/285af265f8587a47bc8ace006935f103560b70b0))
* **action:** expand DEFAULT_DELEGATED_EVENTS with detailed comments for clarity ([f4d5a2f](https://github.com/Alwatr/alwatr/commit/f4d5a2f14e82c2c1baaf7878aaedb1096e487a2d))
* conditionally log accidents in DEV_MODE for better debugging ([c225def](https://github.com/Alwatr/alwatr/commit/c225defd90630a89c58956efecf78df3b294f6ca))

## [9.34.0](https://github.com/Alwatr/alwatr/compare/v9.33.1...v9.34.0) (2026-06-10)

### ✨ Features

* add OutboundAction type for improved action configuration validation ([a7f9e53](https://github.com/Alwatr/alwatr/commit/a7f9e53633c8488e689a4c034737198e1ef7b5f3))
* add subscribeAll method to ActionService for batch action subscriptions ([91ebe81](https://github.com/Alwatr/alwatr/commit/91ebe81fd74b75253c61bf1f0558e3b04087d064))
* rename OutboundAction to ActionConfig for improved clarity and consistency ([402cee2](https://github.com/Alwatr/alwatr/commit/402cee215fcef61518b418d8e44092729a5930c0))

### 🐛 Bug Fixes

* update subscribeAll method signature to require action listeners for all action types ([3ab5c59](https://github.com/Alwatr/alwatr/commit/3ab5c59003b26d59ccd8f3d1d9e2c90d4ed82b93))

### 🔨 Code Refactoring

* remove unused actionService import and clean up tests for instance independence ([40f8953](https://github.com/Alwatr/alwatr/commit/40f8953d17b167cd55d9e9ae1b9606e1061dbe41))
* remove unused Awaitable type import from action-service ([344ae29](https://github.com/Alwatr/alwatr/commit/344ae29bd92daade66588f1ee9fc95879bbb9606))
* standardize logger method names in ActionService for consistency ([602c8fe](https://github.com/Alwatr/alwatr/commit/602c8fe0ef8b65c117a6b7c9e83f46597f68e117))
* standardize logger naming and update subscribeAll method signature for consistency ([15145b4](https://github.com/Alwatr/alwatr/commit/15145b4d8b391aa8e90bb4058506e18d096b3e77))

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

### 🐛 Bug Fixes

* standardize formatting and improve descriptions across multiple packages ([24f22e4](https://github.com/Alwatr/alwatr/commit/24f22e451cf3a1edb891943ef179cc18192079bf))

### 🔨 Code Refactoring

* conditionally log method arguments and events in DEV_MODE to reduce production build size ([b3842e0](https://github.com/Alwatr/alwatr/commit/b3842e09d56973b3a04e739fe8314050cd1975c4))

## [9.33.0](https://github.com/Alwatr/alwatr/compare/v9.32.0...v9.33.0) (2026-06-10)

**Note:** Version bump only for package @alwatr/action

## [9.32.0](https://github.com/Alwatr/alwatr/compare/v9.31.0...v9.32.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/action

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

### 🔗 Dependencies update

* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([98e8325](https://github.com/Alwatr/alwatr/commit/98e83252c3db81092e3ac1c8d214a696a7513517))
* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([5b3f9cf](https://github.com/Alwatr/alwatr/commit/5b3f9cf3d1a99e5ceb0c3bd70e215e63155b0308))

## [9.30.0](https://github.com/Alwatr/alwatr/compare/v9.29.0...v9.30.0) (2026-06-02)

**Note:** Version bump only for package @alwatr/action

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

### 🔨 Code Refactoring

* **ActionService tests:** remove deprecated compatibility wrappers and clean up imports ([04acd66](https://github.com/Alwatr/alwatr/commit/04acd664d77ff727e73341dc0e63a3351e197b87))
* **ActionService:** move ActionDescriptor interface to type.ts and clean up imports ([5fe8e33](https://github.com/Alwatr/alwatr/commit/5fe8e33f3be4e1fa3c93bbc8dafb9f5f2b8948f8))
* **main.ts:** remove deprecated functions and clean up exports ([27d7b2d](https://github.com/Alwatr/alwatr/commit/27d7b2dac6fa0374f00582b58c087e065b4e0ce7))

## [9.28.0](https://github.com/Alwatr/alwatr/compare/v9.27.0...v9.28.0) (2026-05-25)

**Note:** Version bump only for package @alwatr/action

## [9.27.0](https://github.com/Alwatr/alwatr/compare/v9.26.0...v9.27.0) (2026-05-23)

### 🐛 Bug Fixes

* **action:** enhance ActionService for SSR compatibility and improve error handling ([52b7ae4](https://github.com/Alwatr/alwatr/commit/52b7ae43015ca0661eb93fa5d37656e90bd01d03))

### 🔨 Code Refactoring

* improve formatting and logging in ActionService methods ([2d41986](https://github.com/Alwatr/alwatr/commit/2d419867354b73f26d3e312096e1f9de20f4535f))
* migrate action handling to action-service module ([c5bb3be](https://github.com/Alwatr/alwatr/commit/c5bb3befcbfd35b4e326dec567eacddb336db212))

## [9.26.0](https://github.com/Alwatr/alwatr/compare/v9.25.0...v9.26.0) (2026-05-23)

**Note:** Version bump only for package @alwatr/action

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

### ✨ Features

* **on-action-array:** support handling multiple action types in onAction function ([fcc35aa](https://github.com/Alwatr/alwatr/commit/fcc35aac42c25bf1a10e8cd6ca11eed84b576a1a))
* **on-action:** refactor onAction to support multiple action types with improved unsubscribe handling ([d79285e](https://github.com/Alwatr/alwatr/commit/d79285e5a19c27196501a5e8c84d877cb9c321a5))

## [9.24.0](https://github.com/Alwatr/alwatr/compare/v9.23.4...v9.24.0) (2026-05-14)

**Note:** Version bump only for package @alwatr/action

## [9.23.3](https://github.com/Alwatr/alwatr/compare/v9.23.2...v9.23.3) (2026-05-12)

**Note:** Version bump only for package @alwatr/action

## [9.23.2](https://github.com/Alwatr/alwatr/compare/v9.23.1...v9.23.2) (2026-05-07)

**Note:** Version bump only for package @alwatr/action

## [9.23.1](https://github.com/Alwatr/alwatr/compare/v9.23.0...v9.23.1) (2026-05-06)

**Note:** Version bump only for package @alwatr/action

## [9.20.1](https://github.com/Alwatr/alwatr/compare/v9.20.0...v9.20.1) (2026-04-30)

### 🔨 Code Refactoring

* **action:** migrate action naming from colon to underscore separator ([a6e99a7](https://github.com/Alwatr/alwatr/commit/a6e99a75988a9d506a87ec79efe13f44bf3073f0))

## [9.20.0](https://github.com/Alwatr/alwatr/compare/v9.19.1...v9.20.0) (2026-04-30)

### ✨ Features

* **action-syntax:** require ui: namespace prefix for UI actions ([4b9ef67](https://github.com/Alwatr/alwatr/commit/4b9ef672928a728ef1a541eed53b9512ddefc700))

### 🐛 Bug Fixes

* **action-syntax:** require ui: namespace prefix in action names ([adc861b](https://github.com/Alwatr/alwatr/commit/adc861b460d885361ba18896b82b6a07d04d4e62))

## [9.19.1](https://github.com/Alwatr/alwatr/compare/v9.19.0...v9.19.1) (2026-04-30)

### 🐛 Bug Fixes

* **action-syntax:** update regex to allow hyphens in action names ([1ad001d](https://github.com/Alwatr/alwatr/commit/1ad001d70108547ef836a3ddff663ba832380c07))

## [9.19.0](https://github.com/Alwatr/alwatr/compare/v9.18.1...v9.19.0) (2026-04-28)

### 🐛 Bug Fixes

* **action:** remove unnecessary type assertion in PayloadResolver example ([c845819](https://github.com/Alwatr/alwatr/commit/c84581964c65837220e4476456eb208d9abc0110))

## [9.18.1](https://github.com/Alwatr/alwatr/compare/v9.18.0...v9.18.1) (2026-04-28)

### 🔨 Code Refactoring

* **action:** consolidate type definitions into single module ([955863d](https://github.com/Alwatr/alwatr/commit/955863d0a462b95193bb15a0dd6eb31c3514379c))

## [9.17.0](https://github.com/Alwatr/alwatr/compare/v9.16.0...v9.17.0) (2026-04-27)

### ✨ Features

* **action:** define Alwatr Flux Standard Action (AFSA) ([a6bf3e1](https://github.com/Alwatr/alwatr/commit/a6bf3e1ee0aba3695c709aeacfdff8560a44aeb3))
* **action:** document AFSA pattern and context scoping in JSDoc ([e09a251](https://github.com/Alwatr/alwatr/commit/e09a251988863957a7ef2acc3ea361375788947b))
* **action:** implement context scoping and mutable action object in delegation ([cc499ee](https://github.com/Alwatr/alwatr/commit/cc499ee8f5612ac8df83cafe81604c66ea6b8827))
* **action:** refactor API to dispatch and receive full Action objects ([d533dad](https://github.com/Alwatr/alwatr/commit/d533dada94028d5b90259c8cd068c09707f812c4))
* **action:** update internal channel to use full Action objects ([df9011d](https://github.com/Alwatr/alwatr/commit/df9011d3a34f87045cb2629b6b8e551bffe8b129))
* **action:** update registry documentation for AFSA pattern ([dbbfe8a](https://github.com/Alwatr/alwatr/commit/dbbfe8aef1d377d1643626b7d0bd2018ea26490a))

## [9.16.0](https://github.com/Alwatr/alwatr/compare/v9.15.0...v9.16.0) (2026-04-27)

### ✨ Features

* **action:** add $checked payload ([84ea649](https://github.com/Alwatr/alwatr/commit/84ea6494659bd84044d46360f1d1f3e5442697f1))

### 🔨 Code Refactoring

* **action:** Apply suggestions from code review ([18a962f](https://github.com/Alwatr/alwatr/commit/18a962f52ae37d3dfbe3eea9e312a496f85b8075))
* **action:** update delegation pattern to encode event type in attribute name ([2a3ef67](https://github.com/Alwatr/alwatr/commit/2a3ef670f6c0cfa13d58f8a1a3132988bc7039a7))

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🐛 Bug Fixes

* **action:** update handler type to Awaitable<void> and simplify dispatchAction implementation ([75b4124](https://github.com/Alwatr/alwatr/commit/75b412406c067782a94737076483ebe605ca520f))
* **action:** update onAction handler type to support wider payload types ([08cfd26](https://github.com/Alwatr/alwatr/commit/08cfd261370fe5a2b10b5121ab77a5dd7faae822))

### 🔨 Code Refactoring

* **action-record:** remove unused easterEgg action from ActionRecord interface ([9ac6a7c](https://github.com/Alwatr/alwatr/commit/9ac6a7c8c3b7786183cd4dc636577aaa4e01b41a))
* **action:** clarify ActionRecord is application-specific ([5e4f09b](https://github.com/Alwatr/alwatr/commit/5e4f09b527688d157be70ebb12c395bc1f091524))
* **action:** clarify handler signatures and improve documentation ([9217e5a](https://github.com/Alwatr/alwatr/commit/9217e5a501a26aa3997cee3d43d3659cd74e46a0))
* **action:** enhance README with clearer explanations and updated examples ([d282463](https://github.com/Alwatr/alwatr/commit/d282463749d5ee7f16b5612c425995953419ef72))
* **action:** simplify documentation and remove page-ready exports ([17bd973](https://github.com/Alwatr/alwatr/commit/17bd9734469f6e5a44fa2a91f92b4804d29ea6c2))
* **action:** use arrow functions and explicit parameters in handlers ([bbf26ab](https://github.com/Alwatr/alwatr/commit/bbf26ab27284e1343b09af305c1a2c67678f10a6))
* add type imports from @alwatr/type-helper across multiple packages ([9e44c20](https://github.com/Alwatr/alwatr/commit/9e44c20b724b91452848e4ca4344f16133573bcb))
* **internalChannel:** simplify ChannelSignal type by removing index signature ([6101123](https://github.com/Alwatr/alwatr/commit/6101123721e62578aa2f2315bff50751e7384333))
* **onAction:** remove unnecessary type casting for handler parameter ([135cf10](https://github.com/Alwatr/alwatr/commit/135cf1084a53ffabbb6dd335672923a0726ded19))
* **tsconfig:** remove @alwatr/type-helper from types array across multiple packages ([09a2177](https://github.com/Alwatr/alwatr/commit/09a2177c0c22631287e896543a4052201d912224))

### 🧹 Miscellaneous Chores

* **action-record:** add 'easterEgg' action to ActionRecord interface for fix type issues ([9c0363e](https://github.com/Alwatr/alwatr/commit/9c0363e42e2adfe17e3a9d41dc94ce0127f25349))

## [9.13.0](https://github.com/Alwatr/alwatr/compare/v9.12.0...v9.13.0) (2026-04-24)

### ✨ Features

* **action:** ActionRecord interface to define type safe all action payloads ([9bb6239](https://github.com/Alwatr/alwatr/commit/9bb62395a5e9c2e7f1ee54358f1f8b46f68b56d4))
* **action:** migrate to ChannelSignal for O(1) action routing ([b5a2d84](https://github.com/Alwatr/alwatr/commit/b5a2d84a01615abd4aaf98be92f4474071e22fad))

### 🐛 Bug Fixes

* **action:** export all public api with docs ([569e054](https://github.com/Alwatr/alwatr/commit/569e05402c5f06e26a76a9a5cb3d2d94c1ecbbb2))

### 🔨 Code Refactoring

* **action:** ChannelSignal strictly typed by `ActionRecord` ([de2715b](https://github.com/Alwatr/alwatr/commit/de2715bd2af69e163eb29ef8e2709e7fced2247c))
* **action:** enhance all methods ([fb17a52](https://github.com/Alwatr/alwatr/commit/fb17a522f6f9e142d685b0a4abb90aa52b4bbab5))
* **action:** new modifier and payload ([66304e5](https://github.com/Alwatr/alwatr/commit/66304e5fabc88d244bf7cba3dc44319f76df5897))
* **action:** rewrite the action ([4dc76b5](https://github.com/Alwatr/alwatr/commit/4dc76b5df141226548029e5458237b44b8622ab1))
* **page-ready:** new dispatchPageReady and onPageReady powered by ChannelSignal ([a560a3b](https://github.com/Alwatr/alwatr/commit/a560a3b3a687ab925cad5d3d85f71cbb5869d37a))

## [9.12.0](https://github.com/Alwatr/alwatr/compare/v9.11.2...v9.12.0) (2026-04-23)

**Note:** Version bump only for package @alwatr/action

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🐛 Bug Fixes

* **directive:** bind dispatch function correctly for event listener management ([cabc52e](https://github.com/Alwatr/alwatr/commit/cabc52e8b248e996b3e490a42b11ba80d0f2619c))
* **directive:** correct comment on conflicting modifiers in ActionDirective ([98183c1](https://github.com/Alwatr/alwatr/commit/98183c18448bed171cdaf05fa99d53c4e294af89))

### 🔨 Code Refactoring

* **action:** replace DirectiveBase with Directive in ActionDirective and related components ([7553f3b](https://github.com/Alwatr/alwatr/commit/7553f3be24325a1ab302e361fd1bdf0fb8a0c7f9))
* **directive:** update documentation for on-action attribute syntax and remove deprecated examples ([6a7be46](https://github.com/Alwatr/alwatr/commit/6a7be4681648af72da9b0a608a95724cc88ecf46))

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.11.1](https://github.com/Alwatr/alwatr/compare/v9.11.0...v9.11.1) (2026-04-19)

### 🐛 Bug Fixes

* **alwatr-on:** make EventSignalPayload generic to support custom event types ([8dc792e](https://github.com/Alwatr/alwatr/commit/8dc792eaddfd166f87aa77e2579a3f8335c467ec))

## [9.11.0](https://github.com/Alwatr/alwatr/compare/v9.10.1...v9.11.0) (2026-04-19)

### ✨ Features

* **alwatr-on:** enhance event handling in alwatr-on directive to ensure event is always passed to handlers ([1aa4fed](https://github.com/Alwatr/alwatr/commit/1aa4fed7aa480cf0ede8bccdf49ab332b2a91220))
* **directives:** implement lazy registration for alwatr-on directive to enable tree-shaking ([c614734](https://github.com/Alwatr/alwatr/commit/c61473466309ef6803b766a1611b48150ae4191f))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/on

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

### 🧹 Miscellaneous Chores

* **on:** update build preset to module-web for ESM browser builds ([47ed0e2](https://github.com/Alwatr/alwatr/commit/47ed0e2cab91619e698fe80e44028e6078526504))

## [9.9.0](https://github.com/Alwatr/alwatr/compare/v9.8.0...v9.9.0) (2026-04-14)

### ✨ Features

* **on:** add @alwatr/on nanolib package ([0524ffe](https://github.com/Alwatr/alwatr/commit/0524ffe7bd72c49fcd870cecdfaccf8b34697d2d))
* **on:** add AlwatrActionDirective for event-to-action binding ([1018df0](https://github.com/Alwatr/alwatr/commit/1018df0190f7b123cc81c8eeb9638ac1fb408b66))
* **on:** add alwatrOn method for subscribing to dispatched actions ([35247de](https://github.com/Alwatr/alwatr/commit/35247de542316f8d954a456b1ad2de806c3ac53f))
* **on:** add internal event signal for action dispatching ([2f5420c](https://github.com/Alwatr/alwatr/commit/2f5420c325494a91731a0454ea392cb19c6dec3d))
* **on:** define EventSignalPayload interface for event signal structure ([fa44a53](https://github.com/Alwatr/alwatr/commit/fa44a53f9e0f52e1bc0161470c8d0a8884b172f5))
* **on:** import SubscribeResult type for improved type safety ([63e8d2d](https://github.com/Alwatr/alwatr/commit/63e8d2debf102607042403e21121de82dc2f7f21))
* **on:** reorganize module exports and imports ([f1432b0](https://github.com/Alwatr/alwatr/commit/f1432b0b576c68cce83e0d2dc08c7089628ca1b8))

### 🐛 Bug Fixes

* **on:** override init_ method for improved syntax validation ([eac46f8](https://github.com/Alwatr/alwatr/commit/eac46f8023551e76c99293a2f83964e750620702))

### 🔨 Code Refactoring

* **on:** review and apply feedbacks ([dc44c98](https://github.com/Alwatr/alwatr/commit/dc44c983e043eb72fd3dc030b84fa5cc2c98dde3))
