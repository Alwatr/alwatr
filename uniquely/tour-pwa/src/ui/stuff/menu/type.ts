import type {MaybePromise} from '@alwatr/type';

export interface MenuItem {
  id: string;
  label: string;
  icon?: MaybePromise<string>;
  children: MenuItem[];
}
