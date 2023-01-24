import {type CacheStrategy, serviceRequest} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import config from '../config.js';

import type {SalavatCount} from '../types/signals/salavat-count.js';
import type {AlwatrServiceResponse} from '@alwatr/type';

export const logger = createLogger('[director/salavat-get-count]');
export const snackBarSignal = new SignalInterface('snack-bar');
export const salavatCountSignal = new SignalInterface('salavat-count');

async function requestGetSalavatCount(cacheStrategy: CacheStrategy): Promise<void> {
  logger.logMethod('requestSalavatCount');

  try {
    const response = (await serviceRequest({
      url: config.api + '/vow',
      token: config.token,
      cacheStrategy,
    })) as AlwatrServiceResponse<Partial<SalavatCount>>;

    salavatCountSignal.dispatch({
      mySalavatCount: response.data?.mySalavatCount ?? Math.round((response.data?.totalSalavatCount ?? 0) / 2),
      totalSalavatCount: response.data?.totalSalavatCount ?? 0,
    });
  }
  catch (error) {
    if ((error as Error).message !== 'fetch_cache_not_found') {
      logger.error('requestSalavatCount', 'fetch_failed', error);
      snackBarSignal.dispatch({
        open: true,
        text: 'عملیات با خطا رو به رو شد',
      });
    }
  }
}

// salavatCountSignal.setProvider(() => requestJobStorage('network_first'));

requestGetSalavatCount('cache_only').then(() => requestGetSalavatCount('network_first'));

setInterval(() => requestGetSalavatCount('network_first'), 60_000);
