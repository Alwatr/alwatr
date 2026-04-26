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

### Global Event Delegation

A single capture-phase listener on `document.body` handles all `on-<eventType>` elements. When an event fires, the handler walks up from `event.target` using `closest('[on-click]')` (or the matching attribute), parses the attribute value, runs modifiers, resolves the payload, and dispatches the action.

```
User clicks a button
        │
        ▼
document.body capture listener  (1 listener per event type)
        │
        └─ closest('[on-click]') → finds element
           parse attribute → 'add_to_cart:42'
           run modifiers   → none
           resolve payload → '42'
           internalChannel_.dispatch('add_to_cart', '42')
                │
                └─ Map.get('add_to_cart') → O(1) → invoke only matching handlers
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
    open_drawer: string;
    search_query: string;
    add_to_cart: {productId: number; qty: number};
    logout: void;
  }
}
```

### 2. Bootstrap delegation

```ts
import {setupActionDelegation, onAction} from '@alwatr/action';
import './action-record.js'; // ensure the declaration is loaded

setupActionDelegation();

// Payload types are inferred from ActionRecord — no generics needed.
onAction('open_drawer', (panel) => openDrawer(panel)); // panel: string
onAction('add_to_cart', (item) => {
  cartService.add(item.productId, item.qty); // fully typed
});
```

### 3. Add attributes to HTML

```html
<!-- Dispatches 'close_drawer' on click — no payload -->
<button on-click="close_drawer">Close</button>

<!-- Dispatches 'open_drawer' with payload 'main' on click -->
<button on-click="open_drawer:main">Open Drawer</button>

<!-- Dispatches 'search_query' with the input's live value -->
<input
  type="search"
  on-input="search_query:$value"
  placeholder="Search…"
/>

<!-- Prevents default, validates, then dispatches all field values -->
<form
  on-submit="submit_form:$formdata; prevent,validate"
  novalidate
>
  <input
    name="username"
    required
  />
  <button type="submit">Save</button>
</form>

<!-- Fires only once — attribute is removed after first click -->
<button on-click="welcome_dismissed; once">Got it</button>
```

### 4. Programmatic dispatch

```ts
import {dispatchAction} from '@alwatr/action';

await uploadFile(file);
dispatchAction('upload_complete', fileId);

dispatchAction('navigate', '/dashboard');
```

---

## Attribute Syntax

```
on-<eventType>="actionId[:payload][; modifier1,modifier2,…]"
```

| Segment       | Description                                                 | Example                       |
| ------------- | ----------------------------------------------------------- | ----------------------------- |
| `eventType`   | Any standard DOM event name — encoded in the attribute name | `on-click`, `on-submit`       |
| `actionId`    | Identifier your handler subscribes to                       | `open_drawer`, `search_query` |
| `:payload`    | Optional literal string, or a `$`-prefixed resolver token   | `:main`, `:$value`            |
| `; modifiers` | Optional comma-separated modifier list after a semicolon    | `; prevent,validate`          |

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

---

## API Reference

### `ActionRecord` (interface)

The global action type registry. Extend via declaration merging to register typed actions.

```ts
declare module '@alwatr/action' {
  interface ActionRecord {
    open_drawer: string;
    logout: void;
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

### `onAction(actionId, handler)`

Subscribes to a named action. O(1) routing via `ChannelSignal`.

```ts
function onAction<K extends keyof ActionRecord>(
  actionId: K,
  handler: (payload: ActionRecord[K]) => void,
): SubscribeResult;
```

```ts
const sub = onAction('open_drawer', (panel) => openDrawer(panel));
sub.unsubscribe(); // prevent memory leaks
```

---

### `dispatchAction(actionId, payload?)`

Dispatches a named action. Payload type is enforced by `ActionRecord`.

```ts
// With payload
dispatchAction('open_drawer', 'settings');

// Void payload — no second argument
dispatchAction('logout');
```

---

### `registerModifier(name, handler)`

Registers a custom modifier. Return `false` to cancel the dispatch.

Handler signature: `(event: Event, element: HTMLElement) => boolean`

```ts
import {registerModifier} from '@alwatr/action';

registerModifier('not_disabled', (_event, element) => {
  return !(element as HTMLButtonElement).disabled;
});
```

```html
<button
  on-click="select_item:$data_id; not_disabled"
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

registerPayloadResolver('$checked', (_event, element) => {
  return (element as HTMLInputElement).checked;
});

registerPayloadResolver('$data_id', (_event, element) => {
  return (element as HTMLElement).dataset.id ?? null;
});
```

```html
<input
  type="checkbox"
  on-change="toggle_feature:$checked"
/>
<li
  on-click="select_item:$data_id"
  data-id="42"
>
  Item
</li>
```

---

## Unidirectional Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                         UI Layer                         │
│  <button on-click="add_to_cart:42">Add</button>          │
└─────────────────────────┬────────────────────────────────┘
                          │ DOM event bubbles to body
                          ▼
┌──────────────────────────────────────────────────────────┐
│               Action Layer (@alwatr/action)              │
│  document.body capture listener (1 per event type)       │
│  → closest('[on-click]') → parse → modifiers             │
│  → internalChannel_.dispatch('add_to_cart', '42') [O(1)] │
└─────────────────────────┬────────────────────────────────┘
                          │ O(1) routing via ChannelSignal
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    Business Logic Layer                  │
│  onAction('add_to_cart', (id) => cartService.add(id))    │
└─────────────────────────┬────────────────────────────────┘
                          │ state update
                          ▼
┌──────────────────────────────────────────────────────────┐
│                 State Layer (@alwatr/signal)              │
│  cartSignal.set(newCartState)                            │
└─────────────────────────┬────────────────────────────────┘
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

### Attribute syntax changed

The event type is now encoded in the **attribute name** instead of the value, and modifiers are listed after a semicolon instead of dot-chained before the arrow.

**Before:**

```html
<button on-action="click->open_drawer:main">Open</button>
<form
  on-action="submit.prevent.validate->submit_form:$formdata"
  novalidate
>
  …
</form>
<button on-action="click.once->welcome_dismissed">Got it</button>
```

**After:**

```html
<button on-click="open_drawer:main">Open</button>
<form
  on-submit="submit_form:$formdata; prevent,validate"
  novalidate
>
  …
</form>
<button on-click="welcome_dismissed; once">Got it</button>
```

### `ActionContext` removed

The `this` context in modifier and resolver handlers changed to explicit parameters:

**Before:**

```ts
registerModifier('not_disabled', function () {
  return !(this.element as HTMLButtonElement).disabled;
});
```

**After:**

```ts
registerModifier('not_disabled', (_event, element) => {
  return !(element as HTMLButtonElement).disabled;
});
```

### `page-ready` moved to `@alwatr/page-ready`

`dispatchPageId` / `onPageReady` are no longer part of this package.

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
