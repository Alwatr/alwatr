# @alwatr/action

**Declarative DOM action-dispatch — the Action layer for Unidirectional Data Flow.**

`@alwatr/action` bridges HTML `on-<eventType>` attributes to typed signal handlers using **global event delegation**. One listener on `document.body` covers every element on the page — including elements added dynamically after bootstrap — with O(1) initialization cost regardless of how many elements exist.

---

## Why `@alwatr/action`?

| Approach                               | Problem                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| Inline `addEventListener` everywhere   | O(N) boot cost, scattered, breaks on dynamic content     |
| Framework event bindings (React, Vue…) | Requires full framework buy-in                           |
| Custom events + `dispatchEvent`        | Verbose, no typed payload, no central subscription point |
| **`@alwatr/action`**                   | ✅ O(1) boot, declarative, typed, zero-coupling          |

---

## How It Works

### Action Bus

The action bus is powered by a [`ChannelSignal`](../signal/README.md) from `@alwatr/signal`. Dispatching action `'A'` performs a single `Map.get('A')` lookup and invokes only the handlers registered for that specific action — **O(1) per dispatch**, regardless of how many other actions are subscribed.

Every message on the bus is a full **`Action<K>`** object (Alwatr Flux Standard Action — AFSA) rather than a bare payload. This means every handler receives `type`, `payload`, `context`, and `meta` in one unified structure.

### Global Event Delegation

A single capture-phase listener on `document.body` handles all `on-<eventType>` elements. When an event fires, the handler walks up from `event.target` using `closest('[on-click]')` (or the matching attribute), resolves the nearest `[action-context]` ancestor, parses the attribute value, runs modifiers, resolves the payload, and dispatches the full `Action` object.

```
User clicks a button
        │
        ▼
document.body capture listener  (1 listener per event type)
        │
        └─ closest('[on-click]') → finds element
           closest('[action-context]') → resolves context (e.g. 'product-list')
           parse attribute → 'ui_add_to_cart:42'
           run modifiers   → none
           resolve payload → '42'
           internalChannel_.dispatch('ui_add_to_cart', {
             type: 'ui_add_to_cart',
             payload: '42',
             context: 'product-list',
           })
                │
                └─ Map.get('ui_add_to_cart') → O(1) → invoke only matching handlers
```

### Complexity

| Metric          | Per-element listeners | Global delegation    |
| --------------- | --------------------- | -------------------- |
| Boot time       | O(N elements)         | **O(1)**             |
| Memory          | O(N listeners)        | **O(1)**             |
| Dynamic content | Requires re-bootstrap | **Works out-of-box** |
| `once` modifier | Native option         | Remove attribute     |

### `once` modifier

In delegation mode, `once` is implemented by removing the `on-<eventType>` attribute from the element after the first fire. This is simpler than a `WeakSet` cache and naturally handles element reuse — if the element is re-rendered with the attribute, it fires again.

---

## Installation

```bash
bun add @alwatr/action
# or
npm i @alwatr/action
```

---

## Quick Start

### 1. Register your action types

Extend `ActionRecord` via declaration merging. This gives you full type safety and IDE autocomplete — passing an undeclared action name is a **compile error**.

```ts
// src/action-record.ts
declare module '@alwatr/action' {
  interface ActionRecord {
    // UI-originated actions (dispatched from HTML on-<event> attributes) — must start with 'ui_'
    ui_open_drawer: string;
    ui_search_query: string;
    ui_add_to_cart: {productId: number; qty: number};
    ui_logout: void;

    // Code-originated actions (dispatched programmatically from services/controllers)
    upload_complete: string;
    auth_expired: void;
  }
}
```

### 2. Bootstrap delegation

```ts
import {setupActionDelegation, onAction} from '@alwatr/action';
import './action-record.js'; // ensure the declaration is loaded

setupActionDelegation();

// The handler receives the full Action<K> object — payload, context, and meta in one place.
onAction('ui_open_drawer', (action) => openDrawer(action.payload)); // action.payload: string
onAction('ui_add_to_cart', (action) => {
  cartService.add(action.payload.productId, action.payload.qty); // fully typed
  console.log(action.context); // e.g. 'product-list' — from nearest [action-context] ancestor
});
```

### 3. Add attributes to HTML

```html
<!-- Dispatches 'ui_close_drawer' on click — no payload -->
<button on-click="ui_close_drawer">Close</button>

<!-- Dispatches 'ui_open_drawer' with payload 'main' on click -->
<button on-click="ui_open_drawer:main">Open Drawer</button>

<!-- Dispatches 'ui_search_query' with the input's live value -->
<input
  type="search"
  on-input="ui_search_query:$value"
  placeholder="Search…"
/>

<!-- Prevents default, validates, then dispatches all field values -->
<form
  on-submit="ui_submit_form:$formdata; prevent,validate"
  novalidate
>
  <input
    name="username"
    required
  />
  <button type="submit">Save</button>
</form>

<!-- Fires only once — attribute is removed after first click -->
<button on-click="ui_welcome_dismissed; once">Got it</button>
```

