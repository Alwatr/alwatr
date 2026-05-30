# @alwatr/delay

An optimized, lightweight, and cross-platform asynchronous flow-control and scheduling utility module for the Alwatr ecosystem. It provides Promise-based waiting utilities for timeouts, browser paint repaints, idle states, DOM events, and micro/macrotask cycles with built-in runtime fallbacks.

## Features

- **Duration Parsing Support**: Pause execution using either raw milliseconds (`number`) or human-readable duration strings like `'1.5s'`, `'10m'` (powered by `@alwatr/parse-duration`).
- **High-Performance Macrotasks**: `delay.nextMacrotask` and the directly exported `queueMacrotask` bypass the browser's HTML-standard 4ms minimum nesting delay penalty using a zero-delay `MessageChannel` dispatcher.
- **Robust Queue Management**: `queueMacrotask` resolves consecutive call overwriting bugs by using a memory-safe, allocation-free FIFO task queue with moving head pointer.
- **Native Microtasks**: `delay.nextMicrotask` and `queueMicrotask` queue tasks on the native stack, running before browser repaints or sibling macrotasks.
- **Robust Fallbacks**: Automatically falls back to high-fidelity simulated timers when browser-specific APIs (`requestAnimationFrame`, `requestIdleCallback`, `queueMicrotask`) are executed in Node.js, Bun, or older platforms.
- **Memory-Safe Events**: `delay.domEvent` and `delay.event` auto-unsubscribe from listeners on fulfillment, ensuring zero memory leaks.

## Installation

```bash
# Using bun
bun add @alwatr/delay

# Using npm
npm install @alwatr/delay
# Using yarn
yarn add @alwatr/delay
```

## Usage

All async utilities return a `Promise`, allowing seamless use with `async/await`.

```typescript
import {delay} from '@alwatr/delay';

async function main() {
  console.log('Task A started');

  // Pause for 1.5 seconds
  await delay.by('1.5s');

  console.log('Task A finished');
}
```

---

## API Reference

### Promise-based Utilities (`delay`)

#### `delay.by(duration: Duration): Promise<void>`

Suspends the execution flow for a designated duration.

- **`duration`**: `number` (milliseconds) or `Duration` string (e.g. `'2s'`, `'5m'`, `'100ms'`).
- **Returns**: `Promise<void>` that resolves after the specified duration.

```typescript
await delay.by(100); // 100 milliseconds
await delay.by('2.5s'); // 2.5 seconds
await delay.by('10m'); // 10 minutes
```

#### `delay.animationFrame(): Promise<DOMHighResTimeStamp>`

Suspends execution flow sequentially until the hardware screen context is ready for the next visual paint refresh. Excellent for layout updates to avoid layout thrashing.

- **Returns**: `Promise<DOMHighResTimeStamp>` resolving with the frame timestamp.

```typescript
const frameTime = await delay.animationFrame();
updateUIPosition(frameTime);
```

#### `delay.idleCallback(options?: IdleRequestOptions): Promise<IdleDeadline>`

Postpones code execution blocks until the main browser task execution thread falls completely silent (idle).

- **`options`**: Optional `IdleRequestOptions` containing a `timeout` configuration.
- **Returns**: `Promise<IdleDeadline>` containing standard idle metadata.

```typescript
const deadline = await delay.idleCallback({timeout: 1000});
if (deadline.timeRemaining() > 0) {
  runLowPriorityLogs();
}
```

#### `delay.domEvent<T>(element: HTMLElement, eventName: T, options?: AddEventListenerOptions): Promise<Event>`

Pauses the current loop until an explicit event signature fires on a targeted `HTMLElement`. Automatically unsubscribes immediately upon fulfillment to guarantee absolute zero leak vectors.

- **`element`**: Target `HTMLElement`.
- **`eventName`**: The event key to wait for (e.g., `'click'`).
- **`options`**: Optional event listener settings (defaults to `{ passive: true }`).
- **Returns**: `Promise` resolving with the event object.

```typescript
const clickEvent = await delay.domEvent(button, 'click');
console.log('User clicked:', clickEvent.clientX);
```

#### `delay.event(target: EventTarget, eventName: string, options?: AddEventListenerOptions): Promise<Event>`

A generic version of `domEvent` supporting any `EventTarget` (e.g., `window`, `document`, custom event emitters). Automatically unsubscribes on fulfillment.

```typescript
await delay.event(window, 'resize');
console.log('Window layout resized!');
```

#### `delay.nextMacrotask(): Promise<void>`

Bypasses the HTML 4ms nesting speed limit via structural `MessageChannel` ports, pushing execution to the absolute earliest boundary of the next event loop tick sequence.

```typescript
console.log('First macrotask');
await delay.nextMacrotask();
console.log('Runs at the very beginning of the next macrotask');
```

#### `delay.nextMicrotask(): Promise<void>`

Native, highly-efficient microtask batching mechanism. Pushes tasks straight to the native execution stack, guaranteeing execution BEFORE the repaint task thread or sibling macrotasks intercept control.

```typescript
console.log('Sync block');
await delay.nextMicrotask();
console.log('Runs immediately after sync block, before repaint/macrotasks');
```

---

### Low-Level Helpers

The module also exports robust low-level scheduling utilities.

#### `queueMacrotask(callback: VoidFunction): void`

High-performance zero-delay macrotask dispatcher. Bypasses the browser's 4ms setTimeout nested clamp penalty via a persistent, memory-safe FIFO queue on a shared `MessageChannel`.

```typescript
queueMacrotask(() => {
  console.log('Executed in the next event loop tick');
});
```

#### `queueMicrotask(callback: VoidFunction): void`

Safe fallback for native `queueMicrotask`. Prioritizes native implementation; reverts to Promise chaining on older runtimes.

#### `requestAnimationFrame(callback: FrameRequestCallback): number`

Safe fallback for browser paint repaints. Simulates a `setTimeout` loop targeting 30FPS if executed in Node.js/Bun or headless environments.

#### `requestIdleCallback(callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions): number`

Schedules non-critical work during event loop idle periods. Yields a simulated 50ms processing timeframe budget if the host platform lacks native layout scheduling hooks.

## Contributing

Contributions are welcome\! Please feel free to open an issue or submit a pull request. Read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) to get started.

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.
