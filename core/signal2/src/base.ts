import {createLogger} from '@alwatr/logger';

import type {SubscribeOptions, ListenerCallback, ListenerObject, SubscribeResult as SubscribeResult} from './type.js';

/**
 * Alwatr base signal.
 */
export abstract class AlwatrBaseSignal<TDetail> {
  protected _name;
  protected _logger;
  protected _$detail?: TDetail;
  protected _$listenerList: Array<ListenerObject<this, TDetail>> = [];

  constructor(config: {name: string; loggerPrefix?: string}) {
    config.loggerPrefix ??= 'signal';
    this._name = config.name;
    this._logger = createLogger(`{${config.loggerPrefix}: ${this._name}}`);
    this._logger.logMethod?.('constructor');
  }

  /**
   * Get detail.
   *
   * Return undefined if context not set before or expired.
   */
  protected _getDetail(): TDetail | undefined {
    this._logger.logMethodFull?.('_getDetail', {}, this._$detail);
    return this._$detail;
  }

  /**
   * change _detail and execute all listeners.
   */
  protected _dispatch(detail: TDetail): void {
    this._logger.logMethodArgs?.('_dispatch', {detail});
    this._$detail = detail;
    setTimeout(() => this._$executeListeners(), 0);
  }

  /**
   * Execute all listeners callback.
   */
  protected _$executeListeners(): void {
    this._logger.logMethod?.('_$executeListeners');
    if (this._$detail === undefined) return;

    const removeList: Array<ListenerObject<this, TDetail>> = [];

    for (const listener of this._$listenerList) {
      if (listener.options.disabled) continue;
      if (listener.options.once) removeList.push(listener);

      try {
        const ret = listener.callback.call(this, this._$detail);
        if (ret instanceof Promise) {
          ret.catch((err) => this._logger.error('_executeListeners', 'call_listener_failed', err));
        }
      }
      catch (err) {
        this._logger.error('_executeListeners', 'call_listener_failed', err);
      }
    }

    for (const listener of removeList) {
      this._unsubscribe(listener.callback);
    }
  }

  /**
   * Subscribe to context changes.
   */
  protected _subscribe(
      listenerCallback: ListenerCallback<this, TDetail>,
      options: SubscribeOptions = {},
  ): SubscribeResult {
    this._logger.logMethodArgs?.('subscribe', {options});

    const _listenerObject: ListenerObject<this, TDetail> = {
      callback: listenerCallback,
      options,
    };

    let callbackExecuted = false;
    const detail = this._$detail;
    if (detail !== undefined && options.receivePrevious === true && options.disabled !== true) {
      // Run callback for old dispatch signal
      callbackExecuted = true;
      setTimeout(() => {
        try {
          listenerCallback.call(this, detail);
        }
        catch (err) {
          this._logger.error('subscribe.receivePrevious', 'call_signal_callback_failed', err);
        }
      }, 0);
    }

    // if once then must remove listener after fist callback called! then why push it to listenerList?!
    if (options.once !== true || callbackExecuted === true) {
      if (options.priority === true) {
        this._$listenerList.unshift(_listenerObject);
      }
      else {
        this._$listenerList.push(_listenerObject);
      }
    }

    return {
      unsubscribe: this._unsubscribe.bind(this, listenerCallback),
    };
  }

  /**
   * Unsubscribe from context.
   */
  protected _unsubscribe(listenerCallback: ListenerCallback<this, TDetail>): void {
    this._logger.logMethod?.('unsubscribe');
    const listenerIndex = this._$listenerList.findIndex((listener) => listener.callback === listenerCallback);
    if (listenerIndex !== -1) {
      void this._$listenerList.splice(listenerIndex, 1);
    }
  }

  /**
   * Clear current context detail without notify subscribers.
   *
   * `receivePrevious` in new subscribers not work until new context changes.
   */
  protected _expire(): void {
    this._logger.logMethod?.('expire');
    this._$detail = undefined;
  }

  /**
   * Get the detail of the next context changes.
   */
  protected _untilChange(): Promise<TDetail> {
    this._logger.logMethod?.('untilNext');
    return new Promise((resolve) => {
      this._subscribe(resolve, {
        once: true,
        priority: true,
        receivePrevious: false,
      });
    });
  }
}
