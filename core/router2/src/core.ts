import {createLogger, globalAlwatr} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';
import {ListenerCallback, SubscribeOptions, SubscribeResult} from '@alwatr/signal2';
import {AlwatrBaseSignal} from '@alwatr/signal2/base.js';

import type {PushState, RouteContext, RouteContextBase, RoutesConfig} from './type.js';
import type {ParamValueType, QueryParameters} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/router2',
  version: _ALWATR_VERSION_,
});

export const logger = createLogger('alwatr/router2/initializer');

const documentBaseUrl = document.querySelector('base')?.href || '/';

export class AlwatrRouter extends AlwatrBaseSignal<RouteContext> {
  protected override _logger = createLogger('alwatr/router2');

  constructor(name: string) {
    super({name});
  }

  get route(): RouteContext {
    return this._$detail ?? this.makeRouteContext();
  }

  set route(newRoute: RouteContext) {
    this._dispatch(newRoute);
  }

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
  routerOutlet(routesConfig: RoutesConfig, thisArg: unknown = null): unknown {
    this._logger.logMethodArgs?.('routerOutlet', {routesConfig});

    const routeContext = this._getDetail();

    if (routeContext == null) {
      this._logger.accident('routerOutlet', 'route_context_undefined', 'Route context not provided yet.');
      return;
    }

    const routeId = routesConfig.routeId(routeContext) ?? '';
    let render = routesConfig.templates[routeId];

    while (typeof render === 'string') {
      render = routesConfig.templates[render];
    }

    try {
      if (typeof render === 'function') {
        return render.call(thisArg, routeContext);
      }
      // else
      if (routeId === '') {
        return routesConfig.templates.home(routeContext);
      }
      // else
      this._logger.incident?.(
          'routerOutlet',
          'page_not_found',
          'Requested page not defined in routesConfig.templates',
          {
            routeId,
            routeContext,
            routesConfig,
          },
      );
      return routesConfig.templates._404(routeContext);
    }
    catch (err) {
      this._logger.error('routerOutlet', 'render_failed', err);
      return routesConfig.templates.home(routeContext);
    }
  }

  /**
   * Make anchor valid href from RouteContext format.
   *
   * Example:
   *
   * ```html
   * <a href=${ url({sectionList: ['product', 100]}) }>
   * ```
   */
  url(route: Partial<RouteContextBase>): string {
    this._logger.logMethodArgs?.('url', {route});

    let href = '';

    if (Array.isArray(route.sectionList)) {
      href += documentBaseUrl + route.sectionList.join('/');
    }

    href += this.toQueryParamString(route.queryParamList);

    if (route.hash != null && route.hash !== '') {
      if (route.hash.indexOf('#') !== 0) {
        route.hash = '#' + route.hash;
      }
      href += route.hash;
    }

    return href;
  }

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
  redirect(
      route: string | Partial<RouteContextBase> | undefined,
      pushState: PushState = true,
      keepSectionSlice = 0,
  ): void {
    if (route == null) return;
    this._logger.logMethodArgs?.('redirect', route);
    if (keepSectionSlice > 0 && typeof route === 'object' && Array.isArray(route.sectionList)) {
      const routeContext = this._getDetail();
      if (routeContext != null) {
        route.sectionList = [...routeContext.sectionList.slice(0, keepSectionSlice), ...route.sectionList];
      }
    }
    const href = typeof route === 'string' ? route : this.url(route);
    this.updateBrowserHistory(href, pushState);
    this._dispatch(this.makeRouteContext());
  }

  /**
   * Update browser history state (history.pushState or history.replaceState).
   */
  updateBrowserHistory(url: string, pushState: PushState): void {
    if (pushState === false || globalThis.history == null) return;

    this._logger.logMethodArgs?.('updateBrowserHistory', url);
    if (location.href === url) return;

    if (pushState === 'replace') {
      history.replaceState(null, '', url);
    }
    else {
      history.pushState(null, '', url);
    }
  }

  /**
   * Make route context from url.
   */
  makeRouteContext(): RouteContext {
    this._logger.logMethod?.('makeRouteContext');

    const sectionList = location.pathname
        .split('/')
        .map(this._decodeURIComponent) // decode must be after split because encoded '/' maybe include in values.
        .filter((section) => section.trim() !== '')
        .map(this._sanitizeValue);

    const queryParamList = this.parseQueryParamString(location.search);

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
   * Convert `QueryParameters` object to `queryParameter` string.
   */
  toQueryParamString(queryParameterList?: QueryParameters): string {
    if (queryParameterList == null) return '';
    const list: Array<string> = [];
    for (const key of Object.keys(queryParameterList)) {
      list.push(`${key}=${String(queryParameterList[key])}`);
    }
    return '?' + list.join('&');
  }

  /**
   * Convert `queryParameter` string to `QueryParameters` object.
   */
  parseQueryParamString(queryParameter?: string): QueryParameters {
    this._logger.logMethodArgs?.('parseQueryParamString', {queryParamString: queryParameter});

    const queryParamList: QueryParameters = {};

    if (queryParameter == null) return queryParamList;
    if (queryParameter.indexOf('?') === 0) queryParameter = queryParameter.substring(1);
    if (queryParameter === '') return queryParamList;

    for (const parameter of queryParameter.split('&')) {
      const parameterArray = parameter.split('=');
      queryParamList[parameterArray[0]] = this._sanitizeValue(parameterArray[1]);
    }

    return queryParamList;
  }

  /**
   * Sanitize string value to valid parameters types.
   */
  protected _sanitizeValue(value?: string | null): ParamValueType {
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
  }

  /**
   * decodeURIComponent without throwing error.
   */
  protected _decodeURIComponent(val: string): string {
    try {
      return decodeURIComponent(val);
    }
    catch (err) {
      return val;
    }
  }

  subscribe(listenerCallback: ListenerCallback<this, RouteContext>, options?: SubscribeOptions): SubscribeResult {
    return this._subscribe(listenerCallback, options);
  }

  unsubscribe(listenerCallback: ListenerCallback<this, RouteContext>): void {
    return this._unsubscribe(listenerCallback);
  }
}
