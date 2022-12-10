import type {AlwatrDocumentObject} from '@alwatr/fetch';
import type {ToastOptions} from '@ionic/core';

declare global {
  interface AlwatrSignals {
    readonly 'product-list': Array<Product>;
    readonly toast: Partial<ToastOptions> & {message: string};
  }
  interface AlwatrRequestSignals {
    readonly 'product-list': Record<string, never>;
  }
}

export interface User extends AlwatrDocumentObject {
  name: string;
  phoneNumber: number;
  nationalCode: number;
}

export interface Product extends AlwatrDocumentObject {
  name: string;
  description: string;
  type: string; // FIXME:
  image: string;
  price: number;
}

export interface Item extends Product {
  value: number;
}

export interface OrderReceiver {
  nationalCode: number;
  phoneNumber: number;
  address: string;
}

export interface OrderDetail {
  orderReceiver: OrderReceiver;
  description: string;
}

export interface Order extends AlwatrDocumentObject {
  userId: string;
  detail: OrderDetail;
  itemList: Array<Item>;
}
