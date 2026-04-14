import {eventSignal_} from './signal.js';
import type {SubscribeResult} from '@alwatr/signal';

/**
 * Subscribes to actions dispatched by any `alwatr-on` directive on the page.
 *
 * Only invokes `handler` when the dispatched action's `actionId` matches the
 * provided `actionId`. Returns a `SubscribeResult` with an `unsubscribe()`
 * method for cleanup.
 *
 * @param actionId - The action identifier to listen for (e.g. `'open-drawer'`).
 * @param handler  - Callback invoked with the resolved payload string.
 * @returns A subscription result with an `unsubscribe` method.
 *
 * @example
 * ```ts
 * const sub = alwatrOn('open-drawer', (payload) => {
 *   openDrawer(payload); // payload === 'main'
 * });
 *
 * // Later, when cleanup is needed:
 * sub.unsubscribe();
 * ```
 */
export function alwatrOn(actionId: string, handler: (payload: string) => void): SubscribeResult {
  return eventSignal_.subscribe((payload) => {
    if (payload.actionId === actionId) {
      handler(payload.actionPayload);
    }
  });
}
