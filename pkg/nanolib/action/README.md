# @alwatr/action

**Declarative DOM action-dispatch — the Action layer for Unidirectional Data Flow.**

`@alwatr/action` bridges HTML `on-action` attributes to typed signal handlers using **global event delegation**. One listener on `document.body` covers every element on the page — including elements added dynamically after bootstrap — with O(1) initialization cost regardless of how many elements exist.

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

### Global Event Delegation

Instead of attaching one listener per element, a single capture-phase listener is registered on `document.body` for each event type. When an event fires anywhere on the page, the handler walks up from `event.target` using `closest('[on-action]')` to find the nearest element with an `on-action` attribute, parses the attribute, runs modifiers, resolves the payload, and calls `dispatchAction`.

```
User clicks a button
        │
        ▼
document.body capture listener (1 listener total)
        │
        └─ closest('[on-action]') → finds element
           parse attribute → 'click->add-to-cart:42'
           run modifiers   → none
           resolve payload → '42'
           dispatchAction('add-to-cart', '42')
                │
                ▼
          ChannelSignal.dispatch('add-to-cart', '42')  [O(1)]
                │
                └─ Map.get('add-to-cart') → invoke only matching handlers
```

### Complexity

| Metric          | Per-element listeners | Global delegation    |
| --------------- | --------------------- | -------------------- |
| Boot time       | O(N elements)         | **O(1)**             |
| Memory          | O(N listeners)        | **O(1)**             |
| Dynamic content | Requires re-bootstrap | **Works out-of-box** |

### Action Bus

The action bus is powered by a [`ChannelSignal`](../signal/README.md) from `@alwatr/signal`. Dispatching action `'A'` performs a single `Map.get('A')` lookup and invokes only the handlers registered for that specific action — **O(1) per dispatch**, regardless of how many other actions are subscribed.

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

Create a declaration file in your package to extend `ActionRecord`. This gives you full type safety and IDE autocomplete across the entire app:

```ts
// src/action-record.ts
declare module '@alwatr/action' {
  interface ActionRecord {
    'open-drawer': string;
    'search-query': string;
    'add-to-cart': {productId: number; qty: number};
    'logout': void;
  }
}
```

Passing an action name not declared in `ActionRecord` is a **compile error** — there is no string fallback.

### 2. Bootstrap delegation

```ts
import {setupActionDelegation, onAction} from '@alwatr/action';
import './action-record.js'; // ensure the declaration is loaded

// One call — the entire page is covered, including future dynamic content.
setupActionDelegation();

// Payload types are inferred automatically from ActionRecord — no generics needed.
onAction('open-drawer', (panel) => openDrawer(panel)); // panel: string
onAction('search-query', (query) => performSearch(query)); // query: string
onAction('add-to-cart', (item) => {
  cartService.add(item.productId, item.qty); // fully typed, no `!`
});
```

### 3. Add attributes to HTML

```html
<!-- Dispatches 'open-drawer' with payload 'main' on click -->
<button on-action="click->open-drawer:main">Open Drawer</button>

<!-- Dispatches 'search-query' with the input's live value -->
<input
  type="search"
  on-action="input->search-query:$value"
  placeholder="Search…"
/>

<!-- Prevents default, validates, then dispatches all field values -->
<form
  on-action="submit.prevent.validate->submit-form:$formdata"
  novalidate
>
  <input
    name="username"
    required
  />
  <button type="submit">Save</button>
</form>
```

### 3. Programmatic dispatch

```ts
import {dispatchAction} from '@alwatr/action';

// Trigger actions from code — after async ops, from service layers, etc.
await uploadFile(file);
dispatchAction('upload-complete', fileId);

dispatchAction('navigate', '/dashboard');
dispatchAction<{code: number}>('show-error', {code: 404});
```

---

## Attribute Syntax

```
on-action="eventType[.modifier…]->actionId[:payload]"
```

| Segment     | Description                                               | Example                       |
| ----------- | --------------------------------------------------------- | ----------------------------- |
| `eventType` | Any standard DOM event name                               | `click`, `input`, `submit`    |
| `modifier`  | Optional dot-chained tokens processed before dispatch     | `.prevent`, `.validate`       |
| `actionId`  | Identifier your handler subscribes to                     | `open-drawer`, `search-query` |
| `:payload`  | Optional literal string, or a `$`-prefixed resolver token | `:main`, `:$value`            |

### Built-in modifiers

| Modifier    | Behavior                                                             |
| ----------- | -------------------------------------------------------------------- |
| `.prevent`  | Calls `event.preventDefault()`                                       |
| `.stop`     | Calls `event.stopPropagation()`                                      |
| `.once`     | Dispatches the action only once per element (emulated via `WeakSet`) |
| `.validate` | Cancels dispatch if the nearest `<form>` fails `checkValidity()`     |

> **Note:** `.passive` is not supported in delegation mode because all delegated
> listeners must be non-passive to allow `.prevent` to work.

### Built-in payload resolvers

| Token        | Resolves to                                                    |
| ------------ | -------------------------------------------------------------- |
| `:$value`    | `element.value` (for `<input>`, `<select>`, `<textarea>`)      |
| `:$formdata` | `Object.fromEntries(new FormData(form))` from nearest `<form>` |

---

## API Reference

### `ActionRecord` (interface)

The global action type registry. Extend it via declaration merging to register your application's actions and unlock full type safety in `onAction` and `dispatchAction`.

```ts
// src/action-record.ts
declare module '@alwatr/action' {
  interface ActionRecord {
    'open-drawer': string;
    'add-to-cart': {productId: number; qty: number};
    'logout': void;
  }
}
```

