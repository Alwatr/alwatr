/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {AlwatrBaseSignal} from '@alwatr/signal2/base.js';
import {capitalize} from '@alwatr/util';

import type {MaybePromise} from '@alwatr/type';

type StateEventDetail<S, E> = {
  from: S;
  event: E;
  to: S;
};

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

  protected abstract stateRecord: Record<S | '_all', undefined | Record<E, undefined | S>>;

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

    const from = capitalize(eventDetail.from);
    const event = capitalize(eventDetail.event);
    const to = capitalize(eventDetail.to);

    await this._$execMethod(`_onEvent${event}`, eventDetail);

    if (eventDetail.from !== eventDetail.to) {
      await this._onStateExit(eventDetail);
      await this._$execMethod(`_on${from}Exit`, eventDetail);
      await this._onStateEnter(eventDetail);
      await this._$execMethod(`_on${to}Enter`, eventDetail);
    }

    if (`_on${from}${event}}` in this) {
      this._$execMethod(`_on${from}${event}}`, eventDetail);
    }
    else {
      this._$execMethod(`_onAll${event}}`, eventDetail);
    }
  }

  protected _$execMethod(name: string, eventDetail: StateEventDetail<S, E>): MaybePromise<void> {
    const _method = name as '_onStateExit'; // ts cheating ;)
    return this[_method]?.(eventDetail);
  }

  protected _onStateExit(_eventDetail: StateEventDetail<S, E>): MaybePromise<void> {}

  protected _onStateEnter(_eventDetail: StateEventDetail<S, E>): MaybePromise<void> {}
}
