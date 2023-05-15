import {delay} from '@alwatr/util';

import {config} from './config.js';
import {clearLocalStorage, clearCookies, clearSessionStorage} from './lib/puppeteer.js';

import type {Page} from 'puppeteer-core';

export async function visit(page: Page): Promise<void> {
  await page.waitForNavigation({waitUntil: 'networkidle2'});

  await page.waitForSelector('.SearchInput_SearchInput__HB9qi');
  await page.click('.SearchInput_SearchInput__HB9qi');
  const searchBar = await page.$('input[name="search-input"]');
  await searchBar?.type(config.browser.searchText, {delay: config.puppeteer.typeDelay});
  await page.keyboard.press('Enter');

  await page.waitForNavigation({waitUntil: 'networkidle2'});
  await delay(1000);

  const productLink = await page.$('a[href*=dkp-10685037]');
  if (productLink == null) {
    throw new Error('product_link_not_found');
  }
  await productLink.evaluate((el) => el.removeAttribute('target'));
  await productLink.evaluate((el) => el.scrollIntoView({behavior: 'smooth'}));

  await productLink.click();
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  await delay(2000);
}

export async function clear(page: Page): Promise<void> {
  await page.waitForNavigation({waitUntil: 'load'});
  await clearCookies(page);
  await clearLocalStorage(page);
  await clearSessionStorage(page);
}
