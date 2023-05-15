import {createLogger} from '@alwatr/logger';

export const config = {
  puppeteer: {
    headless: process.env.HEADLESS === '1' ? true : false,
    devtools: process.env.DEV_TOOL === '1' ? true : false,
  },
};

export const logger = createLogger('fake-visit');

logger.logProperty?.('config', config);
