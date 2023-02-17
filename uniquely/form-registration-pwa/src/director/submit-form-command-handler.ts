import {serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';
import {validator} from '@alwatr/validator';

import {logger} from './logger.js';
import {config} from '../config.js';
import {submitRegisterFormCommandTrigger} from '../context.js';

import type {FormData} from '../type.js';

const FormDataSchema = {
  name: String,
  phoneNumber: String,
};

commandHandler.define<FormData, FormData | null>(submitRegisterFormCommandTrigger.id, async (formData) => {
  console.log(formData);

  let validFormData;
  try {
    validFormData = validator(FormDataSchema, {name: formData.name, phoneNumber: formData.phoneNumber});
  }
  catch (err) {
    logger.error('submit-form-command', 'invalid-form-data', {err});
    snackbarSignalTrigger.request({
      message: message('form_submit_invalid'),
    });
    return null;
  }

  let response;
  try {
    response = await serviceRequest<FormData>({
      method: 'PUT',
      url: config.api + '/form/',
      queryParameters: {
        formId: formData.formId,
      },
      token: config.token,
      bodyJson: validFormData,
    });
  }
  catch (err) {
    snackbarSignalTrigger.request({
      message: message('form_submit_fail'),
    });
    logger.error('submit-form-command', (err as Error).message, {err});
    return null;
  }

  snackbarSignalTrigger.request({
    message: message('form_submit_successful'),
  });

  redirect('/');

  return response.data;
});
