import {describe, it, expect} from 'bun:test';
import {AsyncQueue} from '@alwatr/async-queue';

describe('AsyncQueue — extra coverage', () => {
  describe('error handling', () => {
    it('should reject the returned promise when the task throws', async () => {
      const queue = new AsyncQueue();
      await expect(
          queue.push('err', async () => {
            throw new Error('task_failed');
          }),
      ).rejects.toThrow('task_failed');
    });

    it('should not emit an unhandledRejection when the caller catches a rejected task', async () => {
      // Regression test: a rejected task used to produce an unhandledRejection
      // even when the caller correctly attached a `.then(null, onRejected)`/`.catch()`
      // handler to the promise returned by `push()`. The root cause lived in
      // `@alwatr/flatomise`'s `newFlatomise()` (see its test suite), which AsyncQueue
      // uses internally to represent each queued task.
      const unhandledReasons = [];
      const onUnhandledRejection = (reason) => unhandledReasons.push(reason);
      process.on('unhandledRejection', onUnhandledRejection);

      try {
        const queue = new AsyncQueue();
        const caught = queue
            .push('err', async () => {
              throw new Error('task_failed');
            })
            .then(null, (e) => e.message);

        await expect(caught).resolves.toBe('task_failed');
        // Give the event loop a few ticks for any lingering unhandledRejection to surface.
        await new Promise((resolve) => setTimeout(resolve, 20));

        expect(unhandledReasons).toEqual([]);
      } finally {
        process.off('unhandledRejection', onUnhandledRejection);
      }
    });

    it('should continue processing subsequent tasks with the same ID after a rejection', async () => {
      const queue = new AsyncQueue();
      /** @type {string[]} */
      const results = [];

      await queue
          .push('same', async () => {
            throw new Error('first failed');
          })
          .catch(() => {});

      await queue.push('same', async () => {
        results.push('second');
      });

      expect(results).toEqual(['second']);
    });

    it('should not leave a rejected task marked as running', async () => {
      const queue = new AsyncQueue();
      await queue
          .push('err', async () => {
            throw new Error('task_failed');
          })
          .catch(() => {});

      expect(queue.isRunning('err')).toBe(false);
    });
  });

  describe('concurrent different task IDs', () => {
    it('should run tasks with different IDs concurrently', async () => {
      const queue = new AsyncQueue();
      /** @type {string[]} */
      const log = [];

      const p1 = queue.push('a', async () => {
        await new Promise((r) => setTimeout(r, 30));
        log.push('a-done');
      });

      const p2 = queue.push('b', async () => {
        await new Promise((r) => setTimeout(r, 10));
        log.push('b-done');
      });

      await Promise.all([p1, p2]);

      // 'b' should finish before 'a' because it has a shorter delay
      // and they run concurrently (different IDs).
      expect(log.indexOf('b-done')).toBeLessThan(log.indexOf('a-done'));
    });

    it('should serialize tasks with the same ID', async () => {
      const queue = new AsyncQueue();
      /** @type {string[]} */
      const log = [];

      queue.push('same', async () => {
        await new Promise((r) => setTimeout(r, 20));
        log.push('first');
      });

      await queue.push('same', async () => {
        log.push('second');
      });

      // 'first' must complete before 'second' starts.
      expect(log).toEqual(['first', 'second']);
    });
  });

  describe('waitForFinish', () => {
    it('should resolve immediately if task ID is not running', async () => {
      const queue = new AsyncQueue();
      const result = await queue.waitForFinish('nonexistent');
      expect(result).toBeUndefined();
    });
  });

  describe('task return values', () => {
    it('should return the task result from push', async () => {
      const queue = new AsyncQueue();
      const result = await queue.push('return-val', async () => {
        return {data: 'hello'};
      });
      expect(result).toEqual({data: 'hello'});
    });

    it('should return different results for different tasks', async () => {
      const queue = new AsyncQueue();
      const r1 = await queue.push('t1', async () => 'first');
      const r2 = await queue.push('t2', async () => 42);
      expect(r1).toBe('first');
      expect(r2).toBe(42);
    });
  });

  describe('multiple tasks same ID', () => {
    it('should execute many queued tasks in order', async () => {
      const queue = new AsyncQueue();
      /** @type {number[]} */
      const results = [];

      for (let i = 0; i < 5; i++) {
        queue.push('ordered', async () => {
          await new Promise((r) => setTimeout(r, 5));
          results.push(i);
        });
      }

      await queue.waitForFinish('ordered');
      expect(results).toEqual([0, 1, 2, 3, 4]);
    });
  });
});
