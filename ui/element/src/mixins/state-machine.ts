import type {SignalMixinInterface} from './signal.js';
import type {PropertyValues} from '../lit.js';
import type {FiniteStateMachine} from '@alwatr/fsm';
import type {Constructor} from '@alwatr/type';

export declare class StateMachineMixinInterface<TMachine extends FiniteStateMachine> extends SignalMixinInterface {
  stateMachine: TMachine;
}

export function StateMachineMixin<T extends Constructor<SignalMixinInterface>, TMachine extends FiniteStateMachine>(
    stateMachine: TMachine,
    superClass: T,
): Constructor<StateMachineMixinInterface<TMachine>> & T {
  class StateMachineMixinClass extends superClass {
    stateMachine = stateMachine;

    override connectedCallback(): void {
      super.connectedCallback();
      this.stateMachine.transition('CONNECTED');
      this._signalListenerList.push(
          this.stateMachine.signal.subscribe(
              () => {
                this.requestUpdate();
              },
              {receivePrevious: 'No'},
          ),
      );
    }

    protected override firstUpdated(_changedProperties: PropertyValues<this>): void {
      super.firstUpdated(_changedProperties);
      this.stateMachine.transition('FIRST_UPDATED');
    }
  }

  return StateMachineMixinClass as unknown as Constructor<StateMachineMixinInterface<TMachine>> & T;
}
