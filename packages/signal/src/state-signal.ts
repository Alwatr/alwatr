import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {SignalBase} from './signal-base.js';

import type {StateSignalConfig, ListenerCallback, SubscribeOptions, SubscribeResult, IReadonlySignal} from './type.js';

/**
 * A stateful signal that holds a value and notifies listeners when the value changes.
 *
 * `StateSignal` is the core of the signal library, representing a piece of mutable state.
 * It always has a value, and new subscribers immediately receive the current value by default.
 *
 * @template T The type of the state it holds.
 * @implements {IReadonlySignal<T>}
 *
 * @example
 * // Create a new state signal with an initial value.
 * const counter = new StateSignal<number>({
 *   signalId: 'counter-signal',
 *   initialValue: 0,
 * });
 *
 * // Get the current value.
 * console.log(counter.value); // Outputs: 0
 *
 * // Subscribe to changes.
 * const subscription = counter.subscribe(newValue => {
 *   console.log(`Counter changed to: ${newValue}`);
 * });
 *
 * // Set a new value, which triggers the notification.
 * counter.set(1); // Outputs: "Counter changed to: 1"
 *
 * // Unsubscribe when no longer needed.
 * subscription.unsubscribe();
 */
export class StateSignal<T> extends SignalBase<T> implements IReadonlySignal<T> {
  private value__: T;
  protected logger_ = createLogger(`state-signal: ${this.signalId}`);

  /**
   * Initializes a new `StateSignal`.
   * @param config The configuration for the state signal, including `signalId` and `initialValue`.
   */
  public constructor(config: StateSignalConfig<T>) {
    super(config);
    this.value__ = config.initialValue;
    this.logger_.logMethodArgs?.('constructor', {initialValue: this.value__});
  }

  /**
   * Retrieves the current value of the signal.
   *
   * @returns The current value.
   *
   * @example
   * console.log(mySignal.value);
   */
  public get value(): T {
    this.checkDestroyed_();
    return this.value__;
  }

  /**
   * Updates the signal's value and notifies all active listeners.
   *
   * The notification is scheduled as a microtask, which means the update is deferred
   * slightly to batch multiple synchronous changes.
   *
   * @param newValue The new value to set.
   *
   * @example
   * // For primitive types
   * mySignal.set(42);
   *
   * // For object types, it's best practice to set an immutable new object.
   * mySignal.set({ ...mySignal.value, property: 'new-value' });
   */
  public set(newValue: T): void {
    this.logger_.logMethodArgs?.('set', {newValue});
    this.checkDestroyed_();

    if (Object.is(this.value__, newValue) && typeof newValue !== 'object') return; // Do not notify if the value is the same for primitives.

    this.value__ = newValue;

    // Dispatch as a microtask to ensure consistent, non-blocking behavior.
    delay.nextMicrotask().then(() => {
      this.notify_(newValue);
    });
  }

  /**
   * Subscribes a listener to this signal.
   *
   * By default, the listener is immediately called with the signal's current value (`receivePrevious: true`).
   * This behavior can be customized via the `options` parameter.
   *
   * @param callback The function to be called when the signal's value changes.
   * @param options Subscription options, including `receivePrevious` and `once`.
   * @returns An object with an `unsubscribe` method to remove the listener.
   */
  public override subscribe(callback: ListenerCallback<T>, options: SubscribeOptions = {}): SubscribeResult {
    this.logger_.logMethodArgs?.('subscribe', {options});
    this.checkDestroyed_();

    // By default, new subscribers to a StateSignal should receive the current value.
    const receivePrevious = options.receivePrevious !== false;

    if (receivePrevious) {
      // Immediately (but asynchronously) call the listener with the current value.
      // This is done in a microtask to ensure it happens after the subscription is fully registered.
      delay
        .nextMicrotask()
        .then(() => callback(this.value__))
        .catch((err) => {
          this.logger_.error('subscribe', 'run_callback_immediate_failed', err);
        });

      // If it's a 'once' subscription that receives the previous value, it's now fulfilled.
      // We don't need to add it to the observers list for future updates.
      if (options.once) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return {unsubscribe: () => {}};
      }
    }

    return super.subscribe(callback, options);
  }

  /**
   * Destroys the signal, clearing its value and all listeners.
   * This is crucial for memory management to prevent leaks.
   */
  public override destroy(): void {
    super.destroy();
    // Clear the value to allow for garbage collection.
    this.value__ = null as T;
  }
}
