import {Jatabase} from '@alwatr/jatabase';
import {random} from '@alwatr/math';

import type {DocumentObject} from '@alwatr/jatabase';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token: string;
}

const db = new Jatabase<User>('junk-data', 'temp');

db.ready.then(() => {
  for (let i = 0; i < 10000; i++) {
    db.set({
      _id: random.string(4, 16),
      fname: random.string(4, 16),
      lname: random.string(4, 32),
      email: random.string(8, 32),
      token: random.string(16),
    });
  }
});
