import {createLogger} from '@alwatr/logger';

import type {PuppeteerLaunchOptions} from 'puppeteer-core';

export const logger = createLogger('fake-visit');

export const config = {
  launchOption: <PuppeteerLaunchOptions>{
    product: 'chrome',
    channel: 'chrome',
    userDataDir: './chrome-profile/',
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
    ],
  },
  crawl: {
    home: process.env.FAKE_VISIT_HOME as string,
    searchUrl: process.env.FAKE_VISIT_SEARCH_URL as string,
    productLinkSelector: process.env.FAKE_VISIT_PRODUCT_LINK_SELECTOR as string,
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
    to: process.env.NOTIFIER_TO ?? 'fake-visit',
    token: process.env.NOTIFIER_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
} as const;

if (!config.crawl.home) {
  throw new Error('Home url required, FAKE_VISIT_HOME="YOUR_URL"');
}
if (!config.crawl.searchUrl) {
  throw new Error('Search URL required, FAKE_VISIT_SEARCH_URL="YOUR_SEARCH_URL"');
}
if (!config.crawl.productLinkSelector) {
  throw new Error('Product selector required, FAKE_VISIT_PRODUCT_LINK_SELECTOR="YOUR_PRODUCT_LINK_SELECTOR"');
}
