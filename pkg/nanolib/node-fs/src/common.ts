import {AsyncQueue} from '@alwatr/async-queue';
import {createLogger} from '@alwatr/logger';

export const logger = createLogger('@alwatr/node-fs');

export const asyncQueue = new AsyncQueue();
