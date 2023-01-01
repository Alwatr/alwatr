import type {AlwatrDocumentObject} from '@alwatr/type';

export type Order = AlwatrDocumentObject & {
  user: User;
  detail: OrderDetail;
  itemList: Array<ProductValue>;
};

export type User = AlwatrDocumentObject & {
  name: string;
  phoneNumber: string;
};

export type Reciver = User & {
  nationalCode: number;
}

export type OrderDetail = {
  description: string;
  reciver: Reciver;
};

export type Product = AlwatrDocumentObject & {
  name: string;
  description: string;
  type: string;
  price: number;
};

export type ProductValue = Product & {
  value: number;
};
