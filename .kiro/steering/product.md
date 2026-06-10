---
inclusion: always
---

# Product: Alwatr Developer Kit

A TypeScript/ESM monorepo of small, focused libraries for building robust JavaScript/TypeScript applications. All packages are published under the `@alwatr/` npm scope. License: MPL-2.0.

## Design Philosophy

- **Nano-package principle**: each package does one thing well, with minimal dependencies
- **ESM-only**: no CommonJS; all packages use `"type": "module"`
- **Tree-shakeable**: `sideEffects: false` on all libraries (except `@alwatr/dedupe`)
- **Zero-config consumers**: internal packages depend on each other via `"workspace:*"`
- **Prefer internal packages**: before adding a new utility, check if an existing nanolib already covers it

## Top-Level Packages (`pkg/*`)

| Package      | npm name            | Notes                                                                                                     |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------------------- |
| `core`       | `@alwatr/core`      | Aggregates all cross-platform nanolib exports. Entry points: `.` (browser+node), `./node` (Node.js only). |
| `flux`       | `@alwatr/flux`      | UI and reactive bundle: signals, actions, directives, embedded-data, storage, page-ready, lit-html.       |
| `fsm`        | `@alwatr/fsm`       | Type-safe declarative reactive FSM on top of `@alwatr/signal`. Run-to-Completion model.                   |
| `nanotron`   | `@alwatr/nanotron`  | Lightweight API/microservice framework. Re-exports `nanotron-api-server`, `crypto`, `pre-handlers`.       |
| `nitrobase`  | `@alwatr/nitrobase` | In-memory JSON database with file persistence. Entry points: `.` (server), `./client`.                    |
| `node`       | `@alwatr/node`      | Aggregates Node.js/Bun utilities: `crypto`, `env`, `exit-hook`, `node-fs`.                                |
| `standard`   | `@alwatr/standard`  | Shared tsconfig + Prettier config. Extend in every package.                                               |
| `devtools`   | `@alwatr/devtools`  | Internal dev tools. Private, not published.                                                               |
| `playground` | `playground`        | Local experimentation sandbox. Private, not published.                                                    |

## Nanolib Packages (`pkg/nanolib/*`)

### Async / Concurrency

| Package               | Key API / Notes                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| `@alwatr/async-queue` | Serial async task execution (mutex pattern). Uses `@alwatr/flatomise`.                                          |
| `@alwatr/flatomise`   | Externally resolvable promise (deferred/flat-promise pattern).                                                  |
| `@alwatr/delay`       | `delay.by('1s')`, `.animationFrame()`, `.idleCallback()`, `.domEvent()`, `.nextMacrotask()`, `.nextMicrotask()` |
| `@alwatr/debounce`    | Type-safe debouncer. Options: `leading`/`trailing`, `cancel()`, `flush()`, `thisContext`.                       |

### Reactive / Signals

