# 🌊 Alwatr Flux

**The Ultimate Unidirectional Data Flow Architecture for Modern Web Applications**

[![npm version](https://img.shields.io/npm/v/@alwatr/flux?color=0c7bbd&label=%40alwatr%2Fflux)](https://www.npmjs.com/package/@alwatr/flux)
[![license](https://img.shields.io/github/license/Alwatr/alwatr?color=0c7bbd)](https://github.com/Alwatr/alwatr/blob/next/LICENSE)

> A powerful, lightning-fast, zero-dependency reactive architecture bundle that brings together signals, actions, directives, and client-side storage into a cohesive, production-ready system for building scalable Progressive Web Applications.

---

## 🎯 What is Alwatr Flux?

`@alwatr/flux` is not just another state management library — it's a **complete architectural framework** that implements the **Unidirectional Data Flow (UDF)** pattern with unprecedented performance and developer experience.

Born from years of building production PWAs and inspired by the best ideas from React, Qwik, Solid.js, and Svelte, Flux combines:

- **Fine-grained reactivity** via Signals (no Virtual DOM overhead)
- **Global event delegation** for O(1) boot time (inspired by Qwik's Resumability)
- **Declarative DOM directives** for clean, maintainable UI code
- **Type-safe action bus** with zero runtime overhead
- **Persistent state management** with automatic localStorage/sessionStorage sync

All in a **tree-shakeable, ESM-only** package that adds **less than 15KB** to your production bundle.

---

## 🧠 Core Philosophy

Alwatr Flux is built on three fundamental engineering principles:

### 1. **Strict Unidirectional Data Flow**

Data flows in **one direction only**: `View → Action → Controller → State → View`

- **Views** never manipulate state directly
- **Controllers** never touch the DOM
- **State** is the single source of truth
- **Actions** are the only way to request changes

This creates a **zero-coupling architecture** where every layer is independently testable and replaceable.

### 2. **Simplicity Over Cleverness (KISS & YAGNI)**

Instead of heavy Virtual DOM reconciliation, we use:

- **`lit-html`** for efficient, lazy template rendering
- **Signals** for surgical, fine-grained reactivity
- **Global delegation** for O(1) event listener registration

No magic. No hidden re-renders. No performance cliffs.

### 3. **Absolute Type Safety**

Through TypeScript's **Declaration Merging**, the entire action bus is fully typed:

```typescript
// Define your actions once
declare module '@alwatr/flux' {
  interface ActionRecord {
    add_to_cart: {productId: number; qty: number};
    open_drawer: 'menu' | 'settings';
    logout: void;
  }
}

// Get compile-time safety everywhere
onAction('add_to_cart', (item) => {
  // item is typed as {productId: number; qty: number}
  cartService.add(item.productId, item.qty);
});

dispatchAction('add_to_cart', {productId: 42, qty: 1}); // ✅
dispatchAction('add_to_cart', 'wrong'); // ❌ Compile error
```

---

## ✨ Key Features

### ⚡ **O(1) Event Delegation**

Inspired by Qwik's Resumability, Flux uses **global event delegation** to eliminate per-element listeners:

- **One listener per event type** on `document.body` (not N listeners for N elements)
- **Zero boot-time cost** — works instantly with server-rendered HTML
- **Automatic support for dynamic content** — elements added after page load work immediately
- **Memory usage near zero** — no listener references to track

**Result:** 100 buttons = 1 listener. 10,000 buttons = still 1 listener.

### 🎯 **Fine-Grained Reactivity**

Signals provide **surgical updates** without Virtual DOM diffing:

```typescript
import {createStateSignal, createComputedSignal, createEffect} from '@alwatr/flux';

// State
const firstName = createStateSignal({name: 'firstName', initialValue: 'Ali'});
const lastName = createStateSignal({name: 'lastName', initialValue: 'Mihandoost'});

// Computed (memoized, only recalculates when deps change)
const fullName = createComputedSignal({
  name: 'fullName',
  deps: [firstName, lastName],
  get: () => `${firstName.get()} ${lastName.get()}`,
});

// Effect (side-effect that runs when deps change)
createEffect({
  name: 'log-name',
  deps: [fullName],
  run: () => console.log(`Name: ${fullName.get()}`),
  runImmediately: true,
});

lastName.set('Smith'); // Only fullName and the effect re-run — nothing else
```

### 🧩 **Declarative HTML Syntax**

Connect DOM events to typed actions without writing JavaScript:

```html
<!-- Simple action -->
<button on-click="open_drawer:menu">Menu</button>

<!-- Dynamic payload from input value -->
<input
  on-input="search_query:$value"
  placeholder="Search..."
/>

<!-- Form submission with validation -->
<form
  on-submit="submit_form:$formdata; prevent,validate"
  novalidate
>
  <input
    name="email"
    type="email"
    required
  />
  <button type="submit">Submit</button>
</form>

<!-- Checkbox state -->
<input
  type="checkbox"
  on-change="toggle_feature:$checked"
/>

<!-- Fire once and remove -->
<button on-click="track_impression:hero_banner; once">Learn More</button>
```

**Built-in modifiers:**

- `prevent` — calls `event.preventDefault()`
- `stop` — calls `event.stopPropagation()`
- `validate` — checks form validity before dispatch
- `once` — removes attribute after first fire

**Built-in payload resolvers:**

- `:$value` — reads `element.value`
- `:$formdata` — serializes nearest `<form>` to object
- `:$checked` — reads checkbox/radio state

### 🎨 **Attribute-Based Directives**

Attach TypeScript classes to DOM elements declaratively:

```typescript
import {Directive, directive} from '@alwatr/flux';

@directive('tooltip')
export class TooltipDirective extends Directive {
  protected init_(): void {
    // this.element_ is the DOM element
    // this.attributeValue is the attribute value
    this.element_.title = this.attributeValue;

    this.on_('mouseenter', this.show_);
    this.on_('mouseleave', this.hide_);
  }

  private show_(): void {
    console.log('Showing tooltip:', this.attributeValue);
  }

  private hide_(): void {
    console.log('Hiding tooltip');
  }
}
```

```html
<button tooltip="Save your changes">Save</button>
```

**Lifecycle hooks:**

- `init_()` — runs once after element is connected
- `lazyInit_()` — runs once when element enters viewport (lazy loading)
- `onVisible_()` — runs every time element enters viewport (impression tracking)
- `onHidden_()` — runs every time element leaves viewport (pause/cleanup)

### 💾 **Persistent State Management**

Signals that automatically sync with browser storage:

```typescript
import {PersistentStateSignal, SessionStateSignal} from '@alwatr/flux';

// Persists across browser sessions
const userPrefs = new PersistentStateSignal({
  name: 'user-preferences',
  schemaVersion: 1,
  initialValue: {theme: 'light', lang: 'en'},
  saveDebounceDelay: 500, // Debounce writes to avoid thrashing
});

// Persists only for current tab session
const formDraft = new SessionStateSignal({
  name: 'contact-form-draft',
  schemaVersion: 1,
  initialValue: {name: '', email: '', message: ''},
});

// Use like any other signal
userPrefs.set({theme: 'dark', lang: 'fa'});
console.log(userPrefs.get()); // {theme: 'dark', lang: 'fa'}

// Automatically saved to localStorage with debouncing
// Automatically loaded on next page load
```

**Features:**

- **Automatic versioning** — old schema versions are auto-cleared
- **Debounced writes** — prevents localStorage thrashing
- **Type-safe** — full TypeScript support
- **Migration-friendly** — bump `schemaVersion` to reset storage

### 📄 **Page-Ready Signal for MPA**

Lightweight page identity system for Multi-Page Applications:

```html
<body page-id="home">
  <!-- Your content -->
</body>
```

```typescript
import {onPageReady, subscribePageReady, dispatchPageReady} from '@alwatr/flux';

// Subscribe to specific page
onPageReady('home', () => {
  console.log('Home page is ready');
  initHomePage();
});

// Subscribe to all pages
subscribePageReady((pageId) => {
  analytics.trackPageView(pageId);
});

// Call once at bootstrap
dispatchPageReady(); // Reads [page-id] attribute and notifies subscribers
```

### 🔄 **Signal Operators**

Transform signals with functional operators:

```typescript
import {createStateSignal, createDebouncedSignal, createFilteredSignal, createMappedSignal} from '@alwatr/flux';

const searchInput = createStateSignal({name: 'search', initialValue: ''});

// Debounce (wait 300ms after user stops typing)
const debouncedSearch = createDebouncedSignal(searchInput, {delay: 300});

// Filter (only emit non-empty values)
const validSearch = createFilteredSignal(debouncedSearch, {
  filter: (value) => value.trim().length > 0,
});

// Map (transform to API query)
const searchQuery = createMappedSignal(validSearch, {
  map: (value) => ({q: value, limit: 10}),
});

// React to final query
createEffect({
  deps: [searchQuery],
  run: () => fetchResults(searchQuery.get()),
});
```

---

## 🏗️ Architecture Overview

Flux implements a **strict layered architecture** where each layer has a single responsibility:

```
┌─────────────────────────────────────────────────────────────┐
│                         VIEW LAYER                          │
│  (HTML templates, Directives, lit-html rendering)           │
│                                                              │
│  • Reads state from Signals                                 │
│  • Dispatches Actions via on-<event> attributes            │
│  • Never manipulates state directly                         │
└──────────────────┬──────────────────────────────────────────┘
                   │ on-click="add_to_cart:42"
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                       ACTION LAYER                          │
│  (@alwatr/action — Global Event Delegation)                 │
│                                                              │
│  • Captures DOM events via document.body listener           │
│  • Parses on-<event> attributes                            │
│  • Runs modifiers (prevent, validate, once)                 │
│  • Resolves payload ($value, $formdata)                     │
│  • Dispatches typed action to ChannelSignal                 │
└──────────────────┬──────────────────────────────────────────┘
                   │ dispatchAction('add_to_cart', 42)
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                     CONTROLLER LAYER                        │
│  (Business Logic, Services, Use Cases)                      │
│                                                              │
│  • Subscribes to Actions via onAction()                     │
│  • Executes business logic                                  │
│  • Updates State via Signal.set()                           │
│  • Never touches DOM directly                               │
└──────────────────┬──────────────────────────────────────────┘
                   │ cartSignal.set(newCart)
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                        STATE LAYER                          │
│  (@alwatr/signal — Reactive State Management)               │
│                                                              │
│  • StateSignal — mutable state                              │
│  • ComputedSignal — derived state (memoized)                │
│  • EffectSignal — side effects                              │
│  • PersistentStateSignal — localStorage sync                │
│  • SessionStateSignal — sessionStorage sync                 │
└──────────────────┬──────────────────────────────────────────┘
                   │ signal.subscribe(render)
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                         VIEW LAYER                          │
│  (Re-render only affected DOM nodes)                        │
└─────────────────────────────────────────────────────────────┘
```

**Key architectural benefits:**

- **Zero coupling** — layers communicate only through well-defined interfaces
- **Testability** — each layer can be tested in isolation
- **Scalability** — add features without touching existing code
- **Predictability** — data flows in one direction only
- **Performance** — fine-grained updates, no full-tree reconciliation

---

## 📦 Installation

```bash
# npm
npm install @alwatr/flux

# yarn
yarn add @alwatr/flux

# pnpm
pnpm add @alwatr/flux

# bun
bun add @alwatr/flux
```

**Zero dependencies.** Everything you need is included.

---

## 🚀 Quick Start

### 1. Bootstrap the Application

```typescript
import {setupActionDelegation, dispatchPageReady} from '@alwatr/flux';

// Activate global event delegation (call once at app start)
setupActionDelegation();

// Dispatch page-ready signal (for MPA routing)
dispatchPageReady();
```

### 2. Define Your Actions (Type Safety)

```typescript
// src/actions.ts
declare module '@alwatr/flux' {
  interface ActionRecord {
    increment: void;
    decrement: void;
    set_count: number;
  }
}
```

### 3. Create State

```typescript
// src/state.ts
import {createStateSignal} from '@alwatr/flux';

export const counterSignal = createStateSignal({
  name: 'counter',
  initialValue: 0,
});
```

### 4. Wire Up Controllers

```typescript
// src/controllers.ts
import {onAction} from '@alwatr/flux';
import {counterSignal} from './state.js';

onAction('increment', () => {
  counterSignal.update((count) => count + 1);
});

onAction('decrement', () => {
  counterSignal.update((count) => count - 1);
});

onAction('set_count', (value) => {
  counterSignal.set(value);
});
```

### 5. Build the View

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="app">
      <h1>
        Counter:
        <span id="count">0</span>
      </h1>
      <button on-click="decrement">-</button>
      <button on-click="increment">+</button>
      <input
        type="number"
        on-input="set_count:$value"
        value="0"
      />
    </div>

    <script
      type="module"
      src="./main.js"
    ></script>
  </body>
</html>
```

```typescript
// main.js
import {setupActionDelegation} from '@alwatr/flux';
import {counterSignal} from './state.js';
import './controllers.js'; // Register action handlers

setupActionDelegation();

// Subscribe to state changes and update DOM
counterSignal.subscribe((count) => {
  document.getElementById('count').textContent = count;
});
```

**That's it!** You now have a fully reactive, type-safe counter with:

- ✅ Zero boilerplate
- ✅ Compile-time type safety
- ✅ O(1) event handling
- ✅ Fine-grained reactivity

---

## 📚 Complete API Reference

### Signals

#### `createStateSignal<T>(config)`

Creates a mutable state signal.

```typescript
const count = createStateSignal({
  name: 'count',
  initialValue: 0,
});

count.get(); // 0
count.set(1);
count.update((n) => n + 1);
count.subscribe((value) => console.log(value));
```

#### `createEventSignal<T>(config)`

Creates a stateless event signal (no value, only notifications).

```typescript
const onClick = createEventSignal({name: 'click'});

onClick.subscribe(() => console.log('Clicked!'));
onClick.dispatch(); // Notify all subscribers
```

#### `createComputedSignal<T>(config)`

Creates a derived signal (memoized, recalculates only when deps change).

```typescript
const fullName = createComputedSignal({
  name: 'fullName',
  deps: [firstName, lastName],
  get: () => `${firstName.get()} ${lastName.get()}`,
});

// IMPORTANT: Must call destroy() when done
fullName.destroy();
```

#### `createEffect(config)`

Runs side effects when dependencies change.

```typescript
const effect = createEffect({
  name: 'logger',
  deps: [count],
  run: () => console.log('Count:', count.get()),
  runImmediately: true,
});

// IMPORTANT: Must call destroy() when done
effect.destroy();
```

#### `PersistentStateSignal<T>` / `SessionStateSignal<T>`

State signals that sync with browser storage.

```typescript
const prefs = new PersistentStateSignal({
  name: 'user-prefs',
  schemaVersion: 1,
  initialValue: {theme: 'light'},
  saveDebounceDelay: 500,
});

prefs.set({theme: 'dark'}); // Auto-saved to localStorage
prefs.remove(); // Clear from storage
```

#### Signal Operators

```typescript
// Debounce
const debounced = createDebouncedSignal(source, {delay: 300});

// Filter
const filtered = createFilteredSignal(source, {
  filter: (value) => value > 0,
});

// Map
const mapped = createMappedSignal(source, {
  map: (value) => value * 2,
});
```

---

### Actions

#### `setupActionDelegation(eventTypes?)`

Activates global event delegation. Call once at app bootstrap.

```typescript
import {setupActionDelegation, DEFAULT_DELEGATED_EVENTS} from '@alwatr/flux';

// Use defaults (click, submit, input, change)
setupActionDelegation();

// Or add custom events
setupActionDelegation([...DEFAULT_DELEGATED_EVENTS, 'keydown', 'focus']);
```

#### `onAction<K>(actionId, handler)`

Subscribes to a typed action.

```typescript
const sub = onAction('add_to_cart', (item) => {
  cartService.add(item.productId, item.qty);
});

sub.unsubscribe(); // Clean up when done
```

#### `dispatchAction<K>(actionId, payload?)`

Dispatches a typed action programmatically.

```typescript
dispatchAction('navigate', '/home');
dispatchAction('logout'); // void payload
```

#### `registerModifier(name, handler)`

Adds a custom modifier for `on-<event>` attributes.

```typescript
registerModifier('confirm', () => {
  return window.confirm('Are you sure?');
});
```

```html
<button on-click="delete_item:42; confirm">Delete</button>
```

#### `registerPayloadResolver(name, resolver)`

Adds a custom payload resolver.

```typescript
registerPayloadResolver('$data-id', (_event, element) => {
  return element.dataset.id;
});
```

```html
<button
  on-click="select:$data-id"
  data-id="42"
>
  Select
</button>
```

---

### Directives

#### `@directive(name)` / `lazyDirective(name, Class)`

Registers a directive class.

```typescript
import {Directive, directive} from '@alwatr/flux';

// Eager registration (side effect at import)
@directive('my-directive')
export class MyDirective extends Directive {
  protected init_(): void {
    console.log('Element:', this.element_);
    console.log('Attribute value:', this.attributeValue);
  }
}

// Lazy registration (tree-shakeable)
export class MyDirective extends Directive {
  /* ... */
}
export const registerMyDirective = lazyDirective('my-directive', MyDirective);

// In consumer code:
registerMyDirective();
bootstrapDirectives();
```

#### `bootstrapDirectives()`

Scans the DOM and instantiates all registered directives.

```typescript
import {bootstrapDirectives} from '@alwatr/flux';

bootstrapDirectives(); // Call after DOM is ready
```

#### Directive Lifecycle

```typescript
class MyDirective extends Directive {
  // Runs once after element is connected
  protected init_(): void {}

  // Runs once when element enters viewport (lazy loading)
  protected lazyInit_(): void {}

  // Runs every time element enters viewport
  protected onVisible_(): void {}

  // Runs every time element leaves viewport
  protected onHidden_(): void {}
}
```

#### Directive Utility Decorators

```typescript
import {Directive, directive, query, queryAll, attribute, on} from '@alwatr/flux';

@directive('my-form')
class FormDirective extends Directive {
  @query('.submit-btn')
  accessor submitBtn!: HTMLButtonElement | null;

  @queryAll('input')
  accessor inputs!: NodeListOf<HTMLInputElement>;

  @attribute('data-form-id')
  accessor formId!: string | null;

  protected init_(): void {
    this.on_('submit', this.handleSubmit_);
  }

  private handleSubmit_(event: Event): void {
    event.preventDefault();
    console.log('Form submitted:', this.formId);
  }
}
```

---

### Page Ready

#### `onPageReady(pageId, handler)`

Subscribes to a specific page becoming ready.

```typescript
onPageReady('home', () => {
  console.log('Home page ready');
});
```

#### `subscribePageReady(handler)`

Subscribes to all page-ready events.

```typescript
subscribePageReady((pageId) => {
  analytics.trackPageView(pageId);
});
```

#### `dispatchPageReady()`

Reads `[page-id]` attribute and notifies subscribers.

```typescript
dispatchPageReady(); // Call once at bootstrap
```

---

### Storage

#### `createLocalStorageProvider<T>(config)`

Creates a versioned localStorage provider.

```typescript
import {createLocalStorageProvider} from '@alwatr/flux';

const storage = createLocalStorageProvider({
  name: 'user-data',
  schemaVersion: 1,
});

storage.write({name: 'Ali', age: 30});
const data = storage.read(); // {name: 'Ali', age: 30} | null
storage.has(); // true
storage.remove();
```

#### `createSessionStorageProvider<T>(config)`

Same as `createLocalStorageProvider` but uses `sessionStorage`.

---

### Render State

#### `renderState<R, T>(state, renderRecord, thisArg?)`

Utility for state-based rendering (useful with FSM).

```typescript
import {renderState} from '@alwatr/flux';

const currentState = 'loading';

renderState(currentState, {
  idle: () => html`
    <p>Ready</p>
  `,
  loading: () => html`
    <p>Loading...</p>
  `,
  success: () => html`
    <p>Success!</p>
  `,
  error: () => html`
    <p>Error!</p>
  `,
  _default: 'idle', // Fallback
});
```

---

## 🆚 Why Choose Alwatr Flux?

| Feature                | React + Redux            | Solid.js        | Svelte                   | **Alwatr Flux** 🌊                 |
| ---------------------- | ------------------------ | --------------- | ------------------------ | ---------------------------------- |
| **Boot Time**          | High (hydration)         | Medium          | Medium                   | **Near-zero** (global delegation)  |
| **Re-renders**         | Common (needs `useMemo`) | Rare            | Rare                     | **Never** (fine-grained signals)   |
| **Component Coupling** | Prop drilling / Context  | Props / Context | Props / Stores           | **Zero** (action bus)              |
| **Bundle Size**        | Large (~45KB)            | Medium (~7KB)   | Medium (~2KB + compiler) | **Small (~15KB)**                  |
| **Type Safety**        | Partial                  | Good            | Good                     | **Absolute** (declaration merging) |
| **Learning Curve**     | Steep                    | Medium          | Easy                     | **Easy** (familiar patterns)       |
| **SSR/SSG Support**    | Complex                  | Good            | Good                     | **Excellent** (resumable)          |
| **Dynamic Content**    | Needs re-hydration       | Works           | Works                    | **Works instantly**                |

---

## 🎓 Real-World Example: Todo App

```typescript
// actions.ts
declare module '@alwatr/flux' {
  interface ActionRecord {
    'add_todo': string;
    'toggle_todo': number;
    'remove_todo': number;
  }
}

// state.ts
import {createStateSignal} from '@alwatr/flux';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const todosSignal = createStateSignal<Todo[]>({
  name: 'todos',
  initialValue: [],
});

// controllers.ts
import {onAction} from '@alwatr/flux';
import {todosSignal} from './state.js';

let nextId = 1;

onAction('add_todo', (text) => {
  todosSignal.update((todos) => [
    ...todos,
    {id: nextId++, text, done: false},
  ]);
});

onAction('toggle_todo', (id) => {
  todosSignal.update((todos) =>
    todos.map((todo) =>
      todo.id === id ? {...todo, done: !todo.done} : todo
    )
  );
});

onAction('remove_todo', (id) => {
  todosSignal.update((todos) => todos.filter((t) => t.id !== id));
});

// view.html
<div id="app">
  <input id="new-todo" on-input="add_todo:$value" placeholder="What needs to be done?" />
  <ul id="todo-list"></ul>
</div>

// main.ts
import {setupActionDelegation, html, render} from '@alwatr/flux';
import {todosSignal} from './state.js';
import './controllers.js';

setupActionDelegation();

todosSignal.subscribe((todos) => {
  render(
    html`
      ${todos.map((todo) => html`
        <li>
          <input
            type="checkbox"
            .checked=${todo.done}
            on-change="toggle_todo:${todo.id}"
          />
          <span style="${todo.done ? 'text-decoration: line-through' : ''}">${todo.text}</span>
          <button on-click="remove_todo:${todo.id}">×</button>
        </li>
      `)}
    `,
    document.getElementById('todo-list')
  );
});
```

---

## 🏛️ Part of the Alwatr Ecosystem

`@alwatr/flux` is the **UI layer** of the Alwatr Developer Kit — a complete monorepo of nano-packages for building production-grade TypeScript applications.

**Other packages in the ecosystem:**

- **[@alwatr/signal](https://github.com/Alwatr/alwatr/tree/next/pkg/nanolib/signal)** — Fine-grained reactive signals (part of Flux)
- **[@alwatr/action](https://github.com/Alwatr/alwatr/tree/next/pkg/nanolib/action)** — Global event delegation action bus (part of Flux)
- **[@alwatr/directive](https://github.com/Alwatr/alwatr/tree/next/pkg/nanolib/directive)** — Attribute-based DOM directives (part of Flux)
- **[@alwatr/fsm](https://github.com/Alwatr/alwatr/tree/next/pkg/fsm)** — Type-safe Finite State Machine
- **[@alwatr/nanotron](https://github.com/Alwatr/alwatr/tree/next/pkg/nanotron)** — Lightweight API server framework
- **[@alwatr/nitrobase](https://github.com/Alwatr/alwatr/tree/next/pkg/nitrobase)** — In-memory JSON database
- **[@alwatr/fetch](https://github.com/Alwatr/alwatr/tree/next/pkg/nanolib/fetch)** — Enhanced fetch with retry, cache, deduplication
- **[@alwatr/logger](https://github.com/Alwatr/alwatr/tree/next/pkg/nanolib/logger)** — Scoped, debug-strippable logger

All packages follow the **nano-package principle**: small, focused, zero-dependency, tree-shakeable.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/Alwatr/alwatr/blob/next/CONTRIBUTING.md).

**Ways to contribute:**

- 🐛 Report bugs
- 💡 Suggest features
- 📖 Improve documentation
- 🔧 Submit pull requests

---

## 📄 License

[MPL-2.0](https://github.com/Alwatr/alwatr/blob/next/LICENSE) © [S. Ali Mihandoost](https://ali.mihandoost.com)

---

## 🔗 Links

- **GitHub:** [github.com/Alwatr/alwatr](https://github.com/Alwatr/alwatr)
- **npm:** [@alwatr/flux](https://www.npmjs.com/package/@alwatr/flux)
- **Documentation:** [github.com/Alwatr/alwatr/tree/next/pkg/flux](https://github.com/Alwatr/alwatr/tree/next/pkg/flux)
- **Issues:** [github.com/Alwatr/alwatr/issues](https://github.com/Alwatr/alwatr/issues)

---

<div align="center">

**Built with ❤️ by the Alwatr team**

_Making web development fast, simple, and enjoyable_

</div>
