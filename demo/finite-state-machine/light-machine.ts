import {finiteStateMachineConsumer, finiteStateMachineProvider, type FsmTypeHelper} from '@alwatr/fsm';
import {delay} from '@alwatr/util';

// Provider
const lightMachineConstructor = finiteStateMachineProvider.defineConstructor('light_machine', {
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
          actions: 'action_green_TIMER',
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
});

type LightMachine = FsmTypeHelper<typeof lightMachineConstructor>;

// entries actions
finiteStateMachineProvider.defineActions<LightMachine>('light_machine', {
  'action_all_entry': (m): void => console.log('$all entry called', m.getState()),
  'action_green_entry': (): void => console.log('green entry called'),
  'action_yellow_entry': (): void => console.log('yellow entry called'),
  'action_red_entry': (): void => console.log('red entry called'),
  'action_flashingRed_entry': (): void => console.log('flashingRed entry called'),
});

// exits actions
finiteStateMachineProvider.defineActions<LightMachine>('light_machine', {
  'action_all_exit': (): void => console.log('$all exit called'),
  'action_green_exit': (): void => console.log('green exit called'),
  'action_yellow_exit': (): void => console.log('yellow exit called'),
  'action_red_exit': (): void => console.log('red exit called'),
  'action_flashingRed_exit': (): void => console.log('flashingRed exit called'),
});

// transition events actions
finiteStateMachineProvider.defineActions<LightMachine>('light_machine', {
  'action_all_POWER_LOST': (): void => console.log('$all.POWER_LOST actions called'),
  'action_green_TIMER': (): void => console.log('green.TIMER actions called'),
  'action_yellow_TIMER': (): void => console.log('yellow.TIMER actions called'),
  'action_red_TIMER': (): void => console.log('red.TIMER actions called'),
  'action_flashingRed_POWER_BACK': (): void => console.log('flashingRed.POWER_BACK actions called'),
});

finiteStateMachineProvider.defineSignals<LightMachine>('light_machine', [
  {
    signalId: 'new_content_received',
    transition: 'POWER_BACK',
    contextName: 'a',
    receivePrevious: 'NextCycle',
  },
]);

// signals
// 'action_ali_signal': (a): void => console.log('ali signal ', a),

// Consumer
const lightMachineConsumer = finiteStateMachineConsumer<LightMachine>('light_machine-50', 'light_machine');

lightMachineConsumer.defineSignals([
  {
    signalId: 'power_button_click_event',
    transition: 'POWER_BACK',
    receivePrevious: 'No',
  },
  {
    signalId: 'jafang',
    callback: (signalDetail: Record<string, string>): void => {
      console.log(signalDetail);
    },
    receivePrevious: 'NextCycle',
  },
  {
    callback: (): void => {
      console.log('subscribe_callback', lightMachineConsumer.getState());
    },
    receivePrevious: 'NextCycle',
  },
]);

console.log('start', lightMachineConsumer.getState());

await delay(1000);
lightMachineConsumer.transition('TIMER', {a: 1});
await delay(1000);
lightMachineConsumer.transition('TIMER', {b: 2});
await delay(1000);
lightMachineConsumer.transition('TIMER');
await delay(1000);
lightMachineConsumer.transition('POWER_LOST', {a: 4});
await delay(1000);
lightMachineConsumer.transition('TIMER', {a: 5, b: 5});
await delay(1000);
lightMachineConsumer.transition('POWER_BACK', {a: 6});