### 4. Context scoping with `action-context`

Wrap a group of elements in an `[action-context]` container to scope their actions. The delegation handler automatically resolves the nearest ancestor and attaches its value to `action.context`. This lets the same action type serve multiple independent UI regions without creating separate action names.

```html
<!-- Two sliders on the same page, both dispatching 'ui_slider_change' -->
<section action-context="volume">
  <input
    type="range"
    on-input="ui_slider_change:$value"
  />
</section>

<section action-context="brightness">
  <input
    type="range"
    on-input="ui_slider_change:$value"
  />
</section>
```

```ts
onAction('ui_slider_change', (action) => {
  if (action.context === 'volume') audioService.setVolume(Number(action.payload));
  if (action.context === 'brightness') displayService.setBrightness(Number(action.payload));
});
```

Context is `undefined` when no `[action-context]` ancestor exists — programmatic dispatches also have no context by default.

### 5. Programmatic dispatch

Use `dispatchAction` for code-originated actions (after async operations, from services, etc.).
These actions should **not** use the `ui_` prefix — that prefix is reserved for DOM-originated actions.

```ts
import {dispatchAction} from '@alwatr/action';

// Code-originated actions — no 'ui_' prefix
await uploadFile(file);
dispatchAction({type: 'upload_complete', payload: fileId});

dispatchAction({type: 'navigate', payload: '/dashboard'});

// With explicit context and meta
dispatchAction({
  type: 'slider_change',
  payload: 75,
  context: 'volume',
  meta: {source: 'keyboard'},
});
```

---

## Attribute Syntax

```
on-<eventType>="actionId[:payload][; modifier1,modifier2,…]"
```

| Segment       | Description                                                 | Example                             |
| ------------- | ----------------------------------------------------------- | ----------------------------------- |
| `eventType`   | Any standard DOM event name — encoded in the attribute name | `on-click`, `on-submit`             |
| `actionId`    | Identifier your handler subscribes to                       | `ui_open_drawer`, `ui_search_query` |
| `:payload`    | Optional literal string, or a `$`-prefixed resolver token   | `:main`, `:$value`                  |
| `; modifiers` | Optional comma-separated modifier list after a semicolon    | `; prevent,validate`                |

### Built-in modifiers

| Modifier   | Behavior                                                                              |
| ---------- | ------------------------------------------------------------------------------------- |
| `prevent`  | Calls `event.preventDefault()`                                                        |
| `once`     | Removes the `on-<eventType>` attribute after first fire — action dispatches only once |
| `validate` | Cancels dispatch if the nearest `<form>` fails `checkValidity()`                      |

### Built-in payload resolvers

| Token        | Resolves to                                                    |
| ------------ | -------------------------------------------------------------- |
| `:$value`    | `element.value` (for `<input>`, `<select>`, `<textarea>`)      |
| `:$formdata` | `Object.fromEntries(new FormData(form))` from nearest `<form>` |
| `:$checked`  | `(element as HTMLInputElement).checked` for checkboxes/radios  |

---

## The Action Object (AFSA)

Every action flowing through the bus — whether triggered from HTML attributes or dispatched programmatically — is a single **`Action<K>`** object:

```ts
interface Action<K extends keyof ActionRecord> {
  /** Action identifier — must be a key of ActionRecord. */
  type: K;

  /**
   * DOM context from the nearest [action-context] ancestor.
   * undefined for programmatic dispatches or when no ancestor exists.
   */
  context?: string;

  /** Business payload — type is inferred from ActionRecord[K]. */
  payload: ActionRecord[K];

  /**
   * Open-ended metadata bag for cross-cutting concerns.
   * Modifiers may write to this before the action reaches subscribers.
   */
  meta?: Record<string, unknown>;
}
```

Modifiers in the delegation pipeline receive the mutable `action` object and can enrich `meta` before the action reaches subscribers:

```ts
import {registerModifier} from '@alwatr/action';

// A modifier that stamps a trace ID into meta
registerModifier('trace', (_event, _element, action) => {
  action.meta ??= {};
  action.meta['traceId'] = crypto.randomUUID();
  return true;
});
```

```html
<button on-click="ui_submit_order:42; trace">Place Order</button>
```

```ts
onAction('ui_submit_order', (action) => {
  console.log(action.meta?.['traceId']); // e.g. 'a1b2-c3d4-…'
});
```

---

## API Reference

### `Action<K>` (interface)

