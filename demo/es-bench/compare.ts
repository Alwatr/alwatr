import {bench} from './bench.js';

const value = undefined;

function test_1(): boolean {
  if (value === true) {
    return true;
  }
  else {
    return false;
  }
}

function test_2(): boolean {
  if (value) {
    return true;
  }
  else {
    return false;
  }
}


bench('test_1', test_1);
bench('test_2', test_2);

bench('test_1', test_1);
bench('test_2', test_2);
