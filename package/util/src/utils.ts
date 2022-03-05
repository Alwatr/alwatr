import {createLogger, vatrRegisteredList} from '@vatr/logger';

export const log = createLogger('vatr/utils');
export const error = createLogger('vatr/utils', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/utils',
  version: '{{VATR_VERSION}}',
});
