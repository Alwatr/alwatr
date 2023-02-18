import {localeContextConsumer, setLocale, l18eContextConsumer} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {languageButtonClickEventListener} from '../context.js';

languageButtonClickEventListener.subscribe(() => {
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

let rapidClickCount = 0;
let lastClick = 0;
l18eContextConsumer.subscribe(() => {
  const now = Date.now();
  if (now - lastClick < 1_000) {
    rapidClickCount++;
  }
  lastClick = now;

  if (rapidClickCount > 5 && localeContextConsumer.getValue()?.language === 'fa') {
    rapidClickCount = 0;

    snackbarSignalTrigger.request({
      message: 'داداش چی از جون ما می‌خوای؟!\nولی جون ما با سرعت برنامه حال می‌کنی؟!',
      duration: -1,
      actionLabel: 'ایول',
    });
  }
});
