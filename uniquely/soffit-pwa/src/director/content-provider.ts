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
      ? (await import('../content/home-page-en.js')).homePageContent
      : (await import('../content/home-page-fa.js')).homePageContent;
  contextProvider.setValue<PageHomeContent>('home_page_content', homePageContent);

  const content =
    language === 'en'
      ? (await import('../content/product-page-en.js')).productPageContent
      : (await import('../content/product-page-fa.js')).productPageContent;
  contextProvider.setValue<ProductPageContent>('product_page_content', content);
});
