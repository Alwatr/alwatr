import {createEventSignal} from '@alwatr/signal';

export interface EventSignalPayload {
  actionId: string;
  actionPayload: string;
  /**
   * The DOM event that triggered this dispatch.
   *
   * For standard DOM event types (e.g. 'click', 'input'), this is the original browser Event.
   * For the special 'init' event type, this is a synthetic CustomEvent dispatched on the element
   * via `element_.dispatchEvent(new CustomEvent('init', {bubbles: false, cancelable: false}))`,
   * so `event.target === element_` and `event.type === 'init'`.
   *
   * Always present — never undefined.
   */
  event: Event;
}

/**
 * The shared module-level event signal that carries all dispatched actions.
 * All `AlwatrActionDirective` instances dispatch to this signal, and all
 * `alwatrOn` subscriptions listen to it.
 *
 * @internal
 */
export const eventSignal_ = createEventSignal<EventSignalPayload>({name: 'alwatr-on'});
