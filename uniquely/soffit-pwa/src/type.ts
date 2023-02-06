import type {StringifyableRecord} from '@alwatr/type';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box';

export interface BoxType extends IconBoxContent {
  wide?: boolean;
  slot?: string;
  small?: boolean;
}

export interface PageHomeContent extends StringifyableRecord {
  about: BoxType;
  catalogue: BoxType;
  productList: Array<BoxType>;
  socialList: Array<BoxType>;
  agencyList: Array<BoxType>;
}

export interface FormData extends StringifyableRecord {
  formId: string;
  data: Record<string, string | number | boolean | null>;
}
