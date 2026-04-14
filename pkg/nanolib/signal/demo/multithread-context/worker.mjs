import {createLogger} from '@alwatr/logger';
import {AlwatrMultithreadContextSignal} from '@alwatr/signal';

AlwatrMultithreadContextSignal.setupChannel();

import {messageContext} from './share-context.mjs';

const logger = createLogger('demo/signal', true);

let i = 0;

messageContext.subscribe((message) => {
  logger.logMethodArgs?.('worker/subscribe', message);
});

setInterval(() => {
  logger.logMethod?.('worker/setValue');
  messageContext.setValue({type: 'demo.signal', payload: {i: ++i}});
}, 5000);

globalThis.addEventListener('message', (event) => {
  logger.logMethodArgs?.('onMessage', event.data);
  globalThis.postMessage('aleyk ' + event.data);
});
