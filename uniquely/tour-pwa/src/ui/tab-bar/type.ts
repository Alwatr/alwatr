import type {MaybePromise} from '@alwatr/type';

export interface TabBarContent {
  itemList: Array<{
    title: string;
    icon?: MaybePromise<string>;
  }>;
}
