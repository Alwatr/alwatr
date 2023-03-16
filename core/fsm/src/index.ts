import {defineActions, defineConstructor} from './core.js';

export {finiteStateMachineConsumer} from './core.js';
export const finiteStateMachineProvider = {
  defineConstructor,
  defineActions,
} as const;

export type {FsmTypeHelper, FsmConstructorConfig} from './type.js';
