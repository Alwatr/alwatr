export type ParamList = Record<string, string | number | boolean>;

// @TODO: description
export interface Route {
  // href: https://example.com/product/100/book?cart=1&color=white#description
  sectionList: Array<string | number | boolean>; // [product, 100, book]
  queryParamList: ParamList; // {cart: 1, color: 'white'}
  hash: string; // '#description'
}

// @TODO: description
export interface RequestRouteParam {
  pathname: string;
  search?: string;
  hash?: string;
  /**
   * Update browser history state (history.pushState or history.replaceState).
   *
   * @default true
   */
  pushState?: boolean | 'replace';
}

/**
 * Initial router options.
 */
export interface InitOptions {
  /**
   * A navigation trigger for Alwatr Router that translated clicks on `<a>` links into navigation signal.
   *
   * Only regular clicks on in-app links are translated.
   * Only primary mouse button, no modifier keys, the target href is within the app's URL space.
   *
   * @default true
   */
  clickTrigger?: boolean;

  /**
   * @TODO: description
   *
   * @default true
   */
  popstateTrigger?: boolean;
}

/**
 * Routes config for router.outlet.
 *
 * The `router.outlet` return `list[map(currentRoute)].render(currentRoute)`.
 *
 * Example:
 *
 * ```ts
 * const routes: routesConfig = {
 *   map: (route) => route.sectionList[0]?.toString(),
 *
 *   list: {
 *     'about': {
 *       render: () => html`<page-about></page-about>`,
 *     },
 *     'product-list': {
 *       render: () => {
 *         import('./page-product-list.js'); // lazy loading page
 *         html`<page-product-list></page-product-list>`,
 *       }
 *     },
 *     'contact': {
 *       render: () => html`<page-contact></page-contact>`,
 *     },
 *
 *     'home': {
 *       render: () => html`<page-home></page-home>`,
 *     },
 *     '404': {
 *       render: () => html`<page-404></page-404>`,
 *     },
 *   },
 * };
 *
 * router.outlet(routes);
 * ```
 */
export interface RoutesConfig {
  /**
   * Routes map for finding the target route name (page name).
   *
   * if the location is app root and `routesConfig.map()` return noting then redirect to home automatically
   * if `map` return noting or not found in the list the "404" route will be used.
   *
   * Example:
   *
   * ```ts
   * map: (route) => route.sectionList[0]?.toString(),
   * ```
   */
  map: (route: Route) => string | undefined;

  /**
   * Define list of routes.
   *
   * Example:
   *
   * ```ts
   * list: {
   *   'about': {
   *     render: () => html`<page-about></page-about>`,
   *   },
   *   'product-list': {
   *     render: () => {
   *       import('./page-product-list.js'); // lazy loading page
   *       html`<page-product-list></page-product-list>`,
   *     }
   *   },
   *   'contact': {
   *     render: () => html`<page-contact></page-contact>`,
   *   },
   *
   *   'home': {
   *     render: () => html`<page-home></page-home>`,
   *   },
   *   '404': {
   *     render: () => html`<page-404></page-404>`,
   *   },
   * },
   * ```
   */
  list: Record<
    string,
    {
      render: (route: Route) => unknown;
    }
  >;
}
