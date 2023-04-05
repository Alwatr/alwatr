import {defineActions, defineConstructor, defineConstructorSignals, subscribe} from './core.js';

export {finiteStateMachineConsumer} from './core.js';

/**
 * Finite State Machine Provider.
 */
export const finiteStateMachineProvider = {
  defineConstructor,
  defineActions,
  defineSignals: defineConstructorSignals,
  subscribe,
} as const;

export type {FsmTypeHelper, FsmConstructorConfig, FsmConsumerInterface} from './type.js';
