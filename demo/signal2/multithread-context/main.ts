import {createLogger} from '@alwatr/logger';

import {messageContext} from './share-context.js';

const logger = createLogger('demo/signal2', true);

let i = 0;

document.getElementById('changeContext')?.addEventListener('click', () => {
  logger.logMethod?.('main/setValue');
  messageContext.setValue({type: 'demo.signal', payload: {i: ++i}});
});

messageContext.subscribe(() => {
  logger.logMethodArgs?.('main/subscribe', messageContext.getValue());
});
