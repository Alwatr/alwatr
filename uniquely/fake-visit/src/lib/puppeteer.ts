import {type Page} from 'puppeteer-core';

import {browser} from './browser.js';

export async function openUrl(url: string): Promise<Page> {
  const page = await browser.newPage();
  page.goto(url);
  return page;
}

export async function clearCookies(page: Page): Promise<void> {
  const client = await page.target().createCDPSession();
  client.send('Network.clearBrowserCookies');
}

export async function clearLocalStorage(page: Page): Promise<void> {
  page.evaluate(() => {
    window.localStorage.clear();
  });
}

export async function clearSessionStorage(page: Page): Promise<void> {
  page.evaluate(() => {
    window.sessionStorage.clear();
  });
}

// function that's close all page just keep blank page
export async function closeAllPage(): Promise<void> {
  const pages = await browser.pages();
  for (const page of pages) {
    if (page.url() === 'about:blank') continue;
    await page.close();
  }
}
