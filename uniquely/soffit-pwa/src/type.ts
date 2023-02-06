import {Stringifyable} from '@alwatr/type';

import type {IconBoxContent} from '@alwatr/ui-kit/src/card/icon-box';

export interface BoxType extends IconBoxContent {
  wide?: boolean;
  slot?: unknown;
  small?: boolean;
}

export interface PageHomeContent {
  about: BoxType;
  catalogue: BoxType;
  productList: Array<BoxType>;
  socialList: Array<BoxType>;
  agencyList: Array<BoxType>;
}

export interface FormData extends Record<string, Stringifyable> {
  formId: string;
  data: Record<string, string | number | boolean | null>;
}
