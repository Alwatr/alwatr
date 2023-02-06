import {AlwatrServiceResponse, serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {createLogger} from '@alwatr/logger';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';
import {validator, type JsonSchema} from '@alwatr/validator';

import {config} from '../config.js';

import type {FormData} from '../type.js';

const logger = createLogger('command-form-submit');

const validSchema: Record<string, JsonSchema | undefined> = {
  'lottery': {code: String, name: String, phone: Number, activity: String},
  'supply-chain': {name: String, phone: Number, activity: String},
};

commandHandler.define<FormData, boolean>('form-submit', async (form: FormData): Promise<boolean> => {
  let bodyJson;
  try {
    const schema = validSchema[form.formId];

    if (schema == null) {
      logger.accident(
          'submitForm',
          'invalid_form_id',
          'Please define form id in validSchema before use it',
          {formId: form.formId, validSchema: Object.keys(validSchema)},
      );
      return false;
    }

    bodyJson = validator(schema, form.data);
  }
  catch (err) {
    logger.accident('submitForm', 'invalid_form_data', 'validator failed on form data', (err as Error).cause);
    snackbarSignalTrigger.request({message: message('invalid_form_data')});
    return false;
  }

  try {
    await serviceRequest<AlwatrServiceResponse>({
      method: 'PUT',
      url: config.api + '/form/',
      queryParameters: {
        form: form.formId,
      },
      token: config.token,
      bodyJson,
    });
  }
  catch (err) {
    logger.error('submitForm', 'request_failed', (err as Error).cause);
    snackbarSignalTrigger.request({message: message('check_network_connection')});
    return false;
  }

  return true;
});
