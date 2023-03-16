/* eslint-disable camelcase */

import {random} from '@alwatr/math';

import {bench} from './bench.js';

const obj: Record<string, Record<string, string>> = {};
let userName = '';
console.log(userName);

function prepare(): void {
  for (let i = 100; i; i--) {
    obj[i] = {
      id: 'user_' + i,
      fname: random.string(4, 16),
      lname: random.string(4, 32),
      email: random.string(8, 32),
      token: random.string(16),
    };
  }
}

function test_for_in(): void {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    userName = obj[key].id;
  }
}

function test_for_of_values(): void {
  for (const item of Object.values(obj)) {
    userName = item.id;
  }
}

function test_for_of_keys(): void {
  for (const key of Object.keys(obj)) {
    userName = obj[key].id;
  }
}

prepare();

bench('for-of-values', test_for_of_values);
bench('for-of-keys', test_for_of_keys);
bench('for-in', test_for_in);

globalThis.document?.body.append(' Done. Check the console.');

/*
1000 items, key is numberString (obj[i])
  for-of-values: 1s
  for-of-keys: 3s
  for-in: 6s

1000 items, if key is string (obj['user_'+i])
  for-of-keys: 11s
  for-in: 15s
  for-of-values: 26s


100 items, key is numberString (obj[i])
  for-of-values: 139ms
  for-of-keys: 342ms
  for-in: 599ms

100 items, if key is string (obj['user_'+i])
  for-of-keys: 651ms
  for-in: 960ms
  for-of-values: 2159ms


10 items, key is numberString (obj[i])
  for-of-values: 54ms
  for-of-keys: 70ms
  for-in: 107ms

10 items, if key is string (obj['user_'+i])
  for-in: 28ms
  for-of-values: 35ms
  for-of-keys: 53ms
*/
