import {createLogger, globalAlwatr} from '@alwatr/logger';
import {MaybePromise} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/signal2',
  version: _ALWATR_VERSION_,
});

export interface SignalConfig {
  debugName: string;
}

/**
 * Subscribe options type.
 */
export interface SignalSubscribeOptions {
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
  debounce?: 'AnimationFrame' | number;
}

/**
 * Last alwatr logger index!
 */
let _lastAli = 0;

/**
 * Alwatr Event Signal.
 */
export class AlwatrContext<TValue> {
  /**
   * Alwatr logger index!
   *
   * Signal index for logger ;)
   */
  protected _ali: number = ++_lastAli;

  protected _logger;

  protected _value: TValue;

  constructor(protected _config: SignalConfig) {
    this._logger = createLogger(`{signal: ${_config.debugName} index: ${this._ali}}`);
  }

  getValue(): TValue {

  }

  setValue(value: TValue): void {

  }

  /**
   * Subscribe new listener to the signal, work like addEventListener.
   */
  subscribe(callback: (detail: TValue) => MaybePromise<void>, options?: SignalSubscribeOptions): void {
    this._logger.logMethodArgs?.('subscribe', {options});

    const signal = getSignalObject<T>(signalId);

    const listener2: ListenerObject<T> = {
      callback,
      options,
    };

    const execCallback = signal.detail !== undefined && options?.receivePrevious && !options.disabled;
    if (execCallback) {
      // Run callback for old dispatch signal
      setTimeout(callback, 0);

      const callback = (): void => {
        try {
          if (signal.detail !== undefined) callback(signal.detail);
        }
        catch (err) {
          logger.error('subscribe', 'call_signal_callback_failed', err, {
            signalId: signal.id,
          });
        }
      };

      if (options.receivePrevious === 'AnimationFrame') {
        requestAnimationFrame(callback);
      }
      else {
        setTimeout(callback, options.receivePrevious === 'NextCycle' ? 0 : debounceTimeout);
      }
    }

    // if once then must remove listener after fist callback called! then why push it to listenerList?!
    if (!(execCallback && options.once)) {
      if (options.priority === true) {
        signal.listenerList.unshift(callback);
      }
      else {
        signal.listenerList.push(callback);
      }
    }

    return {
      id: callback.id,
      signalId: callback.signalId,
    };
  }

  // unsubscribe
}
