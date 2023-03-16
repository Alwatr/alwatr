import {createLogger, globalAlwatr} from '@alwatr/logger';
import {ListenerSpec, contextProvider, contextConsumer} from '@alwatr/signal';

import type {
  ActionRecord,
  FsmConstructor,
  FsmConstructorConfig,
  FsmConsumerInterface,
  FsmInstance,
  FsmState,
  FsmTypeHelper,
  SignalConfig,
} from './type.js';
import type {OmitFirstParam, SingleOrArray, StringifyableRecord} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/fsm',
  version: _ALWATR_VERSION_,
});

const logger = createLogger(`alwatr/fsm`);

/**
 * Finite state machine constructor storage.
 */
const fsmConstructorStorage: Record<string, FsmConstructor | undefined> = {};

export function defineConstructor<
  TState extends string = string,
  TEventId extends string = string,
  TActionName extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(
    id: string,
    config: FsmConstructorConfig<TState, TEventId, TActionName, TContext>,
): FsmConstructorConfig<TState, TEventId, TActionName, TContext> {
  if (fsmConstructorStorage[id] != null) throw new Error('fsm_exist', {cause: {id}});
  fsmConstructorStorage[id] = {
    id,
    config,
    actionRecord: {},
  };
  return config;
}

export const _getFsmInstance = <
  TState extends string = string,
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(
    instanceId: string,
  ): FsmInstance<TState, TEventId, TContext> => {
  logger.logMethodArgs('_getFsmInstance', instanceId);
  const machineInstance = contextConsumer.getValue<FsmInstance<TState, TEventId, TContext>>(instanceId);
  if (machineInstance == null) throw new Error('fsm_undefined', {cause: {instanceId}});
  return machineInstance;
};

export const _getFsmConstructor = (constructorId: string): FsmConstructor => {
  logger.logMethodArgs('_getFsmConstructor', constructorId);
  const machineConstructor = fsmConstructorStorage[constructorId];
  if (machineConstructor == null) throw new Error('fsm_undefined', {cause: {constructorId: constructorId}});
  return machineConstructor;
};

export const getState = <TState extends string = string, TEventId extends string = string>(
  instanceId: string,
): FsmState<TState, TEventId> => {
  logger.logMethodArgs('getState', instanceId);
  const detail = contextConsumer.getValue<FsmInstance<TState, TEventId>>(instanceId);
  if (detail == null) throw new Error('fsm_undefined', {cause: {instanceId}});
  return detail.state;
};
