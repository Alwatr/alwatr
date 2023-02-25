import {commandTrigger, contextConsumer, contextProvider, eventListener} from '@alwatr/signal';

import type {FormData, PageHomeContent, ProductPageContent} from './type.js';
import type {ClickSignalType} from '@alwatr/type';

export * from '@alwatr/pwa-helper/context.js';

export const submitFormCommandTrigger = commandTrigger.bind<FormData, boolean>('submit-form-command');

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home-page-content');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);

export const productPageContentContextProvider =
  contextProvider.bind<ProductPageContent>('product-page-content');
export const productPageContentContextConsumer =
  contextConsumer.bind<ProductPageContent>(productPageContentContextProvider.id);

export const languageButtonClickEventListener = eventListener.bind<ClickSignalType>('language-button-click-event');
