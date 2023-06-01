import {createLogger, globalAlwatr} from '@alwatr/logger';

import type {MaybePromise} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/signal2',
  version: _ALWATR_VERSION_,
});

/**
 * Subscribe options type.
 */
export interface ContextSubscribeOptions {
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
  options: ContextSubscribeOptions;
}

export interface ContextSubscribeResult {
  unsubscribe: () => void;
}

/**
 * Alwatr multithread context signal.
 */
export class AlwatrContext<TValue> {
  protected _logger;

  protected _value?: TValue;

  protected _listenerList: Array<ListenerObject<TValue>> = [];

  constructor(public name: string) {
    this._logger = createLogger(`{signal: ${name}}`);
  }

  /**
   * Get context value.
   *
   * Return undefined if context not set before or expired.
   */
  getValue(): TValue | undefined {
    this._logger.logMethodFull?.('getValue', {}, this._value);
    return this._value;
  }

  /**
   * Set context value and notify all subscribers.
   */
  setValue(value: TValue): void {
    this._logger.logMethodArgs?.('setValue', {value});
    this._value = value;
    this._executeListeners();
  }

  /**
   * Execute all listeners callback.
  */
  protected _executeListeners(): void {
    this._logger.logMethod?.('_executeListeners');
    if (this._value === undefined) return;

    const removeList: Array<ListenerObject<TValue>> = [];

    for (const listener of this._listenerList) {
      if (listener.options.disabled) continue;
      if (listener.options.once) removeList.push(listener);

      try {
        const ret = listener.callback(this._value);
        if (ret instanceof Promise) {
          ret.catch((err) =>
            this._logger.error('_callListeners', 'call_listener_failed', err),
          );
        }
      }
      catch (err) {
        this._logger.error('_callListeners', 'call_listener_failed', err);
      }
    }

    for (const listener of removeList) {
      this.unsubscribe(listener.callback);
    }
  }

  /**
   * Subscribe to context changes.
   */
  subscribe(listenerCallback: ListenerCallback<TValue>, options: ContextSubscribeOptions = {}): ContextSubscribeResult {
    this._logger.logMethodArgs?.('subscribe', {options});

    const _listenerObject: ListenerObject<TValue> = {
      callback: listenerCallback,
      options,
    };

    let callbackExecuted = false;
    const value = this._value;
    if (value !== undefined && options.receivePrevious === true && options.disabled !== true) {
      // Run callback for old dispatch signal
      callbackExecuted = true;
      setTimeout(() => {
        try {
          listenerCallback(value);
        }
        catch (err) {
          this._logger.error('subscribe.receivePrevious', 'call_signal_callback_failed', err);
        }
      }, 0);
    }

    // if once then must remove listener after fist callback called! then why push it to listenerList?!
    if (options.once !== true || callbackExecuted === true) {
      if (options.priority === true) {
        this._listenerList.unshift(_listenerObject);
      }
      else {
        this._listenerList.push(_listenerObject);
      }
    }

    return {
      unsubscribe: this.unsubscribe.bind(this, listenerCallback),
    };
  }

  /**
   * Unsubscribe from context.
   */
  unsubscribe(listenerCallback: ListenerCallback<TValue>): void {
    this._logger.logMethod?.('unsubscribe');
    const listenerIndex = this._listenerList.findIndex((listener) => listener.callback === listenerCallback);
    if (listenerIndex !== -1) {
      void this._listenerList.splice(listenerIndex, 1);
    }
  }

  /**
   * Clear current context value without notify subscribers.
   *
   * new subscriber options.receivePrevious not work until new signalvider.expire('product-list');
   */
  expire(): void {
    this._logger.logMethod?.('expire');
    this._value = undefined;
  }

  /**
   * Get the value of the next context changes.
   */
  untilChange(): Promise<TValue> {
    this._logger.logMethod?.('untilNext');
    return new Promise((resolve) => {
      this.subscribe(resolve, {
        once: true,
        priority: true,
        receivePrevious: false,
      });
    });
  }
}
