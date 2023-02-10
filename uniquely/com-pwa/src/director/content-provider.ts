import {localeContextConsumer} from '@alwatr/i18n';
import {contextProvider} from '@alwatr/signal';

import {logger} from './logger.js';

import type {PageHomeContent} from '../type.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('contentProvider', {language});

  if (language == null) return;

  contextProvider.setValue<PageHomeContent>(
      'home_page_content',
      (await import('../content/home-page-fa.js')).homePageContent,
  );
});
