import type {AlwatrDocumentObject} from '@alwatr/type';

export interface Count extends AlwatrDocumentObject {
  id: 'count';
  value: number;
}
