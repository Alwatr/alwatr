import {createLogger} from '@alwatr/logger';
// import {delay} from '@alwatr/util';

import {bench} from './bench.js';

const logger = createLogger('logger-bench', null, false);

const getUserList = (): Record<string, Record<string, string>> => {
  const userList: Record<string, Record<string, string>> = {};
  for (let i = 10; i; i--) {
    const userId = 'user_' + i;
    userList[userId] = {
      user: userId,
      fname: 'ali',
      lname: 'md',
      email: 'i@ali.md',
      token: '1234abcd',
    };
  }
  return userList;
};

function test_without_logger(obj: Record<string, unknown>): number {
  return Object.values(obj).length;
}

function test_with_logger(obj: Record<string, unknown>): number {
  logger.logMethodArgs('test_with_logger', obj);
  return Object.values(obj).length;
}

bench('test_with_logger 1st', () => test_with_logger(getUserList()));
bench('test_without_logger 1st', () => test_without_logger(getUserList()));

bench('test_with_logger 2nd', () => test_with_logger(getUserList()));
bench('test_without_logger 2nd', () => test_without_logger(getUserList()));


globalThis.document?.body.append(' Done. Check the console.');
