import {localeContextConsumer} from '@alwatr/i18n';

import {logger} from '../manager/logger.js';
import {homePageContentContextProvider} from '../manager/context.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('contentProvider', {language});
  if (language == null) return;
  homePageContentContextProvider.setValue((await import('../content/home-page-fa.js')).homePageContent);
});
