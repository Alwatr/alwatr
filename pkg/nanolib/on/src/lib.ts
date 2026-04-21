import {createLogger} from '@alwatr/logger';
import {createEventSignal} from '@alwatr/signal';

export interface EventSignalPayload<TEvent extends Event = Event> {
  actionId: string;
  actionPayload?: string;
  /**
   * The DOM event that triggered this dispatch.
   */
  event?: TEvent;
}

export const logger_ = createLogger('alwatr-on');

/**
 * The shared module-level event signal that carries all dispatched actions.
 * All `AlwatrActionDirective` instances dispatch to this signal, and all
 * `alwatrOn` subscriptions listen to it.
 *
 * @internal
 */
export const eventSignal_ = createEventSignal<EventSignalPayload>({name: 'alwatr-on'});
