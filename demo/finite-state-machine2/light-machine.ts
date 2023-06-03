import {FiniteStateMachine, StateConfig} from '@alwatr/fsm2';
import {delay} from '@alwatr/util';

type States = 'green' | 'yellow' | 'red' | 'flashingRed';
type Events = 'POWER_LOST' | 'TIMER' | 'POWER_BACK';

class LightMachine extends FiniteStateMachine<States, Events> {
  constructor() {
    super({name: 'light-machine', initial: 'green'});
  }

  statesRecord: StateConfig<States, Events> = {
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
  };
}

const lightMachine = new LightMachine();

console.log('start', lightMachine.state);

await delay(1000);
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.transition('POWER_LOST');

await delay(1000);
lightMachine.transition('TIMER');

await delay(1000);
lightMachine.transition('POWER_BACK');
