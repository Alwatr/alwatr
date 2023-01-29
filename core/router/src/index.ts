import {makeRouteContext, routeContextProvider} from './core.js';
import {clickTrigger} from './trigger-click.js';
import {popstateTrigger} from './trigger-popstate.js';

export {routerOutlet, routeContextConsumer, url, redirect} from './core.js';
export {clickTrigger, popstateTrigger};
export type {RouteContext, RoutesConfig} from './type.js';

clickTrigger.enable = popstateTrigger.enable = true;

if (routeContextProvider.getValue === undefined) {
  routeContextProvider.setValue(makeRouteContext(), {debounce: 'Timeout'});
}
