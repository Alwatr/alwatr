# @alwatr/delay

A robust and lightweight utility library for managing asynchronous operations in JavaScript and TypeScript. `@alwatr/delay` provides a collection of promise-based functions to pause execution until specific conditions are met, such as timeouts, animation frames, idle callbacks, or DOM events. This helps create clean, readable, and predictable asynchronous code.

## Installation

```bash
# Using npm
npm install @alwatr/delay

# Using yarn
yarn add @alwatr/delay
```

## Usage

All functions are available under the `delay` object and return a `Promise`. You can use them with `async/await` for clean and linear code flow.

```typescript
import {delay} from '@alwatr/delay';

async function main() {
  console.log('Waiting for 1 second...');
  await delay.by('1s');
  console.log('Done.');
}
```

### API Reference

- **`delay.by(duration: Duration): Promise<void>`**

  Pauses execution for a specified duration. The duration can be a number (in milliseconds) or a string (e.g., `'2s'`, `'500ms'`).

  ```typescript
  await delay.by(2000); // Waits for 2 seconds
  await delay.by('5m'); // Waits for 5 minutes
  ```

- **`delay.animationFrame(): Promise<DOMHighResTimeStamp>`**

  Resolves at the beginning of the next browser animation frame. Useful for synchronizing animations and DOM updates with the browser's rendering cycle to avoid layout thrashing.

  ```typescript
  const timestamp = await delay.animationFrame();
  console.log(`Rendering next frame at ${timestamp}`);
  // Perform DOM updates here
  ```

- **`delay.idleCallback(options?: IdleRequestOptions): Promise<IdleDeadline>`**

  Resolves when the browser's event loop is idle. Ideal for deferring non-critical background tasks to avoid impacting user experience.

  ```typescript
  const deadline = await delay.idleCallback({timeout: 1000});
  if (!deadline.didTimeout) {
    console.log('Running background task during idle time.');
  }
  ```

- **`delay.domEvent<T extends keyof HTMLElementEventMap>(...): Promise<HTMLElementEventMap[T]>`**

  Waits for a specific DOM event to be dispatched on an `HTMLElement`.

  ```typescript
  const button = document.getElementById('my-button');
  if (button) {
    const event = await delay.domEvent(button, 'click');
    console.log('Button was clicked!', event);
  }
  ```

- **`delay.event(target: EventTarget, eventName: string, ...): Promise<Event>`**

  A more generic version of `domEvent`. Waits for any event on any `EventTarget` (e.g., `window`, `document`, or custom event emitters).

  ```typescript
  console.log('Waiting for window resize...');
  await delay.event(window, 'resize');
  console.log('Window was resized!');
  ```

- **`delay.nextMacrotask(): Promise<void>`**

  Schedules a macrotask to run in the next cycle of the event loop. This is useful for yielding control back to the browser, allowing it to handle rendering and other user-facing tasks. Implemented with `setTimeout(..., 0)`.

  ```typescript
  console.log('A');
  await delay.nextMacrotask();
  console.log('B'); // This will log after 'A' and after the browser has had a chance to breathe.
  ```

- **`delay.nextMicrotask(): Promise<void>`**

  Queues a microtask to be executed immediately after the current task completes, before the event loop proceeds to the next macrotask. Useful for scheduling work that needs to happen synchronously after an operation but without blocking the main thread.

  ```typescript
  console.log('A');
  Promise.resolve().then(() => console.log('C'));
  await delay.nextMicrotask();
  console.log('B'); // Logs A, C, B
  ```

## Contributing

Contributions are welcome\! Please feel free to open an issue or submit a pull request. Read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) to get started.

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.
