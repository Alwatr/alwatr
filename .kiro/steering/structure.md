---
inclusion: always
---

# Project Structure

## Repository Layout

```
alwatr-devkit/
├── pkg/                        # All active packages
│   ├── core/                   # @alwatr/core — aggregates all cross-platform nanolib exports
│   ├── devtools/               # @alwatr/devtools — internal dev tools (private)
│   ├── flux/                   # @alwatr/flux — UI and reactive bundle (signals, actions, directives, storage)
│   ├── fsm/                    # @alwatr/fsm — finite state machine
│   ├── nanotron/               # @alwatr/nanotron — API server framework
│   ├── nitrobase/              # @alwatr/nitrobase — in-memory JSON database
│   ├── node/                   # @alwatr/node — Node.js utilities bundle
│   ├── playground/             # local experimentation, not published
│   ├── standard/               # @alwatr/standard — shared tsconfig + prettier config
│   ├── nanolib/                # Individual nano-packages (@alwatr/<name>), ~38 packages
│   │   ├── action/             # @alwatr/action — Action layer for Unidirectional Data Flow
│   │   ├── async-queue/
│   │   ├── crypto/
│   │   ├── cyrb53/
│   │   ├── debounce/
│   │   ├── dedupe/
│   │   ├── deep-clone/
│   │   ├── delay/
│   │   ├── directive/          # @alwatr/directive — attribute-based DOM directives + lit-html rendering
│   │   ├── djb2-hash/
│   │   ├── embedded-data/      # @alwatr/embedded-data — SSR-friendly JSON hydration from script tags
│   │   ├── env/
│   │   ├── exit-hook/
│   │   ├── fetch/
│   │   ├── flat-string/
│   │   ├── flatomise/
│   │   ├── global-this/
│   │   ├── has-own/
│   │   ├── hash-string/
│   │   ├── http-primer/
│   │   ├── iranian-national-code-validator/
│   │   ├── is-number/
│   │   ├── json2csv/
│   │   ├── lazy/               # @alwatr/lazy — memory-efficient lazy evaluation wrapper
│   │   ├── local-storage/
│   │   ├── logger/
│   │   ├── nano-build/         # @alwatr/nano-build — build CLI tool
│   │   ├── node-fs/
│   │   ├── page-ready/
│   │   ├── parse-duration/
│   │   ├── platform-info/
│   │   ├── random/
│   │   ├── render-state/
│   │   ├── resolve-url/
│   │   ├── session-storage/
│   │   ├── signal/             # @alwatr/signal — reactive signals (State, Event, Computed, Effect, Channel)
│   │   ├── type-helper/        # @alwatr/type-helper — global ambient types
│   │   └── unicode-digits/
│   ├── nanotron-old/           # legacy nanotron sub-packages (do not modify)
│   └── nitrobase-old/          # legacy nitrobase sub-packages (do not modify)
├── deprecated/                 # Archived packages — do not modify
├── lerna.json                  # Lerna Lite config (version, changelog, publish)
├── package.json                # Root workspace — scripts, devDependencies
└── bun.lock                    # Lockfile
```

## Bundle Packages

The monorepo provides two convenience bundles that re-export groups of nanolibs:

- **`@alwatr/core`** — cross-platform utilities (async-queue, debounce, delay, fetch, hash, random, lazy, logger, etc.). Entry points: `.` (browser+node), `./node` (Node.js only).
- **`@alwatr/flux`** — UI and reactive layer (signal, action, directive, embedded-data, render-state, local-storage, session-storage, page-ready, lit-html re-exports). Single entry point `.`.

Use the bundle for convenience or import individual nanolibs for minimal bundle size.

## Package Anatomy

Every package under `pkg/` follows this structure exactly:

```
pkg/<name>/
├── src/
│   ├── main.ts         # Sole public entry point — only re-exports from sibling files
│   ├── *.ts            # Implementation files
│   └── *.test.js       # Co-located tests (JS, not TS)
├── dist/               # Build output (gitignored)
├── package.json        # exports map, scripts, dependencies
├── tsconfig.json       # extends @alwatr/standard/tsconfig
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## Critical Conventions

### Imports & Exports

- Always use `.js` extensions in TypeScript source — they resolve correctly at runtime:
  ```ts
  import {foo} from './bar.js';
  import type {Baz} from './type.js';
  ```
- Use `import type` / `export type` for type-only symbols — `verbatimModuleSyntax` enforces this.
- `package.json` must use an `exports` map with `types` / `import` / `default` conditions.
- All libraries set `"sideEffects": false` (except `@alwatr/dedupe`).

### Module Entry Point

- `src/main.ts` is the **only** public entry point for every package.
- It must only re-export from sibling files — no implementation logic in `main.ts`.

### Logging

- Every class/module creates its own scoped logger:
  ```ts
  const logger = createLogger('scope-name');
  ```
- Debug-only methods (`logMethod`, `logMethodArgs`, etc.) **must** use optional chaining to be safely stripped in production:
  ```ts
  logger.logMethod?.('methodName');
  logger.logMethodArgs?.('methodName', args);
  ```

### Private Member Naming

- Protected members: suffix with `_` → `this.logger_`, `this.state_`
- Private members: suffix with `__` → `this.value__`, `this.cache__`

### Dependencies

- Internal packages reference each other with `"workspace:*"` (or `"workspace:^"` for looser ranges).
- Before adding a new utility, check if an existing nanolib already covers it.

### Tests

- Test files are `.test.js` (not `.test.ts`), co-located in `src/`.
- Use `bun:test` (Jest-compatible API).
- DOM-dependent tests use `@happy-dom/global-registrator` for DOM simulation.
- Import from the package name, not relative paths:
  ```js
  import {StateSignal} from '@alwatr/signal'; // correct
  import {StateSignal} from '../signal/src/main.js'; // wrong
  ```
- Run with `ALWATR_DEBUG=0` to suppress debug logs during tests.

### tsconfig

- All packages extend `@alwatr/standard/tsconfig`.
- Set `rootDir: src`, `outDir: dist`.
- List needed ambient `types` (e.g. `@alwatr/type-helper`, `@alwatr/nano-build`).

### Commit Messages

- Follow Conventional Commits: `feat:`, `fix:`, `perf:`, `refactor:`, `chore:`, `deps:`.
- Releases are cut from the `next` branch via `lerna version`.

### Canonical Code Reference

When writing new packages or functions, use existing active packages under `pkg/nanolib/` as canonical reference implementations — especially `pkg/nanolib/signal` and `pkg/nanolib/logger`. Pay attention to:

- Directory layout and `src/main.ts` as the sole public entry point
- Visibility suffixes (`_` protected, `__` private)
- Co-located `*.test.js` tests
- `.js` extensions in all imports

### Commenting for AI

Leave clear, context-rich inline comments explaining the **intent**, **business logic**, and **why** a specific approach was chosen. Design these comments as navigational anchors so future AI agents can instantly grasp the context without scanning the entire monorepo.

### Language Rules

- **Code, documentation, inline comments, markdown files, and commit messages:** English only.
- **Chat responses to the developer:** Persian (Farsi).

### package.json Field Order

Enforced by syncpack (`.syncpackrc`):

```
name → version → description → private → license → author → type → workspaces →
repository → homepage → bugs → engines → bin → exports → sideEffects →
dependencies → peerDependencies → devDependencies → resolutions → scripts →
files → publishConfig → keywords
```
