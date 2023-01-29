import {logger, redirect} from './core.js';

let _enabled = false;

/**
 * A navigation trigger for Alwatr Router that translates popstate events into navigation signal.
 */
export const popstateTrigger = {
  /**
   * Alwatr router global popstate handler.
   */
  _popstateHandler(event: PopStateEvent): void {
    if (event.state === 'router-ignore') return;
    redirect(globalThis.location?.href, false);
  },

  set enable(enable: boolean) {
    logger.logProperty('popstateTrigger.enable', enable);

    if (enable && !_enabled) {
      globalThis.addEventListener('popstate', popstateTrigger._popstateHandler);
    }
    if (!enable && _enabled) {
      globalThis.removeEventListener('popstate', popstateTrigger._popstateHandler);
    }
    _enabled = enable;
  },

  get enable(): boolean {
    return _enabled;
  },
};
