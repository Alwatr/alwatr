import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';

import type {LocalStorageProviderConfig} from './type.js';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

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
  private readonly _key: string;
  protected readonly logger_ = createLogger(`local-storage-provider: ${this.config_.name}, v: ${this.config_.version}`);

  public constructor(protected readonly config_: LocalStorageProviderConfig<T>) {
    this.logger_.logMethodArgs?.('constructor', {config: this.config_});
    this._key = this.generateKey_();
    this.migrate_();
  }

  /**
   * Generates the versioned storage key.
   * @param meta - An object containing the name and version.
   * @returns The versioned key string.
   */
  public static getKey(meta: StorageMeta): string {
    return `${meta.name}.v${meta.version}`;
  }

  /**
   * Statically checks if a versioned item exists in localStorage.
   * This is the solution to your problem. It can be called without creating an instance.
   *
   * @param meta - An object containing the name and version of the item to check.
   * @returns `true` if the item exists, otherwise `false`.
   *
   * @example
   * ```typescript
   * const formExists = LocalStorageProvider.has({ name: 'user-form', version: 1 });
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
  private writeDefaultــ(): T {
    this.logger_.logMethodArgs?.('writeDefaultــ', this.config_.defaultValue);
    this.write(this.config_.defaultValue);
    return this.config_.defaultValue;
  }

  /**
   * Reads and parses the value from localStorage.
   * If the item doesn't exist, is invalid JSON, or doesn't match the expected type,
   * it writes and returns the default value.
   */
  public read(): T {
    this.logger_.logMethod?.('read');
    const value = localStorage.getItem(this._key);
    if (value === null) {
      return this.writeDefaultــ();
    }

    try {
      const parsedValue = JSON.parse(value) as T;
      // A simple runtime check to ensure we have an object if we expect one.
      if (typeof parsedValue !== typeof this.config_.defaultValue) {
        this.logger_.accident('read', 'type_mismatch', {expected: typeof this.config_.defaultValue, received: typeof parsedValue});
        return this.writeDefaultــ();
      }
      return parsedValue;
    }
    catch (err) {
      this.logger_.error('read', 'json_parse_error', {err});
      return this.writeDefaultــ();
    }
  }

  /**
   * Serializes and writes a value to localStorage.
   */
  public write(value: T): void {
    try {
      localStorage.setItem(this._key, JSON.stringify(value));
    }
    catch (err) {
      console.error('LocalStorageProvider.write: Failed to write to localStorage.', {key: this._key, err});
    }
  }

  /**
   * Removes the item from localStorage.
   */
  public remove(): void {
    localStorage.removeItem(this._key);
  }

  /**
   * Manages data migration by removing all previous versions of the item.
   */
  private migrate_(): void {
    if (this.config_.version <= 1) return;

    // Iterate from v1 up to the version just before the current one and remove them.
    for (let i = 1; i < this.config_.version; i++) {
      const oldKey = this.generateKey_(i);
      localStorage.removeItem(oldKey);
    }
  }
}
