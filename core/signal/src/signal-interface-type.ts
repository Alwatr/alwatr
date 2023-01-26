import {
  _addSignalListener,
  _dispatchSignal,
  _expireSignal,
  _getSignalDetail,
  _getSignalObject,
  _removeSignalListener,
  _requestSignal,
  _setSignalProvider,
  _untilNextSignal,
} from './core.js';

import type {OmitFirstParam} from '@alwatr/type';

export interface SignalInterface<> {
  /**
   * Get signal object by id, If not available, it will create a new signal with default options.
   *
   * Use it with cation!
   *
   * Example:
   *
   * ```ts
   * const signalObject = signals._getObject('content-change');
   * signalObject.disabled = true;
   * ```
   */
  readonly _getObject: typeof _getSignalObject,

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
  readonly getDetail: typeof _getSignalDetail,

  /**
   * Get current context value.
   *
   * alias for `signalConsumer.getDetail`.
   *
   * return undefined if context not provided before or expired.
   *
   * Example:
   *
   * ```ts
   * const currentContent = await contextConsumer.getValue<ContentType>('content');
   * if (currentContent == null) {
   *   // signal not dispatched yet
   * }
   * ```
   */
  readonly getValue: typeof _getSignalDetail,

  /**
   * Resolved with signal detail when new signal received.
   *
   * Example:
   *
   * ```ts
   * const newContent = await signals.untilNext<ContentType>('content-change');
   * ```
   */
  readonly untilNext: typeof _untilNextSignal,

  /**
   * Adds a new listener to a signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signals.addListener<ContentType>('content-change', (content) => console.log(content));
   * ```
   */
  readonly addListener: typeof _addSignalListener,

  /**
   * Subscribe to a context changes.
   *
   * alias for `signalConsumer.addListener`.
   *
   * Example:
   *
   * ```ts
   * const listener = contextConsumer.subscribe<ContentType>('content', (content) => console.log(content));
   * ```
   */
  readonly subscribe: typeof _addSignalListener,

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
  readonly removeListener: typeof _removeSignalListener,

  /**
   * Unsubscribe from a context changes.
   *
   * alias for `signalConsumer.removeListener`.
   *
   * Example:
   *
   * ```ts
   * const listener = contextConsumer.unsubscribe<ContentType>('content', (content) => console.log(content));
   * ...
   * signals.removeListener(listener);
   * ```
   */
  readonly unsubscribe: typeof _removeSignalListener,

  /**
   * Dispatch (send) signal to all listeners.
   *
   * Example:
   *
   * ```ts
   * signals.dispatch<ContentType>('content-change', newContent);
   * ```
   */
  readonly dispatch: typeof _dispatchSignal,

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
  readonly setProvider: typeof _setSignalProvider,

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
  readonly request: typeof _requestSignal,

  /**
   * Clear current signal detail without dispatch new signal
   *
   * note: receivePrevious not work until new signal
   */
  readonly expire: typeof _expireSignal,
}


export interface BoundSignalInterface<
  TSignal extends Record<string, unknown>,
  TRequest extends Record<string, unknown> = Record<string, never>
> {
  /**
   * Bound Signal Id.
   */
  readonly id: string,

  /**
   * Get signal object by id, If not available, it will create a new signal with default options.
   *
   * Use it with cation!
   *
   * Example:
   *
   * ```ts
   * const signalObject = signal._getObject();
   * signalObject.disabled = true;
   * ```
   */
  readonly _getObject: OmitFirstParam<typeof _getSignalObject<TSignal>>,

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
  readonly getDetail: OmitFirstParam<typeof _getSignalDetail<TSignal>>;

  /**
   * Resolved with signal detail when new signal received.
   *
   * Example:
   *
   * ```ts
   * const newContent = await signals.untilNext<ContentType>('content-change');
   * ```
   */
  readonly untilNext: OmitFirstParam<typeof _untilNextSignal<TSignal>>;

  /**
   * Adds a new listener to a signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signals.addListener<ContentType>('content-change', (content) => console.log(content));
   * ```
   */
  readonly addListener: OmitFirstParam<typeof _addSignalListener<TSignal>>;

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
  readonly removeListener: OmitFirstParam<typeof _removeSignalListener>;

  /**
   * Dispatch (send) signal to all listeners.
   *
   * Example:
   *
   * ```ts
   * signals.dispatch<ContentType>('content-change', newContent);
   * ```
   */
  readonly dispatch: OmitFirstParam<typeof _dispatchSignal<TSignal>>;

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
  readonly setProvider: OmitFirstParam<typeof _setSignalProvider<TSignal, TRequest>>;

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
  readonly request: OmitFirstParam<typeof _requestSignal<TRequest>>;

  /**
   * Clear current signal detail without dispatch new signal
   *
   * note: receivePrevious not work until new signal
   */
  readonly expire: OmitFirstParam<typeof _expireSignal>;
}
