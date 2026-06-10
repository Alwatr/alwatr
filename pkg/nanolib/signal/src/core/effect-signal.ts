import {delay} from '@alwatr/delay';
import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import type {EffectSignalConfig, IEffectSignal, SubscribeResult} from '../type.js';

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
 * const counter = new StateSignal({ initialValue: 0, name: 'counter' });
 * const user = new StateSignal({ initialValue: 'guest', name: 'user' });
 *
 * // --- Create an effect ---
 * const analyticsEffect = new EffectSignal({
 *   name: 'analytics-effect',
 *   deps: [counter, user],
 *   run: () => {
 *     console.log(`Analytics: User '${user.get()}' clicked ${counter.get()} times.`);
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
  public readonly name: string;

  /**
   * The logger instance for this signal.
   *
   * @protected
   */
  protected readonly logger_: AlwatrLogger;

  /**
   * A list of subscriptions to dependency signals.
   * Used to unsubscribe from dependencies when this signal is destroyed.
   *
   * @private
   */
  private readonly dependencySubscriptions__: SubscribeResult[] = [];

  /**
   * A flag to prevent concurrent executions of the effect.
   * Avoids scheduling multiple runs within the same event loop.
   *
   * @private
   */
  private isRunning__ = false;

  /**
   * A flag indicating whether the effect has been destroyed.
   *
   * @private
   */
  private isDestroyed__ = false;

  /**
   * Indicates whether the effect signal has been destroyed.
   * A destroyed signal will no longer execute its effect and cannot be reused.
   *
   * @returns `true` if the signal is destroyed, `false` otherwise.
   */
  public get isDestroyed(): boolean {
    return this.isDestroyed__;
  }

  /**
   * Creates a new EffectSignal instance.
   * Subscribes to all dependency signals to listen for updates.
   *
   * @param config_ Configuration options including dependencies, side-effect runner callback, and immediate execution flag.
   */
  constructor(protected config_: EffectSignalConfig) {
    this.name = config_.name ?? `[${config_.deps.map((dep) => dep.name).join(', ')}]`;
    this.logger_ = createLogger(`effect-signal:${this.name}`);
    this.scheduleExecution_ = this.scheduleExecution_.bind(this);

    DEV_MODE && this.logger_.logMethod?.('constructor');

    // Subscribe to all dependencies. We don't need the previous value,
    // as the `runImmediately` option controls the initial execution.
    for (const signal of config_.deps) {
      DEV_MODE && this.logger_.logStep?.('constructor', 'subscribing_to_dependency', {signal: signal.name});
      this.dependencySubscriptions__.push(signal.subscribe(this.scheduleExecution_, {receivePrevious: false}));
    }

    // Run the effect immediately if requested.
    if (config_.runImmediately === true) {
      DEV_MODE && this.logger_.logStep?.('constructor', 'scheduling_initial_execution');
      // We don't need to await this, let it run in the background.
      void this.scheduleExecution_();
    }
  }

  /**
   * Schedules the execution of the effect's `run` function.
   *
   * This method batches updates using a macrotask (`delay.nextMicrotask`) to ensure the
   * `run` function executes only once per event loop tick, even if multiple
   * dependencies change simultaneously.
   *
   * @protected
   * @returns A promise that resolves when the execution schedules or runs.
   */
  protected async scheduleExecution_(): Promise<void> {
    DEV_MODE && this.logger_.logMethod?.('scheduleExecution_');

    if (this.isDestroyed__) {
      DEV_MODE && this.logger_.incident?.('scheduleExecution_', 'schedule_execution_on_destroyed_signal');
      return;
    }
    if (this.isRunning__) {
      // If an execution is already scheduled, do nothing.
      DEV_MODE && this.logger_.logStep?.('scheduleExecution_', 'skipped_because_already_running');
      return;
    }

    this.isRunning__ = true;

    try {
      // Wait for the next macrotask to batch simultaneous updates.
      await delay.nextMicrotask();
      if (this.isDestroyed__) {
        DEV_MODE && this.logger_.incident?.('scheduleExecution_', 'destroyed_during_delay');
        this.isRunning__ = false;
        return;
      }

      DEV_MODE && this.logger_.logStep?.('scheduleExecution_', 'executing_effect');
      this.config_.run();
    } catch (err) {
      this.logger_.error('scheduleExecution_', 'effect_failed', err);
    }

    // Reset the flag after the current execution is complete.
    this.isRunning__ = false;
  }

  /**
   * Permanently disposes of the effect signal.
   *
   * This is a critical cleanup step. It unsubscribes from all dependency signals,
   * stopping any future executions of the effect and allowing it to be garbage collected.
   * Failure to call `destroy()` will result in memory leaks and potentially unwanted side effects.
   */
  public destroy(): void {
    DEV_MODE && this.logger_.logMethod?.('destroy');

    if (this.isDestroyed__) {
      DEV_MODE && this.logger_.incident?.('destroy', 'already_destroyed');
      return;
    }

    this.isDestroyed__ = true;

    // Unsubscribe from all upstream dependencies.
    for (const subscription of this.dependencySubscriptions__) {
      subscription.unsubscribe();
    }
    this.dependencySubscriptions__.length = 0; // Clear the array of subscriptions.

    this.config_.onDestroy?.(); // Call the optional onDestroy callback.
    this.config_ = null as unknown as EffectSignalConfig; // Release config closure.
  }
}
