import type {SignalConfig} from '@alwatr/signal';

/**
 * Represents the state of a state machine, including its current finite state value
 * and its extended state (context).
 *
 * @template TContext The type of the context object (extended state).
 * @template TState The union type of the finite state values (e.g., 'idle' | 'loading').
 */
export interface MachineState<TContext extends DictionaryOpt<unknown>, TState extends string> {
  /** The current finite state value. */
  readonly state: TState;
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
export type Assigner<TContext extends DictionaryOpt<unknown>, TEvent extends MachineEvent> = (
  context: Readonly<TContext>,
  event: Readonly<TEvent>,
) => Partial<TContext>;

/**
 * Defines an effect (asynchronous side-effect action) executed on state entry/exit.
 * It can interact with the outside world and does not update context.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event that triggered this effect.
 * @returns void or a Promise<void>.
 */
export type Effect<TContext extends DictionaryOpt<unknown>, TEvent extends MachineEvent> = (
  context: Readonly<TContext>,
  event: Readonly<TEvent>,
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => Awaitable<TEvent | void>;

/**
 * Defines a transition for a given state and event. It specifies the target state
 * and any assigners to be executed.
 *
 * @template TContext The type of the machine's context.
 * @template TEvent The type of the event.
 * @template TState The type of the state.
 */
export interface Transition<TContext extends DictionaryOpt<unknown>, TEvent extends MachineEvent, TState extends string> {
  /** The target state to transition to. If undefined, it's an internal transition (no state change). */
  readonly target?: TState;
  /** An array of assigners to execute when this transition is taken. These update context synchronously. */
  readonly actions?: readonly Assigner<TContext, TEvent>[];
}

/**
 * The declarative configuration object for creating a state machine.
 * This object defines the entire behavior of the machine.
 *
 * @template TContext The type of the context object.
 * @template TEvent The union type of all possible events.
 * @template TState The union type of all possible states.
 */
export interface StateMachineConfig<TContext extends DictionaryOpt<unknown>, TEvent extends MachineEvent, TState extends string>
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
        readonly [E in TEvent['type']]?: Transition<TContext, Extract<TEvent, {type: E}>, TState>;
      };
      /** An array of side-effect effects to execute upon entering this state. */
      readonly entry?: readonly Effect<TContext, TEvent>[];
      /** An array of side-effect effects to execute upon exiting this state. */
      readonly exit?: readonly Effect<TContext, TEvent>[];
    };
  };
}
