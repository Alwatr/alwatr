import {
  contextConsumer,
  contextProvider,
  requestableContextConsumer,
  requestableContextProvider,
  commandTrigger,
} from '@alwatr/signal';

import {PageHomeContent} from './type.js';

import type {AlwatrDocumentStorage, User} from '@alwatr/type';
import type {Product, Order} from '@alwatr/type/customer-order-management.js';

export * from '@alwatr/pwa-helper/context.js';

export const productStorageContextConsumer =
  contextConsumer.bind<AlwatrDocumentStorage<Product>>('product-storage-context');

export const orderStorageContextProvider =
    requestableContextProvider.bind<AlwatrDocumentStorage<Order>, null>('order-storage-context');
export const orderStorageContextConsumer =
  requestableContextConsumer.bind<AlwatrDocumentStorage<Order>, null>(orderStorageContextProvider.id);


export const userContextProvider = contextProvider.bind<User>('user-context');
export const userContextConsumer = contextConsumer.bind<User>(userContextProvider.id);

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home-page-content-context');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);

export const submitOrderCommandTrigger = commandTrigger.bind<Partial<Order>, Order | null>('submit-order-command');
