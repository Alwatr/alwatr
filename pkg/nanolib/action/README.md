# @alwatr/action

**Declarative DOM action-dispatch — the Action layer for Unidirectional Data Flow.**

`@alwatr/action` bridges HTML attributes to typed signal handlers. Add an `on-action` attribute to any element, and the library automatically listens for the specified DOM event, resolves the payload, and dispatches a named action. Subscribe to actions anywhere in your app with `onAction`.

This package serves as the **Action layer** in a Unidirectional Data Flow (UDF) architecture: UI elements declare their intent via `on-action` attributes, actions flow upward to business logic via `dispatchAction`, and state flows back down to the UI through signals.

---

## Why `@alwatr/action`?

| Approach                               | Problem                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| Inline `addEventListener` everywhere   | Scattered, hard to trace, breaks on dynamic content      |
| Framework event bindings (React, Vue…) | Requires full framework buy-in                           |
| Custom events + `dispatchEvent`        | Verbose, no typed payload, no central subscription point |
| **`@alwatr/action`**                   | ✅ Declarative, typed, zero-coupling, SPA-friendly       |

---

## How It Works Internally

The action bus is powered by a [`ChannelSignal`](../signal/README.md#channelsignal-a-typed-message-bus) from `@alwatr/signal`.

Previously, the internal signal was an `EventSignal<{actionId, actionPayload}>` — a single stream where every subscriber received every dispatched action and had to filter by `actionId` manually. With 1000 directives on a page, dispatching one action would invoke all 1000 callbacks, with 999 of them doing nothing but a string comparison — **O(N) per dispatch**.

The new implementation uses `ChannelSignal`, which maintains a `Map<actionId, Set<handler>>` internally. Dispatching action `'A'` performs a single `Map.get('A')` lookup and invokes only the handlers registered for that specific action — **O(1) per dispatch**, regardless of how many other actions are subscribed.

```
dispatchAction('add-to-cart', payload)
        │
        ▼
  ChannelSignal.dispatch('add-to-cart', payload)
        │
        └─ Map.get('add-to-cart') → O(1) → invoke only matching handlers
```

---

## Installation

```bash
bun add @alwatr/action
# or
npm i @alwatr/action
```

---

## Attribute Syntax

```
on-action="eventType->actionId"
on-action="eventType->actionId:payload"
on-action="eventType[.modifier…]->actionId[:payload]"
```

| Segment     | Description                                               | Example                       |
| ----------- | --------------------------------------------------------- | ----------------------------- |
| `eventType` | Any standard DOM event name                               | `click`, `input`, `submit`    |
| `modifier`  | Optional dot-chained tokens processed before dispatch     | `.prevent`, `.validate`       |
| `actionId`  | Identifier your handler subscribes to                     | `open-drawer`, `search-query` |
| `:payload`  | Optional literal string, or a `$`-prefixed resolver token | `:main`, `:$value`            |

### Built-in payload resolvers

| Token        | Resolves to                                                    |
| ------------ | -------------------------------------------------------------- |
| `:$value`    | `element.value` (for `<input>`, `<select>`, `<textarea>`)      |
| `:$formdata` | `Object.fromEntries(new FormData(form))` from nearest `<form>` |

### Built-in event modifiers

Modifiers are chained with `.` after the event type:

| Modifier    | Behavior                                                             |
| ----------- | -------------------------------------------------------------------- |
| `.prevent`  | Calls `event.preventDefault()`                                       |
| `.stop`     | Calls `event.stopPropagation()`                                      |
| `.once`     | Removes the listener after the first dispatch (native `once` option) |
| `.passive`  | Marks the listener as passive (cannot be combined with `.prevent`)   |
| `.validate` | Cancels dispatch if the nearest `<form>` fails `checkValidity()`     |

---

## Quick Start

### 1. Register the directive and bootstrap

```typescript
import {bootstrapDirectives} from '@alwatr/directive';
import {registerActionDirective} from '@alwatr/action';

registerActionDirective(); // registers ActionDirective under 'on-action'
bootstrapDirectives();
```

### 2. Subscribe to actions

```typescript
import {onAction} from '@alwatr/action';

// Fires whenever any element with on-action="click->open-drawer:main" is clicked
onAction('open-drawer', (payload) => {
  openDrawer(payload); // payload === 'main'
});

// Fires on every keystroke in an input with on-action="input->search-query:$value"
onAction('search-query', (query) => {
  performSearch(query);
});
```

### 3. Add attributes to HTML

```html
<!-- Dispatches 'open-drawer' with payload 'main' on click -->
<button on-action="click->open-drawer:main">Open Drawer</button>

<!-- Dispatches 'open-drawer' with payload 'settings' on click -->
<button on-action="click->open-drawer:settings">Settings</button>

<!-- Dispatches 'search-query' with the input's live value -->
<input
  type="search"
  on-action="input->search-query:$value"
  placeholder="Search…"
/>

<!-- Prevents default and validates form before dispatching all field values -->
<form
  on-action="submit.prevent.validate->submit-form:$formdata"
  novalidate
>
  <!-- ... -->
</form>
```

---

## Programmatic Dispatch

Dispatch actions from code using `dispatchAction` — useful after async operations or from service layers:

```typescript
import {dispatchAction} from '@alwatr/action';

dispatchAction('open-drawer', 'main');
dispatchAction('navigate', '/home');
dispatchAction<{code: number}>('show-error', {code: 404});
```

---

## API Reference

### `onAction(actionId, handler)`

Subscribes to a named action dispatched by any `on-action` directive or `dispatchAction` call.

Uses `ChannelSignal.on()` internally for **O(1) routing** — only handlers registered for `actionId` are invoked when that action is dispatched.

```typescript
function onAction<T = string>(actionId: string, handler: (payload?: T) => void): SubscribeResult;
```

| Parameter  | Type                    | Description                         |
| ---------- | ----------------------- | ----------------------------------- |
| `actionId` | `string`                | The action identifier to listen for |
| `handler`  | `(payload?: T) => void` | Called with the resolved payload    |

Returns a `SubscribeResult` with an `unsubscribe()` method.

```typescript
const sub = onAction('open-drawer', (payload) => {
  /* … */
});

// Stop listening when no longer needed (prevents memory leaks)
sub.unsubscribe();
```

---

### `dispatchAction(actionId, payload?)`

Dispatches a named action. Any `onAction` subscriber with a matching `actionId` will be invoked via the internal `ChannelSignal`.

```typescript
function dispatchAction<T = string>(actionId: string, actionPayload?: T): void;
```

---

### `registerActionDirective()`

Lazy registration for `ActionDirective`. Call once before `bootstrapDirectives()`.
If never called, the entire directive module is tree-shaken from the bundle.

```typescript
import {registerActionDirective} from '@alwatr/action';
import {bootstrapDirectives} from '@alwatr/directive';

registerActionDirective();
bootstrapDirectives();
```

---

### `registerPageIdDirective()`

Registers the `page-id` directive, which dispatches a `'page-ready'` action with the page ID as payload when the element is initialized.

```html
<body page-id="home"></body>
```

```typescript
import {registerPageIdDirective, onAction} from '@alwatr/action';

registerPageIdDirective();

onAction('page-ready', (pageId) => {
  console.log('Page is ready:', pageId); // 'home'
});
```

---

### `registerModifier(name, handler)`

Registers a custom modifier for use in `on-action` directives. Return `false` from the handler to cancel the dispatch.

```typescript
import {registerModifier} from '@alwatr/action';

registerModifier('confirm', function () {
  return window.confirm('Are you sure?');
});
```

```html
<button on-action="click.confirm->delete-item:42">Delete</button>
```

---

### `registerPayloadResolver(name, resolver)`

Registers a custom payload resolver for use in `on-action` directives.

```typescript
import {registerPayloadResolver} from '@alwatr/action';

registerPayloadResolver('$checked', function () {
  return (this.element_ as HTMLInputElement).checked;
});
```

```html
<input
  type="checkbox"
  on-action="change->toggle-feature:$checked"
/>
```

---

### `ActionDirective`

The directive class registered under the `on-action` attribute. Extends `Directive` from `@alwatr/directive`.

You rarely need to interact with this class directly — use `registerActionDirective()` to register it.

---

## Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                        UI Layer                         │
│  <button on-action="click->add-to-cart:42">Add</button> │
└────────────────────────┬────────────────────────────────┘
                         │ DOM event
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Action Layer (@alwatr/action)         │
│  dispatchAction('add-to-cart', '42')                    │
│  → ChannelSignal.dispatch('add-to-cart', '42')  [O(1)] │
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
                      UI Layer
```

---

## Lifecycle

```
bootstrapDirectives()
  │
  └─ finds element with on-action="click->open-drawer:main"
       │
       └─ new ActionDirective(element, 'on-action')
            │
            └─ after one macrotask → init_()
                 │
                 ├─ parse attributeValue with syntaxRegex
                 ├─ if invalid → log accident, return
                 └─ addEventListener(eventType, dispatch_)
                    addDestroyHook(removeEventListener)
```

---

## Cleanup & Memory Management

Every `addEventListener` registered by the directive has a corresponding `removeEventListener` in a destroy hook. Call `autoDestructDirectives()` periodically (or on route changes) to clean up directives whose elements have been removed from the DOM.

```typescript
import {autoDestructDirectives} from '@alwatr/directive';

// Clean up on every SPA navigation
router.on('navigate', autoDestructDirectives);
```

---

## Migration from Previous Versions

### Removed: `ActionSignalPayload`

The `ActionSignalPayload<T>` interface has been removed from the public API. It was an implementation detail of the old `EventSignal`-based bus and is no longer needed.

**Before:**

```typescript
import type {ActionSignalPayload} from '@alwatr/action';

const payload: ActionSignalPayload<{productId: number}> = {
  actionId: 'add-to-cart',
  actionPayload: {productId: 42},
};
```

**After:** Use `onAction` and `dispatchAction` directly — no wrapper type needed:

```typescript
import {onAction, dispatchAction} from '@alwatr/action';

onAction<{productId: number}>('add-to-cart', (payload) => {
  cartService.add(payload!.productId);
});

dispatchAction('add-to-cart', {productId: 42});
```

### No other breaking changes

`onAction`, `dispatchAction`, `registerActionDirective`, `registerPageIdDirective`, `registerModifier`, and `registerPayloadResolver` all have identical signatures. The upgrade is a drop-in replacement.

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
