import {createLogger} from '@alwatr/logger';

import {AlwatrNitrobase, Region} from '@alwatr/nitrobase';

const logger = createLogger('AlwatrNitrobase/Demo', true);
logger.banner('AlwatrNitrobase/Demo');

const alwatrStore = new AlwatrNitrobase({
  rootPath: './db',
  defaultChangeDebounce: 250, // for demo
});

/**
 * @type {import('@alwatr/nitrobase').CollectionReference[]}
 */
const list = [];

for (let i = 0; i < 10; i++) {
  /**
   * @type
   */
  const docId = {
    name: 'profile',
    region: Region.PerUser,
    ownerId: `u${i}-hash-126789`,
  };

  if (!alwatrStore.hasStore(docId)) {
    alwatrStore.newCollection(docId);
  }

  list.push(await alwatrStore.openCollection(docId));
}

function insertData() {
  const collection = list[Math.floor(Math.random() * list.length)];

  let itemId = collection.appendItem({
    name: (Math.random() * 10000).toString(36),
    age: Math.floor(Math.random() * 80) + 10,
  });

  console.log('Collection: %s, itemId:', collection.id, itemId);

  itemId = list[0].appendItem({
    name: (Math.random() * 10000).toString(36),
    age: 15,
  });

  console.log('Collection0, itemId:', itemId);

  if (Math.random() < 0.001) {
    throw new Error('unexpected_random_error');
  }

  setTimeout(insertData, 2);
}

insertData();
