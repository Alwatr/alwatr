import {createPersistentStateSignal, createStateSignal} from '@alwatr/signal';

import {FsmService} from './fsm-service.js';

import type {MachineEvent, MachineState, StateMachineConfig} from './type.js';

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
  const initialValue: MachineState<TState, TContext> = {
    name: config.initial,
    context: config.context,
  };

  const stateSignal =
    config.persistent ?
      createPersistentStateSignal<MachineState<TState, TContext>>({
        name: `fsm-state-${config.name}`,
        storageKey: config.persistent.storageKey ?? config.name,
        initialValue,
        schemaVersion: config.persistent.schemaVersion,
      })
    : createStateSignal<MachineState<TState, TContext>>({
        name: `fsm-state-${config.name}`,
        initialValue: initialValue,
      });

  return new FsmService(config, stateSignal);
}
