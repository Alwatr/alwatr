# Alwatr Debounce

A powerful, modern, and type-safe debouncer utility designed for high-performance applications. It's framework-agnostic, works seamlessly in both Node.js and browsers, and provides a rich API for fine-grained control over function execution.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/debounce)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/nanolib)
[](https://www.google.com/search?q=alwatr+debounce)
[](https://www.google.com/search?q=alwatr+nanolib)
[](https://www.google.com/search?q=alwatr)

## Features

- **💪 Type-Safe:** Fully written in TypeScript for excellent autocompletion and type safety.
- **⚙️ Highly Configurable:** Control execution with `leading` and `trailing` edge options.
- **🎯 Precise `this` Context:** Explicitly define `thisContext` to prevent common JavaScript pitfalls.
- **🔄 Lifecycle-Aware:** Includes `cancel()` and `flush()` methods for complete control, crucial for preventing memory leaks in component-based frameworks.
- **🌐 Universal:** Works in any JavaScript environment, including browsers, Node.js, Deno, and Bun.
- **🌳 Tree-Shakable:** Designed with modern ESM standards for optimal bundle sizes.

## Installation

```bash
# Using npm
npm i @alwatr/debounce

# Using yarn
yarn add @alwatr/debounce

# Using pnpm
pnpm add @alwatr/debounce
```

---

## Core Concepts

### What is Debouncing?

Debouncing is a technique to limit the rate at which a function gets called. It ensures that your code only executes _once_ after a specific period of inactivity.

**Analogy:** Imagine a user typing in a search bar. You don't want to send an API request for every single keystroke (`'s'`, `'se'`, `'sea'`, ...). Instead, you wait until the user **stops typing** for a moment (e.g., 300ms) and then send a single API request for the final text (`'search'`). This prevents unnecessary network requests and improves performance.

### `leading` vs. `trailing` Edge

The timing of the debounced function's execution is controlled by the `leading` and `trailing` options.

- **`trailing: true` (Default Behavior)**
  The function is executed **after** the delay period, following the _last_ trigger. This is the classic debounce behavior, ideal for search inputs or calculations.

  ```
  trigger--trigger--trigger----(delay)----> EXECUTE
  ```

- **`leading: true`**
  The function is executed **immediately** on the _first_ trigger. Subsequent triggers within the delay window are ignored. This is useful for actions where immediate feedback is desired, like clicking a button that should not be spammed.

  ```
  EXECUTE <--trigger--trigger--trigger----(delay)----> (no execution)
  ```

- **`leading: true` AND `trailing: true`**
  The function executes on the **first** trigger and also on the **last** trigger that occurs after the delay window. This is useful for scenarios requiring both immediate and final actions.

---

## Quick Start

The easiest way to get started is with the `createDebouncer` factory function.

```typescript
import {createDebouncer} from '@alwatr/debounce';

// 1. Create a debouncer instance
const debouncer = createDebouncer({
  // The function you want to debounce
  func: (query: string) => {
    console.log(`Searching for: ${query}`);
  },
  // The delay in milliseconds
  delay: 300,
});

// 2. Trigger it multiple times
console.log('User is typing...');
debouncer.trigger('Alw');
debouncer.trigger('Alwat');
debouncer.trigger('Alwatr');

// After 300ms of inactivity, the console will log:
// "Searching for: Alwatr"
```

## API Reference

### `createDebouncer(config)`

A factory function that creates a new `Debouncer` instance. It's the recommended way to create debouncers for better type inference.

### `DebouncerConfig`

This is the configuration object passed to `createDebouncer` or the `Debouncer` constructor.

| Property      | Type                    | Description                                                            | Default     |
| :------------ | :---------------------- | :--------------------------------------------------------------------- | :---------- |
| `func`        | `F extends AnyFunction` | **(Required)** The function to be debounced.                           | -           |
| `delay`       | `number`                | **(Required)** The debounce delay in milliseconds.                     | -           |
| `thisContext` | `ThisParameterType<F>`  | The `this` context for the `func`. Essential when using class methods. | `undefined` |
| `leading`     | `boolean`               | If `true`, executes the function on the leading edge.                  | `false`     |
| `trailing`    | `boolean`               | If `true`, executes the function on the trailing edge.                 | `true`      |

### `Debouncer` Instance

An instance of the `Debouncer` class returned by `createDebouncer`.

#### Properties

- **`isPending`**: `boolean` (Getter)
  Returns `true` if a debounced function is scheduled for execution.

#### Methods

- **`trigger(...args: Parameters<F>): void`**
  Triggers the debounce timer. Each call resets the timer. The arguments passed here will be forwarded to the `func` function.

- **`cancel(): void`**
  Cancels any pending execution and clears internal state. This is crucial for preventing memory leaks.

- **`flush(): void`**
  Immediately executes the pending function if one exists, bypassing the delay. If no call is pending, it does nothing.

---

## Advanced Usage & Best Practices

### **⚠️ Important: Lifecycle Management & Memory Leaks**

In modern Single-Page Applications (SPAs) or any component-based architecture, components are frequently created and destroyed. If a `Debouncer` instance is active when its associated component is destroyed, its internal `setTimeout` can keep a reference to the component, preventing it from being garbage collected. **This is a memory leak.**

**Solution:** Always call `debouncer.cancel()` in the cleanup phase of your component or class.

#### Example with a Plain Class

```typescript
class MyComponent {
  private debouncer = createDebouncer({
    func: this.doSomething,
    thisContext: this, // Bind `this` correctly!
    delay: 500,
  });

  constructor() {
    window.addEventListener('resize', this.debouncer.trigger);
  }

  doSomething() {
    console.log('Window resized!', this);
  }

  // The crucial cleanup method
  destroy() {
    window.removeEventListener('resize', this.debouncer.trigger);
    this.debouncer.cancel(); // Prevents memory leaks!
    console.log('Component destroyed and debouncer cleaned up.');
  }
}
```

#### Conceptual Example in React

```jsx
import {useEffect, useMemo} from 'react';
import {createDebouncer} from '@alwatr/debounce';

function MyComponent() {
  const debouncedApiCall = useMemo(
    () =>
      createDebouncer({
        func: (query) => fetch(`/api/search?q=${query}`),
        delay: 300,
      }),
    [],
  );

  useEffect(() => {
    // This is the cleanup function.
    // It runs when the component is unmounted.
    return () => {
      debouncedApiCall.cancel(); // VERY IMPORTANT!
    };
  }, [debouncedApiCall]);

  return <input onChange={(e) => debouncedApiCall.trigger(e.target.value)} />;
}
```

### Using with `thisContext`

When your `func` is a method on a class, `this` can lose its context. Pass the class instance to `thisContext` to ensure it's bound correctly.

```typescript
class ApiService {
  private debouncer = createDebouncer({
    func: this.sendRequest,
    thisContext: this, // Ensures `this` inside `sendRequest` is `ApiService`
    delay: 500,
  });

  constructor(private endpoint: string) {}

  public queueRequest(data: unknown) {
    this.debouncer.trigger(data);
  }

  private sendRequest(data: unknown) {
    console.log(`Sending data to ${this.endpoint}:`, data);
  }
}

const service = new ApiService('/users');
service.queueRequest({name: 'user1'});
service.queueRequest({name: 'user2'}); // Will only send the last request
```

## Contributing

Contributions are welcome\! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the **MPL-2.0**.

---

<br />
<div dir="rtl">

# Alwatr Debounce (راهنمای فارسی)

یک ابزار دیبانس (debounce) قدرتمند، مدرن و تایپ-سیف (Type-Safe) که برای اپلیکیشن‌های با کارایی بالا طراحی شده است. این پکیج به هیچ فریمورکی وابسته نیست، به راحتی در محیط‌های Node.js و مرورگر کار می‌کند و یک API غنی برای کنترل دقیق بر روی اجرای توابع فراهم می‌کند.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/debounce)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/nanolib)
[](https://www.google.com/search?q=alwatr+debounce)
[](https://www.google.com/search?q=alwatr+nanolib)
[](https://www.google.com/search?q=alwatr)

## ویژگی‌ها

- **💪 تایپ-سیف (Type-Safe):** به طور کامل با TypeScript نوشته شده تا از راهنمای خودکار کد (autocompletion) و ایمنی نوع‌داده‌ها بهره‌مند شوید.
- **⚙️ قابلیت تنظیم بالا:** اجرای توابع را با گزینه‌های `leading` (اجرا در ابتدا) و `trailing` (اجرا در انتها) کنترل کنید.
- **🎯 مدیریت دقیق `this` Context:** به صراحت `thisContext` را تعریف کنید تا از مشکلات رایج جاوااسکریپت جلوگیری شود.
- **🔄 آگاه از چرخه حیات (Lifecycle-Aware):** شامل متدهای `cancel()` و `flush()` برای کنترل کامل است که برای جلوگیری از نشت حافظه (memory leaks) در فریمورک‌های کامپوننت-محور ضروری است.
- **🌐 Universal:** در هر محیط جاوااسکریپت، شامل مرورگرها، Node.js، Deno و Bun کار می‌کند.
- **🌳 قابل حذف در باندل نهایی (Tree-Shakable):** با استانداردهای مدرن ESM طراحی شده تا حجم نهایی باندل شما بهینه باشد.

## نصب

```bash
# با استفاده از npm
npm i @alwatr/debounce

# با استفاده از yarn
yarn add @alwatr/debounce

# با استفاده از pnpm
pnpm add @alwatr/debounce
```

---

## مفاهیم اصلی

### دیبانس کردن (Debouncing) چیست؟

دیبانس کردن تکنیکی برای محدود کردن نرخ فراخوانی یک تابع است. این تکنیک تضمین می‌کند که کد شما **فقط یک بار** پس از یک دوره عدم فعالیت مشخص اجرا شود.

**مثال:** یک نوار جستجو را تصور کنید. شما نمی‌خواهید برای هر حرفی که کاربر تایپ می‌کند (`'ج'`, `'جس'`, `'جست'`, ...) یک درخواست API ارسال کنید. به جای آن، منتظر می‌مانید تا کاربر برای لحظه‌ای **تایپ کردن را متوقف کند** (مثلاً ۳۰۰ میلی‌ثانیه) و سپس یک درخواست واحد برای متن نهایی (`'جستجو'`) ارسال می‌کنید. این کار از درخواست‌های شبکه غیرضروری جلوگیری کرده و عملکرد را بهبود می‌بخشد.

### لبه `leading` در مقابل `trailing`

زمان‌بندی اجرای تابع دیبانس شده توسط گزینه‌های `leading` و `trailing` کنترل می‌شود.

- **`trailing: true` (رفتار پیش‌فرض)**
  تابع **پس از** اتمام دوره تأخیر، و به دنبال _آخرین_ فراخوانی، اجرا می‌شود. این رفتار کلاسیک دیبانس است و برای مواردی مانند نوار جستجو یا محاسبات ایده‌آل است.

  ```
  فراخوانی--فراخوانی--فراخوانی----(تأخیر)----> اجرا
  ```

- **`leading: true`**
  تابع **بلافاصله** در _اولین_ فراخوانی اجرا می‌شود. فراخوانی‌های بعدی در طول دوره تأخیر نادیده گرفته می‌شوند. این گزینه برای مواقعی که بازخورد فوری نیاز است (مانند کلیک روی دکمه‌ای که نباید به صورت مکرر فشرده شود) مفید است.

  ```
  اجرا <--فراخوانی--فراخوانی--فراخوانی----(تأخیر)----> (بدون اجرا)
  ```

- **`leading: true` و `trailing: true`**
  تابع هم در **اولین** فراخوانی و هم در **آخرین** فراخوانی که پس از دوره تأخیر رخ می‌دهد، اجرا می‌شود. این حالت برای سناریوهایی که به هر دو عمل فوری و نهایی نیاز دارند، کاربرد دارد.

---

## شروع سریع

ساده‌ترین راه برای شروع، استفاده از تابع سازنده (factory function) `createDebouncer` است.

```typescript
import {createDebouncer} from '@alwatr/debounce';

// ۱. یک نمونه دیبانسر بسازید
const debouncer = createDebouncer({
  // تابعی که می‌خواهید دیبانس کنید
  func: (query: string) => {
    console.log(`در حال جستجو برای: ${query}`);
  },
  // تأخیر بر حسب میلی‌ثانیه
  delay: 300,
});

// ۲. آن را چندین بار فراخوانی کنید
console.log('کاربر در حال تایپ است...');
debouncer.trigger('ع');
debouncer.trigger('عل');
debouncer.trigger('علی');

// پس از ۳۰۰ میلی‌ثانیه عدم فعالیت، در کنسول نمایش داده می‌شود:
// "در حال جستجو برای: علی"
```

## مرجع API

### `createDebouncer(config)`

یک تابع سازنده که یک نمونه جدید از `Debouncer` ایجاد می‌کند. این روش توصیه‌شده برای ساخت دیبانسرها به منظور بهره‌مندی از استنتاج نوع (type inference) بهتر است.

### `DebouncerConfig`

این آبجکت تنظیماتی است که به `createDebouncer` یا سازنده `Debouncer` پاس داده می‌شود.

| ویژگی         | نوع                     | توضیحات                                                               | پیش‌فرض     |
| :------------ | :---------------------- | :-------------------------------------------------------------------- | :---------- |
| `func`        | `F extends AnyFunction` | **(الزامی)** تابعی که باید دیبانس شود.                                | -           |
| `delay`       | `number`                | **(الزامی)** تأخیر دیبانس بر حسب میلی‌ثانیه.                          | -           |
| `thisContext` | `ThisParameterType<F>`  | کانتکست `this` برای `func`. هنگام استفاده از متدهای کلاس ضروری است.   | `undefined` |
| `leading`     | `boolean`               | اگر `true` باشد، تابع در لبه بالارونده (leading edge) اجرا می‌شود.    | `false`     |
| `trailing`    | `boolean`               | اگر `true` باشد، تابع در لبه پایین‌رونده (trailing edge) اجرا می‌شود. | `true`      |

### نمونه `Debouncer`

یک نمونه از کلاس `Debouncer` که توسط `createDebouncer` برگردانده می‌شود.

#### پراپرتی‌ها

- **`isPending`**: `boolean` (Getter)
  اگر یک تابع دیبانس شده برای اجرا زمان‌بندی شده باشد، `true` برمی‌گرداند.

#### متدها

- **`trigger(...args: Parameters<F>): void`**
  تایمر دیبانس را فعال می‌کند. هر فراخوانی، تایمر را ریست می‌کند. آرگومان‌های پاس داده شده به این متد، به تابع `func` ارسال می‌شوند.

- **`cancel(): void`**
  هرگونه اجرای در حال انتظار را لغو کرده و وضعیت داخلی را پاک می‌کند. این متد برای جلوگیری از نشت حافظه بسیار حیاتی است.

- **`flush(): void`**
  در صورت وجود، تابع در حال انتظار را بلافاصله و بدون توجه به تأخیر اجرا می‌کند. اگر هیچ فراخوانی در انتظار نباشد، کاری انجام نمی‌دهد.

---

## استفاده پیشرفته و بهترین شیوه‌ها

### **⚠️ مهم: مدیریت چرخه حیات و نشت حافظه**

در اپلیکیشن‌های مدرن تک‌صفحه‌ای (SPA) یا هر معماری مبتنی بر کامپوننت، کامپوننت‌ها به طور مکرر ایجاد و نابود می‌شوند. اگر یک نمونه `Debouncer` در زمانی که کامپوننت مرتبط با آن نابود می‌شود فعال باشد، `setTimeout` داخلی آن می‌تواند یک ارجاع (reference) به کامپوننت را زنده نگه دارد و از پاک شدن آن توسط Garbage Collector جلوگیری کند. **این وضعیت یک نشت حافظه (Memory Leak) است.**

**راه حل:** همیشه متد `debouncer.cancel()` را در مرحله پاک‌سازی (cleanup) کامپوننت یا کلاس خود فراخوانی کنید.

#### مثال با یک کلاس ساده

```typescript
class MyComponent {
  private debouncer = createDebouncer({
    func: this.doSomething,
    thisContext: this, // `this` را به درستی متصل کنید!
    delay: 500,
  });

  constructor() {
    window.addEventListener('resize', this.debouncer.trigger);
  }

  doSomething() {
    console.log('اندازه پنجره تغییر کرد!', this);
  }

  // متد پاک‌سازی حیاتی
  destroy() {
    window.removeEventListener('resize', this.debouncer.trigger);
    this.debouncer.cancel(); // از نشت حافظه جلوگیری می‌کند!
    console.log('کامپوننت نابود شد و دیبانسر پاک‌سازی شد.');
  }
}
```

#### مثال مفهومی در React

```jsx
import {useEffect, useMemo} from 'react';
import {createDebouncer} from '@alwatr/debounce';

function MyComponent() {
  const debouncedApiCall = useMemo(
    () =>
      createDebouncer({
        func: (query) => fetch(`/api/search?q=${query}`),
        delay: 300,
      }),
    [],
  );

  useEffect(() => {
    // این تابع پاک‌سازی است.
    // زمانی که کامپوننت unmount می‌شود، اجرا خواهد شد.
    return () => {
      debouncedApiCall.cancel(); // بسیار مهم!
    };
  }, [debouncedApiCall]);

  return <input onChange={(e) => debouncedApiCall.trigger(e.target.value)} />;
}
```

### استفاده با `thisContext`

زمانی که `func` شما یک متد از یک کلاس است، `this` ممکن است کانتکست خود را از دست بدهد. برای اطمینان از اتصال صحیح، نمونه کلاس را به `thisContext` پاس دهید.

```typescript
class ApiService {
  private debouncer = createDebouncer({
    func: this.sendRequest,
    thisContext: this, // تضمین می‌کند که `this` در داخل `sendRequest` همان `ApiService` است
    delay: 500,
  });

  constructor(private endpoint: string) {}

  public queueRequest(data: unknown) {
    this.debouncer.trigger(data);
  }

  private sendRequest(data: unknown) {
    console.log(`در حال ارسال داده به ${this.endpoint}:`, data);
  }
}

const service = new ApiService('/users');
service.queueRequest({name: 'user1'});
service.queueRequest({name: 'user2'}); // فقط آخرین درخواست ارسال خواهد شد
```

## مشارکت

از مشارکت شما استقبال می‌کنیم\! لطفاً یک issue باز کنید یا یک pull request ارسال نمایید.

## مجوز

این پروژه تحت مجوز **MPL-2.0** منتشر شده است.

\</div\>
