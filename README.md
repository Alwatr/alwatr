# The Alwatr Library

<div align="center">

[![Build](https://github.com/AliMD/alwatr/actions/workflows/build.yaml/badge.svg?branch=next)](https://github.com/AliMD/alwatr/actions/workflows/build.yaml)
[![Lint](https://github.com/AliMD/alwatr/actions/workflows/lint.yaml/badge.svg?branch=next)](https://github.com/AliMD/alwatr/actions/workflows/lint.yaml)

</div>

Elegant powerful libraries written in tiny TypeScript module.

## Alwatr Monorepo

This is the monorepo for Alwatr packages, including `@alwatr/logger`, `@alwatr/fetch`, `@alwatr/signal`, `@alwatr/math`, `@alwatr/i18n`, `@alwatr/element`, `@alwatr/micro-server` and `@alwatr/font`

### Packages

- Core pakages

  - [`logger`](https://github.com/AliMD/alwatr/tree/next/packages/core/logger) - Colorful console debugger with custom scope.

  - [`fetch`](https://github.com/AliMD/alwatr/tree/next/packages/core/fetch) - Fetch API with the timeout, helper methods, and types.

  - [`signal`](https://github.com/AliMD/alwatr/tree/next/packages/core/sigal) - Event system for handle global signals and states.

  - [`math`](https://github.com/AliMD/alwatr/tree/next/packages/core/math) - Math library

  - [`i18n`](https://github.com/AliMD/alwatr/tree/next/packages/core/i18n) - Translation module (i18n/l10n) with dynamic json storage.

  - [`element`](https://github.com/AliMD/alwatr/tree/next/packages/core/element) - Web component (lit-element) helper mixins.

  - [`micro-server`](https://github.com/AliMD/alwatr/tree/next/packages/core/micro-server) - Nodejs server for microservice use cases.

- Ui
  - [`font`](https://github.com/AliMD/alwatr/tree/next/packages/ui/font) - Using Persian/Arabic web fonts for progressive web applications.
- Starter
  - [`microservice`](https://github.com/AliMD/alwatr/tree/next/packages/starter/microservice) - @alwatr/micro-server starter kit

## Contributing to Alwatr

Alwatr is open source and we appreciate issue reports and pull requests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

### Setting up the lit monorepo for development

Initialize repo:

```sh
git clone https://github.com/alimd/alwatr
cd alwatr
yarn
```

Build all packages:

```sh
yarn build
```
