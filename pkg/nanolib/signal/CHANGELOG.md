# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.35.0](https://github.com/Alwatr/alwatr/compare/v9.34.0...v9.35.0) (2026-06-11)

### 🔨 Code Refactoring

* conditionally log accidents in DEV_MODE for better debugging ([c225def](https://github.com/Alwatr/alwatr/commit/c225defd90630a89c58956efecf78df3b294f6ca))

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

### 🐛 Bug Fixes

* standardize formatting and improve descriptions across multiple packages ([24f22e4](https://github.com/Alwatr/alwatr/commit/24f22e451cf3a1edb891943ef179cc18192079bf))

### 🔨 Code Refactoring

* conditionally log method arguments and events in DEV_MODE to reduce production build size ([b3842e0](https://github.com/Alwatr/alwatr/commit/b3842e09d56973b3a04e739fe8314050cd1975c4))

## [9.33.0](https://github.com/Alwatr/alwatr/compare/v9.32.0...v9.33.0) (2026-06-10)

**Note:** Version bump only for package @alwatr/signal

## [9.32.0](https://github.com/Alwatr/alwatr/compare/v9.31.0...v9.32.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/signal

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/signal

## [9.30.0](https://github.com/Alwatr/alwatr/compare/v9.29.0...v9.30.0) (2026-06-02)

**Note:** Version bump only for package @alwatr/signal

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

### ✨ Features

* **debounce:** refactor createDebouncedSignal to use createDerivedSignal for improved functionality ([d1716d9](https://github.com/Alwatr/alwatr/commit/d1716d9df7d8f168f8c75c29f3afbfba7dd68b97))
* **derived-signal:** add createDerivedSignal utility function for read-only signal mapping ([f6b2825](https://github.com/Alwatr/alwatr/commit/f6b2825c807508dbdf7da5b04b8145fe4d612e65))
* **derived-signal:** enhance DerivedSignal with configuration-based constructor and improved destruction handling ([c35a849](https://github.com/Alwatr/alwatr/commit/c35a849c1289387cbcaab8968f62b00bbdba24dd))
* **derived-signal:** implement DerivedSignal class for efficient read-only signal mapping ([fb79c4f](https://github.com/Alwatr/alwatr/commit/fb79c4f81068ff3ff21d294e4c56c46ed1887820))
* **filter:** refactor createFilteredSignal to use createDerivedSignal for improved functionality ([320bec0](https://github.com/Alwatr/alwatr/commit/320bec0c74687359265e5fa38b69bda4c30fdf8a))
* **signal:** add derived signal exports to main module for improved accessibility ([a3fb4ea](https://github.com/Alwatr/alwatr/commit/a3fb4eaceb3683781720ed5e09ff784fddc5774f))
* **signal:** add DerivedSignalConfig interface for derived signal configuration ([ac488c3](https://github.com/Alwatr/alwatr/commit/ac488c3e4ed366f6351b9da9b40a3d15b6bb7cb9))

### 🐛 Bug Fixes

* **computed-signal:** correct terminology from "macrotask" to "microtask" in recalculation comment ([ea45940](https://github.com/Alwatr/alwatr/commit/ea4594022dae8e64d890c0b7fd61508f8441911b))
* **debounce, filter:** remove internal signal destruction on unsubscribe ([4ff1d1a](https://github.com/Alwatr/alwatr/commit/4ff1d1aaede8dbd3d3fbafe707b6490464efbd73))
* **debounce:** update naming convention for debounced signal and improve test coverage ([15ce3ae](https://github.com/Alwatr/alwatr/commit/15ce3ae4f85a955f4d2421aff9930f8176a49136))
* **derived-signal:** add logging for method calls and state checks ([852d46a](https://github.com/Alwatr/alwatr/commit/852d46a6ccecfda27979cd0eb2804373411b2adb))
* **derived-signal:** ensure internal signal is destroyed when no active consumers ([09f4953](https://github.com/Alwatr/alwatr/commit/09f49530f4fc94a91fe1abe54c9fbe0557e500e9))
* **derived-signal:** implement untilNext method to resolve on next value ([4bfc5e1](https://github.com/Alwatr/alwatr/commit/4bfc5e1c90ecd4ed7d4733bff3d96fc7905f71fe))
* **filter:** update createFilteredSignal to use underscore in name and improve cleanup on destroy ([a5db64c](https://github.com/Alwatr/alwatr/commit/a5db64cec614e6d7cfe231fa569564ba3a35bd4d))
* **signal:** clean up empty observer sets on unsubscribe ([efe98ce](https://github.com/Alwatr/alwatr/commit/efe98ced9bb57cc0cb79a917cb927921993211e2))
* **signal:** update naming convention for filtered and debounced signals ([550ea81](https://github.com/Alwatr/alwatr/commit/550ea812c49e07b8bc617246f22dbdaca1ff4d3c))

### 🔨 Code Refactoring

* **ChannelSignal:** move DispatchArgs, ChannelMessage, and ChannelHandler types to type.ts for better organization ([ebfc75e](https://github.com/Alwatr/alwatr/commit/ebfc75e124e510a3394354528ca85a80e5abd077))
* **computed-signal:** optimize recalculation logic and improve subscription handling ([637f8cc](https://github.com/Alwatr/alwatr/commit/637f8cce78b14f4da0c8cf8fec9326740d5e601d))
* **mapped-signal:** remove createMappedSignal implementation and tests ([d404487](https://github.com/Alwatr/alwatr/commit/d404487117e5e695e909afa523f545de7dbf8bc7))
* **signal:** change observers to lazy allocation and update deletion logic ([e05a32d](https://github.com/Alwatr/alwatr/commit/e05a32d3fc2115533f3af712a17e58bd45c2ae13))
* **signal:** refactor createDebouncedSignal to simplify implementation and improve parameter naming ([d89a7c4](https://github.com/Alwatr/alwatr/commit/d89a7c447242e6103a2b832d34a4d1eb13e34b28))
* **signal:** remove unused map operator export from main.ts ([9dd55b4](https://github.com/Alwatr/alwatr/commit/9dd55b45a4c1138fb8e0fb2e0c43187099c8a852))
* **signal:** replace delay with queueMicrotask for improved scheduling and logging consistency ([7f55de0](https://github.com/Alwatr/alwatr/commit/7f55de0a4bb560b2bc0c5844b026f45f714b5815))
* **types:** update ListenerCallback and EffectSignalConfig to remove Awaitable type ([1c28664](https://github.com/Alwatr/alwatr/commit/1c28664e3f5618369608cbbd43c35dbfe233dfcf))

## [9.26.0](https://github.com/Alwatr/alwatr/compare/v9.25.0...v9.26.0) (2026-05-23)

### 🐛 Bug Fixes

* **session-state-signal:** correct logger method name in windowPageShowListener ([5862331](https://github.com/Alwatr/alwatr/commit/58623315d44a032726dac135f08a2bfd99c312e6))
* **signal:** increase default save debounce delay to 3000ms for Persistent and Session State Signals ([6321f4f](https://github.com/Alwatr/alwatr/commit/6321f4fc445c781d2fea33d0ff031476c0d08bcb))
* **signal:** update default debounce delay to 1000ms for PersistentStateSignal and SessionStateSignal ([4b6bf48](https://github.com/Alwatr/alwatr/commit/4b6bf487101f76ac27b1238c092c5a98f0a03b83))

### 🔨 Code Refactoring

* **session-state-signal:** remove redundant comment about debounce delay ([756ad69](https://github.com/Alwatr/alwatr/commit/756ad69fa3d1223e1582bd7d5579348f6dbc24ad))

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

**Note:** Version bump only for package @alwatr/signal

## [9.24.0](https://github.com/Alwatr/alwatr/compare/v9.23.4...v9.24.0) (2026-05-14)

### ✨ Features

* add pagehide and pageshow event listeners to sync storage in PersistentStateSignal and SessionStateSignal ([e847ba8](https://github.com/Alwatr/alwatr/commit/e847ba86b322b851a9c61b3604ab547a183ece1c))
* add PersistentStateSignal and SessionStateSignal with custom parse and stringify options ([eb5621c](https://github.com/Alwatr/alwatr/commit/eb5621c440d684775392459ea4d699dbce40d00d))
* extend PersistentStateSignal and SessionStateSignal to support custom parse and stringify functions ([8a18a40](https://github.com/Alwatr/alwatr/commit/8a18a408789b62901fac289dbb34eeedb737e4f6))

## [9.23.3](https://github.com/Alwatr/alwatr/compare/v9.23.2...v9.23.3) (2026-05-12)

### 🔨 Code Refactoring

* improve type definitions for EventSignal and IReadonlySignal interfaces ([7b83abc](https://github.com/Alwatr/alwatr/commit/7b83abc2a0d91c457d4ed0efc87eb0cb007be386))
* replace ISignal with IBaseSignal in EventSignal and IReadonlySignal for consistency ([2425fce](https://github.com/Alwatr/alwatr/commit/2425fce32965349daa947c2ea0c694f2f1332b78))

## [9.23.2](https://github.com/Alwatr/alwatr/compare/v9.23.1...v9.23.2) (2026-05-07)

### 🐛 Bug Fixes

* Denoising StateSignal subscription with version tracking to prevent stale immediate callbacks ([2d3145c](https://github.com/Alwatr/alwatr/commit/2d3145c72e83936fe942fb406ce4ba5eb5cec86f))
* remove redundant check for pending notifications in StateSignal subscription ([3af24d1](https://github.com/Alwatr/alwatr/commit/3af24d1e93b789975c72112fba7d343e37d35f3c))

## [9.23.1](https://github.com/Alwatr/alwatr/compare/v9.23.0...v9.23.1) (2026-05-06)

### 🐛 Bug Fixes

* **signal:** notification handling and subscription behavior in StateSignal ([5025ef8](https://github.com/Alwatr/alwatr/commit/5025ef813a1dbd9eda2ef732a9423f28b2fc54cf))

## [9.20.1](https://github.com/Alwatr/alwatr/compare/v9.20.0...v9.20.1) (2026-04-30)

**Note:** Version bump only for package @alwatr/signal

## [9.20.0](https://github.com/Alwatr/alwatr/compare/v9.19.1...v9.20.0) (2026-04-30)

**Note:** Version bump only for package @alwatr/signal

## [9.16.0](https://github.com/Alwatr/alwatr/compare/v9.15.0...v9.16.0) (2026-04-27)

**Note:** Version bump only for package @alwatr/signal

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* add type imports from @alwatr/type-helper across multiple packages ([9e44c20](https://github.com/Alwatr/alwatr/commit/9e44c20b724b91452848e4ca4344f16133573bcb))
* **channel-signal:** enhance type safety and clarity in DispatchArgs and ChannelMessage ([d2388aa](https://github.com/Alwatr/alwatr/commit/d2388aa19619fe33a8c883b88f1345cae9474d85))
* **signal:** simplify createChannelSignal type definition ([7956977](https://github.com/Alwatr/alwatr/commit/79569776d67a51ddddd3afb9fab48c6f4d7a6055))
* **tsconfig:** remove @alwatr/type-helper from types array across multiple packages ([09a2177](https://github.com/Alwatr/alwatr/commit/09a2177c0c22631287e896543a4052201d912224))

## [9.13.0](https://github.com/Alwatr/alwatr/compare/v9.12.0...v9.13.0) (2026-04-24)

**Note:** Version bump only for package @alwatr/signal

## [9.12.0](https://github.com/Alwatr/alwatr/compare/v9.11.2...v9.12.0) (2026-04-23)

### ✨ Features

* **signal:** add ChannelSignal for named message routing ([f017d94](https://github.com/Alwatr/alwatr/commit/f017d949e5cb3902e38aaa327682be5c7d6c9eea))

### 🐛 Bug Fixes

* **signal:** add early return guard in route__ method when signal is destroyed ([8fc7b86](https://github.com/Alwatr/alwatr/commit/8fc7b86f911b94b8d376ed4456968d64f640f179))
* **signal:** reject pending promises when signal is destroyed ([c584924](https://github.com/Alwatr/alwatr/commit/c584924d994052295e2615a97723b05a9b511a94))
* **signal:** reject pending promises with error on destroy ([a98454b](https://github.com/Alwatr/alwatr/commit/a98454bf38a3ab2ae6c3bf14bebf82d54fb2b023))
* **signal:** remove unnecessary comment in named handler iteration ([b1d07ab](https://github.com/Alwatr/alwatr/commit/b1d07abef327d5ca3928ab84c708832715d1781c))
* **signal:** remove unnecessary logger nullification in destroy ([6a29735](https://github.com/Alwatr/alwatr/commit/6a297353b72f762d45693f96355730196c271cbb))

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/signal

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

**Note:** Version bump only for package @alwatr/signal

## [9.9.0](https://github.com/Alwatr/alwatr/compare/v9.8.0...v9.9.0) (2026-04-14)

### ✨ Features

* **core:** add signal and on package to `@alwatr/core` ([0dfb995](https://github.com/Alwatr/alwatr/commit/0dfb9951c30d012de1862d897eda7c3b4e10a630))

## [9.7.0](https://github.com/Alwatr/alwatr/compare/v9.6.1...v9.7.0) (2026-04-14)

**Note:** Version bump only for package @alwatr/signal

## [9.5.0](https://github.com/Alwatr/alwatr/compare/v9.4.5...v9.5.0) (2026-04-11)

### ✨ Features

* add notifyChange method to notify listeners of current value ([08a5e61](https://github.com/Alwatr/alwatr/commit/08a5e6146a7f599acb219c6fbb8a8fdef1c0f6e4))

### 🔨 Code Refactoring

* format code for consistency and improve logging in StateSignal class ([166e8a6](https://github.com/Alwatr/alwatr/commit/166e8a64f763dac00bf8c7a74f1b1a8b73e05232))

## [9.4.5](https://github.com/Alwatr/alwatr/compare/v9.4.4...v9.4.5) (2026-04-11)

### 🔨 Code Refactoring

* simplify generic constraints and remove extend jsonValue from types ([f02aeb3](https://github.com/Alwatr/alwatr/commit/f02aeb364abdede199c4eb5e7e73eb51945b8f22))

## [9.4.0](https://github.com/Alwatr/alwatr/compare/v9.3.0...v9.4.0) (2026-04-05)

### 🔨 Code Refactoring

* **signal:** replace arrays with Sets for observer management in SignalBase class ([185133c](https://github.com/Alwatr/alwatr/commit/185133c54c5a71fdfd0b5b43bf4edc37df289311))

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### 🔨 Code Refactoring

* update TypeScript configuration to extend from @alwatr/standard/tsconfig ([3e52ee2](https://github.com/Alwatr/alwatr/commit/3e52ee2152b4264ed994ec72610be5828fbdc6d2))

## [9.2.1](https://github.com/Alwatr/alwatr/compare/v9.2.0...v9.2.1) (2026-04-04)

**Note:** Version bump only for package @alwatr/signal

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### 🐛 Bug Fixes

* **build:** change yarn to bun and change & to && ([b985835](https://github.com/Alwatr/alwatr/commit/b985835ec381b5db52a2116c2a63916e377706e6))

### 🔨 Code Refactoring

* class field define ([13614cc](https://github.com/Alwatr/alwatr/commit/13614cc0a1ebe8e71680937d5840e24dfb613bad))
* remove emitDeclarationOnly from tsconfig.json files ([98c8910](https://github.com/Alwatr/alwatr/commit/98c891005bf2bc2c3b37c3a635346e917aeeedb3))
* rename clean script alias from 'c' to 'cl' across all package.json files ([e041589](https://github.com/Alwatr/alwatr/commit/e0415899ec6f509fcceaa2fb732c110ead848293))
* reorganize fields in package.json files across multiple packages ([6a0e28f](https://github.com/Alwatr/alwatr/commit/6a0e28f6f43dc816232d6c4f7f4fe2d68993dd29))
* reorganize fields in package.json files across multiple packages ([280e7b1](https://github.com/Alwatr/alwatr/commit/280e7b16414e1eb349c0af3cfc5f4f8f2e0b5288))
* update tsconfig.json to extend from @alwatr/tsconfig-base directly ([1fb76b0](https://github.com/Alwatr/alwatr/commit/1fb76b0e8a56ec5582b43aee4b6cd1850c5f936d))

### 🧹 Miscellaneous Chores

* add "import" field to package exports for consistency ([eb2a680](https://github.com/Alwatr/alwatr/commit/eb2a6805d731ae44ba0666891cacd88088a30abe))
* fix all deps ([86c7c48](https://github.com/Alwatr/alwatr/commit/86c7c48c04ad3225be5012e934443aac28a335d3))
* format package.json of all packages ([16bd4c9](https://github.com/Alwatr/alwatr/commit/16bd4c91c8e0cce78f8def0bb0c0b5cdb779a3d2))
* rename all pageckage inside pkg ([4f78342](https://github.com/Alwatr/alwatr/commit/4f78342f84cf6896578df7362caadd976a92f74d))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json exports to ESM-only ([2deab42](https://github.com/Alwatr/alwatr/commit/2deab422f3285146a1111e97462487e1cc10b214))
* standardize package.json scripts across monorepo ([f7af78d](https://github.com/Alwatr/alwatr/commit/f7af78d043dc8129c1d22d1c111b9c9d8bcc64b1))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))
* update package.json exports to use default entry points with .js extension ([b151afc](https://github.com/Alwatr/alwatr/commit/b151afca85c89399a6a1731da91bb8c13b7aca86))

## [6.2.0](https://github.com/Alwatr/flux/compare/v6.1.1...v6.2.0) (2026-02-18)

### ✨ Features

* add session-state exports to main module for sessionStorage management ([99bc3fd](https://github.com/Alwatr/flux/commit/99bc3fd9b559b6c359a4533eb4af0ec61e5deee0))
* add SessionStateSignal for sessionStorage management ([f62cb97](https://github.com/Alwatr/flux/commit/f62cb976bc5e5cfc8a0a48579c6dbebcacce10f4))
* add SessionStateSignalConfig interface for sessionStorage management ([ee59398](https://github.com/Alwatr/flux/commit/ee593981fe6e6d20499f7e1992aed3ea42ffa64d))
* implement createSessionStateSignal for sessionStorage management ([05d70f5](https://github.com/Alwatr/flux/commit/05d70f5f0e79f410a1b8439566cd6588807cc462))

### 🐛 Bug Fixes

* update default saveDebounceDelay to 500ms in SessionStateSignalConfig ([a19f9db](https://github.com/Alwatr/flux/commit/a19f9db003033448683d44a1678d6a6272fe5696))

### 🔨 Code Refactoring

* migrate to bun package manager ([545c1ae](https://github.com/Alwatr/flux/commit/545c1ae31f04ece1ef1abd4db7237b47b65b0473))

### 🔗 Dependencies update

* add @alwatr/session-storage dependency and update all deps ([4e8a3f6](https://github.com/Alwatr/flux/commit/4e8a3f60af461a02197945149728c2dcf845df7d))
* update dependencies across packages to latest versions ([6ac0147](https://github.com/Alwatr/flux/commit/6ac01476b0803d662035d4c291bb5c77ae4207f6))

## [6.1.1](https://github.com/Alwatr/flux/compare/v6.1.0...v6.1.1) (2025-11-12)

### 🔨 Code Refactoring

* simplify storageProvider initialization in PersistentStateSignal constructor ([e3ca306](https://github.com/Alwatr/flux/commit/e3ca3068df1396c7a06396f9b362523d14695c89))
* streamline PersistentStateSignal constructor and update config properties ([849f945](https://github.com/Alwatr/flux/commit/849f945cbbad6301eedee2806d10f24286494045))

### 🔗 Dependencies update

* update dependencies and devDependencies versions across packages ([ab923fa](https://github.com/Alwatr/flux/commit/ab923fa8ec7f504a3ce59e0ec944d05d361f60be))

## [6.1.0](https://github.com/Alwatr/flux/compare/v6.0.2...v6.1.0) (2025-09-22)

### ✨ Features

* add createPersistentStateSignal function for localStorage state management ([05c99bd](https://github.com/Alwatr/flux/commit/05c99bdef47fd285f0c1dc1017c511f411d0405b))
* add PersistentStateSignalConfig for local storage integration ([5dc1dfb](https://github.com/Alwatr/flux/commit/5dc1dfbc961d3820c2d765dedcb9d29909bbeab4))
* add saveDebounceDelay option to PersistentStateSignalConfig for optimized localStorage writes ([ebc542e](https://github.com/Alwatr/flux/commit/ebc542e496cfcdfe06d74abeb08a4e1c4f4ec8b6))
* implement debouncing for localStorage writes in PersistentStateSignal ([9644b37](https://github.com/Alwatr/flux/commit/9644b37f6d2c8b2b0cd8a27b0b4ce0ad4afa86a3))
* implement PersistentStateSignal for localStorage persistence ([0303a74](https://github.com/Alwatr/flux/commit/0303a744408d5e7188daf811bc3109c9c22fd156))

### 🐛 Bug Fixes

* enhance set method in PersistentStateSignal to support data type conversion ([3970fc1](https://github.com/Alwatr/flux/commit/3970fc17d90d72f124114b29b879b423934101a9))
* refine generic type constraint in PersistentStateSignalConfig to extend JsonValue ([d50a1fb](https://github.com/Alwatr/flux/commit/d50a1fb880d0816ccda13eaea1ddfa9b13e89f6d))
* refine generic type handling in PersistentStateSignal and syncStorage method ([30c50a8](https://github.com/Alwatr/flux/commit/30c50a8d3e24b742529aa3def0bfe0fde6561e4a))
* remove unnecessary comments from EffectSignalConfig and DebounceSignalConfig interfaces ([397692c](https://github.com/Alwatr/flux/commit/397692c361b8f0faa6443379c1bdefba74fb88a3))
* remove unnecessary constraint on generic type T in PersistentStateSignal ([83aab63](https://github.com/Alwatr/flux/commit/83aab637f4e7a9c976769b0bf64f89371da0b83a))
* update exports to include persistent state signal and related creators/operators ([2eb94fa](https://github.com/Alwatr/flux/commit/2eb94fa8683ee0d74b609b36415de3e039b364a5))
* update PersistentStateSignal to serialize values correctly and improve logging ([65947d4](https://github.com/Alwatr/flux/commit/65947d4a2b0c28b43fa3b0d15ea63e08d23d91c7))
* update StateSignal constructor to properly pass config parameters ([f1b4cf0](https://github.com/Alwatr/flux/commit/f1b4cf02103f97295eb7f76155012c27b9773a8a))
* update storageDebouncer to be readonly and adjust syncStorage method signature ([575b127](https://github.com/Alwatr/flux/commit/575b127e6367461cd3d6928ff73e395ed23bf459))
* update storageKey handling in PersistentStateSignal and createFsmService for improved state management ([42e764f](https://github.com/Alwatr/flux/commit/42e764f58a2f804c6082a46bfb96eb678a49c22a))

### 🔗 Dependencies update

* add @alwatr/local-storage as a dependency ([47b60fa](https://github.com/Alwatr/flux/commit/47b60fa3844fc49ccb85bc612e102c801a47ef1b))
* update @alwatr/local-storage to version 6.3.0 ([1b10f57](https://github.com/Alwatr/flux/commit/1b10f578d8c817da8472f18a8c9d8e7520a0a7f4))
* update dependencies to latest versions across packages ([97bd715](https://github.com/Alwatr/flux/commit/97bd71555912053f8b2ba6ad0578b74bf7f1c1d3))
* update package dependencies for @alwatr/yarn-upgrade, @alwatr/logger, and other packages ([96b56e7](https://github.com/Alwatr/flux/commit/96b56e75360411bed73ce84acb870db6153f8917))

## [6.0.2](https://github.com/Alwatr/flux/compare/v6.0.1...v6.0.2) (2025-09-21)

### 🔗 Dependencies update

* update dependencies for @alwatr/nano-build, @alwatr/logger, @alwatr/debounce, and @alwatr/delay ([e7cfed5](https://github.com/Alwatr/flux/commit/e7cfed56bd6a7e7cd402e6f38c415de5737f5b24))

## [6.0.1](https://github.com/Alwatr/flux/compare/v6.0.0...v6.0.1) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json for fsm and signal packages ([37d175c](https://github.com/Alwatr/flux/commit/37d175c2cd16144449dfa72e7504a4d179f1cb01))

### 🔨 Code Refactoring

* remove public access modifier from constructors in signal classes ([afb42da](https://github.com/Alwatr/flux/commit/afb42da7fd812cd09555c43ac9489ef15efce96a))

### 🔗 Dependencies update

* update alwatr dependencies ([19bd8a5](https://github.com/Alwatr/flux/commit/19bd8a597a4e74b620e04a497eff7247a03bf8b8))

## [6.0.0](https://github.com/Alwatr/flux/compare/v5.2.2...v6.0.0) (2025-09-19)

### ✨ Features

* add asReadonly method to StateSignal for improved interface exposure ([e8be13a](https://github.com/Alwatr/flux/commit/e8be13aa1b49c0e67b8022b0bef02fb80e5499f4))

### 🐛 Bug Fixes

* remove space in logger initialization for signal classes ([6e3b071](https://github.com/Alwatr/flux/commit/6e3b0710b67f67849c4dce390e9bfa7b2f80a9f7))

### 🔨 Code Refactoring

* enhance logging during EffectSignal construction for dependency subscriptions ([062da7e](https://github.com/Alwatr/flux/commit/062da7e5a91070576579731ac21870ffcafa7033))
* enhance logging in update method to track value changes ([5b0bb00](https://github.com/Alwatr/flux/commit/5b0bb000a7aeb37ab90405f34959b230ca575232))
* replace signalId with name in signal implementation ([0c2f065](https://github.com/Alwatr/flux/commit/0c2f065bb0afa49980537e42773cbbf21013a2a3))
* update internal signal name format and enhance logging during dependency subscription ([1670726](https://github.com/Alwatr/flux/commit/1670726059b77b058b9daa3841bb7bb1ded61af3))

### 🔗 Dependencies update

* update @alwatr/logger to version 6.0.2 and @types/node to version 22.18.6; upgrade esbuild and other dependencies ([95dfaba](https://github.com/Alwatr/flux/commit/95dfabab2a4d4ea2b0e42a70bee1f3e68a67bffc))
* update dependencies for logger, nano-build, type-helper, and node types ([23fe723](https://github.com/Alwatr/flux/commit/23fe7236ffa0bfd2551a6dfc52c23689ce4b036e))
* update package dependencies for improved compatibility and performance ([1e91063](https://github.com/Alwatr/flux/commit/1e9106343d01330089c33d9591969a66625a1e7b))

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

* Add comprehensive documentation to the repository ([d5569e6](https://github.com/Alwatr/flux/commit/d5569e63acd0aa926c34d9a61b2fff5139b9d3cc))
* Update EffectSignalConfig to allow optional signalId and add documentation ([6aab97e](https://github.com/Alwatr/flux/commit/6aab97e6e223f822f66cacb78c9d194fa5e2df9d))

### 🐛 Bug Fixes

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
* remove reference to @alwatr/observable from package.json and tsconfig.json ([30ead90](https://github.com/Alwatr/flux/commit/30ead9083f19cda76873ed227c76476926175eca))
* update @alwatr/nanolib dependency to version 6.0.2 ([134d3e7](https://github.com/Alwatr/flux/commit/134d3e7878c7a22d5f7994c671b5dceabfd29b57))

### 🔗 Dependencies update

* update dependencies and devDependencies in package.json ([d2cf47c](https://github.com/Alwatr/flux/commit/d2cf47c26b65f41eb8de0873fe7065d0a42aaecf))
* update workspace dependency versions for consistency ([b004468](https://github.com/Alwatr/flux/commit/b0044682805a6f5842214755de109034ec4d0405))

## [4.1.1](https://github.com/Alwatr/flux/compare/v4.1.0...v4.1.1) (2025-09-08)

### 🔗 Dependencies update

* update @alwatr/nanolib to version 6.0.2 across multiple packages ([2d18fb0](https://github.com/Alwatr/flux/commit/2d18fb0e7311321200b1ed37381308b1dacae4b2))

## [4.1.0](https://github.com/Alwatr/flux/compare/v4.0.5...v4.1.0) (2025-09-08)

### 🧹 Miscellaneous Chores

* remove Exir Studio sponsorship logo from README files ([df5d19c](https://github.com/Alwatr/flux/commit/df5d19cf9ff3ea723905b3f3bd4f874c42fdcdfc))
* remove unused types from tsconfig.json files across multiple packages ([eecabea](https://github.com/Alwatr/flux/commit/eecabea18710ff476011f7b439e9f838198e2fdf))
* update @alwatr/nanolib and devDependencies to latest versions ([9c28454](https://github.com/Alwatr/flux/commit/9c28454e2eeb5a3c96784a8ca8ab5f591b606468))
* update license to MPL-2.0 ([82d20c8](https://github.com/Alwatr/flux/commit/82d20c88ad1b4ff5909ef0ca6b36b2db8f378279))
* update package.json files across multiple packages to enhance structure and dependencies ([9df0690](https://github.com/Alwatr/flux/commit/9df0690b0b1ae036293be75da429842f67f8685f))

## [4.0.5](https://github.com/Alwatr/flux/compare/v4.0.4...v4.0.5) (2025-03-13)

### Bug Fixes

* bump @alwatr/nanolib to version 5.5.1 across multiple packages for iOS issues ([70d879e](https://github.com/Alwatr/flux/commit/70d879e379a560fbcbe41f7176a638942ee22152)) by @

### Dependencies update

* update @types/node to version 22.13.10 and bump [@lerna-lite](https://github.com/lerna-lite) packages to version 3.12.3 ([e918359](https://github.com/Alwatr/flux/commit/e918359ec013c32b3224aebf04f92553be31b395)) by @

## [4.0.4](https://github.com/Alwatr/flux/compare/v4.0.3...v4.0.4) (2025-03-06)

### Dependencies update

* bump @alwatr/nanolib, @alwatr/nano-build, and @alwatr/type-helper to version 5.5.0 across multiple packages ([db73076](https://github.com/Alwatr/flux/commit/db7307671b0f14cb19072656bd6021144b27dadb)) by @
* **deps-dev:** bump the dependencies group across 1 directory with 6 updates ([5978202](https://github.com/Alwatr/flux/commit/5978202acbdc6b2e3db6d315dc3c114daa4f0289)) by @dependabot[bot]

## [4.0.3](https://github.com/Alwatr/flux/compare/v4.0.2...v4.0.3) (2025-02-18)

### Dependencies update

* **deps-dev:** bump the dependencies group across 1 directory with 11 updates ([18e3479](https://github.com/Alwatr/flux/commit/18e34795f826270a407d77440b946f8101513ba9)) by @dependabot[bot]
* **deps-dev:** bump the dependencies group with 10 updates ([b70907b](https://github.com/Alwatr/flux/commit/b70907bcb78b664c80e7d7acec9acf04c805cb2f)) by @dependabot[bot]
* **deps:** bump @alwatr/nanolib in the alwatr group across 1 directory ([2f52985](https://github.com/Alwatr/flux/commit/2f52985a74d4c5719dcb5d8d0440e3c2fac9be72)) by @dependabot[bot]
* **deps:** bump the alwatr group with 4 updates ([7e1b5fd](https://github.com/Alwatr/flux/commit/7e1b5fdde606bd76a443356c74f332015beed275)) by @dependabot[bot]

## [4.0.0](https://github.com/Alwatr/flux/compare/v3.2.2...v4.0.0) (2024-11-06)

### Dependencies update

* update ([a0c4014](https://github.com/Alwatr/flux/commit/a0c40144c50ba69083864bd4403b7c0dab388a2f)) by @AliMD

## [3.2.2](https://github.com/Alwatr/flux/compare/v3.2.1...v3.2.2) (2024-11-02)

### Dependencies update

* **deps-dev:** bump @types/node from 22.8.1 to 22.8.6 in the dependencies group ([#224](https://github.com/Alwatr/flux/issues/224)) ([2ffa758](https://github.com/Alwatr/flux/commit/2ffa7587f46b55bddc98be25c60940c3eb61f815)) by @dependabot[bot]
* **deps:** bump the alwatr group with 6 updates ([#225](https://github.com/Alwatr/flux/issues/225)) ([6f22eda](https://github.com/Alwatr/flux/commit/6f22eda4e9ee6c31e4c32b23b870a5c148a818da)) by @dependabot[bot]

## [3.2.1](https://github.com/Alwatr/flux/compare/v3.2.0...v3.2.1) (2024-10-28)

### Dependencies update

* bump the alwatr-dependencies group with 2 updates ([#217](https://github.com/Alwatr/flux/issues/217)) ([a5fd542](https://github.com/Alwatr/flux/commit/a5fd542e8866589a4edcaaf4312bdc4f322dc59f)) by @dependabot[bot]
* bump the development-dependencies group across 1 directory with 9 updates ([9d1d05d](https://github.com/Alwatr/flux/commit/9d1d05d33e259fd810138a37b36adc910b71c4bb)) by @dependabot[bot]
* update nanolib v1.4.0 with other deps ([8c0fdcd](https://github.com/Alwatr/flux/commit/8c0fdcd4a827790f7c97bfbf7119ba315450f822)) by @AliMD

## [3.2.0](https://github.com/Alwatr/flux/compare/v3.1.1...v3.2.0) (2024-10-11)

### Bug Fixes

* prevent `sideeffects` from `build` result ([fbc7a9f](https://github.com/Alwatr/flux/commit/fbc7a9f21898e3a96f28ce4a105460af0cf513eb)) by @mohammadhonarvar

### Code Refactoring

* update `import`s & packages based on the latest changes of `nanolib` ([b905288](https://github.com/Alwatr/flux/commit/b9052881b7549207c01b0eef92dc459d44b56ac0)) by @mohammadhonarvar

### Dependencies update

* bump the alwatr-dependencies group across 1 directory with 7 updates ([daf1c3f](https://github.com/Alwatr/flux/commit/daf1c3f7ef8d17cf7388df2676b5fe808616ba57)) by @dependabot[bot]
* bump the alwatr-dependencies group with 4 updates ([7ce1b54](https://github.com/Alwatr/flux/commit/7ce1b54235cc2fd4f386052e7a4c4d324cc74888)) by @dependabot[bot]
* bump the alwatr-dependencies group with 8 updates ([bc520ba](https://github.com/Alwatr/flux/commit/bc520ba6ac7ed6bcff2c4a3eea81d1a2e502b0cf)) by @dependabot[bot]
* bump the development-dependencies group with 10 updates ([01de77c](https://github.com/Alwatr/flux/commit/01de77cd1d9fdfb6db06ebd5035c43e46cc8aa17)) by @dependabot[bot]
* update ([4dc21b2](https://github.com/Alwatr/flux/commit/4dc21b2bf01d7176aea6e0d81cdc3e1f77b97e0f)) by @mohammadhonarvar

## [3.1.1](https://github.com/Alwatr/flux/compare/v3.1.0...v3.1.1) (2024-09-29)

### Miscellaneous Chores

* edited README ([fff9b3f](https://github.com/Alwatr/flux/commit/fff9b3f6ccc52e2257bdfe306e032ded07497b4a)) by @ArmanAsadian
* **signal:** change the license to AGPL-3.0 ([e077ff1](https://github.com/Alwatr/flux/commit/e077ff125521abcfb8795563a3f2a17e509e9ab6)) by @ArmanAsadian

### Dependencies update

* update ([fb148fd](https://github.com/Alwatr/flux/commit/fb148fdbe7f84acc3eda625e5e8c5773747d32e9)) by @

## [3.1.0](https://github.com/Alwatr/flux/compare/v3.0.3...v3.1.0) (2024-09-26)

### Dependencies update

* bump @types/node in the development-dependencies group ([979223c](https://github.com/Alwatr/flux/commit/979223c3cdbb002a926e72e1a7f79c82ff7395d4)) by @dependabot[bot]

## [3.0.3](https://github.com/Alwatr/flux/compare/v3.0.2...v3.0.3) (2024-09-24)

**Note:** Version bump only for package @alwatr/signal

## [3.0.2](https://github.com/Alwatr/flux/compare/v3.0.1...v3.0.2) (2024-09-21)

### Dependencies update

* update ([1048410](https://github.com/Alwatr/flux/commit/1048410efb300bb0a0ab7eae9734ca8f7f9d83a8)) by @

## [3.0.1](https://github.com/Alwatr/flux/compare/v3.0.0...v3.0.1) (2024-09-17)

### Miscellaneous Chores

* simple demo test ([43f9bee](https://github.com/Alwatr/flux/commit/43f9bee831d5ba4534fa80c7ff4c28f6ca65cd91)) by @

## 3.0.0 (2024-09-17)

### Features

* Add @alwatr/observable package ([e554c91](https://github.com/Alwatr/flux/commit/e554c91e8d3bf59a853e1a08692f3fa730194616)) by @AliMD
* bew package @alwatr/context ([9ee2204](https://github.com/Alwatr/flux/commit/9ee220484fd99654d1303851c2e03f2bd0b308a3)) by @AliMD
* update all repo files from alwatr ([b85a3a6](https://github.com/Alwatr/flux/commit/b85a3a62a8c19f395cf33d72329b9c0f301cddfc)) by @AliMD

### Bug Fixes

* all new repo path and packages dependencies ([21a6afa](https://github.com/Alwatr/flux/commit/21a6afa0badafe4051617d9a9e3bbfbaabd0c4ad)) by @
* cleanup old signal and fsm v1 ([bde0bea](https://github.com/Alwatr/flux/commit/bde0bea06a6750bebad49a127b75b57fd5e55ddd)) by @
* **signal:** compatible with new logger api ([0a3b1c0](https://github.com/Alwatr/flux/commit/0a3b1c02b285daa66491104a14596e6a19895e11)) by @
* **signal:** package name ([4791b54](https://github.com/Alwatr/flux/commit/4791b54c8da75cf43eb9c86180f1ed94b0e28c4e)) by @
* **signal:** signal2 name ([70b71e3](https://github.com/Alwatr/flux/commit/70b71e312cb5e5d4c54c37c5c327712200f90be5)) by @
* **signal:** types ([2460dc9](https://github.com/Alwatr/flux/commit/2460dc9f68c003dfbd428be23117bcacc72a5084)) by @AliMD
* ts refrence path ([c2baa44](https://github.com/Alwatr/flux/commit/c2baa44999c72a0015481fc8fea25439329c3f37)) by @

### Code Refactoring

* AlwatrObservable to use 'message' instead of 'data' ([67aa6e0](https://github.com/Alwatr/flux/commit/67aa6e01aebec8fae0accfb174bcf66fe72ddad7)) by @AliMD
* **signal:** AlwatrContext to use class property instead of calling super.getData_() ([bbe18bb](https://github.com/Alwatr/flux/commit/bbe18bbb3ca105ee34d802345105a71c874b60e5)) by @AliMD
* **signal:** Remove reference to api-server in tsconfig.json ([3c6b2e6](https://github.com/Alwatr/flux/commit/3c6b2e6c8e874240ba785cfafe14922637070120)) by @AliMD
* **signal:** Update AlwatrContext to use class property instead of calling super.getData_() ([437dbf4](https://github.com/Alwatr/flux/commit/437dbf48af845c7e8c7441566d78ff6884d1c4cc)) by @AliMD
* Update @alwatr/signal package ([9ec8478](https://github.com/Alwatr/flux/commit/9ec8478b956dd2dd83ea42d6ba9ed94582a318a7)) by @AliMD
* Update all package URLs to point to the flux repository ([e7e56d2](https://github.com/Alwatr/flux/commit/e7e56d252d4a0e1b4b1fa20c06e8b61b1b7242ae)) by @AliMD
* Update AlwatrContext to use 'message' instead of 'data' ([512789b](https://github.com/Alwatr/flux/commit/512789b7c0b90e71e8e1eda5fbd923e18c45731e)) by @AliMD
* Update AlwatrContextSignal to AlwatrContext ([44dd077](https://github.com/Alwatr/flux/commit/44dd077584669f668ab633c0e10a1d6dd6986e21)) by @AliMD
* Update AlwatrSignal and AlwatrSimpleSignal to use 'message' instead of 'data' ([cef6ba6](https://github.com/Alwatr/flux/commit/cef6ba64164f6569a895ef1efa8a33900c1c9cba)) by @AliMD
* Update AlwatrSignal and AlwatrTrigger constructors ([05da419](https://github.com/Alwatr/flux/commit/05da4191ac23ab589cc4982b383c24d9b7a8ae74)) by @AliMD
* Update package dependencies and references ([888f698](https://github.com/Alwatr/flux/commit/888f6987553a410e561da9fe21c0655f8f935db0)) by @AliMD

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group with 11 updates ([60f3075](https://github.com/Alwatr/flux/commit/60f3075872d3a4a9da979c589b5aa6b84065d48b)) by @
* **deps-dev:** bump the development-dependencies group with 14 updates ([c6ae70e](https://github.com/Alwatr/flux/commit/c6ae70e1534469fd36386f0828a52985001e2ef6)) by @
* **deps-dev:** bump the development-dependencies group with 8 updates ([c853aa2](https://github.com/Alwatr/flux/commit/c853aa2730b5c256049414e302a3d2d0c58ef61e)) by @
* **deps:** bump the alwatr-dependencies group with 3 updates ([f2a109d](https://github.com/Alwatr/flux/commit/f2a109d9b1775b67303d9407e20a5591cc69e4a7)) by @
* **deps:** bump the alwatr-dependencies group with 3 updates ([e5105eb](https://github.com/Alwatr/flux/commit/e5105eb0bbc450566b1ae6aee9241d541377bf94)) by @
* **deps:** bump the alwatr-dependencies group with 4 updates ([0019b83](https://github.com/Alwatr/flux/commit/0019b83ed56643b634972d8a15651ef2eaa2d735)) by @
* **deps:** bump the alwatr-dependencies group with 4 updates ([eb7fdfa](https://github.com/Alwatr/flux/commit/eb7fdfa545b5c1e040839a427326937acdcd8cb3)) by @
* **deps:** bump the alwatr-dependencies group with 4 updates ([4069863](https://github.com/Alwatr/flux/commit/40698638f3825b118d8c24fa115403f3f3b564a7)) by @
* **deps:** fix and update ([ab83ec7](https://github.com/Alwatr/flux/commit/ab83ec789d43245a8ff109e151b054a1fecb8e2a)) by @
* **deps:** update ([d7e2ef1](https://github.com/Alwatr/flux/commit/d7e2ef1a9de62fff6bfb2fd32af7dcfb4fcb048d)) by @njfamirm
* **deps:** upgrade ([7e60a62](https://github.com/Alwatr/flux/commit/7e60a6237f8b07b72dd9afd6bbaa140b187fe882)) by @
* **deps:** workspace dependencies ([627938e](https://github.com/Alwatr/flux/commit/627938e38e75a5e425388c3d56837feffd6716a2)) by @
* rename core to packages ([9158c8e](https://github.com/Alwatr/flux/commit/9158c8e4c679d96c9b54e91ea6faa49364d47494)) by @
* **signal:** rename signal2 ([33adbea](https://github.com/Alwatr/flux/commit/33adbeabe9384d5de30742e4c4b00db410596e52)) by @
* update changelogs ([a965ecd](https://github.com/Alwatr/flux/commit/a965ecd095cb621b4a7748d2e048f4a82b0aa872)) by @
* **yarn:** pnp mode ([02bd406](https://github.com/Alwatr/flux/commit/02bd4064e381c483e31a8acbe7c72e7aed3e62b3)) by @

### Dependencies update

* bump the alwatr-dependencies group with 6 updates ([4470fd8](https://github.com/Alwatr/flux/commit/4470fd8be49e1a73c17bdd5a09127b9f3a67b3bb)) by @dependabot[bot]
* update ([e8f8281](https://github.com/Alwatr/flux/commit/e8f8281beb24988466c6e29f724a963118870933)) by @AliMD

## [2.0.5](https://github.com/Alwatr/flux/compare/@alwatr/signal@2.0.4...@alwatr/signal@2.0.5) (2023-12-19)

**Note:** Version bump only for package @alwatr/signal

## [2.0.4](https://github.com/Alwatr/flux/compare/@alwatr/signal@2.0.2...@alwatr/signal@2.0.4) (2023-12-19)

**Note:** Version bump only for package @alwatr/signal

## [2.0.3](https://github.com/Alwatr/flux/compare/@alwatr/signal@2.0.2...@alwatr/signal@2.0.3) (2023-11-09)

**Note:** Version bump only for package @alwatr/signal

## [2.0.2](https://github.com/Alwatr/flux/compare/@alwatr/signal@2.0.1...@alwatr/signal@2.0.2) (2023-11-01)

**Note:** Version bump only for package @alwatr/signal

## [2.0.1](https://github.com/Alwatr/flux/compare/@alwatr/signal@2.0.0...@alwatr/signal@2.0.1) (2023-10-23)

### Bug Fixes

- **signal:** compatible with new logger api ([0a3b1c0](https://github.com/Alwatr/flux/commit/0a3b1c02b285daa66491104a14596e6a19895e11)) by @

# 2.0.0 (2023-09-19)

### Bug Fixes

- all new repo path and packages dependencies ([21a6afa](https://github.com/Alwatr/flux/commit/21a6afa0badafe4051617d9a9e3bbfbaabd0c4ad)) by @AliMD
- cleanup old signal and fsm v1 ([bde0bea](https://github.com/Alwatr/flux/commit/bde0bea06a6750bebad49a127b75b57fd5e55ddd)) by @AliMD
- **signal:** package name ([4791b54](https://github.com/Alwatr/flux/commit/4791b54c8da75cf43eb9c86180f1ed94b0e28c4e)) by @AliMD
- **signal:** signal2 name ([70b71e3](https://github.com/Alwatr/flux/commit/70b71e312cb5e5d4c54c37c5c327712200f90be5)) by @AliMD
- ts refrence path ([c2baa44](https://github.com/Alwatr/flux/commit/c2baa44999c72a0015481fc8fea25439329c3f37)) by @AliMD

## [1.1.2](https://github.com/Alwatr/flux/compare/@alwatr/signal@1.1.1...@alwatr/signal@1.1.2) (2023-09-12)

**Note:** Version bump only for package @alwatr/signal

## [1.1.1](https://github.com/Alwatr/flux/compare/@alwatr/signal@1.1.0...@alwatr/signal@1.1.1) (2023-09-12)

**Note:** Version bump only for package @alwatr/signal

# 1.1.0 (2023-09-12)

# 1.0.0 (2023-06-14)

# 0.32.0 (2023-05-27)

# 0.31.0 (2023-05-08)

### Bug Fixes

- new logger api ([9d83a7d](https://github.com/Alwatr/flux/commit/9d83a7dc5c103bc3bb4282dacfd85fa998915300))
- **signal:** dont receivePrevious when listener is disabled ([68ae207](https://github.com/Alwatr/flux/commit/68ae207ce9ecf104922b24910d8dfcedb13acde7))
- **signal:** requestableContextProvider.getValue ([0a7111d](https://github.com/Alwatr/flux/commit/0a7111da7b8eb004566922dc9b35edfc02a55147))

### Features

- **signal:** new RequestableContext with state ([b8a8e55](https://github.com/Alwatr/flux/commit/b8a8e550d3952863d85ba9d9d87513a668a9430d))

# 0.30.0 (2023-03-06)

### Bug Fixes

- **signal:** NextCycle with own detail ([01f3c79](https://github.com/Alwatr/flux/commit/01f3c79500927f6384a33abcc9b0cb2355794b3e))
- **signal:** nodejs compatibility ([69d8a60](https://github.com/Alwatr/flux/commit/69d8a60ad64d44ee7c3ced002e702f13408a5a50))
- **signal:** requestableContextConsumer bind issue ([66467f6](https://github.com/Alwatr/flux/commit/66467f6e5681d84d7f2e0b353206d4bb579b26f2))
- **signal:** requestContext dispatch issue ([e937ebd](https://github.com/Alwatr/flux/commit/e937ebd3a90fc6a9946f5c35ef4f6f40b6ab4b00))

### Features

- **signal:** add untilChange for contextProvider ([cb44916](https://github.com/Alwatr/flux/commit/cb4491698fd5ddfbe055032fc2cb50691de31194))
- **signal:** defineCommand return ListenerSpec ([21fecac](https://github.com/Alwatr/flux/commit/21fecacb6aa9423da9e3c177a4bbc59952d94e35))
- **signal:** dispatch NextCycle option ([b30eb31](https://github.com/Alwatr/flux/commit/b30eb316d92f594034fc40d195c4033e38e4d2e2))

# 0.29.0 (2023-02-10)

### Bug Fixes

- **signal/core:** \_getSignalObject ([1374188](https://github.com/Alwatr/flux/commit/1374188bdc7e689ded11d04bf4588a1162cc6d86))
- **signal:** alert [#1455](https://github.com/Alwatr/flux/issues/1455) ([203307d](https://github.com/Alwatr/flux/commit/203307df308a12e6c38cb9e0e2301b2015b6ff45))
- **signal:** clean old interfaces ([b2987ad](https://github.com/Alwatr/flux/commit/b2987add7bfe0cf609fa355403fb9fb5de3f6b8a))
- **signal:** export all interfaces ([8704eac](https://github.com/Alwatr/flux/commit/8704eac6ae7a8a45e77c24ef5e602e36af3fd21e))
- **signal:** export listeners ([fb05bfb](https://github.com/Alwatr/flux/commit/fb05bfb9b7eb30427442783677ce1d4da5401160))
- **signal:** import types ([cc0b88b](https://github.com/Alwatr/flux/commit/cc0b88be420b1fe057a8640bbffb1af3bf327cef))
- **signal:** interface bind type ([7b6c820](https://github.com/Alwatr/flux/commit/7b6c820da2ba216f36e089bf79bdeccf208df3b1))
- **signal:** reported issues ([75f688f](https://github.com/Alwatr/flux/commit/75f688faf96a056a256603d05276f5731db86aee))
- **signal:** TSignal on SignalControllerInterface ([ac42b7c](https://github.com/Alwatr/flux/commit/ac42b7c7023549e8dd07cd3d9e189f356ffa06ee))

### Features

- **signal-manager:** enhance provider, docs ([c4583a3](https://github.com/Alwatr/flux/commit/c4583a3b0fcbf38b5e426aaa2bc6e0f52ccac5fd))
- **signal:** alias in SignalInterface & BoundSignalInterface ([053030b](https://github.com/Alwatr/flux/commit/053030b96c09d474794f32327d892f1d3690656c))
- **signal:** bind signal ([de49a13](https://github.com/Alwatr/flux/commit/de49a13eaffce31660849dfc63285d97e9098c0c))
- **signal:** command handler/provider interface ([3d23683](https://github.com/Alwatr/flux/commit/3d236837e13d8cfdcd44a1570bdc9659f48e7f47))
- **signal:** command signals ([98c1d90](https://github.com/Alwatr/flux/commit/98c1d90978329e4c5c584e19edb1aaa365632162))
- **signal:** command trigger interface ([dda9466](https://github.com/Alwatr/flux/commit/dda94666d9e8e490fea26038044df0e67c203583))
- **signal:** commandSignal ([5a0d7e5](https://github.com/Alwatr/flux/commit/5a0d7e5498087620d28548ea5d90036a7b17483a))
- **signal:** context prover and consumer ([081a51a](https://github.com/Alwatr/flux/commit/081a51a1ee88e66ebbcd0c58186c00a6aa9e1032))
- **signal:** contextProvider.expire ([7d0ce93](https://github.com/Alwatr/flux/commit/7d0ce937f0eadcd9019e6047fbe07aa1a3b579a7))
- **signal:** event listener interface ([4ca4079](https://github.com/Alwatr/flux/commit/4ca407938d444027cdbd435173c875fdd9ce8e28))
- **signal:** event trigger interface ([9b90597](https://github.com/Alwatr/flux/commit/9b905979a5065640981433ec7d120ba2494966bb))
- **signal:** new contextConsumer interface ([9ee4a62](https://github.com/Alwatr/flux/commit/9ee4a624211adb66d9c3d180470cca44ed7df382))
- **signal:** new contextProvider interface ([e5d29eb](https://github.com/Alwatr/flux/commit/e5d29ebaa75d71bb5a87bedddb2be7600e68b210))
- **signal:** new manager interface ([f028306](https://github.com/Alwatr/flux/commit/f028306f4d7932df65a1bbeade0d29377a370e2e))
- **signal:** new requestable context consumer interface ([bf6845f](https://github.com/Alwatr/flux/commit/bf6845f35a98bb63bcfa42196c2f977d64aea59e))
- **signal:** new requestable context provider interface ([2c8d576](https://github.com/Alwatr/flux/commit/2c8d57604dcb07a2831d85d4ef1e262863a5fae8))
- **signal:** new signal dynamic types ([0f1a38e](https://github.com/Alwatr/flux/commit/0f1a38e356ab73e4e2e1a8f852585e50e86cff0e))
- **signal:** new simple api ([eb1e478](https://github.com/Alwatr/flux/commit/eb1e47892d4478fb6c687f6d15e1a5c204b5666c))
- **signal:** refactor all generic types with Stringifyable ([bdcef63](https://github.com/Alwatr/flux/commit/bdcef632c81fa5e7c7ae595a7a77092c53821850))
- **signal:** separate request command with response ([47a779e](https://github.com/Alwatr/flux/commit/47a779e9a814d5d6a388f1a3e94c23e7fb977dce))
- **signal:** signal.request ([d791b3e](https://github.com/Alwatr/flux/commit/d791b3eef846697020b76bfecfbf25a3e31eb3a5))
- **signal:** signal.untilNext ([9df78c0](https://github.com/Alwatr/flux/commit/9df78c03dea243b467504fdf422388ab9d2b5660))
- **signal:** signals.expire ([3591efd](https://github.com/Alwatr/flux/commit/3591efd5e42f7a981814fd59d7189b5066735302))

# 0.28.0 (2023-01-20)

# 0.27.0 (2022-12-29)

# 0.26.0 (2022-12-22)

### Bug Fixes

- set correct path ([d01ce6f](https://github.com/Alwatr/flux/commit/d01ce6ffa749a5e3e0e11e35b4ed61d75d61fec9))
- tsconfig ([e96dcd3](https://github.com/Alwatr/flux/commit/e96dcd30774a9f06f7d051e0504192cbbe019e35))

### Features

- improve error debugging ([1fba504](https://github.com/Alwatr/flux/commit/1fba50400a1e8ececc10bbe8ea11cc8dcea2289c))

# [1.0.0](https://github.com/Alwatr/flux/compare/v0.32.0...v1.0.0) (2023-06-14)

**Note:** Version bump only for package @alwatr/signal

# [0.32.0](https://github.com/Alwatr/flux/compare/v0.31.0...v0.32.0) (2023-05-27)

**Note:** Version bump only for package @alwatr/signal

# [0.31.0](https://github.com/Alwatr/flux/compare/v0.30.0...v0.31.0) (2023-05-08)

### Bug Fixes

- new logger api ([9d83a7d](https://github.com/Alwatr/flux/commit/9d83a7dc5c103bc3bb4282dacfd85fa998915300))
- **signal:** dont receivePrevious when listener is disabled ([68ae207](https://github.com/Alwatr/flux/commit/68ae207ce9ecf104922b24910d8dfcedb13acde7))
- **signal:** requestableContextProvider.getValue ([0a7111d](https://github.com/Alwatr/flux/commit/0a7111da7b8eb004566922dc9b35edfc02a55147))

### Features

- **signal:** new RequestableContext with state ([b8a8e55](https://github.com/Alwatr/flux/commit/b8a8e550d3952863d85ba9d9d87513a668a9430d))

# [0.30.0](https://github.com/Alwatr/flux/compare/v0.29.0...v0.30.0) (2023-03-06)

### Bug Fixes

- **signal:** NextCycle with own detail ([01f3c79](https://github.com/Alwatr/flux/commit/01f3c79500927f6384a33abcc9b0cb2355794b3e))
- **signal:** nodejs compatibility ([69d8a60](https://github.com/Alwatr/flux/commit/69d8a60ad64d44ee7c3ced002e702f13408a5a50))
- **signal:** requestableContextConsumer bind issue ([66467f6](https://github.com/Alwatr/flux/commit/66467f6e5681d84d7f2e0b353206d4bb579b26f2))
- **signal:** requestContext dispatch issue ([e937ebd](https://github.com/Alwatr/flux/commit/e937ebd3a90fc6a9946f5c35ef4f6f40b6ab4b00))

### Features

- **signal:** add untilChange for contextProvider ([cb44916](https://github.com/Alwatr/flux/commit/cb4491698fd5ddfbe055032fc2cb50691de31194))
- **signal:** defineCommand return ListenerSpec ([21fecac](https://github.com/Alwatr/flux/commit/21fecacb6aa9423da9e3c177a4bbc59952d94e35))
- **signal:** dispatch NextCycle option ([b30eb31](https://github.com/Alwatr/flux/commit/b30eb316d92f594034fc40d195c4033e38e4d2e2))

# [0.29.0](https://github.com/Alwatr/flux/compare/v0.28.0...v0.29.0) (2023-02-10)

### Bug Fixes

- **signal/core:** \_getSignalObject ([1374188](https://github.com/Alwatr/flux/commit/1374188bdc7e689ded11d04bf4588a1162cc6d86))
- **signal:** alert [#1455](https://github.com/Alwatr/flux/issues/1455) ([203307d](https://github.com/Alwatr/flux/commit/203307df308a12e6c38cb9e0e2301b2015b6ff45))
- **signal:** clean old interfaces ([b2987ad](https://github.com/Alwatr/flux/commit/b2987add7bfe0cf609fa355403fb9fb5de3f6b8a))
- **signal:** export all interfaces ([8704eac](https://github.com/Alwatr/flux/commit/8704eac6ae7a8a45e77c24ef5e602e36af3fd21e))
- **signal:** export listeners ([fb05bfb](https://github.com/Alwatr/flux/commit/fb05bfb9b7eb30427442783677ce1d4da5401160))
- **signal:** import types ([cc0b88b](https://github.com/Alwatr/flux/commit/cc0b88be420b1fe057a8640bbffb1af3bf327cef))
- **signal:** interface bind type ([7b6c820](https://github.com/Alwatr/flux/commit/7b6c820da2ba216f36e089bf79bdeccf208df3b1))
- **signal:** reported issues ([75f688f](https://github.com/Alwatr/flux/commit/75f688faf96a056a256603d05276f5731db86aee))
- **signal:** TSignal on SignalControllerInterface ([ac42b7c](https://github.com/Alwatr/flux/commit/ac42b7c7023549e8dd07cd3d9e189f356ffa06ee))

### Features

- **signal-manager:** enhance provider, docs ([c4583a3](https://github.com/Alwatr/flux/commit/c4583a3b0fcbf38b5e426aaa2bc6e0f52ccac5fd))
- **signal:** alias in SignalInterface & BoundSignalInterface ([053030b](https://github.com/Alwatr/flux/commit/053030b96c09d474794f32327d892f1d3690656c))
- **signal:** bind signal ([de49a13](https://github.com/Alwatr/flux/commit/de49a13eaffce31660849dfc63285d97e9098c0c))
- **signal:** command handler/provider interface ([3d23683](https://github.com/Alwatr/flux/commit/3d236837e13d8cfdcd44a1570bdc9659f48e7f47))
- **signal:** command signals ([98c1d90](https://github.com/Alwatr/flux/commit/98c1d90978329e4c5c584e19edb1aaa365632162))
- **signal:** command trigger interface ([dda9466](https://github.com/Alwatr/flux/commit/dda94666d9e8e490fea26038044df0e67c203583))
- **signal:** commandSignal ([5a0d7e5](https://github.com/Alwatr/flux/commit/5a0d7e5498087620d28548ea5d90036a7b17483a))
- **signal:** context prover and consumer ([081a51a](https://github.com/Alwatr/flux/commit/081a51a1ee88e66ebbcd0c58186c00a6aa9e1032))
- **signal:** contextProvider.expire ([7d0ce93](https://github.com/Alwatr/flux/commit/7d0ce937f0eadcd9019e6047fbe07aa1a3b579a7))
- **signal:** event listener interface ([4ca4079](https://github.com/Alwatr/flux/commit/4ca407938d444027cdbd435173c875fdd9ce8e28))
- **signal:** event trigger interface ([9b90597](https://github.com/Alwatr/flux/commit/9b905979a5065640981433ec7d120ba2494966bb))
- **signal:** new contextConsumer interface ([9ee4a62](https://github.com/Alwatr/flux/commit/9ee4a624211adb66d9c3d180470cca44ed7df382))
- **signal:** new contextProvider interface ([e5d29eb](https://github.com/Alwatr/flux/commit/e5d29ebaa75d71bb5a87bedddb2be7600e68b210))
- **signal:** new manager interface ([f028306](https://github.com/Alwatr/flux/commit/f028306f4d7932df65a1bbeade0d29377a370e2e))
- **signal:** new requestable context consumer interface ([bf6845f](https://github.com/Alwatr/flux/commit/bf6845f35a98bb63bcfa42196c2f977d64aea59e))
- **signal:** new requestable context provider interface ([2c8d576](https://github.com/Alwatr/flux/commit/2c8d57604dcb07a2831d85d4ef1e262863a5fae8))
- **signal:** new signal dynamic types ([0f1a38e](https://github.com/Alwatr/flux/commit/0f1a38e356ab73e4e2e1a8f852585e50e86cff0e))
- **signal:** new simple api ([eb1e478](https://github.com/Alwatr/flux/commit/eb1e47892d4478fb6c687f6d15e1a5c204b5666c))
- **signal:** refactor all generic types with Stringifyable ([bdcef63](https://github.com/Alwatr/flux/commit/bdcef632c81fa5e7c7ae595a7a77092c53821850))
- **signal:** separate request command with response ([47a779e](https://github.com/Alwatr/flux/commit/47a779e9a814d5d6a388f1a3e94c23e7fb977dce))
- **signal:** signal.request ([d791b3e](https://github.com/Alwatr/flux/commit/d791b3eef846697020b76bfecfbf25a3e31eb3a5))
- **signal:** signal.untilNext ([9df78c0](https://github.com/Alwatr/flux/commit/9df78c03dea243b467504fdf422388ab9d2b5660))
- **signal:** signals.expire ([3591efd](https://github.com/Alwatr/flux/commit/3591efd5e42f7a981814fd59d7189b5066735302))

# [0.28.0](https://github.com/Alwatr/flux/compare/v0.27.0...v0.28.0) (2023-01-20)

**Note:** Version bump only for package @alwatr/signal

# [0.27.0](https://github.com/Alwatr/flux/compare/v0.26.0...v0.27.0) (2022-12-29)

**Note:** Version bump only for package @alwatr/signal

# [0.26.0](https://github.com/Alwatr/flux/compare/v0.25.0...v0.26.0) (2022-12-22)

### Bug Fixes

- set correct path ([d01ce6f](https://github.com/Alwatr/flux/commit/d01ce6ffa749a5e3e0e11e35b4ed61d75d61fec9))
- tsconfig ([e96dcd3](https://github.com/Alwatr/flux/commit/e96dcd30774a9f06f7d051e0504192cbbe019e35))

### Features

- improve error debugging ([1fba504](https://github.com/Alwatr/flux/commit/1fba50400a1e8ececc10bbe8ea11cc8dcea2289c))

# [0.25.0](https://github.com/Alwatr/flux/compare/v0.24.1...v0.25.0) (2022-12-07)

**Note:** Version bump only for package @alwatr/signal

## [0.24.1](https://github.com/Alwatr/flux/compare/v0.24.0...v0.24.1) (2022-12-01)

**Note:** Version bump only for package @alwatr/signal

# [0.24.0](https://github.com/Alwatr/flux/compare/v0.23.0...v0.24.0) (2022-11-28)

### Bug Fixes

- use ~ for package version ([4e027ff](https://github.com/Alwatr/flux/commit/4e027ff63875e03b088ebcdc1bdf2495f4494eec))

# [0.23.0](https://github.com/Alwatr/flux/compare/v0.22.1...v0.23.0) (2022-11-23)

**Note:** Version bump only for package @alwatr/signal

## [0.22.1](https://github.com/Alwatr/flux/compare/v0.22.0...v0.22.1) (2022-11-21)

**Note:** Version bump only for package @alwatr/signal

# [0.22.0](https://github.com/Alwatr/flux/compare/v0.21.0...v0.22.0) (2022-11-20)

**Note:** Version bump only for package @alwatr/signal

# [0.21.0](https://github.com/Alwatr/flux/compare/v0.20.0...v0.21.0) (2022-11-13)

**Note:** Version bump only for package @alwatr/signal

# [0.20.0](https://github.com/Alwatr/flux/compare/v0.19.0...v0.20.0) (2022-11-05)

**Note:** Version bump only for package @alwatr/signal

# [0.19.0](https://github.com/Alwatr/flux/compare/v0.18.0...v0.19.0) (2022-11-01)

### Bug Fixes

- Import error in webpack ([1a52f67](https://github.com/Alwatr/flux/commit/1a52f67ff2788c51abd13126f34353c26aa669c3))

# [0.18.0](https://github.com/Alwatr/flux/compare/v0.17.0...v0.18.0) (2022-10-22)

**Note:** Version bump only for package @alwatr/signal

# [0.17.0](https://github.com/Alwatr/flux/compare/v0.16.1...v0.17.0) (2022-10-21)

### Bug Fixes

- **signal:** default options ([bbb0d59](https://github.com/Alwatr/flux/commit/bbb0d59442301344781691bbecad39aed7f6ac40))

# [0.16.0](https://github.com/Alwatr/flux/compare/v0.15.0...v0.16.0) (2022-09-08)

**Note:** Version bump only for package @alwatr/signal

# [0.15.0](https://github.com/Alwatr/flux/compare/v0.14.0...v0.15.0) (2022-09-01)

### Bug Fixes

- get signal object of `request` signal ([eec4b62](https://github.com/Alwatr/flux/commit/eec4b6201d79785aa10f4b9c777449525158a346))
- **signal:** fix some issues of `review` ([36ceb8b](https://github.com/Alwatr/flux/commit/36ceb8b25987621065327b4fa475a213562af8e7))
- **signal:** log performance and security issue ([dbe9483](https://github.com/Alwatr/flux/commit/dbe9483b672099b91c18c3a103c2878435fd6508))

# [0.14.0](https://github.com/Alwatr/flux/compare/v0.13.0...v0.14.0) (2022-08-19)

**Note:** Version bump only for package @alwatr/signal

# [0.13.0](https://github.com/Alwatr/flux/compare/v0.12.0...v0.13.0) (2022-08-06)

**Note:** Version bump only for package @alwatr/signal

# [0.12.0](https://github.com/Alwatr/flux/compare/v0.11.0...v0.12.0) (2022-07-22)

**Note:** Version bump only for package @alwatr/signal

# [0.11.0](https://github.com/Alwatr/flux/compare/v0.10.1...v0.11.0) (2022-04-16)

**Note:** Version bump only for package @alwatr/signal

# [0.10.0](https://github.com/Alwatr/flux/compare/v0.9.0...v0.10.0) (2022-04-02)

**Note:** Version bump only for package @alwatr/signal

# [0.9.0](https://github.com/Alwatr/flux/compare/v0.8.0...v0.9.0) (2022-03-22)

### Features

- **signal:** ListenerInterface ([38ef029](https://github.com/Alwatr/flux/commit/38ef0291c5ba2e3619080ad89109d805d3d600f2))

# [0.8.0](https://github.com/Alwatr/flux/compare/v0.7.2...v0.8.0) (2022-03-14)

### Bug Fixes

- **signal:** remove once listene in dispatch change imediatly the loop! ([e4d420d](https://github.com/Alwatr/flux/commit/e4d420d3a086558dc01dcd7a9c5fe3e96677f092))

## [0.7.2](https://github.com/Alwatr/flux/compare/v0.7.1...v0.7.2) (2022-03-12)

### Bug Fixes

- **signal:** promise to multi requests works ([dd59f0e](https://github.com/Alwatr/flux/commit/dd59f0e5737abec72c41895b93365199fad66fcb))

# [0.7.0](https://github.com/Alwatr/flux/compare/v0.6.1...v0.7.0) (2022-03-12)

**Note:** Version bump only for package @alwatr/signal

# [0.6.0](https://github.com/Alwatr/flux/compare/v0.5.0...v0.6.0) (2022-03-11)

### Bug Fixes

- alalwatr ([898aa6e](https://github.com/Alwatr/flux/commit/898aa6ed0888eab9265c83b96a50f1b8c216d143))
- **packages:** duplicate alwatr keyword ([77d4aa2](https://github.com/Alwatr/flux/commit/77d4aa2105ad47515c3eee251fd6b8c281d0d1fc))

# [0.5.0](https://github.com/Alwatr/flux/compare/v0.4.0...v0.5.0) (2022-03-11)

### Bug Fixes

- **signal:** disabled getter and optional dispatch options ([28ced3d](https://github.com/Alwatr/flux/commit/28ced3d0c4cdf44fc2aebfab98db0883fc5363fe))

### Features

- **signal:** new SignalInterface ([221701a](https://github.com/Alwatr/flux/commit/221701a54ea9edda4a3a935a7b098e235ec52691))

# [0.4.0](https://github.com/Alwatr/flux/compare/v0.3.0...v0.4.0) (2022-03-11)

**Note:** Version bump only for package @alwatr/signal

# [0.3.0](https://github.com/Alwatr/flux/compare/v0.2.1...v0.3.0) (2022-03-06)

### Bug Fixes

- **signal:** signal provider type ([0151c57](https://github.com/Alwatr/flux/commit/0151c57d9b6d4f7e83bb9b1847ebe0ae53cd8f89))

## [0.2.1](https://github.com/Alwatr/flux/compare/v0.2.0...v0.2.1) (2022-03-05)

### Bug Fixes

- **signal:** signal value type issue ([292a4a7](https://github.com/Alwatr/flux/commit/292a4a7d12a2fd143761e67cd1ecd2e5e40f2ee9))

# [0.2.0](https://github.com/Alwatr/flux/compare/v0.1.2...v0.2.0) (2022-03-05)

### Bug Fixes

- **router:** rename setSignalProvider callback detail to requestParam ([6e09f87](https://github.com/Alwatr/flux/commit/6e09f8772d320625fb4c15ccaa0abcfa2932f992))
- **signal:** fix dispatchSignal value parameters ([4d34cfb](https://github.com/Alwatr/flux/commit/4d34cfbb5281d5ce4a4f06ddaaf72218dde80cdd))

### Features

- **signal:** add contributors ([64287cd](https://github.com/Alwatr/flux/commit/64287cd8cea95665a6ed298177df60dadda7642b))
- **signal:** improve signal provider by dispatch return content ([80c2b27](https://github.com/Alwatr/flux/commit/80c2b275bcc0521327400c5902f512c778f5eb3f))

## [0.1.2](https://github.com/Alwatr/flux/compare/v0.1.1...v0.1.2) (2022-03-03)

**Note:** Version bump only for package @alwatr/signal

## [0.1.1](https://github.com/Alwatr/flux/compare/v0.1.0...v0.1.1) (2022-03-03)

### Bug Fixes

- **packages:** add publish config to public ([9cb3710](https://github.com/Alwatr/flux/commit/9cb37106b5a35d24d5195ff54232e5769ccc034e))

# 0.1.0 (2022-03-02)

### Bug Fixes

- **signal:** AlwatrRequestSignals global type ([228e333](https://github.com/Alwatr/flux/commit/228e3333326b23df51e7834872daf1349826bf09))

### Features

- **signal:** addSignalListener ([e7c5742](https://github.com/Alwatr/flux/commit/e7c57427ef11e2624eb9a52a166720b1a3c5f66a))
- **signal:** getSignalObject ([b38954c](https://github.com/Alwatr/flux/commit/b38954cf4ae1c24eaaa79ecf513995a4678814ee))
- **signal:** impeliment addSignalProvider, waitForSignal, hasSignalDispatchedBefore, expireSignal ([e0b4d78](https://github.com/Alwatr/flux/commit/e0b4d7831764d4454591f5105c5512e1657a63e5))
- **signal:** impeliment dispatchSignal ([cb2dfbe](https://github.com/Alwatr/flux/commit/cb2dfbe23ea751cba93cb1f6516cd2bfa2ecb18e))
- **signal:** ListenerObject, SignalObject types ([36d8a33](https://github.com/Alwatr/flux/commit/36d8a336760bba3808cfd26a28e4d24a31c95f8f))
- **signal:** make new package for manage signals ([5bf82b3](https://github.com/Alwatr/flux/commit/5bf82b3f05abc89102634e9b864d81b5b5af527e))
- **signal:** register to alwatr meta ([9c850e8](https://github.com/Alwatr/flux/commit/9c850e8df787aa44d289929dc65439e921982dce))
- **signal:** removeSignalListener ([0088a52](https://github.com/Alwatr/flux/commit/0088a5269ccce8b50a50e444695c81654fda70ff))
- **signal:** requestSignal ([111ab5a](https://github.com/Alwatr/flux/commit/111ab5a1436bc380f5121ef8c130da7010258d90))
