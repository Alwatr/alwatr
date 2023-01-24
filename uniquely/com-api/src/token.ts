import {AlwatrTokenGenerator} from '@alwatr/token';

import {config} from './config.js';

export const tokenGenerator = new AlwatrTokenGenerator({
  secret: config.token.secret,
  duration: null,
  algorithm: 'sha256',
  encoding: 'base64url',
});
