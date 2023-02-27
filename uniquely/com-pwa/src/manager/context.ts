import {
  contextConsumer,
  contextProvider,
  commandTrigger,
} from '@alwatr/signal';

import {PageHomeContent} from '../type.js';

import type {AlwatrDocumentStorage, User} from '@alwatr/type';
import type {Product, Order, OrderDelivery} from '@alwatr/type/customer-order-management.js';

export * from '@alwatr/pwa-helper/context.js';

export const productStorageContextConsumer =
  contextConsumer.bind<AlwatrDocumentStorage<Product>>('product-storage-context');

export const orderStorageContextConsumer =
  contextConsumer.bind<AlwatrDocumentStorage<Order>>('order-storage-context');

export const userContextProvider = contextProvider.bind<User>('user-context');
export const userContextConsumer = contextConsumer.bind<User>(userContextProvider.id);

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home-page-content-context');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);

export const submitOrderCommandTrigger = commandTrigger.bind<Partial<Order>, Order | null>('submit-order-command');

export const submitOrderShippingCommandTrigger =
  commandTrigger.bind<OrderDelivery, OrderDelivery | null>('submit-order-shipping');
