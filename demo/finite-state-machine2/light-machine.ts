import {ActionRecord, FiniteStateMachineBase, StateRecord} from '@alwatr/fsm2';
import {delay} from '@alwatr/util';

type State = 'green' | 'yellow' | 'red' | 'flashingRed';
type Event = 'timer' | 'powerBack' | 'powerLost';

class LightMachine extends FiniteStateMachineBase<State, Event> {
  constructor() {
    super('light-machine', 'green');
  }

  get state(): State {
    return super._state;
  }

  protected override _stateRecord: StateRecord<State, Event> = {
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

  protected override _actionRecord: ActionRecord<State, Event> = {
    '_on_flashingRed_powerBack': this._on_flashingRed_powerBack,
  };

  transition(event: Event): void {
    this._transition(event);
  }

  _onAllPowerLost(): void {
    console.log('_all.POWER_LOST actions called');
  }

  _on_flashingRed_powerBack(): void {
    console.log('_on_flashingRed_powerBack');
  }
}

const lightMachine = new LightMachine();

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
