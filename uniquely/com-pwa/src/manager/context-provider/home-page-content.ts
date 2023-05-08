import {localeContextConsumer} from '@alwatr/i18n';

import {homePageContent} from '../../content/home-page-fa.js'; // for perf
import {homePageContentContextProvider} from '../context.js';
import {logger} from '../logger.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs?.('contentProvider', {language});
  if (language == null) return;
  homePageContentContextProvider.setValue(
      homePageContent,
      // (await import('../../content/home-page-fa.js')).homePageContent,
  );
});
