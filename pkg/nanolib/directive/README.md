# @alwatr/directive

**Declarative DOM behavior — without a framework.**

`@alwatr/directive` is a tiny, zero-dependency TypeScript library that lets you attach rich, reusable behaviors to DOM elements using plain HTML attributes. No virtual DOM. No build-time magic. No framework lock-in.

---

## Why Directives?

Modern web apps constantly need to enrich DOM elements: tooltips, lazy loaders, copy buttons, form validators, infinite scrollers, and more. The typical approaches all have trade-offs:

| Approach                                 | Problem                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| Inline `querySelector` + event listeners | Scattered, hard to reuse, breaks on dynamic content                     |
| Full framework (React, Vue, Angular)     | Heavy, opinionated, requires full buy-in                                |
| Web Components                           | Verbose, requires custom element registration, no plain-HTML activation |
| **`@alwatr/directive`**                  | ✅ Lightweight, declarative, reusable, SPA-friendly                     |

The **Directive Pattern** solves this by letting you encapsulate any DOM behavior in a self-contained class, then activate it declaratively from HTML — just by adding an attribute.

### Key advantages

- **Declarative activation** — behavior is triggered by HTML attributes, not imperative JS calls
- **Zero coupling** — directives don't know about each other; HTML is the only contract
- **Idempotent bootstrap** — safely re-run on dynamic content; already-initialized elements are skipped
- **Async-safe initialization** — if defined, `init_()` runs after a macrotask, so the DOM is always settled
- **Automatic cleanup** — destroy hooks and `autoDestroy()` prevent memory leaks
- **Progressive enhancement** — works on any existing HTML without restructuring your markup
- **Tiny footprint** — no runtime overhead beyond what your directive actually does

---

## Installation

```bash
bun add @alwatr/directive
# or
npm i @alwatr/directive
# or
yarn add @alwatr/directive
# or
pnpm i @alwatr/directive
```

---

## Core Concepts

The library is built around three primitives:

### 1. `@directive(attributeName)`

A class decorator that **registers** your class against an HTML attribute name. When `bootstrapDirectives()` runs, any element with that attribute gets an instance of your class.

### 2. `DirectiveBase`

The abstract base class your directives extend. It wires up the element, a scoped logger, the attribute value, and the lifecycle hooks — so you only write the logic that matters.

### 3. `bootstrapDirectives(root?)`

Scans a DOM subtree, finds all elements matching registered attribute names, and instantiates the corresponding directive class for each one. Idempotent — safe to call multiple times or on overlapping subtrees.

---

## Quick Start

### 1. Create a directive

```typescript
// src/directives/copy-button.ts
import {directive, DirectiveBase} from '@alwatr/directive';

@directive('copy-button')
export class CopyButtonDirective extends DirectiveBase {
  private originalText_!: string;

  protected override async init_(): Promise<void> {
    // this.attributeValue  → value of the 'copy-button' attribute
    // this.element_        → the bound HTMLElement
    // this.logger_         → scoped logger: "directive:copy-button/0"

    this.originalText_ = this.element_.textContent ?? 'Copy';
    this.element_.addEventListener('click', () => this.handleClick_());
  }

  private async handleClick_(): Promise<void> {
    const text = this.attributeValue || this.element_.dataset.copyText || '';

    try {
      await navigator.clipboard.writeText(text);
      this.element_.textContent = 'Copied!';
    } catch {
      this.element_.textContent = 'Failed!';
    }

    setTimeout(() => {
      this.element_.textContent = this.originalText_;
    }, 2000);
  }
}
```

### 2. Bootstrap on page load

```typescript
// src/main.ts
import {bootstrapDirectives} from '@alwatr/directive';
import './directives/copy-button.js'; // importing registers the directive

// Safe to call at any point — if the DOM isn't ready yet,
// bootstrapDirectives() will automatically defer until DOMContentLoaded.
bootstrapDirectives();
```

### 3. Activate from HTML

```html
<button copy-button="Hello, world!">Copy</button>
```

