import {createLogger} from '@alwatr/logger';

import type {LocalStorageProviderConfig, StorageMeta} from './type.js';

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
  protected readonly logger_ = createLogger(`local-storage-provider: ${this.config_.name}, v: ${this.config_.schemaVersion}`);

  constructor(protected readonly config_: LocalStorageProviderConfig<T>) {
    this.logger_.logMethodArgs?.('constructor', {config: this.config_});
    this.key__ = LocalStorageProvider.getKey(this.config_);
    this.migrate__();
  }

  /**
   * Generates the versioned storage key.
   * @param meta - An object containing the name and schemaVersion.
   * @returns The versioned key string.
   */
  public static getKey(meta: StorageMeta): string {
    return `${meta.name}.v${meta.schemaVersion}`;
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
  public static has(meta: StorageMeta): boolean {
    const key = LocalStorageProvider.getKey(meta);
    return localStorage.getItem(key) !== null;
  }

  /**
   * Writes the default value to localStorage and returns it.
   */
  private writeDefault__(): Jsonify<T> {
    this.logger_.logMethodArgs?.('writeDefault__', this.config_.defaultValue);
    this.write(this.config_.defaultValue);
    // Simulate real serialization/deserialization cycle for real types
    return JSON.parse(JSON.stringify(this.config_.defaultValue)) as Jsonify<T>;
  }

  /**
   * Reads and parses the value from localStorage.
   * If the item doesn't exist, is invalid JSON, or doesn't match the expected type,
   * it writes and returns the default value.
   */
  public read(): Jsonify<T> {
    const value = localStorage.getItem(this.key__);

    if (value === null) {
      this.logger_.logMethod?.('read//no_value');
      return this.writeDefault__();
    }

    try {
      const parsedValue = JSON.parse(value) as Jsonify<T>;
      this.logger_.logMethodFull?.('read//value', undefined, {parsedValue});
      return parsedValue;
    }
    catch (err) {
      this.logger_.error('read', 'read_parse_error', {err});
      return this.writeDefault__();
    }
  }

  /**
   * Serializes and writes a value to localStorage.
   */
  public write(value: T): void {
    this.logger_.logMethodArgs?.('write', {value});
    try {
      localStorage.setItem(this.key__, JSON.stringify(value));
    }
    catch (err) {
      this.logger_.error('write', 'write_stringify_error', {err});
      throw new Error('write_stringify_error');
    }
  }

  /**
   * Removes the item from localStorage.
   */
  public remove(): void {
    localStorage.removeItem(this.key__);
  }

  /**
   * Manages data migration by removing all previous versions of the item.
   */
  private migrate__(): void {
    if (this.config_.schemaVersion <= 1) return;

    // Iterate from v1 up to the version just before the current one and remove them.
    for (let i = 1; i < this.config_.schemaVersion; i++) {
      const oldKey = LocalStorageProvider.getKey({name: this.config_.name, schemaVersion: i});
      localStorage.removeItem(oldKey);
    }
  }
}
