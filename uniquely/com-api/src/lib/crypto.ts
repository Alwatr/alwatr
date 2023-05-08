import {AlwatrUserFactory} from '@alwatr/crypto';

import {config} from './config.js';

export const userFactory = new AlwatrUserFactory(config.token);
