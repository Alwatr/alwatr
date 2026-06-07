import {globalThis_} from './lib.js';

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
  globalThis_.requestIdleCallback?.bind(globalThis_)
  ?? ((callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions) => {
    const startTime = Date.now();
    return setTimeout(() => {
      callback({
        didTimeout: !!options?.timeout,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - startTime)),
      });
    }, options?.timeout ?? 20);
  });
