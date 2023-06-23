import {delay, generateRandomUserAgent} from '@alwatr/util';

import {config, logger} from './config.js';
import {getCurrentPage, openUrl} from './lib/puppeteer.js';


export async function visit(searchUrl: string, productLinkSelector: string): Promise<void> {
  logger.logMethod?.('visit');

  const page = await getCurrentPage();
  await page.setUserAgent(generateRandomUserAgent());
  await openUrl(page, config.crawl.home);
  await openUrl(page, searchUrl);

  let previousHeight;
  let productLink;
  let counter = 0;
  do {
    productLink = await page.$(productLinkSelector);
    logger.logProperty?.('productLinkExists', productLink != null);
    if (productLink != null) break;

    await delay(2000);
    logger.logOther?.('Scroll Down...');
    previousHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
    try {
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`, {timeout: 10000});
    }
    catch (error) {
      logger.incident?.('visit', 'wait_for_change_scroll_height_failed', 'Wait for change scroll height failed!');
      // continue;
    }
    await delay(2000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    counter++;
  } while (counter < 15 && !productLink);

  if (productLink == null) {
    throw new Error('product_link_not_found');
  }
  await productLink.evaluate((el) => el.removeAttribute('target'));
  await productLink.scrollIntoView();

  logger.logOther?.('step', 'productLink.click');
  await productLink.click({delay: config.crawl.clickDelay});

  try {
    await page.waitForNavigation({waitUntil: 'domcontentloaded', timeout: config.crawl.timeout});
  }
  catch {
    logger.error('visit', 'product_page_timeout');
  }
  await delay(config.crawl.finalDelay);
}
