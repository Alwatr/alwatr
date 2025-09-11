import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {StateSignal} from './state-signal.js';

import type {ComputedSignalConfig, IComputedSignal, SubscribeResult} from './type.js';

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
 * @implements {IComputedSignal<T>}
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
export class ComputedSignal<T> implements IComputedSignal<T> {
  public readonly signalId = this.config_.signalId;

  protected readonly logger_ = createLogger(`computed-signal: ${this.signalId}`);

  /**
   * The internal `StateSignal` that holds the computed value.
   * This is how the computed signal provides `.value` and `.subscribe()` methods.
   * @protected
   */
  protected readonly internalSignal_: StateSignal<T>;

  private readonly subscriptionList__: SubscribeResult[] = [];
  private isRecalculating__ = false;

  /**
   * Initializes a new `ComputedSignal`.
   * @param config The configuration, including dependencies (`deps`) and the getter function (`get`).
   */
  public constructor(protected config_: ComputedSignalConfig<T>) {
    this.logger_.logMethod?.('constructor');
    this.recalculate_ = this.recalculate_.bind(this);

    // Initialize the internal state with the first computed value.
    this.internalSignal_ = new StateSignal<T>({
      signalId: this.signalId + '-internal',
      initialValue: this.config_.get(),
    });

    // Subscribe to all dependencies to trigger recalculation on change.
    for (const signal of config_.deps) {
      this.subscriptionList__.push(signal.subscribe(this.recalculate_, {receivePrevious: false}));
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
   * Subscribes a callback function to be executed whenever the computed value changes.
   */
  public readonly subscribe = this.internalSignal_.subscribe.bind(this.internalSignal_);

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

    if (this.internalSignal_.isDestroyed) {
      this.logger_.incident?.('destroy', 'already_destroyed');
      return;
    }

    // Unsubscribe from all upstream dependencies.
    for (const subscription of this.subscriptionList__) {
      subscription.unsubscribe();
    }
    this.subscriptionList__.length = 0; // Clear the array of subscriptions.

    // Destroy the internal signal to clean up its resources and mark it as destroyed.
    this.internalSignal_.destroy();
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
    if (this.internalSignal_.isDestroyed) {
      // This check is important in case a dependency fires after this signal is destroyed.
      this.logger_.incident?.('recalculate', 'recalculate_on_destroyed_signal');
      return;
    }

    if (this.isRecalculating__) {
      // If a recalculation is already scheduled, do nothing.
      this.logger_.logMethod?.('recalculate_//skipped');
      return;
    }

    this.logger_.logMethod?.('recalculate_//scheduled');
    this.isRecalculating__ = true;

    try {
      // Wait for the next macrotask to start the recalculation.
      // This batches all synchronous dependency updates in the current event loop.
      await delay.nextMacrotask();

      if (this.internalSignal_.isDestroyed) {
        this.logger_.incident?.('recalculate', 'destroyed_during_delay');
        return;
      }

      this.logger_.logMethod?.('recalculate_//executing');
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
