import type {Awaitable, SingleOrArray} from '@alwatr/type-helper';
import type {SignalConfig} from '@alwatr/signal';

/**
 * Represents the state of a state machine, including its current finite state value
 * and its extended state (context).
 *
 * @template TState The union type of the finite state values.
 * @template TContext The type of the machine's context (extended state).
 */
export type MachineState<TState extends string, TContext extends Record<string, unknown>> = {
  /** The current finite state value. */
  readonly name: TState;
  /** The context (extended state) of the machine, holding quantitative data. */
  readonly context: TContext;
};

/**
 * Represents an event that can be sent to the state machine.
 * It must have a `type` property, which acts as a discriminator.
 *
 * @template TEventType The union type of event names.
 */
export interface MachineEvent<TEventType extends string = string> {
  /** The unique type of the event. */
  readonly type: TEventType;
  /** An event can carry an optional payload. */
  [key: string]: unknown;
}

/**
 * Defines an assigner (synchronous action) that updates the context during transitions.
 * It returns the complete new context object or void/undefined if no changes are made.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event that triggered this assigner.
 * @returns The complete next context object or void.
 */
export type Assigner<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  event: Readonly<TEvent>,
  context: TContext,
) => TContext | void;

/**
 * Defines an effect (fire-and-forget side-effect action) executed on state entry/exit.
 * It can interact with the outside world, but does not return new events to trigger transitions.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event that triggered this effect.
 * @returns void or a Promise<void>.
 */
export type Effect<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (params: {
  readonly event: Readonly<TEvent>;
  readonly context: Readonly<TContext>;
}) => Awaitable<void>;

/**
 * Defines a conditional guard function for a transition.
 * The transition is only taken if this function returns true.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event.
 * @returns `true` if the transition should be taken, `false` otherwise.
 */
export type Guard<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (params: {
  readonly event: Readonly<TEvent>;
  readonly context: Readonly<TContext>;
}) => boolean;

/**
 * Defines an actor (asynchronous lifecycle process) invoked on state entry.
 * It starts an operation and can send events back to the parent FSM via `dispatch`.
 * It can return a cleanup function to be called when exiting the state or destroying the machine.
 *
 * @template TEvent The union type of all events in the machine.
 * @template TContext The type of the machine's context.
 */
export type Actor<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (params: {
  readonly context: Readonly<TContext>;
  readonly dispatch: (event: TEvent) => void;
}) => (() => void) | void;

/**
 * Defines a transition for a given state and event. It specifies the target state,
 * actions, and an optional guard.
 *
 * @template TState The type of the state.
 * @template TEvent The type of the event.
 * @template TContext The type of the machine's context.
 */
export interface Transition<
  TState extends string,
  TEvent extends MachineEvent,
  TContext extends Record<string, unknown>,
> {
  /** The target state to transition to. If undefined, it's an internal transition. */
  readonly target?: TState;
  /** A guard function that must return true for the transition to occur. */
  readonly guard?: Guard<TEvent, TContext>;
  /** An array of assigners to execute. These update context synchronously. */
  readonly assigners?: SingleOrArray<Assigner<TEvent, TContext>>;
}

/**
 * Configuration options for persisting the FSM state in localStorage.
 */
export interface FsmPersistenceConfig {
  /**
   * The version of the state's data structure (schema).
   * Increment this number whenever you make a breaking change to the state's context shape.
   */
  schemaVersion: number;

  /**
   * The key under which to store the FSM state in localStorage.
   * @default `signal-name`
   */
  storageKey?: string;
}

/**
 * The declarative configuration object for creating a state machine.
 * This object defines the entire behavior of the machine.
 *
 * @template TState The union type of all possible states.
 * @template TEvent The union type of all possible events.
 * @template TContext The type of the machine's context.
 */
export interface StateMachineConfig<
  TState extends string,
  TEvent extends MachineEvent,
  TContext extends Record<string, unknown>,
> extends Pick<SignalConfig, 'name'> {
  /** The initial finite state value. */
  readonly initial: TState;

  /** The initial context (extended state) of the machine. */
  readonly context: TContext;

  /** If provided, the FSM's state will be persisted in localStorage. */
  persistent?: FsmPersistenceConfig;

  /** An object defining all possible states and their transitions. */
  readonly states: {
    readonly [S in TState]?: {
      /** An object mapping event types to transitions for the current state. */
      readonly on?: {
        readonly [E in TEvent['type']]?: SingleOrArray<Transition<TState, Extract<TEvent, {type: E}>, TContext>>;
      };
      /** An array of side-effect effects to execute upon entering this state. */
      readonly entry?: SingleOrArray<Effect<TEvent, TContext>>;
      /** An array of side-effect effects to execute upon exiting this state. */
      readonly exit?: SingleOrArray<Effect<TEvent, TContext>>;
      /** An array of actors to spawn upon entering this state, cleaned up when leaving. */
      readonly actors?: SingleOrArray<Actor<TEvent, TContext>>;
    };
  };
}
