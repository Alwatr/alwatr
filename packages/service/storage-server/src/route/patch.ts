import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrDocumentObject} from '@alwatr/fetch';
import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('PATCH', 'all', updateDocument);

async function updateDocument(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('updateDocument');

  const token = connection.requireToken(config.token);
  if (token == null) return;

  const param = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  if (param === null) return;

  const document = await connection.requireJsonBody<AlwatrDocumentObject>();
  if (document == null) return;

  if (!(typeof document.id === 'string' && document.id.length !== 0)) {
    return connection.reply({
      ok: false,
      statusCode: 406,
      errorCode: 'doc_id_required',
    });
  }

  const storage = storageProvider.get({name: param.storage});

  connection.reply({
    ok: true,
    data: storage.set(document, true),
  });
}
