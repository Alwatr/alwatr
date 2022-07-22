import {Jatabase} from '@alwatr/jatabase';

import type {DocumentObject} from '@alwatr/jatabase';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const db = new Jatabase<User>('user-list');

// await db.ready
// or
db.ready.then(() => {
  console.log('db loaded and ready to access.');

  const ali = db.get('alimd');

  if (ali == null) {
    console.log('ali not found');
    return;
  }

  console.log(ali);
  /**
   * {
   *   _id: 'alimd',
   *   fname: 'Ali',
   *   lname: 'MM',
   *   email: 'i@ali.md',
   * }
   */

  ali.token = '123qwe';

  db.set(ali);
});
