# Alwatr FSM

A tiny, type-safe, declarative, and reactive finite state machine (FSM) library for modern TypeScript applications, built on top of [Alwatr Signals](https://github.com/Alwatr/flux/tree/next/packages/signal).

یک کتابخانه کوچک، تایپ-سیف، اعلانی و واکنش‌گرا (reactive) برای مدیریت وضعیت به روش ماشین حالت متناهی (FSM) در اپلیکیشن‌های مدرن TypeScript که بر پایه [Alwatr Signals](https://github.com/Alwatr/flux/tree/next/packages/signal) ساخته شده است.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/fsm)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/flux)
[](https://www.google.com/search?q=alwatr+fsm)
[](https://www.google.com/search?q=alwatr+flux)
[](https://www.google.com/search?q=alwatr)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/fsm)
[](https://www.google.com/search?q=https://bundlephobia.com/package/%40alwatr/fsm)

## Philosophy

Managing state in complex applications can be challenging. As features grow, state transitions can become unpredictable, leading to bugs and difficult-to-maintain code. Finite State Machines provide a powerful model to solve this problem by formalizing application logic.

An FSM describes a system that can be in **exactly one** of a finite number of **states** at any given time. It transitions from one state to another in response to **events**, following predefined rules. This approach makes state changes predictable, visualizable, and robust.

This library is designed to be:

- **Declarative**: Define your entire machine logic in a single, easy-to-read configuration object.
- **Type-Safe**: Leverage TypeScript to catch errors at compile time, not runtime.
- **Reactive**: Built around signals for seamless integration with modern UI frameworks and reactive codebases.
- **Resilient**: Guarantees Run-to-Completion (RTC) and handles errors in user-defined functions gracefully without crashing.

---

## مفاهیم و فلسفه

مدیریت وضعیت در اپلیکیشن‌های پیچیده یک چالش است. با رشد برنامه، جریان تغییر وضعیت‌ها می‌تواند غیرقابل‌پیش‌بینی شده و منجر به باگ‌ها و کدهای غیرقابل نگهداری شود. ماشین‌های حالت متناهی (FSM) یک مدل قدرتمند برای حل این مشکل از طریق ساختارمند کردن منطق برنامه ارائه می‌دهند.

یک FSM سیستمی را توصیف می‌کند که در هر لحظه **دقیقا در یکی** از تعداد محدودی **وضعیت (state)** قرار دارد. این سیستم در پاسخ به **رویدادها (events)** و بر اساس قوانین از پیش تعریف‌شده، از یک وضعیت به وضعیت دیگر **گذار (transition)** می‌کند. این رویکرد، تغییرات وضعیت را قابل‌پیش‌بینی، قابل ترسیم و مستحکم می‌سازد.

این کتابخانه با اهداف زیر طراحی شده است:

- **اعلانی (Declarative)**: تمام منطق ماشین خود را در یک آبجکت پیکربندی واحد و خوانا تعریف کنید.
- **تایپ-سیف (Type-Safe)**: با بهره‌گیری از قدرت TypeScript، خطاها را در زمان کامپایل پیدا کنید، نه در زمان اجرا.
- **واکنش‌گرا (Reactive)**: مبتنی بر سیگنال‌ها برای یکپارچه‌سازی آسان با فریم‌ورک‌های مدرن و کدهای واکنش‌گرا.
- **مستحکم و تاب‌آور (Resilient)**: مدل اجرای کامل تا انتها (RTC) را تضمین کرده و خطاهای توابع تعریف‌شده توسط کاربر را بدون متوقف کردن سیستم مدیریت می‌کند.

## Installation

```bash
npm i @alwatr/fsm
```

## Core Concepts / مفاهیم کلیدی

| Term           | Description                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------------------ |
| **State**      | The current finite state of the machine (e.g., `'idle'`, `'loading'`).                                              |
| **Context**    | An object holding the "extended state"—any quantitative or non-finite data (e.g., `{retries: 2, data: null}`).      |
| **Event**      | An object that triggers a potential state transition (e.g., `{type: 'FETCH', id: '123'}`).                          |
| **Transition** | A rule defining the path from a source state to a target state for a given event. It can be guarded by a condition. |
| **Assigner**   | A **pure function** that synchronously updates the `context` during a transition.                                   |
| **Effect**     | A function for **side effects** (e.g., API calls, logging) that runs upon entering or exiting a state.              |
| **Condition**  | A **predicate function** that must return `true` for its associated transition to be taken.                         |

| اصطلاح                     | توضیحات                                                                                                                        |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **وضعیت (State)**          | وضعیت متناهی فعلی ماشین (مثلاً `'idle'`, `'loading'`).                                                                         |
| **زمینه (Context)**        | یک آبجکت برای نگهداری "وضعیت گسترده"—هرگونه داده کمی یا نامتناهی (مثلاً `{retries: 2, data: null}`).                           |
| **رویداد (Event)**         | آبجکتی که یک گذار وضعیت بالقوه را آغاز می‌کند (مثلاً `{type: 'FETCH', id: '123'}`).                                            |
| **گذار (Transition)**      | قانونی که مسیر از یک وضعیت مبدأ به یک وضعیت مقصد را برای یک رویداد خاص تعریف می‌کند. این گذار می‌تواند توسط یک شرط محافظت شود. |
| **تخصیص‌دهنده (Assigner)** | یک **تابع خالص** که به صورت همزمان (synchronously) `context` را در طول یک گذار به‌روزرسانی می‌کند.                             |
| **اثر جانبی (Effect)**     | تابعی برای **عملیات‌های جانبی** (مانند فراخوانی API یا لاگ کردن) که هنگام ورود یا خروج از یک وضعیت اجرا می‌شود.                |
| **شرط (Condition)**        | یک **تابع گزاره‌ای** که باید `true` برگرداند تا گذار مرتبط با آن انجام شود.                                                    |

## Example 1: A Simple Light Switch

Let's model a simple light switch that can be turned on and off.

### ۱. تعریف انواع

First, define the types for the states, events, and context.
ابتدا انواع مربوط به وضعیت‌ها، رویدادها و زمینه را تعریف می‌کنیم.

```ts
import type {StateMachineConfig} from '@alwatr/fsm';

// The context stores the brightness level.
type LightContext = {brightness: number};

// The machine can only be in one of these two states.
type LightState = 'on' | 'off';

// Define the events that can be sent to the machine.
type LightEvent = {type: 'TOGGLE'} | {type: 'SET_BRIGHTNESS'; level: number};
```

### ۲. پیکربندی ماشین

Define the entire machine logic in a configuration object.
کل منطق ماشین را در یک آبجکت پیکربندی تعریف می‌کنیم.

```ts
const lightMachineConfig: StateMachineConfig<LightState, LightEvent, LightContext> = {
  name: 'light-switch',
  initial: 'off',
  context: {brightness: 0},
  states: {
    off: {
      on: {
        // When in the 'off' state and a 'TOGGLE' event occurs...
        TOGGLE: {
          target: 'on', // ...transition to the 'on' state.
          assigners: [() => ({brightness: 100})], // ...and set brightness to 100.
        },
      },
    },
    on: {
      on: {
        // When in the 'on' state and a 'TOGGLE' event occurs...
        TOGGLE: {
          target: 'off', // ...transition to 'off'.
          assigners: [() => ({brightness: 0})], // ...and reset brightness.
        },
        // An internal transition that only updates context without changing the state.
        SET_BRIGHTNESS: {
          // No 'target' means it's an internal transition.
          assigners: [(event) => ({brightness: event.level})],
        },
      },
    },
  },
};
```

### ۳. ساخت و استفاده از سرویس

Create the service and interact with it using signals.
سرویس را ایجاد کرده و با استفاده از سیگنال‌ها با آن تعامل می‌کنیم.

```ts
import {createFsmService} from '@alwatr/fsm';

// Create the FSM service instance.
const lightService = createFsmService(lightMachineConfig);

// Subscribe to state changes.
lightService.stateSignal.subscribe((state) => {
  console.log(`Light is ${state.name} with brightness ${state.context.brightness}`);
});

// Dispatch events to trigger transitions.
lightService.eventSignal.dispatch({type: 'TOGGLE'});
// Logs: Light is on with brightness 100

lightService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 50});
// Logs: Light is on with brightness 50

lightService.eventSignal.dispatch({type: 'TOGGLE'});
// Logs: Light is off with brightness 0
```

## Example 2: Async Data Fetching

A more advanced example showing side effects (`effects`) and conditional transitions (`condition`).

```ts
import {createFsmService} from '@alwatr/fsm';
import type {StateMachineConfig} from '@alwatr/fsm';

// Types
type User = {id: string; name: string};
type FetchContext = {user: User | null; error: string | null};
type FetchState = 'idle' | 'pending' | 'success' | 'error';
type FetchEvent = {type: 'FETCH'; id: string} | {type: 'RESOLVE'; user: User} | {type: 'REJECT'; error: string} | {type: 'RETRY'};

// FSM Configuration
const fetchMachineConfig: StateMachineConfig<FetchState, FetchEvent, FetchContext> = {
  name: 'fetch-user',
  initial: 'idle',
  context: {
    user: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH: {target: 'pending'},
      },
    },
    pending: {
      // On entering 'pending' state, execute the fetchUser effect.
      entry: [
        async (event, context) => {
          if (event.type !== 'FETCH') return; // Type guard
          try {
            console.log(`Fetching user with id: ${event.id}...`);
            const response = await fetch(`https://api.example.com/users/${event.id}`);
            if (!response.ok) throw new Error('User not found');
            const user = (await response.json()) as User;
            // An effect can return a new event to be dispatched back to the machine.
            return {type: 'RESOLVE', user};
          } catch (err) {
            // If an error occurs, dispatch a 'REJECT' event.
            return {type: 'REJECT', error: (err as Error).message};
          }
        },
      ],
      on: {
        RESOLVE: {
          target: 'success',
          assigners: [(event) => ({user: event.user})],
        },
        REJECT: {
          target: 'error',
          assigners: [(event) => ({error: event.error})],
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
          // A condition that must be met for the transition to occur.
          condition: (event, context) => {
            // This is just an example; you might have retry logic in the context.
            console.log('Checking retry condition...');
            return true;
          },
        },
      },
    },
  },
};

