import {localeContextConsumer} from '@alwatr/i18n';
import {contextProvider} from '@alwatr/signal';

import {logger} from './logger.js';

import type {PageHomeContent, ProductPageContent} from '../type.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('contentProvider', {language});

  if (language == null) return;

  const homePageContent =
    language === 'en'
      ? (await import('../content/en.js')).homePageContent
      : (await import('../content/fa.js')).homePageContent;
  const productPageContent =
    language === 'en'
      ? (await import('../content/en.js')).productPageContent
      : (await import('../content/fa.js')).productPageContent;

  contextProvider.setValue<PageHomeContent>('home_page_content', homePageContent);
  contextProvider.setValue<ProductPageContent>('product_page_content', productPageContent);
});
