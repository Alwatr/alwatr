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

export const getContext = <TContext extends StringifyableRecord = StringifyableRecord>(
  instanceId: string,
): TContext => {
  logger.logMethodArgs('getContext', instanceId);
  return _getFsmInstance(instanceId).context as TContext;
};

export const setContext = <TContext extends StringifyableRecord = StringifyableRecord>(
  instanceId: string,
  context: Partial<TContext>,
  notify?: boolean,
): void => {
  logger.logMethodArgs('setContext', {instanceId, context});
  const detail = _getFsmInstance(instanceId);
  detail.context = {
    ...detail.context,
    ...context,
  };

  if (notify) {
    contextProvider.setValue(instanceId, detail, {debounce: 'NextCycle'});
  }
};

export const transition = <
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(
    instanceId: string,
    event: TEventId,
    context?: Partial<TContext>,
  ): void => {
  const fsmInstance = _getFsmInstance(instanceId);
  const fsmConstructor = _getFsmConstructor(fsmInstance.constructorId);
  const fromState = fsmInstance.state.target;
  const stateRecord = fsmConstructor.config.stateRecord;
  const transitionConfig = stateRecord[fromState]?.on[event] ?? stateRecord.$all.on[event];

  logger.logMethodArgs('transition', {instanceId, fromState, event, context, target: transitionConfig?.target});

  if (context !== undefined) {
    fsmInstance.context = {
      ...fsmInstance.context,
      ...context,
    };
  }

  if (transitionConfig == null) {
    logger.incident(
        'transition',
        'invalid_target_state',
        'Defined target state for this event not found in state config',
        {
          fromState,
          event,
          events: {
            ...stateRecord.$all?.on,
            ...stateRecord[fromState]?.on,
          },
        },
    );
    return;
  }

  const consumerInterface = finiteStateMachineConsumer(instanceId);

  if (transitionConfig.condition) {
    if (_execAction(fsmConstructor, transitionConfig.condition, consumerInterface) === false) return;
  }

  fsmInstance.state = {
    target: transitionConfig.target ?? fromState,
    from: fromState,
    by: event,
  };

  contextProvider.setValue(instanceId, fsmInstance, {debounce: 'NextCycle'});

  _execAllActions(fsmConstructor, fsmInstance.state, consumerInterface);
};

export function defineActions<T extends FsmTypeHelper>(constructorId: string, actionRecord: ActionRecord<T>): void {
  const constructor = _getFsmConstructor(constructorId);
  constructor.actionRecord = {
    ...constructor.actionRecord,
    ...actionRecord,
  };
}

