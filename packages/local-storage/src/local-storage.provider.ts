import {createLogger} from '@alwatr/logger';

import type {LocalStorageProviderConfig} from './type.js';

/**
 * A provider class for managing a specific, versioned item in localStorage.
 * It encapsulates the logic for key generation, serialization, and migration.
 *
 * @example
 * ```typescript
 * const userSettings = new LocalStorageProvider({
 *   name: 'user-settings',
 *   version: 1,
 *   defaultValue: { theme: 'light', notifications: true }
 * });
 *
 * // Write new settings
 * userSettings.write({ theme: 'dark', notifications: false });
 *
 * // Read the current settings
 * const currentSettings = userSettings.read();
 * console.log(currentSettings); // { theme: 'dark', notifications: false }
 * ```
 */
export class LocalStorageProvider<T extends JsonValue> {
  public static readonly version = __package_version__;

  private readonly key__: string;
  protected readonly logger_;

  constructor(config: LocalStorageProviderConfig) {
    this.logger_ = createLogger(`local-storage-provider: ${config.name}, v: ${config.schemaVersion}`);
    this.logger_.logMethodArgs?.('constructor', {config});
    this.key__ = LocalStorageProvider.getKey(config);
    LocalStorageProvider.clearPreviousStorageVersions(config);
  }

  /**
   * Generates the versioned storage key.
   * @param meta - An object containing the name and schemaVersion.
   * @returns The versioned key string.
   */
  public static getKey(config: LocalStorageProviderConfig): string {
    return `${config.name}.v${config.schemaVersion}`;
  }

  /**
   * Manages data migration by removing all previous versions of the item.
   */
  public static clearPreviousStorageVersions(config: LocalStorageProviderConfig): void {
    if (config.schemaVersion < 1) return;

    // Iterate from v1 up to the version just before the current one and remove them.
    for (let i = 0; i < config.schemaVersion; i++) {
      const oldKey = LocalStorageProvider.getKey({name: config.name, schemaVersion: i});
      localStorage.removeItem(oldKey);
    }
  }

  /**
   * Statically checks if a versioned item exists in localStorage.
   * This method provides a high-performance way to check for data existence without the overhead of creating a full provider instance.
   *
   * @param meta - An object containing the name and version of the item to check.
   * @returns `true` if the item exists, otherwise `false`.
   *
   * @example
   * ```typescript
   * const formExists = LocalStorageProvider.has({ name: 'user-form', schemaVersion: 1 });
   * if (formExists) {
   *   // Show the "Thank you" message
   * } else {
   *   // Show the form
   * }
   * ```
   */
  public has(): boolean {
    return localStorage.getItem(this.key__) !== null;
  }

  /**
   * Reads and parses the value from localStorage.
   * If the item doesn't exist, is invalid JSON, or doesn't match the expected type,
   * it writes and returns the default value.
   */
  public read(): T | null {
    let value: string | null = null;

    try {
      value = localStorage.getItem(this.key__);
    }
    catch (err) {
      this.logger_.error('read', 'read_local_storage_error', {err});
    }

    if (!value) {
      this.logger_.logMethod?.('read//no_value');
      return null;
    }

    try {
      const parsedValue = JSON.parse(value) as T;
      this.logger_.logMethodFull?.('read//value', undefined, {parsedValue});
      return parsedValue;
    }
    catch (err) {
      this.logger_.error('read', 'read_parse_error', {err});
      return null;
    }
  }

  /**
   * Serializes and writes a value to localStorage.
   */
  public write(value: T): void {
    this.logger_.logMethodArgs?.('write', {value});
    let valueStr: string;
    try {
      valueStr = JSON.stringify(value);
    }
    catch (err) {
      this.logger_.error('write', 'write_stringify_error', {err});
      throw new Error('write_stringify_error');
    }

    try {
      localStorage.setItem(this.key__, valueStr);
    }
    catch (err) {
      this.logger_.error('write', 'write_local_storage_error', {err});
    }
  }

  /**
   * Removes the item from localStorage.
   */
  public remove(): void {
    localStorage.removeItem(this.key__);
  }
}
