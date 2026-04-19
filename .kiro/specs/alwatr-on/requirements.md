# Requirements Document: `@alwatr/on`

## Introduction

`@alwatr/on` is a declarative DOM action-dispatch package that bridges HTML attributes to application-level signal handlers. It provides two primitives:

1. **`AlwatrActionDirective`** — a `DirectiveBase` subclass that reads `alwatr-on` attributes, parses their syntax, and dispatches typed action signals in response to DOM events.
2. **`alwatrOn`** — a subscription helper that lets any part of the application react to those actions by `actionId`.

The package follows the nano-package principle: one responsibility, minimal dependencies, ESM-only, tree-shakeable.

---

## Glossary

- **Directive**: A class extending `DirectiveBase` from `@alwatr/directive` that is automatically instantiated for every matching HTML attribute found by `bootstrapDirectives()`.
- **AlwatrActionDirective**: The directive class registered for the `alwatr-on` HTML attribute.
- **attributeValue**: The string value of the `alwatr-on` attribute on a DOM element (e.g., `"click->open-drawer:main"`).
- **syntaxRegex**: The compiled regular expression `/^([a-z]+)->([a-z0-9-]+)(?::(.+))?$/` used to parse `attributeValue`.
- **eventType**: The first capture group of `syntaxRegex` — the DOM event name (e.g., `"click"`, `"input"`) or the special value `"init"`.
- **actionId**: The second capture group of `syntaxRegex` — the identifier used to route the action to the correct handler (e.g., `"open-drawer"`).
- **rawPayload**: The optional third capture group of `syntaxRegex` — either a literal string, the special token `"$value"`, or absent.
- **actionPayload**: The resolved string value forwarded to the handler. Derived from `rawPayload` at dispatch time.
- **eventSignal\_**: The module-level singleton `EventSignal` instance shared by all directives and `alwatrOn` subscriptions within the same module load.
- **ActionPayload**: The TypeScript interface `{ actionId: string; actionPayload: string; event: Event }` carried by `eventSignal_`. The `event` field is always present — never `undefined`.
- **syntheticEvent**: A `CustomEvent('init', {bubbles: false, cancelable: false})` created and dispatched on `element_` via `element_.dispatchEvent()` when `eventType === "init"`. Ensures `event.target === element_` and `event.type === "init"` so handlers always receive a valid `Event`.
- **SubscribeResult**: The return type of `eventSignal_.subscribe(...)`, containing an `unsubscribe()` method.
- **dispatch\_**: The bound method on `AlwatrActionDirective` that resolves `actionPayload` and calls `eventSignal_.dispatch(...)`.
- **destroy hook**: A callback registered via `addDestroyHook(...)` that is invoked when the directive is destroyed, used to remove DOM event listeners.
- **init event**: The special `eventType` value `"init"` that causes an immediate one-shot dispatch without registering a persistent DOM listener.

---

## Requirements

### Requirement 1: Attribute Syntax Parsing

**User Story:** As a developer, I want to declare DOM-to-action bindings in HTML attributes, so that I can wire up application actions without writing imperative event-listener code.

#### Acceptance Criteria

1. WHEN `AlwatrActionDirective` is initialized with an `attributeValue`, THE `AlwatrActionDirective` SHALL parse the value against `syntaxRegex` to extract `eventType`, `actionId`, and optional `rawPayload`.
2. WHEN `attributeValue` matches `syntaxRegex`, THE `AlwatrActionDirective` SHALL store the match result and proceed with initialization.
3. IF `attributeValue` does not match `syntaxRegex`, THEN THE `AlwatrActionDirective` SHALL call `logger_.accident(...)` and return without registering any DOM listener or dispatching any signal.
4. THE `syntaxRegex` SHALL be the pattern `/^([a-z]+)->([a-z0-9-]+)(?::(.+))?$/`.

---

### Requirement 2: DOM Event Listening

**User Story:** As a developer, I want the directive to automatically attach and detach DOM event listeners, so that I do not have to manage listener lifecycle manually.

#### Acceptance Criteria

1. WHEN `eventType` is any valid string other than `"init"`, THE `AlwatrActionDirective` SHALL call `element_.addEventListener(eventType, dispatch_)` during `init_()`.
2. WHEN `AlwatrActionDirective` registers a DOM listener, THE `AlwatrActionDirective` SHALL register a destroy hook that calls `element_.removeEventListener(eventType, dispatch_)`.
3. WHILE a destroy hook is registered, THE `AlwatrActionDirective` SHALL ensure that for every `addEventListener` call there is exactly one corresponding `removeEventListener` call registered via `addDestroyHook`.

---

### Requirement 3: One-Shot `init` Event

