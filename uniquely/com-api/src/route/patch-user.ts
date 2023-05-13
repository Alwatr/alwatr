import {logger} from '../lib/config.js';
import {userFactory} from '../lib/crypto.js';
import {patchUser} from '../lib/patch-user.js';
import {nanoServer} from '../lib/server.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

nanoServer.route<ComUser>('PATCH', '/user', async (connection) => {
  logger.logMethod?.('patch-user');

  await validateUserAuth(connection.getUserAuth(), 'user/patch');

  const userData = await connection.requireJsonBody<ComUser>();

  if (userData.id != 'new') {
    if (!userData.id || !userFactory.verifyId(userData.id)) {
      // TODO: better validate user data.
      return {
        ok: false,
        statusCode: 400,
        errorCode: 'invalid_user_id',
      };
    }
  }

  const user = await patchUser(userData);

  return {
    ok: true,
    data: user,
  };
});
