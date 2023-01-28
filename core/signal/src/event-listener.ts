import {signalManager} from './signal-manager.js';

import type {Stringifyable, OmitFirstParam} from '@alwatr/type';


/**
 * Event signal listener/subscriber interface.
 */
export const eventListener = {
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
  getLastDetail: signalManager.getDetail,

  /**
   * Wait until new event.
   *
   * Example:
   *
   * ```ts
   * const newSize = await eventTrigger.untilNext<ResizeType>('window-resize');
   * ```
   */
  untilNext: signalManager.untilNext,

  /**
   * Subscribe new listener to an event, work like addEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = eventTrigger.subscribe<ResizeType>('window-resize', (size) => console.log(size));
   * // ...
   * eventTrigger.unsubscribe(listener);
   * ```
   */
  subscribe: signalManager.subscribe,

  /**
   * Unsubscribe listener from event, work like removeEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = eventTrigger.subscribe<ResizeType>('window-resize', (size) => console.log(size));
   * // ...
   * eventTrigger.unsubscribe(listener);
   * ```
   */
  unsubscribe: signalManager.unsubscribe,

  /**
   * Bind this interface to special event.
   *
   * Example:
   *
   * ```ts
   * const resizeEvent = eventTrigger.bind<ResizeType>('window-resize');
   * ```
   */
  bind: <T extends Stringifyable>(eventId: string) => ({
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
    getLastDetail: signalManager.getDetail.bind(null, eventId) as OmitFirstParam<typeof signalManager.getDetail<T>>,

    /**
     * Wait until new event.
     *
     * Example:
     *
     * ```ts
     * const newSize = await resizeEvent.untilNext();
     * ```
     */
    untilNext: signalManager.untilNext.bind(null, eventId) as OmitFirstParam<typeof signalManager.untilNext<T>>,

    /**
     * Subscribe new listener to an event, work like addEventListener.
     *
     * Example:
     *
     * ```ts
     * const listener = resizeEvent.subscribe((size) => console.log(size));
     * // ...
     * resizeEvent.unsubscribe(listener);
     * ```
     */
    subscribe: signalManager.subscribe.bind(null, eventId) as unknown as
      OmitFirstParam<typeof signalManager.subscribe<T>>,

    /**
     * Unsubscribe listener from event, work like removeEventListener.
     *
     * Example:
     *
     * ```ts
     * const listener = resizeEvent.subscribe((size) => console.log(size));
     * // ...
     * resizeEvent.unsubscribe(listener);
     * ```
     */
    unsubscribe: signalManager.unsubscribe,
  } as const),
} as const;
