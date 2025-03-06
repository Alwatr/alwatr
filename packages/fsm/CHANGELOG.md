# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
