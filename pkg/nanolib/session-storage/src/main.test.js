import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {createSessionStorageProvider, SessionStorageProvider} from '@alwatr/session-storage';

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

describe('SessionStorageProvider', () => {
  /** @type {MockSessionStorage} */
  let mockSessionStorage;

  beforeEach(() => {
    mockSessionStorage = createMockSessionStorage();
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a provider instance', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      expect(provider).toBeInstanceOf(SessionStorageProvider);
    });
  });

  describe('has (instance)', () => {
    it('should return true if item exists', () => {
      mockSessionStorage.getItem.mockReturnValue('{"value": "test"}');
      const provider = createSessionStorageProvider({name: 'test'});
      const exists = provider.has();
      expect(exists).toBe(true);
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('test');
    });

    it('should return false if item does not exist', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      const provider = createSessionStorageProvider({name: 'test'});
      const exists = provider.has();
      expect(exists).toBe(false);
    });
  });

  describe('has (static)', () => {
    it('should return true if item exists in sessionStorage', () => {
      mockSessionStorage.getItem.mockReturnValue('{"value": "test"}');
      const exists = SessionStorageProvider.has('test-key');
      expect(exists).toBe(true);
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('test-key');
    });

    it('should return false if item does not exist', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      const exists = SessionStorageProvider.has('missing-key');
      expect(exists).toBe(false);
    });
  });

  describe('read', () => {
    it('should return null if no item exists', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      const provider = createSessionStorageProvider({name: 'test'});
      const result = provider.read();
      expect(result).toBeNull();
    });

    it('should return parsed value if item exists', () => {
      mockSessionStorage.getItem.mockReturnValue('{"key":"stored"}');
      const provider = createSessionStorageProvider({name: 'test'});
      const result = provider.read();
      expect(result).toEqual({key: 'stored'});
    });

    it('should return null on invalid JSON', () => {
      mockSessionStorage.getItem.mockReturnValue('invalid json');
      const provider = createSessionStorageProvider({name: 'test'});
      const result = provider.read();
      expect(result).toBeNull();
    });

    it('should return parsed string value', () => {
      mockSessionStorage.getItem.mockReturnValue('"hello"');
      const provider = createSessionStorageProvider({name: 'test'});
      const result = provider.read();
      expect(result).toBe('hello');
    });

    it('should return parsed number value', () => {
      mockSessionStorage.getItem.mockReturnValue('42');
      const provider = createSessionStorageProvider({name: 'test'});
      const result = provider.read();
      expect(result).toBe(42);
    });

    it('should return parsed array value', () => {
      mockSessionStorage.getItem.mockReturnValue('[1,2,3]');
      const provider = createSessionStorageProvider({name: 'test'});
      const result = provider.read();
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle sessionStorage.getItem throwing', () => {
      mockSessionStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const provider = createSessionStorageProvider({name: 'test'});
      const result = provider.read();
      expect(result).toBeNull();
    });
  });

  describe('write', () => {
    it('should serialize and store the value', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      provider.write({key: 'newValue'});
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '{"key":"newValue"}');
    });

    it('should write string values', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      provider.write('string value');
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '"string value"');
    });

    it('should write number values', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      provider.write(42);
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '42');
    });

    it('should write array values', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      provider.write([1, 2, 3]);
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '[1,2,3]');
    });

    it('should handle sessionStorage.setItem throwing gracefully', () => {
      mockSessionStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });
      const provider = createSessionStorageProvider({name: 'test'});
      // Should not throw — error is caught and logged internally.
      expect(() => provider.write({key: 'value'})).not.toThrow();
    });

    it('should throw when value cannot be serialized', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      const circular = {};
      circular.self = circular;
      expect(() => provider.write(circular)).toThrow('write_stringify_error');
    });
  });

  describe('remove', () => {
    it('should remove the item from sessionStorage', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      provider.remove();
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('test');
    });

    it('should not throw if item does not exist', () => {
      const provider = createSessionStorageProvider({name: 'test'});
      expect(() => provider.remove()).not.toThrow();
    });
  });

  describe('createSessionStorageProvider factory', () => {
    it('should create a provider instance', () => {
      const provider = createSessionStorageProvider({name: 'factory-test'});
      expect(provider).toBeInstanceOf(SessionStorageProvider);
    });

    it('should create independent providers for different names', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      const provider1 = createSessionStorageProvider({name: 'config1'});
      const provider2 = createSessionStorageProvider({name: 'config2'});
      expect(provider1.read()).toBeNull();
      expect(provider2.read()).toBeNull();
    });
  });
});
