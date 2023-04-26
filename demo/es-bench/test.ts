import {bench} from './bench.js';

function test_1(input = 'ali'): string {
  return input.replace(/[l i]/g, '');
}

const regex = /[l i]/g;
function test_2(input = 'ali'): string {
  return input.replace(regex, '');
}

bench('test_1', test_1);
bench('test_2', test_2);

globalThis.document?.body.append(' Done. Check the console.');
