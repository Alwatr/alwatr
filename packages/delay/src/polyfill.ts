import {getGlobalThis} from '@alwatr/global-this';

export const global_ = /* #__PURE__ */ getGlobalThis<DictionaryOpt<unknown>>();

/**
 * Ensures compatibility for `requestAnimationFrame` by using the native API
 * available in `globalThis`. If it's not available, it falls back to a `setTimeout`
 * call that aims for a 60 frames per second refresh rate.
 *
 * @param callback The function to call when it's time to update your animation for the next repaint.
 * @returns A long integer value, the request ID, that uniquely identifies the entry in the callback list.
 */
export const requestAnimationFrame: (callback: FrameRequestCallback) => number =
  global_.requestAnimationFrame?.bind(global_) ??
  ((callback: FrameRequestCallback) => setTimeout(() => callback(performance.now()), 1000 / 60));

/**
 * Ensures compatibility for `requestIdleCallback` by using the native API.
 * If unavailable, it falls back to a `setTimeout` that executes the callback
 * after a short delay, providing a mock `IdleDeadline` object.
 *
 * The mock `IdleDeadline` gives the task a 50ms budget to run.
 *
 * @param callback A reference to a function that should be called in the near future, when the event loop is idle.
 * @param options An optional object with configuration parameters.
 * @returns An ID which can be used to cancel the callback by calling `cancelIdleCallback()`.
 */
export const requestIdleCallback: (callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions) => number =
  global_.requestIdleCallback?.bind(global_) ??
  ((
    callback: (deadline: IdleDeadline) => void,
    // options is not used in the fallback but kept for API consistency
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: IdleRequestOptions,
  ) => {
    const startTime = Date.now();
    return setTimeout(() => {
      callback({
        didTimeout: !!options?.timeout,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - startTime)),
      });
    }, options?.timeout ?? 20);
  });
