import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {DocumentObject} from '@alwatr/storage';

nanoServer.route('PATCH', 'all', updateDocument);

async function updateDocument(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('updateDocument');

  const token = connection.requireToken(config.token);
  if (token == null) return;

  const param = connection.requireQueryParams<{storage: string}>(['storage']);
  if (param === null) return;

  const document = await connection.requireJsonBody<DocumentObject>();
  if (document == null) return;

  if (document._id.length === 0) {
    return connection.reply({
      ok: false,
      statusCode: 406,
      errorCode: 'doc_id_required',
    });
  }

  document._updatedBy ??= 'admin';

  const storage = storageProvider.get({name: param.storage});

  connection.reply({
    ok: true,
    data: storage.set(document, true),
  });
}
