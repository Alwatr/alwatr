import {logger} from './config.js';

import type {AlwatrPuppeteer} from './lib/puppeteer.js';

export async function spamVisitor(browser: AlwatrPuppeteer, name: string, url: string): Promise<void> {
  const page = await browser.openPage(name, url);
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
}
