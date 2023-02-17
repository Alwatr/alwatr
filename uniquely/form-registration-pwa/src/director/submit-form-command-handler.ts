import {serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {config} from '../config.js';
import {submitRegisterFormCommandTrigger} from '../context.js';

import type {FormData} from '../type.js';

commandHandler.define<FormData, FormData>(submitRegisterFormCommandTrigger.id, async (formData) => {
  let response;
  try {
    response = await serviceRequest<FormData>({
      method: 'PUT',
      url: config.api + '/form/',
      queryParameters: {
        formId: formData.formId,
      },
      token: config.token,
      bodyJson: formData,
    });

    snackbarSignalTrigger.request({
      message: message('form_submit_successful'),
    });


    redirect('/');

    return response.data;
  }
  catch (err) {
    snackbarSignalTrigger.request({
      message: message('form_submit_fail'),
    });
    logger.error('submit-form-command', (err as Error).message, {err});
    throw err;
  }
});
