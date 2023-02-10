import {AlwatrTokenGenerator} from '@alwatr/token';

import {config} from './config.js';

export const tokenGenerator = new AlwatrTokenGenerator(config.token);
