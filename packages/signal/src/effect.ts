import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import type {EffectSignalConfig, IEffectSignal, SubscribeResult} from './type.js';

/**
 * Manages a side-effect that runs in response to changes in dependency signals.
 *
 * `EffectSignal` is designed for running logic that interacts with the "outside world"
 * (e.g., logging, network requests, DOM manipulation) whenever its dependencies are updated.
 * It encapsulates the subscription and cleanup logic, providing a robust and memory-safe
 * way to handle reactive side-effects.
 *
 * A key feature is its lifecycle management: an `EffectSignal` must be destroyed when no longer
 * needed to prevent memory leaks from its subscriptions to dependency signals.
 *
 * @implements {IEffectSignal}
 *
 * @example
 * // --- Basic Usage ---
 * const counter = new StateSignal({ initialValue: 0, signalId: 'counter' });
 * const documentTitle = new StateSignal({ initialValue: 'Home', signalId: 'documentTitle' });
 *
 * const logEffect = new EffectSignal({
 *   deps: [counter, documentTitle],
 *   run: () => {
 *     console.log(`Counter is ${counter.value} and title is "${documentTitle.value}"`);
 *   },
 * });
 * // Immediately logs: "Counter is 0 and title is "Home""
 *
 * counter.set(1);
 * // After a microtask, logs: "Counter is 1 and title is "Home""
 *
 * // --- Lifecycle Management ---
 * // When the component or logic using the effect is removed:
 * logEffect.destroy();
 *
 * // Any further changes to dependencies will no longer trigger the effect.
 * counter.set(2); // The effect does not run.
 */
export class EffectSignal implements IEffectSignal {
  protected readonly logger_ = createLogger(`effect-signal`);
  protected readonly effectFn_ = this.config_.run;

  private readonly subscriptionList__: SubscribeResult[] = [];
  private isRunning__ = false;
  private isDestroyed__ = false;

  public constructor(protected config_: EffectSignalConfig) {
    this.logger_.logMethod?.('constructor');
    this.run_ = this.run_.bind(this);

    // Subscribe to all dependencies without receiving the previous value,
    // as the `runImmediately` option controls the initial execution.
    for (const signal of config_.deps) {
      this.subscriptionList__.push(signal.subscribe(this.run_, {receivePrevious: false}));
    }

    // Run the effect immediately if requested.
    if (config_.runImmediately === true) {
      this.run_();
    }
  }

  /**
   * Schedules the execution of the effect function.
   * This method batches updates using a macrotask to ensure the
   * function runs only once per event loop tick, even if multiple
   * dependencies change simultaneously.
   * @protected
   */
  protected async run_(): Promise<void> {
    if (this.isRunning__) {
      // If an execution is already scheduled, skip this one.
      this.logger_.logMethod?.('run_//skipped');
      return;
    }

    this.logger_.logMethod?.('run_//scheduled');
    this.isRunning__ = true;

    try {
      // Wait for the next macrotask to batch simultaneous updates.
      await delay.nextMacrotask();

      if (this.isDestroyed__) {
        this.logger_.incident?.('run_', 'destroyed_during_delay');
        return;
      }

      this.logger_.logMethod?.('run_//executing');
      await this.effectFn_();
    }
    catch (err) {
      this.logger_.error('run_', 'effect_failed', err);
    }

    // Reset the flag after the current execution is complete.
    this.isRunning__ = false;
  }

  /**
   * Permanently disposes of the effect signal.
   * This method unsubscribes from all dependency signals, effectively stopping any
   * future executions of the effect function and cleaning up internal resources
   * to prevent memory leaks.
   *
   * After `destroy()` is called, the effect will no longer run.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');

    if (this.isDestroyed__) {
      this.logger_.incident?.('destroy', 'already_destroyed');
      return;
    }
    this.isDestroyed__ = true;

    // Unsubscribe from all upstream dependencies.
    for (const subscription of this.subscriptionList__) {
      subscription.unsubscribe();
    }
    this.subscriptionList__.length = 0; // Clear the array of subscriptions.
    // @ts-expect-error deps is readonly
    this.config_.deps.length = 0; // Clear the dependencies array.
  }

  /**
   * Checks if the signal has been destroyed.
   * @throws {Error} If the signal has been destroyed.
   * @protected
   */
  protected checkDestroyed_(): void {
    if (this.isDestroyed__) {
      this.logger_.accident('checkDestroyed_', 'attempt_to_use_destroyed_effect_signal');
      throw new Error('Cannot interact with a destroyed EffectSignal.');
    }
  }
}
