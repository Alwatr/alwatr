import {delay} from '@alwatr/util';
import {generateRandomUserAgent} from '@alwatr/util/userAgent.js';

import {config, logger} from './config.js';
import {getCurrentPage, openUrl} from './lib/puppeteer.js';


export async function visit(): Promise<void> {
  logger.logMethod?.('visit');

  const page = await getCurrentPage();
  await page.setUserAgent(generateRandomUserAgent());
  await openUrl(page, config.crawl.home);
  await openUrl(page, config.crawl.searchUrl);

  await page.waitForSelector(config.crawl.productLinkSelector);
  const productLink = await page.$(config.crawl.productLinkSelector);
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
