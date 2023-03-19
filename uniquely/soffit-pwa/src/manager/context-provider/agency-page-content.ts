import {localeContextConsumer} from '@alwatr/i18n';

import {agencyPageContentContextProvider} from '../context.js';
import {logger} from '../logger.js';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  logger.logMethodArgs('agencyPageContentProvider', {language});
  if (language == null) return;

  const agencyPageContent =
    language === 'en'
      ? (await import('../../content/agency-page-en.js')).agencyPageContent
      : (await import('../../content/agency-page-fa.js')).agencyPageContent;
  agencyPageContentContextProvider.setValue(agencyPageContent);
});
