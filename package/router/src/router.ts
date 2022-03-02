import {createLogger, vatrRegisteredList} from '@vatr/logger';
// import type {InitOptions} from './type';

export const log = createLogger('vatr/router');
// export const error = createLogger('vatr/router', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/signal',
  version: '{{VATR_VERSION}}',
});

/**
 * Initial and config router
 */
// export function initRouter(options: InitOptions) {
//   if (options.globalClickTrigger) {

//   }
// }
