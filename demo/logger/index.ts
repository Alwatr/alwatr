import {createLogger} from '@vatr/logger';

const logInfo = createLogger('logInfo', 'info', true);
const logWarn = createLogger('logWarn', 'warn', true);
const logError = createLogger('logError', 'error', true);

logInfo('Hello ;)');
logWarn('Hello ;)');
logError('Hello ;)');
