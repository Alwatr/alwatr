import {createLogger, globalAlwatr} from '@alwatr/logger';
import {contextConsumer, eventListener} from '@alwatr/signal';
import {dispatch} from '@alwatr/signal/core.js';

import type {FsmConfig, StateContext} from './type.js';
import type {ListenerSpec} from '@alwatr/signal/src/type.js';
import type {SingleOrArray, MaybePromise, StringifyableRecord} from '@alwatr/type';

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
  state: StateContext<TState, TEventId> = this.setState(this.config.initial, 'INIT');

  context = this.config.context;

  signal = contextConsumer.bind<StateContext<TState, TEventId>>('finite-state-machine-' + this.config.id);

  protected _logger = createLogger(`alwatr/fsm:${this.config.id}`);

  protected setState(target: TState, by: TEventId | 'INIT'): StateContext<TState, TEventId> {
    const state: StateContext<TState, TEventId> = (this.state = {
      target,
      from: this.signal.getValue()?.target ?? target,
      by,
    });

    dispatch<StateContext<TState, TEventId>>(this.signal.id, state, {debounce: 'NextCycle'});

    this.execAllActions().catch((err) => this._logger.error('myMethod', 'error_code', err));

    return state;
  }

  constructor(public readonly config: Readonly<FsmConfig<TState, TEventId, TContext>>) {
    this._logger.logMethodArgs('constructor', config);

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

    if ((await this.callFunction(transitionConfig.condition)) === false) {
      return;
    }

    transitionConfig.target ??= fromState;
    this.setState(transitionConfig.target, event);
  }

  protected async execAllActions(): Promise<void> {
    const state = this.state;
    const stateRecord = this.config.stateRecord;

    if (state.by === 'INIT') {
      await this.execActions(stateRecord.$all.entry);
      await this.execActions(stateRecord[state.target]?.entry);
      return;
    }
    // else
    if (state.from !== state.target) {
      await this.execActions(stateRecord.$all.exit);
      await this.execActions(stateRecord[state.from]?.exit);
      await this.execActions(stateRecord.$all.entry);
      await this.execActions(stateRecord[state.target]?.entry);
    }
    await this.execActions(stateRecord[state.from]?.on[state.by]?.actions ?? stateRecord.$all.on[state.by]?.actions);
  }

  protected async execActions(actions?: SingleOrArray<() => MaybePromise<void>>): Promise<void> {
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

  private _listenerList: Array<ListenerSpec> = [];

  protected subscribeSignals(): void {
    this.unsubscribeSignals();
    const signalList = this.config.signalList;
    if (signalList == null) return;

    for (const signalConfig of signalList) {
      const actions =
        signalConfig.actions ??
        ((signalDetail: unknown): void => {
          let context = undefined;
          if (signalConfig.contextName) {
            context = <Partial<TContext>>{
              [signalConfig.contextName]: signalDetail,
            };
          }
          this.transition(signalConfig.transition as TEventId, context);
        });

      if (Array.isArray(actions)) {
        for (const action of actions) {
          this._listenerList.push(
              eventListener.subscribe(signalConfig.signalId, action, {
                receivePrevious: signalConfig.receivePrevious ?? 'No',
              }),
          );
        }
      }
      else {
        this._listenerList.push(
            eventListener.subscribe(signalConfig.signalId, actions, {
              receivePrevious: signalConfig.receivePrevious ?? 'No',
            }),
        );
      }
    }
  }

  protected unsubscribeSignals(): void {
    if (this._listenerList.length === 0) return;
    for (const listener of this._listenerList) {
      eventListener.unsubscribe(listener);
    }
    this._listenerList.length = 0;
  }
}
