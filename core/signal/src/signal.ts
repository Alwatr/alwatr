import {
  _addSignalListener,
  _dispatchSignal,
  _getSignalDetail,
  _removeSignalListener,
  _setSignalProvider,
} from './core.js';

export const signal = {
  /**
   * Get current signal value
   * return undefined if signal not dispatched before (or expired).
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
   * @example
   * signal.dispatch<Content>('content-change', newContent);
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
} as const;
