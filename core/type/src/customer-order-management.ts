import type {MultiLangStringObj} from './i18n.js';
import type {Photo} from './photo.js';
import type {AlwatrDocumentObject} from './storage.js';
import type {StringifyableRecord} from './type-helper.js';

// -- Const value --

export const ladingTypeCS = ['hand', 'pallet'] as const;
export const carTypeCS = ['nissan', 'one_wheel', 'ten_wheel', 'trolley'] as const;
export const carTypePriceCS = [110_000, 140_000, 170_000, 200_000] as const;
export const timePeriodCS = ['auto', '1_2w', '2_3w', '3_4w'] as const;
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

export const tileQtyStep = 3.6;

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
  shippingInfo: Partial<OrderShippingInfo>;

  discount: number;
  discountType: (typeof discountTypeCS)[number];

  /**
   * The total price of this order exclude lading and discounts.
   */
  totalPrice: number;

  /**
   * The cost of lading the order.
   */
  ladingPrice: number;

  /**
   * The final total price of this order include lading and discounts.
   */
  finalTotalPrice: number;

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

  /**
   * Quantity of this item.
   */
  qty: number;
}

export interface OrderShippingInfo extends StringifyableRecord {
  recipientName: string;
  recipientNationalCode: string;
  address: string;
  description: string,
  ladingType: (typeof ladingTypeCS)[number];
  carType: (typeof carTypeCS)[number];
  timePeriod: (typeof timePeriodCS)[number];
}

// -- Schema --

export const orderInfoSchema = {
  id: String,
  status: String,
  itemList: [{
    productId: String,
    price: Number,
    finalPrice: Number,
    qty: Number,
  }],
  shippingInfo: {
    recipientName: String,
    recipientNationalCode: String,
    address: String,
    carType: String,
    ladingType: String,
    timePeriod: String,
  },
  discount: Number,
  discountType: String,
  totalPrice: Number,
  ladingPrice: Number,
  finalTotalPrice: Number,
};

export const orderShippingInfoSchema = orderInfoSchema.shippingInfo;

