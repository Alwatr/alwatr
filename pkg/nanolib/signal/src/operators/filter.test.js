import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {StateSignal, createFilteredSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('createFilteredSignal', () => {
  /** @type {StateSignal<number>} */
  let sourceSignal;

  beforeEach(() => {
    sourceSignal = new StateSignal({name: 'source', initialValue: 0});
  });

  afterEach(() => {
    sourceSignal.destroy();
  });

  it('should create a filtered signal with the correct default name', () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v > 0);
    expect(filtered.name).toBe('source-filtered');
    filtered.destroy();
  });

  it('should use a custom name when provided', () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v > 0, 'my-filter');
    expect(filtered.name).toBe('my-filter');
    filtered.destroy();
  });

  it('should have the initial value if it passes the predicate', () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v === 0);
    expect(filtered.get()).toBe(0);
    filtered.destroy();
  });

  it('should have undefined as initial value if initial does not pass the predicate', () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v > 0);
    expect(filtered.get()).toBeUndefined();
    filtered.destroy();
  });

  it('should update when source emits a value that passes the predicate', async () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v % 2 === 0);
    expect(filtered.get()).toBe(0); // 0 is even

    sourceSignal.set(2);
    await filtered.untilNext();
    expect(filtered.get()).toBe(2);

    filtered.destroy();
  });

  it('should not update when source emits a value that fails the predicate', async () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v % 2 === 0);
    const callback = jest.fn();
    filtered.subscribe(callback, {receivePrevious: false});

    sourceSignal.set(1); // odd — should not pass
    sourceSignal.set(3); // odd — should not pass
    await delay.by(10);

    expect(callback).not.toHaveBeenCalled();
    expect(filtered.get()).toBe(0); // Still the initial value.

    filtered.destroy();
  });

  it('should only emit values that pass the predicate', async () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v > 5);
    const callback = jest.fn();
    filtered.subscribe(callback, {receivePrevious: false});

    sourceSignal.set(3); // fails
    await delay.by(5);
    sourceSignal.set(10); // passes
    await filtered.untilNext();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(10);

    filtered.destroy();
  });

  it('should notify subscribers for each passing value', async () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v % 2 === 0);
    const callback = jest.fn();
    filtered.subscribe(callback, {receivePrevious: false});

    sourceSignal.set(2);
    await filtered.untilNext();
    sourceSignal.set(4);
    await filtered.untilNext();

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, 2);
    expect(callback).toHaveBeenNthCalledWith(2, 4);

    filtered.destroy();
  });

  it('should clean up subscriptions on destroy', async () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v > 0);
    const callback = jest.fn();
    filtered.subscribe(callback, {receivePrevious: false});

    filtered.destroy();
    sourceSignal.set(10);
    await delay.by(5);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should throw when accessing value after destroy', () => {
    const filtered = createFilteredSignal(sourceSignal, (v) => v > 0);
    filtered.destroy();
    expect(() => filtered.get()).toThrow();
  });
});
