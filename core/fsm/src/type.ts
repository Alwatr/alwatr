import {DebounceType} from '@alwatr/signal';

import type {SingleOrArray, MaybePromise, StringifyableRecord} from '@alwatr/type';

export type FsmConfig<TState extends string, TEventId extends string, TContext extends StringifyableRecord> = {
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
  stateRecord: StateRecord<TState, TEventId>;

  /**
   * A list of signals ...
   */
  signalList?: Array<
    {
      signalId: string;
      receivePrevious?: DebounceType;
    } & (
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          actions: SingleOrArray<(signalDetail: any) => MaybePromise<void>>;
          transition?: never;
        }
      | {
          transition: keyof StateRecord<TState, TEventId>[TState]['on'];
          contextName?: keyof TContext;
          actions?: never;
        }
    )
  >;

  autoSignalUnsubscribe?: boolean;
};

export type StateRecord<TState extends string, TEventId extends string> = {
  [S in TState | '$all']: {
    /**
     * On state exit actions
     */
    exit?: SingleOrArray<() => MaybePromise<void>>;

    /**
     * On state entry actions
     */
    entry?: SingleOrArray<() => MaybePromise<void>>;

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
      [E in TEventId]?: TransitionConfig<TState> | undefined;
    };
  };
};

export type StateContext<TState extends string, TEventId extends string> = {
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
};

export interface TransitionConfig<TState extends string> {
  target?: TState;
  condition?: () => MaybePromise<boolean>;
  actions?: SingleOrArray<() => MaybePromise<void>>;
}
