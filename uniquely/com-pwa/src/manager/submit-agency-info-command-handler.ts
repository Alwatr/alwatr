import {serviceRequest} from '@alwatr/fetch';
import {commandHandler, contextConsumer} from '@alwatr/signal';


import {logger} from './logger.js';
import {config} from '../config.js';

import type {AlwatrServiceResponseSuccessWithMeta, User} from '@alwatr/type';
import type {AgencyInfo} from '@alwatr/type/customer-order-management.js';

const userContextConsumer = contextConsumer.bind<User>('user_context');

commandHandler.define<Partial<AgencyInfo>, AgencyInfo | null >('submit-agency-info-command', async (agencyInfo) => {
  const userContext = userContextConsumer.getValue() ?? await userContextConsumer.untilChange();

  delete agencyInfo._callbackSignalId;
  try {
    const response = await serviceRequest<AlwatrServiceResponseSuccessWithMeta<AgencyInfo>>({
      ...config.fetchContextOptions,
      method: 'PATCH',
      url: config.api + '/agency/',
      bodyJson: agencyInfo,
      token: userContext.token,
      retry: 3,
    });

    return response.data;
  }
  catch (err) {
    logger.error('submitAgencyInfoCommand', 'submit_failed', err, agencyInfo);
    return null;
  }
});
