import {commandTrigger, contextConsumer, contextProvider} from '@alwatr/signal';

import type {PageHomeContent, FormData} from './type.js';

export const submitRegisterFormCommandTrigger = commandTrigger.bind<Partial<FormData>, FormData>('submit-form-command');

export const homePageContentContextProvider =
  contextProvider.bind<PageHomeContent>('home-page-content-context');
export const homePageContentContextConsumer =
  contextConsumer.bind<PageHomeContent>(homePageContentContextProvider.id);
