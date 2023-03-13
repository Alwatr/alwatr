import {
  contextConsumer,
  contextProvider,
  commandTrigger,
} from '@alwatr/signal';

import {PageHomeContent} from '../type.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order, ProductPrice} from '@alwatr/type/customer-order-management.js';

export * from '@alwatr/pwa-helper/context.js';

export const priceStorageContextConsumer =
  contextConsumer.bind<AlwatrDocumentStorage<ProductPrice>>('price-storage-tile-context');

export const finalPriceStorageContextConsumer =
  contextConsumer.bind<AlwatrDocumentStorage<ProductPrice>>('final-price-storage-tile-context');

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home-page-content-context');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);

export const submitOrderCommandTrigger = commandTrigger.bind<Partial<Order>, Order | null>('submit-order-command');
