import {AlwatrDocumentObject} from './storage.js';

export type Photo = AlwatrDocumentObject & {
  fileName: string;
  meta: {
    description: string;
  };
}
