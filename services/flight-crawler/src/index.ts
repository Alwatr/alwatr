import {logger} from './config.js';
import {crawlAllJobs} from './crawl.js';

logger.logOther('..:: Alwatr Flight Crawler Nanoservice ::..');

crawlAllJobs();

