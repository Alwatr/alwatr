# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.32.0](https://github.com/Alwatr/alwatr/compare/v9.31.0...v9.32.0) (2026-06-07)

### ✨ Features

* **bind:** update setupBindDirectives to accept autoBootstrap parameter ([ffe2883](https://github.com/Alwatr/alwatr/commit/ffe28831f80fd69846ae367268c0baf37cb0145e))

## [9.31.0](https://github.com/Alwatr/alwatr/compare/v9.30.0...v9.31.0) (2026-06-07)

### 🔗 Dependencies update

* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([98e8325](https://github.com/Alwatr/alwatr/commit/98e83252c3db81092e3ac1c8d214a696a7513517))
* update @types/node and @happy-dom/global-registrator dependencies to latest versions ([5b3f9cf](https://github.com/Alwatr/alwatr/commit/5b3f9cf3d1a99e5ceb0c3bd70e215e63155b0308))

## [9.30.0](https://github.com/Alwatr/alwatr/compare/v9.29.0...v9.30.0) (2026-06-02)

**Note:** Version bump only for package @alwatr/bind

## [9.29.0](https://github.com/Alwatr/alwatr/compare/v9.28.0...v9.29.0) (2026-05-31)

### ✨ Features

* add initial implementation of Alwatr Bind with license, README, package.json, and TypeScript configuration ([3768cc5](https://github.com/Alwatr/alwatr/commit/3768cc50d1c328df6ebc02073e377eb951b0ae68))
* **bind:** add BindAttribDirective for dynamic attribute binding ([07e86d8](https://github.com/Alwatr/alwatr/commit/07e86d876cf42c10c01f29f4c39ec7d41f9d54e7))
* **bind:** add BindValueDirective for two-way data binding with input elements ([4841ca3](https://github.com/Alwatr/alwatr/commit/4841ca309366608ebfdb666efed9494dd3de6607))
* **bind:** create main setup file for binding directives registration ([e197e92](https://github.com/Alwatr/alwatr/commit/e197e92968961bf910713095e3e5bb9c45731c59))
* **bind:** implement BindingService with ViewModel management methods ([e294a8f](https://github.com/Alwatr/alwatr/commit/e294a8f4a10e0dcfe913590f663032ec503d9451))
* **bind:** implement BindTextDirective for dynamic text binding ([eff0736](https://github.com/Alwatr/alwatr/commit/eff0736758fa77c586fd21fc7a95809158671f1c))
* **binding-service:** refactor createViewModel to use createDerivedSignal and improve namespace handling ([f33957f](https://github.com/Alwatr/alwatr/commit/f33957f67ef1747038ffed928368ce2846f7bd60))

### 🐛 Bug Fixes

* **directive:** handle missing viewKey_ in binding pair split ([797f633](https://github.com/Alwatr/alwatr/commit/797f63342383c0d0212619c6c49e80ec125a0fdc))

### 🔨 Code Refactoring

* **binding-service:** simplify projector function in createDerivedSignal ([a528805](https://github.com/Alwatr/alwatr/commit/a5288059b589bc930824b153986167d4c7f71819))
