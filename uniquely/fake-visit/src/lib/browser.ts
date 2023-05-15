import {launch} from 'puppeteer-core';

import {config} from '../config.js';

export const browser = await launch(config.puppeteer);
