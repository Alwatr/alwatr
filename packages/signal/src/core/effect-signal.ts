import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import type {EffectSignalConfig, IEffectSignal, SubscribeResult} from '../type.js';
import type {AlwatrLogger} from '@alwatr/logger';

/**
 * Manages a side-effect that runs in response to changes in dependency signals.
 *
 * `EffectSignal` is designed for running logic that interacts with the "outside world"—such as
 * logging, network requests, or DOM manipulation—whenever its dependencies are updated.
 * It encapsulates the subscription and cleanup logic, providing a robust and memory-safe
 * way to handle reactive side-effects.
 *
 * A key feature is its lifecycle management: an `EffectSignal` **must** be destroyed when no longer
 * needed to prevent memory leaks and stop the effect from running unnecessarily.
 *
 * @implements {IEffectSignal}
 *
 * @example
 * // --- Create dependency signals ---
 * const counter = new StateSignal({ initialValue: 0, signalId: 'counter' });
 * const user = new StateSignal({ initialValue: 'guest', signalId: 'user' });
 *
 * // --- Create an effect ---
 * const analyticsEffect = new EffectSignal({
 *   signalId: 'analytics-effect',
 *   deps: [counter, user],
 *   run: () => {
 *     console.log(`Analytics: User '${user.value}' clicked ${counter.value} times.`);
 *   },
 *   runImmediately: true, // Optional: run once on creation
 * });
 * // Immediately logs: "Analytics: User 'guest' clicked 0 times."
 *
 * // --- Trigger the effect by updating a dependency ---
 * counter.set(1);
 * // After a macrotask, logs: "Analytics: User 'guest' clicked 1 times."
 *
 * // --- IMPORTANT: Clean up when the effect is no longer needed ---
 * analyticsEffect.destroy();
 *
 * // Further updates will not trigger the effect.
 * counter.set(2); // Nothing is logged.
 */
export class EffectSignal implements IEffectSignal {
  /**
   * The unique identifier for this signal instance.
   */
  public readonly signalId: string;

  /**
   * The logger instance for this signal.
   * @protected
   */
  protected readonly logger_: AlwatrLogger;

  /**
   * A list of subscriptions to dependency signals.
   * @private
   */
  private readonly dependencySubscriptions_: SubscribeResult[] = [];

  /**
   * A flag to prevent concurrent executions of the effect.
   * @private
   */
  private isRunning_ = false;

  /**
   * A flag indicating whether the effect has been destroyed.
   * @private
   */
  private isDestroyed_ = false;

  /**
   * Indicates whether the effect signal has been destroyed.
   * A destroyed signal will no longer execute its effect and cannot be reused.
   *
   * @returns `true` if the signal is destroyed, `false` otherwise.
   */
  public get isDestroyed(): boolean {
    return this.isDestroyed_;
  }

  /**
   * Constructs a new EffectSignal.
   * @param config_ The configuration for the effect signal.
   */
  public constructor(protected config_: EffectSignalConfig) {
    this.signalId = config_.signalId;
    this.logger_ = createLogger(`effect-signal:${this.signalId}`);
    this.logger_.logMethod?.('constructor');
    this.run = this.run.bind(this);

    // Subscribe to all dependencies. We don't need the previous value,
    // as the `runImmediately` option controls the initial execution.
    for (const signal of config_.deps) {
      this.dependencySubscriptions_.push(signal.subscribe(this.run, {receivePrevious: false}));
    }

    // Run the effect immediately if requested.
    if (config_.runImmediately === true) {
      this.run();
    }
  }

  /**
   * Schedules the execution of the effect's `run` function.
   *
   * This method batches updates using a macrotask (`delay.nextMacrotask`) to ensure the
   * `run` function executes only once per event loop tick, even if multiple
   * dependencies change simultaneously.
   */
  public async run(): Promise<void> {
    if (this.isRunning_ || this.isDestroyed_) return;

    this.logger_.logMethod?.('run');
    this.isRunning_ = true;

    try {
      // Wait for the next macrotask to batch simultaneous updates.
      await delay.nextMacrotask();
      if (this.isDestroyed_) return;

      await this.config_.run();
    }
    catch (err) {
      this.logger_.error('run', 'effect_failed', err);
    }

    // Reset the flag after the current execution is complete.
    this.isRunning_ = false;
  }

  /**
   * Permanently disposes of the effect signal.
   *
   * This is a critical cleanup step. It unsubscribes from all dependency signals,
   * stopping any future executions of the effect and allowing it to be garbage collected.
   * Failure to call `destroy()` will result in memory leaks and potentially unwanted side effects.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');
    this.isDestroyed_ = true;

    // Unsubscribe from all upstream dependencies.
    for (const subscription of this.dependencySubscriptions_) {
      subscription.unsubscribe();
    }
    this.dependencySubscriptions_.length = 0; // Clear the array of subscriptions.

    this.config_.onDestroy?.(); // Call the optional onDestroy callback.
    this.config_ = null as unknown as EffectSignalConfig; // Release config closure.
  }
}