**User Story:** As a developer, I want to trigger an action immediately when a directive is initialized, so that I can handle page-load or component-mount actions declaratively in HTML — and receive a consistent `Event` object just like any other action handler.

#### Acceptance Criteria

1. WHEN `eventType === "init"`, THE `AlwatrActionDirective` SHALL create a `CustomEvent('init', {bubbles: false, cancelable: false})` and dispatch it on `element_` via `element_.dispatchEvent()`.
2. WHEN `eventType === "init"`, THE `AlwatrActionDirective` SHALL call `dispatch_(syntheticEvent)` with that synthetic event immediately inside `init_()`, without registering any persistent DOM listener.
3. WHEN `eventType === "init"`, THE `AlwatrActionDirective` SHALL call `destroy()` immediately after dispatching.
4. THE synthetic `CustomEvent` for `init` SHALL have `event.target === element_` and `event.type === "init"`, so that `alwatrOn` handlers receive a valid, non-null `Event` object.

---

### Requirement 4: Action Payload Resolution

**User Story:** As a developer, I want to pass static or dynamic payload values through the HTML attribute, so that handlers receive the context they need without additional JavaScript.

#### Acceptance Criteria

1. WHEN `rawPayload` is absent (no `:` segment in `attributeValue`), THE `AlwatrActionDirective` SHALL set `actionPayload` to `""` (empty string).
2. WHEN `rawPayload` is the literal string `"$value"` and `element_` has a `.value` property, THE `AlwatrActionDirective` SHALL set `actionPayload` to `(element_ as HTMLInputElement).value` at the time `dispatch_()` is called.
3. WHEN `rawPayload` is the literal string `"$value"` and `element_` does not have a `.value` property, THE `AlwatrActionDirective` SHALL set `actionPayload` to `""` (empty string).
4. WHEN `rawPayload` is any string other than `"$value"`, THE `AlwatrActionDirective` SHALL set `actionPayload` to that literal string unchanged.

---

### Requirement 5: Signal Dispatch

**User Story:** As a developer, I want DOM events to be translated into typed application signals, so that signal subscribers are decoupled from the DOM.

#### Acceptance Criteria

1. WHEN `dispatch_(event)` is called, THE `AlwatrActionDirective` SHALL call `event.preventDefault()` before dispatching the signal.
2. WHEN `dispatch_(event)` is called, THE `AlwatrActionDirective` SHALL call `eventSignal_.dispatch({ actionId, actionPayload, event })` exactly once — `event` is always a valid `Event` instance.
3. THE `AlwatrActionDirective` SHALL set `actionId` in the dispatched payload to the value of `match[2]` from the parsed `syntaxRegex` match.

---

### Requirement 6: `alwatrOn` Subscription Helper

**User Story:** As a developer, I want a simple function to subscribe to specific actions by ID, so that I can react to application actions without coupling to the signal internals.

#### Acceptance Criteria

1. WHEN `alwatrOn(actionId, handler)` is called, THE `alwatrOn` function SHALL subscribe to `eventSignal_` and invoke `handler(payload.actionPayload, payload.event)` only when `payload.actionId === actionId`. The `event` argument is always a valid `Event` — never `undefined`.
2. WHEN `alwatrOn(actionId, handler)` is called, THE `alwatrOn` function SHALL return a `SubscribeResult` object containing an `unsubscribe()` method.
3. WHEN `eventSignal_` dispatches a payload where `payload.actionId !== actionId`, THE `alwatrOn` function SHALL NOT invoke `handler`.
4. WHEN `result.unsubscribe()` is called, THE `alwatrOn` subscription SHALL stop invoking `handler` for all subsequent dispatches.
5. WHEN `result.unsubscribe()` is called more than once, THE `alwatrOn` subscription SHALL not throw an error.

---

### Requirement 7: Module Structure and Package Conventions

**User Story:** As a maintainer, I want the package to follow the monorepo conventions, so that it integrates seamlessly with the build system and other packages.

#### Acceptance Criteria

1. THE `@alwatr/on` package SHALL be published as an ESM module with `"type": "module"` in `package.json`.
2. THE `@alwatr/on` package SHALL use `"@alwatr/directive"` and `"@alwatr/signal"` as dependencies declared with `"workspace:*"` version specifiers.
3. THE `@alwatr/on` package SHALL expose a single public entry point at `src/main.ts` that re-exports all public symbols.
4. THE `eventSignal_` instance SHALL be module-level (singleton per module load), shared by all `AlwatrActionDirective` instances and all `alwatrOn` subscriptions within the same module.
5. THE `@alwatr/on` package SHALL follow the same `package.json`, `tsconfig.json`, and build script conventions as other packages in `pkg/nanolib/`.
