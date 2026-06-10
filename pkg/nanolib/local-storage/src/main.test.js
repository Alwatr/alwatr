import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {createLocalStorageProvider, LocalStorageProvider} from '@alwatr/local-storage';

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

/**
 * @jest-environment jsdom
 */
describe('LocalStorageProvider', () => {
  /** @type {MockLocalStorage} */
  let mockLocalStorage;

  /** @type {Storage | undefined} */
  let originalLocalStorage;

  beforeEach(() => {
    originalLocalStorage = globalThis.localStorage;
    mockLocalStorage = createMockLocalStorage();

    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('static getKey', () => {
    it('should generate the correct versioned key', () => {
      const key = LocalStorageProvider.getKey({name: 'test', schemaVersion: 1});
      expect(key).toBe('test.v1');
    });

    it('should handle different names and versions', () => {
      const key1 = LocalStorageProvider.getKey({name: 'user-settings', schemaVersion: 2});
      expect(key1).toBe('user-settings.v2');
      const key2 = LocalStorageProvider.getKey({name: 'form-data', schemaVersion: 5});
      expect(key2).toBe('form-data.v5');
    });
  });

  describe('static has', () => {
    it('should return true if item exists', () => {
      mockLocalStorage.getItem.mockReturnValue('{"value": "test"}');
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      const exists = provider.has();
      expect(exists).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test.v1');
    });

    it('should return false if item does not exist', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      const exists = provider.has();
      expect(exists).toBe(false);
    });

    it('should return false for null value', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      const exists = provider.has();
      expect(exists).toBe(false);
    });
  });

  describe('constructor and migration', () => {
    it('should initialize with config and migrate old versions', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 3,
      });
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v1');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v2');
    });

    it('should not migrate if schemaVersion is 0', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 0,
      });
      expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
    });

    it('should migrate multiple old versions for higher schemaVersion', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 5,
      });
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v1');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v2');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v3');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v4');
    });
  });

  describe('read', () => {
    it('should return null if no item exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      const result = provider.read();
      expect(result).toBe(null);
    });

    it('should return parsed value if item exists', () => {
      mockLocalStorage.getItem.mockReturnValue('{"key":"stored"}');
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      const result = provider.read();
      expect(result).toEqual({key: 'stored'});
    });

    it('should return null on invalid JSON', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      const result = provider.read();
      expect(result).toBe(null);
    });
  });

  describe('write', () => {
    it('should serialize and store the value', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      provider.write({key: 'newValue'});
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test.v1', '{"key":"newValue"}');
    });

    it('should handle write errors gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      expect(() => provider.write({key: 'value'})).not.toThrow();
    });

    it('should write different data types', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      provider.write('string value');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test.v1', '"string value"');
      provider.write(42);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test.v1', '42');
      provider.write([1, 2, 3]);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test.v1', '[1,2,3]');
    });
  });

  describe('remove', () => {
    it('should remove the item from storage', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      provider.remove();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v1');
    });

    it('should not throw if item does not exist', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        schemaVersion: 1,
      });
      expect(() => provider.remove()).not.toThrow();
    });
  });

  describe('createLocalStorageProvider factory', () => {
    it('should create a provider instance', () => {
      const provider = createLocalStorageProvider({
        name: 'factory-test',
        schemaVersion: 1,
      });
      expect(provider).toBeInstanceOf(LocalStorageProvider);
    });

    it('should handle different configurations', () => {
      const provider1 = createLocalStorageProvider({
        name: 'config1',
        schemaVersion: 2,
      });
      const provider2 = createLocalStorageProvider({
        name: 'config2',
        schemaVersion: 1,
      });
      expect(provider1.read()).toBe(null);
      expect(provider2.read()).toBe(null);
    });
  });
});
