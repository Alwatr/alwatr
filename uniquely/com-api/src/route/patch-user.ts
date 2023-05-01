import {existsSync, mkdirSync, renameSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

import {simpleHashNumber} from '@alwatr/math';
import {AlwatrServiceResponseSuccess} from '@alwatr/type';

import {config, logger} from '../lib/config.js';
import {userFactory} from '../lib/crypto.js';
import {nanoServer} from '../lib/server.js';
import {userStorage} from '../lib/storage.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

nanoServer.route('PATCH', '/user-list/', async (connection) => {
  logger.logMethod?.('patch-user-list');
  connection.requireToken(config.nanoServer.adminToken);

  const user = await connection.requireJsonBody<ComUser>();

  if (user.id === 'new') {
    user.id = userFactory.generateId();
  }
  else if (!user.id || !userFactory.verifyId(user.id)) {
    // TODO: better validate user data.
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'invalid_user_id',
    };
  }

  userStorage.set(user);

  saveSeparateUserProfile(user);

  return {
    ok: true,
    data: {},
  };
});

const saveSeparateUserProfile = (user: ComUser): void => {
  const path = `${config.publicStoragePath}/user/${simpleHashNumber(user.phoneNumber)}-${token}.json`;

  if (existsSync(path)) {
    try {
      renameSync(path, path + '.bk');
    }
    catch (err) {
      console.error('cannot rename file!');
    }
  }
  else {
    try {
      mkdirSync(dirname(path), {recursive: true});
    }
    catch (err) {
      throw new Error('make_dir_failed');
    }
  }

  const token = userFactory.generateToken([user.id, user.lpe]);
  const content: AlwatrServiceResponseSuccess<ComUser> = {
    ok: true,
    statusCode: 200,
    data: user,
  };

  writeFileSync(path, JSON.stringify(content), {encoding: 'utf-8', flag: 'w'});
};
