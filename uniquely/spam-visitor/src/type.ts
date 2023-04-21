import type {PuppeteerLaunchOptions} from 'puppeteer-core';

export interface PuppeteerOption extends PuppeteerLaunchOptions {
  name: string;
}

export interface SessionInfo {
  sessionUrl: string;
  instanceDomainList: Array<string>;
}
