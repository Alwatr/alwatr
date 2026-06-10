import {createDebouncer} from '@alwatr/debounce';
import {createLocalStorageProvider} from '@alwatr/local-storage';
import {StateSignal} from './state-signal.js';
import type {PersistentStateSignalConfig} from '../type.js';
import type {LocalStorageProvider} from '@alwatr/local-storage';

/**
 * A stateful signal that persists its value in the browser's localStorage.
 *
 * It extends the functionality of a standard `StateSignal` by automatically reading
 * its initial value from localStorage and writing back any subsequent changes.
 * The data persists across browser sessions and full page reloads until explicitly removed.
 *
 * @template T The type of the state it holds. If custom `parse` and `stringify` functions are
 * provided in the config, T can be any type. If they are not provided, T must be JSON-serializable
 * (using the default `JSON.parse` and `JSON.stringify`).
 *
 * @example
 * ```typescript
 * import {PersistentStateSignal} from '@alwatr/signal';
 *
 * // Example 1: Basic usage with JSON-serializable state
 * interface UserPreferences {
 *   theme: 'light' | 'dark';
 *   language: string;
 * }
 *
 * const preferencesSignal = new PersistentStateSignal<UserPreferences>({
 *   name: 'user-preferences',
 *   initialValue: { theme: 'light', language: 'en' },
 * });
 *
 * // Example 2: Custom state type with parse and stringify
 * const lastVisitSignal = new PersistentStateSignal<Date>({
 *   name: 'last-visit',
 *   initialValue: new Date(),
 *   parse: (str: string) => new Date(str),
 *   stringify: (date: Date) => date.toISOString(),
 * });
 *
 * // The state is restored from localStorage on every page load.
 * console.log(preferencesSignal.get());
 *
 * // Updates are automatically saved to localStorage (debounced).
 * preferencesSignal.set({ theme: 'dark', language: 'fa' });
 * ```
 */
export class PersistentStateSignal<T> extends StateSignal<T> {
  /**
   * The underlying storage provider instance.
   * Handles read, write, and schema version management under the hood.
   *
   * @private
   */
  private readonly storageProvider__: LocalStorageProvider<T>;

  /**
   * Debouncer to limit how often we write to localStorage.
   * Reduces performance overhead from excessive disk writes.
   *
   * @private
   */
  private readonly storageDebouncer__;

  /**
   * The subscription to the signal's own changes to sync with storage.
   * We subscribe to our own signal. When the value is set from anywhere,
   * this listener will trigger and write it to localStorage.
   *
   * @private
   */
  private readonly storageSyncSubscription__;

  /**
   * Listener for the browser's pagehide events to flush pending saves.
   * Ensures that pending changes are saved before the page unloading.
   *
   * @private
   */
  private readonly windowPageHideListener_ = (): void => {
    this.storageDebouncer__.flush();
  };

  /**
   * Listener for the browser's pageshow events to sync from storage when restored from BFCache.
   * Refreshes the in-memory value if retrieved from the Back/Forward Cache.
   *
   * @private
   */
  private readonly windowPageShowListener_ = (event: PageTransitionEvent): void => {
    if (event.persisted) {
      DEV_MODE && this.logger_.logMethod?.('windowPageShowListener_//restored_from_bfcache');
      const value = this.storageProvider__.read();
      if (value !== null) {
        this.set(value);
      }
    }
  };

  /**
   * Creates a new PersistentStateSignal instance.
   * Restores initial value from storage if it exists, otherwise uses default initialValue.
   * Sets up window page visibility and BFCache listeners to guarantee write flushes.
   *
   * @param config Configuration options including storage keys, debounce delays, schema, parse, and stringify overrides.
   */
  constructor(config: PersistentStateSignalConfig<T>) {
    const {
      name,
      storageKey = name,
      saveDebounceDelay = 1000,
      initialValue,
      onDestroy,
      schemaVersion,
      parse,
      stringify,
    } = config;

    const storageProvider = createLocalStorageProvider<T>({
      name: storageKey,
      schemaVersion,
      parse,
      stringify,
    });

    super({
      name,
      initialValue: storageProvider.read() ?? initialValue,
      onDestroy,
    });

    DEV_MODE && this.logger_.logMethodArgs?.('constructor', config);

    this.storageProvider__ = storageProvider;

    this.storageDebouncer__ = createDebouncer({
      delay: saveDebounceDelay,
      leading: false,
      trailing: true,
      thisContext: this,
      func: this.syncStorage__,
    });

    this.storageSyncSubscription__ = this.subscribe(this.storageDebouncer__.trigger, {receivePrevious: false});

    if (typeof globalThis.addEventListener === 'function') {
      globalThis.addEventListener('pagehide', this.windowPageHideListener_, {passive: true});
      globalThis.addEventListener('pageshow', this.windowPageShowListener_, {passive: true});
    }
  }

  /**
   * Syncs the new value to storage.
   * Invoked automatically by the debouncer.
   *
   * @param newValue The new value to write to storage.
   * @private
   */
  private syncStorage__(newValue: T): void {
    DEV_MODE && this.logger_.logMethodArgs?.('syncStorage__', newValue);
    this.storageProvider__.write(newValue);
  }

  /**
   * Removes the value from localStorage.
   * This provides a clean way to clear persisted data.
   */
  public remove(): void {
    this.checkDestroyed_();
    DEV_MODE && this.logger_.logMethod?.('remove');
    // Remove from storage.
    this.storageProvider__.remove();
  }

  /**
   * Overrides the destroy method to also clean up the storage sync subscription and event listeners.
   */
  public override destroy(): void {
    DEV_MODE && this.logger_.logMethod?.('destroy');
    if (typeof globalThis.removeEventListener === 'function') {
      globalThis.removeEventListener('pagehide', this.windowPageHideListener_);
      globalThis.removeEventListener('pageshow', this.windowPageShowListener_);
    }
    // Flush any pending storage writes before destroying.
    this.storageDebouncer__.flush();
    // Unsubscribe from the sync listener to prevent memory leaks.
    this.storageSyncSubscription__.unsubscribe();
    super.destroy();
  }
}
