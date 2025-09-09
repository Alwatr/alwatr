import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {StateSignal} from './state-signal.js';

import type {ComputedSignalConfig, IComputedSignal, SubscribeResult} from './type.js';

/**
 * A read-only signal that derives its value from other signals.
 *
 * Its value is recalculated automatically when any of its dependencies change.
 *
 * This class is memory-efficient as methods are shared across all instances via prototype.
 */
export class ComputedSignal<T> implements IComputedSignal<T> {
  public readonly signalId = this.config_.signalId;

  protected readonly logger_ = createLogger(`computed-signal: ${this.signalId}`);
  protected readonly computeFn_ = this.config_.get;
  protected readonly internalSignal_ = new StateSignal<T>({
    signalId: this.signalId + '-internal',
    initialValue: this.computeFn_(),
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
   * Throws an error if accessed after the signal has been destroyed.
   */
  public get value(): T {
    return this.internalSignal_.value;
  }

  /**
   * Subscribes a listener to this computed signal.
   *
   * The listener will be called whenever the computed value changes.
   */
  public readonly subscribe = this.internalSignal_.subscribe.bind(this.internalSignal_);

  /**
   * Unsubscribes from all dependencies, stopping future recalculations
   * and allowing for garbage collection.
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
    // @ts-expect-error deps is readonly
    this.config_.deps.length = 0;
  }

  /**
   * Private method to recalculate the signal's value.
   * It batches updates using a microtask to prevent multiple recalculations in a single event loop tick.
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
      this.internalSignal_.set(this.computeFn_());
    }
    catch (err) {
      this.logger_.error('_recalculate', 'recalculation_failed', err);
    }

    this.isRecalculating__ = false;
  }
}
