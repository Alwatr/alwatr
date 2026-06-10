import {queueMicrotask} from '@alwatr/delay';
import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import {SignalBase} from './signal-base.js';
import type {StateSignalConfig, ListenerCallback, SubscribeOptions, SubscribeResult, IReadonlySignal} from '../type.js';

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
 *   name: 'counter-signal',
 *   initialValue: 0,
 * });
 *
 * // Get the current value.
 * console.log(counter.get()); // Outputs: 0
 *
 * // Subscribe to changes.
 * const subscription = counter.subscribe(newValue => {
 *   console.log(`Counter changed to: ${newValue}`);
 * });
 *
 * // Set a new value, which triggers the notification.
 * counter.set(1); // Outputs: "Counter changed to: 1"
 *
 * // Update value based on the previous value.
 * counter.update(current => current + 1); // Outputs: "Counter changed to: 2"
 *
 * // Unsubscribe when no longer needed.
 * subscription.unsubscribe();
 */
export class StateSignal<T> extends SignalBase<T> implements IReadonlySignal<T> {
  /**
   * The current value of the signal.
   *
   * @private
   */
  private value__: T;

  /**
   * The logger instance for this signal.
   *
   * @protected
   */
  protected logger_: AlwatrLogger;

  /**
   * Indicates if a notification is already scheduled.
   * Helps batch multiple synchronous `set` operations into a single microtask notification.
   *
   * @private
   */
  private notifyPending__ = false;

  /**
   * The version of the last notification. Incrementing on every state update.
   * Used to guard immediate subscriber execution when updates happen within the same tick.
   *
   * @private
   */
  private notifyVersion__ = 0;

  /**
   * Creates a new StateSignal instance.
   *
   * @param config Configuration options including name, initialValue, and custom cleanup hooks.
   */
  constructor(config: StateSignalConfig<T>) {
    super({
      name: config.name,
      onDestroy: config.onDestroy,
    });
    this.logger_ = createLogger(`state_signal:${this.name}`);
    this.value__ = config.initialValue;
    DEV_MODE && this.logger_.logMethodArgs?.('constructor', {initialValue: this.value__});
  }

  /**
   * Retrieves the current value of the signal.
   *
   * @returns The current value.
   * @throws {Error} If the signal has been destroyed.
   *
   * @example
   * console.log(mySignal.get());
   */
  public get(): T {
    this.checkDestroyed_();
    return this.value__;
  }

  /**
   * Updates the signal's value and schedules notifications for all active listeners.
   *
   * Primitives are comparison-checked via `Object.is`. If unchanged, the update is ignored.
   * The notification is scheduled as a microtask, allowing multiple synchronous updates
   * to be batched and executed once.
   *
   * @param newValue The new value to set.
   *
   * @example
   * // For primitive types
   * mySignal.set(42);
   *
   * // For object types, it's best practice to set an immutable new object.
   * mySignal.set({ ...mySignal.get(), property: 'new-value' });
   */
  public set(newValue: T): void {
    DEV_MODE && this.logger_.logMethodArgs?.('set', {newValue});

    // For primitives (including null), do not notify if the value is the same.
    if (Object.is(this.value__, newValue) && (typeof newValue !== 'object' || newValue === null)) {
      return;
    }

    this.value__ = newValue;

    this.notifyChange();
  }

  /**
   * Forcefully schedules a notification of the current value to all subscribers.
   *
   * Useful when mutating properties within object states directly without assigning a new reference.
   * Notification is queued as a microtask for batching.
   */
  public notifyChange(): void {
    DEV_MODE && this.logger_.logMethod?.('notifyChange');
    this.checkDestroyed_();

    this.notifyVersion__++;
    if (this.notifyPending__) return;
    this.notifyPending__ = true;

    // Dispatch as a microtask to ensure consistent, non-blocking behavior.
    queueMicrotask(() => {
      this.notifyPending__ = false;
      this.notify_(this.value__);
    });
  }

  /**
   * Updates the signal's value based on its previous value.
   *
   * A functional update pattern that retrieves the current value, computes the next, and sets it.
   *
   * @param updater A callback function that receives the current value and returns the new value.
   *
   * @example
   * // For a counter
   * counterSignal.update(current => current + 1);
   *
   * // For an object state
   * userSignal.update(currentUser => ({ ...currentUser, loggedIn: true }));
   */
  public update(updater: (previousValue: T) => T): void {
    this.checkDestroyed_();
    const newValue = updater(this.value__);
    DEV_MODE && this.logger_.logMethodFull?.('update', this.value__, newValue);
    this.set(newValue);
  }

  /**
   * Subscribes a listener function to this state signal.
   *
   * By default, the listener is immediately called with the signal's current value (`receivePrevious: true`).
   * This immediate call is queued as a microtask to match the asynchronous flow of signals.
   *
   * @param callback The function to invoke when the state changes.
   * @param options Custom options, such as `receivePrevious: false` to only listen to future updates.
   * @returns An object with an `unsubscribe` method to remove the listener.
   */
  public override subscribe(callback: ListenerCallback<T>, options: SubscribeOptions = {}): SubscribeResult {
    DEV_MODE && this.logger_.logMethodArgs?.('subscribe', options);
    this.checkDestroyed_();

    const result = super.subscribe(callback, options);

    if (options.receivePrevious === false) return result; // If the subscriber opts out of receiving the current value, skip the immediate callback.
    if (this.notifyPending__) return result; // If a notification is already pending, the callback will be called with the latest value when the notification is processed.

    const subscribeVersion = this.notifyVersion__;

    queueMicrotask((): void => {
      DEV_MODE && this.logger_.logStep?.('subscribe', 'immediate_callback');
      if (this.notifyVersion__ !== subscribeVersion) return; // A notification occurred after subscribing, so skip the immediate callback.
      if (options.once) {
        result.unsubscribe();
      }
      try {
        callback(this.value__);
      } catch (err) {
        this.logger_.error('subscribe', 'immediate_callback_failed', err);
      }
    });

    return result;
  }

  /**
   * Destroys the signal, clearing its value and all listeners.
   * Breaks references for garbage collection.
   */
  public override destroy(): void {
    this.value__ = null as T; // Clear the value to allow for garbage collection.
    super.destroy();
  }

  /**
   * Returns this signal cast to the `IReadonlySignal<T>` interface.
   * Limits access so external callers can only subscribe/read but not set/update state.
   *
   * @returns A readonly representation of this signal.
   */
  public asReadonly(): IReadonlySignal<T> {
    return this;
  }
}
