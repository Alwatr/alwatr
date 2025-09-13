import {describe, beforeEach, afterEach, it, expect, jest} from '@jest/globals';
import {createLocalStorageProvider, LocalStorageProvider} from '@alwatr/local-storage';

/**
 * @jest-environment jsdom
 */
describe('LocalStorageProvider', () => {
  /**
   * @type {jest.Mocked<Pick<Storage, "getItem" | "setItem" | "removeItem">>}
   */
  let mockLocalStorage;

  beforeEach(() => {
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('static getKey', () => {
    it('should generate the correct versioned key', () => {
      const key = LocalStorageProvider.getKey({name: 'test', version: 1});
      expect(key).toBe('test.v1');
    });

    it('should handle different names and versions', () => {
      const key1 = LocalStorageProvider.getKey({name: 'user-settings', version: 2});
      expect(key1).toBe('user-settings.v2');
      const key2 = LocalStorageProvider.getKey({name: 'form-data', version: 5});
      expect(key2).toBe('form-data.v5');
    });
  });

  describe('static has', () => {
    it('should return true if item exists', () => {
      mockLocalStorage.getItem.mockReturnValue('{"value": "test"}');
      const exists = LocalStorageProvider.has({name: 'test', version: 1});
      expect(exists).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test.v1');
    });

    it('should return false if item does not exist', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const exists = LocalStorageProvider.has({name: 'test', version: 1});
      expect(exists).toBe(false);
    });

    it('should return false for null value', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const exists = LocalStorageProvider.has({name: 'test', version: 1});
      expect(exists).toBe(false);
    });
  });

  describe('constructor and migration', () => {
    it('should initialize with config and migrate old versions', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 3,
        defaultValue: {key: 'value'},
      });
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v1');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v2');
    });

    it('should not migrate if version is 1', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        defaultValue: {key: 'value'},
      });
      expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
    });

    it('should migrate multiple old versions for higher version', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 5,
        defaultValue: {key: 'value'},
      });
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v1');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v2');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v3');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v4');
    });
  });

  describe('read', () => {
    it('should return default value if no item exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        defaultValue: {key: 'default'},
      });
      const result = provider.read();
      expect(result).toEqual({key: 'default'});
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test.v1', '{"key":"default"}');
    });

    it('should return parsed value if item exists', () => {
      mockLocalStorage.getItem.mockReturnValue('{"key":"stored"}');
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        defaultValue: {key: 'default'},
      });
      const result = provider.read();
      expect(result).toEqual({key: 'stored'});
    });

    it('should return default value on invalid JSON', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        defaultValue: {key: 'default'},
      });
      const result = provider.read();
      expect(result).toEqual({key: 'default'});
    });

    it('should handle complex default values', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        defaultValue: {theme: 'dark', lastLogin: Date.now(), settings: [1, 2, 3]},
      });
      const result = provider.read();
      expect(result.theme).toBe('dark');
      expect(Array.isArray(result.settings)).toBe(true);
    });
  });

  describe('write', () => {
    it('should serialize and store the value', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        defaultValue: {key: 'default'},
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
        version: 1,
        defaultValue: {key: 'default'},
      });
      expect(() => provider.write({key: 'value'})).not.toThrow();
    });

    it('should write different data types', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        /**
         * @type {string|number|Array<number>}
         */
        defaultValue: '',
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
        version: 1,
        defaultValue: {key: 'default'},
      });
      provider.remove();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test.v1');
    });

    it('should not throw if item does not exist', () => {
      const provider = createLocalStorageProvider({
        name: 'test',
        version: 1,
        defaultValue: {key: 'default'},
      });
      expect(() => provider.remove()).not.toThrow();
    });
  });

  describe('createLocalStorageProvider factory', () => {
    it('should create a provider instance', () => {
      const provider = createLocalStorageProvider({
        name: 'factory-test',
        version: 1,
        defaultValue: {created: true},
      });
      expect(provider).toBeInstanceOf(LocalStorageProvider);
      const result = provider.read();
      expect(result.created).toBe(true);
    });

    it('should handle different configurations', () => {
      const provider1 = createLocalStorageProvider({
        name: 'config1',
        version: 2,
        defaultValue: 'default1',
      });
      const provider2 = createLocalStorageProvider({
        name: 'config2',
        version: 1,
        defaultValue: {key: 'default2'},
      });
      expect(provider1.read()).toBe('default1');
      expect(provider2.read().key).toBe('default2');
    });
  });
});
