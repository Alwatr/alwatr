import {browser} from './browser.js';
import {config, logger} from '../config.js';

import type {Page, PuppeteerLifeCycleEvent} from 'puppeteer-core';

export async function getCurrentPage(): Promise<Page> {
  const pageList = await browser.pages();
  for (const page of pageList) {
    if (await page.evaluate(() => document.visibilityState) === 'visible') {
      return page;
    }
  }
  return await browser.newPage();
}

export async function openUrl(page: Page, url: string, waitUntil: PuppeteerLifeCycleEvent = 'load'): Promise<void> {
  logger.logMethodArgs?.('openUrl', {url, waitUntil});
  page.goto(url);
  await page.waitForNavigation({waitUntil, timeout: config.crawl.timeout});
}

export async function clearCookies(page: Page): Promise<void> {
  logger.logMethodArgs?.('clearCookies', {url: page.url()});
  const client = await page.target().createCDPSession();
  client.send('Network.clearBrowserCookies');
}

export async function clearLocalStorage(page: Page): Promise<void> {
  logger.logMethodArgs?.('clearLocalStorage', {url: page.url()});
  page.evaluate(() => {
    window.localStorage.clear();
  });
}

export async function clearSessionStorage(page: Page): Promise<void> {
  logger.logMethodArgs?.('clearSessionStorage', {url: page.url()});
  page.evaluate(() => {
    window.sessionStorage.clear();
  });
}

// Close all pages except the last one
export async function closeAllPage(): Promise<void> {
  logger.logMethod?.('closeAllPage');
  const pages = await browser.pages();
  await browser.newPage();
  for (const page of pages) {
    await page.close();
  }
}
