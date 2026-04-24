# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.13.0](https://github.com/Alwatr/alwatr/compare/v9.12.0...v9.13.0) (2026-04-24)

### ✨ Features

* **action:** ActionRecord interface to define type safe all action payloads ([9bb6239](https://github.com/Alwatr/alwatr/commit/9bb62395a5e9c2e7f1ee54358f1f8b46f68b56d4))
* **action:** migrate to ChannelSignal for O(1) action routing ([b5a2d84](https://github.com/Alwatr/alwatr/commit/b5a2d84a01615abd4aaf98be92f4474071e22fad))

### 🐛 Bug Fixes

* **action:** export all public api with docs ([569e054](https://github.com/Alwatr/alwatr/commit/569e05402c5f06e26a76a9a5cb3d2d94c1ecbbb2))

### 🔨 Code Refactoring

* **action:** ChannelSignal strictly typed by `ActionRecord` ([de2715b](https://github.com/Alwatr/alwatr/commit/de2715bd2af69e163eb29ef8e2709e7fced2247c))
* **action:** enhance all methods ([fb17a52](https://github.com/Alwatr/alwatr/commit/fb17a522f6f9e142d685b0a4abb90aa52b4bbab5))
* **action:** new modifier and payload ([66304e5](https://github.com/Alwatr/alwatr/commit/66304e5fabc88d244bf7cba3dc44319f76df5897))
* **action:** rewrite the action ([4dc76b5](https://github.com/Alwatr/alwatr/commit/4dc76b5df141226548029e5458237b44b8622ab1))
* **page-ready:** new dispatchPageReady and onPageReady powered by ChannelSignal ([a560a3b](https://github.com/Alwatr/alwatr/commit/a560a3b3a687ab925cad5d3d85f71cbb5869d37a))

## [9.12.0](https://github.com/Alwatr/alwatr/compare/v9.11.2...v9.12.0) (2026-04-23)

**Note:** Version bump only for package @alwatr/action

## [9.11.2](https://github.com/Alwatr/alwatr/compare/v9.11.1...v9.11.2) (2026-04-21)

### 🐛 Bug Fixes

* **directive:** bind dispatch function correctly for event listener management ([cabc52e](https://github.com/Alwatr/alwatr/commit/cabc52e8b248e996b3e490a42b11ba80d0f2619c))
* **directive:** correct comment on conflicting modifiers in ActionDirective ([98183c1](https://github.com/Alwatr/alwatr/commit/98183c18448bed171cdaf05fa99d53c4e294af89))

### 🔨 Code Refactoring

* **action:** replace DirectiveBase with Directive in ActionDirective and related components ([7553f3b](https://github.com/Alwatr/alwatr/commit/7553f3be24325a1ab302e361fd1bdf0fb8a0c7f9))
* **directive:** update documentation for on-action attribute syntax and remove deprecated examples ([6a7be46](https://github.com/Alwatr/alwatr/commit/6a7be4681648af72da9b0a608a95724cc88ecf46))

### 🔗 Dependencies update

* update TypeScript to version 6.0.3 across all packages and upgrade prettier to version 3.8.3 ([daf6035](https://github.com/Alwatr/alwatr/commit/daf60356f38b03bb91da075b38777a3f581da656))

## [9.11.1](https://github.com/Alwatr/alwatr/compare/v9.11.0...v9.11.1) (2026-04-19)

### 🐛 Bug Fixes

* **alwatr-on:** make EventSignalPayload generic to support custom event types ([8dc792e](https://github.com/Alwatr/alwatr/commit/8dc792eaddfd166f87aa77e2579a3f8335c467ec))

## [9.11.0](https://github.com/Alwatr/alwatr/compare/v9.10.1...v9.11.0) (2026-04-19)

### ✨ Features

* **alwatr-on:** enhance event handling in alwatr-on directive to ensure event is always passed to handlers ([1aa4fed](https://github.com/Alwatr/alwatr/commit/1aa4fed7aa480cf0ede8bccdf49ab332b2a91220))
* **directives:** implement lazy registration for alwatr-on directive to enable tree-shaking ([c614734](https://github.com/Alwatr/alwatr/commit/c61473466309ef6803b766a1611b48150ae4191f))

## [9.10.1](https://github.com/Alwatr/alwatr/compare/v9.10.0...v9.10.1) (2026-04-18)

**Note:** Version bump only for package @alwatr/on

## [9.10.0](https://github.com/Alwatr/alwatr/compare/v9.9.0...v9.10.0) (2026-04-15)

### 🧹 Miscellaneous Chores

* **on:** update build preset to module-web for ESM browser builds ([47ed0e2](https://github.com/Alwatr/alwatr/commit/47ed0e2cab91619e698fe80e44028e6078526504))

## [9.9.0](https://github.com/Alwatr/alwatr/compare/v9.8.0...v9.9.0) (2026-04-14)

### ✨ Features

* **on:** add @alwatr/on nanolib package ([0524ffe](https://github.com/Alwatr/alwatr/commit/0524ffe7bd72c49fcd870cecdfaccf8b34697d2d))
* **on:** add AlwatrActionDirective for event-to-action binding ([1018df0](https://github.com/Alwatr/alwatr/commit/1018df0190f7b123cc81c8eeb9638ac1fb408b66))
* **on:** add alwatrOn method for subscribing to dispatched actions ([35247de](https://github.com/Alwatr/alwatr/commit/35247de542316f8d954a456b1ad2de806c3ac53f))
* **on:** add internal event signal for action dispatching ([2f5420c](https://github.com/Alwatr/alwatr/commit/2f5420c325494a91731a0454ea392cb19c6dec3d))
* **on:** define EventSignalPayload interface for event signal structure ([fa44a53](https://github.com/Alwatr/alwatr/commit/fa44a53f9e0f52e1bc0161470c8d0a8884b172f5))
* **on:** import SubscribeResult type for improved type safety ([63e8d2d](https://github.com/Alwatr/alwatr/commit/63e8d2debf102607042403e21121de82dc2f7f21))
* **on:** reorganize module exports and imports ([f1432b0](https://github.com/Alwatr/alwatr/commit/f1432b0b576c68cce83e0d2dc08c7089628ca1b8))

### 🐛 Bug Fixes

* **on:** override init_ method for improved syntax validation ([eac46f8](https://github.com/Alwatr/alwatr/commit/eac46f8023551e76c99293a2f83964e750620702))

### 🔨 Code Refactoring

* **on:** review and apply feedbacks ([dc44c98](https://github.com/Alwatr/alwatr/commit/dc44c983e043eb72fd3dc030b84fa5cc2c98dde3))
