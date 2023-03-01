import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';

import {logger} from '../logger.js';

import type {ClickSignalType} from '@alwatr/type';

eventListener.subscribe<ClickSignalType>('back_to_home_click_event', () => {
  logger.logMethod('back_to_home_click_event');
  redirect({sectionList: []});
});
