import {createLogger} from '@alwatr/logger';

const logger = createLogger('logger/demo', 'green');

console.debug('--- logger.logProperty ---');
logger.logProperty('name', 'ali');
logger.logProperty('options', {a: 1, b: 2});

console.debug('--- logger.logMethod ---');
logger.logMethod('myMethod');

console.debug('--- logger.logMethodArgs ---');
logger.logMethodArgs('myMethod', {a: 1, b: 2});

console.debug('--- logger.logMethodFull ---');
logger.logMethodFull('add', {a: 1, b: 2}, 3);

console.debug('--- logger.incident ---');
logger.incident('myMethod', 'abort_signal', 'Aborted signal received', {url: '/test.json'});

console.debug('--- logger.accident ---');
logger.accident('myMethod', 'file_not_found', 'Url requested return 404 not found', {
  url: '/test.json',
});

console.debug('--- logger.logOther ---');
logger.logOther('foo:', 'bar', {a: 1});

console.debug('--- logger.error ---');
try {
  throw new Error('my_error_message');
} catch (err) {
  logger.error('myMethod', 'error_code', (err as Error).stack || err, {a: 1, b: 2});
}