| Package          | Key API / Notes                                                                                                                                                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@alwatr/signal` | `StateSignal`, `EventSignal`, `ComputedSignal`, `EffectSignal`, `PersistentStateSignal`, `SessionStateSignal`, `ChannelSignal`. Operators: `debounce`, `filter`, `map`. Factory functions: `createState`, `createEvent`, `createComputed`, etc. |

### Hashing & Cryptography

| Package               | Key API / Notes                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `@alwatr/cyrb53`      | Fast 53-bit non-cryptographic hash. Zero deps.                                             |
| `@alwatr/djb2-hash`   | Fast 32-bit non-cryptographic hash.                                                        |
| `@alwatr/hash-string` | `nanoHash(str, prefix, repeat)` — short hash string via DJB2.                              |
| `@alwatr/crypto`      | HMAC-based HOTP token generator, secure hash, self-validating user factory. RFC 4226/6238. |

### DOM / Browser

| Package                   | Key API / Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@alwatr/directive`       | `@directive('attr-name')` decorator + `Directive` abstract base class. `LitDirective` subclass for lit-html rendering with `render_()` + `requestUpdate()`. Lifecycle hooks: `init_()`, `lazyInit_()`, `onVisible_()`, `onHidden_()`. Utility decorators: `@query`, `@queryAll`, `@attribute`, `@state`. Use `lazyDirective()` for tree-shakeable opt-in registration. `subscribe_()` helper for auto-cleanup signal subscriptions.                                                                                                                                               |
| `@alwatr/action`          | Action layer for Unidirectional Data Flow using the **AFSA** (Alwatr Flux Standard Action) pattern. HTML attribute `on-<eventType>="actionId[:payload][; modifiers]"` bridges DOM events to typed handlers via **global event delegation** (O(1) boot). Every action is a unified `Action{type, payload, context, meta}` object. `context` is auto-resolved from the nearest `[action-context]` ancestor. Subscribe: `actionService.on(type, (action) => …)`. Dispatch: `actionService.dispatch({type, payload, context?, meta?})`. Bootstrap: `actionService.setupDelegation()`. |
| `@alwatr/embedded-data`   | `EmbeddedDataCollector<T>` — framework-agnostic utility to extract, parse, and validate JSON from `<script type="application/json">` DOM nodes. Designed for SSR-friendly state hydration. Optional type-guard validator. Clears DOM content after extraction for GC.                                                                                                                                                                                                                                                                                                             |
| `@alwatr/local-storage`   | Versioned JSON in `localStorage`. `createLocalStorageProvider({name, schemaVersion})`. Auto-migrates on version bump.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `@alwatr/session-storage` | Same as `local-storage` but scoped to `sessionStorage`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `@alwatr/render-state`    | `renderState(state, renderRecord)` — state-driven render dispatch utility. Maps state strings to render functions with `_default` fallback.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `@alwatr/page-ready`      | MPA page identity signal. `onPageReady(pageId, handler)` — subscribe to a specific page. `subscribePageReady(handler)` — subscribe to all pages (handler receives the page ID). `dispatchPageReady()` — reads `[page-id]` attribute via `querySelector` and notifies subscribers. O(1) dispatch via `ChannelSignal`.                                                                                                                                                                                                                                                              |

### HTTP / Network

| Package               | Key API / Notes                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@alwatr/fetch`       | Enhanced `fetch`. Go-style tuple return `[Response, null] \| [null, FetchError]`. Retry, timeout, deduplication, caching strategies (`stale_while_revalidate`, `cache_first`, etc.). |
| `@alwatr/http-primer` | HTTP type definitions: `HttpMethods`, `HttpStatusCodes`, `HttpRequestHeaders`, `HttpResponseHeaders`, `MimeTypes`.                                                                   |

### Node.js / File System

| Package             | Key API / Notes                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `@alwatr/node-fs`   | Async-queued writes, atomic writes (temp → rename), backup on overwrite, `readJson`/`writeJson`. |
| `@alwatr/exit-hook` | Register cleanup handlers for process exit.                                                      |
| `@alwatr/env`       | Type-safe env var reader. `defaultValue`, `developmentValue`. Throws on missing required vars.   |

### Platform Detection

| Package                 | Key API / Notes                                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@alwatr/platform-info` | `platformInfo.name` → `'browser'`/`'node'`/`'semi-node'`/`'unknown'`. Flags: `isBrowser`, `isNode`, `isWebWorker`, `isDeno`, `isElectron`, `development`. |
| `@alwatr/global-this`   | Cross-platform `globalThis` (`window`/`global`/`self`).                                                                                                   |

### Utilities

