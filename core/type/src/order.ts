import type {AlwatrDocumentObject} from './storage.js';

export type Order = AlwatrDocumentObject & {
  description: string;
  itemList: Array<ProductValue>;
};

export type Product = AlwatrDocumentObject & {
  name: string;
  description: string;
  price: number;
};

export type ProductValue = Product & {
  value: number;
};
