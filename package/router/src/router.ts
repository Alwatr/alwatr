import {vatrRegisteredList} from '@vatr/logger';
import {hasSignalDispatchedBefore, requestSignal, setSignalProvider} from '@vatr/signal';
import {joinParameterList, log, _routeSignalProvider} from './core';
import {clickTrigger} from './trigger-click';
import {popstateTrigger} from './trigger-popstate';
import type {InitOptions, RequestRouteHrefOptions} from './type';

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

/**
 * Make anchor valid href from route options.
 *
 * @example <a href=${requestRouteHref({section: 'article'})}>
 */
export function requestRouteHref(requestRoute: RequestRouteHrefOptions): string {
  let href = '/';

  if (requestRoute.sectionList?.length > 0) {
    href += requestRoute.sectionList.join('/');
  }

  if (requestRoute.queryParamList != null) {
    href += '?' + joinParameterList(requestRoute.queryParamList);
  }

  if (requestRoute.hash) { // != null && !== ''
    if (requestRoute.hash.startsWith('#')) {
      requestRoute.hash = requestRoute.hash.substring(1); // remove first `#`
    }
    href += '#' + requestRoute.hash;
  }

  return href;
}
