export * from './read-file.js';
export * from './write-file.js';
export * from './read-json.js';
export * from './write-json.js';
export * from './make-file.js';

import {resolve as resolve_} from 'node:path';
import {existsSync as existsSync_} from 'node:fs';
import {unlink as unlink_} from 'node:fs/promises';

export const resolve = resolve_;
export const existsSync = existsSync_;
export const unlink = unlink_;
