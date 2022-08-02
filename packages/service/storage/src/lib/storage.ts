import {AlwatrStorage} from '@alwatr/storage';

import {config} from './config.js';

import type {DataModel} from './type.js';
import type {DocumentObject} from '@alwatr/storage';

const storageList: Record<string, AlwatrStorage<DocumentObject>> = {};

export function getStorage<DocumentType extends DocumentObject = DocumentObject>(
    name: string,
    subFolder: 'public' | 'private',
): AlwatrStorage<DocumentType> {
  if (!storageList[name]) {
    storageList[name] = new AlwatrStorage<DocumentType>({
      name,
      path: `${config.storagePath}/${subFolder}`,
    });
  }
  return storageList[name] as AlwatrStorage<DocumentType>;
}

const dataModelStorage = getStorage<DataModel>(config.dataModelName, 'private');
dataModelStorage.readyPromise.then(() => {
  if (dataModelStorage.length === 0) {
    dataModelStorage.set({
      _id: 'sample',
      _updatedBy: 'system',
      subFolder: 'public',
      subStorage: false,
    });
  }
});

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
