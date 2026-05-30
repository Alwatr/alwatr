import {getGlobalThis} from '@alwatr/global-this';
import {parseDuration} from '@alwatr/parse-duration';
import type {Duration} from '@alwatr/parse-duration';
import type {DictionaryOpt} from '@alwatr/type-helper';

const globalThis = getGlobalThis<DictionaryOpt<unknown>>();

/**
 * Robust fallback wrapper for native `queueMicrotask`.
 *
 * Queues a microtask to be executed at the end of the current task.
 * If the native `queueMicrotask` is not available, falls back to Promise chaining.
 *
 * @param callback - The function to be executed as a microtask.
 *
 * @example
 * ```ts
 * queueMicrotask(() => {
 *   console.log('Executed in the microtask queue');
 * });
 * ```
 */
export const queueMicrotask: (callback: VoidFunction) => void =
  globalThis.queueMicrotask?.bind(globalThis) ??
  ((callback: VoidFunction) => {
    void Promise.resolve()
      .then(callback)
      .catch((error) => {
        console.error('queueMicrotask_fallback', 'microtask_exception', error);
      });
  });

/**
 * Robust fallback wrapper for native `requestAnimationFrame`.
 *
 * Schedules a callback to be run before the next browser repaint.
 * If the environment does not support `requestAnimationFrame` (e.g., Node.js, Bun, or Web Workers),
 * it falls back to a timer that simulates a ~30 frames-per-second (33.3ms) refresh rate.
 *
 * @param callback - The function to execute before the next repaint. Receives a high-resolution timestamp.
 * @returns A unique request ID that can be used to cancel the request.
 *
 * @example
 * ```ts
 * requestAnimationFrame((timestamp) => {
 *   console.log('Frame timestamp:', timestamp);
 * });
 * ```
 */
export const requestAnimationFrame: (callback: FrameRequestCallback) => number =
  globalThis.requestAnimationFrame?.bind(globalThis) ??
  ((callback: FrameRequestCallback) =>
    setTimeout(() => callback(globalThis.performance?.now() ?? Date.now()), 1000 / 30));

/**
 * Robust fallback wrapper for native `requestIdleCallback`.
 *
 * Schedules a callback to be executed during the browser's idle periods.
 * If the environment does not support `requestIdleCallback`, it falls back to a timer
 * simulating a 50ms processing timeframe budget.
 *
 * @param callback - The function to execute. Receives an `IdleDeadline` object.
 * @param options - Optional configuration options, such as `timeout`.
 * @returns A unique request ID.
 *
 * @example
 * ```ts
 * requestIdleCallback((deadline) => {
 *   while (deadline.timeRemaining() > 0 && tasks.length > 0) {
 *     runNextTask();
 *   }
 * }, { timeout: 2000 });
 * ```
 */
export const requestIdleCallback: (callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions) => number =
  globalThis.requestIdleCallback?.bind(globalThis) ??
  ((callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions) => {
    const startTime = Date.now();
    return setTimeout(() => {
      callback({
        didTimeout: !!options?.timeout,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - startTime)),
      });
    }, options?.timeout ?? 20);
  });

// Setup high-performance Zero-Delay Macrotask Channel via MessageChannel bomy
const channel__ = typeof globalThis.MessageChannel !== 'undefined' ? new globalThis.MessageChannel() : null;

/**
 * High-performance macrotask dispatcher using `MessageChannel`.
 *
 * Bypasses the browser's minimum 4ms clamp penalty for nested `setTimeout`.
 * Falls back to `setTimeout(callback, 0)` if `MessageChannel` is unavailable.
 *
 * @param callback - The function to execute in the next event loop tick.
 * @private
 */
const queueMacrotask__ = (callback: VoidFunction): void => {
  if (channel__ !== null) {
    channel__.port1.onmessage = () => callback();
    channel__.port2.postMessage(undefined);
  } else {
    setTimeout(callback, 0);
  }
};

/**
 * A highly optimized utility module to handle asynchronous flow control,
 * microtask batching, and reactive scheduling gates within the Alwatr ecosystem.
 *
 * Provides promise-based waiting utilities for timeouts, animation frames,
 * idle callbacks, DOM events, and event loop cycles.
 */
