import {FiniteStateMachine} from '@alwatr/fsm';

const lightMachine = new FiniteStateMachine({
  id: 'light-machine',
  initial: 'green',
  states: {
    _: {
      on: {
        power_lost: 'flashingRed',
      },
    },
    green: {
      on: {
        timer: 'yellow',
      },
    },
    yellow: {
      on: {
        timer: 'red',
      },
    },
    red: {
      on: {
        timer: 'green',
      },
    },
    flashingRed: {
      on: {
        power_back: 'green',
      },
    },
  },
});

lightMachine.transition('timer');
lightMachine.transition('timer');
lightMachine.transition('timer');
lightMachine.transition('power_lost');
lightMachine.transition('timer');
lightMachine.transition('power_back');
