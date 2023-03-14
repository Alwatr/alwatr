import {dispatch, getDetail, logger} from './core.js';

import type {OmitFirstParam, SingleOrArray, StringifyableRecord} from '@alwatr/type';

export interface FsmConfig<
  TState extends string = string,
  TEventId extends string = string,
  TActionName extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
> extends StringifyableRecord {
  name: string;

  /**
   * Initial context.
   */
  context: TContext;

  /**
   * Initial state.
   */
  initial: TState;

  /**
   * Define state list
   */
  stateRecord: StateRecord<TState, TEventId, TActionName>;
}

export type StateRecord<TState extends string, TEventId extends string, TActionName extends string> = {
  [S in TState | '$all']: {
    /**
     * On state exit actions
     */
    exit?: SingleOrArray<TActionName>;

    /**
     * On state entry actions
     */
    entry?: SingleOrArray<TActionName>;

    /**
     * An object mapping eventId to state.
     *
     * Example:
     *
     * ```ts
     * stateRecord: {
     *   on: {
     *     TIMER: {
     *       target: 'green',
     *       condition: () => car.gas > 0,
     *       actions: () => car.go(),
     *     }
     *   }
     * }
     * ```
     */
    on: {
      [E in TEventId]?: TransitionConfig<TState, TActionName> | undefined;
    };
  };
};

export interface StateContext<TState extends string, TEventId extends string> extends StringifyableRecord {
  /**
   * Current state
   */
  target: TState;
  /**
   * Last state
   */
  from: TState;
  /**
   * Transition event
   */
  by: TEventId | 'INIT';
}

export interface TransitionConfig<TState extends string = string, TActionName extends string = string>
  extends StringifyableRecord {
  target?: TState;
  condition?: TActionName;
  actions?: SingleOrArray<TActionName>;
}

export interface SignalDetail<
  TState extends string = string,
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
> extends StringifyableRecord {
  name: string;
  state: StateContext<TState, TEventId>;
  context: TContext;
}

// type helper

export type TState<TMachine extends FsmConfig> = Exclude<keyof TMachine['stateRecord'], '$all'>;
export type TEventId<TMachine extends FsmConfig> = keyof TMachine['stateRecord'][TState<TMachine>]['on'];
export type TActionName<TMachine extends FsmConfig> = TMachine['stateRecord'][TState<TMachine>]['entry'];
export type TContext<TMachine extends FsmConfig> = TMachine['context'];

export type StateMachineHelper<TMachine extends FsmConfig = FsmConfig> = Readonly<{
  TState: Exclude<keyof TMachine['stateRecord'], '$all'>;
  TEventId: keyof TMachine['stateRecord'][StateMachineHelper<TMachine>['TState']]['on'];
  TActionName: TMachine['stateRecord'][StateMachineHelper<TMachine>['TState']]['entry'];
  TContext: TMachine['context'];
}>;

// ----

const fsmStorage: Record<string, FsmConfig | undefined> = {};

export function contractStateMachine<
  TState extends string = string,
  TEventId extends string = string,
  TActionName extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(config: FsmConfig<TState, TEventId, TActionName, TContext>): FsmConfig<TState, TEventId, TActionName, TContext> {
  return config;
}

export const getState = <TState extends string = string, TEventId extends string = string>(
  machineId: string,
): StateContext<TState, TEventId> => {
  logger.logMethodArgs('getState', machineId);
  const detail = getDetail<SignalDetail<TState, TEventId, StringifyableRecord>>(machineId);
  if (detail == null) throw new Error('fsm_undefined', {cause: {machineId}});
  return detail.state;
};

export const setState = <TState extends string = string, TEventId extends string = string>(
  machineId: string,
  target: TState,
  by: TEventId,
): void => {
  logger.logMethodArgs('setState', machineId);
  const detail = getDetail<SignalDetail<TState, TEventId, StringifyableRecord>>(machineId);
  if (detail == null) throw new Error('fsm_undefined', {cause: {machineId}});

  detail.state = {
    target,
    from: detail.state.target,
    by,
  };

  dispatch(machineId, detail, {debounce: 'NextCycle'});
};

export const getContext = <TContext extends StringifyableRecord = StringifyableRecord>(machineId: string): TContext => {
  logger.logMethodArgs('getContext', machineId);
  const detail = getDetail<SignalDetail<string, string, TContext>>(machineId);
  if (detail == null) throw new Error('fsm_undefined', {cause: {machineId}});
  return detail.context;
};

