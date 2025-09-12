# Alwatr Signal

Alwatr Signal is a powerful, lightweight, and modern reactive programming library. It is inspired by the best concepts from major reactive libraries but engineered to be faster and more efficient than all of them. It provides a robust and elegant way to manage application state through a system of signals, offering fine-grained reactivity, predictability, and excellent performance.

It's designed to be simple to learn, yet capable of handling complex state management scenarios.

## Features

- **Type-Safe**: Fully implemented in TypeScript for robust, type-safe code.
- **Lightweight**: A small footprint with zero third-party dependencies.
- **Performant**: Smart change detection and batched updates prevent unnecessary computations and re-renders.
- **Predictable**: Asynchronous, non-blocking notifications ensure a consistent and understandable data flow.
- **Lifecycle Management**: Built-in `destroy()` methods for easy cleanup and memory leak prevention.
- **Easy to Debug**: Unique `signalId` for each signal makes logging and tracing a breeze.

## Core Concepts

Signals are the fundamental building blocks in Alwatr Signal. They are special objects that hold a value and can notify interested consumers when that value changes. There are three main types of signals:

1. **`StateSignal`**: The foundation of reactivity. It holds a mutable value. When you `set()` a new value, it notifies all its dependents.
2. **`ComputedSignal`**: A read-only signal that derives its value from other signals. It automatically updates when its dependencies change. The result is memoized, so the calculation only runs when needed.
3. **`EffectSignal`**: The bridge to the "outside world." It executes a side effect (like logging or rendering) in response to changes in the signals it depends on.

There is also a fourth type for stateless events:

4. **`EventSignal`**: A stateless signal for dispatching one-off events that don't have a persistent value.

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
  signalId: 'user-firstName',
  initialValue: 'John',
});

// A signal to hold a simple counter.
const counter = new StateSignal<number>({
  signalId: 'app-counter',
  initialValue: 0,
});
```

### 3. Create a Computed Signal

A `ComputedSignal` combines other signals into a new, read-only value. Let's create a `fullName` signal that automatically updates when `firstName` changes.

```typescript
import {ComputedSignal} from '@alwatr/signal';

const fullName = new ComputedSignal<string>({
  signalId: 'user-fullName',
  deps: [firstName], // This computed signal depends on firstName.
  get: () => `User: ${firstName.value}`,
});

console.log(fullName.value); // Outputs: "User: John"
```

### 4. Create an Effect Signal

An `EffectSignal` runs a side effect whenever one of its dependencies changes. This is perfect for logging, updating the DOM, or making network requests.

```typescript
import {EffectSignal} from '@alwatr/signal';

