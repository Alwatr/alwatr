import {
  contextConsumer,
  contextProvider,
  commandTrigger,
} from '@alwatr/signal';

import {PageHomeContent} from '../type.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

export * from '@alwatr/pwa-helper/context.js';

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home-page-content-context');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);

export const submitOrderCommandTrigger = commandTrigger.bind<Partial<Order>, Order | null>('submit-order-command');
