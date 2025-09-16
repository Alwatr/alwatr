/**
 * Defines the structure for state transitions.
 * For each state, it maps events to the next state.
 */
export type StateTransitions<TState extends string, TEvent extends string> = {
  [S in TState]?: {
    [E in TEvent]?: TState;
  };
};

/**
 * Defines the structure for actions associated with events or states.
 * Actions can be triggered on entering/exiting a state or on a specific transition.
 */
export type StateActions<TState extends string, TEvent extends string, TContext> = {
  [S in TState as `onEnter_${S}`]?: (context: TContext) => void;
} & {
  [E in TEvent as `on_${E}`]?: (context: TContext) => void;
};

/**
 * The configuration object for creating a new state machine.
 */
export interface StateMachineConfig<TState extends string, TEvent extends string, TContext> {
  /**
   * A unique name for the state machine, used for logging and debugging.
   */
  name: string;

  /**
   * The initial state of the machine.
   */
  initialState: TState;

  /**
   * An initial context or payload for the machine.
   */
  initialContext: TContext;

  /**
   * A record defining all possible state transitions.
   */
  states: StateTransitions<TState, TEvent>;

  /**
   * A record of actions to be executed on state entry or event triggers.
   */
  actions?: StateActions<TState, TEvent, TContext>;
}

/**
 * The public interface of a created state machine instance.
 * This is the API that users will interact with.
 */
export interface StateMachine<TState extends string, TEvent extends string, TContext> {
  /**
   * The name of the state machine.
   */
  readonly name: string;

  /**
   * Returns the current state of the machine.
   */
  getState: () => TState;

  /**
   * Returns the current context of the machine.
   */
  getContext: () => TContext;

  /**
   * Triggers a transition to a new state based on an event.
   * @param event The event to trigger.
   * @param contextUpdater An optional function to update the context.
   */
  transition: (event: TEvent, contextUpdater?: (context: TContext) => TContext) => TState | null;

  /**
   * The Alwatr Signal instance for this FSM, allowing reactive subscriptions.
   * You can listen for state changes using `fsm.signal.subscribe()`.
   */
  readonly signal: AlwatrSignal<TState>; // Assuming AlwatrSignal is imported

  /**
   * A method to clean up resources, particularly signal subscriptions.
   */
  destroy: () => void;
}
