import {AlwatrStorageClient} from '@alwatr/storage-client';

import type {DocumentObject} from '@alwatr/storage';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const db = new AlwatrStorageClient<User>({
  name: 'user-list',
  server: 'http://localhost:80',
  token: 'alwatr_110_313',
});

console.log('db loaded and ready to access.');

let ali = await db.get('alimd');

if (ali == null) {
  console.log('ali not found');
  ali = {
    _id: 'alimd',
    _updatedBy: 'demo',
    fname: 'Ali',
    lname: 'Mihandoost',
    email: 'ali@mihandoost.com',
  };
}
else {
  console.log('ali found: %o', ali);
  /**
   * {
   *   _id: 'alimd',
   *   fname: 'Ali',
   *   lname: 'MM',
   *   email: 'i@ali.md',
   * }
   */

  ali.token = Math.random().toString(36).substring(2, 15);
}

db.set(ali);

db.set({
  _id: 'fmd',
  _updatedBy: 'demo',
  fname: 'Fatemeh',
  lname: 'Mihandoost',
  email: 'Fatemeh@mihandoost.com',
  token: Math.random().toString(36).substring(2, 15),
});

console.log(await db.getAll());
console.log(await db.keys());
console.log(await db.delete('ali'));
console.log(await db.delete('alimd'));
