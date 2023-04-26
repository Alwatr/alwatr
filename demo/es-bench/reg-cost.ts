import {bench} from './bench.js';

function test_1(input = 'ali'): string {
  return input.replace(/[l i]/g, '');
}

const regex = /[l i]/g;
function test_2(input = 'ali'): string {
  return input.replace(regex, '');
}

function test_3(input = 'ali'): string {
  return input.replace(new RegExp('[l i]', 'g'), '');
}

const regex2 = new RegExp('[l i]', 'g');
function test_4(input = 'ali'): string {
  return input.replace(regex2, '');
}

bench('test_1', test_1);
bench('test_2', test_2);
bench('test_3', test_3);
bench('test_4', test_4);

globalThis.document?.body.append(' Done. Check the console.');
