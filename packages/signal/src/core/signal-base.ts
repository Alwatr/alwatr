import type {Observer_, SubscribeOptions, SubscribeResult, ListenerCallback, SignalConfig} from '../type.js';
import type {AlwatrLogger} from '@alwatr/logger';
import type {} from '@alwatr/nano-build';

/**
 * An abstract base class for signal implementations.
 *
 * `SignalBase` provides the core functionality for managing subscriptions (observers).
 * It handles adding, removing, and notifying listeners. The responsibility of *when* to notify
 * is left to the concrete subclasses (`StateSignal`, `EventSignal`, etc.).
 *
 * @template T The type of data the signal will handle.
 */
export abstract class SignalBase<T> {
  /**
   * The unique identifier for this signal instance. Useful for debugging.
   */
  public readonly signalId: string = this.config_.signalId;

  protected abstract logger_: AlwatrLogger;

  /**
   * The list of observers (listeners) subscribed to this signal.
   * @protected
   */
  protected readonly observers_: Observer_<T>[] = [];

  protected isDestroyed_ = false;

  /**
   * Indicates whether the signal has been destroyed.
   * A destroyed signal cannot be used and will throw an error if interacted with.
   * @returns `true` if the signal is destroyed, `false` otherwise.
   */
  public get isDestroyed(): boolean {
    return this.isDestroyed_;
  }

  public constructor(protected config_: SignalConfig) {}

  /**
   * Removes a specific observer from the observers list.
   * @param observer The observer instance to remove.
   * @protected
   */
  protected removeObserver_(observer: Observer_<T>): void {
    if (this.isDestroyed_) {
      this.logger_.incident?.('removeObserver_', 'remove_observer_on_destroyed_signal');
      return;
    }
    this.logger_.logMethod?.('removeObserver_');
    const index = this.observers_.indexOf(observer);
    if (index !== -1) {
      this.observers_.splice(index, 1);
    }
  }

  /**
   * Subscribes a listener function to this signal.
   *
   * The listener will be called whenever the signal is notified (e.g., when `dispatch` or `set` is called).
   *
   * @param callback The function to be called when the signal is dispatched.
   * @param options Subscription options to customize the behavior (e.g., `once`, `priority`).
   * @returns A `SubscribeResult` object with an `unsubscribe` method to remove the listener.
   */
  public subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult {
    this.logger_.logMethodArgs?.('subscribe.base', {options});
    this.checkDestroyed_();

    const observer: Observer_<T> = {callback, options};

    if (options?.priority) {
      // High-priority observers are added to the front of the queue.
      this.observers_.unshift(observer);
    }
    else {
      this.observers_.push(observer);
    }

    // The returned unsubscribe function is a closure that calls the internal removal method.
    const unsubscribe = (): void => this.removeObserver_(observer);

    return {unsubscribe};
  }

  /**
   * Notifies all registered observers about a new value.
   *
   * This method iterates through a snapshot of the current observers to prevent issues
   * with subscriptions changing during notification (e.g., an observer unsubscribing itself).
   *
   * @param value The new value to notify observers about.
   * @protected
   */
  protected notify_(value: T): void {
    if (this.isDestroyed_) {
      this.logger_.incident?.('notify_', 'notify_on_destroyed_signal');
      return;
    }

    this.logger_.logMethodArgs?.('notify_', value);

    // Create a snapshot of the observers array to iterate over.
    // This prevents issues if the observers_ array is modified during the loop.
    const currentObservers = [...this.observers_];

    for (const observer of currentObservers) {
      if (observer.options?.once) {
        this.removeObserver_(observer);
      }

      try {
        // Fire the callback, but don't await it.
        // If the callback returns a promise, it's up to the callback's author to handle it.
        const result = observer.callback(value);
        if (result instanceof Promise) {
          // Log unhandled promise rejections from listeners.
          result.catch((err) => {
            this.logger_.error('notify_', 'async_callback_failed', err, {observer});
          });
        }
      }
      catch (err) {
        this.logger_.error('notify_', 'sync_callback_failed', err);
      }
    }
  }

  /**
   * Returns a Promise that resolves with the next value dispatched by the signal.
   * This provides an elegant way to wait for a single, future event using `async/await`.
   *
   * @returns A Promise that resolves with the next dispatched value.
   *
   * @example
   * async function onButtonClick() {
   *   console.log('Waiting for the next signal...');
   *   const nextValue = await mySignal.untilNext();
   *   console.log('Signal received:', nextValue);
   * }
   */
  public untilNext(): Promise<T> {
    this.logger_.logMethod?.('untilNext');
    this.checkDestroyed_();
    return new Promise((resolve) => {
      this.subscribe(resolve, {
        once: true,
        priority: true, // Resolve the promise before other listeners are called.
        receivePrevious: false, // We only want the *next* value, not the current one.
      });
    });
  }

  /**
   * Destroys the signal, clearing all its listeners and making it inactive.
   *
   * After destruction, any interaction with the signal (like `subscribe` or `untilNext`)
   * will throw an error. This is crucial for preventing memory leaks by allowing
   * garbage collection of the signal and its observers.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');
    if (this.isDestroyed_) return;
    this.isDestroyed_ = true;
    this.observers_.length = 0; // Clear all observers.
    this.config_.onDestroy?.(); // Call the optional onDestroy callback.
    this.config_ = null as unknown as SignalConfig; // Help GC by breaking references.
  }

  /**
   * Throws an error if the signal has been destroyed.
   * This is a safeguard to prevent interaction with a defunct signal.
   * @protected
   */
  protected checkDestroyed_ = (): void => {
    if (this.isDestroyed_) {
      this.logger_.accident('checkDestroyed_', 'attempt_to_use_destroyed_signal');
      throw new Error(`Cannot interact with a destroyed signal (id: ${this.signalId})`);
    }
  };
}
