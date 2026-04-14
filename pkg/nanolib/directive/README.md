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
- **Async-safe initialization** — all lifecycle hooks (`init_()`, `lazyInit_()`, `onVisible_()`) run after a macrotask so the DOM is always settled; visibility hooks fire only when the element is actually visible
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

  protected async init_(): Promise<void> {
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

> **Tip:** `init_()` is optional. If you only need `@on` decorators or visibility hooks, you don't have to define it at all.

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
       ├─ init_()?       ← optional — runs once (setup, event listeners)
       ├─ lazyInit_()?   ← optional — runs once, when element first enters viewport
       └─ onVisible_()?  ← optional — runs every time element enters viewport
```

The macrotask delay ensures the full DOM subtree is painted and settled before your directive runs — no race conditions with sibling elements or CSS.

All three hooks are **optional**. You only define the ones you need — a directive that only uses `@on` decorators doesn't need any hook at all.

---

## Visibility Hooks

`DirectiveBase` provides two optional lifecycle hooks for viewport-aware behavior. Both are powered by `IntersectionObserver` and include automatic cleanup on `destroy()`.

### `lazyInit_()`

Runs **exactly once** — the first time the element enters the viewport. Ideal for expensive one-time operations you want to defer until the element is actually visible.

**Fallback chain** (when `IntersectionObserver` is unavailable):

1. `IntersectionObserver` — fires on first intersection, then disconnects
2. `requestIdleCallback` — schedules execution during browser idle time
3. `setTimeout(100ms)` — last resort for environments with neither API

```typescript
@directive('product-image')
class ProductImageDirective extends DirectiveBase {
  protected init_(): void {
    this.element_.classList.add('loading-skeleton');
  }

  protected async lazyInit_(): Promise<void> {
    // Only runs once, when the image scrolls into view
    const img = this.element_.querySelector('img')!;
    img.src = img.dataset['src']!;
    await img.decode();
    this.element_.classList.remove('loading-skeleton');
  }
}
```

```html
<div product-image="product-123">
  <img data-src="https://cdn.example.com/product-123.jpg" />
</div>
```

### `onVisible_()`

Runs **every time** the element enters the viewport. Ideal for impression tracking, restarting animations, or refreshing dynamic data on each appearance.

**Fallback** (when `IntersectionObserver` is unavailable): `onVisible_()` is called once immediately at setup time, so critical visibility logic is never silently skipped.

```typescript
@directive('track-impression')
class ImpressionTrackerDirective extends DirectiveBase {
  protected onVisible_(): void {
    // Fires each time this element scrolls into view
    analytics.trackImpression(this.attributeValue);
  }
}
```

```html
<div track-impression="banner-hero">...</div>
```

### Using both hooks together

```typescript
@directive('product-card')
class ProductCardDirective extends DirectiveBase {
  // Runs once at setup — attach event listeners
  protected init_(): void {
    this.element_.addEventListener('click', () => this.handleClick_());
  }

  // Runs once when card first scrolls into view — fetch data
  protected async lazyInit_(): Promise<void> {
    const data = await fetchProductData(this.attributeValue);
    this.element_.querySelector('.price')!.textContent = data.price;
  }

  // Runs every time card scrolls into view — track impressions
  protected onVisible_(): void {
    analytics.trackImpression(this.attributeValue);
  }

  private handleClick_() {
    /* ... */
  }
}
```

### Cleanup & `destroy()`

Both hooks register their `IntersectionObserver` in `destroyHookList__` automatically. When `destroy()` is called:

- The `lazyInit_` observer is disconnected — if the element hasn't entered the viewport yet, `lazyInit_()` will **not** run.
- The `onVisible_` observer is disconnected — `onVisible_()` will **not** fire after destruction.

No manual cleanup is needed. No memory leaks.

### Hook comparison

|                    | `init_()?`             | `lazyInit_()?`                      | `onVisible_()?`                        |
| ------------------ | ---------------------- | ----------------------------------- | -------------------------------------- |
| **When**           | After next macrotask   | First viewport entry                | Every viewport entry                   |
| **Times**          | Once                   | Once                                | Unlimited                              |
| **Good for**       | Event listeners, setup | Lazy loading, data fetch            | Impression tracking, animation restart |
| **Auto cleanup**   | —                      | ✅ observer disconnected on destroy | ✅ observer disconnected on destroy    |
| **Error handling** | —                      | ✅ logged, never re-thrown          | ✅ logged, never re-thrown             |

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

### `@on(eventType, selector?, options?)`

Registers a DOM event listener on `this.element_` (or a matching child element) and automatically removes it when the directive is destroyed — no manual `addEventListener` / `removeEventListener` needed.

```typescript
@directive('my-form')
class MyFormDirective extends DirectiveBase {
  // Basic: listen on this.element_
  @on('click')
  protected onClick_(event: Event): void {
    console.log('clicked', event);
  }

  // Selector-based: listen on a child element
  @on('input', '.search-input')
  protected onInput_(event: Event): void {
    console.log('input', (event.target as HTMLInputElement).value);
  }

  // With options (e.g. passive scroll listener)
  @on('scroll', undefined, {passive: true})
  protected onScroll_(event: Event): void {
    /* ... */
  }
}
```

The listener is bound to the directive instance, so `this` inside the method always refers to the directive. Cleanup is registered automatically via `addDestroyHook` — when `destroy()` is called, all `@on` listeners are removed.

Since `init_()` is optional, a directive that only uses `@on` decorators doesn't need to define any lifecycle hook:

```typescript
@directive('close-dialog')
class CloseDialogDirective extends DirectiveBase {
  @on('click')
  protected onClick_(): void {
    this.element_.closest('dialog')?.close();
  }
}
```

> **Warning:** If `selector` is provided but `this.element_.querySelector(selector)` returns `null`, a warning is logged and the listener is silently skipped — no error is thrown.

---

## Full API Reference

### `directive(attributeName: string)`

Class decorator. Registers the decorated class in the global directive registry.

- `attributeName` — the HTML attribute that activates this directive (e.g. `'show-tooltip'`)
- Throws if used on a non-class target
- Logs a warning and skips silently if the same attribute name is registered twice

---

### `DirectiveBase` (abstract class)

| Member                     | Type                             | Description                                                        |
| -------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `attributeName`            | `readonly string`                | The attribute name this directive is bound to                      |
| `attributeValue`           | `readonly string`                | The value of the attribute at construction time                    |
| `index`                    | `readonly number`                | Per-attribute instance counter (0, 1, 2, …)                        |
| `element_`                 | `protected readonly HTMLElement` | The bound DOM element                                              |
| `logger_`                  | `protected readonly`             | Scoped logger: `directive:{attributeName}/{index}`                 |
| `init_()?`                 | `protected`                      | Optional — runs once after next macrotask (setup, event listeners) |
| `lazyInit_()?`             | `protected`                      | Optional — runs once when element first enters the viewport        |
| `onVisible_()?`            | `protected`                      | Optional — runs every time element enters the viewport             |
| `dispatch(event, detail?)` | `public`                         | Fires a bubbling `CustomEvent` from `element_`                     |
| `addDestroyHook(task)`     | `public`                         | Registers an async cleanup callback                                |
| `destroy()`                | `public async`                   | Runs all destroy hooks, then nullifies `element_`                  |
| `autoDestroy()`            | `public`                         | Destroys if element is disconnected; returns `true` if destroyed   |

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

### `on(eventType, selector?, options?)`

Method decorator. Registers a DOM event listener and removes it automatically on `destroy()`.

- `eventType` — `keyof HTMLElementEventMap | string` — the event to listen for (e.g. `'click'`, `'input'`)
- `selector` — optional CSS selector; when provided, the listener is registered on `this.element_.querySelector(selector)` instead of `this.element_`
- `options` — optional `AddEventListenerOptions | boolean` passed directly to `addEventListener`
- The decorated method is bound to the directive instance (`this` is always the directive)
- When `selector` is provided but matches no element, a warning is logged and registration is skipped silently
- Throws if applied to a non-method class member

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
