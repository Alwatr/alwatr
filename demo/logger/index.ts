import {createLogger} from '@vatr/logger';

const log = createLogger('loggerScope', 'info');
const error = createLogger('loggerScope', 'error', true);

log('Hello ;)');
error('Err: Hello ;) - Forced to log');
