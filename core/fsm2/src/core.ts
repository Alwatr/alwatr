/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {AlwatrBaseSignal} from '@alwatr/signal2/base.js';

import type {MaybePromise} from '@alwatr/type';

export type StateEventDetail<S, E> = {
  from: S;
  event: E;
  to: S;
};

export type StateRecord<S extends string, E extends string> = Partial<Record<S | '_all', Partial<Record<E, S>>>>;

export interface Action<S extends string, E extends string> {
  (): MaybePromise<void>;
  (eventDetail: StateEventDetail<S, E>): MaybePromise<void>;
}

export type ActionName<S extends string, E extends string> =
  | `_on_${E}`
  | `_on_${S}_exit`
  | `_on_${S}_enter`
  | `_on_${S}_${E}`
  | `_on_all_${E}`;

export type ActionRecord<S extends string, E extends string> = Partial<Record<ActionName<S, E>, Action<S, E>>>;

/**
 * Finite State Machine Base Class
 */
export abstract class FiniteStateMachineBase<S extends string, E extends string> extends AlwatrBaseSignal<S> {
  /**
   * Current state
   */
  protected get state(): S {
    return this._getDetail()!;
  }

  protected abstract stateRecord: StateRecord<S, E>;

  protected abstract actionRecord: ActionRecord<S, E>;

  constructor(name: string, protected _initial: S) {
    super(name, 'fsm');
    this._$detail = _initial;
  }

  protected _shouldTransition(_eventDetail: StateEventDetail<S, E>): MaybePromise<boolean> {
    return true;
  }

  /**
   * Transition finite state machine instance to new state.
   */
  protected async _transition(event: E): Promise<void> {
    const fromState = this.state;
    const toState = this.stateRecord[fromState]?.[event] ?? this.stateRecord._all?.[event];

    this._logger.logMethodArgs?.('transition', {fromState, event, toState});

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

    if ((await this._shouldTransition(eventDetail)) !== true) return;

    this._dispatch(toState);

    this._transitioned(eventDetail);
  }

  /**
   * Execute all actions for current state.
   */
  protected async _transitioned(eventDetail: StateEventDetail<S, E>): Promise<void> {
    this._logger.logMethodArgs?.('eventDetail', eventDetail);

    await this._$execMethod(`_on_${eventDetail.event}`, eventDetail);

    if (eventDetail.from !== eventDetail.to) {
      await this._onStateExit(eventDetail);
      await this._$execMethod(`_on_${eventDetail.from}_exit`, eventDetail);
      await this._onStateEnter(eventDetail);
      await this._$execMethod(`_on_${eventDetail.to}_enter`, eventDetail);
    }

    if (`_on_${eventDetail.from}_${eventDetail.event}` in this) {
      this._$execMethod(`_on_${eventDetail.from}_${eventDetail.event}`, eventDetail);
    }
    else {
      this._$execMethod(`_on_all_${eventDetail.event}`, eventDetail);
    }
  }

  protected _$execMethod(name: ActionName<S, E>, eventDetail: StateEventDetail<S, E>): MaybePromise<void> {
    return this.actionRecord[name]?.(eventDetail);
  }

  protected _onStateExit(_eventDetail: StateEventDetail<S, E>): MaybePromise<void> {}

  protected _onStateEnter(_eventDetail: StateEventDetail<S, E>): MaybePromise<void> {}
}
