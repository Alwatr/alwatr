import {createLogger} from '@alwatr/logger';

export const logger = createLogger('fake-visit');

const url = process.env.BROWSER_URL;
const searchText = process.env.BROWSER_SEARCH_TEXT;
if (!url) {
  throw new Error('url required, BROWSER_URL="YOUR_URL" yarn start');
}
if (!searchText) {
  throw new Error('searchText required, BROWSER_SEARCH_TEXT="YOUR_SEARCH_TEXT" yarn start');
}

export const config = {
  puppeteer: {
    headless: process.env.PUPPETEER_HEADLESS === '1',
    devtools: process.env.PUPPETEER_DEVTOOLS === '1',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH ?? undefined,
    product: 'chrome',
    channel: 'chrome',
    typeDelay: Number(process.env.PUPPETEER_TYPE_DELAY) || 100,
    clickDelay: Number(process.env.PUPPETEER_CLICK_DELAY) || 100,
    stepDelay: Number(process.env.PUPPETEER_STEP_DELAY) || 2000,
  },
  browser: {
    url,
    searchText,
  },
} as const;
