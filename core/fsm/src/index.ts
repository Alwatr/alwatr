import {defineActions, defineConstructor, defineConstructorSignals} from './core.js';

export {finiteStateMachineConsumer} from './core.js';
export const finiteStateMachineProvider = {
  defineConstructor,
  defineActions,
  defineSignals: defineConstructorSignals,
} as const;

export type {FsmTypeHelper, FsmConstructorConfig} from './type.js';
