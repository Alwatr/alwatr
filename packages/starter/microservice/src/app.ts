import {AlwatrMicroServer} from '@alwatr/micro-server';

import {config} from './config.js';

export const app = new AlwatrMicroServer(config.port, undefined, {
  corsHelper: {
    allowOrigin: '*',
    allowMethods: '*',
    maxAge: 5 * 60, // 5 min
  },
});
