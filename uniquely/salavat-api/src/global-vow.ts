import {storageClient} from './lib/storage.js';

export let globalCount = 0;

// loops over the storage and summing it!
// FIXME: lock storage on summing!
export async function updateGlobalCount(): Promise<number> {
  globalCount = 0;
  const storage = (await storageClient.getStorage()).data;

  for (const id in storage) {
    if (!Object.prototype.hasOwnProperty.call(storage, id)) continue;
    globalCount += storage[id].count;
  }

  return globalCount;
}

// at launch
updateGlobalCount();
