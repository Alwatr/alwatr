import {createLogger} from '@alwatr/logger';

const logger1 = createLogger('logger/demo1');
const logger2 = createLogger('logger/demo2');

console.debug('--- logger.logProperty ---');
logger1.logProperty('name', 'ali');
logger2.logProperty('options', {a: 1, b: 2});

console.debug('--- logger.logMethod ---');
logger1.logMethod('myMethod1');
logger2.logMethod('myMethod2');

console.debug('--- logger.logMethodArgs ---');
logger1.logMethodArgs('myMethod1', {a: 1, b: 2});
logger2.logMethodArgs('myMethod2', {a: 1, b: 2});

console.debug('--- logger.logMethodFull ---');
logger1.logMethodFull('add', {a: 1, b: 2}, 3);

console.debug('--- logger.incident ---');
logger1.incident('myMethod', 'abort_signal', 'Aborted signal received', {url: '/test.json'});

console.debug('--- logger.accident ---');
logger2.accident('myMethod', 'file_not_found', 'Url requested return 404 not found', {
  url: '/test.json',
});

console.debug('--- logger.logOther ---');
logger1.logOther('foo:', 'bar', {a: 1});

console.debug('--- logger.error ---');
try {
  throw new Error('my_error_message');
}
catch (err) {
  logger1.error('myMethod', 'error_code', err, {a: 1, b: 2});
}
