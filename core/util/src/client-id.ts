import {random} from '@alwatr/math';

let clientId: string | null = null;

export const getClientId = (): string => {
  if (clientId != null) {
    return clientId;
  }
  // else
  clientId = localStorage.getItem('client-id');
  if (clientId == null) {
    clientId = random.uuid;
    localStorage.setItem('client-id', clientId);
  }
  return clientId;
};