The Alwatr Flux Standard Action object. Every dispatch and every handler callback uses this structure.

```ts
import type {Action} from '@alwatr/action';

// Reading fields in a handler
onAction('ui_add_to_cart', (action: Action<'ui_add_to_cart'>) => {
  console.log(action.type); // 'ui_add_to_cart'
  console.log(action.payload); // {productId: number; qty: number}
  console.log(action.context); // string | undefined
  console.log(action.meta); // Record<string, unknown> | undefined
});
```

---

### `ActionRecord` (interface)

The global action type registry. Extend via declaration merging to register typed actions.

```ts
declare module '@alwatr/action' {
  interface ActionRecord {
    ui_open_drawer: string;
    ui_logout: void;
  }
}
```

---

### `setupActionDelegation(eventTypes?)`

Registers global event delegation on `document.body`. Call once at bootstrap. Idempotent.

```ts
function setupActionDelegation(eventTypes?: readonly string[]): void;
```

Defaults to `DEFAULT_DELEGATED_EVENTS`: `['click', 'submit', 'input', 'change']`.

```ts
import {setupActionDelegation, DEFAULT_DELEGATED_EVENTS} from '@alwatr/action';

setupActionDelegation([...DEFAULT_DELEGATED_EVENTS, 'keydown']);
```

---

### `teardownActionDelegation()`

Removes all delegation listeners and clears the descriptor cache. Useful in tests or micro-frontend teardown.

```ts
function teardownActionDelegation(): void;
```

---

### `onAction(type, handler)`

Subscribes to a single named action or an array of actions. O(1) routing via `ChannelSignal`. The handler receives the full `Action<K>` object.

```ts
function onAction<K extends keyof ActionRecord>(
  type: K | K[],
  handler: (action: Action<K>) => Awaitable<void>,
): SubscribeResult;
```

```ts
// Subscribe to a single action
const sub = onAction('ui_open_drawer', (action) => {
  openDrawer(action.payload); // payload: string
  console.log(action.context); // e.g. 'sidebar' or undefined
});

// Subscribe to multiple actions with a single handler
const multiSub = onAction(['ui_increment', 'ui_decrement'], (action) => {
  console.log('Action triggered:', action.type);
});

sub.unsubscribe(); // prevent memory leaks
multiSub.unsubscribe();
```

---

### `dispatchAction(action)`

Dispatches a named action. Payload type is enforced by `ActionRecord`.

```ts
function dispatchAction<K extends keyof ActionRecord>(action: Action<K>): void;
```

```ts
// With payload (code-originated — no 'ui_' prefix)
dispatchAction({type: 'navigate', payload: 'settings'});

// Void payload
dispatchAction({type: 'auth_expired', payload: undefined});

// With context and meta
dispatchAction({
  type: 'navigate',
  payload: 'settings',
  context: 'header',
  meta: {triggeredBy: 'keyboard'},
});
```

---

### `registerModifier(name, handler)`

Registers a custom modifier. Return `false` to cancel the dispatch.

Handler signature: `(event: Event, element: HTMLElement, action: Action) => boolean`

The handler receives the mutable `action` object and may write to `action.meta`.

```ts
import {registerModifier} from '@alwatr/action';

registerModifier('not_disabled', (_event, element) => {
  return !(element as HTMLButtonElement).disabled;
});

// A modifier that enriches meta before dispatch
registerModifier('timestamp', (_event, _element, action) => {
  action.meta ??= {};
  action.meta['ts'] = Date.now();
  return true;
});
```

```html
<button
  on-click="ui_select_item:$data_id; not_disabled,timestamp"
  data-id="42"
>
  Select
</button>
```

---

### `registerPayloadResolver(name, resolver)`

Registers a custom payload resolver.

Handler signature: `(event: Event, element: HTMLElement) => unknown`

```ts
import {registerPayloadResolver} from '@alwatr/action';

registerPayloadResolver('$data_id', (_event, element) => {
  return (element as HTMLElement).dataset.id ?? null;
});
```

```html
<input
  type="checkbox"
  on-change="ui_toggle_feature:$checked"
/>
<li
  on-click="ui_select_item:$data_id"
  data-id="42"
>
  Item
</li>
```

---

## Unidirectional Data Flow

