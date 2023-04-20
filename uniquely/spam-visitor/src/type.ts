import type {PuppeteerLaunchOptions} from 'puppeteer';

export interface PuppeteerOption extends PuppeteerLaunchOptions {
  name: string;
}

export interface SessionInfo {
  sessionUrl: string;
  instanceDomainList: Array<string>;
}
