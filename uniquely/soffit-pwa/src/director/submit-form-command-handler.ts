import {serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {validator, type JsonSchema} from '@alwatr/validator';

import {logger} from './logger.js';
import {config} from '../config.js';
import {submitFormCommandTrigger} from '../context.js';

import type {FormData} from '../type.js';

const validSchema: Record<string, JsonSchema | undefined> = {
  'lottery': {code: String, name: String, phone: Number, activity: String},
  'supply-chain': {name: String, phone: Number, activity: String},
};

commandHandler.define<FormData, boolean>(submitFormCommandTrigger.id, async (form: FormData): Promise<boolean> => {
  logger.logMethodArgs('formSubmit', {form});

  let bodyJson;
  try {
    const schema = validSchema[form.formId];

    if (schema == null) {
      logger.accident(
          'formSubmit',
          'invalid_form_id',
          'Please define form id in validSchema before use it',
          {formId: form.formId, validSchema: Object.keys(validSchema)},
      );
      return false;
    }

    bodyJson = validator(schema, form.data);
  }
  catch (err) {
    logger.accident('formSubmit', 'invalid_form_data', 'validator failed on form data', (err as Error).cause);
    snackbarSignalTrigger.request({message: message('invalid_form_data')});
    return false;
  }

  try {
    await serviceRequest({
      method: 'PUT',
      url: config.api + '/form/',
      queryParameters: {
        formId: form.formId,
      },
      token: config.token,
      bodyJson,
    });
  }
  catch (err) {
    logger.error('formSubmit', 'request_failed', (err as Error).cause);
    snackbarSignalTrigger.request({message: message('check_network_connection')});
    return false;
  }

  return true;
});
