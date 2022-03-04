import {requestSignal} from '@vatr/signal';

let _enabled = false;

/**
  * A navigation trigger for Vatr Router that translates popstate events into navigation signal.
 */
export const popstateTrigger = {
  /**
   * Vatr router global popstate handler.
   */
  _popstateHandler(event: PopStateEvent): void {
    if (event.state === 'vatr-router-ignore') {
      return;
    }
    // if none of the above, convert the click into a navigation signal.
    const {pathname, search, hash} = window.location;
    requestSignal('router-change', {pathname, search, hash, pushState: false});
  },

  set enable(enable: boolean) {
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
