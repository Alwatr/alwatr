import {internalSignal_, logger_} from './lib.js';
import type {SubscribeResult} from '@alwatr/signal';

/**
 * Subscribes to actions dispatched by any `alwatr-on` directive on the page.
 *
 * Only invokes `handler` when the dispatched action's `actionId` matches the
 * provided `actionId`. Returns a `SubscribeResult` with an `unsubscribe()`
 * method for cleanup.
 *
 * @param actionId - The action identifier to listen for (e.g. `'open-drawer'`).
 * @param handler  - Callback invoked with the resolved payload string and the
 *                   originating DOM event (always a valid `Event` — never `undefined`).
 * @returns A subscription result with an `unsubscribe` method.
 *
 * @example
 * ```ts
 * const sub = alwatrOn('open-drawer', (payload, event) => {
 *   console.log('open drawer:', payload); // 'main'
 *   console.log('triggered by:', event.type); // 'click'
 * });
 *
 * // Later, when cleanup is needed:
 * sub.unsubscribe();
 * ```
 */
export function alwatrOn<TEvent extends Event = Event>(
  actionId: string,
  handler: (payload?: string, event?: TEvent) => void,
): SubscribeResult {
  logger_.logMethodArgs?.('alwatrOn.register', {actionId});
  return internalSignal_.subscribe((payload) => {
    if (payload.actionId === actionId) {
      logger_.logMethodArgs?.('alwatrOn.handler', {actionId, payload});
      handler(payload.actionPayload, payload.event as TEvent);
    }
  });
}

/**
 * Dispatches an action signal that can be listened to by any `alwatr-on` directive on the page.
 */
export function alwatrDispatch(actionId: string, actionPayload?: string): void {
  logger_.logMethodArgs?.('alwatrDispatch', {actionId, actionPayload});
  internalSignal_.dispatch({actionId, actionPayload});
}
