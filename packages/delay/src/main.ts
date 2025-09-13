import {parseDuration, type Duration} from '@alwatr/parse-duration';

import {requestAnimationFrame, requestIdleCallback} from './polyfill.js';

export {requestAnimationFrame, requestIdleCallback};

/**
 * A utility module to help manage asynchronous operations and waiting for events or timeouts.
 */
export const delay = {
  /**
   * Pauses execution for a specified duration.
   *
   * @param duration The duration to wait. Can be a number in milliseconds or a string like '2s', '100ms'.
   * @returns A Promise that resolves after the specified duration.
   *
   * @example
   * ```typescript
   * await delay.by('1m'); // Wait for 1 minute
   * await delay.by('2s'); // Wait for 2 seconds
   * ```
   */
  by: (duration: Duration): Promise<void> => new Promise((resolve) => setTimeout(resolve, parseDuration(duration))),

  /**
   * Pauses execution until the next animation frame.
   *
   * @returns A Promise that resolves with the high-resolution timestamp of the next animation frame.
   *
   * @example
   * ```typescript
   * const timestamp = await delay.animationFrame();
   * console.log(`Next frame at ${timestamp}`);
   * ```
   */
  animationFrame: (): Promise<DOMHighResTimeStamp> => new Promise((resolve) => requestAnimationFrame(resolve)),

  /**
   * Pauses execution until the browser is idle.
   *
   * @param timeout An optional maximum duration to wait.
   * @returns A Promise that resolves with an `IdleDeadline` object.
   *
   * @example
   * ```typescript
   * const deadline = await delay.idleCallback({ timeout: 2000 });
   * if (deadline.didTimeout) {
   * console.log('Idle callback timed out.');
   * }
   * ```
   */
  idleCallback: (options?: IdleRequestOptions): Promise<IdleDeadline> => new Promise((resolve) => requestIdleCallback(resolve, options)),

  /**
   * Pauses execution until a specific DOM event is dispatched on an element.
   *
   * @param element The HTMLElement to listen on.
   * @param eventName The name of the event to wait for.
   * @param options Optional event listener options.
   * @template T The event map type for the element.
   * @returns A Promise that resolves with the triggered event object.
   *
   * @example
   * ```typescript
   * const button = document.getElementById('my-button');
   * if (button) {
   * const clickEvent = await delay.domEvent(button, 'click');
   * console.log('Button clicked!', clickEvent);
   * }
   * ```
   */
  domEvent: <T extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    eventName: T,
    options: AddEventListenerOptions = {passive: true},
  ): Promise<HTMLElementEventMap[T]> =>
    new Promise((resolve) =>
      element.addEventListener(eventName, resolve, {
        ...options,
        once: true,
      }),
    ),

  /**
   * Pauses execution until a specific event is dispatched on any event target.
   *
   * @param target The event target (e.g., window, document, or a custom event emitter).
   * @param eventName The name of the event to wait for.
   * @param options Optional event listener options.
   * @returns A Promise that resolves with the triggered event object.
   *
   * @example
   * ```typescript
   * const resizeEvent = await delay.event(window, 'resize');
   * console.log('Window resized:', resizeEvent);
   * ```
   */
  event: (target: EventTarget, eventName: string, options: AddEventListenerOptions = {passive: true}): Promise<Event> =>
    new Promise((resolve) =>
      target.addEventListener(eventName, resolve, {
        ...options,
        once: true,
      }),
    ),

  /**
   * Schedules a macrotask to run after the current event loop task completes.
   * Uses `setTimeout(..., 0)`.
   *
   * @returns A Promise that resolves when the macrotask is executed.
   *
   * @example
   * ```typescript
   * console.log('Start');
   * await delay.nextMacrotask();
   * console.log('End - after current task');
   * ```
   */
  nextMacrotask: (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0)),

  /**
   * Queues a microtask to run after the current task completes but before the next macrotask.
   *
   * @returns A Promise that resolves when the microtask is executed.
   *
   * @example
   * ```typescript
   * console.log('Start');
   * await delay.nextMicrotask();
   * console.log('End - immediately after current task');
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  nextMicrotask: (): Promise<void> => Promise.resolve().then(() => {}),
} as const;
