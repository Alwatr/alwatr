# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.8.0](https://github.com/Alwatr/nitrobase/compare/v7.7.0...v7.8.0) (2025-03-06)

### Features

* **reference:** update save and saveImmediate methods to accept itemId parameter ([8fe304e](https://github.com/Alwatr/nitrobase/commit/8fe304ec47a2d86a6ca78e8cbea3efe7d231bc88)) by @

### Miscellaneous Chores

* **lerna:** remove hidden attribute from documentation and dependencies sections ([57ef8f5](https://github.com/Alwatr/nitrobase/commit/57ef8f5195acd47be136e874e05adb7d7c9349ad)) by @
* **reference:** remove unnecessary blank line in DocumentReference class ([eeb63b9](https://github.com/Alwatr/nitrobase/commit/eeb63b96e07e6638b1fcc4976de65571ed4267eb)) by @

### Dependencies update

* **deps-dev:** bump the dependencies group across 1 directory with 5 updates ([fe6ab37](https://github.com/Alwatr/nitrobase/commit/fe6ab37263f609f8bce8398462b7105b8e5a55fe)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 5 updates ([01920c1](https://github.com/Alwatr/nitrobase/commit/01920c1af84951a4a840fcbd6d103d5d2e08ff79)) by @dependabot[bot]
* update @alwatr/nanolib, @alwatr/nano-build, and @alwatr/type-helper to latest versions ([5f3f89b](https://github.com/Alwatr/nitrobase/commit/5f3f89b1236f66e9167957d60d43c8d0abff108d)) by @
* update prettier, typescript, and various dependencies to latest versions ([0768268](https://github.com/Alwatr/nitrobase/commit/0768268444b9bdcfa52e4439468a0903dc8e92d5)) by @

## [7.7.0](https://github.com/Alwatr/nitrobase/compare/v7.6.1...v7.7.0) (2025-02-26)

### Features

* **nginx:** add debugInfo to error response for enhanced troubleshooting ([ff29d37](https://github.com/Alwatr/nitrobase/commit/ff29d374becd60a2616caf170084dd4ba76359fb)) by @alimd
* **nginx:** add debugInfo variable to location templates for enhanced debugging ([1045c4c](https://github.com/Alwatr/nitrobase/commit/1045c4c624e84b009eb8d93efa978f790dbac351)) by @alimd

### Code Refactoring

* **nginx:** streamline debugInfo variable usage across location templates ([9dc0d91](https://github.com/Alwatr/nitrobase/commit/9dc0d91989679ba16769cbd97cada46db13eeced)) by @alimd

### Miscellaneous Chores

* **lerna:** remove skipBumpOnlyReleases option from configuration ([8fe3160](https://github.com/Alwatr/nitrobase/commit/8fe31606a373ca7ff9e87ca14352976d15cff76b)) by @
* **vscode:** set default formatter for nginx configuration files ([4f94715](https://github.com/Alwatr/nitrobase/commit/4f94715b365d69dac20c6ee26bca5e995e972149)) by @alimd

## [7.6.1](https://github.com/Alwatr/nitrobase/compare/v7.6.0...v7.6.1) (2025-02-26)

### Bug Fixes

* **nginx:** update error code in _error.json for improved clarity ([75f8c00](https://github.com/Alwatr/nitrobase/commit/75f8c004ce5918608cb28409d4e9dc17d4952b14)) by @alimd

### Performance Improvements

* **nginx:** refactor authorization handling by extracting user ID and token from http_authorization ([eda6324](https://github.com/Alwatr/nitrobase/commit/eda6324c58f0b8b3ecfe4864a3feb682c835ff06)) by @alimd

### Code Refactoring

* **nginx:** update user authentication checks to use empty string for undefined tokens ([ecde440](https://github.com/Alwatr/nitrobase/commit/ecde4408013e8fe31619ca16c898245ce071cf4e)) by @alimd

## [7.6.0](https://github.com/Alwatr/nitrobase/compare/v7.5.9...v7.6.0) (2025-02-26)

### Features

* **nginx:** add metadata labels to Dockerfile for improved image documentation ([4506dd2](https://github.com/Alwatr/nitrobase/commit/4506dd253e1c80929b92de8bf9f1957b90d345e2)) by @alimd
* **nginx:** upgrate nginx-json to version 3.5.0 ([b1e9424](https://github.com/Alwatr/nitrobase/commit/b1e942450692e259923c9d89b20ea0d88fafccca)) by @alimd

### Bug Fixes

* **nginx:** add $userIdPrefix in nitrobaseDebugPath ([9cfb014](https://github.com/Alwatr/nitrobase/commit/9cfb014abf116ada2ba5018641e37a52812e5d3c)) by @alimd
* **nginx:** add missing semicolon to user location variable assignment ([d45cfca](https://github.com/Alwatr/nitrobase/commit/d45cfca637c2d28d5ba1320496ad6f04c6eaa161)) by @alimd
* **nginx:** add user location extraction with lowercase userIdPrefix ([c84597d](https://github.com/Alwatr/nitrobase/commit/c84597db4c46f4c87d54d6ef2579c19958046dd7)) by @alimd
* **nginx:** convert prefix to lowercase in user location mapping ([8be764d](https://github.com/Alwatr/nitrobase/commit/8be764dfe09c7f89a939cdeed30f5fa2494f3dd2)) by @alimd
* **nginx:** correct user location variable assignment to preserve userIdPrefix casing ([b548c41](https://github.com/Alwatr/nitrobase/commit/b548c410b4331727593808428932432eff05c32c)) by @alimd
* **nginx:** disable PCRE JIT compilation in nginx configuration template ([e4f0130](https://github.com/Alwatr/nitrobase/commit/e4f01307aacf1bed84bb7825a99029e1fbab949c)) by @alimd
* **nginx:** refactor user ID mapping to improve variable handling ([6655cd8](https://github.com/Alwatr/nitrobase/commit/6655cd86f3014f9a8c97ce8b3667d8b37666c3c1)) by @alimd
* **nginx:** refine regex for extracting authUserId and authUserToken from authorization header ([de2424f](https://github.com/Alwatr/nitrobase/commit/de2424fc01d994227e25ac83e63c19adf0c1f5d7)) by @alimd
* **nginx:** remove unnecessary comment and simplify user location extraction ([f045547](https://github.com/Alwatr/nitrobase/commit/f0455475209f440e91e0e0c8161df97ce1bf2ac7)) by @alimd
* **nginx:** rename some configs files ([afd61d0](https://github.com/Alwatr/nitrobase/commit/afd61d0153ab325a3e2c2705973c417cbf07a6a2)) by @alimd
* **nginx:** simplify deny response in configuration template ([63355b8](https://github.com/Alwatr/nitrobase/commit/63355b897101eb46e7105e77e85e4e3646f4e174)) by @alimd
* **nginx:** simplify deny response in region secret location configuration ([5277057](https://github.com/Alwatr/nitrobase/commit/52770579e5b8d9dd6adab2bb01d4087efe3ce9bc)) by @alimd
* **nginx:** simplify userIdPrefix extraction by removing temporary variable mapping ([022d02c](https://github.com/Alwatr/nitrobase/commit/022d02cec348e04abfa679f649ebce36b0c08c06)) by @alimd
* **nginx:** update regex to convert prefix to lowercase in user location mapping ([ba4755d](https://github.com/Alwatr/nitrobase/commit/ba4755d2bc7058dde9d6c2ea2531f125d7bc440d)) by @alimd
* **nginx:** update user ID prefix extraction in mapping configuration ([4853183](https://github.com/Alwatr/nitrobase/commit/4853183d0066fd6f5a4d46d023a87ff6e9f07349)) by @alimd
* **nginx:** update user location check to use authUserToken for access control ([34fd852](https://github.com/Alwatr/nitrobase/commit/34fd85284d5af2e74bd274aa8ccfaf16f7a54d28)) by @alimd
* **nginx:** update user location check to use authUserToken for access control ([7015e0f](https://github.com/Alwatr/nitrobase/commit/7015e0fca41e7870f67a3a7abe5fce8a9a49ccc5)) by @alimd
* **nginx:** update user location check to use authUserToken for access control ([bad5f92](https://github.com/Alwatr/nitrobase/commit/bad5f922567aac5ce6edd24a33f0e955fd24dda1)) by @alimd
* **nginx:** update user location check to use authUserToken for access control ([6a41b55](https://github.com/Alwatr/nitrobase/commit/6a41b55e1d8d3c520af15c4f4322121752df38e3)) by @alimd
* **nginx:** update user location check to use authUserToken for access control ([40a0f29](https://github.com/Alwatr/nitrobase/commit/40a0f295defa00067cc157e39efdc3408f861155)) by @alimd
* **nginx:** update user location configuration to improve variable handling ([21e0be0](https://github.com/Alwatr/nitrobase/commit/21e0be0e717602fbfaa98df13381a2450d6ec1b5)) by @alimd
* **nginx:** update user location extraction to convert prefix to lowercase ([24cb75e](https://github.com/Alwatr/nitrobase/commit/24cb75e8542beb88495fd9d16bdb925c445c08f9)) by @alimd

### Performance Improvements

* **nginx:** enable PCRE JIT compilation in nginx configuration template ([4d22f01](https://github.com/Alwatr/nitrobase/commit/4d22f01cf98f06086ee3319ae0d905b158e1b506)) by @alimd

### Miscellaneous Chores

* **nginx:** update debug script to ensure deployment path exists before executing commands ([c5b333f](https://github.com/Alwatr/nitrobase/commit/c5b333ff677cfa2e28c7a78d742d4156ef3b3f1b)) by @alimd
* remove obsolete index.html file ([8bbed8d](https://github.com/Alwatr/nitrobase/commit/8bbed8df3c102885d8c2ffa696d607909c57ded4)) by @alimd
* rollback all versions ([9ff6c11](https://github.com/Alwatr/nitrobase/commit/9ff6c11ef3e44ea669a814da73ed39ddc2c8e971)) by @alimd
* **workflow:** remove image labels and add build arguments for date and revision ([bbe41ed](https://github.com/Alwatr/nitrobase/commit/bbe41ed641b875bdf58a27a7b0ee8ad53d7356bb)) by @alimd

### Dependencies update

* **deps-dev:** bump eslint-import-resolver-typescript ([e8ad95b](https://github.com/Alwatr/nitrobase/commit/e8ad95b1fc1b4169b5e03c455946c938cc87f71d)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 3 updates ([4e51263](https://github.com/Alwatr/nitrobase/commit/4e5126343c9cc42f8cc62081931d73e4bbd1dbfa)) by @dependabot[bot]

## [7.5.9](https://github.com/Alwatr/nitrobase/compare/v7.5.8...v7.5.9) (2025-02-20)

### Bug Fixes

* **nginx:** remove error message from 403 response for undefined users ([3c762c8](https://github.com/Alwatr/nitrobase/commit/3c762c859d057ebaf09f1a2d60f5e082cfd3a15b)) by @alimd

### Miscellaneous Chores

* **dependabot:** enable beta ecosystems for dependency updates ([ecc211d](https://github.com/Alwatr/nitrobase/commit/ecc211d3d16ccac90daa577f7468b844519ce228)) by @alimd

## [7.5.8](https://github.com/Alwatr/nitrobase/compare/v7.5.7...v7.5.8) (2025-02-18)

### Miscellaneous Chores

* **deps:** bump alwatr/nginx-json in /packages/nginx ([09bc34d](https://github.com/Alwatr/nitrobase/commit/09bc34d8bde53c390c925922df2983d2d9f928eb)) by @dependabot[bot]

### Dependencies update

* bump @alwatr/nanolib, @alwatr/nano-build, and @types/node to latest versions across multiple packages ([3e89c62](https://github.com/Alwatr/nitrobase/commit/3e89c62ad20f3afe0c38c6ae36d91bcb6199b231)) by @
* **deps-dev:** bump the dependencies group across 1 directory with 2 updates ([03715d0](https://github.com/Alwatr/nitrobase/commit/03715d0b5534b127dfb57ffe0ea713fb168eefe6)) by @dependabot[bot]
* **deps:** bump @octokit/endpoint from 10.1.1 to 10.1.3 ([c6f500c](https://github.com/Alwatr/nitrobase/commit/c6f500c5d97f6359664481e287b9c0285fba51e2)) by @dependabot[bot]
* **deps:** bump @octokit/plugin-paginate-rest from 11.4.0 to 11.4.2 ([cf23cc1](https://github.com/Alwatr/nitrobase/commit/cf23cc13b45c159bcbd4ef0caff3a70e0bedc54c)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 3 updates ([8b2981f](https://github.com/Alwatr/nitrobase/commit/8b2981f78e28395fd294e45f6fd310a97865d0e3)) by @dependabot[bot]

## [7.5.7](https://github.com/Alwatr/nitrobase/compare/v7.5.6...v7.5.7) (2025-02-03)

### Dependencies update

* update [@alwatr](https://github.com/alwatr) dependencies to latest versions ([f8bb10f](https://github.com/Alwatr/nitrobase/commit/f8bb10fa3343f25e2a442e80fbddb88c55fac813)) by @

## [7.5.6](https://github.com/Alwatr/nitrobase/compare/v7.5.5...v7.5.6) (2025-02-03)

### Bug Fixes

* bind storeChanged_ method in constructor for proper context ([#350](https://github.com/Alwatr/nitrobase/issues/350)) ([33cf076](https://github.com/Alwatr/nitrobase/commit/33cf0767fa6f78512b687580dc1260cf882c9197)) by @

### Miscellaneous Chores

* enable signing for git tags and commits in lerna configuration ([a7323c9](https://github.com/Alwatr/nitrobase/commit/a7323c9602c1cd5effc0b3cd3a5575f4bd07bf6b)) by @alimd

## [7.5.5](https://github.com/Alwatr/nitrobase/compare/v7.5.4...v7.5.5) (2025-02-02)

### Bug Fixes

* update callback invocation to use correct context in CollectionReference and DocumentReference ([7cc9fc9](https://github.com/Alwatr/nitrobase/commit/7cc9fc95967d5047b41b2c9c6fd56608256fdbeb)) by @alimd

### Miscellaneous Chores

* disable signing for git tags and commits in lerna configuration ([ae0a66e](https://github.com/Alwatr/nitrobase/commit/ae0a66e32f9784b5c41fb0b702c9e182a59f2b13)) by @

### Dependencies update

* **deps-dev:** bump @types/node ([d60ee96](https://github.com/Alwatr/nitrobase/commit/d60ee96716b8df7837b3d7f9fe4b8705c94e5af0)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 3 updates ([43b2fe7](https://github.com/Alwatr/nitrobase/commit/43b2fe7fe3699550b8845c3faf877e52c44e57f5)) by @dependabot[bot]
* update ([0b9eccd](https://github.com/Alwatr/nitrobase/commit/0b9eccd3b54dade17e3eeb94bd08612c57356801)) by @alimd

## [7.5.4](https://github.com/Alwatr/nitrobase/compare/v7.5.3...v7.5.4) (2025-01-12)

### Bug Fixes

* **nitrobase:** optional data in newStoreFile_ and throw Error when data not exist for document type ([6d2a173](https://github.com/Alwatr/nitrobase/commit/6d2a173ca4414d6928ef1b703dd0836648eb0787)) by @alimd
* **nitrobase:** remove initialData parameter from newCollection method ([56cacf0](https://github.com/Alwatr/nitrobase/commit/56cacf0e65e8be2d68f4621eaf4e6d847bf39293)) by @alimd
* **nitrobase:** required initial data  for newDocument ([61f1788](https://github.com/Alwatr/nitrobase/commit/61f178850594ccfc0c1a4ab9429cc2e0438eb11c)) by @alimd
* **reference:** remove initialData parameter from newRefFromData method and default data to an empty object ([c89c172](https://github.com/Alwatr/nitrobase/commit/c89c172d8ee1f6f5b7b56b2cef6f129cdf680277)) by @alimd
* **reference:** rename initialData parameter to data in newRefFromData method ([cf389b8](https://github.com/Alwatr/nitrobase/commit/cf389b8c80cccbf9e327c680c8ffbd3c595f2155)) by @alimd

### Code Refactoring

* **nitrobase:** bind storeChanged_ method directly instead of using bind in multiple locations ([dba1da6](https://github.com/Alwatr/nitrobase/commit/dba1da6bf095e6984af98d8e6c65c64fcc3fb5af)) by @alimd

### Miscellaneous Chores

* **yarn:** update checksumBehavior to reset in .yarnrc.yml ([53b5e8d](https://github.com/Alwatr/nitrobase/commit/53b5e8d8f4094f6430becdb31389f472a7242c61)) by @

### Dependencies update

* **deps-dev:** bump the dependencies group across 1 directory with 11 updates ([fdd30a6](https://github.com/Alwatr/nitrobase/commit/fdd30a6639ae7ead4e8dbfaca0295cb2bf0e6649)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 6 updates ([c564562](https://github.com/Alwatr/nitrobase/commit/c5645629157692bead0c97ce8398b8dc9744e51a)) by @dependabot[bot]
* update yarn to 4.6.0, typescript to 5.7.3-sdk, and prettier to 3.4.2-sdk ([f8c87e9](https://github.com/Alwatr/nitrobase/commit/f8c87e9ac208e70bed41db6d9564f8c5667fa54f)) by @

## [7.5.3](https://github.com/Alwatr/nitrobase/compare/v7.5.2...v7.5.3) (2024-11-11)

### Bug Fixes

* **debug:** sample data ([b3c3281](https://github.com/Alwatr/nitrobase/commit/b3c32814fe21cfc07e2a7cb78ef970a7c6c280ea)) by @AliMD
* **nginx:** add 403 response for undefined user locations in region authenticated config ([b59872f](https://github.com/Alwatr/nitrobase/commit/b59872f03d9fae7ce3b4502e041d5870c66e4058)) by @AliMD
* **nginx:** add 403 response for undefined user locations in region manager and owner configs ([1b9b491](https://github.com/Alwatr/nitrobase/commit/1b9b49135b39073387ee6ce6d79c6592cb3adc66)) by @AliMD
* **nginx:** add 403 response for undefined user locations in region per-user config ([cfb8c4e](https://github.com/Alwatr/nitrobase/commit/cfb8c4ee1ff4881660cd7b0225c824bdca2ac392)) by @AliMD
* **nginx:** add 403 response for undefined user locations in region public config ([5c060c8](https://github.com/Alwatr/nitrobase/commit/5c060c8b623a13ae9ddbabb90949fb969761d28e)) by @AliMD
* **nginx:** add custom message to 403 response in deny-other.conf.template ([f306a39](https://github.com/Alwatr/nitrobase/commit/f306a39c9affd4b2a2c17a94381d410dd183b426)) by @AliMD
* **nginx:** modify authentication logic to return 403 for unauthorized user locations ([c10116d](https://github.com/Alwatr/nitrobase/commit/c10116d60c6d7f85a2b0cbb5ba7456e29addaac1)) by @AliMD
* **nginx:** rename all files order ([8922752](https://github.com/Alwatr/nitrobase/commit/8922752b8d746e24f10dc7a24f8f2eefc7e6255f)) by @AliMD
* **nginx:** update 404 response for secret locations to include custom message ([c982522](https://github.com/Alwatr/nitrobase/commit/c982522426924048ca493ce3e090a2015aaf4a5c)) by @AliMD
* **nginx:** update base image to version 3.3.3 in Dockerfile ([65fb63a](https://github.com/Alwatr/nitrobase/commit/65fb63ae3fd5b09b4057874d51b98bc5a7f25d8c)) by @AliMD
* **nginx:** update base image to version 3.3.5 and modify CORS methods ([18bd47e](https://github.com/Alwatr/nitrobase/commit/18bd47ebc98dc0cf0b5bac66d72bdf953f68a0aa)) by @AliMD
* **nginx:** update library path and comment out unused curl requests in debug script ([c7cc148](https://github.com/Alwatr/nitrobase/commit/c7cc148fafaa34d7d6b3e51b475f6fcd37ab9634)) by @AliMD

## [7.5.2](https://github.com/Alwatr/nitrobase/compare/v7.5.1...v7.5.2) (2024-11-09)

### Bug Fixes

* **nginx:** comment out OPTIONS method handling in auth configuration ([25eb239](https://github.com/Alwatr/nitrobase/commit/25eb23943e5da8defebfd9fb4874e86384c2332d)) by @

## [7.5.1](https://github.com/Alwatr/nitrobase/compare/v7.5.0...v7.5.1) (2024-11-09)

### Bug Fixes

* **nginx:** skip return 403 for OPTIONS method in auth configuration ([18a62c3](https://github.com/Alwatr/nitrobase/commit/18a62c3e52c172619ec365526858dc46a5ba3554)) by @

## [7.5.0](https://github.com/Alwatr/nitrobase/compare/v7.4.1...v7.5.0) (2024-11-09)

### Features

* add `user-management` package ([dd0037c](https://github.com/Alwatr/nitrobase/commit/dd0037c9443459520c41f17adbac579069821f95)) by @mohammadhonarvar
* **nitrobase:** export `nitrobase-user-management` ([338e9ab](https://github.com/Alwatr/nitrobase/commit/338e9ab2699f2e532c194667e10a1aa4e795677f)) by @mohammadhonarvar
* **types:** add `AlwatrAuth` ([bff7ab6](https://github.com/Alwatr/nitrobase/commit/bff7ab6cc3850173c30cf3b0408cfda9584df185)) by @mohammadhonarvar
* **user-manaement:** add the initial sturcture ([2897b2c](https://github.com/Alwatr/nitrobase/commit/2897b2c43ce65f5683078fc51022ea3d5cf952af)) by @mohammadhonarvar

### Bug Fixes

* **nginx:** change return code from 444 to 403 for unauthorized user access ([7cdb33d](https://github.com/Alwatr/nitrobase/commit/7cdb33d66c1c98f118c623a4cc116d9f60da344a)) by @AliMD
* **nginx:** update base image from 3.2.0 to 3.3.1 in Dockerfile ([6378cb3](https://github.com/Alwatr/nitrobase/commit/6378cb3913937f9bd09f514648b1f77a06af317f)) by @AliMD
* **user-management:** complete codes & types ([838bfd2](https://github.com/Alwatr/nitrobase/commit/838bfd2ca19fb0443beb68903b60cd8aa9c2f791)) by @mohammadhonarvar
* **user-management:** review's feedback ([77b2796](https://github.com/Alwatr/nitrobase/commit/77b2796095f4ad87895df9de5f559dae07537020)) by @mohammadhonarvar
* **user-management:** update `directory` & `homepage` ([32f54f6](https://github.com/Alwatr/nitrobase/commit/32f54f681541373ea3fc8c460d711c04b64c7871)) by @mohammadhonarvar
* **user-management:** update version & name ([1db77da](https://github.com/Alwatr/nitrobase/commit/1db77daa422efe05a1ec4e6156bd6a053bea14ae)) by @mohammadhonarvar
* **workflow:** enable test mode for nginx container tests ([d5bcae5](https://github.com/Alwatr/nitrobase/commit/d5bcae560d216a73bc6ebd6170f4582785d842b0)) by @AliMD

### Code Refactoring

* **engine:** make `config` as a public property ([6453540](https://github.com/Alwatr/nitrobase/commit/6453540aac42340cfe3b7ac9e4c26f904aaccdcc)) by @mohammadhonarvar
* **user-management:** remove commented-out code and clean up interface ([f32ac45](https://github.com/Alwatr/nitrobase/commit/f32ac45c14ffe2e5c1b2eb664c1add182a975d1c)) by @AliMD

### Dependencies update

* update ([222692c](https://github.com/Alwatr/nitrobase/commit/222692ce3074b81a138174d147b237595bfaf6df)) by @mohammadhonarvar

## [7.4.1](https://github.com/Alwatr/nitrobase/compare/v7.4.0...v7.4.1) (2024-11-08)

### Bug Fixes

* **nitrobase:** update build:es script to use module3 preset ([0f5c497](https://github.com/Alwatr/nitrobase/commit/0f5c4974ddf66b9d0de3a0d860f6756a05180491)) by @AliMD

## [7.4.0](https://github.com/Alwatr/nitrobase/compare/v7.3.1...v7.4.0) (2024-11-08)

### Features

* **nginx:** default CORS configuration ([bb69e47](https://github.com/Alwatr/nitrobase/commit/bb69e47ad14b061b6a0d47653d3fbed2e379ea3e)) by @
* **nitrobase:** add exports for nitrobase-helper and nitrobase-types in main.ts ([865fcc8](https://github.com/Alwatr/nitrobase/commit/865fcc89f880448fc2ce89ce576ee912c68ab5b4)) by @

### Code Refactoring

* **nitrobase:** rename helper.ts to client.ts and update exports ([c328892](https://github.com/Alwatr/nitrobase/commit/c3288925ed7f30885cd309390767c7865b8c0cee)) by @
* **nitrobase:** separate `export`s based on the `package`s name ([4b1f241](https://github.com/Alwatr/nitrobase/commit/4b1f24139aceda18b7a593007077652f642bb462)) by @mohammadhonarvar
* **nitrobase:** update `exports` & remove extra files ([c406705](https://github.com/Alwatr/nitrobase/commit/c40670587b16bbf81e5e2449be30578054abbfbe)) by @mohammadhonarvar

### Miscellaneous Chores

* **deps:** bump alwatr/nginx-json in /packages/nginx ([f86339f](https://github.com/Alwatr/nitrobase/commit/f86339ffdcbd52c06885be6b1b10c54bd823b419)) by @dependabot[bot]
* **dockerfile:** update label version ([f25eb3b](https://github.com/Alwatr/nitrobase/commit/f25eb3b04b1646eddcf75d15e4f38834ef57ac7e)) by @AliMD
* **workflow:** remove commented-out nitrobase-api job from publish-container.yml ([0c65d33](https://github.com/Alwatr/nitrobase/commit/0c65d33f6c3dcd0d319091ed48e89a742861ec72)) by @

### Dependencies update

* bump @alwatr/nanolib from 5.2.0 to 5.2.1 across multiple packages ([e1f87b0](https://github.com/Alwatr/nitrobase/commit/e1f87b07d33e8227440256a70f012aa63410f153)) by @
* **deps-dev:** bump @types/node in the dependencies group ([67ffbad](https://github.com/Alwatr/nitrobase/commit/67ffbad06c95c304d47acbe46fd137fb4cf69f95)) by @dependabot[bot]
* **deps:** bump @alwatr/nanolib from 5.0.0 to 5.2.0 in the alwatr group ([dfa1eef](https://github.com/Alwatr/nitrobase/commit/dfa1eefb191bbaac2ff2fff410bb1d3ec615d959)) by @dependabot[bot]

## [7.3.1](https://github.com/Alwatr/nitrobase/compare/v7.3.0...v7.3.1) (2024-11-02)

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group with 8 updates ([63f7adc](https://github.com/Alwatr/nitrobase/commit/63f7adc5ff83d4876f34d4f089a4be9b95b711a6)) by @dependabot[bot]
* **deps:** bump alwatr/nginx-json in /packages/nginx ([6b965bc](https://github.com/Alwatr/nitrobase/commit/6b965bc0426be815c3c5d38296d798bbdb2b4f60)) by @dependabot[bot]
* **deps:** bump github/codeql-action in the github-actions group ([b84174a](https://github.com/Alwatr/nitrobase/commit/b84174a54ff5873879ee612dd26e62a261a39e47)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 2 updates ([20fb436](https://github.com/Alwatr/nitrobase/commit/20fb436b9f146d5ec7452a693c7af8faa32bedff)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 5 updates ([efff4e2](https://github.com/Alwatr/nitrobase/commit/efff4e2164f2ad38c6b3c1735e287569e7495195)) by @dependabot[bot]
* **Dockerfile:** update label version ([9b59694](https://github.com/Alwatr/nitrobase/commit/9b596946662766c90b7b816359401f47252c0f85)) by @AliMD
* **vscode:** add copilot instructions and update extension recommendations ([17c4b25](https://github.com/Alwatr/nitrobase/commit/17c4b25ad687f0b6433f3b76d2a83a568554c55a)) by @AliMD

### Dependencies update

* **deps-dev:** bump @types/node in the dependencies group ([dd3e94a](https://github.com/Alwatr/nitrobase/commit/dd3e94a4c007da8fddda4cfeffe5f0763d74952e)) by @dependabot[bot]
* **deps:** bump the alwatr group with 6 updates ([eb9eeb1](https://github.com/Alwatr/nitrobase/commit/eb9eeb1901f7947cde783bf6f06340c984d6f59d)) by @dependabot[bot]
* update ([134465f](https://github.com/Alwatr/nitrobase/commit/134465f82e776dc44468b1b1f3861be16c16f35d)) by @
* update dependabot configuration for improved dependency management ([3182ec0](https://github.com/Alwatr/nitrobase/commit/3182ec040f7ef668cc0b7982894d71b5daccd6da)) by @AliMD

## [7.3.0](https://github.com/Alwatr/nitrobase/compare/v7.2.1...v7.3.0) (2024-10-11)

### Features

* update `import`s & packages based on the latest changes of `nanolib` & prevent side-effects ([0d66f89](https://github.com/Alwatr/nitrobase/commit/0d66f894dc4ff615ab73ebd27c275f98dc384fbe)) by @mohammadhonarvar

### Bug Fixes

* **helper:** Update dependencies and packages for @alwatr/type-helper ([b57a97d](https://github.com/Alwatr/nitrobase/commit/b57a97da61af4217b6a0aeaa82190fbc132f61b7)) by @AliMD

### Code Refactoring

* update `import`s & packages based on the latest changes of `nanolib` ([ce990a2](https://github.com/Alwatr/nitrobase/commit/ce990a2fedc5545e971c3bb6e58b55bfba8c0bd9)) by @mohammadhonarvar

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group with 10 updates ([7bdcf3f](https://github.com/Alwatr/nitrobase/commit/7bdcf3f47ddb8e1376a1c7ae6e221811182bae58)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 10 updates ([60afdde](https://github.com/Alwatr/nitrobase/commit/60afdde98562f3023e6624ee0579d6bdee80bc32)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 6 updates ([1cf29b2](https://github.com/Alwatr/nitrobase/commit/1cf29b20055554945cd669ea9d022ab7c503d9fc)) by @dependabot[bot]
* **deps:** bump the github-actions group with 2 updates ([1d8ab42](https://github.com/Alwatr/nitrobase/commit/1d8ab42a980bacda52df2250f7d39f4e64e12a69)) by @dependabot[bot]
* **deps:** bump the github-actions group with 5 updates ([92522b8](https://github.com/Alwatr/nitrobase/commit/92522b8f28fa42aaa6c5640aa631cab57a9f5039)) by @dependabot[bot]

### Dependencies update

* cleanup dependencies ([91eab0b](https://github.com/Alwatr/nitrobase/commit/91eab0b0fc570b2493cccd5ccd891b01405450d7)) by @AliMD
* update ([aac3f93](https://github.com/Alwatr/nitrobase/commit/aac3f937b50c7099495faa04492d5baa4af86b97)) by @AliMD
* update ([051a098](https://github.com/Alwatr/nitrobase/commit/051a0989762b9c62a43002f99f2962b626ca7de0)) by @mohammadhonarvar

## [7.2.1](https://github.com/Alwatr/nitrobase/compare/v7.2.0...v7.2.1) (2024-09-29)

### Bug Fixes

* **nitrobase:** export helper ([ca17b18](https://github.com/Alwatr/nitrobase/commit/ca17b18c37f5c78ec7d8afcee7affdeb31e9a946)) by @njfamirm

### Miscellaneous Chores

* change the license to AGPL-3.0 ([59a45c4](https://github.com/Alwatr/nitrobase/commit/59a45c4ae3791176f1b83fcbf087d212e8e4c641)) by @ArmanAsadian
* **deps-dev:** bump @types/node in the development-dependencies group ([9b146d2](https://github.com/Alwatr/nitrobase/commit/9b146d2f6cf7d1d79a2a6f46a5e8f50e7fb2ac75)) by @dependabot[bot]
* **deps:** bump the github-actions group with 3 updates ([e53e8fc](https://github.com/Alwatr/nitrobase/commit/e53e8fc54a63e5e6a23101368f99b68250cfeac6)) by @dependabot[bot]
* **engine:** change the license to AGPL-3.0 ([f9d89d5](https://github.com/Alwatr/nitrobase/commit/f9d89d5de592b4df397c9b15156166aed90fa8d1)) by @ArmanAsadian
* **helper:** change the license to AGPL-3.0 ([1fe19df](https://github.com/Alwatr/nitrobase/commit/1fe19dfdb234bf4510c1e62453beccb767d373e5)) by @ArmanAsadian
* **nginx:** change the license to AGPL-3.0 ([e2cf692](https://github.com/Alwatr/nitrobase/commit/e2cf6922a6c403408d36e4a5b3eab147ce76dfa4)) by @ArmanAsadian
* **nitrobase:** change the license to AGPL-3.0 ([15a9859](https://github.com/Alwatr/nitrobase/commit/15a98595ebf6c6f7cb8c30715c729b7994c2169f)) by @ArmanAsadian
* **reference:** change the license to AGPL-3.0 ([44ff664](https://github.com/Alwatr/nitrobase/commit/44ff664e5bd5838ae773af1f3de5230df8378b19)) by @ArmanAsadian
* **types:** change the license to AGPL-3.0 ([b45e0a4](https://github.com/Alwatr/nitrobase/commit/b45e0a417b5d00735bc893236e72111e4caac63d)) by @ArmanAsadian

### Dependencies update

* update ([90a0fe1](https://github.com/Alwatr/nitrobase/commit/90a0fe146eb703c183c116776d7c5748918282da)) by @

## [7.2.0](https://github.com/Alwatr/nitrobase/compare/v7.1.1...v7.2.0) (2024-09-24)

### Code Refactoring

* rename all store to nitrobase ([0928420](https://github.com/Alwatr/nitrobase/commit/0928420d8751e16ff1e8d91e1d3048a5895885a6)) by @AliMD
* rename all store to nitrobase ([9e31765](https://github.com/Alwatr/nitrobase/commit/9e31765b63ecd94bcf600cb44cfd9e341dd11a4e)) by @AliMD
* rename package reference from "store" to "nitrobase" ([9d19482](https://github.com/Alwatr/nitrobase/commit/9d19482cfb15ba1332cf6fa717b71627f2d600f8)) by @AliMD

## [7.1.1](https://github.com/Alwatr/nitrobase/compare/v7.1.0...v7.1.1) (2024-09-24)

### Bug Fixes

* **nginx:** update nitrobase prefix to latest version ([679a14b](https://github.com/Alwatr/nitrobase/commit/679a14b4c3f96b58e8b3bcb90f7af4a2d6b99149)) by @njfamirm

### Miscellaneous Chores

* Delete old LICENSE ([0ac4a06](https://github.com/Alwatr/nitrobase/commit/0ac4a06d086a694782a62194c694c2e1ec778854)) by @AliMD
* **deps-dev:** bump the development-dependencies group across 1 directory with 3 updates ([122251c](https://github.com/Alwatr/nitrobase/commit/122251c315c422b7e9c2d5aba827f27b321194bb)) by @dependabot[bot]
* **deps:** bump github/codeql-action in the github-actions group ([840b91b](https://github.com/Alwatr/nitrobase/commit/840b91bdb8b8120711d0b31be03038a4e698cb31)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 9 updates ([2a94694](https://github.com/Alwatr/nitrobase/commit/2a94694b2ec12c2915aa77934023328751d13837)) by @dependabot[bot]
* new LICENSE ([8b002a4](https://github.com/Alwatr/nitrobase/commit/8b002a48e4f997c19be9b570b294bb4f45499edc)) by @AliMD

### Dependencies update

* update ([82c475e](https://github.com/Alwatr/nitrobase/commit/82c475e29bd7f42ad03660556f40f180b3b6c9c6)) by @AliMD

## [7.1.0](https://github.com/Alwatr/nitrobase/compare/v7.0.0...v7.1.0) (2024-09-08)

### Features

* **engine:** add @alwatr/nitrobase-helper package ([66bca93](https://github.com/Alwatr/nitrobase/commit/66bca93e46f344b54b6f9eb57f4a680247e36157)) by @AliMD
* **helper:** add @alwatr/nitrobase-helper package ([158377c](https://github.com/Alwatr/nitrobase/commit/158377c69a2fe9ead17fa8160f95298fbbae19ec)) by @AliMD
* **reference:** add @alwatr/nitrobase-helper package ([a9077ae](https://github.com/Alwatr/nitrobase/commit/a9077aeff62c8c06ad2ac9eed1f2e637a1ba0b9b)) by @AliMD

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group with 2 updates ([f6d8374](https://github.com/Alwatr/nitrobase/commit/f6d837417886ccf3719100570194434455fda365)) by @dependabot[bot]
* **deps:** bump github/codeql-action in the github-actions group ([38c8fea](https://github.com/Alwatr/nitrobase/commit/38c8feac66c235d90c975090f05206fb37fd1e7f)) by @dependabot[bot]
* **vscode:** update settings.json ([ad90759](https://github.com/Alwatr/nitrobase/commit/ad90759468c9a710a330ff50cfefd58b121c6af9)) by @AliMD

### Dependencies update

* update ([09c86a3](https://github.com/Alwatr/nitrobase/commit/09c86a3f6149feff6ab2abef218d16d631a8c8db)) by @AliMD

## [7.0.0](https://github.com/Alwatr/nitrobase/compare/v7.0.0-beta.1...v7.0.0) (2024-09-02)

### ⚠ BREAKING CHANGES

* The `StoreFileMeta` interface has been updated to include the `extra` property. Developers should update their code to handle the new property.
* The ver property has been removed from the StoreFileMeta interface. Developers should update their code to remove any references to the ver property.
* The `update` method has been replaced with `replaceData` in the `DocumentReference` class. Developers should update their code to use the new method name.
* The `updateMetadata_` method has been replaced with `refreshMetadata_` in the `CollectionReference` class. Developers should update their code to use the new method name.
* The `updatePartial` method has been replaced with `mergeItemData` in the `CollectionReference` class. Developers should update their code to use the new method name.
* `update` method in CollectionReference has been replaced with `replaceItemData`
* `remove` renamed to `removeItem` in CollectionReference
* `append` renamed to `appendItem` in CollectionReference
* `add` renamed to `addItem` in CollectionReference
* `getItem` renamed to `getItemData` in CollectionReference
* exists renamed to itemExists in CollectionReference
* version in metadata removed

### Features

* Add `extra` meta for `collection-reference.ts` and `document-reference.ts` with migrate old versions ([8182369](https://github.com/Alwatr/nitrobase/commit/81823692edacacb95a53d55218c2c818c9fa13cb)) by @AliMD
* add `extra` property to StoreFileMeta ([5cdb573](https://github.com/Alwatr/nitrobase/commit/5cdb5735c2faf888a3fcea466ec3fd848e60148e)) by @AliMD
* Add Alwatr Nitrobase package ([a77a71b](https://github.com/Alwatr/nitrobase/commit/a77a71b883e861d7e26e058bbbc9b513770eb970)) by @AliMD
* Add getStoreList method to AlwatrNitrobase ([25ace2a](https://github.com/Alwatr/nitrobase/commit/25ace2aa4e32d9ad99d6ac2e63ac783462b9f4e5)) by @AliMD
* Add methods for managing extra metadata in DocumentReference ([5c0ae83](https://github.com/Alwatr/nitrobase/commit/5c0ae83980ba863b99f3d53ee7c7b91c31bf61c0)) by @AliMD
* Add migrateName property to StoreFileStat ([f5b4f39](https://github.com/Alwatr/nitrobase/commit/f5b4f3904cec69ad96089daa800ed4243bd0f33e)) by @AliMD
* Update type imports in alwatr-nitrobase.ts ([68064c4](https://github.com/Alwatr/nitrobase/commit/68064c4430c5aad8bca49d1f2a9270d6e64b051e)) by @AliMD

### Bug Fixes

* **CollectionReference:** logger issues ([9660fb2](https://github.com/Alwatr/nitrobase/commit/9660fb22dce5670c16028441c60f0715f537467a)) by @AliMD
* **engine:** set the correct names ([076fa3e](https://github.com/Alwatr/nitrobase/commit/076fa3e0d7cfe673cc58418153b7dc2aacfb340a)) by @mohammadhonarvar
* **packages/engine:** apply some new name of methods ([e3d5712](https://github.com/Alwatr/nitrobase/commit/e3d5712e19406f58fb87b822e036df5847aab6c0)) by @mohammadhonarvar
* **reference:** set the correct names ([e55300e](https://github.com/Alwatr/nitrobase/commit/e55300e908526b38b17274c65b9e3b8fa0387a96)) by @mohammadhonarvar
* **nitrobase/demo:** compatible with new apis ([a4d4d03](https://github.com/Alwatr/nitrobase/commit/a4d4d031366f798cef1e3bb36237272cbb5d12d3)) by @AliMD

### Code Refactoring

* Add methods for managing extra metadata in CollectionReference ([eed99f5](https://github.com/Alwatr/nitrobase/commit/eed99f5d596885b715a6a51fc3b6fb885dbeadb5)) by @AliMD
* **engine:** use  `hasItem` ([e17afa7](https://github.com/Alwatr/nitrobase/commit/e17afa7ef050cbf9f349dd6919739a01764aa24f)) by @mohammadhonarvar
* move all demo from engine to srore package ([e34fc49](https://github.com/Alwatr/nitrobase/commit/e34fc49c71703cd287559ca4fb23f9f13842b2d0)) by @AliMD
* **reference:** rename  `itemExists` to `hasItem` ([f49e776](https://github.com/Alwatr/nitrobase/commit/f49e77655e3507bce2d4359dcebabb4e048bc6ec)) by @mohammadhonarvar
* Refresh metadata in CollectionReference when updating or refreshing items ([b7108c7](https://github.com/Alwatr/nitrobase/commit/b7108c72a04441afddabd2bb30432b22a4d31f51)) by @AliMD
* Refresh metadata in DocumentReference when updating ([50d3ea8](https://github.com/Alwatr/nitrobase/commit/50d3ea82ea6044e194eed7554be42c509b8377f1)) by @AliMD
* Remove unused "ALWATR_DEBUG" environment variable from build script ([26e7642](https://github.com/Alwatr/nitrobase/commit/26e764280e0a2827904762ed3de21a9966ddfc63)) by @AliMD
* remove ver in metadata and Update file format version to 3 in CollectionReference and DocumentReference ([4bf146e](https://github.com/Alwatr/nitrobase/commit/4bf146ed5b1cbd2b340b3c0f3c5f6911aeed6f6d)) by @AliMD
* Remove ver property from StoreFileMeta ([3c27903](https://github.com/Alwatr/nitrobase/commit/3c2790330c71857ffafd41495610abdd691c5486)) by @AliMD
* Rename add method to addItem in CollectionReference ([60a859b](https://github.com/Alwatr/nitrobase/commit/60a859b920ba57e2e98b2cc7b4d25d978e649944)) by @AliMD
* Rename append method to appendItem in CollectionReference ([949f261](https://github.com/Alwatr/nitrobase/commit/949f261fc12c93cd89b3480a2c1aaa8054af477a)) by @AliMD
* Rename exists method to itemExists in CollectionReference ([7555803](https://github.com/Alwatr/nitrobase/commit/7555803cdf5fd737b013f2ecd340f5b6936b9c65)) by @AliMD
* Rename getItem method to getItemData in CollectionReference ([e592ae5](https://github.com/Alwatr/nitrobase/commit/e592ae5511e8e81a702f3d0283b2aa20a93edc74)) by @AliMD
* Rename remove method to removeItem in CollectionReference ([6238cae](https://github.com/Alwatr/nitrobase/commit/6238cae8e46b379d00559b54c27aedc793ca77c2)) by @AliMD
* Rename update method to replaceData in DocumentReference ([367257c](https://github.com/Alwatr/nitrobase/commit/367257c13255a1537d87d948ed0f303368b2ae2d)) by @AliMD
* Rename updatePartial method to mergeData in DocumentReference ([cbc1194](https://github.com/Alwatr/nitrobase/commit/cbc119410b3a58d554c30dfc01eafbdb91b4c49a)) by @AliMD
* Rename updatePartial method to mergeItemData in CollectionReference ([e091900](https://github.com/Alwatr/nitrobase/commit/e09190062e9387d7abad0d395a921b94b4efea18)) by @AliMD
* Replace id_ with documentId and collectionId in AlwatrNitrobase ([e58d0fd](https://github.com/Alwatr/nitrobase/commit/e58d0fd905722352238e11ed4e308907485f8ff5)) by @AliMD
* Replace update method with replaceItemData in CollectionReference ([45a9309](https://github.com/Alwatr/nitrobase/commit/45a9309887ed6db4ac452b6dbc48a8cb4b38c7c7)) by @AliMD
* Update migrate process in CollectionReference and DocumentReference ([5a25ae2](https://github.com/Alwatr/nitrobase/commit/5a25ae2674dfa3eda78b6995b0af3beb4ab885c5)) by @AliMD
* Update type imports in alwatr-nitrobase.ts ([d6f02ad](https://github.com/Alwatr/nitrobase/commit/d6f02ad5b779d04aa1b484bff96369483393af15)) by @AliMD
* Update type imports in alwatr-nitrobase.ts ([b6a4aba](https://github.com/Alwatr/nitrobase/commit/b6a4aba2e5fc51585d69b047a9bd22c49ed2098a)) by @AliMD
* Update type imports in alwatr-nitrobase.ts ([274d234](https://github.com/Alwatr/nitrobase/commit/274d234e6653cade2288288a4894feb7314987a2)) by @AliMD
* Update validateContext__ method in CollectionReference and DocumentReference ([4dfee95](https://github.com/Alwatr/nitrobase/commit/4dfee95f7eb04cf12afc4df1f275c5495f78ad6a)) by @AliMD
* Update validateContext__ method in CollectionReference and DocumentReference ([bb0ae6a](https://github.com/Alwatr/nitrobase/commit/bb0ae6ab62e6fe34ff916adba74aba6a2a0b304a)) by @AliMD

### Miscellaneous Chores

* **lerna:** prepare to graduate release ([ad73c79](https://github.com/Alwatr/nitrobase/commit/ad73c79b5c990a90cd4d3f79dc6efd324b4a8958)) by @

### Dependencies update

* update ([6411ff7](https://github.com/Alwatr/nitrobase/commit/6411ff7d49323b8bbf0dbb03fbc3c640b433a8bb)) by @

## [7.0.0-beta.1](https://github.com/Alwatr/nitrobase/compare/v7.0.0-beta.0...v7.0.0-beta.1) (2024-08-31)

### Code Refactoring

* move schemaVer to storeId ([322b76d](https://github.com/Alwatr/nitrobase/commit/322b76d8432752f979e1d4fc3c2250e22945fd36)) by @
* Remove unnecessary debug flag ([bdebb58](https://github.com/Alwatr/nitrobase/commit/bdebb5856310efd3628edb236f790968d94035fa)) by @
* Update demo for test schemaVer ([4d5038b](https://github.com/Alwatr/nitrobase/commit/4d5038b3a5ae390355e2bd6524f7edc66fedc65c)) by @

## [7.0.0-beta.0](https://github.com/Alwatr/nitrobase/compare/v6.2.1...v7.0.0-beta.0) (2024-08-31)

### ⚠ BREAKING CHANGES

* The `update` method in the `DocumentReference` not available anymore. use `updatePartial` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* **DocumentReference:** The `set` method in the `DocumentReference` not available anymore. use `update` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* **DocumentReference:** The `meta` method in the `DocumentReference` not available anymore. use `getStoreMetadata` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* **DocumentReference:** The `get` method in the `DocumentReference` not available anymore. use `getData` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* **CollectionReference:** The `updateMeta_` method in the `CollectionReference` not available anymore. use `updateMetadata_` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* **CollectionReference:** The `update` method in the `CollectionReference` not available anymore. use `updatePartial` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* **CollectionReference:** The `set` method in the `CollectionReference` not available anymore. use `update` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* The `delete` method in the `CollectionReference` not available anymore. use `remove` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* The `create` method in the `CollectionReference` not available anymore. use `add` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* The `access_` method in the `CollectionReference` not available anymore. use `getItemContext_` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* **CollectionReference:** The `metaItem` method in the `CollectionReference` not available anymore. use `getItemMetadata` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* The `meta` method in the `CollectionReference` not available anymore. use `getStoreMetadata` instead.

Co-authored-by: Mohammad Honarvar <honarvar.info@gmail.com>

* The `deleteFile` method has been renamed to `remove`. Update your code accordingly.
* The `doc` and `collection` methods have been deprecated and should no longer be used. Instead, use the `openDocument` and `openCollection` methods.

### Features

* Add newDocument and newCollection methods to AlwatrNitrobase ([363f820](https://github.com/Alwatr/nitrobase/commit/363f820a104e49a49746c95e7f303982d3ecb481)) by @AliMD
* Open document and collection with given id in AlwatrNitrobase ([5041a20](https://github.com/Alwatr/nitrobase/commit/5041a20bbf6dc3a26499aac4649e8c0d17c23537)) by @AliMD
* Rename `meta` method to `getStoreMetadata` in CollectionReference ([44ee78e](https://github.com/Alwatr/nitrobase/commit/44ee78eaf50d8529aa6362f6dfa13804081a0f7d)) by @AliMD

### Bug Fixes

* **alwatr-nitrobase:** logger methods name issue ([4798d15](https://github.com/Alwatr/nitrobase/commit/4798d1527d05f1c7c79ddf03520e3478c0dae529)) by @AliMD
* logger method name in CollectionReference and DocumentReference ([f84f288](https://github.com/Alwatr/nitrobase/commit/f84f288f906fdc707fdc7f49fd6159c1c270e1ec)) by @AliMD

### Code Refactoring

* **AlwatrNitrobase:** compatible with new api ([42c30f2](https://github.com/Alwatr/nitrobase/commit/42c30f2c7a066305eaba5e6fae50bfa5dc4502c8)) by @AliMD
* **CollectionReference:** Rename `item__` method parameter from `id` to `itemId` ([c0cde18](https://github.com/Alwatr/nitrobase/commit/c0cde18b1ac456e29118132ee88c9f115cc44442)) by @AliMD
* **CollectionReference:** Rename `metaItem` method to `getItemMetadata` in CollectionReference ([3c9cfdb](https://github.com/Alwatr/nitrobase/commit/3c9cfdb741312aa626538a795f7980a140b12f6e)) by @AliMD
* **CollectionReference:** Rename `set` method to `update` in CollectionReference ([258d739](https://github.com/Alwatr/nitrobase/commit/258d739e2f00b4f2f548de6158dcdcbfdf6ddf63)) by @AliMD
* **CollectionReference:** Rename `update` method to `updatePartial` in CollectionReference ([d8a438a](https://github.com/Alwatr/nitrobase/commit/d8a438a5b9f5b3d9145ccb74ad980c4f22e40914)) by @AliMD
* **CollectionReference:** Rename `updateMeta_` method to `updateMetadata_` in CollectionReference ([815fd1d](https://github.com/Alwatr/nitrobase/commit/815fd1d3a301d60304c58117a64fc20a2ac9ef64)) by @AliMD
* **demo:** compatible with new api ([a76cc74](https://github.com/Alwatr/nitrobase/commit/a76cc7403610661c42099aae254ca5989bda1bff)) by @AliMD
* **DocumentReference:** Rename `get` method to `getData` in DocumentReference ([0c3c37e](https://github.com/Alwatr/nitrobase/commit/0c3c37eb733a94bce78c532bac6167be312c6a9f)) by @AliMD
* **DocumentReference:** Rename `meta` method to `getStoreMetadata` in DocumentReference ([3bed92f](https://github.com/Alwatr/nitrobase/commit/3bed92f482444d048edfb369355a61f115a78b09)) by @AliMD
* **DocumentReference:** Rename `set` method to `update` in DocumentReference ([5467a66](https://github.com/Alwatr/nitrobase/commit/5467a66daddbd8976953aaac1a900abe67e9c4a3)) by @AliMD
* Remove unnecessary debug flag from yarn script ([7f21798](https://github.com/Alwatr/nitrobase/commit/7f217981fb9c53c01f469a1a0b2761d856dc7337)) by @AliMD
* Rename `access_` method to `getItemContext_` ([76dd262](https://github.com/Alwatr/nitrobase/commit/76dd26210e4252ef536f304a43f83007d362af32)) by @AliMD
* Rename `create` method to `add` in CollectionReference ([0a0ee28](https://github.com/Alwatr/nitrobase/commit/0a0ee28b200173c615bb8835929e8baa7a0a5463)) by @AliMD
* Rename `delete` method to `remove` in CollectionReference ([017b315](https://github.com/Alwatr/nitrobase/commit/017b31591aa69078492f262ccb41b857b937994e)) by @AliMD
* rename `deleteFile` method to `remove` ([7356079](https://github.com/Alwatr/nitrobase/commit/735607933f78424ff7bdb6728f0e7b6eb18ca8a1)) by @AliMD
* Rename `get` method to `getItem` in CollectionReference ([846ccff](https://github.com/Alwatr/nitrobase/commit/846ccff9012e52d930771946b98a7dd93c82977c)) by @AliMD
* Rename `update` method to `updatePartial` in DocumentReference ([c16d164](https://github.com/Alwatr/nitrobase/commit/c16d164900954b7d51c516b5f7637e54b1fb8ab7)) by @AliMD
* update parameter name in CollectionReference.exists method ([bb06487](https://github.com/Alwatr/nitrobase/commit/bb06487a1fe94d84bf3ff7ba7c44ae5600b1d689)) by @AliMD
* update StoreFileStat type to make extension property optional ([e75a186](https://github.com/Alwatr/nitrobase/commit/e75a186fbafd30a3d745467a973bec06e1d8109e)) by @AliMD
* updates the `storeChanged__` method name to `storeChanged_`. ([8fd35fa](https://github.com/Alwatr/nitrobase/commit/8fd35fa69c0ff5c5fdc1f3be11a70ca4bac7dd81)) by @AliMD

### Miscellaneous Chores

* fix logs messages ([73d4496](https://github.com/Alwatr/nitrobase/commit/73d4496928c6e8fa5800f31619b9be717cba3592)) by @AliMD
* **lerna:** switch to prerelease beta ([3267b74](https://github.com/Alwatr/nitrobase/commit/3267b748c298e0531ed58c08b673ac3a8c0a44ad)) by @

### Dependencies update

* update ([2657638](https://github.com/Alwatr/nitrobase/commit/26576384c4a8ffcf35776f19008432e194fb39de)) by @AliMD

## [6.2.1](https://github.com/Alwatr/nitrobase/compare/v6.2.0...v6.2.1) (2024-08-31)

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group across 1 directory with 13 updates ([7e6aa11](https://github.com/Alwatr/nitrobase/commit/7e6aa11e1b4507111993a6070b481ebc95e534c7)) by @dependabot[bot]
* **deps:** bump micromatch from 4.0.7 to 4.0.8 ([20c192e](https://github.com/Alwatr/nitrobase/commit/20c192e38f303e1bf1d470f551c258e2f7087c6f)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 10 updates ([faf1fc1](https://github.com/Alwatr/nitrobase/commit/faf1fc15f8b4c9c4c451dd5fa1d564eb3bf3d9a3)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 9 updates ([64ac4f2](https://github.com/Alwatr/nitrobase/commit/64ac4f239c0f0a8ccdadbd736c16973bd684f811)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 7 updates ([b80580d](https://github.com/Alwatr/nitrobase/commit/b80580d0bf760395354f4b40d3c7e7577e3df347)) by @dependabot[bot]

### Dependencies update

* update ([6c5a670](https://github.com/Alwatr/nitrobase/commit/6c5a670d8f3a3546010b305f9093ffa9ed919008)) by @AliMD

## [6.2.0](https://github.com/Alwatr/nitrobase/compare/v6.1.0...v6.2.0) (2024-07-03)

### Features

* Add freeze property to CollectionReference and DocumentReference ([af1d7e4](https://github.com/Alwatr/nitrobase/commit/af1d7e47b3217d4e361a63d9eb9c410e04ea9385)) by @AliMD
* Add freeze property to CollectionReference and DocumentReference ([beeb378](https://github.com/Alwatr/nitrobase/commit/beeb37884f5798c3c3b6612dc0626c8cf9c44676)) by @AliMD
* Add saveImmediate method to CollectionReference and DocumentReference ([aa5ab87](https://github.com/Alwatr/nitrobase/commit/aa5ab871a5157dd70d55768843aeeab521258a49)) by @AliMD
* **schemaVer:** log schema version changes ([6a5bc90](https://github.com/Alwatr/nitrobase/commit/6a5bc9089cd509be141e1d9ee10f2cedc5490925)) by @AliMD

### Bug Fixes

* **schemaVer:** save after change schema version ([99cf345](https://github.com/Alwatr/nitrobase/commit/99cf345cfe34edef4f8af2c83157b894f9fb0be0)) by @AliMD

## [6.1.0](https://github.com/Alwatr/nitrobase/compare/v6.0.5...v6.1.0) (2024-07-03)

### Features

* schema version ([2590674](https://github.com/Alwatr/nitrobase/commit/259067435512b71f1f0aaea07566441cbb85e539)) by @AliMD

### Miscellaneous Chores

* **deps:** bump braces from 3.0.2 to 3.0.3 ([29ed0af](https://github.com/Alwatr/nitrobase/commit/29ed0af0c2a1711c75cebc395798d63ad81d940f)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 5 updates ([3bc05c8](https://github.com/Alwatr/nitrobase/commit/3bc05c84c4559a4a33932786ef96797d1651f624)) by @dependabot[bot]

### Dependencies update

* bump the development-dependencies ([546ca1b](https://github.com/Alwatr/nitrobase/commit/546ca1be049090eb3c8304fcb75e98ac0b984510)) by @AliMD

## [6.0.5](https://github.com/Alwatr/nitrobase/compare/v6.0.4...v6.0.5) (2024-05-12)

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group across 1 directory with 3 updates ([f97552d](https://github.com/Alwatr/nitrobase/commit/f97552d0e8e85bc2e2f0863da17502b8e55799e8)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 8 updates ([1aa95ca](https://github.com/Alwatr/nitrobase/commit/1aa95ca232a7b706eda4b0eb537316d38b27aa28)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 3 updates ([e34096c](https://github.com/Alwatr/nitrobase/commit/e34096c56e7fc0af3402575b0c2d7433d3b648ef)) by @dependabot[bot]
* **lerna:** update ([ab51222](https://github.com/Alwatr/nitrobase/commit/ab51222ce7dac522fb4880ef44cd96046e6664ac)) by @

### Dependencies update

* upd ([8529591](https://github.com/Alwatr/nitrobase/commit/852959178c4e4c71938dd2a1011d3e9cc3995c21)) by @

## [6.0.4](https://github.com/Alwatr/nitrobase/compare/v6.0.3...v6.0.4) (2024-04-25)

### Bug Fixes

* **refrence:** set created meta to now ([9cacc0f](https://github.com/Alwatr/nitrobase/commit/9cacc0fc84743ccbb5a8a2581963545bb493c2bb)) by @njfamirm

### Miscellaneous Chores

* **deps:** bump alwatr/nginx-json in /packages/nginx ([ae24e49](https://github.com/Alwatr/nitrobase/commit/ae24e49b1a1d183f7e331b72e8d077cbd14484b2)) by @dependabot[bot]
* **deps:** bump the github-actions group across 1 directory with 5 updates ([b051cd5](https://github.com/Alwatr/nitrobase/commit/b051cd515060502f1a101a9c0cc22ec030fb8435)) by @dependabot[bot]
* **nginx:** update labels ([4b15d23](https://github.com/Alwatr/nitrobase/commit/4b15d23aea3383cfd97356437411642f93ebd270)) by @AliMD

## [6.0.3](https://github.com/Alwatr/nitrobase/compare/v6.0.2...v6.0.3) (2024-03-28)

### Bug Fixes

* prevent skipBumpOnlyReleases ([61fe232](https://github.com/Alwatr/nitrobase/commit/61fe232330517dc5e56b73eda3e8de003f44d6db)) by @AliMD

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group with 13 updates ([23fb121](https://github.com/Alwatr/nitrobase/commit/23fb1217470593d386b658f2a1d85fe4ef6e55df)) by @dependabot[bot]
* **deps:** bump ip from 2.0.0 to 2.0.1 ([e4b6d52](https://github.com/Alwatr/nitrobase/commit/e4b6d526c572481232657161e59b4dcf06fc5719)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 10 updates ([ce6ee74](https://github.com/Alwatr/nitrobase/commit/ce6ee7495aaa67a8d3bb0a3f2b2ea8389e161552)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 9 updates ([686e155](https://github.com/Alwatr/nitrobase/commit/686e155d4c0ccab6daf81d280cf91299152b8583)) by @dependabot[bot]
* **deps:** bump the github-actions group with 11 updates ([3c94246](https://github.com/Alwatr/nitrobase/commit/3c9424678d6b1620d8141d328f3433f4d7a95f4d)) by @dependabot[bot]
* **deps:** update ([1062274](https://github.com/Alwatr/nitrobase/commit/106227448a27524eb1ad07184b3e67eb5e599b31)) by @

## [6.0.2](https://github.com/Alwatr/nitrobase/compare/v6.0.1...v6.0.2) (2024-02-09)

### Performance Improvements

* **nginx:** Update nginx-json base image version and improve HEALTHCHECK performance ([7e46731](https://github.com/Alwatr/nitrobase/commit/7e46731af349f8b3be07ab3a3238449038806acb)) by @AliMD

## [6.0.1](https://github.com/Alwatr/nitrobase/compare/v6.0.0...v6.0.1) (2024-01-24)

### Bug Fixes

* **nginx/debug:** Add prefixUri variable to command_test function and add ps command ([ae165f8](https://github.com/Alwatr/nitrobase/commit/ae165f8b7f1a6d60ec4d220e20f2e594618d6447)) by @
* **nginx:** docker HEALTHCHECK ([34f61c0](https://github.com/Alwatr/nitrobase/commit/34f61c0079730be6c8aa972df748e53ee81f8e62)) by @

## [6.0.0](https://github.com/Alwatr/nitrobase/compare/v6.0.0-alpha.0...v6.0.0) (2024-01-24)

### Features

* Enhance types, add Jsonifiable type and update method signatures ([57502d2](https://github.com/Alwatr/nitrobase/commit/57502d230f0c9cb88aa9a9e71a3460f1219955b0)) by @AliMD

### Miscellaneous Chores

* **deps-dev:** bump the development-dependencies group with 4 updates ([7d71044](https://github.com/Alwatr/nitrobase/commit/7d71044165583f9d56fb61a05bdf51ccb104f422)) by @dependabot[bot]
* **deps:** bump alwatr/nginx-json in /packages/nginx ([485b9a4](https://github.com/Alwatr/nitrobase/commit/485b9a4b934bb6857a15b6acb47b45f522478c84)) by @dependabot[bot]
* **deps:** bump the alwatr-dependencies group with 10 updates ([cc42e89](https://github.com/Alwatr/nitrobase/commit/cc42e895179c53ee2dd60802d994ba84f5a37fde)) by @dependabot[bot]
* **deps:** bump the github-actions group with 2 updates ([68a76f8](https://github.com/Alwatr/nitrobase/commit/68a76f898bd78430133efba6113ffd267cf5fdff)) by @dependabot[bot]
* **deps:** update ([0e85743](https://github.com/Alwatr/nitrobase/commit/0e85743f76f0efdd0f6cd4001eebc4550b43f43f)) by @AliMD
* **deps:** update ([a894bfc](https://github.com/Alwatr/nitrobase/commit/a894bfc62124a3eb027cad4e8d1c974761e22dad)) by @AliMD
* enhance lint script ([9a11060](https://github.com/Alwatr/nitrobase/commit/9a11060ddb870d1529e4e2be64fc60d19a9348e5)) by @AliMD
* **nginx:** update dockerfile labels ([80555c8](https://github.com/Alwatr/nitrobase/commit/80555c846ff6158cee0658aba016c8eda30b72f7)) by @AliMD

## [6.0.0-alpha.0](https://github.com/Alwatr/nitrobase/compare/v5.1.0...v6.0.0-alpha.0) (2024-01-15)

### ⚠ BREAKING CHANGES

* **nginx:** default `nitrobaseApiPrefix` change to `/api/s6`
* **nginx:** Add authentication requirement for all location
* **nginx:** new authorization method
* **types:** `PerDevice` and `PerToken` in Region removed

### Features

* **nginx:** Add 99-deny-other.conf.template to deny all unknown locationswner ([4707214](https://github.com/Alwatr/nitrobase/commit/470721469eefae49e9d1243b40d792aaeca3e67c)) by @AliMD
* **nginx:** Add authentication support and remove separate requirement for authentication ([ec7e8c4](https://github.com/Alwatr/nitrobase/commit/ec7e8c41d21c8f7038f0650db0ee02a056f63edf)) by @AliMD
* **nginx:** Add debug.sh script for debug and test deployment ([dcb2b33](https://github.com/Alwatr/nitrobase/commit/dcb2b3308ab4c44108affdb66cafed44b5641ab1)) by @AliMD
* **nginx:** Add region-specific file location per owner ([425289c](https://github.com/Alwatr/nitrobase/commit/425289c02a575627ba0f6c91ac269fd96559817f)) by @AliMD
* **nginx:** Complete new PerUser region location with manager access ([d6ab5ed](https://github.com/Alwatr/nitrobase/commit/d6ab5ed6eed28b30be29623ad1afc1f238a7db4b)) by @AliMD
* **nginx:** extraction of authUserId and authUserToken from authorization header ([79fb030](https://github.com/Alwatr/nitrobase/commit/79fb030c288958584f280d18dd10872dd07e6a92)) by @AliMD
* **nginx:** rewrite debug location ([73f9980](https://github.com/Alwatr/nitrobase/commit/73f99801a35a210a94d411d7bb1c8d057d32fca2)) by @AliMD
* **nginx:** Update region secret location to return 404 ([53c2521](https://github.com/Alwatr/nitrobase/commit/53c2521bc99eff0dc5ca33f932ada61823a18163)) by @AliMD

### Bug Fixes

* **nginx:** location directive in 93-region-managers.conf.template ([fc8fdab](https://github.com/Alwatr/nitrobase/commit/fc8fdabfc60475b973b58a96da5c3836165ce836)) by @AliMD
* **nginx:** location directive in region public configuration ([2b19c0c](https://github.com/Alwatr/nitrobase/commit/2b19c0c55f48e9d546cf05dbb77b9d2ca15303f9)) by @AliMD
* **nginx:** location directive in region-authenticated.conf.template ([a82153e](https://github.com/Alwatr/nitrobase/commit/a82153e4c606d0ba0fc5539632576ffd91aafe28)) by @AliMD
* **nginx:** location try_files issues in PerUser ([e2671d4](https://github.com/Alwatr/nitrobase/commit/e2671d4e227626f4f18073fbc92770c0e0345dd0)) by @AliMD
* **nginx:** regex pattern in location directive ([ebd1e27](https://github.com/Alwatr/nitrobase/commit/ebd1e27768048bc03a8cf274a4d7b0b87b15d009)) by @AliMD
* **nginx:** Remove extract-auth.conf and add map-auth.conf template ([7c74be2](https://github.com/Alwatr/nitrobase/commit/7c74be26760fc807b29c62e358f4ef1db3f15b1b)) by @AliMD

### Code Refactoring

* **nginx:** Add authentication requirement for all location ([0f52f8c](https://github.com/Alwatr/nitrobase/commit/0f52f8cc5173e797bc5faba363277cc64af9724a)) by @AliMD

* **nginx:** Add rewrite rule to remove nitrobaseApiPrefix from URL ([c0a5a69](https://github.com/Alwatr/nitrobase/commit/c0a5a6910a2244f3a8eeffef0351f5390ebf8e69)) by @AliMD
* **nginx:** Add nitrobaseDebugPath and change nitrobaseRegionPerDevice to nitrobaseRegionPerOwner ([4dcdd61](https://github.com/Alwatr/nitrobase/commit/4dcdd61cc40b5127a5fe4c6196c98f4321e7a4dc)) by @AliMD
* **nginx:** Authenticated region location ([ebb91c6](https://github.com/Alwatr/nitrobase/commit/ebb91c66fcf937ef9c7c2666b340ca817e0cb5f2)) by @AliMD
* **nginx:** home page JSON response ([fb7f70c](https://github.com/Alwatr/nitrobase/commit/fb7f70c424c0c6c0234d6728869d1a24eb436e06)) by @AliMD
* **nginx:** Managers region location ([a2568cf](https://github.com/Alwatr/nitrobase/commit/a2568cf0d88cfc9d6b0e9d3795fe7907ec03d999)) by @AliMD
* **nginx:** public region location ([3b57d62](https://github.com/Alwatr/nitrobase/commit/3b57d6213a7b048691910dac4965fd8dddc0a2c8)) by @AliMD
* **nginx:** secret region location ([358b0bf](https://github.com/Alwatr/nitrobase/commit/358b0bfa8f49d03678568aa0c2af3e7940914fa6)) by @AliMD
* **types:** replace `PerDevice` and `PerToken` in Region enum with `PerOwner` ([2b47b5d](https://github.com/Alwatr/nitrobase/commit/2b47b5dd81e59ee33b17e4ae01253ea2cde5f9ab)) by @AliMD

### Miscellaneous Chores

* Add new VS Code extensions ([df1914a](https://github.com/Alwatr/nitrobase/commit/df1914a06575eb070d6f0eebd1ac34821138ae8d)) by @AliMD
* Add VS Code settings for nginx formatter ([94b861f](https://github.com/Alwatr/nitrobase/commit/94b861f87a887fe11857bfc32cd69995474a4281)) by @AliMD
* **deps-dev:** bump the development-dependencies group with 8 updates ([38ac952](https://github.com/Alwatr/nitrobase/commit/38ac952981ecdbe3ad2f1290c54a92dde2497f99)) by @dependabot[bot]
* **deps:** update ([8f3edcf](https://github.com/Alwatr/nitrobase/commit/8f3edcf8a489927a6c43dfcaa5db88a579ecac80)) by @
* fix storage name ([ed76477](https://github.com/Alwatr/nitrobase/commit/ed76477b15a82a117bc48e3b945047a968b7b91e)) by @
* **lerna:** Refactor lerna.json to include chore type in Miscellaneous Chores section ([1750f1a](https://github.com/Alwatr/nitrobase/commit/1750f1a74c56f3453574f9a8080b2366d8ddd801)) by @AliMD
* **nginx:** cleanup ([4d971ff](https://github.com/Alwatr/nitrobase/commit/4d971ff981b12790417f3b52d67467953975f058)) by @AliMD
* **nginx:** rename home json ([5e1c06b](https://github.com/Alwatr/nitrobase/commit/5e1c06baff9ddaac4eaea2a0733d127f5771e852)) by @AliMD
* **nginx:** Update NGINX nitrobase API prefix ([f477ce8](https://github.com/Alwatr/nitrobase/commit/f477ce8107628a110a7c38f1d1a52ed8274fda46)) by @AliMD

## [5.1.0](https://github.com/Alwatr/nitrobase/compare/v5.0.0...v5.1.0) (2024-01-13)

### Features

* update nginx base image to v2.3.2 ([db8c896](https://github.com/Alwatr/nitrobase/commit/db8c896464b6d4c824eb93fb5ac5c40d3caad9c9)) by @AliMD

### Miscellaneous Chores

* **dependabot:** Remove old api docker update ([e297bd7](https://github.com/Alwatr/nitrobase/commit/e297bd7cb9f5ac93f7714a26c68ea73f0c847f5a)) by @AliMD
* **deps:** bump alwatr/nginx-json in /packages/nginx ([fedc46a](https://github.com/Alwatr/nitrobase/commit/fedc46a497927b0fa4668ec81c85fa4b2b1c369e)) by @dependabot[bot]
* **deps:** bump the github-actions group with 1 update ([91c3905](https://github.com/Alwatr/nitrobase/commit/91c3905e8daae95ad5e410c482ca6fa0509bea1d)) by @dependabot[bot]
* fix repo name ([7c7fef7](https://github.com/Alwatr/nitrobase/commit/7c7fef71d49aa5633fa0950f6b2c6ce1201ec5aa)) by @AliMD
* **lerna:** update changelogPreset ([6f81c20](https://github.com/Alwatr/nitrobase/commit/6f81c20c8b4c65eaaa7788dbbd62bd908db97402)) by @AliMD
* **nginx:** update docker label ([9f38e70](https://github.com/Alwatr/nitrobase/commit/9f38e70607d349cb482e445fe68fe129776b551f)) by @AliMD
* Update package.json script 'rl' to include linting ([b615b9d](https://github.com/Alwatr/nitrobase/commit/b615b9d4cb375ddc7de4650f43a83ab4f0d78bd2)) by @
* **workflow:** fix nginx test ([5da8713](https://github.com/Alwatr/nitrobase/commit/5da87132e359ef67b21f0fa55cbd3e34c0144481)) by @AliMD
* **workflow:** Update publish-container.yml file ro test nginx before publish ([ec9fb80](https://github.com/Alwatr/nitrobase/commit/ec9fb80a8a1f21be85cf5ad79b1680d94dbd9396)) by @AliMD

### Code Refactoring

* Update nitrobaseRegionSecret value in Dockerfile and types file ([a0b13c6](https://github.com/Alwatr/nitrobase/commit/a0b13c6ff07599a425fa666437c0ebf167ccf6c8)) by @AliMD

# [5.0.0](https://github.com/Alwatr/nitrobase/compare/v5.0.0-beta...v5.0.0) (2024-01-12)

### Bug Fixes

* **nginx:** token validation in managers region ([f5f54fb](https://github.com/Alwatr/nitrobase/commit/f5f54fb52cb9d4721b25d0c3d76d8a8c717ae288)) by @AliMD

### Code Refactoring

* **engine:** remove all string id from public api ([c44fd1c](https://github.com/Alwatr/nitrobase/commit/c44fd1c0a7daffe20ba9e836f23d63a4dd4250b8)) by @AliMD
* rename region SuperAdmin to Managers ([7c3ece8](https://github.com/Alwatr/nitrobase/commit/7c3ece8a24a88ea12a82966e41ea1ad7362159f4)) by @AliMD

### Features

* **engine:** use alwatr exit hook ([5be4f01](https://github.com/Alwatr/nitrobase/commit/5be4f01bc746b5b4cfb1df10def3abc5632c44ee)) by @njfamirm
* **nitrobase:** Add option to error when nitrobase not initialized ([4b27468](https://github.com/Alwatr/nitrobase/commit/4b27468a063027b357e27fdff2484932e23d46e0)) by @AliMD

### Performance Improvements

* **nginx:** Micro optimization in map ([955f836](https://github.com/Alwatr/nitrobase/commit/955f8369e5013af06b987bba7acae5fa2d167dfb)) by @AliMD

### BREAKING CHANGES

* region `SuperAdmin` renamed to `Managers`
* **engine:** The string ID has been removed from public APIs to prevent confusion caused by a simple sting ID.

# [5.0.0-beta](https://github.com/Alwatr/nitrobase/compare/v4.1.0...v5.0.0-beta) (2023-12-31)

### Bug Fixes

* **demo:** import path ([13dfd4c](https://github.com/Alwatr/nitrobase/commit/13dfd4c379351bade418cb7bc24fdc652d34280f)) by @njfamirm

* **deps:** dev deps ([b129567](https://github.com/Alwatr/nitrobase/commit/b12956768b9d60a75c0fdc43774512b86b655f78)) by @AliMD
* **engin5:** Fix import paths in alwatr-nitrobase and collection-reference ([4bb206a](https://github.com/Alwatr/nitrobase/commit/4bb206a1899befeba8d01ec1af777bef9fe7fb10)) by @AliMD
* **engine/demo:** benchmark ([48b4456](https://github.com/Alwatr/nitrobase/commit/48b4456cd09bf610bfe718c843e55ff0db2a9e5a)) by @njfamirm
* **engine/demo:** import path ([6effc2c](https://github.com/Alwatr/nitrobase/commit/6effc2c105aaf4057581bc161723d59a7ea0b7e6)) by @njfamirm
* **engine/nitrobase:** pick owner id ([2cb028a](https://github.com/Alwatr/nitrobase/commit/2cb028a959f44fc23983e612be072412767b6b05)) by @njfamirm
* **engine5:** enhance logs ([7b3c2d0](https://github.com/Alwatr/nitrobase/commit/7b3c2d04d9f493cc0cc6d8f53131b95b2f9a8650)) by @AliMD
* **engine5:** logger scope name ([639bb9c](https://github.com/Alwatr/nitrobase/commit/639bb9cc514ac9bffa203cf43a9c60f74642615b)) by @AliMD
* **engine5:** review document reference and fix class names ([0e5a10b](https://github.com/Alwatr/nitrobase/commit/0e5a10b3d277a652d91ea633e3bdb445a3e0ec93)) by @AliMD
* **engine:** add types to deps ([170043d](https://github.com/Alwatr/nitrobase/commit/170043d9095c73e3c678c051bc3f34d2ccd43730)) by @njfamirm
* **engine:** data loss issue and improve performance ([07f6877](https://github.com/Alwatr/nitrobase/commit/07f68777faec66fee4efae7afd340bebe7078f17)) by @AliMD
* **engine:** file path ([bbc4abd](https://github.com/Alwatr/nitrobase/commit/bbc4abdbb601108dc91ee95eeaac5cbbc272cdd4)) by @njfamirm
* **engine:** get collection issue ([742aa23](https://github.com/Alwatr/nitrobase/commit/742aa236ae98c934ea6e0904a8a91d152471a31a)) by @AliMD
* **engine:** import type ([9f67871](https://github.com/Alwatr/nitrobase/commit/9f67871dba8528a5393ea372f136865c952a102c)) by @njfamirm
* **engine:** make last auto id optional ([0e80d55](https://github.com/Alwatr/nitrobase/commit/0e80d55f28067b0ccd06cbcbf12030e82d6744d5)) by @njfamirm
* **engine:** Remove StoreFileStatModel class ([d47b680](https://github.com/Alwatr/nitrobase/commit/d47b680d54b8bd9a0b8926653a69cb59c8f36398)) by @AliMD
* **engine:** unsaved data lost issues ([fec0bef](https://github.com/Alwatr/nitrobase/commit/fec0bef78ac67ddd669012d8804588883f39affa)) by @AliMD
* **engine:** Update defaultChangeDebounce value in AlwatrNitrobase ([63edd08](https://github.com/Alwatr/nitrobase/commit/63edd08c87c675edb91b8f7aa61b901a6d1db111)) by @AliMD
* **engine:** Update imports and refactor util.ts ([2b1f962](https://github.com/Alwatr/nitrobase/commit/2b1f9628f4578f707996fe5e6d5d92c7d093b615)) by @AliMD
* **nginx:** device id variable ([7e58911](https://github.com/Alwatr/nitrobase/commit/7e5891137a095b28fd6cd5388073212f73441225)) by @njfamirm
* **nginx:** header map regex ([3e16b69](https://github.com/Alwatr/nitrobase/commit/3e16b6946c7f07b76af7a3af299339899ac4b6fa)) by @njfamirm
* **reference:** add types to deps ([23788e6](https://github.com/Alwatr/nitrobase/commit/23788e6cdcd8f26378896bcf469a1308d49300aa)) by @njfamirm
* **reference:** private constructor params ([926aa9d](https://github.com/Alwatr/nitrobase/commit/926aa9d06d4bb0ae0e00277cbaba2cb24a67456d)) by @njfamirm
* **reference:** protected method ([ff8ae62](https://github.com/Alwatr/nitrobase/commit/ff8ae6235cb71a61f18b69f6f595fde6a065eed1)) by @njfamirm
* **reference:** Refactor update delay logic in updated\_\_ to prevent data lost ([c7282fe](https://github.com/Alwatr/nitrobase/commit/c7282fe66685843aad4396461ab8c7060742683a)) by @AliMD
* **reference:** remove extra tsconfig ([5a6f4ef](https://github.com/Alwatr/nitrobase/commit/5a6f4efaa625f0d1adb1eb9894fdce7cc6b1a1b2)) by @njfamirm
* **nitrobase-reference:** review and refactor collection reference to improve performance and readability ([7b1b34d](https://github.com/Alwatr/nitrobase/commit/7b1b34d6830afde4dd0c477a651b2fe9765d3aaf)) by @AliMD
* **nitrobase-reference:** type casting in set method ([81f0ef2](https://github.com/Alwatr/nitrobase/commit/81f0ef2a4ac8881643c6c4965d265a803b67f6d7)) by @AliMD
* **types:** StoreFileId interface ([d7b0f61](https://github.com/Alwatr/nitrobase/commit/d7b0f61d673e6c70c139454aae03f1472f6f7c31)) by @AliMD
* **workflow:** service name ([888fa85](https://github.com/Alwatr/nitrobase/commit/888fa85db6d03dc5cf915ca4da0960e0ff55b81f)) by @AliMD

### Features

* **demo:** Add multi-write functionality to node-fs demo ([8839ef8](https://github.com/Alwatr/nitrobase/commit/8839ef8bd928c45dd2875d0959c131c43e95963e)) by @AliMD
* **doc-ref:** refactor and isolate apis ([e0085d9](https://github.com/Alwatr/nitrobase/commit/e0085d918afe2e611fabd41294bfd070a241e970)) by @AliMD
* **engin5:** Add CollectionReference and defineCollection method ([25dd254](https://github.com/Alwatr/nitrobase/commit/25dd254c9c346b9622db678188bf7bf46624ce7f)) by @AliMD
* **engin5/util:** add new parseJson, jsonStringify, readFile, readJsonFile, writeFile, handleExistsFile, writeJsonFile ([bbb4626](https://github.com/Alwatr/nitrobase/commit/bbb46269c981327d022b8e283107449c3cb0f83f)) by @AliMD
* **engin5:** add get and writeContext with review all apis and documention ([7594612](https://github.com/Alwatr/nitrobase/commit/7594612ac9bffc6a173b3000a6c50824c200dcfa)) by @AliMD
* **engin5:** Add MaybePromise type definition ([55b49ca](https://github.com/Alwatr/nitrobase/commit/55b49ca09e1a80c7d84afe3245bb5caf17db76fe)) by @AliMD
* **engin5:** Add owner ID validation for PerUser, PerToken, and PerDevice regions ([79b2ec7](https://github.com/Alwatr/nitrobase/commit/79b2ec7cd0927bc0c5b985894e4f9e877954f6fe)) by @AliMD
* **engin5:** Add support for auto-incrementing IDs in CollectionReference ([e883af6](https://github.com/Alwatr/nitrobase/commit/e883af67318708df032af06df02db7dd45fde248)) by @AliMD
* **engin5:** add utility functions for reading and writing JSON files ([71f8037](https://github.com/Alwatr/nitrobase/commit/71f8037f13c3479c74f5ff533d7a2b81229213a2)) by @AliMD
* **engin5:** Enhance AlwatrNitrobase read and write methods ([2bca22a](https://github.com/Alwatr/nitrobase/commit/2bca22a2050458c89581b8aeca32499f92e098b0)) by @AliMD
* **engin5:** fix issues to improve performance and readability ([64b47fc](https://github.com/Alwatr/nitrobase/commit/64b47fcdf9794e32f55aa2322140301a01bf3dd4)) by @AliMD
* **engin5:** refactor AlwatrNitrobase with root db as collection, and handle save and syncLoad context ([efe9a1d](https://github.com/Alwatr/nitrobase/commit/efe9a1d72dfc381f02b033ce78f1c0b944692c83)) by @AliMD
* **engin5:** Refactor collection and document demo ([0bb2fd4](https://github.com/Alwatr/nitrobase/commit/0bb2fd46b4b8d6ed0f4bbdf7b9c75e9126462039)) by @AliMD
* **engin5:** Refactor error handling in collection and document references ([1044c29](https://github.com/Alwatr/nitrobase/commit/1044c29e3ca3254f840d3c53ff5821e0e5f8838e)) by @AliMD
* **engin5:** Refactor logging statements in collection and document references ([636175f](https://github.com/Alwatr/nitrobase/commit/636175f93958d3c66dd64069720dd02418ce2f22)) by @AliMD
* **engin5:** Update collection reference methods for retrieving items and IDs ([aaa84a7](https://github.com/Alwatr/nitrobase/commit/aaa84a7ba36c30a5f38504076eb12a8af67290f0)) by @AliMD
* **engin5:** Update file imports and variable names in demos ([82705b6](https://github.com/Alwatr/nitrobase/commit/82705b62b8e1abc7b8b3694cac98aca33edaaef3)) by @AliMD
* **engin5:** Update nitrobase file location and owner identifiers ([614d56f](https://github.com/Alwatr/nitrobase/commit/614d56f80171dd1d1feb2bb62fc0db5cffb8ab7f)) by @AliMD
* **engin5:** Update StoreFileTTL and CollectionItemMeta types ([5484c96](https://github.com/Alwatr/nitrobase/commit/5484c964bd20e40925bcc7f14895a8be79fbda76)) by @AliMD
* **engin5:** Update WriteFileMode enum values ([acaa608](https://github.com/Alwatr/nitrobase/commit/acaa6089c2b6d69e1697c4218bcf7cfcdf5233ee)) by @AliMD
* **engine/demo:** collection with new api ([f603e86](https://github.com/Alwatr/nitrobase/commit/f603e86d2827c66219321f9df400049e76b78c21)) by @AliMD
* **engine5:** add exists and refactor stat ([9e6e4d2](https://github.com/Alwatr/nitrobase/commit/9e6e4d21d702272f83bfcf8b9b587299a250c754)) by @AliMD
* **engine5:** Add global variable for package version in logger.ts ([eca7f69](https://github.com/Alwatr/nitrobase/commit/eca7f698d89560af88990c0765b1592db168c5ed)) by @AliMD
* **engine5:** AlwatrNitrobase class with complete new api ([c5e4009](https://github.com/Alwatr/nitrobase/commit/c5e40099df81e7584d86e21bb8f3e327fd66ab17)) by @AliMD
* **engine5:** design final demo api ([8a9477a](https://github.com/Alwatr/nitrobase/commit/8a9477a20c7219e166360999860db4beb679024e)) by @AliMD
* **engine5:** design new concept ([552e96f](https://github.com/Alwatr/nitrobase/commit/552e96f592abc0f9c245d02c010baa5a1dd51f44)) by @AliMD
* **engine5:** design new data types ([1c0be8b](https://github.com/Alwatr/nitrobase/commit/1c0be8b9901b6e7ed5703aace29379ee04432cf2)) by @AliMD
* **engine5:** DocumentReference class to handle document operations ([1edc32f](https://github.com/Alwatr/nitrobase/commit/1edc32fe8cc654dd3801ad3ff066cbc361f444aa)) by @AliMD
* **engine5:** Import CollectionReference and update version string ([61873ce](https://github.com/Alwatr/nitrobase/commit/61873ce110c7c0ebe5a84eb9843a30e55a7fda79)) by @AliMD
* **engine5:** import from workspace package ([6e74e9e](https://github.com/Alwatr/nitrobase/commit/6e74e9e5ea9d9937e70acb423fa4aaab6715378f)) by @njfamirm
* **engine5:** logger and deepClone utility functions ([1946e58](https://github.com/Alwatr/nitrobase/commit/1946e58a412e3cd28e1a09fbfa7f62ccaa4ab0a2)) by @AliMD
* **engine5:** Refactor defineDoc to defineDocument in demo-doc.ts ([cbe113e](https://github.com/Alwatr/nitrobase/commit/cbe113ed4a8265a29e99a9efd79fb81d63e0f5cc)) by @AliMD
* **engine5:** Refactor file writing logic in util.ts ([1dac52a](https://github.com/Alwatr/nitrobase/commit/1dac52aba5b3b3a175a8b3e8fad22255f6c5c330)) by @AliMD
* **engine5:** Update CollectionReference class with new properties and methods ([82d9a5e](https://github.com/Alwatr/nitrobase/commit/82d9a5ea5a96d89d99593997cf4ff3adf6f29b40)) by @AliMD
* **engine5:** Update DocumentReference class with new properties and methods ([4c14739](https://github.com/Alwatr/nitrobase/commit/4c147390923ee81fd4d552220778a4e11d7a3162)) by @AliMD
* **engine5:** Update enum values in type.ts ([fe5e1af](https://github.com/Alwatr/nitrobase/commit/fe5e1af4e95cc16e14594f122e3fb3c190898c39)) by @AliMD
* **engine5:** Update logger method call in rootStoreUpdated\_() ([70b0ee6](https://github.com/Alwatr/nitrobase/commit/70b0ee6704fa5f1c685a124ac4e46ae7583ceed0)) by @AliMD
* **engine5:** Update StoreFileMeta interface in type.ts ([f7be2ac](https://github.com/Alwatr/nitrobase/commit/f7be2ac34c9ed87ea00ceabad2ab8451cfa2939d)) by @AliMD
* **engine5:** update updatedCallback parameter in CollectionReference and DocumentReference ([043ef26](https://github.com/Alwatr/nitrobase/commit/043ef26db62fda0fb05dac1e7e587479430bc75a)) by @AliMD
* **engine5:** use nitrobase file id model ([86b75e7](https://github.com/Alwatr/nitrobase/commit/86b75e7951520d5b4a3ab45dd3d872d74bd61dd0)) by @njfamirm
* **engine:** Add data-lost-test.js demo file ([673f324](https://github.com/Alwatr/nitrobase/commit/673f3247c4b6c1bca2f9e9d9169843ca6a5e9804)) by @AliMD
* **engine:** cjs build support ([74cce67](https://github.com/Alwatr/nitrobase/commit/74cce67ed6686483c2cd57c9a8bd263d71fbd6e3)) by @njfamirm
* **engine:** col demo ([3a41adb](https://github.com/Alwatr/nitrobase/commit/3a41adb0b1b6dacbc3f2028294c438a5ec866a4e)) by @njfamirm
* **engine:** debounce for save file ([c92749e](https://github.com/Alwatr/nitrobase/commit/c92749e83352129c02130ac2466dd5acda289795)) by @AliMD
* **engine:** doc demo ([f49f78b](https://github.com/Alwatr/nitrobase/commit/f49f78bd3b5942406fe74e273e87bcbf12f67c4f)) by @njfamirm
* **engine:** enhance benchmark demo ([200da18](https://github.com/Alwatr/nitrobase/commit/200da18cd9542fa4182f910c0ad813703326fe38)) by @AliMD
* **engine:** impediment exit hook ([68695a9](https://github.com/Alwatr/nitrobase/commit/68695a975e0ec6c473bbd2d9a62c81720f090352)) by @AliMD
* **engine:** Refactor code to improve performance and readability ([b4c0848](https://github.com/Alwatr/nitrobase/commit/b4c0848e7518ae5c96e8ab7643716a2e923f7635)) by @AliMD
* **engine:** use owner id in all functions ([967c346](https://github.com/Alwatr/nitrobase/commit/967c346df548e6f016c4291638b45e68aa55d248)) by @njfamirm
* **nginx:** Add debug-info-007 endpoint to return JSON response ([9d6d671](https://github.com/Alwatr/nitrobase/commit/9d6d67187248e3b626675a780e23bf3bdfc64300)) by @AliMD
* **nginx:** Add input validation for user_id and user_token ([7216ae5](https://github.com/Alwatr/nitrobase/commit/7216ae5171b0c13c77b5d801bf945c23972f6234)) by @AliMD
* **nginx:** Add location for super admin access ([7e274a6](https://github.com/Alwatr/nitrobase/commit/7e274a63b3d12ac656dd461f9bd03ed63f0db2cb)) by @AliMD
* **nginx:** Add MIME type for asj files ([756a99e](https://github.com/Alwatr/nitrobase/commit/756a99e70c8977dda1d852327ef9f87942d3f4d9)) by @AliMD
* **nginx:** Add user/device/token locations headers mappings ([3e71297](https://github.com/Alwatr/nitrobase/commit/3e7129732ada897e4c858d8c7ab0b2309186f353)) by @AliMD
* **nginx:** compatible with new engine ([196b80f](https://github.com/Alwatr/nitrobase/commit/196b80fcf6ce24d9f061b85c99a0a93d5e1a8933)) by @njfamirm
* **nginx:** Refactor nginx location configuration for engine5 ([451e266](https://github.com/Alwatr/nitrobase/commit/451e266daade4c7dff88a3d73273424537bc7251)) by @AliMD
* **nginx:** Update device ID mapping in nginx configuration ([5ff4080](https://github.com/Alwatr/nitrobase/commit/5ff40806e29158e2e7271b6123027e92bbc0c933)) by @AliMD
* **nginx:** Update home page JSON response ([0da2f5e](https://github.com/Alwatr/nitrobase/commit/0da2f5e1673a96a1bc329a9e7e6968c73312394f)) by @AliMD
* **nginx:** Update nginx version and add default error JSON file ([5213c65](https://github.com/Alwatr/nitrobase/commit/5213c652977e5a9db4c2f88aeec8da6a07b1f626)) by @AliMD
* **nginx:** Update nginx-json base image version and add environment variables ([2269f67](https://github.com/Alwatr/nitrobase/commit/2269f67f07bfd0eb0207584a27a3fc8663cece8c)) by @AliMD
* **nginx:** Update nitrobaseRegionSecret env value in nginx Dockerfile ([15b3595](https://github.com/Alwatr/nitrobase/commit/15b35954fc972fdd648584f1b71fdad550699b70)) by @AliMD
* **node-fs:** Update logger method arguments to include truncated path ([8c6f49a](https://github.com/Alwatr/nitrobase/commit/8c6f49ad56d5667ba1280a5d28b7a39b21c3a11a)) by @AliMD
* **reference:** add debugDomain ([83dd29a](https://github.com/Alwatr/nitrobase/commit/83dd29ad07e0a80ae1882f0a459402cf671708ef)) by @AliMD
* **reference:** Add hasUnprocessedChanges\_ flag to CollectionReference and DocumentReference ([dff3553](https://github.com/Alwatr/nitrobase/commit/dff35530732cce20d21337cb14df9b4ada9022b6)) by @AliMD
* **reference:** add immediate option to save methods ([9267cfd](https://github.com/Alwatr/nitrobase/commit/9267cfd13a19ab70cbf2857fe7160314d6a192d8)) by @AliMD
* **reference:** debounce for save file ([b40f9e9](https://github.com/Alwatr/nitrobase/commit/b40f9e9d4a2d2501471488b07266576a595380c3)) by @AliMD
* **reference:** demo ([ed82924](https://github.com/Alwatr/nitrobase/commit/ed82924a073dda6e4ff30c1dd73ec27c82eede60)) by @njfamirm
* **reference:** enhance logging ([4eab5a2](https://github.com/Alwatr/nitrobase/commit/4eab5a277f1bf818fdba2e49ae3ecf0d7e68b4f7)) by @AliMD
* **reference:** package structure ([070ba0e](https://github.com/Alwatr/nitrobase/commit/070ba0ef5a8b8197e473cba4f4aa5d245fcbec3a)) by @njfamirm
* **reference:** Refactor save method to include debounce option and public updateMeta\_ ([d9abf84](https://github.com/Alwatr/nitrobase/commit/d9abf8415dbe8e189a6dcba3d837fbe2a0e3cdb0)) by @AliMD
* **reference:** support nitrobase file id ([b7a8c33](https://github.com/Alwatr/nitrobase/commit/b7a8c33b1df6031c5827c3f0685d2a32352c4061)) by @njfamirm
* **nitrobase-engine:** add new nitrobase-engine package for v5 ([97b00d6](https://github.com/Alwatr/nitrobase/commit/97b00d62caaa931c50062942aa8668b50bdf24f1)) by @AliMD
* **nitrobase-reference:** Add utility functions for converting StoreFileId and StoreFileStat to string IDs and paths ([3343136](https://github.com/Alwatr/nitrobase/commit/3343136a481a0bfa15c6c8f8ec64ce31387a8887)) by @AliMD
* **nitrobase-reference:** debounce the updates ([6ec562c](https://github.com/Alwatr/nitrobase/commit/6ec562cee30e244b764bfe0d94f9125272eca4d4)) by @AliMD
* **nitrobase-reference:** Fix import and add new utility function ([60f25ce](https://github.com/Alwatr/nitrobase/commit/60f25ce8d8e9dedfe1cf663862b5952d64c9d0ec)) by @AliMD
* **nitrobase-reference:** Fix import paths in collection-reference.ts and document-reference.ts ([51b47ea](https://github.com/Alwatr/nitrobase/commit/51b47ea4d19f30036ddad437cbb1fe89c1fe1134)) by @AliMD
* **nitrobase-reference:** Fix import statements and add utility functions ([b323110](https://github.com/Alwatr/nitrobase/commit/b3231107f5867976074092b77ca26957c0976a81)) by @AliMD
* **nitrobase-reference:** new package for doc-ref and col-ref ([13303b5](https://github.com/Alwatr/nitrobase/commit/13303b53bd677b24158f0dc69b55cdcc2520576d)) by @AliMD
* **nitrobase-reference:** Refactor document reference class and import types ([eb2a2e0](https://github.com/Alwatr/nitrobase/commit/eb2a2e09edd325cc6e79dc5a57dc7b2859dc639f)) by @AliMD
* **type/storeFileId:** change debounce ([0f459b6](https://github.com/Alwatr/nitrobase/commit/0f459b6bf51ef2ab79b35a738f7a58dd67686527)) by @AliMD
* **types:** new package for nitrobase share types ([8487d02](https://github.com/Alwatr/nitrobase/commit/8487d0255b21ab02eecb0b6216e438fe0d0ca852)) by @AliMD

# [4.1.0](https://github.com/Alwatr/nitrobase/compare/v4.0.4...v4.1.0) (2023-12-25)

### Features

* **engine:** support cjs build ([87970d4](https://github.com/Alwatr/nitrobase/commit/87970d4ddbf8ff89c27d0765cfe91b0febe9b978)) by @njfamirm
* **sdk:** support cjs build ([14572df](https://github.com/Alwatr/nitrobase/commit/14572df978539e7c9a7b486842dd24b5a85aeae8)) by @njfamirm

## [4.0.4](https://github.com/Alwatr/nitrobase/compare/v4.0.3...v4.0.4) (2023-12-19)

**Note:** Version bump only for package alwatr-nitrobase

## [4.0.3](https://github.com/Alwatr/nitrobase/compare/v4.0.2...v4.0.3) (2023-12-19)

### Bug Fixes

* **api:** dockerfile label ([f6c9d03](https://github.com/Alwatr/nitrobase/commit/f6c9d034a91a3df3c85552f68092b312bb53304a)) by @AliMD
* definePackage without scope ([71d1b2d](https://github.com/Alwatr/nitrobase/commit/71d1b2d5d062911fefb9d2e8bdb9eb4026934613)) by @njfamirm
* dockerfile labels ([289057c](https://github.com/Alwatr/nitrobase/commit/289057c9cf979d9d33813c826943ede13e3c6a01)) by @AliMD

## [4.0.2](https://github.com/Alwatr/nitrobase/compare/v4.0.1...v4.0.2) (2023-11-28)

**Note:** Version bump only for package alwatr-nitrobase

## [4.0.1](https://github.com/Alwatr/nitrobase/compare/v4.0.0...v4.0.1) (2023-11-27)

### Bug Fixes

* **demo:** build ([80735fd](https://github.com/Alwatr/nitrobase/commit/80735fde1bfde0b8d7c3e270ef3bbbfe359bff91)) by @AliMD
* **sdk:** AlwatrStorage class name ([7e0d238](https://github.com/Alwatr/nitrobase/commit/7e0d2389d1fff0929a75adcf8c2419126a685c5a)) by @AliMD
* **sdk:** main file name ([3c55f58](https://github.com/Alwatr/nitrobase/commit/3c55f580bc18610ca1fd3dbe261a30d3cbe8fcae)) by @AliMD

# [4.0.0](https://github.com/Alwatr/nitrobase/compare/v4.0.0-rc.0...v4.0.0) (2023-11-27)

### Bug Fixes

* **api:** docker build issue ([cd70ee6](https://github.com/Alwatr/nitrobase/commit/cd70ee672150ea3e0de756183383e3d01a8fd59e)) by @AliMD
* **api:** server script ([4636a43](https://github.com/Alwatr/nitrobase/commit/4636a4308c7498c197bf2321dd4b47b7fe5a2d8e)) by @AliMD
* **nginx:** dockerfile ([0aa05ba](https://github.com/Alwatr/nitrobase/commit/0aa05ba6f6198a2b70f0be3ebc16d355f8bf0d1f)) by @AliMD
* **nginx:** review and enhance ([5adf303](https://github.com/Alwatr/nitrobase/commit/5adf303c763310de6a9657c07ce1b08bd4993146)) by @AliMD

### Features

* **api:** docker build ([1882f53](https://github.com/Alwatr/nitrobase/commit/1882f53db91d3ba35c726a1141bad288f8cf972a)) by @AliMD
* **api:** new build ([41691f4](https://github.com/Alwatr/nitrobase/commit/41691f46df64b9424de1eb80a4ed09a8eda48743)) by @AliMD
* **engine:** new build ([2385e76](https://github.com/Alwatr/nitrobase/commit/2385e764c08302d587dbee68cafdb9d63b3feeab)) by @AliMD
* **nginx:** accelerated nginx server ([823dc07](https://github.com/Alwatr/nitrobase/commit/823dc07759cd6e0da826b4e037d76b5e23bf7d9e)) by @AliMD
* **nginx:** base docker image ([337b88d](https://github.com/Alwatr/nitrobase/commit/337b88dc22b6c694f548296e62a3473f54e38ae6)) by @njfamirm
* **sdk:** new build ([08f00b5](https://github.com/Alwatr/nitrobase/commit/08f00b54a33493c4938975251ea8660fe58346fd)) by @AliMD
* service dockerfile ([f1cd7df](https://github.com/Alwatr/nitrobase/commit/f1cd7dfdd35cbc0e2343f72abf078b6be9714748)) by @njfamirm
