/* eslint-disable @typescript-eslint/no-unused-vars */
import {AlwatrBaseSignal} from '@alwatr/signal2/base.js';

import type {ActionName, ActionRecord, StateEventDetail, StateRecord} from './type.js';
import type {MaybePromise} from '@alwatr/type';

/**
 * Finite State Machine Base Class
 */
export abstract class FiniteStateMachineBase<S extends string, E extends string> extends AlwatrBaseSignal<S> {
  /**
   * Current state
   */
  protected get _state(): S {
    return this._getDetail()!;
  }

  /**
   * States and transitions config.
   */
  protected _stateRecord: StateRecord<S, E> = {};

  /**
   * Bind actions name to class methods
   */
  protected _actionRecord: ActionRecord<S, E> = {};

  protected _initialState: S;

  constructor(config: {name: string, loggerPrefix?: string, initialState: S}) {
    config.loggerPrefix ??= 'fsm';
    super(config);
    this._initialState = config.initialState;
    this._reset();
  }

  /**
   * Transition condition.
   */
  protected _shouldTransition(_eventDetail: StateEventDetail<S, E>): MaybePromise<boolean> {
    this._logger.logMethodFull?.('_shouldTransition', _eventDetail, true);
    return true;
  }

  /**
   * Transition finite state machine instance to new state.
   */
  protected async _transition(event: E): Promise<void> {
    const fromState = this._state;
    const toState = this._stateRecord[fromState]?.[event] ?? this._stateRecord._all?.[event];

    this._logger.logMethodArgs?.('_transition', {fromState, event, toState});

    if (toState == null) {
      this._logger.incident?.(
          'transition',
          'invalid_target_state',
          'Defined target state for this event not found in state config',
          {
            fromState,
            event,
          },
      );
      return;
    }

    const eventDetail: StateEventDetail<S, E> = {from: fromState, event, to: toState};

    if (await this._shouldTransition(eventDetail) !== true) return;

    this._dispatch(toState);

    this._transitioned(eventDetail);
  }

  /**
   * Execute all actions for current state.
   */
  protected async _transitioned(eventDetail: StateEventDetail<S, E>): Promise<void> {
    this._logger.logMethodArgs?.('_transitioned', eventDetail);

    await this._$execAction(`_on_${eventDetail.event}`, eventDetail);

    if (eventDetail.from !== eventDetail.to) {
      await this._$execAction(`_on_state_exit`, eventDetail);
      await this._$execAction(`_on_${eventDetail.from}_exit`, eventDetail);
      await this._$execAction(`_on_state_enter`, eventDetail);
      await this._$execAction(`_on_${eventDetail.to}_enter`, eventDetail);
    }

    if (`_on_${eventDetail.from}_${eventDetail.event}` in this) {
      this._$execAction(`_on_${eventDetail.from}_${eventDetail.event}`, eventDetail);
    }
    else {
      this._$execAction(`_on_all_${eventDetail.event}`, eventDetail);
    }
  }

  /**
   * Execute action name if defined in _actionRecord.
   */
  protected _$execAction(name: ActionName<S, E>, eventDetail: StateEventDetail<S, E>): MaybePromise<void> {
    const actionFn = this._actionRecord[name];
    if (typeof actionFn === 'function') {
      this._logger.logMethodArgs?.('_$execAction', name);
      return this._actionRecord[name]?.call(this, eventDetail);
    }
  }

  /**
   * Reset machine to initial state.
   */
  protected _reset(): void {
    this._$detail = this._initialState;
  }
}
