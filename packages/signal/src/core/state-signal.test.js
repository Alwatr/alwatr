import {describe, beforeEach, afterEach, it, expect, jest} from '@jest/globals';
import {StateSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('StateSignal', () => {
  /** @type {StateSignal<number>} */
  let signal;
  const signalId = 'test-state-signal';

  beforeEach(() => {
    signal = new StateSignal({signalId, initialValue: 0});
  });

  afterEach(() => {
    signal.destroy();
  });

  it('should be defined and have the correct signalId and initial value', () => {
    expect(StateSignal).toBeDefined();
    expect(signal).toBeInstanceOf(StateSignal);
    expect(signal.signalId).toBe(signalId);
    expect(signal.get()).toBe(0);
  });

  it('should notify subscribers when value changes', async () => {
    const callback = jest.fn();
    const newValue = 42;

    signal.subscribe(callback, {receivePrevious: false});
    signal.set(newValue);

    expect(callback).not.toHaveBeenCalled(); // Should be async
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(newValue);
  });

  it('should not notify subscribers if value does not change', async () => {
    const callback = jest.fn();

    signal.subscribe(callback, {receivePrevious: false});
    signal.set(0); // Same as initial

    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should notify multiple subscribers', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const newValue = 100;

    signal.subscribe(callback1, {receivePrevious: false});
    signal.subscribe(callback2, {receivePrevious: false});
    signal.set(newValue);

    await delay.nextMacrotask();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(newValue);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(newValue);
  });

  it('should not notify unsubscribed listeners', async () => {
    const callback = jest.fn();
    const subscription = signal.subscribe(callback, {receivePrevious: false});

    subscription.unsubscribe();
    signal.set(50);

    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {once: true});

    signal.set(10);
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(10);

    signal.set(20);
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should immediately notify new subscribers with current value by default', async () => {
    const callback = jest.fn();

    signal.set(5);
    await delay.nextMacrotask();

    signal.subscribe(callback);

    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(5);
  });

  it('should not immediately notify new subscribers if receivePrevious is false', async () => {
    const callback = jest.fn();

    signal.set(5);
    await delay.nextMacrotask();

    signal.subscribe(callback, {receivePrevious: false});

    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();

    signal.set(10);
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(10);
  });

  it('should resolve untilNext() with the next set value', async () => {
    const newValue = 99;
    const untilNextPromise = signal.untilNext();

    signal.set(newValue);

    await expect(untilNextPromise).resolves.toBe(newValue);
  });

  it('should handle setting the same value multiple times without notifying', async () => {
    const callback = jest.fn();

    signal.subscribe(callback, {receivePrevious: false});
    signal.set(0);
    signal.set(0);
    signal.set(0);

    await delay.nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should notify subscribers multiple times for object values when they change', async () => {
    const callback = jest.fn();
    const value = {a: 1};
    const signal = new StateSignal({signalId: 'object-signal', initialValue: value});
    
    signal.subscribe(callback, {receivePrevious: false});

    value.a++;
    signal.set(value);

    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(value);

    signal.set(value);
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(value);
  });

  it('should notify high-priority subscribers first', async () => {
    /** @type {Array<string>} */
    const callOrder = [];
    const callback1 = jest.fn(() => callOrder.push('normal'));
    const callback2 = jest.fn(() => callOrder.push('priority'));

    signal.subscribe(callback1, {receivePrevious: false}); // Normal priority
    signal.subscribe(callback2, {priority: true, receivePrevious: false}); // High priority
    signal.set(1);

    await delay.nextMacrotask();
    expect(callOrder).toEqual(['priority', 'normal']);
  });

  it('should handle async callbacks correctly', async () => {
    const callback = jest.fn(async () => {
      await delay.nextMacrotask();
      return 'done';
    });

    signal.subscribe(callback);
    signal.set(1);

    // Set should not be awaited, but we need to wait for the microtask queue to be processed.
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should continue notifying other subscribers if one callback throws an error', async () => {
    const errorCallback = jest.fn(() => {
      throw new Error('Test error');
    });
    const normalCallback = jest.fn();

    signal.subscribe(errorCallback, {receivePrevious: false});
    signal.subscribe(normalCallback, {receivePrevious: false});
    signal.set(1);

    await delay.nextMacrotask();
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(normalCallback).toHaveBeenCalledTimes(1);
  });

  describe('destroyed signal', () => {
    beforeEach(() => {
      signal.destroy();
    });

    it('should throw an error when set is called on a destroyed signal', () => {
      expect(() => signal.set(1)).toThrow(`Cannot interact with a destroyed signal (id: ${signalId})`);
    });

    it('should throw an error when subscribe is called on a destroyed signal', () => {
      expect(() => signal.subscribe(jest.fn())).toThrow(`Cannot interact with a destroyed signal (id: ${signalId})`);
    });

    it('should throw an error when untilNext is called on a destroyed signal', () => {
      expect(() => signal.untilNext()).toThrow(`Cannot interact with a destroyed signal (id: ${signalId})`);
    });

    it('should throw an error when accessing value on a destroyed signal', () => {
      expect(() => signal.get()).toThrow(`Cannot interact with a destroyed signal (id: ${signalId})`);
    });

    it('should not notify any listeners after being destroyed', async () => {
      const localSignal = new StateSignal({signalId: 'local', initialValue: 0});
      const callback = jest.fn();
      localSignal.subscribe(callback, {receivePrevious: false});

      localSignal.destroy();
      expect(() => localSignal.set(1)).toThrow();

      await delay.nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
