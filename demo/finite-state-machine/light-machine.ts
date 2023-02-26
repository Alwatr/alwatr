import {FiniteStateMachine} from '@alwatr/fsm';

const lightMachine = new FiniteStateMachine({
  id: 'light-machine',
  initial: 'green',
  context: <number>0,
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

lightMachine.transition('TIMER', 1);
lightMachine.transition('TIMER', 2);
lightMachine.transition('TIMER', 3);
lightMachine.transition('POWER_LOST', 4, {debounce: 'No'});
lightMachine.transition('TIMER', 5);
lightMachine.transition('POWER_BACK', 6);
