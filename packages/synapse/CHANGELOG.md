# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
