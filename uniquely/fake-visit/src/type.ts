import type {PuppeteerLaunchOptions} from 'puppeteer-core';

export interface PuppeteerOption extends PuppeteerLaunchOptions {
  name: string;
}
