import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

nanoServer.route<Record<string, never>>('GET', '/touch', (connection) => {
  logger.logMethod?.('touch');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});

  storageProvider.get({name: params.storage});

  return {
    ok: true,
    data: {},
  };
});
