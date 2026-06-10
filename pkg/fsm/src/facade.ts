import {FsmService} from './fsm-service.js';

import type {Assigner, Effect, Guard, MachineEvent, StateActor, StateMachineConfig} from './type.js';

/**
 * A simple and clean factory function for creating an `FsmService` instance.
 * This is the recommended way to instantiate a new state machine.
 *
 * @template TState - The union type of all possible states.
 * @template TEvent - The union type of all possible events.
 * @template TContext - The type of the machine's context.
 *
 * @param config - The machine's configuration object.
 * @returns A new, ready-to-use instance of `FsmService`.
 *
 * @example
 * ```ts
 * import {createFsmService} from '@alwatr/fsm';
 * import type {StateMachineConfig} from '@alwatr/fsm';
 *
 * // 1. Define types
 * type LightContext = {brightness: number};
 * type LightState = 'on' | 'off';
 * type LightEvent = {type: 'TOGGLE'} | {type: 'SET_BRIGHTNESS'; level: number};
 *
 * // 2. Config the state machine
 * const lightMachineConfig: StateMachineConfig<LightState, LightEvent, LightContext> = {
 *   name: 'light-switch',
 *   initial: 'off',
 *   context: {brightness: 0},
 *   states: {
 *     off: {
 *       on: {
 *         TOGGLE: {
 *           target: 'on',
 *           assigners: [({context}) => ({...context, brightness: 100})],
 *         },
 *       },
 *     },
 *     on: {
 *       on: {
 *         TOGGLE: {target: 'off', assigners: [({context}) => ({...context, brightness: 0})]},
 *         SET_BRIGHTNESS: {assigners: [({context, event}) => ({...context, brightness: event.level})]},
 *       },
 *     },
 *   },
 * };
 *
 * // 3. Create the service
 * const lightService = createFsmService(lightMachineConfig);
 *
 * // 4. Use it in your application
 * lightService.stateSignal.subscribe((state) => {
 *   console.log(`Light is ${state.name} with brightness ${state.context.brightness}`);
 * });
 *
 * lightService.dispatch({type: 'TOGGLE'}); // Light is on with brightness 100
 *
 * lightService.dispatch({type: 'SET_BRIGHTNESS', level: 50}); // Light is on with brightness 50
 *
 * // 5. Cleanup
 * // lightService.destroy();
 * ```
 */
export function createFsmService<
  TState extends string,
  TEvent extends MachineEvent,
  TContext extends Record<string, unknown> = Record<string, never>,
>(config: StateMachineConfig<TState, TEvent, TContext>): FsmService<TState, TEvent, TContext> {
  return new FsmService(config);
}

/**
 * Utility for defining strongly-typed FSM configs with great DX.
 */
export function defineFsmConfig<
  TState extends string,
  TEvent extends MachineEvent,
  TContext extends Record<string, unknown> = Record<string, never>,
>(config: StateMachineConfig<TState, TEvent, TContext>): StateMachineConfig<TState, TEvent, TContext> {
  return config;
}

/**
 * Creates a set of type-safe helpers for defining StateActors, Effects, Assigners, and Guards bound to specific TEvent and TContext.
 * This avoids type casting (e.g. `as StateActor<TEvent, TContext>`) and provides contextual typing for function parameters.
 *
 * @template TEvent The union type of all events in the machine.
 * @template TContext The type of the machine's context.
 *
 * @example
 * ```ts
 * const {defineStateActors, defineEffects, defineAssigners, defineGuards, and, not} = createFsmHelpers<MyEvent, MyContext>();
 *
 * const actors = defineStateActors({
 *   fetchData: (context, dispatch) => { ... } // context and dispatch are contextually typed!
 * });
 * ```
 */
export function createFsmHelpers<
  TEvent extends MachineEvent,
  TContext extends Record<string, unknown> = Record<string, never>,
>() {
  return {
    defineFsmConfig: <TState extends string>(
      config: StateMachineConfig<TState, TEvent, TContext>,
    ): StateMachineConfig<TState, TEvent, TContext> => config,

    defineStateActor: (actor: StateActor<TEvent, TContext>): StateActor<TEvent, TContext> => actor,
    defineStateActors: <T extends Record<string, StateActor<TEvent, TContext>>>(actors: T): T => actors,

    defineEffect: (effect: Effect<TEvent, TContext>): Effect<TEvent, TContext> => effect,
    defineEffects: <T extends Record<string, Effect<TEvent, TContext>>>(effects: T): T => effects,

    defineAssigner: (assigner: Assigner<TEvent, TContext>): Assigner<TEvent, TContext> => assigner,
    defineAssigners: <T extends Record<string, Assigner<TEvent, TContext>>>(assigners: T): T => assigners,

    defineGuard: (guard: Guard<TEvent, TContext>): Guard<TEvent, TContext> => guard,
    defineGuards: <T extends Record<string, Guard<TEvent, TContext>>>(guards: T): T => guards,

    not: (guard: Guard<TEvent, TContext>): Guard<TEvent, TContext> => {
      return (event, context) => !guard(event, context);
    },

    and: (...guards: Guard<TEvent, TContext>[]): Guard<TEvent, TContext> => {
      return (event, context) => guards.every((guard) => guard(event, context));
    },

    or: (...guards: Guard<TEvent, TContext>[]): Guard<TEvent, TContext> => {
      return (event, context) => guards.some((guard) => guard(event, context));
    },
  } as const;
}
