export type DebounceType = 'No' | 'AnimationFrame' | 'Timeout';

/**
 * addSignalListener options type
 */
export interface ListenerOptions {
  /**
   * If true, the listener will be called only once.
   * @default false
   */
  once?: boolean;

  /**
   * If true, the listener will be called before other.
   * @default false
   */
  priority?: boolean;

  /**
   * If true, the listener will be defined disabled by default.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Calling this listener (callback) with preview signal value (if dispatched before).
   * If Immediate, the listener will be called immediately without any debounce for preview signal.
   *
   * @default `AnimationFrame`
   */
  receivePrevious?: DebounceType | 'NextCycle';
}

/**
 * dispatchSignal options type
 */
export interface DispatchOptions {
  /**
   * If true, the dispatch will be send after animation frame debounce.
   * If false, every signal is matter and count.
   * tips: debounce work like throttle this means listeners call with last dispatch value.
   *
   * @default `AnimationFrame`
   */
  debounce?: DebounceType;
}

/**
 * setSignalProvider options type.
 */
export interface ProviderOptions {
  /**
   * Calling signal provider (request signal callback) with preview signal value (if dispatched before).
   * If Immediate, the listener will be called immediately without any debounce for preview signal.
   *
   * @default `NextCycle`
   */
  receivePrevious?: DebounceType | 'NextCycle';

  /**
   * If true, the dispatch will be send after animation frame debounce.
   * If false, every signal is matter and count.
   * tips: debounce true work like throttle this means listeners call with last dispatch value.
   *
   * @default `AnimationFrame`
   */
  debounce?: DebounceType;
}

/**
 * Signal listeners callback function type.
 */
export type ListenerCallback<T extends Record<string, unknown>> = (detail: T) => void | Promise<void>;

/**
 * Signal provider function type used to setSignalProvider.
 */
export type ProviderFunction<TSignal extends Record<string, unknown>, TRequest extends Record<string, unknown>> = (
  requestDetail: TRequest
) => TSignal | void | Promise<TSignal | void>;

/**
 * Signal listeners object in storage.
 */
export type ListenerObject<T extends Record<string, unknown>> = {
  /**
   * Unique listener id
   */
  id: number;

  /**
   * Signal id
   */
  signalId: string;

  /**
   * If true, the listener will be called only once and removed automatically after first call
   */
  once: boolean;

  /**
   * If true, the listener will be disabled.
   */
  disabled: boolean;

  callback: ListenerCallback<T>;
}

/**
 * Signal object in storage.
 */
export type SignalObject<T extends Record<string, unknown>> = {
  /**
   * Signal id for direct access.
   */
  id: string;

  /**
   * Last dispatched value.
   */
  detail?: T;

  /**
   * If true, the signal is disabled.
   */
  disabled: boolean;

  /**
   * Dispatches debounced (delayed).
   * Internal use case for debounce dispatch signal.
   */
  debounced: boolean;

  /**
   * Signal listeners list.
   */
  listenerList: Array<ListenerObject<T>>;
}

/**
 * Signal stack storage.
 */
export type SignalStorage = Record<string, SignalObject<Record<string, unknown>> | undefined>;
