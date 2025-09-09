import {AlwatrFluxStateMachineBase} from './base.js';

/**
 * Flux (Finite) State Machine Base Class
 */
export abstract class AlwatrFluxStateMachine<S extends string, E extends string> extends AlwatrFluxStateMachineBase<S, E> {
  /**
   * Current state.
   */
  get state(): S {
    return this.message_.state;
  }

  /**
   * Transition flux state machine instance to new state.
   */
  transition(event: E): void {
    this.transition_(event);
  }

  /**
   * Reset machine to initial state without notify.
   */
  resetToInitialState(): void {
    this.resetToInitialState_();
  }
}
