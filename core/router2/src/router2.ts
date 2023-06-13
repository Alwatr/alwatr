import {createLogger, globalAlwatr} from '@alwatr/logger';
import {ListenerCallback, SubscribeOptions, SubscribeResult} from '@alwatr/signal2';
import {AlwatrBaseSignal} from '@alwatr/signal2/base.js';

import type {PushState, RouteContext, RouteContextBase} from './type.js';
import type {QueryParameters} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/router2',
  version: _ALWATR_VERSION_,
});

const documentBaseUrl = document.querySelector('base')?.href || '/';

export class AlwatrRouter extends AlwatrBaseSignal<RouteContext> {
  protected override _logger = createLogger('alwatr/router2');

  get route(): RouteContext {
    return this._$detail ?? this._makeRouteContext();
  }

  constructor(config: {popstateTrigger?: boolean; clickTrigger?: boolean}) {
    super({name: 'alwatr_router'});

    this._dispatch(this._makeRouteContext());
    this._popstateHandler = this._popstateHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);

    config.popstateTrigger ??= true;
    this.popstateTrigger = config.popstateTrigger;

    config.clickTrigger ??= true;
    this.clickTrigger = config.clickTrigger;
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
    let href = '';

    if (Array.isArray(route.sectionList)) {
      href += documentBaseUrl + route.sectionList.join('/');
    }

    href += this._toQueryParamString(route.queryParamList);

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
    this._updateBrowserHistory(href, pushState);
    this._dispatch(this._makeRouteContext());
  }

  /**
   * Update browser history state (history.pushState or history.replaceState).
   */
  protected _updateBrowserHistory(url: string, pushState: PushState): void {
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
  protected _makeRouteContext(): RouteContext {
    this._logger.logMethod?.('makeRouteContext');

    const sectionList = location.pathname
        .split('/')
        .map(this._decodeURIComponent) // decode must be after split because encoded '/' maybe include in values.
        .filter((section) => section.trim() !== '');

    const queryParamList = this._parseQueryParamString(location.search);

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
  protected _toQueryParamString(queryParameterList?: QueryParameters): string {
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
  protected _parseQueryParamString(queryParameter?: string): QueryParameters {
    this._logger.logMethodArgs?.('parseQueryParamString', {queryParamString: queryParameter});

    const queryParamList: QueryParameters = {};

    if (queryParameter == null) return queryParamList;
    if (queryParameter.indexOf('?') === 0) queryParameter = queryParameter.substring(1);
    if (queryParameter === '') return queryParamList;

    for (const parameter of queryParameter.split('&')) {
      const parameterArray = parameter.split('=');
      queryParamList[parameterArray[0]] = parameterArray[1] ?? '';
    }

    return queryParamList;
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

  protected _$popstateTrigger = false;

  /**
   * Alwatr router global popstate handler.
   */
  protected _popstateHandler(event: PopStateEvent): void {
    const href = globalThis.location?.href;
    this._logger.logMethodArgs?.('_popstateHandler', href);
    if (event.state === 'router-ignore') return;
    this.redirect(href, false);
  }

  set popstateTrigger(enable: boolean) {
    this._logger.logProperty?.('popstateTrigger', enable);
    if (this._$popstateTrigger === enable) return;

    if (enable) {
      globalThis.addEventListener('popstate', this._popstateHandler);
    }
    else {
      globalThis.removeEventListener('popstate', this._popstateHandler);
    }
    this._$popstateTrigger = enable;
  }

  get popstateTrigger(): boolean {
    return this._$popstateTrigger;
  }

  protected _$clickTrigger = false;

  /**
   * Alwatr router global click handler.
   */
  protected _clickHandler(event: MouseEvent): void {
    this._logger.logMethod?.('_clickHandler');

    if (
      // ignore if the default action is prevented.
      event.defaultPrevented ||
      // ignore if the left mouse button is not pressed.
      event.button !== 0 ||
      // ignore if the meta key is pressed.
      event.metaKey ||
      // ignore if the ctrl key is pressed.
      event.ctrlKey ||
      // ignore if the shift key is pressed.
      event.shiftKey ||
      // ignore if the alt key is pressed.
      event.altKey
    ) {
      return;
    }

    // prettier-ignore
    // find the <a> element that the click is at (or within)
    const anchor = event
        .composedPath()
        .find(
            (target) => (target as HTMLElement)?.tagName?.toLowerCase() === 'a',
        ) as HTMLAnchorElement | undefined;

    if (
      // ignore if the anchor is not found.
      anchor == null ||
      // ignore if the anchor is not an <a> element.
      anchor.tagName?.toLowerCase() !== 'a' ||
      // ignore if the <a> element has a non-default target.
      (typeof anchor.target === 'string' && anchor.target !== '' && anchor.target.toLowerCase() !== '_self') ||
      // ignore if the <a> element has a download attribute.
      anchor.hasAttribute('download') ||
      // ignore if the <a> element has a rel attribute.
      anchor.getAttribute('rel') === 'external' ||
      // ignore if the <a> element has a `router-ignore` attribute.
      anchor.hasAttribute('router-ignore') ||
      // ignore the anchor protocols other than HTTP and HTTPS (mailto, ftp, ...).
      (anchor.protocol !== 'http:' && anchor.protocol !== 'https:') ||
      // ignore if the anchor points to another origin (include the port number).
      anchor.href.indexOf(window.location.origin) !== 0
    ) {
      return;
    }

    event.preventDefault();

    // ignore if the target URL is the current page(after prevent default).
    if (anchor.href === window.location.href) {
      return;
    }

    // if none of the above, convert the click into a navigation signal.
    this.redirect(anchor.href, true);

    // for a click event, the scroll is reset to the top position.
    if (event.type === 'click') {
      window.scrollTo(0, 0);
    }
  }

  set clickTrigger(enable: boolean) {
    this._logger.logProperty?.('clickTrigger.enable', enable);
    if (this._$clickTrigger === enable) return;

    if (enable) {
      window.document.addEventListener('click', this._clickHandler);
    }
    if (!enable) {
      window.document.removeEventListener('click', this._clickHandler);
    }
    this._$clickTrigger = enable;
  }

  get clickTrigger(): boolean {
    return this._$clickTrigger;
  }
}
