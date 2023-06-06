import {userFactory} from './crypto.js';
import {userStorage} from './storage.js';

import type {AlwatrServiceResponseFailed, UserAuth} from '@alwatr/type';
import type {ComUser, UserPermission} from '@alwatr/type/customer-order-management.js';

const error403 = (): AlwatrServiceResponseFailed => ({
  ok: false,
  statusCode: 403,
  errorCode: 'access_denied',
});

export const validateUserAuth = async (userAuth: UserAuth | null, permission?: UserPermission): Promise<ComUser> => {
  if (userAuth == null) {
    throw {
      ok: false,
      statusCode: 401,
      errorCode: 'authorization_required',
    };
  }


  const user = await userStorage.get(userAuth.id);

  if (user == null) throw error403();

  if (!userFactory.verifyToken([user.id, user.lpe], userAuth.token)) throw error403();

  if (permission && user.permissions !== 'root') {
    if (!Array.isArray(user.permissions) || user.permissions.includes(permission) !== true) {
      throw error403();
    }
  }

  return user;
};
