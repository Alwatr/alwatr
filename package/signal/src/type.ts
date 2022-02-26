declare global
{
  /**
   * Global signal registry.
   */
  interface VatrSignals
  {
    readonly 'easter-egg': void;
  }

  interface VatrRequestSignals
  {
    readonly 'easter-egg': number;
  }
}

export interface ListenerOptions
{
  /**
   * If true, the listener will be called only once.
   * @default false
   */
  once: boolean;

  /**
   * If true, the listener will be called before other.
   * @default false
   * @deprecated @TODO Please implement this feature.
   */
  priority: boolean;

  /**
   * If true, the listener will be defined disabled by default.
   *
   * @default false
   */
  disabled: boolean;

  /**
   * If true, the listener will be called in animation frame debounce.
   * If false, every signal is matter and count.
   *
   * @default true or dispatch signal config.
   * @deprecated @TODO Please implement this feature.
   */
  debounce: boolean;

  /**
   * Calling this listener (callback) with preview signal value (if dispatched before).
   * If Immediate, the listener will be called immediately without any debounce for preview signal.
   *
   * @default true
   */
  receivePrevious: boolean | 'Immediate';
}

export interface DispatchOptions
{
  /**
   * If true, the dispatch will be send after animation frame debounce.
   * If false, every signal is matter and count.
   *
   * @default true
   */
  debounce: boolean;
}

export type ListenerCallback<T = unknown> = (detail: T) => void | Promise<void>;
