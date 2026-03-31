import {createLogger} from '@alwatr/logger';
import {Region, StoreFileExtension} from '@alwatr/nitrobase-types';

import {CollectionReference} from '../dist/main.mjs';

const logger = createLogger('demo-collection');

function updateCollectionCallback(from) {
  logger.logMethodArgs?.('updateCollectionCallback', from.id);
}

const collection = CollectionReference.newRefFromData(
  {
    name: 'user-order',
    region: Region.PerUser,
    ownerId: 'user_x_id',
    extension: StoreFileExtension.Json,
  },
  updateCollectionCallback,
);

logger.logProperty?.('collection.id', collection.id);
logger.logProperty?.('collection.path', collection.path);

const orderId1 = 'order1';

logger.logProperty?.('order1.exists', collection.exists(orderId1));
collection.create(orderId1, {
  itemList: ['item1', 'item2'],
  price: 100,
});

logger.logProperty?.('order1.data', collection.get(orderId1));

collection.set(orderId1, {
  itemList: ['item1', 'item2'],
  price: 200,
});

logger.logProperty?.('order1.data', collection.get(orderId1));

collection.update(orderId1, {
  price: 300,
});

logger.logProperty?.('order1.data', collection.get(orderId1));

logger.logProperty?.('order1.meta', collection.meta(orderId1));

collection.delete(orderId1);

collection.append({itemList: ['item3', 'item4'], price: 400});

logger.logProperty?.('user-order.values', collection.values());
