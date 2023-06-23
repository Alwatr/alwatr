import {cleanup} from './cleanup.js';
import {config, logger} from './config.js';
import {visit} from './fake-visit.js';
import './lib/browser.js';
import {notify, incrementCount} from './report.js';

logger.logOther?.('..:: Alwatr Fake Visit Service ::..');

(async (): Promise<void> => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const searchUrl = config.crawl.searchUrl;
      const productLinkSelector = config.crawl.productLinkSelector;
      await cleanup(config.crawl.home);
      await visit(searchUrl, productLinkSelector);
      const count = await incrementCount();
      await notify(count);
    }
    catch (error) {
      logger.error?.('init', 'init_failed', error);
    }
  }
})();
