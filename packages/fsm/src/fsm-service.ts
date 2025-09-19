import {createLogger} from '@alwatr/logger';
import {createStateSignal, createEventSignal} from '@alwatr/signal';

import type {StateMachineConfig, MachineState, MachineEvent, Transition, Effect, Assigner} from './type.js';

/**
 * A generic, encapsulated service that creates, runs, and manages a finite state machine.
 * It handles signal creation, logic connection, and lifecycle management, providing a clean,
 * reactive API for interacting with the FSM.
 *
 * @template TState The union type of all possible state names.
 * @template TEvent The union type of all possible events.
 * @template TContext The type of the machine's context (extended state).
 */
export class FsmService<TState extends string, TEvent extends MachineEvent, TContext extends Record<string, unknown>> {
  protected readonly logger_ = createLogger(`fsm: ${this.config_.name}`);

  /** The event signal for sending events to the FSM. */
  public readonly eventSignal = createEventSignal<TEvent>({
    name: `fsm-event-${this.config_.name}`,
  });

  private readonly stateSignal__ = createStateSignal<MachineState<TState, TContext>>({
    name: `fsm-state-${this.config_.name}`,
    initialValue: {
      name: this.config_.initial,
      context: this.config_.context,
    },
  });

  /** The public, read-only state signal. Subscribe to react to state changes. */
  public readonly stateSignal = this.stateSignal__.asReadonly();

  public constructor(protected readonly config_: StateMachineConfig<TState, TEvent, TContext>) {
    this.logger_.logMethodArgs?.('constructor', config_);
    this.eventSignal.subscribe(this.processTransition__.bind(this), {receivePrevious: false});
  }

  /**
   * The internal method that contains the core FSM logic.
   */
  protected async processTransition_(event: TEvent): Promise<void> {
    const currentState = this.stateSignal_.get();
    this.logger_.logMethodArgs?.('processTransition_', {state: currentState.name, event});

    // 1. find the current state definition
    const transition = this.findTransition__(event, currentState.context);

    if (!transition) {
      // Event ignored in the current state
      this.logger_.incident?.('processTransition_', 'transition_not_found', {
        currentState: currentState.name,
        requestedEvent: event.type,
      });
      return;
    }

    const targetState: Mutable<MachineState<TState, TContext>> = {
      name: transition.target ?? currentState.name,
      context: currentState.context,
    };

    // 2. Execute exit actions of the current state (if transition occurs)
    if (targetState.name !== currentState.name) {
      void this.executeEffects__(event, currentState.context, this.config_.states[currentState.name]?.exit);
    }

    // 3. Execute transition actions (pure context updates)
    targetState.context = this.applyAssigners__(event, targetState.context, transition.assigners);

    // 4. Set the final new state
    this.stateSignal_.set(targetState);

    // 5. Execute entry actions of the next state (if transition occurs)
    if (targetState.name !== currentState.name) {
      void this.executeEffects__(event, targetState.context, this.config_.states[targetState.name]?.entry);
    }
  }

  /**
   * Resolves the appropriate transition based on the current state and event.
   * It supports conditional transitions (guards).
   */
  private findTransition__(event: TEvent, context: Readonly<TContext>): Maybe<Transition<TState, TEvent, TContext>> {
    const currentState = this.stateSignal_.get();
    const currentStateConfig = this.config_.states[currentState.name];
    const transitionConfig = currentStateConfig?.on?.[event.type as TEvent['type']] as
      | SingleOrArray<Transition<TState, TEvent, TContext>>
      | undefined;

    if (!transitionConfig) {
      return undefined;
    }

    if (Array.isArray(transitionConfig)) {
      // Find the first transition whose condition is met
      return transitionConfig.find((transition, index) => {
        if (!transition.condition) return true; // No condition means always true
        
        try {
          const conditionResult = transition.condition(event, context);
          if (!conditionResult) {
            this.logger_.incident?.('findTransition_', 'condition_not_met', {
              currentState: currentState.name,
              requestedEvent: event.type,
              transitionIndex: index,
              condition: transition.condition.name || 'anonymous',
            });
          }
          return conditionResult; 
        }
        catch (error) {
          this.logger_.error('findTransition_', 'condition_check_failed', error, {
            currentState: currentState.name,
            requestedEvent: event.type,
            transitionIndex: index,
            transition,
          });
          return false;
        }
      });
    }

    // else
    try {
      if (transitionConfig.condition && !transitionConfig.condition?.(event, context)) {
        // The single transition has a condition that is not met
        return undefined;
      }
    }
    catch (error) {
      this.logger_.error('findTransition_', 'condition_check_failed', error, {
        currentState: currentState.name,
        requestedEvent: event.type,
        transitionConfig,
      });
      return undefined;
    }

    return transitionConfig;
  }

  /**
   * Sequentially executes a list of effects, handling errors and dispatching new events.
   */
  private async executeEffects__(
    event: TEvent,
    context: Readonly<TContext>,
    effects?: SingleOrArray<Effect<TEvent, TContext>>,
  ): Promise<void> {
    if (!effects) {
      this.logger_.logMethodArgs?.('executeEffects__//skipped', {effectsLength: 0});
      return;
    }
    const effectsArray: Effect<TEvent, TContext>[] = Array.isArray(effects) ? effects : [effects];

    this.logger_.logMethodArgs?.('executeEffects__', {effectsLength: effectsArray.length});

    for (const effect of effectsArray) {
      try {
        const result = await effect(event, context);
        if (result && 'type' in result) {
          this.logger_.logStep?.('executeEffects__', 'new_event_from_effect', {
            effectName: effect.name || 'anonymous',
            currentState: this.stateSignal_.get().name,
            event: event.type,
            newEvent: result.type,
          });
          this.eventSignal.dispatch(result);
        }
      }
      catch (error) {
        this.logger_.error('executeEffects_', 'effect_failed', error, {
          effectName: effect.name || 'anonymous',
          currentState: this.stateSignal_.get().name,
          event: event.type,
        });
      }
    }
  }

  /**
   * Applies all assigner actions for a transition to the context.
   * This is a pure function.
   */
  private applyAssigners__(event: TEvent, context: Readonly<TContext>, assigners?: SingleOrArray<Assigner<TEvent, TContext>>): TContext {
    if (!assigners) {
      this.logger_.logMethodArgs?.('applyAssigners__//skipped', {assignersLength: 0});
      return context;
    }
    const assignersArray = Array.isArray(assigners) ? assigners : [assigners];

    this.logger_.logMethodArgs?.('applyAssigners__', {assignersLength: assignersArray.length});
    let newContext = context;

    for (const assigner of assignersArray) {
      try {
        const update = assigner(event, context);
        this.logger_.logMethodFull?.(`event.${event.type}.action.${assigner.name || 'anonymous'}`, {event, context}, update);
        if (typeof update === 'object' && update !== null) {
          newContext = {...newContext, ...update};
        }
      }
      catch (error) {
        this.logger_.error('applyAssigners__', 'assigner_failed', error, {
          context: newContext,
          event,
        });
        // If an assigner fails, revert all changes from this transition by returning the original context.
        return context;
      }
    }

    return newContext;
  }

  /**
   * Destroys the service, cleaning up all internal signals and subscriptions
   * to prevent memory leaks. This should be called when the component using
   * the service is unmounted.
   */
  public destroy(): void {
    this.eventSignal.destroy();
    this.stateSignal.destroy();
  }
}
