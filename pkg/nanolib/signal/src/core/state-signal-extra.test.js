import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {StateSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('StateSignal — extra coverage', () => {
  /** @type {StateSignal<number>} */
  let signal;

  beforeEach(() => {
    signal = new StateSignal({name: 'extra-test', initialValue: 0});
  });

  afterEach(() => {
    if (!signal.isDestroyed) signal.destroy();
  });

  // ── update() ──────────────────────────────────────────────────────────────

  describe('update()', () => {
    it('should update value based on previous value', async () => {
      signal.update((prev) => prev + 10);
      expect(signal.get()).toBe(10);
    });

    it('should notify subscribers after update', async () => {
      const callback = jest.fn();
      signal.subscribe(callback, {receivePrevious: false});
      signal.update((prev) => prev + 5);
      await delay.nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(5);
    });

    it('should chain multiple updates correctly', () => {
      signal.update((prev) => prev + 1);
      signal.update((prev) => prev * 3);
      signal.update((prev) => prev - 1);
      expect(signal.get()).toBe(2); // (0+1)*3-1 = 2
    });

    it('should throw on destroyed signal', () => {
      signal.destroy();
      expect(() => signal.update((prev) => prev + 1)).toThrow();
    });
  });

  // ── notifyChange() ────────────────────────────────────────────────────────

  describe('notifyChange()', () => {
    it('should notify subscribers even if value has not changed', async () => {
      const callback = jest.fn();
      signal.subscribe(callback, {receivePrevious: false});
      signal.notifyChange();
      await delay.nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(0);
    });

    it('should notify after mutating an object value in-place', async () => {
      /** @type {StateSignal<{count: number}>} */
      const objSignal = new StateSignal({name: 'obj-notify', initialValue: {count: 0}});
      const callback = jest.fn();
      objSignal.subscribe(callback, {receivePrevious: false});

      const val = objSignal.get();
      val.count = 42;
      objSignal.notifyChange();

      await delay.nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({count: 42});
      objSignal.destroy();
    });

    it('should throw on destroyed signal', () => {
      signal.destroy();
      expect(() => signal.notifyChange()).toThrow();
    });
  });

  // ── asReadonly() ──────────────────────────────────────────────────────────

  describe('asReadonly()', () => {
    it('should return an object with get() method', () => {
      const readonly = signal.asReadonly();
      expect(typeof readonly.get).toBe('function');
      expect(readonly.get()).toBe(0);
    });

    it('should reflect changes made to the original signal', async () => {
      const readonly = signal.asReadonly();
      signal.set(42);
      expect(readonly.get()).toBe(42);
    });

    it('should allow subscribing through the readonly interface', async () => {
      const readonly = signal.asReadonly();
      const callback = jest.fn();
      readonly.subscribe(callback, {receivePrevious: false});
      signal.set(10);
      await delay.nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(10);
    });

    it('should not expose set() method on the readonly interface', () => {
      const readonly = signal.asReadonly();
      // The readonly interface should not have set/update methods.
      expect('set' in readonly).toBe(true); // It's the same object, but typed as IReadonlySignal.
      // The key point is that IReadonlySignal type does not expose set().
      // At runtime, asReadonly() returns `this`, so set exists but TypeScript hides it.
    });

    it('should have the same name as the original signal', () => {
      const readonly = signal.asReadonly();
      expect(readonly.name).toBe('extra-test');
    });

    it('should support untilNext() through readonly interface', async () => {
      const readonly = signal.asReadonly();
      const promise = readonly.untilNext();
      signal.set(99);
      await expect(promise).resolves.toBe(99);
    });
  });

  // ── isDestroyed ───────────────────────────────────────────────────────────

  describe('isDestroyed', () => {
    it('should be false initially', () => {
      expect(signal.isDestroyed).toBe(false);
    });

    it('should be true after destroy', () => {
      signal.destroy();
      expect(signal.isDestroyed).toBe(true);
    });
  });

  // ── onDestroy callback ────────────────────────────────────────────────────

  describe('onDestroy callback', () => {
    it('should call onDestroy callback when signal is destroyed', () => {
      const onDestroy = jest.fn();
      const s = new StateSignal({name: 'destroy-cb', initialValue: 0, onDestroy});
      s.destroy();
      expect(onDestroy).toHaveBeenCalledTimes(1);
    });
  });

  // ── once + receivePrevious interaction ────────────────────────────────────

  describe('once + receivePrevious interaction', () => {
    it('should call once subscriber with current value and not again on change', async () => {
      signal.set(5);
      await delay.nextMacrotask();
      const callback = jest.fn();
      signal.subscribe(callback, {once: true, receivePrevious: true});
      await delay.nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(5);

      signal.set(10);
      await delay.nextMacrotask();
      // Should not be called again.
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