Once declared:

- `onAction('open-drawer', (panel) => …)` — `panel` is inferred as `string`
- `dispatchAction('add-to-cart', {productId: 42, qty: 1})` — payload type enforced
- `dispatchAction('unknown-action', …)` — **compile error**

---

### `setupActionDelegation(eventTypes?)`

Registers global event delegation on `document.body`. Call once at bootstrap.
Subsequent calls with the same event types are no-ops (idempotent).

```ts
function setupActionDelegation(eventTypes?: readonly string[]): void;
```

Defaults to `DEFAULT_DELEGATED_EVENTS`: `['click', 'submit', 'input', 'change']`.

```ts
import {setupActionDelegation, DEFAULT_DELEGATED_EVENTS} from '@alwatr/action';

// Default events
setupActionDelegation();

// Add extra event types
setupActionDelegation([...DEFAULT_DELEGATED_EVENTS, 'keydown', 'pointerup']);
```

---

### `teardownActionDelegation()`

Removes all delegation listeners. Useful in tests or micro-frontend teardown.

```ts
function teardownActionDelegation(): void;
```

---

### `onAction(actionId, handler)`

Subscribes to a named action. Uses `ChannelSignal.on()` for O(1) routing.

```ts
function onAction<T = string>(actionId: string, handler: (payload?: T) => void): SubscribeResult;
```

```ts
const sub = onAction('open-drawer', (panel) => openDrawer(panel));

// Unsubscribe when no longer needed (prevents memory leaks)
sub.unsubscribe();
```

---

### `dispatchAction(actionId, payload?)`

Dispatches a named action to all matching `onAction` subscribers.

```ts
function dispatchAction<T = string>(actionId: string, actionPayload?: T): void;
```

---

### `dispatchPageId(element?)`

Reads the `page-id` attribute from `element` (defaults to `document.body`) and
dispatches a `'page-ready'` action with the page identifier as payload.

```ts
function dispatchPageId(element?: HTMLElement): void;
```

```html
<body page-id="home">
  …
</body>
```

```ts
import {dispatchPageId, onAction} from '@alwatr/action';

dispatchPageId(); // → dispatchAction('page-ready', 'home')

onAction('page-ready', (pageId) => {
  console.log('navigated to:', pageId); // 'home'
});
```

---

### `registerModifier(name, handler)`

Registers a custom modifier. Return `false` to cancel the dispatch.
Works with both delegation and programmatic dispatch.

```ts
import {registerModifier} from '@alwatr/action';

registerModifier('confirm', function () {
  return window.confirm('Are you sure?');
});
```

```html
<button on-action="click.confirm->delete-item:42">Delete</button>
```

The handler receives an `ActionContext` as `this`:

```ts
interface ActionContext {
  readonly element: HTMLElement; // the element with the on-action attribute
}
```

---

### `registerPayloadResolver(name, resolver)`

Registers a custom payload resolver. The return value becomes the action payload.
Works with both delegation and programmatic dispatch.

```ts
import {registerPayloadResolver} from '@alwatr/action';

registerPayloadResolver('$checked', function () {
  return (this.element as HTMLInputElement).checked;
});
```

```html
<input
  type="checkbox"
  on-action="change->toggle-feature:$checked"
/>
```

---

## Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                        UI Layer                         │
│  <button on-action="click->add-to-cart:42">Add</button> │
└────────────────────────┬────────────────────────────────┘
                         │ DOM event bubbles to body
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Action Layer (@alwatr/action)               │
│  document.body capture listener (1 listener total)      │
│  → closest('[on-action]') → parse → run modifiers       │
│  → dispatchAction('add-to-cart', '42')          [O(1)] │
└────────────────────────┬────────────────────────────────┘
                         │ action signal (O(1) routing)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Business Logic Layer                  │
│  onAction('add-to-cart', (id) => cartService.add(id))   │
└────────────────────────┬────────────────────────────────┘
                         │ state update
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    State Layer (@alwatr/signal)          │
│  cartSignal.set(newCartState)                           │
└────────────────────────┬────────────────────────────────┘
                         │ state flows down to UI
                         ▼
                      UI re-renders
```

---

## Migration from Previous Versions

### `registerActionDirective` / `registerPageIdDirective` removed

The directive-based approach has been replaced by global delegation.

**Before:**

```ts
import {registerActionDirective, registerPageIdDirective} from '@alwatr/action';
import {bootstrapDirectives} from '@alwatr/directive';

registerActionDirective();
registerPageIdDirective();
bootstrapDirectives();
```

**After:**

```ts
import {setupActionDelegation, dispatchPageId} from '@alwatr/action';

setupActionDelegation();
dispatchPageId();
```

### `ActionDirective` / `PageIdDirective` removed

These classes are no longer exported. Use `setupActionDelegation()` and
`dispatchPageId()` instead.

### `ModifierHandler` / `PayloadResolver` context changed

The `this` context in custom modifier and resolver functions changed from
`ActionDirective` to `ActionContext`:

**Before:**

```ts
registerModifier('not-disabled', function () {
  return !(this.element_ as HTMLButtonElement).disabled; // this.element_
});
```

**After:**

```ts
registerModifier('not-disabled', function () {
  return !(this.element as HTMLButtonElement).disabled; // this.element (no underscore)
});
```

### `ActionSignalPayload` removed

This type was an implementation detail of the old `EventSignal`-based bus and
is no longer needed. Use `onAction` and `dispatchAction` directly.

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
