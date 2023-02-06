import {AlwatrDocumentObject} from '@alwatr/type';

export type RecordItem = AlwatrDocumentObject & {
  clientId: string;
  remoteAddress: string;
}
