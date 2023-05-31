import {createLogger, globalAlwatr} from '@alwatr/logger';

import type {MaybePromise} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/signal2',
  version: _ALWATR_VERSION_,
});

export type SignalConfig<T> = {
  debugName: string;
  initialValue?: T
}

export type Listener<T> = (detail: T) => MaybePromise<void>

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

  protected _value?: TValue;

  protected _listenerList: Array<Listener<TValue>> = [];

  constructor(protected _config: SignalConfig<TValue>) {
    this._logger = createLogger(`{signal: ${_config.debugName} index: ${this._ali}}`);
    this._value = _config.initialValue;
  }

  getValue(): TValue | undefined {
    this._logger.logMethod?.('getValue');
    return this._value;
  }

  setValue(value: TValue): void {
    this._logger.logMethodArgs?.('setValue', {value});
    this._value = value;
    this._dispatch(value);
  }

  protected async _dispatch(value: TValue): Promise<void> {
    this._logger.logMethodArgs?.('dispatch', {value});
    for (let i = this._listenerList.length - 1; i >= 0; i--) {
      await this._listenerList[i](value);
    }
  }

  /**
   * Subscribe new listener to the signal, work like addEventListener.
   */
  subscribe(callback: (detail: TValue) => MaybePromise<void>, options?: SignalSubscribeOptions): void {
    this._logger.logMethodArgs?.('subscribe', {options});

    const secureCallback = async (): Promise<void> => {
      try {
        if (this._value !== undefined) await callback(this._value);
      }
      catch (err) {
        this._logger.error('subscribe', 'call_signal_callback_failed', err, {ali: this._ali});
      }
    };

    const receivePrevious = options?.receivePrevious && !options.disabled;
    if (receivePrevious && this._value !== null) {
      if (options?.debounce === 'AnimationFrame') {
        requestAnimationFrame(secureCallback.bind(this));
      }
      else {
        setTimeout(secureCallback.bind(this), options.debounce ?? 0);
      }
    }

    if (!(receivePrevious && options.once)) {
      if (options?.priority === true) {
        this._listenerList.unshift(callback);
      }
      else {
        this._listenerList.push(callback);
      }
    }
  }
}
