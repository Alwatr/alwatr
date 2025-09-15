import {describe, beforeEach, afterEach, it, expect, jest} from '@jest/globals';
import {ComputedSignal, createDebouncedSignal, StateSignal} from '@alwatr/signal';

describe('createDebouncedSignal', () => {
  /** @type {ComputedSignal<number>} */
  let debouncedSignal;
  /** @type {StateSignal<number>} */
  let sourceSignal;
  const signalId = 'test-debounce-signal';
  /**
   * @type {import("jest-mock").Mock<import("jest-mock").UnknownFunction>}
   */
  let mockFunc;

  beforeEach(() => {
    mockFunc = jest.fn();
    jest.useFakeTimers();
    sourceSignal = new StateSignal({signalId, initialValue: 0});
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
    expect(debouncedSignal.signalId).toBe(`${signalId}-debounced`);
  });

  it('should debounce updates with trailing edge', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    await jest.advanceTimersByTimeAsync(1);
    sourceSignal.set(1);
    sourceSignal.set(2);
    expect(debouncedSignal.get()).toBe(0);
    await jest.advanceTimersByTimeAsync(110);
    expect(debouncedSignal.get()).toBe(2);
  });

  it('should support leading edge', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, leading: true});
    await jest.advanceTimersByTimeAsync(1);
    sourceSignal.set(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(debouncedSignal.get()).toBe(1);
    sourceSignal.set(2);
    await jest.advanceTimersByTimeAsync(10);
    expect(debouncedSignal.get()).toBe(1);
    await jest.advanceTimersByTimeAsync(100);
    expect(debouncedSignal.get()).toBe(2);
  });

  it('should support trailing edge', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, trailing: true});
    await jest.advanceTimersByTimeAsync(1);
    sourceSignal.set(1);
    sourceSignal.set(2);
    await jest.advanceTimersByTimeAsync(1);
    expect(debouncedSignal.get()).toBe(0);
    await jest.advanceTimersByTimeAsync(100);
    expect(debouncedSignal.get()).toBe(2);
  });

  it('should cancel debounced updates on destroy', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    await jest.advanceTimersByTimeAsync(1);
    sourceSignal.set(1);
    await jest.advanceTimersByTimeAsync(1);
    debouncedSignal.destroy();
    expect(() => debouncedSignal.get()).toThrow(); // Should throw on access after
  });

  it('should call onDestroy callback if provided', () => {
    const onDestroyMock = jest.fn();
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, onDestroy: onDestroyMock});
    debouncedSignal.destroy();
    expect(onDestroyMock).toHaveBeenCalled();
  });

  it('should use custom signalId if provided', () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100, signalId: 'custom-debounced'});
    expect(debouncedSignal.signalId).toBe('custom-debounced');
  });

  it('should handle multiple rapid updates correctly', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    await jest.advanceTimersByTimeAsync(1);
    sourceSignal.set(1);
    await jest.advanceTimersByTimeAsync(50);
    sourceSignal.set(2);
    await jest.advanceTimersByTimeAsync(50);
    sourceSignal.set(3);
    expect(debouncedSignal.get()).toBe(0);
    await jest.advanceTimersByTimeAsync(110);
    expect(debouncedSignal.get()).toBe(3);
  });

    it('should notify subscriber with receivePrevious', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback);
    await jest.advanceTimersByTimeAsync(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(0);
  });

  it('should notify subscribers when debounced value changes', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {receivePrevious: false});
    sourceSignal.set(1);
    await jest.advanceTimersByTimeAsync(110);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);
  });

  it('should not notify if debounced value does not change', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {receivePrevious: false});
    sourceSignal.set(0); // Same as initial
    await jest.advanceTimersByTimeAsync(110);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should notify multiple subscribers', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    debouncedSignal.subscribe(callback1, {receivePrevious: false});
    debouncedSignal.subscribe(callback2, {receivePrevious: false});
    sourceSignal.set(5);
    await jest.advanceTimersByTimeAsync(110);
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
    await jest.advanceTimersByTimeAsync(110);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle subscriptions with the "once" option', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {once: true, receivePrevious: false});
    sourceSignal.set(10);
    await jest.advanceTimersByTimeAsync(110);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(10);
    sourceSignal.set(20);
    await jest.advanceTimersByTimeAsync(110);
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should resolve untilNext() with the next debounced value', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const untilNextPromise = debouncedSignal.untilNext();
    sourceSignal.set(5);
    await jest.advanceTimersByTimeAsync(110);
    await expect(untilNextPromise).resolves.toBe(5);
  });

  it('should continue notifying other subscribers if one callback throws an error', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback1 = jest.fn(() => {
      throw new Error('Test error');
    });
    const callback2 = jest.fn();
    debouncedSignal.subscribe(callback1, {receivePrevious: false});
    debouncedSignal.subscribe(callback2, {receivePrevious: false});
    sourceSignal.set(10);
    await jest.advanceTimersByTimeAsync(110);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should update without any subscribers', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    expect(debouncedSignal.get()).toBe(0);
    sourceSignal.set(7);
    await jest.advanceTimersByTimeAsync(110);
    expect(debouncedSignal.get()).toBe(7);
  });

  it('should not notify after destroy', async () => {
    debouncedSignal = createDebouncedSignal(sourceSignal, {delay: 100});
    const callback = jest.fn();
    debouncedSignal.subscribe(callback, {receivePrevious: false});
    debouncedSignal.destroy();
    sourceSignal.set(10);
    await jest.advanceTimersByTimeAsync(110);
    expect(callback).not.toHaveBeenCalled();
  });
});
