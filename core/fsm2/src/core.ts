import {AlwatrBaseSignal} from '@alwatr/signal2';

import type {MaybePromise, SingleOrArray, Stringifyable} from '@alwatr/type';

export type ActionFn = (this: unknown) => MaybePromise<void>;
export type ConditionFn = (this: unknown) => boolean;

export type State<StateName extends string, EventName extends string> = {
  /**
   * Current state name.
   */
  target: StateName;

  /**
   * Last state name.
   */
  from: StateName;

  /**
   * Transition event name.
   */
  by: EventName | 'INIT';
};

/**
 * State Configurations.
 */
export type StateConfig<StateName extends string, EventName extends string> = {
  readonly [S in StateName | '$all']: {
    /**
     * On state exit actions
     */
    readonly exit?: SingleOrArray<ActionFn>;

    /**
     * On state entry actions
     */
    readonly entry?: SingleOrArray<ActionFn>;

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
      readonly [E in EventName]?: TransitionConfig<StateName> | undefined;
    };
  };
};

export type TransitionConfig<StateName extends string> = {
  readonly target?: StateName;
  readonly conditions?: SingleOrArray<ConditionFn>;
  readonly actions?: SingleOrArray<ActionFn>;
};

/**
 * Finite State Machine state configs
 */
export type MachineConfig<StateName extends string, EventName extends string, Context extends Stringifyable> = {
  initial: StateName;
  /**
   * Fsm context object.
   */
  context: Context;
  states: StateConfig<StateName, EventName>;
};

/**
 * Finite State Machine Class
 */
export class FiniteStateMachine<
  Context extends Stringifyable,
  StateName extends string,
  EventName extends string
> extends AlwatrBaseSignal<StateConfig<StateName, EventName>> {
  /**
   * Current state
   */
  state: State<StateName, EventName>;

  /**
   * Fsm context object.
   */
  public context: Context;

  constructor(
    /**
     * Finite State Machine state configs
     */
    protected _config: MachineConfig<StateName, EventName, Context>,
  ) {
    super('FiniteStateMachine', 'fsm');
    this._logger.logMethodArgs?.('constructor', {_config});

    this.context = _config.context;

    this.state = {
      target: _config.initial,
      from: _config.initial,
      by: 'INIT',
    };

    this._execTransitionActions();
  }

  /**
   * Transition finite state machine instance to new state.
   */
  transition(event: EventName): void {
    const fromState = this.state.target;
    const transition = this._config.states[fromState]?.on[event] ?? this._config.states.$all.on[event];

    this._logger.logMethodArgs?.('transition', {fromState, event, target: transition?.target});

    if (transition == null) {
      this._logger.incident?.(
          'transition',
          'invalid_target_state',
          'Defined target state for this event not found in state config',
          {
            fromState,
            event,
            events: {
              ...this._config.states.$all?.on,
              ...this._config.states[fromState]?.on,
            },
          },
      );
      return;
    }

    if (this._execConditions(transition.conditions) !== true) return;

    this.state = {
      target: transition.target ?? fromState,
      from: fromState,
      by: event,
    };

    this._execTransitionActions();

    // TODO: call subscribers
  }

  // subscribe(callback: () => void): number {}

  // unsubscribe(listenerId: number): void {}

  /**
   * Reset finite state machine instance to initial state and context.
   */
  reset(): void {
    this.state = {
      target: this._config.initial,
      from: this._config.initial,
      by: 'INIT',
    };
  }

  /**
   * Execute all actions for current state.
   */
  protected async _execTransitionActions(): Promise<void> {
    this._logger.logMethodArgs?.('_execTransitionActions', {state: this.state});

    if (this.state.by === 'INIT') {
      await this._execActions(this._config.states.$all.entry);
      await this._execActions(this._config.states[this.state.target]?.entry);
      return;
    }
    // else

    if (this.state.from !== this.state.target) {
      await this._execActions(this._config.states.$all.exit);
      await this._execActions(this._config.states[this.state.from]?.exit);
      await this._execActions(this._config.states.$all.entry);
      await this._execActions(this._config.states[this.state.target]?.entry);
    }

    await this._execActions(
      this._config.states[this.state.from]?.on[this.state.by] != null
        ? this._config.states[this.state.from].on[this.state.by]?.actions
        : this._config.states.$all.on[this.state.by]?.actions,
    );
  }

  _execConditions(conditions: SingleOrArray<ConditionFn> | undefined): boolean {
    if (conditions == null) return true;

    if (Array.isArray(conditions)) {
      this._logger.logMethodArgs?.(
          '_execConditions',
          conditions.map((c) => c.name),
      );
      return conditions.map((condition) => this._execConditions(condition)).every((r) => r === true);
    }
    // else

    this._logger.logMethodArgs?.('_execConditions', conditions.name);

    try {
      return conditions.call(this);
    }
    catch (error) {
      this._logger.error('_execConditions', 'exec_condition_failed', error, conditions);
      return false;
    }
  }

  async _execActions(actions: SingleOrArray<ActionFn> | undefined): Promise<void> {
    if (actions == null) return;

    if (Array.isArray(actions)) {
      this._logger.logMethodArgs?.(
          '_execActions',
          actions.map((a) => a.name),
      );
      // exec all actions
      for (const action of actions) {
        await this._execActions(action);
      }
      return;
    }
    // else

    this._logger.logMethodArgs?.('_execActions', actions.name);

    try {
      await actions.call(this);
    }
    catch (error) {
      return this._logger.error('_execActions', 'exec_action_failed', error, actions);
    }
  }
}
