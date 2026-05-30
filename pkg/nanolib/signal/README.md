# Alwatr Signal

Alwatr Signal is a powerful, lightweight, and modern reactive programming library. It is inspired by the best concepts from major reactive libraries but engineered to be faster and more efficient than all of them. It provides a robust and elegant way to manage application state through a system of signals, offering fine-grained reactivity, predictability, and excellent performance.

It's designed to be simple to learn, yet capable of handling complex state management scenarios in browser and Bun/Node.js environments.

## Features

- **Type-Safe**: Fully implemented in TypeScript with strong types for every signal.
- **Lightweight**: Extremely small footprint with zero third-party dependencies.
- **Performant**: Smart change detection and batched updates prevent unnecessary computations and re-renders.
- **Predictable**: Asynchronous, non-blocking notifications ensure a consistent and understandable data flow.
- **Lifecycle Management**: Built-in `destroy()` methods for easy cleanup and memory leak prevention.
- **Easy to Debug**: Scoped logger for each signal makes logging and tracing a breeze.

---

## Primitives

There are five core types of signals available:

1. **`StateSignal<T>`**: The foundation of reactivity. It holds a mutable value. When you `set()` a new value, it notifies all its dependents.
2. **`EventSignal<T>`**: A stateless signal for dispatching transient, one-off events that don't have a persistent value (e.g. user clicks).
3. **`ComputedSignal<T>`**: A read-only signal that derives its value from other signals. It automatically updates when its dependencies change. The result is memoized, so the calculation only runs when needed.
4. **`EffectSignal`**: The bridge to the side-effects. It executes a function (like logging, DOM rendering, or API requests) in response to changes in the signals it depends on.
5. **`ChannelSignal<TMap>`**: A stateless, typed message bus. A single `ChannelSignal` carries multiple named message types — each with its own payload type — and routes them in **O(1)** to the right subscribers.

Additionally, two persistent state signals are available:

- **`PersistentStateSignal<T>`**: Extends `StateSignal` with automatic browser `localStorage` persistence, debounced writes, and full Back/Forward Cache (BFCache) lifecycle integration.
- **`SessionStateSignal<T>`**: Extends `StateSignal` with automatic browser `sessionStorage` persistence, debounced writes, and full BFCache lifecycle integration.

---

## API & Usage Examples

### 1. StateSignal

`StateSignal` represents a piece of mutable state. It always has a value, and new subscribers immediately receive the current value by default.

```typescript
import {StateSignal, createStateSignal} from '@alwatr/signal';

// Creation via factory function (preferred) or new class instance:
const counter = createStateSignal<number>({
  name: 'app-counter',
  initialValue: 0,
});

// Get the current value
console.log(counter.get()); // Outputs: 0

// Subscribe to changes
const subscription = counter.subscribe((value) => {
  console.log(`Counter updated to: ${value}`);
});

// Update value
counter.set(1); // Prints: "Counter updated to: 1"

// Update based on the previous value (functional state update)
counter.update((current) => current + 1); // Prints: "Counter updated to: 2"

// Unsubscribe when no longer needed
subscription.unsubscribe();
```

---

### 2. EventSignal

`EventSignal` is stateless and is used for dispatching transient events. Subscribers only get notified of future emissions.

```typescript
import {createEventSignal} from '@alwatr/signal';

const clickSignal = createEventSignal<{x: number; y: number}>({
  name: 'user-click',
});

// Subscribe to future click events
clickSignal.subscribe((pos) => {
  console.log(`Clicked at coordinates: ${pos.x}, ${pos.y}`);
});

// Dispatch event (runs asynchronously on a microtask)
clickSignal.dispatch({x: 150, y: 300});
```

---

### 3. ComputedSignal

`ComputedSignal` reactively calculates and memoizes a value based on upstream dependency signals. It automatically recalculates on changes and must be destroyed when no longer needed to prevent memory leaks.

