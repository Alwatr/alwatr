import {requestNextRender} from './request_next_render.js';

// The single source of truth for our pending render tasks
const idleTaskQueue_: Array<() => void> = [];
let isBatchScheduled_ = false;

/**
 * Batches multiple non-critical tasks (like directive renders) into a single queue.
 * Delays execution until the browser is idle, or until the timeout expires.
 *
 * @param task - The callback function containing the DOM update logic.
 * @param options - Configuration containing the maximum timeout budget.
 *
 * Note: If multiple tasks are scheduled before the idle callback executes, they will be executed in the same batch, **sharing the same timeout**. This ensures efficient use of idle time while preventing starvation of critical tasks.
 *
 * @example
 * ```ts
 * // Schedule multiple tasks in quick succession
 * scheduleIdleBatch(() => updateDirectiveA(), { timeout: 1000 });
 * scheduleIdleBatch(() => updateDirectiveB(), { timeout: 1000 });
 * scheduleIdleBatch(() => updateDirectiveC(), { timeout: 1000 });
 */
export const scheduleIdleBatch = (task: VoidFunction, options?: IdleRequestOptions): void => {
  idleTaskQueue_.push(task);

  if (isBatchScheduled_) return;

  isBatchScheduled_ = true;

  requestIdleCallback((): void => {
    requestNextRender(() => {
      const tasksToRun = idleTaskQueue_.splice(0); // Take a snapshot of the current queue and clear it immediately
      isBatchScheduled_ = false;
      for (let i = 0; i < tasksToRun.length; i++) {
        try {
          tasksToRun[i]();
        } catch (error) {
          console.error('Infrastructure [IdleBatch]: Task execution failed', error);
        }
      }
    });
  }, options);
};
