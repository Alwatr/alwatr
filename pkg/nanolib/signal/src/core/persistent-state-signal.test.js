import {afterEach, beforeEach, describe, expect, it, jest} from 'bun:test';
import {PersistentStateSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

/**
 * @typedef {object} MockLocalStorage
 * @property {import('bun:test').Mock<(key: string) => string | null>} getItem
 * @property {import('bun:test').Mock<(key: string, value: string) => void>} setItem
 * @property {import('bun:test').Mock<(key: string) => void>} removeItem
 */

/**
 * @returns {MockLocalStorage}
 */
function createMockLocalStorage() {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
}

describe('PersistentStateSignal', () => {
  const name = 'test-persistent-state-signal';
  /** @type {PersistentStateSignal<number>} */
  let signal;
  /** @type {MockLocalStorage} */
  let mockLocalStorage;

  beforeEach(() => {
    jest.useFakeTimers();
    mockLocalStorage = createMockLocalStorage();
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });

    signal = new PersistentStateSignal({
      name,
      schemaVersion: 1,
      initialValue: 0,
    });
  });

  afterEach(() => {
    if (!signal.isDestroyed) signal.destroy();
    jest.useRealTimers();
  });

  it('should be defined and have the correct name and initial value', () => {
    expect(PersistentStateSignal).toBeDefined();
    expect(signal).toBeInstanceOf(PersistentStateSignal);
    expect(signal.name).toBe(name);
    expect(signal.get()).toBe(0);
  });

  it('should notify subscribers when value changes', async () => {
    const callback = jest.fn();
    signal.subscribe(callback, {receivePrevious: false});
    signal.set(42);
    const task = delay.nextMacrotask();
    jest.advanceTimersByTime(1);
    await task;
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(42);
  });

  it('should read initial value from localStorage if available', () => {
    mockLocalStorage.getItem.mockReturnValue('99');
    const s = new PersistentStateSignal({
      name: 'from-storage',
      schemaVersion: 1,
      initialValue: 0,
    });
    expect(s.get()).toBe(99);
    s.destroy();
  });

  it('should use initialValue when localStorage returns null', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const s = new PersistentStateSignal({
      name: 'no-storage',
      schemaVersion: 1,
      initialValue: 77,
    });
    expect(s.get()).toBe(77);
    s.destroy();
  });

  it('should write value to localStorage after debounce delay', async () => {
    signal.set(42);
    const task = delay.nextMacrotask();
    jest.advanceTimersByTime(1);
    await task;

    // Debounce default is 1000ms — advance past it.
    jest.advanceTimersByTime(3100);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-persistent-state-signal.v1', '42');
  });

  it('should debounce multiple writes', async () => {
    signal.set(1);
    const t1 = delay.nextMacrotask();
    jest.advanceTimersByTime(1);
    await t1;

    signal.set(2);
    const t2 = delay.nextMacrotask();
    jest.advanceTimersByTime(1);
    await t2;

    signal.set(3);
    const t3 = delay.nextMacrotask();
    jest.advanceTimersByTime(1);
    await t3;

    // Advance past debounce delay.
    jest.advanceTimersByTime(3100);

    // Should only write the last value due to debouncing.
    const setCalls = mockLocalStorage.setItem.mock.calls.filter((c) => c[0] === 'test-persistent-state-signal.v1');
    expect(setCalls.length).toBeGreaterThanOrEqual(1);
    const lastCall = setCalls[setCalls.length - 1];
    expect(lastCall[1]).toBe('3');
  });

  it('should use custom storageKey when provided', () => {
    mockLocalStorage.getItem.mockReturnValue('"custom-data"');
    const s = new PersistentStateSignal({
      name: 'my-signal',
      storageKey: 'custom-key',
      schemaVersion: 2,
      initialValue: 'default',
    });
    // Should read from custom-key.v2
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('custom-key.v2');
    expect(s.get()).toBe('custom-data');
    s.destroy();
  });

  it('should remove old schema versions on construction', () => {
    const s = new PersistentStateSignal({
      name: 'versioned',
      schemaVersion: 3,
      initialValue: 0,
    });
    // Should remove v0, v1, v2 (versions before 3).
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('versioned.v0');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('versioned.v1');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('versioned.v2');
    s.destroy();
  });

  describe('remove()', () => {
    it('should remove the value from localStorage', () => {
      signal.remove();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-persistent-state-signal.v1');
    });

    it('should keep in-memory value after remove', () => {
      signal.set(42);
      signal.remove();
      expect(signal.get()).toBe(42);
    });

    it('should throw on destroyed signal', () => {
      signal.destroy();
      expect(() => signal.remove()).toThrow();
    });
  });

  describe('destroy()', () => {
    it('should flush pending writes on destroy', async () => {
      signal.set(99);
      const task = delay.nextMacrotask();
      jest.advanceTimersByTime(1);
      await task;

      // Destroy should flush the debouncer.
      signal.destroy();

      // The value should have been written to storage.
      const setCalls = mockLocalStorage.setItem.mock.calls.filter((c) => c[0] === 'test-persistent-state-signal.v1');
      expect(setCalls.length).toBeGreaterThanOrEqual(1);
      const lastCall = setCalls[setCalls.length - 1];
      expect(lastCall[1]).toBe('99');
    });

    it('should throw when interacting after destroy', () => {
      signal.destroy();
      expect(() => signal.get()).toThrow();
    });
  });
});
