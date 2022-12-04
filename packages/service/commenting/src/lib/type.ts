import {AlwatrDocumentObject} from '@alwatr/storage-engine';

export type Comment = AlwatrDocumentObject & {
  userId: string;
  text: string;
  replyId?: string;
}
