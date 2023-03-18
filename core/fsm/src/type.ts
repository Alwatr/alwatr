import type {finiteStateMachineConsumer} from './core.js';
import type {DebounceType} from '@alwatr/signal';
import type {ArrayItems, MaybePromise, SingleOrArray, StringifyableRecord} from '@alwatr/type';

export interface FsmConstructor {
  /**
   * Constructor id.
   */
  readonly id: string;
  readonly config: FsmConstructorConfig;
  actionRecord: ActionRecord;
  signalList: Array<SignalConfig>;
}

export interface FsmConstructorConfig<
  TState extends string = string,
  TEventId extends string = string,
  TActionName extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
> extends StringifyableRecord {
  /**
   * Initial context.
   */
  readonly context: TContext;

  /**
   * Initial state.
   */
  readonly initial: TState;

  /**
   * Define state list
   */
  readonly stateRecord: StateRecord<TState, TEventId, TActionName>;
}

export type StateRecord<
  TState extends string = string,
  TEventId extends string = string,
  TActionName extends string = string
> = {
  readonly [S in TState | '$all']: {
    /**
     * On state exit actions
     */
    readonly exit?: SingleOrArray<TActionName>;

    /**
     * On state entry actions
     */
    readonly entry?: SingleOrArray<TActionName>;

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
    readonly on: {
      readonly [E in TEventId]?: TransitionConfig<TState, TActionName> | undefined;
    };
  };
};

export interface FsmState<TState extends string = string, TEventId extends string = string>
  extends StringifyableRecord {
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
  readonly target?: TState;
  readonly condition?: TActionName;
  readonly actions?: SingleOrArray<TActionName>;
}

export interface FsmInstance<
  TState extends string = string,
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
> extends StringifyableRecord {
  readonly constructorId: string;
  state: FsmState<TState, TEventId>;
  context: TContext;
}

export type ActionRecord<T extends FsmTypeHelper = FsmTypeHelper> = {
  readonly [P in T['TActionName']]?: (finiteStateMachine: FsmConsumerInterface<T>) => MaybePromise<void> | boolean;
};

export type SignalConfig<T extends FsmTypeHelper = FsmTypeHelper> = {
  signalId?: string;
  /**
   * @default `No`
   */
  receivePrevious?: DebounceType;
} & (
  | {
      transition: T['TEventId'];
      contextName?: keyof T['TContext'];
      callback?: never;
    }
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (detail: any, fsmInstance: FsmConsumerInterface<T>) => void;
      transition?: never;
    }
);

// type helper
export type FsmTypeHelper<T extends FsmConstructorConfig = FsmConstructorConfig> = Readonly<{
  TState: Exclude<keyof T['stateRecord'], '$all'>;
  TEventId: keyof T['stateRecord'][FsmTypeHelper<T>['TState']]['on'];
  TActionName: NonNullable<ArrayItems<T['stateRecord'][FsmTypeHelper<T>['TState']]['entry']>>;
  TContext: T['context'];
}>;

export type FsmConsumerInterface<
  T extends FsmTypeHelper = FsmTypeHelper,
  TContext extends T['TContext'] = T['TContext']
> = ReturnType<typeof finiteStateMachineConsumer<T, TContext>>;
