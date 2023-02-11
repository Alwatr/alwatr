import {fetchContext} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {contextConsumer} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {config} from '../config.js';

import type {User} from '@alwatr/type';

const provideOrderStorageContext = async (): Promise<void> => {
  logger.logMethod('provideOrderStorageContext');

  const userId = contextConsumer.getValue<User>('user-context');
  if (userId == null) throw new Error('user_id_required');

  try {
    await fetchContext('order-storage-context', {
      method: 'GET',
      url: config.api + '/order/',
      queryParameters: {
        userId: userId.id,
      },
      token: config.token,
    });
  }
  catch (err) {
    logger.error('provideOrderStorageContext', 'fetch_failed', err);

    const response = await snackbarSignalTrigger.requestWithResponse({
      message: message('fetch_failed'),
      actionLabel: message('retry'),
      duration: -1,
    });
    if (response.actionButton) {
      provideOrderStorageContext();
    }
  }
};

provideOrderStorageContext();

contextConsumer.subscribe('order-storage-context', (value) => {
  logger.logProperty('order-storage-context', value);
});
