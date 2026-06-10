# `@alwatr/lazy`

A generic, memory-efficient **lazy evaluation** wrapper for TypeScript/ESM projects.

Defers execution of an expensive initializer until the value is first accessed, caches the result permanently, and immediately releases the initializer closure so the garbage collector can reclaim any captured memory.

---

## Why This Package Exists

Modern JavaScript applications — especially SPAs and micro-frontends — suffer from **main-thread congestion at boot time**. Every module that eagerly instantiates services, parses configs, or opens connections adds to the critical path before the first frame is painted.

The standard solution is _lazy initialization_: defer work until it is actually needed. But rolling this pattern by hand every time leads to repetitive boilerplate:

```ts
// ❌ Repeated boilerplate — error-prone and verbose
let _db: DatabaseConnection | undefined;
function getDb() {
  if (!_db) _db = new DatabaseConnection(config);
  return _db;
}
```

`@alwatr/lazy` encapsulates this pattern in a single, type-safe, zero-dependency class that also handles an important detail most hand-rolled versions miss: **freeing the initializer closure after first use**.

### The GC Optimization

When you write `new Lazy(() => new ExpensiveService(config))`, the arrow function captures `config` (and potentially much more) in its closure. Once the service is created, that closure is dead weight — but it stays alive as long as the `Lazy` instance holds a reference to it.

`@alwatr/lazy` solves this by using `delete this.initializer__` (not just `= undefined`) after the first access. This removes the property from the object's hidden class, giving V8 a strong signal to release the closure and everything it captured.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Lazy<T>                          │
│                                                     │
│  constructor(initializer: () => T)                  │
│    └─ stores initializer__ reference                │
│                                                     │
│  get instance(): T                                  │
│    ├─ [first access]                                │
│    │    1. call initializer__()                     │
│    │    2. cache result in instance__               │
│    │    3. delete initializer__  ← GC hint          │
│    │    4. return instance__                        │
│    └─ [subsequent accesses]                         │
│         return instance__  (O(1), no function call) │
│                                                     │
│  isInitialized(): boolean                           │
│    └─ initializer__ === undefined                   │
└─────────────────────────────────────────────────────┘
```

**State machine:**

```
  [constructed]
       │
       │  first .instance access
       ▼
  [initializing]  ──→  initializer__() runs
       │
       │  result cached, initializer__ deleted
       ▼
  [initialized]   ──→  all subsequent .instance reads return cache
```

---

## Installation

```sh
bun add @alwatr/lazy
# or
npm install @alwatr/lazy
```

---

## Usage

### Class API

```ts
import {Lazy} from '@alwatr/lazy';

// The DatabaseConnection is NOT created here.
const db = new Lazy(() => new DatabaseConnection(config));

console.log(db.isInitialized()); // false

// Created on first access, cached for all future accesses.
const connection = db.instance; // DatabaseConnection instantiated here
console.log(db.isInitialized()); // true
console.log(db.instance === connection); // true — same reference
```

### Factory Function (preferred)

The `lazy()` factory function is preferred over `new Lazy(...)` because TypeScript
infers `T` from the initializer's return type without requiring an explicit type parameter.

```ts
import {lazy} from '@alwatr/lazy';

const config = lazy(() => loadAndParseConfig('./config.json'));
// T is inferred as the return type of loadAndParseConfig — no annotation needed.
```

### Conditional Initialization Guard

```ts
import {lazy} from '@alwatr/lazy';

const analyticsClient = lazy(() => new AnalyticsClient(apiKey));

function trackEvent(name: string) {
  if (!analyticsClient.isInitialized()) {
    // Analytics not yet started — skip silently during boot
    return;
  }
  analyticsClient.instance.track(name);
}
```

### Module-Level Singletons

A common pattern is to export a `Lazy`-wrapped singleton from a module. Consumers
pay zero initialization cost unless they actually use the service:

```ts
// services/database.ts
import {lazy} from '@alwatr/lazy';
import {DatabaseConnection} from './connection.js';

export const database = lazy(() => new DatabaseConnection(process.env.DB_URL!));
```

```ts
// routes/users.ts — only pays the init cost when this route is first hit
import {database} from '../services/database.js';

export async function getUsers() {
  return database.instance.query('SELECT * FROM users');
}
```

### With `@alwatr/signal` (Reactive Lazy)

Combine with `StateSignal` to initialize a service only when a signal is first subscribed to:

```ts
import {lazy} from '@alwatr/lazy';
import {StateSignal} from '@alwatr/signal';

const cartService = lazy(() => new CartService());

const cartSignal = new StateSignal<CartState>('cart', {items: []});

cartSignal.subscribe((state) => {
  // cartService is initialized on the first subscription, not at module load.
  cartService.instance.syncToStorage(state);
});
```

---

## API Reference

### `class Lazy<T>`

#### `constructor(initializer: () => T)`

Creates a new `Lazy` wrapper. The `initializer` is **not** called at this point.

#### `get instance(): T`

Returns the lazily-initialized value. Calls `initializer` on the first access,
caches the result, and deletes the initializer reference. All subsequent accesses
return the cached value in O(1) with no function call overhead.

#### `isInitialized(): boolean`

Returns `true` if the initializer has already been executed (i.e., `.instance` has
been accessed at least once). Returns `false` otherwise.

---

### `function lazy<T>(initializer: () => T): Lazy<T>`

Factory function. Equivalent to `new Lazy(initializer)` but with better type
inference — TypeScript derives `T` from the return type of `initializer` automatically.

---

## Design Decisions

| Decision                                               | Rationale                                                                                                                                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `delete this.initializer__` instead of `= undefined`   | Removes the property from the V8 hidden class, giving a stronger GC hint than a simple `undefined` assignment.                                                                                           |
| `instance__` uses `undefined` as sentinel (not `null`) | Allows `T` to be `null` without ambiguity — `lazy(() => null).instance` correctly returns `null`.                                                                                                        |
| No `reset()` method                                    | Lazy values are intended to be permanent singletons. A reset would reintroduce the initializer, complicating the GC story and the state machine. If you need resettable state, use `@alwatr/signal`.     |
| No async support                                       | Async initialization belongs in `@alwatr/flatomise` (deferred promises) or `@alwatr/signal` (reactive state). Mixing `Promise` into `Lazy` would complicate the synchronous `.instance` getter contract. |
| `sideEffects: false`                                   | The package has no module-level side effects, enabling full tree-shaking.                                                                                                                                |

---

## Relation to Other Packages

| Package             | When to use instead                                                          |
| ------------------- | ---------------------------------------------------------------------------- |
| `@alwatr/flatomise` | You need a **Promise** that can be resolved externally (async lazy).         |
| `@alwatr/signal`    | You need **reactive** state that notifies subscribers on change.             |
| `@alwatr/debounce`  | You need to **throttle** repeated function calls, not defer a one-time init. |

---

## License

[MPL-2.0](https://mozilla.org/MPL/2.0/) © [Alwatr](https://github.com/Alwatr)
