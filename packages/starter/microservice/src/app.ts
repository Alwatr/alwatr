import {AlwatrMicroServer} from '@alwatr/micro-server';

import {config} from './config.js';

export const app = new AlwatrMicroServer(config.port);
