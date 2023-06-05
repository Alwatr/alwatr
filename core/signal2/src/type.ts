import type {MaybePromise} from '@alwatr/type';

/**
 * Subscribe options type.
 */
export interface SubscribeOptions {
  /**
   * If true, the listener will be called only once.
   */
  once?: true;

  /**
   * If true, the listener will be called before other.
   */
  priority?: true;

  /**
   * If true, the listener will be defined disabled by default.
   */
  disabled?: true;

  /**
   * If true, calls the listener (callback) with previous signal value (if dispatched before).
   */
  receivePrevious?: boolean;

  /**
   * If defined, calls the listener (callback) with debounce.
   */
  // debounce?: 'AnimationFrame' | number;
}

export type ListenerCallback<TValue> = (value: TValue) => MaybePromise<void>;

export interface ListenerObject<TValue> {
  callback: ListenerCallback<TValue>;
  options: SubscribeOptions;
}

export interface SubscribeResult {
  unsubscribe: () => void;
}
