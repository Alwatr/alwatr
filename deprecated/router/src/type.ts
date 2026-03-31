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
export interface RouteContextBase {
  sectionList: string[];
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
export interface RouteContext extends RouteContextBase {
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
export interface RouterConfig {
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
