# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.33.1](https://github.com/Alwatr/alwatr/compare/v9.33.0...v9.33.1) (2026-06-10)

### 🐛 Bug Fixes

* standardize formatting and improve descriptions across multiple packages ([24f22e4](https://github.com/Alwatr/alwatr/commit/24f22e451cf3a1edb891943ef179cc18192079bf))

### 🔨 Code Refactoring

* **nano-build:** rename __dev_mode__ to DEV_MODE for consistency in CLI and documentation ([a7de366](https://github.com/Alwatr/alwatr/commit/a7de366ed9fe26f8a54898bbd9caf00fbfb3d5f8))

## [9.25.0](https://github.com/Alwatr/alwatr/compare/v9.24.0...v9.25.0) (2026-05-21)

### ✨ Features

* add '--root=src' argument for module and module-web presets ([b5fa461](https://github.com/Alwatr/alwatr/commit/b5fa461d733aabb1176a2e307704ed164e60a824))

## [9.14.0](https://github.com/Alwatr/alwatr/compare/v9.13.0...v9.14.0) (2026-04-25)

### 🔨 Code Refactoring

* **global.d.ts:** update declaration syntax for compile-time constants ([d3b979e](https://github.com/Alwatr/alwatr/commit/d3b979eaedef0a797dd17367dac868f396dc211a))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

### 🐛 Bug Fixes

* **cli:** add missing --env=disable argument to default args ([766456b](https://github.com/Alwatr/alwatr/commit/766456ba476a583f1e897b6557a6a27bd7cfb74f))

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

### ✨ Features

* **nano-build:** add module-web preset for ESM browser builds ([3241561](https://github.com/Alwatr/alwatr/commit/3241561dfa461454ccb81427aa77794150cf2852))

## [9.3.0](https://github.com/Alwatr/alwatr/compare/v9.2.1...v9.3.0) (2026-04-04)

### ✨ Features

* **nano-build:** auto-configure --packages with preset defaults ([955f9f2](https://github.com/Alwatr/alwatr/commit/955f9f25578d76da32b4c62075bd8af19a7f2380))

## [9.1.1](https://github.com/Alwatr/alwatr/compare/v9.1.0...v9.1.1) (2026-04-01)

### 🧹 Miscellaneous Chores

* update homepage URLs to point to the 'next' branch for all package.json files ([04ec2cb](https://github.com/Alwatr/alwatr/commit/04ec2cb42b22d326afeb6681d3587b4f700096a8))

## [9.1.0](https://github.com/Alwatr/alwatr/compare/v5.0.0...v9.1.0) (2026-04-01)

### 🐛 Bug Fixes

* correct argument formatting for build presets in cli.sh ([c604455](https://github.com/Alwatr/alwatr/commit/c60445546e96801c7acc714c4bb8c7fd27cacd19))
* remove redundant export for global.d.ts in package.json ([125f0da](https://github.com/Alwatr/alwatr/commit/125f0da3c0099684df18fb5687285dc1eca1d2e7))
* remove unnecessary sed formatting from build arguments output ([1cde8fb](https://github.com/Alwatr/alwatr/commit/1cde8fb12fa56ed3d8c30396f9267bc72e0f80a1))

### 🔨 Code Refactoring

* add `--debug` option for streamline development mode handling and enhance debugging ([0e7d40d](https://github.com/Alwatr/alwatr/commit/0e7d40d8b6d6fc1eca8148af851b110a022bbf83))
* reorganize fields in package.json files across multiple packages ([6a0e28f](https://github.com/Alwatr/alwatr/commit/6a0e28f6f43dc816232d6c4f7f4fe2d68993dd29))

### 🧹 Miscellaneous Chores

* rename all pageckage inside pkg/nanolib ([8584300](https://github.com/Alwatr/alwatr/commit/85843005c3c34bdf391a718cacaf5d6eb9786fe7))
* reorder fields in all package.json ([8c7c2e7](https://github.com/Alwatr/alwatr/commit/8c7c2e7585ff0b62b2d11b5056ba08bca305b3e2))
* standardize 'files' field in all package.json files ([348d925](https://github.com/Alwatr/alwatr/commit/348d925d29febe3834e0037e014b0a2eea3b15b7))
* standardize all package.json files ([5a331ff](https://github.com/Alwatr/alwatr/commit/5a331ffe1751ed0cab66ccfd2f49af4bfe0fa2ba))
* standardize package.json exports to ESM-only ([2deab42](https://github.com/Alwatr/alwatr/commit/2deab422f3285146a1111e97462487e1cc10b214))

## [7.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@7.0.0...@alwatr/nano-build@7.0.1) (2026-03-27)

### 🧹 Miscellaneous Chores

* add .syncpackrc configuration file and reorganize all package.json fields ([5ac13b6](https://github.com/Alwatr/nanolib/commit/5ac13b6c74710279f64d99ace5fb781b0862389e))

## [7.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.4.2...@alwatr/nano-build@7.0.0) (2026-03-19)

### ⚠ BREAKING CHANGES

* Complete rewrite from Node.js to Bun with shell script wrapper

This is a major rewrite introducing fundamental changes to how nano-build works:

## 🔄 Implementation Changes

- **Removed**: Node.js CommonJS CLI (`cli.cjs`) - No longer provides Node.js executable
- **Added**: Bash shell script CLI (`cli.sh`) - Pure shell wrapper around `bun build`
- **Removed dependency**: esbuild - Now uses Bun's built-in bundler instead
- **Removed dependencies**: typescript, @types/node, @alwatr/tsconfig-base, @alwatr/type-helper
- **Removed**: TypeScript type definitions (global.d.ts no longer exported)

## 🚀 Runtime Requirements

**Before (v6):**

- Required: Node.js
- Optional: Bun

**After (v7):**

- Required: Bun
- Not compatible: Node.js-only environments

## 📦 Dependencies Changed

**Removed:**

- `esbuild` (core dependency)
- `@alwatr/type-helper` (dev)
- `@alwatr/tsconfig-base` (dev)
- `@types/node` (dev)
- `typescript` (dev)

## 🎯 Preset Changes

**Removed presets:**

- `default`
- `module2`, `module3` (multi-entry variants removed)
- `pwa` (use `web` preset instead)
- `pmpa` (use `web` preset instead)
- `weaver` (use `web` preset instead)
- `microservice` (use `node-service` or `bun-service` instead)

**New presets:**

- `module` - Single ESM module for Node.js (replaces old `module` with simplified options)
- `web` - Browser bundles (replaces `pwa`, `pmpa`, `weaver`)
- `node-service` - Bundled Node.js backend services
- `bun-service` - Bundled Bun backend services

## ⚙️ CLI Changes

**Before:**

```bash
bun run build              # Uses Node.js runtime
nano-build --preset=module src/main.ts # Direct Node.js CLI execution
```

**After:**

```bash
nano-build --preset=module src/main.ts # Uses bash script wrapper
nano-build --preset=module src/*.ts    # Multi-entry build
```

**New requirements:**

- `bun` must be installed and in PATH
- Shell environment required (bash)

## 🔍 Migration Guide

### For library modules (v6 → v7)

```bash
# Before
npm run build  # via node cli.cjs with preset=module + explicit entrypoint

# After
npm run build  # via bash cli.sh with preset=module + explicit entrypoint
```

### For web projects (v6 → v7)

```bash
# Before
nano-build --preset=pwa src/main.ts

# After
nano-build --preset=web src/main.ts
```

### For services (v6 → v7)

```bash
# Before
nano-build --preset=microservice src/main.ts

# After
nano-build --preset=node-service src/main.ts    # For Node.js
# or
nano-build --preset=bun-service src/main.ts     # For Bun
```

## ✅ Upgrade Checklist

- [ ] Ensure Bun is installed: `curl -fsSL https://bun.sh/install | bash`
- [ ] Update npm/yarn scripts to use new presets
- [ ] Test builds with `bun run build`
- [ ] Test production builds with `NODE_ENV=production bun run build`
- [ ] Update CI/CD pipelines to use Bun instead of Node.js

## Version

Updates: v6.4.2 → v7.0.0-rc

For Node.js/esbuild compatibility, users should remain on v6.x.

### ✨ Features

* rewrite nano-build as bun-based shell CLI ([a66712c](https://github.com/Alwatr/nanolib/commit/a66712c40ed365172b87bac11dd7ac07742c3dc1))

### 🐛 Bug Fixes

* update package name and version extraction in cli.sh for consistency ([fc24985](https://github.com/Alwatr/nanolib/commit/fc249851d0eb209a2dc3e7077e728648cb3e1dc1))

### 🧹 Miscellaneous Chores

* remove unnecessary whitespace in package.json files across multiple packages ([d0cc5c8](https://github.com/Alwatr/nanolib/commit/d0cc5c8eb7b958498d82ad4a009dffb95db572bd))
* revert version to 6.4.2 in package.json ([3d483c6](https://github.com/Alwatr/nanolib/commit/3d483c667f0595eb09ecefce936da6075f96dddb))

### 🔗 Dependencies update

* remove unnecessary dependencies and prettier configuration from package.json ([22798ad](https://github.com/Alwatr/nanolib/commit/22798ad9ebffc1352693e526661c06b94d9dcc2a))

## [6.4.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.4.1...@alwatr/nano-build@6.4.2) (2026-03-16)

### 🐛 Bug Fixes

* remove debug statement from banner in default build options ([058c09e](https://github.com/Alwatr/nanolib/commit/058c09ee0cdcf8455df70a96dd6e84e7cee369e4))

### 🔗 Dependencies update

* bump the npm-dependencies group with 10 updates ([c48d9ba](https://github.com/Alwatr/nanolib/commit/c48d9baa1cd7c2dc144b3e01e0fda60bf87c074c))

## [6.4.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.4.0...@alwatr/nano-build@6.4.1) (2026-02-18)

### 🐛 Bug Fixes

* update esbuild to version 0.27.3 ([447c68c](https://github.com/Alwatr/nanolib/commit/447c68c56c598c1cc1e3e4a864f1bfe27d42b7d8))

### 🔗 Dependencies update

* update @types/node to version 24.10.13 across multiple packages ([4c6d2a3](https://github.com/Alwatr/nanolib/commit/4c6d2a37ab26b1c86812b2aa38b2eca4ee097cb6))

## [6.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.11...@alwatr/nano-build@6.4.0) (2025-12-23)

### ✨ Features

* update browser target versions in presetRecord for better compatibility ([f985c88](https://github.com/Alwatr/nanolib/commit/f985c885329b309b39ebbb41e409553bc5bdbdfa))
* update esbuild dependency version to ^0.27.2 for improved stability ([649f7e5](https://github.com/Alwatr/nanolib/commit/649f7e58097ddcb86199970157ffb0341dcb367a))

### 🔗 Dependencies update

* upgrade @types/node to version 24.10.4 and update related dependencies ([acf04df](https://github.com/Alwatr/nanolib/commit/acf04df71647f5a401ef5e6bbfffcc478e4326d2))

## [6.3.11](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.10...@alwatr/nano-build@6.3.11) (2025-12-13)

### 🐛 Bug Fixes

* update core esbuild to v0.27.1 ([0277bbe](https://github.com/Alwatr/nanolib/commit/0277bbe435f0945774667149d91b930b034ab846))

### 🔗 Dependencies update

* update `@types/node` and `[@lerna-lite](https://github.com/lerna-lite)` dependencies. ([8daa8fd](https://github.com/Alwatr/nanolib/commit/8daa8fd023d5414c9f95feb4319353c6ea34be31))

## [6.3.10](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.9...@alwatr/nano-build@6.3.10) (2025-12-10)

### 🔗 Dependencies update

* Upgrade lerna-lite, prettier, types/node, and yarn dependencies. ([42a7fca](https://github.com/Alwatr/nanolib/commit/42a7fca15430aca2ac1eaa19496c2a2ebfc8c470))

## [6.3.9](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.8...@alwatr/nano-build@6.3.9) (2025-11-18)

### 🔨 Code Refactoring

* remove unnecessary type declarations from tsconfig.json files ([89bcc7d](https://github.com/Alwatr/nanolib/commit/89bcc7db839807110b80f8ba34414ea9734d9c75))
* rename main file to cli and enhance export cli command ([857dc53](https://github.com/Alwatr/nanolib/commit/857dc53d19c18a3207da75d3de34541982b03742))
* update bin field in package.json to use a string instead of an object ([088063c](https://github.com/Alwatr/nanolib/commit/088063cce2f8eba161da3c17fe4021df06a514a5))

## [6.3.8](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.7...@alwatr/nano-build@6.3.8) (2025-11-15)

### 🔗 Dependencies update

* bump the npm-dependencies group with 2 updates ([a80b84d](https://github.com/Alwatr/nanolib/commit/a80b84dada6c09b5e5621e7487c8ec13fff3c23a))

## [6.3.7](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.6...@alwatr/nano-build@6.3.7) (2025-11-15)

**Note:** Version bump only for package @alwatr/nano-build

## [6.3.6](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.5...@alwatr/nano-build@6.3.6) (2025-11-04)

### 🔗 Dependencies update

* bump the npm-dependencies group across 1 directory with 9 updates ([fdf29d5](https://github.com/Alwatr/nanolib/commit/fdf29d5aa89983cb06f79d42650a364521f5c4b9))
* update @types/node from ^22.18.12 to ^24.10.0 across multiple packages ([1169a86](https://github.com/Alwatr/nanolib/commit/1169a86001da2abfbe99a7da33c8e92183f553f6))

## [6.3.5](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.4...@alwatr/nano-build@6.3.5) (2025-10-06)

### 🔗 Dependencies update

* bump the npm-dependencies group with 4 updates ([9825815](https://github.com/Alwatr/nanolib/commit/982581552bbb4b97dca52af5e93a80937f0c3109))

## [6.3.4](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.3...@alwatr/nano-build@6.3.4) (2025-09-27)

### 🧹 Miscellaneous Chores

* exclude test files from package distribution ([86f4f2f](https://github.com/Alwatr/nanolib/commit/86f4f2f5985845c5cf3a3a9398de7b2f98ce53e7))

## [6.3.3](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.2...@alwatr/nano-build@6.3.3) (2025-09-22)

**Note:** Version bump only for package @alwatr/nano-build

## [6.3.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.1...@alwatr/nano-build@6.3.2) (2025-09-22)

**Note:** Version bump only for package @alwatr/nano-build

## [6.3.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.3.0...@alwatr/nano-build@6.3.1) (2025-09-21)

### 🐛 Bug Fixes

* change console.log to console.debug in banner for better logging ([4aea838](https://github.com/Alwatr/nanolib/commit/4aea838b64adc945d22580a018ab6e440185862b))
* format banner string for better readability ([2356fea](https://github.com/Alwatr/nanolib/commit/2356feaa68451037b4519c74ce3d7f3a621e2d1c))

## [6.3.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.2.1...@alwatr/nano-build@6.3.0) (2025-09-20)

### ✨ Features

* enhance banner message in default options with package info and logging ([7121f21](https://github.com/Alwatr/nanolib/commit/7121f21839c7b6eb94900e69ecb0d208b276cb42))

### 🐛 Bug Fixes

* add sideEffects property to package.json files for better tree-shaking ([c7b9e74](https://github.com/Alwatr/nanolib/commit/c7b9e74e1920c8e35b438742de61883ca62da58c))
* add sideEffects property to package.json files for better tree-shaking ([e8402c4](https://github.com/Alwatr/nanolib/commit/e8402c481a14a1f807a37aaa862a936713d26176))

### 🧹 Miscellaneous Chores

* remove duplicate sideEffects property from multiple package.json files ([b123f86](https://github.com/Alwatr/nanolib/commit/b123f86be81481de2314aae9bb2eeb629743d24c))

## [6.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.2.0...@alwatr/nano-build@6.2.1) (2025-09-19)

### 🐛 Bug Fixes

* update esbuild to version 0.25.10 ([3fcf5ba](https://github.com/Alwatr/nanolib/commit/3fcf5ba171e98c161f574825a28409e2f96a45c2))

## [6.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.1.2...@alwatr/nano-build@6.2.0) (2025-09-15)

### ✨ Features

* enable minification of whitespace in default build options ([8fc194f](https://github.com/Alwatr/nanolib/commit/8fc194f14d236fbaab6e173319b32c629d0d6e97))

## [6.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.1.1...@alwatr/nano-build@6.1.2) (2025-09-13)

### 🔗 Dependencies update

* update @types/node version to ^22.18.3 in multiple package.json files ([13db6fc](https://github.com/Alwatr/nanolib/commit/13db6fc176bc6cdcefedc50d77ac550bd5052c9a))

## [6.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.1.0...@alwatr/nano-build@6.1.1) (2025-09-09)

### 🧹 Miscellaneous Chores

* remove trailing newlines from contributing sections in README files ([e8ab1bc](https://github.com/Alwatr/nanolib/commit/e8ab1bc43e0addea5ccd4c897c2cec597cb9e15f))

## [6.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.0.3...@alwatr/nano-build@6.1.0) (2025-09-06)

### ✨ Features

* **nano-build:** enhance logging with picocolors for better visibility ([b7186ea](https://github.com/Alwatr/nanolib/commit/b7186ea124615f0e065bf21d8eb2a248150d3e2a))

### 🔨 Code Refactoring

* remove types configuration for consistency with project standards ([3028601](https://github.com/Alwatr/nanolib/commit/3028601ba30ef3dc91d079e8da1e208d6b911b7d))
* update type definitions for BuildOptions for consistency and clarity ([a8678b2](https://github.com/Alwatr/nanolib/commit/a8678b2d2e71217d7c110341be5912bf4de55df3))

## [6.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.0.2...@alwatr/nano-build@6.0.3) (2025-09-05)

### 🐛 Bug Fixes

* update target browsers in presetRecord to include Safari 15.6 ([a448366](https://github.com/Alwatr/nanolib/commit/a4483669e530fa597c40c70612979726170d277f))

### 🔗 Dependencies update

* update jest to version 30.1.3 and @types/node to version 22.18.1 ([754212b](https://github.com/Alwatr/nanolib/commit/754212b1523cfc4cfe26c9e9f6d634aa8311e0b7))

## [6.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.0.1...@alwatr/nano-build@6.0.2) (2025-09-01)

### 🔗 Dependencies update

* update lerna-lite dependencies to version 4.7.3 and jest to 30.1.2 ([95d7870](https://github.com/Alwatr/nanolib/commit/95d7870ec7ad1e6ed2688bafddcabf46857f6981))

## [6.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@6.0.0...@alwatr/nano-build@6.0.1) (2025-08-23)

**Note:** Version bump only for package @alwatr/nano-build

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@5.5.3...@alwatr/nano-build@6.0.0) (2025-08-23)

### ⚠ BREAKING CHANGES

* drop old browser supports in default configurations

### ✨ Features

* update esbuild to v0.25.9 ([3dccddd](https://github.com/Alwatr/nanolib/commit/3dccddd42e626803e5058333926ab9266d302cc2))
* update target versions for default configurations ([2d6463c](https://github.com/Alwatr/nanolib/commit/2d6463c65ae444e50dc298e9dbddfd8f7106c8c2))

### 🐛 Bug Fixes

* update bin field in package.json and add shebang to nano-build.cjs ([02dfbe7](https://github.com/Alwatr/nanolib/commit/02dfbe773028a4dfd6f18f1195391dfa9025f4f0))
* update bin field in package.json to a simpler format ([6243f49](https://github.com/Alwatr/nanolib/commit/6243f49c7d63721f5b634adb4957de375226f4af))
* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))

### 🔗 Dependencies update

* revert @types/node version to ^22.17.2 (LTS) ([49f8101](https://github.com/Alwatr/nanolib/commit/49f8101eac5c41aa7684112f4308254dbfab9787))

## [5.5.4](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@5.5.3...@alwatr/nano-build@5.5.4) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## <small>5.5.3 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/nano-build

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@5.5.1...@alwatr/nano-build@5.5.2) (2025-04-01)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([c1320b4](https://github.com/Alwatr/nanolib/commit/c1320b447a492c5e720e25ad71e9df81eeea3670)) by @dependabot[bot]

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@5.5.0...@alwatr/nano-build@5.5.1) (2025-03-18)

### Dependencies update

* bump esbuild in the production-dependencies group ([73b8002](https://github.com/Alwatr/nanolib/commit/73b8002fc46f0de2b1ae588411fc2ca20af7fc89)) by @dependabot[bot]
* bump the development-dependencies group with 9 updates ([7290aa3](https://github.com/Alwatr/nanolib/commit/7290aa3b52ce66ca237d2a12d28a7687b113f83d)) by @dependabot[bot]

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@5.4.0...@alwatr/nano-build@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@2.0.4...@alwatr/nano-build@5.4.0) (2025-02-18)

### Dependencies update

* bump @types/node from ^22.13.0 to ^22.13.4 and prettier from 3.4.2 to 3.5.1; update eslint-import-resolver-typescript to 3.8.2 ([b9a8399](https://github.com/Alwatr/nanolib/commit/b9a8399add39509e90bfdc589fb5e2321718029d)) by @
* bump esbuild from 0.24.2 to 0.25.0 ([b9cdc08](https://github.com/Alwatr/nanolib/commit/b9cdc08ee0ce431090583694e4b97250b1296947)) by @dependabot[bot]

## 5.3.0 (2025-02-03)

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @

### Dependencies update

* bump esbuild in the production-dependencies group ([97b1ced](https://github.com/Alwatr/nanolib/commit/97b1ced6218d154e53a7b8d238f5a8681ef4efd8)) by @
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

* bump esbuild in the production-dependencies group ([97b1ced](https://github.com/Alwatr/nanolib/commit/97b1ced6218d154e53a7b8d238f5a8681ef4efd8)) by @dependabot[bot]
* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @dependabot[bot]
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @alimd

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.
* **nano-build:** heads up all presets options changed, please double check the readme and your build output.

### Features

* **nano-build:** __package_version__ types ([7894c4b](https://github.com/Alwatr/nanolib/commit/7894c4bd635d1208b612a392f33d0545cb7cf6ed)) by @
* **nano-build:** Add __dev_mode__ global variable ([a8f7e63](https://github.com/Alwatr/nanolib/commit/a8f7e63c66c8166145e9e81994263d36ea6751ae)) by @
* **nano-build:** add `weaver` configs(`--preset=weaver`) ([1bae458](https://github.com/Alwatr/nanolib/commit/1bae4583ae837c606f4862cdebb385e6fe7ac1db)) by @
* **nano-build:** Add presets for module bundling ([158dfec](https://github.com/Alwatr/nanolib/commit/158dfecc4afdac18bcfa5a9288f04ebb1feed6d1)) by @
* **nano-build:** define `__package_name__` ([d071d0b](https://github.com/Alwatr/nanolib/commit/d071d0b406b9e099e9430ad6187cd277ee3e2ca0)) by @
* **nano-build:** microservice preset ([3b464d5](https://github.com/Alwatr/nanolib/commit/3b464d5400c84cd0719bb95bdb7a3ef9edfc3d09)) by @
* **nano-build:** new package for esbuild ([224a09e](https://github.com/Alwatr/nanolib/commit/224a09e9e20c0b8b1ff1de3c224ef84ee2be1f5b)) by @
* **nano-build:** Refactor build options and add presets ([c24f0b7](https://github.com/Alwatr/nanolib/commit/c24f0b79f34167cfbb5f769dbb2de981ca377a9f)) by @
* **nano-lib:** enhance console.log statements ([92f9b2a](https://github.com/Alwatr/nanolib/commit/92f9b2a84035e4d1d92480d692e06426f9e2d371)) by @
* **prettier-config:** new package for prettier share configs ([a6fdee3](https://github.com/Alwatr/nanolib/commit/a6fdee34591abb1d19e7ea7e431bd6624e2ea6d4)) by @
* Update nano-build options and presets ([293598e](https://github.com/Alwatr/nanolib/commit/293598ed7ef85763f2ab72128cdad85a4d0310ae)) by @

### Bug Fixes

* **nano-build:** Add check for package.json existence ([2a95315](https://github.com/Alwatr/nanolib/commit/2a95315b069644737d170195d8dc6f415407fa15)) by @
* **nano-build:** entry point of `microservice` preset ([e5e4826](https://github.com/Alwatr/nanolib/commit/e5e482638361b57c619c671fe664f6b0a3325c66)) by @
* **nano-build:** error messages ([e95b497](https://github.com/Alwatr/nanolib/commit/e95b4970e6faeb3f600cefb7246233d45b102c37)) by @
* **nano-build:** mangle with 2 underline in module ([bb7b18d](https://github.com/Alwatr/nanolib/commit/bb7b18d81adfe2334aed1cbaedeea519485ce63e)) by @
* **nano-build:** remove `mangleProps` temporary ([65d95cc](https://github.com/Alwatr/nanolib/commit/65d95cc1cd3b314f506cb3dfb1a273319175616c)) by @
* **nano-build:** root fn name ([adf7b8f](https://github.com/Alwatr/nanolib/commit/adf7b8f4c2b71b528279d26fe5609cfde7095197)) by @
* **nano-build:** target versions in presets ([b73cb26](https://github.com/Alwatr/nanolib/commit/b73cb26d88835694fe6eb8ff8959909460a00259)) by @
* package.json include files ([ec8c807](https://github.com/Alwatr/nanolib/commit/ec8c8075ea88d669a84037077b01f92f6ea078f1)) by @
* package.json include files ([053fc10](https://github.com/Alwatr/nanolib/commit/053fc10b518038647136db9ada2433e27ecb2e63)) by @
* refactor nano-build.cjs to include microservice preset and update all presets configs ([3f662b8](https://github.com/Alwatr/nanolib/commit/3f662b83be33d7b75469734be4490bc00f935112)) by @

### Code Refactoring

* **nano-build:** Update all presets options ([91bdf90](https://github.com/Alwatr/nanolib/commit/91bdf9033aad8e0c71a5aab882e8b6c2af0a99ac)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

### Miscellaneous Chores

* Add tsconfig.json for nano-build package ([8b47c2d](https://github.com/Alwatr/nanolib/commit/8b47c2d940a55ac0e13e54209f18d5274877bcfe)) by @
* **deps:** bump the production-dependencies group with 1 update ([8abc6ab](https://github.com/Alwatr/nanolib/commit/8abc6ab70ae4693bd27b82d39326e11137fcffb5)) by @
* **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* **nano-build:** change the license to AGPL-3.0 ([57e1d8f](https://github.com/Alwatr/nanolib/commit/57e1d8f2d49ef68e1a098c44facda2a2d4330bf5)) by @
* switch to alwatr prettier configuration ([4426288](https://github.com/Alwatr/nanolib/commit/44262886e613b103743917d6f704f4087943273a)) by @
* update clean script to remove all .tsbuildinfo files ([91f1ff2](https://github.com/Alwatr/nanolib/commit/91f1ff20c964d5327879c267f530a131526544d8)) by @
* Update devDependencies in nano-build package.json ([c900c09](https://github.com/Alwatr/nanolib/commit/c900c0942c10a663c8bffdc2f9f6583c9a69dece)) by @
* Update file patterns in package.json ([1f478e7](https://github.com/Alwatr/nanolib/commit/1f478e7c944da2ee79a843fa756c155ebb06f2c2)) by @
* Update nano-build options and presets ([8b2bc3a](https://github.com/Alwatr/nanolib/commit/8b2bc3af60e136c952951d468b0c184e4e14a46b)) by @
* Update nano-build README.md ([f641961](https://github.com/Alwatr/nanolib/commit/f6419615da9b8e7755f231b37a10341531efa99c)) by @
* Update nano-build script to display mode information ([7a76f2a](https://github.com/Alwatr/nanolib/commit/7a76f2a9d88854ddcc79fb8c7f865555d2cbd5da)) by @
* update package keywords ([200afcf](https://github.com/Alwatr/nanolib/commit/200afcf53ae1db0e86a775c24ee1d83da771b1c0)) by @

### Dependencies update

* bump esbuild ([78d8552](https://github.com/Alwatr/nanolib/commit/78d8552e8882a0d6e200c5d340b313d5a7999b0e)) by @
* bump esbuild in the production-dependencies group ([d829afb](https://github.com/Alwatr/nanolib/commit/d829afbcefcb4053b7c3f6965d0a0e9e5ba33a11)) by @
* bump esbuild in the production-dependencies group ([1dffb4f](https://github.com/Alwatr/nanolib/commit/1dffb4f3f6f4a49cc75acc1dea777ee8c8b901ee)) by @
* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @
* bump the production-dependencies group with 1 update ([85a0693](https://github.com/Alwatr/nanolib/commit/85a0693427df038985655de27bcbf4ad5388ee97)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @
* update all ([53342f6](https://github.com/Alwatr/nanolib/commit/53342f67a8a013127f073540bc11929f1813c05c)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [2.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@2.0.3...@alwatr/nano-build@2.0.4) (2024-11-02)

### Dependencies update

* update ([4434ba6](https://github.com/Alwatr/nanolib/commit/4434ba67c3f576bb1a0c307fbdb263c43cd9733a)) by @alimd

## [2.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@2.0.2...@alwatr/nano-build@2.0.3) (2024-10-25)

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([2dfda9e](https://github.com/Alwatr/nanolib/commit/2dfda9ec38a595f1fd961490d1a2fbf060f20a66)) by @dependabot[bot]
* bump the development-dependencies group with 8 updates ([16847ac](https://github.com/Alwatr/nanolib/commit/16847acba91da027c422e3910d0f2dcc1f084e93)) by @dependabot[bot]

## [2.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@2.0.1...@alwatr/nano-build@2.0.2) (2024-10-12)

### Bug Fixes

- **nano-build:** entry point of `microservice` preset ([e5e4826](https://github.com/Alwatr/nanolib/commit/e5e482638361b57c619c671fe664f6b0a3325c66)) by @mohammadhonarvar

## [2.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@2.0.0...@alwatr/nano-build@2.0.1) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [2.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.6.0...@alwatr/nano-build@2.0.0) (2024-10-11)

### ⚠ BREAKING CHANGES

- **nano-build:** heads up all presets options changed, please double check the readme and your build output.

### Features

- **nano-build:** Add presets for module bundling ([158dfec](https://github.com/Alwatr/nanolib/commit/158dfecc4afdac18bcfa5a9288f04ebb1feed6d1)) by @alimd

### Code Refactoring

- **nano-build:** Update all presets options ([91bdf90](https://github.com/Alwatr/nanolib/commit/91bdf9033aad8e0c71a5aab882e8b6c2af0a99ac)) by @alimd

## [1.6.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.5.0...@alwatr/nano-build@1.6.0) (2024-10-10)

### Features

- **nano-build:** Add **dev_mode** global variable ([a8f7e63](https://github.com/Alwatr/nanolib/commit/a8f7e63c66c8166145e9e81994263d36ea6751ae)) by @alimd
- Update nano-build options and presets ([293598e](https://github.com/Alwatr/nanolib/commit/293598ed7ef85763f2ab72128cdad85a4d0310ae)) by @alimd

### Miscellaneous Chores

- Add tsconfig.json for nano-build package ([8b47c2d](https://github.com/Alwatr/nanolib/commit/8b47c2d940a55ac0e13e54209f18d5274877bcfe)) by @alimd
- Update devDependencies in nano-build package.json ([c900c09](https://github.com/Alwatr/nanolib/commit/c900c0942c10a663c8bffdc2f9f6583c9a69dece)) by @alimd
- Update nano-build options and presets ([8b2bc3a](https://github.com/Alwatr/nanolib/commit/8b2bc3af60e136c952951d468b0c184e4e14a46b)) by @alimd
- Update nano-build README.md ([f641961](https://github.com/Alwatr/nanolib/commit/f6419615da9b8e7755f231b37a10341531efa99c)) by @alimd
- Update nano-build script to display mode information ([7a76f2a](https://github.com/Alwatr/nanolib/commit/7a76f2a9d88854ddcc79fb8c7f865555d2cbd5da)) by @alimd

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [1.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.4.0...@alwatr/nano-build@1.5.0) (2024-10-08)

### Features

- **nano-build:** add `weaver` configs(`--preset=weaver`) ([1bae458](https://github.com/Alwatr/nanolib/commit/1bae4583ae837c606f4862cdebb385e6fe7ac1db)) by @mohammadhonarvar

## [1.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.10...@alwatr/nano-build@1.4.0) (2024-09-29)

### Features

- **nano-build:** define `__package_name__` ([d071d0b](https://github.com/Alwatr/nanolib/commit/d071d0b406b9e099e9430ad6187cd277ee3e2ca0)) by @mohammadhonarvar

### Miscellaneous Chores

- **nano-build:** change the license to AGPL-3.0 ([57e1d8f](https://github.com/Alwatr/nanolib/commit/57e1d8f2d49ef68e1a098c44facda2a2d4330bf5)) by @ArmanAsadian

### Dependencies update

- bump esbuild in the production-dependencies group ([d829afb](https://github.com/Alwatr/nanolib/commit/d829afbcefcb4053b7c3f6965d0a0e9e5ba33a11)) by @dependabot[bot]

## [1.3.10](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.9...@alwatr/nano-build@1.3.10) (2024-09-21)

### Bug Fixes

- **nano-build:** remove `mangleProps` temporary ([65d95cc](https://github.com/Alwatr/nanolib/commit/65d95cc1cd3b314f506cb3dfb1a273319175616c)) by @mohammadhonarvar

## [1.3.9](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.8...@alwatr/nano-build@1.3.9) (2024-09-15)

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]

## [1.3.8](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.7...@alwatr/nano-build@1.3.8) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [1.3.7](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.6...@alwatr/nano-build@1.3.7) (2024-07-04)

### Dependencies update

- bump esbuild ([78d8552](https://github.com/Alwatr/nanolib/commit/78d8552e8882a0d6e200c5d340b313d5a7999b0e)) by @dependabot[bot]
- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [1.3.6](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.5...@alwatr/nano-build@1.3.6) (2024-05-12)

### Dependencies update

- bump esbuild in the production-dependencies group ([1dffb4f](https://github.com/Alwatr/nanolib/commit/1dffb4f3f6f4a49cc75acc1dea777ee8c8b901ee)) by @dependabot[bot]

## [1.3.5](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.4...@alwatr/nano-build@1.3.5) (2024-04-25)

**Note:** Version bump only for package @alwatr/nano-build

## [1.3.4](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.3...@alwatr/nano-build@1.3.4) (2024-03-28)

**Note:** Version bump only for package @alwatr/nano-build

## [1.3.3](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.2...@alwatr/nano-build@1.3.3) (2024-01-31)

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @alimd

## [1.3.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.1...@alwatr/nano-build@1.3.2) (2024-01-24)

**Note:** Version bump only for package @alwatr/nano-build

## [1.3.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.3.0...@alwatr/nano-build@1.3.1) (2024-01-16)

**Note:** Version bump only for package @alwatr/nano-build

# [1.3.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.2.3...@alwatr/nano-build@1.3.0) (2024-01-03)

### Features

- **nano-build:** `__package_version__` types ([7894c4b](https://github.com/Alwatr/nanolib/commit/7894c4bd635d1208b612a392f33d0545cb7cf6ed)) by @njfamirm

## [1.2.3](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.2.2...@alwatr/nano-build@1.2.3) (2024-01-03)

**Note:** Version bump only for package @alwatr/nano-build

## [1.2.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.2.1...@alwatr/nano-build@1.2.2) (2023-12-26)

### Bug Fixes

- **nano-build:** mangle with 2 underline in module ([bb7b18d](https://github.com/Alwatr/nanolib/commit/bb7b18d81adfe2334aed1cbaedeea519485ce63e)) by @njfamirm

## [1.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.2.0...@alwatr/nano-build@1.2.1) (2023-12-23)

**Note:** Version bump only for package @alwatr/nano-build

# [1.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.1.1...@alwatr/nano-build@1.2.0) (2023-12-23)

### Bug Fixes

- refactor nano-build.cjs to include microservice preset and update all presets configs ([3f662b8](https://github.com/Alwatr/nanolib/commit/3f662b83be33d7b75469734be4490bc00f935112)) by @alimd

### Features

- **nano-build:** microservice preset ([3b464d5](https://github.com/Alwatr/nanolib/commit/3b464d5400c84cd0719bb95bdb7a3ef9edfc3d09)) by @njfamirm

## [1.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.1.0...@alwatr/nano-build@1.1.1) (2023-12-23)

### Bug Fixes

- **nano-build:** target versions in presets ([b73cb26](https://github.com/Alwatr/nanolib/commit/b73cb26d88835694fe6eb8ff8959909460a00259)) by @

# [1.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.0.4...@alwatr/nano-build@1.1.0) (2023-12-23)

### Bug Fixes

- **nano-build:** Add check for package.json existence ([2a95315](https://github.com/Alwatr/nanolib/commit/2a95315b069644737d170195d8dc6f415407fa15)) by @alimd
- **nano-build:** error messages ([e95b497](https://github.com/Alwatr/nanolib/commit/e95b4970e6faeb3f600cefb7246233d45b102c37)) by @alimd
- **nano-build:** root fn name ([adf7b8f](https://github.com/Alwatr/nanolib/commit/adf7b8f4c2b71b528279d26fe5609cfde7095197)) by @alimd

### Features

- **nano-build:** Refactor build options and add presets ([c24f0b7](https://github.com/Alwatr/nanolib/commit/c24f0b79f34167cfbb5f769dbb2de981ca377a9f)) by @alimd
- **nano-lib:** enhance console.log statements ([92f9b2a](https://github.com/Alwatr/nanolib/commit/92f9b2a84035e4d1d92480d692e06426f9e2d371)) by @alimd

## [1.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.0.3...@alwatr/nano-build@1.0.4) (2023-12-22)

**Note:** Version bump only for package @alwatr/nano-build

## [1.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.0.2...@alwatr/nano-build@1.0.3) (2023-12-22)

### Bug Fixes

- package.json include files ([ec8c807](https://github.com/Alwatr/nanolib/commit/ec8c8075ea88d669a84037077b01f92f6ea078f1)) by @

## [1.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.0.1...@alwatr/nano-build@1.0.2) (2023-12-22)

### Bug Fixes

- package.json include files ([053fc10](https://github.com/Alwatr/nanolib/commit/053fc10b518038647136db9ada2433e27ecb2e63)) by @alimd

## [1.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/nano-build@1.0.0...@alwatr/nano-build@1.0.1) (2023-12-21)

### Features

- **prettier-config:** new package for prettier share configs ([a6fdee3](https://github.com/Alwatr/nanolib/commit/a6fdee34591abb1d19e7ea7e431bd6624e2ea6d4)) by @alimd

# 1.0.0 (2023-12-20)

### Features

- **nano-build:** new package for esbuild ([224a09e](https://github.com/Alwatr/nanolib/commit/224a09e9e20c0b8b1ff1de3c224ef84ee2be1f5b)) by @alimd
