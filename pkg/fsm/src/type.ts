import type {JsonValue, SingleOrArray} from '@alwatr/type-helper';
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
  /** An event can carry an optional, serializable payload. */
  [key: string]: JsonValue;
}

/**
 * Defines an assigner — a **pure, synchronous context reducer** applied during transitions.
 *
 * @param event The event that triggered the transition. Readonly to prevent mutations.
 * @param context The current context before the transition. Mutable for convenience, but treat it as immutable — return a new context object instead of mutating it.
 * @returns The complete next context object, or void.
 */
export type Assigner<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  event: Readonly<TEvent>,
  context: TContext,
) => TContext | void;

/**
 * Defines an effect — a **strictly synchronous**, fire-and-forget side-effect
 * executed on state entry/exit.
 *
 * ## Why synchronous-only? (Architectural decision)
 *
 * The FSM core is a deterministic, Run-to-Completion (RTC) step function:
 * `(state, event) -> (state', effects)`. Allowing async effects inside the core
 * creates ordering ambiguity — the continuation of an async effect may run against
 * a state/context that no longer exists. This mirrors the design of SCXML actions,
 * XState actions, and Erlang's gen_statem.
 *
 * **Any asynchronous work belongs in an {@link StateActor}**, which has a proper
 * lifecycle (spawn on entry, cleanup on exit) and communicates results back to
 * the machine via `dispatch`, keeping the core deterministic.
 *
 * @param event The event that triggered the effect. Readonly to prevent mutations.
 * @param context The current context of the machine. Readonly to prevent mutations.
 */
export type Effect<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  event: Readonly<TEvent>,
  context: Readonly<TContext>,
) => void;

/**
 * Defines a conditional guard function for a transition.
 * The transition is only taken if this function returns true.
 *
 * Guards MUST be pure and synchronous. A guard that throws is treated as `false`
 * (logged, transition branch skipped) so a single faulty predicate cannot brick
 * the machine.
 *
 * @param event The event that triggered the transition. Readonly to prevent mutations.
 * @param context The current context of the machine. Readonly to prevent mutations.
 * @returns `true` if the transition should be taken, `false` otherwise.
 */
export type Guard<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  event: Readonly<TEvent>,
  context: Readonly<TContext>,
) => boolean;

/**
 * Defines a state actor — an **asynchronous lifecycle process** spawned on state entry.
 *
 * This is the ONLY sanctioned home for async work in the machine (network requests,
 * polling intervals, websocket listeners, timers). A state actor:
 *
 * 1. Is spawned when the machine enters the state.
 * 2. Receives `dispatch` to asynchronously send events back to the parent FSM.
 * 3. May return a synchronous cleanup function, executed automatically (in LIFO
 *    order) when the machine exits the state or is destroyed.
 *
 * @template TEvent The union type of all events in the machine.
 * @template TContext The type of the machine's context.
 */
export type StateActor<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  context: Readonly<TContext>,
  dispatch: (event: TEvent) => void,
) => VoidFunction | void;

/**
 * Defines a transition for a given state and event. It specifies the target state,
 * assigners, and an optional guard.
 *
 * - With `target`: an **external** transition — exit effects run, actors are cleaned
 *   up, then entry effects run and actors are re-spawned (even on self-transitions).
 * - Without `target`: an **internal** transition — only assigners run; entry/exit
 *   effects and actors are untouched.
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
  /** A single assigner or an ordered chain of assigners. Applied atomically. */
  readonly assigner?: SingleOrArray<Assigner<TEvent, TContext>>;
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
 * ## Persistence requirement
 *
 * When `persistent` is enabled, EVERY state — including terminal states with no
 * transitions — MUST be declared in `states` (e.g. `success: {}`). The engine uses
 * the presence of a state's config entry to validate rehydrated state names from
 * storage; an undeclared state is treated as removed/renamed and the machine is
 * reset to `initial`.
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

  /** The initial context (extended state) of the machine. Must be serializable. */
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
      /** Synchronous side-effects executed upon entering this state. */
      readonly entry?: SingleOrArray<Effect<TEvent, TContext>>;
      /** Synchronous side-effects executed upon exiting this state. */
      readonly exit?: SingleOrArray<Effect<TEvent, TContext>>;
      /** Async lifecycle actors spawned upon entering this state, cleaned up (LIFO) when leaving. */
      readonly actor?: SingleOrArray<StateActor<TEvent, TContext>>;
    };
  };
}
