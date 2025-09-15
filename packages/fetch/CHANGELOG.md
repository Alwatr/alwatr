# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.8](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.7...@alwatr/fetch@6.0.8) (2025-09-15)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.6...@alwatr/fetch@6.0.7) (2025-09-14)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.5...@alwatr/fetch@6.0.6) (2025-09-13)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.4...@alwatr/fetch@6.0.5) (2025-09-13)

### 🧹 Miscellaneous Chores

* remove package-tracer dependency and related code from fetch package ([96fe4e9](https://github.com/Alwatr/nanolib/commit/96fe4e9552a205f218ceed187c55e4e904a07089))

## [6.0.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.3...@alwatr/fetch@6.0.4) (2025-09-13)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.2...@alwatr/fetch@6.0.3) (2025-09-09)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.1...@alwatr/fetch@6.0.2) (2025-09-08)

**Note:** Version bump only for package @alwatr/fetch

## [6.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@6.0.0...@alwatr/fetch@6.0.1) (2025-09-06)

### 🔨 Code Refactoring

* update bodyJson type definition to use JsonValue for consistency ([ca18953](https://github.com/Alwatr/nanolib/commit/ca1895314e918a157610a554fefcabcb71de97b6))

## [6.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.7...@alwatr/fetch@6.0.0) (2025-09-06)

### ⚠ BREAKING CHANGES

* Removed fetchJson; refactored fetch to accept url as a separate parameter, matching the web standard API.

### 🐛 Bug Fixes

* include request body in cache key for duplicate request handling ([a891ceb](https://github.com/Alwatr/nanolib/commit/a891ceb7300b26101f5cd982409477815dad500e))
* update query parameter encoding in fetch function for proper URL formatting ([ae30c1e](https://github.com/Alwatr/nanolib/commit/ae30c1ef13eae5070c0c2865180dfa7b89aa1eba))

### 🔨 Code Refactoring

* enhance FetchOptions type and improve fetch function handling ([a35e8e4](https://github.com/Alwatr/nanolib/commit/a35e8e495336448531b9b4ca755520517b3e3e2c))
* enhance logging in fetch and cache strategy functions for better traceability ([db0c51b](https://github.com/Alwatr/nanolib/commit/db0c51b4e5bafbba64c511dda4686226a3fcb842))
* improve documentation for fetch options and caching strategies ([d114290](https://github.com/Alwatr/nanolib/commit/d114290755d13ac5ca06a19ffe827e39b70ff92a))
* rename FetchOptions_ to AlwatrFetchOptions_ for consistency ([978947a](https://github.com/Alwatr/nanolib/commit/978947a52196f711ffc452a84edd9f34c95341b3))
* rewrite fetch module ([d245cce](https://github.com/Alwatr/nanolib/commit/d245cce8c99b345989dd18c373f682dd89ef3319))
* update fetch calls to use consistent parameters and improve response handling ([49436e6](https://github.com/Alwatr/nanolib/commit/49436e685fe8c81c78649918f3455282106bd754))
* update FetchOptions interface to enforce required properties ([4423740](https://github.com/Alwatr/nanolib/commit/4423740b3424c3d819e6c59ade183fcd303116c8))
* update FetchOptions type to AlwatrFetchOptions_ for consistency ([6c1ff26](https://github.com/Alwatr/nanolib/commit/6c1ff264a0a3937bcd6abd58010b92d53f3d76ea))

## [5.6.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.6...@alwatr/fetch@5.6.7) (2025-09-05)

### 🔗 Dependencies update

* update jest to version 30.1.3 and @types/node to version 22.18.1 ([754212b](https://github.com/Alwatr/nanolib/commit/754212b1523cfc4cfe26c9e9f6d634aa8311e0b7))

## [5.6.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.5...@alwatr/fetch@5.6.6) (2025-09-01)

### 🔗 Dependencies update

* update lerna-lite dependencies to version 4.7.3 and jest to 30.1.2 ([95d7870](https://github.com/Alwatr/nanolib/commit/95d7870ec7ad1e6ed2688bafddcabf46857f6981))

## [5.6.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.4...@alwatr/fetch@5.6.5) (2025-08-23)

**Note:** Version bump only for package @alwatr/fetch

## [5.6.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.2...@alwatr/fetch@5.6.4) (2025-08-23)

### 🐛 Bug Fixes

* update license from AGPL-3.0-only to MPL-2.0 ([d20968e](https://github.com/Alwatr/nanolib/commit/d20968e60cc89b1dcdf9b96507178da6ed562f55))
* update package versions in multiple package.json files ([7638b1c](https://github.com/Alwatr/nanolib/commit/7638b1cafee2b4e0f97db7a89ac9fba6384b9b10))

### 🔨 Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3))

### 🧹 Miscellaneous Chores

* reformat all package.json files ([ceda45d](https://github.com/Alwatr/nanolib/commit/ceda45de186667790474f729cb4b161a5148ce19))

### 🔗 Dependencies update

* update TypeScript and Jest versions across all packages to improve compatibility and performance ([31baf36](https://github.com/Alwatr/nanolib/commit/31baf366101e92e27db66a21c849fb101f19be47))

## [5.6.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.2...@alwatr/fetch@5.6.3) (2025-08-23)

### Code Refactoring

* Updated all package.json files in the project to change dependency version specifiers from "workspace:^" to "workspace:*" for consistency and to allow for more flexible version resolution. ([db6a4f7](https://github.com/Alwatr/nanolib/commit/db6a4f76deec2d1d8039978144e4bc51b6f1a0e3)) by @alimd

## [5.6.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.6.1...@alwatr/fetch@5.6.2) (2025-04-20)

**Note:** Version bump only for package @alwatr/fetch

## <small>5.6.1 (2025-04-15)</small>

**Note:** Version bump only for package @alwatr/fetch

## [5.6.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.5.2...@alwatr/fetch@5.6.0) (2025-04-15)

### Features

* **fetchJson:** include responseText in error logging for better debugging ([168aa1c](https://github.com/Alwatr/nanolib/commit/168aa1cf72fa7668a92be87711656bbd5f1b784c)) by @alimd

### Bug Fixes

* **fetchJson:** update return type of fetchJson to be more generic ([9db5234](https://github.com/Alwatr/nanolib/commit/9db5234c16fc4574386c555bd068b4ab0382a364)) by @alimd

## [5.5.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.5.1...@alwatr/fetch@5.5.2) (2025-04-01)

**Note:** Version bump only for package @alwatr/fetch

## [5.5.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.5.0...@alwatr/fetch@5.5.1) (2025-03-18)

**Note:** Version bump only for package @alwatr/fetch

## [5.5.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@5.4.0...@alwatr/fetch@5.5.0) (2025-03-06)

### Miscellaneous Chores

* update username casing in changelog entries ([9722ac9](https://github.com/Alwatr/nanolib/commit/9722ac9a078438a4e8ebfa5826ea70e0e3a52ca6)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([720c395](https://github.com/Alwatr/nanolib/commit/720c3954da55c929fe8fb16957121f4c51fb7f0c)) by @dependabot[bot]

## [5.4.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.2.1...@alwatr/fetch@5.4.0) (2025-02-18)

## 5.3.0 (2025-02-03)

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @

## 5.2.1 (2024-11-07)

### Bug Fixes

* **fetch:** refine error handling in fetchJson to improve response error structure ([2942563](https://github.com/Alwatr/nanolib/commit/29425639c268f091711ab195a4285e49b762e497)) by @

## 5.2.0 (2024-11-06)

### Features

* **fetch:** improve error handling for fetch responses and JSON parsing ([8692bb1](https://github.com/Alwatr/nanolib/commit/8692bb1123e8b3a6d6f8aea20464c55b344da9d2)) by @

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.

### Code Refactoring

* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @

## [5.3.0](https://github.com/Alwatr/nanolib/compare/v5.2.1...v5.3.0) (2025-02-03)

### Miscellaneous Chores

* edit README ([3860b3d](https://github.com/Alwatr/nanolib/commit/3860b3df48ab82dc479d5236c2e8579df614aabf)) by @ArmanAsadian

### Dependencies update

* bump the development-dependencies group across 1 directory with 11 updates ([cb79d07](https://github.com/Alwatr/nanolib/commit/cb79d072a57c79e1c01abff1a293d6757bb65350)) by @dependabot[bot]
* update typescript and @types/node to version 5.7.3 and 22.13.0 respectively across multiple packages ([ddab05b](https://github.com/Alwatr/nanolib/commit/ddab05b5d767c30191f36a065e4bc88744e8e3fe)) by @alimd

## [5.2.1](https://github.com/Alwatr/nanolib/compare/v5.2.0...v5.2.1) (2024-11-07)

### Bug Fixes

* **fetch:** refine error handling in fetchJson to improve response error structure ([2942563](https://github.com/Alwatr/nanolib/commit/29425639c268f091711ab195a4285e49b762e497)) by @

## [5.2.0](https://github.com/Alwatr/nanolib/compare/v5.1.0...v5.2.0) (2024-11-06)

### Features

* **fetch:** improve error handling for fetch responses and JSON parsing ([8692bb1](https://github.com/Alwatr/nanolib/commit/8692bb1123e8b3a6d6f8aea20464c55b344da9d2)) by @alimd

## 5.0.0 (2024-11-02)

### ⚠ BREAKING CHANGES

* To simplify version management and ensure consistency, all nanolib packages now use the same version as @alwatr/nanolib. This may require updates to your project's dependencies.
* **fetch:** queryParametters renamed to queryParams
* **fetch:** remove serviceRequest

Co-authored-by: Ali Mihandoost <ali@mihandoost.com>

### Features

* **fetch:** alwatrAuth ([28e365c](https://github.com/Alwatr/nanolib/commit/28e365c839b0ea80060c0f44ed4dc4473468d5c4)) by @
* **fetch:** fetch json ([b089f12](https://github.com/Alwatr/nanolib/commit/b089f12cef6f1f3b60bc7559dc5e9b8b63c57273)) by @
* **fetch:** move from last repo ([4b86bb5](https://github.com/Alwatr/nanolib/commit/4b86bb542af296c91bc1db36b4e08fdbad501db2)) by @
* **fetch:** Update fetch type definitions with document ([38398cc](https://github.com/Alwatr/nanolib/commit/38398cc33f311a569a53cc3e06c3191e17dbd45b)) by @
* **fetch:** use @alwatr/http-primer for types and http codes ([6fe993a](https://github.com/Alwatr/nanolib/commit/6fe993ac0f395a4c0c6ad3b2caa48a2986cc850f)) by @
* use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @

### Bug Fixes

* all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @
* exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @
* **fetch:** better error handling on handleRetryPattern_ when user is offline ([b867f30](https://github.com/Alwatr/nanolib/commit/b867f30b3eba529ec1aae0026f0ded252ce54332)) by @
* **fetch:** remove unused import from fetch core module ([28ec726](https://github.com/Alwatr/nanolib/commit/28ec7269322f90dba02fbb33e4e622db42169368)) by @

### Code Refactoring

* **fetch:** handle fetchJson error responses properly ([ae8fe24](https://github.com/Alwatr/nanolib/commit/ae8fe244aca17f235c4347ff1fd10070a410340c)) by @
* **fetch:** review and update everything ([61ec38b](https://github.com/Alwatr/nanolib/commit/61ec38b2fde28ba26a7973fcd60a30c861faf4dd)) by @
* **fetch:** separate core files ([c7e6b09](https://github.com/Alwatr/nanolib/commit/c7e6b096d747f868a2a1bfde1ffd3fd2a64dc7f3)) by @
* **fetch:** update fetch package to use @alwatr/parse-duration for timeout and retryDelay durations ([1108c54](https://github.com/Alwatr/nanolib/commit/1108c547e43f2c65f46d65b58dd19cee9abd2fd7)) by @
* **fetch:** update HTTP headers content-type to use MimeTypes constant ([c3862fc](https://github.com/Alwatr/nanolib/commit/c3862fc6a643da97dacbd15bcf5d3351caaaf269)) by @
* **fetch:** Update logger import and initialization ([1f0451c](https://github.com/Alwatr/nanolib/commit/1f0451c9fec81b875736135778cdd4150556ba97)) by @
* **fetch:** update query parameters handling ([939b3d5](https://github.com/Alwatr/nanolib/commit/939b3d52998ec7b3f5c32ff5438b649148109ede)) by @
* **fetch:** use new DictionaryReq type ([a8149cf](https://github.com/Alwatr/nanolib/commit/a8149cff114da7c7ce9a335c837ae794904fa3ca)) by @
* prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @
* update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @
* use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @
* use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @
* use the same version as @alwatr/nanolib ([60eb860](https://github.com/Alwatr/nanolib/commit/60eb860a0e33dfffe2d1d95e63ce54c60876be06)) by @
* **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @

### Miscellaneous Chores

* **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @
* **fetch:** change the license to AGPL-3.0 ([edf9069](https://github.com/Alwatr/nanolib/commit/edf9069608bd276b85c9ac937e33ad225c5921a9)) by @
* include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @
* Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @
* Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

### Dependencies update

* bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @
* bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @
* bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @
* upd ([451d025](https://github.com/Alwatr/nanolib/commit/451d0255ba96ed55f897a6f44f62cf4e6d2b12be)) by @
* update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @
* update all ([53342f6](https://github.com/Alwatr/nanolib/commit/53342f67a8a013127f073540bc11929f1813c05c)) by @
* update all ([a828818](https://github.com/Alwatr/nanolib/commit/a828818c1b37ad5f6dd3698a53fb14624f633f35)) by @
* update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @
* update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @
* upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @

## [4.2.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.2.0...@alwatr/fetch@4.2.1) (2024-11-02)

**Note:** Version bump only for package @alwatr/fetch

## [4.2.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.7...@alwatr/fetch@4.2.0) (2024-10-28)

### Features

* **fetch:** use @alwatr/http-primer for types and http codes ([6fe993a](https://github.com/Alwatr/nanolib/commit/6fe993ac0f395a4c0c6ad3b2caa48a2986cc850f)) by @alimd

### Code Refactoring

* **fetch:** update HTTP headers content-type to use MimeTypes constant ([c3862fc](https://github.com/Alwatr/nanolib/commit/c3862fc6a643da97dacbd15bcf5d3351caaaf269)) by @alimd

## [4.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.6...@alwatr/fetch@4.1.7) (2024-10-25)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.5...@alwatr/fetch@4.1.6) (2024-10-12)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.4...@alwatr/fetch@4.1.5) (2024-10-11)

### Code Refactoring

- prevent side-effects ([01e00e1](https://github.com/Alwatr/nanolib/commit/01e00e191385cc92b28677df0c01a085916ae677)) by @mohammadhonarvar
- use new `global-this` package ([42510b9](https://github.com/Alwatr/nanolib/commit/42510b9ae0e385206a902db093d188949f1cb84e)) by @mohammadhonarvar

## [4.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.3...@alwatr/fetch@4.1.4) (2024-10-11)

### Miscellaneous Chores

- include LICENSE and LEGAL files to publish ([09f366f](https://github.com/Alwatr/nanolib/commit/09f366f680bfa9fb26acb2cd1ccbc68c5a9e9ad8)) by @alimd

## [4.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.2...@alwatr/fetch@4.1.3) (2024-10-11)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.1...@alwatr/fetch@4.1.2) (2024-10-10)

### Dependencies update

- bump the development-dependencies group with 10 updates ([fa4aaf0](https://github.com/Alwatr/nanolib/commit/fa4aaf04c907ecae06aa14000ce35216170c15ad)) by @dependabot[bot]

## [4.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.1.0...@alwatr/fetch@4.1.1) (2024-10-08)

**Note:** Version bump only for package @alwatr/fetch

## [4.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.0.1...@alwatr/fetch@4.1.0) (2024-09-29)

### Features

- use `package-tracer` ([cc3c5f9](https://github.com/Alwatr/nanolib/commit/cc3c5f9c1a3d03f0d81b46835665f16a0426fd0d)) by @mohammadhonarvar

### Bug Fixes

- all dependeny topology ([1c17f34](https://github.com/Alwatr/nanolib/commit/1c17f349adf3e98e2a80ab2da4f0f81028dc9c5f)) by @mohammadhonarvar
- **fetch:** remove unused import from fetch core module ([28ec726](https://github.com/Alwatr/nanolib/commit/28ec7269322f90dba02fbb33e4e622db42169368)) by @alimd

### Code Refactoring

- **fetch:** update fetch package to use @alwatr/parse-duration for timeout and retryDelay durations ([1108c54](https://github.com/Alwatr/nanolib/commit/1108c547e43f2c65f46d65b58dd19cee9abd2fd7)) by @alimd
- **fetch:** Update logger import and initialization ([1f0451c](https://github.com/Alwatr/nanolib/commit/1f0451c9fec81b875736135778cdd4150556ba97)) by @alimd
- **fetch:** use new DictionaryReq type ([a8149cf](https://github.com/Alwatr/nanolib/commit/a8149cff114da7c7ce9a335c837ae794904fa3ca)) by @alimd
- update Dictionary type definitions ([c94cbc4](https://github.com/Alwatr/nanolib/commit/c94cbc4523864e2cc47828ccf5508b68945ac2b8)) by @alimd
- use new type-helper global types and remove all import types ([08b5d08](https://github.com/Alwatr/nanolib/commit/08b5d08c03c7c315382337239de0426462f384b8)) by @alimd
- **wait:** rename package to delay ([cf8c45c](https://github.com/Alwatr/nanolib/commit/cf8c45cf3f5b61fdd4b1b1c7f744c4eb3e230016)) by @alimd

### Miscellaneous Chores

- **fetch:** change the license to AGPL-3.0 ([edf9069](https://github.com/Alwatr/nanolib/commit/edf9069608bd276b85c9ac937e33ad225c5921a9)) by @ArmanAsadian
- Update build and lint scripts ([392d0b7](https://github.com/Alwatr/nanolib/commit/392d0b71f446bce336b0256119a80f07aff794ba)) by @alimd

### Dependencies update

- bump @types/node ([3d80fed](https://github.com/Alwatr/nanolib/commit/3d80fedaf720af792feb060c2f81c737ebb84e11)) by @dependabot[bot]

## [4.0.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@4.0.0...@alwatr/fetch@4.0.1) (2024-09-21)

**Note:** Version bump only for package @alwatr/fetch

## [4.0.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.8...@alwatr/fetch@4.0.0) (2024-09-15)

### ⚠ BREAKING CHANGES

- **fetch:** queryParametters renamed to queryParams

### Code Refactoring

- **fetch:** handle fetchJson error responses properly ([ae8fe24](https://github.com/Alwatr/nanolib/commit/ae8fe244aca17f235c4347ff1fd10070a410340c)) by @alimd
- **fetch:** update query parameters handling ([939b3d5](https://github.com/Alwatr/nanolib/commit/939b3d52998ec7b3f5c32ff5438b649148109ede)) by @alimd

### Dependencies update

- bump the development-dependencies group across 1 directory with 10 updates ([9ed98ff](https://github.com/Alwatr/nanolib/commit/9ed98ffd0668d5a36e255c82edab3af53bffda8f)) by @dependabot[bot]
- update ([c36ed50](https://github.com/Alwatr/nanolib/commit/c36ed50f68da2f5608ccd96119963a16cfacb4ce)) by @alimd

## [3.1.8](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.7...@alwatr/fetch@3.1.8) (2024-08-31)

### Miscellaneous Chores

- Update package.json exports for [@alwatr](https://github.com/alwatr) packages ([dacb362](https://github.com/Alwatr/nanolib/commit/dacb362b145e3c51b4aba00ff643687a3fac11d2)) by @

## [3.1.7](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.6...@alwatr/fetch@3.1.7) (2024-08-31)

**Note:** Version bump only for package @alwatr/fetch

## [3.1.6](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.5...@alwatr/fetch@3.1.6) (2024-08-31)

### Dependencies update

- update all dependencies ([1e0c30e](https://github.com/Alwatr/nanolib/commit/1e0c30e6a3a8e19deb5185814e24ab6c08dca573)) by @alimd

## [3.1.5](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.4...@alwatr/fetch@3.1.5) (2024-07-04)

### Dependencies update

- update all dependencies ([0e908b4](https://github.com/Alwatr/nanolib/commit/0e908b476a6b976ec2447f864c8cafcbb8a0f099)) by @

## [3.1.4](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.3...@alwatr/fetch@3.1.4) (2024-05-12)

### Dependencies update

- upgrade ([6dbd300](https://github.com/Alwatr/nanolib/commit/6dbd300642c9bcc9e7d0b281e244bf1b06eb1c38)) by @alimd

## [3.1.3](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.2...@alwatr/fetch@3.1.3) (2024-04-25)

**Note:** Version bump only for package @alwatr/fetch

## [3.1.2](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.1...@alwatr/fetch@3.1.2) (2024-03-28)

**Note:** Version bump only for package @alwatr/fetch

## [3.1.1](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.1.0...@alwatr/fetch@3.1.1) (2024-01-31)

### Bug Fixes

- exported types by add .js extensions to all imports ([fc3d83e](https://github.com/Alwatr/nanolib/commit/fc3d83e8f375da97ba276314b2e6966aa82c9b3f)) by @alimd

### Miscellaneous Chores

- **deps:** update ([1a45030](https://github.com/Alwatr/nanolib/commit/1a450305440b710a300787d4ca24b1ed8c6a39d7)) by @alimd

## [3.1.0](https://github.com/Alwatr/nanolib/compare/@alwatr/fetch@3.0.0...@alwatr/fetch@3.1.0) (2024-01-24)

### Features

- **fetch:** fetch json ([b089f12](https://github.com/Alwatr/nanolib/commit/b089f12cef6f1f3b60bc7559dc5e9b8b63c57273)) by @njfamirm

### Bug Fixes

- **fetch:** better error handling on handleRetryPattern\_ when user is offline ([b867f30](https://github.com/Alwatr/nanolib/commit/b867f30b3eba529ec1aae0026f0ded252ce54332)) by @alimd

### Code Refactoring

- **fetch:** separate core files ([c7e6b09](https://github.com/Alwatr/nanolib/commit/c7e6b096d747f868a2a1bfde1ffd3fd2a64dc7f3)) by @njfamirm

## 3.0.0 (2024-01-20)

### ⚠ BREAKING CHANGES

- **fetch:** remove serviceRequest

Co-authored-by: Ali Mihandoost <ali@mihandoost.com>

### Features

- **fetch:** alwatrAuth ([28e365c](https://github.com/Alwatr/nanolib/commit/28e365c839b0ea80060c0f44ed4dc4473468d5c4)) by @alimd
- **fetch:** move from last repo ([4b86bb5](https://github.com/Alwatr/nanolib/commit/4b86bb542af296c91bc1db36b4e08fdbad501db2)) by @njfamirm
- **fetch:** Update fetch type definitions with document ([38398cc](https://github.com/Alwatr/nanolib/commit/38398cc33f311a569a53cc3e06c3191e17dbd45b)) by @alimd

### Code Refactoring

- **fetch:** review and update everything ([61ec38b](https://github.com/Alwatr/nanolib/commit/61ec38b2fde28ba26a7973fcd60a30c861faf4dd)) by @alimd
