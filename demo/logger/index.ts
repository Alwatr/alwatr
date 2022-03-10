import {createLogger} from '@vatr/logger';

const logger = createLogger('logger/demo', 'green');

console.debug('--- logger.logMethod ---');
logger.logMethod('myMethod');

console.debug('--- logger.logMethodArgs ---');
logger.logMethodArgs('myMethod', {a: 1, b: 2});

console.debug('--- logger.incident ---');
logger.incident('myMethod', 'Abort_Signal', 'Aborted signal received', {url: '/test.json'});

console.debug('--- logger.accident ---');
logger.accident('myMethod', '404', 'Url requested return 404 not found', {url: '/test.json'});

console.debug('--- logger.logOther ---');
logger.logOther('foo:', 'bar', {a: 1});

console.debug('--- logger.error ---');
try {
  throw new Error('My_Error_Message');
} catch (err) {
  logger.error('myMethod', (err as Error).stack || err);
}
