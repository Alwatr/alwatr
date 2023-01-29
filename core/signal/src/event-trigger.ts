import {dispatch, getDetail} from './core.js';

import type {Stringifyable, OmitFirstParam} from '@alwatr/type';

/**
 * Event signal trigger/dispatcher interface.
 */
export const eventTrigger = {
  /**
   * Get last event dispatched detail.
   *
   * Return undefined if signal not dispatched before or expired.
   *
   * Example:
   *
   * ```ts
   * const currentSize = eventTrigger.getLastDetail<ResizeType>('window-resize');
   * if (currentSize === undefined) {
   *   // event-signal not dispatched yet
   * }
   * ```
   */
  getLastDetail: getDetail,

  /**
   * Dispatch (send) signal to all listeners.
   *
   * Signal detail changed immediately without any debounce.
   *
   * Example:
   *
   * ```ts
   * eventTrigger.dispatch<ResizeType>('window-resize', newSize);
   * ```
   */
  dispatch: dispatch,

  /**
   * Bind this interface to special event.
   *
   * Example:
   *
   * ```ts
   * const resizeEvent = eventTrigger.bind<ResizeType>('window-resize');
   * ```
   */
  bind: <T extends Stringifyable>(eventId: string) =>({
    /**
     * Event signal Id.
     */
    id: eventId,

    /**
     * Get last event dispatched detail.
     *
     * Return undefined if signal not dispatched before or expired.
     *
     * Example:
     *
     * ```ts
     * const currentSize = resizeEvent.getLastDetail();
     * if (currentSize === undefined) {
     *   // signal not dispatched yet
     * }
     * ```
     */
    getLastDetail: getDetail.bind(null, eventId) as OmitFirstParam<typeof getDetail<T>>,

    /**
     * Dispatch (send) signal to all listeners.
     *
     * Signal detail changed immediately without any debounce.
     *
     * Example:
     *
     * ```ts
     * resizeEvent.dispatch(newSize);
     * ```
     */
    dispatch: dispatch.bind(null, eventId) as OmitFirstParam<typeof dispatch<T>>,
  } as const),
} as const;
