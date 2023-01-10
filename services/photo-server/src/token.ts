import {AlwatrTokenGenerator} from '@alwatr/token';

import {config} from './config.js';

export const generateToken = new AlwatrTokenGenerator({
  algorithm: 'sha256',
  duration: null,
  encoding: 'base64url',
  secret: config.photo.secret,
});
