import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

nanoServer.route<Record<string, ComUser>>('GET', '/user-list', async (connection) => {
  logger.logMethod?.('get-user-list');

  await validateUserAuth(connection.getUserAuth(), 'user-list/read');

  const userList = await storageClient.getStorage<ComUser>(config.privateStorage.userList);

  return userList;
});
