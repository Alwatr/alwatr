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

export const defineConstructor = <
  TState extends string = string,
  TEventId extends string = string,
  TActionName extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(
    id: string,
    config: FsmConstructorConfig<TState, TEventId, TActionName, TContext>,
  ): FsmConstructorConfig<TState, TEventId, TActionName, TContext> => {
  logger.logMethodArgs('defineConstructor', {id, config});
  if (fsmConstructorStorage[id] != null) throw new Error('fsm_exist', {cause: {id}});
  fsmConstructorStorage[id] = {
    id,
    config,
    actionRecord: {},
  };
  return config;
};

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

export const defineActions = <T extends FsmTypeHelper>(constructorId: string, actionRecord: ActionRecord<T>): void => {
  logger.logMethodArgs('defineActions', {constructorId, actionRecord});
  const constructor = _getFsmConstructor(constructorId);
  constructor.actionRecord = {
    ...constructor.actionRecord,
    ...actionRecord,
  };
};

export const _execAllActions = (
    constructor: FsmConstructor,
    state: FsmState,
    consumerInterface: FsmConsumerInterface,
): void => {
  logger.logMethodArgs('_execAllActions', consumerInterface.id);

  const stateRecord = constructor.config.stateRecord;

  if (state.by === 'INIT') {
    _execAction(constructor, stateRecord.$all.entry, consumerInterface);
    _execAction(constructor, stateRecord[state.target]?.entry, consumerInterface);
    return;
  }

  // else
  if (state.from !== state.target) {
    _execAction(constructor, stateRecord.$all.exit, consumerInterface);
    _execAction(constructor, stateRecord[state.from]?.exit, consumerInterface);
    _execAction(constructor, stateRecord.$all.entry, consumerInterface);
    _execAction(constructor, stateRecord[state.target]?.entry, consumerInterface);
  }

  _execAction(
      constructor,
    stateRecord[state.from]?.on[state.by] != null
      ? stateRecord[state.from].on[state.by]?.actions
      : stateRecord.$all.on[state.by]?.actions,
    consumerInterface,
  );
};

export const _execAction = (
    constructor: FsmConstructor,
    actionNames: SingleOrArray<string> | undefined,
    finiteStateMachine: FsmConsumerInterface,
    signalDetail?: unknown,
): boolean | void => {
  if (actionNames == null) return;
  logger.logMethodArgs('execAction', actionNames);

  if (Array.isArray(actionNames)) {
    return actionNames
        .map((actionName) => _execAction(constructor, actionName, finiteStateMachine, signalDetail))
        .every((r) => r === true);
  }

  try {
    const actionFn = constructor.actionRecord[actionNames];
    if (actionFn == null) {
      return logger.error('execAction', 'action_not_found', {
        actionNames,
        constructorId: constructor.id,
        instanceId: finiteStateMachine.id,
      });
    }
    return actionFn(finiteStateMachine, signalDetail);
  }
  catch (error) {
    return logger.error('execAction', 'action_error', error, {
      actionNames,
      constructorId: constructor.id,
      instanceId: finiteStateMachine.id,
    });
  }
};

export const initFsmInstance = (constructorId: string, instanceId: string): void => {
  logger.logMethodArgs('initializeMachine', {constructorId, instanceId});
  const {initial, context} = _getFsmConstructor(constructorId).config;
  contextProvider.setValue<FsmInstance>(
      instanceId,
      {
        constructorId,
        state: {
          target: initial,
          from: initial,
          by: 'INIT',
        },
        context,
        signalList: [],
      },
      {debounce: 'NextCycle'},
  );
};

export const subscribeSignals = (instanceId: string): Array<ListenerSpec> => {
  logger.logMethodArgs('subscribeSignals', instanceId);
  const fsmInstance = _getFsmInstance(instanceId);
  const fsmConstructor = _getFsmConstructor(fsmInstance.constructorId);
  const consumerInterface = finiteStateMachineConsumer(instanceId);
  const listenerList: Array<ListenerSpec> = [];

  for (const signalConfig of fsmInstance.signalList) {
    if (signalConfig.actions == null) {
      listenerList.push(
          contextConsumer.subscribe(
              signalConfig.signalId,
              (signalDetail: Partial<typeof fsmInstance.context>): void => {
                transition(
                    instanceId,
                    signalConfig.transition,
              signalConfig.contextName
                ? {
                  [signalConfig.contextName]: signalDetail,
                }
                : undefined,
                );
              },
              {receivePrevious: signalConfig.receivePrevious ?? 'No'},
          ),
      );
    }
    // else
    listenerList.push(
        contextConsumer.subscribe(
            signalConfig.signalId,
            (signalDetail) => {
              _execAction(fsmConstructor, signalConfig.actions, consumerInterface, signalDetail);
            },
            {receivePrevious: signalConfig.receivePrevious ?? 'No'},
        ),
    );
  }

  return listenerList;
};

// protected unsubscribeSignals(): void {
//   if (this._listenerList.length === 0) return;
//   for (const listener of this._listenerList) {
//     eventListener.unsubscribe(listener);
//   }
//   this._listenerList.length = 0;
// }

export const defineSignals = <T extends FsmTypeHelper>(
  instanceId: string,
  signalList: SingleOrArray<SignalConfig<T['TEventId'], T['TActionName'], T['TContext']>>,
): void => {
  logger.logMethodArgs('defineSignals', {instanceId, signalList});
  const instance = _getFsmInstance(instanceId);
  instance.signalList = instance.signalList.concat(signalList as Array<SignalConfig>);
};

export const render = <TState extends string = string>(
  instanceId: string,
  states: {[P in TState]: (() => unknown) | TState},
): unknown => {
  const state = _getFsmInstance(instanceId).state;
  logger.logMethodArgs('render', {instanceId, state: state.target});
  let renderFn = states[state.target as TState];

  if (typeof renderFn === 'string') {
    renderFn = states[renderFn as TState];
  }

  if (typeof renderFn === 'function') {
    return renderFn();
  }

  return;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const finiteStateMachineConsumer = <T extends FsmTypeHelper, TContext extends T['TContext'] = T['TContext']>(
  instanceId: string,
  makeFromConstructor?: string,
) => {
  logger.logMethodArgs('stateMachineLookup', instanceId);

  const machineInstance = contextConsumer.getValue<FsmInstance>(instanceId);
  if (machineInstance == null) {
    // instance not initialized.
    if (makeFromConstructor == null) {
      throw new Error('fsm_undefined', {cause: {instanceId}});
    }
    initFsmInstance(instanceId, makeFromConstructor);
  }

  return {
    id: instanceId,
    constructorId: <string>machineInstance?.constructorId ?? makeFromConstructor,
    render: render.bind(null, instanceId) as OmitFirstParam<typeof render<T['TState']>>,
    getState: getState.bind(null, instanceId) as OmitFirstParam<typeof getState<T['TState'], T['TEventId']>>,
    getContext: getContext.bind(null, instanceId) as OmitFirstParam<typeof getContext<TContext>>,
    setContext: setContext.bind(null, instanceId) as OmitFirstParam<typeof setContext<TContext>>,
    transition: transition.bind(null, instanceId) as OmitFirstParam<typeof transition<T['TEventId'], TContext>>,
    defineSignals: defineSignals.bind(null, instanceId) as OmitFirstParam<typeof defineSignals<T>>,
    subscribeSignals: subscribeSignals.bind(null, instanceId) as OmitFirstParam<typeof subscribeSignals>,
  } as const;
};
