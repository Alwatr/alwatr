import {config} from './config.js';
import {spamVisitor} from './fake-visit.js';
import {AlwatrPuppeteer} from './lib/puppeteer.js';

const puppeteer = new AlwatrPuppeteer({
  name: 'fake-visit',
  ...config.puppeteer,
  product: 'chrome',
  channel: 'chrome',
  slowMo: 100,
  args: [],
});

await puppeteer.readyStatePromise;
spamVisitor(puppeteer, 'github', 'https://github.com');
