import {FiniteStateMachine} from '@alwatr/fsm2';
import {delay} from '@alwatr/util';

type State = 'green' | 'yellow' | 'red' | 'flashingRed';
type Event = 'timer' | 'powerBack' | 'powerLost';

class LightMachine extends FiniteStateMachine<State, Event> {
  constructor(name: string) {
    super(name, 'green');

    this._stateRecord = {
      _all: {
        powerLost: 'flashingRed',
      },
      green: {
        timer: 'yellow',
      },
      yellow: {
        timer: 'red',
      },
      red: {
        timer: 'green',
      },
      flashingRed: {
        powerBack: 'green',
      },
    };

    this._actionRecord = {
      '_on_powerLost': this._onPowerLost,
    };
  }

  protected _onPowerLost(): void {
    console.warn('_onPowerLost');
  }
}

// ----

const lightMachine = new LightMachine('light_machine_1');

lightMachine.subscribe(() => {
  console.log('state changed: %s', lightMachine.state);
});

console.log('start', lightMachine.state);

await delay(1000);
lightMachine.transition('timer');
await delay(1000);
lightMachine.transition('timer');
await delay(1000);
lightMachine.transition('timer');
await delay(1000);
lightMachine.transition('powerLost');
await delay(1000);
lightMachine.transition('timer');
await delay(1000);
lightMachine.transition('powerBack');
