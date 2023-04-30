import {AlwatrTokenGenerator} from '@alwatr/crypto';
import {createLogger} from '@alwatr/logger';
import {delay} from '@alwatr/util';

const logger = createLogger('crypto/token', true);

const tokenGenerator = new AlwatrTokenGenerator({
  secret: 'my-very-secret-key',
  duration: '2s',
  algorithm: 'sha512',
  encoding: 'base64url',
});

const userId = 'test_user';

const token = tokenGenerator.generate(userId);
logger.logOther?.('token:', token);

const userTokenValidation = (): void => {
  const tokenValidationStatus = tokenGenerator.verify(userId, token);
  logger.logOther?.('user token validation status:', tokenValidationStatus);
};

userTokenValidation();
await delay(2000);
userTokenValidation();
await delay(2000);
userTokenValidation();
