import {AlwatrBaseSignal} from './base.js';

/**
 * Alwatr event signal without any detail.
 */
export class AlwatrSimpleSignal extends AlwatrBaseSignal<undefined> {
  constructor(public override name: string) {
    super(name, 'event-signal');
  }

  /**
   * Dispatch an event to all listeners.
   */
  dispatch(): void {
    this._dispatch(undefined);
  }
}