```
┌────────────────────────────────────────────────────────────┐
│                           UI Layer                         │
│  <section action-context="cart">                           │
│    <button on-click="ui_add_to_cart:42">Add</button>       │
│  </section>                                                │
└─────────────────────────┬──────────────────────────────────┘
                          │ DOM event bubbles to body
                          ▼
┌────────────────────────────────────────────────────────────┐
│                 Action Layer (@alwatr/action)              │
│  document.body capture listener (1 per event type)         │
│  → closest('[on-click]') → parse attribute                 │
│  → closest('[action-context]') → context = 'cart'          │
│  → run modifiers (may enrich action.meta)                  │
│  → resolve payload → '42'                                  │
│  → dispatch Action {type, payload, context, meta}  [O(1)]  │
└─────────────────────────┬──────────────────────────────────┘
                          │ O(1) routing via ChannelSignal
                          ▼
┌────────────────────────────────────────────────────────────┐
│                     Business Logic Layer                   │
│  onAction('ui_add_to_cart', (action) => {                  │
│    cartService.add(action.payload);                        │
│    // action.context === 'cart'                            │
│  })                                                        │
└─────────────────────────┬──────────────────────────────────┘
                          │ state update
                          ▼
┌────────────────────────────────────────────────────────────┐
│                   State Layer (@alwatr/signal)             │
│  cartSignal.set(newCartState)                              │
└─────────────────────────┬──────────────────────────────────┘
                          │ state flows down to UI
                          ▼
                     UI re-renders
```

---

## Page Identity

For page-ready signals in SSG/SSR apps (reading `page-id` attribute and notifying
page-specific handlers), use [`@alwatr/page-ready`](../page-ready/README.md) instead.
It is intentionally separate from the action bus — page identity is a routing/lifecycle
concern, not a user-interaction action.

---

## Migration from Previous Versions

### `dispatchAction` API changed

`dispatchAction` now takes a single `Action` object instead of two positional arguments.

**Before:**

```ts
dispatchAction('ui_open_drawer', 'settings');
dispatchAction('auth_expired');
```

**After:**

```ts
dispatchAction({type: 'ui_open_drawer', payload: 'settings'});
dispatchAction({type: 'auth_expired', payload: undefined});
```

### `onAction` handler signature changed

Handlers now receive the full `Action<K>` object instead of just the payload.

**Before:**

```ts
onAction('ui_add_to_cart', (item) => {
  cartService.add(item.productId, item.qty);
});
```

**After:**

```ts
onAction('ui_add_to_cart', (action) => {
  cartService.add(action.payload.productId, action.payload.qty);
  // action.context is now also available
});
```

### `registerModifier` handler signature changed

Modifier handlers now receive a third `action` argument for `meta` enrichment.

**Before:**

```ts
registerModifier('not_disabled', (_event, element) => {
  return !(element as HTMLButtonElement).disabled;
});
```

**After (backward-compatible — third arg is optional to use):**

```ts
registerModifier('not_disabled', (_event, element, _action) => {
  return !(element as HTMLButtonElement).disabled;
});
```

### Attribute syntax changed

The event type is now encoded in the **attribute name** instead of the value, and modifiers are listed after a semicolon instead of dot-chained before the arrow.

**Before:**

```html
<button on-action="click->ui_open_drawer:main">Open</button>
<form
  on-action="submit.prevent.validate->ui_submit_form:$formdata"
  novalidate
>
  …
</form>
<button on-action="click.once->ui_welcome_dismissed">Got it</button>
```

**After:**

```html
<button on-click="ui_open_drawer:main">Open</button>
<form
  on-submit="ui_submit_form:$formdata; prevent,validate"
  novalidate
>
  …
</form>
<button on-click="ui_welcome_dismissed; once">Got it</button>
```

### `page-ready` moved to `@alwatr/page-ready`

`dispatchPageId` / `onPageReady` are no longer part of this package.

---

## 🌊 Part of Alwatr Flux

`@alwatr/action` is the **Action Layer** of the [Alwatr Flux](https://github.com/Alwatr/alwatr/tree/next/pkg/flux) architecture — a complete Unidirectional Data Flow system for building scalable Progressive Web Applications.

```
View (HTML on-<event> attributes + action-context)
  ↓
Action Layer (@alwatr/action) — global delegation, O(1) routing, AFSA objects
  ↓
Controller (business logic via onAction — receives full Action object)
  ↓
State Layer (@alwatr/signal) — fine-grained reactivity
  ↓
View (re-render only affected nodes)
```

`@alwatr/action` is the bridge between the **View** and **Controller** layers. It captures user intent from HTML attributes and routes it to the right handler — without any coupling between the UI and business logic.

**The full Flux bundle** (`@alwatr/flux`) includes actions, signals, directives, page-ready, and storage — everything you need to build a complete reactive application from a single import.

```typescript
// Use @alwatr/flux for the complete architecture
import {setupActionDelegation, onAction, createStateSignal} from '@alwatr/flux';

// Or use @alwatr/action standalone for just the action bus
import {setupActionDelegation, onAction, dispatchAction} from '@alwatr/action';
```

→ [View the complete Flux documentation](https://github.com/Alwatr/alwatr/tree/next/pkg/flux)

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
