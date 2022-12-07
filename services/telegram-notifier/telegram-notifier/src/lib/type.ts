import type {AlwatrDocumentObject} from '@alwatr/storage-client';

export interface MemberList extends AlwatrDocumentObject {
  memberList: Array<number>;
}
