# @alwatr/on

**Declarative DOM action-dispatch — without a framework.**

`@alwatr/on` bridges HTML attributes to typed signal handlers. Add an `alwatr-on` attribute to any element, and the library automatically listens for the specified DOM event, resolves the payload, and dispatches a named action signal. Subscribe to actions anywhere in your app with `alwatrOn`.

---

## Why `@alwatr/on`?

| Approach                               | Problem                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| Inline `addEventListener` everywhere   | Scattered, hard to trace, breaks on dynamic content      |
| Framework event bindings (React, Vue…) | Requires full framework buy-in                           |
| Custom events + `dispatchEvent`        | Verbose, no typed payload, no central subscription point |
| **`@alwatr/on`**                       | ✅ Declarative, typed, zero-coupling, SPA-friendly       |

---

## Installation

```bash
bun add @alwatr/on
# or
npm i @alwatr/on
```

---

## Attribute Syntax

```
alwatr-on="eventType->actionId"
alwatr-on="eventType->actionId:payload"
```

| Segment     | Description                                                  | Example                       |
| ----------- | ------------------------------------------------------------ | ----------------------------- |
| `eventType` | Any DOM event name, or `init` for one-shot dispatch          | `click`, `input`, `init`      |
| `actionId`  | Identifier your handler subscribes to                        | `open-drawer`, `search-query` |
| `:payload`  | Optional literal string, or `$value` to read `element.value` | `:main`, `:$value`            |

### Special values

- **`init`** — dispatches the action immediately on bootstrap, then destroys the directive. No persistent listener.
- **`$value`** — resolves to the element's `.value` at dispatch time (ideal for `<input>`, `<select>`, `<textarea>`).

---

## Quick Start

### 1. Register the directive and bootstrap

```typescript
import {bootstrapDirectives} from '@alwatr/directive';
import '@alwatr/on'; // importing registers AlwatrActionDirective

bootstrapDirectives();
```

### 2. Subscribe to actions

```typescript
import {alwatrOn} from '@alwatr/on';

// Fires whenever any element with alwatr-on="click->open-drawer:*" is clicked
alwatrOn('open-drawer', (payload) => {
  openDrawer(payload); // payload === 'main'
});

// Fires on every keystroke in an input with alwatr-on="input->search-query:$value"
alwatrOn('search-query', (query) => {
  performSearch(query);
});

// Fires once on page load from alwatr-on="init->page-loaded"
alwatrOn('page-loaded', () => {
  console.log('Page is ready');
});
```

### 3. Add attributes to HTML

```html
<!-- Dispatches 'open-drawer' with payload 'main' on click -->
<button alwatr-on="click->open-drawer:main">Open Drawer</button>

<!-- Dispatches 'open-drawer' with payload 'settings' on click -->
<button alwatr-on="click->open-drawer:settings">Settings</button>

<!-- Dispatches 'search-query' with the input's live value -->
<input
  type="search"
  alwatr-on="input->search-query:$value"
  placeholder="Search…"
/>

<!-- Dispatches 'page-loaded' once, immediately on bootstrap -->
<div alwatr-on="init->page-loaded"></div>
```

---

## API Reference

### `alwatrOn(actionId, handler)`

Subscribes to a named action dispatched by any `alwatr-on` directive.

```typescript
function alwatrOn(actionId: string, handler: (payload: string) => void): SubscribeResult;
```

| Parameter  | Type                        | Description                             |
| ---------- | --------------------------- | --------------------------------------- |
| `actionId` | `string`                    | The action identifier to listen for     |
| `handler`  | `(payload: string) => void` | Called with the resolved payload string |

Returns a `SubscribeResult` with an `unsubscribe()` method.

```typescript
const sub = alwatrOn('open-drawer', (payload) => {
  /* … */
});

// Stop listening when no longer needed (prevents memory leaks)
sub.unsubscribe();
```

---

### `AlwatrActionDirective`

The directive class registered under the `alwatr-on` attribute. Extends `DirectiveBase` from `@alwatr/directive`.

You rarely need to interact with this class directly — importing `@alwatr/on` registers it automatically.

---

## Lifecycle

```
bootstrapDirectives()
  │
  └─ finds element with alwatr-on="click->open-drawer:main"
       │
       └─ new AlwatrActionDirective(element, 'alwatr-on')
            │
            └─ after one macrotask → init_()
                 │
                 ├─ parse attributeValue with syntaxRegex
                 ├─ if invalid → log accident, return
                 ├─ if eventType === 'init' → dispatch once, destroy()
                 └─ else → addEventListener(eventType, dispatch_)
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

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

MPL-2.0 — see [LICENSE](./LICENSE).
