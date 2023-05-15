import {config, logger} from './config.js';
import {clear, visit} from './init.js';
import {closeAllPage, openUrl} from './lib/puppeteer.js';

for (;;) {
  try {
    await closeAllPage();
    const page = await openUrl(config.browser.url);
    await clear(page);
    await page.reload();
    await visit(page);
  }
  catch (err) {
    logger.error('init', 'Error in main loop', err);
  }
}
