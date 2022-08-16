import {AlwatrNanoServer} from '@alwatr/nano-server';

import {config} from './config.js';

export const nanoServer = new AlwatrNanoServer(
    {
      port: config.port,
    },
    {
      CORSHelper: {accessControlAllowOrigin: ['http://192.168.1.1']},
    },
);
