import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { PersistentStateSignal } from '@alwatr/signal';
import { delay } from "@alwatr/delay";

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
    signal.destroy();
  });

  it('should be defined and have the correct name and initial value', () => {
    expect(PersistentStateSignal).toBeDefined();
    expect(signal).toBeInstanceOf(PersistentStateSignal);
    expect(signal.name).toBe(name);
    expect(signal.get()).toBe(0);
  });

  it('should notify subscribers when value changes', async () => {
    const callback = jest.fn();
    const newValue = 42;

    signal.subscribe(callback, { receivePrevious: false });
    signal.set(newValue);

    expect(callback).not.toHaveBeenCalled(); // Should be async
    await delay.nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(newValue);
  });
});