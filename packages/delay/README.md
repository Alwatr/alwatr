# @alwatr/delay

`@alwatr/delay` offers a collection of utility functions to handle asynchronous execution flow effectively. It allows you to pause your code until specific conditions are met or certain events occur. This functionality aids in managing complex asynchronous scenarios and crafting intricate flows with ease. The functions can be used independently or combined for robust control over asynchronous operations.

## Installation

```bash
npm install @alwatr/delay
```

```bash
yarn add @alwatr/delay
```

## Usage

Each function within `@alwatr/delay` returns a Promise that resolves when the specified waiting condition is met. Here's a breakdown of the available functions:

- **waitForTimeout(duration: number): Promise<void>**

  - Waits for a specified duration (in milliseconds) before resolving.
  - Example:

    ```typescript
    import {waitForTimeout} from '@alwatr/delay';

    await waitForTimeout(1000); // Waits for 1 second
    ```

- **waitForAnimationFrame(): Promise<DOMHighResTimeStamp>**

  - Pauses execution until the next animation frame is scheduled, resolving with the current timestamp.
  - Useful for synchronizing UI updates with browser rendering.
  - Example:

    ```typescript
    import {waitForAnimationFrame} from '@alwatr/delay';

    await waitForAnimationFrame(); // Waits for next animation frame
    ```

- **waitForIdle(timeout?: number): Promise<IdleDeadline>**

  - Waits for the next idle period (when the browser is not busy), resolving with an `IdleDeadline` object.
  - Optionally accepts a timeout value (in milliseconds) for maximum waiting time.
  - Ideal for executing tasks that don't impact user experience.
  - Example:

    ```typescript
    import {waitForIdle} from '@alwatr/delay';

    await waitForIdle(); // Waits for next idle period
    ```

- **waitForDomEvent<T extends keyof HTMLElementEventMap>(element: HTMLElement, eventName: T): Promise<HTMLElementEventMap[T]>**

  - Pauses execution until a specific DOM event is triggered on a provided element, resolving with the event object.
  - Example:

    ```typescript
    import {waitForDomEvent} from '@alwatr/delay';

    const button = document.getElementById('myButton');
    await waitForDomEvent(button, 'click'); // Waits for click event on button
    ```

- **waitForEvent(target: HasAddEventListener, eventName: string): Promise<Event>**

  - More generic version of `waitForDomEvent`, allowing waiting for any event on any object with an `addEventListener` method.
  - Example:

    ```typescript
    import {waitForEvent} from '@alwatr/delay';

    const server = http.createServer();
    await waitForEvent(server, 'request'); // Waits for request event on server
    ```

- **waitForImmediate(): Promise<void>**

  - Executes the next task in the microtask queue immediately after the current task finishes.
  - Example:

    ```typescript
    import {waitForImmediate} from '@alwatr/delay';

    await waitForImmediate(); // Executes next microtask
    ```

- **waitForMicrotask(): Promise<void>**

  - Similar to `waitForImmediate`, but waits specifically for the next microtask queue.
  - Example:

    ```typescript
    import {waitForMicrotask} from '@alwatr/delay';

    await waitForMicrotask(); // Waits for next microtask queue
    ```

## Contributing

We welcome contributions to improve this package! Feel free to open bug reports, suggest new features, or submit pull requests following our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md).

**License:**

This package is distributed under the [MIT License](https://alimd.mit-license.org/).

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.


