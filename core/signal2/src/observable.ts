import {createLogger} from '@alwatr/logger';

import type {
  SubscribeOptions,
  ListenerCallback,
  Observer,
  SubscribeResult,
  AlwatrObservableInterface,
} from './type.js';

/**
 * Alwatr base signal.
 */
export abstract class AlwatrObservable<T> implements AlwatrObservableInterface<T> {
  protected _name;
  protected _logger;
  protected _$data?: T;
  protected _$observers: Array<Observer<this, T>> = [];

  constructor(config: {name: string; loggerPrefix?: string}) {
    config.loggerPrefix ??= 'signal';
    this._name = config.name;
    this._logger = createLogger(`{${config.loggerPrefix}: ${this._name}}`);
    this._logger.logMethod?.('constructor');
  }

  /**
   * Get data.
   *
   * Return undefined if signal not notify before or expired.
   */
  protected _getData(): T | undefined {
    this._logger.logMethodFull?.('_getData', {}, this._$data);
    return this._$data;
  }

  /**
   * Execute all observers and remember data.
   */
  protected _notify(data: T): void {
    this._logger.logMethodArgs?.('_notify', data);
    this._$data = data;
    setTimeout(() => this._$dispatch(data), 0);
  }

  /**
   * Execute all observers callback.
   */
  protected _$dispatch(data: T): void {
    const removeList: Array<Observer<this, T>> = [];

    for (const listener of this._$observers) {
      if (listener.options.disabled) continue;
      if (listener.options.once) removeList.push(listener);

      try {
        const ret = listener.callback.call(this, data);
        if (ret instanceof Promise) {
          ret.catch((err) => this._logger.error('_$dispatch', 'call_listener_failed', err));
        }
      }
      catch (err) {
        this._logger.error('_$dispatch', 'call_listener_failed', err);
      }
    }

    for (const listener of removeList) {
      this.unsubscribe(listener.callback);
    }
  }

  /**
   * Subscribe to context changes.
   */
  subscribe(listenerCallback: ListenerCallback<this, T>, options: SubscribeOptions = {}): SubscribeResult {
    this._logger.logMethodArgs?.('subscribe', {options});

    const _listenerObject: Observer<this, T> = {
      callback: listenerCallback,
      options,
    };

    let callbackExecuted = false;
    const data = this._$data;
    if (data !== undefined && options.receivePrevious === true && options.disabled !== true) {
      // Run callback for old dispatch signal
      callbackExecuted = true;
      setTimeout(() => {
        try {
          const ret = listenerCallback.call(this, data);
          if (ret instanceof Promise) {
            ret.catch((err) => this._logger.error('subscribe.receivePrevious', 'call_signal_callback_failed', err));
          }
        }
        catch (err) {
          this._logger.error('subscribe.receivePrevious', 'call_signal_callback_failed', err);
        }
      }, 0);
    }

    // If once then must remove listener after first callback called! then why push it to listenerList?!
    if (options.once !== true || callbackExecuted === true) {
      if (options.priority === true) {
        this._$observers.unshift(_listenerObject);
      }
      else {
        this._$observers.push(_listenerObject);
      }
    }

    return {
      unsubscribe: this.unsubscribe.bind(this, listenerCallback),
    };
  }

  /**
   * Unsubscribe from context.
   */
  unsubscribe(listenerCallback: ListenerCallback<this, T>): void {
    this._logger.logMethod?.('unsubscribe');
    const listenerIndex = this._$observers.findIndex((listener) => listener.callback === listenerCallback);
    if (listenerIndex !== -1) {
      void this._$observers.splice(listenerIndex, 1);
    }
  }

  /**
   * Clear current data without notify subscribers.
   *
   * `receivePrevious` in new subscribers not work until new a notify changes the data.
   */
  protected _clear(): void {
    this._logger.logMethod?.('_clear');
    this._$data = undefined;
  }

  /**
   * Get the data of next notify.
   */
  protected _untilNewNotify(): Promise<T> {
    this._logger.logMethod?.('_untilNewNotify');
    return new Promise((resolve) => {
      this.subscribe(resolve, {
        once: true,
        priority: true,
        receivePrevious: false,
      });
    });
  }
}
