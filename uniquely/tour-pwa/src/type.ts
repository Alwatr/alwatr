import type {StringifyableRecord} from '@alwatr/type';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

export interface FormData extends StringifyableRecord {
  formId: string;
  data: Record<string, string | number | boolean | null>;
}

export interface BoxType extends IconBoxContent {
  wide?: boolean;
  slot?: string;
}

export interface PageHomeContent extends StringifyableRecord {
  topAppBar: TopAppBarContent;
  about: BoxType;
  catalogue: BoxType;
  product: BoxType;
  socialList: Array<BoxType>;
}

export type PageName = 'home' | '404';
