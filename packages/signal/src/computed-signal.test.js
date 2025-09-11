import {ComputedSignal} from './computed-signal.js';
import {StateSignal} from './state-signal.js';
import {delay} from '@alwatr/delay';

describe('ComputedSignal', () => {
  /** @type {StateSignal<number>} */
  let dep1;
  /** @type {StateSignal<number>} */
  let dep2;
  /** @type {ComputedSignal<number>} */
  let signal;
  const signalId = 'test-computed-signal';

  beforeEach(() => {
    dep1 = new StateSignal({signalId: 'dep1', initialValue: 1});
    dep2 = new StateSignal({signalId: 'dep2', initialValue: 2});
    signal = new ComputedSignal({
      signalId,
      deps: [dep1, dep2],
      get: () => dep1.value + dep2.value,
    });
  });

  afterEach(() => {
    signal.destroy();
    dep1.destroy();
    dep2.destroy();
  });

  it('should be defined and have the correct signalId and initial value', () => {
    expect(ComputedSignal).toBeDefined();
    expect(signal).toBeInstanceOf(ComputedSignal);
    expect(signal.signalId).toBe(signalId);
    expect(signal.value).toBe(3); // 1 + 2
  });

  it('should compute value from dependencies', () => {
    expect(signal.value).toBe(3);
    dep1.set(5);
    expect(signal.value).toBe(7); // 5 + 2
  });

  it('should notify subscribers when computed value changes', async () => {
    const callback = jest.fn();
    signal.subscribe(callback);
    dep1.set(10);
    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(12); // 10 + 2
  });

  it('should not notify if computed value does not change', async () => {
    const callback = jest.fn();
    signal.subscribe(callback);
    dep1.set(1); // Same as initial
    await delay.nextMicrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should notify multiple subscribers', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    signal.subscribe(callback1);
    signal.subscribe(callback2);
    dep2.set(5);
    await delay.nextMicrotask();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(6); // 1 + 5
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(6);
  });

  it('should not notify unsubscribed listeners', async () => {
    const callback = jest.fn();
    const subscription = signal.subscribe(callback);
    subscription.unsubscribe();
    dep1.set(10);
    await delay.nextMicrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {once: true});
    dep1.set(10);
    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(12);
    dep2.set(20);
    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should resolve untilNext() with the next computed value', async () => {
    const untilNextPromise = signal.untilNext();
    dep1.set(5);
    await expect(untilNextPromise).resolves.toBe(7);
  });

  it('should handle no dependencies', () => {
    const noDepSignal = new ComputedSignal({
      signalId: 'no-dep',
      deps: [],
      get: () => 42,
    });
    expect(noDepSignal.value).toBe(42);
    noDepSignal.destroy();
  });

  it('should handle async get function', async () => {
    const asyncSignal = new ComputedSignal({
      signalId: 'async-computed',
      deps: [dep1],
      get: async () => {
        await delay.by(10);
        return dep1.value * 2;
      },
    });
    expect(asyncSignal.value).toBe(2); // Initial
    dep1.set(5);
    await delay.nextMicrotask();
    expect(asyncSignal.value).toBe(10);
    asyncSignal.destroy();
  });

  it('should notify high-priority subscribers first', async () => {
    const calls = [];
    const callback1 = jest.fn(() => calls.push('low'));
    const callback2 = jest.fn(() => calls.push('high'));
    signal.subscribe(callback1, {priority: 0});
    signal.subscribe(callback2, {priority: 1});
    dep1.set(10);
    await delay.nextMicrotask();
    expect(calls).toEqual(['high', 'low']);
  });

  it('should not notify disabled subscribers', async () => {
    const callback = jest.fn();
    const subscription = signal.subscribe(callback);
    subscription.disabled = true;
    dep1.set(10);
    await delay.nextMicrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle async callbacks correctly', async () => {
    const callback = jest.fn(async () => {
      await delay(5);
    });
    signal.subscribe(callback);
    dep1.set(10);
    await delay.nextMicrotask();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should continue notifying other subscribers if one callback throws an error', async () => {
    const callback1 = jest.fn(() => {
      throw new Error('Test error');
    });
    const callback2 = jest.fn();
    signal.subscribe(callback1);
    signal.subscribe(callback2);
    dep1.set(10);
    await delay.nextMicrotask();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  describe('destroyed signal', () => {
    it('should throw error when accessing value after destroy', () => {
      signal.destroy();
      expect(() => signal.value).toThrow();
    });

    it('should not notify after destroy', async () => {
      const callback = jest.fn();
      signal.subscribe(callback);
      signal.destroy();
      dep1.set(10);
      await delay.nextMicrotask();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
