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
    if (routeId === '') {
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
  logger.logMethodArgs('redirect', route);
  const href = typeof route === 'string' ? route : url(route);
  updateBrowserHistory(href, pushState);
  routeContextProvider.setValue(makeRouteContext(), {debounce: 'Timeout'});
};

// ----

/**
 * Update browser history state (history.pushState or history.replaceState).
 */
export const updateBrowserHistory = (url: string, pushState: PushState): void => {
  if (pushState === false || globalThis.history == null) return;

  logger.logMethodArgs('updateBrowserHistory', url);
  if (location.href === url) return;

  if (pushState === 'replace') {
    history.replaceState(null, '', url);
  }
  else {
    history.pushState(null, '', url);
  }
};

/**
 * Make route context from url.
 */
export function makeRouteContext(): RouteContext {
  logger.logMethod('makeRouteContext');

  const sectionList = location.pathname
      .split('/')
      .map(_decodeURIComponent) // decode must be after split because encoded '/' maybe include in values.
      .filter((section) => section.trim() !== '')
      .map(sanitizeValue);

  const queryParamList = parseQueryParamString(location.search);

  const protocol = location.protocol === 'https:' ? 'HTTPS' : 'HTTP';

  return {
    href: location.href,
    hostname: location.hostname,
    origin: location.origin,
    pathname: location.pathname,
    port: location.port,
    protocol,
    sectionList,
    queryParamList,
    hash: location.hash,
  };
}

/**
 * Sanitize string value to valid parameters types.
 */
export const sanitizeValue = (value?: string | null): ParamValueType => {
  if (value == null) {
    return '';
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
 * Convert `QueryParameters` object to `queryParameter` string.
 */
export const toQueryParamString = (queryParameterList?: QueryParameters): string => {
  if (queryParameterList == null) return '';
  const list: Array<string> = [];
  for (const key of Object.keys(queryParameterList)) {
    list.push(`${key}=${String(queryParameterList[key])}`);
  }
  return '?' + list.join('&');
};

/**
 * Convert `queryParameter` string to `QueryParameters` object.
 */
export const parseQueryParamString = (queryParameter?: string): QueryParameters => {
  logger.logMethodArgs('parseQueryParamString', {queryParamString: queryParameter});

  const queryParamList: QueryParameters = {};

  if (queryParameter == null) return queryParamList;
  if (queryParameter.indexOf('?') === 0) queryParameter = queryParameter.substring(1);
  if (queryParameter === '') return queryParamList;

  for (const parameter of queryParameter.split('&')) {
    const parameterArray = parameter.split('=');
    queryParamList[parameterArray[0]] = sanitizeValue(parameterArray[1]);
  }

  return queryParamList;
};

/**
 * decodeURIComponent without throwing error.
 */
export function _decodeURIComponent(val: string): string {
  try {
    return decodeURIComponent(val);
  }
  catch (err) {
    return val;
  }
}
