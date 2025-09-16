import {StateMachine} from './state-machine.js';

import type {EventObject, StateMachineConfig} from './types.js';

/**
 * Factory function for creating a new StateMachine instance.
 * This provides a convenient, functional-style entry point.
 *
 * @param config The configuration object for the state machine.
 * @returns A new instance of the StateMachine class.
 *
 * @example
 * const simpleMachine = createStateMachine({
 * name: 'simple-toggle',
 * initialState: 'inactive',
 * initialContext: { count: 0 },
 * states: {
 * inactive: { on: { TOGGLE: 'active' } },
 * active: { on: { TOGGLE: 'inactive' } },
 * },
 * });
 */
export function createStateMachine<TState extends string, TEvent extends EventObject<string>, TContext extends Record<string, unknown>>(
  config: StateMachineConfig<TState, TEvent, TContext>,
): StateMachine<TState, TEvent, TContext> {
  return new StateMachine(config);
}
