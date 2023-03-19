import {localeContextConsumer} from '@alwatr/i18n';

import {homePageContentContextProvider} from '../context.js';
import {logger} from '../logger.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('homePageContentProvider', {language});
  if (language == null) return;

  const homePageContent =
    language === 'en'
      ? (await import('../../content/home-page-en.js')).homePageContent
      : (await import('../../content/home-page-fa.js')).homePageContent;
  homePageContentContextProvider.setValue(homePageContent);
});
