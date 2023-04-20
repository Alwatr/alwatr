import {serviceRequest} from '@alwatr/fetch';
import {commandHandler} from '@alwatr/signal';

import {logger} from './logger.js';
import {config} from '../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';
import type {AgencyInfo} from '@alwatr/type/customer-order-management.js';

commandHandler.define<Partial<AgencyInfo>, AgencyInfo | 'not_exists' | null>('login-command', async (agencyInfo) => {
  try {
    const response = await serviceRequest<AlwatrServiceResponseSuccessWithMeta<AgencyInfo>>({
      ...config.fetchContextOptions,
      url: `${config.user}${agencyInfo.phoneNumber}-${agencyInfo.token}.json`,
    });

    return response.data;
  }
  catch (err) {
    // if (response.statusCode === 404) {
    //   logger.error('loginCommand', 'user_not_exists', agencyInfo);
    //   return 'not_exists';
    // }
    logger.error('loginCommand', 'login_failed', err, agencyInfo);
    return null;
  }
});
