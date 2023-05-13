import {AlwatrUserFactory} from '@alwatr/crypto';
import {createLogger} from '@alwatr/logger';
import {delay} from '@alwatr/util';

import type {User} from '@alwatr/type';

const logger = createLogger('crypto/user', true);

const userFactory = new AlwatrUserFactory(
    {
      algorithm: 'sha1',
      encoding: 'base64url',
      crcLength: 4,
    },
    {
      secret: 'my-very-secret-key',
      duration: '2s',
      algorithm: 'sha512',
      encoding: 'base64url',
    },
);

const user: User = {
  id: userFactory.generateId(),
  country: 'iran',
  fullName: 'امیرمحمد نجفی',
  gender: 'male',
  lpe: 1,
  phoneNumber: 989151234567,
};

const userIdValidation = userFactory.verifyId(user.id);
logger.logOther?.('user id validation:', userIdValidation);

const userToken = userFactory.generateToken([user.id, user.lpe]);
logger.logOther?.('user token:', userToken);

const userTokenValidation = (): void => {
  const tokenValidationStatus = userFactory.verifyToken([user.id, user.lpe], userToken);
  logger.logOther?.('user token validation status:', tokenValidationStatus);
};

userTokenValidation();
await delay(2000);
userTokenValidation();
await delay(1000);
userTokenValidation();
