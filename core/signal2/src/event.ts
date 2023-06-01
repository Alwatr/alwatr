import {createLogger, globalAlwatr} from '@alwatr/logger';

import type {MaybePromise} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/signal2/event',
  version: _ALWATR_VERSION_,
});

/**
 * Subscribe options type.
 */
export interface EventSubscribeOptions {
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
}

export interface EventConfig<TDetail> {
  name: string;
  debounce: 'AnimationFrame' | number;
  detail?: TDetail;
}

export type EventListenerCallback<TDetail = unknown> = (detail?: TDetail) => MaybePromise<void>;

export interface EventListenerObject<TDetail> {
  callback: EventListenerCallback<TDetail>;
  options: EventSubscribeOptions;
}

export interface EventSubscribeResult {
  unsubscribe: () => void;
}

/**
 * Alwatr event.
 */
export class AlwatrEvent<TDetail = unknown> {
  private __debounced = false;

  protected _logger;
  protected _listenerList: Array<EventListenerObject<TDetail>> = [];

  constructor(protected _config: EventConfig<TDetail>) {
    this._logger = createLogger(`{event: ${_config.name}}`);
  }

  /**
   * Dispatch(send) an event to all listeners.
   */
  dispatch(): void {
    this._logger.logMethod?.('dispatch');

    if (this.__debounced === true) {
      return; // last dispatch in progress.
    }

    // else
    this.__debounced = true;
    const executeListeners = (): void => {
      this._executeListeners();
      this.__debounced = false;
    };
    this._config.debounce === 'AnimationFrame'
      ? requestAnimationFrame(executeListeners)
      : setTimeout(executeListeners, this._config.debounce);
  }

  protected _executeListeners(): void {
    this._logger.logMethod?.('_executeListeners');

    const removeList: Array<EventListenerObject<TDetail>> = [];

    for (const listener of this._listenerList) {
      if (listener.options.disabled) continue;
      if (listener.options.once) removeList.push(listener);

      try {
        const ret = listener.callback(this._config.detail);
        if (ret instanceof Promise) {
          ret.catch((err) => this._logger.error('_callListeners', 'call_listener_failed', err));
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
  subscribe(
      listenerCallback: EventListenerCallback<TDetail>,
      options: EventSubscribeOptions = {},
  ): EventSubscribeResult {
    this._logger.logMethodArgs?.('subscribe', {options});

    const _listenerObject: EventListenerObject<TDetail> = {
      callback: listenerCallback,
      options,
    };

    let callbackExecuted = false;
    const detail = this._config.detail;
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
  unsubscribe(listenerCallback: EventListenerCallback<TDetail>): void {
    this._logger.logMethod?.('unsubscribe');
    const listenerIndex = this._listenerList.findIndex((listener) => listener.callback === listenerCallback);
    if (listenerIndex !== -1) {
      void this._listenerList.splice(listenerIndex, 1);
    }
  }
}
