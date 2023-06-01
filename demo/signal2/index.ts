import {AlwatrMultithreadContext} from '@alwatr/signal2';

import './main.js';

const worker = new Worker('./worker.js', {type: 'module'});
AlwatrMultithreadContext.setupChannel(worker);
