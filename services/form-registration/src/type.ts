import {AlwatrDocumentObject} from '@alwatr/type';

export type Form = AlwatrDocumentObject & {
  deviceId: string;
  remoteAddress: string;
}