```typescript
import {createStateSignal, createComputedSignal} from '@alwatr/signal';

const firstName = createStateSignal<string>({name: 'first-name', initialValue: 'John'});
const lastName = createStateSignal<string>({name: 'last-name', initialValue: 'Doe'});

const fullName = createComputedSignal<string>({
  name: 'full-name',
  deps: [firstName, lastName],
  get: () => `${firstName.get()} ${lastName.get()}`,
});

console.log(fullName.get()); // "John Doe"

// Triggers asynchronous evaluation batching (macrotask)
firstName.set('Jane');
// Later in the next macrotask tick:
console.log(fullName.get()); // "Jane Doe"

// Always destroy when done
fullName.destroy();
```

---

### 4. EffectSignal

`EffectSignal` runs side-effects in response to dependency changes. It batches changes and runs in a separate macrotask.

```typescript
import {createStateSignal, createEffect} from '@alwatr/signal';

const count = createStateSignal<number>({name: 'count', initialValue: 0});

const logEffect = createEffect({
  name: 'log-effect',
  deps: [count],
  run: () => {
    console.log(`The count changed to: ${count.get()}`);
  },
  runImmediately: true, // Run the effect once on creation
});

count.set(5);

// Always destroy to clean up dependency subscriptions
logEffect.destroy();
```

---

### 5. ChannelSignal: A Typed Message Bus

#### Why ChannelSignal?

In real-world applications, you often need to dispatch many different types of events or messages — for example, `'open-drawer'`, `'close-drawer'`, `'show-toast'`, `'navigate'`, etc. You could create a separate `EventSignal` for each one, but that quickly becomes unwieldy:

```typescript
// ❌ Verbose and hard to manage
const openDrawerSignal = new EventSignal<{panel: string}>({name: 'open-drawer'});
const closeDrawerSignal = new EventSignal({name: 'close-drawer'});
const showToastSignal = new EventSignal<{message: string; type: 'info' | 'error'}>({name: 'show-toast'});
// ... and so on for every action in your app
```

**`ChannelSignal` solves this problem.** It's a single signal that acts as a **typed message bus** — one channel, many named message types. Think of it as a Go-style channel or a pub/sub topic with full TypeScript type safety.

#### Architecture: O(1) Routing

Internally, `ChannelSignal` uses a `Map<name, Set<handler>>` to route messages. When you dispatch a message with name `'A'`, only the handlers registered for `'A'` are invoked — **O(1) lookup**, regardless of how many other names are subscribed. This is a critical performance optimization for applications with hundreds or thousands of directives/components listening to different actions.

#### Creating a ChannelSignal

First, define a **message map** — a TypeScript interface that maps every valid message name to its payload type:

```typescript
import {createChannelSignal} from '@alwatr/signal';

// Define the message map for your application
interface AppMessages {
  'open-drawer': {panel: string};
  'close-drawer': void; // no payload
  'show-toast': {message: string; type: 'info' | 'error'};
  'navigate': {path: string};
}

// Create the channel
const appChannel = createChannelSignal<AppMessages>({name: 'app-channel'});
```

#### Subscribing to Named Messages

Use `.on(name, handler)` to subscribe to a specific message. The handler receives the **payload directly** (not the full `{name, payload}` envelope) — since the name is already known at subscription time, passing it again would be redundant.

```typescript
// Subscribe to 'open-drawer' messages
appChannel.on('open-drawer', (payload) => {
  console.log(`Opening drawer: ${payload.panel}`);
  // TypeScript knows payload is {panel: string}
});

// Subscribe to 'show-toast' messages
appChannel.on('show-toast', (payload) => {
  toast.show(payload.message, payload.type);
  // TypeScript knows payload is {message: string; type: 'info' | 'error'}
});

// Subscribe to 'close-drawer' (no payload)
appChannel.on('close-drawer', () => {
  console.log('Closing drawer');
});
```

#### Dispatching Messages

Use `.dispatch(name, payload)` to send a message. TypeScript enforces that the payload matches the type declared for that name in the message map.

