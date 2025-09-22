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
export class PersistentStateSignal<T extends JsonValue> extends StateSignal<Jsonify<T>> {
  /**
   * The underlying storage provider instance.
   * @private
   */
  private readonly storageProvider__: LocalStorageProvider<T>;

  /**
   * The subscription to the signal's own changes to sync with storage.
   * We subscribe to our own signal. When the value is set from anywhere,
   * this listener will trigger and write it to localStorage.
   * @private
   */
  private readonly storageSyncSubscription__ = this.subscribe(
    (newValue) => {
      this.logger_.logMethodArgs?.('storage_sync', newValue);
      this.storageProvider__.write(newValue);
    },
    {receivePrevious: false}, // Only listen for *new* changes.
  );

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

    this.storageProvider__ = storageProvider;
    this.logger_.logMethodArgs?.('constructor', {
      name: config.name,
      schemaVersion: config.schemaVersion,
      initialValue,
    });
  }

  /**
   * Updates the signal's value.
   *
   * This method accepts the rich type `T` for developer convenience,
   * immediately serializes it to `Jsonify<T>`, and then updates the
   * signal's internal state.
   *
   * @param newValue The new rich value to set.
   */
  public override set(newValue: T | Jsonify<T>): void {
    const serializedValue = this.storageProvider__.convertDataType(newValue);
    super.set(serializedValue);
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
    // Unsubscribe from the sync listener to prevent memory leaks.
    this.storageSyncSubscription__.unsubscribe();
    super.destroy();
  }
}
