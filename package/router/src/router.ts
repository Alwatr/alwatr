import {joinParameterList, logger, routeSignalProvider, routerChangeSignal} from './core';
import {clickTrigger} from './trigger-click';
import {popstateTrigger} from './trigger-popstate';
import type {InitOptions, Route} from './type';

export {routerChangeSignal};

/**
 * Initial and config the Router.
 */
export function initialRouter(options?: InitOptions): void {
  logger.logMethodArgs('initialRouter', {options});

  clickTrigger.enable = options?.clickTrigger ?? true;
  popstateTrigger.enable = options?.popstateTrigger ?? true;

  routerChangeSignal.setProvider(routeSignalProvider, {debounce: true, receivePrevious: true});

  // first route request.
  if (!routerChangeSignal.dispatched) {
    const {pathname, search, hash} = window.location;
    routerChangeSignal.request({pathname, search, hash, pushState: false});
  }
}

/**
 * Make anchor valid href from route.
 *
 * @example <a href=${ makeUrl({sectionList: ['product', 100]}) }>
 */
export function makeUrl(route: Partial<Route>): string {
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
