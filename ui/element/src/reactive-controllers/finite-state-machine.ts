import {FiniteStateMachine, type StateContext, type MachineConfig} from '@alwatr/fsm';

import {nothing, ReactiveController} from '../lit.js';

import type {LoggerMixinInterface} from '../mixins/logging.js';
import type {StringifyableRecord} from '@alwatr/type';

export declare class AlwatrElementHostController<
  TState extends string,
  TEventId extends string
> extends LoggerMixinInterface {
  stateUpdate(state: StateContext<TState, TEventId>): void;
}

export class FiniteStateMachineController<
    TState extends string,
    TEventId extends string,
    TContext extends StringifyableRecord
  >
  extends FiniteStateMachine<TState, TEventId, TContext>
  implements ReactiveController {
  constructor(
    private _host: AlwatrElementHostController<TState, TEventId>,
    config: Readonly<MachineConfig<TState, TEventId, TContext>>,
  ) {
    super(config);
    this._logger.logMethodArgs('constructor', config);
    this._host.addController(this);
  }

  protected override setState(to: TState, by: TEventId | 'INIT' ): void {
    super.setState(to, by);
    this._host.stateUpdate.call(this._host, this.state);
  }

  render(states: {[P in TState]?: (() => unknown) | TState}): unknown {
    this._logger.logMethodArgs('render', this.state.to);
    let renderFn = states[this.state.to];
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
    this._host.setAttribute('state', this.state.to);
  }
}
