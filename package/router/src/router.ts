import {createLogger, vatrRegisteredList} from '@vatr/logger';
import {hasSignalDispatchedBefore, requestSignal, setSignalProvider} from '@vatr/signal';
import {clickTrigger} from './trigger-click';
import {popstateTrigger} from './trigger-popstate';
import {splitParameterString} from './util';
import type {InitOptions, RequestRouteParam, Route} from './type';

export const log = createLogger('vatr/router');
// export const error = createLogger('vatr/router', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/router',
  version: '{{VATR_VERSION}}',
});

/**
 * Initial and config the Router
 */
export function initialRouter(options?: InitOptions) {
  log('initialRouter: %o', options);
  clickTrigger.enable = options?.clickTrigger ?? true;
  popstateTrigger.enable = options?.popstateTrigger ?? true;

  setSignalProvider('router-change', routeSignalProvider, {debounce: true, receivePrevious: true});

  // first route request.
  if (!hasSignalDispatchedBefore('router-change')) {
    const {pathname, search, hash} = window.location;
    requestSignal('router-change', {pathname, search, hash, pushState: false});
  }
}

function routeSignalProvider(requestParam: RequestRouteParam): Route {
  log('routeSignalProvider: %o', requestParam);
  _updateBrowserHistory(requestParam);
  return makeRouteObject(requestParam);
}

/**
 * Update browser history state (history.pushState or history.replaceState).
 */
function _updateBrowserHistory(options: RequestRouteParam) {
  log('_updateBrowserHistory(%o)', options);
  if (!options.pushState) return; // false or undefined

  options.search ??= '';
  options.hash ??= '';

  if (
    window.location.pathname === options.pathname ||
    window.location.search === options.search ||
    window.location.hash === options.hash
  ) {
    return;
  }

  const changeState = options.pushState === 'replace' ? 'replaceState' : 'pushState';
  window.history[changeState](null, document.title, options.pathname + options.search + options.hash);
}

/**
 * Make Route from RequestRouteParam.
 */
function makeRouteObject(requestParam: RequestRouteParam): Route {
  log('makeRouteObject: %o', requestParam);
  requestParam.search ??= '';
  requestParam.hash ??= '';

  const sectionList = requestParam.pathname
      .split('/')
      .map(decodeParam) // decode must be after split because encoded '/' maybe include in values.
      .filter((section) => section.trim() !== '')
  ;

  return {
    pathname: requestParam.pathname,
    sectionList,
    search: requestParam.search,
    queryParamList: splitParameterString(requestParam.search.substring(1)/* remove first ? */),
    hash: requestParam.hash,
  };
}

function decodeParam(val: string): string {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    return val;
  }
}

