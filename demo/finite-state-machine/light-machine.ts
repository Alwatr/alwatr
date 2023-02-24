import {FiniteStateMachine} from '@alwatr/fsm';

const lightMachine = new FiniteStateMachine({
  id: 'light',
  initial: 'green',
  states: {
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
  },
});

console.log('lightMachine.currentState: %s', lightMachine.currentState);
lightMachine.transition('timer');
console.log('lightMachine.currentState: %s', lightMachine.currentState);
lightMachine.transition('timer');
console.log('lightMachine.currentState: %s', lightMachine.currentState);
lightMachine.transition('timer');
console.log('lightMachine.currentState: %s', lightMachine.currentState);
