# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.1](https://github.com/AliMD/alwatr/compare/v1.0.0...v1.0.1) (2023-06-21)

**Note:** Version bump only for package @alwatr/signal

# [1.0.0](https://github.com/AliMD/alwatr/compare/v0.32.0...v1.0.0) (2023-06-14)

**Note:** Version bump only for package @alwatr/signal

# [0.32.0](https://github.com/AliMD/alwatr/compare/v0.31.0...v0.32.0) (2023-05-27)

**Note:** Version bump only for package @alwatr/signal

# [0.31.0](https://github.com/AliMD/alwatr/compare/v0.30.0...v0.31.0) (2023-05-08)

### Bug Fixes

- new logger api ([9d83a7d](https://github.com/AliMD/alwatr/commit/9d83a7dc5c103bc3bb4282dacfd85fa998915300))
- **signal:** dont receivePrevious when listener is disabled ([68ae207](https://github.com/AliMD/alwatr/commit/68ae207ce9ecf104922b24910d8dfcedb13acde7))
- **signal:** requestableContextProvider.getValue ([0a7111d](https://github.com/AliMD/alwatr/commit/0a7111da7b8eb004566922dc9b35edfc02a55147))

### Features

- **signal:** new RequestableContext with state ([b8a8e55](https://github.com/AliMD/alwatr/commit/b8a8e550d3952863d85ba9d9d87513a668a9430d))

# [0.30.0](https://github.com/AliMD/alwatr/compare/v0.29.0...v0.30.0) (2023-03-06)

### Bug Fixes

- **signal:** NextCycle with own detail ([01f3c79](https://github.com/AliMD/alwatr/commit/01f3c79500927f6384a33abcc9b0cb2355794b3e))
- **signal:** nodejs compatibility ([69d8a60](https://github.com/AliMD/alwatr/commit/69d8a60ad64d44ee7c3ced002e702f13408a5a50))
- **signal:** requestableContextConsumer bind issue ([66467f6](https://github.com/AliMD/alwatr/commit/66467f6e5681d84d7f2e0b353206d4bb579b26f2))
- **signal:** requestContext dispatch issue ([e937ebd](https://github.com/AliMD/alwatr/commit/e937ebd3a90fc6a9946f5c35ef4f6f40b6ab4b00))

### Features

- **signal:** add untilChange for contextProvider ([cb44916](https://github.com/AliMD/alwatr/commit/cb4491698fd5ddfbe055032fc2cb50691de31194))
- **signal:** defineCommand return ListenerSpec ([21fecac](https://github.com/AliMD/alwatr/commit/21fecacb6aa9423da9e3c177a4bbc59952d94e35))
- **signal:** dispatch NextCycle option ([b30eb31](https://github.com/AliMD/alwatr/commit/b30eb316d92f594034fc40d195c4033e38e4d2e2))

# [0.29.0](https://github.com/AliMD/alwatr/compare/v0.28.0...v0.29.0) (2023-02-10)

### Bug Fixes

- **signal/core:** \_getSignalObject ([1374188](https://github.com/AliMD/alwatr/commit/1374188bdc7e689ded11d04bf4588a1162cc6d86))
- **signal:** alert [#1455](https://github.com/AliMD/alwatr/issues/1455) ([203307d](https://github.com/AliMD/alwatr/commit/203307df308a12e6c38cb9e0e2301b2015b6ff45))
- **signal:** clean old interfaces ([b2987ad](https://github.com/AliMD/alwatr/commit/b2987add7bfe0cf609fa355403fb9fb5de3f6b8a))
- **signal:** export all interfaces ([8704eac](https://github.com/AliMD/alwatr/commit/8704eac6ae7a8a45e77c24ef5e602e36af3fd21e))
- **signal:** export listeners ([fb05bfb](https://github.com/AliMD/alwatr/commit/fb05bfb9b7eb30427442783677ce1d4da5401160))
- **signal:** import types ([cc0b88b](https://github.com/AliMD/alwatr/commit/cc0b88be420b1fe057a8640bbffb1af3bf327cef))
- **signal:** interface bind type ([7b6c820](https://github.com/AliMD/alwatr/commit/7b6c820da2ba216f36e089bf79bdeccf208df3b1))
- **signal:** reported issues ([75f688f](https://github.com/AliMD/alwatr/commit/75f688faf96a056a256603d05276f5731db86aee))
- **signal:** TSignal on SignalControllerInterface ([ac42b7c](https://github.com/AliMD/alwatr/commit/ac42b7c7023549e8dd07cd3d9e189f356ffa06ee))

### Features

- **signal-manager:** enhance provider, docs ([c4583a3](https://github.com/AliMD/alwatr/commit/c4583a3b0fcbf38b5e426aaa2bc6e0f52ccac5fd))
- **signal:** alias in SignalInterface & BoundSignalInterface ([053030b](https://github.com/AliMD/alwatr/commit/053030b96c09d474794f32327d892f1d3690656c))
- **signal:** bind signal ([de49a13](https://github.com/AliMD/alwatr/commit/de49a13eaffce31660849dfc63285d97e9098c0c))
- **signal:** command handler/provider interface ([3d23683](https://github.com/AliMD/alwatr/commit/3d236837e13d8cfdcd44a1570bdc9659f48e7f47))
- **signal:** command signals ([98c1d90](https://github.com/AliMD/alwatr/commit/98c1d90978329e4c5c584e19edb1aaa365632162))
- **signal:** command trigger interface ([dda9466](https://github.com/AliMD/alwatr/commit/dda94666d9e8e490fea26038044df0e67c203583))
- **signal:** commandSignal ([5a0d7e5](https://github.com/AliMD/alwatr/commit/5a0d7e5498087620d28548ea5d90036a7b17483a))
- **signal:** context prover and consumer ([081a51a](https://github.com/AliMD/alwatr/commit/081a51a1ee88e66ebbcd0c58186c00a6aa9e1032))
- **signal:** contextProvider.expire ([7d0ce93](https://github.com/AliMD/alwatr/commit/7d0ce937f0eadcd9019e6047fbe07aa1a3b579a7))
- **signal:** event listener interface ([4ca4079](https://github.com/AliMD/alwatr/commit/4ca407938d444027cdbd435173c875fdd9ce8e28))
- **signal:** event trigger interface ([9b90597](https://github.com/AliMD/alwatr/commit/9b905979a5065640981433ec7d120ba2494966bb))
- **signal:** new contextConsumer interface ([9ee4a62](https://github.com/AliMD/alwatr/commit/9ee4a624211adb66d9c3d180470cca44ed7df382))
- **signal:** new contextProvider interface ([e5d29eb](https://github.com/AliMD/alwatr/commit/e5d29ebaa75d71bb5a87bedddb2be7600e68b210))
- **signal:** new manager interface ([f028306](https://github.com/AliMD/alwatr/commit/f028306f4d7932df65a1bbeade0d29377a370e2e))
- **signal:** new requestable context consumer interface ([bf6845f](https://github.com/AliMD/alwatr/commit/bf6845f35a98bb63bcfa42196c2f977d64aea59e))
- **signal:** new requestable context provider interface ([2c8d576](https://github.com/AliMD/alwatr/commit/2c8d57604dcb07a2831d85d4ef1e262863a5fae8))
- **signal:** new signal dynamic types ([0f1a38e](https://github.com/AliMD/alwatr/commit/0f1a38e356ab73e4e2e1a8f852585e50e86cff0e))
- **signal:** new simple api ([eb1e478](https://github.com/AliMD/alwatr/commit/eb1e47892d4478fb6c687f6d15e1a5c204b5666c))
- **signal:** refactor all generic types with Stringifyable ([bdcef63](https://github.com/AliMD/alwatr/commit/bdcef632c81fa5e7c7ae595a7a77092c53821850))
- **signal:** separate request command with response ([47a779e](https://github.com/AliMD/alwatr/commit/47a779e9a814d5d6a388f1a3e94c23e7fb977dce))
- **signal:** signal.request ([d791b3e](https://github.com/AliMD/alwatr/commit/d791b3eef846697020b76bfecfbf25a3e31eb3a5))
- **signal:** signal.untilNext ([9df78c0](https://github.com/AliMD/alwatr/commit/9df78c03dea243b467504fdf422388ab9d2b5660))
- **signal:** signals.expire ([3591efd](https://github.com/AliMD/alwatr/commit/3591efd5e42f7a981814fd59d7189b5066735302))

# [0.28.0](https://github.com/AliMD/alwatr/compare/v0.27.0...v0.28.0) (2023-01-20)

**Note:** Version bump only for package @alwatr/signal

# [0.27.0](https://github.com/AliMD/alwatr/compare/v0.26.0...v0.27.0) (2022-12-29)

**Note:** Version bump only for package @alwatr/signal

# [0.26.0](https://github.com/AliMD/alwatr/compare/v0.25.0...v0.26.0) (2022-12-22)

### Bug Fixes

- set correct path ([d01ce6f](https://github.com/AliMD/alwatr/commit/d01ce6ffa749a5e3e0e11e35b4ed61d75d61fec9))
- tsconfig ([e96dcd3](https://github.com/AliMD/alwatr/commit/e96dcd30774a9f06f7d051e0504192cbbe019e35))

### Features

- improve error debugging ([1fba504](https://github.com/AliMD/alwatr/commit/1fba50400a1e8ececc10bbe8ea11cc8dcea2289c))

# [0.25.0](https://github.com/AliMD/alwatr/compare/v0.24.1...v0.25.0) (2022-12-07)

**Note:** Version bump only for package @alwatr/signal

## [0.24.1](https://github.com/AliMD/alwatr/compare/v0.24.0...v0.24.1) (2022-12-01)

**Note:** Version bump only for package @alwatr/signal

# [0.24.0](https://github.com/AliMD/alwatr/compare/v0.23.0...v0.24.0) (2022-11-28)

### Bug Fixes

- use ~ for package version ([4e027ff](https://github.com/AliMD/alwatr/commit/4e027ff63875e03b088ebcdc1bdf2495f4494eec))

# [0.23.0](https://github.com/AliMD/alwatr/compare/v0.22.1...v0.23.0) (2022-11-23)

**Note:** Version bump only for package @alwatr/signal

## [0.22.1](https://github.com/AliMD/alwatr/compare/v0.22.0...v0.22.1) (2022-11-21)

**Note:** Version bump only for package @alwatr/signal

# [0.22.0](https://github.com/AliMD/alwatr/compare/v0.21.0...v0.22.0) (2022-11-20)

**Note:** Version bump only for package @alwatr/signal

# [0.21.0](https://github.com/AliMD/alwatr/compare/v0.20.0...v0.21.0) (2022-11-13)

**Note:** Version bump only for package @alwatr/signal

# [0.20.0](https://github.com/AliMD/alwatr/compare/v0.19.0...v0.20.0) (2022-11-05)

**Note:** Version bump only for package @alwatr/signal

# [0.19.0](https://github.com/AliMD/alwatr/compare/v0.18.0...v0.19.0) (2022-11-01)

### Bug Fixes

- Import error in webpack ([1a52f67](https://github.com/AliMD/alwatr/commit/1a52f67ff2788c51abd13126f34353c26aa669c3))

# [0.18.0](https://github.com/AliMD/alwatr/compare/v0.17.0...v0.18.0) (2022-10-22)

**Note:** Version bump only for package @alwatr/signal

# [0.17.0](https://github.com/AliMD/alwatr/compare/v0.16.1...v0.17.0) (2022-10-21)

### Bug Fixes

- **signal:** default options ([bbb0d59](https://github.com/AliMD/alwatr/commit/bbb0d59442301344781691bbecad39aed7f6ac40))

# [0.16.0](https://github.com/AliMD/alwatr/compare/v0.15.0...v0.16.0) (2022-09-08)

**Note:** Version bump only for package @alwatr/signal

# [0.15.0](https://github.com/AliMD/alwatr/compare/v0.14.0...v0.15.0) (2022-09-01)

### Bug Fixes

- get signal object of `request` signal ([eec4b62](https://github.com/AliMD/alwatr/commit/eec4b6201d79785aa10f4b9c777449525158a346))
- **signal:** fix some issues of `review` ([36ceb8b](https://github.com/AliMD/alwatr/commit/36ceb8b25987621065327b4fa475a213562af8e7))
- **signal:** log performance and security issue ([dbe9483](https://github.com/AliMD/alwatr/commit/dbe9483b672099b91c18c3a103c2878435fd6508))

# [0.14.0](https://github.com/AliMD/alwatr/compare/v0.13.0...v0.14.0) (2022-08-19)

**Note:** Version bump only for package @alwatr/signal

# [0.13.0](https://github.com/AliMD/alwatr/compare/v0.12.0...v0.13.0) (2022-08-06)

**Note:** Version bump only for package @alwatr/signal

# [0.12.0](https://github.com/AliMD/alwatr/compare/v0.11.0...v0.12.0) (2022-07-22)

**Note:** Version bump only for package @alwatr/signal

# [0.11.0](https://github.com/AliMD/alwatr/compare/v0.10.1...v0.11.0) (2022-04-16)

**Note:** Version bump only for package @alwatr/signal

# [0.10.0](https://github.com/AliMD/alwatr/compare/v0.9.0...v0.10.0) (2022-04-02)

**Note:** Version bump only for package @alwatr/signal

# [0.9.0](https://github.com/AliMD/alwatr/compare/v0.8.0...v0.9.0) (2022-03-22)

### Features

- **signal:** ListenerInterface ([38ef029](https://github.com/AliMD/alwatr/commit/38ef0291c5ba2e3619080ad89109d805d3d600f2))

# [0.8.0](https://github.com/AliMD/alwatr/compare/v0.7.2...v0.8.0) (2022-03-14)

### Bug Fixes

- **signal:** remove once listene in dispatch change imediatly the loop! ([e4d420d](https://github.com/AliMD/alwatr/commit/e4d420d3a086558dc01dcd7a9c5fe3e96677f092))

## [0.7.2](https://github.com/AliMD/alwatr/compare/v0.7.1...v0.7.2) (2022-03-12)

### Bug Fixes

- **signal:** promise to multi requests works ([dd59f0e](https://github.com/AliMD/alwatr/commit/dd59f0e5737abec72c41895b93365199fad66fcb))

# [0.7.0](https://github.com/AliMD/alwatr/compare/v0.6.1...v0.7.0) (2022-03-12)

**Note:** Version bump only for package @alwatr/signal

# [0.6.0](https://github.com/AliMD/alwatr/compare/v0.5.0...v0.6.0) (2022-03-11)

### Bug Fixes

- alalwatr ([898aa6e](https://github.com/AliMD/alwatr/commit/898aa6ed0888eab9265c83b96a50f1b8c216d143))
- **packages:** duplicate alwatr keyword ([77d4aa2](https://github.com/AliMD/alwatr/commit/77d4aa2105ad47515c3eee251fd6b8c281d0d1fc))

# [0.5.0](https://github.com/AliMD/alwatr/compare/v0.4.0...v0.5.0) (2022-03-11)

### Bug Fixes

- **signal:** disabled getter and optional dispatch options ([28ced3d](https://github.com/AliMD/alwatr/commit/28ced3d0c4cdf44fc2aebfab98db0883fc5363fe))

### Features

- **signal:** new SignalInterface ([221701a](https://github.com/AliMD/alwatr/commit/221701a54ea9edda4a3a935a7b098e235ec52691))

# [0.4.0](https://github.com/AliMD/alwatr/compare/v0.3.0...v0.4.0) (2022-03-11)

**Note:** Version bump only for package @alwatr/signal

# [0.3.0](https://github.com/AliMD/alwatr/compare/v0.2.1...v0.3.0) (2022-03-06)

### Bug Fixes

- **signal:** signal provider type ([0151c57](https://github.com/AliMD/alwatr/commit/0151c57d9b6d4f7e83bb9b1847ebe0ae53cd8f89))

## [0.2.1](https://github.com/AliMD/alwatr/compare/v0.2.0...v0.2.1) (2022-03-05)

### Bug Fixes

- **signal:** signal value type issue ([292a4a7](https://github.com/AliMD/alwatr/commit/292a4a7d12a2fd143761e67cd1ecd2e5e40f2ee9))

# [0.2.0](https://github.com/AliMD/alwatr/compare/v0.1.2...v0.2.0) (2022-03-05)

### Bug Fixes

- **router:** rename setSignalProvider callback detail to requestParam ([6e09f87](https://github.com/AliMD/alwatr/commit/6e09f8772d320625fb4c15ccaa0abcfa2932f992))
- **signal:** fix dispatchSignal value parameters ([4d34cfb](https://github.com/AliMD/alwatr/commit/4d34cfbb5281d5ce4a4f06ddaaf72218dde80cdd))

### Features

- **signal:** add contributors ([64287cd](https://github.com/AliMD/alwatr/commit/64287cd8cea95665a6ed298177df60dadda7642b))
- **signal:** improve signal provider by dispatch return content ([80c2b27](https://github.com/AliMD/alwatr/commit/80c2b275bcc0521327400c5902f512c778f5eb3f))

## [0.1.2](https://github.com/AliMD/alwatr/compare/v0.1.1...v0.1.2) (2022-03-03)

**Note:** Version bump only for package @alwatr/signal

## [0.1.1](https://github.com/AliMD/alwatr/compare/v0.1.0...v0.1.1) (2022-03-03)

### Bug Fixes

- **packages:** add publish config to public ([9cb3710](https://github.com/AliMD/alwatr/commit/9cb37106b5a35d24d5195ff54232e5769ccc034e))

# 0.1.0 (2022-03-02)

### Bug Fixes

- **signal:** AlwatrRequestSignals global type ([228e333](https://github.com/AliMD/alwatr/commit/228e3333326b23df51e7834872daf1349826bf09))

### Features

- **signal:** addSignalListener ([e7c5742](https://github.com/AliMD/alwatr/commit/e7c57427ef11e2624eb9a52a166720b1a3c5f66a))
- **signal:** getSignalObject ([b38954c](https://github.com/AliMD/alwatr/commit/b38954cf4ae1c24eaaa79ecf513995a4678814ee))
- **signal:** impeliment addSignalProvider, waitForSignal, hasSignalDispatchedBefore, expireSignal ([e0b4d78](https://github.com/AliMD/alwatr/commit/e0b4d7831764d4454591f5105c5512e1657a63e5))
- **signal:** impeliment dispatchSignal ([cb2dfbe](https://github.com/AliMD/alwatr/commit/cb2dfbe23ea751cba93cb1f6516cd2bfa2ecb18e))
- **signal:** ListenerObject, SignalObject types ([36d8a33](https://github.com/AliMD/alwatr/commit/36d8a336760bba3808cfd26a28e4d24a31c95f8f))
- **signal:** make new package for manage signals ([5bf82b3](https://github.com/AliMD/alwatr/commit/5bf82b3f05abc89102634e9b864d81b5b5af527e))
- **signal:** register to alwatr meta ([9c850e8](https://github.com/AliMD/alwatr/commit/9c850e8df787aa44d289929dc65439e921982dce))
- **signal:** removeSignalListener ([0088a52](https://github.com/AliMD/alwatr/commit/0088a5269ccce8b50a50e444695c81654fda70ff))
- **signal:** requestSignal ([111ab5a](https://github.com/AliMD/alwatr/commit/111ab5a1436bc380f5121ef8c130da7010258d90))
