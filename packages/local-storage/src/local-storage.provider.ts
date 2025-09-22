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

  private meta__: StorageMeta;

  protected readonly defaultValue__: Jsonify<T>;

  constructor(config: LocalStorageProviderConfig<T>) {
    this.logger_.logMethodArgs?.('constructor', {config});
    this.meta__ = {
      name: config.name,
      schemaVersion: config.schemaVersion,
    };
    this.key__ = LocalStorageProvider.getKey(this.meta__);
    this.defaultValue__ = this.convertDataType__(config.defaultValue);
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
  private handleDefault__(): Jsonify<T> {
    this.logger_.logMethodArgs?.('handleDefault__', this.defaultValue__);
    try {
      this.write(this.defaultValue__);
    }
    catch (err) {
      this.logger_.error('write', 'write_default_error', {err});
    }
    return this.defaultValue__;
  }

  /**
   * Converts the provided data to a JSON-compatible format by simulating
   * a serialization/deserialization cycle. This ensures that the data
   * conforms to the `Jsonify<T>` type.
   *
   * @template T - The type of the input data.
   * @param data - The data to be converted to a JSON-compatible format.
   * @returns The converted data as `Jsonify<T>`.
   * @throws {Error} If the serialization/deserialization process fails.
   */
  private convertDataType__(data: T): Jsonify<T> {
    this.logger_.logMethod?.('convertDataType__');
    // Simulate real serialization/deserialization cycle for real types
    try {
      return JSON.parse(JSON.stringify(data)) as Jsonify<T>;
    }
    catch (err) {
      this.logger_.error('write', 'convert_data_type_error', {err});
      throw new Error('convert_data_type_error');
    }
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
      return this.handleDefault__();
    }

    try {
      const parsedValue = JSON.parse(value) as Jsonify<T>;
      this.logger_.logMethodFull?.('read//value', undefined, {parsedValue});
      return parsedValue;
    }
    catch (err) {
      this.logger_.error('read', 'read_parse_error', {err});
      return this.handleDefault__();
    }
  }

  /**
   * Serializes and writes a value to localStorage.
   */
  public write(value: T | Jsonify<T>): void {
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
    if (this.meta__.schemaVersion <= 1) return;

    // Iterate from v1 up to the version just before the current one and remove them.
    for (let i = 1; i < this.meta__.schemaVersion; i++) {
      const oldKey = LocalStorageProvider.getKey({name: this.meta__.name, schemaVersion: i});
      localStorage.removeItem(oldKey);
    }
  }
}