```typescript
// Dispatch with payload
appChannel.dispatch('open-drawer', {panel: 'settings'}); // ✅ Type-safe
appChannel.dispatch('show-toast', {message: 'Saved!', type: 'info'}); // ✅

// Dispatch without payload
appChannel.dispatch('close-drawer'); // ✅

// ❌ TypeScript errors:
appChannel.dispatch('open-drawer', {panel: 123}); // Error: panel must be string
appChannel.dispatch('show-toast', {message: 'Hi'}); // Error: missing 'type'
appChannel.dispatch('unknown-action'); // Error: 'unknown-action' is not in AppMessages
```

#### Unsubscribing

Just like other signals, `.on()` returns a `SubscribeResult` with an `unsubscribe()` method:

```typescript
const sub = appChannel.on('navigate', (payload) => {
  router.push(payload.path);
});

// Later, when the component is destroyed:
sub.unsubscribe();
```

#### One-Time Subscriptions

Use the `once` option to automatically unsubscribe after the first message:

```typescript
appChannel.on(
  'app-ready',
  () => {
    console.log('App initialized!');
  },
  {once: true},
);
```

#### Raw Stream Subscription (for Logging/Middleware)

If you need to observe **all** messages regardless of name — for example, for logging, analytics, or middleware — use `.subscribe()` instead of `.on()`. This receives the full `{name, payload}` envelope:

```typescript
// Log every message for debugging
appChannel.subscribe((msg) => {
  console.log(`[channel] ${String(msg.name)}`, msg.payload);
});
```

**Important:** `.subscribe()` is **not** filtered by name — it receives every message. For normal use cases, prefer `.on(name, handler)` to keep subscriptions focused and performant.

#### Use Cases

`ChannelSignal` is ideal for:

- **Action layers** in Unidirectional Data Flow architectures (like `@alwatr/action`)
- **Event buses** in component-based UIs (e.g., a global app event channel)
- **Command dispatching** in CQRS-style systems
- **Pub/sub messaging** where you have many distinct message types but want a single, centralized channel

#### Example: A Complete Action System

> **Note:** `@alwatr/action` is a higher-level package built on top of `ChannelSignal`. It adds declarative HTML attribute support (`on-action="click->add-to-cart:42"`), modifier chaining, payload resolvers, and DOM lifecycle management. For production use, prefer `@alwatr/action` over wiring `ChannelSignal` manually.

The example below shows what `@alwatr/action` does internally — and how you can use `ChannelSignal` directly when you need a pure-code action bus without DOM integration:

```typescript
import {createChannelSignal} from '@alwatr/signal';

// Define all app actions and their payload types
interface AppActions {
  'user-login': {username: string};
  'user-logout': void;
  'cart-add-item': {productId: number; quantity: number};
  'cart-remove-item': {productId: number};
  'navigate': {path: string};
}

// One channel for the entire action layer
const actionChannel = createChannelSignal<AppActions>({name: 'app-actions'});

// Business logic subscribes — O(1) routing, no cross-action interference
actionChannel.on('user-login', (payload) => {
  authService.login(payload.username);
});

actionChannel.on('cart-add-item', (payload) => {
  cartService.addItem(payload.productId, payload.quantity);
});

actionChannel.on('navigate', (payload) => {
  router.push(payload.path);
});

// UI dispatches actions
loginButton.addEventListener('click', () => {
  actionChannel.dispatch('user-login', {username: 'ali'});
});

addToCartButton.addEventListener('click', () => {
  actionChannel.dispatch('cart-add-item', {productId: 42, quantity: 1});
});
```

---

### 6. Persistent & Session State Signals

State signals backed by web storage with built-in write debouncing (default 1000ms) and page/BFcache lifecycle listeners.

```typescript
import {createPersistentStateSignal, createSessionStateSignal} from '@alwatr/signal';

// PersistentStateSignal saves state to localStorage
const theme = createPersistentStateSignal<'light' | 'dark'>({
  name: 'app-theme',
  initialValue: 'light',
  storageKey: 'theme-preference', // optional storage key
  saveDebounceDelay: 500, // debounce time in ms
});

theme.set('dark'); // Automatically schedules storage save

// SessionStateSignal saves state to sessionStorage
const wizardStep = createSessionStateSignal<number>({
  name: 'wizard-step',
  initialValue: 1,
});

// Remove persisted data from storage without destroying the signal:
wizardStep.remove();

// Clean up when unmounting
theme.destroy();
wizardStep.destroy();
```

