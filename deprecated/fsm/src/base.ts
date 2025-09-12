import {packageTracer} from '@alwatr/nanolib';
import {AlwatrObservable, type AlwatrObservableConfig} from '@alwatr/observable';

import type {ActionName, ActionRecord, StateEventDetail, StateRecord} from './type.js';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export interface AlwatrFluxStateMachineConfig<S extends string> extends AlwatrObservableConfig {
  initialState: S;
}

/**
 * Flux (Finite) State Machine Base Class
 */
export abstract class AlwatrFluxStateMachineBase<S extends string, E extends string> extends AlwatrObservable<{state: S}> {
  /**
   * States and transitions config.
   */
  protected stateRecord_: StateRecord<S, E> = {};

  /**
   * Bind actions name to class methods
   */
  protected actionRecord_: ActionRecord<S, E> = {};

  protected initialState_: S;

  protected override message_: {state: S};

  constructor(config: AlwatrFluxStateMachineConfig<S>) {
    config.loggerPrefix ??= 'flux-state-machine';
    super(config);

    this.initialState_ = config.initialState;
    this.message_ = {state: this.initialState_};
    setTimeout(this.resetToInitialState_.bind(this), 0);
  }

  private firstResetToInitialState__ = true;
  /**
   * Reset machine to initial state without notify.
   */
  protected resetToInitialState_(): Promise<void> {
    this.logger_.logMethod?.('resetToInitialState_');
    if (this.firstResetToInitialState__) {
      this.firstResetToInitialState__ = false;
      const eventDetail: StateEventDetail<S, E> = {from: this.initialState_, event: 'reset', to: this.initialState_};
      this.execAction__(`on_state_${this.initialState_}_enter`, eventDetail);
      return this.postTransition__(eventDetail);
    }
    // else {
    const from = this.message_.state;
    this.message_ = {state: this.initialState_};
    const eventDetail: StateEventDetail<S, E> = {from, event: 'reset', to: this.initialState_};
    return this.postTransition__(eventDetail);
  }

  /**
   * Transition condition.
   */
  protected shouldTransition_(_eventDetail: StateEventDetail<S, E>): Awaitable<boolean> {
    this.logger_.logMethodFull?.('shouldTransition_', _eventDetail, true);
    return true;
  }

  /**
   * Transition flux state machine instance to new state.
   */
  protected async transition_(event: E): Promise<void> {
    const fromState = this.message_.state;
    const toState = this.stateRecord_[fromState]?.[event];

    this.logger_.logMethodArgs?.('transition_', {fromState, event, toState});

    if (toState == null) {
      this.logger_.incident?.('transition', 'invalid_target_state', {
        fromState,
        event,
      });
      return;
    }

    const eventDetail: StateEventDetail<S, E> = {from: fromState, event, to: toState};

    if ((await this.shouldTransition_(eventDetail)) !== true) return;

    this.notify_({state: toState}); // message update but notify event delayed after execActions.

    this.postTransition__(eventDetail);
  }

  /**
   * Execute all actions for current state.
   */
  private async postTransition__(eventDetail: StateEventDetail<S, E>): Promise<void> {
    this.logger_.logMethodArgs?.('postTransition__', eventDetail);

    await this.execAction__(`on_event_${eventDetail.event}`, eventDetail);

    if (eventDetail.from !== eventDetail.to) {
      await this.execAction__(`on_any_state_exit`, eventDetail);
      await this.execAction__(`on_state_${eventDetail.from}_exit`, eventDetail);
      await this.execAction__(`on_any_state_enter`, eventDetail);
      await this.execAction__(`on_state_${eventDetail.to}_enter`, eventDetail);
    }

    this.execAction__(`on_state_${eventDetail.from}_event_${eventDetail.event}`, eventDetail);
  }

  /**
   * Execute action name if defined in _actionRecord.
   */
  private execAction__(name: ActionName<S, E | 'reset'>, eventDetail: StateEventDetail<S, E>): Awaitable<void> {
    const actionFn = this.actionRecord_[name];
    if (typeof actionFn === 'function') {
      this.logger_.logMethodArgs?.('execAction__', name);
      return actionFn.call(this, eventDetail);
    }
  }
}
