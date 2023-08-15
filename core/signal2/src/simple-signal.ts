import {AlwatrObservable} from './observable.js';

/**
 * Alwatr event signal without any data.
 */
export class AlwatrSimpleSignal extends AlwatrObservable<undefined> {
  constructor(config: {name: string, loggerPrefix?: string}) {
    config.loggerPrefix ??= 'signal';
    super(config);
  }

  /**
   * Dispatch an event to all listeners.
   */
  notify(): void {
    this._notify(undefined);
  }

  /**
   * Wait until next event signal.
   */
  untilNewNotify(): Promise<void> {
    return super._untilNewNotify();
  }
}
