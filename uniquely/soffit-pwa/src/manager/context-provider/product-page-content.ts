import {localeContextConsumer} from '@alwatr/i18n';

import {productPageContentContextProvider} from '../context.js';
import {logger} from '../logger.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('productPageContentProvider', {language});
  if (language == null) return;

  const content =
    language === 'en'
      ? (await import('../../content/product-page-en.js')).productPageContent
      : (await import('../../content/product-page-fa.js')).productPageContent;
  productPageContentContextProvider.setValue(content);
});
