import {afterEach, beforeEach, describe, expect, it, jest} from 'bun:test';
import {SessionStateSignal} from '@alwatr/signal';
import {delay} from '@alwatr/delay';

/**
 * @typedef {object} MockSessionStorage
 * @property {import('bun:test').Mock<(key: string) => string | null>} getItem
 * @property {import('bun:test').Mock<(key: string, value: string) => void>} setItem
 * @property {import('bun:test').Mock<(key: string) => void>} removeItem
 */

/**
 * @returns {MockSessionStorage}
 */
function createMockSessionStorage() {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
}

describe('SessionStateSignal', () => {
  const name = 'test-session-state-signal';
  /** @type {SessionStateSignal<number>} */
  let signal;
  /** @type {MockSessionStorage} */
  let mockSessionStorage;

  beforeEach(() => {
    jest.useFakeTimers();
    mockSessionStorage = createMockSessionStorage();
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
      configurable: true,
    });

    signal = new SessionStateSignal({
      name,
      initialValue: 0,
    });
  });

  afterEach(() => {
    if (!signal.isDestroyed) signal.destroy();
    jest.useRealTimers();
  });

  it('should be defined and have the correct name and initial value', () => {
    expect(SessionStateSignal).toBeDefined();
    expect(signal).toBeInstanceOf(SessionStateSignal);
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

  it('should read initial value from sessionStorage if available', () => {
    mockSessionStorage.getItem.mockReturnValue('55');
    const s = new SessionStateSignal({
      name: 'from-session',
      initialValue: 0,
    });
    expect(s.get()).toBe(55);
    s.destroy();
  });

  it('should use initialValue when sessionStorage returns null', () => {
    mockSessionStorage.getItem.mockReturnValue(null);
    const s = new SessionStateSignal({
      name: 'no-session',
      initialValue: 77,
    });
    expect(s.get()).toBe(77);
    s.destroy();
  });

  it('should write value to sessionStorage after debounce delay', async () => {
    signal.set(42);
    const task = delay.nextMacrotask();
    jest.advanceTimersByTime(1);
    await task;

    // Debounce default is 500ms.
    jest.advanceTimersByTime(600);

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(name, '42');
  });

  it('should use custom storageKey when provided', () => {
    mockSessionStorage.getItem.mockReturnValue('"custom"');
    const s = new SessionStateSignal({
      name: 'my-signal',
      storageKey: 'custom-session-key',
      initialValue: 'default',
    });
    expect(mockSessionStorage.getItem).toHaveBeenCalledWith('custom-session-key');
    expect(s.get()).toBe('custom');
    s.destroy();
  });

  describe('remove()', () => {
    it('should remove the value from sessionStorage', () => {
      signal.remove();
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(name);
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

      signal.destroy();

      const setCalls = mockSessionStorage.setItem.mock.calls.filter((c) => c[0] === name);
      expect(setCalls.length).toBeGreaterThanOrEqual(1);
      const lastCall = setCalls[setCalls.length - 1];
      expect(lastCall[1]).toBe('99');
    });

    it('should not throw on destroy', () => {
      expect(() => signal.destroy()).not.toThrow();
    });

    it('should throw when interacting after destroy', () => {
      signal.destroy();
      expect(() => signal.get()).toThrow();
    });
  });

  describe('isDestroyed', () => {
    it('should be false initially', () => {
      expect(signal.isDestroyed).toBe(false);
    });

    it('should be true after destroy', () => {
      signal.destroy();
      expect(signal.isDestroyed).toBe(true);
    });
  });
});
