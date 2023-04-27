import {random} from '@alwatr/math';

import {setLocalStorageItem} from './local-storage.js';

let clientId: string | null = null;

export const getClientId = (): string => {
  if (clientId != null) {
    return clientId;
  }
  // else
  clientId = localStorage.getItem('client-id');
  if (clientId == null) {
    clientId = random.uuid;
    setLocalStorageItem('client-id', clientId);
  }
  return clientId;
};