---

## Operators

The package includes utility operators to transform and debounce signals:

### 1. `createDebouncedSignal`

Creates a new computed signal that debounces updates from a source signal.

```typescript
import {createStateSignal, createDebouncedSignal} from '@alwatr/signal';

const searchInput = createStateSignal<string>({name: 'search-input', initialValue: ''});

// Debounces input updates by 300ms
const debouncedSearch = createDebouncedSignal(searchInput, {
  delay: 300,
});

// Must be destroyed to clean up internal debouncer timers and subscriptions
debouncedSearch.destroy();
```

### 2. `createFilteredSignal`

Creates a new computed signal that only emits values satisfying a predicate function.

```typescript
import {createStateSignal, createFilteredSignal} from '@alwatr/signal';

const numberSignal = createStateSignal<number>({name: 'number', initialValue: 0});
const evenNumberSignal = createFilteredSignal(numberSignal, (n) => n % 2 === 0);

evenNumberSignal.destroy();
```

### 3. `createMappedSignal`

Transforms values from a source signal using a projection function.

```typescript
import {createStateSignal, createMappedSignal} from '@alwatr/signal';

const userSignal = createStateSignal({name: 'user', initialValue: {name: 'John', age: 30}});
const userNameSignal = createMappedSignal(userSignal, (user) => user.name);

console.log(userNameSignal.get()); // John
```

---

## Advanced Subscription Options

When subscribing to signals, you can customize the behavior with the `SubscribeOptions` parameter:

- `once?: boolean`: If `true`, the listener runs once and automatically unsubscribes.
- `priority?: boolean`: If `true`, the listener is added to the front of the queue and executes before standard observers.
- `receivePrevious?: boolean`: (For `StateSignal` only, default `true`). If `false`, the listener ignores the current value and only runs on future updates.

```typescript
// Subscribe with options
mySignal.subscribe((val) => console.log(val), {
  once: true,
  priority: true,
});
```

---

## Lifecycle Management and Memory Leaks

Signals that depend on other signals (like `ComputedSignal` and `EffectSignal`) create subscriptions internally. If you don't clean these up, they can lead to memory leaks.

**Always call `destroy()` on `ComputedSignal` and `EffectSignal` when they are no longer needed.**

```typescript
import {createStateSignal, createComputedSignal} from '@alwatr/signal';

const counter = createStateSignal<number>({name: 'counter', initialValue: 0});

// Create a computed signal
const isEven = createComputedSignal<boolean>({
  name: 'is-even',
  deps: [counter],
  get: () => counter.get() % 2 === 0,
});

// ... use it for a while ...

// When the component/logic using it is about to be removed:
isEven.destroy();
```

Calling `destroy()` unsubscribes the signal from all its dependencies, allowing it to be safely garbage collected.

---

## Asynchronous Scheduling

To prevent performance degradation, Alwatr Signal employs an asynchronous execution strategy:

- **`StateSignal` & `EventSignal`**: Notifications are pushed to the **microtask** queue (`Promise.resolve()`). This batches multiple synchronous modifications and delivers them at the end of the current task.
- **`ComputedSignal` & `EffectSignal`**: Recalculations and side-effects are scheduled as **macrotasks** (`delay.nextMacrotask`). If multiple dependency signals change in the same tick, the computed/effect signal updates once, preventing costly redundant evaluations.

---

## 🌊 Part of Alwatr Flux

`@alwatr/signal` serves as the **State Layer** of the **Alwatr Flux** unidirectional architecture:

```
View → Action (@alwatr/action) → Controller → State (@alwatr/signal) → View
```

For full UI integration, check out the `@alwatr/flux` bundle package.

---

## Sponsors

Flux and Alwatr packages are supported by our sponsors. Become a Sponsor to place your logo here.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting pull requests.
