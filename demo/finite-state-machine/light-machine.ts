import {finiteStateMachineConsumer, finiteStateMachineProvider} from '@alwatr/fsm';

const config = {
  initial: 'green',
  context: {
    a: <number> 0,
    b: <number> 0,
  },
  stateRecord: {
    $all: {
      entry: 'action_all_entry',
      exit: 'action_all_exit',
      on: {
        POWER_LOST: {
          target: 'flashingRed',
          actions: 'action_all_POWER_LOST',
        },
      },
    },
    green: {
      entry: 'action_green_entry',
      exit: 'action_green_exit',
      on: {
        TIMER: {
          target: 'yellow',
          actions: 'action_GREEN_TIMER',
        },
      },
    },
    yellow: {
      entry: 'action_yellow_entry',
      exit: 'action_yellow_exit',
      on: {
        TIMER: {
          target: 'red',
          actions: 'action_yellow_TIMER',
        },
      },
    },
    red: {
      entry: 'action_red_entry',
      exit: 'action_red_exit',
      on: {
        TIMER: {
          target: 'green',
          actions: 'action_red_TIMER',
        },
      },
    },
    flashingRed: {
      entry: 'action_flashingRed_entry',
      exit: 'action_flashingRed_exit',
      on: {
        POWER_BACK: {
          target: 'green',
          actions: 'action_flashingRed_POWER_BACK',
        },
      },
    },
  },
};

finiteStateMachineProvider.defineConstructor('light-machine', config);

finiteStateMachineProvider.defineActions('light-machine', {
  // entries
  'action_all_entry': (): void => console.log('$all entry called'),
  'action_green_entry': (): void => console.log('green entry called'),
  'action_yellow_entry': (): void => console.log('yellow entry called'),
  'action_red_entry': (): void => console.log('red entry called'),
  'action_flashingRed_entry': (): void => console.log('flashingRed entry called'),

  // on actions
  'action_all_POWER_LOST': (): void => console.log('$all.POWER_LOST actions called'),
  'action_GREEN_TIMER': (): void => console.log('green.TIMER actions called'),
  'action_yellow_TIMER': (): void => console.log('yellow.TIMER actions called'),
  'action_red_TIMER': (): void => console.log('red.TIMER actions called'),
  'action_flashingRed_POWER_BACK': (): void => console.log('flashingRed.POWER_BACK actions called'),

  // exits
  'action_all_exit': (): void => console.log('$all exit called'),
  'action_green_exit': (): void => console.log('green exit called'),
  'action_yellow_exit': (): void => console.log('yellow exit called'),
  'action_red_exit': (): void => console.log('red exit called'),
  'action_flashingRed_exit': (): void => console.log('flashingRed exit called'),

  // signals
  'action_ali_signal': (a): void => console.log('ali signal ', a),

});

const lightMachineConsumer = finiteStateMachineConsumer('light-machine-50', 'light-machine');
lightMachineConsumer.defineSignals([
  {
    signalId: 'ali',
    actions: 'test',
  },
]);

console.log('start ', lightMachineConsumer);

lightMachineConsumer.transition('TIMER', {a: 1});
lightMachineConsumer.transition('TIMER', {b: 2});
lightMachineConsumer.transition('TIMER');
lightMachineConsumer.transition('POWER_LOST', {a: 4});
lightMachineConsumer.transition('TIMER', {a: 5, b: 5});
lightMachineConsumer.transition('POWER_BACK', {a: 6});
