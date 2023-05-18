
import {config} from './config.js';
import {browser} from './lib/browser.js';
import {clearCookies, clearLocalStorage, clearSessionStorage, closeAllPage, openUrl} from './lib/puppeteer.js';


export async function cleanup(): Promise<void> {
  await closeAllPage();
  const page = await browser.newPage();
  await openUrl(page, config.crawl.home);
  await clearCookies(page);
  await clearLocalStorage(page);
  await clearSessionStorage(page);
  await page.close();
}
