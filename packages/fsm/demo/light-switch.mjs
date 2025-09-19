import {createFsmService} from '@alwatr/fsm';

/**
 * @typedef {Object} LightContext
 * @property {number} brightness
 */

/** @typedef {'on'|'off'} LightState */

/**
 * @typedef {Object} ToggleEvent
 * @property {'TOGGLE'} type
 */

/**
 * @typedef {Object} SetBrightnessEvent
 * @property {'SET_BRIGHTNESS'} type
 * @property {number} level
 */

/** @typedef {ToggleEvent | SetBrightnessEvent} LightEvent */

/**
 * @type {import('@alwatr/fsm').StateMachineConfig<LightState, LightEvent, LightContext>}
 */
const lightMachineConfig = {
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
const lightSwitchFsmService = createFsmService(lightMachineConfig);

// 4. Use it in your application
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

lightSwitchFsmService.stateSignal.subscribe((state) => {
  console.log(`Light is ${state.name} with brightness ${state.context.brightness}`);
});

console.log('start, state: %s', lightSwitchFsmService.stateSignal.get().name);

await delay(10); console.log('\n\n');
lightSwitchFsmService.eventSignal.dispatch({type: 'TOGGLE'}); // Light is on with brightness 100
await delay(10); console.log('\n\n');
lightSwitchFsmService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 50}); // Light is on with brightness 50
await delay(10); console.log('\n\n');
lightSwitchFsmService.eventSignal.dispatch({type: 'TOGGLE'}); // Light is off with brightness 0
await delay(10); console.log('\n\n');
lightSwitchFsmService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 75}); // Light is off with brightness 0
await delay(10); console.log('\n\n');
lightSwitchFsmService.eventSignal.dispatch({type: 'TOGGLE'}); // Light is on with brightness 100
await delay(10); console.log('\n\n');

console.log('end, state: %s', lightSwitchFsmService.stateSignal.get().name);

// 5. Cleanup
lightSwitchFsmService.destroy();
