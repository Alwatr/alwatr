import {createLogger, globalAlwatr, type AlwatrLogger} from '@alwatr/logger';
import {contextConsumer, type DispatchOptions} from '@alwatr/signal';
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
    [S in TState | '_']: {
      /**
       * An object mapping eventId (keys) to state.
       */
      on: {
        [E in TEventId]?: TState;
      }
    };
  };
}

export class FiniteStateMachine<
TState extends string,
TEventId extends string,
TContext extends Stringifyable,
> {
  stateConsumer;
  context: TContext;

  protected _logger: AlwatrLogger;

  get gotState(): TState {
    return this.stateConsumer.getValue() ?? this.config.initial;
  }

  protected setState(value: TState, options?: DispatchOptions): void {
    dispatch(this.stateConsumer.id, value, options);
  }

  constructor(public readonly config: Readonly<MachineConfig<TState, TEventId, TContext>>) {
    this._logger = createLogger(`alwatr/fsm:${config.id}`);
    this._logger.logMethodArgs('constructor', config);
    this.context = config.context;
    this.stateConsumer = contextConsumer.bind<TState>('finite-state-machine-' + this.config.id);
    this.setState(config.initial);
    if (!config.states[config.initial]) {
      this._logger.error('constructor', 'invalid_initial_state', config);
    }
  }

  /**
   * Machine transition.
   */
  transition(toEventId: TEventId, newContext?: TContext, options?: DispatchOptions): TState | null {
    const state = this.gotState;
    const nextState = this.config.states[state]?.on?.[toEventId] ?? this.config.states._?.on?.[toEventId];

    this._logger.logMethodFull('transition', {toEventId, newContext}, nextState);

    if (newContext !== undefined) {
      this.context = newContext;
    }

    if (nextState == null) {
      this._logger.incident(
          'transition',
          'invalid_target_state',
          'Defined target state for this event not found in state config',
          {
            eventName: toEventId,
            [state]: {...this.config.states._?.on, ...this.config.states[state]?.on},
          },
      );
      return null;
    }

    this.setState(nextState, options);
    return nextState;
  }
}
