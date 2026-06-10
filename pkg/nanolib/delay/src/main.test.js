import {describe, it, expect} from 'bun:test';
import {delay, queueMacrotask} from '@alwatr/delay';

describe('delay', () => {
  describe('delay.by', () => {
    it('should resolve after the specified milliseconds', async () => {
      const start = Date.now();
      await delay.by(50);
      const elapsed = Date.now() - start;
      // Allow some tolerance for timer imprecision.
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });

    it('should resolve after a string duration (seconds)', async () => {
      const start = Date.now();
      // parseDuration supports: s, m, h, d, w, M, y — smallest unit is seconds.
      // Use a numeric value for sub-second delays.
      await delay.by('0.05s');
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });

    it('should resolve nearly immediately for 0ms', async () => {
      const start = Date.now();
      await delay.by(0);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(50);
    });

    it('should return a promise', () => {
      const result = delay.by(1);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('delay.nextMacrotask', () => {
    it('should resolve after the current event loop task', async () => {
      let executed = false;
      const promise = delay.nextMacrotask().then(() => {
        executed = true;
      });
      // Should not have executed synchronously.
      expect(executed).toBe(false);
      await promise;
      expect(executed).toBe(true);
    });

    it('should return a promise', () => {
      const result = delay.nextMacrotask();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should execute after synchronous code', async () => {
      /** @type {string[]} */
      const order = [];
      const promise = delay.nextMacrotask().then(() => order.push('macrotask'));
      order.push('sync');
      await promise;
      expect(order).toEqual(['sync', 'macrotask']);
    });
  });

  describe('delay.nextMicrotask', () => {
    it('should resolve as a microtask', async () => {
      let executed = false;
      const promise = delay.nextMicrotask().then(() => {
        executed = true;
      });
      // Microtask should not have executed synchronously.
      expect(executed).toBe(false);
      await promise;
      expect(executed).toBe(true);
    });

    it('should return a promise', () => {
      const result = delay.nextMicrotask();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should execute before macrotask', async () => {
      /** @type {string[]} */
      const order = [];
      // Schedule a macrotask.
      setTimeout(() => order.push('macrotask'), 0);
      // Schedule a microtask.
      await delay.nextMicrotask().then(() => order.push('microtask'));
      // Microtask should have run before macrotask.
      expect(order[0]).toBe('microtask');
    });
  });

  describe('delay.animationFrame', () => {
    it('should return a promise that resolves with a timestamp', async () => {
      const result = delay.animationFrame();
      expect(result).toBeInstanceOf(Promise);
      const timestamp = await result;
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBeGreaterThan(0);
    });
  });

  describe('delay.idleCallback', () => {
    it('should return a promise that resolves with an IdleDeadline-like object', async () => {
      const result = delay.idleCallback();
      expect(result).toBeInstanceOf(Promise);
      const deadline = await result;
      expect(typeof deadline.didTimeout).toBe('boolean');
      expect(typeof deadline.timeRemaining).toBe('function');
      expect(typeof deadline.timeRemaining()).toBe('number');
    });

    it('should accept options parameter', async () => {
      const deadline = await delay.idleCallback({timeout: 100});
      expect(typeof deadline.timeRemaining).toBe('function');
    });
  });

  describe('queueMacrotask', () => {
    it('should execute callback asynchronously in the next macrotask', async () => {
      let executed = false;
      queueMacrotask(() => {
        executed = true;
      });
      expect(executed).toBe(false);
      await delay.nextMacrotask();
      expect(executed).toBe(true);
    });

    it('should process consecutive synchronous calls in FIFO order without dropping any', async () => {
      /** @type {number[]} */
      const executionOrder = [];

      queueMacrotask(() => executionOrder.push(1));
      queueMacrotask(() => executionOrder.push(2));
      queueMacrotask(() => executionOrder.push(3));

      expect(executionOrder).toEqual([]);
      await delay.nextMacrotask();
      // Since all three are scheduled, they should all execute before the next tick resolves
      expect(executionOrder).toEqual([1, 2, 3]);
    });
  });
});
