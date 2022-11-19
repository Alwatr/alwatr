// yarn build && NODE_ENV=production TOKEN=alwatr_110_313 node --trace-gc demo/storage-client/big-data-test.js

import {random} from '@alwatr/math';
import {AlwatrStorageClient} from '@alwatr/storage-client';

import type {DocumentObject} from '@alwatr/storage-client';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token: string;
}

const token = process.env.TOKEN;
if (token == null) {
  throw new Error('token_not_defined');
}

const db = new AlwatrStorageClient<User>({
  name: 'junk-data',
  host: 'http://127.0.0.1:80',
  token,
});

const max = 100_000;
let i = 0;
let last = 0;

setInterval(() => {
  const speed = (i - last) / 2;
  console.log('Index: %s, Speed: %s r/s, Memory: %s MB', last, speed, Math.round(process.memoryUsage.rss() / 1000_000));
  last = i;
}, 2_000);


console.time('set all items');

async function request(): Promise<void> {
  const parallelRequest: Array<Promise<User>> = [];

  for (let j = 0; j < 100; j++) {
    i++;
    parallelRequest.push(db.set({
      _id: 'user_' + i,
      _updatedBy: 'demo_' + i,
      fname: random.string(4, 16),
      lname: random.string(4, 32),
      email: random.string(8, 32),
      token: random.string(16),
    }));
  }

  await Promise.all(parallelRequest);

  if (i < max) {
    setImmediate(request);
  }
  else {
    console.timeEnd('set all items');
  }
}

async function getBench(): Promise<void> {
  console.time('get item');
  const item = await db.get('user_5000');
  console.timeEnd('get item');
  console.dir(item);

  console.time('get keys');
  const keys = await db.keys();
  console.timeEnd('get keys');
  console.log('keys.length: %s', keys.length);

  console.time('get all');
  await db.getAll();
  console.timeEnd('get all');
}

await getBench();

request();
