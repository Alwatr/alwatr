import {localeContextConsumer} from '@alwatr/i18n';

import {logger} from './logger.js';
import {homePageContentContextProvider, productPageContentContextProvider} from '../context.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('contentProvider', {language});

  if (language == null) return;

  const homePageContent =
    language === 'en'
      ? (await import('../content/home-page-en.js')).homePageContent
      : (await import('../content/home-page-fa.js')).homePageContent;
  homePageContentContextProvider.setValue(homePageContent);

  const content =
    language === 'en'
      ? (await import('../content/product-page-en.js')).productPageContent
      : (await import('../content/product-page-fa.js')).productPageContent;
  productPageContentContextProvider.setValue(content);
});