const loggerEffect = new EffectSignal({
  deps: [fullName, counter], // This effect depends on fullName and counter.
  run: () => {
    console.log(`${fullName.value} has clicked ${counter.value} times.`);
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

## Advanced Topics

### Lifecycle Management and Memory Leaks

Signals that depend on other signals (like `ComputedSignal` and `EffectSignal`) create subscriptions internally. If you don't clean these up, they can lead to memory leaks.

**Always call `destroy()` on `ComputedSignal` and `EffectSignal` when they are no longer needed.**

```typescript
// Create a computed signal
const isEven = new ComputedSignal({
  deps: [counter],
  get: () => counter.value % 2 === 0,
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
  - `config.signalId`: `string`
  - `config.initialValue`: `T`
- **`.value`**: `T` - Gets the current value.
- **`.set(newValue: T)`**: Sets a new value and notifies listeners.

### `ComputedSignal<T>`

- **`constructor(config)`**: Creates a new computed signal.
  - `config.signalId`: `string`
  - `config.deps`: `IReadonlySignal<unknown>[]` - Array of dependency signals.
  - `config.get`: `() => T` - The function to compute the value.
- **`.value`**: `T` - Gets the current (memoized) value.
- **`.destroy()`**: Cleans up the signal's subscriptions. **(Important!)**

### `EffectSignal`

- **`constructor(config)`**: Creates a new effect signal.
  - `config.deps`: `IReadonlySignal<unknown>[]` - Array of dependency signals.
  - `config.run`: `() => void | Promise<void>` - The side effect function.
  - `config.runImmediately`: `boolean` (optional) - Whether to run the effect on creation.
- **`.destroy()`**: Cleans up the signal's subscriptions. **(Important!)**

### `EventSignal<T>`

- **`constructor(config)`**: Creates a new event signal.
  - `config.signalId`: `string`
- **`.dispatch(payload: T)`**: Dispatches an event to all listeners.

### Common Methods

- **`.subscribe(callback, options?)`**: Subscribes a listener. Returns `{ unsubscribe: () => void }`.
- **`.untilNext()`**: Returns a `Promise` that resolves with the next value/payload.
- **`.destroy()`**: (On all but `StateSignal`) Cleans up the signal.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

---

<br>
<br>
<br>

# Alwatr Signal (راهنمای فارسی)

کتابخانه Alwatr Signal یک ابزار قدرتمند، سبک و مدرن برای برنامه‌نویسی واکنشی (Reactive Programming) است. این کتابخانه با الگوبرداری از بهترین مفاهیم بزرگترین کتابخانه‌های واکنشی طراحی شده، اما مهندسی آن به گونه‌ای است که از تمام آن‌ها سریع‌تر و کارآمدتر باشد. این کتابخانه روشی استوار و زیبا برای مدیریت وضعیت برنامه از طریق سیگنال‌ها ارائه می‌دهد و واکنش‌پذیری دقیق (fine-grained reactivity)، پیش‌بینی‌پذیری و عملکرد عالی را به ارمغان می‌آورد.

طراحی آن به گونه‌ای است که یادگیری آن ساده باشد، اما در عین حال قادر به مدیریت سناریوهای پیچیده مدیریت وضعیت نیز باشد.

## ویژگی‌ها

- **ایمنی نوع (Type-Safe)**: به طور کامل با TypeScript پیاده‌سازی شده تا کدی قوی و ایمن از نظر نوع داشته باشید.
- **سبک**: حجم بسیار کم و بدون هیچ وابستگی (dependency) خارجی.
- **عملکرد بالا**: تشخیص هوشمند تغییرات و به‌روزرسانی‌های دسته‌ای از محاسبات و رندرهای غیرضروری جلوگیری می‌کند.
- **پیش‌بینی‌پذیر**: نوتیفیکیشن‌های ناهمزمان (asynchronous) و غیرمسدودکننده (non-blocking) جریان داده‌ای سازگار و قابل فهم را تضمین می‌کنند.
- **مدیریت چرخه حیات (Lifecycle)**: متدهای داخلی `destroy()` برای پاک‌سازی آسان و جلوگیری از نشت حافظه (memory leak).
- **اشکال‌زدایی آسان**: شناسه‌های منحصر به فرد (`signalId`) برای هر سیگنال، لاگ‌گیری و ردیابی را بسیار ساده می‌کند.

## مفاهیم اصلی

سیگنال‌ها بلوک‌های سازنده اصلی در Alwatr Signal هستند. آن‌ها اشیاء خاصی هستند که یک مقدار را نگه می‌دارند و می‌توانند مصرف‌کنندگان علاقه‌مند را هنگام تغییر آن مقدار مطلع کنند. سه نوع اصلی سیگنال وجود دارد:

1. **`StateSignal`**: پایه و اساس واکنش‌پذیری. این سیگنال یک مقدار قابل تغییر را نگه می‌دارد. وقتی شما مقدار جدیدی را `set()` می‌کنید، تمام وابستگان خود را مطلع می‌سازد.
2. **`ComputedSignal`**: یک سیگنال فقط-خواندنی (read-only) که مقدار خود را از سیگنال‌های دیگر استخراج می‌کند. این سیگنال به طور خودکار با تغییر وابستگی‌هایش به‌روز می‌شود. نتیجه کش (memoized) می‌شود، بنابراین محاسبات فقط در صورت نیاز انجام می‌شود.
3. **`EffectSignal`**: پلی به "دنیای بیرون". این سیگنال یک اثر جانبی (side effect) مانند لاگ‌گیری یا رندر کردن را در پاسخ به تغییرات سیگنال‌هایی که به آن‌ها وابسته است، اجرا می‌کند.

یک نوع چهارم نیز برای رویدادهای بدون حالت وجود دارد:

4. **`EventSignal`**: یک سیگنال بدون حالت برای ارسال رویدادهای یک‌باره که مقدار پایداری ندارند.

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
  signalId: 'user-firstName',
  initialValue: 'John',
});

// سیگنالی برای نگهداری یک شمارنده ساده
const counter = new StateSignal<number>({
  signalId: 'app-counter',
  initialValue: 0,
});
```

### ۳. ایجاد `ComputedSignal`

یک `ComputedSignal` سیگنال‌های دیگر را ترکیب کرده و یک مقدار جدید و فقط-خواندنی ایجاد می‌کند. بیایید یک سیگنال `fullName` بسازیم که با تغییر `firstName` به طور خودکار به‌روز شود.

```typescript
import {ComputedSignal} from '@alwatr/signal';

const fullName = new ComputedSignal<string>({
  signalId: 'user-fullName',
  deps: [firstName], // این سیگنال محاسباتی به firstName وابسته است
  get: () => `User: ${firstName.value}`,
});

console.log(fullName.value); // خروجی: "User: John"
```

### ۴. ایجاد `EffectSignal`

یک `EffectSignal` هر زمان که یکی از وابستگی‌هایش تغییر کند، یک اثر جانبی اجرا می‌کند. این برای لاگ‌گیری، به‌روزرسانی DOM یا ارسال درخواست‌های شبکه عالی است.

```typescript
import {EffectSignal} from '@alwatr/signal';

const loggerEffect = new EffectSignal({
  deps: [fullName, counter], // این افکت به fullName و counter وابسته است
  run: () => {
    console.log(`${fullName.value} has clicked ${counter.value} times.`);
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

## مباحث پیشرفته

### مدیریت چرخه حیات و نشت حافظه

سیگنال‌هایی که به سیگنال‌های دیگر وابسته‌اند (مانند `ComputedSignal` و `EffectSignal`) به صورت داخلی اشتراک (subscription) ایجاد می‌کنند. اگر این اشتراک‌ها را پاک‌سازی نکنید، می‌توانند منجر به نشت حافظه شوند.

**همیشه متد `destroy()` را روی `ComputedSignal` و `EffectSignal` زمانی که دیگر به آن‌ها نیازی نیست، فراخوانی کنید.**

```typescript
// یک سیگنال محاسباتی ایجاد کنید
const isEven = new ComputedSignal({
  deps: [counter],
  get: () => counter.value % 2 === 0,
});

// ... مدتی از آن استفاده کنید ...

// زمانی که کامپوننت/منطقی که از آن استفاده می‌کند در شرف حذف شدن است:
isEven.destroy();
```

فراخوانی `destroy()` اشتراک سیگنال را از تمام وابستگی‌هایش لغو می‌کند و به сборщик زباله (garbage collector) اجازه می‌دهد آن را با خیال راحت پاک کند.

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
  - `config.signalId`: `string`
  - `config.initialValue`: `T`
- **`.value`**: `T` - مقدار فعلی را دریافت می‌کند.
- **`.set(newValue: T)`**: مقدار جدیدی را تنظیم کرده و شنوندگان را مطلع می‌کند.

### `ComputedSignal<T>`

- **`constructor(config)`**: یک سیگنال محاسباتی جدید ایجاد می‌کند.
  - `config.signalId`: `string`
  - `config.deps`: `IReadonlySignal<unknown>[]` - آرایه‌ای از سیگنال‌های وابسته.
  - `config.get`: `() => T` - تابعی برای محاسبه مقدار.
- **`.value`**: `T` - مقدار فعلی (کش شده) را دریافت می‌کند.
- **`.destroy()`**: اشتراک‌های سیگنال را پاک‌سازی می‌کند. **(مهم!)**

### `EffectSignal`

- **`constructor(config)`**: یک سیگنال افکت جدید ایجاد می‌کند.
  - `config.deps`: `IReadonlySignal<unknown>[]` - آرایه‌ای از سیگنال‌های وابسته.
  - `config.run`: `() => void | Promise<void>` - تابع اثر جانبی.
  - `config.runImmediately`: `boolean` (اختیاری) - آیا افکت در هنگام ایجاد اجرا شود یا خیر.
- **`.destroy()`**: اشتراک‌های سیگنال را پاک‌سازی می‌کند. **(مهم!)**

### `EventSignal<T>`

- **`constructor(config)`**: یک سیگنال رویداد جدید ایجاد می‌کند.
  - `config.signalId`: `string`
- **`.dispatch(payload: T)`**: یک رویداد را به تمام شنوندگان ارسال می‌کند.

### متدهای مشترک

- **`.subscribe(callback, options?)`**: یک شنونده را مشترک می‌کند. `{ unsubscribe: () => void }` را برمی‌گرداند.
- **`.untilNext()`**: یک `Promise` برمی‌گرداند که با مقدار/پیام بعدی resolve می‌شود.
- **`.destroy()`**: (روی همه سیگنال‌ها به جز `StateSignal`) سیگنال را پاک‌سازی می‌کند.

## حامیان (Sponsors)

شرکت‌ها، سازمان‌ها و افراد زیر از نگهداری و توسعه مداوم flux حمایت می‌کنند. با تبدیل شدن به یک حامی، لوگوی خود را در README و وب‌سایت ما قرار دهید.

## مشارکت (Contributing)

از مشارکت‌ها استقبال می‌شود! لطفاً قبل از ارسال pull request، [راهنمای مشارکت ما](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) را مطالعه کنید.
