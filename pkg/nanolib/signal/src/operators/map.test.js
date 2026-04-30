import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {StateSignal, createMappedSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

describe('createMappedSignal', () => {
  /** @type {StateSignal<{name: string; age: number}>} */
  let sourceSignal;

  beforeEach(() => {
    sourceSignal = new StateSignal({name: 'user', initialValue: {name: 'John', age: 30}});
  });

  afterEach(() => {
    sourceSignal.destroy();
  });

  it('should create a mapped signal with the correct default name', () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.name);
    expect(mapped.name).toBe('user-mapped');
    mapped.destroy();
  });

  it('should use a custom name when provided', () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.name, 'user-name');
    expect(mapped.name).toBe('user-name');
    mapped.destroy();
  });

  it('should compute the initial value from the source', () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.name);
    expect(mapped.get()).toBe('John');
    mapped.destroy();
  });

  it('should update when the source signal changes', async () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.name);

    sourceSignal.set({name: 'Jane', age: 32});
    await mapped.untilNext();

    expect(mapped.get()).toBe('Jane');
    mapped.destroy();
  });

  it('should apply the projection function correctly', async () => {
    const mapped = createMappedSignal(sourceSignal, (user) => `${user.name} (${user.age})`);
    expect(mapped.get()).toBe('John (30)');

    sourceSignal.set({name: 'Jane', age: 25});
    await mapped.untilNext();

    expect(mapped.get()).toBe('Jane (25)');
    mapped.destroy();
  });

  it('should notify subscribers when the mapped value changes', async () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.age);
    const callback = jest.fn();
    mapped.subscribe(callback, {receivePrevious: false});

    sourceSignal.set({name: 'John', age: 31});
    await mapped.untilNext();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(31);

    mapped.destroy();
  });

  it('should not notify if the mapped value does not change', async () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.name);
    const callback = jest.fn();
    mapped.subscribe(callback, {receivePrevious: false});

    // Change age but not name — mapped value stays 'John'.
    sourceSignal.set({name: 'John', age: 31});
    await delay.by(10);

    expect(callback).not.toHaveBeenCalled();
    mapped.destroy();
  });

  it('should support numeric projections', () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.age * 2);
    expect(mapped.get()).toBe(60);
    mapped.destroy();
  });

  it('should support boolean projections', () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.age >= 18);
    expect(mapped.get()).toBe(true);
    mapped.destroy();
  });

  it('should clean up on destroy', async () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.name);
    const callback = jest.fn();
    mapped.subscribe(callback, {receivePrevious: false});

    mapped.destroy();
    sourceSignal.set({name: 'Jane', age: 25});
    await delay.by(5);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should throw when accessing value after destroy', () => {
    const mapped = createMappedSignal(sourceSignal, (user) => user.name);
    mapped.destroy();
    expect(() => mapped.get()).toThrow();
  });
});
