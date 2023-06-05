import {createLogger} from '@alwatr/logger';

import type {SubscribeOptions, ListenerCallback, ListenerObject, SubscribeResult as SubscribeResult} from './type.js';

/**
 * Alwatr base signal.
 */
export abstract class AlwatrBaseSignal<TDetail> {
  protected _logger;
  protected _$detail?: TDetail;
  protected _$listenerList: Array<ListenerObject<TDetail>> = [];

  constructor(protected name: string, loggerPrefix: string) {
    this._logger = createLogger(`{${loggerPrefix}: ${name}}`);
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

    const removeList: Array<ListenerObject<TDetail>> = [];

    for (const listener of this._$listenerList) {
      if (listener.options.disabled) continue;
      if (listener.options.once) removeList.push(listener);

      try {
        const ret = listener.callback(this._$detail);
        if (ret instanceof Promise) {
          ret.catch((err) => this._logger.error('_executeListeners', 'call_listener_failed', err));
        }
      }
      catch (err) {
        this._logger.error('_executeListeners', 'call_listener_failed', err);
      }
    }

    for (const listener of removeList) {
      this.unsubscribe(listener.callback);
    }
  }

  /**
   * Subscribe to context changes.
   */
  subscribe(listenerCallback: ListenerCallback<TDetail>, options: SubscribeOptions = {}): SubscribeResult {
    this._logger.logMethodArgs?.('subscribe', {options});

    const _listenerObject: ListenerObject<TDetail> = {
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
          listenerCallback(detail);
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
      unsubscribe: this.unsubscribe.bind(this, listenerCallback),
    };
  }

  /**
   * Unsubscribe from context.
   */
  unsubscribe(listenerCallback: ListenerCallback<TDetail>): void {
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
      this.subscribe(resolve, {
        once: true,
        priority: true,
        receivePrevious: false,
      });
    });
  }
}
