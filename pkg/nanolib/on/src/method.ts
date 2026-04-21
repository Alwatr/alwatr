import {internalSignal_, logger_} from './lib.js';
import type {SubscribeResult} from '@alwatr/signal';
import {modifierRegistry, payloadRegistry, type ModifierHandler, type PayloadResolver} from './registry.js';

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
export function alwatrOn<T = string>(actionId: string, handler: (payload?: T) => void): SubscribeResult {
  logger_.logMethodArgs?.('alwatrOn.register', {actionId});
  return internalSignal_.subscribe((payload) => {
    if (payload.actionId === actionId) {
      logger_.logMethodArgs?.('alwatrOn.handler', {actionId, payload});
      handler(payload.actionPayload as T);
    }
  });
}

/**
 * Dispatches an action signal that can be listened to by any `alwatr-on` directive on the page.
 * The `actionId` is a string identifier for the action, and `actionPayload` is an optional value
 * that will be passed to handlers subscribed to this action.
 */
export function alwatrDispatch<T = string>(actionId: string, actionPayload?: T): void {
  logger_.logMethodArgs?.('alwatrDispatch', {actionId, actionPayload});
  internalSignal_.dispatch({actionId, actionPayload});
}

/**
 * Registers a custom modifier handler that can be used in `alwatr-on` directives.
 *
 * @param name - The name of the modifier (e.g. 'debounce').
 * @param handler - A function that will be called with the event when the modifier is used.
 *                  Should return `true` to allow the action to proceed, or `false` to block it.
 *
 * @example
 * ```ts
 * registerModifier('validate', function (event) {
 *   return this.element_.checkValidity(); // Only allow the action if the element (e.g. a form) is valid
 * });
 * ```
 * ```html
 * <form alwatr-on="submit.prevent.validate->submit-form" novalidate>
 *   <!-- The 'submit-form' action will only be dispatched if the form is valid -->
 * </form>
 * ```
 */
export function registerModifier(name: string, handler: ModifierHandler): void {
  logger_.logMethodArgs?.('registerModifier', {name});
  if (modifierRegistry.has(name)) {
    logger_.accident('registerModifier', 'modifier_already_registered', {name});
  }
  modifierRegistry.set(name, handler);
}

/**
 * Registers a custom payload resolver that can be used in `alwatr-on` directives.
 * A payload resolver is a function that computes the payload value at dispatch time based on the event.
 * For example, a resolver named `$value` could return the current value of an input element.
 *
 * @param name - The name of the payload resolver (e.g. '$value').
 * @param resolver - A function that will be called with the event when the payload needs to be resolved.
 *                   Should return the computed payload value.
 *
 * @example
 * ```ts
 * registerPayloadResolver('$value', function (event) {
 *   return this.element_.value; // Resolve the payload to the current value of the element
 * });
 * ```
 * ```html
 * <input alwatr-on="input->search-query:$value" />
 * <!-- When the user types, this will dispatch 'search-query' with the input's current value as the payload -->
 * ```
 */
export function registerPayloadResolver(name: string, resolver: PayloadResolver): void {
  logger_.logMethodArgs?.('registerPayloadResolver', {name});
  if (payloadRegistry.has(name)) {
    logger_.accident('registerPayloadResolver', 'payload_resolver_already_registered', {name});
  }
  payloadRegistry.set(name, resolver);
}
