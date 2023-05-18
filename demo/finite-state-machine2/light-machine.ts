import {FiniteStateMachine} from '@alwatr/fsm2';
import {delay} from '@alwatr/util';


const lightMachine = new FiniteStateMachine({
  initial: 'green',
  context: {
    a: 0,
    b: 0,
  },
  states: {
    $all: {
      entry(): void {console.log('$all entry called');},
      exit(): void {console.log('$all exit called');},
      on: {
        POWER_LOST: {
          target: 'flashingRed',
          actions(): void {console.log('$all.POWER_LOST actions called');},
        },
      },
    },
    green: {
      entry(): void {console.log('green entry called');},
      exit(): void {console.log('green exit called');},
      on: {
        TIMER: {
          target: 'yellow',
        },
      },
    },
    yellow: {
      entry(): void {console.log('yellow entry called');},
      exit(): void {console.log('yellow exit called');},
      on: {
        TIMER: {
          target: 'red',
        },
      },
    },
    red: {
      entry(): void {console.log('red entry called');},
      exit(): void {console.log('red exit called');},
      on: {
        TIMER: {
          target: 'green',
          actions(): void {console.log('red.TIMER actions called');},
        },
      },
    },
    flashingRed: {
      entry(): void {console.log('flashingRed entry called');},
      exit(): void {console.log('flashingRed exit called');},
      on: {
        POWER_BACK: {
          target: 'green',
          actions(): void {console.log('flashingRed.POWER_BACK actions called');},
        },
      },
    },
  },
});

// type LightMachine = FsmTypeHelper<typeof lightMachineConstructor>;

// // entries actions
// finiteStateMachineProvider.defineActions<LightMachine>('light_machine', {
//   'action_all_entry': (m): void => console.log('$all entry called', m.getState()),
//   'action_green_entry': (): void => console.log('green entry called'),
//   'action_yellow_entry': (): void => console.log('yellow entry called'),
//   'action_red_entry': (): void => console.log('red entry called'),
//   'action_flashingRed_entry': (): void => console.log('flashingRed entry called'),
// });

// // exits actions
// finiteStateMachineProvider.defineActions<LightMachine>('light_machine', {
//   'action_all_exit': (): void => console.log('$all exit called'),
//   'action_green_exit': (): void => console.log('green exit called'),
//   'action_yellow_exit': (): void => console.log('yellow exit called'),
//   'action_red_exit': (): void => console.log('red exit called'),
//   'action_flashingRed_exit': (): void => console.log('flashingRed exit called'),
// });

// // transition events actions
// finiteStateMachineProvider.defineActions<LightMachine>('light_machine', {
//   'action_all_POWER_LOST': (): void => console.log('$all.POWER_LOST actions called'),
//   'action_green_TIMER': (): void => console.log('green.TIMER actions called'),
//   'action_yellow_TIMER': (): void => console.log('yellow.TIMER actions called'),
//   'action_red_TIMER': (): void => console.log('red.TIMER actions called'),
//   'action_flashingRed_POWER_BACK': (): void => console.log('flashingRed.POWER_BACK actions called'),
// });

// finiteStateMachineProvider.defineSignals<LightMachine>('light_machine', [
//   {
//     signalId: 'new_content_received',
//     transition: 'POWER_BACK',
//     contextName: 'a',
//     receivePrevious: 'NextCycle',
//   },
// ]);

// // signals
// // 'action_ali_signal': (a): void => console.log('ali signal ', a),

// // Consumer
// const lightMachineConsumer = finiteStateMachineConsumer<LightMachine>('light_machine-50', 'light_machine');

// lightMachineConsumer.defineSignals([
//   {
//     signalId: 'power_button_click_event',
//     transition: 'POWER_BACK',
//     receivePrevious: 'No',
//   },
//   {
//     signalId: 'jafang',
//     callback: (signalDetail: Record<string, string>): void => {
//       console.log(signalDetail);
//     },
//     receivePrevious: 'NextCycle',
//   },
//   {
//     callback: (): void => {
//       console.log('subscribe_callback', lightMachineConsumer.getState());
//     },
//     receivePrevious: 'NextCycle',
//   },
// ]);

console.log('start', lightMachine.state);

await delay(1000);
lightMachine.context.a = 1;
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.context.b = 2;
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.context.a = 4;
lightMachine.transition('POWER_LOST');

await delay(1000);
lightMachine.context = {
  a: 5,
  b: 5,
};
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.context.a = 6;
lightMachine.transition('POWER_BACK');
