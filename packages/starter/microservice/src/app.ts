import {AlwatrNanoServer} from '@alwatr/nano-server';

import {config} from './config.js';

export const app = new AlwatrNanoServer(config.port);
