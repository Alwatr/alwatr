import {AsyncQueue} from '@alwatr/async-queue';

describe('AsyncQueue', () => {
  let queue;

  beforeEach(() => {
    queue = new AsyncQueue();
  });

  it('should queue tasks and execute them in order', async () => {
    const results = [];
    const task = (/** @type {number} */ id) => async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      results.push(id);
    };

    queue.push('task1', task(1));
    queue.push('task2', task(2));
    await queue.push('task3', task(3));

    expect(results).toEqual([1, 2, 3]);

    queue.push('task3', task(4));
    queue.push('task3', task(5));

    await queue.waitForFinish('task3');

    expect(results).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return true for running tasks', async () => {
    queue.push('task1', async () => {});
    expect(queue.isRunning('task1')).toBe(true);
  });

  it('should return false for finished tasks', async () => {
    await queue.push('task1', async () => {});
    expect(queue.isRunning('task1')).toBe(false);
  });

  it('should wait for all tasks to finish', async () => {
    queue.push('task1', async () => new Promise((resolve) => setTimeout(resolve, 11, 1)));
    queue.push('task2', async () => new Promise((resolve) => setTimeout(resolve, 12, 2)));
    queue.push('task3', async () => new Promise((resolve) => setTimeout(resolve, 13, 3)));

    expect(await queue.waitForAllFinish()).toEqual([1, 2, 3]);

    expect(queue.isRunning('task1')).toBe(false);
    expect(queue.isRunning('task2')).toBe(false);
    expect(queue.isRunning('task3')).toBe(false);
  });
});
