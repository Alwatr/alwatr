import {serviceRequest} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import config from '../config.js';

import type {SalavatCount} from '../types/signals/salavat-count.js';
import type {AlwatrServiceResponse} from '@alwatr/type';

export const logger = createLogger('[director/salavat-post-count]');
export const snackBarSignal = new SignalInterface('snack-bar');
export const salavatCountSignal = new SignalInterface('salavat-count');

async function requestPostSalavatCount(count: number): Promise<void> {
  logger.logMethod('requestSalavatCount');

  snackBarSignal.dispatch({
    open: true,
    text: 'در حال ذخیره...',
  });

  try {
    const response = (await serviceRequest({
      url: config.api ? config.api + '/vow' : '/vow',
      token: config.token,
      method: 'POST',
      bodyJson: {
        count,
      },
    })) as AlwatrServiceResponse<Partial<SalavatCount>>;

    snackBarSignal.dispatch({});

    setTimeout(() => {
      snackBarSignal.dispatch({
        open: true,
        text: 'نذر شما با موفقیت ذخیره شد.',
      });
    }, 500);

    salavatCountSignal.dispatch({
      mySalavatCount: response.data?.mySalavatCount ?? Math.round((response.data?.totalSalavatCount ?? 0) / 2),
      totalSalavatCount: response.data?.totalSalavatCount ?? 0,
    });
  }
  catch (error) {
    if ((error as Error).message !== 'fetch_cache_not_found') {
      logger.error('requestSalavatCount', 'fetch_failed', error);

      snackBarSignal.dispatch({});

      setTimeout(() => {
        snackBarSignal.dispatch({
          open: true,
          text: 'عملیات با خطا رو به رو شد',
        });
      }, 500);
    }
  }
}

salavatCountSignal.setProvider(requestPostSalavatCount);
