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
});
