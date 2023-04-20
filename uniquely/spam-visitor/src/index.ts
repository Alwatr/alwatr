import {config} from './config.js';
import {AlwatrPuppeteer} from './lib/puppeteer.js';
import {spamVisitor} from './spam-visitor.js';

const browser = new AlwatrPuppeteer({name: 'spam-visitor', ...config.puppeteer});

await browser.readyStatePromise;
spamVisitor(browser, 'divar', 'https://divar.ir');
