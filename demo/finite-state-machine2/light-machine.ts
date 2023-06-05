import {ActionRecord, FiniteStateMachineBase, StateRecord} from '@alwatr/fsm2';
import {delay} from '@alwatr/util';

type State = 'green' | 'yellow' | 'red' | 'flashingRed';
type Event = 'timer' | 'powerBack' | 'powerLost';

class LightMachine extends FiniteStateMachineBase<State, Event> {
  constructor() {
    super('light-machine', 'green');
  }

  override get state(): State {
    return this.state;
  }

  protected override stateRecord: StateRecord<State, Event> = {
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

  protected override actionRecord: ActionRecord<State, Event> = {
    '_on_flashingRed_powerBack': this._on_flashingRed_powerBack,
  };

  transition(event: Event): void {
    this._transition(event);
  }

  protected override _onStateEnter(): void {
    console.log('_all enter called', this.state);
  }

  protected override _onStateExit(): void {
    console.log('_all exit called');
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
