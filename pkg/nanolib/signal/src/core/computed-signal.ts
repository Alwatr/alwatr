import {queueMicrotask} from '@alwatr/delay';
import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import {StateSignal} from './state-signal.js';
import type {
  ComputedSignalConfig,
  IReadonlySignal,
  SubscribeOptions,
  SubscribeResult,
  ListenerCallback,
} from '../type.js';

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
 */
export class ComputedSignal<T> implements IReadonlySignal<T> {
  /**
   * The unique identifier for this signal instance.
   */
  public readonly name: string;

  /**
   * The logger instance for this signal.
   *
   * @protected
   */
  protected readonly logger_: AlwatrLogger;

  /**
   * The internal `StateSignal` that holds the computed value.
   * This is how the computed signal provides `.get()` and `.subscribe()` methods.
   * Enforces COMPOSITION over inheritance.
   *
   * @protected
   */
  protected readonly internalSignal_: StateSignal<T>;

  /**
   * A list of subscriptions to dependency signals.
   * Used to unsubscribe from dependencies when this signal is destroyed.
   *
   * @private
   */
  private readonly dependencySubscriptions__: SubscribeResult[] = [];

  /**
   * A flag to prevent concurrent recalculations.
   * Avoids queuing multiple updates in the event loop.
   *
   * @private
   */
  private isRecalculating__ = false;

  /**
   * Creates a new ComputedSignal instance.
   * Subscribes to all dependency signals to trigger recalculations.
   *
   * @param config_ Configuration options including dependencies, evaluation getter, and cleanup hook.
   */
  constructor(protected config_: ComputedSignalConfig<T>) {
    this.name = config_.name;
    this.logger_ = createLogger(`computed_signal:${this.name}`);
    this.recalculate_ = this.recalculate_.bind(this);

    DEV_MODE && this.logger_.logMethod?.('constructor');

    this.internalSignal_ = new StateSignal<T>({
      name: `compute_internal:${this.name}`,
      initialValue: this.config_.get(),
    });

    // Subscribe to all dependencies to trigger recalculation on change.
    for (let i = 0; i < this.config_.deps.length; i++) {
      const signal = this.config_.deps[i];
      DEV_MODE && this.logger_.logStep?.('constructor', 'subscribing_to_dependency', {signal: signal.name});
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
  public get(): T {
    return this.internalSignal_.get();
  }

  /**
   * Indicates whether the computed signal has been destroyed.
   * A destroyed signal cannot be used and will throw an error if interacted with.
   *
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
  public subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult {
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
   * After `destroy()` is called, any attempt to access `.get()` or `.subscribe()` will throw an error.
   */
  public destroy(): void {
    DEV_MODE && this.logger_.logMethod?.('destroy');
    if (this.isDestroyed) {
      DEV_MODE && this.logger_.incident?.('destroy', 'already_destroyed');
      return;
    }

    for (let i = 0; i < this.dependencySubscriptions__.length; i++) {
      this.dependencySubscriptions__[i].unsubscribe();
    }
    this.dependencySubscriptions__.length = 0;

    this.internalSignal_.destroy();
    this.config_.onDestroy?.();
    this.config_ = null as unknown as ComputedSignalConfig<T>;
  }

  /**
   * Recalculates the derived value.
   * Centralized microtask batcher coordination avoids internal loop crashes.
   *
   * @protected
   */
  protected recalculate_(): void {
    DEV_MODE && this.logger_.logMethod?.('recalculate_');

    if (this.isRecalculating__) {
      // If a recalculation is already scheduled, do nothing.
      DEV_MODE && this.logger_.logStep?.('recalculate_', 'skipping_recalculation_already_scheduled');
      return;
    }

    this.isRecalculating__ = true;

    queueMicrotask(() => {
      if (this.isDestroyed) {
        DEV_MODE && this.logger_.incident?.('recalculate_', 'destroyed_during_delay');
        this.isRecalculating__ = false;
        return;
      }

      DEV_MODE && this.logger_.logStep?.('recalculate_', 'recalculating_value');
      try {
        // Set the new value on the internal signal, which will notify our subscribers.
        this.internalSignal_.set(this.config_.get());
      } catch (err) {
        this.logger_.error('recalculate_', 'projection_evaluation_failed', err);
      }

      // Allow the next recalculation to be scheduled.
      this.isRecalculating__ = false;
    });
  }
}
