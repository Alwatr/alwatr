import {createLogger, vatrRegisteredList} from '@vatr/logger';

export const log = createLogger('vatr/i18n');
export const error = createLogger('vatr/i18n', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/i18n',
  version: '{{VATR_VERSION}}',
});
