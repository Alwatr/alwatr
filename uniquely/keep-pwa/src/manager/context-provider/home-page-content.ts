import {localeContextConsumer} from '@alwatr/i18n';

import {homePageContent} from '../../content/home-page-fa.js'; // for perf
import {homePageContentContextProvider} from '../context.js';
import {logger} from '../logger.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs?.('contentProvider', {language});
  if (language == null) return;

  const content = language === 'en' ? (await import('../../content/home-page-en.js')).homePageContent : homePageContent;
  homePageContentContextProvider.setValue(content);
});
