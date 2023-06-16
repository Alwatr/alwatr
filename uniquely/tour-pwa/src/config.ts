import {FetchOptions} from '@alwatr/fetch';
import callIcon from '@alwatr/icon/svg/call-outline.svg';
import {getConfKey} from '@alwatr/pwa-helper/config.js';
import {NavigationBarContent} from '@alwatr/ui-kit/src/navigation-bar/navigation-bar.js';
import {getLocalStorageItem} from '@alwatr/util';

const defaultExport = <K extends string, T extends {default: K}>(m: Promise<T>): Promise<K> =>
  m.then((_m) => _m.default);

const starIcon = defaultExport(import('@alwatr/icon/svg/star-outline.svg'));
const homeIcon = defaultExport(import('@alwatr/icon/svg/home-outline.svg'));
const triangleIcon = defaultExport(import('@alwatr/icon/svg/triangle-outline.svg'));

export const navigationBarData: NavigationBarContent = {
  itemList: [
    {
      id: 'unknown',
      icon: starIcon,
      link: ['unknown'],
      label: 'مبهم',
    },
    {
      id: 'favorites',
      icon: starIcon,
      link: ['favorites'],
      label: 'علاقه مندی ها',
    },
    {
      id: 'home',
      icon: homeIcon,
      link: ['home'],
      label: 'خانه',
    },
    {
      id: 'tours',
      icon: triangleIcon,
      link: ['tours'],
      label: 'تورها',
    },
    {
      id: 'call',
      icon: callIcon,
      link: ['call'],
      label: 'تماس',
    },
  ],
};

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('DEBUG_API', '"https://canary.tour.ir/"');
 * localStorage.setItem('DEBUG_CONFIG', JSON.stringify({token: 'secret_token'}));
 * ```
 */
const srvBaseUrl = getLocalStorageItem('DEBUG_API', '/');
const apiBaseUrl = srvBaseUrl + 'api/v0/';

export const config = {
  serverContext: {
    base: srvBaseUrl,
    api: apiBaseUrl,
    cdn: srvBaseUrl + 'cdn',
    token: getConfKey<string>('token'),
  },

  fetchContextOptions: <Partial<FetchOptions>>{
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
} as const;
