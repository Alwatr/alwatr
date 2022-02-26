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

export type ListenerCallback<SignalName extends keyof VatrSignals> =
  (detail: VatrSignals[SignalName]) => void | Promise<void>;

export interface ListenerObject<SignalName extends keyof VatrSignals>
{
  /**
   * Listener symbol id (unique).
   */
  id: symbol;

  /**
   * If true, the listener will be called only once and removed automatically after first call
   */
  once: boolean;

  /**
   * If true, the listener will be disabled.
   */
  disabled: boolean;

  callback: ListenerCallback<SignalName>;
}

export interface SignalObject<SignalName extends keyof VatrSignals>
{
  /**
   * Signal name for direct access.
   */
  name: SignalName;

  /**
   * Last dispatched value.
   */
  value?: VatrSignals[SignalName];

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
   * Signal priority listeners list.
   */
  priorityListenerList: Array<ListenerObject<SignalName>>;

  /**
   * Signal listeners list.
   */
  listenerList: Array<ListenerObject<SignalName>>;
}
