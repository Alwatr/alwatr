# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.2.2](https://github.com/Alwatr/flux/compare/v5.2.1...v5.2.2) (2025-09-15)

### 🐛 Bug Fixes

* update subscription to prevent receiving previous value in debounced signal ([044780d](https://github.com/Alwatr/flux/commit/044780d35427a97711788224e60e209fb53dea53))
* update subscription to trigger debouncer with value from source signal ([a7e8eff](https://github.com/Alwatr/flux/commit/a7e8effd7e963aaf905afae08a652d7abe222c3a))

### 🔨 Code Refactoring

* improve logging in subscribe method to pass options directly ([e026dbf](https://github.com/Alwatr/flux/commit/e026dbf74ca96ec6d878bd5fb08f4939c46d08f2))
* simplify signalId assignment using nullish coalescing operator ([0578c85](https://github.com/Alwatr/flux/commit/0578c854677df2fe0a62e5fbbfa017856d82b611))
* update logging in subscribe method to pass options directly ([a7e32f2](https://github.com/Alwatr/flux/commit/a7e32f20df6b12c1c9dd06feaf01fca8170a5346))

### 🧹 Miscellaneous Chores

* update @alwatr/debounce dependency to version 1.1.1 ([c2e2ae4](https://github.com/Alwatr/flux/commit/c2e2ae4fe54f8fdd482bd53b598f5e88570a26f2))
* update package dependencies to latest versions ([a517c82](https://github.com/Alwatr/flux/commit/a517c82b99073a65a8470da428dfd288080b7ea5))

## [5.2.1](https://github.com/Alwatr/flux/compare/v5.2.0...v5.2.1) (2025-09-15)

### ⚡ Performance Improvements

* To improve readability and avoid calling sourceSignal.get() twice, used temporary variable before using it. ([2aaa3bd](https://github.com/Alwatr/flux/commit/2aaa3bdd06745885495ca64a71c4040b9ec57cea))

### 🔨 Code Refactoring

* change the `signal.value` to `signal.get()` ([fcdcb6c](https://github.com/Alwatr/flux/commit/fcdcb6caf82747b8e6d7ad846d6babead385c603))
* rename run_ method to scheduleExecution_ for clarity in EffectSignal ([402af2f](https://github.com/Alwatr/flux/commit/402af2f7b84357ade4f79b33611d6968ec6b8efd))

## [5.2.0](https://github.com/Alwatr/flux/compare/v5.1.0...v5.2.0) (2025-09-15)

### ✨ Features

* Add comprehensive documentation to the repository ([dbd9cc1](https://github.com/Alwatr/flux/commit/dbd9cc145219c44bf17430c5fe68675428364910))
* Add comprehensive documentation to the repository ([d5569e6](https://github.com/Alwatr/flux/commit/d5569e63acd0aa926c34d9a61b2fff5139b9d3cc))
* Update EffectSignalConfig to allow optional signalId and add documentation ([6aab97e](https://github.com/Alwatr/flux/commit/6aab97e6e223f822f66cacb78c9d194fa5e2df9d))

### 🐛 Bug Fixes

* Improve formatting and consistency in README.md ([bcdee41](https://github.com/Alwatr/flux/commit/bcdee41d21825368f04b4e1af3e296116a4680f9))
* Refactor logger initialization and ensure checkDestroyed_ is called in relevant methods ([a17884d](https://github.com/Alwatr/flux/commit/a17884d5df097d62353e5b4110d3a83a5ae093b3))

### 🔨 Code Refactoring

* Ensure isRunning__ is reset when destroyed during delay in EffectSignal ([ff9a590](https://github.com/Alwatr/flux/commit/ff9a5905f7875e7dcb675cbdbb44869b0743e954))
* Improve signal management by consolidating destruction checks and enhancing logging ([8765ba2](https://github.com/Alwatr/flux/commit/8765ba2f701f10db89ef11a3045065442360d193))
* Remove unnecessary binding of notify_ in EventSignal constructor ([eb3be32](https://github.com/Alwatr/flux/commit/eb3be3211b13c21aa4f5c16a37f5c9fc59144951))
* Simplify ComputedSignal implementation and improve logging for lifecycle methods ([bc35e91](https://github.com/Alwatr/flux/commit/bc35e91d5871669cc22c6c92ee2b83c4d940194e))
* Simplify EffectSignal implementation and improve logging for lifecycle methods ([a5cad04](https://github.com/Alwatr/flux/commit/a5cad04469efd929e2ce7da42b371d4c054e5eaf))
* Simplify EventSignal logger initialization and constructor ([b515315](https://github.com/Alwatr/flux/commit/b515315428e8ba0c70a7ef5ede49916e899b6fcd))
* Update logger step identifiers for recalculation in ComputedSignal ([8de799f](https://github.com/Alwatr/flux/commit/8de799f40d90c2cdc3440d90bc1f2b6ce22f7013))

## [5.1.0](https://github.com/Alwatr/flux/compare/v5.0.0...v5.1.0) (2025-09-14)

### ✨ Features

* add createComputedSignal function for reactive value management ([da4ad2e](https://github.com/Alwatr/flux/commit/da4ad2ec31e24d0756007b666e6c6c3c3ad75709))
* add createEventSignal function for dispatching transient events ([0729eca](https://github.com/Alwatr/flux/commit/0729eca8ad7ed9fd4fca02c5f2c5f5d2f1a5acf4))
* add createFilteredSignal function to emit values from a source signal based on a predicate ([ad4873c](https://github.com/Alwatr/flux/commit/ad4873c2f5ca8d26e44db371c1387f450e12189b))
* add createMappedSignal function for transforming source signal values ([6fcefed](https://github.com/Alwatr/flux/commit/6fcefed778bd6007c639d218e3736aaf9d071d10))
* add createStateSignal function for creating stateful signals ([2764b50](https://github.com/Alwatr/flux/commit/2764b501dfc39488f7b5446935e7ebdfe06fcd35))
* add optional onDestroy callback to SignalConfig and EffectSignalConfig for resource cleanup ([d0ed93a](https://github.com/Alwatr/flux/commit/d0ed93a1f7e9da5c73222fb9a3e7e1b95fa88212))
* add signalId property to IReadonlySignal for debugging and update DebounceSignalConfig type ([d7a43ba](https://github.com/Alwatr/flux/commit/d7a43bad568d12264482475bddb045467dfe229c))
* add update method for state transitions based on previous value ([77b3593](https://github.com/Alwatr/flux/commit/77b3593df19e166b0446938104a9795b037b2d3d))
* call optional onDestroy callback in createDebouncedSignal for improved resource cleanup ([8eef425](https://github.com/Alwatr/flux/commit/8eef4252d193db5809850bd624e739bcc8549077))
* call optional onDestroy callback in destroy method for resource cleanup ([64a0e3b](https://github.com/Alwatr/flux/commit/64a0e3b6f242e91bccc48fe0cf8d1e214bcc2a5e))
* enhance createDebouncedSignal with optional signalId and onDestroy callback for improved resource management ([7ce880a](https://github.com/Alwatr/flux/commit/7ce880a40b96a3aaa78297d68cd3e7e9e05b7a20))
* enhance destroy method in SignalBase and StateSignal for improved memory management ([a81f005](https://github.com/Alwatr/flux/commit/a81f0057803fe1c0c0650d0a2223319064739067))
* implement createDebouncedSignal function for debouncing updates from a source signal ([42bd6a9](https://github.com/Alwatr/flux/commit/42bd6a915494222171317142bd21e11ff3ef2e25))
* implement createEffect function for managing reactive side-effects ([730c847](https://github.com/Alwatr/flux/commit/730c847ed6720ca7761dfb5745d957a681352a9c))
* implement IReadonlySignal interface in ComputedSignal and call optional onDestroy callback in destroy method ([8828230](https://github.com/Alwatr/flux/commit/8828230fa2ea8246d6b08d73dfee863eceea4c82))
* improve resource cleanup in createDebouncedSignal by checking internalSignal state before destruction ([36b8505](https://github.com/Alwatr/flux/commit/36b850505c0541906038a05f2cf5967baac1b2cb))
* update createDebouncedSignal to use ComputedSignal type and streamline resource cleanup in onDestroy callback ([bb0908a](https://github.com/Alwatr/flux/commit/bb0908a03ad9a86e432b8bfa17e21ced881c8f41))

### 🐛 Bug Fixes

* debounce destroy ([e14a39a](https://github.com/Alwatr/flux/commit/e14a39a6b4729980d5aa7486873b4aae272bec0b))
* initialize signalId in constructor and call optional onDestroy callback in destroy method ([198f9b3](https://github.com/Alwatr/flux/commit/198f9b3b08a259d118b8645bb144677ea7f24613))
* remove unused dependency @alwatr/package-tracer from package.json ([9008a40](https://github.com/Alwatr/flux/commit/9008a40b8eb7e996ee8995956ab14d93bf021407))

### 🔨 Code Refactoring

* move fundamental signals to core ([5fc4cd9](https://github.com/Alwatr/flux/commit/5fc4cd90cb3463a876bc21f4699510aace7db8f4))
* remove packageTracer import and related dev mode initialization ([d02276e](https://github.com/Alwatr/flux/commit/d02276eed37337b1f68d2c74cc5ee366add55f35))
* remove unused IComputedSignal and IEffectSignal imports from computed and effect creators ([bf7d3f2](https://github.com/Alwatr/flux/commit/bf7d3f287ee2db101b6ca0ad30eccf5f1af4bdd1))
* reorganize exports to use core and creators directories ([cdb5225](https://github.com/Alwatr/flux/commit/cdb5225773c5a909f176bb5550ce4f3a0517f09f))
* simplify parameter and return type annotations in createComputedSignal, createEffect, and createEventSignal ([024025e](https://github.com/Alwatr/flux/commit/024025e68fb4793ab7ecd97e51ccb5f271002a52))

### 🧹 Miscellaneous Chores

* add initial Jest configuration file for testing setup ([071ec20](https://github.com/Alwatr/flux/commit/071ec200be91fa21da83b7c49133e5de99797198))
* standardize dependency names in dependabot configuration and update VSCode settings ([a1629cb](https://github.com/Alwatr/flux/commit/a1629cb050da77334ee2307ea25d008bbfceacdd))

### 🔗 Dependencies update

* bump the npm-dependencies group with 6 updates ([f6ae979](https://github.com/Alwatr/flux/commit/f6ae9795e34ba3913fa208f7f94794b5753b90c9))
* update @alwatr/debounce dependency to version 1.1.0 ([bce3ffe](https://github.com/Alwatr/flux/commit/bce3ffe6c174c05aef60dc9fdc7e78aa31dcc71b))
* update @types/node dependency to version 22.18.3 ([6e1a847](https://github.com/Alwatr/flux/commit/6e1a8477095f102d09b020dccfe4e638c1d058ca))

## [5.0.0](https://github.com/Alwatr/flux/compare/v4.1.1...v5.0.0) (2025-09-12)

### ⚠ BREAKING CHANGES

* Rewrite @alwatr/signal from ground-up — complete API overhaul

Summary:
A full rewrite of the @alwatr/signal package was released. The internal implementation, public exports and types have changed in an incompatible way. Consumers must update imports and call-sites to use the new API.

Affected:
- packages/signal (public package @alwatr/signal)
- Any repos importing old signal types/exports or relying on previous runtime semantics

What changed (high-level):
- New core primitives and public API (StateSignal, ComputedSignal, EffectSignal, EventSignal) with new constructors and config objects.
- signalId is now required for identity/logging.
- Lifecycle semantics: ComputedSignal and EffectSignal must call .destroy() to avoid leaks.
- Async model explicit: State/Event notify on microtask; Computed/Effect batch on macrotask.
- subscribe() options changed (once, priority, receivePrevious).
- Types and exported symbols renamed/reshaped; package.json exports/types updated.

Migration notes:
- Replace old imports with new named exports from '@alwatr/signal'.
- Instantiate signals with the new config object shape (e.g. new StateSignal({ signalId, initialValue })).
- Ensure ComputedSignal/EffectSignal .destroy() is called in teardown paths.
- Update code that relied on previous sync/async timing — recompute batching behavior may differ.
- Update TypeScript types/usages according to new exports; run yarn build & yarn test after changes.

Quick example (new usage):
const firstName = new StateSignal<string>({ signalId: 'user-firstName', initialValue: 'John' });
const fullName = new ComputedSignal<string>({ signalId: 'user-fullName', deps: [firstName], get: () => `User: ${firstName.value}` });
const logger = new EffectSignal({ deps: [fullName], run: () => console.log(fullName.value) });
// remember to call fullName.destroy()/logger.destroy() when no longer needed

Action items for maintainers/releasers:
- Bump major version.
- Add migration notes to CHANGELOG and README.
- Run CI: yarn build && yarn test (Node >=18.16.0).
- Notify downstream consumers about required code changes.
* Deprecate `@alwatr/observable`
* Deprecate `@alwatr/context`
* Deprecate `@alwatr/remote-context`
* Deprecate `@alwatr/fetch-state-machine`

* update package description to accurately reflect the library's capabilities ([785b30b](https://github.com/Alwatr/flux/commit/785b30b5ab694b1165c541a7dbbf6959221f8f46))

### ✨ Features

* add abstract SignalBase class for managing observers and subscriptions ([913aee8](https://github.com/Alwatr/flux/commit/913aee840e8f3f82ba865d4db0492a70a8ef8d99))
* add computed function for creating read-only computed signals ([137bf73](https://github.com/Alwatr/flux/commit/137bf7391b71ce11e77773cc45e030341c2b5408))
* add destroy method to ComputedSignal interface for cleanup and garbage collection ([67dcc46](https://github.com/Alwatr/flux/commit/67dcc46a4f1330e60a161da4213b58f938534757))
* add destroy method to EffectResult interface for cleanup ([fe5638a](https://github.com/Alwatr/flux/commit/fe5638ada3f7ebdda67ae3d6538518310684d10c))
* add destruction check in dispatch method and remove unused notify_ method ([f37086d](https://github.com/Alwatr/flux/commit/f37086d439fbf74e2486586e9e80cc6509e9fc42))
* add destruction checks and logging in computed function to prevent operations on destroyed signals ([7233967](https://github.com/Alwatr/flux/commit/723396732a9decda613529446e4d095cdecbd57a))
* add destruction checks in value getter, setter, and subscribe method; remove unused notify_ method ([3e22e63](https://github.com/Alwatr/flux/commit/3e22e633bccf2f04fb989250a623df5d35401042))
* add effect function to manage side effects with dependency tracking ([6890953](https://github.com/Alwatr/flux/commit/68909538d19df0724e592b77cccd24db645ae9a7))
* add isDestroyed getter to ComputedSignal for lifecycle management ([b26d9fe](https://github.com/Alwatr/flux/commit/b26d9fe088324ea1246ab5b2164dffae6734b1e5))
* add isDestroyed getter to EffectSignal for lifecycle management ([c918007](https://github.com/Alwatr/flux/commit/c918007925eb54b73bb54aa06bca16bc65cf6ce6))
* add isDestroyed property and destroy method to IReadonlySignal for lifecycle management ([a5abfb8](https://github.com/Alwatr/flux/commit/a5abfb8f26c281cfa8e65fa56dcf0dd35f18945c))
* add isDestroyed property to IEffectSignal for lifecycle management ([45b5b67](https://github.com/Alwatr/flux/commit/45b5b679149098e5498cf37c49e00957efef8305))
* add ReadonlySignal interface and ComputedOptions type for signal management ([9d475dd](https://github.com/Alwatr/flux/commit/9d475ddcb36ed44509257df18ecb82ddb6fa284d))
* add StateSignal class for managing stateful signals and notifications ([409f2b9](https://github.com/Alwatr/flux/commit/409f2b9f8abaa74a1b0d761d4513a64a6604b320))
* add types for signal listener, subscription options, and configuration ([3bebee5](https://github.com/Alwatr/flux/commit/3bebee5ab733d344ea6c1e6f1e7b7f3310cf4a87))
* add untilNext method to ComputedSignal for improved subscription handling ([c8d333f](https://github.com/Alwatr/flux/commit/c8d333fe860de3714a5946f000a1f83c7ec7144a))
* add untilNext method to IReadonlySignal for awaiting next dispatched value ([004b228](https://github.com/Alwatr/flux/commit/004b22870d17c86bfa2f2e3b0d68a82376d2a5a1))
* add untilNext method to SignalBase for awaiting next dispatched value ([5771e72](https://github.com/Alwatr/flux/commit/5771e72bf8876a8feaaebc263394e05003e9d44e))
* enhance computed function to include logging, improve destruction handling, and return ComputedSignal type ([2446570](https://github.com/Alwatr/flux/commit/24465704b8d7b2ca38c59073b189c2e4410240b3))
* enhance ReadonlySignal interface with options parameter and improve documentation ([9abed87](https://github.com/Alwatr/flux/commit/9abed875db6cabc709aa63ec4893158db30e0372))
* enhance SignalBase with destruction checks and logging ([10acb3d](https://github.com/Alwatr/flux/commit/10acb3dedf682f19f94670cd79c8fe5e403e0fc1))
* implement destroy method to clear observers and manage lifecycle ([50ae3e3](https://github.com/Alwatr/flux/commit/50ae3e30d0aa3fa8137b6ab8e8198c2a931d43bb))
* implement EventSignal class for dispatching transient events ([4f55a49](https://github.com/Alwatr/flux/commit/4f55a49e2896f52e8b730edf55f9dc431d86d165))
* implement ReadonlySignal interface in StateSignal class ([748226c](https://github.com/Alwatr/flux/commit/748226c5958ed7985b2fedd93a6d4a1bbde3839e))
* move notify_ mothod to the base ([4d81348](https://github.com/Alwatr/flux/commit/4d81348cf869187eca7777f7182d19e2256046e6))
* new EffectSignal class with immediate execution option and improved lifecycle management ([4552fde](https://github.com/Alwatr/flux/commit/4552fde94ac8262e7c8933b53d26bd5ed9b7839e))
* remove logger and signal classes for cleaner architecture ([0beef9c](https://github.com/Alwatr/flux/commit/0beef9c1fc2e9aff6f9d1028a4bc30b44c10037b))
* update main entry point documentation and export necessary types ([7c3f12a](https://github.com/Alwatr/flux/commit/7c3f12a67f24f13bd0c9a9ff3ca9e3a14d7afb1c))

### 🐛 Bug Fixes

* change notify_ method to fire callbacks synchronously and handle unhandled promise rejections ([2b54d69](https://github.com/Alwatr/flux/commit/2b54d69a45fca9500097f17e99c9572955617e55))
* change set method to be synchronous ([a0cdaf4](https://github.com/Alwatr/flux/commit/a0cdaf441f888caacc98f8f3017b066ccf6186df))
* clear value on destroy method in StateSignal class ([0088c03](https://github.com/Alwatr/flux/commit/0088c03ac976b473d0ce7d659cf7cbd0254bfdde))
* correct logger method call from 'new' to 'initialize' in EventSignal constructor ([f9f7177](https://github.com/Alwatr/flux/commit/f9f7177bf3025b3e1484bab612b35af1c7fd0455))
* correct logger method call from 'new' to 'initialize' in StateSignal constructor and improve notify_ method documentation ([b0d6981](https://github.com/Alwatr/flux/commit/b0d6981088144f74a78bb412babe077f4fe7d2f9))
* correct observer array reference and method call in EventSignal ([83a3ddf](https://github.com/Alwatr/flux/commit/83a3ddf7151ef866b1f392fdd56aa0105e742718))
* correct primitive value comparison logic in StateSignal set method ([93c5319](https://github.com/Alwatr/flux/commit/93c5319d0c1318a2c053373c3e7d8fa839544386))
* ensure effect runs immediately on initialization ([a7d34d6](https://github.com/Alwatr/flux/commit/a7d34d6203a283faeac821ab0909f5d91802006d))
* error log in computed-signal.ts ([7c2ab54](https://github.com/Alwatr/flux/commit/7c2ab54de6410ed4287286713fc3a34a9e02ef24))
* export everything in main ([dc6779e](https://github.com/Alwatr/flux/commit/dc6779eeb0fbce67a3b665e46fc0e0df8583c88e))
* make dispatch sync ([678ef01](https://github.com/Alwatr/flux/commit/678ef01fdc19b04167f60579e606cbf1fe1fa774))
* make set method synchronously ([d36cda2](https://github.com/Alwatr/flux/commit/d36cda241c4e0c2bf952590a989c7de40f94bf41))
* update default value for receivePrevious in SubscribeOptions and make options optional in Observer interface ([a27aa1f](https://github.com/Alwatr/flux/commit/a27aa1fdd106748deab8899d3df9d9a98e29c8eb))
* update interface names and import type from @alwatr/type-helper ([a855b39](https://github.com/Alwatr/flux/commit/a855b39336f5bd99c822a9f061a84171bce274c9))

### 🔨 Code Refactoring

* centralize observer removal logic in SignalBase class ([61c13e9](https://github.com/Alwatr/flux/commit/61c13e96ff1d16651b884822a4b5b808d6c474b2))
* change dispatch method to async for improved non-blocking behavior ([696d942](https://github.com/Alwatr/flux/commit/696d9423b147743634cd4a87c42e04f8d1f3b5cb))
* change notify_ method to async for improved observer handling ([dbaec6e](https://github.com/Alwatr/flux/commit/dbaec6e35b4894cc404d3dcbbbdfc4c671fa70ef))
* change set method to async for improved notification handling ([a42cb1b](https://github.com/Alwatr/flux/commit/a42cb1b438e4652ae9a470d11949895be09782af))
* enhance documentation for ComputedSignal class and its methods ([e7deac5](https://github.com/Alwatr/flux/commit/e7deac5e4a118faa3ad32746ca6bbff1750d4902))
* enhance logging and improve dispatch method in EventSignal ([23d717a](https://github.com/Alwatr/flux/commit/23d717ae67bcc437499902822cc50c1a4c291e9d))
* enhance SignalBase class with improved type imports and access modifiers ([d26efbe](https://github.com/Alwatr/flux/commit/d26efbe09973b65f9720bee7104490b3e080be7b))
* improve immediate callback execution in subscribe method ([3518aa3](https://github.com/Alwatr/flux/commit/3518aa3355731158f8f4032899a77867f4af16ff))
* improve logging and error handling in subscribe and notify methods ([fbcc7fa](https://github.com/Alwatr/flux/commit/fbcc7fa4dea17d99600672b4c566f87b5747e651))
* improve StateSignal implementation by renaming variables and enhancing dispatch logic ([68e7e73](https://github.com/Alwatr/flux/commit/68e7e73eeb5814c95affd2e698131bd8353b4d99))
* improve value change notification logic in StateSignal ([24ffa82](https://github.com/Alwatr/flux/commit/24ffa82b7b69483095ff80b88d87dfe9ea90fc09))
* optimize value setting in StateSignal to prevent unnecessary dispatches ([cb00df1](https://github.com/Alwatr/flux/commit/cb00df13b6ea38e23ecb70b1ae73487a18ca85fd))
* prevent unnecessary promise handling in EffectSignal constructor ([93940b0](https://github.com/Alwatr/flux/commit/93940b0d05345a238111b2443f247859bb08f680))
* remove 'disabled' option from subscribe options in README and tests ([73ee9db](https://github.com/Alwatr/flux/commit/73ee9db4fbb01cc87d0e1c38f2c27398c53a6157))
* remove 'disabled' option from SubscribeOptions and clean up related logic in SignalBase and StateSignal ([381356a](https://github.com/Alwatr/flux/commit/381356a02f4972a8ab2eff5653be867f4b57010c))
* remove checkDestroyed_ method from EffectSignal class ([9e42492](https://github.com/Alwatr/flux/commit/9e42492ce9ba84794ef0a57527b8275bfe78a3e8))
* remove unused imports in ComputedSignal ([d797820](https://github.com/Alwatr/flux/commit/d7978208e34f46e98f0fbaf15fd4a4703dce7d16))
* remove unused Observer_ type import in StateSignal ([29d95a4](https://github.com/Alwatr/flux/commit/29d95a47305d474ad2d9c3634ebf91b598fb2bc2))
* reorganize EffectResult interface and add runImmediately option to EffectOptions ([e4825a1](https://github.com/Alwatr/flux/commit/e4825a19464d52bcdcb47f8e6a027fbc2a5ceee6))
* reorganize imports and enhance EventSignal constructor and dispatch method visibility ([1d25544](https://github.com/Alwatr/flux/commit/1d2554471dbc430bb12edc4a94ea33d4a1922814))
* reset config_ in ComputedSignal's destroy method to improve memory management ([b5bcb20](https://github.com/Alwatr/flux/commit/b5bcb204addc639e611ca0ba47640eaf31372ff6))
* reset config_ in EffectSignal's destroy method to improve memory management ([81a9748](https://github.com/Alwatr/flux/commit/81a9748cdaf121d3a0ae872c23fe691c1f51acf9))
* simplify dispatch method in EventSignal by removing error handling ([7777299](https://github.com/Alwatr/flux/commit/7777299b31a38fdd31ae6a96bc6a34bd270dc831))
* simplify exports in main entry point of Signal package ([3039eca](https://github.com/Alwatr/flux/commit/3039eca5eebd43937937b2eac6aa65e649cc5da8))
* simplify ListenerCallback and Observer_ type definitions ([dc95f09](https://github.com/Alwatr/flux/commit/dc95f098c57277a1f4af05d21e2017c1e8bfc2d5))
* simplify observer type definitions in SignalBase class ([a579ec4](https://github.com/Alwatr/flux/commit/a579ec43040da719d43a08544448340c17243c54))
* streamline dispatch logic and enhance error handling in StateSignal ([eec0a43](https://github.com/Alwatr/flux/commit/eec0a430c9dc18c082b00765781a3333c48b51d8))
* streamline internal signal initialization in ComputedSignal ([3791208](https://github.com/Alwatr/flux/commit/3791208298b884183e202694f451185b3ae9b524))
* streamline microtask dispatch in set and subscribe methods ([598eef3](https://github.com/Alwatr/flux/commit/598eef334cfb3c34ee1dd38178fd94fc4a2fae56))
* update ComputedSignal class structure and improve dependency management ([7947b61](https://github.com/Alwatr/flux/commit/7947b61fd77fc46f69ad95016dac0f890f2c30c9))
* update EffectOptions to EffectSignalConfig with improved dependency handling and runImmediately option ([7d162fc](https://github.com/Alwatr/flux/commit/7d162fc77d0aca04744369306b6b13d506cbdc04))
* update import statements and enhance access modifiers in StateSignal class ([fe12bf2](https://github.com/Alwatr/flux/commit/fe12bf2d4e47ac88f0e1b74e3f506046c136c1b1))
* update observer handling in SignalBase for consistency and clarity ([f97c51d](https://github.com/Alwatr/flux/commit/f97c51d404616e90931db3547171b4e0cf0a60f0))

### 🧹 Miscellaneous Chores

* add @jest/globals dependency to package.json and update yarn.lock ([2105405](https://github.com/Alwatr/flux/commit/2105405afe5e747b92ab59fc7de4b4bbdcc0bdb6))
* clean up yarn.lock by removing unused package entries ([6a23277](https://github.com/Alwatr/flux/commit/6a232775a9261a48bc32096908753f88924d6d06))
* deprecate context abd observable ([0a90540](https://github.com/Alwatr/flux/commit/0a90540c70ebfa9bb25726ed22b10143bd900a4c))
* deprecate fetch based packages ([2a4c19f](https://github.com/Alwatr/flux/commit/2a4c19f139e2ea730a81bd5e4156d7cdd5348c16))
* remove @alwatr/context ([b733fba](https://github.com/Alwatr/flux/commit/b733fbae3a62879bd5bbbc6571743a308ea013b4))
* remove @alwatr/observable ([dce1904](https://github.com/Alwatr/flux/commit/dce19042f7042f43330643c15348b77bf940688c))
* remove copilot instruction file to streamline project documentation ([6551786](https://github.com/Alwatr/flux/commit/655178673066ac41c116dd09683131edceb628ce))
* remove export of '@alwatr/remote-context' from main.ts ([35aac32](https://github.com/Alwatr/flux/commit/35aac32e06a1fc8c7f65f8ce0cc59e010480bb76))
* remove fetch-state-machine export from main.ts ([33de03e](https://github.com/Alwatr/flux/commit/33de03e3434c2974756db673d7689ecb342086a9))
* remove reference to @alwatr/observable from package.json and tsconfig.json ([30ead90](https://github.com/Alwatr/flux/commit/30ead9083f19cda76873ed227c76476926175eca))
* replace @alwatr/observable with @alwatr/signal in package.json and tsconfig.json ([784468e](https://github.com/Alwatr/flux/commit/784468ee819cbb2e21168cd01e47943fb15eaf0f))
* streamline settings.json by consolidating array formatting and removing unnecessary comments ([9fdf0d0](https://github.com/Alwatr/flux/commit/9fdf0d05f6a784236b774427aff8e7b25fd7ec58))
* temporary deprecate fsm ([e18fa8e](https://github.com/Alwatr/flux/commit/e18fa8ee3f5afb7b67ddf5837f1f4613f64bb355))
* update @alwatr/eslint-config to version 5.6.1 ([de337eb](https://github.com/Alwatr/flux/commit/de337eb20f3acf9b4a8cc33116b48c7d3ea0aa5b))
* update @alwatr/nanolib dependency to version 6.0.2 ([134d3e7](https://github.com/Alwatr/flux/commit/134d3e7878c7a22d5f7994c671b5dceabfd29b57))
* update eslintignore and remove deprecated references from tsconfig files ([806aad5](https://github.com/Alwatr/flux/commit/806aad55ca212dedae5057b3a06bc6293347afb4))

### 🔗 Dependencies update

* update ([8c3b09a](https://github.com/Alwatr/flux/commit/8c3b09ab34e9646376f1ffaaada9e6efd23d950c))
* update @alwatr/eslint-config, @alwatr/prettier-config, @alwatr/tsconfig-base, and @alwatr/yarn-upgrade to latest versions ([ecfdff0](https://github.com/Alwatr/flux/commit/ecfdff055864ed717632a9c6be053ec25d460b8d))
* update @alwatr/nanolib to ^6.0.3 and devDependencies to latest versions ([78576fe](https://github.com/Alwatr/flux/commit/78576fe849359bd0a7fec724290312c749019386))
* update dependencies and devDependencies in package.json ([d2cf47c](https://github.com/Alwatr/flux/commit/d2cf47c26b65f41eb8de0873fe7065d0a42aaecf))
* update devDependencies to latest versions ([750acf8](https://github.com/Alwatr/flux/commit/750acf860d34cbe78be3ad6a81560cb817c33d94))
* update workspace dependency versions for consistency ([b004468](https://github.com/Alwatr/flux/commit/b0044682805a6f5842214755de109034ec4d0405))

## [4.1.1](https://github.com/Alwatr/flux/compare/v4.1.0...v4.1.1) (2025-09-08)

### 🔗 Dependencies update

* update @alwatr/nanolib to version 6.0.2 across multiple packages ([2d18fb0](https://github.com/Alwatr/flux/commit/2d18fb0e7311321200b1ed37381308b1dacae4b2))

## [4.1.0](https://github.com/Alwatr/flux/compare/v4.0.5...v4.1.0) (2025-09-08)

### 🐛 Bug Fixes

* update generic type constraints in state machine classes ([eddca0d](https://github.com/Alwatr/flux/commit/eddca0dbad519f0504429e207800d2fc8031691b))
* update type definitions Json in state machine classes, and use old fetch package ([ee9a4a4](https://github.com/Alwatr/flux/commit/ee9a4a4c7bed0a1aad8a742ee3f764d08d8f3e81))

### 🔨 Code Refactoring

* replace MaybePromise with Awaitable in action and listener callback types ([57d16b4](https://github.com/Alwatr/flux/commit/57d16b447fcbfdce46f9343395f6aa8b897af146))

### 🧹 Miscellaneous Chores

* add @alwatr/yarn-upgrade dependency and remove outdated update script ([908f1f6](https://github.com/Alwatr/flux/commit/908f1f6690180ece64574a4e7ec371286d854a3c))
* add dry-run option for release script in package.json ([5a1973e](https://github.com/Alwatr/flux/commit/5a1973ea1c2341a4fd4b3ad295b386019d45d5cb))
* add missing newline in .yarnrc.yml for better readability ([a49fd76](https://github.com/Alwatr/flux/commit/a49fd76595d8c6db1c87c96a62eefc0e78c69ce7))
* clean up .eslintignore by removing demo and uniquely directories ([78e5292](https://github.com/Alwatr/flux/commit/78e5292b1fbed388c224d37e4d5a0486e68df15c))
* correct username casing in CODEOWNERS ([c3b54bf](https://github.com/Alwatr/flux/commit/c3b54bf4bb4c8d28f1f6b75477eb92bc3613172f))
* remove Exir Studio sponsorship logo from README files ([df5d19c](https://github.com/Alwatr/flux/commit/df5d19cf9ff3ea723905b3f3bd4f874c42fdcdfc))
* remove unused types from tsconfig.json files across multiple packages ([eecabea](https://github.com/Alwatr/flux/commit/eecabea18710ff476011f7b439e9f838198e2fdf))
* update @alwatr/nanolib and devDependencies to latest versions ([9c28454](https://github.com/Alwatr/flux/commit/9c28454e2eeb5a3c96784a8ca8ab5f591b606468))
* update @alwatr/nanolib and devDependencies to latest versions ([fc1092a](https://github.com/Alwatr/flux/commit/fc1092aa35e34075374ea13e7ee2693b6c218830))
* update @alwatr/nanolib and devDependencies to latest versions ([aedf844](https://github.com/Alwatr/flux/commit/aedf844719889bd8a3f8de92c3a7ca2811a12872))
* update @alwatr/nanolib and devDependencies to latest versions ([50730ae](https://github.com/Alwatr/flux/commit/50730ae8ea26954e2fbed51feb1a7fa7e8d8e74d))
* update @alwatr/nanolib and devDependencies to latest versions ([09fc363](https://github.com/Alwatr/flux/commit/09fc36357f34bc7143bc9b1cf5ee9fc456ab3e93))
* update dependencies to latest versions in package.json ([b928153](https://github.com/Alwatr/flux/commit/b928153398d10376d065b8384378764a5d94c4ea))
* update devDependencies to latest versions ([2994833](https://github.com/Alwatr/flux/commit/2994833a349f92511deae5d9619e0e272f7ea8a4))
* update devDependencies to latest versions in package.json ([a4e2d7b](https://github.com/Alwatr/flux/commit/a4e2d7bbfdcc393bbc96ce5fc6f54b015d5ee33a))
* update lerna.json to enhance changelog formatting and section icons ([8027180](https://github.com/Alwatr/flux/commit/80271806290856ca434d533619f832a26534e86d))
* update license to MPL-2.0 ([80810ec](https://github.com/Alwatr/flux/commit/80810ec991f0c9e945231f1041c30ff70ff9ea37))
* update license to MPL-2.0 ([82d20c8](https://github.com/Alwatr/flux/commit/82d20c88ad1b4ff5909ef0ca6b36b2db8f378279))
* update package.json files across multiple packages to enhance structure and dependencies ([9df0690](https://github.com/Alwatr/flux/commit/9df0690b0b1ae036293be75da429842f67f8685f))
* update prettier and typescript SDK versions to latest ([6625698](https://github.com/Alwatr/flux/commit/6625698e12e2cf9575691a6b0651d57988d21157))

### 🔗 Dependencies update

* add conventional-commits-filter dependency to enhance commit message management ([d6278a2](https://github.com/Alwatr/flux/commit/d6278a296bb4a6e20894d8e8aefa5507ac266a92))
* adjust schedule time and remove unnecessary fields in dependabot configuration ([d21cabe](https://github.com/Alwatr/flux/commit/d21cabe2855e81bab1174f67d2b7cd6271460456))
* **deps:** bump the github-actions group across 1 directory with 5 updates ([31dee50](https://github.com/Alwatr/flux/commit/31dee50b7bfd61f0bbc183105b344cf09938b20c))
* update CodeQL action versions to v3.30.0 ([aaa569c](https://github.com/Alwatr/flux/commit/aaa569c99096ad283391ae91d91e48ea4047a1fd))
* update dependency-review-action to v4.7.3 ([838c410](https://github.com/Alwatr/flux/commit/838c410e3a17569dd5167e1a331d1821e8a46024))

## [4.0.5](https://github.com/Alwatr/flux/compare/v4.0.4...v4.0.5) (2025-03-13)

### Bug Fixes

* bump @alwatr/nanolib to version 5.5.1 across multiple packages for iOS issues ([70d879e](https://github.com/Alwatr/flux/commit/70d879e379a560fbcbe41f7176a638942ee22152)) by @

### Dependencies update

* update @types/node to version 22.13.10 and bump [@lerna-lite](https://github.com/lerna-lite) packages to version 3.12.3 ([e918359](https://github.com/Alwatr/flux/commit/e918359ec013c32b3224aebf04f92553be31b395)) by @

## [4.0.4](https://github.com/Alwatr/flux/compare/v4.0.3...v4.0.4) (2025-03-06)

### Dependencies update

* bump @alwatr/nanolib, @alwatr/nano-build, and @alwatr/type-helper to version 5.5.0 across multiple packages ([db73076](https://github.com/Alwatr/flux/commit/db7307671b0f14cb19072656bd6021144b27dadb)) by @
* **deps-dev:** bump the dependencies group across 1 directory with 6 updates ([5978202](https://github.com/Alwatr/flux/commit/5978202acbdc6b2e3db6d315dc3c114daa4f0289)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 2 updates ([99c7131](https://github.com/Alwatr/flux/commit/99c71315a6d0068d54f083bd37320a44da1cdcf5)) by @dependabot[bot]
* update package manager to yarn@4.7.0 ([9bd8beb](https://github.com/Alwatr/flux/commit/9bd8beb89f09cde347f842d82b5c222ee1758481)) by @
* update prettier to version 3.5.3-sdk and typescript to version 5.8.2-sdk ([a506c40](https://github.com/Alwatr/flux/commit/a506c401c2b9f456dec09261878663950e3620f9)) by @

## [4.0.3](https://github.com/Alwatr/flux/compare/v4.0.2...v4.0.3) (2025-02-18)

### Bug Fixes

* **observable:** improve subscription logic for 'once' option and streamline unsubscribe handling ([d8516a0](https://github.com/Alwatr/flux/commit/d8516a098a9033bfb0780afdf84f4a0667660047)) by @alimd

### Dependencies update

* **deps-dev:** bump the dependencies group across 1 directory with 11 updates ([18e3479](https://github.com/Alwatr/flux/commit/18e34795f826270a407d77440b946f8101513ba9)) by @dependabot[bot]
* **deps-dev:** bump the dependencies group with 10 updates ([b70907b](https://github.com/Alwatr/flux/commit/b70907bcb78b664c80e7d7acec9acf04c805cb2f)) by @dependabot[bot]
* **deps:** bump @alwatr/nanolib in the alwatr group across 1 directory ([2f52985](https://github.com/Alwatr/flux/commit/2f52985a74d4c5719dcb5d8d0440e3c2fac9be72)) by @dependabot[bot]
* **deps:** bump @octokit/endpoint from 10.1.1 to 10.1.3 ([5c4a949](https://github.com/Alwatr/flux/commit/5c4a949920ebefce64ace26b8bdbde40e2fc5271)) by @dependabot[bot]
* **deps:** bump @octokit/plugin-paginate-rest from 11.3.3 to 11.4.2 ([e185af9](https://github.com/Alwatr/flux/commit/e185af957d3aa4fdcb17bb9f8cfa93e9429cd4ef)) by @dependabot[bot]
* **deps:** bump @octokit/request from 9.1.1 to 9.2.2 ([7d9b6ce](https://github.com/Alwatr/flux/commit/7d9b6ce22da7949829bd84f82548be34c1ea813a)) by @dependabot[bot]
* **deps:** bump @octokit/request-error from 6.1.1 to 6.1.7 ([e702fa7](https://github.com/Alwatr/flux/commit/e702fa7b8b27d1a59ccaa696430a3a2dec6b7f0a)) by @dependabot[bot]
* **deps:** bump cross-spawn from 7.0.3 to 7.0.6 ([9659263](https://github.com/Alwatr/flux/commit/9659263e16fd58194f2ba6fb85258f8fd160c460)) by @dependabot[bot]
* **deps:** bump the alwatr group with 4 updates ([7e1b5fd](https://github.com/Alwatr/flux/commit/7e1b5fdde606bd76a443356c74f332015beed275)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 4 updates ([e9c2451](https://github.com/Alwatr/flux/commit/e9c2451a8c8babdc486bbe9bfc00ccbf84607d99)) by @dependabot[bot]
* update TypeScript to 5.7.3-sdk and Prettier to 3.5.1-sdk; bump [@lerna-lite](https://github.com/lerna-lite) packages to 3.12.1; upgrade Yarn to 4.6.0 ([2bb77b6](https://github.com/Alwatr/flux/commit/2bb77b609bf7cab5e29014528d36055308a7757a)) by @alimd

## [4.0.2](https://github.com/Alwatr/flux/compare/v4.0.1...v4.0.2) (2024-11-06)

### Bug Fixes

* honarvar bugs ([196b77b](https://github.com/Alwatr/flux/commit/196b77bcbb8e2a0b2eb03e50fa908561cada4fe7)) by @

## [4.0.1](https://github.com/Alwatr/flux/compare/v4.0.0...v4.0.1) (2024-11-06)

### Bug Fixes

* **fsm:** resetToInitialState logic and enhance logging in state transitions ([1e81527](https://github.com/Alwatr/flux/commit/1e81527501fe68e5194f9df059ebf41d1623558e)) by @

## [4.0.0](https://github.com/Alwatr/flux/compare/v3.2.2...v4.0.0) (2024-11-06)

### ⚠ BREAKING CHANGES

* **fsm:** all name of type ActionName in class `actionRecord_` changed
* **fsm:** event 'reset' fired on calling resetToInitialState and the first time in class constructor
* **fsm:** initialState remove from AlwatrFetchStateMachineConfig

### Bug Fixes

* **fsm:** remove initialState from AlwatrFetchStateMachineConfig ([fcb9541](https://github.com/Alwatr/flux/commit/fcb95411e55d75dbdd7ee296465919f660368799)) by @AliMD
* **fsm:** run postTransition__ in resetToInitialState_ and constructor ([00ca9c1](https://github.com/Alwatr/flux/commit/00ca9c156b4a75883bad3e7d1c8907d370fd2b71)) by @AliMD
* **observable:** add AlwatrLogger type to logger_ property ([f21b562](https://github.com/Alwatr/flux/commit/f21b562836a4817313dad6bca1122b6ff5edcbb1)) by @AliMD

### Code Refactoring

* **fsm:** update action naming conventions and enhance event handling in state transitions ([c3a4094](https://github.com/Alwatr/flux/commit/c3a40940c0a5dee11dbb0fbaaa45d811603e5ff7)) by @AliMD

### Dependencies update

* update ([a0c4014](https://github.com/Alwatr/flux/commit/a0c40144c50ba69083864bd4403b7c0dab388a2f)) by @AliMD

## [3.2.2](https://github.com/Alwatr/flux/compare/v3.2.1...v3.2.2) (2024-11-02)

### Dependencies update

* bump the github-actions group with 2 updates ([#223](https://github.com/Alwatr/flux/issues/223)) ([0d2bd7a](https://github.com/Alwatr/flux/commit/0d2bd7a17c023843a0cd27fe807ce4561c0379b6)) by @dependabot[bot]
* **deps-dev:** bump @types/node from 22.8.1 to 22.8.6 in the dependencies group ([#224](https://github.com/Alwatr/flux/issues/224)) ([2ffa758](https://github.com/Alwatr/flux/commit/2ffa7587f46b55bddc98be25c60940c3eb61f815)) by @dependabot[bot]
* **deps:** bump the alwatr group with 6 updates ([#225](https://github.com/Alwatr/flux/issues/225)) ([6f22eda](https://github.com/Alwatr/flux/commit/6f22eda4e9ee6c31e4c32b23b870a5c148a818da)) by @dependabot[bot]
* update ([2e39720](https://github.com/Alwatr/flux/commit/2e39720465f9ab441dd257f18d5fbe233fc02be0)) by @
* update dependabot configuration for commit message prefix and scheduling ([6123dcc](https://github.com/Alwatr/flux/commit/6123dcc96135dbddf78908b26a6c62691388cce5)) by @AliMD
* update VSCode extensions and settings for improved development experience ([9b03c57](https://github.com/Alwatr/flux/commit/9b03c577079565915bda259d8fd152a82892659c)) by @AliMD

## [3.2.1](https://github.com/Alwatr/flux/compare/v3.2.0...v3.2.1) (2024-10-28)

### Dependencies update

* bump the alwatr-dependencies group with 2 updates ([#217](https://github.com/Alwatr/flux/issues/217)) ([a5fd542](https://github.com/Alwatr/flux/commit/a5fd542e8866589a4edcaaf4312bdc4f322dc59f)) by @dependabot[bot]
* bump the development-dependencies group across 1 directory with 9 updates ([9d1d05d](https://github.com/Alwatr/flux/commit/9d1d05d33e259fd810138a37b36adc910b71c4bb)) by @dependabot[bot]
* bump the github-actions group across 1 directory with 4 updates ([#219](https://github.com/Alwatr/flux/issues/219)) ([a4d7ee4](https://github.com/Alwatr/flux/commit/a4d7ee4c74061840b1afa9ae6ba3125930479c9e)) by @dependabot[bot]
* update nanolib v1.4.0 with other deps ([8c0fdcd](https://github.com/Alwatr/flux/commit/8c0fdcd4a827790f7c97bfbf7119ba315450f822)) by @AliMD

## [3.2.0](https://github.com/Alwatr/flux/compare/v3.1.1...v3.2.0) (2024-10-11)

### Bug Fixes

* prevent `sideeffects` from `build` result ([fbc7a9f](https://github.com/Alwatr/flux/commit/fbc7a9f21898e3a96f28ce4a105460af0cf513eb)) by @mohammadhonarvar

### Code Refactoring

* update `import`s & packages based on the latest changes of `nanolib` ([b905288](https://github.com/Alwatr/flux/commit/b9052881b7549207c01b0eef92dc459d44b56ac0)) by @mohammadhonarvar

### Dependencies update

* **.yarn/sdk:** update ([13343dc](https://github.com/Alwatr/flux/commit/13343dc857953173eb2d773f37f6c87ff5d777a3)) by @mohammadhonarvar
* bump github/codeql-action in the github-actions group ([f150962](https://github.com/Alwatr/flux/commit/f150962053558cf431e8e037f3ee1d51fe004c14)) by @dependabot[bot]
* bump the alwatr-dependencies group across 1 directory with 7 updates ([daf1c3f](https://github.com/Alwatr/flux/commit/daf1c3f7ef8d17cf7388df2676b5fe808616ba57)) by @dependabot[bot]
* bump the alwatr-dependencies group with 4 updates ([7ce1b54](https://github.com/Alwatr/flux/commit/7ce1b54235cc2fd4f386052e7a4c4d324cc74888)) by @dependabot[bot]
* bump the alwatr-dependencies group with 8 updates ([bc520ba](https://github.com/Alwatr/flux/commit/bc520ba6ac7ed6bcff2c4a3eea81d1a2e502b0cf)) by @dependabot[bot]
* bump the development-dependencies group with 10 updates ([01de77c](https://github.com/Alwatr/flux/commit/01de77cd1d9fdfb6db06ebd5035c43e46cc8aa17)) by @dependabot[bot]
* bump the github-actions group with 3 updates ([eb91117](https://github.com/Alwatr/flux/commit/eb91117579c18580bdc721b57bf8d24d04dc1980)) by @dependabot[bot]
* update ([254de29](https://github.com/Alwatr/flux/commit/254de29b8d7f367c761f0358600ae0c85d14780e)) by @
* update ([4dc21b2](https://github.com/Alwatr/flux/commit/4dc21b2bf01d7176aea6e0d81cdc3e1f77b97e0f)) by @mohammadhonarvar
* update ([f8891e2](https://github.com/Alwatr/flux/commit/f8891e22d58335ba3acc7e75ddd4b6810c7c4e09)) by @mohammadhonarvar
* update ([be2b945](https://github.com/Alwatr/flux/commit/be2b9459d1b51621b5cf314c18cc512018c90ced)) by @mohammadhonarvar

## [3.1.1](https://github.com/Alwatr/flux/compare/v3.1.0...v3.1.1) (2024-09-29)

### Miscellaneous Chores

* change the license to AGPL-3.0 ([4bc3149](https://github.com/Alwatr/flux/commit/4bc3149cdafb9621ccceeb9e1a98f8c476ffba65)) by @ArmanAsadian
* **context:** change the license to AGPL-3.0 ([79e3212](https://github.com/Alwatr/flux/commit/79e32129b6477b3ad79157ed9002e725096b9bc2)) by @ArmanAsadian
* edited README ([fff9b3f](https://github.com/Alwatr/flux/commit/fff9b3f6ccc52e2257bdfe306e032ded07497b4a)) by @ArmanAsadian
* **fetch-state-machine:** change the license to AGPL-3.0 ([918ffae](https://github.com/Alwatr/flux/commit/918ffae1315c9432e930785cb27f3b48902655a1)) by @ArmanAsadian
* **fetch-state-machine:** change the license to AGPL-3.0 ([3ccfad4](https://github.com/Alwatr/flux/commit/3ccfad4642ed83d41dfa538f8e12b51b32104181)) by @ArmanAsadian
* **flux:** change the license to AGPL-3.0 ([220ef0c](https://github.com/Alwatr/flux/commit/220ef0ccb69310c28caafbc9f33d5b474bd12e3b)) by @ArmanAsadian
* **fsm:** change the license to AGPL-3.0 ([babc4a8](https://github.com/Alwatr/flux/commit/babc4a82bd0421981ec40c150f0de262f0f81f42)) by @ArmanAsadian
* **observable:** change the license to AGPL-3.0 ([1fefabc](https://github.com/Alwatr/flux/commit/1fefabc4136d5adae4731eec16f1515b6e9a568b)) by @ArmanAsadian
* **remote-context:** change the license to AGPL-3.0 ([23a238d](https://github.com/Alwatr/flux/commit/23a238d90164f76570f39abcd956731bae756697)) by @ArmanAsadian
* **signal:** change the license to AGPL-3.0 ([e077ff1](https://github.com/Alwatr/flux/commit/e077ff125521abcfb8795563a3f2a17e509e9ab6)) by @ArmanAsadian

### Dependencies update

* update ([fb148fd](https://github.com/Alwatr/flux/commit/fb148fdbe7f84acc3eda625e5e8c5773747d32e9)) by @

## [3.1.0](https://github.com/Alwatr/flux/compare/v3.0.3...v3.1.0) (2024-09-26)

### Features

* **fetch-state-machine:** add separate requestSuccess_ for overriding ([027226c](https://github.com/Alwatr/flux/commit/027226c376e1fb318dfd9d8133cac1da4d6f6fea)) by @AliMD
* **fsm:** Add resetToInitialState() method ([86b2479](https://github.com/Alwatr/flux/commit/86b2479c0319b33c8108dfd0319b2c444dc5f6de)) by @AliMD
* **remote-context:** public clean method ([138b782](https://github.com/Alwatr/flux/commit/138b782b7c6936745bfe48de9eb4641cebdf697a)) by @AliMD

### Code Refactoring

* **fetch-state-machine:** Rename requestSuccess_ method to requestSucceeded_ ([5d0ca73](https://github.com/Alwatr/flux/commit/5d0ca73f223536676b80c34cdbb3138177b9f16f)) by @AliMD
* **fetch-state-machine:** Rename requestSuccess_ method to requestSucceeded_ ([885a8bc](https://github.com/Alwatr/flux/commit/885a8bc61a3ac3402456f93163abcd1b9bc0a17c)) by @AliMD
* **fetch-state-machine:** Rename reset method to clean in fetch-state-machine and jfsm packages ([ab20b4f](https://github.com/Alwatr/flux/commit/ab20b4feff002c2b7a88e0897058aad0a8a52115)) by @AliMD
* **fetch-state-machine:** Rename resetToInitialState_ method to clean_ ([7ffc764](https://github.com/Alwatr/flux/commit/7ffc76487444e1b4b6d746d467118e383942852e)) by @AliMD
* **fetch-state-machine:** Rename resetToInitialState_ method to clean_ ([8e31471](https://github.com/Alwatr/flux/commit/8e31471423dc92dc920ac21bed72f834d3b36810)) by @AliMD
* **fetch-state-machine:** Rename resetToInitialState_ method to clean_ ([05bb40d](https://github.com/Alwatr/flux/commit/05bb40d6005664f02bae738edf3f140fb32aeacd)) by @AliMD
* **remote-context:** Clean up context cleanup logic ([9ee9a31](https://github.com/Alwatr/flux/commit/9ee9a317ab7cd06418765e90c86c9d6b951901ab)) by @AliMD
* **remote-context:** simplify context update logic ([627b4ef](https://github.com/Alwatr/flux/commit/627b4efde45bd3a3b69eaf4d70957922c5feccec)) by @AliMD
* update action names in fetch-state-machine and fsm packages and remove `_` prefix ([a90d959](https://github.com/Alwatr/flux/commit/a90d95921b322a288c4a60671ce90ff9fe709c00)) by @AliMD

### Miscellaneous Chores

* **fetch-state-machine:** review ([207153a](https://github.com/Alwatr/flux/commit/207153af59e93e34464137e31d798d21d467aa2a)) by @AliMD

### Dependencies update

* bump @types/node in the development-dependencies group ([979223c](https://github.com/Alwatr/flux/commit/979223c3cdbb002a926e72e1a7f79c82ff7395d4)) by @dependabot[bot]
* bump the github-actions group with 3 updates ([0e4eb78](https://github.com/Alwatr/flux/commit/0e4eb78642f2948faeea0fa04ea821c7b45e1db0)) by @dependabot[bot]
* update ([857ba97](https://github.com/Alwatr/flux/commit/857ba97bf64469996ad67b3342852c19599e68d2)) by @AliMD

## [3.0.3](https://github.com/Alwatr/flux/compare/v3.0.2...v3.0.3) (2024-09-24)

### Miscellaneous Chores

* change the license to AGPL-3.0 ([8a10663](https://github.com/Alwatr/flux/commit/8a10663ae01f7f215288c6bebd8332329fe7ab12)) by @

## [3.0.2](https://github.com/Alwatr/flux/compare/v3.0.1...v3.0.2) (2024-09-21)

### Miscellaneous Chores

* update readme ([85fd5d9](https://github.com/Alwatr/flux/commit/85fd5d9acceaa84c6f38765d3f5e45d7b0733698)) by @AliMD

### Dependencies update

* update ([1048410](https://github.com/Alwatr/flux/commit/1048410efb300bb0a0ab7eae9734ca8f7f9d83a8)) by @

## [3.0.1](https://github.com/Alwatr/flux/compare/v3.0.0...v3.0.1) (2024-09-17)

### Code Refactoring

* Add logging for dispatch__ method in AlwatrObservable ([7ab84b6](https://github.com/Alwatr/flux/commit/7ab84b69ecd8c37bcea308fccd9a2e13ef64c842)) by @

### Miscellaneous Chores

* simple demo test ([43f9bee](https://github.com/Alwatr/flux/commit/43f9bee831d5ba4534fa80c7ff4c28f6ca65cd91)) by @

## 3.0.0 (2024-09-17)

### ⚠ BREAKING CHANGES

* **server-request:** all api properties and methods name changed
* **server-request:** all api properties and methods name changed
* **fsm:** FiniteStateMachineBase state property renamed to message data structure
* **signal2:** AlwatrObservable
* **core/crypto:** rename `token` to `crypto`
* **fsm:** new defineConstructorSignals, defineInstanceSignals
* **fsm:** export fsm main api
* **fsm:** final review
* **fsm:** finiteStateMachineConsumer
* **fsm:** render
* **fsm:** defineSignals
* **fsm:** subscribeSignals
* **fsm:** initFsmInstance
* **fsm:** _execAction
* **fsm:** _execAllActions
* **fsm:** defineActions
* **fsm:** transition
* **fsm:** setContext
* **fsm:** getContext
* **fsm:** getState
* **fsm:** _getFsmConstructor
* **fsm:** _getFsmInstance
* **fsm:** defineConstructor
* **fsm:** new core
* **fsm:** remove old apis
* **fsm:** add state prop and remove gotState
* **signal:** change subscribe default receivePrevious to NextCycle
* **signal:** new core interface
* **signal:** core libs
* **signal:** clear old api
* **form-registering:** rename service

### Features

* **.github:** add form service to publish container ([a42accc](https://github.com/Alwatr/flux/commit/a42accc9a6733ee7f17f381a94d0ea9797f8d598)) by @
* **.github:** copy config from alwatr! ([9744ef8](https://github.com/Alwatr/flux/commit/9744ef8eb998cdc6c6b42d18f21b87d322c66cd3)) by @
* **.prettierrc:** add `prettier-plugin-tailwindcss` ([26fdb04](https://github.com/Alwatr/flux/commit/26fdb04397757d397c5f6933fdfc2c22943f489f)) by @
* **.vscode:** extension recommendation ([70de504](https://github.com/Alwatr/flux/commit/70de504b3799da1d57ade2fc69760c92dbfefc99)) by @
* **`alwatr-icon`:** icon component ([ddb7180](https://github.com/Alwatr/flux/commit/ddb7180727b5086f063f5b4a0a541128dcbed2cd)) by @
* **`demo`:** improve icon demo ([9bfa525](https://github.com/Alwatr/flux/commit/9bfa525bff92ea537ef3bb6c5be0a617a4eb35d0)) by @
* add .editorconfig file ([26cac41](https://github.com/Alwatr/flux/commit/26cac41cc2bfe0114f5f8b21726123f845a33a9d)) by @
* Add @alwatr/fetch-state-machine package ([03e3a62](https://github.com/Alwatr/flux/commit/03e3a62a1f60a4e6fdc9e4979f015d3cc3f474ea)) by @AliMD
* Add @alwatr/observable package ([e554c91](https://github.com/Alwatr/flux/commit/e554c91e8d3bf59a853e1a08692f3fa730194616)) by @AliMD
* Add Alwatr Flux package ([22c59e3](https://github.com/Alwatr/flux/commit/22c59e34aeda7a2d59654d59ec38354a124fedad)) by @
* add alwatr rsa key ([06da270](https://github.com/Alwatr/flux/commit/06da2708d3b30a4c8d43448bb56739f602a10dae)) by @
* add chrome-profile to gitignore ([a827e0e](https://github.com/Alwatr/flux/commit/a827e0efa9254c68c78052ee3cff6f7a9a4998f1)) by @
* add config.yml ([86a6e8a](https://github.com/Alwatr/flux/commit/86a6e8abf1dd7ba0e18c862d659af72444131a83)) by @
* add eslint configuration ([d1a974f](https://github.com/Alwatr/flux/commit/d1a974fa2227c77972bbf66f9ca30c654e4852a0)) by @
* add math demo ([36d074e](https://github.com/Alwatr/flux/commit/36d074e8103ba4f71868efde681580f8c6034ecd)) by @
* add new workflows ([49152e1](https://github.com/Alwatr/flux/commit/49152e14f24fcac2a3f96c641b079d89f6df18d3)) by @
* Alwatr Finite State Machines ([3ed108f](https://github.com/Alwatr/flux/commit/3ed108f1fba19cd9ff6f6de9efc973af9aba5520)) by @
* **alwatr-icon:** improve ([521319c](https://github.com/Alwatr/flux/commit/521319c1c61d25ef7b33a41e32496c4d819801e5)) by @
* **api-request:** base on server-request ([32e663b](https://github.com/Alwatr/flux/commit/32e663b648413bc49a92d8de94f0caf132b7b69a)) by @
* **bench:** improve bench mark logs ([9865ebb](https://github.com/Alwatr/flux/commit/9865ebb3fbb769f76d959046ddcbad70f188dcd2)) by @
* **bench:** test logger benchmark impact ([beaa258](https://github.com/Alwatr/flux/commit/beaa25842ee810d1ec93557ee6cfaa32c575c9c7)) by @
* **bench:** test object vs map ([9b88716](https://github.com/Alwatr/flux/commit/9b88716026fbb04f466883cd4b576fc48cd9a819)) by @
* bew package @alwatr/context ([9ee2204](https://github.com/Alwatr/flux/commit/9ee220484fd99654d1303851c2e03f2bd0b308a3)) by @AliMD
* build demo ([4f78403](https://github.com/Alwatr/flux/commit/4f7840389f8bcca87426842b38e26ba0c0f61b2b)) by @
* build index ([7ba1338](https://github.com/Alwatr/flux/commit/7ba13381dd1d86b494ec8b1ef6de15d94d76f287)) by @
* **build:** configurations ([12fd506](https://github.com/Alwatr/flux/commit/12fd506b59f886b01768f13a6de24c49b81dd4c2)) by @
* **classic-cloud:** new deployment ([8c1f0c8](https://github.com/Alwatr/flux/commit/8c1f0c81e966f536d0cc99ee7be568e98f03ecb3)) by @
* **classic-cloud:** static file serve and review deploy ([d71a05a](https://github.com/Alwatr/flux/commit/d71a05a57de2ac06401fde9d57783f96f2129fe1)) by @
* **cloud/container:** clone adminer image o ghcr ([6dd4edf](https://github.com/Alwatr/flux/commit/6dd4edf5fd4ee1f881d11c3e0ec82b35d2a5b4d0)) by @
* **cloud/container:** clone mariadb image to ghcr ([6a30c84](https://github.com/Alwatr/flux/commit/6a30c846437ca3052eb760eabe6ea53c2607ce82)) by @
* **cloud/container:** clone traefik image o ghcr ([4f80767](https://github.com/Alwatr/flux/commit/4f807675316e92c04a87c52b96ca919c04501f5e)) by @
* **cloud:** clone php image to ghcr ([1bef57a](https://github.com/Alwatr/flux/commit/1bef57abe0309143fefffaa314a50f214e0a363a)) by @
* **cloud:** clone wordpress image to ghcr ([fe6edbb](https://github.com/Alwatr/flux/commit/fe6edbb149eea1f4a837e2c71431b578054979b7)) by @
* **com-api:** demo user ([d13b5b4](https://github.com/Alwatr/flux/commit/d13b5b44be6058dd3bb5298e29559adaf80e4468)) by @
* **com-api:** refactor storage path and auth ([c7cf27d](https://github.com/Alwatr/flux/commit/c7cf27dfce03f85f91ba5199d7e3abdafd776d4a)) by @
* **com-pwa/sign-in:**  use simple hash for phoneNumber ([892eb7a](https://github.com/Alwatr/flux/commit/892eb7a911d0a5cbeee18d5b39206f3a63aaa95b)) by @
* **com-pwa:** Customer Order Management PWA ([d2d8630](https://github.com/Alwatr/flux/commit/d2d8630d016a124f050f3494b17f162f3c012f45)) by @
* **com-pwa:** submitting, submitSuccess, submitFailed state ([de8ca7d](https://github.com/Alwatr/flux/commit/de8ca7d2dc647afc4ff485e4445d6e6897fa9237)) by @
* **container:** alpine with CI deploy workflow ([51324e0](https://github.com/Alwatr/flux/commit/51324e0154b175dd4fda5fa4b45b37ba330d82d9)) by @
* **container:** tdlib! ([d3c4fb4](https://github.com/Alwatr/flux/commit/d3c4fb438d9061cc31451bd92fb1b58cf365d501)) by @
* **context:** add `requestIfNotComplete` ([31c8d61](https://github.com/Alwatr/flux/commit/31c8d61a0950047bf8541bb243f2e8761f870e78)) by @
* **context:** awesome server context ([93ecadf](https://github.com/Alwatr/flux/commit/93ecadf058cf996279f49f0f859a30e1b641599e)) by @
* **context:** new package ([f11758a](https://github.com/Alwatr/flux/commit/f11758adeba5c8fd509ad7f0ab1687634e216d64)) by @
* **context:** simple context api ([123899c](https://github.com/Alwatr/flux/commit/123899c531ad428568dd0cd3a5fbee699469851a)) by @
* **core/type:** make package ([5023d5c](https://github.com/Alwatr/flux/commit/5023d5c1400ae4658262e72bd3ef221c0ab2a1da)) by @
* **crypto/hash:** new crc length strategy ([0ef2420](https://github.com/Alwatr/flux/commit/0ef242090ed3f09f1f483d4b08c8eecd95abcff2)) by @
* **crypto:** add `user factory` demo ([2b82df5](https://github.com/Alwatr/flux/commit/2b82df5045fc3288c797fea83badeff7d1a6bc07)) by @
* demo html ([40cfbdf](https://github.com/Alwatr/flux/commit/40cfbdf774dfac8c719a5703abdf07717cba1ee8)) by @
* **demo-pwa:** add postcss and tailwind to esbuild ([8eca7ff](https://github.com/Alwatr/flux/commit/8eca7ff2b3059a2005efa69edc6a62d482ec57a1)) by @
* **demo-pwa:** build service worker on build proccess ([d3bbe8a](https://github.com/Alwatr/flux/commit/d3bbe8a2df86995d32d5f046fcf1629e3ab1564f)) by @
* **demo/crypto:** random ([8c5a613](https://github.com/Alwatr/flux/commit/8c5a61349c6418690b667cec8b32959bcd088c8f)) by @
* **demo/data-storage:** init demo ([6373254](https://github.com/Alwatr/flux/commit/6373254ab8d1ae4d1f79ec85c4cefe5170cf8d1d)) by @
* **demo/fsm2:** rewrite with abstract for base class ([beee9a2](https://github.com/Alwatr/flux/commit/beee9a2e67f9db4cace3cb2eee6518f112a18db2)) by @
* **demo/fsm:** new demo for state machine ([69e4661](https://github.com/Alwatr/flux/commit/69e4661c25a45437e3671ae591d1a6ef9291e4d7)) by @
* **demo/fsm:** update ([c068a04](https://github.com/Alwatr/flux/commit/c068a0489992eafd7cd4d276485faee19eefb0ac)) by @
* **demo/fsm:** update with new api ([5edd3c9](https://github.com/Alwatr/flux/commit/5edd3c9af7d41e967db1bfdd3a8e370b03040ab7)) by @
* **demo/i18n:** relativeTime ([fd9a698](https://github.com/Alwatr/flux/commit/fd9a698854127cc247b6ffb49358b88d955487bc)) by @
* **demo/i18n:** test loading ([6aa8d97](https://github.com/Alwatr/flux/commit/6aa8d97dd79ac34972c9b03c0ab0984ab7e52698)) by @
* **demo/router:** enhance demo ([f9f0338](https://github.com/Alwatr/flux/commit/f9f033893f22fd53ba250dd2d8ea7edad7f7a485)) by @
* **demo/signal2:** add context example ([57bd783](https://github.com/Alwatr/flux/commit/57bd7835fdff1e043f29f64578a47be0ded71cd3)) by @
* **demo/signal2:** add demo ([109a8c1](https://github.com/Alwatr/flux/commit/109a8c13b026dea397556ac048cce6d85bfccb77)) by @
* **demo/signal2:** simple signal ([8597c7e](https://github.com/Alwatr/flux/commit/8597c7e8981280f89063f00ada10381e74145dc3)) by @
* **demo:** add `i18n` ([1775906](https://github.com/Alwatr/flux/commit/1775906d156ba36514472062ac2e5c7fe7ab66fe)) by @
* **demo:** add `router2` ([a101328](https://github.com/Alwatr/flux/commit/a101328a596f27a3bf76ee3f00a8c320c68f0087)) by @
* **demo:** add `server-context` demo ([40339a7](https://github.com/Alwatr/flux/commit/40339a73f13aac026fc08dfce3164f0327d13688)) by @
* **demo:** add error and force sample ([4403703](https://github.com/Alwatr/flux/commit/4403703c1f0e8c2eb0020ff7a67ef669203b0e7c)) by @
* **demo:** add font demo ([e2c383c](https://github.com/Alwatr/flux/commit/e2c383c382788d90c32e1a79913ff327541b7ace)) by @
* **demo:** add vatr logger demo ([cece668](https://github.com/Alwatr/flux/commit/cece66889cae0e573836a17578e09fe6a0ded042)) by @
* **demo:** crypto hash ([159a7f6](https://github.com/Alwatr/flux/commit/159a7f675d91b7fc4584fa81b41f2bdb0e9a0e26)) by @
* **demo:** dynamic icon demo ([7c8acc8](https://github.com/Alwatr/flux/commit/7c8acc8c069a91ac6526968d839b3f0af7cdfe83)) by @
* **demo:** fetch ([3f0cc84](https://github.com/Alwatr/flux/commit/3f0cc8404f47c0ceb6f54a5de225c05be68cc4e6)) by @
* **demo:** fetch revalidateCallback ([cbd7112](https://github.com/Alwatr/flux/commit/cbd7112cd089a8329da3e7bb9b93e333cba96511)) by @
* **demo:** font ([2a4fa4e](https://github.com/Alwatr/flux/commit/2a4fa4e74b98d149d5320d2985ec88d26b579799)) by @
* **demo:** forAll storage-client ([2470ca6](https://github.com/Alwatr/flux/commit/2470ca682783e5df6e8dadf09a97e7b9cf188fba)) by @
* **demo:** fsm light machine ([370adaf](https://github.com/Alwatr/flux/commit/370adafbdf1d691f1a965af8cca7b591ce376699)) by @
* **demo:** improve demo dark mode ([2a80a5f](https://github.com/Alwatr/flux/commit/2a80a5ff2e4f98cc60d8e3111815221b67cea57a)) by @
* **demo:** new `fsm` ([6897c0c](https://github.com/Alwatr/flux/commit/6897c0c4d2c52e30ef914d0ea4ea7dd4cd11dd82)) by @
* **demo:** router outlet demo ([9782b74](https://github.com/Alwatr/flux/commit/9782b74fb3572e685386528e4c60382e3fdbc8eb)) by @
* **demo:** seprate fonts ([8025361](https://github.com/Alwatr/flux/commit/80253618c691e2a260be0caa1a19c2db2a34bff3)) by @
* **demo:** storage-client ([c6abf1c](https://github.com/Alwatr/flux/commit/c6abf1c9bfe40aaf19ee6944f7be9e456892396c)) by @
* **demo:** vatr logger demo ([900010f](https://github.com/Alwatr/flux/commit/900010f02b2ef6f9bffd1c18b1910df43a18a1c8)) by @
* **deploy:** add another script for simpler usage ([78d06f9](https://github.com/Alwatr/flux/commit/78d06f9f180abb8b2c99ba2af514132283d55bc5)) by @
* **dev-server:** debug mode ([c20562e](https://github.com/Alwatr/flux/commit/c20562ebad9532b9300b55e016a1796207870b61)) by @
* **dev-server:** debug mode ([262f962](https://github.com/Alwatr/flux/commit/262f962dd4c89568d6081ec3b3d413c8168ae149)) by @
* **director:** job providers ([9fce537](https://github.com/Alwatr/flux/commit/9fce5373452c91cb5b618e76230b7e9d684b914b)) by @
* **element:** add to tsconfig ([410a1f7](https://github.com/Alwatr/flux/commit/410a1f750978a4d57bee0c8b7b716e265343b13e)) by @
* **element:** LoggerMixin ([ff3fa85](https://github.com/Alwatr/flux/commit/ff3fa85f14b24b655f0e7d11161aedc9f4e82070)) by @
* es bench ([2a6318e](https://github.com/Alwatr/flux/commit/2a6318ef0d674875aa8b9ee593a7ae8072ea3461)) by @
* **es-bench:** compare `bind` vs `class` ([d5dd6ff](https://github.com/Alwatr/flux/commit/d5dd6ff4dcf875612b97d155bf9233434e719e28)) by @
* **es-bench:** compare bench ([1c9ecc2](https://github.com/Alwatr/flux/commit/1c9ecc2bddb6cf72cf051c703adbeffc0ddd3cbf)) by @
* **es-bench:** date locale ([7a5a58c](https://github.com/Alwatr/flux/commit/7a5a58c8ee7022babda5076876802a969abb2de7)) by @
* **es-bench:** enhance with optional count and warning ([4fd2d51](https://github.com/Alwatr/flux/commit/4fd2d519715f673b9f89a7e340a1f8bc2cf48565)) by @
* **es-bench:** new bench model ([daa1c7a](https://github.com/Alwatr/flux/commit/daa1c7a75d3ca6eaeb8f492e2d4ba6ce1e3bdc6a)) by @
* **es-bench:** test flatStr ([3d742e7](https://github.com/Alwatr/flux/commit/3d742e7f300161a392e79f55df0f71822a67855f)) by @
* **es-bench:** test node exist methods ([b1d758b](https://github.com/Alwatr/flux/commit/b1d758b4c1330ac0b4d566ca85632ac26bf9bef4)) by @
* **es-bench:** worker ([d92d09a](https://github.com/Alwatr/flux/commit/d92d09a3cd1e43da5549c39241133dfea50c567a)) by @
* **eslint:** configurations ([bb0a02b](https://github.com/Alwatr/flux/commit/bb0a02ba450963abac1767d17c88f14153f59605)) by @
* **eslint:** update config ([32023a6](https://github.com/Alwatr/flux/commit/32023a67b386ce3ffaa3d8d9644d48587809d6e1)) by @
* **fetch-state-machine:** Add AlwatrJsonFetchStateMachine class ([6cd7fd4](https://github.com/Alwatr/flux/commit/6cd7fd4ce82d1683631a0f447785600782f0f60d)) by @AliMD
* **fetch-state-machine:** Add AlwatrJsonFetchStateMachineBase class ([9560379](https://github.com/Alwatr/flux/commit/95603798e2fbd85bea9fb33d26f5009b7be1dc9a)) by @AliMD
* **fetch:** cache strategy ([7c112d2](https://github.com/Alwatr/flux/commit/7c112d2b43d30a3d1191676532c5164b4ea74a72)) by @
* **fetch:** cache strategy demo ([e60e865](https://github.com/Alwatr/flux/commit/e60e865fbc06e338dfee9fd94b3c46f8b3917523)) by @
* **fetch:** docs & pattern ([8e5330d](https://github.com/Alwatr/flux/commit/8e5330de2b965a0178c7d38da126b5168547a00f)) by @
* **fetch:** improve demo ([a2628de](https://github.com/Alwatr/flux/commit/a2628de58cb6e0480b863b098608a51ffe02e96e)) by @
* **fetch:** new enhanced fetch package ([15a9330](https://github.com/Alwatr/flux/commit/15a93301e036c970ea285836b0cb73862eeb657c)) by @
* **fetch:** support nodejs ([37ea2c0](https://github.com/Alwatr/flux/commit/37ea2c04193f5039036e94dee531d2e327ccc4ed)) by @
* **fetch:** update demo ([03e52be](https://github.com/Alwatr/flux/commit/03e52be46be18ab60881351956c3cf255d4eadfc)) by @
* **file-storage:** json ([7fb6a67](https://github.com/Alwatr/flux/commit/7fb6a671191f76ee108df2514b2d8ab8f884e0e2)) by @
* **fms:** complete new FSM api base on signal! ([61999eb](https://github.com/Alwatr/flux/commit/61999ebf06d31383a605fdea8e495cdd07f32a87)) by @
* **font:** define fonts, the wight way! ([9d14271](https://github.com/Alwatr/flux/commit/9d14271bc3ffa32f912e47d33ef46cc6cabb21af)) by @
* **font:** demo for sahel ([7926ad3](https://github.com/Alwatr/flux/commit/7926ad30ae42b0938651a3948edbe70f56bdba3b)) by @
* **fract:** elegant simple render strategy powered by lit written in tiny TypeScript module for who hate react! ([e14514a](https://github.com/Alwatr/flux/commit/e14514a27cab7ab3a26b4e1c49280c0fe244183d)) by @
* **fsm:** _execAction ([d7aa5b2](https://github.com/Alwatr/flux/commit/d7aa5b2716166a6414e2d4571eb329f760e4a48d)) by @
* **fsm:** _execAllActions ([a1a2a58](https://github.com/Alwatr/flux/commit/a1a2a58c109f18dedb695121bfe0a71fb387b4d7)) by @
* **fsm:** _getFsmConstructor ([3677f5f](https://github.com/Alwatr/flux/commit/3677f5f92c60c8da3ef8c6a8fc9d1089af7879f1)) by @
* **fsm:** _getFsmInstance ([6015000](https://github.com/Alwatr/flux/commit/60150008b98308b8dcd592b7579cfb6e869d2dbf)) by @
* **fsm:** $all and $self state ([16ce892](https://github.com/Alwatr/flux/commit/16ce8926511907d210842461f5f40b9b1fded42c)) by @
* **fsm2:** base class ([79d658a](https://github.com/Alwatr/flux/commit/79d658a39c529a01c90903523335178c6fdb25d0)) by @
* **fsm2:** review and cleanup ([0e7a32b](https://github.com/Alwatr/flux/commit/0e7a32b12ae43f899c5e6cfb2e535740a2c855e2)) by @
* **fsm2:** rewrite from scratch. ([2509e4a](https://github.com/Alwatr/flux/commit/2509e4ad086bbf3b037c7cb1da2bd1a9732318f7)) by @
* **fsm2:** simple FiniteStateMachine and base ([acdd884](https://github.com/Alwatr/flux/commit/acdd884dd9721a505b340bad7a912012b2d4d3e7)) by @
* **fsm2:** StateRecord conf ([fd3343b](https://github.com/Alwatr/flux/commit/fd3343b953e23e43eda71e16a672a30121f19420)) by @
* **fsm2:** update demo ([7f19437](https://github.com/Alwatr/flux/commit/7f1943792f28dfa2c85cd7cd3a3c3a39d5ceb373)) by @
* **fsm2:** use abstract for base class ([948ec30](https://github.com/Alwatr/flux/commit/948ec30247fe72d3679e7b3c04c9d98c7605b3e5)) by @
* **fsm:** add `signalRecord` to config ([255200b](https://github.com/Alwatr/flux/commit/255200b350b3ea13c60a7a66ef6de4a2a9efbdf9)) by @
* **fsm:** add unsubscribe ([3820ef3](https://github.com/Alwatr/flux/commit/3820ef3a5a03f9c18db92948e04ebb2bc692818e)) by @
* **fsm:** callback in provider signals ([b1a71bc](https://github.com/Alwatr/flux/commit/b1a71bc141788c570fbb5042e84abcee5db7a978)) by @
* **fsm:** custom signal callback ([1769dce](https://github.com/Alwatr/flux/commit/1769dcefc61fc2f75744e90a6d23c10b55ed8493)) by @
* **fsm:** defineActions ([1938a53](https://github.com/Alwatr/flux/commit/1938a531baa376c4004c021fd52485c8718d7a9b)) by @
* **fsm:** defineConstructor ([6f0763d](https://github.com/Alwatr/flux/commit/6f0763d1edf91ee12b375cbfe2b53db5bbbced58)) by @
* **fsm:** defineSignals ([3c17c70](https://github.com/Alwatr/flux/commit/3c17c7051f49f67d6d34bfb9cb7c8e7b0a4dce24)) by @
* **fsm:** destroy and expire api ([7cb7185](https://github.com/Alwatr/flux/commit/7cb7185654e72465ba5d50b35b942b762f8d60d6)) by @
* **fsm:** enhance types ([4da8427](https://github.com/Alwatr/flux/commit/4da842778230a7c65b6a529764b2baf9446f7489)) by @
* **fsm:** export fsm main api ([8ed8736](https://github.com/Alwatr/flux/commit/8ed8736be6ff59a7ef2841b3a96e554c3a38579d)) by @
* **fsm:** finiteStateMachineConsumer ([5e12fe8](https://github.com/Alwatr/flux/commit/5e12fe857d7b420fc0aaf870daa9f424a5fc4453)) by @
* **fsm:** getContext ([5081bfe](https://github.com/Alwatr/flux/commit/5081bfe3f043cf8dcd02160caab408224de5dba2)) by @
* **fsm:** getState ([613634b](https://github.com/Alwatr/flux/commit/613634bec338d4a26cce5c3e7bfef511cf5c6d7a)) by @
* **fsm:** initFsmInstance ([0e8260a](https://github.com/Alwatr/flux/commit/0e8260abd2184b21b05eb1991214f0bc0e30fe8c)) by @
* **fsm:** make simple state machine ([b8cb33d](https://github.com/Alwatr/flux/commit/b8cb33de0644fc03016acc985872661ff7f8f7fc)) by @
* **fsm:** new core ([73255f8](https://github.com/Alwatr/flux/commit/73255f85c8de537f7dde958f876ac2eef80b1f85)) by @
* **fsm:** new defineConstructorSignals, defineInstanceSignals ([fa45b45](https://github.com/Alwatr/flux/commit/fa45b45cf534e8c9ba1d1e46b2cd596b29336a34)) by @
* **fsm:** new state context type with {to, from, by} ([05435d0](https://github.com/Alwatr/flux/commit/05435d0af1afa77013cd524c2d519dec48492a81)) by @
* **fsm:** new types ([3e08ba7](https://github.com/Alwatr/flux/commit/3e08ba724bb1e0385cb5779a10a80c3fab5dde23)) by @
* **fsm:** render ([88aaa55](https://github.com/Alwatr/flux/commit/88aaa55a103af6a904a3dd7accb2d3f57c60cada)) by @
* **fsm:** rewrite state machine ([c8d91eb](https://github.com/Alwatr/flux/commit/c8d91ebe53a02062e1220652fd5ce4722c1cb83f)) by @
* **fsm:** rewrite with signal power ([73fd681](https://github.com/Alwatr/flux/commit/73fd681457c59b6ae37f2b4daebab3e20b4dab89)) by @
* **fsm:** setContext ([0c21a3e](https://github.com/Alwatr/flux/commit/0c21a3ee6b81a16c1f094a02d9ea17de2c43f476)) by @
* **fsm:** share state events ([aa3ae47](https://github.com/Alwatr/flux/commit/aa3ae4750e87f1a2773784ba3c99427c2830324c)) by @
* **fsm:** subscribe ([d224072](https://github.com/Alwatr/flux/commit/d2240723c5fb3ee843c5bbdde905f47ccd1bef20)) by @
* **fsm:** subscribeSignals ([2d9b07e](https://github.com/Alwatr/flux/commit/2d9b07e20d60b45dcd2f195a71800e81dafac6cb)) by @
* **fsm:** transition ([81396af](https://github.com/Alwatr/flux/commit/81396afc03c480e4937183d36665ac2193c1366d)) by @
* **fsm:** transition with partial context set ([fd476ff](https://github.com/Alwatr/flux/commit/fd476ff06d2a72c3b381ec567b8dcf9fa0a12e3d)) by @
* **i18n2:** add `i18n2` class base ([bf1bec4](https://github.com/Alwatr/flux/commit/bf1bec499bb1010994e46c457a50413b9c84d9bc)) by @
* **i18n:** add replaceNumber and auto detect setLocale from html ([93d46a5](https://github.com/Alwatr/flux/commit/93d46a51d23ae5d259a7fa0a2fd5d25f1d2f9086)) by @
* **i18n:** start new package for i18n/l10n ([bc719d0](https://github.com/Alwatr/flux/commit/bc719d0dd25b100377126c953126b00a615c3652)) by @
* **icon2:** a lit `directive` to show the icons ([584cc8e](https://github.com/Alwatr/flux/commit/584cc8e7a7040edde751c0e70e36f1589788ac84)) by @
* **icon:** refactor and improve ([62b57a1](https://github.com/Alwatr/flux/commit/62b57a19def8a152db9a21f54f3c94d258979d6e)) by @
* improve error debugging ([35b6e2d](https://github.com/Alwatr/flux/commit/35b6e2d10519988bc70ec78e85cd5bb0fedc1dbe)) by @
* **issue-template:** bug report and feqture request form template ([51d1642](https://github.com/Alwatr/flux/commit/51d164224c38a83f568dc8fc816846bdcf3274ef)) by @
* **jatabase:** demo ([83eb9ef](https://github.com/Alwatr/flux/commit/83eb9ef8174af6332fa8678cd7c48e9ab8a5cd09)) by @
* **keep:** base pwa ([c0c27b7](https://github.com/Alwatr/flux/commit/c0c27b705a811b8d791e5c67e1bd5a92ad575a58)) by @
* labs refrences and workspace ([076e0d5](https://github.com/Alwatr/flux/commit/076e0d5986bbac92530afd7a9fa49b5190a821e4)) by @
* **lerna:** migrate to 7 ([3d9e3b7](https://github.com/Alwatr/flux/commit/3d9e3b72323963e340eb04c2dad5075907dffaa8)) by @
* **logger:** add logProperty, logMethodFull ([f826985](https://github.com/Alwatr/flux/commit/f82698521b30054d8d1df2ed76ecaec8675ac67f)) by @
* **logger:** complete refactor the logger with new API and fix show correct line number ([78a5f83](https://github.com/Alwatr/flux/commit/78a5f83fde3ae0a06baf4a68de342b08f04f6dd4)) by @
* **logger:** node coloring support ([b67e318](https://github.com/Alwatr/flux/commit/b67e3182463db630380d19886e47ae412d9611fe)) by @
* **logger:** vatr logger package ([d9724a5](https://github.com/Alwatr/flux/commit/d9724a596f9a5a1aa5da1854c44ed4fcee4ae040)) by @
* **math:** getDeviceUuid ([5790b33](https://github.com/Alwatr/flux/commit/5790b3358a4059f0db038382c36090eb72139236)) by @
* **math:** rename deviceId to clientId ([a326f7c](https://github.com/Alwatr/flux/commit/a326f7c1112cf3cbb7e00d36e284cdc1e6c33e59)) by @
* **Math:** translateUnicodeDigits ([e522074](https://github.com/Alwatr/flux/commit/e522074dd49d7ffeaece125a32356d99d603815f)) by @
* **micro-server:** make new package ([7a952bd](https://github.com/Alwatr/flux/commit/7a952bddc1f5e2582ada9284ff0ce1ddf98c23c6)) by @
* new build process ([635e798](https://github.com/Alwatr/flux/commit/635e798f3f74f52199af2fa84fb5771a130e46fd)) by @
* new package for AlwatrRemoteContextStateMachine ([bffd7d8](https://github.com/Alwatr/flux/commit/bffd7d81c104c0ed56e4b12ce9d1d0dcfe2f38ec)) by @AliMD
* new ui design system ([fa6e1ca](https://github.com/Alwatr/flux/commit/fa6e1ca0c77f0451ebf386a9e2b73083a99caf62)) by @
* **nginx:** review and rearrange conf folders ([bc1692d](https://github.com/Alwatr/flux/commit/bc1692dfb5b25c64a77dce2be0f38be4c207adf6)) by @
* **nginx:** update to 1.1.0 ([0b11afb](https://github.com/Alwatr/flux/commit/0b11afb4a0164b857550467e4860c8637fb80cfb)) by @
* **nginx:** update version to 1.24 ([c4a20f4](https://github.com/Alwatr/flux/commit/c4a20f49c010f839c17bac360d990b1f410fc059)) by @
* **nginx:** upgrade to v1.9.0-1.25-alpine ([e5b87b0](https://github.com/Alwatr/flux/commit/e5b87b026a9c281e043abbada973fa7eb39a0f48)) by @
* **nocodb:** use internal image ([77b3628](https://github.com/Alwatr/flux/commit/77b3628d075767afd7a89667c2385cb1d6f36911)) by @
* **notify:** new package ([f9ef1e5](https://github.com/Alwatr/flux/commit/f9ef1e5b420ce38ea65486fe98d820096e32161a)) by @
* **package:** add pwa ([b1c8872](https://github.com/Alwatr/flux/commit/b1c8872e7e95e49c0913efb01b2e4b55b5d33439)) by @
* **package:** pull push script ([a4ac3d0](https://github.com/Alwatr/flux/commit/a4ac3d091786313fae8494df4a89ef68c035ca0f)) by @
* **playground:** base package ([32bb1f4](https://github.com/Alwatr/flux/commit/32bb1f457c26f6680394383cf45939b73e5a1dd1)) by @
* **playground:** remove postcss-copy ([d965773](https://github.com/Alwatr/flux/commit/d96577346a404070d939d964bf30f36921c88bc4)) by @
* prettier config ([bb1cb83](https://github.com/Alwatr/flux/commit/bb1cb83c2087dcdae929f4898ca59a3964baa7c5)) by @
* **publish-alwatr-container:** cosign ([bffbe40](https://github.com/Alwatr/flux/commit/bffbe403ad751414705753dfdc862c9ff0c3980b)) by @
* **publish-container:** improve CI/CD ([43d33c8](https://github.com/Alwatr/flux/commit/43d33c8c0f3224c26e36bb8fdccffdbf60437be9)) by @
* **publish-services:** add all services to matrix ([c874ffa](https://github.com/Alwatr/flux/commit/c874ffa301124e65603735679aa2caf286e5757e)) by @
* **publish-services:** cache ([aa48911](https://github.com/Alwatr/flux/commit/aa48911fe3873923557c5c6db03efeb07c613205)) by @
* **publish-services:** publish for next branches ([c6c79b4](https://github.com/Alwatr/flux/commit/c6c79b413cd1ecf7fe81ac135933e685569e2b39)) by @
* **publish-services:** set path on pr ([b0be7f2](https://github.com/Alwatr/flux/commit/b0be7f200ded3d8e5c71b3d5985970a3a5513fd3)) by @
* **publish-services:** synamic dockerfile for all services ([cd6c2ed](https://github.com/Alwatr/flux/commit/cd6c2ed1565011938d53c700150847a84d760b54)) by @
* **pwa/flight-finder:** build ([a217008](https://github.com/Alwatr/flux/commit/a21700896eeed124fc51aea35c0c7389190059d1)) by @
* **pwa:** improve esbuild ([61e9d57](https://github.com/Alwatr/flux/commit/61e9d57113f8e92353a5dad2718164c877a46c38)) by @
* **pwa:** service worker ([3ba41fc](https://github.com/Alwatr/flux/commit/3ba41fcd0ab55e00bcdc92af0f53cdd4f279ccff)) by @
* **pwa:** watch mode ([f872b2d](https://github.com/Alwatr/flux/commit/f872b2dbf6176466eb146017d2c4fbd3ee1037b3)) by @
* review ([c2e3b0a](https://github.com/Alwatr/flux/commit/c2e3b0a7169a812633d1a9ee8647ec50438f66b7)) by @
* review and cleanup all workflows ([f0985f2](https://github.com/Alwatr/flux/commit/f0985f21c4323862448f84061f581306963baca1)) by @
* **router:** improve demo for test signal! ([776bca8](https://github.com/Alwatr/flux/commit/776bca849438edac0de4e0a8c164919671f04ecd)) by @
* **router:** simple demo ([524e864](https://github.com/Alwatr/flux/commit/524e864dd6c1e28dcc3a2797b9fdbb909da16e2b)) by @
* **scripts:** add watch commands ([99ff8ce](https://github.com/Alwatr/flux/commit/99ff8ce580aa86383ef1a95c85e1a6d9970d0d0b)) by @
* **server-context:** add `server-context` itself! ([f6d78dd](https://github.com/Alwatr/flux/commit/f6d78dd5a7abc7bfa4b6209ee0db63a19a899b9d)) by @
* **server-context:** add new module ([15c1951](https://github.com/Alwatr/flux/commit/15c1951bbfe6547fe293efa10596541073f65c25)) by @
* **server-context:** AlwatrServerContext ([9e4d816](https://github.com/Alwatr/flux/commit/9e4d816e3104fbb4a72be5b6ce1c3f74af2eaacd)) by @
* **server-context:** dynamic extra state/event type ([4a5e828](https://github.com/Alwatr/flux/commit/4a5e828cba447731f2313d6f3213278753b2270c)) by @
* **server:** build index file ([36aa470](https://github.com/Alwatr/flux/commit/36aa4705e76c7c89e8ef84ed9bf9b86ea301b776)) by @
* **server:** install and config web dev server ([57dabb6](https://github.com/Alwatr/flux/commit/57dabb66f5cb74157ea648ec9ab2879063054a41)) by @
* **services:** improve all docker deployment ([3ac43ef](https://github.com/Alwatr/flux/commit/3ac43efc2c1d2fae62c0400e0b628aaa0a6f628c)) by @
* **signal-manager:** enhance provider, docs ([25a3510](https://github.com/Alwatr/flux/commit/25a35108ae8ed8a89121894a95e1cd2fdfca67bc)) by @
* **signal2/context:** base class ([b70731a](https://github.com/Alwatr/flux/commit/b70731a14aea57f246d85b6af23ce4e26e42835d)) by @
* **signal2:** add `event` signal class ([71959e0](https://github.com/Alwatr/flux/commit/71959e054ea4e28e24134247b10ee5bac8aadf65)) by @
* **signal2:** add multi-thread functionality ([74e9a07](https://github.com/Alwatr/flux/commit/74e9a07eb1619a25428769a28e7f308bab1dc738)) by @
* **signal2:** AlwatrContext ([b5891b9](https://github.com/Alwatr/flux/commit/b5891b943607560a8d42acda45f481498ce14ea1)) by @
* **signal2:** AlwatrObservable ([899a2f9](https://github.com/Alwatr/flux/commit/899a2f9890d1579031a54fc4a94a1f620a393309)) by @
* **signal2:** AlwatrObservableInterface ([b415ca7](https://github.com/Alwatr/flux/commit/b415ca79b33833597c1481cacdf6788adb6c78b2)) by @
* **signal2:** base package ([d4c6174](https://github.com/Alwatr/flux/commit/d4c61745af031d8465b301741e6f56cba64cb2f8)) by @
* **signal2:** external types ([532c62f](https://github.com/Alwatr/flux/commit/532c62f01a831a7790ca3f78cdc363c77daeffbe)) by @
* **signal2:** new AlwatrContextSignal extends AlwatrBaseSignal ([4b89656](https://github.com/Alwatr/flux/commit/4b8965638074a14101a5f542e952c116bc839c6d)) by @
* **signal2:** new AlwatrEventSignal extends AlwatrBaseSignal ([dd716de](https://github.com/Alwatr/flux/commit/dd716deb4e16aee0a2986ab82572682d57a2478a)) by @
* **signal2:** new AlwatrMultithreadContextSignal extends AlwatrBaseSignal ([ea1e976](https://github.com/Alwatr/flux/commit/ea1e9769504ec6c37172ace9e862ca2fede8656b)) by @
* **signal2:** new AlwatrSimpleSignal extends AlwatrBaseSignal ([e7c8271](https://github.com/Alwatr/flux/commit/e7c8271adb508d933b2a83aae5e46725283624b1)) by @
* **signal2:** new base class for handle all features ([77071f4](https://github.com/Alwatr/flux/commit/77071f44ebf5ef2d35e519b43d717ce4e0951842)) by @
* **signal2:** new context ([33556f4](https://github.com/Alwatr/flux/commit/33556f431f5d3553ffcba511e9ec093ae1bc32d7)) by @
* **signal2:** update demo ([8021ddf](https://github.com/Alwatr/flux/commit/8021ddf3d575bb9449b9fe86b9a7ebd806dfda81)) by @
* **signal:** add untilChange for contextProvider ([6b1b59e](https://github.com/Alwatr/flux/commit/6b1b59eff4f81ae528ddc96377aefc30c4e01f43)) by @
* **signal:** alias in SignalInterface & BoundSignalInterface ([f2cf2d7](https://github.com/Alwatr/flux/commit/f2cf2d7be77fad50e72a754c3285de33da5acd6a)) by @
* **signal:** bind signal ([e22c2b3](https://github.com/Alwatr/flux/commit/e22c2b35a837cb17658e455aa279114aff85729a)) by @
* **signal:** command handler/provider interface ([35a42cd](https://github.com/Alwatr/flux/commit/35a42cdc9ca93bc58ace14392ae630a590271b77)) by @
* **signal:** command signals ([ddcc3ff](https://github.com/Alwatr/flux/commit/ddcc3ffa43a53ef297972a124cff8bb147b57cb7)) by @
* **signal:** command trigger interface ([f918ba5](https://github.com/Alwatr/flux/commit/f918ba5cf4269b83b9c13c79240b3c1770958362)) by @
* **signal:** commandSignal ([ff2b83d](https://github.com/Alwatr/flux/commit/ff2b83dccfc2051769e66caa97294c6d843d0fab)) by @
* **signal:** context prover and consumer ([6b08390](https://github.com/Alwatr/flux/commit/6b08390820b8315cf5688073a2ddcccaaa02862f)) by @
* **signal:** contextProvider.expire ([534a17e](https://github.com/Alwatr/flux/commit/534a17e544922904f6bd5dc0bacb09dc8582f458)) by @
* **signal:** defineCommand return ListenerSpec ([39310a6](https://github.com/Alwatr/flux/commit/39310a6dfe008a089f2f8b234eff413c4af2de4c)) by @
* **signal:** demo as test ([3e093b3](https://github.com/Alwatr/flux/commit/3e093b308e728a9bdf3d8c77fd1775c38f9adc60)) by @
* **signal:** dispatch NextCycle option ([da29a8e](https://github.com/Alwatr/flux/commit/da29a8e712b7a431faacb20571f32a9a8814ccd0)) by @
* **signal:** event listener interface ([23c7872](https://github.com/Alwatr/flux/commit/23c7872a45f11d8087a1369f1dcb202fde543306)) by @
* **signal:** event trigger interface ([59d1023](https://github.com/Alwatr/flux/commit/59d1023e40ba57eefa67486ad523f763a190ad69)) by @
* **signal:** new contextConsumer interface ([4ad98d5](https://github.com/Alwatr/flux/commit/4ad98d558b97aff914625bb6f0766ec29481cb9a)) by @
* **signal:** new contextProvider interface ([c2c9830](https://github.com/Alwatr/flux/commit/c2c9830eaee52fd2f915c57c578c2d6bff1fa6a5)) by @
* **signal:** new demo ([916568f](https://github.com/Alwatr/flux/commit/916568fdb4d2c1f21619afc11720fd42fd346e7d)) by @
* **signal:** new manager interface ([a93cce8](https://github.com/Alwatr/flux/commit/a93cce8e8cade9e3ec30dbff041ea9f1622b45a1)) by @
* **signal:** new requestable context consumer interface ([7be49a4](https://github.com/Alwatr/flux/commit/7be49a49a4af7dbb02d8b0f50d8e1effdb72af59)) by @
* **signal:** new requestable context provider interface ([0fb920e](https://github.com/Alwatr/flux/commit/0fb920e51b4bb4e366b2b34d76d7b42d5d5d5c2c)) by @
* **signal:** new RequestableContext with state ([5017feb](https://github.com/Alwatr/flux/commit/5017febf0cdc3768005bb5bb68dc555a042e2193)) by @
* **signal:** new signal dynamic types ([c1439e4](https://github.com/Alwatr/flux/commit/c1439e492de24f6cd011f5f3c9ef1f0cc611d062)) by @
* **signal:** new simple api ([aaadd84](https://github.com/Alwatr/flux/commit/aaadd8446292c18ac895536d41ffc48d28cc72eb)) by @
* **signal:** refactor all generic types with Stringifyable ([e383649](https://github.com/Alwatr/flux/commit/e383649e9fcb3c07d2693d56dfd9fda2794753a9)) by @
* **signal:** requestSignal ([ba8d248](https://github.com/Alwatr/flux/commit/ba8d2485cf3ac853bc4e9a93a699970572bd7315)) by @
* **signal:** separate request command with response ([ea626f5](https://github.com/Alwatr/flux/commit/ea626f5f1c4052d308d75779c8dcca96cc2f2ac7)) by @
* **signal:** signal.request ([ae0073d](https://github.com/Alwatr/flux/commit/ae0073dc20ce1248e12057d057996a11ab4f76eb)) by @
* **signal:** signal.untilNext ([ffec6d1](https://github.com/Alwatr/flux/commit/ffec6d12b93300baf4b6a1562d17c5aabe63c3c5)) by @
* **signal:** signals.expire ([f7a512c](https://github.com/Alwatr/flux/commit/f7a512c9b07dce4d96a207475c2f9a743a1680ed)) by @
* **soffit-pwa:** deployment ([1d7ada3](https://github.com/Alwatr/flux/commit/1d7ada371b143b32c1a8312bbb8f2fe089fa1c6e)) by @
* **soffit-pwa:** product page ([cb0a0a6](https://github.com/Alwatr/flux/commit/cb0a0a69eab2b33629f9c567cd186d62176789b1)) by @
* **soffit-pwa:** publish container ([ee99570](https://github.com/Alwatr/flux/commit/ee9957081063ff541e85b6875df3e2f7480542a6)) by @
* **storage-client:** benchmark test ([0f5e618](https://github.com/Alwatr/flux/commit/0f5e6186791b3e9716ede8c6fac244ab37af675b)) by @
* **storage-client:** performance demo ([bcabcd2](https://github.com/Alwatr/flux/commit/bcabcd263ac1eea724a08e7ce4ad4063917ee6b1)) by @
* **storage:** add _createdBy and _updatedBy ([34b731b](https://github.com/Alwatr/flux/commit/34b731baa358e19359072fe5e34555508b409ba1)) by @
* **storage:** force save abd exist hook to prevent data lost ([4c84d4f](https://github.com/Alwatr/flux/commit/4c84d4f917cd148479cf1d4e2aeb42d276332130)) by @
* **storage:** improve process and add has, storagePath, keys and length ([2b2ef51](https://github.com/Alwatr/flux/commit/2b2ef510f223c87036f8ed77ffc41933a1656cd1)) by @
* **style:** add our z-index ([eb62174](https://github.com/Alwatr/flux/commit/eb62174054bba0e272634947ff8d13fb8c70f2f9)) by @
* **style:** new package for alwatr 2 css system ([e4408bb](https://github.com/Alwatr/flux/commit/e4408bb1e925dd22b93c87de68844db503d99cb2)) by @
* **svg-icon:** init svg-icon package (ionicons) ([#14](https://github.com/Alwatr/flux/issues/14)) ([766c9c8](https://github.com/Alwatr/flux/commit/766c9c88e248cd80b842f85fd31d38be6fef203e)) by @
* switch to lerna-lite ([ee63e50](https://github.com/Alwatr/flux/commit/ee63e50c00948462526484938e99caa52feab8c5)) by @
* **token:** generate and verify HOTP tpkens ([4944f44](https://github.com/Alwatr/flux/commit/4944f44c5bddbc8e8b626d4e217401e49f12ab7b)) by @
* **token:** new package files ([2d6f7a0](https://github.com/Alwatr/flux/commit/2d6f7a0c346c070834e92b9371669eb974fde8af)) by @
* **tokens:** z-zindex ([402d412](https://github.com/Alwatr/flux/commit/402d412567f3a65a6a3c1aa4793bc7e9c5edf963)) by @
* **tsconfig:** uniquely/soffit-site-pwa ([3b2fd3d](https://github.com/Alwatr/flux/commit/3b2fd3dbf0731ce776d59d9b772fdb1a3effc616)) by @
* **type:** Stringifyable ([562849b](https://github.com/Alwatr/flux/commit/562849b45b466b17a9c8fcc4f316875beb7f57c4)) by @
* **ui-kit/text-area:** new component ([57c94f1](https://github.com/Alwatr/flux/commit/57c94f1affe2c3bcd9a99c7f98dbfc39236dafee)) by @
* **ui-kit2:** base package ([d458fc6](https://github.com/Alwatr/flux/commit/d458fc668bb59b259cfe94d04f8961358691c49e)) by @
* **ui-kit:** new package ([fbebe71](https://github.com/Alwatr/flux/commit/fbebe71c8a752e12e55de8b41a1226b9dd658266)) by @
* **ui/demo:** new pwa package ([#508](https://github.com/Alwatr/flux/issues/508)) ([98d417d](https://github.com/Alwatr/flux/commit/98d417d2443ee3a56aabadb16d858e9a15f05007)) by @
* update all repo files from alwatr ([b85a3a6](https://github.com/Alwatr/flux/commit/b85a3a62a8c19f395cf33d72329b9c0f301cddfc)) by @AliMD
* update README.md ([bf6966f](https://github.com/Alwatr/flux/commit/bf6966f9f463c8031db0758faeaf633510d01f88)) by @
* update root dotfiles ro latest changes from alwatr ([e9183cd](https://github.com/Alwatr/flux/commit/e9183cd6f8004a2d597adc566fdad7a9c47d80e4)) by @
* update workflow ([caeec04](https://github.com/Alwatr/flux/commit/caeec0486a6ba9d19a71ea4ad9acb94d27802f4f)) by @
* upgrade nginx 1.8.0-1.25-alpine ([24266ec](https://github.com/Alwatr/flux/commit/24266ec81ab6afa5e152ed7ac7d00c0a9114da8f)) by @
* **util:** add string capitalize ([852ac7d](https://github.com/Alwatr/flux/commit/852ac7dcef9dec4b2a0224c9337832a259091daf)) by @
* **util:** new package ([bf3fe09](https://github.com/Alwatr/flux/commit/bf3fe09021098f7608952bdecef6c27dee2824eb)) by @
* **v2fly:** new configs ([fb3664d](https://github.com/Alwatr/flux/commit/fb3664d3a5e8bf6a2ab8a211a2febfbc37284d2e)) by @
* **validator:** add `phone` validation ([779cfd3](https://github.com/Alwatr/flux/commit/779cfd31b986698a90ac2eee4ac9acd1c8255b0b)) by @
* **validator:** demo ([eda0288](https://github.com/Alwatr/flux/commit/eda0288764f00c828d1d162c283c836fdc6a5e7d)) by @
* **validator:** demo ([d2baf68](https://github.com/Alwatr/flux/commit/d2baf685da4eb178aa992a7f5363c4287ccf04ff)) by @
* **validator:** update demo ([fb7266b](https://github.com/Alwatr/flux/commit/fb7266b2fb5cc89ceba6252c169a65f80eeefa67)) by @
* **validator:** update demo ([4329c52](https://github.com/Alwatr/flux/commit/4329c5278d5a607f06b9833dbb453d70cb460f70)) by @
* **validator:** update demo ([56963f7](https://github.com/Alwatr/flux/commit/56963f71f6a941fd059207d31381a2c3bc58370a)) by @
* **wds:** add 0.0.0.0 hostname ([22326e2](https://github.com/Alwatr/flux/commit/22326e2b71a71ec08d4cb769b0826721a1c14500)) by @
* **wordpress:** improve deployment to use multi env files ([2d55208](https://github.com/Alwatr/flux/commit/2d55208425f9862aacd5e7322c21707de7d31878)) by @
* **workflow.publish-alwatr-container:** add keep-pwa ([b92cc19](https://github.com/Alwatr/flux/commit/b92cc198b50bbfa294d92e13825641e7b494f851)) by @
* **workflow/lint:** add schedule ([eab9bcc](https://github.com/Alwatr/flux/commit/eab9bcc8c94552af6f7164215c112c2f504db556)) by @
* **workflow:** add com api and pwa ([d6226ad](https://github.com/Alwatr/flux/commit/d6226adab98f965aa606a8bedae81e959c04bd7a)) by @
* **workflow:** add nginx-storage to ci/cd ([9df3cf5](https://github.com/Alwatr/flux/commit/9df3cf53c72238fd9a8dc79d7521be54396312b1)) by @
* **workflow:** add tests workflow ([3c6cb91](https://github.com/Alwatr/flux/commit/3c6cb91c49329c7428b4f7bc3f2bb5bd70f1d893)) by @
* **workflow:** add verify workflow ([51e48ac](https://github.com/Alwatr/flux/commit/51e48ac4df8263687be5c2ac4cb8bb5d23f6cc79)) by @
* **workflow:** publish services ([f9f13dc](https://github.com/Alwatr/flux/commit/f9f13dc516c791c8b7c9b17970b84f71bea8c495)) by @
* **workflow:** remove njfamirm from reviewer ([f61c9c3](https://github.com/Alwatr/flux/commit/f61c9c3266e3ea7ecc5db03285e9a51415f0a3c8)) by @
* **workflow:** rename workflow file ([8000f3d](https://github.com/Alwatr/flux/commit/8000f3dc3e72ba86fb88810f300accdd381c7d96)) by @
* **workflows:** Add To GitHub projects ([cf55cae](https://github.com/Alwatr/flux/commit/cf55cae64f5050b6ab9a1bd7a1e125320e847967)) by @
* **workflows:** CodeQL Analyze ([8398944](https://github.com/Alwatr/flux/commit/839894447fb5fcc5faa19e39677e09cbee7765bc)) by @
* **workflows:** Dependency Review ([bfd7ab6](https://github.com/Alwatr/flux/commit/bfd7ab6de9959ab55c5605349a1f70e3a8373347)) by @
* **workflows:** new eslint workflow ([fec0478](https://github.com/Alwatr/flux/commit/fec0478d741ad66a5de281bd27f533fcdc68c036)) by @
* **xz-example:** such a wow! ([2a10a8d](https://github.com/Alwatr/flux/commit/2a10a8dbfd463bc7e7dcad1809c60182c62e4ca0)) by @

### Bug Fixes

* **.github/depbot:** syntax issue ([b8cb0e6](https://github.com/Alwatr/flux/commit/b8cb0e6669b247ad6b59bb536ba686e9ad988623)) by @
* **.github:** matrix ([f7037fa](https://github.com/Alwatr/flux/commit/f7037faade0bd4c3f7c9c0c938d0c0710d3962ab)) by @
* add esbuild to git ignore ([97654ce](https://github.com/Alwatr/flux/commit/97654ced3855f4cf0df83ce8460305251c428c6f)) by @
* add lint to scripts ([f02f3eb](https://github.com/Alwatr/flux/commit/f02f3ebae452396a4ce96643e77ba922654a7217)) by @
* add rest client extension to recommendation ([0817c9e](https://github.com/Alwatr/flux/commit/0817c9e94ed541d2a5f53df15e63e86ae85daf8a)) by @
* add type module ([508f2d8](https://github.com/Alwatr/flux/commit/508f2d832b669be333e1b1e2828ecfe023cd5dec)) by @
* alalwatr ([25b2a9b](https://github.com/Alwatr/flux/commit/25b2a9b25404844ef8ed01e94d19843cf4b4100a)) by @
* all new repo path and packages dependencies ([21a6afa](https://github.com/Alwatr/flux/commit/21a6afa0badafe4051617d9a9e3bbfbaabd0c4ad)) by @
* all package refrences ([9072955](https://github.com/Alwatr/flux/commit/9072955ba756bf1fe6d9c028f8e77797403d5a5b)) by @
* **bug:** rootDir `src` to `.` ([76c3fe5](https://github.com/Alwatr/flux/commit/76c3fe547a89ba983ee69fab5b4c2f5b54021c6e)) by @
* build com-cpi ([4f1d9e3](https://github.com/Alwatr/flux/commit/4f1d9e3397f896d8f7a41b4dc9132322607686fa)) by @
* build issue ([577f0b2](https://github.com/Alwatr/flux/commit/577f0b2d1c08561fff9ddb1ad5e6099058b86802)) by @
* build issues ([2ded558](https://github.com/Alwatr/flux/commit/2ded5588b76306c783088e89f13629d4bdfcc985)) by @
* build issues ([a61f062](https://github.com/Alwatr/flux/commit/a61f0621dc2574649568dfcf2ac124f749fbe7b0)) by @
* change all [@one](https://github.com/one) to [@vatr](https://github.com/vatr) ([636ccdd](https://github.com/Alwatr/flux/commit/636ccdd1084caa588d5ab4931c195c8b2a829ff1)) by @
* **ci/dependabot:** schedule time type ([e70cccc](https://github.com/Alwatr/flux/commit/e70cccc8195837fc494ebee55eb98322fa3e87d5)) by @
* clean command ([9e78229](https://github.com/Alwatr/flux/commit/9e78229e25ccb780c941b51cfa016625ca83b6b1)) by @
* clean ff old packages ([65319a4](https://github.com/Alwatr/flux/commit/65319a4b6191993fb33f34fc6eca20f8c394d641)) by @
* cleanup old signal and fsm v1 ([bde0bea](https://github.com/Alwatr/flux/commit/bde0bea06a6750bebad49a127b75b57fd5e55ddd)) by @
* **cloud/deploy:** rename ssh-rsa ([9a24a25](https://github.com/Alwatr/flux/commit/9a24a25ee4bdff70cc0785a44b35693ca9c8685e)) by @
* **cloud:** add fpm suffix ([fc3f62c](https://github.com/Alwatr/flux/commit/fc3f62c3a020f2b7a497b8d2bbbf20f62772bb93)) by @
* **cloud:** clone two version of wordpress ([9ecb795](https://github.com/Alwatr/flux/commit/9ecb795990029807d03dfdd3670bdcf0ac609570)) by @
* **cloud:** deploys path ([4de14f5](https://github.com/Alwatr/flux/commit/4de14f5a49d140fca5a65e57c86c761f7d0a1ed3)) by @
* compatible with new esbuild api ([65102f7](https://github.com/Alwatr/flux/commit/65102f7b11c35f9e2327b7b8cefc0560f0f5ffcf)) by @
* **context:** compatible with new storage api ([e2127db](https://github.com/Alwatr/flux/commit/e2127dbac38e07819eb568c2508d8a43174d77ac)) by @
* **context:** merge request option issue ([356ad49](https://github.com/Alwatr/flux/commit/356ad498d572baed91605834f00dc2a23a1b6e1d)) by @
* **core/crypto:** rename `token` to `crypto` ([ad4a74a](https://github.com/Alwatr/flux/commit/ad4a74a1bfd03fbf8ee7553ec455425478fa94a3)) by @
* **crawler:** structure ([c561546](https://github.com/Alwatr/flux/commit/c561546fe4b87dd68b8828b0905166c341516d97)) by @
* **crypto:** package ([f29a1e0](https://github.com/Alwatr/flux/commit/f29a1e0537a06c0a5d7109feb362a39c1f1ccaa1)) by @
* **demo/crypto:** `logger`s & `token` ([cd73aa5](https://github.com/Alwatr/flux/commit/cd73aa5f96e881a90abfb23444a40850acc14953)) by @
* **demo/crypto:** log ([8572565](https://github.com/Alwatr/flux/commit/85725651836b7069bf1f649e05bb902545f1f7f6)) by @
* **demo/crypto:** revert last demo ([399fc2c](https://github.com/Alwatr/flux/commit/399fc2c3ce6b0712f9ad4e648cca90df019669ec)) by @
* **demo/crypto:** use all token status ([6fa08db](https://github.com/Alwatr/flux/commit/6fa08dbac00afc8a2851cac3772e4ddca86715a4)) by @
* **demo/finite-state-machine2:** update based on its module ([0a50eaa](https://github.com/Alwatr/flux/commit/0a50eaaa8286884fb526821c939626f095cd3bf2)) by @
* **demo/fsm:** context object ([ef73f46](https://github.com/Alwatr/flux/commit/ef73f46f2405cbbeb11759d0442a97f1cb5a1a11)) by @
* **demo/fsm:** new demo for new fsm ([e93b5c3](https://github.com/Alwatr/flux/commit/e93b5c3b87e43b609d1e71c765bb5973d013bbc9)) by @
* **demo/icon:** remove preloadIcon in demo ([769a172](https://github.com/Alwatr/flux/commit/769a1723b56eb504b6660f0f3c1e0322d59ab0e4)) by @
* **demo/math:** remove getClientId ([b5783ee](https://github.com/Alwatr/flux/commit/b5783eeedf89ead49bec7cf802f659eeed7cdb4c)) by @
* **demo/server-context:** fn name ([829c208](https://github.com/Alwatr/flux/commit/829c208cdf720301464ad030935ae9f103340771)) by @
* **demo/signal2:** add `event` demo & sort folders ([5f5cb3f](https://github.com/Alwatr/flux/commit/5f5cb3f9522aebe0ee91f124fa11505019599bed)) by @
* **demo/signal2:** use new classes ([68131a3](https://github.com/Alwatr/flux/commit/68131a3e97b5a408fd4495f6739f04b2db0dc729)) by @
* **demo/storage-client:** getStorage ([d54ecdc](https://github.com/Alwatr/flux/commit/d54ecdc3dd879976f09d39e1741b6c3316cf281b)) by @
* **demo/storage-client:** handle document not found ([25582db](https://github.com/Alwatr/flux/commit/25582db35566c10a8e6bcc9db3f2c61a36665b6b)) by @
* **demo/storage-client:** set default token ([165d967](https://github.com/Alwatr/flux/commit/165d96720a54fecc537057ae8489f823c3b3349d)) by @
* **demo/storage-client:** update config ([ec46e4b](https://github.com/Alwatr/flux/commit/ec46e4b58674ae14fb59afb29ac1b2402f2ecfc3)) by @
* **demo/storage-client:** use host in config ([57b16a4](https://github.com/Alwatr/flux/commit/57b16a445641aab54375cb6aec3bd1ccf602bf00)) by @
* **demo/storage-engine:** use save ([4a3cdf5](https://github.com/Alwatr/flux/commit/4a3cdf53dd0bb3c3a1ed9ece229c78babda365e7)) by @
* **demo/token:** import type ([f0192f7](https://github.com/Alwatr/flux/commit/f0192f7c6054f1cccb89ec2609420685c4f4b12d)) by @
* **demo:** cleanup ([9be078c](https://github.com/Alwatr/flux/commit/9be078c70e7f9947e4760a4f8f4669c2e355f4ea)) by @
* **demo:** fix demo based on latest `fsm`s changes ([2d5cd32](https://github.com/Alwatr/flux/commit/2d5cd32a27570d71178bccd19626c62200824f57)) by @
* **demo:** package ([8c4705a](https://github.com/Alwatr/flux/commit/8c4705ab3bf11e51ce2ff1658efa4d06c21841ef)) by @
* **demo:** router 2 ([a50a22c](https://github.com/Alwatr/flux/commit/a50a22c74582cdf1ef91c59aa036a3672a691efe)) by @
* **demo:** token ([5e615b3](https://github.com/Alwatr/flux/commit/5e615b364bfc2e37be7c7e48a0d0354407d8e2bb)) by @
* **demo:** update types ([832ecf4](https://github.com/Alwatr/flux/commit/832ecf40f34ed2d4803db0f6162dd0ce3f70f28f)) by @
* **demo:** use `AlwatrApiRequest` ([8776416](https://github.com/Alwatr/flux/commit/8776416964e597cfbf1dd939fd849bbcffa2db85)) by @
* deploy speed issue ([2cfd13f](https://github.com/Alwatr/flux/commit/2cfd13f3b1481845c6f23b116a0877b6a7127bec)) by @
* encription in git attributes ([114a510](https://github.com/Alwatr/flux/commit/114a5102508c17cf7496fe8ab5045da1bda67a10)) by @
* env files ([0b97a02](https://github.com/Alwatr/flux/commit/0b97a0240258f65070a01d2a54a3a6646a8bb078)) by @
* **es-bench:** bench calc issue ([4558eb1](https://github.com/Alwatr/flux/commit/4558eb1398c601af0cc74f43630480ec6a48f75e)) by @
* **es-bench:** calc memory usages ([8e72ce8](https://github.com/Alwatr/flux/commit/8e72ce81b14f7d5b62b0ee12a56d58309e1f5d31)) by @
* **es-bench:** logger dev mode ([915ee30](https://github.com/Alwatr/flux/commit/915ee30ed69d1c195d92bc5b211e5017d541f878)) by @
* **es-bench:** remove `stat` ([ef4d473](https://github.com/Alwatr/flux/commit/ef4d473fe0377c19a0d27945a5c33099759fa66e)) by @
* **eslint:** project path ([9d78869](https://github.com/Alwatr/flux/commit/9d78869cf88972b6c60def537d8fb65b901ecbe5)) by @
* **fetch:** compatible with new ts types AbortSignal ([efd7b6d](https://github.com/Alwatr/flux/commit/efd7b6dbd402718d46bca8bc7922345e13293410)) by @
* fix import module ([c6542bf](https://github.com/Alwatr/flux/commit/c6542bf5ab4d6854dba5b6679939f388b9dbf575)) by @
* **fms:** import path ([d49e603](https://github.com/Alwatr/flux/commit/d49e603b6632d3351f0f1f139b0a91806a6de5d7)) by @
* **font:** cleanup ([2953824](https://github.com/Alwatr/flux/commit/29538243db9a439b2e9e7bd267fdab7c9c218418)) by @
* **font:** review ([6937536](https://github.com/Alwatr/flux/commit/693753688d61850411448e08aa199b40c109d229)) by @
* **form-registration:** service name ([bcf04c7](https://github.com/Alwatr/flux/commit/bcf04c7d78cd8541f26ad03e1b0a252ca3c5b7ec)) by @
* **fsm/demo:** signalList ([084a5ef](https://github.com/Alwatr/flux/commit/084a5ef5d3475169697ec155adf0a22662028623)) by @
* **fsm2:** add `name` to `config` & remove `context` ([8daeb45](https://github.com/Alwatr/flux/commit/8daeb45db314d6c42f9b98e88c88e7595cb4e512)) by @
* **fsm2:** convert `config` to an object ([ab81fc3](https://github.com/Alwatr/flux/commit/ab81fc386da31bff2f804ecc65c8b54d4ccf49dd)) by @
* **fsm2:** types ([802a783](https://github.com/Alwatr/flux/commit/802a783ea5940a00f84a7f8e04db35c9d2aecaf9)) by @
* **fsm:** action maybe async ([9376f74](https://github.com/Alwatr/flux/commit/9376f7472b336840cf1187d12e861df2bb684720)) by @
* **fsm:** autoSignalUnsubscribe type ([191f626](https://github.com/Alwatr/flux/commit/191f62643424b56e60f65442ea5b6b78202709c7)) by @
* **fsm:** call render states function in there own this ([a241085](https://github.com/Alwatr/flux/commit/a241085b4d06f1ba55bd0781726b74416eaa24b9)) by @
* **fsm:** cleanup old ([c9ac941](https://github.com/Alwatr/flux/commit/c9ac941948d74f4754dd280033f088e88d5a0bc3)) by @
* **fsm:** compatible with new logger api ([77db656](https://github.com/Alwatr/flux/commit/77db656d8b261da29376cf6dba7b9d4c35deeae8)) by @
* **fsm:** demo ([971688b](https://github.com/Alwatr/flux/commit/971688b51fda853865d28fec20ca692ce03f5178)) by @
* **fsm:** every signal mather ([4dfa075](https://github.com/Alwatr/flux/commit/4dfa0756859ffce0045e0d59091693171112c1b8)) by @
* **fsm:** fix order of `initFsmInstance` args ([54c0f06](https://github.com/Alwatr/flux/commit/54c0f069a3ca98225265af3f664cd909e5774c9b)) by @
* **fsm:** import issue ([9674f34](https://github.com/Alwatr/flux/commit/9674f34a7c63137fb9597d2b465b4fb123c963c1)) by @
* **fsm:** initial exec actions ([2f4dc26](https://github.com/Alwatr/flux/commit/2f4dc26649ff5731bb04b1b834d0d50523f24a05)) by @
* **fsm:** last reported bugs in set state ([b1c93db](https://github.com/Alwatr/flux/commit/b1c93db1739ecf33f33e787dcba00aa7a1ec9c93)) by @
* **fsm:** make it private ([7f1cf70](https://github.com/Alwatr/flux/commit/7f1cf70a88c08286bd863df1263f5feada67f6c9)) by @
* **fsm:** remove additional import ([50fb4b1](https://github.com/Alwatr/flux/commit/50fb4b12d4143eb3edfa74ddac0e706f2214121d)) by @
* **fsm:** remove old apis ([96be26e](https://github.com/Alwatr/flux/commit/96be26e1cdf043e969c54983a22a3d4a03dc1e8f)) by @
* **fsm:** review reset process ([608d88f](https://github.com/Alwatr/flux/commit/608d88f85d04847916614cb56f15483f992d809a)) by @
* **fsm:** run init entry actions ([0c4ebaa](https://github.com/Alwatr/flux/commit/0c4ebaaf0c2c615f533dcf9474ae1b4cdd6ab0a6)) by @
* **fsm:** update context in transition bug ([db6bd53](https://github.com/Alwatr/flux/commit/db6bd5351142b89621efdc00d06b72ccc0571f27)) by @
* **github-actions:** specific all versions ([3bb6e5e](https://github.com/Alwatr/flux/commit/3bb6e5e9ebdefa1883b692048222d781e6c18b90)) by @
* **github/workflow:** schema detect ([1cd2163](https://github.com/Alwatr/flux/commit/1cd21636017a32372203906f41001cd2d00b8d13)) by @
* **gitignore:** ignore db ([4078b08](https://github.com/Alwatr/flux/commit/4078b08bbfaf44c0f775e8abd6b7e7c138b9a888)) by @
* import util/node ([ff954de](https://github.com/Alwatr/flux/commit/ff954de7b24f3b3eaec682aa623c6f11edb7081b)) by @
* **issue_template:** add all packages ([84bcc50](https://github.com/Alwatr/flux/commit/84bcc506610ac269a610518a9e3da11d204529eb)) by @
* **lerna:** add ignoreChanges for all md files! ([ee84128](https://github.com/Alwatr/flux/commit/ee841284daf3a4617acfa4537ae74bc909e2cd90)) by @
* **lerna:** changelogIncludeCommitsClientLogin ([8d2bd9a](https://github.com/Alwatr/flux/commit/8d2bd9aca1819fa42e7572649d512dcae6b7cc60)) by @
* **lerna:** include readme to publish chnages ([570f528](https://github.com/Alwatr/flux/commit/570f528acf3b6d42583512044ab439b3651501dd)) by @
* **lerna:** remove changelogIncludeCommitsClientLogin ([f8b5dda](https://github.com/Alwatr/flux/commit/f8b5ddaf5eeb2409b15b8c775c13e748a973fc8e)) by @
* **lerna:** remove ignoreChanges ([85a21f1](https://github.com/Alwatr/flux/commit/85a21f1906eaf385da1ae29a932546b2d83bc45d)) by @
* **lerna:** version behavior ([db0513d](https://github.com/Alwatr/flux/commit/db0513d7a8f1caa5bdc133c53550ff533050907e)) by @
* **lint:** ignore es-bench ([4fa5ed5](https://github.com/Alwatr/flux/commit/4fa5ed569b21f879eab344aff3670a36bc664bfc)) by @
* lit-analyzer version ([79f3dda](https://github.com/Alwatr/flux/commit/79f3dda33ff281d1d174e8a5b3de67c3e3a8842d)) by @
* **math:** build ([e0c19e3](https://github.com/Alwatr/flux/commit/e0c19e35c80f8dfe4c439e7874e1336c10be138f)) by @
* missing packages ([3c411bd](https://github.com/Alwatr/flux/commit/3c411bdc0ce3dfa0e75bcd3937d5835b3b4d2b91)) by @
* new logger api ([deeca0e](https://github.com/Alwatr/flux/commit/deeca0e9e2b8c2a6aeb3d9fd044b3853b4b58730)) by @
* **nginx:** force-domain bug ([b7b4fb4](https://github.com/Alwatr/flux/commit/b7b4fb45262e945b7318135d6362015ba0a3a8a0)) by @
* old One repo links ([84c6487](https://github.com/Alwatr/flux/commit/84c6487c918312f31ffe2723a2a24469ed94523b)) by @
* **package.json:** build script ([9b689ae](https://github.com/Alwatr/flux/commit/9b689aea69c5309ec7860597c9e5df02cb805c0a)) by @
* **package:** build:r before version ([8f503d2](https://github.com/Alwatr/flux/commit/8f503d2bac8c20b50310a303047219c1872cd852)) by @
* **package:** build/lint script ([60ec663](https://github.com/Alwatr/flux/commit/60ec663acaa6e3b36a47e29a33c737fcdb6f86b8)) by @
* **package:** eslint command ([4fb2ec9](https://github.com/Alwatr/flux/commit/4fb2ec9d57d16375d91f53a239cd28d28f642529)) by @
* packages ([3078afa](https://github.com/Alwatr/flux/commit/3078afaa43c4ec052d79cce4b31fe327b90e2dac)) by @
* packages and refs ([01faa81](https://github.com/Alwatr/flux/commit/01faa81f9cdd54eb5c13186b2033131de0a5b5da)) by @
* **package:** update from eslib and change to alwatr signal ([5957749](https://github.com/Alwatr/flux/commit/595774984a2e138a72eb1efcc7e0bc751ab34eb2)) by @
* **playground:** set prettier default for formatting ([5359f67](https://github.com/Alwatr/flux/commit/5359f67e2724f55fcc5b3692e595fbd63a715457)) by @
* **pr-template:** make it simple ([23a30ad](https://github.com/Alwatr/flux/commit/23a30ad9ac2f89a9f8a41458acc46e5dd94d6731)) by @
* **publish-alwatr-container:** cosign issue ([4f78ed3](https://github.com/Alwatr/flux/commit/4f78ed38aecefcf56fd465f2fec2c40dbffd0ecd)) by @
* **publish-container:** 403 error ([cc229d9](https://github.com/Alwatr/flux/commit/cc229d92f677598054fc5aa8c412b08d7197682b)) by @
* **publish-container:** ignore tdlib ([ba723e4](https://github.com/Alwatr/flux/commit/ba723e477a8db0165b030f8c62acc896f7087a32)) by @
* **publish-container:** image metadatas ([7fc4cc7](https://github.com/Alwatr/flux/commit/7fc4cc729515098aefa286a5f6fcc00642fa95a1)) by @
* **publish-container:** prevent to build on any pr merged ([e3b6854](https://github.com/Alwatr/flux/commit/e3b6854c6ce85e22a90359a880ee4b52c91c1e62)) by @
* **publish-services:** image name ([0f9b9d6](https://github.com/Alwatr/flux/commit/0f9b9d68e801f81bc8dd6c89c2d2e7b69acd8743)) by @
* **pwa-helper:** add to root tsconfig refrences ([d88f8db](https://github.com/Alwatr/flux/commit/d88f8dbf953091d7bda01a237a50c9e9dd3aa9c1)) by @
* **readme:** logo path ([88bad5c](https://github.com/Alwatr/flux/commit/88bad5c141a0274a6b2ab83bac5431e16534e18f)) by @
* remove _updatedBy ([d480514](https://github.com/Alwatr/flux/commit/d480514d223743d064e9aa36105d01dcd77d4c37)) by @
* remove `src` and move all content to `root` ([e2f4ce3](https://github.com/Alwatr/flux/commit/e2f4ce3a61e4c7bdbc7fb5edf94e7fb7ebfb34e7)) by @
* remove `watch` scripts ([fb5b19e](https://github.com/Alwatr/flux/commit/fb5b19e4535cffc9c6d50229b4c8bcb6fb6d0364)) by @
* remove license ([36d2075](https://github.com/Alwatr/flux/commit/36d2075feefbffd20f0296ef6ae38dd4af084c64)) by @
* remove npm token from install dependencies ([8d013ff](https://github.com/Alwatr/flux/commit/8d013ffcebaaa32838065ea3c5ef0a916f620898)) by @
* remove pwa from workspace ([a88f464](https://github.com/Alwatr/flux/commit/a88f4645dd28dc5b0f39aa1d2e6589e7611182c0)) by @
* remove serve script ([0e47324](https://github.com/Alwatr/flux/commit/0e47324bcd325cf921610ea0a6ddf788b5df35d1)) by @
* repo address ([ed3d7d1](https://github.com/Alwatr/flux/commit/ed3d7d1e9914cdae3c07aeaca98e5be30642813f)) by @
* reported issues ([39ff1c8](https://github.com/Alwatr/flux/commit/39ff1c86af8d42ed74e71838f72c4ad9056c7e29)) by @
* review ([210d6cb](https://github.com/Alwatr/flux/commit/210d6cbecc1f30c361f6ddfbd51da62d7c8debc4)) by @
* review issue ([7b21b8d](https://github.com/Alwatr/flux/commit/7b21b8d64902cebac4caea62019f6422685fd953)) by @
* **router2:** complete `class` methods & move `outlet` to `utility` file ([68b75b9](https://github.com/Alwatr/flux/commit/68b75b964f59e25616df5c22deb7bfaa9cd2b130)) by @
* **server-context:** add `_request` & `_actionRecord` ([a7e3325](https://github.com/Alwatr/flux/commit/a7e33255a5c211f5271620b3d7eb628c0831b870)) by @
* **server-context:** arg of `request` in `AlwatrApiRequest` ([7a2a9aa](https://github.com/Alwatr/flux/commit/7a2a9aa34aa6472611e73f2b06552be90088b668)) by @
* **server-context:** compatible with new logger api ([916db77](https://github.com/Alwatr/flux/commit/916db775c4e352d7ca663507f80539eef38b4738)) by @
* **server-context:** convert some `super` to `this` ([13e9604](https://github.com/Alwatr/flux/commit/13e9604dd47798fdfde25616dd617c36550f6f75)) by @
* **server-context:** export `api-request` ([71b7fed](https://github.com/Alwatr/flux/commit/71b7fedd49bc220adaa23247ac66afece94d147d)) by @
* **server-context:** export `server-context` to use ([15ce6a5](https://github.com/Alwatr/flux/commit/15ce6a50efae62beaf37a79272807d8ef86723f5)) by @
* **server-context:** import issue ([aa76ffe](https://github.com/Alwatr/flux/commit/aa76ffe2f55e5a8dfe2b93ce756caa3311022f7e)) by @
* **server-context:** request options gone in offline requests ([a80b79e](https://github.com/Alwatr/flux/commit/a80b79e3a5969d4bca42a2720a1194bad984599f)) by @
* **server-context:** review and fix runtime issues ([4b2e271](https://github.com/Alwatr/flux/commit/4b2e271dab7441760ac6ea104b64c60bf6780bfa)) by @
* **server-context:** tsconfig ([1db9eef](https://github.com/Alwatr/flux/commit/1db9eefebdbcce2b209836dcb05ecf998290ef6f)) by @
* **server-request:** review and enhance ([15a0a97](https://github.com/Alwatr/flux/commit/15a0a973459f3b6f587ee06c5dac08e5f03be530)) by @
* **services/telegram-notifier:** remove storga-client ([185795d](https://github.com/Alwatr/flux/commit/185795d6f88d1b51708dcdc7a233fdbbc91ac099)) by @
* **services:** name and desc ([33d4252](https://github.com/Alwatr/flux/commit/33d4252ebb8fc379927a14892addb0c1fec42bef)) by @
* set correct path ([dbd290d](https://github.com/Alwatr/flux/commit/dbd290d022a7135dd71475c7dbf91195017df9c8)) by @
* **signal/core:** _getSignalObject ([7c1a0f6](https://github.com/Alwatr/flux/commit/7c1a0f668006ab3b1f7a63c9ede1778645f95312)) by @
* **signal2:** build issue ([359614f](https://github.com/Alwatr/flux/commit/359614f0d621bc00cabeab0075ebdba4660ea80f)) by @
* **signal2:** export `base` ([a92652e](https://github.com/Alwatr/flux/commit/a92652eed26780b5b30d5b2d34d0db2cac10d821)) by @
* **signal2:** handle promise catch ([b7d8468](https://github.com/Alwatr/flux/commit/b7d846808f35d3e3f32b3be90d319d6e57dc2fe2)) by @
* **signal2:** index.ts ([76a9b2d](https://github.com/Alwatr/flux/commit/76a9b2ded3ed9fd8181ab48c8deb41122e1d815c)) by @
* **signal2:** logger method name ([82f6336](https://github.com/Alwatr/flux/commit/82f633660b28c636044b7cb79150c4f63cf5686f)) by @
* **signal2:** root exports and reg alwatr module ([32c0367](https://github.com/Alwatr/flux/commit/32c0367048a125a69ae9692c23df428460508db7)) by @
* **signal:** alert [#1455](https://github.com/Alwatr/flux/issues/1455) ([bb93d8f](https://github.com/Alwatr/flux/commit/bb93d8fc0a78c567f9c979ecf1a2026977582bdc)) by @
* **signal:** AlwatrMultithreadContextSignal issue ([2a450b3](https://github.com/Alwatr/flux/commit/2a450b3b1b3e9fe07faa47165010878c5d4949d1)) by @
* **signal:** clean old interfaces ([92f4775](https://github.com/Alwatr/flux/commit/92f47751f1c20c326081f8e03b524d8620f692ef)) by @
* **signal:** clear old api ([9724ad9](https://github.com/Alwatr/flux/commit/9724ad952cb8a93798de20d24ff8838509f74e85)) by @
* **signal:** compatible with new logger api ([0a3b1c0](https://github.com/Alwatr/flux/commit/0a3b1c02b285daa66491104a14596e6a19895e11)) by @
* **signal:** dont receivePrevious when listener is disabled ([352db26](https://github.com/Alwatr/flux/commit/352db26222f800d9ef64456b3ce394bc470a94fd)) by @
* **signal:** export all interfaces ([a1279a4](https://github.com/Alwatr/flux/commit/a1279a4377acdce52c4fc0f2ab235f8762195bd6)) by @
* **signal:** export listeners ([9cd8a5b](https://github.com/Alwatr/flux/commit/9cd8a5b15940fb9932269994ec05f7f2d7b38890)) by @
* **signal:** import types ([eaaa2a7](https://github.com/Alwatr/flux/commit/eaaa2a748a7c211f4170bd39d5bb3591637b88fd)) by @
* **signal:** interface bind type ([dec6d85](https://github.com/Alwatr/flux/commit/dec6d851571c6f00f28eb59e86a753ae38eaa8d5)) by @
* **signal:** NextCycle with own detail ([6514115](https://github.com/Alwatr/flux/commit/65141157c4e3f52fe2574439323e8174992b5e7d)) by @
* **signal:** nodejs compatibility ([b7b7c84](https://github.com/Alwatr/flux/commit/b7b7c84dab8e0b95a96bfc5f3e11ff0e7b1778ea)) by @
* **signal:** package name ([4791b54](https://github.com/Alwatr/flux/commit/4791b54c8da75cf43eb9c86180f1ed94b0e28c4e)) by @
* **signal:** reported issues ([ecc6d91](https://github.com/Alwatr/flux/commit/ecc6d91f1eec41bd35cdf76d000d9b914b2d454a)) by @
* **signal:** requestableContextConsumer bind issue ([c42bd96](https://github.com/Alwatr/flux/commit/c42bd96a2a5ea0b8aec5d27c19eea7a0b11b1d2c)) by @
* **signal:** requestableContextProvider.getValue ([e31c117](https://github.com/Alwatr/flux/commit/e31c11715e562b43f8c8ee500f4dde1cdd9401fd)) by @
* **signal:** requestContext dispatch issue ([e9e21f2](https://github.com/Alwatr/flux/commit/e9e21f2d6ad99082fdd32c077c64766cc69f5524)) by @
* **signal:** signal2 name ([70b71e3](https://github.com/Alwatr/flux/commit/70b71e312cb5e5d4c54c37c5c327712200f90be5)) by @
* **signal:** TSignal on SignalControllerInterface ([a0e8d48](https://github.com/Alwatr/flux/commit/a0e8d480184ba65bee126540f788928d08da7a6d)) by @
* **signal:** types ([2460dc9](https://github.com/Alwatr/flux/commit/2460dc9f68c003dfbd428be23117bcacc72a5084)) by @AliMD
* **soffit-pwa:** app config and temp service worker ([ff9d9cd](https://github.com/Alwatr/flux/commit/ff9d9cdef77920cf2f13a584c9d58be4f53cfffc)) by @
* **soffit-pwa:** deploy ([5d79e2b](https://github.com/Alwatr/flux/commit/5d79e2ba58c298425a89b8ba48ff856d10a51e99)) by @
* **storage:** _last ket ([cef74a8](https://github.com/Alwatr/flux/commit/cef74a875cf4a837a647fcd1cd45384aea796c89)) by @
* **storage-client:** demo ([8cb6fdc](https://github.com/Alwatr/flux/commit/8cb6fdc3cde1845f19c9f7e5777b60e3374a25d0)) by @
* **storage-client:** demo get not found ([8bb849f](https://github.com/Alwatr/flux/commit/8bb849fc2e4878708d7145b733738dfc4ad8e28e)) by @
* **storage-client:** demo security issue ([0756126](https://github.com/Alwatr/flux/commit/07561261269fea73ad27ab2b9fe67d2760b2f21f)) by @
* **storage-client:** handle 404 in benchmark ([6ed63b4](https://github.com/Alwatr/flux/commit/6ed63b4084d0b0e115ac4ca31a33b3d65d25f7de)) by @
* **storage-engine:** dev mode ([91bef5a](https://github.com/Alwatr/flux/commit/91bef5a8a215e016f66f74cfbab91625f39d8df0)) by @
* **storage:** performance demo test ([6ac19ac](https://github.com/Alwatr/flux/commit/6ac19ac0401558afdcd80e015ff4e5429cb43d3e)) by @
* **token:** calc benchs ([6241f36](https://github.com/Alwatr/flux/commit/6241f369517db080c6d25eba647d1e89b4952ed5)) by @
* try to fix typescript importer in eslint ([0225fa6](https://github.com/Alwatr/flux/commit/0225fa6e9bad33d6697f5599aa2b45a63069d5f9)) by @
* ts refrence path ([c2baa44](https://github.com/Alwatr/flux/commit/c2baa44999c72a0015481fc8fea25439329c3f37)) by @
* tsconfig ([9cf3597](https://github.com/Alwatr/flux/commit/9cf359708d8a6269c57249ab5284eeb192d5a1db)) by @
* tsconfig issues ([8e86e68](https://github.com/Alwatr/flux/commit/8e86e68683ed4e95e673cc497dd0589612bc5f76)) by @
* tsconfig path ([bc81b7f](https://github.com/Alwatr/flux/commit/bc81b7f10c62be664b7c474e748814ee72e30e61)) by @
* tsconfig refrences ([fa59905](https://github.com/Alwatr/flux/commit/fa5990522dea9929245e32780a18989ba6aea176)) by @
* tsconfig refrences ([888d4f2](https://github.com/Alwatr/flux/commit/888d4f28cb311f626aed30c5aa78441a56706bbf)) by @
* **tsconfig:** add missing core/validator ([564625d](https://github.com/Alwatr/flux/commit/564625d4bf699c20f130592b79c9f7414e6e3b8b)) by @
* **tsconfig:** add router ([b0fd1ec](https://github.com/Alwatr/flux/commit/b0fd1ec73df885295277aff269a3bffcb1fca7b8)) by @
* **tsconfig:** add useDefineForClassFields ([f9c6a7f](https://github.com/Alwatr/flux/commit/f9c6a7fc7ff38f7fd7800b63c65e8b5f28420bbc)) by @
* **tsconfig:** re-enable com-pwa ([3f56478](https://github.com/Alwatr/flux/commit/3f56478c5455678821ccf912f13c0be629412e1d)) by @
* **tsconfig:** rename storage to storage-engine ([bd09d4c](https://github.com/Alwatr/flux/commit/bd09d4cb377a18b91fb303dc1e84ea231f8d6ab2)) by @
* **tsc:** remove ff ([551f19d](https://github.com/Alwatr/flux/commit/551f19d51dc908660653510f5a0acff8bcea3242)) by @
* **typescript:** rollback to 4.9.5 ([3f0f153](https://github.com/Alwatr/flux/commit/3f0f15376433966af3ba76bd93b4910d6ed73189)) by @
* **ui/*:** package path ([8b22506](https://github.com/Alwatr/flux/commit/8b22506424b0d7e1dbcf40dae915f29f5c5aeed7)) by @
* **ui/*:** package path in refrences ([cc9a55f](https://github.com/Alwatr/flux/commit/cc9a55f7f5dfc8532a357551919bd5fe3f2c4f2a)) by @
* **ui/style/mobile-only:** use --sys-breakpoint-handset ([f890b4c](https://github.com/Alwatr/flux/commit/f890b4ccae19b622e2c01d265d8af2955dd6c00f)) by @
* update types ([701618d](https://github.com/Alwatr/flux/commit/701618ded669fba3c9f371dd9a777fd9052b7e16)) by @
* use ~ for package version ([e5eb777](https://github.com/Alwatr/flux/commit/e5eb77704678580e2fb3584c235a55595d856155)) by @
* **util:** remove package ([2156bc8](https://github.com/Alwatr/flux/commit/2156bc891bc5dfa09b8ca6853fd34a887acdf20b)) by @
* **validator:** deps ([d5c6331](https://github.com/Alwatr/flux/commit/d5c63312aa1f636da465a0d8323719675739efa8)) by @
* **validator:** remove extra trim ([689c120](https://github.com/Alwatr/flux/commit/689c120a62e9f04fe518a4138a9d86cc3333e854)) by @
* **validator:** validate boolean ([dcd2069](https://github.com/Alwatr/flux/commit/dcd2069b60ad413d92116bd46144abe0a857aca9)) by @
* version in package.json ([d824ca5](https://github.com/Alwatr/flux/commit/d824ca504b02cd09e8b038fefa18e798cdb1bc88)) by @
* **vscode:** clean settings.json ([6da9393](https://github.com/Alwatr/flux/commit/6da9393853313b781504280de442098831799b13)) by @
* **vscode:** file exclude pattern ([92d608f](https://github.com/Alwatr/flux/commit/92d608f281f78242263e682d2242d6a610162f26)) by @
* **vscode:** files.exclude setting ([d0fa8a4](https://github.com/Alwatr/flux/commit/d0fa8a4186cee4626466aa3fd656fcb194134bd2)) by @
* **vscode:** re-enable lit-plugin.rules.no-missing-import ([d7c5627](https://github.com/Alwatr/flux/commit/d7c56275f8021a20d00ca366785abaf7350608d6)) by @
* **vscode:** tsdk ([b929b50](https://github.com/Alwatr/flux/commit/b929b503ae669c960afd870a982e831d746f409b)) by @
* web-dev-server ([fa5a9fa](https://github.com/Alwatr/flux/commit/fa5a9fa61f489f99335230a4f69baa7ce1e0954f)) by @
* **wordflows:** tests on all branches ([84a6afe](https://github.com/Alwatr/flux/commit/84a6afe7de3cd913a6a0ff8c0b3e141357c8afb8)) by @
* **workflow/build:** name ([9bbed30](https://github.com/Alwatr/flux/commit/9bbed300b1abc05dc3bb00717e483da819465756)) by @
* **workflow/lint:** task name ([ae69a7a](https://github.com/Alwatr/flux/commit/ae69a7aa0be8f9a39ea20331834c73f4fbc3c622)) by @
* **workflow/publish-container:** name ([fb82a70](https://github.com/Alwatr/flux/commit/fb82a7091fb2d14c5875c6af6caa571981f4bc39)) by @
* **workflow/publish-container:** nginx version ([0523ce7](https://github.com/Alwatr/flux/commit/0523ce7ee9395548856c1b29103f59872bac2a30)) by @
* **workflow/publish-services:** build-args ([e1eba51](https://github.com/Alwatr/flux/commit/e1eba51c32060f706faf26ac078ea0fec89e28e0)) by @
* **workflow/publish-services:** name ([44438e4](https://github.com/Alwatr/flux/commit/44438e4cf8301d292473af47455f0f1ee06c4a6b)) by @
* **workflow/publish-services:** run on pull_request ([0f7e5f6](https://github.com/Alwatr/flux/commit/0f7e5f69b127b3e35c37af8e6f36877fc171d536)) by @
* **workflow/publish-services:** use default node version ([6d8fbd3](https://github.com/Alwatr/flux/commit/6d8fbd36a74cc400799a1a7e9785d102f27c91e2)) by @
* **workflow:** build process ([86b4076](https://github.com/Alwatr/flux/commit/86b4076a0ff606e3277e8d449101566cfd837151)) by @
* **workflow:** disable ff-pwa ([527fab0](https://github.com/Alwatr/flux/commit/527fab0d18458890461c69cb944a38a10d6c42a4)) by @
* **workflow:** increase nodejs memory usage in lint ([917a112](https://github.com/Alwatr/flux/commit/917a1128329c4e9077b565427d45756f1e2b6e8c)) by @
* **workflow:** mariadb full version ([6754c90](https://github.com/Alwatr/flux/commit/6754c908d1070423e59e3ce7961165cb461133e5)) by @
* **workflow:** publish container signing ([1ac8e34](https://github.com/Alwatr/flux/commit/1ac8e341752944c4ac38abb67b87cf0ba2452d72)) by @
* **workflow:** publish container workflow name ([3a3d558](https://github.com/Alwatr/flux/commit/3a3d55871752d9354e1873d512d4540d5c5ec119)) by @
* **workflow:** remove duplicate tests on push and pulls ([a6d66ac](https://github.com/Alwatr/flux/commit/a6d66acafecf3a0ad566e68b53dc1eadebade13b)) by @
* **workflow:** run issue ([a38d485](https://github.com/Alwatr/flux/commit/a38d485fa1dbf13b9c947bc249c2757cb74c4f0a)) by @
* **workflows/build:** build all child packages ([3b03014](https://github.com/Alwatr/flux/commit/3b03014886bf897e53c4c60839d150270d418909)) by @
* **workflows:** add workflow_dispatch ([96d78f6](https://github.com/Alwatr/flux/commit/96d78f65691be836493c52c533c3b6867dfb4752)) by @
* **workflows:** add-to-project token ([4c0d73b](https://github.com/Alwatr/flux/commit/4c0d73b37d14fa86a44e11904192b1ca145195f5)) by @
* **workflows:** add-to-project token ([b017c98](https://github.com/Alwatr/flux/commit/b017c980e6d7ecb69cb96fbeb505bdba5ea05c31)) by @
* **workflows:** build ([4744121](https://github.com/Alwatr/flux/commit/4744121436686a40b57750babe39f1d136509f71)) by @
* **workflows:** build job name ([c3f7712](https://github.com/Alwatr/flux/commit/c3f771244f8ed4227f1d43b2952f4369dcbbd89d)) by @
* **workflows:** change paths! ([a6c1f74](https://github.com/Alwatr/flux/commit/a6c1f74024141b0ebe81ef9d8a09d4c9927ba17f)) by @
* **workflows:** custom version tags for containers ([42bcc45](https://github.com/Alwatr/flux/commit/42bcc455b5633d9d51aab9626522fe6239775187)) by @
* **workflows:** dep review ([ceb3493](https://github.com/Alwatr/flux/commit/ceb3493f0feafefb616b4f5e72d3d454e7b13bf6)) by @
* **workflows:** final test publish container ([5b38c1d](https://github.com/Alwatr/flux/commit/5b38c1dd7720a077dc59e94fa39e96941cfb5309)) by @
* **workflows:** image custom versions ([74e3fd7](https://github.com/Alwatr/flux/commit/74e3fd7b6f9df17eedff87e490e75e06df11b4bc)) by @
* **workflows:** image custom versions ([717d279](https://github.com/Alwatr/flux/commit/717d2790ae41cc639aaf500d123e45ab9479498d)) by @
* **workflows:** install deps ([2a89936](https://github.com/Alwatr/flux/commit/2a899366bc7e49573c15ae19c8ffa0e09b67bd2c)) by @
* **workflows:** name ([02bdf16](https://github.com/Alwatr/flux/commit/02bdf16e90a732e398a9ad71f8ef665c2a1dc80b)) by @
* **workflows:** node version ([89b6fec](https://github.com/Alwatr/flux/commit/89b6fec58b09b0ee374fd481197b5b827ca4b83b)) by @
* **workflow:** update by push to main/next ([008d686](https://github.com/Alwatr/flux/commit/008d686262c7d45b96442d9105eaaf9821fd230a)) by @
* **workflow:** use path for building container ([5ea5934](https://github.com/Alwatr/flux/commit/5ea59342e71c297d2548e7cd66f88e028176fa34)) by @
* **workflow:** wordpress version ([041c4f1](https://github.com/Alwatr/flux/commit/041c4f1f4e328d6c5de1c8f8da8dadfc55c72771)) by @
* workspace ([f635293](https://github.com/Alwatr/flux/commit/f6352936dec8b5bfc8dc6aa4b0c0dd5f761d1a4c)) by @
* **yarn:** conflict ([b58d95b](https://github.com/Alwatr/flux/commit/b58d95bbf01bcebf6a53f059b918ab5febc6f0ff)) by @

### Performance Improvements

* **storage-client:** refactor for perf improve and keep alive ([160bdd0](https://github.com/Alwatr/flux/commit/160bdd0ed365ab38d550bce55de398705f471343)) by @

### Code Refactoring

* AlwatrObservable to use 'message' instead of 'data' ([67aa6e0](https://github.com/Alwatr/flux/commit/67aa6e01aebec8fae0accfb174bcf66fe72ddad7)) by @AliMD
* **apis:** use new nano-server api ([384083c](https://github.com/Alwatr/flux/commit/384083cfc5ece277ef37a7ed730bd59ab22af846)) by @
* **classic-cloud:** refactor up script and cleanup ([6d6821a](https://github.com/Alwatr/flux/commit/6d6821a0c6aa695154c314eea169bb339c8388e8)) by @
* clean script with rimraf ([74bb2a6](https://github.com/Alwatr/flux/commit/74bb2a62e3cf7878d86eb98f46c47b3dad236935)) by @
* clean scripts ([8ee7e8f](https://github.com/Alwatr/flux/commit/8ee7e8f81fa5435269ce19d2cd0782f05ab849f2)) by @
* **com/order-list:** review ([02ae278](https://github.com/Alwatr/flux/commit/02ae278b63a7831b4f5c3b6233664aff268fcfd7)) by @
* **context:** REQUEST event name ([0e67051](https://github.com/Alwatr/flux/commit/0e67051e7f82f01b7562d4dbeffde2511526fcef)) by @
* **context:** review and enhance core api ([8bf3233](https://github.com/Alwatr/flux/commit/8bf323367b8e14b7b1c77c49ed54387d5b58dc30)) by @
* **context:** review and rename all vars ([fd7352d](https://github.com/Alwatr/flux/commit/fd7352d81e350b9fdb0efa7c68d3a93a13a416dc)) by @
* **core:** implement by new `fsm` ([1335761](https://github.com/Alwatr/flux/commit/133576155cdde480350a04f1fe318246aa8b18cd)) by @
* **crypto:** use pre configs ([f80070b](https://github.com/Alwatr/flux/commit/f80070be04cfad02fcac85557816df56fc44cb60)) by @
* **demo/crypto:** hashGenerator config ([5415217](https://github.com/Alwatr/flux/commit/54152176b16ece14e4b599fb459e78d0c4da17dc)) by @
* **demo/storage-client:** syntax ([836dd57](https://github.com/Alwatr/flux/commit/836dd57cf1c1c4490c1382fa9d140117af0e9c17)) by @
* **demo:** rename benchmark ([663871b](https://github.com/Alwatr/flux/commit/663871b2f4edcd33106ae0ceae659268e1ecd647)) by @
* **demo:** with AlwatrObservable ([4d87032](https://github.com/Alwatr/flux/commit/4d87032bba4a7df72d4c7c2886cb6a7a8444304b)) by @
* **fetch-state-machine:** Add JFSM classes ([de792aa](https://github.com/Alwatr/flux/commit/de792aadf6c11fbf3e68931805ca0dcd483409c8)) by @AliMD
* **fetch-state-machine:** base class and imports ([92a17f7](https://github.com/Alwatr/flux/commit/92a17f73243b4bd33fee42c946cfe9afa0bdc12c)) by @AliMD
* **fetch:** refactor to async ([066eacd](https://github.com/Alwatr/flux/commit/066eacdea4ec89f64db5ed2897840fbcb42d965d)) by @
* **fetch:** remove getJson ([6bc3c35](https://github.com/Alwatr/flux/commit/6bc3c351705d39b39859bad4c6d3a0ad78658dea)) by @
* **fetch:** use @alwatr/type ([64d6936](https://github.com/Alwatr/flux/commit/64d69365443ecb776d8afa94e72592b262b8a855)) by @
* **file-storage:** change name to data-storage ([5d422d2](https://github.com/Alwatr/flux/commit/5d422d2c5ce06e7cd43fd4cae5f25da44b90fed9)) by @
* **finite-state-machine2:** based on its module ([793d1dd](https://github.com/Alwatr/flux/commit/793d1ddd37c3b074f40bbcf29d84161af092e2d1)) by @
* **finite-state-machine2:** based on its module ([9aca396](https://github.com/Alwatr/flux/commit/9aca396898fee2f6451b5df96a2ef926f3b53610)) by @
* folder structure ([484da27](https://github.com/Alwatr/flux/commit/484da27b69ac0527644944def5ce79c2a382d4ae)) by @
* **form-registering:** rename service ([ebcaacf](https://github.com/Alwatr/flux/commit/ebcaacf5b6a45a3c86b5215572ea99e25269eb41)) by @
* **fsm2:** extends from `AlwatrBaseSignal` ([d10f7fa](https://github.com/Alwatr/flux/commit/d10f7fa5cfa27a96c606a612cb75a4b6354007c1)) by @
* **fsm2:** with AlwatrObservable ([5d896da](https://github.com/Alwatr/flux/commit/5d896dab7929cf03031bf7253fc5aa76b3472243)) by @
* **fsm:** add state prop and remove gotState ([747abd2](https://github.com/Alwatr/flux/commit/747abd2f935dfd067554a4b112d4d58f309f78b2)) by @
* **fsm:** final review ([dc599a8](https://github.com/Alwatr/flux/commit/dc599a8ea9fc3a5ee5399734dbefa904686fa931)) by @
* **fsm:** rename main ([60a52bd](https://github.com/Alwatr/flux/commit/60a52bdc1e5ae3126226a9518d81f3c8dbf238dc)) by @AliMD
* **fsm:** review ([4c19767](https://github.com/Alwatr/flux/commit/4c197679df918e56014b79b05c73dfec8d80aa35)) by @
* **fsm:** signalList array ([1ec2279](https://github.com/Alwatr/flux/commit/1ec22792ff4cf484c3f2228c366a802bf43356a6)) by @
* **fsm:** StateRecord, signalRecord types ([8b28484](https://github.com/Alwatr/flux/commit/8b2848454c145f33a272c85c557c859a10f2cda9)) by @
* **fsm:** Update FiniteStateMachineBase class ([27a29ca](https://github.com/Alwatr/flux/commit/27a29ca45fb2c7998760ce2177a386c7085011f9)) by @AliMD
* **fsm:** Update FiniteStateMachineBase class to use class property for state and transition methods ([647a921](https://github.com/Alwatr/flux/commit/647a921dab405b5545aecdb66f5d1d44490795d4)) by @AliMD
* **fsm:** Update FiniteStateMachineBase state property to message ([be1ca78](https://github.com/Alwatr/flux/commit/be1ca7897b8ada4b44576c2eaf9f38f3c2903668)) by @AliMD
* **fsm:** Update import statement for type.ts ([6091385](https://github.com/Alwatr/flux/commit/6091385ae7a4c4d92aa74effe6446c8e3a7606e9)) by @AliMD
* global _ALWATR_VERSION_ ([7779c2b](https://github.com/Alwatr/flux/commit/7779c2b202ebc15aed17a629de8c56c50f1d7587)) by @
* **icon2:** move to ui-kit ([28c52de](https://github.com/Alwatr/flux/commit/28c52de51c050bc930976619af31a5448c62b397)) by @
* index html file ([b791cfc](https://github.com/Alwatr/flux/commit/b791cfc6955f6a86ba777afbfdfdc333b0b57ade)) by @
* inline export/import type ([d1facad](https://github.com/Alwatr/flux/commit/d1facad64588b6daeba262451bea15cae52afc87)) by @
* **jatabase:** refactor new package from data-storage ([5ad3b85](https://github.com/Alwatr/flux/commit/5ad3b857ec5a832e97df3d92ad21c6e6ed19cc73)) by @
* Make dispatch__ method private in AlwatrObservable class ([f2fc342](https://github.com/Alwatr/flux/commit/f2fc342181831fe9b2c22e4f99f1fd7e9f66c599)) by @AliMD
* **math:** rewrite UnicodeDigits to improve performance ([615282a](https://github.com/Alwatr/flux/commit/615282a01eb5b8a6a3894d59acadde6e6a3edd06)) by @
* **micro-service:** review and improve ([53769b5](https://github.com/Alwatr/flux/commit/53769b55fb2c910cfaec15f1e222df06611d7313)) by @
* **nano-server:** rename package ([f75bbe8](https://github.com/Alwatr/flux/commit/f75bbe83c2a881f37dc47c8925abeb8380edebf5)) by @
* **nanoservice:** rename microservice starter kit ([5db4330](https://github.com/Alwatr/flux/commit/5db4330290f981ba86d885d049cc9c2df3de534d)) by @
* **package.json:** npm-run-all ([bda0d3e](https://github.com/Alwatr/flux/commit/bda0d3e785d4b301510a0aee2cb6428fa291fc5b)) by @
* **publish-services:** dockerfile ([555cea2](https://github.com/Alwatr/flux/commit/555cea20ee340bd5d8845b02ae0552d645ae85fb)) by @
* **pwa:** review and build ([4f19d0d](https://github.com/Alwatr/flux/commit/4f19d0ddfbec292fb3bd9542f7446ad2fa3cde70)) by @
* **pwa:** review and fix ([c7fdc5b](https://github.com/Alwatr/flux/commit/c7fdc5b2bd5c79fe07ed8e69460cc56a2857d77a)) by @
* refactor index ([1ef58f3](https://github.com/Alwatr/flux/commit/1ef58f3abb16aff4ecdf08779878dbb3f959e9c7)) by @
* Remove AlwatrApiRequest and AlwatrApiRequestBase classes ([7477341](https://github.com/Alwatr/flux/commit/747734134dd716ec64737bc4e0808a41fb673ed4)) by @AliMD
* Remove empty lines in README.md ([f8f25ab](https://github.com/Alwatr/flux/commit/f8f25ab1f553298229b276cf483befa23ebc8535)) by @AliMD
* Remove unused dependencies from @alwatr/fsm package ([da58900](https://github.com/Alwatr/flux/commit/da5890009c9ddea4f45949eef5a372dd3784ea7a)) by @AliMD
* rename everything to alwatr! ([b3ff40a](https://github.com/Alwatr/flux/commit/b3ff40ad9f56f8a3204087ad4194d6424d356062)) by @
* Rename fetch-state-machine.ts base class name ([ab88730](https://github.com/Alwatr/flux/commit/ab88730b46b2db0baeaca09e3de8e51c55b1e361)) by @AliMD
* Rename fetch-state-machine.ts to base.ts and update imports ([5281302](https://github.com/Alwatr/flux/commit/5281302c413e390b73be3a19797f65c332d1ae0e)) by @AliMD
* rename package to packages ([5c45743](https://github.com/Alwatr/flux/commit/5c4574364f0e1931171e427ee3182d427dd2fd21)) by @
* rename project and review all deps and scripts ([0c2e222](https://github.com/Alwatr/flux/commit/0c2e22294d91ae24808e4df767efb28371c43466)) by @
* **router2:** use util renderState ([43175ef](https://github.com/Alwatr/flux/commit/43175efd6f8e64884049d4f21697d16e1aeb8ce6)) by @
* **router:** review and use seprate code file ([dc3fce6](https://github.com/Alwatr/flux/commit/dc3fce6cd3bc377a42f872f206a2fc813e9b84cf)) by @
* **server-context:** rename main ([7922599](https://github.com/Alwatr/flux/commit/79225994b5469158a9144f6f0f0a81e67847616e)) by @AliMD
* **server-context:** Update import statements and package version in server-request.ts ([17b5669](https://github.com/Alwatr/flux/commit/17b566993a59be82aef59e6db336c6358856d5ea)) by @AliMD
* **server-context:** with AlwatrObservable ([6265324](https://github.com/Alwatr/flux/commit/62653242c443eabcf4d194b382933a6ca7cd3644)) by @
* **server-request:** complete refactor all name and methods to new structures ([5b9cf1c](https://github.com/Alwatr/flux/commit/5b9cf1c59a88bb7463076a212dabee8913910757)) by @AliMD
* **server-request:** complete refactor all name and methods to new structures ([7e44e8f](https://github.com/Alwatr/flux/commit/7e44e8f6f8463833b3552938655d4755cce2a097)) by @AliMD
* **service/storage-server:** dockerfile ([de10760](https://github.com/Alwatr/flux/commit/de1076050cdebc22d00c35ed58724d00c4c7af95)) by @
* **services:** to classic-cloud and nanoservice ([b283d87](https://github.com/Alwatr/flux/commit/b283d87c1d8bfcb3d4adb6b2a43782d79e8111fe)) by @
* **signal2:** separate classes ([52e6220](https://github.com/Alwatr/flux/commit/52e62202a44f7b21173143097bb11dfe8730926d)) by @
* **signal:** AlwatrContext to use class property instead of calling super.getData_() ([bbe18bb](https://github.com/Alwatr/flux/commit/bbe18bbb3ca105ee34d802345105a71c874b60e5)) by @AliMD
* **signal:** change subscribe default receivePrevious to NextCycle ([3e8b38f](https://github.com/Alwatr/flux/commit/3e8b38f1d36ab5303c9e08072f2c5fbbf82c61f0)) by @
* **signal:** clearDetail in core ([48b158f](https://github.com/Alwatr/flux/commit/48b158f0992fa1b6df4e5051b72ad7471c6fb208)) by @
* **signal:** core libs ([21ad175](https://github.com/Alwatr/flux/commit/21ad17550b49fffe6b96aa28a9540d33818266c7)) by @
* **signal:** full review for fix all issues ([05c83bb](https://github.com/Alwatr/flux/commit/05c83bb2bbd7b856da6691ba92536d6fd7597833)) by @
* **signal:** move core to lib ([8abed5c](https://github.com/Alwatr/flux/commit/8abed5c25730bf895e2b79056f3294fc8c9cf4eb)) by @
* **signal:** new core interface ([51582e6](https://github.com/Alwatr/flux/commit/51582e66cc8c052081bd996aff3319b82f161655)) by @
* **signal:** Remove reference to api-server in tsconfig.json ([3c6b2e6](https://github.com/Alwatr/flux/commit/3c6b2e6c8e874240ba785cfafe14922637070120)) by @AliMD
* **signal:** rename manager to core ([b0946ae](https://github.com/Alwatr/flux/commit/b0946ae88120876df7fbd6abbc2d044d638848d0)) by @
* **signal:** rename name to id ([618494b](https://github.com/Alwatr/flux/commit/618494ba642db0399b7816110ae004d793ab7ba6)) by @
* **signal:** rename old public api ([ad7c8eb](https://github.com/Alwatr/flux/commit/ad7c8eb444cd6ed7c29c3de315e9499bc1888f16)) by @
* **signal:** review and apply feedbacks ([c026f92](https://github.com/Alwatr/flux/commit/c026f9278a9cce66e4a03453a1968e9002485025)) by @
* **signal:** review everything and change all configs ([c903f1c](https://github.com/Alwatr/flux/commit/c903f1c96e571bacc4f50f2ecda7a0010d6199e9)) by @
* **signal:** setContextProvider, setCommandProvider, requestContext, requestCommand ([0c7139a](https://github.com/Alwatr/flux/commit/0c7139a586029ae6c0bd3cf3a878ceb7931651fb)) by @
* **signal:** signal-manager file name ([b86e79c](https://github.com/Alwatr/flux/commit/b86e79c8deab32820ab8f4d0e253fdee8034b92d)) by @
* **signal:** Update AlwatrContext to use class property instead of calling super.getData_() ([437dbf4](https://github.com/Alwatr/flux/commit/437dbf48af845c7e8c7441566d78ff6884d1c4cc)) by @AliMD
* **soffit-pwa:** rename from site ([001f452](https://github.com/Alwatr/flux/commit/001f45288df9832c44578dc429f7fe1c4631a238)) by @
* **storage-engine:** rename AlwatrStorageEngine ([e9e3214](https://github.com/Alwatr/flux/commit/e9e3214f8284dcfa5b0b49dddd5cc9c1ef459905)) by @
* **storage:** rename package ([6301f5c](https://github.com/Alwatr/flux/commit/6301f5cbe9c4c90bb5ee4cfc520cdac64c5cb612)) by @
* **storage:** rename storage to storage-engine ([6c9fc74](https://github.com/Alwatr/flux/commit/6c9fc7446b0435bc72d92072bf2871e315854752)) by @
* **storage:** rename to storage-engine ([b99d194](https://github.com/Alwatr/flux/commit/b99d1941ada87f7e7d5cd597e71a27728b1a5c8a)) by @
* **storage:** synchronous operations and fix many bugs ([486f8bb](https://github.com/Alwatr/flux/commit/486f8bb35311a9308952282752bea41e3b5d1eb7)) by @
* StringifyableRecord type ([791009c](https://github.com/Alwatr/flux/commit/791009c78b77ea0dda73383cc2fd5ceb74e11c0f)) by @
* StringifyableRecord type ([041fff7](https://github.com/Alwatr/flux/commit/041fff7e636b1cbcbed296b97bf1265262fb3205)) by @
* **telegram-notifier:** review ([ddfb9f5](https://github.com/Alwatr/flux/commit/ddfb9f5bc28b5a6e3f65c38c438e7eb683c416c3)) by @
* **telegram-notifier:** structure ([144ca51](https://github.com/Alwatr/flux/commit/144ca51496850c499bc32aa6d2e69ac63e185c26)) by @
* **types:** StringifyableRecord all base types ([c7ad537](https://github.com/Alwatr/flux/commit/c7ad53710dc04d7880a67ed6404488a7e0b9678f)) by @
* **ui:** card with AlwatrSurfaceElement ([94b0260](https://github.com/Alwatr/flux/commit/94b02602d7693870eda35b8db234815341555fe7)) by @
* **ui:** rename demo-pwa ([b78d2c0](https://github.com/Alwatr/flux/commit/b78d2c06073ab1a1e9818e718d7ff9e5d39c39fe)) by @
* **uniquely/soffit-site-pwa:** build with esbuild ([e15460e](https://github.com/Alwatr/flux/commit/e15460e33a7cf03bb804c1a75defedc80d601502)) by @
* Update .vscode/settings.json ([1daaf35](https://github.com/Alwatr/flux/commit/1daaf35e6b2f9acc5c33df5319c5c3a0d3d266cd)) by @AliMD
* Update @alwatr/context package and add @alwatr/logger package ([54dbf86](https://github.com/Alwatr/flux/commit/54dbf86b1b503bea6d539679d4c1f5ac151d550d)) by @AliMD
* Update @alwatr/fsm package and add @alwatr/observable package ([d78b177](https://github.com/Alwatr/flux/commit/d78b1774978632d66c6831c8a46626f524746e81)) by @AliMD
* Update @alwatr/polyfill-has-own dependency to version ^1.0.9 in fsm package.json ([f1c82a6](https://github.com/Alwatr/flux/commit/f1c82a6d330c3f1bfbf435a00a52e92f0541b024)) by @AliMD
* Update @alwatr/signal package ([9ec8478](https://github.com/Alwatr/flux/commit/9ec8478b956dd2dd83ea42d6ba9ed94582a318a7)) by @AliMD
* Update all package URLs to point to the flux repository ([e7e56d2](https://github.com/Alwatr/flux/commit/e7e56d252d4a0e1b4b1fa20c06e8b61b1b7242ae)) by @AliMD
* Update AlwatrContext constructor to use AlwatrObservableConfig ([f38d27c](https://github.com/Alwatr/flux/commit/f38d27cc9510d1ef14f6fbcfb05b0dfebd03a08a)) by @AliMD
* Update AlwatrContext constructor to use AlwatrObservableConfig ([a8c75c6](https://github.com/Alwatr/flux/commit/a8c75c6f937419e628a0b11b053e0028c731bcaf)) by @AliMD
* Update AlwatrContext constructor to use AlwatrObservableConfig ([98a6de7](https://github.com/Alwatr/flux/commit/98a6de7f6113cd6fb4f5888613be5b17a320db15)) by @AliMD
* Update AlwatrContext constructor to use AlwatrObservableConfig ([c9c3637](https://github.com/Alwatr/flux/commit/c9c363768b52c426abdc29d94a82433a8473c05d)) by @AliMD
* Update AlwatrContext to use 'message' instead of 'data' ([512789b](https://github.com/Alwatr/flux/commit/512789b7c0b90e71e8e1eda5fbd923e18c45731e)) by @AliMD
* Update AlwatrContextSignal to AlwatrContext ([44dd077](https://github.com/Alwatr/flux/commit/44dd077584669f668ab633c0e10a1d6dd6986e21)) by @AliMD
* Update AlwatrSignal and AlwatrSimpleSignal to use 'message' instead of 'data' ([cef6ba6](https://github.com/Alwatr/flux/commit/cef6ba64164f6569a895ef1efa8a33900c1c9cba)) by @AliMD
* Update AlwatrSignal and AlwatrTrigger constructors ([05da419](https://github.com/Alwatr/flux/commit/05da4191ac23ab589cc4982b383c24d9b7a8ae74)) by @AliMD
* Update package dependencies and references ([888f698](https://github.com/Alwatr/flux/commit/888f6987553a410e561da9fe21c0655f8f935db0)) by @AliMD
* Update repository name and description ([28c72a5](https://github.com/Alwatr/flux/commit/28c72a515d86e9f24deb5e130daa8d03d7b468ee)) by @AliMD
* use alwatr types ([0a8a376](https://github.com/Alwatr/flux/commit/0a8a376b6f82a3f17daffa5df94b3df506268dff)) by @
* use alwatr types ([3f61117](https://github.com/Alwatr/flux/commit/3f6111729e4d2f211fbb737bb37176eeef870a77)) by @
* using globalAlwatr ([fa1c983](https://github.com/Alwatr/flux/commit/fa1c98376791b39cbc9ed00a6120da2be23b02b3)) by @
* work with new router API ([18cd412](https://github.com/Alwatr/flux/commit/18cd412168c02f9d8e7d2a0b45088610c2c539ce)) by @
* work with new signal API ([628f394](https://github.com/Alwatr/flux/commit/628f39472b930650859770277b34eec031af2103)) by @
* **workflow/build:** new workflow ([6ccbee2](https://github.com/Alwatr/flux/commit/6ccbee276e44499cdaaada2ed2e0befe54eedc7f)) by @
* **workflows:** seperate build/lint task ([73b7a97](https://github.com/Alwatr/flux/commit/73b7a97d46667c8d03664d0baf863ea7fa724c38)) by @

### Miscellaneous Chores

* **.editorconfig:**  move to root ([f718649](https://github.com/Alwatr/flux/commit/f7186496509379a136e100b0321f688c1bc374b3)) by @
* **.github/depbot:** update ([2ad66ab](https://github.com/Alwatr/flux/commit/2ad66abce4aebe923fe054adccf92794b3357148)) by @
* **.github:** add @microsoft/eslint-formatter-sarif ([8ffebdb](https://github.com/Alwatr/flux/commit/8ffebdbb3728472428263f30c135fde1c440620a)) by @
* **.github:** cleanup ([42d2b67](https://github.com/Alwatr/flux/commit/42d2b67ab4500a20b7e3038395446071971568ab)) by @
* **.github:** remove add-to-project workflow ([7a80f27](https://github.com/Alwatr/flux/commit/7a80f271f867c6835c2ceb73028f4473a11c86ba)) by @
* **.github:** remove branch rule in pr ([66ead9a](https://github.com/Alwatr/flux/commit/66ead9ae934fa5dd93e61f229a4cd6cc6fb615a9)) by @
* **.gitignore:** ignore db folder ([32684ce](https://github.com/Alwatr/flux/commit/32684cef48dbda3a331e13f62f7a384ad1b4a5b7)) by @
* **.vscode:** add from alwatr ([2bb3d38](https://github.com/Alwatr/flux/commit/2bb3d380ae5aceb04054d65e75f39248b9435d93)) by @
* **.vscode:** fix settings ([89be6c2](https://github.com/Alwatr/flux/commit/89be6c2a163d42b738f67c5392f7aab31fad5a09)) by @
* **.vscode:** fix settings ([67fa1e1](https://github.com/Alwatr/flux/commit/67fa1e18cc4eac15e5f5ff52d0747fba741c2c46)) by @
* **.vscode:** update extension recommendation ([0b16c86](https://github.com/Alwatr/flux/commit/0b16c868b8c08200c50c7b6b93756a913153c0d2)) by @
* **.vscode:** update to latest changes ([d1b6c10](https://github.com/Alwatr/flux/commit/d1b6c10c816adf89be8f37a59772c1d9e9df3c14)) by @
* add lint package & lint script ([797ee61](https://github.com/Alwatr/flux/commit/797ee614d2da877707db95345f1a930fe103a92f)) by @
* add logo ([59a798c](https://github.com/Alwatr/flux/commit/59a798c0149fc72ab788ae1fd08bb8e38d50e0cb)) by @
* add my .gitconfig ([32b5278](https://github.com/Alwatr/flux/commit/32b5278ffb5be125d52c5f24a0470d0fcbb38118)) by @
* add user to contributors ([23efbf6](https://github.com/Alwatr/flux/commit/23efbf69cc4ef99b4e1db78940fe17ed8f3cc994)) by @
* **bug_report:** add vatr registered to issues ([434fcde](https://github.com/Alwatr/flux/commit/434fcdea0060e8f770f7952c8fedb1617bc2daf1)) by @
* **bug-report:** let peaple upload image ([74b22ab](https://github.com/Alwatr/flux/commit/74b22ab244e1e35b9da1ea7fc3848243b04743a3)) by @
* build configurations ([3f9deb1](https://github.com/Alwatr/flux/commit/3f9deb13ec9e739a7e9ad0cafe87fd8c16efc5af)) by @
* **ci/dependabot:** schedule ([bf03250](https://github.com/Alwatr/flux/commit/bf03250adf39664903e9e8079cabb1b57744d063)) by @
* **ci:** remove lint group ([a8f7fa6](https://github.com/Alwatr/flux/commit/a8f7fa6b84283c6ffa8c07600bc529f7fcfe5ce6)) by @
* **ci:** update workflow ([bb98276](https://github.com/Alwatr/flux/commit/bb98276821b72f2df4da6d31ffd89604fc60cade)) by @
* **classic-cloud:** decrypt some scripts ([e19df76](https://github.com/Alwatr/flux/commit/e19df768a75979953f15d56702edc10afcff3ba7)) by @
* clean dockerfiles ([efd08a7](https://github.com/Alwatr/flux/commit/efd08a74cd9c60a9807c005f81c16e686ba843c4)) by @
* clean junk file ([64f0850](https://github.com/Alwatr/flux/commit/64f08504a2d5259f4dec9e4e5e5b860fecb4621e)) by @
* cleanup ([fb6bcef](https://github.com/Alwatr/flux/commit/fb6bcef9cc15f4ac0badb3e84324413a7bcec680)) by @
* cleanup ([4831657](https://github.com/Alwatr/flux/commit/48316571ffd83af595d835ee055cbc37baad3a76)) by @
* cleanup ([afbdada](https://github.com/Alwatr/flux/commit/afbdadaf60dde462fb6894476c8b34f4e1b539a5)) by @
* cleanup ([14dea17](https://github.com/Alwatr/flux/commit/14dea1711b232d40c2c8b359c562e0e8ac79d4ed)) by @
* **cloud/wordpress:** update to v6.2 ([f1fdcd1](https://github.com/Alwatr/flux/commit/f1fdcd1ad482d1fa69472695b13e5145b93dbd2e)) by @
* **cloud:** php version ([1a566f4](https://github.com/Alwatr/flux/commit/1a566f475563ddadc39913b3835b43c6228ba5ea)) by @
* **command:** upd ([2aa1c07](https://github.com/Alwatr/flux/commit/2aa1c07583dc802c4cf985c2310acec09e51617d)) by @
* **commenting:** rename to comment ([5539782](https://github.com/Alwatr/flux/commit/5539782d2091ce670499441f5814ecac3634e0c5)) by @
* common settings/files ([bdf4470](https://github.com/Alwatr/flux/commit/bdf4470db0b1f483c38598c7e055ec209e1af3fa)) by @
* common settings/files ([411eec7](https://github.com/Alwatr/flux/commit/411eec7aec27a3e9cc1dd8d01573a4d5545f042f)) by @
* configurations & packages ([da0f66a](https://github.com/Alwatr/flux/commit/da0f66ab35a00ab5d7c2d8b4091b3147317d42b1)) by @
* **context:** cleanup context v1 ([ce55dd7](https://github.com/Alwatr/flux/commit/ce55dd7fb75ae7b46434e5ecf319368898ee906a)) by @
* cSpell word ([5d4e15d](https://github.com/Alwatr/flux/commit/5d4e15de7f44922df6a5b7bf4a3c1cf82687ac1c)) by @
* **demo/es-bench:** bench many func ([42990d3](https://github.com/Alwatr/flux/commit/42990d36b539f877e82d9d09524800e50ff9efad)) by @
* **demo:** Add refrences to tsconfig ([d498503](https://github.com/Alwatr/flux/commit/d498503521c8ef3c253e3a8f8d201459b17beec9)) by @
* **demo:** cleanup and page title ([5bb6151](https://github.com/Alwatr/flux/commit/5bb6151319ad64af99e26bb784381b7691a2e6c8)) by @
* **demo:** test the lint workflow ([caf1342](https://github.com/Alwatr/flux/commit/caf1342d0b61cc418c84f69be757c2f86cc4c50e)) by @
* **demo:** token benchmark ([1a217ed](https://github.com/Alwatr/flux/commit/1a217ed902f6c8347cf4644c4cf73ef58b8ce16e)) by @
* **dependabot:** fix alwatr deps update issue ([84ac701](https://github.com/Alwatr/flux/commit/84ac70109ad042d680f97c5f50963baf3e7fc1e2)) by @
* **dependabot:** fix labels ([8ea1a51](https://github.com/Alwatr/flux/commit/8ea1a51ed94875a84186f500e5fa1fc070fd3b61)) by @
* **dependabot:** fix schema ([b9656a2](https://github.com/Alwatr/flux/commit/b9656a29609a24130d49fb4b069800dab6d9c957)) by @
* **dependabot:** fix schema ([bfa7730](https://github.com/Alwatr/flux/commit/bfa773084ad61c852150bfe96aaab480309a4289)) by @
* **dependabot:** groups ([e4157f3](https://github.com/Alwatr/flux/commit/e4157f320ba047131d864c28b00fda8ee2a7a7df)) by @
* **dependabot:** groups ([8c97e41](https://github.com/Alwatr/flux/commit/8c97e41d37a9b110166726ff83e43aa9e139dcc1)) by @
* **dependabot:** more pull requests ([d2ddc1f](https://github.com/Alwatr/flux/commit/d2ddc1ffd593870ece58b9bef2b9b7b1e095e23b)) by @
* **dependabot:** more pull requests ([5fc3565](https://github.com/Alwatr/flux/commit/5fc3565b4316191fc5c1936a55ed777af558e66f)) by @
* **dependabot:** update to latest changes ([336a3d7](https://github.com/Alwatr/flux/commit/336a3d7d11195907cef30d9a386b20b2326eefae)) by @
* **dependabot:** wakeup ([60a638f](https://github.com/Alwatr/flux/commit/60a638f8b17ed67b8e5296afd4715e3b4296576f)) by @
* **deps-dev:** bump @babel/core from 7.20.5 to 7.20.7 ([7206d52](https://github.com/Alwatr/flux/commit/7206d527f268e3bcfb4bad959adc3bd84a57687c)) by @
* **deps-dev:** bump @babel/core from 7.20.7 to 7.20.12 ([db4c960](https://github.com/Alwatr/flux/commit/db4c96031908429efe5f188d82c8ba4d623fd4d4)) by @
* **deps-dev:** bump @ionic/core from 6.4.1 to 6.4.2 ([#644](https://github.com/Alwatr/flux/issues/644)) ([b33c683](https://github.com/Alwatr/flux/commit/b33c68380a4e4d7c4d6e95c560516641dd36c29d)) by @
* **deps-dev:** bump @ionic/core from 6.4.2 to 6.5.0 ([#683](https://github.com/Alwatr/flux/issues/683)) ([c98fc50](https://github.com/Alwatr/flux/commit/c98fc505a90f2539304cd870eea3c22f56da4899)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.1 to 1.0.0-pre.2 ([7fe0196](https://github.com/Alwatr/flux/commit/7fe01965ef79bb74f6c84dd0e44de00218741996)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.10 to 1.0.0-pre.11 ([5e99f39](https://github.com/Alwatr/flux/commit/5e99f39ad6e5a1804df9997addc769797f62f69f)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.2 to 1.0.0-pre.3 ([06baf55](https://github.com/Alwatr/flux/commit/06baf550d58698eeb29b3fee22feb98ab62245f3)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.3 to 1.0.0-pre.4 ([da35ce6](https://github.com/Alwatr/flux/commit/da35ce6a58f3c365ae5dc09a281b023365448599)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.4 to 1.0.0-pre.5 ([9fe9929](https://github.com/Alwatr/flux/commit/9fe9929ca67c475d59bae7004f03dae18a8d3457)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.5 to 1.0.0-pre.6 ([8807577](https://github.com/Alwatr/flux/commit/8807577d88e4c7148fb94a798bd073b9075ac78e)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.6 to 1.0.0-pre.7 ([3902603](https://github.com/Alwatr/flux/commit/39026032e2b46ec5c7cfa57f34014ce6844b168e)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.7 to 1.0.0-pre.9 ([0191d47](https://github.com/Alwatr/flux/commit/0191d479aa21a56b319e397c89dc8890f484c64d)) by @
* **deps-dev:** bump @material/web from 1.0.0-pre.9 to 1.0.0-pre.10 ([572118d](https://github.com/Alwatr/flux/commit/572118d179e350809e51a8992cc1f62b073ea9f0)) by @
* **deps-dev:** bump @rollup/plugin-babel from 6.0.2 to 6.0.3 ([52f1fc0](https://github.com/Alwatr/flux/commit/52f1fc0e32c6a6ff492c1095221b3869bf469729)) by @
* **deps-dev:** bump @rollup/plugin-terser from 0.1.0 to 0.2.1 ([76c95a8](https://github.com/Alwatr/flux/commit/76c95a8b41e4456a6dcecd11cef1eb8a9109d1f5)) by @
* **deps-dev:** bump @rollup/plugin-terser from 0.2.1 to 0.3.0 ([6b5c4f9](https://github.com/Alwatr/flux/commit/6b5c4f9dfa0f286e5518c7f0680bc14e30f99bbd)) by @
* **deps-dev:** bump @types/node from 18.11.10 to 18.11.11 ([05c2e02](https://github.com/Alwatr/flux/commit/05c2e02529c7d56eeb201de029ad0c1c1268be13)) by @
* **deps-dev:** bump @types/node from 18.11.10 to 18.11.11 ([dc3d42f](https://github.com/Alwatr/flux/commit/dc3d42f00a7577538b622df96d931a25ebb419f3)) by @
* **deps-dev:** bump @types/node from 18.11.11 to 18.11.12 ([64f77a0](https://github.com/Alwatr/flux/commit/64f77a040805bb8cb315081059e0d644c6f46499)) by @
* **deps-dev:** bump @types/node from 18.11.12 to 18.11.13 ([bc3629e](https://github.com/Alwatr/flux/commit/bc3629e8d28e858413122345ec6e9dbbcfd2cf90)) by @
* **deps-dev:** bump @types/node from 18.11.13 to 18.11.15 ([532cf46](https://github.com/Alwatr/flux/commit/532cf46fff653be2715cb14188a581cd66a94b2e)) by @
* **deps-dev:** bump @types/node from 18.11.15 to 18.11.17 ([0c69e76](https://github.com/Alwatr/flux/commit/0c69e760fbef8a00aac57befe864441e4ee90fa0)) by @
* **deps-dev:** bump @types/node from 18.11.17 to 18.11.18 ([068ec01](https://github.com/Alwatr/flux/commit/068ec01e7c733b36f08635a4c315fc9282dd92f0)) by @
* **deps-dev:** bump @types/node from 18.11.18 to 18.11.19 ([9c9516d](https://github.com/Alwatr/flux/commit/9c9516da0bf6feec0e6df296ff9bcd8ccfdb63d0)) by @
* **deps-dev:** bump @types/node from 18.11.19 to 18.13.0 ([d2e6116](https://github.com/Alwatr/flux/commit/d2e6116a7367a5d7102ebe6df1fe22abd81680a4)) by @
* **deps-dev:** bump @types/node from 18.11.2 to 18.11.3 ([c7e1c38](https://github.com/Alwatr/flux/commit/c7e1c38f12588ea3bf4b3a45acb4812098f6c329)) by @
* **deps-dev:** bump @types/node from 18.11.3 to 18.11.7 ([c284dbb](https://github.com/Alwatr/flux/commit/c284dbb963c12ba8c3f4b0be948c00320bd043d9)) by @
* **deps-dev:** bump @types/node from 18.11.7 to 18.11.8 ([fce26df](https://github.com/Alwatr/flux/commit/fce26df37a1aaa020411725fed5899531aab1112)) by @
* **deps-dev:** bump @types/node from 18.11.8 to 18.11.9 ([18712ff](https://github.com/Alwatr/flux/commit/18712ff37577f9f8027edffd54beada80b4ba4a0)) by @
* **deps-dev:** bump @types/node from 18.11.9 to 18.11.10 ([ebf3387](https://github.com/Alwatr/flux/commit/ebf3387fb8352c927664e8ddaa8be0030e649a31)) by @
* **deps-dev:** bump @types/node from 18.11.9 to 18.11.10 ([6bc1523](https://github.com/Alwatr/flux/commit/6bc15236bc4878b1d3098d4d0d488d699a163757)) by @
* **deps-dev:** bump @types/node from 18.13.0 to 18.14.1 ([68f4a6f](https://github.com/Alwatr/flux/commit/68f4a6f45d1b4f5d4d1f72686903d1be8d8c4e79)) by @
* **deps-dev:** bump @types/node from 18.14.1 to 18.14.2 ([#881](https://github.com/Alwatr/flux/issues/881)) ([c33dc20](https://github.com/Alwatr/flux/commit/c33dc20afb27a3d8003c940115ee313fd1e381d9)) by @
* **deps-dev:** bump @types/node from 18.14.2 to 18.14.4 ([6e0eb0e](https://github.com/Alwatr/flux/commit/6e0eb0eb4da71b88bfab0bd01f953c0fa8cdc2ae)) by @
* **deps-dev:** bump @types/node from 18.14.4 to 18.14.5 ([417291e](https://github.com/Alwatr/flux/commit/417291e560ff62ec4e02c38feada0a995f5c0f0a)) by @
* **deps-dev:** bump @types/node from 18.14.5 to 18.15.3 ([165af39](https://github.com/Alwatr/flux/commit/165af3998bfd04b05fdcce1e6b133e3cc92df208)) by @
* **deps-dev:** bump @types/node from 18.15.11 to 18.15.13 ([dca5dcc](https://github.com/Alwatr/flux/commit/dca5dcc9a33b238aa4b9ce6b0321056a75a2a932)) by @
* **deps-dev:** bump @types/node from 18.15.13 to 18.16.0 ([6e41582](https://github.com/Alwatr/flux/commit/6e415822cd1d9b02ba62d4a5015f1abd3adc3297)) by @
* **deps-dev:** bump @types/node from 18.15.3 to 18.15.5 ([5c108e6](https://github.com/Alwatr/flux/commit/5c108e6c921961565d60192e8d525543a1ba117f)) by @
* **deps-dev:** bump @types/node from 18.15.5 to 18.15.11 ([8e300ea](https://github.com/Alwatr/flux/commit/8e300eaf8a821a39f8c9b0851197fa5fee4871fe)) by @
* **deps-dev:** bump @types/node from 18.16.0 to 18.16.1 ([b0233a3](https://github.com/Alwatr/flux/commit/b0233a3a59e605bb814d6d3c4eb24f865ed09193)) by @
* **deps-dev:** bump @types/node from 18.16.1 to 18.16.2 ([2a8fa20](https://github.com/Alwatr/flux/commit/2a8fa20fb03281f0a192684fe6a126c2ccd77930)) by @
* **deps-dev:** bump @types/node from 18.16.2 to 20.1.0 ([4b3c0b8](https://github.com/Alwatr/flux/commit/4b3c0b8b51fa1014cc260b6cb686bdb70dba5d9f)) by @
* **deps-dev:** bump @types/node from 18.6.4 to 18.7.14 ([c1d92a8](https://github.com/Alwatr/flux/commit/c1d92a8c673b75e0b83afdc00e79820edcc2b36b)) by @
* **deps-dev:** bump @types/node from 18.7.14 to 18.7.15 ([97ebfd4](https://github.com/Alwatr/flux/commit/97ebfd4d34e0f727b4c2b2dca87189c49861d5b1)) by @
* **deps-dev:** bump @types/node from 18.7.15 to 18.7.16 ([e05ab90](https://github.com/Alwatr/flux/commit/e05ab90b35479a96bfee4314c8bea61cc1c5bb1b)) by @
* **deps-dev:** bump @types/node from 18.7.16 to 18.7.18 ([b1c8122](https://github.com/Alwatr/flux/commit/b1c8122827c031b5bbeaf358daa38643096ea32b)) by @
* **deps-dev:** bump @types/node from 18.7.18 to 18.8.2 ([a817ee9](https://github.com/Alwatr/flux/commit/a817ee916baeb160317ececcf338e43c718470ed)) by @
* **deps-dev:** bump @types/node from 18.7.18 to 18.8.3 ([f0ee1e4](https://github.com/Alwatr/flux/commit/f0ee1e41272ba0ceab457f5d63a5580fea13a7b7)) by @
* **deps-dev:** bump @types/node from 18.8.3 to 18.8.5 ([257728f](https://github.com/Alwatr/flux/commit/257728fa3efcd497217d82f3e23600d3e117458b)) by @
* **deps-dev:** bump @types/node from 18.8.5 to 18.11.2 ([808afd1](https://github.com/Alwatr/flux/commit/808afd1f519a62f3d1a1cebab0ff4c55cb49e03d)) by @
* **deps-dev:** bump @types/node from 20.1.0 to 20.2.5 ([1196dc7](https://github.com/Alwatr/flux/commit/1196dc7af2e9539ad9bd5f62fd80ec1d777747ca)) by @
* **deps-dev:** bump @types/node from 20.2.5 to 20.3.1 ([a32192f](https://github.com/Alwatr/flux/commit/a32192fc7faac6eaaffdd8959a56f8b7c1c9c1aa)) by @
* **deps-dev:** bump @types/node from 20.3.1 to 20.3.2 ([9b480fa](https://github.com/Alwatr/flux/commit/9b480fab122a93bc11673454f24bc71991695638)) by @
* **deps-dev:** bump @types/node from 20.3.2 to 20.4.0 ([d8a99f1](https://github.com/Alwatr/flux/commit/d8a99f17e3fe58f85300d548bb060ac64a719f95)) by @
* **deps-dev:** bump @types/node from 20.4.0 to 20.4.1 ([8d15581](https://github.com/Alwatr/flux/commit/8d1558116feda3d148886f2b69fff5b5a5468715)) by @
* **deps-dev:** bump @types/node from 20.4.0 to 20.4.2 ([6663126](https://github.com/Alwatr/flux/commit/666312670df818877d1f0fb6c3200be6c4e98320)) by @
* **deps-dev:** bump @types/node from 20.4.2 to 20.4.5 ([741af6f](https://github.com/Alwatr/flux/commit/741af6ff03d971505d350410c36a9e464fe67184)) by @
* **deps-dev:** bump @types/node from 20.4.5 to 20.4.6 ([20c59f6](https://github.com/Alwatr/flux/commit/20c59f6974b1ed19f4544d4ef7084bcb683fd63e)) by @
* **deps-dev:** bump @types/node from 20.4.6 to 20.4.7 ([436657a](https://github.com/Alwatr/flux/commit/436657a9afac352a09388a078a89a6d322c6ba97)) by @
* **deps-dev:** bump @types/node from 20.4.7 to 20.4.8 ([1e7ae5f](https://github.com/Alwatr/flux/commit/1e7ae5fd56da35a913d8482745b77eebb215aed5)) by @
* **deps-dev:** bump @types/node from 20.4.8 to 20.5.0 ([78dccb3](https://github.com/Alwatr/flux/commit/78dccb317cd17a59f413934234d978716b935caa)) by @
* **deps-dev:** bump @types/node from 20.5.0 to 20.5.1 ([04a1be5](https://github.com/Alwatr/flux/commit/04a1be53e317b52c6bfdd2d4f3641f0498dbc9aa)) by @
* **deps-dev:** bump @types/node from 20.5.1 to 20.5.2 ([326beed](https://github.com/Alwatr/flux/commit/326beed7e16c926fa270ee91fbc772e3eedf0858)) by @
* **deps-dev:** bump @types/node from 20.5.2 to 20.5.3 ([b9f03ce](https://github.com/Alwatr/flux/commit/b9f03ce40164c47325573b38c4327e2447bd4541)) by @
* **deps-dev:** bump @types/node from 20.5.3 to 20.5.4 ([15c0527](https://github.com/Alwatr/flux/commit/15c0527782eb5b884a351dfda829c12a4c922a72)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([3790d64](https://github.com/Alwatr/flux/commit/3790d64c858076c2c28a559af22826b52b6b3aa7)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([4bf6c9f](https://github.com/Alwatr/flux/commit/4bf6c9f15c96d90a2c9f9213f39091eb080ad65c)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([d7802fa](https://github.com/Alwatr/flux/commit/d7802fa8d15434485eb6c76bdc32648799b6bb60)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([bb97af4](https://github.com/Alwatr/flux/commit/bb97af446fd78d1deef0269a8ba6dfbf7f3eb72b)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([0bcbf52](https://github.com/Alwatr/flux/commit/0bcbf52ad6a42d5f01c86affbd5a2017c98595be)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([5b9afaf](https://github.com/Alwatr/flux/commit/5b9afafe8aa48bcc571ac327f0b8b729f6e08f87)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([55e7429](https://github.com/Alwatr/flux/commit/55e742925d152d4dac4be862308407fd7b251dcf)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([4283f20](https://github.com/Alwatr/flux/commit/4283f20672b2977431013f90f74212b1ab181364)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([375a75f](https://github.com/Alwatr/flux/commit/375a75f6766a40a453439569f93ee34592883327)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([8f10fa1](https://github.com/Alwatr/flux/commit/8f10fa144eff3c0c923feaed8de10aa5f07b5e2e)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([1dda203](https://github.com/Alwatr/flux/commit/1dda203ffe099b02714943b392b063d67984756f)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([38d6d3e](https://github.com/Alwatr/flux/commit/38d6d3ebc1a2d0852059c7d21bf9d20648e721df)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([bcbca76](https://github.com/Alwatr/flux/commit/bcbca765679d6f0642a2eeccb7a70e886c48634f)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([9686942](https://github.com/Alwatr/flux/commit/96869420d62b51c8423423cf19d621030a09ea21)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([b0b92ff](https://github.com/Alwatr/flux/commit/b0b92ff58f70fed00e7175757c4757c5faa767c2)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([d474603](https://github.com/Alwatr/flux/commit/d47460386e6bf0481ebb11f0b8a0d46795eec074)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([d7f0887](https://github.com/Alwatr/flux/commit/d7f08879ea1ce13ac4885f77fc29e54acb5a82f9)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([827f8cf](https://github.com/Alwatr/flux/commit/827f8cf7892dff68c3bd24b362486019149e0ae3)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([a489894](https://github.com/Alwatr/flux/commit/a489894b4161ea1c4f12cc044ee112831a072f3f)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([f81b3fc](https://github.com/Alwatr/flux/commit/f81b3fc13c5a33e6b9b2c05b1f5d0a2949708f6d)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([8993e63](https://github.com/Alwatr/flux/commit/8993e6321b909d28b1b7bb08c6f00e7d8f341c95)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([625abdc](https://github.com/Alwatr/flux/commit/625abdc42bda863973bf1198fa7e764d6e4e2df4)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([2d828c7](https://github.com/Alwatr/flux/commit/2d828c7ea2cf80daa494e478bb46052b50c5aed8)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([ced1b82](https://github.com/Alwatr/flux/commit/ced1b824434e198f2a191181d002a71f2772186b)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([edca22e](https://github.com/Alwatr/flux/commit/edca22ee9baba193fe6211f3a47f383233b59c49)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([6d8788c](https://github.com/Alwatr/flux/commit/6d8788c5baca4a7795f638a0590d60e17ff8fe16)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([a22075c](https://github.com/Alwatr/flux/commit/a22075c835e8532133638bdf1be1ffe22356d8b3)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([c94b0fb](https://github.com/Alwatr/flux/commit/c94b0fb50329dfeb0dfd2cbf745460080d66890d)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([e877035](https://github.com/Alwatr/flux/commit/e877035cc54e07e5fd08a17ae49c54db61f0200e)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([19602af](https://github.com/Alwatr/flux/commit/19602af98fcb92c427aba51e9a349c7b55736455)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([8acf617](https://github.com/Alwatr/flux/commit/8acf6172f02bd340d6a4886ed162cf85946e439a)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([4eda7b9](https://github.com/Alwatr/flux/commit/4eda7b95d8b2eb4ae4bf24533653b1374f7b8f82)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([42bc698](https://github.com/Alwatr/flux/commit/42bc6982cfc6fc9e8127e954440337b6bd879b4c)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([320cca7](https://github.com/Alwatr/flux/commit/320cca7431d813fc111c9069134d4a562a84921f)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([5b3dd1a](https://github.com/Alwatr/flux/commit/5b3dd1aae99b490a479eb00ab64fc3e8a54c3912)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([753bd4d](https://github.com/Alwatr/flux/commit/753bd4d31a80603d4ed8607139e0aa7bb1335224)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([1bc3e6d](https://github.com/Alwatr/flux/commit/1bc3e6df9b4c15fa9bdc11273296f6702544390f)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([c27f7f4](https://github.com/Alwatr/flux/commit/c27f7f4c0a900e8d398857f1aa8390e549a9e43d)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([2d6c6d9](https://github.com/Alwatr/flux/commit/2d6c6d99245b8f4e189fe34648567f3a041dcc9e)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([d004cf8](https://github.com/Alwatr/flux/commit/d004cf81520520825396d3ba312584fe40bc3fc0)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([5ffbc27](https://github.com/Alwatr/flux/commit/5ffbc270d17627b2d5b24af7bbba0249a974ff5f)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([b940eef](https://github.com/Alwatr/flux/commit/b940eef1340abad32e0b84c7317078bd42524f7d)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([b6dd5f4](https://github.com/Alwatr/flux/commit/b6dd5f4280bcab8dedfdbae988c6c97facc6ee4b)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 5.48.1 to 5.48.2 ([#671](https://github.com/Alwatr/flux/issues/671)) ([7da3bd3](https://github.com/Alwatr/flux/commit/7da3bd3aa0eca09158e7fbe511a26db65253075c)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 5.49.0 to 5.50.0 ([#748](https://github.com/Alwatr/flux/issues/748)) ([dfa7dc3](https://github.com/Alwatr/flux/commit/dfa7dc32330aed6413418f92dacb6efa2c59f18c)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 5.51.0 to 5.52.0 ([#817](https://github.com/Alwatr/flux/issues/817)) ([1c63d00](https://github.com/Alwatr/flux/commit/1c63d003a9e2f0abb7918572fdd3c42df777bafd)) by @
* **deps-dev:** bump @typescript-eslint/eslint-plugin from 5.53.0 to 5.54.0 ([#884](https://github.com/Alwatr/flux/issues/884)) ([6f30ad1](https://github.com/Alwatr/flux/commit/6f30ad167f653241fd73c7bdc1c542ed1e8f0308)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.32.0 to 5.36.1 ([733d1c4](https://github.com/Alwatr/flux/commit/733d1c41b637d25a44992a039f0c754318dece44)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.36.1 to 5.36.2 ([c0eb9d7](https://github.com/Alwatr/flux/commit/c0eb9d7dd6eb5d0dbc5077c50ee87a73e1741ee9)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.36.2 to 5.37.0 ([251e6a3](https://github.com/Alwatr/flux/commit/251e6a3c6fe678a02249d5837b5b2214b69770b4)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.37.0 to 5.38.0 ([25f343c](https://github.com/Alwatr/flux/commit/25f343cb969095189ffcf92a1664cb8258ca4113)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.38.0 to 5.39.0 ([4669727](https://github.com/Alwatr/flux/commit/46697271141efd7edfc0c3dba24ba703176753f8)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.39.0 to 5.40.0 ([0db5bed](https://github.com/Alwatr/flux/commit/0db5bed8f82331be2668c2bb494d2fc8ad6daefe)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.40.0 to 5.40.1 ([7dc5a81](https://github.com/Alwatr/flux/commit/7dc5a81c33e62b8fe4253ba456a88f03b2959197)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.40.1 to 5.41.0 ([d086cf8](https://github.com/Alwatr/flux/commit/d086cf8f140f6f34408bf229f9cca223dddf04ae)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.41.0 to 5.42.0 ([4bdef4f](https://github.com/Alwatr/flux/commit/4bdef4f06d9766453c0695046c7aec4e2a39e5ce)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.42.0 to 5.42.1 ([5f66b66](https://github.com/Alwatr/flux/commit/5f66b66f9f25325b5f46dca21208e46e1070e9a0)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.42.1 to 5.43.0 ([db44cd0](https://github.com/Alwatr/flux/commit/db44cd00c5d5e094bc71a38f6ecdfa307e91949c)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.43.0 to 5.44.0 ([8cd2861](https://github.com/Alwatr/flux/commit/8cd28610313732690c27f849b12195ba8e38e26c)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.43.0 to 5.44.0 ([763073b](https://github.com/Alwatr/flux/commit/763073b6508f10f556714b697f1a2a8a8071b2b8)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.44.0 to 5.45.0 ([d8897a4](https://github.com/Alwatr/flux/commit/d8897a4b4f006a971e30028788770d350549879d)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.44.0 to 5.45.0 ([70df446](https://github.com/Alwatr/flux/commit/70df446c1187d1b002e81fb98ba7afa876ae8a2b)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.45.0 to 5.45.1 ([107a210](https://github.com/Alwatr/flux/commit/107a2102ef8a222650514957016b7aace48f3d87)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.45.0 to 5.45.1 ([58718c5](https://github.com/Alwatr/flux/commit/58718c542b596f775256e29090d18233d7cd3828)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.45.1 to 5.46.0 ([7a012c1](https://github.com/Alwatr/flux/commit/7a012c1dd379e5307379bee39d0176ac1efc8de3)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.46.0 to 5.46.1 ([68f31a8](https://github.com/Alwatr/flux/commit/68f31a814b1f95bd303566cd4a08f6107ac55c7e)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.46.1 to 5.47.0 ([80530f4](https://github.com/Alwatr/flux/commit/80530f4f97372c459a52d86de19d22816ee121c4)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.47.0 to 5.47.1 ([#578](https://github.com/Alwatr/flux/issues/578)) ([6476db4](https://github.com/Alwatr/flux/commit/6476db49b63a8b0622430f6b2cdee42ebf1a3684)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.47.1 to 5.48.0 ([a87bf4a](https://github.com/Alwatr/flux/commit/a87bf4acf44a0def71940876b92b90b08940d33d)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.48.0 to 5.48.1 ([d654ff0](https://github.com/Alwatr/flux/commit/d654ff03216d557263d819feab437b2a14f82380)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.48.1 to 5.48.2 ([#672](https://github.com/Alwatr/flux/issues/672)) ([9bdf83f](https://github.com/Alwatr/flux/commit/9bdf83f697df5463936fb4207f6066f739bad328)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.48.2 to 5.49.0 ([08934d0](https://github.com/Alwatr/flux/commit/08934d01942f66f8eb84b1d0c7075235a54f6d0e)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.49.0 to 5.50.0 ([785dbb2](https://github.com/Alwatr/flux/commit/785dbb2048cfdb4134dc0159e75c8dc2f1a4b7b3)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.50.0 to 5.51.0 ([3f378c8](https://github.com/Alwatr/flux/commit/3f378c8f14d720496b07e6b0d8982bc6f3d1c110)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.51.0 to 5.52.0 ([#816](https://github.com/Alwatr/flux/issues/816)) ([b02d516](https://github.com/Alwatr/flux/commit/b02d516a55ff960b1364c32b4e54c1ae0f267a06)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.52.0 to 5.53.0 ([525b556](https://github.com/Alwatr/flux/commit/525b556a191d6feb84d5c4c278c19ae34d1eb481)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.53.0 to 5.54.0 ([c98076e](https://github.com/Alwatr/flux/commit/c98076e1a874901264236977a0cb13451419d3c0)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.54.0 to 5.55.0 ([d869693](https://github.com/Alwatr/flux/commit/d869693b626f69bbe7d6c0b101ae84679bd4815c)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.55.0 to 5.56.0 ([846203d](https://github.com/Alwatr/flux/commit/846203d952eb356050653996fbd1fc16226d2823)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.56.0 to 5.57.0 ([12def09](https://github.com/Alwatr/flux/commit/12def099330c54e1b7a57922d5eed333652d7cba)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.57.0 to 5.59.0 ([e398d1b](https://github.com/Alwatr/flux/commit/e398d1be7dd7f9b4e5c0d992be75af9f4e719518)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.59.0 to 5.59.1 ([b80e0ec](https://github.com/Alwatr/flux/commit/b80e0ec5539327ca22ff300b3b5e7d92c09d56c6)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.59.1 to 5.59.2 ([029d4a3](https://github.com/Alwatr/flux/commit/029d4a371abf2fc522e1ea25a13a5f163451f2a2)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.59.11 to 5.60.0 ([a1ce09a](https://github.com/Alwatr/flux/commit/a1ce09a3825620a158ef2bc2d3e5bed4c7740f68)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.59.2 to 5.59.7 ([dc72369](https://github.com/Alwatr/flux/commit/dc723697300d3bbbbf21d40dec8431e2a8ad1df1)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.59.7 to 5.59.9 ([0508c0a](https://github.com/Alwatr/flux/commit/0508c0ae6d4c72dbdbca4b2c3e485a306c189e18)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.59.9 to 5.59.11 ([5bd72e4](https://github.com/Alwatr/flux/commit/5bd72e4d01701d4333165344b9c93eaee576b1e3)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.60.0 to 5.60.1 ([e9973f3](https://github.com/Alwatr/flux/commit/e9973f36a85636174b35f7c224fd9ff9c266bd26)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.60.1 to 5.61.0 ([112af98](https://github.com/Alwatr/flux/commit/112af98144aff4bd050a4c389283a10549df45c2)) by @
* **deps-dev:** bump @typescript-eslint/parser from 5.61.0 to 5.62.0 ([111a2e3](https://github.com/Alwatr/flux/commit/111a2e34c8fb721ac2ae335874df97d4ac920188)) by @
* **deps-dev:** bump @typescript-eslint/parser from 6.0.0 to 6.1.0 ([c5147e1](https://github.com/Alwatr/flux/commit/c5147e1ec60e55dc728fa7c792441d8a9ca0b37d)) by @
* **deps-dev:** bump @typescript-eslint/parser from 6.2.0 to 6.2.1 ([916b3da](https://github.com/Alwatr/flux/commit/916b3da8567ed9564c8cd917c41684c97ebb5474)) by @
* **deps-dev:** bump @typescript-eslint/parser from 6.2.1 to 6.3.0 ([3bd3920](https://github.com/Alwatr/flux/commit/3bd3920c1247fa1ebc22c82a56bdfa2e42c02b2b)) by @
* **deps-dev:** bump @typescript-eslint/parser from 6.3.0 to 6.4.0 ([46f2ed7](https://github.com/Alwatr/flux/commit/46f2ed7b2207799293821780d36a34bd2c88d454)) by @
* **deps-dev:** bump @typescript-eslint/parser from 6.4.0 to 6.4.1 ([56a2ab2](https://github.com/Alwatr/flux/commit/56a2ab22dce6fa1988110a7207ee3e49962fb28a)) by @
* **deps-dev:** bump @web/dev-server from 0.1.33 to 0.1.34 ([a4b4f9a](https://github.com/Alwatr/flux/commit/a4b4f9a8e4ce4914a3cf321570107c68dfa218fb)) by @
* **deps-dev:** bump @web/dev-server from 0.1.35 to 0.1.36 ([0557f5e](https://github.com/Alwatr/flux/commit/0557f5e8b57979b31315ad8d920e81592c84304e)) by @
* **deps-dev:** bump @web/dev-server from 0.1.36 to 0.1.37 ([71ae9f0](https://github.com/Alwatr/flux/commit/71ae9f09a8f3524b51c91d572864fade6834a4d0)) by @
* **deps-dev:** bump @web/dev-server from 0.1.37 to 0.1.38 ([1a0ab8c](https://github.com/Alwatr/flux/commit/1a0ab8c48d9787d5b15848f69add4bcb0a2a41ce)) by @
* **deps-dev:** bump @web/dev-server from 0.1.38 to 0.2.0 ([5827852](https://github.com/Alwatr/flux/commit/58278524f0c982dfcddf157fe87298b961d99bfd)) by @
* **deps-dev:** bump @web/dev-server from 0.2.0 to 0.2.1 ([d8ce802](https://github.com/Alwatr/flux/commit/d8ce802557383c1ae75af68405e931b3a091a9cc)) by @
* **deps-dev:** bump @web/dev-server from 0.2.1 to 0.2.3 ([3c7d709](https://github.com/Alwatr/flux/commit/3c7d709e67cea8ff42c302634e9bdfc104704fb0)) by @
* **deps-dev:** bump @web/dev-server from 0.2.3 to 0.2.5 ([6c166b4](https://github.com/Alwatr/flux/commit/6c166b405b3316bdec79eb0c3ccfd0d2be15fc3a)) by @
* **deps-dev:** bump @web/dev-server from 0.2.5 to 0.3.0 ([aa8d815](https://github.com/Alwatr/flux/commit/aa8d81548e6ccc56802eabeedad25b9e8b0dc156)) by @
* **deps-dev:** bump @webcomponents/webcomponentsjs from 2.7.0 to 2.8.0 ([e2aefe8](https://github.com/Alwatr/flux/commit/e2aefe8b90696af1f0147ce878bcd05e5f80f16c)) by @
* **deps-dev:** bump autoprefixer from 10.4.14 to 10.4.15 ([7aa6f3d](https://github.com/Alwatr/flux/commit/7aa6f3d098ce161ec3150274a5a535c62920e7f2)) by @
* **deps-dev:** bump esbuild from 0.16.10 to 0.16.11 ([32b47a6](https://github.com/Alwatr/flux/commit/32b47a691856f200f1c7afcb02c07467c3c90543)) by @
* **deps-dev:** bump esbuild from 0.16.13 to 0.16.14 ([48b7d23](https://github.com/Alwatr/flux/commit/48b7d23edd2a9c4fdcd1819c327479369cd542b9)) by @
* **deps-dev:** bump esbuild from 0.16.17 to 0.17.2 ([#675](https://github.com/Alwatr/flux/issues/675)) ([6551428](https://github.com/Alwatr/flux/commit/6551428e8650bc869d4f38f01160e3ff89f2d2a7)) by @
* **deps-dev:** bump esbuild from 0.16.17 to 0.17.3 ([#682](https://github.com/Alwatr/flux/issues/682)) ([00022fc](https://github.com/Alwatr/flux/commit/00022fc45cf99489519f2182146a28ee6214e4f5)) by @
* **deps-dev:** bump esbuild from 0.16.4 to 0.16.6 ([dc40a43](https://github.com/Alwatr/flux/commit/dc40a43036c5f5a1a8b286a858cceb5de398c4b7)) by @
* **deps-dev:** bump esbuild from 0.16.6 to 0.16.7 ([0663158](https://github.com/Alwatr/flux/commit/0663158cd4a04da087db316d438c3dc0dda8fe85)) by @
* **deps-dev:** bump esbuild from 0.16.9 to 0.16.10 ([#525](https://github.com/Alwatr/flux/issues/525)) ([865f4a8](https://github.com/Alwatr/flux/commit/865f4a834c5747f7fcfcef4d0bd48c6cb65051e2)) by @
* **deps-dev:** bump esbuild from 0.17.10 to 0.17.11 ([1058eef](https://github.com/Alwatr/flux/commit/1058eef8092d4e1e6cecd6bea5519270f875bd88)) by @
* **deps-dev:** bump esbuild from 0.17.11 to 0.17.12 ([7092254](https://github.com/Alwatr/flux/commit/7092254c7225a98fd9996d9aa49e01bbdbf787ef)) by @
* **deps-dev:** bump esbuild from 0.17.12 to 0.17.14 ([dbff153](https://github.com/Alwatr/flux/commit/dbff153711173462a4c6e81239d5028571e32849)) by @
* **deps-dev:** bump esbuild from 0.17.14 to 0.17.15 ([c2a280e](https://github.com/Alwatr/flux/commit/c2a280e64427b9478dba58e8b8d52dbf3e458573)) by @
* **deps-dev:** bump esbuild from 0.17.15 to 0.17.16 ([76c466d](https://github.com/Alwatr/flux/commit/76c466d62a4ba59b488944a4743e9d91ee062590)) by @
* **deps-dev:** bump esbuild from 0.17.16 to 0.17.17 ([e2a1192](https://github.com/Alwatr/flux/commit/e2a11929845fd9b0e91be17bb91d2e62e45f9f7e)) by @
* **deps-dev:** bump esbuild from 0.17.17 to 0.17.18 ([12dea35](https://github.com/Alwatr/flux/commit/12dea3567fe4f57324a8c41219959bf286e9bdde)) by @
* **deps-dev:** bump esbuild from 0.17.18 to 0.17.19 ([6e25b8e](https://github.com/Alwatr/flux/commit/6e25b8e90351c946e6bab9a4d67b826640c5bfdd)) by @
* **deps-dev:** bump esbuild from 0.17.19 to 0.18.2 ([d4a1f57](https://github.com/Alwatr/flux/commit/d4a1f57b6c6c17e2f9945fb94ef4882a7c0546d3)) by @
* **deps-dev:** bump esbuild from 0.17.3 to 0.17.4 ([334375c](https://github.com/Alwatr/flux/commit/334375cfa87f90352ad77c99317ddea819788fb7)) by @
* **deps-dev:** bump esbuild from 0.17.4 to 0.17.5 ([#737](https://github.com/Alwatr/flux/issues/737)) ([9a8b020](https://github.com/Alwatr/flux/commit/9a8b020490f2c8ce680d0306f2492fe13b5d0766)) by @
* **deps-dev:** bump esbuild from 0.17.5 to 0.17.6 ([98b68ce](https://github.com/Alwatr/flux/commit/98b68ce0c89b11186639fe4ec563da8fccafc6d3)) by @
* **deps-dev:** bump esbuild from 0.17.6 to 0.17.7 ([753febd](https://github.com/Alwatr/flux/commit/753febddbc86db728253b2e636d2ca53ca8431c4)) by @
* **deps-dev:** bump esbuild from 0.17.7 to 0.17.8 ([4be2798](https://github.com/Alwatr/flux/commit/4be27982be56b445ee69d8e6f15503ad21310b15)) by @
* **deps-dev:** bump esbuild from 0.17.8 to 0.17.10 ([#839](https://github.com/Alwatr/flux/issues/839)) ([a433975](https://github.com/Alwatr/flux/commit/a4339759b99469f603f2c70ae72c6bb293223f77)) by @
* **deps-dev:** bump esbuild from 0.18.10 to 0.18.11 ([c5d7515](https://github.com/Alwatr/flux/commit/c5d7515d585915256b79e48cb6d7adf0fdc631b8)) by @
* **deps-dev:** bump esbuild from 0.18.11 to 0.18.12 ([1afdaaa](https://github.com/Alwatr/flux/commit/1afdaaab5fe41fd47cf0b74b19a4d7535f1da4e3)) by @
* **deps-dev:** bump esbuild from 0.18.12 to 0.18.14 ([ca833b5](https://github.com/Alwatr/flux/commit/ca833b50931165655516286722588c1d6b4436dc)) by @
* **deps-dev:** bump esbuild from 0.18.14 to 0.18.15 ([3d6399e](https://github.com/Alwatr/flux/commit/3d6399ea5a7b46e40f0ea067067a42b44f5561be)) by @
* **deps-dev:** bump esbuild from 0.18.15 to 0.18.17 ([6c59888](https://github.com/Alwatr/flux/commit/6c5988872bfb7fe9ad63ae3f99ab67e5273cee71)) by @
* **deps-dev:** bump esbuild from 0.18.17 to 0.18.19 ([97ac63e](https://github.com/Alwatr/flux/commit/97ac63e6071ab95c9b06e820bd25386444898155)) by @
* **deps-dev:** bump esbuild from 0.18.19 to 0.18.20 ([e14ef34](https://github.com/Alwatr/flux/commit/e14ef342d622d1a1d469a15e3760364965152ed5)) by @
* **deps-dev:** bump esbuild from 0.18.2 to 0.18.3 ([b618747](https://github.com/Alwatr/flux/commit/b6187472cb047ceb9a37c482852f99da19768556)) by @
* **deps-dev:** bump esbuild from 0.18.2 to 0.18.3 ([#1267](https://github.com/Alwatr/flux/issues/1267)) ([879e7c0](https://github.com/Alwatr/flux/commit/879e7c0ee311cb6bd82b2e3c3cfe225159661a08)) by @
* **deps-dev:** bump esbuild from 0.18.20 to 0.19.2 ([9f07d59](https://github.com/Alwatr/flux/commit/9f07d59a81b4c319b72546d8ebdb6645f2f31c68)) by @
* **deps-dev:** bump esbuild from 0.18.3 to 0.18.4 ([7364816](https://github.com/Alwatr/flux/commit/73648165e6332440d2528e6d6bd9e9d9033890e0)) by @
* **deps-dev:** bump esbuild from 0.18.3 to 0.18.4 ([#1273](https://github.com/Alwatr/flux/issues/1273)) ([3b07e33](https://github.com/Alwatr/flux/commit/3b07e33352a54c179b6a91430cf2625364c45171)) by @
* **deps-dev:** bump esbuild from 0.18.4 to 0.18.6 ([533ed19](https://github.com/Alwatr/flux/commit/533ed1914dcd89ddf826f5fe6a76436adb547e6c)) by @
* **deps-dev:** bump esbuild from 0.18.4 to 0.18.6 ([#1280](https://github.com/Alwatr/flux/issues/1280)) ([48c533d](https://github.com/Alwatr/flux/commit/48c533dd55b34c26c814e24872a515a483ced919)) by @
* **deps-dev:** bump esbuild from 0.18.6 to 0.18.9 ([b76edb8](https://github.com/Alwatr/flux/commit/b76edb8a0adc34cf281c2016db542772b4736b84)) by @
* **deps-dev:** bump esbuild from 0.18.9 to 0.18.10 ([64d5d58](https://github.com/Alwatr/flux/commit/64d5d584966d6243df1c641674db1a19d094fb5d)) by @
* **deps-dev:** bump eslint from 8.21.0 to 8.23.0 ([b4c6ca8](https://github.com/Alwatr/flux/commit/b4c6ca89384ec6c67a3770234654ea65d658ee76)) by @
* **deps-dev:** bump eslint from 8.23.0 to 8.23.1 ([43263a6](https://github.com/Alwatr/flux/commit/43263a6cbfcdbde3b05eb256663bdccd4ab526b8)) by @
* **deps-dev:** bump eslint from 8.23.1 to 8.25.0 ([87a9f46](https://github.com/Alwatr/flux/commit/87a9f460e52d3691ecd2ef65ebe564977c47f2e5)) by @
* **deps-dev:** bump eslint from 8.25.0 to 8.26.0 ([7cfef01](https://github.com/Alwatr/flux/commit/7cfef0161c6860067c4eaf1823f7c6eed7e73d3e)) by @
* **deps-dev:** bump eslint from 8.26.0 to 8.27.0 ([c6166c5](https://github.com/Alwatr/flux/commit/c6166c5a01e8dd1315557e7581ccda6680775988)) by @
* **deps-dev:** bump eslint from 8.28.0 to 8.29.0 ([c9bea81](https://github.com/Alwatr/flux/commit/c9bea812a7445aca8274372d1c04696aba995c23)) by @
* **deps-dev:** bump eslint from 8.28.0 to 8.29.0 ([266412d](https://github.com/Alwatr/flux/commit/266412d22c4040a47310b704199d55ac998b62ab)) by @
* **deps-dev:** bump eslint from 8.29.0 to 8.30.0 ([3778ab1](https://github.com/Alwatr/flux/commit/3778ab19e6c747c8c18b512b3f11ce89ea6478ed)) by @
* **deps-dev:** bump eslint from 8.30.0 to 8.31.0 ([265599a](https://github.com/Alwatr/flux/commit/265599af47138fa4fa9a1e487e7d1c903137aeda)) by @
* **deps-dev:** bump eslint from 8.31.0 to 8.32.0 ([#663](https://github.com/Alwatr/flux/issues/663)) ([92092a1](https://github.com/Alwatr/flux/commit/92092a1be1b11491e044d7f8f2a00849a6d97849)) by @
* **deps-dev:** bump eslint from 8.32.0 to 8.33.0 ([dd6fa70](https://github.com/Alwatr/flux/commit/dd6fa707eeee990a3ebe8a3f67bd481bec202252)) by @
* **deps-dev:** bump eslint from 8.33.0 to 8.34.0 ([#812](https://github.com/Alwatr/flux/issues/812)) ([c231f19](https://github.com/Alwatr/flux/commit/c231f194489ab896c9980145aebaf912a1943078)) by @
* **deps-dev:** bump eslint from 8.34.0 to 8.35.0 ([#877](https://github.com/Alwatr/flux/issues/877)) ([5b6fa46](https://github.com/Alwatr/flux/commit/5b6fa46c771694b37169d51b5ef0814f10c0d6bb)) by @
* **deps-dev:** bump eslint from 8.35.0 to 8.36.0 ([#931](https://github.com/Alwatr/flux/issues/931)) ([e6fd69c](https://github.com/Alwatr/flux/commit/e6fd69ce00d3d1c632e98fca6f408107977c8a8d)) by @
* **deps-dev:** bump eslint from 8.36.0 to 8.37.0 ([61ec328](https://github.com/Alwatr/flux/commit/61ec328e6ab0cd3b7f0e59f6d3b34d58581c828d)) by @
* **deps-dev:** bump eslint from 8.37.0 to 8.38.0 ([eaee82f](https://github.com/Alwatr/flux/commit/eaee82f016a67cdf0970dc0b0ea6c0ba459f6bd0)) by @
* **deps-dev:** bump eslint from 8.38.0 to 8.39.0 ([4524ab5](https://github.com/Alwatr/flux/commit/4524ab5d7e7ac7b5a801e50f048b36f28b39f634)) by @
* **deps-dev:** bump eslint from 8.39.0 to 8.40.0 ([fe97a67](https://github.com/Alwatr/flux/commit/fe97a670b7ae170e016d98a261a88637ed30089a)) by @
* **deps-dev:** bump eslint from 8.40.0 to 8.41.0 ([14994ab](https://github.com/Alwatr/flux/commit/14994ab44ac5b68dd3d0dba4d206bf6846410e72)) by @
* **deps-dev:** bump eslint from 8.41.0 to 8.42.0 ([88f4be8](https://github.com/Alwatr/flux/commit/88f4be886241bb09ba42f88d8b1a8347fcc22f12)) by @
* **deps-dev:** bump eslint from 8.42.0 to 8.43.0 ([b468008](https://github.com/Alwatr/flux/commit/b468008265003eb37d47ed944f01108eb0bffcb1)) by @
* **deps-dev:** bump eslint from 8.43.0 to 8.44.0 ([77d7dbd](https://github.com/Alwatr/flux/commit/77d7dbd48b4b095c96fe0e8fdae472462d04e19a)) by @
* **deps-dev:** bump eslint from 8.44.0 to 8.45.0 ([44083c3](https://github.com/Alwatr/flux/commit/44083c3ce3400ed570bcd07bc335fca8b0f0eac8)) by @
* **deps-dev:** bump eslint from 8.45.0 to 8.47.0 ([39d3a5e](https://github.com/Alwatr/flux/commit/39d3a5eda6d335f2cc37e08f02b1a73f9e40dc2f)) by @
* **deps-dev:** bump eslint-import-resolver-typescript ([63f0562](https://github.com/Alwatr/flux/commit/63f05625d93753d27bdf88294b3e15e371832525)) by @
* **deps-dev:** bump eslint-import-resolver-typescript ([6ab3428](https://github.com/Alwatr/flux/commit/6ab3428c87f42721bfc9a72193773efd987029ec)) by @
* **deps-dev:** bump eslint-import-resolver-typescript ([c4421f8](https://github.com/Alwatr/flux/commit/c4421f8004f4586c8ae4e67c7579694428e806a4)) by @
* **deps-dev:** bump eslint-import-resolver-typescript ([cbc289b](https://github.com/Alwatr/flux/commit/cbc289b0d9a06c3afdcbaaeb3032cd1deeb6c5f0)) by @
* **deps-dev:** bump eslint-import-resolver-typescript ([46f8f10](https://github.com/Alwatr/flux/commit/46f8f109b1ad791890087483acc04e05638c1165)) by @
* **deps-dev:** bump eslint-import-resolver-typescript ([5a21487](https://github.com/Alwatr/flux/commit/5a21487b5bc6aa7e7807115a280a882c507cc976)) by @
* **deps-dev:** bump eslint-import-resolver-typescript ([a6d42cf](https://github.com/Alwatr/flux/commit/a6d42cfcd4344a450a8d9b7e252b9844187561b9)) by @
* **deps-dev:** bump eslint-plugin-import from 2.26.0 to 2.27.4 ([d15b4c3](https://github.com/Alwatr/flux/commit/d15b4c386c1f6bf89d2e2392b8f81381989913d3)) by @
* **deps-dev:** bump eslint-plugin-import from 2.27.4 to 2.27.5 ([#674](https://github.com/Alwatr/flux/issues/674)) ([2d93663](https://github.com/Alwatr/flux/commit/2d93663bc4455348d8808a182456e6955cfc4c63)) by @
* **deps-dev:** bump eslint-plugin-import from 2.27.5 to 2.28.1 ([762e9db](https://github.com/Alwatr/flux/commit/762e9db3abab9afba5782b9b620cdf33deb86fce)) by @
* **deps-dev:** bump eslint-plugin-lit from 1.6.1 to 1.7.0 ([b1edbb4](https://github.com/Alwatr/flux/commit/b1edbb42a5416e827ba4a87b13416e7f5a192173)) by @
* **deps-dev:** bump eslint-plugin-lit from 1.7.0 to 1.7.1 ([354d86f](https://github.com/Alwatr/flux/commit/354d86f07b2cfd0c7dbb67103ac35299acc83b86)) by @
* **deps-dev:** bump eslint-plugin-lit from 1.7.1 to 1.7.2 ([815dbee](https://github.com/Alwatr/flux/commit/815dbee55b4b3fb29ed1fb3803832a4de3a52409)) by @
* **deps-dev:** bump eslint-plugin-lit from 1.7.2 to 1.8.0 ([a35f510](https://github.com/Alwatr/flux/commit/a35f510c0ee099e49708c9a7c2db29bbd2c8508c)) by @
* **deps-dev:** bump eslint-plugin-lit from 1.8.0 to 1.8.2 ([#661](https://github.com/Alwatr/flux/issues/661)) ([4caf211](https://github.com/Alwatr/flux/commit/4caf21189001ae82ba9a71f13da8be7229a497da)) by @
* **deps-dev:** bump eslint-plugin-lit from 1.8.2 to 1.8.3 ([ed4b8f6](https://github.com/Alwatr/flux/commit/ed4b8f67866e279033a527da268fc469fbf8de3a)) by @
* **deps-dev:** bump eslint-plugin-lit from 1.8.3 to 1.9.1 ([edeaebf](https://github.com/Alwatr/flux/commit/edeaebf08241f2453eaf402ef2ee3c6b68f75bb0)) by @
* **deps-dev:** bump eslint-plugin-wc from 1.3.2 to 1.4.0 ([7a37442](https://github.com/Alwatr/flux/commit/7a374426aacb50f03d18ea5f902cd9076257f1f4)) by @
* **deps-dev:** bump eslint-plugin-wc from 1.3.2 to 1.4.0 ([8348874](https://github.com/Alwatr/flux/commit/8348874707a7c33590c205d865bcfbdc7dd7fe19)) by @
* **deps-dev:** bump eslint-plugin-wc from 1.4.0 to 1.5.0 ([7952081](https://github.com/Alwatr/flux/commit/795208138bc06f4526217f4bf1843a9e980d5527)) by @
* **deps-dev:** bump lerna from 5.3.0 to 5.4.3 ([becb906](https://github.com/Alwatr/flux/commit/becb906319b4bd4fa572f9b5c1eee69bf58c44f4)) by @
* **deps-dev:** bump lerna from 5.4.3 to 5.5.0 ([0040bc2](https://github.com/Alwatr/flux/commit/0040bc28984f9053e31d8fbad5d13dc82c89202d)) by @
* **deps-dev:** bump lerna from 5.5.0 to 5.5.1 ([7e13b02](https://github.com/Alwatr/flux/commit/7e13b02c2eb0c89ee4b0d8651f338eec0e3ea5c0)) by @
* **deps-dev:** bump lerna from 5.5.1 to 5.5.2 ([150c6eb](https://github.com/Alwatr/flux/commit/150c6ebd4eace125ff515d611823d6d9ab793488)) by @
* **deps-dev:** bump lerna from 5.5.2 to 5.6.1 ([4d9095b](https://github.com/Alwatr/flux/commit/4d9095b1656ce16f3e32cedc61f406025f6839a8)) by @
* **deps-dev:** bump lerna from 5.6.1 to 6.0.0 ([ceb25c4](https://github.com/Alwatr/flux/commit/ceb25c41fe7c66890e7d71fb26c3a0e25e6e7fdc)) by @
* **deps-dev:** bump lerna from 6.0.0 to 6.0.1 ([46b8088](https://github.com/Alwatr/flux/commit/46b8088963248c79c0e6b0174423e29f62758d82)) by @
* **deps-dev:** bump lerna from 6.0.1 to 6.0.3 ([18a2f75](https://github.com/Alwatr/flux/commit/18a2f750f4bb6fdf6b9ec3ef536feeb197d1bda6)) by @
* **deps-dev:** bump lerna from 6.0.3 to 6.1.0 ([0fbdea2](https://github.com/Alwatr/flux/commit/0fbdea2be3e426ed50c87a42c5abb3870003ec2a)) by @
* **deps-dev:** bump lerna from 6.1.0 to 6.3.0 ([d154eb8](https://github.com/Alwatr/flux/commit/d154eb82a41c62ad353a6484b7a25dbaea2a6ba4)) by @
* **deps-dev:** bump lerna from 6.3.0 to 6.4.0 ([8c8ebb6](https://github.com/Alwatr/flux/commit/8c8ebb651af6ff436d82c2f436067f16dd09cd9d)) by @
* **deps-dev:** bump lerna from 6.4.0 to 6.4.1 ([#650](https://github.com/Alwatr/flux/issues/650)) ([8c833ce](https://github.com/Alwatr/flux/commit/8c833cebac1f3f6de64e88b7c85bec68f2c78ce9)) by @
* **deps-dev:** bump lerna from 6.4.1 to 6.5.1 ([#815](https://github.com/Alwatr/flux/issues/815)) ([fdb7c3e](https://github.com/Alwatr/flux/commit/fdb7c3e3aa6e9dfe0b37ae6ba3a18df1edb38930)) by @
* **deps-dev:** bump lerna from 6.5.1 to 6.6.1 ([20b3fac](https://github.com/Alwatr/flux/commit/20b3fac09f58fc99a647f1bef79cc2f767a005a5)) by @
* **deps-dev:** bump lerna from 6.6.1 to 6.6.2 ([aea463c](https://github.com/Alwatr/flux/commit/aea463c4e0381351658a0c152ebd45e00f292ba9)) by @
* **deps-dev:** bump lerna from 6.6.2 to 7.0.1 ([1dfb6d4](https://github.com/Alwatr/flux/commit/1dfb6d4ae6ec85a913caeac62405882fda6bdd53)) by @
* **deps-dev:** bump lerna from 7.0.1 to 7.0.2 ([860ac15](https://github.com/Alwatr/flux/commit/860ac154d7269bc046a10e032b3f051c3e17ac66)) by @
* **deps-dev:** bump lerna from 7.0.2 to 7.1.0 ([454ac72](https://github.com/Alwatr/flux/commit/454ac7290f2a6dd32a9d5e7459201febce3fd46e)) by @
* **deps-dev:** bump lerna from 7.1.0 to 7.1.1 ([c535b8e](https://github.com/Alwatr/flux/commit/c535b8e8698562d31fbe1327bfecb4b0eed0ad88)) by @
* **deps-dev:** bump lerna from 7.1.1 to 7.1.3 ([c646dce](https://github.com/Alwatr/flux/commit/c646dcec1e705e45c7b1a4e928cd31e49f450bb8)) by @
* **deps-dev:** bump lerna from 7.1.3 to 7.1.4 ([c20cf6e](https://github.com/Alwatr/flux/commit/c20cf6e4fb0ea7a7e04f1008fc58a55c9684c7ee)) by @
* **deps-dev:** bump lerna from 7.1.4 to 7.1.5 ([c3d45bc](https://github.com/Alwatr/flux/commit/c3d45bcbe7c9f3eddee1d91c52d31c30005c6958)) by @
* **deps-dev:** bump nodemon from 2.0.20 to 2.0.21 ([#898](https://github.com/Alwatr/flux/issues/898)) ([66a8bdd](https://github.com/Alwatr/flux/commit/66a8bdd6d5894a7aaf0bccec35a66a6140feedad)) by @
* **deps-dev:** bump nodemon from 2.0.21 to 2.0.22 ([cb709fe](https://github.com/Alwatr/flux/commit/cb709fec08788ed853e21fd8ba7ebf4e05c72244)) by @
* **deps-dev:** bump nodemon from 2.0.22 to 3.0.1 ([eded597](https://github.com/Alwatr/flux/commit/eded597647d209acaeceb3ce888573079d7c5b4a)) by @
* **deps-dev:** bump postcss from 8.4.26 to 8.4.27 ([dcf06c5](https://github.com/Alwatr/flux/commit/dcf06c5daf63b12e20e1ceb0dfe406e4384f9ecf)) by @
* **deps-dev:** bump postcss from 8.4.27 to 8.4.28 ([2d01095](https://github.com/Alwatr/flux/commit/2d0109575606805327c17af31b430e670894804f)) by @
* **deps-dev:** bump postcss-preset-env from 9.0.0 to 9.1.0 ([c7e3b43](https://github.com/Alwatr/flux/commit/c7e3b434b715d07aed143687fb38b55a924aba63)) by @
* **deps-dev:** bump postcss-preset-env from 9.1.0 to 9.1.1 ([54b8ebd](https://github.com/Alwatr/flux/commit/54b8ebdd599982830627d503f1788bdb3330c815)) by @
* **deps-dev:** bump prettier from 2.7.1 to 2.8.0 ([20ca146](https://github.com/Alwatr/flux/commit/20ca14695164d67f50f4ed9d648c31a161560beb)) by @
* **deps-dev:** bump prettier from 2.7.1 to 2.8.0 ([0c4ac44](https://github.com/Alwatr/flux/commit/0c4ac44ef297bce6db833ed3cae4a6615e7e5b9e)) by @
* **deps-dev:** bump prettier from 2.8.1 to 2.8.2 ([82fcd42](https://github.com/Alwatr/flux/commit/82fcd420a678803ed3b7aa6e03cca151dfacfb04)) by @
* **deps-dev:** bump prettier from 2.8.2 to 2.8.3 ([#664](https://github.com/Alwatr/flux/issues/664)) ([456589c](https://github.com/Alwatr/flux/commit/456589c7a78d57f413494115bd7d61c5743753bf)) by @
* **deps-dev:** bump prettier from 2.8.3 to 2.8.4 ([803a548](https://github.com/Alwatr/flux/commit/803a5480f13fb64638f3274be3e418d175d134b8)) by @
* **deps-dev:** bump prettier from 2.8.4 to 2.8.6 ([f967dc8](https://github.com/Alwatr/flux/commit/f967dc8366a521b4434f8f6ac001f95e5d013525)) by @
* **deps-dev:** bump prettier from 2.8.6 to 2.8.7 ([281a79f](https://github.com/Alwatr/flux/commit/281a79f9a8bf65d714dd8433c5225cee47b8a736)) by @
* **deps-dev:** bump prettier from 2.8.7 to 2.8.8 ([a7fc8bb](https://github.com/Alwatr/flux/commit/a7fc8bb95a5cbb989ac7a1de21050e61361e5056)) by @
* **deps-dev:** bump prettier from 2.8.8 to 3.0.0 ([8838345](https://github.com/Alwatr/flux/commit/8838345622868f70b8b2b3715e57cff0374beef4)) by @
* **deps-dev:** bump prettier from 3.0.0 to 3.0.1 ([bcf196b](https://github.com/Alwatr/flux/commit/bcf196bfbee6afb278ed01dcd97075d426718df2)) by @
* **deps-dev:** bump prettier from 3.0.1 to 3.0.2 ([7ddc27b](https://github.com/Alwatr/flux/commit/7ddc27bda644024467d3c2672ca5ebfa6e296c92)) by @
* **deps-dev:** bump prettier-plugin-tailwindcss from 0.4.0 to 0.4.1 ([ec4062b](https://github.com/Alwatr/flux/commit/ec4062b1d7554f5abcdf498cc94426de5c1d9fd5)) by @
* **deps-dev:** bump prettier-plugin-tailwindcss from 0.4.1 to 0.5.2 ([2b2fa5b](https://github.com/Alwatr/flux/commit/2b2fa5bc07c2c4ae6214b3043938e204dac01356)) by @
* **deps-dev:** bump prettier-plugin-tailwindcss from 0.5.2 to 0.5.3 ([1cf8122](https://github.com/Alwatr/flux/commit/1cf8122a07b82c8b031e16da2b14fd585338bba2)) by @
* **deps-dev:** bump rimraf from 3.0.2 to 4.0.4 ([#649](https://github.com/Alwatr/flux/issues/649)) ([534d7b7](https://github.com/Alwatr/flux/commit/534d7b763da5db6e5aaa02b18c4e8859537223be)) by @
* **deps-dev:** bump rimraf from 4.0.4 to 4.1.0 ([#673](https://github.com/Alwatr/flux/issues/673)) ([29e4510](https://github.com/Alwatr/flux/commit/29e4510cb5da9ea7b57a2fc6c1950f0448abd825)) by @
* **deps-dev:** bump rimraf from 4.1.0 to 4.1.1 ([#679](https://github.com/Alwatr/flux/issues/679)) ([371390b](https://github.com/Alwatr/flux/commit/371390b3f8613357e3114f3a89e0491069c915f5)) by @
* **deps-dev:** bump rollup from 3.4.0 to 3.5.0 ([1f48529](https://github.com/Alwatr/flux/commit/1f48529e096a4cff39bbc11c9e7d30f6d2ed76b6)) by @
* **deps-dev:** bump rollup from 3.5.0 to 3.5.1 ([7501100](https://github.com/Alwatr/flux/commit/7501100058fc9fba827362242835b320ea67bfac)) by @
* **deps-dev:** bump rollup from 3.5.1 to 3.6.0 ([26fa725](https://github.com/Alwatr/flux/commit/26fa7253564718fe9e0085aab325227b84fec5b5)) by @
* **deps-dev:** bump rollup from 3.7.0 to 3.7.3 ([6d034eb](https://github.com/Alwatr/flux/commit/6d034ebc8b56e4be13351110094b3df58751c615)) by @
* **deps-dev:** bump rollup from 3.7.0 to 3.7.4 ([e8f9f09](https://github.com/Alwatr/flux/commit/e8f9f09d19bec420941ddd8302bef68168172fe1)) by @
* **deps-dev:** bump rollup from 3.7.4 to 3.7.5 ([14abc87](https://github.com/Alwatr/flux/commit/14abc87135f81b403f826329d0d6efea6d13780d)) by @
* **deps-dev:** bump rollup from 3.7.5 to 3.8.0 ([489ecbc](https://github.com/Alwatr/flux/commit/489ecbc49343a7cc4e307d03910e7338cb89ef09)) by @
* **deps-dev:** bump rollup from 3.8.0 to 3.8.1 ([4a57376](https://github.com/Alwatr/flux/commit/4a57376a745443373d80c450630be14776752840)) by @
* **deps-dev:** bump rollup from 3.8.1 to 3.9.0 ([678813e](https://github.com/Alwatr/flux/commit/678813e7f59eeb12e5d2b3741b5709b9b5681098)) by @
* **deps-dev:** bump rollup from 3.9.0 to 3.9.1 ([c36a24e](https://github.com/Alwatr/flux/commit/c36a24e389592f785ac65539042ed141fabc6c7c)) by @
* **deps-dev:** bump rollup from 3.9.1 to 3.10.0 ([#646](https://github.com/Alwatr/flux/issues/646)) ([15fc5da](https://github.com/Alwatr/flux/commit/15fc5da2085fb977050480ca614c5de1d9843baf)) by @
* **deps-dev:** bump tailwindcss from 3.3.2 to 3.3.3 ([7ae3e0f](https://github.com/Alwatr/flux/commit/7ae3e0f278d027e804a3f3baa40d38b323a72f38)) by @
* **deps-dev:** bump the development-dependencies group with 1 update ([589cb53](https://github.com/Alwatr/flux/commit/589cb53b143ea08b9baed0106d176f7e4f577e2b)) by @
* **deps-dev:** bump the development-dependencies group with 1 update ([24535a2](https://github.com/Alwatr/flux/commit/24535a23554ccea8cc32db2add9983d39d9ef5a1)) by @
* **deps-dev:** bump the development-dependencies group with 1 update ([31974b8](https://github.com/Alwatr/flux/commit/31974b860000fbd03b8563e4ace08fae5f242334)) by @
* **deps-dev:** bump the development-dependencies group with 11 updates ([60f3075](https://github.com/Alwatr/flux/commit/60f3075872d3a4a9da979c589b5aa6b84065d48b)) by @
* **deps-dev:** bump the development-dependencies group with 14 updates ([c6ae70e](https://github.com/Alwatr/flux/commit/c6ae70e1534469fd36386f0828a52985001e2ef6)) by @
* **deps-dev:** bump the development-dependencies group with 2 updates ([f1a4c58](https://github.com/Alwatr/flux/commit/f1a4c5864db4eb017bb5fc1a2596c0203372ace5)) by @
* **deps-dev:** bump the development-dependencies group with 2 updates ([61f247a](https://github.com/Alwatr/flux/commit/61f247a3c06727bf10c15a95d3ac56e47969fc30)) by @
* **deps-dev:** bump the development-dependencies group with 2 updates ([a611ab1](https://github.com/Alwatr/flux/commit/a611ab1f864e967de7ec49e98ddf084b6b93854c)) by @
* **deps-dev:** bump the development-dependencies group with 7 updates ([46adfe5](https://github.com/Alwatr/flux/commit/46adfe5e1a90e6ec3c69b6ec6b0ac40541678d55)) by @
* **deps-dev:** bump the development-dependencies group with 8 updates ([c853aa2](https://github.com/Alwatr/flux/commit/c853aa2730b5c256049414e302a3d2d0c58ef61e)) by @
* **deps-dev:** bump the development-dependencies group with 8 updates ([046b165](https://github.com/Alwatr/flux/commit/046b165ea14c554a359673ec798db8dd968f7dcf)) by @
* **deps-dev:** bump the development-dependencies group with 8 updates ([bd1b1d2](https://github.com/Alwatr/flux/commit/bd1b1d24248cb804d83778a1637d9b0e47cd0b92)) by @
* **deps-dev:** bump the development-dependencies group with 9 updates ([0712629](https://github.com/Alwatr/flux/commit/0712629a59c2a39e511df381c2123e324af4b2e2)) by @
* **deps-dev:** bump the lint-dependencies group with 1 update ([728b360](https://github.com/Alwatr/flux/commit/728b3606c14e67bd27ba1f86166f7bdce106fdf8)) by @
* **deps-dev:** bump the lint-dependencies group with 1 update ([165c536](https://github.com/Alwatr/flux/commit/165c5367efe65a9b0c7ce2546cc1b03f90d930be)) by @
* **deps-dev:** bump the lint-dependencies group with 2 updates ([6f360fe](https://github.com/Alwatr/flux/commit/6f360fe4d8d4262644758c0813ceb2d8640901c4)) by @
* **deps-dev:** bump the lint-dependencies group with 2 updates ([e378257](https://github.com/Alwatr/flux/commit/e378257f5df76b6d060658fa3abb7a3e3005701d)) by @
* **deps-dev:** bump the lint-dependencies group with 2 updates ([d8ea743](https://github.com/Alwatr/flux/commit/d8ea74340ea32b970a950b348729716d54653a89)) by @
* **deps-dev:** bump the lint-dependencies group with 2 updates ([3f66b15](https://github.com/Alwatr/flux/commit/3f66b15690f297b320eea4a1a119afb41c2438ae)) by @
* **deps-dev:** bump the lint-dependencies group with 3 updates ([c933a0a](https://github.com/Alwatr/flux/commit/c933a0a225598f9481bb4ee9f52d3f6de95183da)) by @
* **deps-dev:** bump the lint-dependencies group with 3 updates ([779f8d3](https://github.com/Alwatr/flux/commit/779f8d38c57f11f079f3f24d2c1f6211ce1b9613)) by @
* **deps-dev:** bump the lint-dependencies group with 4 updates ([a8ad16a](https://github.com/Alwatr/flux/commit/a8ad16ad022a456ae624abdd4d0fcbfd4ad7ab7d)) by @
* **deps-dev:** bump the lint-dependencies group with 4 updates ([516e1b7](https://github.com/Alwatr/flux/commit/516e1b71aa7d4a99a0471dddb059d134c911cee7)) by @
* **deps-dev:** bump typescript from 4.7.4 to 4.8.2 ([e7bcc68](https://github.com/Alwatr/flux/commit/e7bcc68253126948064843864f0ee0d0815e65c7)) by @
* **deps-dev:** bump typescript from 4.8.3 to 4.8.4 ([f049885](https://github.com/Alwatr/flux/commit/f049885bfdac6d6164daa1893d2e56d4805580e8)) by @
* **deps-dev:** bump typescript from 4.8.4 to 4.9.3 ([225af13](https://github.com/Alwatr/flux/commit/225af13cd72ecfc9fbe4f26b5d6ff2034c22717f)) by @
* **deps-dev:** bump typescript from 4.9.5 to 5.0.2 ([95f1491](https://github.com/Alwatr/flux/commit/95f14914ace77205fe26c349fba6d1348fa46aaf)) by @
* **deps-dev:** bump typescript from 5.0.2 to 5.0.3 ([8e7b765](https://github.com/Alwatr/flux/commit/8e7b76569e47a8b5961d7b7645718b9593bf2bc8)) by @
* **deps-dev:** bump typescript from 5.0.3 to 5.0.4 ([8b88f83](https://github.com/Alwatr/flux/commit/8b88f8325022854ed19d846ae36efc5fb1814bcc)) by @
* **deps-dev:** bump typescript from 5.0.4 to 5.1.3 ([15474fa](https://github.com/Alwatr/flux/commit/15474fa7d7bf2e2db10d846390d6bd119e6821b5)) by @
* **deps-dev:** bump typescript from 5.1.3 to 5.1.5 ([a87995c](https://github.com/Alwatr/flux/commit/a87995cb13c248ac991c49ebdce57f33d482146d)) by @
* **deps-dev:** bump typescript from 5.1.5 to 5.1.6 ([3364d04](https://github.com/Alwatr/flux/commit/3364d044fdc5a7c2a0d6478490af609424502dea)) by @
* **deps-dev:** bump workbox-build from 6.5.4 to 7.0.0 ([beb4523](https://github.com/Alwatr/flux/commit/beb4523430487976c50d91b888a43cc5c3ffc45e)) by @
* **deps:** add tailwindcss ([cd409ba](https://github.com/Alwatr/flux/commit/cd409ba31db1befca1053b52dca7564a47749f5c)) by @
* **deps:** bump @alwatr/element from 0.22.0 to 0.23.0 ([2312992](https://github.com/Alwatr/flux/commit/2312992abb0c282d99ce8e3bb7136f2c60dfafc3)) by @
* **deps:** bump @alwatr/icon from 0.22.1 to 0.23.0 ([021e5b6](https://github.com/Alwatr/flux/commit/021e5b60ef7b8c1d63793c1041aaf8fe3deb0a2c)) by @
* **deps:** bump @alwatr/icon from 0.24.0 to 0.24.1 ([727947c](https://github.com/Alwatr/flux/commit/727947cfbcf94cb3244ccc7917265a197b882155)) by @
* **deps:** bump @alwatr/nano-server from 0.22.1 to 0.23.0 ([5e2f93e](https://github.com/Alwatr/flux/commit/5e2f93e75e1dbbc3bb39db41681cd1f1c8d901c1)) by @
* **deps:** bump @alwatr/nano-server from 0.24.0 to 0.24.1 ([2016062](https://github.com/Alwatr/flux/commit/2016062b24faac805755197a97534c4eac9c424f)) by @
* **deps:** bump @alwatr/router from 0.22.1 to 0.23.0 ([51266bc](https://github.com/Alwatr/flux/commit/51266bce1faf9da7d46ecf5e4c57c1575bb746e1)) by @
* **deps:** bump @alwatr/router from 0.24.0 to 0.24.1 ([85ec2db](https://github.com/Alwatr/flux/commit/85ec2db00284792d1d72cf3baf809fa063d3912b)) by @
* **deps:** bump @alwatr/storage-client from 0.22.1 to 0.23.0 ([2019f98](https://github.com/Alwatr/flux/commit/2019f98479ac7727b4b8e96bfcb53ad147f47318)) by @
* **deps:** bump @alwatr/storage-client from 0.24.0 to 0.24.1 ([4df7bcc](https://github.com/Alwatr/flux/commit/4df7bcc466a0e3defd5c74bc1916c35fdcfd2c20)) by @
* **deps:** bump @alwatr/storage-engine from 0.22.1 to 0.23.0 ([e9b423c](https://github.com/Alwatr/flux/commit/e9b423c82965fa75becbd78b02c735573a919470)) by @
* **deps:** bump @alwatr/storage-engine from 0.24.0 to 0.24.1 ([e914435](https://github.com/Alwatr/flux/commit/e9144356d95ce1d12f464a4870443e5d5f9bda06)) by @
* **deps:** bump @ionic/core from 6.3.8 to 6.3.9 ([25ec543](https://github.com/Alwatr/flux/commit/25ec5432bdc3d7b86a4e02115b444f1431b5552f)) by @
* **deps:** bump @ionic/core from 6.4.0 to 6.4.1 ([#509](https://github.com/Alwatr/flux/issues/509)) ([b1b6a70](https://github.com/Alwatr/flux/commit/b1b6a705827560205f9dde17d5fba9a9facef737)) by @
* **deps:** bump actions/add-to-project from 0.3.0 to 0.4.0 ([e2a448d](https://github.com/Alwatr/flux/commit/e2a448d1130430aee5a41caea5786cfc84866af6)) by @
* **deps:** bump actions/add-to-project from 0.4.0 to 0.4.1 ([c2be519](https://github.com/Alwatr/flux/commit/c2be519c6a5224dda73a518583616711dfc6ea37)) by @
* **deps:** bump actions/add-to-project from 0.4.1 to 0.5.0 ([ff29bed](https://github.com/Alwatr/flux/commit/ff29bede1508b61189ee86ae4daaa3bf35083486)) by @
* **deps:** bump actions/checkout from 2 to 3 ([94fcf7a](https://github.com/Alwatr/flux/commit/94fcf7ae4f68a06db4289bc8df611a9eff59e955)) by @
* **deps:** bump actions/checkout from 3.3.0 to 3.4.0 ([a07cc0f](https://github.com/Alwatr/flux/commit/a07cc0f9e855c0e393af515baa2866513c4c0310)) by @
* **deps:** bump actions/checkout from 3.4.0 to 3.5.0 ([ef71777](https://github.com/Alwatr/flux/commit/ef7177783d3c1308e0622e195c8186e0f9e13670)) by @
* **deps:** bump actions/checkout from 3.5.0 to 3.5.2 ([47cd077](https://github.com/Alwatr/flux/commit/47cd077a65ac23fc86bae3fad0438980121d548d)) by @
* **deps:** bump actions/checkout from 3.5.2 to 3.5.3 ([63aec0a](https://github.com/Alwatr/flux/commit/63aec0a5daaa1dad8bbacf965afbf7d23fa26e48)) by @
* **deps:** bump actions/dependency-review-action from 2 to 3 ([761df6a](https://github.com/Alwatr/flux/commit/761df6a09c9a38eb8f2b0016478b477c97a35574)) by @
* **deps:** bump actions/dependency-review-action from 3.0.3 to 3.0.4 ([6f18a04](https://github.com/Alwatr/flux/commit/6f18a0412958ec1c11186e472adeccce860a2eb2)) by @
* **deps:** bump actions/dependency-review-action from 3.0.4 to 3.0.6 ([91fba2c](https://github.com/Alwatr/flux/commit/91fba2cd13eaf359b5856706304b53311340dabf)) by @
* **deps:** bump actions/dependency-review-action from 3.0.6 to 3.0.7 ([a685ed4](https://github.com/Alwatr/flux/commit/a685ed42894462495ea758fa6e717c162080c982)) by @
* **deps:** bump actions/dependency-review-action from 3.0.7 to 3.0.8 ([b33f86a](https://github.com/Alwatr/flux/commit/b33f86a2fcb01fc3a6b5a14b3a36f3c4c4a16701)) by @
* **deps:** bump actions/setup-node from 3.6.0 to 3.7.0 ([b200f59](https://github.com/Alwatr/flux/commit/b200f59add4c23dd39cf80466be25ee8604f07c0)) by @
* **deps:** bump actions/setup-node from 3.7.0 to 3.8.0 ([14127d0](https://github.com/Alwatr/flux/commit/14127d0935285ff25ec21d5c39227431ee6edc96)) by @
* **deps:** bump actions/setup-node from 3.8.0 to 3.8.1 ([4ccfe46](https://github.com/Alwatr/flux/commit/4ccfe46ee4577a1e21c1195ac381564633c5612d)) by @
* **deps:** bump actions/stale from 5 to 6 ([48caf0c](https://github.com/Alwatr/flux/commit/48caf0cd1def64782af4dad053c9522141e7c4fc)) by @
* **deps:** bump actions/stale from 6 to 7 ([9e2682a](https://github.com/Alwatr/flux/commit/9e2682a2a0e0a4f05012f665a3800c0f3da648bf)) by @
* **deps:** bump actions/stale from 7.0.0 to 8.0.0 ([66832e9](https://github.com/Alwatr/flux/commit/66832e946a9c5f0ebca46fbe843f84850ee9e8ff)) by @
* **deps:** bump async from 2.6.3 to 2.6.4 ([86f84df](https://github.com/Alwatr/flux/commit/86f84df15261ca56ccff8e34032ff59356488be2)) by @
* **deps:** bump decode-uri-component from 0.2.0 to 0.2.2 ([7f0ddb0](https://github.com/Alwatr/flux/commit/7f0ddb09f8a9c415b93d8b231d896e5d8a93c3c4)) by @
* **deps:** bump decode-uri-component from 0.2.0 to 0.2.2 ([5c2f825](https://github.com/Alwatr/flux/commit/5c2f825a19ee90f85fd485c02ca9d8729a6f9d37)) by @
* **deps:** bump dessant/lock-threads from 3 to 4 ([0271756](https://github.com/Alwatr/flux/commit/027175666ae97a5c63ba2e49adab0e69112671ea)) by @
* **deps:** bump dessant/lock-threads from 3 to 4 ([bbb5790](https://github.com/Alwatr/flux/commit/bbb57902456388eaf9dd9f454f12af5b9fe66bdb)) by @
* **deps:** bump dessant/lock-threads from 4.0.0 to 4.0.1 ([5567abb](https://github.com/Alwatr/flux/commit/5567abb7ea761b94689338bcd62246c8eb126b76)) by @
* **deps:** bump docker/build-push-action from 3 to 4 ([e5ff205](https://github.com/Alwatr/flux/commit/e5ff205d6f74066a2de7c7b4e508ad539b2ec050)) by @
* **deps:** bump docker/build-push-action from 4.0.0 to 4.1.1 ([3508262](https://github.com/Alwatr/flux/commit/3508262f789642151ff470c6af4fff5958930c10)) by @
* **deps:** bump docker/login-action from 2.1.0 to 2.2.0 ([176d0c5](https://github.com/Alwatr/flux/commit/176d0c51a9c04f998114c8bc12394f29b8ca768a)) by @
* **deps:** bump docker/metadata-action from 4.3.0 to 4.4.0 ([c195f07](https://github.com/Alwatr/flux/commit/c195f078bdf0ec340e1a03c19cb8289b8f61b0a9)) by @
* **deps:** bump docker/metadata-action from 4.4.0 to 4.6.0 ([be483f5](https://github.com/Alwatr/flux/commit/be483f5c5c3f12d30ac991012e213d9fb79e83b9)) by @
* **deps:** bump docker/setup-buildx-action from 2.4.0 to 2.4.1 ([6b57541](https://github.com/Alwatr/flux/commit/6b57541471aacb509cb0e0a56337a71dd8bec493)) by @
* **deps:** bump docker/setup-buildx-action from 2.4.1 to 2.5.0 ([b4e8bd5](https://github.com/Alwatr/flux/commit/b4e8bd508006359696428f3cb9b31f3e994122a1)) by @
* **deps:** bump docker/setup-buildx-action from 2.5.0 to 2.7.0 ([92fa8a8](https://github.com/Alwatr/flux/commit/92fa8a8dc242e306989a58a4f481ec9f59dbe487)) by @
* **deps:** bump docker/setup-buildx-action from 2.7.0 to 2.8.0 ([cef5229](https://github.com/Alwatr/flux/commit/cef5229a7962e10e0ab8a735313dba9f9e369c36)) by @
* **deps:** bump docker/setup-buildx-action from 2.8.0 to 2.9.0 ([2d3b648](https://github.com/Alwatr/flux/commit/2d3b648c4cb5aeae87355660f93650618ce2f145)) by @
* **deps:** bump docker/setup-buildx-action from 2.9.0 to 2.9.1 ([fc53bbc](https://github.com/Alwatr/flux/commit/fc53bbc791de204484129e2281c47b44a4675de9)) by @
* **deps:** bump exit-hook from 3.1.0 to 3.1.1 ([328ee63](https://github.com/Alwatr/flux/commit/328ee630055676f31b30ea62298bb13319898cd1)) by @
* **deps:** bump exit-hook from 3.1.1 to 3.1.2 ([27ffd67](https://github.com/Alwatr/flux/commit/27ffd674f21e1eafabb6f1669f412850818aa887)) by @
* **deps:** bump exit-hook from 3.1.2 to 3.1.4 ([6952c40](https://github.com/Alwatr/flux/commit/6952c4001c7b8f3af0c4a1978fdc27ae663490b8)) by @
* **deps:** bump exit-hook from 3.1.4 to 3.2.0 ([7104ccc](https://github.com/Alwatr/flux/commit/7104ccc5fb39a32e612344d26a1c7582014536c3)) by @
* **deps:** bump github/codeql-action from 2.2.1 to 2.2.2 ([29b82d1](https://github.com/Alwatr/flux/commit/29b82d1c43a8fd6c36a276942b5746ac386543a2)) by @
* **deps:** bump github/codeql-action from 2.2.2 to 2.2.3 ([9d7a386](https://github.com/Alwatr/flux/commit/9d7a3869b2cf1b27c404fff1c4c9133d1c8c9a90)) by @
* **deps:** bump github/codeql-action from 2.2.3 to 2.2.4 ([#813](https://github.com/Alwatr/flux/issues/813)) ([4d99b0f](https://github.com/Alwatr/flux/commit/4d99b0f177f582fd160cc4a5e8bddb3e93bbd582)) by @
* **deps:** bump github/codeql-action from 2.2.4 to 2.2.5 ([#878](https://github.com/Alwatr/flux/issues/878)) ([25ff32f](https://github.com/Alwatr/flux/commit/25ff32f08586f58cf85b96122f751cc34ed28072)) by @
* **deps:** bump github/codeql-action from 2.2.5 to 2.2.7 ([abca494](https://github.com/Alwatr/flux/commit/abca4948ffd47d7e3af8464618cca321d8f72e17)) by @
* **deps:** bump github/codeql-action from 2.2.7 to 2.2.9 ([349071d](https://github.com/Alwatr/flux/commit/349071dfe990a16fde90785865a77a32d13c8c66)) by @
* **deps:** bump github/codeql-action from 2.2.9 to 2.3.0 ([5579916](https://github.com/Alwatr/flux/commit/5579916859f3608d4f39d8a5959a4281e30d6712)) by @
* **deps:** bump github/codeql-action from 2.20.0 to 2.20.1 ([698da04](https://github.com/Alwatr/flux/commit/698da0413d8cf8ef6f44aae6da8d03110298205d)) by @
* **deps:** bump github/codeql-action from 2.20.1 to 2.20.2 ([74d4863](https://github.com/Alwatr/flux/commit/74d4863911ee082a58fd769cc89c5c9fc673be40)) by @
* **deps:** bump github/codeql-action from 2.20.2 to 2.20.3 ([7f2008d](https://github.com/Alwatr/flux/commit/7f2008d49860058882741e5a10f131360bfa3b9d)) by @
* **deps:** bump github/codeql-action from 2.20.3 to 2.20.4 ([ef9f4ba](https://github.com/Alwatr/flux/commit/ef9f4ba6e0355f34b751d09f472d3822d034e3ea)) by @
* **deps:** bump github/codeql-action from 2.20.4 to 2.21.0 ([aa36572](https://github.com/Alwatr/flux/commit/aa365724db588eab165879941500d327940dde36)) by @
* **deps:** bump github/codeql-action from 2.21.0 to 2.21.1 ([808215a](https://github.com/Alwatr/flux/commit/808215abd02796a097908d09efcb9b83dcf94d90)) by @
* **deps:** bump github/codeql-action from 2.21.1 to 2.21.2 ([1d5c955](https://github.com/Alwatr/flux/commit/1d5c9558c29fade56ea6ad2d0c19554e75dd4ce9)) by @
* **deps:** bump github/codeql-action from 2.21.2 to 2.21.4 ([3bc0a14](https://github.com/Alwatr/flux/commit/3bc0a14f8899608a1812125d7066fb0c147d1d60)) by @
* **deps:** bump github/codeql-action from 2.3.0 to 2.3.3 ([7fc88ad](https://github.com/Alwatr/flux/commit/7fc88ad1d362c92327d08ef884f4b4175b870ff4)) by @
* **deps:** bump github/codeql-action from 2.3.3 to 2.3.5 ([f8a678d](https://github.com/Alwatr/flux/commit/f8a678d6c7314f55646de43d78dc12fd95b1bb90)) by @
* **deps:** bump github/codeql-action from 2.3.5 to 2.3.6 ([60d4bf2](https://github.com/Alwatr/flux/commit/60d4bf2c5fbde55f3227166656dfbbb830c2ab12)) by @
* **deps:** bump github/codeql-action from 2.3.6 to 2.20.0 ([7ca7a01](https://github.com/Alwatr/flux/commit/7ca7a01c81f81844c0a30eade9e94f89ca0d716a)) by @
* **deps:** bump json5 from 1.0.1 to 1.0.2 ([4ed962d](https://github.com/Alwatr/flux/commit/4ed962d616a56bfe515eaf88cecfd302a003b348)) by @
* **deps:** bump lit from 2.2.8 to 2.3.1 ([da8f059](https://github.com/Alwatr/flux/commit/da8f05917dc3e027ce008edab6f512455afa6072)) by @
* **deps:** bump lit from 2.3.1 to 2.4.0 ([9f2ac18](https://github.com/Alwatr/flux/commit/9f2ac18e7d2a3a0efb50d0c879318efe0917b8ce)) by @
* **deps:** bump lit from 2.4.0 to 2.4.1 ([6bbb11f](https://github.com/Alwatr/flux/commit/6bbb11fb65482773f480ea3cbc571bf9f9f0794e)) by @
* **deps:** bump lit from 2.4.1 to 2.5.0 ([b62f079](https://github.com/Alwatr/flux/commit/b62f0795ca71308e7730334b22ce5a27873530cd)) by @
* **deps:** bump lit from 2.5.0 to 2.6.0 ([cc1967a](https://github.com/Alwatr/flux/commit/cc1967a870019c0a43db192559c28e14bdd0b484)) by @
* **deps:** bump lit from 2.6.0 to 2.6.1 ([#645](https://github.com/Alwatr/flux/issues/645)) ([9238323](https://github.com/Alwatr/flux/commit/9238323fd5b79fed67b3c8c2c64e9337fe06aa9a)) by @
* **deps:** bump lit from 2.6.1 to 2.7.0 ([2b3dc81](https://github.com/Alwatr/flux/commit/2b3dc818738dfd9a3808e1d09174741e79b704ec)) by @
* **deps:** bump lit from 2.7.0 to 2.7.1 ([b7a3dcd](https://github.com/Alwatr/flux/commit/b7a3dcd7c5a2a8a5ce8848429633a6b044c629a3)) by @
* **deps:** bump lit from 2.7.1 to 2.7.2 ([9a0c183](https://github.com/Alwatr/flux/commit/9a0c183f4e5da91b4709c44e3d36cfc4fe76ee5b)) by @
* **deps:** bump lit from 2.7.2 to 2.7.3 ([3c9be54](https://github.com/Alwatr/flux/commit/3c9be542af32d01b6e437c6a9acb01e49ef7d0d2)) by @
* **deps:** bump lit from 2.7.3 to 2.7.4 ([8aee36c](https://github.com/Alwatr/flux/commit/8aee36c7757582eba935eb61f25ba60906f76ad6)) by @
* **deps:** bump lit from 2.7.4 to 2.7.5 ([4df2208](https://github.com/Alwatr/flux/commit/4df2208b406b0b5e9fa460102e28befbc9a2d243)) by @
* **deps:** bump lit from 2.7.5 to 2.7.6 ([11bcc7d](https://github.com/Alwatr/flux/commit/11bcc7d2aa17d4429f6b3a8c9d2a2712f478e29b)) by @
* **deps:** bump lit from 2.7.6 to 2.8.0 ([a1589b1](https://github.com/Alwatr/flux/commit/a1589b1c0736f1e5bef0755c002b44107b323b79)) by @
* **deps:** bump lit-html from 2.7.4 to 2.7.5 ([1a295fd](https://github.com/Alwatr/flux/commit/1a295fd34dd82d4c7d074753e2afde0d4fa605e4)) by @
* **deps:** bump lit-html from 2.7.5 to 2.8.0 ([9c4f3d8](https://github.com/Alwatr/flux/commit/9c4f3d83eee6eddd8e29ba26ed29f0042e88f043)) by @
* **deps:** bump node-fetch from 2.6.6 to 2.6.7 ([6674d39](https://github.com/Alwatr/flux/commit/6674d39134ca6d2c742a5f0bf3a10e57e9abff48)) by @
* **deps:** bump parse-url from 6.0.0 to 6.0.2 ([783ac55](https://github.com/Alwatr/flux/commit/783ac556e80d7e3f05c4edbf6533f955b39126d3)) by @
* **deps:** bump semver from 5.7.1 to 5.7.2 ([6970576](https://github.com/Alwatr/flux/commit/6970576215aa25905fa705fb389e4f8e8f9a64e4)) by @
* **deps:** bump sigstore/cosign-installer from 3.0.1 to 3.0.2 ([b5f28ed](https://github.com/Alwatr/flux/commit/b5f28ed5617b8c7f49d295cce17bdbef5fadf76f)) by @
* **deps:** bump sigstore/cosign-installer from 3.0.2 to 3.0.3 ([02b3202](https://github.com/Alwatr/flux/commit/02b32028d24dbd90f798f5988bef8c6b9eab7da5)) by @
* **deps:** bump sigstore/cosign-installer from 3.0.3 to 3.0.5 ([ad0a0a9](https://github.com/Alwatr/flux/commit/ad0a0a92b61a4f07bfb8377c710bc3cc91737c62)) by @
* **deps:** bump sigstore/cosign-installer from 3.0.5 to 3.1.0 ([b0bfcb5](https://github.com/Alwatr/flux/commit/b0bfcb5405c4bdb1e735aad8b4f18e4bd0e05096)) by @
* **deps:** bump sigstore/cosign-installer from 3.1.0 to 3.1.1 ([bcf614b](https://github.com/Alwatr/flux/commit/bcf614b88ce87862b843c2766bfd40c74aed56a8)) by @
* **deps:** bump telegraf from 4.11.2 to 4.12.2 ([f1bbb88](https://github.com/Alwatr/flux/commit/f1bbb88b702062663e2eed4b12a5444e74ecb010)) by @
* **deps:** bump the alwatr-dependencies group with 3 updates ([f2a109d](https://github.com/Alwatr/flux/commit/f2a109d9b1775b67303d9407e20a5591cc69e4a7)) by @
* **deps:** bump the alwatr-dependencies group with 3 updates ([e5105eb](https://github.com/Alwatr/flux/commit/e5105eb0bbc450566b1ae6aee9241d541377bf94)) by @
* **deps:** bump the alwatr-dependencies group with 4 updates ([0019b83](https://github.com/Alwatr/flux/commit/0019b83ed56643b634972d8a15651ef2eaa2d735)) by @
* **deps:** bump the alwatr-dependencies group with 4 updates ([eb7fdfa](https://github.com/Alwatr/flux/commit/eb7fdfa545b5c1e040839a427326937acdcd8cb3)) by @
* **deps:** bump the alwatr-dependencies group with 4 updates ([4069863](https://github.com/Alwatr/flux/commit/40698638f3825b118d8c24fa115403f3f3b564a7)) by @
* **deps:** bump the github-actions group with 1 update ([8fcf9be](https://github.com/Alwatr/flux/commit/8fcf9be3253386f62a166e75693aa557294ca1a8)) by @
* **deps:** bump the github-actions group with 1 update ([f20e430](https://github.com/Alwatr/flux/commit/f20e430aa3b1efaf14719e64fbb5b2a43616b654)) by @
* **deps:** bump the github-actions group with 1 update ([f1beb65](https://github.com/Alwatr/flux/commit/f1beb65a355194ad2df1462d1e6d65e149b88e62)) by @
* **deps:** bump the github-actions group with 1 update ([9a662ea](https://github.com/Alwatr/flux/commit/9a662eab12a8e7c192d18f77522271be55034e69)) by @
* **deps:** bump the github-actions group with 1 update ([237ba45](https://github.com/Alwatr/flux/commit/237ba45fb55af593e7522c7af13a8355a1bbf3a5)) by @
* **deps:** bump the github-actions group with 1 update ([a8b6b5e](https://github.com/Alwatr/flux/commit/a8b6b5e2a9346dff91c3029b4a85bda5c76644f7)) by @
* **deps:** bump the github-actions group with 1 update ([c527bdc](https://github.com/Alwatr/flux/commit/c527bdc6cc1b99711845d18bbeb6f1a712192e4e)) by @
* **deps:** bump the github-actions group with 1 update ([5159037](https://github.com/Alwatr/flux/commit/51590374abc08c7d2e6f1312da4d55413b612de2)) by @
* **deps:** bump the github-actions group with 1 update ([48e5847](https://github.com/Alwatr/flux/commit/48e58477948631bee8b352845d4d0a2c21a32238)) by @
* **deps:** bump the github-actions group with 2 updates ([e85ba69](https://github.com/Alwatr/flux/commit/e85ba69ba9fc63107e4bec7ed8a3e63fa1aca825)) by @
* **deps:** bump the github-actions group with 2 updates ([6346f31](https://github.com/Alwatr/flux/commit/6346f31016bae2dc3f2b2fe327080eb35a517ebd)) by @
* **deps:** bump the github-actions group with 2 updates ([2872828](https://github.com/Alwatr/flux/commit/28728281b83453cc025fac1906edf8d37c8f29c0)) by @
* **deps:** bump the github-actions group with 2 updates ([1ddd08b](https://github.com/Alwatr/flux/commit/1ddd08b6abd045d2c2b673eaf0ed1cfd13f395bb)) by @
* **deps:** bump the github-actions group with 4 updates ([d050dcc](https://github.com/Alwatr/flux/commit/d050dcccda321f44bbc41d3fe2a9edcdda087f8e)) by @
* **deps:** bump the github-actions group with 6 updates ([3ac5072](https://github.com/Alwatr/flux/commit/3ac507244d39b308c012dd49b82c476279093e05)) by @
* **deps:** bump the production-dependencies group with 2 updates ([319f723](https://github.com/Alwatr/flux/commit/319f723a631fab6ae9a3f010471e4a8fbc106699)) by @
* **deps:** bump tslib from 2.4.0 to 2.4.1 ([fc2b559](https://github.com/Alwatr/flux/commit/fc2b5598e76307434ccffe99dbe9be7c33566097)) by @
* **deps:** bump tslib from 2.4.1 to 2.5.0 ([1e91446](https://github.com/Alwatr/flux/commit/1e914467a05d664f814d2b8013a704df84d5538c)) by @
* **deps:** bump tslib from 2.5.0 to 2.5.2 ([64e874a](https://github.com/Alwatr/flux/commit/64e874a4bb79f0933353666cc961bdd63cfb50e3)) by @
* **deps:** bump tslib from 2.5.2 to 2.5.3 ([0a90987](https://github.com/Alwatr/flux/commit/0a909879e53ec4b8d5427a0fa1b7bd4f91da6ef2)) by @
* **deps:** bump tslib from 2.5.3 to 2.6.0 ([c361072](https://github.com/Alwatr/flux/commit/c3610722ff1759965e2ee81b9e8ac4c68d4f817d)) by @
* **deps:** bump tslib from 2.6.0 to 2.6.1 ([615a072](https://github.com/Alwatr/flux/commit/615a0728ff0814cc4146aebdcab7ce2489a4a3bb)) by @
* **deps:** bump tslib from 2.6.1 to 2.6.2 ([dcec6d7](https://github.com/Alwatr/flux/commit/dcec6d7686c356f365aede96874b96510e918039)) by @
* **deps:** bump zx from 7.0.8 to 7.1.1 ([aa2b284](https://github.com/Alwatr/flux/commit/aa2b284ddfeefebf1b8061fbcc3d208a24912765)) by @
* **deps:** bump zx from 7.1.1 to 7.2.0 ([0dfc00f](https://github.com/Alwatr/flux/commit/0dfc00f96f84cee2355f1aabec08148874ad30e0)) by @
* **deps:** bump zx from 7.2.0 to 7.2.1 ([963bed3](https://github.com/Alwatr/flux/commit/963bed31422cf9a3d3f17adbb9b52685b850b863)) by @
* **deps:** bump zx from 7.2.1 to 7.2.2 ([77c07d4](https://github.com/Alwatr/flux/commit/77c07d4a4fad12254ca9056afa9f0ef1d1b670d2)) by @
* **deps:** bump zx from 7.2.2 to 7.2.3 ([c622598](https://github.com/Alwatr/flux/commit/c62259871d8b2579a5d1fa2e03c74d96e831171f)) by @
* **deps:** change all versions ([ec57c71](https://github.com/Alwatr/flux/commit/ec57c71a2233ef0c31b5e888e79cc3c13abfd728)) by @
* **deps:** esbuild version resolution ([76e97db](https://github.com/Alwatr/flux/commit/76e97dbc408aeda1cb8be19de6d10ea4f8fc7ae0)) by @
* **deps:** fix and update ([ab83ec7](https://github.com/Alwatr/flux/commit/ab83ec789d43245a8ff109e151b054a1fecb8e2a)) by @
* **deps:** fix and upgrade ([5821d09](https://github.com/Alwatr/flux/commit/5821d09632304e53e19d26de1eddd9fe1157d8ef)) by @
* **deps:** fix pwa build ([2317eab](https://github.com/Alwatr/flux/commit/2317eab7c9a76fc1051dd054b1e1d10d4232bca0)) by @
* **deps:** fix version ([cfceaed](https://github.com/Alwatr/flux/commit/cfceaede9a3562faaee1f02ecff342c581f4c1f9)) by @
* **deps:** update ([d7e2ef1](https://github.com/Alwatr/flux/commit/d7e2ef1a9de62fff6bfb2fd32af7dcfb4fcb048d)) by @njfamirm
* **deps:** update ([6d8c339](https://github.com/Alwatr/flux/commit/6d8c339a636415725f2322cd5ddd74dde561ece1)) by @
* **deps:** update ([b891b91](https://github.com/Alwatr/flux/commit/b891b914fef909aa2f7aea8b91f15356dfc0560f)) by @
* **deps:** upgrade ([7e60a62](https://github.com/Alwatr/flux/commit/7e60a6237f8b07b72dd9afd6bbaa140b187fe882)) by @
* **deps:** upgrade ([7bf08be](https://github.com/Alwatr/flux/commit/7bf08bea62f01a4abe43f5093cade0da45330a7c)) by @
* **deps:** upgrade ([50b8d10](https://github.com/Alwatr/flux/commit/50b8d10cebee498f0a73b1f5df8a9474b901e9ff)) by @
* **deps:** upgrade ([4e887e8](https://github.com/Alwatr/flux/commit/4e887e89bc9fa8167888bec3cb291bbcca6e5e38)) by @
* **deps:** upgrade ([d6484ee](https://github.com/Alwatr/flux/commit/d6484eee40e6ac55688b06b4f52a36b5812a3b27)) by @
* **deps:** upgrade ([80af7e4](https://github.com/Alwatr/flux/commit/80af7e4834bcc367fc8dbddf31cc8bb61fdcf9f8)) by @
* **deps:** upgrade ([c10d04e](https://github.com/Alwatr/flux/commit/c10d04ee807da068ce8c4f41330add2fadfe5931)) by @
* **deps:** upgrade ([574076e](https://github.com/Alwatr/flux/commit/574076e9f4786dddb183019190a050dee39872e7)) by @
* **deps:** upgrade ([c55e5ff](https://github.com/Alwatr/flux/commit/c55e5ff3ad6766126b7aa317ce2a642554a1912a)) by @
* **deps:** upgrade ([4c6a7ed](https://github.com/Alwatr/flux/commit/4c6a7ed67afdfc31571881b9a6b431e9afd31a3a)) by @
* **deps:** upgrade ([f252735](https://github.com/Alwatr/flux/commit/f2527352913cc17d9f7b91ade752f7963cd9a779)) by @
* **deps:** upgrade ([bdb3f38](https://github.com/Alwatr/flux/commit/bdb3f382c95a2def9d52db3f189f4775b1c28717)) by @
* **deps:** upgrade ([61347ad](https://github.com/Alwatr/flux/commit/61347adcaecfef225b9643fc8c983d552baa4774)) by @
* **deps:** upgrade ([e96dd92](https://github.com/Alwatr/flux/commit/e96dd926c3474fd484c26c78b2b706e844a62288)) by @
* **deps:** upgrade ([ebfab88](https://github.com/Alwatr/flux/commit/ebfab88ace6779eb64a55d25b8108c6dcf92bf11)) by @
* **deps:** upgrade typescript-eslint to 6.2 ([e67f3ea](https://github.com/Alwatr/flux/commit/e67f3eaaea30cff1a451c91eb49bf07a7854ec3b)) by @
* **deps:** workspace dependencies ([627938e](https://github.com/Alwatr/flux/commit/627938e38e75a5e425388c3d56837feffd6716a2)) by @
* **dev-deps:** move all packages dev deps to root ([58a5b32](https://github.com/Alwatr/flux/commit/58a5b32bb4ba8dfef70680851d41159e9373165b)) by @
* disable yarn telemetry ([1e6cad3](https://github.com/Alwatr/flux/commit/1e6cad36a16db3ea93ff525feeb1da94bb023e4a)) by @
* docs folder ([388e46a](https://github.com/Alwatr/flux/commit/388e46a58da5593fdf0613e3ea2051375d84c893)) by @
* dotfiles update ([a7a7f82](https://github.com/Alwatr/flux/commit/a7a7f827c039a8baa336e16074b30faf214f12e8)) by @
* encrypt all http demo ([3b2e90c](https://github.com/Alwatr/flux/commit/3b2e90caffe32ff15c0adf4f445b635c5791de22)) by @
* engines requirements ([1777670](https://github.com/Alwatr/flux/commit/1777670b76e09b4576d4f2b58fadba6909161f33)) by @
* engines version ([10b8920](https://github.com/Alwatr/flux/commit/10b8920881618484430efca3df904aa9ae433f6a)) by @
* **es-bench:** add a new test ([4f8f636](https://github.com/Alwatr/flux/commit/4f8f6368b7a4a31b966ef83b54b6600b95eb6994)) by @
* **es-bench:** after shaving memory test ([1cd8577](https://github.com/Alwatr/flux/commit/1cd8577ae25697bc4a7bf4f4b4215427727ab6c2)) by @
* **es-bench:** improve doc ([2efc034](https://github.com/Alwatr/flux/commit/2efc03494430085fc6d5991a11230711eb09d787)) by @
* **es-bench:** test reg cost ([3ee7fd3](https://github.com/Alwatr/flux/commit/3ee7fd38e787efb42f5b338be1b0fbb3e864ecfa)) by @
* **eslint:** define lit config ([96d4e5f](https://github.com/Alwatr/flux/commit/96d4e5f31ba1896d3b56c8ca6f9788e887c97e4e)) by @
* **eslint:** lit/recommended ([c2400a6](https://github.com/Alwatr/flux/commit/c2400a604bd3c2f97f447c1bc8df99f246df86a3)) by @
* **eslint:** update config ([c6857fe](https://github.com/Alwatr/flux/commit/c6857fea2ebfe2784be816af96aca3718767118c)) by @
* **eslint:** use --ignore-path .gitignore ([16b4ba0](https://github.com/Alwatr/flux/commit/16b4ba070a930c23178baf65fca6f085908ef82d)) by @
* **fetch:** improve log and demo ([d3015f0](https://github.com/Alwatr/flux/commit/d3015f0cc46a8b6bff11fcf0fe353312f46bf6ae)) by @
* fix all @alwatr/* dependencies & refrences ([b42ced5](https://github.com/Alwatr/flux/commit/b42ced51caec28df9fdd5131024991149daeeaed)) by @
* fix all versions ([237c4d5](https://github.com/Alwatr/flux/commit/237c4d5f79d2dadecf7bf8fcd3882aeda077820e)) by @
* fix missing deps ([3b74acc](https://github.com/Alwatr/flux/commit/3b74accf15664b7b9c4c6a034a456fb15a9dd54c)) by @
* fix packages workspace path ([5e8ce97](https://github.com/Alwatr/flux/commit/5e8ce9705eac481dc69a1527c9d6bf83b151f0c4)) by @
* fix upd script ([ca79cb2](https://github.com/Alwatr/flux/commit/ca79cb2736dc64173cd9bb515723860da04b1dae)) by @AliMD
* **flight-finder:** cleanup root ([0128502](https://github.com/Alwatr/flux/commit/01285025ea627ecdf3038e1804f98e35704f14ee)) by @
* **fsm2:** first try!! ([a129935](https://github.com/Alwatr/flux/commit/a1299357d4e0d2e50c38c178709c0130356f7ba6)) by @
* **fsm:** enhance debug log ([7562bfb](https://github.com/Alwatr/flux/commit/7562bfb3657b2a891bf2957e46707e4a32659d11)) by @
* **fsm:** fix log ([dcf54b5](https://github.com/Alwatr/flux/commit/dcf54b57807eb722c5fa8de619dc864fc2540de8)) by @
* **fsm:** make it public ([d17ea4e](https://github.com/Alwatr/flux/commit/d17ea4e106a06366ec42269799aa49d568e33b64)) by @
* **fsm:** rename fsm2 ([f10fea0](https://github.com/Alwatr/flux/commit/f10fea017f75c3a26a26319b14284e8ee4bc605d)) by @
* **github:** add issue templates ([1fd99d4](https://github.com/Alwatr/flux/commit/1fd99d4f0a49fb33bb9c0b6c2e7501a0c97791e3)) by @
* **gitignore:** remove unnecessary rules ([8941bea](https://github.com/Alwatr/flux/commit/8941beaf8a9bbb4df5baeff903225013babf4d3b)) by @
* **gitignore:** review andcleanup ([b3d63bb](https://github.com/Alwatr/flux/commit/b3d63bbdfcf40a3bff94ee1755263c7d5752ee56)) by @
* **gitignore:** update git ignore config ([4359cbd](https://github.com/Alwatr/flux/commit/4359cbd51ce94bbee06d4bd8eac4e48fd6bef688)) by @
* **gitignore:** update gitignore ([3f62491](https://github.com/Alwatr/flux/commit/3f624910394a112fc31d24d54a5955775ea99a3a)) by @
* **gitignore:** update gitignore ([e83513b](https://github.com/Alwatr/flux/commit/e83513b1308d5d6736a99bdb99b6f40b0fac1de0)) by @
* ignore db folder ([52ce963](https://github.com/Alwatr/flux/commit/52ce963e22cb6b1cedad66c2c75899402cd43600)) by @
* init .gitconfig ([9d7da76](https://github.com/Alwatr/flux/commit/9d7da7646cc516020f7666ddd3c48cded5fb732c)) by @
* install import eslint ([034fbad](https://github.com/Alwatr/flux/commit/034fbadd492d168f9e58e60e3af806dfc09ed1cb)) by @
* **labels:** add release ([ca62ac9](https://github.com/Alwatr/flux/commit/ca62ac90894319e6b79fb4ec58e20a773b39dd80)) by @
* **labels:** update ([a977b6f](https://github.com/Alwatr/flux/commit/a977b6f9dece7fd807284382ca96e21fe3449859)) by @
* **lerna:** config ([a682930](https://github.com/Alwatr/flux/commit/a682930c24e315a1d0539536ca4a0aefeaf805eb)) by @
* **lerna:** config ([af13390](https://github.com/Alwatr/flux/commit/af13390a88d06413577c3e417e62285308854d3e)) by @
* **lerna:** config ([60a8160](https://github.com/Alwatr/flux/commit/60a8160fe074da1c47fc3a502b4f586326df7ed0)) by @
* **lerna:** config ([43f4979](https://github.com/Alwatr/flux/commit/43f4979e6ac0e8bfecab8b430d49210960e9d2af)) by @
* **lerna:** config lerna ([c07f03f](https://github.com/Alwatr/flux/commit/c07f03f1ef621e9550033ff30f44cecceae2ec82)) by @
* **lerna:** enhance changelogs ([f190aff](https://github.com/Alwatr/flux/commit/f190aff3b355daf10fdf054800f6d0142cd37612)) by @
* **lerna:** enhance config ([6a4ad21](https://github.com/Alwatr/flux/commit/6a4ad21601eda6331b40bd53b50391db19145c9f)) by @
* **lerna:** enhance config with release ([28e8686](https://github.com/Alwatr/flux/commit/28e8686db27261e83eeedb8f408d1181464bb346)) by @
* **lerna:** fix release message ([16d807e](https://github.com/Alwatr/flux/commit/16d807eb7f1f0bc2082624e9063b1b3b2533b807)) by @
* **lerna:** independent version ([7bd3622](https://github.com/Alwatr/flux/commit/7bd3622f4b02fb7819a02df688aefe4a569242f5)) by @
* **lerna:** remove createReleaseDiscussion ([850ca34](https://github.com/Alwatr/flux/commit/850ca348303e983ccbb45fe6904883034392621a)) by @
* **lerna:** update config ([5c01e0f](https://github.com/Alwatr/flux/commit/5c01e0f5a27c6d6208d0e84de00c8c301787c10c)) by @
* **lerna:** update config ([9d30445](https://github.com/Alwatr/flux/commit/9d3044502219ddf2f3277716aaa43f5b88f2a31e)) by @
* **lerna:** verbose log ([67368ae](https://github.com/Alwatr/flux/commit/67368aea4e5ca586c022c8e3d03c7336e0c3da78)) by @
* **lerna:** version commit message ([fa7b17c](https://github.com/Alwatr/flux/commit/fa7b17c4934b8807c82a9c895fc885eff50d1c51)) by @
* **lint:** add import/no-duplicates prefer-inline for type ([8b2449a](https://github.com/Alwatr/flux/commit/8b2449a00505c83f1d4af9a072ca63649a2e383c)) by @
* **lint:** make strict and stylistic ([756c316](https://github.com/Alwatr/flux/commit/756c316e356d11e9dc4a6a381df1bec88045fb54)) by @
* **lint:** upgrade typescript eslint to v6 ([fb1944e](https://github.com/Alwatr/flux/commit/fb1944e0fc045f5f0ccccd18b4fd591c25c85b43)) by @
* lit best practices ([6ebe9ca](https://github.com/Alwatr/flux/commit/6ebe9ca5ecc6e46c48902917e9fbfb4381019cbb)) by @
* **maintain:** config ([ddaabab](https://github.com/Alwatr/flux/commit/ddaabab03b8329f2f9785e17fe7abf2ad1c3e938)) by @
* **maintain:** update config ([21e81d7](https://github.com/Alwatr/flux/commit/21e81d7a0d5eaac4eda8bf17e86785251641b011)) by @
* **maintain:** update config ([810e145](https://github.com/Alwatr/flux/commit/810e145f4099dbfbb163eb16fbe1e3d8706c16d2)) by @
* **maintain:** update config ([eb367be](https://github.com/Alwatr/flux/commit/eb367beb4e02a97f7a81d0f6a65904810385103d)) by @
* **maintain:** update config ([211dbc6](https://github.com/Alwatr/flux/commit/211dbc696176ac1ff3abb6cec316d673bf30c970)) by @
* **maintain:** upgrade packages ([fdcf4d2](https://github.com/Alwatr/flux/commit/fdcf4d24c9837e2bb1b10b2cb88d589409205506)) by @
* make lint happy before release ([7beeb78](https://github.com/Alwatr/flux/commit/7beeb7857b06dda50814521c7ad74a8233b65089)) by @
* move eslint and prettier config to root ([6866e99](https://github.com/Alwatr/flux/commit/6866e9919364b5322375a48b37592a60b20b31df)) by @
* nginx 1.9.2-1.25-alpine ([93496b2](https://github.com/Alwatr/flux/commit/93496b205a967798329500d6e0e261e275e0d706)) by @
* **nginx:** release 1.6.0-1.24-alpine ([27466d2](https://github.com/Alwatr/flux/commit/27466d258e25c8911aa7adb2e1cb194a9870711f)) by @
* **nginx:** update version ([81c8a26](https://github.com/Alwatr/flux/commit/81c8a26b62f5cc4eff295f5fe0ab53033d1e8af1)) by @
* **nginx:** update version to 1.3.1-1.24-alpine ([f1d9898](https://github.com/Alwatr/flux/commit/f1d989898090c0b9f0bcdc969cb51685f682096c)) by @
* **nginx:** update version to 1.3.2-1.24-alpine ([881e7f8](https://github.com/Alwatr/flux/commit/881e7f8a777f55709242392fa991c7046f9be5eb)) by @
* **nginx:** update version to 1.4.0 ([66b19d2](https://github.com/Alwatr/flux/commit/66b19d2fb2797b88800778daaf96b002c9eaaeb3)) by @
* **nginx:** version ([c7b10b1](https://github.com/Alwatr/flux/commit/c7b10b1a021db2a6498173003ae41971e6e23c45)) by @
* **nginx:** version ([0e566c5](https://github.com/Alwatr/flux/commit/0e566c5e324315b9f3f811afa991a70a30998b97)) by @
* **nginx:** version 1.5.0 ([59e6768](https://github.com/Alwatr/flux/commit/59e67683cf9bfcca9a67e502a1ee64174b7ac0dd)) by @
* org url ([7e25b7c](https://github.com/Alwatr/flux/commit/7e25b7c58f60e71ec689d45dc029c36464265397)) by @
* **package.json:** change version command ([ba333db](https://github.com/Alwatr/flux/commit/ba333db6d1e5dd81c4138ec5f84d4cc19b571a4f)) by @
* **package.json:** fix resolutions and clean command ([68108b6](https://github.com/Alwatr/flux/commit/68108b6768ff95e565cc05a162bdd8c019e415b4)) by @
* **package.json:** remove license ([a109240](https://github.com/Alwatr/flux/commit/a10924082e36d9917382ca3f150204effc131816)) by @
* **package:** fix release script ([f1c4080](https://github.com/Alwatr/flux/commit/f1c40807378c765503e325acbaa303a4e109cfb3)) by @
* **package:** fix scripts ([1f7050f](https://github.com/Alwatr/flux/commit/1f7050f9a49308008e1416ee4c5c90f30771d593)) by @
* **package:** rl script for release ([f8b447f](https://github.com/Alwatr/flux/commit/f8b447fc9cc69069e3fa844107cfe643b62f6cb0)) by @
* packages and path ([3a7a810](https://github.com/Alwatr/flux/commit/3a7a8105110721b8a54873a8a249d726bc971679)) by @
* packages versions ([bda32aa](https://github.com/Alwatr/flux/commit/bda32aa1414de14bf504a277830ff1e648692045)) by @
* **packages:** name and engines ([c7368fc](https://github.com/Alwatr/flux/commit/c7368fcbee81e8d21bdc24b8483ee72234c9d895)) by @
* **package:** update and fix ts version ([5148a63](https://github.com/Alwatr/flux/commit/5148a638dd10174ad4605e5a53696a9e5737476f)) by @
* **package:** update and fix ts version ([f7c813c](https://github.com/Alwatr/flux/commit/f7c813cd33842a09884ee2921a2608e336fec811)) by @
* **paclages:** author url ([92f2a3d](https://github.com/Alwatr/flux/commit/92f2a3d28383649a636760c57a4525a99b0c37ff)) by @
* **pr_template:** update to latest changes ([c70622e](https://github.com/Alwatr/flux/commit/c70622e23997fecac61de030872417cf62c1007c)) by @
* publish config in package.json ([#15](https://github.com/Alwatr/flux/issues/15)) ([1fa7133](https://github.com/Alwatr/flux/commit/1fa71335f3232c0fb185e4861a2dd6b798fb17ec)) by @
* **publish-alwatr-container.yml:** fix paths ([a64eed6](https://github.com/Alwatr/flux/commit/a64eed663d1193497b33c3a87075cbae7b6a12e6)) by @
* **publish-container:** storage-server version ([91723e0](https://github.com/Alwatr/flux/commit/91723e0ff28c1bc5b544f06255ab6d4761369c51)) by @
* **pwa:** review ([8b85a2d](https://github.com/Alwatr/flux/commit/8b85a2d05fc2e8891aa942840eb1fe08a802ec13)) by @
* **readme:** update github workflow badges ([e6b048e](https://github.com/Alwatr/flux/commit/e6b048e942f73f8f50c1134eb258d1547894b990)) by @
* **release:** v0.1.0 ([1beb8f9](https://github.com/Alwatr/flux/commit/1beb8f9ba782cc640dcbb6a60ea7c7360f612940)) by @
* **release:** v0.1.1 ([c628b8b](https://github.com/Alwatr/flux/commit/c628b8b473a7270a18943fef1b60200e655c904a)) by @
* **release:** v0.1.2 ([ac3f116](https://github.com/Alwatr/flux/commit/ac3f116c7891ee9f0ae8bad553ce8f62c2d483c4)) by @
* rename base tsconfig ([c363a41](https://github.com/Alwatr/flux/commit/c363a41df3f6eceda5c221c6e0120f42177d56c7)) by @
* rename core to packages ([9158c8e](https://github.com/Alwatr/flux/commit/9158c8e4c679d96c9b54e91ea6faa49364d47494)) by @
* seperate config for workbox ([4bd30ef](https://github.com/Alwatr/flux/commit/4bd30ef8eb4307817065163df0ab0a7800de7364)) by @
* **signal:** remove extra incident ([df968da](https://github.com/Alwatr/flux/commit/df968da4d9176f6d0a64502e5e027f157eb400e0)) by @
* **signal:** rename signal2 ([33adbea](https://github.com/Alwatr/flux/commit/33adbeabe9384d5de30742e4c4b00db410596e52)) by @
* some edit .gitignore ([47011c0](https://github.com/Alwatr/flux/commit/47011c08b008514f3225c9c88b1eac36294a650a)) by @
* **storage-client:** add to tsconfig.json refrences ([537f39c](https://github.com/Alwatr/flux/commit/537f39cd4eac51482137c711789395b624869d4f)) by @
* **storage:** rename read and isReady ([cda7d41](https://github.com/Alwatr/flux/commit/cda7d418f525f854c98fff16ab2be0d4fc962cb7)) by @
* **svg-icon:** removed svg-icon package ([36263a2](https://github.com/Alwatr/flux/commit/36263a2680aa875e7c34c4c4374d67dd38dec9fd)) by @
* switch to node_module mode ([29d8ee7](https://github.com/Alwatr/flux/commit/29d8ee702cbeb5eb5ca09d4f52cc7825f9abd4d2)) by @
* **tand:** upgrade ([4d446c7](https://github.com/Alwatr/flux/commit/4d446c717af757435f5c0f3167c2bc42b5ef77ec)) by @
* **token:** benchmark ([6599824](https://github.com/Alwatr/flux/commit/6599824388242e6b62d53505338032ef0a72449f)) by @
* **tsc:** compile to ES2020 ([054919f](https://github.com/Alwatr/flux/commit/054919f29e4e97452ade7656703d59a4dcf6a946)) by @
* **tsconfig:**  fix paths ([3ec2fa2](https://github.com/Alwatr/flux/commit/3ec2fa2ff9e83fa4f211c4c5ca39db6cd1fafaa5)) by @
* **tsconfig:** Add refrences ([480c94d](https://github.com/Alwatr/flux/commit/480c94d5dd617de58f1bc7514eb9f8fbb17bac2c)) by @
* **tsconfig:** add signal refrence ([aa6988f](https://github.com/Alwatr/flux/commit/aa6988f18366efc6b9d48a9edad292db3adf4783)) by @
* **tsconfig:** include paths ([ca879e3](https://github.com/Alwatr/flux/commit/ca879e38088dc74baab4e5d3a846c8402f7a4519)) by @
* **tsconfig:** more strict options ([f89d16c](https://github.com/Alwatr/flux/commit/f89d16c98b6243dbe54c33886ea694e9fc3ab15e)) by @
* **tsconfig:** noImplicitAny ([403927b](https://github.com/Alwatr/flux/commit/403927b32083b658366a54239cff57ebe6d2b80e)) by @
* **tsconfig:** update path ([252453a](https://github.com/Alwatr/flux/commit/252453ab5013d5e0471a945d8f3644835e543ddd)) by @
* **tsconfig:** upgrade ([e71e653](https://github.com/Alwatr/flux/commit/e71e6539f47fa204fa268d2bb9783a10f57c4799)) by @
* **tsconfig:** upgrade configs ([40c7109](https://github.com/Alwatr/flux/commit/40c710989d3aae5da6da096d5441b6fcb7f58772)) by @
* **typescript:** config typescript ([9955dfd](https://github.com/Alwatr/flux/commit/9955dfd19ff1ea14b7b9c8bbfc8d3c49fbd9eeb0)) by @
* **typescript:** update config ([39d9946](https://github.com/Alwatr/flux/commit/39d994637835ded809c8ac804066a5e90ffc9803)) by @
* **typescript:** update typescript config ([11a870c](https://github.com/Alwatr/flux/commit/11a870c0757fa17e1ba92f6fd62676c03de53c9f)) by @
* **typescript:** update typescript config ([747a34d](https://github.com/Alwatr/flux/commit/747a34d06636143c880f9b7584a44d1eafc547a8)) by @
* **typescript:** update typescript config ([196be56](https://github.com/Alwatr/flux/commit/196be56f293e64f34855da0d40dfcb31a91aa19d)) by @
* **typesript:** update typescript config ([a13bc04](https://github.com/Alwatr/flux/commit/a13bc042a10c50df37d7ce3a0411f6c5fe22e967)) by @
* **ui-kit:** remove main file ([1bd9ca2](https://github.com/Alwatr/flux/commit/1bd9ca25b1cea6dfa4649b4d886b2086623c5af8)) by @
* update ([a76fbbb](https://github.com/Alwatr/flux/commit/a76fbbb456e8c6a4e42f68dd9f65b1915b2b24d1)) by @
* Update .vscode/settings.json ([3ac5236](https://github.com/Alwatr/flux/commit/3ac523621630a0ae7627453bd891b9a3b1d4f3b8)) by @AliMD
* update all scripts ([208ff38](https://github.com/Alwatr/flux/commit/208ff3878387b5d09628cf79d95c61974434b105)) by @
* update changelogs ([a965ecd](https://github.com/Alwatr/flux/commit/a965ecd095cb621b4a7748d2e048f4a82b0aa872)) by @
* update gitignore ([cd9ae34](https://github.com/Alwatr/flux/commit/cd9ae34f19497c4f687378a1edffa8ddd495ff7f)) by @
* update yarn lock ([edee6ea](https://github.com/Alwatr/flux/commit/edee6ea23e6891e13c9dca0dc9805b8263edd2ec)) by @
* update yarnlock ([e4536bc](https://github.com/Alwatr/flux/commit/e4536bc0ed666e3143f14268f2ab892a9f3262cc)) by @AliMD
* upgrade yarn to v4 ([4b2cb49](https://github.com/Alwatr/flux/commit/4b2cb491e500a5e8ddd0367c01ee0c4baeee9fa7)) by @
* use @types/web ([0cfeaed](https://github.com/Alwatr/flux/commit/0cfeaed0d586c0a82a7ed74d8312aa2dd795dc3c)) by @
* **vsc:** hidden built files config ([3b56df1](https://github.com/Alwatr/flux/commit/3b56df1191ed33ddba7c147e5105f48a6469f64b)) by @
* **vscode:** add noncallable to cSpell.words ([7da6fc4](https://github.com/Alwatr/flux/commit/7da6fc4a89a79de625f947ac6bc3cfe861494750)) by @
* **vscode:** clean unnecessary extension ([2ae96d7](https://github.com/Alwatr/flux/commit/2ae96d79dfa28746c9099bb2702026fc977b57b6)) by @
* **vscode:** cSpell.words ([2d9cab5](https://github.com/Alwatr/flux/commit/2d9cab54512a46be46cd77a86ef22a78374cfcc6)) by @
* **vscode:** disable lit-plugin.rules.no-missing-import ([a92df81](https://github.com/Alwatr/flux/commit/a92df812bc4be5a0b1f584813cfc4bfd3dea65ad)) by @
* **vscode:** ignoredPullRequestBranches ([e80a588](https://github.com/Alwatr/flux/commit/e80a588112df9764dd49a60370542f08eff369fc)) by @
* **vscode:** prettier.useEditorConfig ([8821082](https://github.com/Alwatr/flux/commit/88210823614626ef9aecf78bd6aa4bedfceade6c)) by @
* **vscode:** recommend extentions and update settings ([ef69657](https://github.com/Alwatr/flux/commit/ef696573e917f3cf0b13136185887c87d1acf8d7)) by @
* **vscode:** setting ([2f82353](https://github.com/Alwatr/flux/commit/2f82353283ecafbe6281bdd99bdf92ee4b4f2e3d)) by @
* **vscode:** show js files ([a2a8b27](https://github.com/Alwatr/flux/commit/a2a8b27f5e318a2257ea615be9ead007a2019f43)) by @
* **vscode:** update recommendations ([97b3136](https://github.com/Alwatr/flux/commit/97b313669769b1d705cd3b1d5936800a50e428b4)) by @
* **workflow/npm:** remove tags event ([51dc0ca](https://github.com/Alwatr/flux/commit/51dc0ca6ce0b70acaafdd6d63d1bf8dc06674186)) by @
* **workflow/publish-container:** add commenting service ([128183b](https://github.com/Alwatr/flux/commit/128183b39945f73c68499fb2ce274b46b67d83bc)) by @
* **workflow/publish-container:** comment description ([d2397e9](https://github.com/Alwatr/flux/commit/d2397e9eae410871781e9871b6dc88c7f8047a04)) by @
* **workflow:** accept release label ([16f4e3f](https://github.com/Alwatr/flux/commit/16f4e3f3bc65eb5c5536a516b8bcd8a9f6330e8d)) by @
* **workflow:** add new image ([995d659](https://github.com/Alwatr/flux/commit/995d659a9ef0c9a943c635d594a3b7f86ef0fa83)) by @
* **workflow:** build & lint name ([8103d3c](https://github.com/Alwatr/flux/commit/8103d3cc627b7e30b5dfa41a861fe1c04ec7a442)) by @
* **workflow:** enable for all pull request ([ba91239](https://github.com/Alwatr/flux/commit/ba91239ed3733f90d90f5dee9b16fd85fd76aee5)) by @
* **workflow:** fix build and publish actions ([369f8b2](https://github.com/Alwatr/flux/commit/369f8b2040f826a0eb1ab0134f92564492a68fdd)) by @
* **workflow:** fix job name ([2300614](https://github.com/Alwatr/flux/commit/230061440b8e2f0dd593441d7be2f29f141de44b)) by @
* **workflow:** improve and test publish npm ci ([3a10a42](https://github.com/Alwatr/flux/commit/3a10a428bec4f510c8a61b36c13c5884649b16ed)) by @
* **workflow:** improve and test publish npm ci ([757b074](https://github.com/Alwatr/flux/commit/757b074ce8dd3b242ecefae06bd08a5560cae68a)) by @
* **workflow:** improve and test publish npm ci ([4f5e49b](https://github.com/Alwatr/flux/commit/4f5e49bdeb60ad254277cd3c5363def77a85461a)) by @
* **workflow:** improve and test publish npm ci ([8ba8d3c](https://github.com/Alwatr/flux/commit/8ba8d3c129ef7d512e12496b03696ff5b0f23b2b)) by @
* **workflow:** improve and test publish npm ci ([29ddc0c](https://github.com/Alwatr/flux/commit/29ddc0ce8415d9168fbcfd0df0adf473f6992bdd)) by @
* **workflow:** improve and test publish npm ci ([76df662](https://github.com/Alwatr/flux/commit/76df662ebcef2af51197169a22bfa5457533c959)) by @
* **workflow:** improve and test publish npm ci ([a81d718](https://github.com/Alwatr/flux/commit/a81d71894d9f249b928e84a37f560697c41e61ee)) by @
* **workflow:** improve and test publish npm ci ([48a9d7f](https://github.com/Alwatr/flux/commit/48a9d7f1e73ef013abc77d00bf7cd57531a08590)) by @
* **workflow:** improve lint ([d79145c](https://github.com/Alwatr/flux/commit/d79145cdc276c4c44ec82f507dccdf5b72502fd9)) by @
* **workflow:** merge build and lint ([0aec841](https://github.com/Alwatr/flux/commit/0aec841a6bcc3e94509f18dbc669927460769b9f)) by @
* **workflow:** publish npm ci ([9e1b366](https://github.com/Alwatr/flux/commit/9e1b3666066894c16a7f5880b106c91265519c0e)) by @
* **workflow:** publish npm final ([4940723](https://github.com/Alwatr/flux/commit/4940723f9d84544a284b1fc27d6165a4628e5f71)) by @
* **workflow:** remove add-to-project on pr and issue ([7332437](https://github.com/Alwatr/flux/commit/73324372dfcbb9bfef31affcbdcff90b35e6a90d)) by @
* **workflow:** remove codeql on pr ([7bbaff5](https://github.com/Alwatr/flux/commit/7bbaff5b107d7a77c85e85068159745df7f457ed)) by @
* **workflows/publish-container:** publish on push tags and merge release branch ([b43d15b](https://github.com/Alwatr/flux/commit/b43d15ba5e9352c1dbcd047038bf24a0aeae606a)) by @
* **workflows:** add publish-container.yml tp change paths! ([558ef45](https://github.com/Alwatr/flux/commit/558ef4578c2c4ba2908cdb08a300adf9b2583abb)) by @
* **workflows:** cache container build ([4fb761c](https://github.com/Alwatr/flux/commit/4fb761c0c341598630402e8825111e0fb4abb44b)) by @
* **workflows:** change lock-closed comment ([a108749](https://github.com/Alwatr/flux/commit/a1087495bfdfc3ec5004e9af2121e4bc2bc3c8ba)) by @
* **workflows:** disable nginx-pwa ([fbc614b](https://github.com/Alwatr/flux/commit/fbc614b2e68d4c9a503f54e310451156fa0d8551)) by @
* **workflows:** enable nginx-pwa ([499203c](https://github.com/Alwatr/flux/commit/499203c911f2598da3f0e8dfb58b35d3363d08f7)) by @
* **workflows:** fail-fast ([b6f5ac8](https://github.com/Alwatr/flux/commit/b6f5ac84052722b76d7822860c35dc5f292b98a6)) by @
* **workflows:** review and improve ([74c9dcd](https://github.com/Alwatr/flux/commit/74c9dcd7fec5f6855e9581c84b9a4ba2167f1f48)) by @
* **workflows:** review and improve ([2eddfa5](https://github.com/Alwatr/flux/commit/2eddfa5204f4e7d842f13b5988d83c89cce2f294)) by @
* **workflows:** steps name ([708ba08](https://github.com/Alwatr/flux/commit/708ba08dbce343fbec57808694b2611b97f10959)) by @AliMD
* **workflows:** update docker builds abd version ([0b1c5f8](https://github.com/Alwatr/flux/commit/0b1c5f8ea1ca14e7d5186f761be73b29e3736c3b)) by @
* **workflows:** update to latest changes ([a44becc](https://github.com/Alwatr/flux/commit/a44beccbeffa633ddf5fcd1edcdc4a0be20434f9)) by @
* yarn ([ed93433](https://github.com/Alwatr/flux/commit/ed93433dbebc6177e83fb5b9baa447aa2f9028cb)) by @
* **yarn:**  clean and upgrade ([38ef3ec](https://github.com/Alwatr/flux/commit/38ef3ecca23bbe884db165fdaf00fe160bf0fe20)) by @
* yarn update packages ([1dfa1ae](https://github.com/Alwatr/flux/commit/1dfa1aef792dc7e79afaea3d62e0975aa7cc59e6)) by @
* **yarn:** pnp mode ([02bd406](https://github.com/Alwatr/flux/commit/02bd4064e381c483e31a8acbe7c72e7aed3e62b3)) by @
* **yarn:** update ([70c5b70](https://github.com/Alwatr/flux/commit/70c5b70a6453bb54c111ecfe6202ac6935b2e208)) by @
* **yarn:** update ([2992baa](https://github.com/Alwatr/flux/commit/2992baaa8b10ec7d992ede32a76040f2713f9cb3)) by @
* **yarn:** update ([dd6021a](https://github.com/Alwatr/flux/commit/dd6021a4508beb61cf8abdd7214bb7d1ae6bf97b)) by @
* **yarn:** update ([6e4a9f3](https://github.com/Alwatr/flux/commit/6e4a9f3df4fca938529c4c8ab50ad6b66ea2f6c8)) by @
* **yarn:** update ([681cf74](https://github.com/Alwatr/flux/commit/681cf7496d53fe2acecd0209b886274a0b3485cd)) by @
* **yarn:** update sdks ([fdeb33b](https://github.com/Alwatr/flux/commit/fdeb33bf8fabbcfc9d50934fbc6e96fe59d5bf3e)) by @
* **yarn:** upgrade ([01a6a51](https://github.com/Alwatr/flux/commit/01a6a51332301cc4984611798e6d6190156eee62)) by @
* **yarn:** upgrade ([f46eb45](https://github.com/Alwatr/flux/commit/f46eb459289757ff4ca14ab394754f1d0f3accc0)) by @
* **yarn:** upgrade ([35f7542](https://github.com/Alwatr/flux/commit/35f75423c49c53ec278f09431f5ce7dfe036b2f8)) by @
* **yarn:** upgrade ([88d4ff8](https://github.com/Alwatr/flux/commit/88d4ff87d3457162177fb41a1c4b361130283bf2)) by @
* **yarn:** upgrade ([9b16034](https://github.com/Alwatr/flux/commit/9b16034c7ecc74d9124643cbccac73032c68f130)) by @
* **yarn:** upgrade ([33e139e](https://github.com/Alwatr/flux/commit/33e139e6028b03749be835dd712ca7c431ea71c0)) by @
* **yarn:** upgrade ([8fde7cd](https://github.com/Alwatr/flux/commit/8fde7cd4a8652d8dc4284dc28ff62f7dd7396250)) by @
* **yarn:** upgrade ([404dc44](https://github.com/Alwatr/flux/commit/404dc440e81dea76f061bc7305028ddb4671b02a)) by @
* **yarn:** upgrade ([c032a2f](https://github.com/Alwatr/flux/commit/c032a2fbc6b55f1ea23e40d1420b929819cfb3d1)) by @
* **yarn:** upgrade ([f7bcdfe](https://github.com/Alwatr/flux/commit/f7bcdfe966c26613db2d75e3ab34c5771adfcdf4)) by @
* **yarn:** upgrade ([d83eaa5](https://github.com/Alwatr/flux/commit/d83eaa5ce4f18feb65a177f132aab25d4c62f430)) by @
* **yarn:** upgrade ([8381eee](https://github.com/Alwatr/flux/commit/8381eee1e3098ad0a5003493854e0b38ea72a11b)) by @
* **yarn:** upgrade ([1124075](https://github.com/Alwatr/flux/commit/1124075e3f4ec5518f199c30cd41447894fe6042)) by @
* **yarn:** upgrade ([3021ff8](https://github.com/Alwatr/flux/commit/3021ff8d544ace7fcc58b560d5a9d7e8fc4ecb0f)) by @
* **yarn:** upgrade ([66cbb33](https://github.com/Alwatr/flux/commit/66cbb33a9a0026679f5f9876097efb214c8d3d46)) by @
* **yarn:** upgrade ([50fcd91](https://github.com/Alwatr/flux/commit/50fcd91435f811f716b840878359ec4e06d2d053)) by @
* **yarn:** upgrade ([748e279](https://github.com/Alwatr/flux/commit/748e2795407ae4a53865924bb5a9ca2ff06f8fdd)) by @
* **yarn:** upgrade ([2385adb](https://github.com/Alwatr/flux/commit/2385adbc9115904b8f9e4db77c5f7322435adc4c)) by @
* **yarn:** upgrade all ([2d935fa](https://github.com/Alwatr/flux/commit/2d935fa364483e6f353417a7c4e6925e7dc0936b)) by @

### Dependencies update

* bump github/codeql-action ([7aab51e](https://github.com/Alwatr/flux/commit/7aab51eb9cd1d02f2145bb6caa801b859e6a95cf)) by @dependabot[bot]
* bump the alwatr-dependencies group with 6 updates ([4470fd8](https://github.com/Alwatr/flux/commit/4470fd8be49e1a73c17bdd5a09127b9f3a67b3bb)) by @dependabot[bot]
* **keep-pwa:** update alwatr package ([32ff4d1](https://github.com/Alwatr/flux/commit/32ff4d1e9ad4499509604997c930f144b4414b2e)) by @
* up ([c1d2c22](https://github.com/Alwatr/flux/commit/c1d2c229984dc71136498dab4682da5da233fe28)) by @
* update ([967d0ef](https://github.com/Alwatr/flux/commit/967d0ef50087ab8570f7340a7ec9024384d5839d)) by @AliMD
* update ([0128365](https://github.com/Alwatr/flux/commit/01283652b0798243aaac9643c5024e7856af169c)) by @AliMD
* update ([e8f8281](https://github.com/Alwatr/flux/commit/e8f8281beb24988466c6e29f724a963118870933)) by @AliMD
* update add-to-project ([4a8bdee](https://github.com/Alwatr/flux/commit/4a8bdee6d8c695180d98c4ad62aa01203f00988b)) by @
* update alwatr ([a68c670](https://github.com/Alwatr/flux/commit/a68c670c0d2ee5655dbf2f7e347d20033d0a110b)) by @
