import {i18nString} from './i18n.js';
import {Photo} from './photo.js';

import type {AlwatrDocumentObject} from './storage.js';

export type Product = AlwatrDocumentObject & {
  /**
   * Product global ID
   *
   * like product unique code
   */
  id: string;

  /**
   * Product title
   */
  title: i18nString;

  /**
   * Product image
   */
  image: Photo;
};

export type ProductPrice = AlwatrDocumentObject & {
  /**
   * Displayed price before discount
   */
  price: number;

  /**
   * Final price after any discount
   */
  finalPrice: number;
}

export type Order = AlwatrDocumentObject & {
  /**
   * Order unique code
   *
   * customerId-orderId
   */
  id: `${number}-${number}`;

  /**
   * Products list with price and qty
   */
  itemList: Array<OrderItem>;

  /**
   * Delivery info
   */
  delivery: OrderDelivery;

  discount: number;
  discountType: typeof discountTypeCS[number];

  totalPrice: number;
  shippingPrice: number;
  finalPrice: number;
};

// FIXME: name and values
export const shipmentTypeCS = ['x', 'y'] as const;
export const carTypeCS = ['x', 'y'] as const;
export const timePeriodCS = ['1-2w', '2-3w', '3-4w'] as const;
export const discountTypeCS = ['number', 'percent'] as const;

export type OrderDelivery = {
  recipientName: string;
  recipientNationalCode: string;
  address: string;
  shipmentType: typeof shipmentTypeCS[number];
  carType: typeof carTypeCS[number];
  timePeriod: typeof timePeriodCS[number];
}

export type OrderItem = {
  productId: string;
  price: ProductPrice;
  qty: number;
};
