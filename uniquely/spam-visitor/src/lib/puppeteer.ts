import {createLogger} from '@alwatr/logger';
import {launch, type Page, type WaitForOptions, type Browser} from 'puppeteer-core';

import type {PuppeteerOption} from '../type.js';

export class AlwatrPuppeteer {
  readyStatePromise?: Promise<void>;
  pages: Record<string, Page> = {};

  browser?: Browser;
  protected _readyState = false;
  protected _activePages: Array<Page> = [];
  protected _logger = createLogger(`${this.option.name}-browser`);

  private _$freePage: Page | null = null;

  constructor(protected option: PuppeteerOption) {
    this.readyStatePromise = this._init();
  }

  protected async _init(): Promise<void> {
    this._logger.logMethod?.('init');
    try {
      this.browser = await launch(this.option);
    }
    catch (err) {
      this._logger.error('init', 'launch_browser_failed', err);
      throw new Error((err as Error).message);
    }

    this._readyState = true;
    this._$freePage = (await this.activePages())[0] ?? null;
  }

  async activePages(): Promise<Array<Page>> {
    this._logger.logMethod?.('activePages');
    this._activePages = (await this.browser?.pages()) ?? [];
    return this._activePages;
  }

  async close(): Promise<void> {
    this._logger.logMethod?.('close');
    this.browser?.close();
  }

  async openPage(name: string, url: string, w4option?: WaitForOptions): Promise<Page | null> {
    if (this.browser == null) return null;
    this._logger.logMethodArgs?.('openPage', {name, url, w4option});
    const page = this._$freePage || await this.browser.newPage();
    await page.goto(url, w4option);
    this.pages[name] = page;
    return page;
  }
}
