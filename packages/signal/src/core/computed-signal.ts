import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {StateSignal} from './state-signal.js';

import type {ComputedSignalConfig, IReadonlySignal, SubscribeResult, SubscribeOptions} from '../type.js';

/**
 * A read-only signal that derives its value from a set of dependency signals.
 *
 * `ComputedSignal` is a powerful tool for creating values that reactively update when their underlying
 * data sources change. Its value is memoized, meaning the `get` function is only re-evaluated when
 * one of its dependencies has actually changed.
 *
 * A key feature is its lifecycle management: a `ComputedSignal` **must** be destroyed when no longer
 * needed to prevent memory leaks from its subscriptions to dependency signals.
 *
 * @template T The type of the computed value.
 *
 * @example
 * // --- Create dependency signals ---
 * const firstName = new StateSignal({ signalId: 'firstName', initialValue: 'John' });
 * const lastName = new StateSignal({ signalId: 'lastName', initialValue: 'Doe' });
 *
 * // --- Create a computed signal ---
 * const fullName = new ComputedSignal({
 *   signalId: 'fullName',
 *   deps: [firstName, lastName],
 *   get: () => `${firstName.value} ${lastName.value}`,
 * });
 *
 * console.log(fullName.value); // Outputs: "John Doe"
 *
 * // --- Subscribe to the computed value ---
 * fullName.subscribe(newFullName => {
 *   console.log(`Name changed to: ${newFullName}`);
 * });
 *
 * // --- Update a dependency ---
 * lastName.set('Smith'); // Recalculates and logs: "Name changed to: John Smith"
 * console.log(fullName.value); // Outputs: "John Smith"
 *
 * // --- IMPORTANT: Clean up when done ---
 * fullName.destroy();
 */
export class ComputedSignal<T> implements IReadonlySignal<T> {
  /**
   * The unique identifier for this signal instance.
   */
  public readonly signalId = this.config_.signalId;

  /**
   * The logger instance for this signal.
   * @protected
   */
  protected readonly logger_ = createLogger(`computed-signal: ${this.signalId}`);

  /**
   * The internal `StateSignal` that holds the computed value.
   * This is how the computed signal provides `.value` and `.subscribe()` methods.
   * @protected
   */
  protected readonly internalSignal_ = new StateSignal<T>({
    signalId: `${this.signalId}-internal`,
    initialValue: this.config_.get(),
  });

  /**
   * A list of subscriptions to dependency signals.
   * @private
   */

  private readonly dependencySubscriptions__: SubscribeResult[] = [];

  /**
   * A flag to prevent concurrent recalculations.
   * @private
   */
  private isRecalculating__ = false;

  public constructor(protected config_: ComputedSignalConfig<T>) {
    this.logger_.logMethod?.('constructor');
    this.recalculate_ = this.recalculate_.bind(this);

    // Subscribe to all dependencies to trigger recalculation on change.
    for (const signal of config_.deps) {
      this.dependencySubscriptions__.push(signal.subscribe(this.recalculate_, {receivePrevious: false}));
    }
  }

  /**
   * The current value of the computed signal.
   * Accessing this property returns the memoized value and does not trigger a recalculation.
   *
   * @returns The current computed value.
   * @throws {Error} If accessed after the signal has been destroyed.
   */
  public get value(): T {
    return this.internalSignal_.value;
  }

  /**
   * Indicates whether the computed signal has been destroyed.
   * A destroyed signal cannot be used and will throw an error if interacted with.
   * @returns `true` if the signal is destroyed, `false` otherwise.
   */
  public get isDestroyed(): boolean {
    return this.internalSignal_.isDestroyed;
  }

  /**
   * Subscribes a listener to this signal.
   * The listener will be called whenever the computed value changes.
   *
   * @param callback The function to be called with the new value.
   * @param options Subscription options.
   * @returns A `SubscribeResult` object with an `unsubscribe` method.
   */
  public subscribe(callback: (value: T) => void, options?: SubscribeOptions): SubscribeResult {
    return this.internalSignal_.subscribe(callback, options);
  }

  /**
   * Returns a Promise that resolves with the next computed value.
   *
   * @returns A Promise that resolves with the next value.
   */
  public untilNext(): Promise<T> {
    return this.internalSignal_.untilNext();
  }

  /**
   * Permanently disposes of the computed signal.
   *
   * This is a critical cleanup step. It unsubscribes from all dependency signals,
   * stopping future recalculations and allowing the signal to be garbage collected.
   * Failure to call `destroy()` will result in memory leaks.
   *
   * After `destroy()` is called, any attempt to access `.value` or `.subscribe()` will throw an error.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');
    /**
     * If already destroyed, log an incident and return early.
     */
    if (this.isDestroyed) {
      this.logger_.incident?.('destroy', 'already_destroyed');
      return;
    }

    // Unsubscribe from all upstream dependencies.
    for (const subscription of this.dependencySubscriptions__) {
      subscription.unsubscribe();
    }
    this.dependencySubscriptions__.length = 0; // Clear the array of subscriptions.

    this.internalSignal_.destroy(); // Destroy the internal signal.
    this.config_.onDestroy?.(); // Call the optional onDestroy callback.
    this.config_ = null as unknown as ComputedSignalConfig<T>; // Release config closure.
  }

  /**
   * Schedules a recalculation of the signal's value.
   *
   * This method batches updates using a macrotask (`delay.nextMacrotask`) to ensure the
   * `get` function runs only once per event loop tick, even if multiple dependencies
   * change in the same synchronous block of code.
   * @protected
   */
  protected async recalculate_(): Promise<void> {
    this.logger_.logMethod?.('recalculate_');

    if (this.internalSignal_.isDestroyed) {
      // This check is important in case a dependency fires after this signal is destroyed.
      this.logger_.incident?.('recalculate_', 'recalculate_on_destroyed_signal');
      return;
    }

    if (this.isRecalculating__) {
      // If a recalculation is already scheduled, do nothing.
      this.logger_.logStep?.('recalculate_', 'skipping_recalculation_already_scheduled');
      return;
    }

    this.isRecalculating__ = true;

    try {
      // Wait for the next macrotask to start the recalculation.
      // This batches all synchronous dependency updates in the current event loop.
      await delay.nextMacrotask();
      
      if (this.isDestroyed) {
        this.logger_.incident?.('recalculate_', 'destroyed_during_delay');
        this.isRecalculating__ = false;
        return;
      }

      this.logger_.logStep?.('recalculate_', 'recalculating_value');

      // Set the new value on the internal signal, which will notify our subscribers.
      this.internalSignal_.set(this.config_.get());
    }
    catch (err) {
      this.logger_.error('recalculate_', 'recalculation_failed', err);
    }

    // Allow the next recalculation to be scheduled.
    this.isRecalculating__ = false;
  }
}
