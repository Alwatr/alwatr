import type {IconBoxContent} from '@alwatr/ui-kit/src/card/icon-box';

export type BoxType = IconBoxContent & {
  wide?: boolean;
  content?: unknown;
  small?: boolean;
}

export type PageHomeContent = {
  about: BoxType,
  catalogue: BoxType,
  productList: Array<BoxType>,
  socialList: Array<BoxType>,
  agencyList: Array<BoxType>,
}

export type FormData = {
  id: string,
  data: Record<string, string | number | boolean | null>,
}
