import {AlwatrBaseSignal} from './base.js';

/**
 * Alwatr event signal.
 */
export class AlwatrEventSignal<TDetail> extends AlwatrBaseSignal<TDetail> {
  constructor(public override name: string) {
    super(name, 'event-signal');
  }

  /**
   * Dispatch an event to all listeners.
   */
  dispatch(detail: TDetail): void {
    this._dispatch(detail);
  }
}
