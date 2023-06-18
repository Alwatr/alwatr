import {bench} from './bench.js';

const a = await import('./import-tmp.js');

function test_1(): unknown {
  return a;
}

function test_2(): unknown {
  return import('./import-tmp.js');
}

bench('test_1', test_1);
bench('test_2', test_2);
bench('test_1', test_1);

globalThis.document?.body.append(' Done. Check the console.');
