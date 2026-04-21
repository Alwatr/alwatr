import {createLogger} from '@alwatr/logger';
import {createEventSignal} from '@alwatr/signal';

export interface EventSignalPayload<T = string> {
  actionId: string;
  actionPayload?: T;
}

export const logger_ = createLogger('alwatr-on');

/**
 * The shared module-level event signal that carries all dispatched actions.
 * All `AlwatrActionDirective` instances dispatch to this signal, and all
 * `alwatrOn` subscriptions listen to it.
 *
 * @internal
 */
export const internalSignal_ = createEventSignal<EventSignalPayload<unknown>>({name: 'alwatr-on'});
