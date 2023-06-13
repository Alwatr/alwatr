import type {QueryParameters} from '@alwatr/type';

/**
 * Route context base type.
 *
 * Sample:
 *
 * ```js
 * // http://example.com:8080/product/100/book?cart=1&color=white#description
 * {
 *   sectionList: [product, 100, book],
 *   queryParamList: {cart: 1, color: 'white'},
 *   hash: '#description',
 * }
 * ```
 */
export type RouteContextBase = {
  sectionList: Array<string>;
  queryParamList: QueryParameters;
  hash: string;
}

/**
 * Global route context type.
 *
 * Sample:
 *
 * ```js
 * {
 *   href: 'http://example.com:8080/product/100/book?cart=1&color=white#description'
 *   pathname: '/product/100/book',
 *   hostname: 'example.com',
 *   port: 8080,
 *   origin: http://example.com:8080,
 *   protocol: 'http',
 *   sectionList: [product, 100, book],
 *   queryParamList: {cart: 1, color: 'white'},
 *   hash: '#description',
 * }
 * ```
 */
export type RouteContext = RouteContextBase & {
  href: string;
  pathname: string;
  hostname: string;
  port: string;
  origin: string;
  protocol: 'HTTP' | 'HTTPS';
}

export type PushState = boolean | 'replace';

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
 * Type of `routeConfig.templates` items.
 */
export type TemplateCallback = (routeContext: RouteContext) => unknown;

/**
 * Type of `routeConfig.templates`.
 */
export type RouterTemplates = {
  [x: string]: TemplateCallback | string | undefined;
  home: TemplateCallback;
  _404: TemplateCallback;
}

/**
 * Routes config for routerOutlet.
 *
 * The `routerOutlet` return `list[map(currentRoute)].render(currentRoute)`.
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
export interface RoutesConfig {
  /**
   * Define function to generate routeId (same as pageName) from current routeContext.
   *
   * if the location is app root and `routeId()` return noting then redirect to `home` automatically
   * if `routeId()` return noting or render function not defined in the `templates` redirected to `_404` routeId.
   *
   * Example:
   *
   * ```ts
   * router.outlet({
   *   routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
   *   templates: {
   *     // ...
   *   },
   * })
   * ```
   */
  routeId: (routeContext: RouteContext) => string | undefined;

  /**
   * Define templates of the routes (pages).
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
  templates: RouterTemplates;
}

export type TemplateList<PageName extends string> = Record<PageName, PageName | (() => unknown)>;
