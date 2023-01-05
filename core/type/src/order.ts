import type {AlwatrDocumentObject} from './storage.js';
import type {User} from './user.js';

export type Order = AlwatrDocumentObject & {
  user: User;
  detail: OrderDetail;
  itemList: Array<ProductValue>;
};

export type OrderDetail = {
  description: string;
};

export type Product = AlwatrDocumentObject & {
  name: string;
  description: string;
  price: number;
};

export type ProductValue = Product & {
  value: number;
};