That's it. No `getElementById`. No manual wiring. The attribute is the contract.

---

## Reading the Attribute Value

Every directive automatically receives the attribute's value via `this.attributeValue`:

```html
<div show-tooltip="This is a helpful hint">Hover me</div>
```

```typescript
@directive('show-tooltip')
class TooltipDirective extends DirectiveBase {
  protected init_(): void {
    // this.attributeValue === 'This is a helpful hint'
    this.element_.title = this.attributeValue;
  }
}
```

---

## Dynamic Content (SPA-friendly)

`bootstrapDirectives` is **idempotent**. You can call it as many times as you want — already-initialized elements are tracked internally via a `WeakMap` and are never touched again.

```typescript
// After fetching and injecting new HTML into the page:
const container = document.querySelector('#dynamic-region')!;
container.innerHTML = await fetchSomeHtml();

// Only the new elements will be initialized
bootstrapDirectives(container);
```

This makes `@alwatr/directive` a natural fit for SPAs, server-side rendered pages with client-side hydration, and any app that loads content dynamically.

---

## Lifecycle

```
new DirectiveBase(element, attributeName)
  │
  ├─ constructor runs synchronously
  │    sets: attributeName, attributeValue, element_, logger_, index
  │
  └─ after one macrotask (delay.nextMacrotask)
  ├─ init_()? called  ← your logic goes here if you define it
  ├─ lazyInit_()? called
  └─ onVisible_()? called
```

The macrotask delay ensures the full DOM subtree is painted and settled before your directive runs — no race conditions with sibling elements or CSS.

---

## Cleanup & Memory Management

### `addDestroyHook(task)`

Register cleanup callbacks that run when `destroy()` is called. Use this to remove global event listeners, cancel timers, or unsubscribe from signals.

```typescript
@directive('live-clock')
class LiveClockDirective extends DirectiveBase {
  protected init_(): void {
    const intervalId = setInterval(() => {
      this.element_.textContent = new Date().toLocaleTimeString();
    }, 1000);

    // Registered cleanup — runs automatically on destroy()
    this.addDestroyHook(() => clearInterval(intervalId));
  }
}
```

### `destroy()`

Runs all registered destroy hooks in order, then nullifies the internal element reference to aid garbage collection.

### `autoDestroy()`

Checks whether `this.element_` is still connected to the DOM. If not, calls `destroy()` and returns `true`. Use this with `autoDestructDirectives()` for periodic cleanup.

### `autoDestructDirectives()`

Iterates over all live directive instances and calls `autoDestroy()` on each. Pair with a `MutationObserver` or a periodic interval for automatic memory management in long-running SPAs.

```typescript
import {autoDestructDirectives} from '@alwatr/directive';

// Clean up disconnected directives every 30 seconds
setInterval(autoDestructDirectives, 30_000);
```

---

## Dispatching Events

Use `dispatch()` to fire a bubbling `CustomEvent` from the directive's element — a clean way to communicate upward without tight coupling.

```typescript
@directive('submit-form')
class SubmitFormDirective extends DirectiveBase {
  protected init_(): void {
    this.element_.addEventListener('click', () => {
      this.dispatch('form-submitted', {formId: this.attributeValue});
    });
  }
}

// Anywhere in the app:
document.addEventListener('form-submitted', (e: CustomEvent) => {
  console.log('Form submitted:', e.detail.formId);
});
```

---

## Utility Decorators

These TC39 Stage 3 accessor decorators reduce boilerplate for common patterns inside directives. They require the `accessor` keyword.

### `@query(selector, cache?, root?)`

Lazily queries a single child element. Cached by default.

```typescript
@directive('my-card')
class CardDirective extends DirectiveBase {
  @query('.card-title')
  accessor titleEl!: HTMLElement | null;

  @query('.card-body', false) // cache=false → re-queries on every access
  accessor bodyEl!: HTMLElement | null;

  protected init_(): void {
    if (this.titleEl) {
      this.titleEl.textContent = 'Hello!';
    }
  }
}
```

