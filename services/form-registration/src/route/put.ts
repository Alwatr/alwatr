import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {Form} from '../type.js';
import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('PUT', '/form/', setForm);

async function setForm(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('setForm');
  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{form: string}>({form: 'string'});
  const remoteAddress = connection.incomingMessage.socket.remoteAddress ?? 'unknown';
  const deviceId = connection.incomingMessage.headers['device-id'];

  if (!(typeof deviceId === 'string' && deviceId !== '')) {
    return {
      ok: false,
      statusCode: 401,
      errorCode: 'device_id_header_required',
    };
  }

  if (config.formList.indexOf(params.form) === -1) {
    return {
      ok: false,
      statusCode: 404,
      errorCode: 'form_not_found',
    };
  }

  const bodyJson = await connection.requireJsonBody<Form>();
  bodyJson.id = 'auto_increment';
  bodyJson.remoteAddress = remoteAddress;
  bodyJson.deviceId = deviceId;

  await storageClient.set(bodyJson, 'form-' + params.form);

  return {
    ok: true,
    data: {},
  };
}
