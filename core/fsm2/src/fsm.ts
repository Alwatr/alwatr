import {FiniteStateMachineBase} from './base.js';

import type {ListenerCallback, SubscribeResult, SubscribeOptions} from '@alwatr/signal2';

/**
 * Finite State Machine Base Class
 */
export abstract class FiniteStateMachine<S extends string, E extends string> extends FiniteStateMachineBase<S, E> {
  /**
   * Current state.
   */
  get state(): S {
    return super._state;
  }

  /**
   * Transition finite state machine instance to new state.
   */
  transition(event: E): void {
    super._transition(event);
  }

  /**
   * Subscribe to context changes.
   */
  subscribe(listenerCallback: ListenerCallback<this, S>, options?: SubscribeOptions): SubscribeResult {
    return super._subscribe(listenerCallback, options);
  }

  /**
   * Unsubscribe from context.
   */
  unsubscribe(listenerCallback: ListenerCallback<this, S>): void {
    return super._unsubscribe(listenerCallback);
  }
}
