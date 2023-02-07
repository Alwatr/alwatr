import {localeContextConsumer, setLocale} from '@alwatr/i18n';
import {eventListener} from '@alwatr/signal';

import {logger} from './logger.js';

import type {ClickSignalType} from '@alwatr/type';


eventListener.subscribe<ClickSignalType>('language-button-click-event', () => {
  logger.logMethod('changeLanguage');
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
