import {localeContextConsumer, setLocale} from '@alwatr/i18n';

import {languageButtonClickEventListener} from './context.js';
import {logger} from './logger.js';

languageButtonClickEventListener.subscribe(() => {
  logger.logMethod?.('changeLanguage');
  localeContextConsumer.getValue()?.language === 'en'
    ? setLocale({
      code: 'fa-IR',
      language: 'fa',
      direction: 'rtl',
    })
    : setLocale({
      code: 'en-US',
      language: 'en',
      direction: 'ltr',
    });
});
