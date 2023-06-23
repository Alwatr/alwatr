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
      const searchUrlList = config.crawl.searchUrlList;
      const productLinkSelectorList = config.crawl.productLinkSelectorList;
      for (let i = 0; i < searchUrlList.length; i++) {
        await cleanup(config.crawl.home);
        await visit(searchUrlList[i], productLinkSelectorList[i]);
        const count = await incrementCount();
        await notify(count);
      }
    }
    catch (error) {
      logger.error?.('init', 'init_failed', error);
    }
  }
})();
