import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {StateSignal} from './state-signal.js';

import type {ComputedSignalConfig, IComputedSignal, SubscribeResult} from './type.js';

/**
 * A read-only signal that derives its value from a set of dependency signals.
 *
 * The `ComputedSignal` is a powerful tool for creating values that reactively update
 * when their underlying data sources change. It is both memory-efficient and performant,
 * as its methods are shared via prototype and recalculations are batched into macrotasks.
 *
 * A key feature is its lifecycle management: a `ComputedSignal` must be destroyed when no longer
 * needed to prevent memory leaks from its subscriptions to dependency signals.
 *
 * @template T The type of the computed value.
 * @implements {IComputedSignal<T>}
 *
 * @example
 * // --- Basic Usage ---
 * const counter = new StateSignal({ initialValue: 0, signalId: 'counter' });
 * const isEven = new ComputedSignal({
 *   signalId: 'isEven',
 *   deps: [counter],
 *   get: () => counter.value % 2 === 0,
 * });
 *
 * console.log(isEven.value); // true
 *
 * isEven.subscribe(newValue => {
 *   console.log(`Is the counter even? ${newValue}`);
 * });
 *
 * counter.set(1); // Logs: "Is the counter even? false"
 * console.log(isEven.value); // false
 *
 * // --- Lifecycle Management ---
 * // When the component/logic using 'isEven' is about to be removed:
 * isEven.destroy();
 *
 * // Any further interaction will throw an error.
 * // counter.set(2); // isEven no longer recalculates.
 * // console.log(isEven.value); // Throws an Error.
 */
export class ComputedSignal<T> implements IComputedSignal<T> {
  public readonly signalId = this.config_.signalId;

  protected readonly logger_ = createLogger(`computed-signal: ${this.signalId}`);
  protected readonly internalSignal_ = new StateSignal<T>({
    signalId: this.signalId + '-internal',
    initialValue: this.config_.get(),
  });

  private readonly subscriptionList__: SubscribeResult[] = [];
  private isRecalculating__ = false;

  public constructor(protected config_: ComputedSignalConfig<T>) {
    this.logger_.logMethod?.('constructor');
    this.recalculate_ = this.recalculate_.bind(this);

    // Subscribe to all dependencies.
    for (const signal of config_.deps) {
      this.subscriptionList__.push(signal.subscribe(this.recalculate_));
    }
  }

  /**
   * The current value of the computed signal.
   * Accessing this property will return the cached value without re-running the calculation
   * unless one of its dependencies has changed since the last access.
   *
   * @returns {T} The current computed value.
   * @throws {Error} If accessed after the signal has been destroyed.
   */
  public get value(): T {
    return this.internalSignal_.value;
  }

  /**
   * Subscribes a callback function to be executed whenever the computed value changes.
   *
   * The listener will be called whenever the computed value changes.
   */
  public readonly subscribe = this.internalSignal_.subscribe.bind(this.internalSignal_);

  /**
   * Permanently disposes of the computed signal.
   * This method unsubscribes from all dependency signals, effectively stopping any
   * future recalculations and cleaning up internal resources to prevent memory leaks.
   *
   * After `destroy()` is called, any attempt to access `.value` or `.subscribe()`
   * will result in an error.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');

    if (this.internalSignal_.isDestroyed) {
      this.logger_.incident?.('destroy', 'already_destroyed');
      return;
    }

    this.internalSignal_.destroy();

    // Unsubscribe from all upstream dependencies.
    for (const subscription of this.subscriptionList__) {
      subscription.unsubscribe();
    }
    this.subscriptionList__.length = 0; // Clear the array of subscriptions.
    this.config_ = {} as ComputedSignalConfig<T>;
  }

  /**
   * Schedules a recalculation of the signal's value.
   * This method batches updates using a macrotask to ensure the
   * calculation function runs only once per event loop tick, even if multiple
   * dependencies change simultaneously.
   */
  protected async recalculate_(): Promise<void> {
    if (this.internalSignal_.isDestroyed) {
      // This check is important in case a dependency fires after this signal is destroyed.
      this.logger_.incident?.('recalculate', 'attempt_to_recalculate_destroyed_signal');
      return;
    }

    if (this.isRecalculating__) {
      // If a recalculation is already scheduled, skip this one.
      this.logger_.logMethod?.('recalculate//skipped');
      return;
    }

    this.logger_.logMethod?.('recalculate//delayed');
    this.isRecalculating__ = true;

    try {
      await delay.nextMacrotask();

      if (this.internalSignal_.isDestroyed) {
        // Double-check in case destroy was called during the microtask
        this.logger_.incident?.('recalculate', 'attempt_to_recalculate_destroyed_signal');
        return;
      }

      this.logger_.logMethod?.('recalculate//executing');
      this.internalSignal_.set(this.config_.get());
    }
    catch (err) {
      this.logger_.error('recalculate_', 'recalculation_failed', err);
    }

    this.isRecalculating__ = false;
  }
}