### `@queryAll(selector, cache?, root?)`

Lazily queries all matching child elements. Cached by default.

```typescript
@directive('my-tabs')
class TabsDirective extends DirectiveBase {
  @queryAll('.tab-item')
  accessor tabItems!: NodeListOf<HTMLElement>;

  protected init_(): void {
    this.tabItems.forEach((tab, i) => {
      tab.addEventListener('click', () => this.activateTab_(i));
    });
  }

  private activateTab_(index: number): void {
    /* ... */
  }
}
```

### `@attribute(name, cache?, root?)`

Lazily reads an attribute value from the element. Cached by default.

```typescript
@directive('user-card')
class UserCardDirective extends DirectiveBase {
  @attribute('user-id')
  accessor userId!: string | null;

  @attribute('user-role')
  accessor userRole!: string | null;

  protected async init_(): Promise<void> {
    if (!this.userId) return;
    const user = await fetchUser(this.userId);
    this.element_.querySelector('.name')!.textContent = user.name;
  }
}
```

---

## Full API Reference

### `directive(attributeName: string)`

Class decorator. Registers the decorated class in the global directive registry.

- `attributeName` — the HTML attribute that activates this directive (e.g. `'show-tooltip'`)
- Throws if used on a non-class target
- Logs a warning and skips silently if the same attribute name is registered twice

---

### `DirectiveBase` (abstract class)

| Member                     | Type                             | Description                                                      |
| -------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `attributeName`            | `readonly string`                | The attribute name this directive is bound to                    |
| `attributeValue`           | `readonly string`                | The value of the attribute at construction time                  |
| `index`                    | `readonly number`                | Per-attribute instance counter (0, 1, 2, …)                      |
| `element_`                 | `protected readonly HTMLElement` | The bound DOM element                                            |
| `logger_`                  | `protected readonly`             | Scoped logger: `directive:{attributeName}/{index}`               |
| `init_()`                  | `protected`                      | Optional initialization logic                                    |
| `dispatch(event, detail?)` | `public`                         | Fires a bubbling `CustomEvent` from `element_`                   |
| `addDestroyHook(task)`     | `public`                         | Registers an async cleanup callback                              |
| `destroy()`                | `public async`                   | Runs all destroy hooks, then nullifies `element_`                |
| `autoDestroy()`            | `public`                         | Destroys if element is disconnected; returns `true` if destroyed |

---

### `bootstrapDirectives(root?: Element | Document)`

Scans `root` (default: `document.body`) for elements matching registered attribute names and instantiates their directive classes.

- Safe to call before DOM is ready — defers automatically via `DOMContentLoaded`
- Idempotent — uses a `WeakMap` to skip already-initialized elements
- Scoped — pass any element to limit the scan to a subtree

---

### `autoDestructDirectives()`

Iterates all live directive instances and calls `autoDestroy()` on each. Removes destroyed instances from the internal registry.

---

### `query<T>(selector, cache?, root?)`

Accessor decorator. Lazily queries `element_.querySelector<T>(selector)`.

- `cache` (default `true`) — caches result after first access
- `root` — override the query root (defaults to `element_`)
- **Requires `accessor` keyword**

---

### `queryAll<T>(selector, cache?, root?)`

Accessor decorator. Lazily queries `element_.querySelectorAll<T>(selector)`.

- Same options as `@query`
- **Requires `accessor` keyword**

---

### `attribute(name, cache?, root?)`

Accessor decorator. Lazily reads `element_.getAttribute(name)`.

- `cache` (default `true`) — caches result after first access
- `root` — override the element to read from (defaults to `element_`)
- **Requires `accessor` keyword**

---

## TypeScript Configuration

Directives use TC39 Stage 3 decorators. Make sure your `tsconfig.json` does **not** use `experimentalDecorators`:

```jsonc
{
  "compilerOptions": {
    // Do NOT set "experimentalDecorators": true
    // Stage 3 decorators are enabled by default in TypeScript 5+
  },
}
```

---

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
