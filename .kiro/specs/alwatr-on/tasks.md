# Tasks: `@alwatr/on`

## Task List

- [x] 1. Scaffold package structure
  - [x] 1.1 Create `pkg/nanolib/on/` directory with `src/` subdirectory
  - [x] 1.2 Create `package.json` following nanolib conventions (`"type": "module"`, `workspace:*` deps, build scripts) — Req 7.1, 7.2, 7.5
  - [x] 1.3 Create `tsconfig.json` extending `@alwatr/standard/tsconfig` — Req 7.5
  - [x] 1.4 Create `LICENSE` (MPL-2.0, copy from sibling package)

- [x] 2. Implement source files
  - [x] 2.1 Create `src/signal.ts` — `EventSignalPayload` interface and module-level `eventSignal_` singleton — Req 7.4
  - [x] 2.2 Create `src/directive.ts` — `AlwatrActionDirective` class with `syntaxRegex`, `match` field, `init_()`, `dispatch_()`, and `registerAlwatrOnDirective` lazy registration — Req 1, 2, 3, 4, 5
  - [x] 2.3 Create `src/method.ts` — `alwatrOn(actionId, handler)` subscription helper — Req 6
  - [x] 2.4 Create `src/main.ts` — re-exports all public symbols from `./method.js` and `./directive.js` — Req 7.3

- [x] 3. Forward DOM event through signal (event access in `alwatrOn`)
  - [x] 3.1 Update `EventSignalPayload` in `src/signal.ts` — change `event` field from `event?: Event` to `event: Event` (always required)
  - [x] 3.2 Update `dispatch_()` in `src/directive.ts` — change signature from `dispatch_(event?: Event)` to `dispatch_(event: Event)` and always pass `event` in the signal payload
  - [x] 3.3 Update `init_()` in `src/directive.ts` — for `eventType === 'init'`, create a synthetic `CustomEvent('init', {bubbles: false, cancelable: false})`, dispatch it on `element_` via `element_.dispatchEvent()`, then call `dispatch_(syntheticEvent)` instead of `dispatch_()`
  - [x] 3.4 Update `alwatrOn` in `src/method.ts` — change handler signature to `(payload: string, event: Event) => void` (remove optional) and forward `payload.event` as the second argument

- [x] 4. Write README.md
  - [x] 4.1 Document installation, attribute syntax format, `registerAlwatrOnDirective()` opt-in, `alwatrOn` API, and usage examples

- [x] 5. Build and verify
  - [x] 5.1 Run `bun run build` inside `pkg/nanolib/on/`
  - [x] 5.2 Verify `dist/` output is generated correctly

- [ ]\* 6. Write property-based tests
  - [ ]\* 6.1 Create `src/directive.test.js` — test `syntaxRegex` parsing (valid/invalid inputs), payload resolution (`''`, `$value`, literal), `init` one-shot dispatch, listener cleanup symmetry — Props 1–6, 9
  - [ ]\* 6.2 Create `src/method.test.js` — test `alwatrOn` action isolation, event forwarding, and unsubscribe behavior — Props 7–8, 10
