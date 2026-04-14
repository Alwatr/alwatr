# Requirements Document

## Introduction

Add an `@on` method decorator to the `@alwatr/directive` package (`pkg/nanolib/directive/src/util-decorators.ts`).
When applied to a method in a `DirectiveBase` subclass, the decorator automatically registers a DOM event listener on `this.element_` (or on a matching child element when a CSS selector is provided) for the specified event type, and automatically removes it when the directive is destroyed — all without any manual `addEventListener` / `removeEventListener` calls.

The decorator signature is `@on(eventType, selector?)`. When `selector` is omitted the listener is registered directly on `this.element_`. When `selector` is provided, the listener is registered on the first child element matching `this.element_.querySelector(selector)`. There is no `root` parameter — the query scope is always limited to within the directive's own `this.element_`.

The name `@on` is chosen following the KISS principle: it is the shortest, most idiomatic name for event binding in the JavaScript ecosystem (mirrors `element.onclick`, `on('click', ...)` patterns), and is consistent with the existing terse decorator names (`@query`, `@queryAll`, `@attribute`).

## Glossary

- **Decorator**: A TypeScript stage-3 class decorator applied with `@` syntax.
- **DirectiveBase**: The abstract base class (`pkg/nanolib/directive/src/directive-class.ts`) that all directives extend. Exposes `element_: HTMLElement` and `addDestroyHook(fn)`.
- **`@on` decorator**: The new method decorator defined in `util-decorators.ts` that wires a class method to a DOM event listener. Accepts an optional `selector` parameter to target a child element.
- **Event type**: A string identifying a DOM event (e.g. `'click'`, `'input'`, `'change'`).
- **Selector**: An optional CSS selector string (`string | undefined`) passed as the second argument to `@on`. When provided, the listener is registered on the first child element found via `this.element_.querySelector(selector)` rather than on `this.element_` itself. The query is always scoped within the directive's own `this.element_` — there is no `root` parameter.
- **Target element**: The DOM element on which the event listener is actually registered — either `this.element_` (no selector) or the result of `this.element_.querySelector(selector)`.
- **Listener**: The bound class method registered via `addEventListener`.
- **Destroy hook**: A cleanup callback registered via `DirectiveBase.addDestroyHook` that runs when the directive is destroyed.

---

## Requirements

### Requirement 1: Decorator Definition

**User Story:** As a directive author, I want an `@on(eventType)` method decorator, so that I can declaratively bind a class method to a DOM event without writing boilerplate `addEventListener` calls.

#### Acceptance Criteria

1. THE `util-decorators` module SHALL export a function named `on` that accepts an `eventType` string parameter and returns a method decorator.
2. WHEN `@on` is applied to a non-method class member, THE `on` decorator SHALL throw an `Error` with a descriptive message.
3. THE `on` decorator SHALL accept an optional `options` parameter of type `AddEventListenerOptions` to allow passive, capture, and once configurations.
4. THE `on` decorator SHALL accept an optional `selector` parameter (typed as `string | undefined`) as its second argument. WHEN `selector` is provided, the event listener is registered on the first matching child element found via `this.element_.querySelector(selector)` instead of `this.element_` itself. There is no `root` parameter — the query scope is always limited to within the directive's own `this.element_`.

---

### Requirement 2: Event Listener Registration

**User Story:** As a directive author, I want the decorated method to be automatically called when the specified event fires on `this.element_`, so that I don't need to manually call `addEventListener` in `init_`.

#### Acceptance Criteria

1. WHEN a `DirectiveBase` subclass instance is initialized and no `selector` is provided, THE `on` decorator SHALL call `this.element_.addEventListener(eventType, boundMethod, options)` to register the listener directly on `this.element_`. WHEN a `selector` is provided, THE `on` decorator SHALL call `this.element_.querySelector(selector)` to find the target element and register the listener on that element instead.
2. WHEN the specified DOM event fires on the target element, THE `on` decorator SHALL invoke the decorated method with the `Event` object as its argument.
3. THE `on` decorator SHALL bind the decorated method to the directive instance (`this`) so that `this` inside the method refers to the directive.
4. WHEN a `selector` is provided but `this.element_.querySelector(selector)` returns `null`, THE `on` decorator SHALL log a warning and skip registration without throwing an error.

---

### Requirement 3: Lifecycle — Automatic Cleanup

**User Story:** As a directive author, I want the event listener to be removed automatically when the directive is destroyed, so that there are no memory leaks or stale listeners.

#### Acceptance Criteria

1. WHEN the directive's `destroy()` method is called, THE `on` decorator SHALL remove the previously registered event listener via `targetElement.removeEventListener(eventType, boundMethod, options)`, where `targetElement` is the same element the listener was registered on (either `this.element_` when no selector was provided, or the child element returned by `this.element_.querySelector(selector)`).
2. THE `on` decorator SHALL register the removal callback using `this.addDestroyHook(...)` so cleanup integrates with the existing lifecycle.

---

### Requirement 4: Multiple `@on` Decorators on the Same Class

**User Story:** As a directive author, I want to apply `@on` to multiple methods in the same class (including the same event type on different methods), so that I can handle different events or multiple handlers cleanly.

#### Acceptance Criteria

1. THE `DirectiveBase` subclass SHALL support any number of `@on`-decorated methods, each registering its own independent listener.
2. WHEN two methods are decorated with `@on('click')`, THE `on` decorator SHALL register both methods as separate listeners on `this.element_`.
3. WHEN the directive is destroyed, THE `on` decorator SHALL remove all listeners registered by all `@on`-decorated methods on that instance.

---

### Requirement 5: TypeScript Typing

**User Story:** As a directive author, I want full TypeScript type safety on the decorator, so that incorrect usage is caught at compile time.

#### Acceptance Criteria

1. THE `on` decorator SHALL be typed to accept only `ClassMethodDecoratorContext` so that applying it to accessors or fields produces a TypeScript compile error.
2. THE `on` decorator's `eventType` parameter SHALL be typed as `keyof HTMLElementEventMap | string` to provide autocomplete for standard events while allowing custom event names.
3. THE `on` decorator's `options` parameter SHALL be typed as `AddEventListenerOptions | boolean | undefined`.