export const delay = {
  /**
   * Pauses the execution flow for a specified duration.
   *
   * Supports both milliseconds (as a number) and duration string formats (e.g., `'1.5s'`, `'10m'`).
   *
   * @param duration - The duration to wait. Can be a number in milliseconds or a string duration (e.g., `'500ms'`, `'2s'`).
   * @returns A Promise that resolves after the specified duration.
   *
   * @example
   * ```ts
   * await delay.by(100); // Wait for 100 milliseconds
   * await delay.by('2s'); // Wait for 2 seconds
   * ```
   */
  by: (duration: Duration): Promise<void> => new Promise((resolve) => setTimeout(resolve, parseDuration(duration))),

  /**
   * Suspends execution flow sequentially until the next browser repaint.
   *
   * Useful for synchronizing animations and DOM updates with the browser's rendering cycle.
   * Resolves with the high-resolution timestamp of the frame.
   *
   * @returns A Promise that resolves with a `DOMHighResTimeStamp`.
   *
   * @example
   * ```ts
   * const timestamp = await delay.animationFrame();
   * updateDOM();
   * ```
   */
  animationFrame: (): Promise<DOMHighResTimeStamp> => new Promise((resolve) => requestAnimationFrame(resolve)),

  /**
   * Postpones execution until the browser's event loop becomes idle.
   *
   * Ideal for scheduling non-critical background tasks without impacting UI responsiveness.
   *
   * @param options - Optional configuration options for the idle callback (e.g., `timeout`).
   * @returns A Promise that resolves with an `IdleDeadline` object.
   *
   * @example
   * ```ts
   * const deadline = await delay.idleCallback({ timeout: 1000 });
   * if (deadline.timeRemaining() > 0) {
   *   performBackgroundWork();
   * }
   * ```
   */
  idleCallback: (options?: IdleRequestOptions): Promise<IdleDeadline> =>
    new Promise((resolve) => requestIdleCallback(resolve, options)),

  /**
   * Pauses the execution flow until a specific DOM event fires on an HTMLElement.
   *
   * Automatically removes the event listener once the event fires to prevent memory leaks.
   *
   * @param element - The target HTMLElement to listen on.
   * @param eventName - The name of the event to wait for (e.g., `'click'`).
   * @param options - Optional event listener options. Defaults to `{ passive: true }`.
   * @returns A Promise that resolves with the fired event object.
   *
   * @example
   * ```ts
   * const clickEvent = await delay.domEvent(button, 'click');
   * console.log('Button clicked!', clickEvent);
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
   * Pauses execution flow until a specific event fires on any EventTarget.
   *
   * A generic version of `domEvent`. Automatically removes the event listener
   * once the event fires to prevent memory leaks.
   *
   * @param target - The target object to listen on (e.g., `window`, `document`, or custom EventTarget).
   * @param eventName - The name of the event to wait for.
   * @param options - Optional event listener options. Defaults to `{ passive: true }`.
   * @returns A Promise that resolves with the fired event object.
   *
   * @example
   * ```ts
   * await delay.event(window, 'resize');
   * console.log('Window was resized');
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
   * Schedules a task on the absolute earliest boundary of the next event loop cycle.
   *
   * Bypasses the HTML-standard 4ms minimum nesting delay penalty of `setTimeout(..., 0)`
   * by utilizing a private `MessageChannel` connection.
   *
   * @returns A Promise that resolves in the next macrotask.
   *
   * @example
   * ```ts
   * console.log('Current task');
   * await delay.nextMacrotask();
   * console.log('Next macrotask');
   * ```
   */
  nextMacrotask: (): Promise<void> => new Promise((resolve) => queueMacrotask__(resolve)),

  /**
   * Queues a task on the microtask queue.
   *
   * Pushes the task straight to the native microtask queue, which is guaranteed to
   * run before the browser repaints or any sibling macrotasks intercept control.
   *
   * @returns A Promise that resolves in the next microtask.
   *
   * @example
   * ```ts
   * console.log('Current task');
   * await delay.nextMicrotask();
   * console.log('Next microtask (before repaints and macrotasks)');
   * ```
   */
  nextMicrotask: (): Promise<void> => new Promise((resolve) => queueMicrotask(resolve)),
} as const;
