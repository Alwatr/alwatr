import {createLogger, globalAlwatr} from '@alwatr/logger';
import {contextConsumer} from '@alwatr/signal';
import {dispatch} from '@alwatr/signal/core.js';

import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/fsm',
  version: _ALWATR_VERSION_,
});

export interface MachineConfig<TState extends string, TEventId extends string, TContext extends Stringifyable>
  extends StringifyableRecord {
  /**
   * Machine ID (It is used in the state change signal identifier, so it must be unique).
   */
  id: string;

  /**
   * Initial state.
   */
  initial: TState;

  /**
   * Initial context.
   */
  context: TContext;

  /**
   * States list
   */
  states: {
    [S in TState | '$all']: {
      /**
       * An object mapping eventId (keys) to state.
       */
      on: {
        [E in TEventId]?: TState | '$self';
      };
    };
  };
}

export interface StateContext<TState extends string, TEventId extends string> {
  [T: string]: string;
  to: TState;
  from: TState | 'init';
  by: TEventId | 'INIT';
}

export class FiniteStateMachine<
  TState extends string = string,
  TEventId extends string = string,
  TContext extends StringifyableRecord = StringifyableRecord
> {
  state: StateContext<TState, TEventId> = {
    to: this.config.initial,
    from: 'init',
    by: 'INIT',
  };
  context = this.config.context;
  signal = contextConsumer.bind<StateContext<TState, TEventId>>('finite-state-machine-' + this.config.id);

  protected _logger = createLogger(`alwatr/fsm:${this.config.id}`);

  protected setState(to: TState, by: TEventId | 'INIT'): void {
    this.state = {
      to,
      from: this.signal.getValue()?.to ?? 'init',
      by,
    };
    dispatch<StateContext<TState, TEventId>>(this.signal.id, this.state, {debounce: 'NextCycle'});
  }

  constructor(public readonly config: Readonly<MachineConfig<TState, TEventId, TContext>>) {
    this._logger.logMethodArgs('constructor', config);
    dispatch<StateContext<TState, TEventId>>(this.signal.id, this.state, {debounce: 'NextCycle'});
    if (!config.states[config.initial]) {
      this._logger.error('constructor', 'invalid_initial_state', config);
    }
  }

  /**
   * Machine transition.
   */
  transition(event: TEventId, context?: Partial<TContext>): TState | null {
    const fromState = this.state.to;

    let toState: TState | '$self' | undefined =
      this.config.states[fromState]?.on?.[event] ?? this.config.states.$all?.on?.[event];

    if (toState === '$self') {
      toState = fromState;
    }

    this._logger.logMethodFull('transition', {event, context}, toState);

    if (context !== undefined) {
      this.context = {
        ...this.context,
        ...context,
      };
    }

    if (toState == null) {
      this._logger.incident(
          'transition',
          'invalid_target_state',
          'Defined target state for this event not found in state config',
          {
            event,
            [fromState]: {...this.config.states.$all?.on, ...this.config.states[fromState]?.on},
          },
      );
      return null;
    }

    this.setState(toState, event);
    return toState;
  }
}
