import {createLogger, vatrRegisteredList} from '@vatr/logger';
import {hasSignalDispatchedBefore, requestSignal} from '@vatr/signal';
import {clickTrigger} from './trigger-click';
import {popstateTrigger} from './trigger-popstate';
import type {InitOptions} from './type';

export const log = createLogger('vatr/router');
// export const error = createLogger('vatr/router', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/router',
  version: '{{VATR_VERSION}}',
});

/**
 * Initial and config Vatr Router
 */
export function initialRouter(options?: InitOptions) {
  log('initialRouter: %o', options);
  clickTrigger.enable = options?.clickTrigger ?? true;
  popstateTrigger.enable = options?.popstateTrigger ?? true;

  // first route request.
  if (hasSignalDispatchedBefore('vatr-router-change')) {
    const {pathname, search, hash} = window.location;
    requestSignal('vatr-router-change', {pathname, search, hash});
  }
}
