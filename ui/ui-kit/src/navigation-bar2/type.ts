import type {MaybePromise} from '@alwatr/type';

export interface NavigationBarItem {
  icon: MaybePromise<string>;

  /**
   * @default ```false```
   */
  flipIconInRtl?: boolean;

  label?: string;

  labelKey?: string;
}

export interface NavigationBarContent {
  itemList: Array<NavigationBarItem>;
}
