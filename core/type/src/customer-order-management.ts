import type {MultiLangStringObj} from './i18n.js';
import type {Photo} from './photo.js';
import type {AlwatrDocumentObject} from './storage.js';
import type {StringifyableRecord} from './type-helper.js';
import type {User} from './user.js';

// -- Const value --

export const ladingTypeCS = ['hand', 'pallet'] as const;
export type LadingType = (typeof ladingTypeCS)[number];

export const carTypeCS = [
  'trailer_truck',
  'camion_dual',
  'camion_solo',
  'camion_911',
  'camion_800',
  'camion_600',
  'camion_mini',
  'nissan',
] as const;
export type CarType = (typeof carTypeCS)[number];

export const timePeriodCS = ['auto', '3_4w', '2_3w', '1_2w'] as const;
export type TimePeriod = (typeof timePeriodCS)[number];

export const discountTypeCS = ['number', 'percent'] as const;
export type DiscountType = (typeof discountTypeCS)[number];

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
export type OrderStatus = (typeof orderStatusCS)[number];

export const userPermissionsCS = ['user/patch', 'price/patch', 'product/patch', 'user-list-inc-order/read'] as const;
export type UserPermission = (typeof userPermissionsCS)[number];

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
  status: OrderStatus;

  /**
   * Order cart list.
   */
  itemList: OrderItem[];

  /**
   * Delivery info
   */
  shippingInfo: Partial<OrderShippingInfo>;

  // discount: number;
  // discountType: DiscountType;

  /**
   * The total price of this order exclude shippings.
   */
  subTotalMarket: number;

  subTotalAgency: number;

  /**
   * The cost of lading the order.
   */
  ladingFee: number;

  /**
   * The cost of pallet.
   */
  palletCost: number;

  /**
   * The cost of shipping price.
   */
  shippingFee: number;

  /**
   * Total shipping const.
   */
  totalShippingFee: number;

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
  marketPrice: number;

  /**
   * The selling price of a product after any discounts to this buyer.
   */
  agencyPrice: number;

  /**
   * Quantity of this item.
   */
  qty: number;
}

export interface OrderShippingInfo extends StringifyableRecord {
  recipientName: string;
  recipientNationalCode: string;
  address: string;
  description: string;
  ladingType: LadingType;
  carType: CarType;
  timePeriod: TimePeriod;
}

export interface ComUser extends User {
  permissions?: UserPermission[] | 'root';
  shopName?: string;
  priceListName?: string;
}

export interface ComUserIncOrder extends ComUser {
  orderList: Record<string, Order>;
}

// -- Schema --

export const orderInfoSchema = {
  id: String,
  status: String,
  itemList: [
    {
      productId: String,
      marketPrice: Number,
      agencyPrice: Number,
      qty: Number,
    },
  ],
  shippingInfo: {
    recipientName: String,
    recipientNationalCode: String,
    address: String,
    carType: String,
    ladingType: String,
    timePeriod: String,
    // description: String,
  },
  // discount: Number,
  // discountType: String,
  subTotalMarket: Number,
  subTotalAgency: Number,
  ladingFee: Number,
  palletCost: Number,
  shippingFee: Number,
  totalShippingFee: Number,
};

export const orderShippingInfoSchema = orderInfoSchema.shippingInfo;
