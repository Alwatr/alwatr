import {newFlatomise} from '@alwatr/flatomise';
import {queueMicrotask} from '@alwatr/delay';
import type {DictionaryOpt} from '@alwatr/type-helper';

/**
 * A queue that executes async tasks in order like mutex and semaphore methodology
 *
 * @example
 * ```ts
 * const queue = new AsyncQueue();
 *
 * function longTask() {
 *   queue.push('longTaskId', async () => {
 *     // ...
 *   });
 * }
 * ```
 */
export class AsyncQueue {
  /**
   * A record of task IDs and their corresponding last queued task promises.
   */
  private queue__: DictionaryOpt<Promise<unknown>> = {};

  /**
   * Push a async task to the queue.
   *
   * @param taskId task id
   * @param task async task
   * @returns A promise that resolves when the task is done.
   *
   * @example
   * ```typescript
   * const queue = new AsyncQueue();
   *
   * function longTask() {
   *  queue.push('longTaskId', async () => {
   *   // ...
   * });
   * ```
   */
  public async push<T>(taskId: string, task: () => Promise<T>): Promise<T> {
    const flatomise = newFlatomise<T>();

    const previousTaskPromise = this.queue__[taskId];
    this.queue__[taskId] = flatomise.promise;

    if (previousTaskPromise !== undefined) {
      try {
        await previousTaskPromise;
      } catch (_e) {
        // ignore
      }
    }

    queueMicrotask(() => {
      task()
        .then(flatomise.resolve, flatomise.reject)
        .then(() => {
          if (this.queue__[taskId] === flatomise.promise) {
            delete this.queue__[taskId];
          }
        });
    });

    return flatomise.promise;
  }

  /**
   * Check if the task running in the queue.
   *
   * @param taskId task id
   * @returns true if the task is running, otherwise false.
   * @example
   * ```typescript
   * if (queue.isRunning('longTaskId')) {
   *  // ...
   * }
   * ```
   */
  public isRunning(taskId: string): boolean {
    return this.queue__[taskId] !== undefined;
  }

  /**
   * Wait for the all tasks in the queue to finish.
   *
   * @param taskId task id
   * @returns A promise that resolves when all tasks are done.
   * @example
   * ```typescript
   * await queue.waitForFinish('longTaskId');
   * ```
   */
  public waitForFinish(taskId: string): Promise<unknown> {
    return this.queue__[taskId] ?? Promise.resolve();
  }

  /**
   * Wait for the all tasks in the queue to finish.
   * @returns A promise that resolves when all tasks are done.
   * @example
   * ```typescript
   * await queue.waitForAllFinish();
   * ```
   */
  public waitForAllFinish(): Promise<unknown[]> {
    return Promise.all(Object.values(this.queue__));
  }
}
