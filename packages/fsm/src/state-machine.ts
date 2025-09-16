import {createLogger} from '@alwatr/logger';
import {createStateSignal, type StateSignal} from '@alwatr/signal';

import type {StateMachineConfig, StateSnapshot, EventObject, TransitionDetail, Action} from './types.js';

/**
 * The core class for creating and managing a state machine.
 * It encapsulates the state, context, and all transition logic,
 * providing a robust, type-safe, and declarative API for state management.
 */
export class StateMachine<TState extends string, TEvent extends EventObject<string>, TContext extends Record<string, unknown>> {
  public readonly name: string;
  public readonly signal: StateSignal<StateSnapshot<TState, TContext>>;

  private _currentState: TState;
  private _currentContext: TContext;
  private readonly _config: StateMachineConfig<TState, TEvent, TContext>;
  private readonly _logger;

  public constructor(config: StateMachineConfig<TState, TEvent, TContext>) {
    this.name = config.name;
    this._config = config;
    this._currentState = config.initialState;
    this._currentContext = config.initialContext;
    this._logger = createLogger(`alwatr-fsm:${this.name}`);
    this._logger.logMethodArgs('constructor', {initialState: this._currentState});

    this.signal = createStateSignal({
      name: `fsm-signal:${this.name}`,
      initialValue: this.getSnapshot(),
    });

    // Run the initial onEnter action for the starting state.
    this._runInitialEnterAction();
  }

  /**
   * Returns a snapshot of the current state and context.
   */
  public getSnapshot = (): StateSnapshot<TState, TContext> => {
    return {state: this._currentState, context: this._currentContext};
  };

  /**
   * Sends an event to the state machine to trigger a potential transition.
   * @param event The event object to process.
   * @returns The new state if a transition occurred, otherwise null.
   */
  public transition = async (event: TEvent): Promise<TState | null> => {
    const fromState = this._currentState;
    const stateNode = this._config.states[fromState];
    const transitionConfig = stateNode?.on?.[event.type as TEvent['type']];

    if (!transitionConfig) {
      this._logger.logMethodArgs?.('transition', {event: event.type, from: fromState, to: 'null (invalid)'});
      return null;
    }

    const toState = typeof transitionConfig === 'string' ? transitionConfig : transitionConfig.target;
    const transitionAction = typeof transitionConfig === 'object' ? transitionConfig.action : undefined;
    const guard = typeof transitionConfig === 'object' ? transitionConfig.guard : undefined;

    const detail: TransitionDetail<TContext, TEvent> = {context: this._currentContext, event};

    if (guard && (await guard(detail)) !== true) {
      this._logger.logMethodArgs?.('transition', {event: event.type, from: fromState, guard: 'prevented'});
      return null;
    }

    this._logger.logMethodArgs?.('transition', {event: event.type, from: fromState, to: toState});

    // --- Action Execution Sequence ---
    // 1. Exit action of the current state
    const exitAction = this._config.states[fromState]?.onExit;
    await this._executeAction(exitAction, detail);

    // 2. The transition action itself
    await this._executeAction(transitionAction, detail);

    // 3. Update state and notify subscribers for a responsive UI
    this._currentState = toState;
    this.signal.notify(this.getSnapshot());

    // 4. Enter action of the new state
    const enterAction = this._config.states[toState]?.onEnter;
    await this._executeAction(enterAction, detail);

    return this._currentState;
  };

  /**
   * Executes an action and updates the context with its return value.
   */
  private _executeAction = async (
    action: Action<TContext, TEvent> | undefined,
    detail: TransitionDetail<TContext, TEvent>,
  ): Promise<void> => {
    if (typeof action !== 'function') return;

    const contextPatch = await action(detail);
    if (contextPatch) {
      this._currentContext = {...this._currentContext, ...contextPatch};
      // Notify again if context changed after the main state transition
      this.signal.notify(this.getSnapshot());
    }
  };

  /**
   * Runs the onEnter action for the initial state upon machine creation.
   */
  private _runInitialEnterAction = (): void => {
    const enterAction = this._config.states[this._currentState]?.onEnter;
    if (enterAction) {
      const detail: TransitionDetail<TContext, TEvent> = {
        context: this._currentContext,
        event: {type: 'FSM_INIT'} as TEvent,
      };
      this._executeAction(enterAction, detail);
    }
  };

  /**
   * Cleans up resources used by the state machine.
   */
  public destroy = (): void => {
    this._logger.logMethod?.('destroy');
    this.signal.destroy();
  };
}
