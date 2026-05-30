import {platformInfo} from '@alwatr/platform-info';
import {globalThis_} from './lib.js';
import {queueMicrotask} from './queue-microtask.js';

/**
 * Zero-delay macrotask dispatcher.
 *
 * Bypasses the browser's minimum 4ms clamp penalty (HTML timer throttling) for nested `setTimeout`
 * by utilizing a private `MessageChannel` connection. Falls back to `setTimeout(callback, 0)`
 * if `MessageChannel` is unavailable or if fake timers are active in a testing context.
 *
 * Utilizes a FIFO queue with a moving head pointer to avoid array shifting overhead,
 * maintaining high performance and order of execution.
 *
 * @param callback - The function to execute in the next event loop tick.
 *
 * @example
 * ```ts
 * queueMacrotask(() => {
 *   console.log('Executed in the next macrotask');
 * });
 * ```
 */
export const queueMacrotask: (callback: VoidFunction) => void = /* @__PURE__ */ (() => {
  /*
  This primitive exists for ONE reason: defer work until *after* the browser
  has settled the current task (DOM/paint consistent), while dodging the 4ms
  nested-setTimeout clamp. That rationale is a main-thread + DOM concern only.

  In Node/Bun (SSG, unit tests) there is no paint and no clamp worth fighting,
  and a persistent MessageChannel port pins the libuv event loop open forever
  → hanging test processes. So we branch on the ENVIRONMENT, not on capability:
  only a real DOM gets the MessageChannel path.

  --- Non-DOM (Node / Bun / SSR): a plain self-clearing macrotask. ---
  setTimeout(0) fires once and releases itself — no lingering handle, no loop
  pinning, zero ref/unref bookkeeping. Ordering (after microtasks, after the
  current task) is identical to what callers rely on, which is all the tests
  actually assert.
  */

  if (!platformInfo.isBrowser || typeof globalThis_.MessageChannel === 'undefined') {
    return (callback: VoidFunction): void => {
      setTimeout(callback, 0);
    };
  }

  // --- DOM main thread: shared MessageChannel + FIFO queue (clamp-free). ---
  const {port1, port2} = new globalThis_.MessageChannel();

  /*
    FIFO queue with a moving `head` pointer. We deliberately avoid
    Array.prototype.shift() (which is O(n) due to re-indexing); instead we
    advance `head` for O(1) dequeue and compact the buffer only once it is
    fully drained. This keeps both enqueue and dequeue allocation-free on the
    steady-state hot path.
  */
  const taskQueue: VoidFunction[] = [];
  let head = 0;

  // Assigning `onmessage` implicitly starts port1.
  port1.onmessage = (): void => {
    // Defensive guard: a spurious message with an empty queue is a no-op.
    if (head >= taskQueue.length) return;

    const task = taskQueue[head];
    taskQueue[head] = undefined as unknown as VoidFunction; // drop ref → early GC
    head++;

    // Reset the backing array once empty so a transient burst can never grow the buffer unbounded across the app lifetime.
    if (head === taskQueue.length) {
      taskQueue.length = 0;
      head = 0;
    }

    // Fault isolation: a throwing task must not break the loop or starve siblings.
    try {
      task();
    } catch (error) {
      queueMicrotask(() => {
        throw error;
      });
    }
  };

  return (callback: VoidFunction): void => {
    // One push, one post.
    taskQueue.push(callback);
    port2.postMessage(undefined);
  };
})();
