import type {MaybePromise} from '@alwatr/type';

export interface NavigationBarItem {
  icon: MaybePromise<string>;

  /**
   * @default ```false```
   */
  flipIconInRtl?: boolean;

  label?: string;

  labelKey?: string;

  href?: string;
}

export interface NavigationBarContent {
  itemList: NavigationBarItem[];
}
