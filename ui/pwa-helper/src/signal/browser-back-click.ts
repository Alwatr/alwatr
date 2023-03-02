import {eventListener} from '@alwatr/signal';

import {logger} from '../logger.js';

import type {ClickSignalType} from '@alwatr/type';

eventListener.subscribe<ClickSignalType>('browser_back_click_event', () => {
  logger.logMethod('browser_back_click_event');
  history.back();
});

// TODO: replace all and remove this
eventListener.subscribe<ClickSignalType>('back-click-event', () => {
  logger.logMethod('browser_back_click_event');
  history.back();
});
