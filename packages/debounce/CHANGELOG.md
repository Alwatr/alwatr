# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.1.5...@alwatr/debounce@1.1.6) (2025-09-21)

**Note:** Version bump only for package @alwatr/debounce

## [1.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.1.4...@alwatr/debounce@1.1.5) (2025-09-20)

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [1.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.1.3...@alwatr/debounce@1.1.4) (2025-09-20)

### 🐛 Bug Fixes

* bind flush method in Debouncer constructor for proper context handling ([bdbeaed](https://github.com/Alwatr/nanolib/commit/bdbeaeddb2492da65476c374e9707e335cc39726))

## [1.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.1.2...@alwatr/debounce@1.1.3) (2025-09-19)

**Note:** Version bump only for package @alwatr/debounce

## [1.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.1.1...@alwatr/debounce@1.1.2) (2025-09-15)

**Note:** Version bump only for package @alwatr/debounce

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.1.0...@alwatr/debounce@1.1.1) (2025-09-15)

### 🐛 Bug Fixes

* bind flush method correctly in Debouncer and improve readability of invoke logic ([5ddb12c](https://github.com/Alwatr/nanolib/commit/5ddb12c7d5d6040edad0f37ae79b3f725481d1f7))

## [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.0.1...@alwatr/debounce@1.1.0) (2025-09-14)

### ✨ Features

* add maxWait option to Debouncer for guaranteed execution ([a305a6e](https://github.com/Alwatr/nanolib/commit/a305a6e82f96feebe2e895cdd35676da0f8b79f6))

### 🐛 Bug Fixes

* bind flush method in constructor for correct context ([671315c](https://github.com/Alwatr/nanolib/commit/671315cdadab448df660ae53c973eb71d4124699))

### 🔨 Code Refactoring

* add missing type import for DebouncerConfig ([d0c5808](https://github.com/Alwatr/nanolib/commit/d0c5808f2b6eb6fe856f8a38f5a79d2c427cf928))
* improve trigger logic and clean up documentation comments ([cce9162](https://github.com/Alwatr/nanolib/commit/cce9162f2ee1c1fa2978ba04cd1be2eac5302b9e))
* simplify trailing call logic and ensure lastArgs are cleared after invocation ([e8f74da](https://github.com/Alwatr/nanolib/commit/e8f74da9660c0c44d2704eb863bb082bce9a5978))
* streamline invoke logic and restore createDebouncer function ([9bdc412](https://github.com/Alwatr/nanolib/commit/9bdc4124cdea3b267c040ec770a002ed64a814ac))

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.0.0...@alwatr/debounce@1.0.1) (2025-09-14)

### 🔨 Code Refactoring

* **debounce:** rename 'callback' to 'func' for consistency in API ([df7ede1](https://github.com/Alwatr/nanolib/commit/df7ede1a78109831cca22389bd2d69df2e0ae366))

## [1.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/debounce@1.0.0-rc.0...@alwatr/debounce@1.0.0) (2025-09-14)

### 🔨 Code Refactoring

* **package:** update keywords in package.json for debounce, local-storage, and synapse packages ([09c9cca](https://github.com/Alwatr/nanolib/commit/09c9cca3cd600e9ffaf600fb1926c0ee884a1aa8))

## 1.0.0-rc.0 (2025-09-13)

### ✨ Features

* add debounce package with initial implementation and configuration files ([6293660](https://github.com/Alwatr/nanolib/commit/62936605c246c825f15178b68ac22ee474b95cf5))

### 🔨 Code Refactoring

* update Debouncer class and configuration interface for improved type safety and clarity ([f064a98](https://github.com/Alwatr/nanolib/commit/f064a98dfce1a7e997badac3002f02a16dffc57e))

### 🔗 Dependencies update

* update @types/node version to ^22.18.3 in multiple package.json files ([13db6fc](https://github.com/Alwatr/nanolib/commit/13db6fc176bc6cdcefedc50d77ac550bd5052c9a))
