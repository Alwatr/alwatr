import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

/**
 * Parse json string without throwing error.
 *
 * @param content - json string
 * @returns json object or null if json is invalid
 * @example
 * ```typescript
 * const json = parseJson('{"a":1,"b":2}');
 * console.log(json.a); // 1
 * ```
 */
function parseJson<T extends JsonValue>(content: string): T | null {
  try {
    return JSON.parse(content);
  }
  catch (err) {
    console.error('parseJson', 'invalid_json', err);
    return null;
  }
}

// @TODO: localStorage polyfill (memory fallback)

/**
 * A utility object for working with local storage and JSON data.
 */
export const localJsonStorage = {
  /**
   * Generate local storage key.
   *
   * @param name - Name of the item.
   * @param version - Version of the item (default: 1).
   * @returns The generated local storage key.
   * @example
   * ```typescript
   * localJsonStorage.key_('myItem', 1); // myItem.v1
   * ```
   */
  key_(name: string, version = 1): string {
    return `${name}.v${version}`;
  },

  /**
   * Get the local storage item and parse it as JSON.
   * If the item is not found, return the default value.
   * If the version is greater than 1, remove the previous version.
   * If the item is not a valid JSON object, return the default value.
   *
   * @param name - The name of the item.
   * @param defaultValue - The default value of the item.
   * @param version - The data structure version of the item (default: 1).
   * @returns The parsed JSON value or the default value if the item is not found.
   * @example
   * ```typescript
   * const value = localJsonStorage.getItem('myItem', {a: 1, b: 2});
   * ```
   */
  getItem<T extends JsonValue>(name: string, defaultValue: T, version = 1): T {
    if (version > 1) {
      this.removeItem(name, version - 1);
    }
    if (version > 1) {
      this.removeItem(name, version - 1);
    }
    const key = this.key_(name, version);
    const value = localStorage.getItem(key);
    if (value === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    const json = parseJson<T>(value);
    if (json === null) return defaultValue;
    return json;
  },

  /**
   * Check if an item exists in local storage.
   *
   * @param name - The name of the item.
   * @param version - The version of the item (default: 1).
   * @returns True if the item exists, false otherwise.
   * @example
   * ```typescript
   * const exists = localJsonStorage.hasItem('myItem');
   * ```
   */
  hasItem(name: string, version = 1): boolean {
    const key = this.key_(name, version);
    return localStorage.getItem(key) !== null;
  },

  /**
   * Set local storage item as JSON.
   *
   * @param name - Name of the item.
   * @param value - Value of the item.
   * @param version - Version of the item.
   * @example
   * ```typescript
   * localJsonStorage.setItem('myItem', {a: 1, b: 2});
   * ```
   */
  setItem<T extends JsonValue>(name: string, value: T, version = 1): void {
    const key = this.key_(name, version);
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * Removes an item from the local storage.
   *
   * @param name - The name of the item to remove.
   * @param version - The version of the item to remove. Default is 1.
   * @example
   * ```typescript
   * localJsonStorage.removeItem('myItem');
   * ```
   */
  removeItem(name: string, version = 1): void {
    const key = this.key_(name, version);
    localStorage.removeItem(key);
  },
} as const;
