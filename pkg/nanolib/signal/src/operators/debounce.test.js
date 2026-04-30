import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {ComputedSignal, createDebouncedSignal, StateSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('createDebouncedSignal', () => {
  const fakeTimePassage = async (ms = 0) => {
    const task = delay.nextMacrotask();
    jest.advanceTimersByTime(ms);
    await task;
  };

  /** @type {ComputedSignal<number>} */
  let debouncedSignal;
  /** @type {StateSignal<number>} */
  let sourceSignal;
  const name = 'test-debounce-signal';
  let mockFunc = jest.fn();

  beforeEach(() => {
    mockFunc = jest.fn();
    jest.useFakeTimers();
    sourceSignal = new StateSignal({name, initialValue: 0});
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    sourceSignal?.destroy();
    debouncedSignal?.destroy();
  });

  it('should create a debounced signal with default config', () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    expect(debouncedSignal.get()).toBe(0);
    expect(debouncedSignal.name).toBe(`${name}-debounced`);
  });

  it('should debounce updates with trailing edge', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});

    await fakeTimePassage(1);
    sourceSignal.set(10);
    await fakeTimePassage(1);
    sourceSignal.set(20);

    expect(sourceSignal.get()).toBe(20);
    expect(debouncedSignal.get()).toBe(0);

    await fakeTimePassage(110);
    expect(debouncedSignal.get()).toBe(20);
  });

  it('should support leading edge', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, leading: true});
    await fakeTimePassage(1);
    sourceSignal.set(1);
    await fakeTimePassage(2);
    expect(debouncedSignal.get()).toBe(1);
    sourceSignal.set(2);
    await fakeTimePassage(10);
    expect(debouncedSignal.get()).toBe(1);
    await fakeTimePassage(110);
    expect(debouncedSignal.get()).toBe(2);
  });

  it('should support trailing edge', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, trailing: true});
    await fakeTimePassage(1);
    sourceSignal.set(1);
    sourceSignal.set(2);
    await fakeTimePassage(2);
    expect(debouncedSignal.get()).toBe(0);
    await fakeTimePassage(110);
    expect(debouncedSignal.get()).toBe(2);
  });

  it('should cancel debounced updates on destroy', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    await fakeTimePassage(1);
    sourceSignal.set(1);
    await fakeTimePassage(1);
    debouncedSignal.destroy();
    expect(() => debouncedSignal.get()).toThrow(); // Should throw on access after
  });

  it('should call onDestroy callback if provided', () => {
    const onDestroyMock = jest.fn();
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, onDestroy: onDestroyMock});
    debouncedSignal.destroy();
    expect(onDestroyMock).toHaveBeenCalled();
  });

  it('should use custom name if provided', () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, name: 'custom-debounced'});
    expect(debouncedSignal.name).toBe('custom-debounced');
  });

  it('should handle multiple rapid updates correctly', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    await fakeTimePassage(1);
    sourceSignal.set(1);
    await fakeTimePassage(50);
    sourceSignal.set(2);
    await fakeTimePassage(50);
    sourceSignal.set(3);
    expect(debouncedSignal.get()).toBe(0);
    await fakeTimePassage(110);
    expect(debouncedSignal.get()).toBe(3);
  });

  it('should notify subscriber with receivePrevious', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback);
    await fakeTimePassage(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(0);
  });

  it('should notify subscribers when debounced value changes', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {receivePrevious: false});
    sourceSignal.set(1);
    await fakeTimePassage(110);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);
  });

  it('should not notify if debounced value does not change', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {receivePrevious: false});
    sourceSignal.set(0); // Same as initial
    await fakeTimePassage(110);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should notify multiple subscribers', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    debouncedSignal.subscribe(callback1, {receivePrevious: false});
    debouncedSignal.subscribe(callback2, {receivePrevious: false});
    sourceSignal.set(5);
    await fakeTimePassage(110);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(5);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(5);
  });

  it('should not notify unsubscribed listeners', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    const subscription = debouncedSignal.subscribe(callback, {receivePrevious: false});
    subscription.unsubscribe();
    sourceSignal.set(10);
    await fakeTimePassage(110);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {once: true, receivePrevious: false});
    sourceSignal.set(10);
    await fakeTimePassage(110);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(10);
    sourceSignal.set(20);
    await fakeTimePassage(110);
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should resolve untilNext() with the next debounced value', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const untilNextPromise = debouncedSignal.untilNext();
    sourceSignal.set(5);
    await fakeTimePassage(110);
    await expect(untilNextPromise).resolves.toBe(5);
  });

  it('should continue notifying other subscribers if one callback throws an error', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback1 = jest.fn(() => {
      throw new Error('simulate unhandled error for testing');
    });
    const callback2 = jest.fn();
    debouncedSignal.subscribe(callback1, {receivePrevious: false});
    debouncedSignal.subscribe(callback2, {receivePrevious: false});
    sourceSignal.set(10);
    await fakeTimePassage(110);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should update without any subscribers', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    expect(debouncedSignal.get()).toBe(0);
    sourceSignal.set(7);
    await fakeTimePassage(110);
    expect(debouncedSignal.get()).toBe(7);
  });

  it('should not notify after destroy', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {receivePrevious: false});
    debouncedSignal.destroy();
    sourceSignal.set(10);
    await fakeTimePassage(110);
    expect(callback).not.toHaveBeenCalled();
  });
});

describe('createDebouncedSignal — extra coverage', () => {
  const fakeTimePassage = async (ms = 0) => {
    const task = delay.nextMacrotask();
    jest.advanceTimersByTime(ms);
    await task;
  };

  /** @type {ComputedSignal<number>} */
  let debouncedSignal;
  /** @type {StateSignal<number>} */
  let sourceSignal;

  beforeEach(() => {
    jest.useFakeTimers();
    sourceSignal = new StateSignal({name: 'extra-source', initialValue: 0});
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    sourceSignal?.destroy();
    debouncedSignal?.destroy();
  });

  it('should support maxWait option — force update after maxWait even with continuous triggers', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, maxWait: 200});
    await fakeTimePassage(1);

    sourceSignal.set(1);
    await fakeTimePassage(80);
    sourceSignal.set(2);
    await fakeTimePassage(80);
    // 160ms total — still within delay but approaching maxWait.
    sourceSignal.set(3);
    await fakeTimePassage(50);
    // 210ms total — past maxWait, should have flushed.
    expect(debouncedSignal.get()).not.toBe(0);
  });

  it('should support leading + trailing together', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, leading: true, trailing: true});
    await fakeTimePassage(1);

    sourceSignal.set(1);
    await fakeTimePassage(2);
    // Leading: should update immediately.
    expect(debouncedSignal.get()).toBe(1);

    sourceSignal.set(2);
    await fakeTimePassage(110);
    // Trailing: should update to last value.
    expect(debouncedSignal.get()).toBe(2);
  });

  it('should support leading only (no trailing)', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, leading: true, trailing: false});
    await fakeTimePassage(1);

    sourceSignal.set(1);
    await fakeTimePassage(2);
    expect(debouncedSignal.get()).toBe(1);

    sourceSignal.set(2);
    await fakeTimePassage(110);
    // No trailing — should still be 1 (leading value).
    expect(debouncedSignal.get()).toBe(1);
  });
});
