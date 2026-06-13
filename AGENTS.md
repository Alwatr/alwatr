# AI Agent Instructions and Developer Guidelines

## ⚠️ 1. CRITICAL: Read Kiro Steering Documents First

This repository uses Kiro IDE Steering Documents located in the `.kiro/steering/` directory. These files contain the source of truth for our architecture, API usage, and coding standards.

**Your mandatory workflow:**

Before starting any task, read the steering documents in `.kiro/steering/`:

| File           | Read When                                         |
| -------------- | ------------------------------------------------- |
| `product.md`   | Always — product vision and constraints           |
| `tech.md`      | Always — tech stack, commands, build pipeline     |
| `structure.md` | Always — directory layout, naming, import rules   |
| `patterns.md`  | Always — code patterns, logger, signals, services |

## Canonical Code Reference

**Each package under `pkg/` follows the structure defined in `structure.md`.** When writing new TypeScript packages or functions, read and follow the structure of existing active packages under `pkg/nanolib/` (e.g., `pkg/nanolib/signal` or `pkg/nanolib/logger`) as canonical reference implementations — especially for directory layout, the `src/main.ts` public entry point, visibility suffixes, co-located `*.test.js` tests, and using `.js` extensions in imports.

## Primary Directives

### 1. Code Quality & Scalability

- Write clean, modular, and exceptionally performant TypeScript.
- Follow all patterns in `patterns.md` exactly — naming conventions, logger usage, directive structure, signal patterns.
- Anticipate cloud-native deployment environments. Code must be stateless where appropriate, optimized for high concurrency, and designed for minimal overhead.
- Avoid legacy patterns. When executing refactors, proactively upgrade legacy class structures and procedural logic to modern, idiomatic TypeScript.
- Ensure cross-platform compatibility (e.g., handle path resolutions and file system checks robustly across macOS, Linux, and Windows).

### 2. "Commenting for AI" & Developer Experience (DX)

- Leave clear, context-rich inline comments explaining the **intent**, **business logic**, and **why** a specific approach was chosen.
- Design these comments as navigational anchors. They must help future AI agents instantly grasp the context and architecture without needing to scan the entire monorepo or file history.
- Ensure all technical documentation, PR descriptions, and inline comments are well-structured, fluent, and easy for LLMs to parse.

### 3. Output & Formatting Rules

- **Language:** ALL generated code, documentation, inline comments, markdown files, and commit messages MUST be written in fluent, clear English.
- **Chat responses:** All explanations, summaries, and conversational replies to the developer MUST be written in **Persian (Farsi)**.
- **Tone:** Assume a high level of senior technical expertise. Provide direct solutions and architectural insights. Do not over-explain basic programming concepts.
- **Completeness:** Output fully functional code blocks. Avoid skipping critical logic with generic placeholders unless explicitly instructed to draft a high-level structure.

### 4. Design Principles

Apply these principles to every implementation decision — in TypeScript, Nunjucks templates, CSS, and architecture alike:

