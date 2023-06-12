import {AlwatrRouter, logger} from './core.js';
import {clickTrigger} from './trigger-click.js';
import {popstateTrigger} from './trigger-popstate.js';

export {clickTrigger, popstateTrigger};
export type {RouteContext, RoutesConfig} from './type.js';

export const router = new AlwatrRouter('router');

/**
 * Initial process when dom loaded.
 */
((): void => {
  logger.logMethod?.('initialize');
  clickTrigger.enable = popstateTrigger.enable = true;
})();
