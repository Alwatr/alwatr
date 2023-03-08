import {createLogger, globalAlwatr} from '@alwatr/logger';
import {contextConsumer} from '@alwatr/signal';
import {dispatch} from '@alwatr/signal/core.js';

import type {FsmConfig, StateContext} from './type.js';
import type {MaybeArray, MaybePromise, StringifyableRecord} from '@alwatr/type';

export type {FsmConfig, StateContext};

globalAlwatr.registeredList.push({
  name: '@alwatr/fsm',
  version: _ALWATR_VERSION_,
});

export class FiniteStateMachine<
  TState extends string = string,
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
> {
  state: StateContext<TState, TEventId> = {
    target: this.config.initial,
    from: this.config.initial,
    by: 'INIT',
  };

  context = this.config.context;

  signal = contextConsumer.bind<StateContext<TState, TEventId>>('finite-state-machine-' + this.config.id);

  protected _logger = createLogger(`alwatr/fsm:${this.config.id}`);

  protected async setState(target: TState, by: TEventId): Promise<void> {
    const state = (this.state = {
      target: target,
      from: this.signal.getValue()?.target ?? target,
      by,
    });

    dispatch<StateContext<TState, TEventId>>(this.signal.id, state, {debounce: 'NextCycle'});

    if (state.from !== state.target) {
      await this.execActions(this.config.stateRecord.$all.exit);
      await this.execActions(this.config.stateRecord[state.from]?.exit);
      await this.execActions(this.config.stateRecord.$all.entry);
      await this.execActions(this.config.stateRecord[state.target]?.entry);
    }
    await this.execActions(
        this.config.stateRecord[state.from]?.on[state.by]?.actions ??
        this.config.stateRecord.$all.on[state.by]?.actions,
    );
  }

  constructor(public readonly config: Readonly<FsmConfig<TState, TEventId, TContext>>) {
    this._logger.logMethodArgs('constructor', config);
    dispatch<StateContext<TState, TEventId>>(this.signal.id, this.state, {debounce: 'NextCycle'});
    if (!config.stateRecord[config.initial]) {
      this._logger.error('constructor', 'invalid_initial_state', config);
    }
  }

  /**
   * Machine transition.
   */
  async transition(event: TEventId, context?: Partial<TContext>): Promise<void> {
    const fromState = this.state.target;
    const transitionConfig = this.config.stateRecord[fromState]?.on[event] ?? this.config.stateRecord.$all?.on[event];
    this._logger.logMethodArgs('transition', {fromState, event, context, target: transitionConfig?.target});

    if (context !== undefined) {
      this.context = {
        ...this.context,
        ...context,
      };
    }

    if (transitionConfig == null) {
      this._logger.incident(
          'transition',
          'invalid_target_state',
          'Defined target state for this event not found in state config',
          {
            fromState,
            event,
            events: {...this.config.stateRecord.$all?.on, ...this.config.stateRecord[fromState]?.on},
          },
      );
      return;
    }

    if (await this.callFunction(transitionConfig.condition) === false) {
      return;
    }

    transitionConfig.target ??= fromState;
    await this.setState(transitionConfig.target, event);
  }

  protected async execActions(actions?: MaybeArray<() => MaybePromise<void>>): Promise<void> {
    if (actions == null) return;

    try {
      if (!Array.isArray(actions)) {
        await this.callFunction(actions);
        return;
      }

      // else
      for (const action of actions) {
        await this.callFunction(action);
      }
    }
    catch (error) {
      this._logger.accident('execActions', 'action_error', 'Error in executing actions', error);
    }
  }

  protected callFunction<T>(fn?: () => T): T | void {
    if (typeof fn !== 'function') return;
    return fn();
  }
}
