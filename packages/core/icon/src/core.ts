import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

alwatrRegisteredList.push({
  name: '@alwatr/icon',
  version: '{{ALWATR_VERSION}}',
});


export const logger = createLogger('alwatr/icon');
