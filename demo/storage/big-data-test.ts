import {random} from '@alwatr/math';
import {AlwatrStorage} from '@alwatr/storage';

import type {DocumentObject} from '@alwatr/storage';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token: string;
}

const db = new AlwatrStorage<User>({name: 'junk-data', path: 'db'});

db.readyPromise.then(() => {
  for (let i = 0; i < 10000; i++) {
    db.set({
      _id: random.string(4, 16),
      _updatedBy: 'demo' + i,
      fname: random.string(4, 16),
      lname: random.string(4, 32),
      email: random.string(8, 32),
      token: random.string(16),
    });
  }
});
