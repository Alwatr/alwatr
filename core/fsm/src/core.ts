import {createLogger, globalAlwatr} from '@alwatr/logger';
import {ListenerSpec, contextProvider, contextConsumer} from '@alwatr/signal';

import type {
  ActionRecord,
  ConstructorSignalConfig,
  FsmConstructor,
  FsmConstructorConfig,
  FsmConsumerInterface,
  FsmInstance,
  FsmState,
  FsmTypeHelper,
  InstanceSignalConfig,
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
    signalList: [],
  };
  return config;
};

export const getFsmInstance = <
  TState extends string = string,
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(
    instanceId: string,
  ): FsmInstance<TState, TEventId, TContext> => {
  logger.logMethodArgs('_getFsmInstance', instanceId);
  const fsmInstance = contextConsumer.getValue<FsmInstance<TState, TEventId, TContext>>(instanceId);
  if (fsmInstance == null) throw new Error('fsm_undefined', {cause: {instanceId}});
  return fsmInstance;
};

export const getFsmConstructor = (constructorId: string): FsmConstructor => {
  logger.logMethodArgs('_getFsmConstructor', constructorId);
  const fsmConstructor = fsmConstructorStorage[constructorId];
  if (fsmConstructor == null) throw new Error('fsm_undefined', {cause: {constructorId: constructorId}});
  return fsmConstructor;
};

export const getState = <TState extends string = string, TEventId extends string = string>(
  instanceId: string,
): FsmState<TState, TEventId> => {
  logger.logMethodArgs('getState', instanceId);
  return getFsmInstance<TState, TEventId>(instanceId).state;
};

export const getContext = <TContext extends StringifyableRecord = StringifyableRecord>(
  instanceId: string,
): TContext => {
  logger.logMethodArgs('getContext', instanceId);
  return getFsmInstance<string, string, TContext>(instanceId).context;
};

export const setContext = <TContext extends StringifyableRecord = StringifyableRecord>(
  instanceId: string,
  context: Partial<TContext>,
  notify?: boolean,
): void => {
  logger.logMethodArgs('setContext', {instanceId, context});
  const fsmInstance = getFsmInstance(instanceId);
  fsmInstance.context = {
    ...fsmInstance.context,
    ...context,
  };

  if (notify) {
    contextProvider.setValue(instanceId, fsmInstance, {debounce: 'Timeout'});
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
  const fsmInstance = getFsmInstance(instanceId);
  const fsmConstructor = getFsmConstructor(fsmInstance.constructorId);
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

  contextProvider.setValue(instanceId, fsmInstance, {debounce: 'Timeout'});

  _execAllActions(fsmConstructor, fsmInstance.state, consumerInterface);
};

export const defineActions = <T extends FsmTypeHelper>(constructorId: string, actionRecord: ActionRecord<T>): void => {
  logger.logMethodArgs('defineActions', {constructorId, actionRecord});
  const fmsConstructor = getFsmConstructor(constructorId);
  fmsConstructor.actionRecord = {
    ...fmsConstructor.actionRecord,
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
): boolean | void => {
  if (actionNames == null) return;
  logger.logMethodArgs('execAction', actionNames);

  if (Array.isArray(actionNames)) {
    return actionNames
        .map((actionName) => _execAction(constructor, actionName, finiteStateMachine))
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
    return actionFn(finiteStateMachine);
  }
  catch (error) {
    return logger.error('execAction', 'action_error', error, {
      actionNames,
      constructorId: constructor.id,
      instanceId: finiteStateMachine.id,
    });
  }
};

export const initFsmInstance = (instanceId: string, constructorId: string): void => {
  logger.logMethodArgs('initializeMachine', {constructorId, instanceId});
  const {initial, context} = getFsmConstructor(constructorId).config;
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

export const subscribeSignals = (
    instanceId: string,
    signalList: Array<InstanceSignalConfig>,
    subscribeConstructorSignals = true,
): Array<ListenerSpec> => {
  logger.logMethodArgs('subscribeSignals', {instanceId, signalList});
  const listenerList: Array<ListenerSpec> = [];

  if (subscribeConstructorSignals) {
    signalList = signalList.concat(getFsmConstructor(getFsmInstance(instanceId).constructorId).signalList);
  }

  for (const signalConfig of signalList) {
    listenerList.push(
        contextConsumer.subscribe(
            signalConfig.signalId,
            signalConfig.callback
              ? signalConfig.callback
              : (signalDetail: StringifyableRecord): void => {
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

  return listenerList;
};

// protected unsubscribeSignals(): void {
//   if (this._listenerList.length === 0) return;
//   for (const listener of this._listenerList) {
//     eventListener.unsubscribe(listener);
//   }
//   this._listenerList.length = 0;
// }

export const defineConstructorSignals = <T extends FsmTypeHelper>(
  constructorId: string,
  signalList: Array<ConstructorSignalConfig<T['TEventId'], T['TContext']>>,
): void => {
  logger.logMethodArgs('defineSignals', {constructorId, signalList: signalList});
  const fsmConstructor = getFsmConstructor(constructorId);
  fsmConstructor.signalList = fsmConstructor.signalList.concat(signalList);
};

export const defineInstanceSignals = <T extends FsmTypeHelper>(
  instanceId: string,
  signalList: Array<InstanceSignalConfig<T['TEventId'], T['TContext']>>,
  subscribeConstructorSignals = true,
): Array<ListenerSpec> => {
  logger.logMethodArgs('defineSignals', {instanceId, signals: signalList});
  return subscribeSignals(instanceId, signalList as Array<InstanceSignalConfig>, subscribeConstructorSignals);
};

export const render = <TState extends string = string>(
  instanceId: string,
  states: {[P in TState]: (() => unknown) | TState},
): unknown => {
  const state = getFsmInstance(instanceId).state;
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
    defineSignals: defineInstanceSignals.bind(null, instanceId) as OmitFirstParam<typeof defineInstanceSignals<T>>,
  } as const;
};
