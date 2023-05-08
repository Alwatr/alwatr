import {createLogger, globalAlwatr} from '@alwatr/logger';
import {ListenerSpec, contextProvider, contextConsumer} from '@alwatr/signal';
import {destroySignal, unsubscribe} from '@alwatr/signal/core.js';
import {SubscribeOptions} from '@alwatr/signal/type.js';

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
import type {MaybePromise, OmitFirstParam, SingleOrArray, StringifyableRecord} from '@alwatr/type';

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
  logger.logMethodArgs?.('defineConstructor', {id, config});
  if (fsmConstructorStorage[id] != null) throw new Error('fsm_exist', {cause: {id}});
  fsmConstructorStorage[id] = {
    id,
    config,
    actionRecord: {},
    signalList: [],
  };
  return config;
};

/**
 * Get finite state machine instance by id.
 */
export const getFsmInstance = <
  TState extends string = string,
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(
    instanceId: string,
  ): FsmInstance<TState, TEventId, TContext> => {
  logger.logMethodArgs?.('_getFsmInstance', instanceId);
  const fsmInstance = contextConsumer.getValue<FsmInstance<TState, TEventId, TContext>>(instanceId);
  if (fsmInstance == null) throw new Error('fsm_undefined', {cause: {instanceId}});
  return fsmInstance;
};

/**
 * Get finite state machine constructor by id.
 */
export const getFsmConstructor = (constructorId: string): FsmConstructor => {
  logger.logMethodArgs?.('_getFsmConstructor', constructorId);
  const fsmConstructor = fsmConstructorStorage[constructorId];
  if (fsmConstructor == null) throw new Error('fsm_undefined', {cause: {constructorId: constructorId}});
  return fsmConstructor;
};

/**
 * Get current state of finite state machine instance.
 */
export const getState = <TState extends string = string, TEventId extends string = string>(
  instanceId: string,
): FsmState<TState, TEventId> => {
  logger.logMethodArgs?.('getState', instanceId);
  return getFsmInstance<TState, TEventId>(instanceId).state;
};

/**
 * Get current context of finite state machine instance.
 */
export const getContext = <TContext extends StringifyableRecord = StringifyableRecord>(
  instanceId: string,
): TContext => {
  logger.logMethodArgs?.('getContext', instanceId);
  return getFsmInstance<string, string, TContext>(instanceId).context;
};

/**
 * Set context of finite state machine instance.
 */
export const setContext = <TContext extends StringifyableRecord = StringifyableRecord>(
  instanceId: string,
  context: Partial<TContext>,
  notify?: boolean,
): void => {
  logger.logMethodArgs?.('setContext', {instanceId, context});
  const fsmInstance = getFsmInstance(instanceId);
  fsmInstance.context = {
    ...fsmInstance.context,
    ...context,
  };

  if (notify) {
    contextProvider.setValue(instanceId, fsmInstance, {debounce: 'Timeout'});
  }
};

