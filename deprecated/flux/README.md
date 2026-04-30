# Flux: The Reactive Brain for Your TypeScript Application

[](https://www.google.com/search?q=alwatr+flux)
[](https://www.google.com/search?q=alwatr+fsm)
[](https://www.google.com/search?q=alwatr+signal)
[](https://www.google.com/search?q=alwatr)
[](https://www.npmjs.com/package/%40alwatr/flux)
[](https://www.npmjs.com/package/%40alwatr/fsm)
[](https://www.npmjs.com/package/%40alwatr/signal)

**Flux** is not just another state management library; it's a paradigm shift. It provides a cohesive, type-safe, and incredibly performant ecosystem for orchestrating application state, from simple reactive values to complex, resilient workflows. Built on the principles of predictability and simplicity, Flux empowers you to write clean, decoupled, and highly maintainable code.

Stop wrestling with unpredictable state changes and bloated frameworks. Embrace a system where logic flows intuitively.

---

# فلاکس: مغز متفکر واکنشی برای اپلیکیشن TypeScript شما

**فلاکس** یک کتابخانه مدیریت وضعیت معمولی نیست؛ یک تغییر پارادایم است. این اکوسیستم یکپارچه، تایپ-سیف و فوق‌العاده کارآمد، ابزاری برای سازماندهی وضعیت اپلیکیشن شما فراهم می‌کند؛ از مقادیر واکنشی ساده گرفته تا گردش‌کارهای پیچیده و تاب‌آور. فلاکس بر اساس اصول پیش‌بینی‌پذیری و سادگی ساخته شده و به شما قدرت می‌دهد تا کدی تمیز، مستقل و با قابلیت نگهداری بالا بنویسید.

با تغییرات وضعیت غیرقابل‌پیش‌بینی و فریم‌ورک‌های سنگین خداحافظی کنید. سیستمی را بپذیرید که در آن، منطق به شکلی طبیعی و قابل درک جریان دارد.

## Core Packages / پکیج‌های اصلی

Flux is a monorepo containing a suite of powerful, focused packages. The two main pillars are:
فلاکس یک مونوریپو است که مجموعه‌ای از پکیج‌های قدرتمند و متمرکز را در خود جای داده است. دو ستون اصلی آن عبارتند از:

- **[@alwatr/signal](https://github.com/Alwatr/flux/tree/next/packages/signal)**: A revolutionary reactive programming library. It provides the foundational blocks for creating and composing streams of data and events with surgical precision.
  <br>یک کتابخانه برنامه‌نویسی واکنشی انقلابی. این پکیج، بلوک‌های بنیادین برای ایجاد و ترکیب جریان‌های داده و رویدادها را با دقتی بی‌نظیر فراهم می‌کند.

- **[@alwatr/fsm](https://github.com/Alwatr/flux/tree/next/packages/fsm)**: A tiny, declarative, and type-safe Finite State Machine (FSM) library built on top of signals. It makes modeling complex, multi-step logic feel effortless and robust.
  <br>یک کتابخانه ماشین حالت متناهی (FSM) کوچک، اعلانی و تایپ-سیف که بر پایه سیگنال‌ها ساخته شده است. این ابزار، مدل‌سازی منطق‌های پیچیده و چندمرحله‌ای را به کاری آسان و مستحکم تبدیل می‌کند.

---

## 🚀 Deep Dive 1: The Power of Signals

Everything in Flux starts with a **Signal**. Think of a signal as a living value—a variable that broadcasts an alert whenever it changes. You can listen to these alerts to run side effects or create new signals that derive their value from others.

### Practical Example: A Smart Search Input

Let's build a search component that only triggers a search when the user has typed at least 3 characters and has paused typing for 300ms.

#### ۱. تعریف سیگنال‌های پایه (Define Core Signals)

```typescript
import {StateSignal, ComputedSignal, createDebouncedSignal} from '@alwatr/signal';

// 1. A StateSignal to hold the raw input from the user.
// ۱. یک StateSignal برای نگهداری ورودی خام کاربر.
const searchInput = new StateSignal<string>({
  name: 'search-input',
  initialValue: '',
});

// 2. A ComputedSignal that derives a boolean value.
//    It's true only if the input is long enough.
// ۲. یک ComputedSignal که یک مقدار boolean را استخراج می‌کند.
//    این سیگنال تنها زمانی true است که طول ورودی کافی باشد.
const isSearchValid = new ComputedSignal<boolean>({
  name: 'is-search-valid',
  deps: [searchInput],
  get: () => searchInput.get().length >= 3,
});
```

#### ۲. ساخت سیگنال Debounce شده (Create the Debounced Signal)

Now, we create a new signal that only updates after the user stops typing. This is a powerful "operator" that prevents flooding your application with unnecessary events.

```typescript
// 3. A debounced signal that waits for 300ms of inactivity on the searchInput.
// ۳. یک سیگنال debounce شده که ۳۰۰ میلی‌ثانیه پس از توقف فعالیت در searchInput به‌روز می‌شود.
const debouncedSearch = createDebouncedSignal(searchInput, {
  delay: 300,
});
```

#### ۳. اجرای Side Effect نهایی (Execute the Final Side Effect)

Finally, an `EffectSignal` listens to our debounced signal and performs the search, but only if the input is valid.

```typescript
import {EffectSignal} from '@alwatr/signal';

// 4. An EffectSignal to run the final logic (e.g., call an API).
// ۴. یک EffectSignal برای اجرای منطق نهایی (مثلاً فراخوانی یک API).
const searchEffect = new EffectSignal({
  name: 'api-caller-effect',
  deps: [debouncedSearch], // It only runs when the debounced value changes.
  run: () => {
    // We check our computed signal before proceeding.
    if (isSearchValid.get() === false) {
      console.log('Search is not valid. Skipping API call.');
      return;
    }

    const query = debouncedSearch.get();
    console.log(`🚀 Calling API with query: "${query}"...`);
    // fetch(`/api/search?q=${query}`);
  },
});

// --- Simulate User Input ---
searchInput.set('a'); // Logs: Search is not valid.
searchInput.set('ab'); // Logs: Search is not valid.
searchInput.set('abc'); // After 300ms, logs: 🚀 Calling API with query: "abc"...
```

This example shows the true power of composition. We built a sophisticated, performant feature by chaining simple, declarative signals together.

---

## 🧠 Deep Dive 2: Mastering Complexity with State Machines

For logic that involves multiple, distinct stages—like data fetching, user onboarding, or a shopping cart—a Finite State Machine (FSM) is your best friend. An FSM ensures that your application can only be in **one defined state at a time** and can only transition between states in ways you explicitly allow.

### Practical Example: A Resilient Data Fetcher

Let's model a robust data fetching workflow that handles loading, success, and error states, and even allows for retries.

#### ۱. تعریف انواع و پیکربندی (Define Types & Configuration)

```typescript
import {createFsmService} from '@alwatr/fsm';
import type {StateMachineConfig} from '@alwatr/fsm';

// Types for our machine
type User = {id: string; name: string};
type FetchContext = {user: User | null; error: Error | null; retries: number};
type FetchState = 'idle' | 'pending' | 'success' | 'error';
type FetchEvent =
  | {type: 'FETCH'; id: string}
  | {type: 'RESOLVE'; user: User}
  | {type: 'REJECT'; error: Error}
  | {type: 'RETRY'};

// The entire logic is declared in this single configuration object.
// تمام منطق در این آبجکت پیکربندی واحد تعریف می‌شود.
const fetchMachineConfig: StateMachineConfig<FetchState, FetchEvent, FetchContext> = {
  name: 'user-fetcher',
  initial: 'idle',
  context: {user: null, error: null, retries: 0},
  states: {
    idle: {
      on: {
        FETCH: {target: 'pending'},
      },
    },
    pending: {
      // On entering 'pending', this effect runs automatically.
      // با ورود به وضعیت 'pending'، این effect به صورت خودکار اجرا می‌شود.
      entry: [
        async (event) => {
          if (event.type !== 'FETCH') return; // Type guard
          try {
            const response = await fetch(`https://api.example.com/users/${event.id}`);
            if (!response.ok) throw new Error('User not found');
            const user = (await response.json()) as User;
            // An effect can dispatch a new event back to the machine.
            // یک effect می‌تواند یک رویداد جدید را به خود ماشین ارسال کند.
            return {type: 'RESOLVE', user};
          } catch (err) {
            return {type: 'REJECT', error: err as Error};
          }
        },
      ],
      on: {
        RESOLVE: {
          target: 'success',
          assigners: [(event) => ({user: event.user})], // Update context
        },
        REJECT: {
          target: 'error',
          assigners: [(event) => ({error: event.error})], // Update context
        },
      },
    },
    success: {
      on: {
        FETCH: {target: 'pending'}, // Allow re-fetching
      },
    },
    error: {
      on: {
        RETRY: {
          target: 'pending',
          // A transition can be protected by a condition.
          // یک گذار می‌تواند توسط یک شرط محافظت شود.
          condition: (event, context) => context.retries < 3,
          assigners: [(event, context) => ({retries: context.retries + 1})],
        },
      },
    },
  },
};
```

#### ۲. استفاده از سرویس FSM (Using the FSM Service)

The FSM service exposes signals that you can subscribe to in your UI or other parts of your application. This completely decouples your logic from the presentation layer.

```typescript
const fetchService = createFsmService(fetchMachineConfig);

// Subscribe to state changes to update the UI.
fetchService.stateSignal.subscribe((state) => {
  console.log(`Current State: ${state.name}`, state.context);
  // In a real app_
  // if (state.name === 'pending') showSpinner();
  // if (state.name === 'success') showUserData(state.context.user);
  // if (state.name === 'error') showError(state.context.error);
});

// Dispatch events to drive the machine.
fetchService.eventSignal.dispatch({type: 'FETCH', id: '1'});

// If it fails, you could dispatch a retry event.
// setTimeout(() => {
//   if (fetchService.stateSignal.get().name === 'error') {
//     fetchService.eventSignal.dispatch({type: 'RETRY'});
//   }
// }, 1000);
```

With this FSM, you have created a predictable, visualizable, and crash-proof workflow. Race conditions and unpredictable states are now a thing of the past.

---

## Learn More / بیشتر بیاموزید

This was just a glimpse into the power of the Flux ecosystem. To truly master them, dive into the detailed documentation for each package:

این تنها نگاهی کوتاه به قدرت اکوسیستم فلاکس بود. برای تسلط کامل، مستندات دقیق هر پکیج را مطالعه کنید:

- **[dive deep into `@alwatr/signal`](https://github.com/Alwatr/flux/tree/next/packages/signal)**
- **[dive deep into `@alwatr/fsm`](https://github.com/Alwatr/flux/tree/next/packages/fsm)**

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.
