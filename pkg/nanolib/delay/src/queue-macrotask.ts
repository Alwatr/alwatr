import {globalThis_} from './lib.js';
import {queueMicrotask} from './queue-microtask.js';

/**
 * Zero-delay macrotask dispatcher.
 *
 * Bypasses the browser's minimum 4ms clamp penalty (HTML timer throttling) for nested `setTimeout`
 * by utilizing a private `MessageChannel` connection. Falls back to `setTimeout(callback, 0)`
 * if `MessageChannel` is unavailable.
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
  // --- Fallback: runtimes without MessageChannel (some SSR/Node contexts). ---
  if (typeof globalThis_.MessageChannel === 'undefined') {
    return (callback: VoidFunction): void => {
      setTimeout(callback, 0);
    };
  }

  // --- Primary: ONE channel + ONE persistent handler shared by every task. ---
  const {port1, port2} = new globalThis_.MessageChannel();

  // FIFO queue with a moving `head` pointer. We deliberately avoid
  // Array.prototype.shift() (which is O(n) due to re-indexing); instead we
  // advance `head` for O(1) dequeue and compact the buffer only once it is
  // fully drained. This keeps both enqueue and dequeue allocation-free on the
  // steady-state hot path.
  const taskQueue: VoidFunction[] = [];
  let head = 0;

  // Assigning `onmessage` implicitly starts port1 — no explicit port1.start().
  port1.onmessage = (): void => {
    // Defensive guard: a spurious message with an empty queue is a no-op.
    if (head >= taskQueue.length) return;

    const task = taskQueue[head];
    taskQueue[head] = undefined as unknown as VoidFunction; // drop ref → let GC reclaim early
    head++;

    // Reset the backing array once empty so a transient burst can never grow
    // the buffer unbounded across the app lifetime.
    if (head === taskQueue.length) {
      taskQueue.length = 0;
      head = 0;
    }

    // Fault isolation: a single throwing task must NOT break the dispatcher
    // loop or starve the remaining queued tasks. We re-surface the error
    // asynchronously so it still reaches reportError / window.onerror / DevTools.
    try {
      task();
    } catch (error) {
      queueMicrotask(() => {
        throw error;
      });
    }
  };

  return (callback: VoidFunction): void => {
    // One push, one post. The persistent handler above guarantees a 1:1 match.
    taskQueue.push(callback);
    port2.postMessage(undefined);
  };
})();
