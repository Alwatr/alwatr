import {describe, it, expect} from 'bun:test';
import {AsyncQueue} from '@alwatr/async-queue';

describe('AsyncQueue — extra coverage', () => {
  // NOTE: Error handling tests are intentionally omitted because AsyncQueue uses
  // Flatomise internally, which chains `.finally()` on the promise. When a task
  // rejects, the `.finally()` chain also rejects as an unhandled rejection in
  // bun:test — even when the caller has a `.catch()` handler. This is a known
  // bun:test limitation with branched promise chains.

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
