# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.9.2](https://github.com/Alwatr/nanotron/compare/v4.9.1...v4.9.2) (2025-07-23)

### Bug Fixes

* correct route matching logic in NanotronApiServer ([509b46f](https://github.com/Alwatr/nanotron/commit/509b46fd478b55cce6aa2f564c051d4b36044649)) by @alimd

### Dependencies update

* add conventional-commits-filter dependency ([ed73b3c](https://github.com/Alwatr/nanotron/commit/ed73b3cdd4cbce1ab3ad6cdb51dd542e78b48384)) by @
* update conventional-changelog-conventionalcommits to version 8.0.0 ([ce3a1ba](https://github.com/Alwatr/nanotron/commit/ce3a1ba0a5fbf6501aa6e10bcc3e9223ba9b6db2)) by @
* update dependencies to latest versions ([353d048](https://github.com/Alwatr/nanotron/commit/353d0485a5c21ab219d84cd0a6c35f62b46c2da9)) by @alimd

## [4.9.1](https://github.com/Alwatr/nanotron/compare/v4.9.0...v4.9.1) (2025-03-06)

### Dependencies update

* **deps-dev:** bump the dependencies group with 5 updates ([e6a00eb](https://github.com/Alwatr/nanotron/commit/e6a00eb139f70f2396ecf12b68103b40aa785521)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 2 updates ([49c6f51](https://github.com/Alwatr/nanotron/commit/49c6f51beb9d1db1f91248189cd583d33e1a3a67)) by @dependabot[bot]
* **dev:** update @alwatr/eslint-config to version 5.5.0 and bump packageManager to yarn@4.7.0 ([4b7d8a2](https://github.com/Alwatr/nanotron/commit/4b7d8a2e54251294a5cf9e430c9dafd36dd297fd)) by @
* update @alwatr/nanolib and @alwatr/nano-build to version 5.5.0; bump @alwatr/type-helper to version 5.4.0 ([1e8b122](https://github.com/Alwatr/nanotron/commit/1e8b1228034af44e0d4914f5100d9e564c05a5a6)) by @
* update prettier to version 3.5.3-sdk and typescript to version 5.8.2-sdk ([7fdd0c8](https://github.com/Alwatr/nanotron/commit/7fdd0c8b52f23afcd843feb4cc6fdcdb1abbb8b7)) by @

## [4.9.0](https://github.com/Alwatr/nanotron/compare/v4.8.1...v4.9.0) (2025-02-26)

### Features

* **crypto:** add 'ascii' and 'utf8' to CryptoEncoding type ([aa2720f](https://github.com/Alwatr/nanotron/commit/aa2720f6f7b128a572d8591dc7a75ac15ed6d2d6)) by @alimd

### Code Refactoring

* **crypto:** replace CryptoEncoding with BinaryToTextEncoding in hash and token configurations ([8e356cd](https://github.com/Alwatr/nanotron/commit/8e356cd60ee438d1f2d2ab688468944d8b6bd99e)) by @alimd

### Dependencies update

* bump @types/node from 22.13.4 to 22.13.5 and prettier from 3.5.1 to 3.5.2 across multiple packages ([3d55c9a](https://github.com/Alwatr/nanotron/commit/3d55c9a4044773fdc8d7c8b635311f2043f48569)) by @alimd
* bump prettier version from 3.5.1-sdk to 3.5.2-sdk ([1010a20](https://github.com/Alwatr/nanotron/commit/1010a20424bc709f621f94e08e7c321874463525)) by @alimd
* **deps-dev:** bump eslint-import-resolver-typescript ([ca62136](https://github.com/Alwatr/nanotron/commit/ca62136cf18027c92ae1f5fda2075d4776ad0d7b)) by @dependabot[bot]
* **deps:** bump the github-actions group with 2 updates ([351da39](https://github.com/Alwatr/nanotron/commit/351da3930109864523c078cd55ec46ce84ac1fb4)) by @dependabot[bot]
* update yarn.lock ([627e529](https://github.com/Alwatr/nanotron/commit/627e52979efa5f4a0adf19fdc7e8bdb0e585ac66)) by @alimd

## [4.8.1](https://github.com/Alwatr/nanotron/compare/v4.8.0...v4.8.1) (2025-02-18)

### Dependencies update

* **deps-dev:** bump the dependencies group across 1 directory with 11 updates ([9257e08](https://github.com/Alwatr/nanotron/commit/9257e08b96f5661a7e13e153b9c71d9dbc08fd18)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 4 updates ([2a78c6f](https://github.com/Alwatr/nanotron/commit/2a78c6fb12987e5601eeaf3cd0fc20d54f39199d)) by @dependabot[bot]
* update TypeScript, Prettier, and various dependencies to latest versions ([5c0f752](https://github.com/Alwatr/nanotron/commit/5c0f7521851acaabb2466e459754c130d7ebf31b)) by @

## [4.8.0](https://github.com/Alwatr/nanotron/compare/v4.7.0...v4.8.0) (2024-11-08)

### Features

* **api-server:** refactor CORS handling to use new crossOrigin configuration ([52a40d7](https://github.com/Alwatr/nanotron/commit/52a40d741124b78e7fdfc4207e591a4e620b2446)) by @

### Dependencies update

* update ([91aae31](https://github.com/Alwatr/nanotron/commit/91aae315d0ed13ec0a821ceff2c80c43914d78a0)) by @

## [4.7.0](https://github.com/Alwatr/nanotron/compare/v4.6.0...v4.7.0) (2024-11-07)

### Features

* **api-server:** set `allowOrigin` from configs ([8add97c](https://github.com/Alwatr/nanotron/commit/8add97cac9d29e4a7ce26ee487896183dabea135)) by @mohammadhonarvar

## [4.6.0](https://github.com/Alwatr/nanotron/compare/v4.5.2...v4.6.0) (2024-11-07)

### Features

* **api-server:** allow `CORS` requests to do ([27d8166](https://github.com/Alwatr/nanotron/commit/27d816677930213d455a998bf9ceb44571ddd4ac)) by @mohammadhonarvar

### Bug Fixes

* **api-server:** debug issue ([a3ef40f](https://github.com/Alwatr/nanotron/commit/a3ef40fc0b2845bff5d2d5fc7c6eb5ccad4f0d85)) by @mohammadhonarvar

### Dependencies update

* **deps-dev:** bump @types/node in the dependencies group ([9901819](https://github.com/Alwatr/nanotron/commit/9901819d0a7fef85736951f354bc1846294bb7fe)) by @dependabot[bot]
* **deps:** bump @alwatr/nanolib from 5.0.0 to 5.2.1 in the alwatr group ([f06afb7](https://github.com/Alwatr/nanotron/commit/f06afb74f363c478ffc5967bafadfa2bc9009129)) by @dependabot[bot]
* update ([78b89b2](https://github.com/Alwatr/nanotron/commit/78b89b2648010cf394a4211e47abfe4fecf49d5f)) by @AliMD

## [4.5.2](https://github.com/Alwatr/nanotron/compare/v4.5.1...v4.5.2) (2024-11-02)

### Miscellaneous Chores

* add Copilot instructions and update VSCode settings and extensions ([aa26bab](https://github.com/Alwatr/nanotron/commit/aa26bab56bffa097d74397424aad5f84f213bdc5)) by @AliMD
* update dependabot configuration for improved dependency management ([7e6e8de](https://github.com/Alwatr/nanotron/commit/7e6e8decf15b6f853effb61d0e8066513941e317)) by @AliMD

### Dependencies update

* bump the github-actions group with 2 updates ([49ce364](https://github.com/Alwatr/nanotron/commit/49ce3640e6cd49d97f52cb6f43610489cdaf1f6e)) by @dependabot[bot]
* **deps:** bump the alwatr group with 6 updates ([6636bb3](https://github.com/Alwatr/nanotron/commit/6636bb307401e28863eb27288d5abbaab2d67e18)) by @dependabot[bot]
* update ([86fbeb6](https://github.com/Alwatr/nanotron/commit/86fbeb663d94452f3596d0894ec19d4c6bed3099)) by @

## [4.5.1](https://github.com/Alwatr/nanotron/compare/v4.5.0...v4.5.1) (2024-10-28)

### Bug Fixes

* deps ([fc6724b](https://github.com/Alwatr/nanotron/commit/fc6724b3b42fac816982c94128157bb188318243)) by @

## [4.5.0](https://github.com/Alwatr/nanotron/compare/v4.4.1...v4.5.0) (2024-10-28)

### Features

* add `pre-handlers` package ([6578a63](https://github.com/Alwatr/nanotron/commit/6578a63e1dfd325947352b66d8087c9f0e70c32e)) by @mohammadhonarvar
* **nanotron:** use `pre-handlers` package ([11595c8](https://github.com/Alwatr/nanotron/commit/11595c805fa85f0da44c12146d189fa98ad0846a)) by @mohammadhonarvar
* **pre-handlers:** Add getAuthBearer function ([43de511](https://github.com/Alwatr/nanotron/commit/43de511f5b7fc74836d3e31ee9f0b9db2d9a4e11)) by @AliMD
* **pre-handlers:** Add requireAccessToken middleware ([8ed4eb3](https://github.com/Alwatr/nanotron/commit/8ed4eb3899b89032acd13095b6c72e2676ff4eaa)) by @AliMD

### Bug Fixes

* **crypto:** remove side effects ([852e035](https://github.com/Alwatr/nanotron/commit/852e035d6ffceec32f7b4d2197140a27b4afb330)) by @AliMD
* **pre-handlers:** some issues of `review` feedbacks ([72ad94b](https://github.com/Alwatr/nanotron/commit/72ad94b37f059a7b765dd8bc3a5216fe53746479)) by @mohammadhonarvar

### Code Refactoring

* **pre-handlers:** Remove logger module ([70b0357](https://github.com/Alwatr/nanotron/commit/70b0357b0accd6ed96c0cdc62099146b36ce2660)) by @AliMD
* **pre-handlers:** Rename parse-body-as-json.ts to handler/parse-body-as-json.ts ([3d5f756](https://github.com/Alwatr/nanotron/commit/3d5f756453be4b40510f70925ffb3954c428a9f1)) by @AliMD
* **pre-handlers:** Update main.ts exports and add package tracer ([dc29d20](https://github.com/Alwatr/nanotron/commit/dc29d20f9f9d415d3cbad51b0ea7b44fbe4c1149)) by @AliMD

### Miscellaneous Chores

* Update extension in .vscode/extensions.json ([071698e](https://github.com/Alwatr/nanotron/commit/071698e4e179114707ac04adbb1a0c017ac7a920)) by @AliMD

### Dependencies update

* bump the development-dependencies group across 1 directory with 2 updates ([8b3e101](https://github.com/Alwatr/nanotron/commit/8b3e10128af769ef95a2e7b2ed788e843eb47414)) by @dependabot[bot]
* bump the github-actions group across 1 directory with 4 updates ([6c8dbbe](https://github.com/Alwatr/nanotron/commit/6c8dbbe01b48fc0cd52a68e612b368557cd0386f)) by @dependabot[bot]
* update ([da8ab83](https://github.com/Alwatr/nanotron/commit/da8ab832c169439ec5812bf970a0e4d2cff32e32)) by @mohammadhonarvar
* update ([584ebc4](https://github.com/Alwatr/nanotron/commit/584ebc4271719fb3ed1e9a185d38c1a44bf35d50)) by @mohammadhonarvar
* update ([5f95120](https://github.com/Alwatr/nanotron/commit/5f95120e3ba4b89c09454f9e93149177be27b462)) by @mohammadhonarvar
* update ([b3f18ee](https://github.com/Alwatr/nanotron/commit/b3f18ee6bb20cb41d456fe852a8ef753a8238c66)) by @mohammadhonarvar
* update nanolib v1.4.0 and other deps ([b8e7be7](https://github.com/Alwatr/nanotron/commit/b8e7be7b6c58d4f1cbc12593b2d6124f3d19b377)) by @

## [4.4.1](https://github.com/Alwatr/nanotron/compare/v4.4.0...v4.4.1) (2024-10-16)

### Bug Fixes

* pre- and post-handler execution in NanotronApiServer ([ec3b4b9](https://github.com/Alwatr/nanotron/commit/ec3b4b965e996f8320b605f8034ded7cb3781660)) by @

### Dependencies update

* update ([8917c2e](https://github.com/Alwatr/nanotron/commit/8917c2e637781fe219c5031f414de3dea82cf371)) by @

## [4.4.0](https://github.com/Alwatr/nanotron/compare/v4.3.0...v4.4.0) (2024-10-14)

### Features

* **api-server:** add health route to NanotronApiServer ([4f8ede5](https://github.com/Alwatr/nanotron/commit/4f8ede5085cd2fcbd0cd621a09346d4816219e08)) by @

## [4.3.0](https://github.com/Alwatr/nanotron/compare/v4.2.2...v4.3.0) (2024-10-11)

### Features

* **nanotron:** install `nanolib` packages & export them here ([169f360](https://github.com/Alwatr/nanotron/commit/169f36053c9ff94192e7126695859ff5e4e275b9)) by @mohammadhonarvar
* update `import`s & packages based on the latest changes of `nanolib` & prevent `sideeffects` from `build` result ([1d234b8](https://github.com/Alwatr/nanotron/commit/1d234b83152fb246b793476898e9cf026aa52874)) by @mohammadhonarvar

### Bug Fixes

* **api-server:** update types & `logger` & use `packageTracer` based on last changes of `nanolib` ([7ae4b52](https://github.com/Alwatr/nanotron/commit/7ae4b52e6fc26df56a14ab680ba34f819f88901a)) by @mohammadhonarvar
* **crypto:** update types & `logger` & use `packageTracer` based on last changes of `nanolib` ([cf1a480](https://github.com/Alwatr/nanotron/commit/cf1a48071fe745226f6aed2afdf11038da5065e2)) by @mohammadhonarvar
* **nanotro:** update `import`s & remove extra `export`s ([2bc4d2e](https://github.com/Alwatr/nanotron/commit/2bc4d2e160e39e7633bcdb15bd2fac13ed310629)) by @mohammadhonarvar

### Code Refactoring

* update `import`s & packages based on the latest changes of `nanolib` ([7652b5d](https://github.com/Alwatr/nanotron/commit/7652b5d9cc69218f2ff28bda3d0d8f52f147c6f6)) by @mohammadhonarvar

### Miscellaneous Chores

* edited README ([d707d38](https://github.com/Alwatr/nanotron/commit/d707d389e085dd320402521cb23af5805013d777)) by @ArmanAsadian

### Dependencies update

* bump github/codeql-action in the github-actions group ([deb0189](https://github.com/Alwatr/nanotron/commit/deb018907b12154980dddb5e1f8e2bcbdad523d6)) by @dependabot[bot]
* bump the github-actions group with 3 updates ([7ef6ee3](https://github.com/Alwatr/nanotron/commit/7ef6ee367cea28f99061a4196c609fc8ee363690)) by @dependabot[bot]
* update ([2aaf7c4](https://github.com/Alwatr/nanotron/commit/2aaf7c48365a76d948f23ffde6125c3fbc562124)) by @mohammadhonarvar
* update ([e2e3c2b](https://github.com/Alwatr/nanotron/commit/e2e3c2bcc0a36d33d8bf881b7cb5d879d2fc140a)) by @mohammadhonarvar
* update ([834ffcc](https://github.com/Alwatr/nanotron/commit/834ffcc8f6de96cc11a1a6fa933f948b7813cde6)) by @mohammadhonarvar
* update ([fab97ef](https://github.com/Alwatr/nanotron/commit/fab97ef111f2a173dccd673e84041b4a0fc6e900)) by @mohammadhonarvar
* update ([566ab6f](https://github.com/Alwatr/nanotron/commit/566ab6fec2be8ac212beadbf2ca42e7e43d66a16)) by @mohammadhonarvar

## [4.2.2](https://github.com/Alwatr/nanotron/compare/v4.2.1...v4.2.2) (2024-09-29)

### Miscellaneous Chores

* **api-server:** change the license to AGPL-3.0 ([fa3347e](https://github.com/Alwatr/nanotron/commit/fa3347e005f926b4f17ccba0bbec19da3b5198ec)) by @ArmanAsadian
* change the license to AGPL-3.0 ([5b73936](https://github.com/Alwatr/nanotron/commit/5b73936a38d88b1ff29ff4a939af56c52443739b)) by @ArmanAsadian
* **crypto:** change the license to AGPL-3.0 ([a37fb50](https://github.com/Alwatr/nanotron/commit/a37fb50898bb0bc909746f44bc34d14bcf255a61)) by @ArmanAsadian
* **nanotron:** change the license to AGPL-3.0 ([a1699ee](https://github.com/Alwatr/nanotron/commit/a1699ee5154577dcb85476bc14c4d9472c50143f)) by @ArmanAsadian

### Dependencies update

* bump @types/node in the development-dependencies group ([9c8d7d5](https://github.com/Alwatr/nanotron/commit/9c8d7d518d9a5da2ea57ac2b210a8697267e6d3d)) by @dependabot[bot]
* bump the github-actions group with 3 updates ([06aa063](https://github.com/Alwatr/nanotron/commit/06aa06375e17b92ca2d1e2d09f5a23b70a792d8e)) by @dependabot[bot]
* update ([1c4ef63](https://github.com/Alwatr/nanotron/commit/1c4ef635fc969d4abd416aea2b954de674748da8)) by @AliMD

## [4.2.1](https://github.com/Alwatr/nanotron/compare/v4.2.0...v4.2.1) (2024-09-24)

### Miscellaneous Chores

* change license to AGPL-3.0 ([7f0f987](https://github.com/Alwatr/nanotron/commit/7f0f98790fab5855ba734f26ef79f8a3e08d6795)) by @AliMD

### Dependencies update

* update ([e698199](https://github.com/Alwatr/nanotron/commit/e698199e4a41532de8e9c799db96b9bde2a647f6)) by @AliMD

## [4.2.0](https://github.com/Alwatr/nanotron/compare/v4.1.0...v4.2.0) (2024-09-23)

### Features

* Add @alwatr/crypto dependency to nanotron package.json and tsconfig.json ([94cdf28](https://github.com/Alwatr/nanotron/commit/94cdf28bbfcd6b77ebd60ceb93916414e9e11621)) by @AliMD

### Bug Fixes

* export crypto from nanotron ([21f00d2](https://github.com/Alwatr/nanotron/commit/21f00d2d59fb7ac9fd4e7a8e4da3413f320a024d)) by @njfamirm

### Code Refactoring

* logger creation in NanotronClientRequest and NanotronServerResponse ([65accd3](https://github.com/Alwatr/nanotron/commit/65accd3f4a3c5f68e7c25da40b47b5d5d28070f7)) by @AliMD

### Dependencies update

* bump github/codeql-action in the github-actions group ([b974a05](https://github.com/Alwatr/nanotron/commit/b974a056529975d6881ac01e008f1595941da53c)) by @dependabot[bot]
* bump the alwatr-dependencies group with 6 updates ([1c8a8ec](https://github.com/Alwatr/nanotron/commit/1c8a8ec468aa31c79de45f0e897cc45578242981)) by @dependabot[bot]
* bump the development-dependencies group with 2 updates ([e3bc7f7](https://github.com/Alwatr/nanotron/commit/e3bc7f7dcbf1779a3fdf8fbe18c4f8b4095cc222)) by @dependabot[bot]
* update ([d9f8d57](https://github.com/Alwatr/nanotron/commit/d9f8d577b058b4e945db7dfc1c5c68da78c4112f)) by @AliMD

## [4.1.0](https://github.com/Alwatr/nanotron/compare/v4.0.2...v4.1.0) (2024-09-14)

### Features

* route handlers to use 'call' method for binding 'this' ([69517c1](https://github.com/Alwatr/nanotron/commit/69517c16909f8a9a4720c4863501b01e6ab0834e)) by @

## [4.0.2](https://github.com/Alwatr/nanotron/compare/v4.0.1...v4.0.2) (2024-09-14)

### Bug Fixes

* definePackage ([a2edcc1](https://github.com/Alwatr/nanotron/commit/a2edcc1b3a4822371cefa4a28ff62a7c6754287e)) by @AliMD

## [4.0.1](https://github.com/Alwatr/nanotron/compare/v4.0.0...v4.0.1) (2024-09-14)

### Miscellaneous Chores

* **lerna.json:** remove ignoreChanges for *.md files ([b8e00c6](https://github.com/Alwatr/nanotron/commit/b8e00c614cf4e346c456c8e544ea79dcb9a31b99)) by @
* **readme:** remove old docs ([4c4cc79](https://github.com/Alwatr/nanotron/commit/4c4cc79e0f0db9090bd767970f832d104256f3ef)) by @

## [4.0.0](https://github.com/Alwatr/nanotron/compare/v4.0.0-alpha.3...v4.0.0) (2024-09-14)

### Features

* **api-server:** add a new method ([416faab](https://github.com/Alwatr/nanotron/commit/416faab300806be6701fe38fb9af8b315a57c068)) by @mohammadhonarvar
* **api-server:** add queryParams property to NanotronClientRequest class ([8749b98](https://github.com/Alwatr/nanotron/commit/8749b9834cf0b597d2ccdd4f1f3353979962a709)) by @AliMD
* **api-server:** add remote ip address to loggers ([313602a](https://github.com/Alwatr/nanotron/commit/313602a80b908a7152f72974dae8f837b0a5408c)) by @AliMD

### Code Refactoring

* **api-server:** refactor NanotronClientRequest class ([17953ad](https://github.com/Alwatr/nanotron/commit/17953ad182f6cd17906788599cb4371ee3d3c343)) by @AliMD
* **api-server:** update NanotronClientRequest class to accept a generic shared meta type ([373f4bc](https://github.com/Alwatr/nanotron/commit/373f4bcc2929820762cb63f19c6fe4167a6d717f)) by @AliMD

## [4.0.0-alpha.3](https://github.com/Alwatr/nanotron/compare/v4.0.0-alpha.2...v4.0.0-alpha.3) (2024-09-13)

### Features

* **api-server:** add getBodyRaw method to NanotronClientRequest for handling request body ([828416b](https://github.com/Alwatr/nanotron/commit/828416bda33e76dfece5815a754fcd211490380d)) by @AliMD
* **api-server:** add headers getter to NanotronClientRequest ([6426345](https://github.com/Alwatr/nanotron/commit/6426345ad057591517ee9c5d705dd10c23e218ea)) by @AliMD
* **api-server:** add HttpRequestHeaders ([c7e8d94](https://github.com/Alwatr/nanotron/commit/c7e8d9485f4d9be9482a9684321ec6dd1113903b)) by @AliMD
* **api-server:** add new endpoint for hello2 in API demo ([818c710](https://github.com/Alwatr/nanotron/commit/818c710425c1fc7f93150bac309a207fc2405619)) by @AliMD
* **api-server:** enhance error response handling in NanotronServerResponse ([0a0f89b](https://github.com/Alwatr/nanotron/commit/0a0f89bff0603fce9068ce69c82f5f105548290e)) by @AliMD
* **api-server:** improve error handling and logging in NanotronApiServer ([65d82b6](https://github.com/Alwatr/nanotron/commit/65d82b6cea680d2c810a48caedb337cac9ae597e)) by @AliMD
* **demo:** add POST /echo-body endpoint to echo request body ([f13b916](https://github.com/Alwatr/nanotron/commit/f13b91607abf33e5e8978fbd4ad26bc7ada355d3)) by @AliMD

### Code Refactoring

* **api-server:** Update NanotronUrl class to include NativeClientRequest type ([906256f](https://github.com/Alwatr/nanotron/commit/906256f3628c2e8901017e39ab3a06a3a53927b3)) by @AliMD
* **api-server:** update routeOption type to Required<DefineRouteOption> ([e4eb63e](https://github.com/Alwatr/nanotron/commit/e4eb63e8647a474e9f10a0bbd4f034851460a8b2)) by @AliMD

### Dependencies update

* update ([0461fb5](https://github.com/Alwatr/nanotron/commit/0461fb58e837488defb868cea4df83ba23a4db34)) by @

## [4.0.0-alpha.2](https://github.com/Alwatr/nanotron/compare/v4.0.0-alpha.1...v4.0.0-alpha.2) (2024-09-12)

### Features

* **api-server:** Add NanotronUrl class for handling client request URLs ([3e41fd6](https://github.com/Alwatr/nanotron/commit/3e41fd650869e7bfdb875dccbc221cb3dd083832)) by @AliMD

### Code Refactoring

* **api-server:** Add new route for /hello endpoint ([d2dad04](https://github.com/Alwatr/nanotron/commit/d2dad04bd6e288b99e145a8af1bbadba8d6f7cbe)) by @AliMD
* **api-server:** types ([46d7487](https://github.com/Alwatr/nanotron/commit/46d74871631d47e7bc4c4b188367f4543915031f)) by @AliMD
* **api-server:** Update HttpResponseHeaders interface properties ([3e44a43](https://github.com/Alwatr/nanotron/commit/3e44a433f287c8d4c6fb18ac13cfa58805bb709b)) by @AliMD
* **api-server:** Update main.ts exports with NanotronClientRequest, NanotronServerResponse, and NanotronUrl types ([c94c954](https://github.com/Alwatr/nanotron/commit/c94c9546927c13b3b72d24522bd1fc46ce4f6163)) by @AliMD
* **api-server:** Update NanotronClientRequest class ([468d3d9](https://github.com/Alwatr/nanotron/commit/468d3d910342a6963c07de18e9cccc933934a111)) by @AliMD
* **api-server:** Update NanotronClientRequest class and NanotronServerResponse class ([7b587e0](https://github.com/Alwatr/nanotron/commit/7b587e06dbcf493424dd0bd70de402f14e2e519a)) by @AliMD
* **api-server:** Update NanotronServerResponse class ([0f47dd7](https://github.com/Alwatr/nanotron/commit/0f47dd7221a67f5a21269f76c60df125ac6e9c93)) by @AliMD
* **api-server:** Update type.ts with NativeClientRequest and NativeServerResponse types ([e6b62e5](https://github.com/Alwatr/nanotron/commit/e6b62e50b8873fe77eb4bab084581b0c6c0d3c86)) by @AliMD

### Miscellaneous Chores

* update demo ([218d375](https://github.com/Alwatr/nanotron/commit/218d3751266eff7367e9056f1763958a1100cdef)) by @

## [4.0.0-alpha.1](https://github.com/Alwatr/nanotron/compare/v4.0.0-alpha.0...v4.0.0-alpha.1) (2024-09-11)

### ⚠ BREAKING CHANGES

* **api-server:** separate NanotronClientRequest and NanotronServerResponse classes

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>
Co-authored-by: James Sumners <321201+jsumners@users.noreply.github.com>
Co-authored-by: Frazer Smith <frazer.dev@icloud.com>
Co-authored-by: Simone Busoli <simone.busoli@gmail.com>
Co-authored-by: Carlos Fuentes <me@metcoder.dev>
Co-authored-by: KaKa <23028015+climba03003@users.noreply.github.com>

### Features

* **api-server:** add `preHandlers_` property ([80a301e](https://github.com/Alwatr/nanotron/commit/80a301e2ef7fb54e681ca7085582ad48bd47e4e2)) by @AliMD
* **api-server:** Add preHandlers_ and postHandlers_ properties in DefineRouteOption ([d4f3e8c](https://github.com/Alwatr/nanotron/commit/d4f3e8c20bc94ad16585e64afa4012a5a649e5a4)) by @AliMD
* **api-server:** prevent to run the handlers when `terminatedHandlers` equals `true` ([185bc11](https://github.com/Alwatr/nanotron/commit/185bc114dbdef952823b5b2be72c87bb01f6780e)) by @AliMD
* **api-server:** Refactor `replyError` method and add `terminatedHandlers` property ([c6f9c69](https://github.com/Alwatr/nanotron/commit/c6f9c69bdbb3b996b5b0b602476a6f88ecfcbfd5)) by @AliMD
* **api-server:** Update replyError method and add errorHappened property in api-connection.ts ([166c950](https://github.com/Alwatr/nanotron/commit/166c950fcced582bb2aa5fbc55d29798e8e09b91)) by @AliMD
* **api-server:** Update replyError method in api-connection.ts ([968b024](https://github.com/Alwatr/nanotron/commit/968b02441610f906032b822ac655ac43a9768fdf)) by @AliMD
* **demo:** add 404 test ([b15bf5d](https://github.com/Alwatr/nanotron/commit/b15bf5d4dded330f710dc6b2516506c8dc31261a)) by @AliMD

### Bug Fixes

* **api-server:** update exports ([8ed905b](https://github.com/Alwatr/nanotron/commit/8ed905b1f85394a4ce1c42c8bde88d13616d687f)) by @AliMD
* **demo:** update with new apis ([16fceca](https://github.com/Alwatr/nanotron/commit/16fceca7df279bf908878d15b0ef78adfaeed582)) by @

### Code Refactoring

* **api-server:** separate NanotronClientRequest and NanotronServerResponse classes ([c207488](https://github.com/Alwatr/nanotron/commit/c2074888809e6b7ea6fc7ffe1d0dec7e0d60de2a)) by @AliMD
* **api-server:** Separate NanotronClientRequest and NanotronServerResponse classes ([c02d51b](https://github.com/Alwatr/nanotron/commit/c02d51bd7427493aacdc630a7d08c5bda4f54e59)) by @AliMD
* **api-server:** Update logger name in NanotronApiServer ([6f0a959](https://github.com/Alwatr/nanotron/commit/6f0a959bfd2bf6d5f60fc518c6a916cd255a9bd0)) by @
* NanotronApiServer to separate NanotronClientRequest and NanotronServerResponse classes ([3116fdf](https://github.com/Alwatr/nanotron/commit/3116fdf6dc93af93a1e3ff47755f431e12efa228)) by @AliMD

## [4.0.0-alpha.0](https://github.com/Alwatr/nanotron/compare/v1.2.7...v4.0.0-alpha.0) (2024-09-10)

### ⚠ BREAKING CHANGES

* everything rewrite from scratch please check the documents

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

### Features

* Add API routes for root and hello endpoints in api-server demo ([4692fbb](https://github.com/Alwatr/nanotron/commit/4692fbb1ee54d481f35583b17e51a9d9c875da30)) by @AliMD
* Add applyReplyHeaders_ method to NanotronApiConnection class ([2a0eb4a](https://github.com/Alwatr/nanotron/commit/2a0eb4a1cb02519ad4aea6ad5d4d45de058029c2)) by @AliMD
* Add close method to NanotronApiServer ([cbd2ed8](https://github.com/Alwatr/nanotron/commit/cbd2ed8bc43fc78027ec8a647659a8ab59e7606c)) by @AliMD
* Add constructor to NanotronApiConnection class ([71d7a3a](https://github.com/Alwatr/nanotron/commit/71d7a3a51009a53fa7a23e39a3780bbc755038fd)) by @AliMD
* Add constructor to NanotronApiServer ([fbb358c](https://github.com/Alwatr/nanotron/commit/fbb358c1f2867f3bece25e7cb3cc4b18760e4204)) by @AliMD
* Add constructor, default configuration, DefineRouteOption interface, and NanotronApiServerConfig interface to NanotronApiServer ([3af3d82](https://github.com/Alwatr/nanotron/commit/3af3d82db4fc7c8d18767d11254aff52691fe8db)) by @AliMD
* Add default configuration for NanotronApiServer ([19495d0](https://github.com/Alwatr/nanotron/commit/19495d07c0dfb6d5c400ebbbf5beac8aa9236452)) by @AliMD
* Add defineRoute method to NanotronApiServer ([e1448c9](https://github.com/Alwatr/nanotron/commit/e1448c991c8beae0b8f53a283b2439cc0a826603)) by @AliMD
* Add DefineRouteOption interface ([f481ecb](https://github.com/Alwatr/nanotron/commit/f481ecb0e71c2d6d04184394f2403fd4ad376113)) by @AliMD
* Add error handling and request handling to NanotronApiServer ([2fcc6f9](https://github.com/Alwatr/nanotron/commit/2fcc6f943e9f08cd3f83c8d19691b79dbb877ca0)) by @AliMD
* Add error handling for client errors in NanotronApiServer ([f7667d8](https://github.com/Alwatr/nanotron/commit/f7667d82cb7778943e83e041820d95868866de1b)) by @AliMD
* Add error handling for HTTP errors in NanotronApiServer ([2a8a87c](https://github.com/Alwatr/nanotron/commit/2a8a87cb0d1aa5d359daab49f3456b34c8ae7984)) by @AliMD
* Add error handling to handleServerError_ method in NanotronApiServer ([4273478](https://github.com/Alwatr/nanotron/commit/42734788c59dbcac264ea5b75d2a547cac2a33e1)) by @AliMD
* Add getRouteOption_ method to NanotronApiServer ([4eada32](https://github.com/Alwatr/nanotron/commit/4eada3237cbed77709389bf823d8ed8f5c9259d0)) by @AliMD
* Add HttpResponseHeaders interface and ErrorResponse type to type.ts ([03fe655](https://github.com/Alwatr/nanotron/commit/03fe655e5f9c8d965948b20ca0d2f5817f78e0f4)) by @AliMD
* Add HttpResponseHeaders interface to type.ts ([fe971fd](https://github.com/Alwatr/nanotron/commit/fe971fd13a61aee1ee49d3ac2039ca8c5d3cd2d7)) by @AliMD
* Add HttpStatusCode type to const.ts ([44888c3](https://github.com/Alwatr/nanotron/commit/44888c386fe4d943f2bf78b5ec0ad2f80a4269e8)) by @AliMD
* Add HttpStatusCodes object to const.ts ([76436bc](https://github.com/Alwatr/nanotron/commit/76436bcda5a64c249b232cae433eb5c93f32d9e4)) by @AliMD
* Add HttpStatusMessages object to const.ts ([4424261](https://github.com/Alwatr/nanotron/commit/442426170c1cc667a8ac834f4b6d87c28da602ad)) by @AliMD
* Add MatchType type to type.ts ([21fe834](https://github.com/Alwatr/nanotron/commit/21fe83479483e70ac4f52ca83a479732836dcd4e)) by @AliMD
* Add NanotronApiConnection class and import dependencies ([ee952a5](https://github.com/Alwatr/nanotron/commit/ee952a5024b40e8f361c791a60e06714f355a4c6)) by @AliMD
* Add NanotronApiConnectionConfig interface ([995fad1](https://github.com/Alwatr/nanotron/commit/995fad15f92909ee62fb4032e5ad797ac5a45b9f)) by @AliMD
* Add NanotronApiServerConfig interface ([fe94be3](https://github.com/Alwatr/nanotron/commit/fe94be388d7f97b84ee0878595731e6f85886e6e)) by @AliMD
* Add reply method to NanotronApiConnection class ([494173c](https://github.com/Alwatr/nanotron/commit/494173c270c645b244a6611947c3f6e7280b4444)) by @AliMD
* Add replyError method to NanotronApiConnection class ([1489c34](https://github.com/Alwatr/nanotron/commit/1489c3485253db3805ac59ede2ad332191fe45f6)) by @AliMD
* Add replyHeaders property to NanotronApiConnection ([166f308](https://github.com/Alwatr/nanotron/commit/166f3086d94901a37ae2c5326727aaab3c6236bc)) by @AliMD
* Add replyJson method to NanotronApiConnection class ([028e6ef](https://github.com/Alwatr/nanotron/commit/028e6eff04e346fd33e9ebeb65c639a8841dabfa)) by @AliMD
* Add replyJsonError method to NanotronApiConnection class ([5cbb0a7](https://github.com/Alwatr/nanotron/commit/5cbb0a7e444a46d4aec1da469d4b5fe22a81bf97)) by @AliMD
* Add replySent property to NanotronApiConnection class ([ad955c3](https://github.com/Alwatr/nanotron/commit/ad955c397463dad707b56506eeaaecd3fc350f31)) by @AliMD
* Add replyStatusCode property to NanotronApiConnection class ([e92d71c](https://github.com/Alwatr/nanotron/commit/e92d71c71d6485bca56784ae43211f11cbf4cdbf)) by @AliMD
* Add RouteHandler type to type.ts ([0050dc3](https://github.com/Alwatr/nanotron/commit/0050dc3bee94c0d8fc663581f7c801c4782b34ce)) by @AliMD
* Add setRouteOption_ method to NanotronApiServer ([755cb93](https://github.com/Alwatr/nanotron/commit/755cb934d0ddff81e33436c0f787285e7dd378c8)) by @AliMD
* Add standard HTTP methods to const.ts ([eb9cf06](https://github.com/Alwatr/nanotron/commit/eb9cf061e557eac88c5b3fcab4f82ea3fb82ee5b)) by @AliMD
* Add version pattern and logger to NanotronApiConnection ([798af10](https://github.com/Alwatr/nanotron/commit/798af1064cb5a81b819a19b68efbf0aea92d8994)) by @AliMD
* HttpMethod type ([520ac4f](https://github.com/Alwatr/nanotron/commit/520ac4f8965d67023fafdf8dfcc3fde901462fc0)) by @AliMD
* new package for export all nanotron packages ([1c065d2](https://github.com/Alwatr/nanotron/commit/1c065d2c9de1e0a1e4202783c42e42b78a191098)) by @AliMD

### Bug Fixes

* build issue after update package.json ([9df6a58](https://github.com/Alwatr/nanotron/commit/9df6a5866d2b5542e89788f1cf2a1bea5cc369d3)) by @njfamirm

### Code Refactoring

* cleanup old nano-server ([0656967](https://github.com/Alwatr/nanotron/commit/06569674be239cca025e7f48810324aed6c03ede)) by @AliMD
* Import necessary modules and types in api-server.ts ([bd4253f](https://github.com/Alwatr/nanotron/commit/bd4253f4d5f1e7237cbf3a1e4d07e44e628ba2d8)) by @AliMD
* Remove unused 'client-id' header from IncomingHttpHeaders ([43617d8](https://github.com/Alwatr/nanotron/commit/43617d86189055c41a6f326e101a3dff834c8d28)) by @AliMD
* Update import paths for duration parsing ([97dd8aa](https://github.com/Alwatr/nanotron/commit/97dd8aa68e050127e444ef268e48246b6b7318c6)) by @AliMD
* Update import paths for duration parsing and update typescript SDK version to 5.6.2 ([7d8ea97](https://github.com/Alwatr/nanotron/commit/7d8ea97ed8d7741e26d3a609b30e42992d9fb051)) by @AliMD
* Update package description in api-server ([acfda5c](https://github.com/Alwatr/nanotron/commit/acfda5cbab6b764392db07031ab5aae79e42171e)) by @AliMD
* Update package description in api-server ([df4df3f](https://github.com/Alwatr/nanotron/commit/df4df3f9e71dcdca4f9f0b53199bf15fcb41fa5a)) by @AliMD
* Update test script in package.json to pass with no tests ([d215777](https://github.com/Alwatr/nanotron/commit/d2157778829531bce27370fc1626023a3dc7fb13)) by @AliMD

### Miscellaneous Chores

* add required deps ([32b8ade](https://github.com/Alwatr/nanotron/commit/32b8adeba96dbd68879d004fe44f2f2c88b2b624)) by @njfamirm
* cleanup extra packages ([20733c7](https://github.com/Alwatr/nanotron/commit/20733c7bc5335f4110a40a6eb8d6a24a2d940a32)) by @njfamirm
* copy config from nanolib ([3068614](https://github.com/Alwatr/nanotron/commit/30686143c0a85b571a011b02f98f6f8cfe6710b7)) by @njfamirm
* fix upd script ([10f2540](https://github.com/Alwatr/nanotron/commit/10f2540487028f1428c598ae5f485aa6550a3973)) by @AliMD
* rename http-server to nanotron-api-server ([7dd983e](https://github.com/Alwatr/nanotron/commit/7dd983e41e174349549fcdcf02ee202e74aa4453)) by @AliMD
* update .vscode/settings.json ([5dbbd41](https://github.com/Alwatr/nanotron/commit/5dbbd41b023ed60c3440f3b220bc6c3884b154ef)) by @AliMD
* Update lerna.json version to 0.0.0 ([0973e25](https://github.com/Alwatr/nanotron/commit/0973e250264d90f78a546656077830c73b84160d)) by @AliMD
* update package.json ([b411ca5](https://github.com/Alwatr/nanotron/commit/b411ca5514401c5e1a656d988ee51d9243e44dbd)) by @AliMD
* update package.json of each package from nanolib ([b8a7c8a](https://github.com/Alwatr/nanotron/commit/b8a7c8af9f88d36ac3c1ab6324b78890dc2023b3)) by @njfamirm

### Dependencies update

* bump github/codeql-action ([a485ab3](https://github.com/Alwatr/nanotron/commit/a485ab374f281307ac2aa01cf455c7b2baccfdaf)) by @dependabot[bot]
* update ([9af3b8f](https://github.com/Alwatr/nanotron/commit/9af3b8f2b3bfb0a3476d574948895b96f10c2235)) by @AliMD
* update ([f95134f](https://github.com/Alwatr/nanotron/commit/f95134fe5a4b61ee01eb84450807efb9ef099010)) by @AliMD
* update all ([e5242dc](https://github.com/Alwatr/nanotron/commit/e5242dc87799d2c4e64568c3b220881620d114e2)) by @njfamirm
* Update typescript SDK version to 5.6.2 ([edbbf5e](https://github.com/Alwatr/nanotron/commit/edbbf5eb0062a004166e741c2dd2e23e5909e5df)) by @AliMD
