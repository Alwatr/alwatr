import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

nanoServer.route<boolean>('DELETE', '/', (connection) => {
  logger.logMethodArgs?.('delete', {method: connection.method});

  connection.requireToken(config.nanoServer.accessToken);

  const param = connection.requireQueryParams<{storage: string; id: string}>({storage: 'string', id: 'string'});

  const storageEngine = storageProvider.get({name: param.storage});

  return {
    ok: true,
    data: storageEngine.delete(param.id),
  };
});
