# Design Document

## Feature: `@on` Event Decorator

---

## Overview

Add an `@on(eventType, selector?, options?)` method decorator to `pkg/nanolib/directive/src/util-decorators.ts`.

When applied to a method in a `DirectiveBase` subclass, the decorator:

1. Registers a DOM event listener on `this.element_` (or a child matching `selector`) after the directive initializes.
2. Automatically removes the listener via `addDestroyHook` when the directive is destroyed.

The implementation follows the KISS principle and mirrors the existing `@query`, `@queryAll`, and `@attribute` decorators in the same file.

---

## Architecture

The decorator uses the TypeScript stage-3 `ClassMethodDecoratorContext` API — the same pattern already used in the codebase. It hooks into the directive lifecycle via `context.addInitializer`, which runs after the class instance is constructed (i.e., after `this.element_` is available).

```
@on('click') applied to method
        │
        ▼
context.addInitializer runs on instance creation
        │
        ├─ resolve target element (this.element_ or querySelector result)
        ├─ bind method to `this`
        ├─ call targetElement.addEventListener(eventType, boundMethod, options)
        └─ call this.addDestroyHook(() => targetElement.removeEventListener(...))
```

No changes to `DirectiveBase` are required. The decorator is entirely self-contained in `util-decorators.ts`.

---

## Components and Interfaces

### `on` function signature

```ts
export function on(
  eventType: keyof HTMLElementEventMap | string,
  selector?: string,
  options?: AddEventListenerOptions | boolean,
): (
  target: (this: DirectiveBase, event: Event) => void,
  context: ClassMethodDecoratorContext<DirectiveBase, (event: Event) => void>,
) => void;
```

### Usage examples

```ts
@directive('[my-directive]')
class MyDirective extends DirectiveBase {
  protected init_(): void {}

  // Listen on this.element_
  @on('click')
  protected onClick_(event: Event): void {
    console.log('clicked', event);
  }

  // Listen on a child element
  @on('input', '.search-input')
  protected onInput_(event: Event): void {
    console.log('input', (event.target as HTMLInputElement).value);
  }

  // With options
  @on('scroll', undefined, {passive: true})
  protected onScroll_(event: Event): void {
    /* ... */
  }
}
```

---

## Data Models

No new data models are introduced. The decorator relies entirely on existing browser APIs (`addEventListener`, `removeEventListener`, `querySelector`) and the existing `DirectiveBase` lifecycle (`addDestroyHook`).

The only internal state is the bound method reference, which is captured in the closure created by `context.addInitializer` and reused for both `addEventListener` and `removeEventListener`.

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Listener is invoked with the Event object

_For any_ event type string and any `DirectiveBase` subclass with an `@on(eventType)`-decorated method, dispatching that event on the target element SHALL invoke the decorated method exactly once with the dispatched `Event` object as its argument.

**Validates: Requirements 2.1, 2.2**

### Property 2: `this` binding is the directive instance

_For any_ `DirectiveBase` subclass instance with an `@on`-decorated method, when the event fires, the value of `this` inside the decorated method SHALL be the directive instance.

**Validates: Requirements 2.3**

### Property 3: All `@on` listeners are removed after destroy

_For any_ `DirectiveBase` subclass with one or more `@on`-decorated methods, after `destroy()` is called, dispatching any of the registered event types on the target elements SHALL NOT invoke any of the decorated methods.

**Validates: Requirements 3.1, 3.2, 4.3**

---

## Error Handling

| Scenario                                               | Behavior                                                                                      |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `@on` applied to a non-method (accessor, field)        | Throw `Error` with descriptive message at decoration time                                     |
| `selector` provided but `querySelector` returns `null` | Log a warning via `this.logger_`, skip `addEventListener` silently                            |
| `destroy()` called before `init_()` completes          | No-op — `addDestroyHook` list is empty or the hook removes a never-registered listener (safe) |

---

## Testing Strategy

### Unit tests (example-based)

- `@on` is exported as a function from `util-decorators`.
- Applying `@on` to a non-method throws at decoration time.
- Two methods decorated with `@on('click')` both fire when click is dispatched.
- Providing a selector that matches nothing logs a warning and does not throw.

### Property-based tests

Using **fast-check** (already available in the JS ecosystem; consistent with Bun test runner).
Each property test runs a minimum of **100 iterations**.

Tag format: `Feature: event-decorator, Property {N}: {property_text}`

**Property 1 test** — `Feature: event-decorator, Property 1: listener is invoked with the Event object`

- Generate: random event type strings (from a fixed set of valid DOM event names + arbitrary strings)
- Setup: create a `DirectiveBase` subclass with `@on(eventType)`, attach to a DOM element
- Assert: dispatching the event calls the method exactly once with the correct `Event` instance

**Property 2 test** — `Feature: event-decorator, Property 2: this binding is the directive instance`

- Generate: random event type strings
- Setup: same as Property 1, capture `this` inside the decorated method
- Assert: captured `this === directiveInstance`

**Property 3 test** — `Feature: event-decorator, Property 3: all @on listeners are removed after destroy`

- Generate: random sets of 1–5 event types
- Setup: create a directive with `@on` on multiple methods, call `destroy()`, dispatch all events
- Assert: none of the decorated methods are called after destroy
