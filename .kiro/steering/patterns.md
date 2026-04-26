---
inclusion: always
---

# Code Patterns & Conventions

This document captures the concrete patterns used throughout the codebase. Follow these exactly when writing new code.

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

---

## Action Patterns (`@alwatr/action`)

`@alwatr/action` is the **Action layer** in Unidirectional Data Flow. DOM events flow upward as named actions; business logic subscribes and updates state via signals.

Uses **global event delegation**: one capture-phase listener on `document.body` per event type handles every `on-action` element — O(1) boot time, zero per-element overhead, automatic support for dynamic content.

### Unidirectional Data Flow

```
UI (HTML attributes)
  │  on-action="click->add_to_cart:42"
  ▼
Action Layer (@alwatr/action)
  │  document.body capture listener → closest('[on-action]') → dispatchAction
  ▼
Business Logic
  │  onAction('add_to_cart', id => cartService.add(id))
  ▼
State Layer (@alwatr/signal)
  │  cartSignal.dispatch(newState)
  ▼
UI (re-render)
```

### Bootstrap

```ts
import {setupActionDelegation} from '@alwatr/action';
import {onPageReady, subscribePageReady, dispatchPageReady} from '@alwatr/page-ready';

// One call — covers the entire page including future dynamic content.
setupActionDelegation();

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
    open_drawer: string;
    add_to_cart: {productId: number; qty: number};
    logout: void;
  }
}
```

Passing an undeclared action name to `onAction` or `dispatchAction` is a **compile error**.

### Subscribing to actions

```ts
import {onAction} from '@alwatr/action';

// String payload (default)
onAction('open_drawer', (panel) => {
  drawerSignal.dispatch({open: true, panel});
});

// Typed payload
onAction<{productId: number; qty: number}>('add_to_cart', (item) => {
  cartService.add(item!.productId, item!.qty);
});

// Cleanup when component is destroyed
const sub = onAction('logout', () => authService.logout());
sub.unsubscribe(); // call when no longer needed
```

### Dispatching actions from code

```ts
import {dispatchAction} from '@alwatr/action';

// After an async operation completes
await uploadFile(file);
dispatchAction('upload_complete', fileId);

// From a service layer
dispatchAction('navigate', '/dashboard');
```

### HTML attribute syntax

```
on-action="eventType[.modifier…]->actionId[:payload]"
```

```html
<!-- Literal payload -->
<button on-action="click->open_drawer:settings">Settings</button>

<!-- Dynamic payload from input value -->
<input on-action="input->search_query:$value" />

<!-- Form data payload with validation -->
<form
  on-action="submit.prevent.validate->submit_form:$formdata"
  novalidate
>
  …
</form>
```

### Built-in modifiers

| Modifier    | Effect                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| `.prevent`  | `event.preventDefault()`                                                          |
| `.once`     | Removes `on-action` attribute after first fire — dispatches only once per element |
| `.validate` | Cancels dispatch if nearest `<form>` fails `checkValidity()`                      |

### Built-in payload resolvers

| Token        | Resolves to                                                    |
| ------------ | -------------------------------------------------------------- |
| `:$value`    | `element.value` (for `<input>`, `<select>`, `<textarea>`)      |
| `:$formdata` | `Object.fromEntries(new FormData(form))` from nearest `<form>` |

### Extending with custom modifiers and resolvers

Handler signature uses explicit parameters — no `this` binding:

```ts
import {registerModifier, registerPayloadResolver} from '@alwatr/action';

// Custom modifier — cancel dispatch if element is disabled
registerModifier('not-disabled', (_event, element) => {
  return !(element as HTMLButtonElement).disabled;
});

// Custom payload resolver — read a data attribute
registerPayloadResolver('$data-id', (_event, element) => {
  return (element as HTMLElement).dataset.id ?? null;
});
```

```html
<button
  on-action="click.not-disabled->select_item:$data-id"
  data-id="42"
>
  Select
</button>
```