| Package                                   | Key API / Notes                                                                                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@alwatr/lazy`                            | `Lazy<T>` class + `lazy()` factory — deferred evaluation with cached result and closure cleanup for GC. `.instance` accessor, `.isInitialized()` check. |
| `@alwatr/deep-clone`                      | `deepClone(obj)` — deep clone objects/arrays.                                                                                                           |
| `@alwatr/flat-string`                     | Flattens concatenated string's internal C structure for V8 performance.                                                                                 |
| `@alwatr/has-own`                         | Side-effect-free `Object.hasOwn` polyfill.                                                                                                              |
| `@alwatr/is-number`                       | `isNumber(v)`, `toNumber(v)`, `isFiniteNumber(v)` — handles string coercion edge cases.                                                                 |
| `@alwatr/parse-duration`                  | Parses `'10s'`, `'5m'`, `'2h'`, `'1.5d'` → milliseconds or other units.                                                                                 |
| `@alwatr/random`                          | `randNumber`, `randInteger`, `randFloat`, `randString`, `randUuid`, `randBoolean`, `randColor`, `randShuffle`, `randPick`, `randArray`, `bytesToHex`.   |
| `@alwatr/resolve-url`                     | Resolves URL parts into a clean URL string, handles slashes.                                                                                            |
| `@alwatr/json2csv`                        | JSON array → CSV string. Custom delimiter, optional headers, replacer support.                                                                          |
| `@alwatr/unicode-digits`                  | Converts digit strings between Unicode numeral systems (Persian, Arabic, Hindi, Thai, etc.).                                                            |
| `@alwatr/iranian-national-code-validator` | Validates Iranian National Code (Code Melli) using the official algorithm.                                                                              |
| `@alwatr/dedupe`                          | Detects/prevents duplicate package versions being imported. `sideEffects: true`.                                                                        |

### Types & Build

| Package               | Key API / Notes                                                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@alwatr/type-helper` | Global ambient TS helpers: `JsonObject`, `JsonValue`, `SingleOrArray`, `Dictionary`, etc. No runtime code.                                                                          |
| `@alwatr/nano-build`  | Build CLI wrapping `bun build`. Presets: `module`, `module-web`, `web`, `node-service`, `bun-service`. Injects `DEV_MODE`, `__package_name__`, `__package_version__` at build time. |

## Key Architectural Patterns

- **Logger**: every module creates `const logger = createLogger('scope-name')`. Debug methods (`logMethod`, `logMethodArgs`, etc.) must use optional chaining: `logger.logMethod?.('name')`.
- **Signals over callbacks**: prefer `@alwatr/signal` primitives (`StateSignal`, `EventSignal`, `ChannelSignal`) for reactive state rather than raw callbacks or event emitters.
- **ChannelSignal for multi-message buses**: use `ChannelSignal<TMap>` when a single signal carries multiple named message types (e.g. action dispatch). O(1) per-name routing via internal handler map.
- **FSM for complex state**: use `@alwatr/fsm` for any multi-state logic; avoid ad-hoc boolean flags.
- **Atomic file writes**: always use `@alwatr/node-fs` for file I/O in Node.js services — never raw `fs.writeFile`.
- **Go-style error handling**: `@alwatr/fetch` returns `[data, null] | [null, error]` tuples; follow this pattern in new async APIs where appropriate.
- **Private member naming**: suffix protected members with `_`, private members with `__` (e.g., `this.value__`, `this.logger_`).
- **Lazy evaluation**: use `@alwatr/lazy` (`lazy(() => expensiveInit())`) to defer costly initialization until first access, with automatic closure cleanup.
- **Unidirectional Data Flow (UDF)**: use `@alwatr/action` as the Action layer. DOM events flow up via `on-<eventType>` attributes → `actionService.dispatch({type, payload, context})` → `actionService.on(type, (action) => …)` handlers in business logic → state updates via signals → UI re-renders. Every action is an **AFSA** object carrying `type`, `payload`, `context` (from `[action-context]` ancestor), and optional `meta`. Never let UI components call business logic directly.
- **Directive-driven UI**: use `@alwatr/directive` to bind TypeScript classes to DOM elements via HTML attributes. Use `LitDirective` + `@state` for reactive rendering with lit-html. Use `subscribe_()` for auto-cleanup signal subscriptions.
