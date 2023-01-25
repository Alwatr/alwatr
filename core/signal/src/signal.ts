import {
  _addSignalListener,
  _dispatchSignal,
  _expireSignal,
  _getSignalDetail,
  _removeSignalListener,
  _requestSignal,
  _setSignalProvider,
  _untilNextSignal,
} from './core.js';

import type {OmitFirstParam} from '@alwatr/type';

export interface SignalControllerInterface<T extends Record<string, unknown>> {
  /**
   * Get current signal detail.
   *
   * return undefined if signal not dispatched before or expired.
   *
   * Example:
   *
   * ```ts
   * const currentContent = await signal.getDetail();
   * if (currentContent == null) {
   *   // signal not dispatched yet
   * }
   * ```
   */
  getDetail: OmitFirstParam<typeof _getSignalDetail<T>>,

  /**
   * Resolved with signal detail when new signal received.
   *
   * Example:
   *
   * ```ts
   * const newContent = await signals.untilNext<ContentType>('content-change');
   * ```
   */
  untilNext: OmitFirstParam<typeof _untilNextSignal<T>>,

  /**
   * Adds a new listener to a signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signals.addListener<ContentType>('content-change', (content) => console.log(content));
   * ```
   */
  addListener: OmitFirstParam<typeof _addSignalListener<T>>,

  /**
   * Removes a listener from a signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signals.addListener<ContentType>('content-change', (content) => console.log(content));
   * ...
   * signals.removeListener(listener);
   * ```
   */
  removeListener: OmitFirstParam<typeof _removeSignalListener<T>>,

  /**
   * Dispatch (send) signal to all listeners.
   *
   * Example:
   *
   * ```ts
   * signals.dispatch<ContentType>('content-change', newContent);
   * ```
   */
  dispatch: OmitFirstParam<typeof _dispatchSignal<T>>,

  /**
   * Defines the provider of the signal that will be called when the signal requested (addRequestSignalListener).
   *
   * Example:
   *
   * ```ts
   * signals.setProvider('content-change', async (requestParam) => {
   *   const content = await fetchNewContent(requestParam);
   *   if (content != null) {
   *     return content; // Dispatch signal 'content-change' with content.
   *   }
   *   else {
   *     signals.dispatch('content-not-found', {});
   *   }
   * });
   * ```
   */
  setProvider: OmitFirstParam<typeof _setSignalProvider<T>>,

  /**
   * Dispatch request signal.
   *
   * Example:
   *
   * ```ts
   * signals.request<RequestContentType>('content-change', {foo: 'bar'});
   * const newContent = await signals.untilNext<ContentType>('content-change');
   * ```
   */
  request: OmitFirstParam<typeof _requestSignal<T>>,

  /**
   * Clear current signal detail without dispatch new signal
   *
   * note: receivePrevious not work until new signal
   */
  expire: OmitFirstParam<typeof _expireSignal>,
}

export const signals = {
  /**
   * Get current signal detail.
   *
   * return undefined if signal not dispatched before or expired.
   *
   * Example:
   *
   * ```ts
   * const currentContent = await signals.getDetail<ContentType>('content-change');
   * if (currentContent == null) {
   *   // signal not dispatched yet
   * }
   * ```
   */
  getDetail: _getSignalDetail,

  /**
   * Resolved with signal detail when new signal received.
   *
   * Example:
   *
   * ```ts
   * const newContent = await signals.untilNext<ContentType>('content-change');
   * ```
   */
  untilNext: _untilNextSignal,

  /**
   * Adds a new listener to a signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signals.addListener<ContentType>('content-change', (content) => console.log(content));
   * ```
   */
  addListener: _addSignalListener,

  /**
   * Removes a listener from a signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signals.addListener<ContentType>('content-change', (content) => console.log(content));
   * ...
   * signals.removeListener(listener);
   * ```
   */
  removeListener: _removeSignalListener,

  /**
   * Dispatch (send) signal to all listeners.
   *
   * Example:
   *
   * ```ts
   * signals.dispatch<ContentType>('content-change', newContent);
   * ```
   */
  dispatch: _dispatchSignal,

  /**
   * Defines the provider of the signal that will be called when the signal requested (addRequestSignalListener).
   *
   * Example:
   *
   * ```ts
   * signals.setProvider('content-change', async (requestParam) => {
   *   const content = await fetchNewContent(requestParam);
   *   if (content != null) {
   *     return content; // Dispatch signal 'content-change' with content.
   *   }
   *   else {
   *     signals.dispatch('content-not-found', {});
   *   }
   * });
   * ```
   */
  setProvider: _setSignalProvider,

  /**
   * Dispatch request signal.
   *
   * Example:
   *
   * ```ts
   * signals.request<RequestContentType>('content-change', {foo: 'bar'});
   * const newContent = await signals.untilNext<ContentType>('content-change');
   * ```
   */
  request: _requestSignal,

  /**
   * Clear current signal detail without dispatch new signal
   *
   * note: receivePrevious not work until new signal
   */
  expire: _expireSignal,

  bind: _bindSignal,
} as const;

function _bindSignal<T extends Record<string, unknown>>(signalId: string): SignalControllerInterface<T> {
  return {
    getDetail: _getSignalDetail.bind(signals, signalId),
    untilNext: _untilNextSignal.bind(signals, signalId),
    addListener: _addSignalListener.bind(signals, signalId),
    removeListener: _removeSignalListener.bind(signals),
    dispatch: _dispatchSignal.bind(signals, signalId),
    setProvider: _setSignalProvider.bind(signals, signalId),
    request: _requestSignal.bind(signals, signalId),
    expire: _expireSignal.bind(signals, signalId),
  } as SignalControllerInterface<T>;
}

/*
TODO:
  1. change signal option like disable
  2. Get signal value promise
    (Get signal value from last dispatched signal (if any) or wait for new signal received.)
  3. dispatched bool
*/
