import {logger} from './core.js';
import {routeChangeSignal} from './signal.js';

let _enabled = false;

/**
 * A navigation trigger for Alwatr Router that translates popstate events into navigation signal.
 */
export const popstateTrigger = {
  /**
   * Alwatr router global popstate handler.
   */
  _popstateHandler(event: PopStateEvent): void {
    if (event.state === 'alwatr-router-ignore') {
      return;
    }
    // if none of the above, convert the click into a navigation signal.
    const {pathname, search, hash} = window.location;
    routeChangeSignal.request({pathname, search, hash, pushState: false});
  },

  set enable(enable: boolean) {
    logger.logProperty('popstateTrigger.enable', enable);

    if (enable && !_enabled) {
      window.addEventListener('popstate', popstateTrigger._popstateHandler);
    }
    if (!enable && _enabled) {
      window.removeEventListener('popstate', popstateTrigger._popstateHandler);
    }
    _enabled = enable;
  },

  get enable(): boolean {
    return _enabled;
  },
};
