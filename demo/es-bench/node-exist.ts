import {accessSync, existsSync, constants} from 'node:fs';
import { bench } from './bench.js';

const filePath = './temp-file.txt';
function exist(): boolean {
  return existsSync(filePath);
}

function access(): boolean {
  try {
    accessSync(filePath, constants.F_OK);
    return true;
  }
  catch {
    return false
  }
}

console.log('exist(%s) => %s', filePath, exist())
console.log('access(%s) => %s', filePath, access())
console.log('stat(%s) => %s', filePath, stat())

bench('exist', exist);
bench('access', access);
