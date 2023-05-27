import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {getUserListIncOrder} from '../lib/user-order.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

nanoServer.route<Record<string, ComUser>>('GET', '/admin/user-list-inc-order', async (connection) => {
  logger.logMethod?.('get-admin-user-list-inc-order');

  await validateUserAuth(connection.getUserAuth(), 'user-list/read');

  return {
    ok: true,
    data: await getUserListIncOrder(),
  };
});
