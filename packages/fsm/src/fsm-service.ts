import {createLogger} from '@alwatr/logger';
import {createStateSignal, createEventSignal, createComputedSignal} from '@alwatr/signal';

import type {StateMachineConfig, MachineState, MachineEvent} from './type.js';

/**
 * A generic, encapsulated service that creates, runs, and manages a finite state machine.
 * It handles signal creation, logic connection, and lifecycle management, providing a clean,
 * reactive API for interacting with the FSM.
 *
 * @template TState The union type of all possible state names.
 * @template TEvent The union type of all possible events.
 * @template TContext The type of the machine's context (extended state).
 */
export class FsmService<TState extends string, TEvent extends MachineEvent, TContext extends DictionaryOpt<unknown>> {
  protected readonly logger_ = createLogger(`fsm: ${this.config_.name}`);

  public readonly eventSignal = createEventSignal<TEvent>({
    name: `fsm-event-${this.config_.name}`,
  });

  protected readonly stateSignal_ = createStateSignal<MachineState<TState, TContext>>({
    name: `fsm-state-${this.config_.name}__`,
    initialValue: {
      name: this.config_.initial,
      context: this.config_.context,
    },
  });

  /**
   * The public, read-only state signal.
   * Subscribe to this signal in your UI to react to state changes.
   */
  public readonly stateSignal = createComputedSignal<MachineState<TState, TContext>>({
    name: `fsm-state-${this.config_.name}`,
    deps: [this.stateSignal_],
    get: () => this.stateSignal_.get(),
  });

  public constructor(protected readonly config_: StateMachineConfig<TState, TEvent, TContext>) {
    this.logger_.logMethodArgs?.('constructor', config_);
    this.eventSignal.subscribe(this.processTransition_.bind(this), {receivePrevious: false});
  }

  /**
   * The internal method that contains the core FSM logic.
   */
  protected async processTransition_(event: TEvent): Promise<void> {
    this.logger_.logMethodArgs?.('processTransition_', event);

    const currentState = this.stateSignal_.get();
    const currentStateDefinition = this.config_.states[currentState.name];
    const transition = currentStateDefinition?.on?.[event.type as TEvent['type']];

    if (!transition) {
      // Event ignored in the current state
      this.logger_.incident?.('processTransition_', 'transition_not_found', {
        currentState: currentState.name,
        requestedEvent: event.type,
      });
      return;
    }

    let newContext = currentState.context;

    // 1. Execute exit actions of the current state
    if (currentStateDefinition.exit?.length) {
      for (const effect of currentStateDefinition.exit ?? []) {
        Promise.resolve(effect(event, newContext)).then((result) => {
          if (result && 'type' in result) {
            this.logger_.logStep?.('processTransition_', 'new_event_from_exit_effect', {
              currentState: currentState.name,
              requestedEvent: event.type,
              newEvent: result.type,
            });
            this.eventSignal.dispatch(result);
          }
        });
      }
    }

    // 2. Execute transition actions (pure context updates)
    if (transition.actions?.length) {
      for (const assigner of transition.actions) {
        const update = assigner(event as Extract<TEvent, {type: TEvent['type']}>, newContext);
        this.logger_.logMethodFull?.(`event.${event.type}.action.${assigner.name || 'anonymous'}`, {event, newContext}, update);
        if (update) {
          newContext = {
            ...newContext,
            ...update,
          };
        }
      }
    }

    const nextStateValue = transition.target ?? currentState.name;

    // 3. Execute entry actions of the next state (if transition occurs)
    if (nextStateValue !== currentState.name) {
      const nextStateDefinition = this.config_.states[nextStateValue];
      if (nextStateDefinition && nextStateDefinition.entry?.length) {
        for (const effect of nextStateDefinition.entry) {
          Promise.resolve(effect(event, newContext)).then((result) => {
            if (result && 'type' in result) {
              this.logger_.logStep?.('processTransition_', 'new_event_from_enter_effect', {
                currentState: currentState.name,
                requestedEvent: event.type,
                newEvent: result.type,
              });
              this.eventSignal.dispatch(result);
            }
          });
        }
      }
    }

    // 4. Set the final new state
    this.stateSignal_.set({
      name: nextStateValue,
      context: newContext,
    });
  }

  /**
   * Destroys the service, cleaning up all internal signals and subscriptions
   * to prevent memory leaks. This should be called when the component using
   * the service is unmounted.
   */
  public destroy(): void {
    this.stateSignal_.destroy();
    this.stateSignal.destroy();
    this.eventSignal.destroy();
  }
}
