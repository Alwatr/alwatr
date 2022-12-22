import type {AlwatrDocumentObject} from '@alwatr/storage-engine';

export interface MemberList extends AlwatrDocumentObject {
  memberList: Array<number>;
}
