# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.0] - 2026-02-18

### ✨ Features

- Initial release of `@alwatr/session-storage` package.
- Provides `SessionStorageProvider` class for managing versioned JSON objects in `sessionStorage`.
- Includes factory function `createSessionStorageProvider` for easy instantiation.
- Supports automatic migration (clearing older versions) via `schemaVersion`.
- Static `has` method to check existence without creating an instance.
- Full TypeScript support.