import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';
import type {AlwatrDocumentObject} from '@alwatr/type';

nanoServer.route('PUT', '/form/', setForm);

async function setForm(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('setForm');
  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{form: string}>({form: 'string'});

  if (config.formList.indexOf(params.form) === -1) {
    return {
      ok: false,
      statusCode: 404,
      errorCode: 'form_not_found',
    };
  }

  const bodyJson = await connection.requireJsonBody<AlwatrDocumentObject>();
  bodyJson.id = 'auto_increment';

  await storageClient.set(bodyJson, 'form-' + params.form);

  return {
    ok: true,
    data: {},
  };
}
