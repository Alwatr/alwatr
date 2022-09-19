import {AlwatrStorage} from '@alwatr/storage';

import type {DocumentObject} from '@alwatr/storage';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const db = new AlwatrStorage<User>({
  name: 'user-list',
  path: 'db',
  saveBeautiful: true,
  debug: true,
});

console.log('db loaded and ready to access.');

let ali = db.get('alimd');

if (ali == null) {
  console.log('ali not found');
  ali = {
    _id: 'alimd',
    _updatedBy: 'demo',
    fname: 'Ali',
    lname: 'Mihandoost',
    email: 'ali@mihandoost.com',
  };
} else {
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
