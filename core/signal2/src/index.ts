import {globalAlwatr} from '@alwatr/logger';

export * from './simple-signal.js';
export * from './event.js';
export * from './context.js';
export * from './multithread-context.js';
export * from './base.js';

globalAlwatr.registeredList.push({
  name: '@alwatr/signal2',
  version: _ALWATR_VERSION_,
});
