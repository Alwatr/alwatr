import {delay} from '@alwatr/util';

import {config, logger} from './config.js';
import {clearLocalStorage, clearCookies, clearSessionStorage, closeAllPage, openUrl} from './lib/puppeteer.js';

import type {Page} from 'puppeteer-core';

export async function visit(page: Page): Promise<void> {
  logger.logMethod?.('visit');

  // ensure page is loaded
  await page.waitForNavigation({waitUntil: 'networkidle2'});
  await delay(config.puppeteer.stepDelay);

  // search for product
  logger.logOther?.('visit:', 'searching_for_product');
  await page.click('.SearchInput_SearchInput__HB9qi');
  await page.type('input[name="search-input"]', config.browser.searchText, {delay: config.puppeteer.typeDelay});
  await page.keyboard.press('Enter');

  await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 10000});
  await page.waitForSelector('a[href*=dkp-10685037]', {timeout: 2000});
  const productLink = await page.$('a[href*=dkp-10685037]');
  if (productLink == null) {
    throw new Error('product_link_not_found');
  }

  await productLink.evaluate((el) => el.removeAttribute('target'));
  await productLink.scrollIntoView();

  await delay(config.puppeteer.stepDelay);
  await productLink.click();
  logger.logOther?.('visit:', 'clicked_on_product_link');

  // FIXME: waitForNavigation is not working
  await delay(5000);

  logger.logOther?.('visit:', 'end');
}

export async function cleanup(): Promise<Page> {
  await closeAllPage();
  const page = await openUrl(config.browser.url);
  await page.waitForNavigation({waitUntil: 'load'});
  await clearCookies(page);
  await clearLocalStorage(page);
  await clearSessionStorage(page);
  await page.reload();
  return page;
}
