import {contextConsumer, contextProvider, eventListener} from '@alwatr/signal';

import type {PageHomeContent} from '../type.js';
import type {ClickSignalType} from '@alwatr/type';

export * from '@alwatr/pwa-helper/context.js';

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home-page-content-context');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);

export const languageButtonClickEventListener = eventListener.bind<ClickSignalType>('language-button-click-event');
