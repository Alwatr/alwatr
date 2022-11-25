import {AlwatrStorageClient} from '@alwatr/storage-client';

import type {DocumentObject} from '@alwatr/storage-client';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const token = process.env.TOKEN ?? 'YOUR_SECRET_TOKEN';

const db = new AlwatrStorageClient<User>({
  name: 'user-list',
  host: '127.0.0.1',
  port: 9000,
  token,
});

let ali: User;

try {
  ali = await db.get('alimd');
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
catch (err) {
  if ((err as Error).message === 'document_not_found') {
    console.log('ali not found');
    ali = {
      _id: 'alimd',
      _updatedBy: 'demo',
      fname: 'Ali',
      lname: 'Mihandoost',
      email: 'ali@mihandoost.com',
    };
    await db.set(ali);
  }
  else {
    console.error(err);
  }
}

await db.set({
  _id: 'fmd',
  _updatedBy: 'demo',
  fname: 'Fatemeh',
  lname: 'Mihandoost',
  email: 'Fatemeh@mihandoost.com',
  token: Math.random().toString(36).substring(2, 15),
});

console.log('has \'alimd\': %o', await db.has('alimd'));
console.log('keys: %o', await db.keys());
console.log('getAll: %o', await db.getAll());
await db.delete('alimd');
await db.delete('fmd');

try {
  await db.delete('abcd');
}
catch (err) {
  console.log('delete 404: %o', (err as Error).message);
}
