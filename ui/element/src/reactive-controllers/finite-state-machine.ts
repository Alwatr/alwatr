import {FiniteStateMachine, type FsmConfig} from '@alwatr/fsm';
import {eventListener, ListenerSpec} from '@alwatr/signal';

import {nothing, type ReactiveController} from '../lit.js';

import type {LoggerMixinInterface} from '../mixins/logging.js';
import type {ListenerFunction} from '@alwatr/signal/type.js';
import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

export class FiniteStateMachineController<
    TState extends string,
    TEventId extends string,
    TContext extends StringifyableRecord
  > extends FiniteStateMachine<TState, TEventId, TContext> implements ReactiveController {
  // FIXME: Choose a proper name
  private _listenerList: ListenerSpec[] = [];

  constructor(
    private _host: LoggerMixinInterface,
    config: Readonly<FsmConfig<TState, TEventId, TContext>>,
  ) {
    super(config);
    this._host.addController(this);
  }

  render(states: {[P in TState]?: (() => unknown) | TState}): unknown {
    this._logger.logMethodArgs('render', this.state.target);
    let renderFn = states[this.state.target];
    if (typeof renderFn === 'string') {
      renderFn = states[<TState>renderFn];
    }
    if (typeof renderFn === 'function') {
      return renderFn?.call(this._host);
    }
    // else
    return nothing;
  }

  hostUpdate(): void {
    this._host.setAttribute('state', this.state.target);
  }

  protected override callFunction<T>(fn?: () => T): T | void {
    if (typeof fn !== 'function') return;
    return fn.call(this._host);
  }

  hostConnected(): void {
    const signalRecord = this.config.signalRecord;
    if (signalRecord == null) return;

    for (const signalId of Object.keys(signalRecord)) {
      let listenerCallback: ListenerFunction<Stringifyable> | null = null;

      if ('transition' in signalRecord[signalId]) {
        listenerCallback = (): void => {
          this.transition(signalRecord[signalId].transition as TEventId);
        };
      }

      if ('actions' in signalRecord[signalId]) {
        // TODO: Check array type of `actions`

        if (!Array.isArray(signalRecord?.[signalId].actions)) {
          listenerCallback = signalRecord?.[signalId].actions as ListenerFunction<Stringifyable>;
        }
      }

      if (listenerCallback) {
        this._listenerList.push(
            eventListener.subscribe(signalId, listenerCallback),
        );
      }
    }
  }

  hostDisconnected(): void {
    for (const listener of this._listenerList) {
      eventListener.unsubscribe(listener);
    }
  }
}
