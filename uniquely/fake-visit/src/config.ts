import {createLogger} from '@alwatr/logger';

import type {PuppeteerLaunchOptions} from 'puppeteer-core';

export const logger = createLogger('fake-visit');

const crawlerHome = process.env.FAKE_VISIT_HOME;
if (!crawlerHome) {
  throw new Error('Home url required, FAKE_VISIT_HOME="YOUR_URL"');
}

const crawlSearchUrlList = process.env.FAKE_VISIT_SEARCH_URL?.split(',').map((url) => url.trim());
if (!crawlSearchUrlList?.length || !crawlSearchUrlList.every((url) => url.startsWith('http'))) {
  throw new Error('Search URL required, FAKE_VISIT_SEARCH_URL="YOUR_SEARCH_URL1, YOUR_SEARCH_URL2"');
}

const crawlProductLinkSelectorList = process.env.FAKE_VISIT_PRODUCT_LINK_SELECTOR?.split(',').map((url) => url.trim());
if (crawlProductLinkSelectorList?.length !== crawlSearchUrlList.length) {
  // eslint-disable-next-line max-len
  throw new Error('Product selector required, FAKE_VISIT_PRODUCT_LINK_SELECTOR="YOUR_PRODUCT_LINK_SELECTOR1, YOUR_PRODUCT_LINK_SELECTOR2"');
}

const args = process.env.chromeArgs?.split(',').map((arg) => arg.trim()) ?? [];

export const config = {
  launchOption: {
    product: 'chrome',
    channel: 'chrome',
    userDataDir: './chrome-profile/',
    executablePath: process.env.CHROME_BIN || null,
    headless: process.env.FAKE_VISIT_HEADLESS === '1',
    devtools: process.env.FAKE_VISIT_DEVTOOLS === '1',
    slowMo: Number(process.env.FAKE_VISIT_SLOWMO) ?? 10,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--disable-gpu',
      ...args,
    ],
  } as PuppeteerLaunchOptions,
  crawl: {
    home: crawlerHome as string,
    searchUrlList: crawlSearchUrlList,
    productLinkSelectorList: crawlProductLinkSelectorList,
    timeout: Number(process.env.FAKE_VISIT_TYPE_DELAY) || 60_000,
    typeDelay: Number(process.env.FAKE_VISIT_TYPE_DELAY) || 15,
    navigationDelay: Number(process.env.FAKE_VISIT_NAVIGATION_DELAY) || 10_000,
    clickDelay: Number(process.env.FAKE_VISIT_CLICK_DELAY) || 20,
    finalDelay: Number(process.env.FAKE_VISIT_STEP_DELAY) || 30_000,
    notifyCount: Number(process.env.FAKE_VISIT_NOTIFY_COUNT) || 1000,
  },
  storage: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    name: process.env.STORAGE_NAME ?? 'count',
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  notifier: {
    url: process.env.NOTIFIER_HOST ?? 'http://127.0.0.1:8001',
    to: process.env.NOTIFIER_TO ?? 'all',
    token: process.env.NOTIFIER_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
} as const;

logger.logProperty?.('config', config);
