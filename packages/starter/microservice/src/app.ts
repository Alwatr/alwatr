import {AlwatrMicroServer} from './common/micro-server.js';
import {config} from './config.js';

export const app = new AlwatrMicroServer(config.port);
