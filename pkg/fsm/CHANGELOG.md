# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

### 🐛 Bug Fixes

* remove event parameter from dispatch_after_destroy incident logging ([4a7d434](https://github.com/Alwatr/alwatr/commit/4a7d434f8a2835ba2b2d4d282f7c00359190cd81))

### 🔨 Code Refactoring

* conditionally log method arguments and events in DEV_MODE to reduce production build size ([b3842e0](https://github.com/Alwatr/alwatr/commit/b3842e09d56973b3a04e739fe8314050cd1975c4))

## [9.33.0](https://github.com/Alwatr/alwatr/compare/v9.32.0...v9.33.0) (2026-06-10)

### ✨ Features

* **fsm:** add convenience predicate for state matching ([6ea9fdb](https://github.com/Alwatr/alwatr/commit/6ea9fdb52cdbf4c8c53d71d775016b0ee2c989f2))
* **fsm:** add synchronous accessor for current machine state ([0e85ac1](https://github.com/Alwatr/alwatr/commit/0e85ac18c1491d71272f962fc2ea3da328401835))

### 🐛 Bug Fixes

* **fsm:** update processing flag to true during initialization and handle first enqueued event ([d6fc124](https://github.com/Alwatr/alwatr/commit/d6fc1243ec76fdfb73bf24b86e2389e0fd7fa4fb))

### 🔨 Code Refactoring

* **fsm:** clarify effect execution logging and handle synchronous effects ([fd5147e](https://github.com/Alwatr/alwatr/commit/fd5147e2406d3b196b91ce91d4fb82304f095c0b))
* **fsm:** enhance destroy method to clean up mailbox and improve idempotency ([04106b5](https://github.com/Alwatr/alwatr/commit/04106b50c501c5231a9832c83bffae914b16f50b))
* **fsm:** enhance destruction handling to prevent dispatch after service destruction ([1c0535e](https://github.com/Alwatr/alwatr/commit/1c0535e29d8cbd1e0c2fd1d92d08d28ba69691fd))
* **fsm:** enhance dispatch and processTransition methods for clarity and context handling ([90300f4](https://github.com/Alwatr/alwatr/commit/90300f4cf8cfbc9caeff6175cae8b57029b2f338))
* **fsm:** enhance error handling and logging in applyAssigners method ([2927675](https://github.com/Alwatr/alwatr/commit/2927675557359e8738f872f80fd5b8c288bcaa35))
* **fsm:** enhance event dispatching logic with a FIFO mailbox and re-entrancy guard ([a3cabd5](https://github.com/Alwatr/alwatr/commit/a3cabd568aab682456373df64e8d4fef2df43333))
* **fsm:** enhance start and spawnActors methods for clarity and error handling ([54908ee](https://github.com/Alwatr/alwatr/commit/54908eefbcbf49990b3521301d69086438885dbe))
* **fsm:** improve transition finding logic with guard evaluation and fallback handling ([3661764](https://github.com/Alwatr/alwatr/commit/3661764791e6469ec6cee5f4352826749da11350))
* **fsm:** optimize initial state entry by using queueMicrotask for actor spawning ([27fd86f](https://github.com/Alwatr/alwatr/commit/27fd86f9479f15ff45a4e3fc886524d49cb3c8ed))
* **fsm:** remove event parameter from Actors to prevent access actors to the event ([b5dd225](https://github.com/Alwatr/alwatr/commit/b5dd225cdec03d8f8032c028a41feb403f3418a5))
* **fsm:** remove unused imports from facade.ts ([6a95433](https://github.com/Alwatr/alwatr/commit/6a95433866dd0949d473b90489775ff55a8cb4e0))
* **fsm:** simplify FsmService constructor and state signal initialization ([2046413](https://github.com/Alwatr/alwatr/commit/204641314f4da4e724b58c0c4bb791f7e33dbfc2))
* **fsm:** streamline event dispatching and mailbox processing for improved clarity and efficiency ([494cf26](https://github.com/Alwatr/alwatr/commit/494cf264aa2e20533e0b86ab83f4323001b5f163))
* **fsm:** update activeActorCleanups__ to use array for cleanup callbacks and enhance cleanup logic ([176fafd](https://github.com/Alwatr/alwatr/commit/176fafd156c70aa915693f482bfe80c32d02242f))
* **fsm:** update Assigner type definition for improved clarity ([fec878e](https://github.com/Alwatr/alwatr/commit/fec878ec07fefeb5d09f5c8d9250c81bfe0d6920))
* **fsm:** update Effect type definition for consistency and clarity ([b72f7f6](https://github.com/Alwatr/alwatr/commit/b72f7f6fa6605119a1e408f7cfbf7d0b2b71c148))
* **fsm:** update event processing to ensure FIFO order during mailbox handling ([43742b6](https://github.com/Alwatr/alwatr/commit/43742b69baa7848893847bee5e84c0644f0aead3))
* **fsm:** update Guard type definition for improved parameter clarity ([fba4a9b](https://github.com/Alwatr/alwatr/commit/fba4a9bd7d6c0fb4782837033c1de447308b38ae))

### 🔗 Dependencies update

* **fsm:** add @alwatr/delay as a dependency for improved functionality ([0b58c3c](https://github.com/Alwatr/alwatr/commit/0b58c3c6b457ad0e77ee35160f7acb74d2c1afa3))

## [9.32.0](https://github.com/Alwatr/alwatr/compare/v9.31.0...v9.32.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/fsm

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

**Note:** Version bump only for package @alwatr/fsm

## [9.30.0](https://github.com/Alwatr/alwatr/compare/v9.29.0...v9.30.0) (2026-06-02)

**Note:** Version bump only for package @alwatr/fsm

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

**Note:** Version bump only for package @alwatr/fsm

## [9.28.0](https://github.com/Alwatr/alwatr/compare/v9.27.0...v9.28.0) (2026-05-25)

### ✨ Features

* **FSM:** add support for state actors with lifecycle management and update documentation ([40fc8da](https://github.com/Alwatr/alwatr/commit/40fc8da710b044af9435e5a87e92f1984dd5e9ea))
* **FSM:** enhance FSM context handling and add support for primitive types in context ([90e7c7c](https://github.com/Alwatr/alwatr/commit/90e7c7cfa30ade34a59a4162533818b53edfdf6e))
* **FSM:** enhance type definitions for context and improve context handling in FsmService ([f43906f](https://github.com/Alwatr/alwatr/commit/f43906f02e8accaa8c5264c274f990c52bc4492a))
* **FSM:** improve initial state execution and enhance error handling in effects ([72b08fd](https://github.com/Alwatr/alwatr/commit/72b08fd9aca563e7bbd04d8bc1ca104b8471572b))
* **FSM:** refine Assigner type to conditionally return Partial<TContext> or TContext based on context structure ([78f6d4a](https://github.com/Alwatr/alwatr/commit/78f6d4a969f2101029b3db0857199514c6fe6dc4))
* **FSM:** refine transition handling to differentiate between internal and external transitions ([0b73b9b](https://github.com/Alwatr/alwatr/commit/0b73b9bb9aab27d2c58c1380d6d612506893dd5c))
* **FSM:** replace 'condition' with 'guard' in transitions and update related documentation ([d31dd00](https://github.com/Alwatr/alwatr/commit/d31dd0037e88c8798b87a891339ec64226a3e73e))
* **FSM:** replace 'eventSignal.dispatch' with 'dispatch' method for event handling consistency ([82bc75d](https://github.com/Alwatr/alwatr/commit/82bc75d84998455dfbdb3132fe0ac81436d50eae))
* **FSM:** replace 'sendBack' with 'dispatch' for event handling consistency in actors and documentation ([10b91b1](https://github.com/Alwatr/alwatr/commit/10b91b1e857975cac0a60691660dcd0c92127e3b))
* **FSM:** set default type for TContext in createFsmService and FsmService ([93095c3](https://github.com/Alwatr/alwatr/commit/93095c337ba73491036451ea6aa748e574defdc5))
* **FSM:** update README for clarity on side-effects and remove event chaining tests ([5c9a9d0](https://github.com/Alwatr/alwatr/commit/5c9a9d093f2d310eb511fdbe6d3389747f0403f3))

### 🐛 Bug Fixes

* **FSM:** correct stateSignal property name in destroy method ([1c469e4](https://github.com/Alwatr/alwatr/commit/1c469e4fa7a021996968ab2706eb6b95b91c489d))
* **FSM:** refactor applyAssigners__ to use for-of loop for better readability and atomic updates ([392dbff](https://github.com/Alwatr/alwatr/commit/392dbff97c7b16655656f7f80a6ea82431b01186))
* **FSM:** refactor event subscription and improve context handling in applyAssigners__ ([19263eb](https://github.com/Alwatr/alwatr/commit/19263ebf3a07227ca1b86d11477012ac07c2a416))
* **FSM:** remove microtask scheduling comment from start_ method ([192c410](https://github.com/Alwatr/alwatr/commit/192c410804c4b94f84dca246676d54135a3883ee))
* **FSM:** update Assigner type to allow mutable context ([f7e44f2](https://github.com/Alwatr/alwatr/commit/f7e44f2a03c7fe330db7156f02a5067ed821b2c4))
* **FSM:** update assigners to include context in state transitions ([8314867](https://github.com/Alwatr/alwatr/commit/83148678513fd28ae0b2e3bfd1d34c33ea023f81))
* **FSM:** update assigners to maintain context in state transitions ([7623964](https://github.com/Alwatr/alwatr/commit/76239641591a410c111b90205b01bf222dc13eaf))
* **FSM:** update assigners to use complete context object and improve documentation ([39fb862](https://github.com/Alwatr/alwatr/commit/39fb862a3ee3b4840ece1a3e976d88e9b2e51e59))

### 🔨 Code Refactoring

* **FSM:** remove redundant initial state entry effects execution ([0257635](https://github.com/Alwatr/alwatr/commit/0257635307f321dd2cafbdf89c2b91afaa4dc38e))

### 🧹 Miscellaneous Chores

* **FSM:** comment out example usage in createFsmService for clarity ([5c85d10](https://github.com/Alwatr/alwatr/commit/5c85d10d3ca99b118e597e7d1dc415216f2bf859))

### 🔗 Dependencies update

* **FSM:** remove unnecessary dependency on @alwatr/delay from package.json ([184aa9f](https://github.com/Alwatr/alwatr/commit/184aa9f9d543e65a4d6176a941d454476ca087d4))

## [9.26.0](https://github.com/Alwatr/alwatr/compare/v9.25.0...v9.26.0) (2026-05-23)

**Note:** Version bump only for package @alwatr/fsm

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

**Note:** Version bump only for package @alwatr/fsm

## [9.24.0](https://github.com/Alwatr/alwatr/compare/v9.23.4...v9.24.0) (2026-05-14)

**Note:** Version bump only for package @alwatr/fsm

## [9.23.3](https://github.com/Alwatr/alwatr/compare/v9.23.2...v9.23.3) (2026-05-12)

**Note:** Version bump only for package @alwatr/fsm

## [9.23.2](https://github.com/Alwatr/alwatr/compare/v9.23.1...v9.23.2) (2026-05-07)

**Note:** Version bump only for package @alwatr/fsm

## [9.23.1](https://github.com/Alwatr/alwatr/compare/v9.23.0...v9.23.1) (2026-05-06)

**Note:** Version bump only for package @alwatr/fsm

## [9.20.1](https://github.com/Alwatr/alwatr/compare/v9.20.0...v9.20.1) (2026-04-30)

**Note:** Version bump only for package @alwatr/fsm

## [9.20.0](https://github.com/Alwatr/alwatr/compare/v9.19.1...v9.20.0) (2026-04-30)

**Note:** Version bump only for package @alwatr/fsm

## [9.16.0](https://github.com/Alwatr/alwatr/compare/v9.15.0...v9.16.0) (2026-04-27)

**Note:** Version bump only for package @alwatr/fsm

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* add type imports from @alwatr/type-helper across multiple packages ([9e44c20](https://github.com/Alwatr/alwatr/commit/9e44c20b724b91452848e4ca4344f16133573bcb))
* **tsconfig:** remove @alwatr/type-helper from types array across multiple packages ([09a2177](https://github.com/Alwatr/alwatr/commit/09a2177c0c22631287e896543a4052201d912224))

## [9.13.0](https://github.com/Alwatr/alwatr/compare/v9.12.0...v9.13.0) (2026-04-24)

**Note:** Version bump only for package @alwatr/fsm

## [9.12.0](https://github.com/Alwatr/alwatr/compare/v9.11.2...v9.12.0) (2026-04-23)

**Note:** Version bump only for package @alwatr/fsm

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/fsm

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

**Note:** Version bump only for package @alwatr/fsm

## [9.9.0](https://github.com/Alwatr/alwatr/compare/v9.8.0...v9.9.0) (2026-04-14)

**Note:** Version bump only for package @alwatr/fsm

## [9.7.0](https://github.com/Alwatr/alwatr/compare/v9.6.1...v9.7.0) (2026-04-14)

**Note:** Version bump only for package @alwatr/fsm

## [9.5.0](https://github.com/Alwatr/alwatr/compare/v9.4.5...v9.5.0) (2026-04-11)

**Note:** Version bump only for package @alwatr/fsm

## [9.4.5](https://github.com/Alwatr/alwatr/compare/v9.4.4...v9.4.5) (2026-04-11)

**Note:** Version bump only for package @alwatr/fsm

## [9.4.0](https://github.com/Alwatr/alwatr/compare/v9.3.0...v9.4.0) (2026-04-05)

**Note:** Version bump only for package @alwatr/fsm

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### 🔨 Code Refactoring

* update TypeScript configuration to extend from @alwatr/standard/tsconfig ([3e52ee2](https://github.com/Alwatr/alwatr/commit/3e52ee2152b4264ed994ec72610be5828fbdc6d2))

## [9.2.1](https://github.com/Alwatr/alwatr/compare/v9.2.0...v9.2.1) (2026-04-04)

**Note:** Version bump only for package @alwatr/fsm

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### 🐛 Bug Fixes

* **build:** change yarn to bun and change & to && ([b985835](https://github.com/Alwatr/alwatr/commit/b985835ec381b5db52a2116c2a63916e377706e6))

### 🔨 Code Refactoring

* class field define ([ae50a9f](https://github.com/Alwatr/alwatr/commit/ae50a9f753ac233b7b1a35a658f4ea186e2acd13))
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
* update logger imports to replace nanolib with nano-build across multiple files ([26a07af](https://github.com/Alwatr/alwatr/commit/26a07afe5fc8761a15ff12538f485a6757d75c74))
* update package.json and tsconfig.json across multiple packages to include @alwatr/type-helper and adjust types ([5635b9e](https://github.com/Alwatr/alwatr/commit/5635b9efeeb7fbb06f405e3ecdfa6ce4c431a1a2))
* update package.json exports to use default entry points with .js extension ([b151afc](https://github.com/Alwatr/alwatr/commit/b151afca85c89399a6a1731da91bb8c13b7aca86))
* update package.json scripts to use nano-build with src/main.ts and replace nanolib with nano-build in devDependencies ([8d13a39](https://github.com/Alwatr/alwatr/commit/8d13a394a1d0e2364693c2ae23446958adf05381))

## [6.2.0](https://github.com/Alwatr/flux/compare/v6.1.1...v6.2.0) (2026-02-18)

### 🔨 Code Refactoring

* migrate to bun package manager ([545c1ae](https://github.com/Alwatr/flux/commit/545c1ae31f04ece1ef1abd4db7237b47b65b0473))

### 🔗 Dependencies update

* update dependencies across packages to latest versions ([6ac0147](https://github.com/Alwatr/flux/commit/6ac01476b0803d662035d4c291bb5c77ae4207f6))

## [6.1.1](https://github.com/Alwatr/flux/compare/v6.1.0...v6.1.1) (2025-11-12)

### 🐛 Bug Fixes

* update defaultValue to initialValue in createFsmService for clarity ([f54c61c](https://github.com/Alwatr/flux/commit/f54c61c4c1a7d2f476f3cedd480a9c31a4eac29f))

### 🔗 Dependencies update

* update dependencies and devDependencies versions across packages ([ab923fa](https://github.com/Alwatr/flux/commit/ab923fa8ec7f504a3ce59e0ec944d05d361f60be))

## [6.1.0](https://github.com/Alwatr/flux/compare/v6.0.2...v6.1.0) (2025-09-22)

### ✨ Features

* enhance createFsmService to support persistent state signals ([9e46b3b](https://github.com/Alwatr/flux/commit/9e46b3b7da52df6b342b92a2468f0198c1d69c1e))

### 🐛 Bug Fixes

* update FsmService to use JsonObject for context and remove state signal creation ([5fbb6a6](https://github.com/Alwatr/flux/commit/5fbb6a662625bd4da9fa0d1428c5d683631c56f8))
* update storageKey handling in PersistentStateSignal and createFsmService for improved state management ([42e764f](https://github.com/Alwatr/flux/commit/42e764f58a2f804c6082a46bfb96eb678a49c22a))
* update type definitions to use JsonObject for context in MachineState, Assigner, Effect, Condition, Transition, and StateMachineConfig ([e07e991](https://github.com/Alwatr/flux/commit/e07e9914e944b35a08a1c079053675a66183644a))

### 🔗 Dependencies update

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

### ⚠ BREAKING CHANGES

* Complete rewrite of @alwatr/fsm package

Summary:
- The package has been fully rewritten: public API, types, internal behavior and lifecycle semantics have changed.
- Consumers must update imports and usage. Existing code written for the old API will not work without changes.

Example:
```ts
import {createFsmService} from '@alwatr/fsm';
const service = createFsmService({
  name: 'light-switch',
  initial: 'off',
  context: {brightness: 0},
  states: {
    off: {
      on: { TOGGLE: { target: 'on', actions: [() => ({brightness: 100})] } },
    },
    on: {
      on: {
        TOGGLE: { target: 'off', actions: [() => ({brightness: 0})] },
        SET_BRIGHTNESS: { actions: [(e) => ({brightness: e.level})] },
      },
    },
  },
});

const sub = service.stateSignal.subscribe((state) => {
  console.log(\`Light is \${state.name} brightness=\${state.context.brightness}\`);
});

service.eventSignal.dispatch({type: 'TOGGLE'});
// When done:
sub.unsubscribe?.();
service.destroy();
```

### ✨ Features

* add factory function for creating StateMachine instances ([d5afa79](https://github.com/Alwatr/flux/commit/d5afa79f323f4a20b9d9917861774dba3c18ba91))
* add type definitions for state machine events, states, and transitions ([cd5d770](https://github.com/Alwatr/flux/commit/cd5d770d2c5ca0ab462e27d2ac6a119e6816d82e))
* implement FsmService for managing finite state machines with event and state signals ([4fbc72a](https://github.com/Alwatr/flux/commit/4fbc72addbc4dc29b3deb1bb5c07e3fa5ad6e2e1))
* implement StateMachine class with state management and transition logic ([eca4208](https://github.com/Alwatr/flux/commit/eca4208c82932b736f284c7f28df79820c24986a))
* rewrite new state machine interfaces and types ([31885e5](https://github.com/Alwatr/flux/commit/31885e59dd5542ecffad971704cc20ae26ccca90))

### 🐛 Bug Fixes

* add documentation for eventSignal in FsmService class ([a11cb4a](https://github.com/Alwatr/flux/commit/a11cb4a8c005356832fab3a9924d4f75cc9cc8af))
* add logging to destroy method for better tracking of service cleanup ([6187d17](https://github.com/Alwatr/flux/commit/6187d17bb4765bae89b271f3dc6920cb69818fa6))
* allow void return type for Assigner function ([5e1ae6b](https://github.com/Alwatr/flux/commit/5e1ae6b4cd7e472f2928a7ad25c81d2b9d40e8b7))
* correct entry action execution to use target state context for improved accuracy ([cf16271](https://github.com/Alwatr/flux/commit/cf16271969f020fa502f1178459d44a9c8e74677))
* correct logger method names in processTransition and applyAssigners for consistency ([f33d553](https://github.com/Alwatr/flux/commit/f33d5533f9b296483f807779e3cb522d4313a876))
* correct stateSignal naming and improve documentation in FsmService class ([7d5b7fe](https://github.com/Alwatr/flux/commit/7d5b7feef54fbbd76fead7a2fa1a964d77ec0401))
* enhance applyAssigners logic for atomic updates and improved error handling ([988e00c](https://github.com/Alwatr/flux/commit/988e00cfe4be5974966d52235d2bf3a8f08e1d59))
* enhance applyAssigners logic to improve context updates and error handling ([73384c0](https://github.com/Alwatr/flux/commit/73384c04479c7398cea0504c0ea8a14b57b7a366))
* enhance executeEffects logic to improve error handling and logging ([8fe6bed](https://github.com/Alwatr/flux/commit/8fe6beda209ee75ab81bf2249fe1d0b25185a1cd))
* enhance FSM transition handling and logging for improved clarity and performance ([8695d99](https://github.com/Alwatr/flux/commit/8695d99910b5a1e0abc8603a5ea947d6f77d463b))
* enhance transition condition logging for better debugging and clarity ([e7cd799](https://github.com/Alwatr/flux/commit/e7cd79964ecfab3c8e9a9ff1d0b74eb4d2f09cbf))
* ensure proper cleanup of stateSignal in destroy method ([d90a0cf](https://github.com/Alwatr/flux/commit/d90a0cf3ae871f0db1832bdc92a61cb7b0567a65))
* ensure proper destruction of state signals in destroy method ([512221b](https://github.com/Alwatr/flux/commit/512221bc7a62b77392eb368b97e323bfd95a02fb))
* execute exit/entry effects only when state changes in FSM ([99a1d66](https://github.com/Alwatr/flux/commit/99a1d6653be5350867d7050cf59d18dd43966cb0))
* executeEffects__ context ([f1fde9b](https://github.com/Alwatr/flux/commit/f1fde9baccebd27ca76ae785643d60cd463aff97))
* fsm-service.ts run cond ([5c91967](https://github.com/Alwatr/flux/commit/5c91967b605e5529a8d3e9deb630808966d4f3aa))
* fsm-service.ts type ([239ea9b](https://github.com/Alwatr/flux/commit/239ea9b77b2cc3c41d14df426315381ce65f156d))
* improve context handling in applyAssigners__ method ([d3ac560](https://github.com/Alwatr/flux/commit/d3ac56007e18d744fea289d21f5f3518d8726794))
* improve processTransition logic and enhance logging in FsmService class ([434e6e1](https://github.com/Alwatr/flux/commit/434e6e10b9ee764830898d9c762afba2c893b9d9))
* move powerLostWarning action to flashingRed state entry ([441223d](https://github.com/Alwatr/flux/commit/441223d30d571b5fd244d7f50a1428c74fef39f0))
* refactor findTransition logic to improve condition evaluation and logging ([0a32c8d](https://github.com/Alwatr/flux/commit/0a32c8de6974f587404de6d39b8dd10ca20f0d0f))
* remove space in logger initialization for FsmService class ([d91065a](https://github.com/Alwatr/flux/commit/d91065aa08339f9a3075304e9b061672118f9525))
* rename transition.actions to transition.assigners for clarity ([1198b59](https://github.com/Alwatr/flux/commit/1198b597c5b326a4a8deb84c1503648a62d28a1c))
* reorder assigners property documentation for improved clarity ([019a9f0](https://github.com/Alwatr/flux/commit/019a9f0c56876f82e2dcb9c02aaa01ab8a6b2234))
* replace computed state signal with read-only state signal for improved performance ([76fac47](https://github.com/Alwatr/flux/commit/76fac47612a1e5566dcfd246b16823f93078c908))
* simplify assigner function in light machine config ([a479b5d](https://github.com/Alwatr/flux/commit/a479b5d6fb511409a1b66734b262fc5371d83d79))
* standardize light state logging messages for clarity ([a1a464a](https://github.com/Alwatr/flux/commit/a1a464a1588459de1a4e26c6bd933a00fb031b75))
* update Assigner and Effect types to support SingleOrArray for improved flexibility ([8e6e7ad](https://github.com/Alwatr/flux/commit/8e6e7ad10bfde1170904f3b2820810230af80241))
* update Assigner type definition to allow void return and change Transition type to array ([f43c993](https://github.com/Alwatr/flux/commit/f43c99369c993c5e252bdb6e47b177d46e86e18f))
* update entry actions to assigners for consistency in light machine configuration ([66f76c7](https://github.com/Alwatr/flux/commit/66f76c7627af9b096db4a2c4ab16fcbb79b81321))
* update package description for clarity and accuracy ([86c29fb](https://github.com/Alwatr/flux/commit/86c29fb38eeed2fe71f9b04f28a00231a1074d1f))
* update type definitions for MachineState, Assigner, Effect, and Transition interfaces ([79760f4](https://github.com/Alwatr/flux/commit/79760f4bf4df48685cb60af5fd20c9496130161c))

### 🔨 Code Refactoring

* enhance action and guard types for state transitions ([1fdfa1b](https://github.com/Alwatr/flux/commit/1fdfa1bb3e847b9e4d1051320a23701d29d243ca))
* migrate light switch implementation to JavaScript and enhance logging ([2f81bc0](https://github.com/Alwatr/flux/commit/2f81bc03b7ceda739e2204021ce40e0389f52e2a))
* migrate to createFsmService and enhance state management logging ([5209c4b](https://github.com/Alwatr/flux/commit/5209c4b0dfb6e5737c386a344f7bdbbca3c4c2dd))
* remove obsolete files and clean up state machine implementation ([921cb24](https://github.com/Alwatr/flux/commit/921cb24f363a635ad8e91523e49500780ffcbb9a))
* remove unused import and clean up exports in fsm module ([a6c6374](https://github.com/Alwatr/flux/commit/a6c63742ee5d3f7fc8042b51f0889978e0e709e6))
* replace signalId with name in StateMachine signal creation ([0ce2654](https://github.com/Alwatr/flux/commit/0ce2654b10b7c6dd6f519a62428cdfcac8fa3189))
* restructure state machine types for improved clarity and functionality ([7b21778](https://github.com/Alwatr/flux/commit/7b21778db22a3fcf5a855790708ee7576d257682))
* standardize signal naming and visibility in FsmService ([ddfae0f](https://github.com/Alwatr/flux/commit/ddfae0f62fa5355054cf43ca88a0e00f65dc0bb4))
* update createStateMachine to createFsmService with improved documentation and example ([cc73194](https://github.com/Alwatr/flux/commit/cc73194ec01ab570054e2dba877d8b6c2cd336c2))
* update exports in main.ts to include facade, state-machine, and types ([0796b4f](https://github.com/Alwatr/flux/commit/0796b4fd3281e42614eec8a79389e242592df5a4))
* update exports in main.ts to include fsm-service and type-old ([ddcf0be](https://github.com/Alwatr/flux/commit/ddcf0bef31958a93f0433f587184b88e75f2819f))
* update log message for new event from enter effect in processTransition method ([314e516](https://github.com/Alwatr/flux/commit/314e516745ffaaae0495fe96aea6bcd06d7e49d9))
* update type definitions and improve state machine configuration ([5d749ca](https://github.com/Alwatr/flux/commit/5d749ca5a4cec6065e91e87f203e0ea05392f6fb))

### 🧹 Miscellaneous Chores

* rollback old fsm ([b2e7f32](https://github.com/Alwatr/flux/commit/b2e7f323841443e30772874eeab52481025a4b1e))

### 🔗 Dependencies update

* update @alwatr/logger to version 6.0.2 and @types/node to version 22.18.6; upgrade esbuild and other dependencies ([95dfaba](https://github.com/Alwatr/flux/commit/95dfabab2a4d4ea2b0e42a70bee1f3e68a67bffc))
* update dependencies for logger, nano-build, type-helper, and node types ([23fe723](https://github.com/Alwatr/flux/commit/23fe7236ffa0bfd2551a6dfc52c23689ce4b036e))
* update package dependencies for improved compatibility and performance ([1e91063](https://github.com/Alwatr/flux/commit/1e9106343d01330089c33d9591969a66625a1e7b))

## [4.1.1](https://github.com/Alwatr/flux/compare/v4.1.0...v4.1.1) (2025-09-08)

### 🔗 Dependencies update

* update @alwatr/nanolib to version 6.0.2 across multiple packages ([2d18fb0](https://github.com/Alwatr/flux/commit/2d18fb0e7311321200b1ed37381308b1dacae4b2))

## [4.1.0](https://github.com/Alwatr/flux/compare/v4.0.5...v4.1.0) (2025-09-08)

### 🔨 Code Refactoring

* replace MaybePromise with Awaitable in action and listener callback types ([57d16b4](https://github.com/Alwatr/flux/commit/57d16b447fcbfdce46f9343395f6aa8b897af146))

### 🧹 Miscellaneous Chores

* remove Exir Studio sponsorship logo from README files ([df5d19c](https://github.com/Alwatr/flux/commit/df5d19cf9ff3ea723905b3f3bd4f874c42fdcdfc))
* remove unused types from tsconfig.json files across multiple packages ([eecabea](https://github.com/Alwatr/flux/commit/eecabea18710ff476011f7b439e9f838198e2fdf))
* update @alwatr/nanolib and devDependencies to latest versions ([50730ae](https://github.com/Alwatr/flux/commit/50730ae8ea26954e2fbed51feb1a7fa7e8d8e74d))
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

### Bug Fixes

* **fsm:** run postTransition__ in resetToInitialState_ and constructor ([00ca9c1](https://github.com/Alwatr/flux/commit/00ca9c156b4a75883bad3e7d1c8907d370fd2b71)) by @AliMD

### Code Refactoring

* **fsm:** update action naming conventions and enhance event handling in state transitions ([c3a4094](https://github.com/Alwatr/flux/commit/c3a40940c0a5dee11dbb0fbaaa45d811603e5ff7)) by @AliMD

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
* **fsm:** change the license to AGPL-3.0 ([babc4a8](https://github.com/Alwatr/flux/commit/babc4a82bd0421981ec40c150f0de262f0f81f42)) by @ArmanAsadian

### Dependencies update

* update ([fb148fd](https://github.com/Alwatr/flux/commit/fb148fdbe7f84acc3eda625e5e8c5773747d32e9)) by @

## [3.1.0](https://github.com/Alwatr/flux/compare/v3.0.3...v3.1.0) (2024-09-26)

### Features

* **fsm:** Add resetToInitialState() method ([86b2479](https://github.com/Alwatr/flux/commit/86b2479c0319b33c8108dfd0319b2c444dc5f6de)) by @AliMD

### Code Refactoring

* update action names in fetch-state-machine and fsm packages and remove `_` prefix ([a90d959](https://github.com/Alwatr/flux/commit/a90d95921b322a288c4a60671ce90ff9fe709c00)) by @AliMD

### Dependencies update

* bump @types/node in the development-dependencies group ([979223c](https://github.com/Alwatr/flux/commit/979223c3cdbb002a926e72e1a7f79c82ff7395d4)) by @dependabot[bot]

## [3.0.3](https://github.com/Alwatr/flux/compare/v3.0.2...v3.0.3) (2024-09-24)

**Note:** Version bump only for package @alwatr/fsm

## [3.0.2](https://github.com/Alwatr/flux/compare/v3.0.1...v3.0.2) (2024-09-21)

### Dependencies update

* update ([1048410](https://github.com/Alwatr/flux/commit/1048410efb300bb0a0ab7eae9734ca8f7f9d83a8)) by @

## [3.0.1](https://github.com/Alwatr/flux/compare/v3.0.0...v3.0.1) (2024-09-17)

**Note:** Version bump only for package @alwatr/fsm

## 3.0.0 (2024-09-17)

### ⚠ BREAKING CHANGES

* **fsm:** FiniteStateMachineBase state property renamed to message data structure

### Features

* update all repo files from alwatr ([b85a3a6](https://github.com/Alwatr/flux/commit/b85a3a62a8c19f395cf33d72329b9c0f301cddfc)) by @AliMD

### Bug Fixes

* all new repo path and packages dependencies ([21a6afa](https://github.com/Alwatr/flux/commit/21a6afa0badafe4051617d9a9e3bbfbaabd0c4ad)) by @
* cleanup old signal and fsm v1 ([bde0bea](https://github.com/Alwatr/flux/commit/bde0bea06a6750bebad49a127b75b57fd5e55ddd)) by @
* **fsm:** compatible with new logger api ([77db656](https://github.com/Alwatr/flux/commit/77db656d8b261da29376cf6dba7b9d4c35deeae8)) by @
* **fsm:** import issue ([9674f34](https://github.com/Alwatr/flux/commit/9674f34a7c63137fb9597d2b465b4fb123c963c1)) by @
* ts refrence path ([c2baa44](https://github.com/Alwatr/flux/commit/c2baa44999c72a0015481fc8fea25439329c3f37)) by @

### Code Refactoring

* **fsm:** rename main ([60a52bd](https://github.com/Alwatr/flux/commit/60a52bdc1e5ae3126226a9518d81f3c8dbf238dc)) by @AliMD
* **fsm:** Update FiniteStateMachineBase class ([27a29ca](https://github.com/Alwatr/flux/commit/27a29ca45fb2c7998760ce2177a386c7085011f9)) by @AliMD
* **fsm:** Update FiniteStateMachineBase class to use class property for state and transition methods ([647a921](https://github.com/Alwatr/flux/commit/647a921dab405b5545aecdb66f5d1d44490795d4)) by @AliMD
* **fsm:** Update FiniteStateMachineBase state property to message ([be1ca78](https://github.com/Alwatr/flux/commit/be1ca7897b8ada4b44576c2eaf9f38f3c2903668)) by @AliMD
* **fsm:** Update import statement for type.ts ([6091385](https://github.com/Alwatr/flux/commit/6091385ae7a4c4d92aa74effe6446c8e3a7606e9)) by @AliMD
* Remove unused dependencies from @alwatr/fsm package ([da58900](https://github.com/Alwatr/flux/commit/da5890009c9ddea4f45949eef5a372dd3784ea7a)) by @AliMD
* Rename fetch-state-machine.ts base class name ([ab88730](https://github.com/Alwatr/flux/commit/ab88730b46b2db0baeaca09e3de8e51c55b1e361)) by @AliMD
* Update @alwatr/fsm package and add @alwatr/observable package ([d78b177](https://github.com/Alwatr/flux/commit/d78b1774978632d66c6831c8a46626f524746e81)) by @AliMD
* Update @alwatr/polyfill-has-own dependency to version ^1.0.9 in fsm package.json ([f1c82a6](https://github.com/Alwatr/flux/commit/f1c82a6d330c3f1bfbf435a00a52e92f0541b024)) by @AliMD
* Update all package URLs to point to the flux repository ([e7e56d2](https://github.com/Alwatr/flux/commit/e7e56d252d4a0e1b4b1fa20c06e8b61b1b7242ae)) by @AliMD
* Update AlwatrContext constructor to use AlwatrObservableConfig ([a8c75c6](https://github.com/Alwatr/flux/commit/a8c75c6f937419e628a0b11b053e0028c731bcaf)) by @AliMD
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
* **fsm:** rename fsm2 ([f10fea0](https://github.com/Alwatr/flux/commit/f10fea017f75c3a26a26319b14284e8ee4bc605d)) by @
* rename core to packages ([9158c8e](https://github.com/Alwatr/flux/commit/9158c8e4c679d96c9b54e91ea6faa49364d47494)) by @
* update changelogs ([a965ecd](https://github.com/Alwatr/flux/commit/a965ecd095cb621b4a7748d2e048f4a82b0aa872)) by @
* **yarn:** pnp mode ([02bd406](https://github.com/Alwatr/flux/commit/02bd4064e381c483e31a8acbe7c72e7aed3e62b3)) by @

### Dependencies update

* bump the alwatr-dependencies group with 6 updates ([4470fd8](https://github.com/Alwatr/flux/commit/4470fd8be49e1a73c17bdd5a09127b9f3a67b3bb)) by @dependabot[bot]
* up ([c1d2c22](https://github.com/Alwatr/flux/commit/c1d2c229984dc71136498dab4682da5da233fe28)) by @
* update ([0128365](https://github.com/Alwatr/flux/commit/01283652b0798243aaac9643c5024e7856af169c)) by @AliMD
* update ([e8f8281](https://github.com/Alwatr/flux/commit/e8f8281beb24988466c6e29f724a963118870933)) by @AliMD

## [2.0.5](https://github.com/Alwatr/flux/compare/@alwatr/fsm@2.0.4...@alwatr/fsm@2.0.5) (2023-12-19)

**Note:** Version bump only for package @alwatr/fsm

## [2.0.4](https://github.com/Alwatr/flux/compare/@alwatr/fsm@2.0.2...@alwatr/fsm@2.0.4) (2023-12-19)

**Note:** Version bump only for package @alwatr/fsm

## [2.0.3](https://github.com/Alwatr/flux/compare/@alwatr/fsm@2.0.2...@alwatr/fsm@2.0.3) (2023-11-09)

**Note:** Version bump only for package @alwatr/fsm

## [2.0.2](https://github.com/Alwatr/flux/compare/@alwatr/fsm@2.0.1...@alwatr/fsm@2.0.2) (2023-11-01)

**Note:** Version bump only for package @alwatr/fsm

## [2.0.1](https://github.com/Alwatr/flux/compare/@alwatr/fsm@2.0.0...@alwatr/fsm@2.0.1) (2023-10-23)

### Bug Fixes

- **fsm:** compatible with new logger api ([77db656](https://github.com/Alwatr/flux/commit/77db656d8b261da29376cf6dba7b9d4c35deeae8)) by @

# 2.0.0 (2023-09-19)

### Bug Fixes

- all new repo path and packages dependencies ([21a6afa](https://github.com/Alwatr/flux/commit/21a6afa0badafe4051617d9a9e3bbfbaabd0c4ad)) by @AliMD
- cleanup old signal and fsm v1 ([bde0bea](https://github.com/Alwatr/flux/commit/bde0bea06a6750bebad49a127b75b57fd5e55ddd)) by @AliMD
- **fsm:** import issue ([9674f34](https://github.com/Alwatr/flux/commit/9674f34a7c63137fb9597d2b465b4fb123c963c1)) by @AliMD
- ts refrence path ([c2baa44](https://github.com/Alwatr/flux/commit/c2baa44999c72a0015481fc8fea25439329c3f37)) by @AliMD

## [1.1.2](https://github.com/Alwatr/flux/compare/@alwatr/fsm@1.1.1...@alwatr/fsm@1.1.2) (2023-09-12)

**Note:** Version bump only for package @alwatr/fsm

## [1.1.1](https://github.com/Alwatr/flux/compare/@alwatr/fsm@1.1.0...@alwatr/fsm@1.1.1) (2023-09-12)

**Note:** Version bump only for package @alwatr/fsm

# 1.1.0 (2023-09-12)

# 1.0.0 (2023-06-14)

# 0.32.0 (2023-05-27)

# 0.31.0 (2023-05-08)

### Bug Fixes

- **fms:** import path ([f6770a0](https://github.com/Alwatr/flux/commit/f6770a07fdf6855ccd63a85822d44d5ef9c72dee))
- **fsm:** action maybe async ([50efffa](https://github.com/Alwatr/flux/commit/50efffa34a2ea5a3515561d7425da0c109631f36))
- **fsm:** autoSignalUnsubscribe type ([f7db30b](https://github.com/Alwatr/flux/commit/f7db30bf5a90ff3d163f036b313a412a5149ff2b))
- **fsm:** call render states function in there own this ([a950478](https://github.com/Alwatr/flux/commit/a95047811366e375785b2cd8fb176b1176638cab))
- **fsm:** fix order of `initFsmInstance` args ([3b60138](https://github.com/Alwatr/flux/commit/3b60138ecebcbcb4d732e4d1a3e79f5b8661ae47))
- **fsm:** initial exec actions ([e7dd5c8](https://github.com/Alwatr/flux/commit/e7dd5c8aaf9760c9856e4392cc899020f7e796d9))
- **fsm:** last reported bugs in set state ([e7435c8](https://github.com/Alwatr/flux/commit/e7435c870a054b0ec3e4004f13c6db7610610be0))
- **fsm:** review reset process ([af6e81c](https://github.com/Alwatr/flux/commit/af6e81c068b467d8b3aa96f2431e13ac479f018c))
- **fsm:** run init entry actions ([777ae45](https://github.com/Alwatr/flux/commit/777ae459f2b77f79696daf3a0ca355d6d78e57d3))
- new logger api ([9d83a7d](https://github.com/Alwatr/flux/commit/9d83a7dc5c103bc3bb4282dacfd85fa998915300))

### Features

- **fsm:** add `signalRecord` to config ([1a35291](https://github.com/Alwatr/flux/commit/1a352915fba978da141513517655d1e07350c3ec))
- **fsm:** add unsubscribe ([85ed3c3](https://github.com/Alwatr/flux/commit/85ed3c3439e1f40c2760f6011df112242f10be06))
- **fsm:** callback in provider signals ([772818b](https://github.com/Alwatr/flux/commit/772818baa7953b6fbb4d4128fcee76733f42cc2d))
- **fsm:** custom signal callback ([47c22e9](https://github.com/Alwatr/flux/commit/47c22e92a8a8085148b44b316d649b695ff8071a))
- **fsm:** destroy and expire api ([e1a1c15](https://github.com/Alwatr/flux/commit/e1a1c150d81f4428718bd18f039235c7fce9caf2))
- **fsm:** new types ([2866e3b](https://github.com/Alwatr/flux/commit/2866e3bd5ff56fd2b5bddcaed3673a5868bae4bb))
- **fsm:** rewrite state machine ([7f24695](https://github.com/Alwatr/flux/commit/7f246959e5a80b21c1c4b21e895e75f8fbe56798))
- **fsm:** subscribe ([2af4f44](https://github.com/Alwatr/flux/commit/2af4f44f0e8a2dee39cde10dcaa3281075632e6a))

# 0.30.0 (2023-03-06)

### Bug Fixes

- **fsm:** every signal mather ([0dc504d](https://github.com/Alwatr/flux/commit/0dc504dacbb1ec68f154244619d644ff8e43cc04))
- **fsm:** remove additional import ([231337b](https://github.com/Alwatr/flux/commit/231337b95ee7b046fe35429f50931ddf85be291f))
- **fsm:** update context in transition bug ([28a21d0](https://github.com/Alwatr/flux/commit/28a21d00d903b6189d814303c72ba6e784852f33))

### Features

- Alwatr Finite State Machines ([d5900b4](https://github.com/Alwatr/flux/commit/d5900b4ee8685b120188888871405853f5a69417))
- **fsm:** $all and $self state ([69adf41](https://github.com/Alwatr/flux/commit/69adf41064ca0f55497484c50e298ebc26c42dcc))
- **fsm:** enhance types ([3b13046](https://github.com/Alwatr/flux/commit/3b130463a102f59c38603b0de470be5c87ee88c9))
- **fsm:** make simple state machine ([ff9ae1c](https://github.com/Alwatr/flux/commit/ff9ae1ca04156e8b811899ff0f62480e1c37af72))
- **fsm:** new state context type with {to, from, by} ([11423e6](https://github.com/Alwatr/flux/commit/11423e6a89159b92e82cfd1e774ad37983581090))
- **fsm:** rewrite with signal power ([01a1651](https://github.com/Alwatr/flux/commit/01a1651e231a817d5eebb54cf84d51d620bfd6e8))
- **fsm:** share state events ([de42522](https://github.com/Alwatr/flux/commit/de42522a97fdf6be8bee73d91a35820e2a5e6efb))
- **fsm:** transition with partial context set ([823377e](https://github.com/Alwatr/flux/commit/823377e65028ea3e713f060ae678776c609c1661))

# [1.0.0](https://github.com/Alwatr/flux/compare/v0.32.0...v1.0.0) (2023-06-14)

**Note:** Version bump only for package @alwatr/fsm

# [0.32.0](https://github.com/Alwatr/flux/compare/v0.31.0...v0.32.0) (2023-05-27)

**Note:** Version bump only for package @alwatr/fsm

# [0.31.0](https://github.com/Alwatr/flux/compare/v0.30.0...v0.31.0) (2023-05-08)

### Bug Fixes

- **fms:** import path ([f6770a0](https://github.com/Alwatr/flux/commit/f6770a07fdf6855ccd63a85822d44d5ef9c72dee))
- **fsm:** action maybe async ([50efffa](https://github.com/Alwatr/flux/commit/50efffa34a2ea5a3515561d7425da0c109631f36))
- **fsm:** autoSignalUnsubscribe type ([f7db30b](https://github.com/Alwatr/flux/commit/f7db30bf5a90ff3d163f036b313a412a5149ff2b))
- **fsm:** call render states function in there own this ([a950478](https://github.com/Alwatr/flux/commit/a95047811366e375785b2cd8fb176b1176638cab))
- **fsm:** fix order of `initFsmInstance` args ([3b60138](https://github.com/Alwatr/flux/commit/3b60138ecebcbcb4d732e4d1a3e79f5b8661ae47))
- **fsm:** initial exec actions ([e7dd5c8](https://github.com/Alwatr/flux/commit/e7dd5c8aaf9760c9856e4392cc899020f7e796d9))
- **fsm:** last reported bugs in set state ([e7435c8](https://github.com/Alwatr/flux/commit/e7435c870a054b0ec3e4004f13c6db7610610be0))
- **fsm:** review reset process ([af6e81c](https://github.com/Alwatr/flux/commit/af6e81c068b467d8b3aa96f2431e13ac479f018c))
- **fsm:** run init entry actions ([777ae45](https://github.com/Alwatr/flux/commit/777ae459f2b77f79696daf3a0ca355d6d78e57d3))
- new logger api ([9d83a7d](https://github.com/Alwatr/flux/commit/9d83a7dc5c103bc3bb4282dacfd85fa998915300))

### Features

- **fsm:** add `signalRecord` to config ([1a35291](https://github.com/Alwatr/flux/commit/1a352915fba978da141513517655d1e07350c3ec))
- **fsm:** add unsubscribe ([85ed3c3](https://github.com/Alwatr/flux/commit/85ed3c3439e1f40c2760f6011df112242f10be06))
- **fsm:** callback in provider signals ([772818b](https://github.com/Alwatr/flux/commit/772818baa7953b6fbb4d4128fcee76733f42cc2d))
- **fsm:** custom signal callback ([47c22e9](https://github.com/Alwatr/flux/commit/47c22e92a8a8085148b44b316d649b695ff8071a))
- **fsm:** destroy and expire api ([e1a1c15](https://github.com/Alwatr/flux/commit/e1a1c150d81f4428718bd18f039235c7fce9caf2))
- **fsm:** new types ([2866e3b](https://github.com/Alwatr/flux/commit/2866e3bd5ff56fd2b5bddcaed3673a5868bae4bb))
- **fsm:** rewrite state machine ([7f24695](https://github.com/Alwatr/flux/commit/7f246959e5a80b21c1c4b21e895e75f8fbe56798))
- **fsm:** subscribe ([2af4f44](https://github.com/Alwatr/flux/commit/2af4f44f0e8a2dee39cde10dcaa3281075632e6a))

# [0.30.0](https://github.com/Alwatr/flux/compare/v0.29.0...v0.30.0) (2023-03-06)

### Bug Fixes

- **fsm:** every signal mather ([0dc504d](https://github.com/Alwatr/flux/commit/0dc504dacbb1ec68f154244619d644ff8e43cc04))
- **fsm:** remove additional import ([231337b](https://github.com/Alwatr/flux/commit/231337b95ee7b046fe35429f50931ddf85be291f))
- **fsm:** update context in transition bug ([28a21d0](https://github.com/Alwatr/flux/commit/28a21d00d903b6189d814303c72ba6e784852f33))

### Features

- Alwatr Finite State Machines ([d5900b4](https://github.com/Alwatr/flux/commit/d5900b4ee8685b120188888871405853f5a69417))
- **fsm:** $all and $self state ([69adf41](https://github.com/Alwatr/flux/commit/69adf41064ca0f55497484c50e298ebc26c42dcc))
- **fsm:** enhance types ([3b13046](https://github.com/Alwatr/flux/commit/3b130463a102f59c38603b0de470be5c87ee88c9))
- **fsm:** make simple state machine ([ff9ae1c](https://github.com/Alwatr/flux/commit/ff9ae1ca04156e8b811899ff0f62480e1c37af72))
- **fsm:** new state context type with {to, from, by} ([11423e6](https://github.com/Alwatr/flux/commit/11423e6a89159b92e82cfd1e774ad37983581090))
- **fsm:** rewrite with signal power ([01a1651](https://github.com/Alwatr/flux/commit/01a1651e231a817d5eebb54cf84d51d620bfd6e8))
- **fsm:** share state events ([de42522](https://github.com/Alwatr/flux/commit/de42522a97fdf6be8bee73d91a35820e2a5e6efb))
- **fsm:** transition with partial context set ([823377e](https://github.com/Alwatr/flux/commit/823377e65028ea3e713f060ae678776c609c1661))
