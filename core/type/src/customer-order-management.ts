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

  /**
   * The total price of this order exclude shipping and discounts.
   */
  totalPrice: number;

  /**
   * The cost of shipping the order.
   */
  shippingPrice: number;

  /**
   * The final total price of this order include shipping and discounts.
   */
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

export interface OrderDraft extends Partial<Order> {
  id: 'new';
  status: 'draft';
}

// -- child types --

export interface OrderItem extends StringifyableRecord {
  productId: string;

  /**
   * The selling price of single product in the market.
   */
  price: number;

  /**
   * The selling price of a product after any discounts to this buyer.
   */
  finalPrice: number;
  qty: number;
}

export interface OrderDelivery extends StringifyableRecord {
  recipientName: string;
  recipientNationalCode: string;
  address: string;
  shipmentType: (typeof shipmentTypeCS)[number];
  carType: (typeof carTypeCS)[number];
  timePeriod: (typeof timePeriodCS)[number];
}

// -- Schema --

export const orderDeliverySchema = {
  recipientName: String,
  recipientNationalCode: String,
  address: String,
  carType: String,
  shipmentType: String,
  timePeriod: String,
};
