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
          assigners: [() => ({brightness: 100})],
        },
      },
    },
    on: {
      on: {
        TOGGLE: {target: 'off', assigners: [() => ({brightness: 0})]},
        SET_BRIGHTNESS: [
          {
            target: 'off',
            guard: ({event}) => event.level === 0,
            assigners: () => ({brightness: 0}),
          },
          {
            guard: ({event}) => event.level > 0 && event.level <= 100,
            assigners: ({event}) => ({brightness: event.level}),
          },
        ],
      },
    },
  },
};

// 3. Create the service
const lightSwitchFsmService = createFsmService(lightMachineConfig);

// 4. Use it in your application
lightSwitchFsmService.stateSignal.subscribe((state) => {
  console.log(`Light turn ${state.name} with brightness ${state.context.brightness}`);
});

// --- test ---

const delay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10));
  console.log('\n\n');
};

console.log('start, state: %s', lightSwitchFsmService.stateSignal.get().name); // start, state: off

await delay();
lightSwitchFsmService.eventSignal.dispatch({type: 'TOGGLE'}); // Light turn on with brightness 100
await delay();
lightSwitchFsmService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 50}); // Light turn on with brightness 50
await delay();
lightSwitchFsmService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 200}); // Invalid brightness, no state change
await delay();
lightSwitchFsmService.eventSignal.dispatch({type: 'TOGGLE'}); // Light turn off with brightness 0
await delay();
lightSwitchFsmService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 75}); // Light turn off with brightness 0
await delay();
lightSwitchFsmService.eventSignal.dispatch({type: 'TOGGLE'}); // Light turn on with brightness 100
await delay();
lightSwitchFsmService.eventSignal.dispatch({type: 'SET_BRIGHTNESS', level: 0}); // Light turn off with brightness 0
await delay();

console.log('end, state: %s', lightSwitchFsmService.stateSignal.get().name); // end, state: off

// 5. Cleanup
lightSwitchFsmService.destroy();
