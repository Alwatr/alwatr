import {createLogger} from '@alwatr/logger';
import {AlwatrNitrobase, Region} from '@alwatr/nitrobase';
import {waitForTimeout} from '@alwatr/wait';

(async function () {
  const logger = createLogger('AlwatrNitrobase/Demo', true);
  logger.banner('AlwatrNitrobase/Demo');

  // Create a new storage instance
  const alwatrStore = new AlwatrNitrobase({
    rootPath: './db',
    defaultChangeDebounce: 1000, // for test
  });

  /**
   * @type {import('@alwatr/nitrobase').StoreFileId}
   */
  const colId = {
    name: 'junk',
    region: Region.Public,
  };

  if (alwatrStore.hasStore(colId)) {
    await alwatrStore.removeStore(colId);
  }

  alwatrStore.newCollection(colId);

  const col = await alwatrStore.openCollection(colId);

  await waitForTimeout(1000);

  logger.time?.('write_10k_record_time');

  const max = 10_000;
  for (let i = 0; i < max; i++) {
    col.appendItem({
      fname: Math.random().toString(36),
      lname: Math.random().toString(36),
    });
    // await waitForImmediate();
  }

  logger.timeEnd?.('write_10k_record_time');

  await waitForTimeout(1000);

  logger.time?.('access_10k_item_time');
  let item;
  for (let i = 0; i < max; i++) {
    item = col.getItemContext_(i);
  }
  logger.timeEnd?.('access_10k_item_time');
  logger.logProperty?.('item', item);
})();
