import {globalThis_} from './lib.js';

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
  globalThis_.queueMicrotask?.bind(globalThis_)
  ?? ((callback: VoidFunction) => {
    void Promise.resolve()
      .then(callback)
      .catch((error) => {
        console.error('queueMicrotask_fallback', 'microtask_exception', error);
      });
  });
