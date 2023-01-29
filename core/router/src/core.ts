import {createLogger} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';
import {contextConsumer} from '@alwatr/signal';
import {ParamValueType} from '@alwatr/type';

import {RouteContext, RoutesConfig} from './type.js';

export const logger = createLogger('alwatr/router');

export const routeContextConsumer = contextConsumer.bind<RouteContext>('route-context');

/**
 * The result of calling the current route's render() callback base on routesConfig.
 *
 * alias for `routesConfig.templates[routesConfig.routeId(currentRoute)](currentRoute)`
 *
 * if the location is app root and `routeId()` return noting then redirect to `home` automatically
 * if `routeId()` return noting or render function not defined in the `templates` redirected to `_404` routeId.
 *
 * Example:
 *
 * ```ts
 * const routeConfig = {
 *   routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
 *   templates: {
 *     'about': () => html`<page-about></page-about>`,
 *     'product-list': () => {
 *       import('./page-product-list.js'); // lazy import
 *       return html`<page-product-list></page-product-list>`,
 *     },
 *     'contact': () => html`<page-contact></page-contact>`,
 *     'home': () => html`<page-home></page-home>`,
 *     '_404': () => html`<page-404></page-404>`,
 *   },
 * };
 *
 * routerOutlet(routeConfig);
 * ```
*/
export const routerOutlet = (routesConfig: RoutesConfig): unknown => {
  logger.logMethodArgs('routerOutlet', {routesConfig});

  const routeContext = routeContextConsumer.getValue();

  if (routeContext == null) {
    logger.accident('routerOutlet', 'route_context_undefined', 'Route context not provided yet.');
    return;
  }

  const routeId = routesConfig.routeId(routeContext) ?? '';
  const render = routesConfig.templates[routeId];

  try {
    if (typeof render === 'function') {
      return render(routeContext);
    }
    // else
    if (routeContext.pathname === '/' && routeId === '') {
      return routesConfig.templates.home(routeContext);
    }
    // else
    logger.incident('routerOutlet', 'page_not_found', 'Requested page not defined in routesConfig.templates', {
      routeId,
      routeContext,
      routesConfig,
    });
    return routesConfig.templates._404(routeContext);
  }
  catch (err) {
    logger.error('routerOutlet', 'render_failed', err);
    return routesConfig.templates.home(routeContext);
  }
};

// ----

/**
 * Sanitize string value to valid parameters types.
 */
export function sanitizeValue(value?: string | null): ParamValueType {
  if (value == null) {
    return null;
  }
  // else
  value = value.trim();
  if (value === '') {
    return value;
  }
  // else
  const lowerValue = value.toLocaleLowerCase();
  if (lowerValue === 'true' || lowerValue === 'false') {
    return lowerValue === 'true';
  }
  // else
  if (isNumber(value)) {
    return +value;
  }
  // else
  return value;
}
