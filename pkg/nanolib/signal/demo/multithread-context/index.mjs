import {AlwatrMultithreadContextSignal} from '@alwatr/signal';

import './main.mjs';

const worker = new Worker('./worker.js', {type: 'module'});
AlwatrMultithreadContextSignal.setupChannel(worker);
