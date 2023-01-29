import {createLogger, globalAlwatr} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';
import {contextConsumer, contextProvider} from '@alwatr/signal';

import type {PushState, RouteContext, RouteContextBase, RoutesConfig} from './type.js';
import type {ParamValueType, QueryParameters} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/router',
  version: _ALWATR_VERSION_,
});

export const logger = createLogger('alwatr/router');

export const routeContextConsumer = contextConsumer.bind<RouteContext>('route-context');
export const routeContextProvider = contextProvider.bind<RouteContext>('route-context');

const documentBaseUrl = document.querySelector('base')?.href || '/';

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

/**
 * Make anchor valid href from RouteContext format.
 *
 * Example:
 *
 * ```html
 * <a href=${ url({sectionList: ['product', 100]}) }>
 * ```
 */
export const url = (route: Partial<RouteContextBase>): string => {
  logger.logMethodArgs('url', {route});

  let href = '';

  if (Array.isArray(route.sectionList) && route.sectionList.length > 0) {
    href += documentBaseUrl + route.sectionList.join('/');
  }

  href += toQueryParamString(route.queryParamList);

  if (route.hash != null && route.hash !== '') {
    if (route.hash.indexOf('#') !== 0) {
      route.hash = '#' + route.hash;
    }
    href += route.hash;
  }

  return href;
};

/**
 * Redirect to desire url.
 *
 * Example:
 *
 * ```ts
 * redirect({
 *   sectionList: ['product', 'book', 100],
 *   queryParamList: {cart: 1},
 *   hash: '#description',
 * })
 * ```
 */
export const redirect = (route: string | RouteContextBase | undefined, pushState: PushState = true): void => {
  if (route == null) return;
  const href = typeof route === 'string' ? route : url(route);
  updateBrowserHistory(href, pushState);
  routeContextProvider.setValue(makeRouteContext(href));
};

// ----

/**
 * Sanitize string value to valid parameters types.
 */
export const sanitizeValue = (value?: string | null): ParamValueType => {
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
};

/**
 * Make query string from QueryParameters object.
 */
export const toQueryParamString = (parameterList?: QueryParameters): string => {
  if (parameterList == null) return '';
  const list: Array<string> = [];
  for (const key of Object.keys(parameterList)) {
    list.push(`${key}=${String(parameterList[key])}`);
  }
  return '?' + list.join('&');
};

/**
 * Update browser history state (history.pushState or history.replaceState).
 */
export const updateBrowserHistory = (href: string, pushState: PushState): void => {
  if (pushState === false || globalThis.history == null) return;
  logger.logMethodArgs('updateBrowserHistory', href);
  if (globalThis.location.href === href) return;
  (pushState === 'replace' ? globalThis.history.replaceState : globalThis.history.pushState)(null, '', href);
};

