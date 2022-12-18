import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrDocumentObject} from '@alwatr/storage-engine';

nanoServer.route('PATCH', 'all', updateDocument);

async function updateDocument(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('updateDocument');

  const token = connection.requireToken(config.nanoServer.accessToken);
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

  const storageEngine = storageProvider.get({name: param.storage});

  connection.reply({
    ok: true,
    data: storageEngine.set(document, true),
  });
}
