import type {SignalConfig} from '@alwatr/signal';
import type {} from '@alwatr/type-helper';

/**
 * Represents the state of a state machine, including its current finite state value
 * and its extended state (context).
 *
 * @template TState The union type of the finite state values.
 * @template TContext The type of the context object (extended state).
 */
export interface MachineState<TState extends string, TContext extends Record<string, unknown>> {
  /** The current finite state value. */
  readonly name: TState;
  /** The context (extended state) of the machine, holding quantitative data. */
  readonly context: TContext;
}

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
 * It must return a partial context object to merge.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event that triggered this assigner.
 * @returns A partial context object to be merged into the machine's context.
 */
export type Assigner<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  event: Readonly<TEvent>,
  context: Readonly<TContext>,
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => Partial<TContext> | void;

/**
 * Defines an effect (asynchronous side-effect action) executed on state entry/exit.
 * It can interact with the outside world and can dispatch new events.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event that triggered this effect.
 * @returns void or a Promise<void>.
 */
export type Effect<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  event: Readonly<TEvent>,
  context: Readonly<TContext>,
) => Awaitable<TEvent | void>;

/**
 * Defines a conditional guard function for a transition.
 * The transition is only taken if this function returns true.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event.
 * @returns `true` if the transition should be taken, `false` otherwise.
 */
export type Condition<TEvent extends MachineEvent, TContext extends Record<string, unknown>> = (
  event: Readonly<TEvent>,
  context: Readonly<TContext>,
) => boolean;

/**
 * Defines a transition for a given state and event. It specifies the target state,
 * actions, and an optional condition.
 *
 * @template TState The type of the state.
 * @template TEvent The type of the event.
 * @template TContext The type of the machine's context.
 */
export interface Transition<TState extends string, TEvent extends MachineEvent, TContext extends Record<string, unknown>> {
  /** The target state to transition to. If undefined, it's an internal transition. */
  readonly target?: TState;
  /** An array of assigners to execute. These update context synchronously. */
  readonly actions?: readonly Assigner<TEvent, TContext>[];
  /** A condition function that must return true for the transition to occur. */
  readonly condition?: Condition<TEvent, TContext>;
}

/**
 * The declarative configuration object for creating a state machine.
 * This object defines the entire behavior of the machine.
 *
 * @template TState The union type of all possible states.
 * @template TEvent The union type of all possible events.
 * @template TContext The type of the context object.
 */
export interface StateMachineConfig<TState extends string, TEvent extends MachineEvent, TContext extends Record<string, unknown>>
  extends Pick<SignalConfig, 'name'> {
  /** The initial finite state value. */
  readonly initial: TState;
  /** The initial context (extended state) of the machine. */
  readonly context: TContext;
  /**
   * An object defining all possible states and their transitions.
   */
  readonly states: {
    readonly [S in TState]?: {
      /** An object mapping event types to transitions for the current state. */
      readonly on?: {
        readonly [E in TEvent['type']]?: Transition<TState, Extract<TEvent, {type: E}>, TContext>;
      };
      /** An array of side-effect effects to execute upon entering this state. */
      readonly entry?: readonly Effect<TEvent, TContext>[];
      /** An array of side-effect effects to execute upon exiting this state. */
      readonly exit?: readonly Effect<TEvent, TContext>[];
    };
  };
}
