import {eventListener} from '@alwatr/signal';

import {logger} from '../logger.js';

import type {ClickSignalType} from '@alwatr/type';

eventListener.subscribe<ClickSignalType>('back-click-event', () => {
  logger.logMethod('back-click-event');
  history.back();
});
