import {AlwatrUserFactory} from '@alwatr/crypto';
import {delay} from '@alwatr/util';

import type {User} from '@alwatr/type';

const userFactory = new AlwatrUserFactory({
  secret: 'my-very-secret-key',
  duration: '2s',
  algorithm: 'sha512',
  encoding: 'base64url',
});

const user: User = {
  id: userFactory.generateId(),
  country: 'iran',
  fullName: 'امیرمحمد نجفی',
  gender: 'male',
  lpe: 1,
  phoneNumber: '989151234567',
};

const userIdValidation = userFactory.verifyId(user.id);
console.log('user id validation: %s', userIdValidation);

const userToken = userFactory.generateToken([user.id, user.lpe]);
console.log('user token %s', userToken);

const userTokenValidation = (): void => {
  const tokenValidationStatus = userFactory.verifyToken([user.id, user.lpe], userToken);
  console.log('user id validation: %s', tokenValidationStatus);
};

userTokenValidation();
await delay(2000);
userTokenValidation();
await delay(1000);
userTokenValidation();
