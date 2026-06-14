---
inclusion: always
---

# Code Patterns & Conventions

This document captures the concrete patterns used throughout the codebase. Follow these exactly when writing new code.

## Design Principles

Apply these principles to every implementation decision — TypeScript, CSS, and architecture alike:

- **Unidirectional Data Flow (UDF):** Data flows down to UI; actions (change requests) flow up to logic. Never let UI components call business logic directly.
- **Open/Closed Principle:** Design components and services to be extended through composition (new directives, new signals, new modifiers) rather than modified. Existing, working code should rarely need to change to accommodate new features.
- **DRY (Don't Repeat Yourself):** Never duplicate logic or markup. Extract shared behavior into utilities, base classes, or signals. If the same pattern appears twice, it belongs in a shared abstraction.
- **KISS (Keep It Simple, Stupid):** Prefer the simplest solution that correctly solves the problem. Avoid clever abstractions, over-engineering, or premature optimization.
- **YAGNI (You Aren't Gonna Need It):** Only implement what is explicitly required right now. Do not add configuration options, extension points, or features "just in case."
- **Separation of Concerns:** Business logic in services, state in signals, presentation in directives/templates. Never mix these layers.
- **Single Responsibility Principle:** Each class, directive, service, or function should do exactly one thing. If a unit needs an "and" to describe what it does, split it.

---

## Naming Conventions

### Member Visibility via Underscore Suffix

| Visibility  | Suffix      | Example                           |
| ----------- | ----------- | --------------------------------- |
| `public`    | none        | `addProduct(id)`, `value`         |
| `protected` | single `_`  | `init_()`, `logger_`, `items_()`  |
| `private`   | double `__` | `open__`, `value__`, `toggle__()` |

This applies to methods, properties, accessors, and fields.

```ts
class MyService {
  protected readonly logger_ = createLogger('my-service'); // protected
  private cache__: Map<number, Item> = new Map();          // private

  getData(): Item[] { ... }           // public
  protected process_(): void { ... }  // protected
  private flush__(): void { ... }     // private
}
```

### Class Naming

- Directive classes: suffix with `Directive` — `ActionDirective`, `PageIdDirective`, `TooltipDirective`
- Service classes: suffix with `Service` — `CartService`, `AuthService`
- No vendor-prefix on class names (e.g. `ActionDirective`, not `AlwatrActionDirective`)

---

## Logger Patterns

### In Services (non-directive classes)

Always declare `protected readonly logger_` and use it in every method:

```ts
class ProductService {
  protected readonly logger_ = createLogger('product-service');

  getPrice(id: number): Price | null {
    this.logger_.logMethodArgs?.('getPrice', {id});
    // ...
  }
}
```

### Logger Method Selection

```ts
// Method entry (no args worth logging)
this.logger_.logMethod?.('methodName');

// Method entry with meaningful args
this.logger_.logMethodArgs?.('methodName', {productId, quantity});

// Expected edge case — recoverable, not a bug
this.logger_.incident?.('methodName', 'product_already_in_basket', {productId});

// Unexpected but non-fatal — something is wrong but app continues
this.logger_.accident('methodName', 'element_not_found', {selector});

// Fatal / build-time / truly unrecoverable
this.logger_.error('methodName', 'json_parse_failed', {error});
```

**Rule**: DOM element not found → `accident`. Item already exists → `incident`. Build failure → `error`.

---

## Null Safety Rules

1. **Never use `!` without a preceding guard**

   ```ts
   // ❌ Bad
   const url = item.product.content.media[0].content.url;

   // ✅ Good
   const url = item.product.content.media[0]?.content.url ?? '';
   ```

2. **Validate DOM elements in `init_()` before use**

   ```ts
   if (!this.someElement_) {
     this.logger_.accident('init_', 'element_not_found');
     this.destroy();
     return;
   }
   ```

---

## Lazy Evaluation Pattern (`@alwatr/lazy`)

Use `Lazy<T>` to defer expensive initialization until first access. The closure is released after evaluation for GC:

```ts
import {lazy} from '@alwatr/lazy';

// Factory function (preferred — better type inference)
const config = lazy(() => loadExpensiveConfig());
console.log(config.instance); // initialized on first access
console.log(config.isInitialized()); // true

// Class API
const db = new Lazy(() => new DatabaseConnection(connectionString));
if (!db.isInitialized()) {
  console.log('DB not yet connected — skipping teardown.');
}
```

---

## Signal Patterns (`@alwatr/signal`)

### Signal Types

| Signal                  | Purpose                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `StateSignal<T>`        | Holds a value, notifies on change. Subscribers get current value immediately.                              |
| `EventSignal<T>`        | Stateless event dispatch. Subscribers only get future emissions.                                           |
| `ComputedSignal<T>`     | Derived from other signals, auto-updates when dependencies change. **Always call `.destroy()` when done.** |
| `EffectSignal`          | Side-effect runner triggered by signal changes. **Always call `.destroy()` when done.**                    |
| `PersistentStateSignal` | `StateSignal` backed by `localStorage`. Built-in write debouncing and versioning.                          |
| `SessionStateSignal`    | `StateSignal` backed by `sessionStorage`. Built-in write debouncing and versioning.                        |
| `ChannelSignal<TMap>`   | Typed multi-message bus with O(1) per-name routing.                                                        |

### ChannelSignal Usage

`ChannelSignal` is ideal when a single signal carries multiple distinct message types:

```ts
interface AppMessages {
  'open-drawer': {panel: string};
  'close-drawer': void;
  'show-toast': {message: string; type: 'info' | 'error'};
}

const appChannel = new ChannelSignal<AppMessages>({name: 'app-channel'});

// Subscribe to a specific message — handler receives payload directly
appChannel.on('open-drawer', (payload) => {
  openDrawer(payload.panel);
});

// Dispatch a typed message
appChannel.dispatch('open-drawer', {panel: 'settings'});
appChannel.dispatch('close-drawer'); // no payload needed for void types

// Raw stream subscription (for logging/middleware)
appChannel.subscribe((msg) => console.log('[channel]', msg.name, msg.payload));
```

### Factory Functions

Prefer factory functions over `new` for simpler signal creation:

```ts
import {createState, createEvent, createComputed, createEffect} from '@alwatr/signal';

const count = createState({name: 'count', initialValue: 0});
const doubled = createComputed({name: 'doubled', source: count, compute: (v) => v * 2});
```

---

## Directive Patterns (`@alwatr/directive`)

### Creating a directive

Extend `Directive` (not `DirectiveBase` — that name no longer exists) and register with `@directive` or `lazyDirective`:

```ts
import {Directive, directive} from '@alwatr/directive';

// Eager registration (side effect at import time — use for always-needed directives)
@directive('show-tooltip')
export class TooltipDirective extends Directive {
  protected override init_(): void {
    this.element_.title = this.attributeValue;
  }
}
```

```ts
import {Directive, lazyDirective} from '@alwatr/directive';

// Lazy registration (tree-shakeable — use for opt-in directives)
export class TooltipDirective extends Directive {
  protected override init_(): void {
    this.element_.title = this.attributeValue;
  }
}
export const registerTooltipDirective = lazyDirective('show-tooltip', TooltipDirective);
```

### Directive lifecycle order

```
constructor → (macrotask) → init_() → lazyInit_()? → onVisible_()/onHidden_()?
```

- `init_()` — setup, event listeners, synchronous DOM work
- `lazyInit_()` — runs once on first viewport entry (lazy loading, data fetch)
- `onVisible_()` — runs every time element enters viewport (impression tracking)
- `onHidden_()` — runs every time element leaves viewport (pause, cancel)

### Cleanup

Always register cleanup via `addDestroyHook` — never rely on GC:

```ts
protected override init_(): void {
  const id = setInterval(() => this.tick_(), 1000);
  this.addDestroyHook(() => clearInterval(id));

  const sub = signal.subscribe(this.onSignal_.bind(this));
  this.addDestroyHook(() => sub.unsubscribe());
}
```

### Signal Subscriptions in Directives

Use the built-in `subscribe_()` helper for auto-cleanup signal subscriptions:

```ts
protected override init_(): void {
  // Automatically unsubscribes when directive is destroyed — no manual addDestroyHook needed
  this.subscribe_(cartSignal, (cart) => {
    this.count_ = cart.items.length;
  });
}
```

### LitDirective — Reactive Rendering with lit-html

Extend `LitDirective` instead of `Directive` when you need declarative template rendering:

```ts
import {directive, LitDirective, state} from '@alwatr/directive';
import {html} from 'lit-html';

@directive('like-button')
export class LikeButtonDirective extends LitDirective {
  @state()
  accessor liked_: string | null = null;

  protected override init_(): void {
    this.liked_ = 'false'; // first assignment triggers initial render
    this.on_('click', () => {
      this.liked_ = this.liked_ === 'true' ? 'false' : 'true';
    });
  }

  protected override render_() {
    return html`
      <button class=${this.liked_ === 'true' ? 'liked' : ''}>♥</button>
    `;
  }
}
```

### Update Cycle

```
state change (set @state accessor  OR  signal subscription callback)
  │
  └─ requestUpdate()          ← schedules one macrotask (batched)
       │
       ├─ update_()            ← calls render_() via lit-html render()
       └─ updated_()           ← post-render hook (focus, measure, etc.)
```

Multiple `requestUpdate()` calls within the same macrotask collapse into a single render.

### Utility Decorators

| Decorator    | Target     | Purpose                                                             |
| ------------ | ---------- | ------------------------------------------------------------------- |
| `@query`     | `accessor` | Cached `querySelector` on `this.element_`                           |
| `@queryAll`  | `accessor` | Cached `querySelectorAll` on `this.element_`                        |
| `@attribute` | `accessor` | Cached `getAttribute` on `this.element_`                            |
| `@state`     | `accessor` | Marks accessor as reactive — calls `requestUpdate()` on every `set` |

```ts
@directive('product-card')
class ProductCardDirective extends LitDirective {
  @query('.price')
  accessor priceEl!: HTMLElement | null;

  @attribute('product-id')
  accessor productId!: string | null;

  @state()
  accessor count_: number = 0;
}
```

### Event Listeners in Directives

Use `on_()` for auto-cleanup event listeners:

```ts
protected override init_(): void {
  // Listener on the directive's element (default)
  this.on_('click', (event) => {
    this.logger_.logMethodArgs?.('onClick', {target: event.target});
  });

  // Listener on a child element via CSS selector
  this.on_('input', (event) => {
    const value = (event.target as HTMLInputElement).value;
  }, '.search-input');
}
```

### IntersectionObserver Configuration

Override `intersectionOptions_` to customize viewport detection for `lazyInit_()`, `onVisible_()`, and `onHidden_()`:

```ts
@directive('lazy-image')
class LazyImageDirective extends Directive {
  protected override intersectionOptions_: IntersectionObserverInit = {
    rootMargin: '200px 0px', // pre-load 200px before viewport
  };

  protected override async lazyInit_(): Promise<void> {
    const img = this.element_.querySelector('img')!;
    img.src = img.dataset['src']!;
  }
}
```

### Bootstrapping Directives

```ts
import {bootstrapDirectives} from '@alwatr/directive';

// Initialize all registered directives on the page
document.addEventListener('DOMContentLoaded', () => bootstrapDirectives());

// Or initialize on a dynamically added subtree
bootstrapDirectives(newContentElement);
```

---

## Embedded Data Pattern (`@alwatr/embedded-data`)

For SSR-friendly state hydration from `<script type="application/json">` tags:

```html
<!-- Server renders initial state into a script tag -->
<script
  type="application/json"
  app-config
>
  {"theme": "dark", "locale": "fa"}
</script>
```

```ts
import {EmbeddedDataCollector} from '@alwatr/embedded-data';

// Simple usage
const collector = new EmbeddedDataCollector<{theme: string; locale: string}>('app-config');
const config = collector.collect(); // parsed JSON or null

// With type-guard validation
function isAppConfig(data: unknown): data is AppConfig {
  return typeof data === 'object' && data !== null && 'theme' in data;
}
const safeCollector = new EmbeddedDataCollector('app-config', isAppConfig);
const safeConfig = safeCollector.collect(); // guaranteed type or null
```

---

## Action Patterns (`@alwatr/action`)

> **Rule: Never add direct event listeners on DOM elements.** Always use declarative `on-<eventType>` attributes and the global delegation system.

`@alwatr/action` is the **Action layer** in Unidirectional Data Flow. DOM events flow upward as typed **Action objects** (AFSA — Alwatr Flux Standard Action); business logic subscribes and updates state via signals.

Uses **global event delegation**: one capture-phase listener on `document.body` per event type handles every `on-<eventType>` element — O(1) boot time, zero per-element overhead, automatic support for dynamic content.

### The AFSA Object

Every action is a single unified object — not a loose `(id, payload)` pair:

```ts
interface Action<K extends keyof ActionRecord> {
  type: K; // action identifier
  context?: string; // from nearest [action_context] ancestor
  payload: ActionRecord[K]; // typed business data
  meta?: Record<string, unknown>; // cross-cutting data (trace IDs, timestamps…)
}
```

### Unidirectional Data Flow

```
UI (HTML attributes + [action_context] scoping)
  │  <section action_context="product-list">
  │    <button on-click="ui_add_to_cart:42">Add</button>
  │  </section>
  ▼
Action Layer (@alwatr/action)
  │  body capture listener → parse → resolve context → build Action object
  │  → run modifiers (may enrich action.meta) → resolve payload
  │  → actionService.dispatch(action)
  ▼
Business Logic
  │  actionService.on('ui_add_to_cart', (action) => {
  │    cartService.add(action.payload);
  │    console.log(action.context); // 'product-list'
  │  })
  ▼
State Layer (@alwatr/signal)
  │  cartSignal.set(newState)
  ▼
UI (re-render)
```

### Bootstrap

```ts
import {actionService} from '@alwatr/action';
import {onPageReady, subscribePageReady, dispatchPageReady} from '@alwatr/page-ready';

// One call — covers the entire page including future dynamic content.
actionService.setupDelegation();

// Subscribe to a specific page before dispatching.
onPageReady('home', () => initHomePage());

// Or subscribe to ALL pages — handler receives the page ID.
subscribePageReady((pageId) => analytics.trackPageView(pageId));

// Read [page-id] attribute via querySelector and notify subscribers.
dispatchPageReady();
```

### Registering typed actions

Extend `ActionRecord` via declaration merging in each feature package:

```ts
// src/action-record.ts
declare module '@alwatr/action' {
  interface ActionRecord {
    // UI-originated actions (dispatched from HTML on-<event> attributes) — must start with 'ui_'
    ui_open_drawer: string;
    ui_add_to_cart: {productId: number; qty: number};
    ui_logout: void;

    // Code-originated actions (dispatched programmatically from services/controllers)
    upload_complete: string;
    auth_expired: void;
  }
}
```

Passing an undeclared action name to `actionService.on` or `actionService.dispatch` is a **compile error**.

### Subscribing to actions

The handler receives the full `Action<K>` object — `payload`, `context`, and `meta` in one place:

```ts
import {actionService} from '@alwatr/action';

actionService.on('ui_open_drawer', (action) => {
  drawerSignal.set({open: true, panel: action.payload});
});

actionService.on('ui_add_to_cart', (action) => {
  cartService.add(action.payload.productId, action.payload.qty);
  console.log('from context:', action.context); // e.g. 'product-list'
});

// Cleanup when component is destroyed
const sub = actionService.on('ui_logout', () => authService.logout());
sub.unsubscribe(); // call when no longer needed
```

### Dispatching actions from code

Code-originated actions should **not** use the `ui_` prefix — that prefix is reserved for DOM-originated actions.

```ts
import {actionService} from '@alwatr/action';

// After an async operation completes (code-originated — no 'ui_' prefix)
await uploadFile(file);
actionService.dispatch({type: 'upload_complete', payload: fileId});

// With context and meta
actionService.dispatch({
  type: 'navigate',
  payload: '/dashboard',
  context: 'sidebar',
  meta: {source: 'keyboard-shortcut'},
});

// Void payload
actionService.dispatch({type: 'auth_expired', payload: undefined});
```

### HTML attribute syntax

```
on-<eventType>="actionId[:payload][; modifier1,modifier2,…]"
```

```html
<!-- Literal payload -->
<button on-click="ui_open_drawer:settings">Settings</button>

<!-- Dynamic payload from input value -->
<input on-input="ui_search_query:$value" />

<!-- Form data payload with validation -->
<form
  on-submit="ui_submit_form:$formdata; prevent,validate"
  novalidate
>
  …
</form>

<!-- Context scoping — all actions inside carry context='product-list' -->
<section action_context="product-list">
  <button on-click="ui_add_to_cart:42">Add to Cart</button>
</section>
```

### Built-in modifiers

| Modifier   | Effect                                                                     |
| ---------- | -------------------------------------------------------------------------- |
| `prevent`  | `event.preventDefault()`                                                   |
| `stop`     | `event.stopPropagation()`                                                  |
| `once`     | Removes `on-<eventType>` attribute after first fire — dispatches only once |
| `validate` | Cancels dispatch if nearest `<form>` fails `checkValidity()`               |

### Built-in payload resolvers

| Token        | Resolves to                                                    |
| ------------ | -------------------------------------------------------------- |
| `:$value`    | `element.value` (for `<input>`, `<select>`, `<textarea>`)      |
| `:$formdata` | `Object.fromEntries(new FormData(form))` from nearest `<form>` |
| `:$checked`  | `element.checked` (for `<input type="checkbox/radio">`)        |

### Extending with custom modifiers and resolvers

Modifier handlers receive `(event, element, action)` — the third argument is the mutable `Action` object. Modifiers may write to `action.meta` to enrich the action before it reaches subscribers:

```ts
import {actionService} from '@alwatr/action';

// Guard modifier — cancel dispatch if element is disabled
actionService.registerModifier('not-disabled', (_event, element) => {
  return !(element as HTMLButtonElement).disabled;
});

// Enrichment modifier — stamp a trace ID into meta
actionService.registerModifier('trace', (_event, _element, action) => {
  action.meta ??= {};
  action.meta['traceId'] = crypto.randomUUID();
  return true;
});

// Custom payload resolver — read a data attribute
actionService.registerPayloadResolver('$data-id', (_event, element) => {
  return (element as HTMLElement).dataset.id ?? null;
});
```

```html
<button
  on-click="ui_select_item:$data-id; not-disabled,trace"
  data-id="42"
>
  Select
</button>
```
