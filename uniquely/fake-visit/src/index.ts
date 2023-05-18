import {cleanup} from './cleanup.js';
import {logger} from './config.js';
// import {report} from './report.js';
import {visit} from './fake-visit.js';
import './lib/browser.js';

logger.logOther?.('..:: Alwatr Fake Visit Service ::..');

(async (): Promise<void> => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await cleanup();
      await visit();
      // await report();
    }
    catch (error) {
      logger.error?.('init', 'init_failed', error);
    }
  }
})();
