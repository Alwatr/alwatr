import {createLogger} from '@alwatr/logger';

import type {SessionStorageProviderConfig} from './type.js';

/**
 * A provider class for managing a specific item in sessionStorage.
 * It encapsulates the logic for key generation and serialization.
 *
 * @example
 * ```typescript
 * const formDraft = new SessionStorageProvider<{title: string; body: string}>({
 *   name: 'post-form-draft',
 * });
 *
 * // Write a draft
 * formDraft.write({ title: 'Hello', body: 'World' });
 *
 * // Read the draft
 * const draft = formDraft.read();
 * console.log(draft); // { title: 'Hello', body: 'World' }
 *
 * // Remove the draft
 * formDraft.remove();
 * ```
 */
export class SessionStorageProvider<T> {
  public static readonly version = __package_version__;

  private readonly key__: string;
  protected readonly logger_;
  protected readonly parse_: (value: string) => T;
  protected readonly stringify_: (value: T) => string;

  constructor(config: SessionStorageProviderConfig<T>) {
    this.key__ = config.name;
    this.logger_ = createLogger(`session-storage-provider: ${this.key__}`);
    DEV_MODE && this.logger_.logMethodArgs?.('constructor', config);

    this.parse_ = config.parse ?? (JSON.parse as (value: string) => T);
    this.stringify_ = config.stringify ?? JSON.stringify;
  }

  /**
   * Checks if an item exists in sessionStorage for the given key.
   * This static method allows checking for existence without instantiating the provider.
   *
   * @param key - The storage key.
   * @returns `true` if the item exists in sessionStorage, otherwise `false`.
   *
   * @example
   * ```typescript
   * const exists = SessionStorageProvider.has('user-form');
   * ```
   */
  public static has(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  /**
   * Checks if the current item exists in sessionStorage.
   *
   * @returns `true` if the item exists in sessionStorage, otherwise `false`.
   *
   * @example
   * ```typescript
   * const provider = new SessionStorageProvider({name: 'profile'});
   * if (provider.has()) {
   *   // Item exists
   * }
   * ```
   */
  public has(): boolean {
    return sessionStorage.getItem(this.key__) !== null;
  }

  /**
   * Reads and parses the value from sessionStorage.
   * Returns `null` if the item does not exist or contains invalid JSON.
   *
   * @returns The parsed value of type `T`, or `null`.
   *
   * @example
   * ```typescript
   * const value = provider.read();
   * if (value !== null) {
   *   console.log('Restored value:', value);
   * }
   * ```
   */
  public read(): T | null {
    let raw: string | null = null;

    try {
      raw = sessionStorage.getItem(this.key__);
    } catch (err) {
      this.logger_.error('read', 'read_session_storage_error', {err});
    }

    if (!raw) {
      DEV_MODE && this.logger_.logMethod?.('read//no_value');
      return null;
    }

    try {
      const parsed = this.parse_(raw);
      DEV_MODE && this.logger_.logMethodFull?.('read//value', undefined, {parsed});
      return parsed;
    } catch (err) {
      this.logger_.error('read', 'read_parse_error', {err});
      return null;
    }
  }

  /**
   * Serializes and writes a value to sessionStorage.
   * Throws if the value cannot be serialized.
   *
   * @param value The value to persist.
   *
   * @example
   * ```typescript
   * provider.write({ step: 3, answers: [true, false, true] });
   * ```
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
      sessionStorage.setItem(this.key__, valueStr);
    } catch (err) {
      this.logger_.error('write', 'write_session_storage_error', {err});
    }
  }

  /**
   * Removes the item from sessionStorage.
   *
   * @example
   * ```typescript
   * provider.remove(); // Clears the stored value for this key.
   * ```
   */
  public remove(): void {
    DEV_MODE && this.logger_.logMethod?.('remove');
    sessionStorage.removeItem(this.key__);
  }
}
