import {parseDuration} from '@alwatr/parse-duration';
import type {Duration} from '@alwatr/parse-duration';
import {queueMicrotask} from './queue_microtask.js';
import {requestAnimationFrame} from './request_animation_frame.js';
import {requestIdleCallback} from './request_idle_callback.js';
import {queueMacrotask} from './queue_macrotask.js';
import {requestNextRender} from './request_next_render.js';
import {scheduleIdleBatch} from './schedule_idle_batch.js';

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
   * Suspends execution flow until the next two consecutive animation frames have occurred.
   *
   * Ensures that any pending DOM updates have been rendered before resuming execution.
   * Resolves after the second animation frame, providing a safe point to perform post-render calculations.
   *
   * @returns A Promise that resolves after two animation frames.
   *
   * @example
   * ```ts
   * await delay.nextRender();
   * performPostRenderCalculations();
   * ```
   */
  nextRender: (): Promise<DOMHighResTimeStamp> => new Promise((resolve) => requestNextRender(resolve)),

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
  nextMacrotask: (): Promise<void> => new Promise((resolve) => queueMacrotask(resolve)),

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

  /**
   * Schedules a batch of tasks to run during the browser's idle periods.
   *
   * Allows you to group multiple non-urgent tasks together, which will execute when the browser is idle.
   * This can help improve performance by reducing the number of individual idle callbacks and minimizing overhead.
   */
  scheduleIdleBatch: (options?: IdleRequestOptions): Promise<void> =>
    new Promise((resolve) => scheduleIdleBatch(resolve, options)),
} as const;
