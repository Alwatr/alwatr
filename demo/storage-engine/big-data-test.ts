import {random} from '@alwatr/math';
import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import type {DocumentObject} from '@alwatr/storage-engine';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token: string;
}

const db = new AlwatrStorageEngine<User>({
  name: 'junk-data',
  path: 'db',
  saveBeautiful: false,
  debug: false,
});

console.time('set all items');

const max = 100_000;
for (let i = 0; i < max; i++) {
  db.set({
    _id: 'user_' + i,
    _updatedBy: 'demo_' + i,
    fname: random.string(4, 16),
    lname: random.string(4, 32),
    email: random.string(8, 32),
    token: random.string(16),
  });
}

console.timeEnd('set all items');

console.time('get item');
const item = db.get('user_' + max / 2);
console.timeEnd('get item');
console.dir(item);

db.forceSave();
console.log('done');
