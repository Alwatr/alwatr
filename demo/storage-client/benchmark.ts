// yarn build && NODE_ENV=production TOKEN=YOUR_SECRET_TOKEN node demo/storage-client/benchmark.js

import {random} from '@alwatr/math';
import {AlwatrStorageClient} from '@alwatr/storage-client';

import type {AlwatrDocumentObject} from '@alwatr/storage-client';

interface User extends AlwatrDocumentObject {
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
  host: '127.0.0.1',
  port: 9000,
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
    const newUser: User = {
      id: 'user_' + i,
      fname: random.string(4, 16),
      lname: random.string(4, 32),
      email: random.string(8, 32),
      token: random.string(16),
    };

    parallelRequest.push(db.set(newUser));
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
  try {
    const item = await db.get('user_5000');
    console.dir(item);
  }
  catch (err) {
    if ((err as Error)?.message === 'document_not_found') {
      console.log('user_5000 id not found!');
    }
    else {
      throw err;
    }
  }
  console.timeEnd('get item');

  console.time('get keys');
  const keys = await db.keys();
  console.timeEnd('get keys');
  console.log('keys.length: %s', keys.length);

  console.time('get all');
  await db.getStorage();
  console.timeEnd('get all');
}

await getBench();

request();
