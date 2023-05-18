import {bench} from './bench.js';

function flatstr (s: string) {
  // @ts-ignore
  s | 0
  return s
}

let temp = '';

function test_1(): void {
  let s = '';
  let n = 1_000_000;
  while(n--) {
    s += 'ali';
  }
  temp = s;
}

function test_2(): void {
  let s = '';
  let n = 1_000_000;
  while(n--) {
    s += 'ali';
  }
  temp = flatstr(s);
}


bench('test_1', test_1, 10);
bench('test_2', test_2, 10);

bench('test_1', test_1, 10);
bench('test_2', test_2, 10);

bench('test_1', test_1, 10);
bench('test_2', test_2, 10);


console.log(temp.length)
