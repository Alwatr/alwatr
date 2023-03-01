import {untilNextFrame} from '@alwatr/util';

import {nothing} from '../lit.js';

import type {SignalMixinInterface} from './signal.js';
import type {FiniteStateMachine} from '@alwatr/fsm';
import type {Constructor} from '@alwatr/type';

export declare class StateMachineMixinInterface<TMachine extends FiniteStateMachine> extends SignalMixinInterface {
  protected stateMachine: TMachine;
  protected stateUpdated(state: TMachine['state']): void;
  protected render_unresolved(): unknown;
  protected render_resolving(): unknown;
}

export function StateMachineMixin<T extends Constructor<SignalMixinInterface>, TMachine extends FiniteStateMachine>(
    stateMachine: TMachine,
    superClass: T,
): Constructor<StateMachineMixinInterface<TMachine>> & T {
  class StateMachineMixinClass extends superClass {
    protected stateMachine = stateMachine;

    protected render_unresolved(): unknown {
      return nothing;
    }
    protected render_resolving(): unknown {
      return nothing;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.stateUpdated = this.stateUpdated.bind(this);
    }

    override connectedCallback(): void {
      super.connectedCallback();
      this.stateMachine.transition('CONNECTED');
      this._signalListenerList.push(
          this.stateMachine.signal.subscribe(this.stateUpdated, {receivePrevious: 'NextCycle'}),
      );
    }

    /**
     * Subscribe to this.stateMachine.signal event.
    */
    protected stateUpdated(): void {
      this.requestUpdate();
    }

    protected override async scheduleUpdate(): Promise<void> {
      await untilNextFrame();
      super.scheduleUpdate();
    }
  }

  return StateMachineMixinClass as unknown as Constructor<StateMachineMixinInterface<TMachine>> & T;
}
