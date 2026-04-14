import {createEventSignal} from '@alwatr/signal';

export interface EventSignalPayload {
  actionId: string;
  actionPayload: string;
}

/**
 * The shared module-level event signal that carries all dispatched actions.
 * All `AlwatrActionDirective` instances dispatch to this signal, and all
 * `alwatrOn` subscriptions listen to it.
 *
 * @internal
 */
export const eventSignal_ = createEventSignal<EventSignalPayload>({name: 'alwatr-on'});
