import {AlwatrStorageProvider} from '@alwatr/storage/provider.js';

import {config} from './config.js';

import type {DataModel} from './type.js';

export const storageProvider = new AlwatrStorageProvider({path: config.storagePath});

const dataModelStorage = await storageProvider.get<DataModel>({
  name: config.dataModelName,
  path: `${config.storagePath}/private`,
});
if (dataModelStorage.length === 0) {
  dataModelStorage.set({
    _id: 'sample',
    _updatedBy: 'system',
    subFolder: 'public',
    subStorage: false,
  });
}

export function getDataModel(storageName: string): DataModel | null {
  const splittedName = storageName.split('/');
  let testStorageName = splittedName[0];
  for (let i = 1; i < splittedName.length; i++) {
    testStorageName += `/${splittedName[i]}`;
    if (dataModelStorage.has(testStorageName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataModel = dataModelStorage.get(testStorageName, true)!;
      if (dataModel.subStorage === false && dataModel._id !== storageName) continue;
      return dataModel;
    }
  }
  return null;
}
