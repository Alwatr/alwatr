import {FiniteStateMachineBase} from './base.js';

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
  async transition(event: E): Promise<void> {
    await super._transition(event);
  }
}
