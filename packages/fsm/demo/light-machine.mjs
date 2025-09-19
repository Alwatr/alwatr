import {createFsmService} from '@alwatr/fsm';

// 1. Define types
/** @typedef {'green' | 'yellow' | 'red' | 'flashingRed'} State */
/** @typedef {{type: 'TIMER'} | {type: 'POWER_BACK'} | {type: 'POWER_LOST'}} Event */

// 2. Define some actions
const powerLostWarning = () => {
  console.warn('Power lost!');
};

// 3. Config the state machine
/**
 * @type {import('@alwatr/fsm').StateMachineConfig<State, Event, Record<string, unknown>>}
 */
const lightMachineFsm = {
  name: 'light-machine',
  initial: 'green',
  context: {},
  states: {
    green: {
      on: {
        TIMER: {
          target: 'yellow',
        },
        POWER_LOST: {
          target: 'flashingRed',
          actions: [powerLostWarning],
        },
      },
    },
    yellow: {
      on: {
        TIMER: {
          target: 'red',
        },
        POWER_LOST: {
          target: 'flashingRed',
          actions: [powerLostWarning],
        },
      },
    },
    red: {
      on: {
        TIMER: {
          target: 'green',
        },
        POWER_LOST: {
          target: 'flashingRed',
          actions: [powerLostWarning],
        },
      },
    },
    flashingRed: {
      on: {
        POWER_BACK: {
          target: 'green',
        },
      },
    },
  },
};

// 4. Create the service
const lightMachineService = createFsmService(lightMachineFsm);

// 5. Use it in your application

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

lightMachineService.stateSignal.subscribe((state) => {
  console.log('state changed: %o', state);
}, {receivePrevious: false});

console.log('start', lightMachineService.stateSignal.get().name);

await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'TIMER'});
await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'TIMER'});
await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'POWER_LOST'});
await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'TIMER'});
await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'POWER_BACK'});
await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'TIMER'});
await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'TIMER'});
await delay(1000); console.log('\n\n');
lightMachineService.eventSignal.dispatch({type: 'TIMER'});
await delay(1000); console.log('\n\n');

console.log('end', lightMachineService.stateSignal.get().name);

// 5. Cleanup
lightMachineService.destroy();