/**
 * Transition finite state machine instance to new state.
 */
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

  logger.logMethodArgs?.('transition', {instanceId, fromState, event, context, target: transitionConfig?.target});

  if (context !== undefined) {
    fsmInstance.context = {
      ...fsmInstance.context,
      ...context,
    };
  }

  if (transitionConfig == null) {
    logger.incident?.(
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

/**
 * Define actions for finite state machine constructor.
 */
export const defineActions = <T extends FsmTypeHelper>(constructorId: string, actionRecord: ActionRecord<T>): void => {
  logger.logMethodArgs?.('defineActions', {constructorId, actionRecord});
  const fmsConstructor = getFsmConstructor(constructorId);
  fmsConstructor.actionRecord = {
    ...fmsConstructor.actionRecord,
    ...actionRecord,
  };
};

/**
 * Execute all actions for current state.
 */
export const _execAllActions = (
    constructor: FsmConstructor,
    state: FsmState,
    consumerInterface: FsmConsumerInterface,
): void => {
  logger.logMethodArgs?.('_execAllActions', consumerInterface.id);

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

/**
 * Execute single action.
 */
export const _execAction = (
    constructor: FsmConstructor,
    actionNames: SingleOrArray<string> | undefined,
    finiteStateMachine: FsmConsumerInterface,
): boolean | MaybePromise<void> => {
  if (actionNames == null) return;
  logger.logMethodArgs?.('execAction', {constructorId: constructor.id, actionNames});

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

/**
 * Initialize new finite state machine instance.
 */
export const initFsmInstance = (instanceId: string, constructorId: string): void => {
  logger.logMethodArgs?.('initializeMachine', {constructorId, instanceId});
  const constructor = getFsmConstructor(constructorId);
  const {initial, context} = constructor.config;
  const newInstance: FsmInstance = {
    constructorId,
    state: {
      target: initial,
      from: initial,
      by: 'INIT',
    },
    context,
  };
  contextProvider.setValue<FsmInstance>(instanceId, newInstance, {debounce: 'NextCycle'});

  _execAllActions(constructor, newInstance.state, finiteStateMachineConsumer(instanceId));
};

/**
 * Subscribe to all defined signals for finite state machine instance.
 */
export const subscribeSignals = (
    instanceId: string,
    signalList: Array<SignalConfig>,
    subscribeConstructorSignals = true,
): Array<ListenerSpec> => {
  logger.logMethodArgs?.('subscribeSignals', {instanceId, signalList});
  const listenerList: Array<ListenerSpec> = [];

  if (subscribeConstructorSignals) {
    signalList = signalList.concat(getFsmConstructor(getFsmInstance(instanceId).constructorId).signalList);
  }

  for (const signalConfig of signalList) {
    signalConfig.signalId ??= instanceId;
    listenerList.push(
        contextConsumer.subscribe(
            signalConfig.signalId,
            (signalDetail: StringifyableRecord): void => {
              logger.logMethodArgs?.('execSignalCallback', {instanceId, signalId: signalConfig.signalId, signalDetail});
              if (signalConfig.callback) {
                signalConfig.callback(signalDetail, finiteStateMachineConsumer(instanceId));
              }
              else {
                // prettier-ignore
                transition(
                    instanceId,
                    signalConfig.transition,
                    signalConfig.contextName == null ? undefined : {
                      [signalConfig.contextName]: signalDetail,
                    },
                );
              }
            },
            {receivePrevious: signalConfig.receivePrevious ?? 'No'},
        ),
    );
  }

  return listenerList;
};

/**
 * Define signals for finite state machine constructor.
 */
export const defineConstructorSignals = <T extends FsmTypeHelper>(
  constructorId: string,
  signalList: Array<SignalConfig<T>>,
): void => {
  logger.logMethodArgs?.('defineSignals', {constructorId, signalList: signalList});
  const fsmConstructor = getFsmConstructor(constructorId);
  fsmConstructor.signalList = fsmConstructor.signalList.concat(signalList as Array<SignalConfig>);
};

/**
 * Define signals for finite state machine instance.
 */
export const defineInstanceSignals = <T extends FsmTypeHelper>(
  instanceId: string,
  signalList: Array<SignalConfig<T>>,
  subscribeConstructorSignals = true,
): Array<ListenerSpec> => {
  logger.logMethodArgs?.('defineSignals', {instanceId, signals: signalList});
  return subscribeSignals(instanceId, signalList as Array<SignalConfig>, subscribeConstructorSignals);
};

/**
 * Render helper for use finite state machine instance in UI.
 *
 * Example:
 *
 * ```ts
 * render('myFsm', {
 *   state1: () => html`<div>State 1 Render...</div>`,
 *   state2: () => html`<div>State 2 Render...</div>`,
 *   state3: 'state1',
 * });
 * ```
 */
export const render = <TState extends string = string>(
  instanceId: string,
  states: {[P in TState]: (() => unknown) | TState},
  thisArg: unknown = null,
): unknown => {
  const state = getFsmInstance(instanceId).state;
  logger.logMethodArgs?.('render', {instanceId, state: state.target});
  let renderFn = states[state.target as TState];

  if (typeof renderFn === 'string') {
    renderFn = states[renderFn as TState];
  }

  if (typeof renderFn === 'function') {
    return renderFn.call(thisArg);
  }

  return;
};

/**
 * Subscribe to finite state machine instance state changes.
 */
export const subscribe = (
    instanceId: string,
    callback: () => void,
    options?: Partial<SubscribeOptions>,
): ListenerSpec => {
  logger.logMethodArgs?.('subscribe', instanceId);
  return contextConsumer.subscribe(instanceId, callback, options);
};

/**
 * Destroy finite state machine instance object to clear memory.
 */
export const destroy = (instanceId: string): void => {
  logger.logMethodArgs?.('destroy', instanceId);
  destroySignal(instanceId);
};

/**
 * Reset finite state machine instance to initial state and context.
 */
export const reset = (instanceId: string): void => {
  logger.logMethodArgs?.('reset', instanceId);
  const constructorId = getFsmInstance(instanceId).constructorId;
  // contextProvider.expire(instanceId);
  initFsmInstance(instanceId, constructorId);
};

/**
 * Finite state machine instance consumer.
 * Lookup current finite state machine instance or initialize new one and return consumer object .
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const finiteStateMachineConsumer = <T extends FsmTypeHelper, TContext extends T['TContext'] = T['TContext']>(
  instanceId: string,
  makeFromConstructor?: string,
) => {
  logger.logMethodArgs?.('stateMachineLookup', instanceId);

  const machineInstance = contextConsumer.getValue<FsmInstance>(instanceId);
  if (machineInstance == null) {
    // instance not initialized.
    if (makeFromConstructor == null) {
      throw new Error('fsm_undefined', {cause: {instanceId}});
    }
    initFsmInstance(instanceId, makeFromConstructor);
  }

  return {
    /**
     * Finite state machine instance id.
     */
    id: instanceId,

    /**
     * Finite state machine constructor id.
     */
    constructorId: <string>machineInstance?.constructorId ?? makeFromConstructor,

    /**
     * Render helper for use finite state machine instance in UI.
     */
    render: render.bind(null, instanceId) as OmitFirstParam<typeof render<T['TState']>>,

    /**
     * Subscribe to finite state machine instance state changes.
     */
    subscribe: subscribe.bind(null, instanceId) as OmitFirstParam<typeof subscribe>,

    /**
     * Unsubscribe from finite state machine instance state changes.
     */
    unsubscribe: unsubscribe,

    /**
     * Get current state of finite state machine instance.
     */
    getState: getState.bind(null, instanceId) as OmitFirstParam<typeof getState<T['TState'], T['TEventId']>>,

    /**
     * Get current context of finite state machine instance.
     */
    getContext: getContext.bind(null, instanceId) as OmitFirstParam<typeof getContext<TContext>>,

    /**
     * Set context of finite state machine instance.
     */
    setContext: setContext.bind(null, instanceId) as OmitFirstParam<typeof setContext<TContext>>,

    /**
     * Transition finite state machine instance to new state.
     */
    transition: transition.bind(null, instanceId) as OmitFirstParam<typeof transition<T['TEventId'], TContext>>,

    /**
     * Define signals for finite state machine instance.
     */
    defineSignals: defineInstanceSignals.bind(null, instanceId) as OmitFirstParam<typeof defineInstanceSignals<T>>,

    /**
     * Reset finite state machine instance to initial state and context.
     */
    reset: reset.bind(null, instanceId) as OmitFirstParam<typeof reset>,

    /**
     * Destroy finite state machine instance object to clear memory.
     */
    destroy: destroy.bind(null, instanceId) as OmitFirstParam<typeof destroy>,
  } as const;
};
