import type {MaybePromise, Stringifyable} from '@alwatr/type';

export type DebounceType = 'No' | 'AnimationFrame' | 'Timeout';

/**
 * Subscribe options type.
 */
export interface SubscribeOptions {
  /**
   * If true, the listener will be called only once.
   * @default false
   */
  once: boolean;

  /**
   * If true, the listener will be called before other.
   * @default false
   */
  priority: boolean;

  /**
   * If true, the listener will be defined disabled by default.
   *
   * @default false
   */
  disabled: boolean;

  /**
   * Calling this listener (callback) with preview signal value (if dispatched before).
   * If Immediate, the listener will be called immediately without any debounce for preview signal.
   *
   * @default `NextCycle`
   */
  receivePrevious: DebounceType | 'NextCycle';
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
  debounce: DebounceType;
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
  receivePrevious: DebounceType | 'NextCycle';

  /**
   * If true, the dispatch will be send after animation frame debounce.
   * If false, every signal is matter and count.
   * tips: debounce true work like throttle this means listeners call with last dispatch value.
   *
   * @default `AnimationFrame`
   */
  debounce: DebounceType;
}

/**
 * Subscribe callback function.
 */
export type ListenerFunction<T extends Stringifyable> = (detail: T) => void | Promise<void>;

/**
 * Command/Context provider/handler function.
 */
export type ProviderFunction<TArgument, TReturn> = (
  argumentObject: TArgument
) => MaybePromise<TReturn>;

/**
 * Listener spec.
 */
export type ListenerSpec = {
  /**
   * Unique listener id
   */
  id: number;

  /**
   * Signal id
   */
  signalId: string;
}

/**
 * Signal listeners object in storage.
 */
export type ListenerObject<T extends Stringifyable> = ListenerSpec & {
  /**
   * If true, the listener will be called only once and removed automatically after first call
   */
  once: boolean;

  /**
   * If true, the listener will be disabled.
   */
  disabled: boolean;

  callback: ListenerFunction<T>;
};

/**
 * Signal object in storage.
 */
export type SignalObject<T extends Stringifyable> = {
  /**
   * Signal id for direct access.
   */
  id: string;

  /**
   * Last dispatched detail.
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
};

/**
 * Signal stack storage.
 */
export type SignalStorage = Record<string, SignalObject<Stringifyable> | undefined>;
