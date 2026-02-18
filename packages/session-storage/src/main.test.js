import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { createSessionStorageProvider, SessionStorageProvider } from '@alwatr/session-storage';

/**
 * @jest-environment jsdom
 */
describe('SessionStorageProvider', () => {
  /**
   * @type {jest.Mocked<Pick<Storage, "getItem" | "setItem" | "removeItem">>}
   */
  let mockSessionStorage;

  beforeEach(() => {
    mockSessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('static has', () => {
    it('should return true if item exists', () => {
      mockSessionStorage.getItem.mockReturnValue('{"value": "test"}');
      const exists = SessionStorageProvider.has('test');
      expect(exists).toBe(true);
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('test');
    });

    it('should return false if item does not exist', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      const exists = SessionStorageProvider.has('test');
      expect(exists).toBe(false);
    });
  });

  describe('instance has', () => {
    it('should return true if item exists', () => {
      mockSessionStorage.getItem.mockReturnValue('{"value": "test"}');
      const provider = createSessionStorageProvider('test');
      const exists = provider.has();
      expect(exists).toBe(true);
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('test');
    });

    it('should return false if item does not exist', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      const provider = createSessionStorageProvider('test');
      const exists = provider.has();
      expect(exists).toBe(false);
    });
  });

  describe('read', () => {
    it('should return null if no item exists', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      const provider = createSessionStorageProvider('test');
      const result = provider.read();
      expect(result).toBe(null);
    });

    it('should return parsed value if item exists', () => {
      mockSessionStorage.getItem.mockReturnValue('{"key":"stored"}');
      const provider = createSessionStorageProvider('test');
      const result = provider.read();
      expect(result).toEqual({ key: 'stored' });
    });

    it('should return null on invalid JSON', () => {
      mockSessionStorage.getItem.mockReturnValue('invalid json');
      const provider = createSessionStorageProvider('test');
      const result = provider.read();
      expect(result).toBe(null);
    });
  });

  describe('write', () => {
    it('should serialize and store the value', () => {
      const provider = createSessionStorageProvider('test');
      provider.write({ key: 'newValue' });
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '{"key":"newValue"}');
    });

    it('should handle write errors gracefully', () => {
      mockSessionStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });
      const provider = createSessionStorageProvider('test');
      expect(() => provider.write({ key: 'value' })).not.toThrow();
    });

    it('should write different data types', () => {
      const provider = createSessionStorageProvider('test');
      provider.write('string value');
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '"string value"');
      provider.write(42);
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '42');
      provider.write([1, 2, 3]);
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('test', '[1,2,3]');
    });
  });

  describe('remove', () => {
    it('should remove the item from storage', () => {
      const provider = createSessionStorageProvider('test');
      provider.remove();
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('test');
    });

    it('should not throw if item does not exist', () => {
      const provider = createSessionStorageProvider('test');
      expect(() => provider.remove()).not.toThrow();
    });
  });

  describe('createSessionStorageProvider factory', () => {
    it('should create a provider instance', () => {
      const provider = createSessionStorageProvider('factory-test');
      expect(provider).toBeInstanceOf(SessionStorageProvider);
    });
  });
});
