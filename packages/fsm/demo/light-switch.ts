import {createFsmService} from '@alwatr/fsm';

import type {StateMachineConfig} from '@alwatr/fsm';

// 1. Define types
type LightContext = {brightness: number};
type LightState = 'on' | 'off';
type LightEvent = {type: 'TOGGLE'} | {type: 'SET_BRIGHTNESS'; level: number};

// 2. Config the state machine
const lightMachineConfig: StateMachineConfig<LightState, LightEvent, LightContext> = {
  name: 'light-switch',
  initial: 'off',
  context: {brightness: 0},
  states: {
    off: {
      on: {
        TOGGLE: {
          target: 'on',
          actions: [(_, context) => ({brightness: context.brightness || 100})],
        },
      },
    },
    on: {
      on: {
        TOGGLE: {target: 'off', actions: [() => ({brightness: 0})]},
        SET_BRIGHTNESS: {actions: [(event) => ({brightness: event.level})]},
      },
    },
  },
};

// 3. Create the service
const lightService = createFsmService(lightMachineConfig);

// 4. Use it in your application
lightService.stateSignal.subscribe((state) => {
  console.log(`Light is ${state.name} with brightness ${state.context.brightness}`);
});

lightService.eventSignal.dispatch({type: 'TOGGLE'}); // Light is on with brightness 100

lightService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 50}); // Light is on with brightness 50

// 5. Cleanup
// lightService.destroy();
