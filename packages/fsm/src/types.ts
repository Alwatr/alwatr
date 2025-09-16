import type {} from '@alwatr/type-helper';

/**
 * Represents the structured event that triggers transitions.
 * It consists of a `type` (the event name) and an optional `payload`.
 */
export type EventObject<TEvent extends string, TPayload = Record<string, unknown>> = {
  type: TEvent;
  payload?: TPayload;
};

/**
 * The snapshot of the machine's state at any given time.
 * This is the atomic unit of state that subscribers receive.
 */
export interface StateSnapshot<TState extends string, TContext> {
  /** The current state name. */
  state: TState;
  /** The current context (extended state). */
  context: TContext;
}

/**
 * The detail object passed to every action and guard.
 * It provides the full context of the transition.
 */
export interface TransitionDetail<TContext, TEventObject extends EventObject<string>> {
  /** The current context of the state machine. */
  context: TContext;
  /** The event object that triggered the transition. */
  event: TEventObject;
}

/**
 * An action is a function that performs side effects.
 * It can optionally return a partial context to update the machine's context.
 */
export type Action<TContext, TEventObject extends EventObject<string>> =
  (detail: TransitionDetail<TContext, TEventObject>) => Awaitable<Partial<TContext> | void>;

/**
 * A guard is a function that determines if a transition should be taken.
 * It must return `true` for the transition to proceed.
 */
export type Guard<TContext, TEventObject extends EventObject<string>> =
  (detail: TransitionDetail<TContext, TEventObject>) => Awaitable<boolean>;

/**
 * Defines a transition. It can be a simple target state string,
 * or a configuration object with a target, action, and guard.
 */
export type TransitionConfig<TState extends string, TContext, TEventObject extends EventObject<string>> =
  | TState
  | {
    /** The target state of this transition. */
    target: TState;
    /** A specific action to execute for this transition. */
    action?: Action<TContext, TEventObject>;
    /** A condition that must be met for this transition to be taken. */
    guard?: Guard<TContext, TEventObject>;
  };

/**
 * Defines the configuration for a single state node.
 * It contains lifecycle actions (`onEnter`, `onExit`) and a map of possible transitions (`on`).
 */
export interface StateNodeConfig<TState extends string, TEvent extends EventObject<string>, TContext> {
  /** An action executed when entering this state. */
  onEnter?: Action<TContext, TEvent>;
  /** An action executed when exiting this state. */
  onExit?: Action<TContext, TEvent>;
  /** A map of events to their corresponding transitions. */
  on?: {
    [E in TEvent['type']]?: TransitionConfig<TState, TContext, Extract<TEvent, {type: E}>>;
  };
}

/**
 * The main configuration object for creating a new state machine.
 */
export interface StateMachineConfig<TState extends string, TEvent extends EventObject<string>, TContext> {
  /** A unique name for the machine, used for logging and debugging. */
  name: string;
  /** The initial state of the machine. */
  initialState: TState;
  /** The initial context (extended state) of the machine. */
  initialContext: TContext;
  /** The complete definition of all states and their transitions. */
  states: {
    [S in TState]?: StateNodeConfig<TState, TEvent, TContext>;
  };
}