import {vatrRegisteredList} from '@vatr/logger';
import {hasSignalDispatchedBefore, requestSignal, setSignalProvider} from '@vatr/signal';
import {clickTrigger} from './trigger-click';
import {popstateTrigger} from './trigger-popstate';
import {log, _routeSignalProvider} from './core';
import type {InitOptions} from './type';

vatrRegisteredList.push({
  name: '@vatr/router',
  version: '{{VATR_VERSION}}',
});

/**
 * Initial and config the Router.
 */
export function initialRouter(options?: InitOptions) {
  log('initialRouter: %o', options);
  clickTrigger.enable = options?.clickTrigger ?? true;
  popstateTrigger.enable = options?.popstateTrigger ?? true;

  setSignalProvider('router-change', _routeSignalProvider, {debounce: true, receivePrevious: true});

  // first route request.
  if (!hasSignalDispatchedBefore('router-change')) {
    const {pathname, search, hash} = window.location;
    requestSignal('router-change', {pathname, search, hash, pushState: false});
  }
}

