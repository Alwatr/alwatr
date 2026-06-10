import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import {StateSignal} from './state-signal.js';
import type {
  IReadonlySignal,
  DerivedSignalConfig,
  ListenerCallback,
  SubscribeOptions,
  SubscribeResult,
} from '../type.js';

/**
 * Ultra-performance read-only signal mapping exactly 1-to-1 over a single upstream source.
 *
 * COMPOSITION DESIGN PATTERN (HAS-A):
 * Instead of extending the heavyweight Base class and duplicating tracking structures, it wraps
 * an internal StateSignal instance. It features a "Cold Awakening Lifecycle": it consumes exactly
 * ZERO stream overhead from the source until it receives its own first consumer subscription.
 * If all consumers disconnect, it goes back to sleep (hibernation phase) to save performance.
 *
 * @template S The type of the source signal state.
 * @template T The type of the derived/projected signal state.
 */
export class DerivedSignal<S, T> implements IReadonlySignal<T> {
  /** The unique identifier for this signal instance, useful for debugging and tracing. */
  public readonly name: string;

  /** Scoped logger for tracking derived operations. */
  protected readonly logger_: AlwatrLogger;

  /** Wrapped internal state carrier - Enforcing COMPOSITION over inheritance, allocated lazily */
  protected internalSignal_?: StateSignal<T> | null;

  /** Subscription handle to the upstream source signal, active only when awake. */
  private sourceSubscription__?: SubscribeResult;

  /** Number of active standard/priority listeners currently subscribed to this signal. */
  private activeConsumerCount__ = 0;

  /**
   * Creates a new DerivedSignal instance.
   *
   * @param config_ Configuration options including name, source, and projector.
   */
  constructor(protected config_: DerivedSignalConfig<S, T>) {
    this.name = this.config_.name;
    this.logger_ = createLogger(`derived_signal:${this.name}`);
  }

  untilNext(): Promise<T> {
    DEV_MODE && this.logger_.logMethod?.('untilNext');
    this.checkDestroyed__();
    return new Promise<T>((resolve) => {
      this.subscribe(
        (value) => {
          resolve(value);
        },
        {receivePrevious: false, once: true},
      );
    });
  }

  /**
   * Retrieves the current value of the derived signal.
   *
   * If there are no active subscribers (cold state), it re-computes dynamically
   * on demand to ensure strict data freshness.
   *
   * @returns The current projected value.
   */
  public get(): T {
    DEV_MODE && this.logger_.logMethod?.('get');
    this.checkDestroyed__();
    if (this.activeConsumerCount__ === 0) {
      return this.config_.projector(this.config_.source.get());
    }
    return this.internalSignal_!.get();
  }

  /**
   * Indicates whether the signal has been destroyed.
   */
  public get isDestroyed(): boolean {
    return this.config_ === null;
  }

  /**
   * Subscribes a listener to updates of this derived signal.
   *
   * In case of first subscription, it triggers the "Cold Awakening Lifecycle"
   * to subscribe to the source signal.
   *
   * @param callback Subscription callback function.
   * @param options Subscription configurations.
   * @returns Unsubscribe handle object.
   */
  public subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult {
    DEV_MODE && this.logger_.logMethod?.('subscribe');
    this.checkDestroyed__();
    this.activeConsumerCount__++;

    // Wake-up phase: if this is the first active consumer, dynamically clamp to the upstream core source
    if (this.activeConsumerCount__ === 1) {
      DEV_MODE && this.logger_.logMethod?.('wakeUp_');
      this.internalSignal_ = new StateSignal<T>({
        name: `derived-internal:${this.name}`,
        initialValue: this.config_.projector(this.config_.source.get()),
      });
      this.sourceSubscription__ = this.config_.source.subscribe(
        (newValue) => {
          this.internalSignal_!.set(this.config_.projector(newValue));
        },
        {receivePrevious: false},
      );
    }

    const sub = this.internalSignal_!.subscribe(callback, options);

    return {
      unsubscribe: () => {
        DEV_MODE && this.logger_.logMethod?.('unsubscribe');

        sub.unsubscribe();
        this.activeConsumerCount__--;

        // Hibernation phase: unlink tracking dependencies when view elements clear out to preserve processing cycles
        if (this.activeConsumerCount__ === 0 && this.sourceSubscription__) {
          DEV_MODE && this.logger_.logMethod?.('sleepCleanup_');
          this.sourceSubscription__.unsubscribe();
          this.sourceSubscription__ = undefined;
          this.internalSignal_?.destroy();
          this.internalSignal_ = undefined;
        }
      },
    };
  }

  /**
   * Destroys the derived signal and unsubscribes from the source signal if currently awake.
   */
  public destroy(): void {
    DEV_MODE && this.logger_.logMethod?.('destroy');
    if (this.isDestroyed) return;

    if (this.sourceSubscription__) {
      this.sourceSubscription__.unsubscribe();
      this.sourceSubscription__ = undefined;
    }

    this.internalSignal_?.destroy();
    this.config_.onDestroy?.();
    this.config_ = null as unknown as DerivedSignalConfig<S, T>;
  }

  /**
   * Checks if the signal has been destroyed.
   *
   * @private
   * @throws {Error} If destroyed.
   */
  private checkDestroyed__(): void {
    DEV_MODE && this.logger_.logMethod?.('checkDestroyed__');
    if (this.isDestroyed) {
      throw new Error(`Cannot interact with a destroyed signal (id: ${this.name})`);
    }
  }
}
