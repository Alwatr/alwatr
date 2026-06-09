import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import type {SingleOrArray} from '@alwatr/type-helper';
import {
  createEventSignal,
  EventSignal,
  createPersistentStateSignal,
  createStateSignal,
  type StateSignal,
  type PersistentStateSignal,
  type IReadonlySignal,
} from '@alwatr/signal';

import type {StateMachineConfig, MachineState, MachineEvent, Transition, Effect, Assigner, Actor} from './type.js';

/**
 * A generic, encapsulated service that creates, runs, and manages a finite state machine.
 * It handles signal creation, logic connection, and lifecycle management, providing a clean,
 * reactive API for interacting with the FSM.
 *
 * @template TState The union type of all possible state names.
 * @template TEvent The union type of all possible events.
 * @template TContext The type of the machine's context (extended state).
 */
export class FsmService<
  TState extends string,
  TEvent extends MachineEvent,
  TContext extends Record<string, unknown> = Record<string, never>,
> {
  protected readonly logger_: AlwatrLogger;

  /** The private event signal for sending events to the FSM. */
  private readonly eventSignal__: EventSignal<TEvent>;

  /** The public, read-only state signal. Subscribe to react to state changes. */
  public readonly stateSignal: IReadonlySignal<MachineState<TState, TContext>>;

  /** The set of cleanup functions for currently active state actors. */
  private readonly activeActorCleanups__ = new Set<() => void>();

  private readonly stateSignal__:
    | StateSignal<MachineState<TState, TContext>>
    | PersistentStateSignal<MachineState<TState, TContext>>;

  constructor(
    protected readonly config_: StateMachineConfig<TState, TEvent, TContext>,
    stateSignal?: StateSignal<MachineState<TState, TContext>> | PersistentStateSignal<MachineState<TState, TContext>>,
  ) {
    this.logger_ = createLogger(`fsm:${this.config_.name}`);
    this.logger_.logMethodArgs?.('constructor', config_);

    const initialValue: MachineState<TState, TContext> = {
      name: config_.initial,
      context: config_.context,
    };
    this.stateSignal__ =
      stateSignal
      ?? (config_.persistent ?
        createPersistentStateSignal<MachineState<TState, TContext>>({
          name: `fsm-state-${config_.name}`,
          storageKey: config_.persistent.storageKey ?? config_.name,
          initialValue,
          schemaVersion: config_.persistent.schemaVersion,
        })
      : createStateSignal<MachineState<TState, TContext>>({
          name: `fsm-state-${config_.name}`,
          initialValue,
        }));

    this.stateSignal = this.stateSignal__.asReadonly();
    this.eventSignal__ = createEventSignal<TEvent>({
      name: `fsm-event-${this.config_.name}`,
    });
    this.eventSignal__.subscribe((event) => this.processTransition__(event), {receivePrevious: false});

    // Execute initial state entry effects and actors.
    this.start_();
  }

  /**
   * Dispatches an event to the FSM mailbox.
   *
   * @param event The event to process.
   */
  public readonly dispatch = (event: TEvent): void => {
    this.logger_.logMethodArgs?.('dispatch', {event});
    this.eventSignal__.dispatch(event);
  };

  /**
   * The core FSM logic that processes a single event and transitions the machine to a new state.
   * This process is atomic and follows the Run-to-Completion (RTC) model.
   *
   * @param event The event to process.
   */
  private processTransition__(event: TEvent): void {
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
    const isExternalTransition = transition.target !== undefined;

    // 1. Execute exit effects and cleanup actors of the current state if it's an external transition.
    if (isExternalTransition) {
      this.executeEffects__(event, currentState.context, this.config_.states[currentState.name]?.exit);
      this.cleanupActors__();
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

    // 5. Execute entry effects and spawn actors of the new state if it's an external transition.
    if (isExternalTransition) {
      this.executeEffects__(event, nextState.context, this.config_.states[nextState.name]?.entry);
      this.spawnActors__(event, nextState.context, this.config_.states[nextState.name]?.actors);
    }
  }

  /**
   * Finds the first valid transition for the given event and context by evaluating guards.
   *
   * @param event The triggering event.
   * @param context The current machine context.
   * @returns The first matching transition or `undefined` if none are found.
   */
  private findTransition__(
    event: TEvent,
    context: Readonly<TContext>,
  ): Transition<TState, TEvent, TContext> | undefined {
    this.logger_.logMethod?.('findTransition__');

    const currentStateName = this.stateSignal__.get().name;
    const currentStateConfig = this.config_.states[currentStateName];
    const transitions = currentStateConfig?.on?.[event.type as TEvent['type']] as
      | SingleOrArray<Transition<TState, TEvent, TContext>>
      | undefined;

    if (!transitions) return undefined;

    const transitionsArray = Array.isArray(transitions) ? transitions : [transitions];

    for (let index = 0; index < transitionsArray.length; index++) {
      const transition = transitionsArray[index];
      if (!transition.guard) return transition;
      try {
        const guardMet = transition.guard({event, context});
        this.logger_.logStep?.('findTransition__', 'check_guard', {
          state: currentStateName,
          eventType: event.type,
          transitionIndex: index,
          guard: transition.guard.name || 'anonymous',
          result: guardMet,
        });
        if (guardMet) return transition;
      } catch (error) {
        this.logger_.error('findTransition__', 'guard_failed', error, {
          state: currentStateName,
          eventType: event.type,
          transitionIndex: index,
          guard: transition.guard.name || 'anonymous',
        });
      }
    }

    return undefined;
  }

  /**
   * Sequentially executes a list of effects (side-effects).
   * Errors are caught and logged without stopping the FSM.
   *
   * @param event The event that triggered these effects.
   * @param context The context at the time of execution.
   * @param effects A single effect or an array of effects.
   */
  private executeEffects__(
    event: TEvent,
    context: Readonly<TContext>,
    effects?: SingleOrArray<Effect<TEvent, TContext>>,
  ): void {
    if (!effects) {
      this.logger_.logMethodArgs?.('executeEffects__//skipped', {count: 0});
      return;
    }
    const effectsArray = Array.isArray(effects) ? effects : [effects];

    this.logger_.logMethodArgs?.('executeEffects__', {count: effectsArray.length});

    for (const effect of effectsArray) {
      try {
        const result = effect({event, context});
        if (result instanceof Promise) {
          result.catch((error) => {
            this.logger_.error('executeEffects__', 'effect_failed', error, {
              effect: effect.name || 'anonymous',
              state: this.stateSignal__.get().name,
              event,
              context,
            });
          });
        }
      } catch (error) {
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
  private applyAssigners__(
    event: TEvent,
    context: TContext,
    assigners?: SingleOrArray<Assigner<TEvent, TContext>>,
  ): TContext {
    if (!assigners) {
      this.logger_.logMethodArgs?.('applyAssigners__//skipped', {count: 0});
      return context;
    }

    const assignersArray = Array.isArray(assigners) ? assigners : [assigners];

    this.logger_.logMethodArgs?.('applyAssigners__', {count: assignersArray.length});

    try {
      let accContext = context;
      for (const assigner of assignersArray) {
        const nextContext = assigner({event, context: accContext});
        this.logger_.logMethodFull?.(
          `event.${event.type}.action.${assigner.name || 'anonymous'}`,
          {event, accContext},
          nextContext,
        );
        if (nextContext !== undefined && nextContext !== null) {
          accContext = nextContext;
        }
      }
      return accContext;
    } catch (error) {
      this.logger_.error('applyAssigners__', 'assigner_failed_atomic', error, {
        event,
        context, // Log the original context for debugging.
      });
      // On ANY failure, discard all changes and return the original context.
      return context;
    }
  }

  /**
   * Starts the FSM by executing the entry effects and spawning the actors
   * of the initial/current state.
   */
  protected start_(): void {
    if (this.eventSignal__.isDestroyed) return;
    this.logger_.logMethod?.('start_');
    const currentState = this.stateSignal__.get();
    const initEvent = {type: '__init__'} as unknown as TEvent;
    this.executeEffects__(initEvent, currentState.context, this.config_.states[currentState.name]?.entry);
    this.spawnActors__(initEvent, currentState.context, this.config_.states[currentState.name]?.actors);
  }

  /**
   * Spawns all configured actors for the entered state.
   */
  private spawnActors__(
    event: TEvent,
    context: Readonly<TContext>,
    actors?: SingleOrArray<Actor<TEvent, TContext>>,
  ): void {
    if (!actors) {
      this.logger_.logMethodArgs?.('spawnActors__//skipped', {count: 0});
      return;
    }
    const actorsArray = Array.isArray(actors) ? actors : [actors];

    this.logger_.logMethodArgs?.('spawnActors__', {count: actorsArray.length});

    for (const actor of actorsArray) {
      try {
        const cleanup = actor({
          context,
          dispatch: this.dispatch,
        });
        if (typeof cleanup === 'function') {
          this.activeActorCleanups__.add(cleanup);
        }
      } catch (error) {
        this.logger_.error('spawnActors__', 'actor_failed', error, {
          actor: actor.name || 'anonymous',
          state: this.stateSignal__.get().name,
          event,
          context,
        });
      }
    }
  }

  /**
   * Cleans up (destroys) all currently active state actors.
   */
  private cleanupActors__(): void {
    this.logger_.logMethodArgs?.('cleanupActors__', {count: this.activeActorCleanups__.size});
    for (const cleanup of this.activeActorCleanups__) {
      try {
        cleanup();
      } catch (error) {
        this.logger_.error('cleanupActors__', 'cleanup_failed', error);
      }
    }
    this.activeActorCleanups__.clear();
  }

  /**
   * Destroys the service, cleaning up all internal signals and subscriptions
   * to prevent memory leaks.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');
    this.cleanupActors__();
    this.eventSignal__.destroy();
    this.stateSignal__.destroy();
  }
}
