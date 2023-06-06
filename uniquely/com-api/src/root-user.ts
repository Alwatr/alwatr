import {logger} from './lib/config.js';
import {patchUser} from './lib/patch-user.js';
import {userStorage} from './lib/storage.js';

/**
 * Create first root user when user storage is empty at the first time.
 */
const initRootUser = async (): Promise<void> => {
  if ((await userStorage.keys()).length === 0) {
    logger.logMethod?.('init-root-user');

    const rootUser = await patchUser({
      id: 'new',
      lpe: 1,
      fullName: 'Alwatr Admin',
      country: 'ir',
      phoneNumber: 989123456789,
      gender: 'male',
      permissions: 'root',
    });

    logger.logProperty?.('rootUser', rootUser);
  }
};

initRootUser();
