import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import type {AlwatrDocumentObject} from '@alwatr/type';

type User = AlwatrDocumentObject & {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const db = new AlwatrStorageEngine<User>({
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
    id: 'alimd',
    fname: 'Ali',
    lname: 'Mihandoost',
    email: 'ali@mihandoost.com',
  };
}
else {
  console.log('ali found: %o', ali);
  /**
   * {
   *   id: 'alimd',
   *   fname: 'Ali',
   *   lname: 'MM',
   *   email: 'i@ali.md',
   * }
   */

  ali.token = Math.random().toString(36).substring(2, 15);
}

db.set(ali);

db.set({
  id: 'fmd',
  fname: 'Fatemeh',
  lname: 'Mihandoost',
  email: 'Fatemeh@mihandoost.com',
  token: Math.random().toString(36).substring(2, 15),
});
