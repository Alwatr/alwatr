import {createLogger, globalAlwatr} from '@alwatr/logger';

export const logger = createLogger('pwa-helper');

globalAlwatr.registeredList.push({
  name: '@alwatr/pwa-helper',
  version: _ALWATR_VERSION_,
});
