declare global {
  interface VatrSignals {
    'router-change': Route;
  }

  interface VatrRequestSignals {
    'router-change': RequestRouteParam;
  }
}

export type ParamList = Record<string, string | number | boolean>;

// @TODO: description
export interface Route
{
  // href: https://example.com/product/100/book?cart=1&color=white#description
  sectionList: Array<string | number | boolean>; // [product, 100, book]
  queryParamList: ParamList; // {cart: 1, color: 'white'}
  hash: string; // '#header'
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
   * A navigation trigger for Vatr Router that translated clicks on `<a>` links into navigation signal.
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


