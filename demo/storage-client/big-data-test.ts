import {random} from '@alwatr/math';
import {AlwatrStorageClient} from '@alwatr/storage-client';

import type {DocumentObject} from '@alwatr/storage-client';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token: string;
}

const db = new AlwatrStorageClient<User>({
  name: 'junk-data',
  host: 'http://127.0.0.1:80',
  token: 'alwatr_110_313',
  timeout: 2_000,
});

console.time('set all items');

const max = 100_000;
for (let i = 0; i < max; i++) {
  if (i % 1000 === 0) {
    console.log(i);
  }
  await db.set({
    _id: 'demo_' + i,
    _updatedBy: 'demo_' + i,
    fname: random.string(4, 16),
    lname: random.string(4, 32),
    email: random.string(8, 32),
    token: random.string(16),
  });
}

console.timeEnd('set all items');

console.time('get item');
const item = await db.get('user_' + (max / 2));
console.timeEnd('get item');
console.dir(item);

console.time('get keys');
const keys = await db.keys();
console.timeEnd('get keys');
console.log(keys.length);

console.time('get all');
await db.getAll();
console.timeEnd('get all');

console.log('done');
