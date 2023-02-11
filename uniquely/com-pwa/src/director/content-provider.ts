import {localeContextConsumer} from '@alwatr/i18n';

import {logger} from './logger.js';
import {homePageContentContextProvider, orderListPageContentContextProvider} from '../context.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('contentProvider', {language});

  if (language == null) return;

  homePageContentContextProvider.setValue((await import('../content/home-page-fa.js')).homePageContent);
  orderListPageContentContextProvider.setValue((await import('../content/order-list-page-fa.js')).orderListContent);
});
