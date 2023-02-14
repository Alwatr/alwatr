import type {MultiLangStringObj} from './i18n.js';
import type {Photo} from './photo.js';
import type {AlwatrDocumentObject} from './storage.js';
import type {StringifyableRecord} from './type-helper.js';

// -- Const value --

export const shipmentTypeCS = ['x', 'y'] as const;
export const carTypeCS = ['x', 'y'] as const;
export const timePeriodCS = ['1-2w', '2-3w', '3-4w'] as const;
export const discountTypeCS = ['number', 'percent'] as const;
export const orderStatusCS = [
  'draft',
  'registered',
  'processing',
  'payment_pending',
  'preparing',
  'shipping',
  'delayed',
  'on_hold',
  'canceled',
  'refunded',
] as const;

// -- Document object --

export interface Product extends AlwatrDocumentObject {
  /**
   * Product global unique id.
   */
  id: string;

  /**
   * Product title
   */
  title: MultiLangStringObj;

  /**
   * Product image
   */
  image: Photo;
}

export interface ProductPrice extends AlwatrDocumentObject {
  /**
   * Product global unique id.
   */
  id: string;

  /**
   * Product price in this list.
   */
  price: number;
}

export interface Order extends AlwatrDocumentObject {
  /**
   * Order auto incremental unique id.
   */
  id: string;

  /**
   * Order Status
   */
  status: (typeof orderStatusCS)[number];

  /**
   * Order cart list.
   */
  itemList: Array<OrderItem>;

  /**
   * Delivery info
   */
  delivery: OrderDelivery;

  discount: number;
  discountType: (typeof discountTypeCS)[number];

  totalPrice: number;
  shippingPrice: number;
  finalPrice: number;

  /**
   * Customer device uuid.
   */
  clientId: string;

  /**
   * Customer device ip address.
   */
  remoteAddress: string;
}

// -- child types --

export interface OrderItem extends StringifyableRecord {
  productId: string;
  price: OrderItemPrice;
  qty: number;
}

export interface OrderItemPrice extends StringifyableRecord {
  /**
   * Displayed price before discount
   */
  price: number;

  /**
   * Final price after any discount
   */
  finalPrice: number;
}

export interface OrderDelivery extends StringifyableRecord {
  recipientName: string;
  recipientNationalCode: string;
  address: string;
  shipmentType: (typeof shipmentTypeCS)[number];
  carType: (typeof carTypeCS)[number];
  timePeriod: (typeof timePeriodCS)[number];
}
