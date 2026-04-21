---
inclusion: always
---

# Project Structure

## Repository Layout

```
alwatr-devkit/
├── pkg/                        # All active packages
│   ├── core/                   # @alwatr/core — aggregates all nanolib exports
│   ├── devtools/               # @alwatr/devtools — internal dev tools (private)
│   ├── fsm/                    # @alwatr/fsm — finite state machine
│   ├── nanotron/               # @alwatr/nanotron — API server framework
│   ├── nitrobase/              # @alwatr/nitrobase — in-memory JSON database
│   ├── node/                   # @alwatr/node — Node.js utilities bundle
│   ├── playground/             # local experimentation, not published
│   ├── standard/               # @alwatr/standard — shared tsconfig + prettier config
│   ├── nanolib/                # Individual nano-packages (@alwatr/<name>), ~30+ packages
│   │   ├── action/             # @alwatr/action — Action layer for Unidirectional Data Flow
│   │   ├── async-queue/
│   │   ├── debounce/
│   │   ├── delay/
│   │   ├── directive/          # @alwatr/directive — attribute-based DOM directives
│   │   ├── logger/
│   │   ├── nano-build/         # @alwatr/nano-build — build CLI tool
│   │   ├── signal/             # @alwatr/signal — reactive signals
│   │   ├── type-helper/        # @alwatr/type-helper — global ambient types
│   │   └── ...
│   ├── nanotron-old/           # legacy nanotron sub-packages (do not modify)
│   └── nitrobase-old/          # legacy nitrobase sub-packages (do not modify)
├── deprecated/                 # Archived packages — do not modify
├── lerna.json                  # Lerna Lite config (version, changelog, publish)
├── package.json                # Root workspace — scripts, devDependencies
└── bun.lock                    # Lockfile
```

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