export const setContext = <TContext extends StringifyableRecord = StringifyableRecord>(
  machineId: string,
  context: Partial<TContext>,
  notify?: boolean,
): void => {
  logger.logMethodArgs('setContext', {machineId, context});
  const detail = getDetail<SignalDetail<string, string, TContext>>(machineId);
  if (detail == null) throw new Error('fsm_undefined', {cause: {machineId}});

  detail.context = {
    ...detail.context,
    ...context,
  };

  if (notify) {
    dispatch(machineId, detail, {debounce: 'NextCycle'});
  }
};

export const transition = async <
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
>(
  machineId: string,
  event: TEventId,
  context?: Partial<TContext>,
): Promise<void> => {
  const detail = getDetail<SignalDetail<string, TEventId, TContext>>(machineId);
  if (detail == null) throw new Error('fsm_undefined', {cause: {machineId}});
  const config = fsmStorage[detail.name];
  if (config == null) throw new Error('fsm_undefined', {cause: {machineName: detail.name}});

  const fromState = detail.state.target;
  const transitionConfig = config.stateRecord[fromState]?.on[event] ?? config.stateRecord.$all?.on[event];

  logger.logMethodArgs('transition', {machineId, fromState, event, context, target: transitionConfig?.target});

  if (context !== undefined) {
    detail.context = {
      ...detail.context,
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
          events: {...config.stateRecord.$all?.on, ...config.stateRecord[fromState]?.on},
        },
    );
    return;
  }

  // if ((await this.callFunction(transitionConfig.condition)) === false) {
  //   return;
  // TODO: condition
  // }

  transitionConfig.target ??= fromState;
  setState(machineId, transitionConfig.target, event);
};

export const defineMachine = <TMachine extends FsmConfig = FsmConfig>(machineId: string, config: TMachine): void => {
  const detail = getDetail(machineId);
  if (detail != null) throw new Error('fsm_exist', {cause: {machineId, config}});

  fsmStorage[config.name] = config;
  dispatch<SignalDetail>(
      machineId,
      {
        name: config.name,
        state: {
          target: config.initial,
          from: config.initial,
          by: 'INIT',
        },
        context: config.context,
      },
      {debounce: 'NextCycle'},
  );
};

export const stateMachineLookup = <
  TMachine extends StateMachineHelper,
  TContext extends TMachine['TContext'] = TMachine['TContext']
>(
    machineId: string,
  ) =>
    ({
      defineMachine: defineMachine.bind(null, machineId) as OmitFirstParam<typeof defineMachine>,
      getState: getState.bind(null, machineId) as OmitFirstParam<
      typeof getState<TMachine['TState'], TMachine['TEventId']>
    >,
      getContext: getContext.bind(null, machineId) as OmitFirstParam<typeof getContext<TContext>>,
      setContext: setContext.bind(null, machineId) as OmitFirstParam<typeof setContext<TContext>>,
      transition: transition.bind(null, machineId) as OmitFirstParam<
      typeof transition<TMachine['TEventId'], TContext>
    >,
    } as const);

// demo provider

export const lightMachineConfig = contractStateMachine({
  name: 'light_machine',
  context: {
    a: <number>0,
    b: <number>0,
  },
  initial: 'green',
  stateRecord: {
    $all: {
      entry: 'action_all_entry',
      exit: 'action_all_exit',
      on: {
        POWER_LOST: {
          target: 'flashingRed',
          actions: 'action_all_power_lost',
        },
      },
    },
    green: {
      entry: 'action_green_entry',
      exit: 'action_green_exit',
      on: {
        TIMER: {
          target: 'yellow',
          actions: 'action_green_timer',
          condition: 'condition_green_timer',
        },
      },
    },
    yellow: {
      on: {
        TIMER: {
          target: 'red',
        },
      },
    },
    red: {
      on: {
        TIMER: {
          target: 'green',
        },
      },
    },
    flashingRed: {
      on: {
        POWER_BACK: {
          target: 'green',
        },
      },
    },
  },
});

export type LightMachine = StateMachineHelper<typeof lightMachineConfig>;
const lightMachine = stateMachineLookup<LightMachine>('light_machine_56');

lightMachine.defineMachine(lightMachineConfig);

lightMachine.handleAction({
  'asdasd': () => {

  },
});

lightMachine.handleSignal([
  {
    signalId: 'asdasd',
    ...
  }
]);