- **Unidirectional Data Flow:** داده‌ها فقط به سمت پایین (به سمت UI) سرازیر می‌شوند، و اکشن‌ها (درخواست‌های تغییر) فقط به سمت بالا (به سمت منطق) ارسال می‌شوند. Data flows down to UI; actions flow up to logic.
- **Open/Closed Principle:** Design components and services to be extended through composition (new directives, new signals, new modifiers) rather than modified. Existing, working code should rarely need to change to accommodate new features.
- **DRY (Don't Repeat Yourself):** Never duplicate logic or markup. Extract shared behavior into utilities, partials, base classes, or signals. If the same pattern appears twice, it belongs in a shared abstraction.
- **KISS (Keep It Simple, Stupid):** Prefer the simplest solution that correctly solves the problem. Avoid clever abstractions, over-engineering, or premature optimization. Simple code is easier to debug, review, and extend.
- **YAGNI (You Aren't Gonna Need It):** Only implement what is explicitly required right now. Do not add configuration options, extension points, or features "just in case." Remove speculative code.
- **Separation of Concerns:** Keep distinct responsibilities in distinct places — business logic in services, state in signals, presentation in templates/directives. Never mix these layers.
- **Single Responsibility Principle:** Each class, directive, service, template, or function should do exactly one thing. If a unit needs an "and" to describe what it does, split it.

---

## Alwatr Core Guidelines

### 1. Naming & Coding Conventions

- **Member Visibility Suffixes:**
  - `public`: No suffix (e.g., `value`, `addProduct()`).
  - `protected`: Suffix with a single underscore `_` (e.g., `init_()`, `logger_`).
  - `private`: Suffix with double underscores `__` (e.g., `cache__`, `flush__()`).
- **Class Suffixes:**
  - Directives must be suffixed with `Directive` (e.g., `TooltipDirective`).
  - Services must be suffixed with `Service` (e.g., `AuthService`).
  - Do not use vendor prefixes (like `Alwatr`) on class names.

### 2. Logger Patterns (`@alwatr/logger`)

- Always declare `protected readonly logger_ = createLogger('component-name')` in services and directives.
- Use log levels correctly:
  - DEV_MODE && this.logger_.logMethod?.('methodName') or DEV_MODE && this.logger_.logMethodArgs?.('methodName', {param}) on entry.
  - `DEV_MODE && this.logger_.incident?.('methodName', 'reason', {meta})` for expected/recoverable issues.
  - `DEV_MODE && this.logger_.accident?.('methodName', 'reason', {meta})` for unexpected, non-fatal errors (e.g., DOM element not found).
  - `this.logger_.error('methodName', 'reason', {meta})` for fatal, unrecoverable errors.

### 3. Null Safety & Guards

- **Never** use non-null assertions `!` without a preceding guard.
- Use optional chaining `?.` and nullish coalescing `??` for safer property access.
- Validate DOM element references in `init_()` before any usage, raising an `accident` log if they are missing.

### 4. Lazy Evaluation (`@alwatr/lazy`)

- Use `Lazy<T>` to defer expensive initialization until first access:

  ```ts
  const db = new Lazy(() => new DatabaseConnection());
  console.log(db.instance); // Initialized on demand
  ```

---

## Alwatr Flux Architectural Patterns

### 1. Unidirectional Data Flow (UDF)

Strictly adhere to the unidirectional data cycle: `View → Action → Controller → State → View`

- **Views** read state from signals and dispatch actions via `on-<eventType>` attributes.
- **Action Layer** captures events via body-level global delegation, builds the Action object, runs modifiers, and dispatches.
- **Controllers** listen to actions via `onAction()` to run business logic and modify state.
- **State Layer** holds the state using signals and notifies views on updates.

### 2. Signal Patterns (`@alwatr/signal` / `@alwatr/flux`)

Use reactive signals instead of full-page updates or heavy VDOM reconciliation:

- `StateSignal<T>`: Holds mutable state, notifying on changes.
- `EventSignal<T>`: Stateless event dispatching.
- `ComputedSignal<T>`: Derived state that auto-updates when dependencies change. Always call `.destroy()` when done.
- `EffectSignal`: Side-effects triggered by signals. Always call `.destroy()` when done.
- `PersistentStateSignal` / `SessionStateSignal`: Automatically sync state with `localStorage` or `sessionStorage` with built-in write debouncing and versioning.
- `ChannelSignal<TMap>`: Typed multi-message bus for distinct message types.

### 3. Global Event Delegation & Declarative Actions

- **Never** add direct event listeners on elements.
- Use declarative action attributes on DOM elements:

  ```html
  on-
  <eventType>="actionId[:payload][; modifier1,modifier2,...]"</eventType>
  ```

  Example: `<button on-click="ui_add_to_cart:42">Add</button>`

- **Scoping Context:** Use `action-context="contextName"` on ancestors to pass context to action handlers.
- **Payload Resolvers:** Use built-in resolvers: `:$value` (input value), `:$formdata` (nearest form data object), `:$checked` (checkbox state).
- **Modifiers:** Use modifiers like `prevent` (calls `preventDefault()`), `stop` (calls `stopPropagation()`), `validate` (validates nearest form), and `once` (dispatches once then removes attribute).

### 4. Directives (`@alwatr/directive`)

- Extend `Directive` or `LitDirective` (for reactive rendering). Register with `@directive('name')` or `lazyDirective`.
- Use modern TS `accessor` syntax with decorators: `@state()`, `@query`, `@attribute`, `@queryAll`.
- **Auto-Cleanup Helpers:** Use `this.on_('eventName', handler, selector?)` for event listeners and `this.subscribe_(signal, callback)` for signal subscriptions to auto-cleanup when destroyed. Use `addDestroyHook()` for manual teardown.
- **Lifecycle:** `init_()` (setup/DOM work), `lazyInit_()` (viewport entry), `onVisible_()`, `onHidden_()`.

### 5. SSR Hydration (`EmbeddedDataCollector`)

- Use `EmbeddedDataCollector` to collect, validate, and hydrate initial state from `<script type="application/json">` tags, preventing flash of empty content and saving extra API calls:

  ```ts
  const config = new EmbeddedDataCollector('app-config', isAppConfig).collect();
  ```

---

## Verification

After modifying TypeScript, always run:

```bash
# Run lint (tsc type check across all packages)
bun run lint

# Run all tests
bun run test
```
