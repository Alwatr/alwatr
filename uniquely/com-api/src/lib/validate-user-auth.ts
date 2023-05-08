import {userFactory} from './crypto.js';
import {userStorage} from './storage.js';

import type {User, UserAuth} from '@alwatr/type';
import type {UserPermission} from '@alwatr/type/customer-order-management.js';

export const validateUserAuth = async (userAuth: UserAuth | null, permission?: UserPermission): Promise<User> => {
  if (userAuth == null) {
    throw {
      ok: false,
      statusCode: 401,
      errorCode: 'authorization_required',
    };
  }

  const error403 = {
    ok: false,
    statusCode: 403,
    errorCode: 'access_denied',
  } as const;

  const user = await userStorage.get(userAuth.id);

  if (user == null) throw error403;

  if (!userFactory.verifyToken([user.id, user.lpe], userAuth.token)) throw error403;

  if (permission && user.permissions?.includes(permission) !== true) throw error403;

  return user;
};
