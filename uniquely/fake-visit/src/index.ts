import {logger} from './config.js';
import {cleanup, visit} from './core.js';
import './lib/browser.js';

logger.logOther?.('..:: Alwatr Fake Visit Service ::..');

async function init(): Promise<void> {
  try {
    const page = await cleanup();
    await visit(page);
  }
  catch (error) {
    logger.error?.('init', 'init_failed', error);
  }
}

for (;;) {
  await init();
}
