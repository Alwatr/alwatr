import {createLogger} from '@alwatr/logger';
import {type TokenStatus, AlwatrTokenGenerator} from '@alwatr/token';

const logger = createLogger('token/demo');

const tokenGenerator = new AlwatrTokenGenerator({
  secret: 'my-very-secret-key',
  duration: '2s',
  algorithm: 'sha512',
  encoding: 'base64url',
});

type User = {
  id: string;
  name: string;
  role: 'admin' | 'user';
  auth: string;
};

const user: User = {
  id: 'alimd',
  name: 'Ali Mihandoost',
  role: 'admin',
  auth: '', // Generated in first login
};

// ------

// For example when user authenticated we send user data contain valid auth token.
function login(): User {
  user.auth = tokenGenerator.generate(`${user.id}-${user.role}`);
  logger.logMethodFull?.('login', {}, {user});
  return user;
}

// Now request received and we want to validate the token to ensure that the user is authenticated.
function userValidate(user: User): TokenStatus {
  const validateStatus = tokenGenerator.verify(`${user.id}-${user.role}`, user.auth);
  logger.logMethodFull?.('userValidate', {user}, {validateStatus});
  return validateStatus;
}

// demo
const userData = login();
userValidate(userData); // { validateStatus: 'valid' }

setTimeout(() => {
  // 2s later
  userValidate(user); // { validateStatus: 'expired' }
}, 2001);

setTimeout(() => {
  // 4s later
  userValidate(user);
}, 4001); // { validateStatus: 'invalid' }
