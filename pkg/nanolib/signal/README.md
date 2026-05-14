# Alwatr Signal

[](https://www.google.com/search?q=alwatr+flux)
[](https://www.google.com/search?q=alwatr+signal)
[](https://www.google.com/search?q=alwatr)
[](https://www.npmjs.com/package/%40alwatr/flux)
[](https://www.npmjs.com/package/%40alwatr/signal)

Alwatr Signal is a powerful, lightweight, and modern reactive programming library. It is inspired by the best concepts from major reactive libraries but engineered to be faster and more efficient than all of them. It provides a robust and elegant way to manage application state through a system of signals, offering fine-grained reactivity, predictability, and excellent performance.

It's designed to be simple to learn, yet capable of handling complex state management scenarios.

## Features

- **Type-Safe**: Fully implemented in TypeScript for robust, type-safe code.
- **Lightweight**: A small footprint with zero third-party dependencies.
- **Performant**: Smart change detection and batched updates prevent unnecessary computations and re-renders.
- **Predictable**: Asynchronous, non-blocking notifications ensure a consistent and understandable data flow.
- **Lifecycle Management**: Built-in `destroy()` methods for easy cleanup and memory leak prevention.
- **Easy to Debug**: Unique `name` for each signal makes logging and tracing a breeze.

## Core Concepts

Signals are the fundamental building blocks in Alwatr Signal. They are special objects that hold a value and can notify interested consumers when that value changes. There are three main types of signals:

1. **`StateSignal`**: The foundation of reactivity. It holds a mutable value. When you `set()` a new value, it notifies all its dependents.
2. **`ComputedSignal`**: A read-only signal that derives its value from other signals. It automatically updates when its dependencies change. The result is memoized, so the calculation only runs when needed.
3. **`EffectSignal`**: The bridge to the "outside world." It executes a side effect (like logging or rendering) in response to changes in the signals it depends on.

There is also a fourth type for stateless events:

4. **`EventSignal`**: A stateless signal for dispatching one-off events that don't have a persistent value.

5. **`ChannelSignal`**: A stateless, typed message bus. Unlike `EventSignal` (one signal = one event type), a single `ChannelSignal` carries multiple named message types — each with its own payload type — and routes them in **O(1)** to the right subscribers.

---

## Getting Started: A Practical Example

Let's build a simple reactive system to see how the different signal types work together.

### 1. Install

First, ensure you have the package installed:

```bash
npm i @alwatr/signal
```

### 2. Create State Signals

`StateSignal` is where your application's state lives. Let's create signals for a user's name and a counter.

```typescript
import {StateSignal} from '@alwatr/signal';

// A signal to hold the user's first name.
const firstName = new StateSignal<string>({
  name: 'user-firstName',
  initialValue: 'John',
});

// A signal to hold a simple counter.
const counter = new StateSignal<number>({
  name: 'app-counter',
  initialValue: 0,
});
```

### 3. Create a Computed Signal

A `ComputedSignal` combines other signals into a new, read-only value. Let's create a `fullName` signal that automatically updates when `firstName` changes.

```typescript
import {ComputedSignal} from '@alwatr/signal';

const fullName = new ComputedSignal<string>({
  name: 'user-fullName',
  deps: [firstName], // This computed signal depends on firstName.
  get: () => `User: ${firstName.get()}`,
});

console.log(fullName.get()); // Outputs: "User: John"
```

### 4. Create an Effect Signal

An `EffectSignal` runs a side effect whenever one of its dependencies changes. This is perfect for logging, updating the DOM, or making network requests.

```typescript
import {EffectSignal} from '@alwatr/signal';

const loggerEffect = new EffectSignal({
  deps: [fullName, counter], // This effect depends on fullName and counter.
  run: () => {
    console.log(`${fullName.get()} has clicked ${counter.get()} times.`);
  },
});
```

### 5. Putting It All Together

Now, let's see the magic happen. When we update a `StateSignal`, the changes automatically propagate through the system.

```typescript
// Subscribe to changes for demonstration
fullName.subscribe((newFullName) => {
  console.log(`Full name signal updated to: ${newFullName}`);
});

// Let's change the first name.
firstName.set('Jane');
// This will trigger:
// 1. `fullName` to recalculate its value.
// 2. The `fullName.subscribe` callback to run.
// 3. The `loggerEffect` to run.

// Let's increment the counter.
counter.set(1);
// This will trigger:
// 1. The `loggerEffect` to run again.
```

The output would be:

```
User: John
Full name signal updated to: User: Jane
User: Jane has clicked 0 times.
User: Jane has clicked 1 times.
```

---

## ChannelSignal: A Typed Message Bus

### Why ChannelSignal?

In real-world applications, you often need to dispatch many different types of events or messages — for example, `'open-drawer'`, `'close-drawer'`, `'show-toast'`, `'navigate'`, etc. You could create a separate `EventSignal` for each one, but that quickly becomes unwieldy:

```typescript
// ❌ Verbose and hard to manage
const openDrawerSignal = new EventSignal<{panel: string}>({name: 'open-drawer'});
const closeDrawerSignal = new EventSignal({name: 'close-drawer'});
const showToastSignal = new EventSignal<{message: string; type: 'info' | 'error'}>({name: 'show-toast'});
// ... and so on for every action in your app
```

**`ChannelSignal` solves this problem.** It's a single signal that acts as a **typed message bus** — one channel, many named message types. Think of it as a Go-style channel or a pub/sub topic with full TypeScript type safety.

### Architecture: O(1) Routing

Internally, `ChannelSignal` uses a `Map<name, Set<handler>>` to route messages. When you dispatch a message with name `'A'`, only the handlers registered for `'A'` are invoked — **O(1) lookup**, regardless of how many other names are subscribed. This is a critical performance optimization for applications with hundreds or thousands of directives/components listening to different actions.

### Creating a ChannelSignal

First, define a **message map** — a TypeScript interface that maps every valid message name to its payload type:

```typescript
import {ChannelSignal} from '@alwatr/signal';

// Define the message map for your application
interface AppMessages {
  'open-drawer': {panel: string};
  'close-drawer': void; // no payload
  'show-toast': {message: string; type: 'info' | 'error'};
  'navigate': {path: string};
}

// Create the channel
const appChannel = new ChannelSignal<AppMessages>({name: 'app-channel'});
```

### Subscribing to Named Messages

Use `.on(name, handler)` to subscribe to a specific message. The handler receives the **payload directly** (not the full `{name, payload}` envelope) — since the name is already known at subscription time, passing it again would be redundant.

```typescript
// Subscribe to 'open-drawer' messages
appChannel.on('open-drawer', (payload) => {
  console.log(`Opening drawer: ${payload!.panel}`);
  // TypeScript knows payload is {panel: string} | undefined
});

// Subscribe to 'show-toast' messages
appChannel.on('show-toast', (payload) => {
  toast.show(payload!.message, payload!.type);
  // TypeScript knows payload is {message: string; type: 'info' | 'error'} | undefined
});

// Subscribe to 'close-drawer' (no payload)
appChannel.on('close-drawer', (payload) => {
  console.log('Closing drawer');
  // TypeScript knows payload is void | undefined
});
```

### Dispatching Messages

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

### Unsubscribing

Just like other signals, `.on()` returns a `SubscribeResult` with an `unsubscribe()` method:

```typescript
const sub = appChannel.on('navigate', (payload) => {
  router.push(payload!.path);
});

// Later, when the component is destroyed:
sub.unsubscribe();
```

### One-Time Subscriptions

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

### Raw Stream Subscription (for Logging/Middleware)

If you need to observe **all** messages regardless of name — for example, for logging, analytics, or middleware — use `.subscribe()` instead of `.on()`. This receives the full `{name, payload}` envelope:

```typescript
// Log every message for debugging
appChannel.subscribe((msg) => {
  console.log(`[channel] ${String(msg.name)}`, msg.payload);
});
```

**Important:** `.subscribe()` is **not** filtered by name — it receives every message. For normal use cases, prefer `.on(name, handler)` to keep subscriptions focused and performant.

### Use Cases

`ChannelSignal` is ideal for:

- **Action layers** in Unidirectional Data Flow architectures (like `@alwatr/action`)
- **Event buses** in component-based UIs (e.g., a global app event channel)
- **Command dispatching** in CQRS-style systems
- **Pub/sub messaging** where you have many distinct message types but want a single, centralized channel

### Example: A Complete Action System

> **Note:** `@alwatr/action` is a higher-level package built on top of `ChannelSignal`. It adds declarative HTML attribute support (`on-action="click->add-to-cart:42"`), modifier chaining, payload resolvers, and DOM lifecycle management. For production use, prefer `@alwatr/action` over wiring `ChannelSignal` manually.

The example below shows what `@alwatr/action` does internally — and how you can use `ChannelSignal` directly when you need a pure-code action bus without DOM integration:

```typescript
import {ChannelSignal} from '@alwatr/signal';

// Define all app actions and their payload types
interface AppActions {
  'user-login': {username: string};
  'user-logout': void;
  'cart-add-item': {productId: number; quantity: number};
  'cart-remove-item': {productId: number};
  'navigate': {path: string};
}

// One channel for the entire action layer
const actionChannel = new ChannelSignal<AppActions>({name: 'app-actions'});

// Business logic subscribes — O(1) routing, no cross-action interference
actionChannel.on('user-login', (payload) => {
  authService.login(payload!.username);
});

actionChannel.on('cart-add-item', (payload) => {
  cartService.addItem(payload!.productId, payload!.quantity);
});

actionChannel.on('navigate', (payload) => {
  router.push(payload!.path);
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

## Advanced Topics

### Lifecycle Management and Memory Leaks

Signals that depend on other signals (like `ComputedSignal` and `EffectSignal`) create subscriptions internally. If you don't clean these up, they can lead to memory leaks.

**Always call `destroy()` on `ComputedSignal` and `EffectSignal` when they are no longer needed.**

```typescript
// Create a computed signal
const isEven = new ComputedSignal({
  deps: [counter],
  get: () => counter.get() % 2 === 0,
});

// ... use it for a while ...

// When the component/logic using it is about to be removed:
isEven.destroy();
```

Calling `destroy()` unsubscribes the signal from all its dependencies, allowing it to be safely garbage collected.

### Asynchronous Notifications

Alwatr Signal uses a predictable asynchronous model for notifications:

- **`StateSignal` and `EventSignal`** schedule notifications on the **microtask** queue (`Promise.resolve().then(...)`). This ensures that multiple synchronous `set()` calls within the same event loop tick are batched, and listeners are notified shortly after, but not immediately.
- **`ComputedSignal` and `EffectSignal`** schedule their recalculations/runs on the **macrotask** queue (e.g., `setTimeout(..., 0)`). This is a crucial optimization. If multiple dependencies change in the same event loop, the computed signal will only recalculate _once_ per tick, avoiding redundant work.

### Subscription Options

The `subscribe` method accepts an optional second argument to customize its behavior:

- `once: true`: The listener is called only once and then automatically removed.
- `priority: true`: The listener is moved to the front of the queue and is executed before other listeners.
- `receivePrevious: false` (For `StateSignal` only): Prevents the listener from being called immediately with the current value upon subscription.

## API Overview

### `StateSignal<T>`

- **`constructor(config)`**: Creates a new state signal.
  - `config.name`: `string`
  - `config.initialValue`: `T`
- **`.get()`**: `T` - Gets the current value.
- **`.set(newValue: T)`**: Sets a new value and notifies listeners.

### `ComputedSignal<T>`

- **`constructor(config)`**: Creates a new computed signal.
  - `config.name`: `string`
  - `config.deps`: `IReadonlySignal<unknown>[]` - Array of dependency signals.
  - `config.get`: `() => T` - The function to compute the value.
- **`.get()`**: `T` - Gets the current (memoized) value.
- **`.destroy()`**: Cleans up the signal's subscriptions. **(Important!)**

### `EffectSignal`

- **`constructor(config)`**: Creates a new effect signal.
  - `config.deps`: `IReadonlySignal<unknown>[]` - Array of dependency signals.
  - `config.run`: `() => void | Promise<void>` - The side effect function.
  - `config.runImmediately`: `boolean` (optional) - Whether to run the effect on creation.
- **`.destroy()`**: Cleans up the signal's subscriptions. **(Important!)**

### `EventSignal<T>`

- **`constructor(config)`**: Creates a new event signal.
  - `config.name`: `string`
- **`.dispatch(payload: T)`**: Dispatches an event to all listeners.

### `PersistentStateSignal<T>`

- **`constructor(config)`**: Creates a state signal that persists in `localStorage`.
  - `config.name`: `string`
  - `config.initialValue`: `T`
  - `config.schemaVersion`: `number` (optional)
  - `config.parse`: `(value: string) => T` (optional)
  - `config.stringify`: `(value: T) => string` (optional)
- Has all methods of `StateSignal`.
- **Reliable Save & BFCache Support**: Automatically flushes pending writes on `pagehide` and re-syncs state on `pageshow` when restoring from BFCache.
- **`.remove()`**: Removes the value from storage without destroying the signal.

### `SessionStateSignal<T>`

- **`constructor(config)`**: Creates a state signal that persists in `sessionStorage` (tab-scoped).
  - `config.name`: `string`
  - `config.initialValue`: `T`
  - `config.parse`: `(value: string) => T` (optional)
  - `config.stringify`: `(value: T) => string` (optional)
- Has all methods of `StateSignal`.
- **Reliable Save & BFCache Support**: Automatically flushes pending writes on `pagehide` and re-syncs state on `pageshow` when restoring from BFCache.
- **`.remove()`**: Removes the value from storage without destroying the signal.

### `ChannelSignal<TMap>`

- **`constructor(config)`**: Creates a new channel signal.
  - `config.name`: `string`
- **`.dispatch(name, payload?)`**: Dispatches a named message. TypeScript enforces the correct payload type for each name.
- **`.on(name, handler, options?)`**: Subscribes to a specific named message. The handler receives the `payload` directly (not the full envelope). Uses an internal `Map` for **O(1)** routing. Supports `once` option.
- **`.subscribe(callback, options?)`**: Subscribes to the **raw message stream** — receives every `{name, payload}` envelope regardless of name. Useful for logging and middleware.

### Common Methods

- **`.subscribe(callback, options?)`**: Subscribes a listener. Returns `{ unsubscribe: () => void }`.
- **`.untilNext()`**: Returns a `Promise` that resolves with the next value/payload.
- **`.destroy()`**: (On all but `StateSignal`) Cleans up the signal.

---

## 🌊 Part of Alwatr Flux

`@alwatr/signal` is the **State Layer** of the [Alwatr Flux](https://github.com/Alwatr/alwatr/tree/next/pkg/flux) architecture — a complete Unidirectional Data Flow system for building scalable Progressive Web Applications.

```
View → Action (@alwatr/action) → Controller → State (@alwatr/signal) → View
```

In the Flux architecture, signals serve as the **single source of truth**. Controllers update signals after processing actions, and the View layer subscribes to signals to re-render only the affected parts of the UI — no Virtual DOM, no full-tree reconciliation.

**The full Flux bundle** (`@alwatr/flux`) includes signals, actions, directives, page-ready, and storage — everything you need to build a complete reactive application from a single import.

```typescript
// Use @alwatr/flux for the complete architecture
import {createStateSignal, onAction, setupActionDelegation} from '@alwatr/flux';

// Or use @alwatr/signal standalone for just the reactive primitives
import {createStateSignal, createComputedSignal} from '@alwatr/signal';
```

→ [View the complete Flux documentation](https://github.com/Alwatr/alwatr/tree/next/pkg/flux)

---

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

---

<br>
<br>
<br>

# Alwatr Signal (راهنمای فارسی)

[](https://www.google.com/search?q=alwatr+flux)
[](https://www.google.com/search?q=alwatr+signal)
[](https://www.google.com/search?q=alwatr)
[](https://www.npmjs.com/package/%40alwatr/flux)
[](https://www.npmjs.com/package/%40alwatr/signal)

کتابخانه Alwatr Signal یک ابزار قدرتمند، سبک و مدرن برای برنامه‌نویسی واکنشی (Reactive Programming) است. این کتابخانه با الگوبرداری از بهترین مفاهیم بزرگترین کتابخانه‌های واکنشی طراحی شده، اما مهندسی آن به گونه‌ای است که از تمام آن‌ها سریع‌تر و کارآمدتر باشد. این کتابخانه روشی استوار و زیبا برای مدیریت وضعیت برنامه از طریق سیگنال‌ها ارائه می‌دهد و واکنش‌پذیری دقیق (fine-grained reactivity)، پیش‌بینی‌پذیری و عملکرد عالی را به ارمغان می‌آورد.

طراحی آن به گونه‌ای است که یادگیری آن ساده باشد، اما در عین حال قادر به مدیریت سناریوهای پیچیده مدیریت وضعیت نیز باشد.

## ویژگی‌ها

- **ایمنی نوع (Type-Safe)**: به طور کامل با TypeScript پیاده‌سازی شده تا کدی قوی و ایمن از نظر نوع داشته باشید.
- **سبک**: حجم بسیار کم و بدون هیچ وابستگی (dependency) خارجی.
- **عملکرد بالا**: تشخیص هوشمند تغییرات و به‌روزرسانی‌های دسته‌ای از محاسبات و رندرهای غیرضروری جلوگیری می‌کند.
- **پیش‌بینی‌پذیر**: نوتیفیکیشن‌های ناهمزمان (asynchronous) و غیرمسدودکننده (non-blocking) جریان داده‌ای سازگار و قابل فهم را تضمین می‌کنند.
- **مدیریت چرخه حیات (Lifecycle)**: متدهای داخلی `destroy()` برای پاک‌سازی آسان و جلوگیری از نشت حافظه (memory leak).
- **اشکال‌زدایی آسان**: شناسه‌های منحصر به فرد (`name`) برای هر سیگنال، لاگ‌گیری و ردیابی را بسیار ساده می‌کند.

## مفاهیم اصلی

سیگنال‌ها بلوک‌های سازنده اصلی در Alwatr Signal هستند. آن‌ها اشیاء خاصی هستند که یک مقدار را نگه می‌دارند و می‌توانند مصرف‌کنندگان علاقه‌مند را هنگام تغییر آن مقدار مطلع کنند. سه نوع اصلی سیگنال وجود دارد:

1. **`StateSignal`**: پایه و اساس واکنش‌پذیری. این سیگنال یک مقدار قابل تغییر را نگه می‌دارد. وقتی شما مقدار جدیدی را `set()` می‌کنید، تمام وابستگان خود را مطلع می‌سازد.
2. **`ComputedSignal`**: یک سیگنال فقط-خواندنی (read-only) که مقدار خود را از سیگنال‌های دیگر استخراج می‌کند. این سیگنال به طور خودکار با تغییر وابستگی‌هایش به‌روز می‌شود. نتیجه کش (memoized) می‌شود، بنابراین محاسبات فقط در صورت نیاز انجام می‌شود.
3. **`EffectSignal`**: پلی به "دنیای بیرون". این سیگنال یک اثر جانبی (side effect) مانند لاگ‌گیری یا رندر کردن را در پاسخ به تغییرات سیگنال‌هایی که به آن‌ها وابسته است، اجرا می‌کند.

یک نوع چهارم نیز برای رویدادهای بدون حالت وجود دارد:

4. **`EventSignal`**: یک سیگنال بدون حالت برای ارسال رویدادهای یک‌باره که مقدار پایداری ندارند.

و یک نوع پنجم برای مسیریابی پیام‌های چندگانه:

5. **`ChannelSignal`**: یک Message Bus تایپ‌شده و بدون حالت. برخلاف `EventSignal` (یک سیگنال = یک نوع رویداد)، یک `ChannelSignal` واحد چندین نوع پیام با نام‌های مختلف را حمل می‌کند — هر کدام با نوع payload مخصوص خودشان — و آن‌ها را با سرعت **O(1)** به subscriber‌های مناسب هدایت می‌کند.

---

## شروع به کار: یک مثال عملی

بیایید یک سیستم واکنشی ساده بسازیم تا ببینیم انواع مختلف سیگنال‌ها چگونه با هم کار می‌کنند.

### ۱. نصب

ابتدا، اطمینان حاصل کنید که بسته را نصب کرده‌اید:

```bash
npm i @alwatr/signal
```

### ۲. ایجاد `StateSignal`

`StateSignal` جایی است که وضعیت برنامه شما زندگی می‌کند. بیایید سیگنال‌هایی برای نام یک کاربر و یک شمارنده ایجاد کنیم.

```typescript
import {StateSignal} from '@alwatr/signal';

// سیگنالی برای نگهداری نام کوچک کاربر
const firstName = new StateSignal<string>({
  name: 'user-firstName',
  initialValue: 'John',
});

// سیگنالی برای نگهداری یک شمارنده ساده
const counter = new StateSignal<number>({
  name: 'app-counter',
  initialValue: 0,
});
```

### ۳. ایجاد `ComputedSignal`

یک `ComputedSignal` سیگنال‌های دیگر را ترکیب کرده و یک مقدار جدید و فقط-خواندنی ایجاد می‌کند. بیایید یک سیگنال `fullName` بسازیم که با تغییر `firstName` به طور خودکار به‌روز شود.

```typescript
import {ComputedSignal} from '@alwatr/signal';

const fullName = new ComputedSignal<string>({
  name: 'user-fullName',
  deps: [firstName], // این سیگنال محاسباتی به firstName وابسته است
  get: () => `User: ${firstName.get()}`,
});

console.log(fullName.get()); // خروجی: "User: John"
```

### ۴. ایجاد `EffectSignal`

یک `EffectSignal` هر زمان که یکی از وابستگی‌هایش تغییر کند، یک اثر جانبی اجرا می‌کند. این برای لاگ‌گیری، به‌روزرسانی DOM یا ارسال درخواست‌های شبکه عالی است.

```typescript
import {EffectSignal} from '@alwatr/signal';

const loggerEffect = new EffectSignal({
  deps: [fullName, counter], // این افکت به fullName و counter وابسته است
  run: () => {
    console.log(`${fullName.get()} has clicked ${counter.get()} times.`);
  },
});
```

### ۵. کنار هم قرار دادن همه چیز

حالا، بیایید جادو را ببینیم. وقتی ما یک `StateSignal` را به‌روز می‌کنیم، تغییرات به طور خودکار در سراسر سیستم پخش می‌شوند.

```typescript
// برای نمایش، در تغییرات مشترک می‌شویم
fullName.subscribe((newFullName) => {
  console.log(`Full name signal updated to: ${newFullName}`);
});

// بیایید نام کوچک را تغییر دهیم
firstName.set('Jane');
// این کار باعث می‌شود:
// ۱. `fullName` مقدار خود را دوباره محاسبه کند.
// ۲. کال‌بک `fullName.subscribe` اجرا شود.
// ۳. `loggerEffect` اجرا شود.

// بیایید شمارنده را افزایش دهیم
counter.set(1);
// این کار باعث می‌شود:
// ۱. `loggerEffect` دوباره اجرا شود.
```

خروجی به این صورت خواهد بود:

```
User: John
Full name signal updated to: User: Jane
User: Jane has clicked 0 times.
User: Jane has clicked 1 times.
```

---

## ChannelSignal: یک Message Bus تایپ‌شده

### چرا ChannelSignal؟

در برنامه‌های واقعی، اغلب نیاز دارید انواع مختلفی از رویدادها یا پیام‌ها را dispatch کنید — مثلاً `'open-drawer'`، `'close-drawer'`، `'show-toast'`، `'navigate'` و غیره. می‌توانید برای هر کدام یک `EventSignal` جداگانه بسازید، اما این رویکرد به سرعت دست‌وپاگیر می‌شود:

```typescript
// ❌ پرحجم و سخت برای مدیریت
const openDrawerSignal = new EventSignal<{panel: string}>({name: 'open-drawer'});
const closeDrawerSignal = new EventSignal({name: 'close-drawer'});
const showToastSignal = new EventSignal<{message: string; type: 'info' | 'error'}>({name: 'show-toast'});
// ... و به همین ترتیب برای هر action در برنامه
```

**`ChannelSignal` این مشکل را حل می‌کند.** یک سیگنال واحد است که به عنوان یک **Message Bus تایپ‌شده** عمل می‌کند — یک کانال، انواع پیام‌های مختلف. مثل یک Go-style channel یا یک pub/sub topic با ایمنی کامل TypeScript.

### معماری: مسیریابی O(1)

در داخل، `ChannelSignal` از یک `Map<name, Set<handler>>` برای مسیریابی پیام‌ها استفاده می‌کند. وقتی پیامی با نام `'A'` dispatch می‌شود، فقط handler‌هایی که برای `'A'` ثبت شده‌اند فراخوانی می‌شوند — **جستجوی O(1)**، صرف‌نظر از اینکه چه تعداد نام دیگری subscribe شده باشند. این یک بهینه‌سازی حیاتی برای برنامه‌هایی است که صدها یا هزاران directive/component دارند که به action‌های مختلف گوش می‌دهند.

### ساخت یک ChannelSignal

ابتدا یک **message map** تعریف کنید — یک interface در TypeScript که هر نام پیام معتبر را به نوع payload آن نگاشت می‌کند:

```typescript
import {ChannelSignal} from '@alwatr/signal';

// تعریف message map برای برنامه
interface AppMessages {
  'open-drawer': {panel: string};
  'close-drawer': void; // بدون payload
  'show-toast': {message: string; type: 'info' | 'error'};
  'navigate': {path: string};
}

// ساخت channel
const appChannel = new ChannelSignal<AppMessages>({name: 'app-channel'});
```

### Subscribe به پیام‌های نام‌دار

از `.on(name, handler)` برای subscribe به یک پیام خاص استفاده کنید. handler مستقیماً **payload** را دریافت می‌کند (نه envelope کامل `{name, payload}`) — چون نام در زمان subscribe مشخص است، ارسال مجدد آن اضافی خواهد بود.

```typescript
// Subscribe به پیام‌های 'open-drawer'
appChannel.on('open-drawer', (payload) => {
  console.log(`Opening drawer: ${payload!.panel}`);
  // TypeScript می‌داند payload از نوع {panel: string} | undefined است
});

// Subscribe به پیام‌های 'show-toast'
appChannel.on('show-toast', (payload) => {
  toast.show(payload!.message, payload!.type);
  // TypeScript می‌داند payload از نوع {message: string; type: 'info' | 'error'} | undefined است
});

// Subscribe به 'close-drawer' (بدون payload)
appChannel.on('close-drawer', () => {
  console.log('Closing drawer');
});
```

### Dispatch پیام‌ها

از `.dispatch(name, payload)` برای ارسال پیام استفاده کنید. TypeScript اعمال می‌کند که payload با نوع تعریف‌شده برای آن نام در message map مطابقت داشته باشد.

```typescript
// Dispatch با payload
appChannel.dispatch('open-drawer', {panel: 'settings'}); // ✅ Type-safe
appChannel.dispatch('show-toast', {message: 'ذخیره شد!', type: 'info'}); // ✅

// Dispatch بدون payload
appChannel.dispatch('close-drawer'); // ✅

// ❌ خطاهای TypeScript:
appChannel.dispatch('open-drawer', {panel: 123}); // خطا: panel باید string باشد
appChannel.dispatch('show-toast', {message: 'سلام'}); // خطا: 'type' وجود ندارد
appChannel.dispatch('unknown-action'); // خطا: 'unknown-action' در AppMessages نیست
```

### Unsubscribe کردن

مثل سایر سیگنال‌ها، `.on()` یک `SubscribeResult` با متد `unsubscribe()` برمی‌گرداند:

```typescript
const sub = appChannel.on('navigate', (payload) => {
  router.push(payload!.path);
});

// بعداً، وقتی کامپوننت destroy می‌شود:
sub.unsubscribe();
```

### Subscribe یک‌باره

از گزینه `once` برای unsubscribe خودکار بعد از اولین پیام استفاده کنید:

```typescript
appChannel.on(
  'app-ready',
  () => {
    console.log('برنامه آماده است!');
  },
  {once: true},
);
```

### Subscribe به جریان خام (برای لاگ‌گیری/Middleware)

اگر نیاز دارید **همه** پیام‌ها را صرف‌نظر از نام مشاهده کنید — مثلاً برای لاگ‌گیری، analytics یا middleware — از `.subscribe()` به جای `.on()` استفاده کنید. این متد envelope کامل `{name, payload}` را دریافت می‌کند:

```typescript
// لاگ کردن همه پیام‌ها برای debugging
appChannel.subscribe((msg) => {
  console.log(`[channel] ${String(msg.name)}`, msg.payload);
});
```

**نکته مهم:** `.subscribe()` بر اساس نام فیلتر **نمی‌شود** — هر پیامی را دریافت می‌کند. برای موارد عادی، `.on(name, handler)` را ترجیح دهید تا subscriptionها متمرکز و کارآمد بمانند.

### موارد استفاده

`ChannelSignal` برای موارد زیر ایده‌آل است:

- **لایه Action** در معماری‌های Unidirectional Data Flow (مثل `@alwatr/action`)
- **Event Bus** در UI‌های مبتنی بر کامپوننت (مثلاً یک کانال رویداد سراسری برنامه)
- **Command Dispatching** در سیستم‌های CQRS-style
- **Pub/Sub Messaging** جایی که انواع پیام‌های مختلف دارید اما می‌خواهید یک کانال مرکزی داشته باشید

### مثال کامل: یک سیستم Action

> **نکته:** پکیج `@alwatr/action` یک لایه بالاتر است که روی `ChannelSignal` ساخته شده. این پکیج پشتیبانی از attribute‌های HTML (`on-action="click->add-to-cart:42"`)، modifier chaining، payload resolver و مدیریت lifecycle DOM را اضافه می‌کند. برای استفاده در پروداکشن، `@alwatr/action` را به جای wiring مستقیم `ChannelSignal` ترجیح دهید.

مثال زیر نشان می‌دهد که `@alwatr/action` در داخل چه کاری انجام می‌دهد — و چگونه می‌توانید `ChannelSignal` را مستقیماً زمانی که به یک action bus خالص بدون DOM integration نیاز دارید استفاده کنید:

```typescript
import {ChannelSignal} from '@alwatr/signal';

// تعریف همه action‌های برنامه و نوع payload آن‌ها
interface AppActions {
  'user-login': {username: string};
  'user-logout': void;
  'cart-add-item': {productId: number; quantity: number};
  'cart-remove-item': {productId: number};
  'navigate': {path: string};
}

// یک کانال برای کل لایه action
const actionChannel = new ChannelSignal<AppActions>({name: 'app-actions'});

// منطق تجاری subscribe می‌کند — routing با O(1)، بدون تداخل بین action‌ها
actionChannel.on('user-login', (payload) => {
  authService.login(payload!.username);
});

actionChannel.on('cart-add-item', (payload) => {
  cartService.addItem(payload!.productId, payload!.quantity);
});

actionChannel.on('navigate', (payload) => {
  router.push(payload!.path);
});

// UI اقدام به dispatch action می‌کند
loginButton.addEventListener('click', () => {
  actionChannel.dispatch('user-login', {username: 'ali'});
});

addToCartButton.addEventListener('click', () => {
  actionChannel.dispatch('cart-add-item', {productId: 42, quantity: 1});
});
```

---

## مباحث پیشرفته

### مدیریت چرخه حیات و نشت حافظه

سیگنال‌هایی که به سیگنال‌های دیگر وابسته‌اند (مانند `ComputedSignal` و `EffectSignal`) به صورت داخلی اشتراک (subscription) ایجاد می‌کنند. اگر این اشتراک‌ها را پاک‌سازی نکنید، می‌توانند منجر به نشت حافظه شوند.

**همیشه متد `destroy()` را روی `ComputedSignal` و `EffectSignal` زمانی که دیگر به آن‌ها نیازی نیست، فراخوانی کنید.**

```typescript
// یک سیگنال محاسباتی ایجاد کنید
const isEven = new ComputedSignal({
  deps: [counter],
  get: () => counter.get() % 2 === 0,
});

// ... مدتی از آن استفاده کنید ...

// زمانی که کامپوننت/منطقی که از آن استفاده می‌کند در شرف حذف شدن است:
isEven.destroy();
```

فراخوانی `destroy()` اشتراک سیگنال را از تمام وابستگی‌هایش لغو می‌کند و به جمع‌آورنده زباله (garbage collector) اجازه می‌دهد آن را با خیال راحت پاک کند.

### نوتیفیکیشن‌های ناهمزمان (Asynchronous)

Alwatr Signal از یک مدل ناهمزمان قابل پیش‌بینی برای نوتیفیکیشن‌ها استفاده می‌کند:

- **`StateSignal` و `EventSignal`** نوتیفیکیشن‌ها را در صف **microtask** (`Promise.resolve().then(...)`) زمان‌بندی می‌کنند. این تضمین می‌کند که چندین فراخوانی `set()` همزمان در یک تیک حلقه رویداد (event loop) دسته‌بندی شده و شنوندگان کمی بعد، اما نه بلافاصله، مطلع می‌شوند.
- **`ComputedSignal` و `EffectSignal`** محاسبات/اجراهای خود را در صف **macrotask** (مانند `setTimeout(..., 0)`) زمان‌بندی می‌کنند. این یک بهینه‌سازی حیاتی است. اگر چندین وابستگی در یک حلقه رویداد تغییر کنند، سیگنال محاسباتی فقط _یک بار_ در هر تیک دوباره محاسبه می‌شود و از کار اضافی جلوگیری می‌کند.

### گزینه‌های اشتراک (`subscribe`)

متد `subscribe` یک آرگومان دوم اختیاری برای سفارشی‌سازی رفتار خود می‌پذیرد:

- `once: true`: شنونده فقط یک بار فراخوانی شده و سپس به طور خودکار حذف می‌شود.
- `priority: true`: شنونده به ابتدای صف منتقل شده و قبل از سایر شنوندگان اجرا می‌شود.
- `receivePrevious: false` (فقط برای `StateSignal`): از فراخوانی فوری شنونده با مقدار فعلی در هنگام اشتراک جلوگیری می‌کند.

## مرور کلی API

### `StateSignal<T>`

- **`constructor(config)`**: یک سیگنال وضعیت جدید ایجاد می‌کند.
  - `config.name`: `string`
  - `config.initialValue`: `T`
- **`.get()`**: `T` - مقدار فعلی را دریافت می‌کند.
- **`.set(newValue: T)`**: مقدار جدیدی را تنظیم کرده و شنوندگان را مطلع می‌کند.

### `ComputedSignal<T>`

- **`constructor(config)`**: یک سیگنال محاسباتی جدید ایجاد می‌کند.
  - `config.name`: `string`
  - `config.deps`: `IReadonlySignal<unknown>[]` - آرایه‌ای از سیگنال‌های وابسته.
  - `config.get`: `() => T` - تابعی برای محاسبه مقدار.
- **`.get()`**: `T` - مقدار فعلی (کش شده) را دریافت می‌کند.
- **`.destroy()`**: اشتراک‌های سیگنال را پاک‌سازی می‌کند. **(مهم!)**

### `EffectSignal`

- **`constructor(config)`**: یک سیگنال افکت جدید ایجاد می‌کند.
  - `config.deps`: `IReadonlySignal<unknown>[]` - آرایه‌ای از سیگنال‌های وابسته.
  - `config.run`: `() => void | Promise<void>` - تابع اثر جانبی.
  - `config.runImmediately`: `boolean` (اختیاری) - آیا افکت در هنگام ایجاد اجرا شود یا خیر.
- **`.destroy()`**: اشتراک‌های سیگنال را پاک‌سازی می‌کند. **(مهم!)**

### `EventSignal<T>`

- **`constructor(config)`**: یک سیگنال رویداد جدید ایجاد می‌کند.
  - `config.name`: `string`
- **`.dispatch(payload: T)`**: یک رویداد را به همه شنوندگان ارسال می‌کند.

### `PersistentStateSignal<T>`

- **`constructor(config)`**: یک سیگنال وضعیت ایجاد می‌کند که در `localStorage` ماندگار است.
  - `config.name`: `string`
  - `config.initialValue`: `T`
  - `config.schemaVersion`: `number` (اختیاری)
  - `config.parse`: `(value: string) => T` (اختیاری)
  - `config.stringify`: `(value: T) => string` (اختیاری)
- دارای تمامی متدهای `StateSignal` است.
- **ذخیره مطمئن و پشتیبانی از BFCache**: به طور خودکار داده‌ها را در رویداد `pagehide` ذخیره می‌کند و در صورت بازگشت از BFCache (رویداد `pageshow`)، سیگنال را دوباره با حافظه همگام‌سازی (Sync) می‌کند.
- **`.remove()`**: مقدار را از حافظه (storage) بدون از بین بردن سیگنال پاک می‌کند.

### `SessionStateSignal<T>`

- **`constructor(config)`**: یک سیگنال وضعیت ایجاد می‌کند که در `sessionStorage` (در سطح tab) ماندگار است.
  - `config.name`: `string`
  - `config.initialValue`: `T`
  - `config.parse`: `(value: string) => T` (اختیاری)
  - `config.stringify`: `(value: T) => string` (اختیاری)
- دارای تمامی متدهای `StateSignal` است.
- **ذخیره مطمئن و پشتیبانی از BFCache**: به طور خودکار داده‌ها را در رویداد `pagehide` ذخیره می‌کند و در صورت بازگشت از BFCache (رویداد `pageshow`)، سیگنال را دوباره با حافظه همگام‌سازی (Sync) می‌کند.
- **`.remove()`**: مقدار را از حافظه (storage) بدون از بین بردن سیگنال پاک می‌کند.

### `ChannelSignal<TMap>`

- **`constructor(config)`**: یک channel signal جدید ایجاد می‌کند.
  - `config.name`: `string`
- **`.dispatch(name, payload?)`**: یک پیام با نام مشخص ارسال می‌کند. TypeScript نوع صحیح payload را برای هر نام اعمال می‌کند.
- **`.on(name, handler, options?)`**: به یک پیام با نام مشخص subscribe می‌کند. handler مستقیماً `payload` را دریافت می‌کند (نه envelope کامل). از یک `Map` داخلی برای routing **O(1)** استفاده می‌کند. از گزینه `once` پشتیبانی می‌کند.
- **`.subscribe(callback, options?)`**: به **جریان خام پیام‌ها** subscribe می‌کند — هر envelope `{name, payload}` را صرف‌نظر از نام دریافت می‌کند. برای لاگ‌گیری و middleware مفید است.

### متدهای مشترک

- **`.subscribe(callback, options?)`**: یک شنونده را مشترک می‌کند. `{ unsubscribe: () => void }` را برمی‌گرداند.
- **`.untilNext()`**: یک `Promise` برمی‌گرداند که با مقدار/پیام بعدی resolve می‌شود.
- **`.destroy()`**: (روی همه سیگنال‌ها به جز `StateSignal`) سیگنال را پاک‌سازی می‌کند.

## حامیان (Sponsors)

شرکت‌ها، سازمان‌ها و افراد زیر از نگهداری و توسعه مداوم flux حمایت می‌کنند. با تبدیل شدن به یک حامی، لوگوی خود را در README و وب‌سایت ما قرار دهید.

## مشارکت (Contributing)

از مشارکت‌ها استقبال می‌شود! لطفاً قبل از ارسال pull request، [راهنمای مشارکت ما](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) را مطالعه کنید.
