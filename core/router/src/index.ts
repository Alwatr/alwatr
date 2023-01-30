import {logger, makeRouteContext, routeContextProvider} from './core.js';
import {clickTrigger} from './trigger-click.js';
import {popstateTrigger} from './trigger-popstate.js';

export {routerOutlet, routeContextConsumer, url, redirect} from './core.js';
export {clickTrigger, popstateTrigger};
export type {RouteContext, RoutesConfig} from './type.js';

/**
 * Initial process when dom loaded.
 */
((): void => {
  logger.logMethod('initialize');

  clickTrigger.enable = popstateTrigger.enable = true;

  if (routeContextProvider.getValue() === undefined) {
    routeContextProvider.setValue(makeRouteContext(), {debounce: 'Timeout'});
  }
  else {
    logger.incident('initialize', 'skip_route_context', 'Route context already have value');
  }
})();
