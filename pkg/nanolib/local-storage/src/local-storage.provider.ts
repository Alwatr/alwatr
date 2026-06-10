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
 *   version: 1
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
export class LocalStorageProvider<T> {
  public static readonly version = __package_version__;

  private readonly key__: string;
  protected readonly logger_;
  protected readonly parse_: (value: string) => T;
  protected readonly stringify_: (value: T) => string;

  constructor(config: LocalStorageProviderConfig<T>) {
    this.logger_ = createLogger(`local-storage-provider: ${config.name}, v: ${config.schemaVersion}`);
    DEV_MODE && this.logger_.logMethodArgs?.('constructor', {config});
    this.key__ = LocalStorageProvider.getKey(config);
    LocalStorageProvider.clearPreviousStorageVersions(config);

    this.parse_ = config.parse ?? (JSON.parse as (value: string) => T);
    this.stringify_ = config.stringify ?? JSON.stringify;
  }

  /**
   * Generates the versioned storage key.
   * @param config - An object containing the name and schemaVersion.
   * @returns The versioned key string.
   */
  public static getKey(config: {name: string; schemaVersion: number}): string {
    return `${config.name}.v${config.schemaVersion}`;
  }

  /**
   * Manages data migration by removing all previous versions of the item.
   */
  public static clearPreviousStorageVersions(config: {name: string; schemaVersion: number}): void {
    if (config.schemaVersion < 1) return;

    // Iterate from v1 up to the version just before the current one and remove them.
    for (let i = 0; i < config.schemaVersion; i++) {
      const oldKey = LocalStorageProvider.getKey({name: config.name, schemaVersion: i});
      localStorage.removeItem(oldKey);
    }
  }

  /**
   * Checks if a versioned item exists in localStorage for the given configuration.
   * This static method allows checking for the existence of a specific versioned item
   * without instantiating the provider.
   *
   * @param config - The configuration object containing the name and schemaVersion.
   * @returns `true` if the item exists in localStorage, otherwise `false`.
   *
   * @example
   * ```typescript
   * const exists = LocalStorageProvider.has({ name: 'user-form', schemaVersion: 1 });
   * ```
   */
  public static has(config: LocalStorageProviderConfig): boolean {
    const key = LocalStorageProvider.getKey(config);
    return localStorage.getItem(key) !== null;
  }

  /**
   * Checks if the current versioned item exists in localStorage.
   *
   * @returns `true` if the item exists in localStorage, otherwise `false`.
   *
   * @example
   * ```typescript
   * const provider = new LocalStorageProvider({ name: 'profile', schemaVersion: 2 });
   * if (provider.has()) {
   *   // Item exists
   * }
   * ```
   */
  public has(): boolean {
    return localStorage.getItem(this.key__) !== null;
  }

  /**
   * Reads and parses the value from localStorage.
   * If the item doesn't exist or is invalid JSON, returns null.
   */
  public read(): T | null {
    let value: string | null = null;

    try {
      value = localStorage.getItem(this.key__);
    } catch (err) {
      this.logger_.error('read', 'read_local_storage_error', {err});
    }

    if (!value) {
      DEV_MODE && this.logger_.logMethod?.('read//no_value');
      return null;
    }

    try {
      const parsedValue = this.parse_(value);
      DEV_MODE && this.logger_.logMethodFull?.('read//value', undefined, {parsedValue});
      return parsedValue;
    } catch (err) {
      this.logger_.error('read', 'read_parse_error', {err});
      return null;
    }
  }

  /**
   * Serializes and writes a value to localStorage.
   */
  public write(value: T): void {
    DEV_MODE && this.logger_.logMethodArgs?.('write', {value});
    let valueStr: string;
    try {
      valueStr = this.stringify_(value);
    } catch (err) {
      this.logger_.error('write', 'write_stringify_error', {err});
      throw new Error('write_stringify_error');
    }

    try {
      localStorage.setItem(this.key__, valueStr);
    } catch (err) {
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
