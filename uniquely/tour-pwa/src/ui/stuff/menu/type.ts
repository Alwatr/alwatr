import type {MaybePromise} from '@alwatr/type';

export interface MenuItem {
  label: string;
  icon?: MaybePromise<string>;
}
