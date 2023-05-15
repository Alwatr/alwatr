import {logger} from './config.js';

import type {AlwatrPuppeteer} from './lib/puppeteer.js';

export async function spamVisitor(browser: AlwatrPuppeteer, name: string, url: string): Promise<void> {
  let page;
  try {
    page = await browser.openPage(name, url);
  }
  catch {
    logger.error('spamVisitor', 'load_failed', {name, url});
    return;
  }

  if (page == null) {
    logger.error('spamVisitor', 'browser_null', {name, url});
    return;
  }

  page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['script', 'document'].indexOf(request.resourceType()) === -1) {
      request.abort();
    }
    else {
      request.continue();
    }
  });

  for (;;) {
    try {
      await page.reload({waitUntil: 'networkidle2'});
    }
    catch (err) {
      logger.accident('spamVisitor', 'reload_failed', 'reload page failed!', {name, url, err});
      break;
    }
  }
}
