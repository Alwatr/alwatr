import type {Observer_, SubscribeOptions, SubscribeResult, ListenerCallback, SignalConfig} from '../type.js';
import type {AlwatrLogger} from '@alwatr/logger';

/**
 * An abstract base class for all signal implementations in the `@alwatr/signal` package.
 *
 * It provides core subscription management capabilities, including priority observer queues,
 * microtask/macrotask-friendly updates, type-safe unsubscribes, async promise resolution via `untilNext`,
 * and safe destruction lifecycles to prevent memory leaks.
 *
 * @template T The type of data that the signal holds, dispatches, or streams.
 */
export abstract class SignalBase<T> {
  /**
   * The unique identifier for this signal instance.
   * Highly useful for debugging, filtering logs, and tracing data flows.
   */
  public readonly name: string;

  /**
   * The logger instance for this signal.
   * Custom scoped logger based on the signal name and type.
   *
   * @protected
   */
  protected abstract logger_: AlwatrLogger;

  /**
   * High-priority observers that are executed first during notifications.
   * Allocated lazily upon the first priority subscription to guard heap memory.
   *
   * @protected
   */
  protected priorityObservers_?: Set<Observer_<T>>;

  /**
   * Standard-priority observers executed after priority observers.
   * Allocated lazily upon the first standard subscription to guard heap memory.
   *
   * @protected
   */
  protected observers_?: Set<Observer_<T>>;

  /**
   * Internal flag representing whether the signal has been destroyed.
   *
   * @private
   */
  private isDestroyed__ = false;

  /**
   * Indicates whether the signal has been destroyed.
   * A destroyed signal cannot be subscribed to or dispatched to.
   *
   * @returns `true` if the signal is destroyed, `false` otherwise.
   */
  public get isDestroyed(): boolean {
    return this.isDestroyed__;
  }

  /**
   * Creates a new instance of the signal base.
   *
   * @param config_ Configuration options including the unique signal name and cleanup hooks.
   */
  constructor(protected config_: SignalConfig) {
    this.name = config_.name;
  }

  /**
   * Removes a specific observer from both the standard and priority observer queues.
   *
   * @param observer The observer wrapper object containing the callback and options to remove.
   * @protected
   */
  protected removeObserver_(observer: Observer_<T>): void {
    DEV_MODE && this.logger_.logMethod?.('removeObserver_');

    if (this.isDestroyed__) {
      DEV_MODE && this.logger_.incident?.('removeObserver_', 'remove_observer_on_destroyed_signal');
      return;
    }

    if (observer.options?.priority) {
      this.priorityObservers_?.delete(observer);
      if (this.priorityObservers_?.size === 0) {
        this.priorityObservers_ = undefined;
      }
    } else {
      this.observers_?.delete(observer);
      if (this.observers_?.size === 0) {
        this.observers_ = undefined;
      }
    }
  }

  /**
   * Subscribes a listener function to this signal.
   *
   * The listener will be called whenever the signal notifies its observers.
   *
   * @param callback The function to invoke when the signal dispatches a new value.
   * @param options Custom options to control priority, immediate callback, or single execution.
   * @returns An object with an `unsubscribe` method to remove the subscription.
   */
  public subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult {
    DEV_MODE && this.logger_.logMethodArgs?.('subscribe.base', options);
    this.checkDestroyed_();

    const observer: Observer_<T> = {callback, options};

    if (options?.priority) {
      this.priorityObservers_ ??= new Set();
      this.priorityObservers_.add(observer);
    } else {
      this.observers_ ??= new Set();
      this.observers_.add(observer);
    }

    // Return an unsubscribe handler as a closure to prevent memory leaks.
    return {
      unsubscribe: (): void => this.removeObserver_(observer),
    };
  }

  /**
   * Notifies all registered priority and standard observers with the given value.
   * Iterates synchronously over current queues.
   *
   * @param value The value to pass to each observer's callback.
   * @protected
   */
  protected notify_(value: T): void {
    DEV_MODE && this.logger_.logMethodArgs?.('notify_', value);

    if (this.isDestroyed__) {
      DEV_MODE && this.logger_.incident?.('notify_', 'notify_on_destroyed_signal');
      return;
    }

    // Execute priority observers first
    if (this.priorityObservers_?.size) {
      for (const observer of this.priorityObservers_) {
        this.executeObserver__(observer, value);
      }
    }

    // Execute standard observers second
    if (this.observers_?.size) {
      for (const observer of this.observers_) {
        this.executeObserver__(observer, value);
      }
    }
  }

  /**
   * Executes a single observer's callback, handles auto-unsubscribing for `once` listeners,
   * and wraps execution in a try-catch block to prevent observer exceptions from crashing the signal.
   *
   * @param observer The observer descriptor to execute.
   * @param value The value to supply to the observer's callback.
   * @private
   */
  private executeObserver__(observer: Observer_<T>, value: T): void {
    if (observer.options?.once) {
      this.removeObserver_(observer);
    }
    try {
      observer.callback(value);
    } catch (err) {
      this.logger_.error('notify_', 'sync_callback_failed', err);
    }
  }

  /**
   * Holds the promise rejection functions of any pending `untilNext` invocations
   * to reject them if the signal is destroyed.
   *
   * @private
   */
  private pendingRejects__?: Set<(reason?: any) => void>;

  /**
   * Returns a Promise that resolves with the next value/payload dispatched by the signal.
   * Use this for async orchestration (e.g. `await signal.untilNext()`).
   *
   * @returns A Promise that resolves with the next value dispatched by the signal.
   */
  public untilNext(): Promise<T> {
    DEV_MODE && this.logger_.logMethod?.('untilNext');
    this.checkDestroyed_();
    return new Promise((resolve, reject) => {
      this.pendingRejects__ ??= new Set();
      this.pendingRejects__.add(reject);
      this.subscribe(
        (value) => {
          this.pendingRejects__?.delete(reject);
          resolve(value);
        },
        {
          once: true,
          priority: true, // Internal promise resolution is prioritized over normal observers.
          receivePrevious: false, // Wait only for the next value change.
        },
      );
    });
  }

  /**
   * Permanently destroys the signal instance.
   * Clears all observers, rejects pending `untilNext` promises with a 'signal_destroyed' error,
   * invokes the optional `onDestroy` config hook, and breaks internal references to facilitate GC.
   */
  public destroy(): void {
    DEV_MODE && this.logger_.logMethod?.('destroy');
    if (this.isDestroyed__) {
      DEV_MODE && this.logger_.incident?.('destroy_', 'double_destroy_attempt');
      return;
    }
    this.isDestroyed__ = true;

    // Reject all pending promises to prevent hang-ups.
    if (this.pendingRejects__?.size) {
      const error = new Error('signal_destroyed');
      for (const reject of this.pendingRejects__) {
        reject(error);
      }
      this.pendingRejects__.clear();
    }
    this.priorityObservers_?.clear();
    this.observers_?.clear();
    this.config_.onDestroy?.();
    this.config_ = null as unknown as SignalConfig;
  }

  /**
   * Checks if the signal has been destroyed. If so, throws an error and logs an accident.
   *
   * @protected
   * @throws {Error} If the signal has been destroyed.
   */
  protected checkDestroyed_(): void {
    if (this.isDestroyed__) {
      DEV_MODE && this.logger_.accident('checkDestroyed_', 'attempt_to_use_destroyed_signal');
      throw new Error(`Cannot interact with a destroyed signal (id: ${this.name})`);
    }
  }
}
