import {AlwatrNanoServer} from '@alwatr/nano-server';

import {config} from './config.js';

export const nanoServer = new AlwatrNanoServer({host: config.host, port: config.port, allowAllOrigin: true});
