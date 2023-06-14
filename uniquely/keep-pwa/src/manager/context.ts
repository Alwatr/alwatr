import {commandTrigger, contextConsumer, contextProvider, eventListener} from '@alwatr/signal';

import type {PageHomeContent, FormData} from '../type.js';
import type {ClickSignalType} from '@alwatr/type';

export * from '@alwatr/pwa-helper/context.js';

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home_page_content_context');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);

export const languageButtonClickEventListener = eventListener.bind<ClickSignalType>('language_button_click_event');

export const submitFormCommandTrigger = commandTrigger.bind<FormData, boolean>('submit_form_command');
