import {FiniteStateMachine} from '@alwatr/fsm';

const lightMachine = new FiniteStateMachine({
  id: 'light-machine',
  initial: 'green',
  context: {
    a: <number> 0,
    b: <number> 0,
  },
  stateRecord: {
    $all: {
      entry: (): void => console.log('$all entry called'),
      exit: (): void => console.log('$all exit called'),
      on: {
        POWER_LOST: {
          target: 'flashingRed',
          actions: (): void => console.log('$all.POWER_LOST actions called'),
        },
      },
    },
    green: {
      entry: (): void => console.log('green entry called'),
      exit: (): void => console.log('green exit called'),
      on: {
        TIMER: {
          target: 'yellow',
          actions: (): void => console.log('green.TIMER actions called'),
        },
      },
    },
    yellow: {
      entry: (): void => console.log('yellow entry called'),
      exit: (): void => console.log('yellow exit called'),
      on: {
        TIMER: {
          target: 'red',
          actions: (): void => console.log('yellow.TIMER actions called'),
        },
      },
    },
    red: {
      entry: (): void => console.log('red entry called'),
      exit: (): void => console.log('red exit called'),
      on: {
        TIMER: {
          target: 'green',
          actions: (): void => console.log('red.TIMER actions called'),
        },
      },
    },
    flashingRed: {
      entry: (): void => console.log('flashingRed entry called'),
      exit: (): void => console.log('flashingRed exit called'),
      on: {
        POWER_BACK: {
          target: 'green',
          actions: (): void => console.log('flashingRed.POWER_BACK actions called'),
        },
      },
    },
  },
  signalList: [
    {
      signalId: 'ali',
      actions: (a): void => console.log(a),
    },
  ],
});


lightMachine.signal.subscribe((state) => {
  console.log('****\nstate: %s, context: %s\n****', state, lightMachine.context);
}, {receivePrevious: 'No'});

console.log('start');

await lightMachine.transition('TIMER', {a: 1});
await lightMachine.transition('TIMER', {b: 2});
await lightMachine.transition('TIMER');
await lightMachine.transition('POWER_LOST', {a: 4});
await lightMachine.transition('TIMER', {a: 5, b: 5});
await lightMachine.transition('POWER_BACK', {a: 6});
