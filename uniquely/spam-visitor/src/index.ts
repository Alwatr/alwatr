import {config} from './config.js';
import {AlwatrPuppeteer} from './lib/puppeteer.js';
import {spamVisitor} from './spam-visitor.js';

const puppeteer = new AlwatrPuppeteer({
  name: 'spam-visitor',
  ...config.puppeteer,
  product: 'chrome',
  channel: 'chrome',
  slowMo: 100,
  args: [],
});

await puppeteer.readyStatePromise;
spamVisitor(puppeteer, 'github', 'https://github.com');
