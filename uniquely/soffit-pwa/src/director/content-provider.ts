import {localeContextConsumer} from '@alwatr/i18n';
import {contextProvider} from '@alwatr/signal';

import {logger} from './logger.js';

import type {PageHomeContent} from '../type.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('contentProvider', {language});

  if (language == null) return;

  const content =
    language === 'en'
      ? (await import('../content/en.js')).homePageContent
      : (await import('../content/fa.js')).homePageContent;

  contextProvider.setValue<PageHomeContent>('home_page_content', content);
});
