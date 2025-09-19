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
  protected readonly logger_ = createLogger(`fsm:${this.config_.name}`);

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
   * The core FSM logic that processes a single event and transitions the machine to a new state.
   * This process is atomic and follows the Run-to-Completion (RTC) model.
   *
   * @param event The event to process.
   */
  private async processTransition__(event: TEvent): Promise<void> {
    const currentState = this.stateSignal__.get();
    this.logger_.logMethodArgs?.('processTransition__', {state: currentState.name, event});

    const transition = this.findTransition__(event, currentState.context);

    if (!transition) {
      this.logger_.incident?.('processTransition__', 'ignored_event', 'No valid transition found for event', {
        state: currentState.name,
        event,
      });
      return; // Event ignored, no transition occurs.
    }

    const targetStateName = transition.target ?? currentState.name;

    // 1. Execute exit effects of the current state if transitioning to a new state.
    if (targetStateName !== currentState.name) {
      void this.executeEffects__(event, currentState.context, this.config_.states[currentState.name]?.exit);
    }

    // 2. Apply assigners to compute the next context. This is a pure function.
    const nextContext = this.applyAssigners__(event, currentState.context, transition.assigners);

    // 3. Create the final next state object.
    const nextState: MachineState<TState, TContext> = {
      name: targetStateName,
      context: nextContext,
    };

    // 4. Set the new state, notifying all subscribers.
    this.stateSignal__.set(nextState);

    // 5. Execute entry effects of the new state if a transition occurred.
    if (nextState.name !== currentState.name) {
      void this.executeEffects__(event, nextState.context, this.config_.states[nextState.name]?.entry);
    }
  }

  /**
   * Finds the first valid transition for the given event and context by evaluating conditions.
   *
   * @param event The triggering event.
   * @param context The current machine context.
   * @returns The first matching transition or `undefined` if none are found.
   */
  private findTransition__(event: TEvent, context: Readonly<TContext>): Transition<TState, TEvent, TContext> | undefined {
    this.logger_.logMethod?.('findTransition__');

    const currentStateName = this.stateSignal__.get().name;
    const currentStateConfig = this.config_.states[currentStateName];
    const transitions = currentStateConfig?.on?.[event.type as TEvent['type']] as
      | SingleOrArray<Transition<TState, TEvent, TContext>>
      | undefined;

    if (!transitions) return undefined;

    // Normalize to an array to handle both single and multiple transitions uniformly.
    const transitionsArray = Array.isArray(transitions) ? transitions : [transitions];

    return transitionsArray.find((transition, index) => {
      if (!transition.condition) return true; // A transition without a condition is always valid.

      try {
        const conditionMet = transition.condition(event, context);
        this.logger_.logStep?.('findTransition__', 'check_condition', {
          state: currentStateName,
          eventType: event.type,
          transitionIndex: index,
          condition: transition.condition.name || 'anonymous',
          result: conditionMet,
        });
        return conditionMet;
      }
      catch (error) {
        this.logger_.error('findTransition__', 'condition_failed', error, {
          state: currentStateName,
          eventType: event.type,
          transitionIndex: index,
          condition: transition.condition.name || 'anonymous',
        });
        return false; // Treat a failing condition as not met.
      }
    });
  }

  /**
   * Sequentially executes a list of effects (side-effects).
   * Errors are caught and logged without stopping the FSM.
   *
   * @param event The event that triggered these effects.
   * @param context The context at the time of execution.
   * @param effects A single effect or an array of effects.
   */
  private async executeEffects__(
    event: TEvent,
    context: Readonly<TContext>,
    effects?: SingleOrArray<Effect<TEvent, TContext>>,
  ): Promise<void> {
    if (!effects) {
      this.logger_.logMethodArgs?.('executeEffects__//skipped', {count: 0});
      return;
    }
    const effectsArray: Effect<TEvent, TContext>[] = Array.isArray(effects) ? effects : [effects];

    this.logger_.logMethodArgs?.('executeEffects__', {count: effectsArray.length});

    for (const effect of effectsArray) {
      try {
        const result = await effect(event, context);
        // If an effect returns a new event, dispatch it to be processed next.
        if (result && 'type' in result) {
          this.logger_.logStep?.('executeEffects__', 'new_event_from_effect', {
            effect: effect.name || 'anonymous',
            state: this.stateSignal__.get().name,
            newEvent: result.type,
          });
          this.eventSignal.dispatch(result);
        }
      }
      catch (error) {
        this.logger_.error('executeEffects__', 'effect_failed', error, {
          effect: effect.name || 'anonymous',
          state: this.stateSignal__.get().name,
          event,
          context,
        });
      }
    }
  }

  /**
   * Applies all assigner functions to the context to produce a new, updated context.
   * This process is atomic (all-or-nothing). If any assigner fails, the original
   * context is returned, and all updates are discarded.
   *
   * @param event The event that triggered the transition.
   * @param context The current context.
   * @param assigners A single assigner or an array of assigners.
   * @returns The new, updated context, or the original context if any assigner fails.
   */
  private applyAssigners__(event: TEvent, context: Readonly<TContext>, assigners?: SingleOrArray<Assigner<TEvent, TContext>>): TContext {
    if (!assigners) {
      this.logger_.logMethodArgs?.('applyAssigners__//skipped', {count: 0});
      return context;
    }

    const assignersArray: Assigner<TEvent, TContext>[] = Array.isArray(assigners) ? assigners : [assigners];

    this.logger_.logMethodArgs?.('applyAssigners__', {count: assignersArray.length});

    try {
      // The entire reduce operation is wrapped in a single try/catch block
      // to ensure atomic updates.
      return assignersArray.reduce((accContext, assigner) => {
        const partialUpdate = assigner(event, accContext);
        this.logger_.logMethodFull?.(`event.${event.type}.action.${assigner.name || 'anonymous'}`, {event, accContext}, partialUpdate);
        if (typeof partialUpdate === 'object' && partialUpdate !== null) {
          // The next assigner receives the updated context from the previous one.
          return {...accContext, ...partialUpdate};
        }
        // If an assigner returns nothing, pass the accumulated context along.
        return accContext;
      }, context);
    }
    catch (error) {
      this.logger_.error('applyAssigners__', 'assigner_failed_atomic', error, {
        event,
        context, // Log the original context for debugging.
      });
      // On ANY failure, discard all changes and return the original context.
      return context;
    }
  }

  /**
   * Destroys the service, cleaning up all internal signals and subscriptions
   * to prevent memory leaks.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');
    this.eventSignal.destroy();
    this.stateSignal.destroy();
  }
}
