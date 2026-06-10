---
inclusion: always
---

# Tech Stack

## Runtime & Package Manager

- **Bun** — primary runtime, test runner, and package manager (`bun install`, `bun test`)
- **Node.js** — secondary target for library output
- **TypeScript 6** — strict mode, ESNext target, `verbatimModuleSyntax`, `isolatedModules`
- **ESM only** — all packages use `"type": "module"`

## Build System

- **Lerna Lite** — monorepo task orchestration (`lerna run build`)
- **`@alwatr/nano-build`** — thin wrapper around `bun build` (esbuild) with presets:
  - `--preset=module` — ESM library, `--target=node`, external packages, linked sourcemaps
  - `--preset=module-web` — ESM library, `--target=browser`, external packages, linked sourcemaps
  - `--preset=web` — browser bundle, packages bundled in
  - `--preset=node-service` — bundled Node.js service
  - `--preset=bun-service` — bundled Bun service
- **Build-time constants** injected by nano-build (not runtime globals):
  - `DEV_MODE` — `boolean`, `true` unless `NODE_ENV=production`
  - `__package_name__` — `string`, from `package.json` `name` field
  - `__package_version__` — `string`, from `package.json` `version` field
- **`tsc --build`** — type checking and `.d.ts` generation only (`emitDeclarationOnly: true`)
- Each package runs `build:ts` (type check) then `build:es` (bundle) as its build step

## Code Style

- **Prettier** — config in `pkg/standard/prettier.config.js`
  - single quotes, 2-space indent, 120 print width, trailing commas, LF line endings
  - `experimentalTernaries: true`, `singleAttributePerLine: true`
- **EditorConfig** — 2-space indent, LF, UTF-8, 140 max line length
- **syncpack** — enforces consistent `package.json` field ordering across all packages

## Testing

- **Bun test** — built-in test runner using `bun:test` (Jest-compatible API)
- **`@happy-dom/global-registrator`** — DOM simulation for browser-dependent tests
- Test files: `*.test.js` co-located with source in `src/`
- Run with `ALWATR_DEBUG=0` to suppress debug logs
- Tests are excluded from published package files

## Key Libraries (internal)

- `@alwatr/logger` — `createLogger(domain)` returns scoped logger; debug methods are `undefined` when debug mode is off (use optional chaining: `logger.logMethod?.()`)
- `@alwatr/signal` — reactive primitives: `StateSignal`, `EventSignal`, `ComputedSignal`, `EffectSignal`, `PersistentStateSignal`, `SessionStateSignal`, `ChannelSignal`
- `@alwatr/type-helper` — global type augmentations (`JsonObject`, `SingleOrArray`, etc.) via ambient `types` in tsconfig
- `@alwatr/lazy` — `Lazy<T>` class + `lazy()` factory for deferred evaluation with GC-friendly closure cleanup
- `@alwatr/directive` — attribute-based DOM directives with `Directive` base class and `LitDirective` for lit-html rendering

## External Dependencies

- **lit-html** `^3.3.2` — used by `@alwatr/directive` for declarative template rendering
- **@types/node** `^24.12.2` — Node.js type definitions for server-side packages
- **bun-types** `^1.3.13` — Bun runtime type definitions (root devDependency)

## Common Commands

```sh
# Install dependencies
bun install

# Build all packages
bun run build          # or: lerna run build

# Build a single package (run from package directory)
bun run build          # build:ts + build:es
bun run build:ts       # type check + emit declarations
bun run build:es       # bundle with nano-build

# Watch mode (single package)
bun run watch

# Run all tests
bun run test           # bun test

# Lint
bun run lint           # tsc type check across all packages

# Format
bun run format         # prettier + eslint --fix

# Clean (single package)
bun run clean          # rm -rf dist *.tsbuildinfo

# Clean all (repo root) — uses git clean, preserves node_modules
bun run clean

# Release
bun run release        # lerna version (conventional commits, branch: next)
```

## Verification

After modifying any TypeScript, always run both checks before considering the task done:

```sh
# Type check across all packages
bun run lint

# Run all tests
bun run test
```
