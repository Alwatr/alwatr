import {joinParameterList, logger, routeSignalProvider} from './core';
import {routeChangeSignal} from './signal';
import {clickTrigger} from './trigger-click';
import {popstateTrigger} from './trigger-popstate';
import type {InitOptions, Route, RoutesConfig} from './type';

export type {Route, RoutesConfig} from './type';

/**
 * Initial and config the Router.
 */
function initial(options?: InitOptions): void {
  logger.logMethodArgs('initialRouter', {options});

  clickTrigger.enable = options?.clickTrigger ?? true;
  popstateTrigger.enable = options?.popstateTrigger ?? true;

  routeChangeSignal.setProvider(routeSignalProvider, {debounce: true, receivePrevious: true});

  // first route request.
  if (!routeChangeSignal.dispatched) {
    const {pathname, search, hash} = window.location;
    routeChangeSignal.request({pathname, search, hash, pushState: false});
  }
}

/**
 * Make anchor valid href from route.
 *
 * @example <a href=${ makeUrl({sectionList: ['product', 100]}) }>
 */
function makeUrl(route: Partial<Route>): string {
  logger.logMethodArgs('makeUrl', {route});

  let href = '';

  if (route.sectionList != null) {
    // @TODO: handle <base> url.
    href += '/' + route.sectionList.join('/');
  }

  if (route.queryParamList != null) {
    href += '?' + joinParameterList(route.queryParamList);
  }

  if (route.hash) { // != null && !== ''
    if (route.hash.indexOf('#') !== 0) {
      route.hash += '#';
    }
    href += route.hash;
  }

  return href;
}


export const router = {
  get currentRoute(): Route {
    const route = routeChangeSignal.value;
    if (route == null) {
      throw (new Error('route_not_initialized'));
    }
    return route;
  },

  initial,

  makeUrl,

  outlet,

  /**
   * Signal interface of 'route-change' signal.
   */
  signal: routeChangeSignal,
} as const;
