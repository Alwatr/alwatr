import {browser} from './browser.js';
import {logger} from '../config.js';

import type {Page} from 'puppeteer-core';

export async function openUrl(url: string): Promise<Page> {
  logger.logMethodArgs?.('openUrl', {url});

  // check if there is a blank page, if not create one
  const pages = await browser.pages();
  let page;
  if (pages[0].url() === 'about:blank') {
    page = pages[0];
  }
  else {
    page = await browser.newPage();
  }
  page.goto(url);
  return page;
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
  for (let i = 0; i < pages.length - 1; i++) {
    await pages[i].close();
  }
  // goto blank page
  await pages[pages.length - 1].goto('about:blank');
}
