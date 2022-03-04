import '@vatr/signal/type';

declare global {
  interface VatrSignals {
    'router-change': Route;
  }

  interface VatrRequestSignals {
    'router-change': RequestRouteParam;
  }
}

export interface Route
{
  // href: https://cms.ishia.org/list/article/3/20/q=ali/?v=2#header
  hostname: string; // cms.ishia.org
  pathname: string; // /cms.ishia.org/list/article/3/20/q=ali/?r=1#hash1
  page?: string; // list
  section?: string; // 'article'
  partList: Array<string | number>; // [3, 20]
  optionList: ParameterList; // {q: 'ali'}
  queryList: ParameterList; // {v: 2}
  hash?: string; // '#header'
}

export interface RequestRouteParam {
  pathname: string;
  search?: string;
  hash?: string;
  /**
   * Update browser history state (history.pushState or history.replaceState).
   */
   pushState?: boolean | 'replace';
}

// export interface RequestRouteParam
// {
//   page?: string;
//   sectionList?: Array<string | number>;
//   queryParamList?: ParameterList;
// }

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
  popstateTrigger?: boolean;
}
