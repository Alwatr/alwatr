import {setL18eLoader} from '@alwatr/i18n';

import {logger} from './logger.js';

import type {L18eContext} from '@alwatr/type';

setL18eLoader((locale) => {
  const language = locale.language;
  logger.logMethodArgs('l18eLoader', {language});
  return language === 'en'
    ? import('../l18e/en.json', {assert: {type: 'json'}}) as unknown as Promise<L18eContext>
    : import('../l18e/fa.json', {assert: {type: 'json'}}) as unknown as Promise<L18eContext>;
});
