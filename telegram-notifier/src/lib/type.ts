import type {DocumentObject} from '@alwatr/storage-engine';

export interface MemberList extends DocumentObject {
  memberList: Array<number>;
}
