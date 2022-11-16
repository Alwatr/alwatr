import {random} from '@alwatr/math';
import {AlwatrStorageClient} from '@alwatr/storage-client';

import type {DocumentObject} from '@alwatr/storage';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token: string;
}

const db = new AlwatrStorageClient<User>({
  name: 'junk-data',
  server: 'http://localhost:80',
  token: 'alwatr_110_313',
});

console.time('get item');
for (let i = 0; i < 100; i++) {
  db.set({
    _id: random.string(4, 16),
    _updatedBy: 'demo' + i,
    fname: random.string(4, 16),
    lname: random.string(4, 32),
    email: random.string(8, 32),
    token: random.string(16),
  });
}
console.timeEnd('get item');

console.log('done');
