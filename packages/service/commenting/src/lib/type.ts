import {AlwatrDocumentObject} from '@alwatr/storage-engine';

export type Comment = AlwatrDocumentObject & {
  userName: string;
  text: string;
}
