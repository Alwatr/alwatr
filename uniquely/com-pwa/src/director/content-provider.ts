import {localeContextConsumer} from '@alwatr/i18n';

import {homePageContentContextProvider} from '../manager/context.js';
import {logger} from '../manager/logger.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('contentProvider', {language});
  if (language == null) return;
  homePageContentContextProvider.setValue((await import('../content/home-page-fa.js')).homePageContent);
});
