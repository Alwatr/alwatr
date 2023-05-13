import {AlwatrUserFactory, userIdGeneratorPreConfig, userTokenGeneratorPreConfig} from '@alwatr/crypto';

import {config} from './config.js';

export const userFactory = new AlwatrUserFactory(
    userIdGeneratorPreConfig,
    {
      ...userTokenGeneratorPreConfig,
      ...config.token,
    },
);
