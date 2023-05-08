import {random} from '@alwatr/math';

import {getLocalStorageItem, setLocalStorageItem} from './local-storage.js';

const localStorageId = 'client_id_x1';
let clientId: string | null = null;

export const getClientId = (): string => {
  if (clientId != null) {
    return clientId;
  }
  // else
  clientId = getLocalStorageItem(localStorageId, null);
  if (clientId == null) {
    clientId = random.uuid;
    setLocalStorageItem(localStorageId, clientId);
  }
  return clientId;
};
