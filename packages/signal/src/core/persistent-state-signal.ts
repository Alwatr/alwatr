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
 *
 * @template T The type of the state it holds.
 */
export class PersistentStateSignal<T extends JsonValue> extends StateSignal<T> {
  /**
   * The underlying storage provider instance.
   * @private
   */
  private readonly storageProvider__: LocalStorageProvider<T>;

  /**
   * Debouncer to limit how often we write to localStorage.
   * @private
   */
  private readonly storageDebouncer__;

  /**
   * The subscription to the signal's own changes to sync with storage.
   * We subscribe to our own signal. When the value is set from anywhere,
   * this listener will trigger and write it to localStorage.
   * @private
   */
  private readonly storageSyncSubscription__;

  constructor(config: PersistentStateSignalConfig<T>) {
    // 1. Create the LocalStorageProvider instance.
    const storageProvider = createLocalStorageProvider<T>({
      name: config.name,
      schemaVersion: config.schemaVersion,
      defaultValue: config.defaultValue,
    });

    // 2. Read the initial value from storage.
    // The .read() method guarantees a valid value is returned (either from storage or the default).
    const initialValue = storageProvider.read();

    // 3. Call the parent constructor with the correct initial value.
    super({
      name: config.name,
      initialValue,
      onDestroy: config.onDestroy,
    });

    this.logger_.logMethodArgs?.('constructor', {
      name: config.name,
      schemaVersion: config.schemaVersion,
      initialValue,
    });

    this.storageProvider__ = storageProvider;

    this.storageDebouncer__ = createDebouncer({
      delay: config.saveDebounceDelay ?? 500,
      leading: false,
      trailing: true,
      thisContext: this,
      func: this.syncStorage__,
    });

    this.storageSyncSubscription__ = this.subscribe(this.storageDebouncer__.trigger, {receivePrevious: false});
  }

  /**
   * Syncs the new value to storage.
   * @param newValue The new value to sync to storage.
   */
  private syncStorage__(newValue: T): void {
    this.logger_.logMethodArgs?.('syncStorage__', newValue);
    this.storageProvider__.write(newValue);
  }

  /**
   * Removes the value from localStorage.
   * This provides a clean way to clear persisted data.
   */
  public remove(): void {
    this.checkDestroyed_();
    this.logger_.logMethod?.('remove');
    // Remove from storage.
    this.storageProvider__.remove();
  }

  /**
   * Overrides the destroy method to also clean up the storage sync subscription.
   */
  public override destroy(): void {
    this.logger_.logMethod?.('destroy');
    // Flush any pending storage writes before destroying.
    this.storageDebouncer__.flush();
    // Unsubscribe from the sync listener to prevent memory leaks.
    this.storageSyncSubscription__.unsubscribe();
    super.destroy();
  }
}
