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
  let testStorageName = '';
  for (let i = 0; i < splittedName.length; i++) {
    testStorageName += splittedName[i];
    const dataModel = dataModelStorage.get(testStorageName, true);
    if (dataModel != null) {
      if (dataModel.subStorage === false && dataModel._id !== storageName) continue;
      return dataModel;
    }
    testStorageName += '/';
  }
  return null;
}
