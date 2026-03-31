import { createDebouncer } from '@alwatr/debounce';
import { createSessionStorageProvider } from '@alwatr/session-storage';

import { StateSignal } from './state-signal.js';

import type { SessionStateSignalConfig } from '../type.js';
import type { SessionStorageProvider } from '@alwatr/session-storage';

/**
 * A stateful signal that persists its value in the browser's `sessionStorage`.
 *
 * It extends `StateSignal` by automatically reading its initial value from `sessionStorage`
 * and writing back any subsequent changes. Unlike `PersistentStateSignal`, the data is cleared
 * automatically when the browser tab or window is closed — it does not survive full page reloads
 * in a new session.
 *
 * This is ideal for transient UI state that should survive soft navigations and refreshes
 * within the same browser tab (e.g., wizard steps, unsaved form drafts, scroll position).
 *
 * @template T The type of the state it holds. Must be JSON-serializable.
 *
 * @example
 * ```typescript
 * import {SessionStateSignal} from '@alwatr/signal';
 *
 * interface WizardState {
 *   step: number;
 *   answers: Record<string, string>;
 * }
 *
 * const wizardSignal = new SessionStateSignal<WizardState>({
 *   name: 'checkout-wizard',
 *   initialValue: { step: 1, answers: {} },
 * });
 *
 * // On first load: reads from sessionStorage (or uses initialValue if not found).
 * console.log(wizardSignal.get()); // { step: 1, answers: {} }
 *
 * // Update state — written to sessionStorage automatically (debounced).
 * wizardSignal.set({ step: 2, answers: { q1: 'yes' } });
 *
 * // After a soft page reload, the state is restored from sessionStorage.
 *
 * // Clear the persisted session data without destroying the signal.
 * wizardSignal.remove();
 *
 * // Clean up when the component/page is unmounted.
 * wizardSignal.destroy();
 * ```
 */
export class SessionStateSignal<T extends JsonValue> extends StateSignal<T> {
  /**
   * The underlying session storage provider instance.
   * @private
   */
  private readonly storageProvider__: SessionStorageProvider<T>;

  /**
   * Debouncer to limit how often we write to sessionStorage.
   * @private
   */
  private readonly storageDebouncer__;

  /**
   * Subscription to the signal's own changes for sessionStorage sync.
   * @private
   */
  private readonly storageSyncSubscription__;

  constructor(config: SessionStateSignalConfig<T>) {
    const { name, storageKey = name, saveDebounceDelay = 500, initialValue, onDestroy } = config;

    const storageProvider = createSessionStorageProvider<T>({ name: storageKey });

    super({
      name,
      initialValue: storageProvider.read() ?? initialValue,
      onDestroy,
    });

    this.logger_.logMethodArgs?.('constructor', config);

    this.storageProvider__ = storageProvider;

    this.storageDebouncer__ = createDebouncer({
      delay: saveDebounceDelay,
      leading: false,
      trailing: true,
      thisContext: this,
      func: this.syncStorage__,
    });

    this.storageSyncSubscription__ = this.subscribe(this.storageDebouncer__.trigger, { receivePrevious: false });
  }

  /**
   * Syncs the new value to sessionStorage.
   * Called automatically by the debouncer after each state change.
   *
   * @param newValue The new value to sync.
   */
  private syncStorage__(newValue: T): void {
    this.logger_.logMethodArgs?.('syncStorage__', newValue);
    this.storageProvider__.write(newValue);
  }

  /**
   * Removes the stored value from sessionStorage without destroying the signal.
   *
   * After calling this, the signal continues to hold its current in-memory value;
   * only the sessionStorage entry is cleared.
   *
   * @example
   * ```typescript
   * // User logs out — clear transient session data.
   * wizardSignal.remove();
   * ```
   */
  public remove(): void {
    this.checkDestroyed_();
    this.logger_.logMethod?.('remove');
    this.storageProvider__.remove();
  }

  /**
   * Destroys the signal, flushing pending writes and cleaning up all resources.
   *
   * Always call this when the signal is no longer needed (e.g., on component unmount)
   * to prevent memory leaks.
   *
   * @example
   * ```typescript
   * // In a component teardown:
   * wizardSignal.destroy();
   * ```
   */
  public override destroy(): void {
    this.logger_.logMethod?.('destroy');
    // Flush any pending debounced writes before destroying.
    this.storageDebouncer__.flush();
    // Unsubscribe the storage sync listener to prevent memory leaks.
    this.storageSyncSubscription__.unsubscribe();
    super.destroy();
  }
}