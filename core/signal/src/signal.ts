import {
  _addSignalListener,
  _dispatchSignal,
  _getSignalDetail,
  _removeSignalListener,
  _setSignalProvider,
  _untilNextSignal,
} from './core.js';

export const signal = {
  /**
   * Get current signal detail
   * return undefined if signal not dispatched before (or expired).
   *
   * Example:
   *
   * ```ts
   * const currentContent = await signal.getDetail<ContentType>('content-change');
   * if (currentContent == null) {
   *   // signal not dispatched yet
   * }
   * ```
   */
  getDetail: _getSignalDetail,

  /**
   * Adds a new listener to a signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signal.addListener<ContentType>('content-change', (content) => console.log(content));
   * ```
   */
  addListener: _addSignalListener,

  /**
   * Removes a listener from the signal.
   *
   * Example:
   *
   * ```ts
   * const listener = signal.addListener<ContentType>('content-change', (content) => console.log(content));
   * ...
   * signal.removeListener(listener);
   * ```
   */
  removeListener: _removeSignalListener,

  /**
   * Dispatch (send) signal to all listeners.
   *
   * Example:
   *
   * ```ts
   * signal.dispatch<ContentType>('content-change', newContent);
   * ```
   */
  dispatch: _dispatchSignal,

  /**
   * Defines the provider of the signal that will be called when the signal requested (addRequestSignalListener).
   *
   * Example:
   *
   * ```ts
   * signal.setProvider('content-change', async (requestParam) => {
   *   const content = await fetchNewContent(requestParam);
   *   if (content != null) {
   *     return content; // Dispatch signal 'content-change' with content.
   *   }
   *   else {
   *     signal.dispatch('content-not-found', {});
   *   }
   * });
   * ```
   */
  setProvider: _setSignalProvider,

  /**
   * Resolved with signal detail when new signal received.
   *
   * Example:
   *
   * ```ts
   * const newContent = await signal.untilNext<ContentType>('content-change');
   * ```
   */
  untilNext: _untilNextSignal,
} as const;
