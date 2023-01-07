import type {AlwatrDocumentObject} from './storage.js';

export type User = AlwatrDocumentObject & {
  name: string;
  phoneNumber: string;
};
