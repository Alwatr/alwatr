import {AlwatrServiceResponse, serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {createLogger} from '@alwatr/logger';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';
import {validator, type JsonSchema} from '@alwatr/validator';

import {config} from '../config.js';

import type {FormData} from '../type.js';

const logger = createLogger('command-form-submit');

const validSchema: Record<string, JsonSchema> = {
  'lottery': {code: String, name: String, phone: Number, activity: String},
  'supply-chain': {code: String, name: String, phone: Number, activity: String},
};

async function submitForm(detail: FormData): Promise<null> {
  let bodyJson;
  try {
    bodyJson = validator<Record<string, string | number | null>>(validSchema[detail.id], detail.data);
  }
  catch (err) {
    logger.accident('submitForm', 'invalid_form_data', 'validator failed on form data', (err as Error).cause);
    snackbarSignalTrigger.request({message: message('invalid_form_data')});
  }

  try {
    await serviceRequest<AlwatrServiceResponse>({
      method: 'PUT',
      url: config.api + '/form/',
      queryParameters: {
        form: detail.id,
      },
      token: config.token,
      bodyJson,
    });
  }
  catch (err) {
    logger.error('submitForm', 'request_failed', (err as Error).cause);
    snackbarSignalTrigger.request({message: message('check_network_connection')});
  }

  return null;
}

commandHandler.define<FormData, null>('form-submit', submitForm);
