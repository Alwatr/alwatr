import {AlwatrTokenGenerator} from '@alwatr/crypto';

import {config} from './config.js';

export const tokenGenerator = new AlwatrTokenGenerator(config.token);
