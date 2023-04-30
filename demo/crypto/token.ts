import {AlwatrTokenGenerator} from '@alwatr/crypto';
import {createLogger} from '@alwatr/logger';

const logger = createLogger('crypto/token', true);

const tokenGenerator = new AlwatrTokenGenerator({
  secret: 'my-very-secret-key',
  duration: '2s',
  algorithm: 'sha512',
  encoding: 'base64url',
});

const token = tokenGenerator.generate('userId');
logger.logOther?.('token:', token);

const tokenValidationStatus = tokenGenerator.verify('userId', token);
logger.logOther?.('token validation status:', tokenValidationStatus);
