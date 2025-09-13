import {AsyncQueue} from '@alwatr/async-queue';
import {createLogger} from '@alwatr/logger';

export const logger = /* #__PURE__ */ createLogger('@alwatr/node-fs');

export const asyncQueue = /* #__PURE__ */ new AsyncQueue();
