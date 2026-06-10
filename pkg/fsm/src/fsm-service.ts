import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import {queueMicrotask} from '@alwatr/delay';
import type {SingleOrArray} from '@alwatr/type-helper';
import {
  createPersistentStateSignal,
  createStateSignal,
  type StateSignal,
  type PersistentStateSignal,
  type IReadonlySignal,
} from '@alwatr/signal';

import type {StateMachineConfig, MachineState, MachineEvent, Transition, Effect, Assigner, StateActor} from './type.js';

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

  /** The public, read-only state signal. Subscribe to react to state changes. */
  public readonly stateSignal: IReadonlySignal<MachineState<TState, TContext>>;

  /**
   * The FIFO event mailbox. Events are processed strictly in dispatch order.
   */
  private readonly mailbox__: TEvent[] = [];

  /**
   * RTC re-entrancy guard. While `true`, an active loop is draining the mailbox;
   * re-entrant dispatches just enqueue and return.
   */
  private processing__ = true;

  /** Set once by `destroy()`. All dispatches after destruction are ignored (and logged). */
  private destroyed__ = false;

  /**
   * Cleanup callbacks for currently active state actors, in spawn order.
   * Executed in REVERSE (LIFO) order on state exit — standard resource semantics
   * (last acquired, first released).
   */
  private readonly activeActorCleanups__: (() => void)[] = [];

  private readonly stateSignal__:
    | StateSignal<MachineState<TState, TContext>>
    | PersistentStateSignal<MachineState<TState, TContext>>;

  constructor(
    protected readonly config_: StateMachineConfig<TState, TEvent, TContext>,
    stateSignal?: StateSignal<MachineState<TState, TContext>> | PersistentStateSignal<MachineState<TState, TContext>>,
  ) {
    this.logger_ = createLogger(`fsm:${this.config_.name}`);
    DEV_MODE && this.logger_.logMethodArgs?.('constructor', config_);

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

    // Execute initial/rehydrated state entry effects and spawn its actors.
    queueMicrotask(() => this.start_());
  }

  /**
   * Synchronous accessor for the current machine state.
   * Prefer `stateSignal.subscribe()` for reactive consumers; use this getter for
   * imperative checks inside controllers/services.
   */
  public get state(): MachineState<TState, TContext> {
    return this.stateSignal__.get();
  }

  /**
   * Convenience predicate: returns true if the current finite state matches any
   * of the given names. Sugar for `service.state.name === 'x' || ...`.
   */
  public matches(...names: TState[]): boolean {
    return names.includes(this.stateSignal__.get().name);
  }

  /**
   * Dispatches an event to the FSM mailbox.
   *
   * Events are processed with Run-to-Completion semantics: if dispatched while a
   * transition is in flight (re-entrant dispatch from a guard/effect/actor), the
   * event is enqueued and processed deterministically right after the current
   * transition completes — in the same call stack, in FIFO order, with no loss.
   *
   * @param event The event to process.
   */
  public readonly dispatch = (event: TEvent): void => {
    DEV_MODE && this.logger_.logMethodArgs?.('dispatch', {event});
    this.mailbox__.push(event);
    this.processMailbox__();
  };

  private processMailbox__(): void {
    // RTC guard: an active loop is already draining the mailbox; it will pick
    // this event up after the current transition finishes.
    if (this.processing__) return;
    DEV_MODE && this.logger_.logMethod?.('processMailbox__');
    if (this.destroyed__) {
      DEV_MODE && this.logger_.incident?.('dispatch', 'dispatch_after_destroy');
      return;
    }
    this.processing__ = true;
    try {
      // Do NOT cache length. New events may be added during processing, and they MUST be processed in the same order (FIFO).
      for (let index = 0; index < this.mailbox__.length; index++) {
        this.processTransition__(this.mailbox__[index]);
        if (this.destroyed__) break;
      }
    } finally {
      this.processing__ = false;
      this.mailbox__.length = 0;
    }
  }

  /**
   * The core FSM logic that processes a single event and transitions the machine to a new state.
   * This step is atomic: exit effects -> assigners -> state commit -> entry effects -> actors.
   *
   * @param event The event to process.
   */
  private processTransition__(event: TEvent): void {
    const currentState = this.stateSignal__.get();
    DEV_MODE && this.logger_.logMethodArgs?.('processTransition__', {state: currentState.name, event});

    const transition = this.findTransition__(event, currentState);

    if (!transition) {
      DEV_MODE
        && this.logger_.incident?.('processTransition__', 'ignored_event', 'No valid transition found for event', {
          state: currentState.name,
          event,
        });
      return; // Event ignored, no transition occurs.
    }

    const targetStateName = transition.target ?? currentState.name;
    const isExternalTransition = transition.target !== undefined;

    // 1. External transition: run exit effects (with the OLD context, per SCXML semantics) and tear down the current state's actors.
    if (isExternalTransition) {
      this.executeEffects__(event, currentState.context, this.config_.states[currentState.name]?.exit);
      this.cleanupActors__();
    }

    // 2. Apply assigners to compute the next context (pure, atomic).
    const nextContext = this.applyAssigners__(event, currentState.context, transition.assigner);

    // 3. Commit the new state, notifying all subscribers (async via signal layer).
    const nextState: MachineState<TState, TContext> = {
      name: targetStateName,
      context: nextContext,
    };
    this.stateSignal__.set(nextState);

    // 4. External transition: run entry effects (with the NEW context) and spawn the target state's actors.
    if (isExternalTransition) {
      this.executeEffects__(event, nextState.context, this.config_.states[nextState.name]?.entry);
      this.spawnActors__(event, nextState.context, this.config_.states[nextState.name]?.actor);
    }
  }

  /**
   * Finds the first valid transition for the given event by evaluating guards in declaration order. A guard-less transition acts as an unconditional fallback.
   *
   * @param event The triggering event.
   * @param currentState The current state of the machine.
   * @returns The first matching transition or `undefined` if none are found.
   */
  private findTransition__(
    event: TEvent,
    currentState: MachineState<TState, TContext>,
  ): Transition<TState, TEvent, TContext> | undefined {
    DEV_MODE && this.logger_.logMethod?.('findTransition__');

    const currentStateConfig = this.config_.states[currentState.name];
    const transitions = currentStateConfig?.on?.[event.type as TEvent['type']] as
      | SingleOrArray<Transition<TState, TEvent, TContext>>
      | undefined;

    if (!transitions) return undefined;

    if (!Array.isArray(transitions)) {
      if (!transitions.guard) return transitions; // Unconditional fallback branch.
      try {
        if (transitions.guard(event, currentState.context)) {
          return transitions;
        }
      } catch (error) {
        this.logger_.error('findTransition__', 'guard_failed', error, {
          state: currentState.name,
          eventType: event.type,
        });
      }
      return undefined;
    }

    // else if transitions is an array

    for (let index = 0; index < transitions.length; index++) {
      const transition = transitions[index];
      if (!transition.guard) return transition; // Unconditional fallback branch.
      try {
        if (transition.guard(event, currentState.context)) {
          return transition;
        }
      } catch (error) {
        this.logger_.error('findTransition__', 'guard_failed', error, {
          state: currentState.name,
          eventType: event.type,
          index,
        });
        // Treated as guard === false: continue evaluating the next branch.
      }
    }

    return undefined;
  }

  /**
   * Sequentially executes a list of synchronous effects (side-effects).
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
      DEV_MODE && this.logger_.logMethod?.('executeEffects__.skipped');
      return;
    }

    DEV_MODE && this.logger_.logMethod?.('executeEffects__');

    if (!Array.isArray(effects)) {
      try {
        effects(event, context);
      } catch (error) {
        this.logger_.error('executeEffects__', 'effect_failed', error, {
          event,
          context,
        });
      }
      return;
    }

    // else if effects is an array

    for (let index = 0; index < effects.length; index++) {
      const effect = effects[index];
      try {
        effect(event, context);
      } catch (error) {
        this.logger_.error('executeEffects__', 'effect_failed', error, {
          event,
          context,
          index,
        });
      }
    }
  }

  /**
   * Applies all assigner functions to the context to produce a new, updated context.
   *
   * This process is atomic (all-or-nothing): if any assigner throws, the original
   * context is returned and all updates are discarded.
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
      DEV_MODE && this.logger_.logMethod?.('applyAssigners__.skipped');
      return context;
    }

    DEV_MODE && this.logger_.logMethod?.('applyAssigners__');

    if (!Array.isArray(assigners)) {
      try {
        return assigners(event, context) ?? context;
      } catch (error) {
        this.logger_.error('applyAssigners__', 'assigner_failed_atomic', error, {event, context});
      }
      return context;
    }

    // else if assigners is an array

    try {
      let accContext = context;
      for (let index = 0; index < assigners.length; index++) {
        const assigner = assigners[index];
        const nextContext = assigner(event, accContext);
        if (nextContext) {
          accContext = nextContext;
        }
      }
      return accContext;
    } catch (error) {
      this.logger_.error('applyAssigners__', 'assigner_failed_atomic', error, {event, context});
      // On ANY failure, discard all changes and return the original context.
      return context;
    }
  }

  /**
   * Starts the FSM by executing the entry effects and spawning the actors of the
   * initial (or rehydrated) state, using the synthetic `{type: '__init__'}` event.
   */
  protected start_(): void {
    if (this.destroyed__) return;
    DEV_MODE && this.logger_.logMethod?.('start_');
    const currentState = this.stateSignal__.get();
    const initEvent = {type: '__init__'} as unknown as TEvent;
    this.executeEffects__(initEvent, currentState.context, this.config_.states[currentState.name]?.entry);
    this.spawnActors__(initEvent, currentState.context, this.config_.states[currentState.name]?.actor);
    this.processing__ = false; // Allow processing of dispatched events after the initial setup is complete.
    if (this.mailbox__.length > 0) {
      this.processMailbox__(); // Process any events that were dispatched during the initial setup.
    }
  }

  /**
   * Spawns all configured actors for the entered state.
   */
  private spawnActors__(
    event: TEvent,
    context: Readonly<TContext>,
    actors?: SingleOrArray<StateActor<TEvent, TContext>>,
  ): void {
    if (!actors) {
      DEV_MODE && this.logger_.logMethod?.('spawnActors__.skipped');
      return;
    }

    DEV_MODE && this.logger_.logMethod?.('spawnActors__');

    if (!Array.isArray(actors)) {
      try {
        const cleanup = actors(context, this.dispatch);
        if (typeof cleanup === 'function') {
          this.activeActorCleanups__.push(cleanup);
        }
      } catch (error) {
        this.logger_.error('spawnActors__', 'actor_failed', error, {event, context});
      }
      return;
    }

    // else if actors is an array

    for (let index = 0; index < actors.length; index++) {
      const actor = actors[index];
      try {
        const cleanup = actor(context, this.dispatch);
        if (typeof cleanup === 'function') {
          this.activeActorCleanups__.push(cleanup);
        }
      } catch (error) {
        this.logger_.error('spawnActors__', 'actor_failed', error, {event, context, index});
      }
    }
  }

  /**
   * Cleans up (destroys) all currently active state actors in REVERSE (LIFO) spawn order — standard resource-release semantics.
   */
  private cleanupActors__(): void {
    DEV_MODE && this.logger_.logMethodArgs?.('cleanupActors__', {count: this.activeActorCleanups__.length});
    for (let index = this.activeActorCleanups__.length - 1; index >= 0; index--) {
      try {
        this.activeActorCleanups__[index]();
      } catch (error) {
        this.logger_.error('cleanupActors__', 'cleanup_failed', error, {index});
      }
    }
    this.activeActorCleanups__.length = 0;
  }

  /**
   * Destroys the service, cleaning up actors, the mailbox, and owned signals to
   * prevent memory leaks. Idempotent — safe to call multiple times.
   *
   * @param destroyState If `true` (default), also destroys the state signal, preventing any future subscriptions or updates. Set to `false` to preserve the last state value for late subscribers even after destruction.
   */
  public destroy(destroyState = true): void {
    if (this.destroyed__) return;
    DEV_MODE && this.logger_.logMethod?.('destroy');
    this.destroyed__ = true;
    this.mailbox__.length = 0;
    this.cleanupActors__();
    if (destroyState) {
      this.stateSignal__.destroy();
    }
  }
}
