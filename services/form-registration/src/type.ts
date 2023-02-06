import {AlwatrDocumentObject} from '@alwatr/type';

export type Form = AlwatrDocumentObject & {
  clientId: string;
  remoteAddress: string;
}
