import {FiniteStateMachine} from '@alwatr/fsm';

const lightMachine = new FiniteStateMachine({
  id: 'light-machine',
  initial: 'green',
  context: {
    a: <number> 0,
    b: <number> 0,
  },
  states: {
    $all: {
      on: {
        POWER_LOST: 'flashingRed',
      },
    },
    green: {
      on: {
        TIMER: 'yellow',
      },
    },
    yellow: {
      on: {
        TIMER: 'red',
      },
    },
    red: {
      on: {
        TIMER: 'green',
      },
    },
    flashingRed: {
      on: {
        POWER_BACK: 'green',
      },
    },
  },
});

lightMachine.signal.subscribe((state) => {
  console.log('****\nstate: %s, context: %s\n****', state, lightMachine.context);
}, {receivePrevious: 'No'});

lightMachine.transition('TIMER', {a: 1});
lightMachine.transition('TIMER', {b: 2});
lightMachine.transition('TIMER');
lightMachine.transition('POWER_LOST', {a: 4});
lightMachine.transition('TIMER', {a: 5, b: 5});
lightMachine.transition('POWER_BACK', {a: 6});
