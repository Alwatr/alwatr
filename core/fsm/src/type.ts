import type {MaybeArray, MaybePromise, StringifyableRecord} from '@alwatr/type';

export interface FsmConfig<TState extends string, TEventId extends string, TContext extends StringifyableRecord> {
  /**
   * Machine ID (It is used in the state change signal identifier, so it must be unique).
   */
  id: string;

  /**
   * Initial state.
   */
  initial: TState;

  /**
   * Initial context.
   */
  context: TContext;

  /**
   * Define state list
   */
  stateRecord: {
    [S in TState | '$all']: {
      /**
       * On state exit actions
       */
      exit?: MaybeArray<() => MaybePromise<void>>;

      /**
       * On state entry actions
       */
      entry?: MaybeArray<() => MaybePromise<void>>;

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
        [E in TEventId]?: TransitionConfig<TState>;
      };
    };
  };

  /**
   * A list of signals ...
   */
  signalRecord?: {
    [signalId: string]: {
      actions?: MaybeArray<(...args: any[]) => MaybePromise<void>>;
      transition?: keyof FsmConfig<TState, TEventId, TContext>['stateRecord'][
        keyof FsmConfig<TState, TEventId, TContext>['stateRecord']
      ]['on'];
    }
  }
}

export interface StateContext<TState extends string, TEventId extends string> {
  [T: string]: string | undefined;
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

export interface TransitionConfig<TState extends string> {
  target?: TState;
  condition?: () => MaybePromise<boolean>;
  actions?: MaybeArray<() => MaybePromise<void>>;
}
