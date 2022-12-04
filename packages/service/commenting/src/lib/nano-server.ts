import {AlwatrNanoServer} from '@alwatr/nano-server';

import {config} from './config.js';

export const nanoServer = new AlwatrNanoServer({
  host: config.nanoServer.host,
  port: config.nanoServer.port,
  allowAllOrigin: true,
});
