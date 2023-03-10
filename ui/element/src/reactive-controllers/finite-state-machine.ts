import {FiniteStateMachine, type FsmConfig} from '@alwatr/fsm';

import {nothing, type ReactiveController} from '../lit.js';

import type {LoggerMixinInterface} from '../mixins/logging.js';
import type {StringifyableRecord} from '@alwatr/type';

export class FiniteStateMachineController<
    TState extends string,
    TEventId extends string,
    TContext extends StringifyableRecord
  > extends FiniteStateMachine<TState, TEventId, TContext> implements ReactiveController {
  constructor(
    private _host: LoggerMixinInterface,
    config: Readonly<FsmConfig<TState, TEventId, TContext>>,
  ) {
    super(config);
    this._host.addController(this);
    if (!this.config.autoSignalUnsubscribe) {
      this.subscribeSignals();
    }
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
    if (this.config.autoSignalUnsubscribe) {
      this.subscribeSignals();
    }
  }

  hostDisconnected(): void {
    if (this.config.autoSignalUnsubscribe) {
      this.unsubscribeSignals();
    }
  }
}