// --- Usage ---
const fetchService = createFsmService(fetchMachineConfig);

fetchService.stateSignal.subscribe((state) => {
  console.log('Current State:', state.name);
  if (state.name === 'success') console.log('User:', state.context.user);
  if (state.name === 'error') console.log('Error:', state.context.error);
});

fetchService.eventSignal.dispatch({type: 'FETCH', id: '1'});
```

## Architectural Advantages / مزیت‌های معماری

- **Predictable & Visualizable**: By constraining how and when state can change, your application logic becomes deterministic and easy to reason about. The declarative nature of the config allows for easy visualization of all possible states and transitions.
  <br>
  **قابل پیش‌بینی و ترسیم**: با محدود کردن زمان و چگونگی تغییر وضعیت، منطق برنامه شما قطعی و قابل درک می‌شود. ماهیت اعلانی پیکربندی، امکان ترسیم و مشاهده تمام وضعیت‌ها و گذارهای ممکن را فراهم می‌کند.

- **Type-Safe by Design**: The library is built from the ground up with TypeScript. It ensures that event payloads are correctly typed for each transition and that assigners update the context with valid data, preventing a wide class of bugs at compile time.
  <br>
  **ذاتاً تایپ-سیف**: این کتابخانه از پایه با TypeScript ساخته شده است. این امر تضمین می‌کند که پارامترهای رویدادها در هر گذار به درستی تایپ‌دهی شده و `assigner`ها زمینه (`context`) را با داده‌های معتبر به‌روزرسانی می‌کنند، که از بروز دسته وسیعی از باگ‌ها در زمان کامپایل جلوگیری می‌کند.

- **Decouples Logic from UI**: The `FsmService` encapsulates your application's logic, keeping it completely independent of your UI framework. Your UI simply subscribes to the `stateSignal` and dispatches events to the `eventSignal`. This improves testability and makes it easy to refactor or even replace the UI layer.
  <br>
  **جداسازی منطق از UI**: سرویس FSM منطق برنامه شما را کپسوله کرده و آن را کاملاً مستقل از فریم‌ورک UI نگه می‌دارد. لایه UI شما تنها به `stateSignal` گوش می‌دهد و رویدادها را به `eventSignal` ارسال می‌کند. این رویکرد آزمون‌پذیری را بهبود بخشیده و بازنویسی یا حتی تعویض لایه UI را آسان می‌کند.

- **Robust & Resilient**: The machine operates on a Run-to-Completion (RTC) model, ensuring that each event is fully processed before the next one begins, preventing race conditions. Furthermore, any errors thrown inside user-defined functions (`condition`, `assigner`, `effect`) are caught and logged, preventing the entire machine from crashing.
    <br>
    **مستحکم و انعطاف‌پذیر**: ماشین بر اساس مدل اجرای کامل تا انتها (RTC) عمل می‌کند، که تضمین می‌کند هر رویداد به طور کامل پردازش شده و سپس رویداد بعدی آغاز می‌شود. این از بروز race condition جلوگیری می‌کند. علاوه بر این، هرگونه خطای ایجاد شده در توابع تعریف‌شده توسط کاربر (`condition`, `assigner`, `effect`) مدیریت و لاگ می‌شود و از کرش کردن کل ماشین جلوگیری می‌کند.

## API Reference / مرجع API

### `createFsmService(config)`

The main factory function to create a new FSM service.
تابع اصلی برای ساخت یک سرویس FSM جدید.

- **`config`**: `StateMachineConfig<TState, TEvent, TContext>`
  - The declarative configuration object for the state machine.
  - آبجکت پیکربندی اعلانی برای ماشین حالت.
- **Returns**: `FsmService<TState, TEvent, TContext>`
  - An instance of the FSM service with two main properties:
    - `stateSignal`: A readable signal that emits the current `MachineState`.
    - `eventSignal`: A signal to `dispatch` new events to the machine.
  - یک نمونه از سرویس FSM با دو پراپرتی اصلی:
    - `stateSignal`: یک سیگنال خواندنی که `MachineState` فعلی را منتشر می‌کند.
    - `eventSignal`: سیگنالی برای ارسال (`dispatch`) رویدادهای جدید به ماشین.

### Key Types / انواع کلیدی

| Type                     | Description                                                                   |
| :----------------------- | :---------------------------------------------------------------------------- |
| **`MachineState<S, C>`** | Represents the complete state, containing `name: S` and `context: C`.         |
| **`MachineEvent<T>`**    | The base interface for events. Must have a `type: T` property.                |
| **`StateMachineConfig`** | The main configuration object defining `initial`, `context`, and `states`.    |
| **`Transition`**         | Defines a transition with an optional `target`, `condition`, and `assigners`. |

| نوع                      | توضیحات                                                                                                        |
| :----------------------- | :------------------------------------------------------------------------------------------------------------- |
| **`MachineState<S, C>`** | وضعیت کامل ماشین را نمایش می‌دهد که شامل `name: S` (نام وضعیت) و `context: C` (زمینه) است.                     |
| **`MachineEvent<T>`**    | اینترفیس پایه برای رویدادها. باید یک پراپرتی `type: T` داشته باشد.                                             |
| **`StateMachineConfig`** | آبجکت اصلی پیکربندی که `initial` (وضعیت اولیه)، `context` (زمینه اولیه) و `states` (وضعیت‌ها) را تعریف می‌کند. |
| **`Transition`**         | یک گذار را با `target` (مقصد)، `condition` (شرط) و `assigners` (تخصیص‌دهنده‌ها)ی اختیاری تعریف می‌کند.         |

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
