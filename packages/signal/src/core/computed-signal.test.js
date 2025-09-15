import {describe, beforeEach, afterEach, it, expect, jest} from '@jest/globals';
import {ComputedSignal, StateSignal} from '@alwatr/signal';
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
      get: () => dep1.get() + dep2.get(),
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
    expect(signal.get()).toBe(3); // 1 + 2
  });

  it('should compute value from dependencies', async () => {
    expect(signal.get()).toBe(3);
    dep1.set(5);
    await signal.untilNext();
    expect(signal.get()).toBe(7); // 5 + 2
  });

  it('should notify subscriber with receivePrevious', async () => {
    const callback = jest.fn();

    signal.subscribe(callback);
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it('should notify subscribers when computed value changes', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {receivePrevious: false});
    dep1.set(10);
    await signal.untilNext();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(12); // 10 + 2
  });

  it('should not notify if computed value does not change', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {receivePrevious: false});
    dep1.set(1); // Same as initial
    await delay.by(5);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should compute once if multiple dependencies change', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {receivePrevious: false});
    dep1.set(3);
    await delay.nextMicrotask();
    dep2.set(4);
    await signal.untilNext();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(7); // 3 + 4
  });

  it('should notify multiple subscribers', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    signal.subscribe(callback1, {receivePrevious: false});
    signal.subscribe(callback2, {receivePrevious: false});
    dep2.set(5);
    await signal.untilNext();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(6); // 1 + 5
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(6);
  });

  it('should not notify unsubscribed listeners', async () => {
    const callback = jest.fn();
    const subscription = signal.subscribe(callback, {receivePrevious: false});
    subscription.unsubscribe();
    dep1.set(10);
    await signal.untilNext();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {once: true, receivePrevious: false});
    dep1.set(10);
    await signal.untilNext();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(12);
    dep2.set(20);
    await signal.untilNext();
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
    expect(noDepSignal.get()).toBe(42);
    noDepSignal.destroy();
  });

  it('should continue notifying other subscribers if one callback throws an error', async () => {
    const callback1 = jest.fn(() => {
      throw new Error('Test error');
    });
    const callback2 = jest.fn();
    signal.subscribe(callback1, {receivePrevious: false});
    signal.subscribe(callback2, {receivePrevious: false});
    dep1.set(10);
    await signal.untilNext();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should update without any subscribers', async () => {
    expect(signal.get()).toBe(3);
    dep1.set(7);
    await signal.untilNext();
    expect(signal.get()).toBe(9); // 7 + 2
  });

  describe('destroyed signal', () => {
    it('should throw error when accessing value after destroy', () => {
      signal.destroy();
      expect(() => signal.get()).toThrow();
    });

    it('should not notify after destroy', async () => {
      const callback = jest.fn();
      signal.subscribe(callback, {receivePrevious: false});
      signal.destroy();
      dep1.set(10);
      await delay.by(5);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
