/* eslint-disable camelcase */

import {bench} from './bench.js';

function test1(id: string): void {
  console.log(id);
}
function test2(id: string): void {
  console.log(id);
}
function test3(id: string): void {
  console.log(id);
}

const bind = (id: string) => ({
  id,
  test1: test1.bind(null, id),
  test2: test2.bind(null, id),
  test3: test3.bind(null, id),
} as const);

function test_bind(): void {
  bind('123');
}

bench('test_bind', test_bind);

globalThis.document?.body.append(' Done. Check the console.');
