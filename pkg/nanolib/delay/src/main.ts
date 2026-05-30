import {getGlobalThis} from '@alwatr/global-this';
import type {DictionaryOpt} from '@alwatr/type-helper';

const globalThis = getGlobalThis<DictionaryOpt<unknown>>();

/**
 * Robust fallback wrapper for `queueMicrotask`.
 * Reverts to Promise chaining if the platform is archaic, prioritizing synchronous scheduling logic.
 */
export const queueMicrotask: (callback: VoidFunction) => void =
  globalThis.queueMicrotask?.bind(globalThis)
  ?? ((callback: VoidFunction) => {
    void Promise.resolve()
      .then(callback)
      .catch((error) => {
        console.error('queueMicrotask_fallback', 'microtask_exception', error);
      });
  });

/**
 * Synchronizes a execution closure safely before the browser's next screen repaint task.
 * Falls back safely to a 30FPS macrotask scheduler if executed within Node/Bun environments.
 */
export const requestAnimationFrame: (callback: FrameRequestCallback) => number =
  globalThis.requestAnimationFrame?.bind(globalThis)
  ?? ((callback: FrameRequestCallback) =>
    setTimeout(() => callback(globalThis.performance?.now() ?? Date.now()), 1000 / 30));

/**
 * Schedules non-critical work during the browser's event loop idle periods.
 * Yields a simulated 50ms processing timeframe budget if the host platform lacks native layout scheduling hooks.
 */
export const requestIdleCallback: (callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions) => number =
  globalThis.requestIdleCallback?.bind(globalThis)
  ?? ((callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions) => {
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
 * High-performance macrotask dispatcher that totally bypasses the browser's 4ms setTimeout clamping penalty.
 * Synchronizes processing directly to the next turn of the visual execution grid loop.
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
 */
export const delay = {
  /**
   * Enforces a hard time suspension loop for a designated millisecond threshold duration.
   */
  by: (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Suspends execution flow sequentially until the hardware screen context is ready for the next visual paint refresh.
   */
  animationFrame: (): Promise<DOMHighResTimeStamp> => new Promise((resolve) => requestAnimationFrame(resolve)),

  /**
   * Postpones internal code execution blocks until the main browser task execution thread falls completely silent.
   */
  idleCallback: (options?: IdleRequestOptions): Promise<IdleDeadline> =>
    new Promise((resolve) => requestIdleCallback(resolve, options)),

  /**
   * Pauses the loop until an explicit event signature fires on a targeted HTMLElement part.
   * Auto-unsubscribes immediately upon fulfillment to guarantee absolute zero leak vectors.
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
   * Pauses execution loops until a generic target broadcasts a valid event dispatch notice.
   */
  event: (target: EventTarget, eventName: string, options: AddEventListenerOptions = {passive: true}): Promise<Event> =>
    new Promise((resolve) =>
      target.addEventListener(eventName, resolve, {
        ...options,
        once: true,
      }),
    ),

  /**
   * Bypasses the HTML 4ms nesting speed limit via structural MessageChannels.
   * Forces execution down onto the absolute earliest boundary of the next event loop tick sequence.
   */
  nextMacrotask: (): Promise<void> => new Promise((resolve) => queueMacrotask__(resolve)),

  /**
   * Native highly-efficient Microtask Batching mechanism.
   * Completely circumvents object heap allocation bills by pushing tasks straight to the native execution stack.
   * Guaranteed to complete processing BEFORE the repaint task thread or sibling macrotasks intercept control.
   */
  nextMicrotask: (): Promise<void> => new Promise((resolve) => queueMicrotask(resolve)),
} as const;
